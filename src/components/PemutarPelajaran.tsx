"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SelHewan } from "@/animasi/SelHewan";
import { SEL } from "@/lib/warna";
import { jam, totalDurasi, type Pelajaran } from "@/lib/tipe";

/**
 * PEMUTAR PELAJARAN
 *
 * Menjalankan pelajaran sebagai rangkaian adegan — seperti video, tapi
 * seluruh gambarnya digambar oleh kode sehingga bisa dikoreksi kapan saja.
 *
 * Dibangun sekali di sini, lalu dipakai oleh seluruh pelajaran berikutnya.
 */

const PILIHAN_KECEPATAN = [0.75, 1, 1.25, 1.5] as const;

export function PemutarPelajaran({ pelajaran }: { pelajaran: Pelajaran }) {
  const adegan = pelajaran.adegan;
  const total = totalDurasi(pelajaran);

  const [indeks, setIndeks] = useState(0);
  const [berjalan, setBerjalan] = useState(false);
  const [waktu, setWaktu] = useState(0); // detik berjalan di dalam adegan ini
  const [kecepatan, setKecepatan] = useState<number>(1);
  const [subtitel, setSubtitel] = useState(true);
  const [selesai, setSelesai] = useState(false);

  const rafRef = useRef<number | null>(null);
  const capRef = useRef(0);

  /* ---- jalannya waktu ---- */
  useEffect(() => {
    if (!berjalan) return;
    capRef.current = performance.now();
    const langkah = (t: number) => {
      const selisih = (t - capRef.current) / 1000;
      capRef.current = t;
      setWaktu((w) => w + selisih * kecepatan);
      rafRef.current = requestAnimationFrame(langkah);
    };
    rafRef.current = requestAnimationFrame(langkah);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [berjalan, kecepatan]);

  /* ---- pindah adegan saat waktunya habis ---- */
  useEffect(() => {
    const durasi = adegan[indeks].durasi;
    if (waktu < durasi) return;
    if (indeks < adegan.length - 1) {
      setIndeks((i) => i + 1);
      setWaktu((w) => w - durasi);
    } else {
      setBerjalan(false);
      setSelesai(true);
      setWaktu(durasi);
    }
  }, [waktu, indeks, adegan]);

  /* ---- kendali ---- */
  const keAdegan = useCallback((i: number) => {
    setIndeks(i);
    setWaktu(0);
    setSelesai(false);
  }, []);

  const putarJeda = useCallback(() => {
    if (selesai) {
      setIndeks(0);
      setWaktu(0);
      setSelesai(false);
      setBerjalan(true);
      return;
    }
    setBerjalan((b) => !b);
  }, [selesai]);

  const mundur = useCallback(() => {
    // Klik pertama mengulang adegan ini; kalau baru mulai, lompat ke adegan sebelumnya.
    if (waktu > 2.5) setWaktu(0);
    else if (indeks > 0) keAdegan(indeks - 1);
    setSelesai(false);
  }, [waktu, indeks, keAdegan]);

  const maju = useCallback(() => {
    if (indeks < adegan.length - 1) keAdegan(indeks + 1);
  }, [indeks, adegan.length, keAdegan]);

  function tanganiTombol(e: React.KeyboardEvent) {
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

  const sekarang = adegan[indeks];
  const lewatSebelumnya = adegan
    .slice(0, indeks)
    .reduce((j, a) => j + a.durasi, 0);
  const posisi = Math.min(lewatSebelumnya + waktu, total);

  return (
    <section
      tabIndex={0}
      onKeyDown={tanganiTombol}
      aria-label={`Pemutar pelajaran: ${pelajaran.judul}`}
      className="overflow-hidden rounded-2xl border border-garis bg-permukaan shadow-[var(--bayang)]"
    >
      {/* ---------- PANGGUNG ---------- */}
      <div className="relative bg-latar-lembut">
        <div className="aspect-[800/570] w-full">
          <SelHewan sorot={sekarang.sorot ?? []} />
        </div>

        {/* Tajuk adegan */}
        {sekarang.tajuk && (
          <div className="kaca pointer-events-none absolute left-4 top-4 rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm">
            {sekarang.tajuk}
          </div>
        )}

        {/* Penanda adegan ke berapa */}
        <div className="kaca pointer-events-none absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-medium text-teks-lembut shadow-sm">
          Adegan {indeks + 1} dari {adegan.length}
        </div>

        {/* Lapisan selesai */}
        {selesai && (
          <div className="kaca-latar absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="text-lg font-semibold">Pelajaran selesai</p>
              <p className="mt-1 text-sm text-teks-lembut">
                Ringkasan dan daftar istilah ada di bawah.
              </p>
              <button
                type="button"
                onClick={putarJeda}
                className="mt-5 rounded-xl bg-aksen px-6 py-2.5 font-semibold text-white transition hover:opacity-90"
              >
                Putar ulang
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ---------- SUBTITEL ----------
          Sengaja di bawah panggung, bukan menimpanya, supaya diagram
          tidak pernah tertutup teks. */}
      {subtitel && (
        <div className="min-h-[104px] border-t border-garis bg-permukaan px-5 py-4 sm:px-7">
          <p className="mx-auto max-w-3xl text-center text-[15px] leading-relaxed text-teks sm:text-base">
            {sekarang.narasi}
          </p>
        </div>
      )}

      {/* ---------- BILAH KENDALI ---------- */}
      <div className="border-t border-garis bg-latar-lembut px-3 py-3 sm:px-5">
        {/* Garis kemajuan, terbagi per adegan seperti penanda bab */}
        <div
          className="mb-3 flex h-2 w-full gap-[3px]"
          role="group"
          aria-label="Daftar adegan"
        >
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
                className="group relative h-2 overflow-hidden rounded-full bg-garis transition hover:bg-garis-tegas"
              >
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-aksen"
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
            className="grid h-11 w-11 place-items-center rounded-full bg-aksen text-white transition hover:opacity-90"
          >
            {selesai ? (
              <IkonUlang />
            ) : berjalan ? (
              <IkonJeda />
            ) : (
              <IkonPutar />
            )}
          </button>

          <Tombol onClick={maju} label="Adegan berikutnya">
            <IkonLompat arah="maju" />
          </Tombol>

          <span className="ml-1 font-mono text-xs tabular-nums text-teks-lembut">
            {jam(posisi)} / {jam(total)}
          </span>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSubtitel((s) => !s)}
              aria-pressed={subtitel}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                subtitel
                  ? "border-aksen bg-aksen-lembut text-aksen-teks"
                  : "border-garis text-teks-lembut hover:text-teks"
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
              className="rounded-lg border border-garis bg-permukaan px-2 py-1.5 text-xs font-semibold text-teks-lembut"
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

      {/* ---------- LEGENDA WARNA ---------- */}
      <LegendaAdegan sorot={sekarang.sorot ?? []} />
    </section>
  );
}

/** Menampilkan nama + warna bagian yang sedang disorot. */
function LegendaAdegan({ sorot }: { sorot: string[] }) {
  const isi = sorot.length
    ? sorot
    : ["inti", "mitokondria", "ribosom", "golgi", "reKasar", "lisosom"];

  return (
    <div className="border-t border-garis bg-permukaan px-5 py-3 sm:px-7">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-teks-samar">
          {sorot.length ? "Sedang dibahas" : "Beberapa bagian"}
        </span>
        {isi.map((id) => {
          const e = SEL[id as keyof typeof SEL];
          if (!e) return null;
          return (
            <span key={id} className="flex items-center gap-2 text-sm">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ background: e.warna }}
                aria-hidden="true"
              />
              <span className="font-medium">{e.nama}</span>
              <span className="text-teks-samar">({e.inggris})</span>
            </span>
          );
        })}
      </div>
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
      className="grid h-9 w-9 place-items-center rounded-lg border border-garis text-teks-lembut transition hover:border-garis-tegas hover:text-teks"
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
      <path
        d="M20 12a8 8 0 1 1-2.6-5.9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
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
