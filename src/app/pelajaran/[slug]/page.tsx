import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PemutarPelajaran, type Berikutnya } from "@/components/PemutarPelajaran";
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
 * Halaman menonton. Seluruh tata letaknya (judul, panggung, laci, kartu
 * berikutnya) ada di dalam PemutarPelajaran karena "Sedang dibahas" harus
 * mengikuti adegan yang sedang berjalan. Halaman ini hanya mencari datanya.
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
    <article className="anim-masuk-geser mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
      <PemutarPelajaran pelajaran={pelajaran} berikutnya={berikutnya} />
    </article>
  );
}
