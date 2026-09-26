import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEVEL, berikutnyaDariSlug, cariPelajaran } from "@/lib/daftar-pelajaran";
import { PerekamVideo, type ButirAntrian } from "./PerekamVideo";

/**
 * PEREKAM VIDEO YOUTUBE — hanya di laptop (mode pengembangan), tidak ikut terbit.
 *
 * Nely ingin mengunggah pelajaran ke YouTube (26 Sep 2026). Film di website
 * digambar langsung oleh peramban, jadi tidak ada berkas video. Halaman ini
 * memutar film bingkai demi bingkai (tepat 30 bingkai per detik film, berapa pun
 * lamanya komputer menggambar), menyusun judul + panggung + subtitel ke bingkai
 * 1920 × 1080, menggabungkan suara narasi, lalu menyimpan MP4-nya ke folder
 * "Video YouTube" di root proyek (lewat /api/rekam-video).
 *
 *   /rekam-video               → rekam semua pelajaran yang videonya belum ada, berurutan
 *   /rekam-video?slug=…        → rekam satu pelajaran (menimpa videonya)
 */

export const metadata: Metadata = { title: "Perekam video", robots: { index: false } };

type Props = { searchParams: Promise<{ slug?: string; lanjut?: string }> };

/** Sama dengan pembersih nama di /api/rekam-video, agar daftar "sudah ada" cocok. */
const namaAman = (s: string) => s.replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, " ").trim();

export default async function HalamanRekamVideo({ searchParams }: Props) {
  if (process.env.NODE_ENV === "production") notFound();
  const { slug, lanjut } = await searchParams;

  const antrian: ButirAntrian[] = LEVEL.flatMap((l) =>
    l.isi.flatMap((b) => {
      const p = b.slug ? cariPelajaran(b.slug) : undefined;
      return p
        ? [{ slug: p.slug, folder: namaAman(`Tingkat ${l.nomor} - ${l.nama}`), nama: namaAman(`${p.nomor} ${p.judul}`) }]
        : [];
    }),
  );

  const pelajaran = slug ? cariPelajaran(slug) : undefined;
  if (slug && !pelajaran) notFound();
  const level = pelajaran ? LEVEL.find((l) => l.nomor === pelajaran.level) : undefined;
  const lanjutan = pelajaran ? berikutnyaDariSlug(pelajaran.slug) : undefined;

  return (
    <PerekamVideo
      antrian={antrian}
      pelajaran={pelajaran}
      namaTingkat={level?.nama ?? ""}
      berikutnya={lanjutan?.slug ? { nomor: lanjutan.nomor, judul: lanjutan.judul } : undefined}
      lanjut={lanjut === "1"}
    />
  );
}
