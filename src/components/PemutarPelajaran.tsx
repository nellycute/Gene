"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SelHewan } from "@/animasi/SelHewan";
import { Laci } from "./Laci";
import { SEL, SEMUA_ENTITAS } from "@/lib/warna";
import { warnaTingkat } from "@/lib/tingkat";
import { jam, totalDurasi, type Pelajaran } from "@/lib/tipe";

/**
 * LAYAR MENONTON (KEPUTUSAN-DESAIN.md §5.3, §6, §8.2, §9)
 *
 * HP, urut dari atas: judul → panggung → subtitel (kartu sendiri, tidak
 * pernah menimpa panggung) → bilah kendali → "Sedang dibahas" → tiga laci.
 * Laptop: dua kolom. Kiri 660 px: panggung, subtitel, kendali. Kanan: judul,
 * "Sedang dibahas", tiga laci, kartu hitam "Berikutnya".
 *
 * Gambar muncul SEKETIKA — digambar kode, bukan diunduh. Yang ditunggu hanya
 * berkas suara. Kalau suara gagal dimuat, pelajaran tetap jalan tanpa suara.
 */

const PILIHAN_KECEPATAN = [0.75, 1, 1.25, 1.5] as const;

type KeadaanSuara = "siap" | "memuat" | "gagal" | "tanpa";

export type Berikutnya = {
  slug: string;
  nomor: string;
  judul: string;
  levelNomor: number;
  levelNama: string;
};

