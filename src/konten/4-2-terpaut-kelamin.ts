import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 4.2 — Sifat terpaut kromosom kelamin
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R1 KB2
 * tabel 1.2; R3 4.2). Hemofilia keluarga Ratu Victoria adalah hemofilia B
 * (Rogaev dkk., 2009). Menyentuh penyakit: bahan belajar, bukan nasihat medis.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 4 (Kelamin3D).
 */

export const terpautKelamin: Pelajaran = {
  slug: "sifat-terpaut-kelamin",
  nomor: "4.2",
  level: 4,
  judul: "Sifat terpaut kromosom kelamin",
  ringkas:
    "Gen di kromosom X diwariskan berbeda pada laki-laki dan perempuan. Buta warna merah-hijau dan hemofilia lebih banyak pada laki-laki; perempuan heterozigot menjadi pembawa. Pada ayam, gen bulu lurik terpaut Z dan dipakai untuk membedakan kelamin anak ayam.",
  tingkat: "Menengah",
  animasi: "kelamin",
  draf: true,

  adegan: [
    {
      id: "terpaut-x",
      tajuk: "Gen di kromosom X",
      tahap: "terpautX",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "terpaut X", fokus: "utuh", label: "Terpaut X: gen di kromosom X" },
        { kata: "Laki-laki hanya punya satu X", fokus: "pria", label: "Laki-laki: satu X → langsung tampak" },
        { kata: "Perempuan baru", fokus: "wanita", label: "Perempuan: perlu dua alel" },
      ],
      narasi:
        "Gen yang terletak di kromosom X disebut terpaut X (X-linked). Laki-laki hanya punya satu X, sehingga satu alel resesif di X-nya langsung tampak. Perempuan baru menampakkannya bila kedua X-nya membawa alel itu.",
    },
    {
      id: "buta-warna",
      tajuk: "Buta warna merah-hijau",
      tahap: "punnettX",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Buta warna merah-hijau", fokus: "utuh", label: "Buta warna merah-hijau: terpaut X" },
        { kata: "delapan persen", fokus: "utuh", label: "± 8% laki-laki · < 1% perempuan (Eropa)" },
      ],
      narasi:
        "Buta warna merah-hijau adalah contohnya. Sekitar delapan persen laki-laki keturunan Eropa mengalaminya, tetapi kurang dari satu persen perempuan. Alelnya ada pada gen pigmen penangkap cahaya di sel kerucut mata, yang terletak di kromosom X.",
    },
    {
      id: "pola-silang",
      tajuk: "Ibu pembawa × ayah normal",
      tahap: "punnettX",
      fokus: "isi",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Ibu pembawa", fokus: "isi", label: "XᴮXᵇ × XᴮY" },
        { kata: "setengah anak laki-lakinya", fokus: "putra", label: "Anak laki-laki: ½ buta warna" },
        { kata: "semua anak perempuannya", fokus: "putri", label: "Anak perempuan: normal, ½ pembawa" },
      ],
      narasi:
        "Ibu pembawa, XᴮXᵇ, menikah dengan ayah berpenglihatan normal, XᴮY. Setengah anak laki-lakinya buta warna, sedangkan semua anak perempuannya berpenglihatan normal — separuh di antaranya pembawa.",
    },
    {
      id: "hemofilia",
      tajuk: "Hemofilia keluarga kerajaan",
      tahap: "silsilahRatu",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Hemofilia", fokus: "utuh", label: "Hemofilia: darah sukar membeku" },
        { kata: "Ratu Victoria", fokus: "ratu", label: "Ratu Victoria: pembawa" },
        { kata: "menyebar", fokus: "cucu", label: "Menyebar ke keluarga kerajaan Eropa" },
      ],
      narasi:
        "Hemofilia juga terpaut X: darah sukar membeku karena salah satu faktor pembekuan tidak terbentuk. Ratu Victoria dari Inggris adalah pembawa; alelnya menyebar ke keluarga kerajaan Eropa melalui anak-anaknya.",
    },
    {
      id: "pembawa",
      tajuk: "Perempuan pembawa",
      tahap: "silsilahRatu",
      fokus: "cucu",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "pembawa (carrier)", fokus: "ratu", label: "Pembawa: normal, membawa satu alel" },
        { kata: "melompati generasi", fokus: "cucu", label: "Kakek → ibu pembawa → cucu laki-laki" },
      ],
      narasi:
        "Perempuan heterozigot disebut pembawa (carrier): ia sendiri sehat, tetapi separuh anak laki-lakinya berpeluang mewarisi alel itu. Karena itu sifat terpaut X sering tampak melompati generasi, menurun kepada cucu laki-laki melalui ibu.",
    },
    {
      id: "lurik",
      tajuk: "Ayam lurik: terpaut Z",
      tahap: "lurik",
      fokus: "utuh",
      durasi: 26,
      sorot: [],
      isyarat: [
        { kata: "bulu lurik", fokus: "utuh", label: "Lurik (barred): gen di kromosom Z" },
        { kata: "semua anak jantan lurik", fokus: "anak", label: "Anak jantan ZᴮZᵇ: lurik" },
        { kata: "semua anak betina polos", fokus: "anak", label: "Anak betina ZᵇW: polos" },
      ],
      narasi:
        "Pada ayam, gen bulu lurik (barred) terletak di kromosom Z. Betina lurik, ZᴮW, dikawinkan dengan jantan polos, ZᵇZᵇ: semua anak jantan lurik dan semua anak betina polos. Peternak bisa membedakan kelamin anak ayam sejak menetas.",
    },
  ],

  poinKunci: [
    "Terpaut X: laki-laki hemizigot (satu X), jadi satu alel resesif langsung tampak; perempuan perlu dua salinan. Sifat resesif terpaut X jauh lebih sering pada laki-laki.",
    "Buta warna merah-hijau: gen OPN1LW dan OPN1MW (pigmen sel kerucut) di Xq28. Sekitar 8% laki-laki dan 0,5% perempuan keturunan Eropa Utara.",
    "XᴮXᵇ × XᴮY → anak perempuan ½ XᴮXᴮ, ½ XᴮXᵇ (semua normal); anak laki-laki ½ XᴮY normal, ½ XᵇY buta warna. Ayah tidak pernah mewariskan X kepada anak laki-lakinya.",
    "Hemofilia A (faktor VIII) dan B (faktor IX) terpaut X. Keluarga Ratu Victoria membawa hemofilia B (Rogaev dkk., 2009). Ini bahan belajar, bukan nasihat medis.",
    "Ayam: gen lurik (B) di kromosom Z. ZᴮW (betina lurik) × ZᵇZᵇ (jantan polos) → jantan ZᴮZᵇ lurik, betina ZᵇW polos — dipakai untuk memilah kelamin anak ayam (sex-linked cross).",
  ],

  istilah: [
    { id: "Terpaut X", en: "X-linked", arti: "Gen yang terletak di kromosom X." },
    { id: "Hemizigot", en: "hemizygous", arti: "Hanya punya satu salinan gen, seperti gen X pada laki-laki." },
    { id: "Pembawa", en: "carrier", arti: "Heterozigot yang membawa alel resesif tanpa menampakkannya." },
    { id: "Buta warna", en: "color blindness", arti: "Tidak mampu membedakan warna tertentu, umumnya merah dan hijau." },
    { id: "Hemofilia", en: "hemophilia", arti: "Gangguan pembekuan darah karena faktor pembekuan tak terbentuk." },
    { id: "Lurik", en: "barred", arti: "Bulu ayam bergaris hitam-putih; gennya di kromosom Z." },
  ],

  rujukan: [
    { teks: "Morgan TH. Sex limited inheritance in Drosophila. Science 32:120–122, 1910." },
    { teks: "Rogaev EI, dkk. Genotype analysis identifies the cause of the “royal disease”. Science 326:817, 2009." },
    { teks: "Neitz J, Neitz M. The genetics of normal and defective color vision. Vision Research 51:633–651, 2011." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 4.2." },
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak (LUHT4326), Modul 1. Universitas Terbuka. KB 2, tabel 1.2." },
  ],
};
