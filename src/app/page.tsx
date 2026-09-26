import Image from "next/image";
import { DaftarTingkat } from "@/components/DaftarTingkat";
import { LEVEL } from "@/lib/kurikulum";
import { RINGKASAN_SIAP } from "@/lib/daftar-pelajaran";

/**
 * HALAMAN PERTAMA (KEPUTUSAN-DESAIN.md §5.1, §8.1)
 *
 * Bukan tempat menjelaskan — tempat memilih. Tidak ada paragraf.
 * Di HP harus muat satu layar tanpa digulir:
 *   bilah atas → blok sambutan kecil → tujuh baris tingkat → satu baris kaki.
 *
 * Batas kata yang mengikat: judul ≤ 10 kata, keterangan ≤ 8 kata satu baris.
 */
export default function Beranda() {
  return (
    <div className="beranda relative mx-auto max-w-4xl px-4 pb-3 pt-4 sm:px-6">
      {/* Hiasan di luar jalur baca; CSS baru mengunduh gambarnya di layar lebar. */}
      <div aria-hidden="true" className="hiasan-sisi hiasan-kiri"><div /></div>
      <div aria-hidden="true" className="hiasan-sisi hiasan-kanan"><div /></div>
      {/* ---------- blok sambutan ---------- */}
      <section className="sambutan-beranda anim-masuk-naik relative mb-4 flex items-center gap-3.5 sm:gap-6">
        <div aria-hidden="true" className="hiasan-banner" />
        {/* bola sel yang melayang — gambar yang sama dengan ikon aplikasi (Nely, 25 Sep 2026).
            Gambar diam 23 KB, bukan mesin 3D: halaman pertama harus tetap ringan. */}
        <div className="w-[84px] shrink-0 sm:w-[104px] md:hidden" aria-hidden="true">
          <Image
            src="/ikon/sel-melayang.webp"
            alt=""
            width={360}
            height={360}
            priority
            unoptimized
            className="anim-melayang relative z-[1] h-auto w-full"
          />
          <div className="anim-bayang-melayang mx-auto mt-1 h-2 w-[68%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(27_36_48/0.3),transparent)]" />
        </div>
        <div className="teks-sambutan relative min-w-0">
          <h1 className="text-[16px] font-extrabold leading-[1.2] tracking-[-0.01em] sm:text-[26px] sm:leading-[1.15]">
            Belajar genetika, lebih mudah.
          </h1>
          <p className="mt-1 truncate text-[12.5px] text-teks-lembut sm:mt-2 sm:text-[14px]">
            Sel sampai sequencing. Gratis.
          </p>
        </div>
      </section>

      {/* ---------- tujuh baris tingkat ---------- */}
      <section id="materi" aria-label="Daftar materi">
        <DaftarTingkat level={LEVEL} ringkasan={RINGKASAN_SIAP} />
      </section>
    </div>
  );
}
