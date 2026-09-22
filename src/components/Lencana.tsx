import type { Tingkat } from "@/lib/tipe";

/**
 * Penanda tingkat kesulitan (Dasar / Menengah / Lanjut).
 * Netral — kertas dan tinta. Antarmuka tidak boleh punya warna sendiri;
 * satu-satunya warna yang boleh muncul di sekitar baris tingkat adalah
 * warna tingkatnya, dan itu pun hanya sebagai batang tipis.
 */
export function Lencana({ tingkat }: { tingkat: Tingkat }) {
  return (
    <span className="rounded-full border border-garis-tegas px-2 py-[1px] font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] text-teks-samar">
      {tingkat}
    </span>
  );
}
