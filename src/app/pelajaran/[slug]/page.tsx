import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PemutarPelajaran, type Berikutnya } from "@/components/PemutarPelajaran";
import { KunciTataLaptop } from "@/components/KunciTataLaptop";
import { PELAJARAN_SIAP, cariPelajaran } from "@/lib/daftar-pelajaran";
import { berikutnyaDariSlug } from "@/lib/kurikulum";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PELAJARAN_SIAP.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pelajaran = cariPelajaran(slug);
  if (!pelajaran) return {};
  return {
    title: pelajaran.judul,
    description: pelajaran.ringkas,
    openGraph: {
      title: `${pelajaran.judul} · Ruang Genetika`,
      description: pelajaran.ringkas,
      type: "article",
    },
  };
}

/**
 * Halaman menonton. Seluruh tata letaknya (judul, panggung, subtitel, kendali,
 * Catatan) ada di dalam PemutarPelajaran karena semuanya mengikuti adegan yang
 * sedang berjalan. Halaman ini hanya mencari datanya.
 */
export default async function HalamanPelajaran({ params }: Props) {
  const { slug } = await params;
  const pelajaran = cariPelajaran(slug);
  if (!pelajaran) notFound();

  const lanjut = berikutnyaDariSlug(slug);
  const berikutnya: Berikutnya | undefined =
    lanjut && lanjut.slug
      ? {
          slug: lanjut.slug,
          nomor: lanjut.nomor,
          judul: lanjut.judul,
          levelNomor: lanjut.level.nomor,
          levelNama: lanjut.level.nama,
        }
      : undefined;

  return (
    /* laptop: selebar layar — video ¾, Catatan ¼ (Nely, 25 Sep 2026) */
    <article className="artikel-menonton anim-masuk-geser mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-4 lg:max-w-[1920px]">
      {/* key: pindah pelajaran = pemutar baru (posisi, jam, dan elemen suara mulai dari nol) */}
      <PemutarPelajaran key={pelajaran.slug} pelajaran={pelajaran} berikutnya={berikutnya} />
      <KunciTataLaptop />
    </article>
  );
}
