"use client";

import { useId, useState } from "react";
import { useMediaCocok } from "@/lib/jendela";

/**
 * Laci tertutup — tempat penjelasan panjang disembunyikan tanpa hilang
 * (KEPUTUSAN-DESAIN.md §8.2). Tertutup secara bawaan; `bukaDiLaptop`
 * membukanya otomatis di layar lebar karena ruangnya ada. Begitu penonton
 * mengetuknya sendiri, pilihannya yang berlaku.
 */
export function Laci({
  judul,
  jumlah,
  bukaDiLaptop = false,
  children,
}: {
  judul: string;
  jumlah?: number;
  bukaDiLaptop?: boolean;
  children: React.ReactNode;
}) {
  const [pilihan, setPilihan] = useState<boolean | null>(null);
  const lebar = useMediaCocok("(min-width: 1024px)");
  const terbuka = pilihan ?? (bukaDiLaptop && lebar);
  const id = useId();

  return (
    <div className="border-t border-garis first:border-t-0">
      <button
        type="button"
        onClick={() => setPilihan(!terbuka)}
        aria-expanded={terbuka}
        aria-controls={id}
        className="flex h-12 w-full items-center gap-2 text-left text-[14px] font-semibold transition hover:text-teks-lembut"
      >
        <span className="flex-1">
          {judul}
          {jumlah !== undefined && (
            <span className="ml-1.5 font-mono text-[11px] font-medium text-teks-samar">
              ({jumlah})
            </span>
          )}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="text-teks-samar transition-transform duration-200 ease-buka"
          style={{ transform: terbuka ? "rotate(180deg)" : "none" }}
        >
          <path d="M3.5 6 8 10.5 12.5 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        id={id}
        className="grid transition-[grid-template-rows] duration-200 ease-buka"
        style={{ gridTemplateRows: terbuka ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className="pb-4 transition-opacity duration-150"
            style={{ opacity: terbuka ? 1 : 0, transitionDelay: terbuka ? "60ms" : "0ms" }}
            aria-hidden={!terbuka}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
