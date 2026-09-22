import Link from "next/link";
import { SelHewan } from "@/animasi/SelHewan";
import { Lencana } from "@/components/Lencana";
import { LEVEL, JUMLAH_RENCANA, PELAJARAN_SIAP, cariPelajaran } from "@/lib/daftar-pelajaran";
import { formatDurasi, totalDurasi } from "@/lib/tipe";

export default function Beranda() {
  const pilot = PELAJARAN_SIAP[0];

  return (
    <>
      {/* ================= PEMBUKA ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-4 pt-12 sm:px-6 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-garis bg-permukaan px-3.5 py-1.5 text-xs font-semibold text-teks-lembut">
              <span className="h-2 w-2 rounded-full bg-aksen" />
              Gratis · tanpa perlu mendaftar
            </p>

            <h1 className="text-[2.15rem] font-extrabold leading-[1.12] tracking-tight sm:text-5xl">
              Genetika, dijelaskan lewat{" "}
              <span className="text-aksen">warna</span> yang tidak pernah
              berubah.
            </h1>

            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-teks-lembut">
              Dari pengenalan sel, DNA, dan RNA sampai teknik sequencing dan
              penerapannya. Setiap bagian biologi punya satu warna tetap di
              seluruh materi — supaya yang kamu kenali di pelajaran pertama
              masih kamu kenali di pelajaran terakhir.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {pilot && (
                <Link
                  href={`/pelajaran/${pilot.slug}`}
                  className="rounded-xl bg-aksen px-6 py-3 font-semibold text-white shadow-sm transition hover:opacity-90"
                >
                  Mulai dari pelajaran pertama
                </Link>
              )}
              <Link
                href="#materi"
                className="rounded-xl border border-garis-tegas px-6 py-3 font-semibold text-teks transition hover:bg-permukaan"
              >
                Lihat seluruh materi
              </Link>
            </div>

            <p className="mt-6 text-sm text-teks-samar">
              {PELAJARAN_SIAP.length} pelajaran siap ditonton ·{" "}
              {JUMLAH_RENCANA} pelajaran direncanakan
            </p>
          </div>

          {/* Sel utuh dengan seluruh warna menyala — inilah janji situs ini */}
          <div className="rounded-3xl border border-garis bg-permukaan p-3 shadow-[var(--bayang)] sm:p-5">
            <div className="aspect-[800/570] w-full">
              <SelHewan sorot={[]} tampilkanLabel={false} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= TIGA JANJI ================= */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-3">
          <Janji judul="Warna sebagai alat belajar">
            Mitokondria selalu jingga, inti sel selalu ungu, DNA selalu biru —
            di setiap pelajaran, dari yang paling dasar sampai yang paling
            rumit.
          </Janji>
          <Janji judul="Istilah Inggris selalu didampingkan">
            Kamu belajar dalam bahasa Indonesia, tapi tetap siap saat harus
            membaca jurnal berbahasa Inggris.
          </Janji>
          <Janji judul="Terbuka untuk dipakai mengajar">
            Guru dan dosen bebas memakai dan menyebarkan materi ini, asalkan
            mencantumkan sumbernya.
          </Janji>
        </div>
      </section>

      {/* ================= DAFTAR MATERI ================= */}
      <section id="materi" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-8 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Seluruh materi
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-teks-lembut">
          Tujuh tingkat, tersusun berurutan. Kamu bisa mulai dari awal, atau
          langsung melompat ke topik yang kamu butuhkan.
        </p>

        <div className="mt-10 space-y-12">
          {LEVEL.map((level) => (
            <div key={level.nomor}>
              <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-bold tracking-tight">
                  <span className="text-teks-samar">Level {level.nomor}</span>{" "}
                  · {level.nama}
                </h3>
                <Lencana tingkat={level.tingkat} />
              </div>
              <p className="mb-5 max-w-2xl text-sm leading-relaxed text-teks-lembut">
                {level.ringkas}
              </p>

              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {level.isi.map((butir) => {
                  const pelajaran = butir.slug ? cariPelajaran(butir.slug) : undefined;
                  return (
                    <li key={butir.nomor}>
                      {pelajaran ? (
                        <Link
                          href={`/pelajaran/${pelajaran.slug}`}
                          className="group flex h-full flex-col rounded-xl border border-garis bg-permukaan p-4 transition hover:border-aksen hover:shadow-[var(--bayang)]"
                        >
                          <span className="font-mono text-xs font-semibold text-aksen">
                            {butir.nomor}
                          </span>
                          <span className="mt-1.5 font-semibold leading-snug">
                            {butir.judul}
                          </span>
                          <span className="mt-auto pt-3 text-xs text-teks-samar">
                            {formatDurasi(totalDurasi(pelajaran))} ·{" "}
                            {pelajaran.adegan.length} adegan
                          </span>
                        </Link>
                      ) : (
                        <div className="flex h-full flex-col rounded-xl border border-dashed border-garis p-4 opacity-70">
                          <span className="font-mono text-xs font-semibold text-teks-samar">
                            {butir.nomor}
                          </span>
                          <span className="mt-1.5 font-medium leading-snug text-teks-lembut">
                            {butir.judul}
                          </span>
                          <span className="mt-auto pt-3 text-xs text-teks-samar">
                            Sedang disiapkan
                          </span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Janji({ judul, children }: { judul: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-garis bg-permukaan p-6">
      <h3 className="font-bold tracking-tight">{judul}</h3>
      <p className="mt-2 text-sm leading-relaxed text-teks-lembut">{children}</p>
    </div>
  );
}
