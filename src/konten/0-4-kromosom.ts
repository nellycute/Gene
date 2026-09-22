import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 0.4 — Kromosom, kariotipe, diploid dan haploid
 *
 * STATUS: DRAF. Ditulis Claude, BELUM ditinjau Nely.
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Adegan "tiga-dimensi" memakai tampilan 3D — salah satu dari enam yang
 * diizinkan KEPUTUSAN-DESAIN.md §3.
 */

export const kromosom: Pelajaran = {
  slug: "kromosom-kariotipe",
  nomor: "0.4",
  level: 0,
  judul: "Kromosom, Kariotipe, Diploid dan Haploid",
  ringkas:
    "Bagaimana dua meter DNA dipadatkan menjadi kromosom yang terlihat di mikroskop, apa saja bagiannya, mengapa manusia punya 46, dan apa arti diploid dan haploid.",
  tingkat: "Dasar",
  animasi: "kromosom",
  draf: true,

  adegan: [
    {
      id: "pembuka",
      tajuk: "Dua meter dalam enam mikrometer",
      tahap: "kromatin",
      durasi: 28,
      sorot: ["kromatin"],
      narasi:
        "Dua meter DNA dalam ruang enam mikrometer. Caranya: dipadatkan bertingkat, seperti kabel panjang yang digulung, lalu gulungannya digulung lagi. Saat sel hendak membelah, pemadatan itu mencapai puncaknya — dan lahirlah bentuk yang bisa dilihat di mikroskop: kromosom (chromosome).",
    },
    {
      id: "pemadatan",
      tajuk: "Lima tingkat pemadatan",
      tahap: "pemadatan",
      durasi: 30,
      sorot: ["dna", "histon", "kromatin"],
      narasi:
        "Lima tingkat. DNA telanjang, dua nanometer. Melilit histon menjadi nukleosom, sebelas nanometer. Nukleosom menggulung jadi serat tiga puluh nanometer. Serat membentuk lengkung-lengkung. Lengkung memadat menjadi kromosom setebal tujuh ratus nanometer — sekitar sepuluh ribu kali lebih pendek dari DNA yang diluruskan.",
    },
    {
      id: "anatomi",
      tajuk: "Bagian-bagian kromosom",
      tahap: "anatomi",
      durasi: 27,
      sorot: ["kromatin", "sentromer", "telomer"],
      narasi:
        "Kromosom yang siap membelah berbentuk X. Dua batang identiknya disebut kromatid saudara (sister chromatid). Titik pinggang tempat keduanya menempel adalah sentromer (centromere). Lengan pendek diberi nama p, lengan panjang q, dan tiap ujungnya dilindungi telomer (telomere).",
    },
    {
      id: "replikasi",
      tajuk: "Satu kromatid, lalu dua",
      tahap: "replikasi",
      durasi: 26,
      sorot: ["kromatin", "sentromer"],
      narasi:
        "Bentuk X itu tidak selalu ada. Sepanjang hidupnya, kromosom hanya satu batang. Sebelum sel membelah, DNA-nya disalin, dan hasil salinan tetap menempel di sentromer — itulah kromatid kedua. Satu kromosom, dua kromatid: DNA-nya persis sama.",
    },
    {
      id: "kariotipe",
      tajuk: "Kariotipe: 46 kromosom",
      tahap: "kariotipe",
      durasi: 25,
      sorot: ["kromatin"],
      narasi:
        "Manusia punya empat puluh enam kromosom. Kalau dipotret saat memadat lalu dijajarkan menurut ukuran, hasilnya disebut kariotipe (karyotype): dua puluh dua pasang autosom (autosome), ditambah sepasang kromosom kelamin (sex chromosome).",
    },
    {
      id: "homolog",
      tajuk: "Sepasang homolog",
      tahap: "homolog",
      durasi: 26,
      sorot: ["kromatin", "kromosomAyah"],
      narasi:
        "Mengapa berpasangan? Karena kamu menerima satu set dua puluh tiga kromosom dari ibu, dan satu set lagi dari ayah. Dua kromosom sepasang disebut homolog (homologous): membawa gen yang sama, di posisi yang sama, tapi versinya bisa berbeda.",
    },
    {
      id: "ploidi",
      tajuk: "Diploid dan haploid",
      tahap: "ploidi",
      durasi: 26,
      sorot: ["kromatin", "kromosomAyah"],
      narasi:
        "Sel dengan dua set lengkap disebut diploid (diploid), ditulis 2n — pada manusia, 2n = 46. Sel telur dan sperma hanya membawa satu set: haploid (haploid), n = 23. Saat keduanya bertemu, jumlahnya kembali genap.",
    },
    {
      id: "kelamin",
      tajuk: "X dan Y",
      tahap: "kelamin",
      durasi: 25,
      sorot: ["kromatin", "kromosomAyah"],
      narasi:
        "Pasangan ke-23 menentukan jenis kelamin. Dua kromosom X: perempuan. Satu X dan satu Y: laki-laki. Kromosom Y jauh lebih kecil dan membawa jauh lebih sedikit gen — pasangan ini homolog hanya di sebagian kecil ujungnya.",
    },
    {
      id: "tiga-dimensi",
      tajuk: "Kromosom sebagai benda",
      tahap: "anatomi",
      tampilan: "3d",
      durasi: 26,
      sorot: ["kromatin", "sentromer", "telomer"],
      narasi:
        "Sekarang lihat kromosom sebagai benda tiga dimensi. Putar, dan perhatikan: ia bukan huruf X yang pipih, melainkan dua batang serat yang tergulung rapat. Setiap kromatid adalah satu molekul DNA yang sangat panjang, dipadatkan sepuluh ribu kali.",
    },
    {
      id: "penutup",
      tajuk: "Benda yang sama, siap dibagi",
      tahap: "kariotipe",
      durasi: 23,
      sorot: [],
      narasi:
        "Kromosom adalah kromatin yang memadat — benda yang sama, siap dibagi. Pelajaran berikutnya memperlihatkan pembagiannya: mitosis, yang membuat salinan persis, dan meiosis, yang mengocok kartunya dan membagi dua.",
    },
  ],

  poinKunci: [
    "Kromosom dan kromatin adalah benda yang sama; kromosom adalah kromatin yang memadat sekitar 10.000 kali menjelang pembelahan.",
    "Bentuk X hanya ada setelah DNA disalin: dua kromatid saudara dengan DNA persis sama, menempel di sentromer.",
    "Lengan pendek disebut p, lengan panjang q; ujung-ujungnya dilindungi telomer.",
    "Manusia: 46 kromosom = 22 pasang autosom + 1 pasang kromosom kelamin (XX atau XY).",
    "Sepasang homolog berasal dari ibu dan ayah; gennya sama, versinya bisa berbeda.",
    "Diploid (2n = 46) pada sel tubuh; haploid (n = 23) pada sel telur dan sperma.",
  ],

  istilah: [
    { id: "Kromosom", en: "chromosome", arti: "Kromatin yang memadat menjadi batang yang terlihat di mikroskop." },
    { id: "Kromatid saudara", en: "sister chromatid", arti: "Dua salinan identik dalam satu kromosom, menempel di sentromer." },
    { id: "Sentromer", en: "centromere", arti: "Pinggang kromosom tempat kromatid saudara menempel dan serat gelendong menarik." },
    { id: "Telomer", en: "telomere", arti: "Tudung pelindung di ujung kromosom." },
    { id: "Lengan p dan q", en: "p arm, q arm", arti: "Lengan pendek (p, dari petit) dan lengan panjang (q) kromosom." },
    { id: "Kariotipe", en: "karyotype", arti: "Susunan seluruh kromosom sel, dijajarkan menurut ukuran dan bentuk." },
    { id: "Autosom", en: "autosome", arti: "Kromosom selain kromosom kelamin; pada manusia 22 pasang." },
    { id: "Kromosom kelamin", en: "sex chromosome", arti: "Pasangan ke-23: XX pada perempuan, XY pada laki-laki." },
    { id: "Homolog", en: "homologous chromosomes", arti: "Sepasang kromosom dari ibu dan ayah yang membawa gen yang sama." },
    { id: "Diploid", en: "diploid (2n)", arti: "Sel dengan dua set kromosom lengkap." },
    { id: "Haploid", en: "haploid (n)", arti: "Sel dengan satu set kromosom, seperti sel telur dan sperma." },
  ],

  rujukan: [
    { teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022. Bab 4: DNA, Chromosomes, and Genomes." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 12–13." },
    { teks: "NHGRI — Chromosomes Fact Sheet", url: "https://www.genome.gov/about-genomics/fact-sheets/Chromosomes-Fact-Sheet" },
  ],
};
