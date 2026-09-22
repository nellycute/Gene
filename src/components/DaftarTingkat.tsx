"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Lencana } from "./Lencana";
import { usePencarianAlamat } from "@/lib/jendela";
import type { Level } from "@/lib/kurikulum";
import { warnaTingkat } from "@/lib/tingkat";
import { formatDurasiRingkas } from "@/lib/tipe";

/**
 * TUJUH BARIS TINGKAT (KEPUTUSAN-DESAIN.md §5.1–5.2, §5.4)
 *
 * Baris yang diketuk membuka isinya DI TEMPAT — halaman tidak berpindah,
 * posisi gulir tidak hilang. Hanya satu tingkat terbuka pada satu waktu.
 *
 * Tombol kembali dari layar menonton membawa `?buka=N&sorot=slug`, sehingga
 * tingkat itu sudah terbuka dan pelajaran yang barusan ditonton tersorot
 * sebentar. Penonton tidak pernah kembali ke puncak halaman kosong.
 */

type Ringkasan = Record<string, { durasi: number; adegan: number }>;

export function DaftarTingkat({
  level,
  ringkasan,
}: {
  level: Level[];
  ringkasan: Ringkasan;
}) {
  /* Kembali dari layar menonton membawa ?buka=N&sorot=slug. */
  const pencarian = usePencarianAlamat();
  const awal = useMemo(() => {
    const p = new URLSearchParams(pencarian);
    const n = Number(p.get("buka"));
    const buka =
      p.has("buka") && Number.isInteger(n) && level.some((l) => l.nomor === n)
        ? n
        : null;
    return { buka, sorot: buka !== null ? p.get("sorot") : null };
  }, [pencarian, level]);

  /* `undefined` = penonton belum menyentuh apa pun, ikuti alamat. */
  const [pilihan, setPilihan] = useState<number | null | undefined>(undefined);
  const terbuka = pilihan === undefined ? awal.buka : pilihan;

  /* Sorotan hilang sendiri setelah 1,8 detik. Alamat sengaja TIDAK
     dibersihkan di sini — begitu penonton menyentuh daftar, barulah
     dibersihkan, supaya pembacaan alamat tidak berubah di tengah jalan. */
  const [sorotHabis, setSorotHabis] = useState(false);
  useEffect(() => {
    if (!awal.sorot) return;
    const t = window.setTimeout(() => setSorotHabis(true), 1800);
    return () => window.clearTimeout(t);
  }, [awal.sorot]);
  const tersorot = sorotHabis ? null : awal.sorot;

  function pilih(nomor: number) {
    setPilihan(terbuka === nomor ? null : nomor);
    if (window.location.search) window.history.replaceState(null, "", "/");
  }

  return (
    <div className="flex flex-col gap-[7px]">
      {level.map((l, i) => (
        <BarisTingkat
          key={l.nomor}
          level={l}
          urutan={i}
          terbuka={terbuka === l.nomor}
          onToggle={() => pilih(l.nomor)}
          ringkasan={ringkasan}
          tersorot={tersorot}
        />
      ))}
    </div>
  );
}

