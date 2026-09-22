import type { Metadata } from "next";
import { KELOMPOK_WARNA, TIGA_JINGGA } from "@/lib/warna";
import { TINGKAT } from "@/lib/tingkat";
import { LEVEL } from "@/lib/daftar-pelajaran";

export const metadata: Metadata = {
  title: "Peta Warna",
  description:
    "Daftar lengkap warna tetap setiap bagian biologi di Ruang Genetika — dari organel sel sampai basa nitrogen.",
};

export default function HalamanPetaWarna() {
  return (
    <div className="anim-masuk-naik mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-[26px] font-extrabold tracking-tight sm:text-[30px]">
        Peta Warna
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-teks-lembut">
        Setiap bagian biologi punya satu warna tetap yang tidak pernah berubah.
        Mitokondria di pelajaran pertama berwarna sama persis dengan mitokondria
        di pelajaran terakhir. Warna tidak pernah jadi satu-satunya penanda —
        nama bagian selalu menyertainya.
      </p>

      {/* ---------- TIGA JINGGA — untuk ditinjau Nely ---------- */}
      <section className="mt-10 rounded-2xl border border-garis bg-permukaan p-5 sm:p-6">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-teks-samar">
          Perlu ditinjau
        </p>
        <h2 className="mt-1 text-lg font-bold tracking-tight">
          Tiga jingga yang berdekatan
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-teks-lembut">
          Setelah palet dicerahkan, tiga warna ini berada di rona yang sama.
          Pengamannya: mitokondria dan RNA tidak pernah menyala bersamaan dalam
          satu adegan, dan basa T selalu tampil dengan hurufnya. Apakah jaraknya
          sudah cukup? Kamu yang memutuskan.
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {TIGA_JINGGA.map((e) => (
            <div key={e.id} className="text-center">
              <div
                className="aspect-[4/3] w-full rounded-xl"
                style={{ background: e.warna }}
                aria-hidden="true"
              />
              <p className="mt-2.5 text-sm font-semibold leading-tight">{e.nama}</p>
              <p className="urutan mt-0.5 text-[11px] uppercase text-teks-samar">
                {e.warna}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- 30 WARNA BIOLOGI ---------- */}
      <div className="mt-12 space-y-12">
        {KELOMPOK_WARNA.map((kelompok) => (
          <section key={kelompok.judul}>
            <h2 className="text-lg font-bold tracking-tight">{kelompok.judul}</h2>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-teks-lembut">
              {kelompok.catatan}
            </p>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {kelompok.isi.map((e) => (
                <li
                  key={e.id}
                  className="flex gap-3.5 rounded-xl border border-garis bg-permukaan p-3.5"
                >
                  <span
                    className="mt-0.5 h-10 w-10 shrink-0 rounded-lg"
                    style={{ background: e.warna }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold leading-snug">
                      {e.nama}{" "}
                      <span className="font-normal italic text-teks-samar">
                        ({e.inggris})
                      </span>
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-teks-lembut">
                      {e.keterangan}
                    </p>
                    <p className="urutan mt-1.5 text-[10.5px] uppercase text-teks-samar">
                      {e.warna}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* ---------- 7 WARNA TINGKAT ---------- */}
        <section>
          <h2 className="text-lg font-bold tracking-tight">Tujuh warna tingkat</h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-teks-lembut">
            Satu-satunya warna yang boleh dimiliki antarmuka. Hanya muncul sebagai
            batang tipis, bingkai, label kecil, dan tujuh strip pada logo — tidak
            pernah jadi latar besar atau tombol, tidak pernah masuk panggung
            animasi. Karena itu tidak ada yang bisa disangka warna organel.
          </p>
          <ul className="mt-5 divide-y divide-garis overflow-hidden rounded-xl border border-garis bg-permukaan">
            {TINGKAT.map((t) => {
              const level = LEVEL.find((l) => l.nomor === t.nomor);
              return (
                <li key={t.nomor} className="flex items-center gap-3.5 p-3.5">
                  <span
                    className="h-9 w-1 shrink-0 rounded-full"
                    style={{ background: t.batang }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em]"
                    style={{ color: t.teks }}
                  >
                    Tingkat {t.nomor}
                  </span>
                  <span className="font-semibold">{level?.nama}</span>
                  <span className="urutan ml-auto text-[10.5px] uppercase text-teks-samar">
                    {t.batang}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
