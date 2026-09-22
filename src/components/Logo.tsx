import Link from "next/link";
import { TINGKAT, TINGGI_STRIP_LOGO } from "@/lib/tingkat";

/**
 * Logo: tujuh strip tegak berwarna tingkat (urut 0→6), lalu kata Ruang Genetika.
 *
 * Tujuh strip mengatakan dua hal sekaligus — "warna adalah alat belajar di sini"
 * dan "ada tujuh tingkat". Heliks yang lama dihapus: dipakai semua orang dan
 * tidak mengatakan apa pun tentang situs ini. (KEPUTUSAN-DESAIN.md §1.6)
 */
export function Logo({ tautan = true }: { tautan?: boolean }) {
  const isi = (
    <span className="inline-flex items-center gap-2.5">
      <TujuhStrip />
      <span className="text-[17px] font-extrabold tracking-[-0.02em]">
        Ruang Genetika
      </span>
    </span>
  );

  if (!tautan) return isi;
  return (
    <Link href="/" aria-label="Ruang Genetika — ke halaman depan" className="shrink-0">
      {isi}
    </Link>
  );
}

export function TujuhStrip({ skala = 1 }: { skala?: number }) {
  const tinggiMaks = Math.max(...TINGGI_STRIP_LOGO) * skala;
  return (
    <span
      className="inline-flex items-end"
      style={{ gap: 2 * skala, height: tinggiMaks }}
      aria-hidden="true"
    >
      {TINGKAT.map((t, i) => (
        <span
          key={t.nomor}
          style={{
            width: 3 * skala,
            height: TINGGI_STRIP_LOGO[i] * skala,
            borderRadius: 1.5 * skala,
            background: t.batang,
          }}
        />
      ))}
    </span>
  );
}