function BarisTingkat({
  level,
  urutan,
  terbuka,
  onToggle,
  ringkasan,
  tersorot,
}: {
  level: Level;
  urutan: number;
  terbuka: boolean;
  onToggle: () => void;
  ringkasan: Ringkasan;
  tersorot: string | null;
}) {
  const warna = warnaTingkat(level.nomor);
  const siap = level.isi.filter((b) => b.slug).length;
  const idIsi = `isi-tingkat-${level.nomor}`;

  return (
    <div
      className="anim-masuk-naik overflow-hidden rounded-[13px] bg-permukaan transition-[box-shadow] duration-200"
      style={{
        animationDelay: `${urutan * 30}ms`,
        boxShadow: terbuka
          ? `0 0 0 1.5px ${warna.batang}`
          : "0 0 0 1px var(--garis)",
      }}
    >
      {/* ---- kepala baris: tinggi 52 px ---- */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={terbuka}
        aria-controls={idIsi}
        className="flex h-[52px] w-full items-center gap-2.5 pr-3 text-left transition hover:bg-latar-lembut active:scale-[0.995] sm:gap-4 sm:pr-3.5"
      >
        <span
          className="ml-3 h-7 w-1 shrink-0 rounded-full"
          style={{ background: warna.batang }}
          aria-hidden="true"
        />

        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2 sm:gap-2.5">
            <span
              className="shrink-0 whitespace-nowrap font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] transition-colors"
              style={{ color: terbuka ? warna.teks : "var(--teks-samar)" }}
            >
              Tingkat {level.nomor}
            </span>
            <span className="truncate text-[14.5px] font-bold leading-none sm:text-[15px]">
              {level.nama}
            </span>
          </span>
          {/* Keterangan satu kalimat — hanya laptop */}
          <span className="mt-1 hidden truncate text-[12.5px] leading-none text-teks-lembut sm:block">
            {level.ringkas}
          </span>
        </span>

        <span className="hidden sm:inline">
          <Lencana tingkat={level.tingkat} />
        </span>

        <span className="shrink-0 font-mono text-[11px] tabular-nums text-teks-samar">
          {siap > 0 ? `${siap}/${level.isi.length}` : level.isi.length}
        </span>

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-teks-samar transition-transform duration-200 ease-buka"
          style={{ transform: terbuka ? "rotate(180deg)" : "none" }}
        >
          <path d="M3.5 6 8 10.5 12.5 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ---- isi: membuka dengan animasi tinggi, tanpa mengukur ---- */}
      <div
        id={idIsi}
        className="grid transition-[grid-template-rows] duration-200 ease-buka"
        style={{ gridTemplateRows: terbuka ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <ul
            className="grid gap-x-3 border-t border-garis px-3 py-2 transition-opacity duration-150 sm:grid-cols-3 sm:px-4"
            style={{
              opacity: terbuka ? 1 : 0,
              transitionDelay: terbuka ? "60ms" : "0ms",
            }}
            aria-hidden={!terbuka}
          >
            {level.isi.map((b) => {
              const r = b.slug ? ringkasan[b.slug] : undefined;
              const disorot = b.slug !== undefined && b.slug === tersorot;

              if (!b.slug || !r) {
                return (
                  <li
                    key={b.nomor}
                    className="flex min-h-[42px] items-center gap-3 py-1.5"
                  >
                    <span className="w-7 shrink-0 font-mono text-[11px] text-teks-pudar">
                      {b.nomor}
                    </span>
                    <span className="flex-1 text-[13.5px] leading-snug text-teks-lembut">
                      {b.judul}
                    </span>
                    <span className="shrink-0 text-[11px] font-medium text-teks-pudar">
                      Segera
                    </span>
                  </li>
                );
              }

              return (
                <li key={b.nomor}>
                  <Link
                    href={`/pelajaran/${b.slug}`}
                    tabIndex={terbuka ? 0 : -1}
                    className="group -mx-1.5 flex min-h-[42px] items-center gap-3 rounded-lg px-1.5 py-1.5 transition-colors duration-300 hover:bg-latar-lembut"
                    style={{
                      background: disorot ? `color-mix(in srgb, ${warna.batang} 14%, transparent)` : undefined,
                    }}
                  >
                    <span className="w-7 shrink-0 font-mono text-[11px] font-semibold text-teks">
                      {b.nomor}
                    </span>
                    <span className="flex-1 text-[13.5px] font-medium leading-snug">
                      {b.judul}
                    </span>
                    <span className="shrink-0 font-mono text-[10.5px] text-teks-samar">
                      {formatDurasiRingkas(r.durasi)}
                    </span>
                    <span
                      className="tombol-tinta grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full"
                      aria-hidden="true"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <path d="M2.5 1.5v7L8.5 5 2.5 1.5Z" fill="currentColor" />
                      </svg>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
