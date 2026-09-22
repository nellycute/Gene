import { SelHewan } from "@/animasi/SelHewan";
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
    <div className="mx-auto max-w-4xl px-4 pb-6 pt-4 sm:px-6 sm:pt-8">
      {/* ---------- blok sambutan ---------- */}
      <section className="anim-masuk-naik mb-4 flex items-center gap-3.5 sm:mb-7 sm:gap-6">
        <div
          className="anim-denyut-sel w-[108px] shrink-0 sm:w-[120px]"
          aria-hidden="true"
        >
          <div className="aspect-[800/570] w-full">
            <SelHewan sorot={[]} tampilkanLabel={false} />
          </div>
        </div>
        <div className="min-w-0">
          <h1 className="text-[16px] font-extrabold leading-[1.2] tracking-[-0.01em] sm:text-[26px] sm:leading-[1.15]">
            Genetika lewat warna yang tak berubah.
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
