"use client";

import { useEffect, useId, useRef } from "react";
import type { Pelajaran } from "@/lib/tipe";

/**
 * CATATAN — tempat semua tulisan panjang disimpan (KEPUTUSAN-DESAIN.md §8.2,
 * diubah 23 Sep 2026). Hanya muncul saat tombol Catatan diketuk: panel di
 * samping panggung di laptop, lembar dari bawah di HP. Isinya digulir di
 * dalam kotaknya sendiri — halaman menonton tidak pernah memanjang.
 */

export type TabCatatan = "istilah" | "ringkasan" | "naskah" | "rujukan";

export function Catatan({
  pelajaran,
  tab,
  onTab,
  indeksAdegan,
  onLompat,
  onTutup,
  wujud,
}: {
  pelajaran: Pelajaran;
  tab: TabCatatan;
  onTab: (t: TabCatatan) => void;
  indeksAdegan: number;
  onLompat: (i: number) => void;
  onTutup: () => void;
  wujud: "panel" | "lembar";
}) {
  const id = useId();
  const isiRef = useRef<HTMLDivElement>(null);
  const adeganRef = useRef<HTMLLIElement>(null);
  const tabRef = useRef<HTMLButtonElement>(null);

  const DAFTAR: { id: TabCatatan; label: string; jumlah?: number }[] = [
    { id: "istilah", label: "Istilah", jumlah: pelajaran.istilah.length },
    { id: "ringkasan", label: "Ringkasan" },
    { id: "naskah", label: "Naskah" },
    { id: "rujukan", label: "Rujukan", jumlah: pelajaran.rujukan.length },
  ];

  /* Fokus pindah ke tab yang terbuka, supaya pembaca layar dan papan ketik
     langsung berada di dalam Catatan. */
  useEffect(() => {
    tabRef.current?.focus({ preventScroll: true });
  }, []);

  /* Di tab Naskah, adegan yang sedang diputar selalu terlihat. Hanya kotak
     Catatan yang digulir — halamannya tidak. */
  useEffect(() => {
    if (tab !== "naskah") return;
    const wadah = isiRef.current;
    const baris = adeganRef.current;
    if (!wadah || !baris) return;
    wadah.scrollTo({ top: Math.max(0, baris.offsetTop - 12), behavior: "smooth" });
  }, [tab, indeksAdegan]);

  return (
    <div
      data-catatan
      className={`flex h-full min-h-0 flex-col overflow-hidden bg-permukaan ${
        wujud === "panel" ? "rounded-[13px] shadow-[0_0_0_1px_var(--garis)]" : ""
      }`}
    >
      {wujud === "lembar" && (
        <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-garis-tegas" aria-hidden="true" />
      )}

      <div className="flex shrink-0 items-center gap-1 border-b border-garis px-2 py-2">
        <div role="tablist" aria-label="Catatan pelajaran" className="flex min-w-0 flex-1 justify-between gap-0.5 sm:justify-start">
          {DAFTAR.map((t) => {
            const aktif = t.id === tab;
            return (
              <button
                key={t.id}
                ref={aktif ? tabRef : undefined}
                type="button"
                role="tab"
                id={`${id}-${t.id}`}
                aria-selected={aktif}
                aria-controls={`${id}-isi`}
                onClick={() => onTab(t.id)}
                className={`h-8 shrink-0 whitespace-nowrap rounded-lg px-1.5 text-[12px] font-semibold transition active:scale-[0.97] ${
                  aktif ? "bg-teks text-tombol-teks" : "text-teks-lembut hover:bg-latar-lembut hover:text-teks"
                }`}
              >
                {t.label}
                {t.jumlah !== undefined && (
                  <span className={`ml-1 font-mono text-[10px] font-medium ${aktif ? "opacity-70" : "text-teks-samar"}`}>
                    {t.jumlah}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onTutup}
          aria-label="Tutup catatan"
          title="Tutup (Esc)"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-teks-lembut transition hover:bg-latar-lembut hover:text-teks active:scale-[0.97]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        ref={isiRef}
        role="tabpanel"
        id={`${id}-isi`}
        aria-labelledby={`${id}-${tab}`}
        className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3.5"
      >
        {tab === "istilah" && (
          <dl className="space-y-3">
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
        )}

        {tab === "ringkasan" && (
          <ol className="space-y-3">
            {pelajaran.poinKunci.map((poin, i) => (
              <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-teks-lembut">
                <span className="mt-[3px] font-mono text-[10px] font-semibold text-teks-samar">{i + 1}</span>
                <span>{poin}</span>
              </li>
            ))}
          </ol>
        )}

        {tab === "naskah" && (
          <ol className="space-y-1">
            {pelajaran.adegan.map((a, i) => {
              const sekarang = i === indeksAdegan;
              return (
                <li key={a.id} ref={sekarang ? adeganRef : undefined}>
                  <button
                    type="button"
                    onClick={() => onLompat(i)}
                    aria-current={sekarang ? "step" : undefined}
                    className={`w-full rounded-lg px-2.5 py-2 text-left transition hover:bg-latar-lembut ${
                      sekarang ? "bg-latar-lembut" : ""
                    }`}
                  >
                    <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-teks-samar">
                      {i + 1} · {a.tajuk ?? "Adegan"}
                    </span>
                    <span className={`mt-0.5 block text-[13.5px] leading-relaxed ${sekarang ? "text-teks" : "text-teks-lembut"}`}>
                      {a.narasi}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        )}

        {tab === "rujukan" && (
          <>
            <ul className="space-y-2.5 text-[13px] leading-snug text-teks-lembut">
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
            <p className="mt-4 font-mono text-[10px] text-teks-samar">
              {pelajaran.ditinjau ? `Ditinjau ${pelajaran.ditinjau}` : "Naskah belum ditinjau"}
            </p>
            <p className="mt-3 border-t border-garis pt-3 text-[11.5px] leading-snug text-teks-samar">
              Bahan belajar, bukan nasihat medis. Bebas dipakai mengajar ·{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/deed.id"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-teks-lembut"
              >
                CC BY-SA
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
