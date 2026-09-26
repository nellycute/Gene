import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 4.7 — Membaca silsilah keluarga
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Tambahan (tidak ada di ketiga buku
 * rujukan), mengikuti lambang silsilah baku (Bennett dkk., 2008). Menyentuh
 * penyakit: bahan belajar, bukan nasihat medis.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 4 (Kelamin3D).
 */

export const silsilah: Pelajaran = {
  slug: "membaca-silsilah-keluarga",
  nomor: "4.7",
  level: 4,
  judul: "Membaca silsilah keluarga",
  ringkas:
    "Silsilah memakai kotak (laki-laki), lingkaran (perempuan), dan lambang terisi untuk yang menampakkan sifat. Pola autosom dominan muncul di setiap generasi; autosom resesif bisa melompati generasi; terpaut X resesif terutama pada laki-laki dan diwariskan lewat ibu pembawa.",
  tingkat: "Menengah",
  animasi: "kelamin",
  draf: true,

  adegan: [
    {
      id: "lambang",
      tajuk: "Lambang silsilah",
      tahap: "silsilah",
      fokus: "lambang",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Kotak berarti laki-laki", fokus: "lambang", label: "□ laki-laki · ○ perempuan" },
        { kata: "diisi", fokus: "lambang", label: "Terisi: menampakkan sifat" },
        { kata: "garis mendatar", fokus: "lambang", label: "Garis mendatar: perkawinan" },
      ],
      narasi:
        "Silsilah (pedigree) menggambarkan pewarisan sifat dalam satu keluarga. Kotak berarti laki-laki, lingkaran perempuan. Lambang yang diisi berarti menampakkan sifat, dan garis mendatar di antara dua lambang menandai perkawinan.",
    },
    {
      id: "generasi",
      tajuk: "Generasi dan anak",
      tahap: "silsilah",
      fokus: "lambang",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "satu baris", fokus: "lambang", label: "Satu generasi = satu baris (I, II, III)" },
        { kata: "digantung", fokus: "lambang", label: "Anak di bawah orang tuanya, tertua di kiri" },
      ],
      narasi:
        "Setiap generasi ditulis dalam satu baris dan diberi angka Romawi. Anak-anak digantung pada satu garis di bawah orang tuanya, diurutkan dari yang tertua di kiri. Lambang setengah terisi dipakai untuk pembawa.",
    },
    {
      id: "autosom-dominan",
      tajuk: "Autosom dominan",
      tahap: "silsilah",
      fokus: "ad",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Pola autosom dominan", fokus: "ad", label: "Autosom dominan" },
        { kata: "setiap generasi", fokus: "ad", label: "Muncul di setiap generasi" },
        { kata: "setidaknya satu orang tua", fokus: "ad", label: "Penderita punya orang tua penderita" },
      ],
      narasi:
        "Pola autosom dominan: sifat muncul di setiap generasi, laki-laki dan perempuan sama-sama terkena, dan setiap penderita punya setidaknya satu orang tua penderita. Contohnya penyakit Huntington.",
    },
    {
      id: "autosom-resesif",
      tajuk: "Autosom resesif",
      tahap: "silsilah",
      fokus: "ar",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Pola autosom resesif", fokus: "ar", label: "Autosom resesif" },
        { kata: "Dua orang tua normal", fokus: "ar", label: "Orang tua pembawa → ¼ anak penderita" },
        { kata: "antarkerabat", fokus: "ar", label: "Kawin kerabat memperbesar peluang" },
      ],
      narasi:
        "Pola autosom resesif: sifat bisa melompati generasi. Dua orang tua normal yang keduanya pembawa dapat mempunyai anak penderita, dengan peluang seperempat. Perkawinan antarkerabat memperbesar peluang ini. Contohnya albinisme.",
    },
    {
      id: "terpaut-x",
      tajuk: "Terpaut X resesif",
      tahap: "silsilah",
      fokus: "xr",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Pola terpaut X resesif", fokus: "xr", label: "Terpaut X resesif" },
        { kata: "kakek ke cucu", fokus: "xr", label: "Kakek → ibu pembawa → cucu laki-laki" },
        { kata: "tidak pernah mewariskannya", fokus: "xr", label: "Ayah → anak laki-laki: tidak pernah" },
      ],
      narasi:
        "Pola terpaut X resesif: penderitanya jauh lebih banyak laki-laki, dan sifat diwariskan dari kakek ke cucu laki-laki melalui anak perempuan pembawa. Ayah penderita tidak pernah mewariskannya kepada anak laki-lakinya.",
    },
    {
      id: "ternak",
      tajuk: "Silsilah ternak",
      tahap: "silsilah",
      fokus: "ternak",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "kawin sedarah", fokus: "ternak", label: "Hindari kawin sedarah (inbreeding)" },
        { kata: "pembawa alel letal", fokus: "ternak", label: "Lacak pembawa sebelum dikawinkan" },
      ],
      narasi:
        "Silsilah juga dipakai peternak. Catatan induk dan pejantan membantu menghindari kawin sedarah (inbreeding), dan melacak pembawa alel letal sebelum dua pembawa dikawinkan.",
    },
    {
      id: "penutup",
      tajuk: "Tingkat 4 selesai",
      tahap: "silsilah",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Tingkat 4 selesai", fokus: "utuh", label: "Kelamin, pautan, pindah silang" },
        { kata: "Tingkat 5", fokus: "utuh", label: "Berikutnya: mutasi dan variasi" },
      ],
      narasi:
        "Tingkat 4 selesai. Kita sudah melihat bagaimana kromosom kelamin, pautan, dan pindah silang mengubah pola Mendel. Berikutnya Tingkat 5: bagaimana materi genetik itu sendiri berubah — mutasi.",
    },
  ],

  poinKunci: [
    "Lambang: □ laki-laki, ○ perempuan, terisi = menampakkan sifat, setengah terisi atau bertitik = pembawa, garis mendatar = perkawinan, garis ganda = perkawinan kerabat.",
    "Autosom dominan: muncul setiap generasi; kedua jenis kelamin sama; penderita punya orang tua penderita (contoh: penyakit Huntington, akondroplasia).",
    "Autosom resesif: bisa melompati generasi; anak penderita dari orang tua normal pembawa (¼); sering pada perkawinan kerabat (contoh: albinisme, talasemia β).",
    "Terpaut X resesif: kebanyakan laki-laki; menurun kakek → ibu pembawa → cucu laki-laki; tidak ada pewarisan ayah ke anak laki-laki (contoh: hemofilia, buta warna).",
    "Peternak memakai silsilah untuk menghitung koefisien inbreeding dan menghindari kawin dua pembawa alel letal. Ini bahan belajar, bukan nasihat medis atau konseling genetik.",
  ],

  istilah: [
    { id: "Silsilah", en: "pedigree", arti: "Diagram pewarisan sifat dalam satu keluarga." },
    { id: "Proband", en: "proband", arti: "Anggota keluarga yang pertama kali diperiksa." },
    { id: "Autosom dominan", en: "autosomal dominant", arti: "Pola pewarisan alel dominan di autosom." },
    { id: "Autosom resesif", en: "autosomal recessive", arti: "Pola pewarisan alel resesif di autosom." },
    { id: "Kawin sedarah", en: "inbreeding", arti: "Perkawinan antara individu yang berkerabat." },
  ],

  rujukan: [
    { teks: "Bennett RL, dkk. Standardized human pedigree nomenclature: update and assessment. Journal of Genetic Counseling 17:424–433, 2008." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 2 dan 4." },
    { teks: "Nicholas FW. Introduction to Veterinary Genetics, edisi ke-3. Wiley-Blackwell, 2010." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 14.4." },
  ],
};
