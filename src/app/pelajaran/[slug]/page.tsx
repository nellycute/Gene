import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PemutarPelajaran } from "@/components/PemutarPelajaran";
import { Lencana } from "@/components/Lencana";
import { PELAJARAN_SIAP, cariPelajaran, LEVEL } from "@/lib/daftar-pelajaran";
import { formatDurasi, totalDurasi } from "@/lib/tipe";

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

export default async function HalamanPelajaran({ params }: Props) {
  const { slug } = await params;
  const pelajaran = cariPelajaran(slug);
  if (!pelajaran) notFound();

  const level = LEVEL.find((l) => l.nomor === pelajaran.level);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* ---------- judul ---------- */}
      <nav className="mb-6 text-sm text-teks-lembut">
        <Link href="/#materi" className="hover:text-teks">
          Seluruh materi
        </Link>
        {level && (
          <>
            <span className="px-2 text-teks-samar">/</span>
            <span>
              Level {level.nomor} · {level.nama}
            </span>
          </>
        )}
      </nav>

      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="font-mono text-sm font-bold text-aksen">
          {pelajaran.nomor}
        </span>
        <Lencana tingkat={pelajaran.tingkat} />
        <span className="text-sm text-teks-samar">
          {formatDurasi(totalDurasi(pelajaran))} · {pelajaran.adegan.length} adegan
        </span>
      </div>

      <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
        {pelajaran.judul}
      </h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-teks-lembut">
        {pelajaran.ringkas}
      </p>

      {/* ---------- peringatan draf ---------- */}
      {pelajaran.draf && (
        <div className="mt-6 rounded-xl border border-[#E0A32E] bg-sorot px-5 py-4">
          <p className="text-sm font-semibold">Naskah ini masih draf</p>
          <p className="mt-1 text-sm leading-relaxed text-teks-lembut">
            Isinya belum ditinjau ulang untuk akurasi ilmiah, jadi jangan dipakai
            sebagai rujukan dulu. Peringatan ini akan hilang setelah tinjauan selesai.
          </p>
        </div>
      )}

      {/* ---------- pemutar ---------- */}
      <div className="mt-8">
        <PemutarPelajaran pelajaran={pelajaran} />
      </div>

      <p className="mt-3 text-center text-xs text-teks-samar">
        Tekan spasi untuk memutar dan menjeda · panah kiri dan kanan untuk
        berpindah adegan
      </p>

      {/* ---------- poin kunci ---------- */}
      <section className="mt-14">
        <h2 className="text-xl font-bold tracking-tight">Yang perlu diingat</h2>
        <ul className="mt-5 space-y-3">
          {pelajaran.poinKunci.map((poin, i) => (
            <li
              key={i}
              className="flex gap-3.5 rounded-xl border border-garis bg-permukaan p-4"
            >
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-aksen-lembut text-xs font-bold text-aksen-teks">
                {i + 1}
              </span>
              <span className="text-[15px] leading-relaxed">{poin}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- daftar istilah ---------- */}
      <section className="mt-14">
        <h2 className="text-xl font-bold tracking-tight">
          Istilah dalam pelajaran ini
        </h2>
        <p className="mt-2 text-sm text-teks-lembut">
          Padanan Inggris disertakan supaya kamu siap saat membaca literatur asli.
        </p>
        <dl className="mt-5 divide-y divide-garis overflow-hidden rounded-xl border border-garis bg-permukaan">
          {pelajaran.istilah.map((it) => (
            <div key={it.id} className="grid gap-1 p-4 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-4">
              <dt>
                <span className="font-semibold">{it.id}</span>
                <span className="block text-sm italic text-teks-samar">
                  {it.en}
                </span>
              </dt>
              <dd className="text-[15px] leading-relaxed text-teks-lembut">
                {it.arti}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- rujukan ---------- */}
      <section className="mt-14">
        <h2 className="text-xl font-bold tracking-tight">Rujukan</h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-teks-lembut">
          {pelajaran.rujukan.map((r, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-teks-samar">—</span>
              {r.url ? (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-teks"
                >
                  {r.teks}
                </a>
              ) : (
                <span>{r.teks}</span>
              )}
            </li>
          ))}
        </ul>
        {pelajaran.ditinjau && (
          <p className="mt-4 text-xs text-teks-samar">
            Terakhir ditinjau: {pelajaran.ditinjau}
          </p>
        )}
      </section>

      {/* ---------- lanjut ---------- */}
      <div className="mt-16 rounded-2xl border border-garis bg-latar-lembut p-6 text-center">
        <p className="text-sm text-teks-lembut">
          Pelajaran berikutnya sedang disiapkan.
        </p>
        <Link
          href="/#materi"
          className="mt-4 inline-block rounded-xl border border-garis-tegas bg-permukaan px-5 py-2.5 text-sm font-semibold transition hover:border-aksen"
        >
          Kembali ke daftar materi
        </Link>
      </div>
    </article>
  );
}
