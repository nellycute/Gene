import type { Metadata } from "next";
import { KELOMPOK_WARNA } from "@/lib/warna";

export const metadata: Metadata = {
  title: "Peta Warna",
  description:
    "Daftar lengkap warna tetap setiap bagian biologi di Ruang Genetika — dari organel sel sampai basa nitrogen.",
};

export default function HalamanPetaWarna() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        Peta Warna
      </h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-teks-lembut">
        Setiap bagian biologi di situs ini punya satu warna tetap yang tidak
        pernah berubah. Mitokondria di pelajaran pertama berwarna sama persis
        dengan mitokondria di pelajaran terakhir. Halaman ini adalah daftar
        lengkapnya.
      </p>

      <div className="mt-6 rounded-xl border border-garis bg-permukaan px-5 py-4">
        <p className="text-sm font-semibold">Mengapa ini penting</p>
        <p className="mt-1.5 text-sm leading-relaxed text-teks-lembut">
          Kalau warna berubah-ubah antar pelajaran, otak harus belajar ulang
          setiap kali. Dengan warna yang tetap, kamu cukup mengenalinya sekali —
          lalu di seluruh pelajaran berikutnya pengenalan itu bekerja otomatis.
          Warna juga tidak pernah jadi satu-satunya penanda: setiap bagian selalu
          disertai namanya, supaya tetap terbaca oleh penyandang buta warna.
        </p>
      </div>

      <div className="mt-12 space-y-14">
        {KELOMPOK_WARNA.map((kelompok) => (
          <section key={kelompok.judul}>
            <h2 className="text-xl font-bold tracking-tight">{kelompok.judul}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-teks-lembut">
              {kelompok.catatan}
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {kelompok.isi.map((e) => (
                <li
                  key={e.id}
                  className="flex gap-4 rounded-xl border border-garis bg-permukaan p-4"
                >
                  <span
                    className="mt-0.5 h-10 w-10 shrink-0 rounded-lg border border-black/10"
                    style={{ background: e.warna }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold leading-snug">{e.nama}</p>
                    <p className="text-sm italic text-teks-samar">{e.inggris}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-teks-lembut">
                      {e.keterangan}
                    </p>
                    <p className="urutan mt-2 text-xs uppercase text-teks-samar">
                      {e.warna}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
