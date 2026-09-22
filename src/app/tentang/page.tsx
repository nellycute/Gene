import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Ruang Genetika dibuat oleh Nely, lulusan bidang genetika, untuk menutup kelangkaan materi genetika berkualitas dalam bahasa Indonesia.",
};

export default function HalamanTentang() {
  return (
    <div className="anim-masuk-naik mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tentang Ruang Genetika
      </h1>

      <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-teks-lembut">
        <p>
          Materi genetika yang baik dalam bahasa Indonesia masih sangat langka —
          terutama untuk topik yang justru paling dibutuhkan mahasiswa: teknik
          laboratorium, sequencing, dan bioinformatika. Ruang Genetika dibuat
          untuk menutup celah itu.
        </p>
        <p>
          Situs ini dibuat oleh <strong className="text-teks">Nely</strong>,
          lulusan bidang genetika. Setiap naskah diperiksa akurasinya sebelum
          terbit, dan setiap pelajaran mencantumkan rujukan yang dipakai.
        </p>

        <h2 className="pt-6 text-xl font-bold tracking-tight text-teks">
          Cara materi ini disusun
        </h2>
        <p>
          Semua gambar di situs ini digambar dari nol sebagai grafik vektor —
          tidak ada satu pun yang diambil dari buku teks atau jurnal. Karena
          gambarnya dibuat dengan kode, setiap koreksi ilmiah bisa diterapkan
          dalam hitungan menit, bukan dengan merekam ulang video.
        </p>
        <p>
          Istilah teknis selalu disertai padanan Inggrisnya pada kemunculan
          pertama. Tujuannya sederhana: kamu belajar dengan nyaman dalam bahasa
          Indonesia, tapi tidak kaget saat harus membaca jurnal asli.
        </p>

        <h2 className="pt-6 text-xl font-bold tracking-tight text-teks">
          Gratis, dan boleh kamu pakai
        </h2>
        <p>
          Tidak ada akun, tidak ada langganan, tidak ada bagian yang dikunci.
          Materi dibagikan dengan lisensi Creative Commons BY-SA 4.0 — guru dan
          dosen bebas memakainya untuk mengajar, asalkan mencantumkan sumbernya
          dan tetap membukanya untuk orang lain.
        </p>

        <h2 className="pt-6 text-xl font-bold tracking-tight text-teks">
          Catatan penting
        </h2>
        <p>
          Isi situs ini adalah bahan belajar, bukan nasihat medis. Materi yang
          menyinggung penyakit, tes genetik, atau terapi tidak boleh dipakai
          untuk menilai kondisi kesehatan diri sendiri maupun orang lain.
          Untuk itu, temui dokter atau konselor genetik.
        </p>
      </div>
    </div>
  );
}
