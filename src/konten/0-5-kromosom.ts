import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 0.5 — Kromosom: bagian, bentuk, dan jumlah
 *
 * STATUS: TERBIT 25 Sep 2026. Ditulis Claude; akurasinya diperiksa Claude atas izin Nely.
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Dipecah dari 0.4 lama (23 Sep 2026); bagian kariotipe pindah ke 0.6.
 * 25 Sep 2026: ditambah empat bentuk kromosom, jumlah kromosom tiap spesies,
 * dan sistem ZW; dikoreksi menurut pemeriksaan fakta (700 nm = tebal satu
 * kromatid; homolog X–Y hanya sepadan di ujungnya; "umumnya" XX/XY).
 */

export const kromosom: Pelajaran = {
  slug: "kromosom",
  nomor: "0.5",
  level: 0,
  judul: "Kromosom: bagian, bentuk, dan jumlah",
  ringkas:
    "Bagaimana dua meter DNA dipadatkan menjadi kromosom yang terlihat di mikroskop, apa saja bagian dan bentuknya, mengapa kromosom berpasangan, dan mengapa jumlahnya berbeda di tiap spesies.",
  tingkat: "Dasar",
  animasi: "kromosom",

  adegan: [
    {
      id: "pembuka",
      tajuk: "Dua meter dalam enam mikrometer",
      tahap: "kromatin",
      durasi: 28,
      sorot: ["kromatin"],
      isyarat: [{ kata: "lahirlah bentuk", fokus: "padat", sorot: ["kromatin", "kromosomAyah"], label: "Kromatin memadat" }],
      narasi:
        "Dua meter DNA dalam ruang enam mikrometer. Caranya: dipadatkan bertingkat, seperti kabel panjang yang digulung, lalu gulungannya digulung lagi. Saat sel hendak membelah, pemadatan itu mencapai puncaknya — dan lahirlah bentuk yang bisa dilihat di mikroskop: kromosom (chromosome).",
    },
    {
      id: "pemadatan",
      tajuk: "Lima tingkat pemadatan",
      tahap: "pemadatan",
      durasi: 30,
      sorot: ["dna", "histon", "kromatin"],
      isyarat: [
        { kata: "DNA telanjang", fokus: "dna", sorot: ["basaA", "basaT", "basaG", "basaC", "gulaFosfat"], label: "1 · DNA · 2 nm" },
        { kata: "Melilit histon", fokus: "nukleosom", sorot: ["dna", "histon"], label: "2 · Nukleosom · 11 nm" },
        { kata: "serat tiga puluh", fokus: "serat", sorot: ["dna", "histon"], label: "3 · Serat · 30 nm" },
        { kata: "lengkung-lengkung", fokus: "lengkung", sorot: ["kromatin", "protein"], label: "4 · Lengkung · 300 nm" },
        { kata: "Lengkung memadat", fokus: "kromosom", sorot: ["kromatin"], label: "5 · Kromosom · 700 nm per kromatid" },
        { kata: "sepuluh ribu kali", fokus: "utuh", sorot: [] },
      ],
      narasi:
        "Lima tingkat. DNA telanjang, dua nanometer. Melilit histon menjadi nukleosom, sebelas nanometer. Nukleosom menggulung jadi serat tiga puluh nanometer. Serat membentuk lengkung-lengkung. Lengkung memadat menjadi kromosom yang tiap batangnya setebal tujuh ratus nanometer — sekitar sepuluh ribu kali lebih pendek dari DNA yang diluruskan.",
    },
    {
      id: "anatomi",
      tajuk: "Bagian-bagian kromosom",
      tahap: "anatomi",
      durasi: 27,
      sorot: ["kromatin", "sentromer", "telomer"],
      isyarat: [
        { kata: "kromatid saudara", sorot: ["kromatin"], label: "Dua kromatid saudara" },
        { kata: "Titik pinggang", fokus: "sentromer", sorot: ["sentromer"] },
        { kata: "Lengan pendek", fokus: "utuh", sorot: ["kromatin"], label: "Lengan p (pendek) · q (panjang)" },
        { kata: "dilindungi telomer", fokus: "telomer", sorot: ["telomer"] },
      ],
      narasi:
        "Kromosom yang siap membelah berbentuk X. Dua batang identiknya disebut kromatid saudara (sister chromatid). Titik pinggang tempat keduanya menempel adalah sentromer (centromere). Lengan pendek diberi nama p, lengan panjang q, dan tiap ujungnya dilindungi telomer (telomere).",
    },
    {
      id: "bentuk",
      tajuk: "Empat bentuk kromosom",
      tahap: "bentuk",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "metasentrik", fokus: "meta", label: "Metasentrik · sentromer di tengah" },
        { kata: "submetasentrik", fokus: "submeta", label: "Submetasentrik · agak ke ujung" },
        { kata: "akrosentrik", fokus: "akro", label: "Akrosentrik · dekat ujung" },
        { kata: "telosentrik (telocentric)", fokus: "telo", label: "Telosentrik · tepat di ujung" },
        { kata: "Manusia tidak punya", fokus: "utuh", label: "Manusia: tanpa telosentrik" },
      ],
      narasi:
        "Letak sentromer memberi kromosom empat bentuk: di tengah — metasentrik (metacentric); agak ke ujung — submetasentrik (submetacentric); dekat ujung — akrosentrik (acrocentric); tepat di ujung — telosentrik (telocentric). Manusia tidak punya kromosom telosentrik.",
    },
    {
      id: "replikasi",
      tajuk: "Satu kromatid, lalu dua",
      tahap: "replikasi",
      durasi: 26,
      sorot: ["kromatin", "sentromer"],
      isyarat: [
        { kata: "Sebagian besar waktunya", fokus: "satu", label: "Satu batang" },
        { kata: "DNA-nya disalin", fokus: "salin", label: "DNA disalin" },
        { kata: "Satu kromosom, dua kromatid", fokus: "dua", label: "Satu kromosom, dua kromatid" },
      ],
      narasi:
        "Bentuk X itu tidak selalu ada. Sebagian besar waktunya, kromosom hanya satu batang. Sebelum sel membelah, DNA-nya disalin, dan hasil salinan tetap menempel di sentromer — itulah kromatid kedua. Satu kromosom, dua kromatid: DNA-nya persis sama.",
    },
    {
      id: "tiga-dimensi",
      tajuk: "Kromosom sebagai benda",
      tahap: "anatomi",
      fokus: "putar",
      durasi: 26,
      sorot: ["kromatin", "sentromer", "telomer"],
      narasi:
        "Sekarang lihat kromosom sebagai benda tiga dimensi. Putar, dan perhatikan: ia bukan huruf X yang pipih, melainkan dua batang serat yang tergulung rapat. Setiap kromatid adalah satu molekul DNA yang sangat panjang, dipadatkan sepuluh ribu kali.",
    },
    {
      id: "homolog",
      tajuk: "Sepasang homolog",
      tahap: "homolog",
      durasi: 26,
      sorot: ["kromatin", "kromosomAyah"],
      isyarat: [
        { kata: "dari ibu", fokus: "ibu", sorot: ["kromatin"], label: "Dari ibu" },
        { kata: "dari ayah", fokus: "ayah", sorot: ["kromosomAyah"], label: "Dari ayah" },
        { kata: "disebut homolog", fokus: "utuh", sorot: ["kromatin", "kromosomAyah"], label: "Sepasang homolog" },
        { kata: "gen yang sama", fokus: "pita", sorot: ["pita"], label: "Gen di posisi yang sama" },
      ],
      narasi:
        "Kromosom di sel tubuhmu berpasangan, karena kamu menerima satu set dua puluh tiga kromosom dari ibu, dan satu set lagi dari ayah. Dua kromosom sepasang disebut homolog (homologous chromosome): membawa gen yang sama, di posisi yang sama, tapi versinya bisa berbeda.",
    },
    {
      id: "ploidi",
      tajuk: "Diploid dan haploid",
      tahap: "ploidi",
      durasi: 26,
      sorot: ["kromatin", "kromosomAyah"],
      isyarat: [
        { kata: "disebut diploid", fokus: "diploid", label: "Diploid · 2n" },
        { kata: "hanya membawa satu set", fokus: "haploid", label: "Haploid · n" },
        { kata: "kembali genap", fokus: "utuh", label: "n + n = 2n" },
      ],
      narasi:
        "Sel dengan dua set lengkap disebut diploid (diploid), ditulis 2n — pada manusia, 2n = 46. Sel telur dan sperma hanya membawa satu set: haploid (haploid), n = 23. Saat keduanya bertemu, jumlahnya kembali genap.",
    },
    {
      id: "jumlah",
      tajuk: "Jumlah kromosom tiap spesies",
      tahap: "jumlah",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "lalat buah", fokus: "lalat", label: "Lalat buah · 2n = 8" },
        { kata: "padi", fokus: "padi", label: "Padi · 2n = 24" },
        { kata: "kucing", fokus: "kucing", label: "Kucing · 2n = 38" },
        { kata: "manusia 46", fokus: "manusia", label: "Manusia · 2n = 46" },
        { kata: "simpanse", fokus: "simpanse", label: "Simpanse · 2n = 48" },
        { kata: "anjing", fokus: "anjing", label: "Anjing · 2n = 78" },
        { kata: "tidak menandakan", fokus: "utuh", label: "Jumlah ≠ kerumitan" },
      ],
      narasi:
        "Jumlah kromosom tiap spesies berbeda-beda: lalat buah 8, padi 24, kucing 38, manusia 46, simpanse 48, anjing 78. Jumlah itu tidak menandakan makhluk mana yang lebih rumit — anjing tidak lebih rumit daripada manusia.",
    },
    {
      id: "kelamin",
      tajuk: "Autosom dan kromosom kelamin",
      tahap: "kelamin",
      durasi: 26,
      sorot: ["kromatin", "kromosomAyah"],
      isyarat: [
        { kata: "dua X berarti", fokus: "xx", label: "XX · perempuan" },
        { kata: "X dan Y berarti", fokus: "xy", label: "XY · laki-laki" },
        { kata: "Y jauh lebih kecil", fokus: "y", label: "Kromosom Y" },
        { kata: "Dua puluh dua pasang sisanya", tahap: "kariotipe", fokus: "utuh", label: "22 pasang autosom + XY" },
      ],
      narasi:
        "Satu pasang berbeda: kromosom kelamin (sex chromosome). Umumnya dua X berarti perempuan; X dan Y berarti laki-laki. Y jauh lebih kecil, membawa jauh lebih sedikit gen, dan hanya sepadan dengan X di ujung-ujungnya. Dua puluh dua pasang sisanya: autosom (autosome).",
    },
    {
      id: "zw",
      tajuk: "Tidak semua memakai XY",
      tahap: "zw",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Pada burung", fokus: "zw", label: "Burung · betina ZW" },
        { kata: "jantannya ZZ", fokus: "zz", label: "Burung · jantan ZZ" },
        { kata: "Belalang jantan", fokus: "utuh", label: "Belalang jantan · XO" },
        { kata: "lebah jantan", fokus: "utuh", label: "Lebah jantan · haploid" },
      ],
      narasi:
        "Tidak semua makhluk memakai XY. Pada burung, termasuk ayam, betinalah yang membawa dua kromosom kelamin berbeda: ZW; jantannya ZZ. Belalang jantan hanya punya satu X (XO), dan lebah jantan berasal dari telur yang tidak dibuahi.",
    },
    {
      id: "penutup",
      tajuk: "Benda yang sama, siap dibagi",
      tahap: "kariotipe",
      durasi: 20,
      sorot: [],
      narasi:
        "Saat sel membelah, kromatin memadat menjadi kromosom — benda yang sama, siap dibagi. Pelajaran berikutnya memotret seluruh kromosom satu sel sekaligus, lalu menjajarkannya: kariotipe.",
    },
  ],

  poinKunci: [
    "Kromosom dan kromatin adalah benda yang sama; menjelang pembelahan, kromatin memadat sekitar 10.000 kali menjadi kromosom. (Serat 30 nm adalah model buku ajar; bentuknya di dalam sel hidup masih diteliti.)",
    "Bentuk X hanya ada setelah DNA disalin: dua kromatid saudara dengan DNA persis sama, menempel di sentromer.",
    "Lengan pendek disebut p, lengan panjang q; ujung-ujungnya dilindungi telomer.",
    "Menurut letak sentromer: metasentrik, submetasentrik, akrosentrik, telosentrik. Manusia tidak punya yang telosentrik.",
    "Sepasang homolog berasal dari ibu dan ayah; gennya sama, versinya bisa berbeda.",
    "Diploid (2n = 46) pada sel tubuh; haploid (n = 23) pada sel telur dan sperma.",
    "Jumlah kromosom tiap spesies berbeda dan tidak menandakan kerumitan (lalat buah 8, manusia 46, anjing 78).",
    "Manusia: 22 pasang autosom + 1 pasang kromosom kelamin (umumnya XX pada perempuan, XY pada laki-laki). Burung memakai ZW (betina) dan ZZ (jantan).",
  ],

  istilah: [
    {
      id: "Kromosom",
      en: "chromosome",
      arti: "Satu molekul DNA panjang beserta proteinnya; memadat menjadi batang yang terlihat di mikroskop menjelang pembelahan.",
    },
    { id: "Kromatid saudara", en: "sister chromatid", arti: "Dua salinan identik dalam satu kromosom, menempel di sentromer." },
    { id: "Sentromer", en: "centromere", arti: "Pinggang kromosom tempat kromatid saudara menempel dan serat gelendong menarik." },
    { id: "Telomer", en: "telomere", arti: "Tudung pelindung di ujung kromosom." },
    { id: "Lengan p dan q", en: "p arm, q arm", arti: "Lengan pendek (p, dari petit) dan lengan panjang (q) kromosom." },
    { id: "Metasentrik", en: "metacentric", arti: "Kromosom dengan sentromer di tengah; kedua lengan sama panjang." },
    { id: "Submetasentrik", en: "submetacentric", arti: "Sentromer agak bergeser dari tengah; lengan p lebih pendek dari q." },
    { id: "Akrosentrik", en: "acrocentric", arti: "Sentromer dekat ujung; lengan p sangat pendek. Pada manusia: kromosom 13, 14, 15, 21, 22." },
    { id: "Telosentrik", en: "telocentric", arti: "Sentromer tepat di ujung; tidak ada pada manusia." },
    { id: "Homolog", en: "homologous chromosomes", arti: "Sepasang kromosom dari ibu dan ayah yang membawa gen yang sama." },
    { id: "Diploid", en: "diploid (2n)", arti: "Sel dengan dua set kromosom lengkap." },
    { id: "Haploid", en: "haploid (n)", arti: "Sel dengan satu set kromosom, seperti sel telur dan sperma." },
    { id: "Autosom", en: "autosome", arti: "Kromosom selain kromosom kelamin; pada manusia 22 pasang." },
    {
      id: "Kromosom kelamin",
      en: "sex chromosome",
      arti: "Pasangan penentu jenis kelamin: umumnya XX pada perempuan dan XY pada laki-laki; ZW dan ZZ pada burung.",
    },
  ],

  rujukan: [
    { teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022. Bab 4: DNA, Chromosomes, and Genomes." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 12–13." },
    { teks: "NHGRI — Chromosomes Fact Sheet", url: "https://www.genome.gov/about-genomics/fact-sheets/Chromosomes-Fact-Sheet" },
    { teks: "Nature Scitable — Karyotyping for Chromosomal Abnormalities.", url: "https://www.nature.com/scitable/topicpage/karyotyping-for-chromosomal-abnormalities-298/" },
    { teks: "Encyclopaedia Britannica — Chromosome number.", url: "https://www.britannica.com/science/chromosome-number" },
    { teks: "Bachtrog D, dkk. Sex determination: why so many ways of doing it? PLoS Biol. 2014;12(7):e1001899." },
  ],
};