export function PemutarPelajaran({
  pelajaran,
  berikutnya,
}: {
  pelajaran: Pelajaran;
  berikutnya?: Berikutnya;
}) {
  const adegan = pelajaran.adegan;
  const total = totalDurasi(pelajaran);
  const adaSuara = adegan.some((a) => a.audio);

  /* Posisi = adegan ke berapa + detik berjalan di dalamnya. Disimpan juga
     di ref agar detak pewaktu selalu membaca nilai terbaru, termasuk saat
     penonton baru saja melompat lewat tombol. */
  const [posisi, setPosisi] = useState({ indeks: 0, waktu: 0 });
  const posisiRef = useRef(posisi);
  const aturPosisi = useCallback((p: { indeks: number; waktu: number }) => {
    posisiRef.current = p;
    setPosisi(p);
  }, []);
  const { indeks, waktu } = posisi;

  const [berjalan, setBerjalan] = useState(false);
  const [kecepatan, setKecepatan] = useState<number>(1);
  const [subtitel, setSubtitel] = useState(true);
  const [selesai, setSelesai] = useState(false);
  const [suara, setSuara] = useState<KeadaanSuara>(adaSuara ? "siap" : "tanpa");

  const rafRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sekarang = adegan[indeks];
  const pakaiSuara = suara !== "tanpa" && Boolean(sekarang.audio);

  /* ---------- jalannya waktu TANPA suara: pewaktu ----------
     Perpindahan adegan diputuskan di dalam detak, bukan lewat efek terpisah. */
  useEffect(() => {
    if (!berjalan || pakaiSuara) return;
    let cap = performance.now();
    const langkah = (t: number) => {
      const selisih = (t - cap) / 1000;
      cap = t;
      let { indeks: i, waktu: w } = posisiRef.current;
      w += selisih * kecepatan;
      let tamat = false;
      while (w >= adegan[i].durasi) {
        if (i < adegan.length - 1) {
          w -= adegan[i].durasi;
          i += 1;
        } else {
          w = adegan[i].durasi;
          tamat = true;
          break;
        }
      }
      aturPosisi({ indeks: i, waktu: w });
      if (tamat) {
        setBerjalan(false);
        setSelesai(true);
        return;
      }
      rafRef.current = requestAnimationFrame(langkah);
    };
    rafRef.current = requestAnimationFrame(langkah);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [berjalan, kecepatan, pakaiSuara, adegan, aturPosisi]);

  /* ---------- jalannya waktu DENGAN suara: berkas audio yang memimpin ---------- */
  useEffect(() => {
    if (!pakaiSuara || !sekarang.audio) return;
    const el = audioRef.current;
    if (!el) return;

    el.src = sekarang.audio;
    el.playbackRate = kecepatan;

    const memuat = () => setSuara("memuat");
    const siap = () => setSuara("siap");
    const gagal = () => {
      setSuara("gagal");
      setBerjalan(false);
    };
    const detak = () => aturPosisi({ indeks, waktu: el.currentTime });
    const tamat = () => {
      if (indeks < adegan.length - 1) aturPosisi({ indeks: indeks + 1, waktu: 0 });
      else {
        setBerjalan(false);
        setSelesai(true);
      }
    };

    el.addEventListener("waiting", memuat);
    el.addEventListener("loadstart", memuat);
    el.addEventListener("playing", siap);
    el.addEventListener("canplay", siap);
    el.addEventListener("error", gagal);
    el.addEventListener("timeupdate", detak);
    el.addEventListener("ended", tamat);

    if (berjalan) el.play().catch(gagal);

    return () => {
      el.removeEventListener("waiting", memuat);
      el.removeEventListener("loadstart", memuat);
      el.removeEventListener("playing", siap);
      el.removeEventListener("canplay", siap);
      el.removeEventListener("error", gagal);
      el.removeEventListener("timeupdate", detak);
      el.removeEventListener("ended", tamat);
      el.pause();
    };
    // Sengaja hanya bereaksi pada pergantian adegan; putar/jeda ditangani di bawah.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indeks, pakaiSuara, sekarang.audio]);

  useEffect(() => {
    if (!pakaiSuara) return;
    const el = audioRef.current;
    if (!el) return;
    el.playbackRate = kecepatan;
    if (berjalan) el.play().catch(() => setSuara("gagal"));
    else el.pause();
  }, [berjalan, kecepatan, pakaiSuara]);

  /* ---------- kendali ---------- */
  const keAdegan = useCallback(
    (i: number) => {
      aturPosisi({ indeks: i, waktu: 0 });
      setSelesai(false);
    },
    [aturPosisi],
  );

  const putarJeda = useCallback(() => {
    if (selesai) {
      aturPosisi({ indeks: 0, waktu: 0 });
      setSelesai(false);
      setBerjalan(true);
      return;
    }
    setBerjalan((b) => !b);
  }, [selesai, aturPosisi]);

  const mundur = useCallback(() => {
    if (waktu > 2.5) {
      aturPosisi({ indeks, waktu: 0 });
      if (audioRef.current) audioRef.current.currentTime = 0;
    } else if (indeks > 0) keAdegan(indeks - 1);
    setSelesai(false);
  }, [waktu, indeks, keAdegan, aturPosisi]);

  const maju = useCallback(() => {
    if (indeks < adegan.length - 1) keAdegan(indeks + 1);
  }, [indeks, adegan.length, keAdegan]);

  function tanganiTombol(e: React.KeyboardEvent) {
    const sasaran = e.target as HTMLElement;
    if (sasaran.tagName === "SELECT" || sasaran.tagName === "INPUT") return;
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      putarJeda();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      maju();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      mundur();
    }
  }

  const lewatSebelumnya = adegan.slice(0, indeks).reduce((j, a) => j + a.durasi, 0);
  const posisiTotal = Math.min(lewatSebelumnya + waktu, total);
  const sorot = sekarang.sorot ?? [];
  const utama = sorot[0] ? SEMUA_ENTITAS[sorot[0]] : undefined;
  const warnaLevel = warnaTingkat(pelajaran.level);

  return (
    <div
      onKeyDown={tanganiTombol}
      className="lg:grid lg:grid-cols-[660px_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-8"
    >
      {adaSuara && <audio ref={audioRef} preload="auto" />}

      {/* ================= JUDUL ================= */}
      <header className="mb-3 lg:col-start-2 lg:row-start-1 lg:mb-5">
        <p className="font-mono text-[11px] font-semibold tracking-[0.06em] text-teks-samar">
          {pelajaran.nomor}
          <span className="mx-1.5">·</span>
          {pelajaran.adegan.length} adegan
          <span className="mx-1.5">·</span>
          {jam(total)}
        </p>
        <h1 className="mt-1 text-[21px] font-extrabold leading-tight tracking-tight lg:text-[24px]">
          {pelajaran.judul}
        </h1>
        {pelajaran.draf && (
          <p className="mt-2 inline-block rounded-md border border-garis-tegas px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-teks-samar">
            Naskah draf — belum ditinjau
          </p>
        )}
      </header>

      {/* ================= KOLOM KIRI ================= */}
      <section
        tabIndex={0}
        aria-label={`Pemutar pelajaran: ${pelajaran.judul}`}
        className="outline-none lg:col-start-1 lg:row-span-2 lg:row-start-1"
      >
        {/* ---- panggung: selalu kertas terang, di kedua mode ---- */}
        <div className="relative overflow-hidden rounded-[13px] bg-panggung">
          <div className="aspect-[800/570] w-full">
            <SelHewan sorot={sorot} />
          </div>

          <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[13px] font-semibold text-[#1b2430] shadow-sm">
            {utama ? (
              <>
                <span className="h-2 w-2 rounded-full" style={{ background: utama.warna }} aria-hidden="true" />
                {utama.nama}
              </>
            ) : (
              sekarang.tajuk
            )}
          </div>

          <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1.5 font-mono text-[10.5px] font-medium text-[#5c6878] shadow-sm">
            Adegan {indeks + 1} dari {adegan.length}
          </div>

          {/* menunggu suara — gambar sudah lengkap, hanya suaranya yang disiapkan */}
          {suara === "memuat" && berjalan && (
            <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11.5px] font-medium text-[#5c6878] shadow-sm">
              <span className="anim-putar h-3.5 w-3.5 rounded-full border-[2px] border-[#d4c9b8] border-t-[#1b2430]" aria-hidden="true" />
              Menyiapkan suara
            </div>
          )}

          {/* jaringan putus — pelajaran tidak pernah gagal total */}
          {suara === "gagal" && (
            <div className="absolute inset-0 grid place-items-center bg-white/75 p-4 backdrop-blur-sm">
              <div className="w-full max-w-xs rounded-[13px] bg-white p-5 text-center text-[#1b2430] shadow-lembut">
                <p className="font-bold">Suara belum bisa dimuat</p>
                <p className="mt-1 text-[13px] text-[#5c6878]">
                  Animasi dan subtitel tetap bisa jalan.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSuara("tanpa");
                      setBerjalan(true);
                    }}
                    className="h-10 rounded-lg bg-[#1b2430] text-[14px] font-semibold text-white transition active:scale-[0.97]"
                  >
                    Tonton tanpa suara
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSuara("siap");
                      setBerjalan(true);
                    }}
                    className="h-10 rounded-lg border border-[#ded6c7] text-[14px] font-semibold transition active:scale-[0.97]"
                  >
                    Coba lagi
                  </button>
                </div>
              </div>
            </div>
          )}

          {selesai && (
            <div className="absolute inset-0 grid place-items-center bg-white/75 backdrop-blur-sm">
              <div className="text-center text-[#1b2430]">
                <p className="text-lg font-bold">Pelajaran selesai</p>
                <button
                  type="button"
                  onClick={putarJeda}
                  className="mt-4 h-11 rounded-lg bg-[#1b2430] px-6 text-[14px] font-semibold text-white transition active:scale-[0.97]"
                >
                  Putar ulang
                </button>
                {berikutnya && (
                  <Link
                    href={`/pelajaran/${berikutnya.slug}`}
                    className="mt-2 block text-[13px] font-semibold underline underline-offset-2"
                  >
                    Lanjut ke {berikutnya.nomor}
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ---- subtitel: kartu tersendiri, tidak pernah menimpa panggung ---- */}
        {subtitel && (
          <div className="mt-2.5 min-h-[88px] rounded-[13px] bg-permukaan px-5 py-4 shadow-[0_0_0_1px_var(--garis)]">
            <p className="text-center text-[14px] leading-relaxed sm:text-[15px]">
              {sekarang.narasi}
            </p>
          </div>
        )}

        {/* ---- bilah kendali ---- */}
        <div className="mt-2.5 rounded-[13px] bg-latar-lembut px-3 py-3 sm:px-4">
          <div className="mb-3 flex h-1.5 w-full gap-[3px]" role="group" aria-label="Daftar adegan">
            {adegan.map((a, i) => {
              const isi = i < indeks ? 1 : i > indeks ? 0 : Math.min(waktu / a.durasi, 1);
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => keAdegan(i)}
                  title={`${i + 1}. ${a.tajuk ?? "Adegan"}`}
                  aria-label={`Lompat ke adegan ${i + 1}: ${a.tajuk ?? ""}`}
                  style={{ flexGrow: a.durasi }}
                  className="relative h-1.5 overflow-hidden rounded-full bg-garis-tegas transition hover:bg-teks-samar"
                >
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-teks"
                    style={{ width: `${isi * 100}%` }}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Tombol onClick={mundur} label="Adegan sebelumnya">
              <IkonLompat arah="mundur" />
            </Tombol>

            <button
              type="button"
              onClick={putarJeda}
              aria-label={berjalan ? "Jeda" : "Putar"}
              className="tombol-tinta grid h-11 w-11 place-items-center rounded-full"
            >
              {selesai ? <IkonUlang /> : berjalan ? <IkonJeda /> : <IkonPutar />}
            </button>

            <Tombol onClick={maju} label="Adegan berikutnya">
              <IkonLompat arah="maju" />
            </Tombol>

            <span className="ml-1 font-mono text-[11px] tabular-nums text-teks-lembut">
              {jam(posisiTotal)} / {jam(total)}
            </span>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSubtitel((s) => !s)}
                aria-pressed={subtitel}
                className={`h-8 rounded-lg border px-2.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.06em] transition active:scale-[0.97] ${
                  subtitel
                    ? "border-teks bg-teks text-tombol-teks"
                    : "border-garis-tegas text-teks-lembut hover:text-teks"
                }`}
              >
                Subtitel
              </button>

              <label className="sr-only" htmlFor="kecepatan">
                Kecepatan
              </label>
              <select
                id="kecepatan"
                value={kecepatan}
                onChange={(e) => setKecepatan(Number(e.target.value))}
                className="h-8 rounded-lg border border-garis-tegas bg-permukaan px-2 font-mono text-[11px] font-semibold text-teks-lembut"
              >
                {PILIHAN_KECEPATAN.map((k) => (
                  <option key={k} value={k}>
                    {k}×
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p className="mt-2 hidden text-center font-mono text-[10px] text-teks-pudar sm:block">
          spasi putar/jeda · ← → pindah adegan
        </p>
      </section>

      {/* ================= KOLOM KANAN ================= */}
      <aside className="mt-5 lg:col-start-2 lg:row-start-2 lg:mt-0">
        {/* ---- sedang dibahas ---- */}
        <div className="rounded-[13px] bg-permukaan px-4 py-3.5 shadow-[0_0_0_1px_var(--garis)]">
          <p className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-teks-samar">
            Sedang dibahas
          </p>
          {sorot.length ? (
            <ul className="mt-2 space-y-1.5">
              {sorot.map((id) => {
                const e = SEMUA_ENTITAS[id];
                if (!e) return null;
                return (
                  <li key={id} className="flex items-start gap-2.5">
                    <span className="mt-[5px] h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: e.warna }} aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="text-[14px] font-semibold">{e.nama}</span>
                      <span className="ml-1.5 text-[13px] italic text-teks-samar">{e.inggris}</span>
                      <span className="mt-0.5 hidden text-[12.5px] leading-snug text-teks-lembut lg:block">
                        {e.keterangan}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-1.5 text-[14px] font-semibold">
              {indeks === 0 ? "Seluruh sel" : "Semua bagian sekaligus"}
              <span className="ml-1.5 text-[13px] font-normal text-teks-samar">
                {Object.keys(SEL).length} bagian
              </span>
            </p>
          )}
        </div>

        {/* ---- tiga laci ---- */}
        <div className="mt-3 rounded-[13px] bg-permukaan px-4 shadow-[0_0_0_1px_var(--garis)]">
          <Laci judul="Pelajari lebih dalam">
            <ul className="space-y-2.5">
              {pelajaran.poinKunci.map((poin, i) => (
                <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-teks-lembut">
                  <span className="mt-[3px] font-mono text-[10px] font-semibold text-teks-samar">{i + 1}</span>
                  <span>{poin}</span>
                </li>
              ))}
            </ul>
          </Laci>

          <Laci judul="Daftar istilah" jumlah={pelajaran.istilah.length} bukaDiLaptop>
            <dl className="space-y-2.5">
              {pelajaran.istilah.map((it) => (
                <div key={it.id} className="text-[13.5px] leading-snug">
                  <dt className="font-semibold">
                    {it.id}
                    <span className="ml-1.5 font-normal italic text-teks-samar">{it.en}</span>
                  </dt>
                  <dd className="mt-0.5 text-teks-lembut">{it.arti}</dd>
                </div>
              ))}
            </dl>
          </Laci>

          <Laci judul="Rujukan" jumlah={pelajaran.rujukan.length}>
            <ul className="space-y-2 text-[13px] leading-snug text-teks-lembut">
              {pelajaran.rujukan.map((r, i) => (
                <li key={i}>
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-teks">
                      {r.teks}
                    </a>
                  ) : (
                    r.teks
                  )}
                </li>
              ))}
            </ul>
            {pelajaran.ditinjau && (
              <p className="mt-3 font-mono text-[10px] text-teks-samar">Ditinjau {pelajaran.ditinjau}</p>
            )}
          </Laci>
        </div>

        {/* ---- berikutnya: kartu hitam ---- */}
        {berikutnya ? (
          <Link
            href={`/pelajaran/${berikutnya.slug}`}
            className="tombol-tinta mt-3 flex items-center gap-3 rounded-[13px] px-4 py-3.5"
          >
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] opacity-70">
                Berikutnya · {berikutnya.nomor}
              </span>
              <span className="block truncate text-[14px] font-bold">{berikutnya.judul}</span>
            </span>
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: warnaTingkat(berikutnya.levelNomor).batang }} aria-hidden="true" />
            <IkonLompat arah="maju" />
          </Link>
        ) : (
          <Link
            href={`/?buka=${pelajaran.level}&sorot=${pelajaran.slug}`}
            className="mt-3 flex items-center gap-3 rounded-[13px] px-4 py-3.5 shadow-[0_0_0_1px_var(--garis)] transition hover:bg-latar-lembut"
          >
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-teks-samar">
                Berikutnya
              </span>
              <span className="block text-[14px] font-semibold text-teks-lembut">Sedang disiapkan — kembali ke daftar</span>
            </span>
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: warnaLevel.batang }} aria-hidden="true" />
          </Link>
        )}
      </aside>
    </div>
  );
}

function Tombol({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="tombol-garis grid h-9 w-9 place-items-center rounded-lg bg-permukaan"
    >
      {children}
    </button>
  );
}

/* ---------- ikon ---------- */

function IkonPutar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.2v13.6L19 12 8 5.2Z" fill="currentColor" />
    </svg>
  );
}

function IkonJeda() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="7" y="5" width="3.6" height="14" rx="1.2" fill="currentColor" />
      <rect x="13.4" y="5" width="3.6" height="14" rx="1.2" fill="currentColor" />
    </svg>
  );
}

function IkonUlang() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 12a8 8 0 1 1-2.6-5.9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 3.5V9h-5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IkonLompat({ arah }: { arah: "maju" | "mundur" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ transform: arah === "mundur" ? "scaleX(-1)" : undefined }}
    >
      <path d="M6 5.5v13L15 12 6 5.5Z" fill="currentColor" />
      <rect x="16.4" y="5.5" width="2.6" height="13" rx="1.1" fill="currentColor" />
    </svg>
  );
}
