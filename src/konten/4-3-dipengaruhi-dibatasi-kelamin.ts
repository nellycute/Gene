import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 4.3 — Sifat dipengaruhi dan dibatasi kelamin
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R1 KB2).
 * Kebotakan disajikan dengan model klasik satu gen (buku ajar); kenyataannya
 * poligenik, termasuk gen AR di kromosom X — disebut di Ringkasan.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 4 (Kelamin3D).
 */

export const dipengaruhiKelamin: Pelajaran = {
  slug: "sifat-dipengaruhi-dibatasi-kelamin",
  nomor: "4.3",
  level: 4,
  judul: "Sifat dipengaruhi dan dibatasi kelamin",
  ringkas:
    "Gennya di autosom, tetapi hormon kelamin mengubah cara ia tampak. Dipengaruhi kelamin: satu genotip, fenotip berbeda pada jantan dan betina (kebotakan, tanduk domba, warna mahoni sapi Ayrshire). Dibatasi kelamin: hanya tampak pada satu jenis kelamin (produksi susu).",
  tingkat: "Menengah",
  animasi: "kelamin",
  draf: true,

  adegan: [
    {
      id: "bukan-terpaut",
      tajuk: "Bukan terpaut kelamin",
      tahap: "botak",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "di autosom", fokus: "utuh", label: "Gen di autosom" },
        { kata: "hormon kelamin", fokus: "utuh", label: "Ekspresinya diatur hormon kelamin" },
      ],
      narasi:
        "Tidak semua sifat yang berbeda antara jantan dan betina terletak di kromosom kelamin. Banyak gennya ada di autosom, tetapi ekspresinya dipengaruhi hormon kelamin. Ada dua jenis: dipengaruhi kelamin dan dibatasi kelamin.",
    },
    {
      id: "kebotakan",
      tajuk: "Kebotakan",
      tahap: "botak",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "dipengaruhi kelamin", fokus: "utuh", label: "Dipengaruhi kelamin" },
        { kata: "Pada laki-laki", fokus: "pria", label: "Laki-laki: BB, Bb botak" },
        { kata: "Pada perempuan", fokus: "wanita", label: "Perempuan: hanya BB, lebih ringan" },
      ],
      narasi:
        "Kebotakan pola (pattern baldness) contoh sifat yang dipengaruhi kelamin (sex-influenced). Pada laki-laki alel botak berperilaku dominan: satu salinan cukup. Pada perempuan ia berperilaku resesif, dan tampaknya pun biasanya lebih ringan.",
    },
    {
      id: "tanduk-domba",
      tajuk: "Tanduk domba",
      tahap: "domba",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Dorset", fokus: "induk", label: "Dorset bertanduk × Suffolk tak bertanduk" },
        { kata: "anak jantan heterozigot bertanduk", fokus: "anak", label: "Jantan Hh: bertanduk" },
        { kata: "anak betina heterozigot", fokus: "anak", label: "Betina Hh: tak bertanduk" },
      ],
      narasi:
        "Contoh ternak: tanduk domba. Domba Dorset yang bertanduk disilangkan dengan Suffolk yang tak bertanduk: anak jantan heterozigot bertanduk, sedangkan anak betina heterozigot tidak. Alelnya sama; hormon kelaminlah yang membedakan.",
    },
    {
      id: "mahoni",
      tajuk: "Sapi Ayrshire",
      tahap: "ayrshire",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "mahoni", fokus: "utuh", sorot: ["buluMahoni"], label: "Ayrshire: mahoni-putih atau merah-putih" },
        { kata: "jantan berwarna mahoni", fokus: "jantan", label: "Jantan heterozigot: mahoni" },
        { kata: "betina heterozigot merah", fokus: "betina", sorot: ["buluMerah"], label: "Betina heterozigot: merah" },
      ],
      narasi:
        "Warna mahoni pada sapi Ayrshire juga dipengaruhi kelamin. Pada genotip heterozigot yang sama, sapi jantan berwarna mahoni-putih, sedangkan sapi betina heterozigot merah-putih.",
    },
    {
      id: "dibatasi",
      tajuk: "Dibatasi kelamin",
      tahap: "dibatasi",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "dibatasi kelamin", fokus: "utuh", label: "Dibatasi kelamin: tampak pada satu jenis kelamin" },
        { kata: "Produksi susu", fokus: "susu", label: "Susu: hanya pada betina" },
        { kata: "pejantan juga", fokus: "pejantan", label: "Pejantan tetap mewariskan gennya" },
      ],
      narasi:
        "Sifat yang dibatasi kelamin (sex-limited) hanya tampak pada satu jenis kelamin, walau gennya dibawa keduanya. Produksi susu hanya tampak pada betina, tetapi pejantan juga mewariskan gen produksi susu kepada anak-anak betinanya.",
    },
    {
      id: "uji-keturunan",
      tajuk: "Uji keturunan",
      tahap: "dibatasi",
      fokus: "pejantan",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "anak-anak betinanya", fokus: "anak", label: "Pejantan dinilai dari anak betinanya" },
        { kata: "uji keturunan", fokus: "anak", label: "Uji keturunan (progeny test)" },
      ],
      narasi:
        "Karena produksi susu tak tampak pada pejantan, mutu genetik pejantan sapi perah dinilai dari produksi susu anak-anak betinanya. Cara ini disebut uji keturunan (progeny test). Kokok dan bulu ekor panjang ayam jantan juga sifat yang dibatasi kelamin.",
    },
  ],

  poinKunci: [
    "Dipengaruhi kelamin (sex-influenced): gen autosom; genotip yang sama menampakkan fenotip berbeda pada jantan dan betina, biasanya karena hormon.",
    "Model klasik kebotakan: BB botak pada kedua jenis kelamin; Bb botak hanya pada laki-laki; bb tidak botak. Kenyataannya kebotakan pola bersifat poligenik dan melibatkan gen reseptor androgen (AR) di kromosom X.",
    "Domba: Dorset (HH, bertanduk) × Suffolk (hh, tak bertanduk) → jantan Hh bertanduk, betina Hh tak bertanduk.",
    "Sapi Ayrshire: MM mahoni-putih pada keduanya; mm merah-putih pada keduanya; Mm mahoni-putih pada jantan, merah-putih pada betina.",
    "Dibatasi kelamin (sex-limited): hanya tampak pada satu jenis kelamin — produksi susu, kokok, bulu ekor jantan. Pejantan sapi perah dinilai lewat uji keturunan.",
  ],

  istilah: [
    { id: "Dipengaruhi kelamin", en: "sex-influenced", arti: "Fenotip satu genotip berbeda antara jantan dan betina." },
    { id: "Dibatasi kelamin", en: "sex-limited", arti: "Sifat yang hanya tampak pada satu jenis kelamin." },
    { id: "Hormon kelamin", en: "sex hormone", arti: "Hormon seperti testosteron dan estrogen." },
    { id: "Uji keturunan", en: "progeny test", arti: "Menilai mutu genetik induk dari penampilan anak-anaknya." },
    { id: "Mahoni", en: "mahogany", arti: "Merah kecokelatan tua pada bulu sapi Ayrshire." },
  ],

  rujukan: [
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak (LUHT4326), Modul 1. Universitas Terbuka. KB 2." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 4." },
    { teks: "Johnston SE, dkk. Life history trade-offs at a single locus maintain sexually selected genetic variation. Nature 502:93–95, 2013." },
    { teks: "Heilmann-Heimbach S, dkk. Meta-analysis identifies novel risk loci and yields systematic insights into the biology of male-pattern baldness. Nature Communications 8:14694, 2017." },
    { teks: "Nicholas FW. Introduction to Veterinary Genetics, edisi ke-3. Wiley-Blackwell, 2010." },
  ],
};
