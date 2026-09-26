import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 1.4 — Replikasi DNA
 *
 * STATUS: DRAF — menunggu tinjauan penuh Nely (keputusannya 26 Sep 2026).
 * Ditulis Claude 26 Sep 2026 mengikuti KURIKULUM.md (R1 KB2; R2 bab 3 gbr. 3.5),
 * ditambah percobaan Meselson–Stahl (usulan yang disetujui). Kedalaman:
 * pemain utama di narasi (helikase, primase, DNA polimerase, ligase); protein
 * SSB, topoisomerase, dan nama polimerase tertentu di Ringkasan.
 *
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Gambar: satu film 3D (Replikasi3D). Untai lama berangka kelabu, untai baru
 * berangka kelabu muda; primer RNA jingga (warna RNA).
 */

const ENZIM = ["enzim"];

export const replikasiDNA: Pelajaran = {
  slug: "replikasi-dna",
  nomor: "1.4",
  level: 1,
  judul: "Replikasi DNA",
  ringkas:
    "Bagaimana DNA menyalin dirinya: bukti semikonservatif dari Meselson dan Stahl, garpu replikasi, helikase, primer, DNA polimerase, untai maju dan untai lambat, fragmen Okazaki, dan ligase.",
  tingkat: "Dasar",
  animasi: "replikasi",
  draf: true,

  adegan: [
    {
      id: "pembuka",
      tajuk: "Menyalin seluruh DNA",
      tahap: "buka",
      fokus: "heliks",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "enam miliar pasang basa", fokus: "heliks", label: "Manusia: ± 6,4 miliar pasang basa per sel" },
        { kata: "replikasi DNA", fokus: "heliks", label: "Replikasi DNA" },
        { kata: "Kedua untainya berpisah", fokus: "buka", label: "Tiap untai menjadi cetakan" },
      ],
      narasi:
        "Sebelum sel membelah, seluruh DNA-nya harus disalin — pada manusia lebih dari enam miliar pasang basa, dalam beberapa jam saja. Penyalinan ini disebut replikasi DNA (DNA replication). Kedua untainya berpisah, lalu masing-masing menjadi cetakan (template) untai baru.",
    },
    {
      id: "tiga-model",
      tajuk: "Tiga kemungkinan",
      tahap: "model",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Konservatif:", fokus: "konservatif", sorot: ["konservatif"], label: "Konservatif: DNA lama tetap utuh" },
        { kata: "Semikonservatif:", fokus: "semikonservatif", sorot: ["semikonservatif"], label: "Semikonservatif: satu lama + satu baru" },
        { kata: "Dispersif:", fokus: "dispersif", sorot: ["dispersif"], label: "Dispersif: lama dan baru bercampur" },
      ],
      narasi:
        "Ada tiga kemungkinan hasilnya. Konservatif: DNA lama tetap utuh, DNA baru seluruhnya baru. Semikonservatif: tiap DNA anak membawa satu untai lama dan satu untai baru. Dispersif: untai lama dan baru bercampur potong-potong.",
    },
    {
      id: "meselson",
      tajuk: "1958 · Meselson dan Stahl",
      tahap: "meselson",
      fokus: "bakteri",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "nitrogen berat", fokus: "bakteri", label: "E. coli dalam ¹⁵N: DNA berat" },
        { kata: "nitrogen biasa", fokus: "bakteri", label: "Dipindah ke ¹⁴N biasa" },
        { kata: "sentrifugasi", fokus: "gen0", label: "Generasi 0: satu pita berat" },
      ],
      narasi:
        "Tahun 1958, Matthew Meselson dan Franklin Stahl menumbuhkan bakteri E. coli dalam nitrogen berat (¹⁵N), sehingga DNA-nya berat. Lalu bakteri dipindah ke nitrogen biasa (¹⁴N), dan DNA-nya dipisahkan menurut beratnya dengan sentrifugasi.",
    },
    {
      id: "meselson-hasil",
      tajuk: "Semikonservatif terbukti",
      tahap: "meselson",
      fokus: "gen0",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "satu kali penyalinan", fokus: "gen1", label: "Generasi 1: satu pita tengah" },
        { kata: "Model konservatif gugur", fokus: "gen1", label: "Konservatif gugur (tak ada pita berat)" },
        { kata: "Setelah dua kali", fokus: "gen2", label: "Generasi 2: pita tengah + pita ringan" },
        { kata: "Yang tersisa", fokus: "hasil", label: "Semikonservatif" },
      ],
      narasi:
        "Setelah satu kali penyalinan, hanya ada satu pita di tengah — setengah berat. Model konservatif gugur. Setelah dua kali, muncul pita tengah dan pita ringan — model dispersif pun gugur. Yang tersisa: semikonservatif.",
    },
    {
      id: "garpu",
      tajuk: "Helikase membuka garpu",
      tahap: "garpu",
      fokus: "asal",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "titik asal replikasi", fokus: "asal", label: "Titik asal replikasi" },
        { kata: "helikase (helicase)", fokus: "helikase", sorot: [...ENZIM, "gulaFosfat"], label: "Helikase membuka heliks" },
        { kata: "garpu replikasi", fokus: "garpu", sorot: [], label: "Garpu replikasi" },
        { kata: "satu titik asal", fokus: "garpu", label: "Bakteri: 1 titik asal · manusia: puluhan ribu" },
      ],
      narasi:
        "Replikasi dimulai di titik asal replikasi (origin of replication). Enzim helikase (helicase) membuka heliks dengan memutus ikatan hidrogen, membentuk garpu replikasi (replication fork). Bakteri punya satu titik asal; DNA manusia punya puluhan ribu.",
    },
    {
      id: "primer",
      tajuk: "Primer dari primase",
      tahap: "garpu",
      fokus: "garpu",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "tidak bisa memulai", fokus: "garpu", label: "DNA polimerase butuh titik mulai" },
        { kata: "Enzim primase", fokus: "primase", sorot: ["primase", "primer"], label: "Primase meletakkan primer" },
        { kata: "potongan RNA pendek", fokus: "primase", sorot: ["primer"], label: "Primer = RNA pendek (± 10 nukleotida)" },
      ],
      narasi:
        "DNA polimerase (DNA polymerase), penyusun untai baru, tidak bisa memulai dari nol. Enzim primase lebih dulu meletakkan primer (primer): potongan RNA pendek, sekitar sepuluh nukleotida, tempat DNA polimerase mulai bekerja.",
    },
    {
      id: "arah",
      tajuk: "Selalu dari 5′ ke 3′",
      tahap: "garpu",
      fokus: "arah",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "ke ujung 3′", fokus: "arah", sorot: ["polimerase", "untaiBaru"], label: "Nukleotida baru ditambah di ujung 3′" },
        { kata: "dari 5′ ke 3′", fokus: "arah", label: "Untai baru tumbuh 5′ → 3′" },
        { kata: "sesuai pasangannya", fokus: "pasang", sorot: ["basaA", "basaT", "basaG", "basaC"], label: "A–T, G–C sesuai cetakan" },
      ],
      narasi:
        "DNA polimerase hanya bisa menambah nukleotida ke ujung 3′, jadi untai baru selalu tumbuh dari 5′ ke 3′. Setiap nukleotida baru dipilih sesuai pasangannya di cetakan: A dengan T, G dengan C.",
    },
    {
      id: "untai-maju",
      tajuk: "Untai maju",
      tahap: "garpu",
      fokus: "maju",
      durasi: 16,
      sorot: [],
      isyarat: [
        { kata: "searah dengan terbukanya garpu", fokus: "maju", label: "Searah garpu" },
        { kata: "untai maju", fokus: "maju", sorot: ["untaiMaju", "polimerase"], label: "Untai maju: tanpa putus" },
      ],
      narasi:
        "Pada satu cetakan, arah ini searah dengan terbukanya garpu. Untai barunya tumbuh sambung-menyambung tanpa putus: untai maju (leading strand).",
    },
    {
      id: "untai-lambat",
      tajuk: "Untai lambat dan fragmen Okazaki",
      tahap: "garpu",
      fokus: "lambat",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "arahnya berlawanan", fokus: "lambat", label: "Berlawanan arah garpu" },
        { kata: "fragmen Okazaki", fokus: "okazaki", sorot: ["untaiLambat", "primer"], label: "Fragmen Okazaki" },
        { kata: "untai lambat", fokus: "okazaki", sorot: ["untaiLambat"], label: "Untai lambat: potong-potong" },
      ],
      narasi:
        "Pada cetakan lainnya, arahnya berlawanan. Untai baru dibuat potong-potong menjauhi garpu, masing-masing dengan primernya sendiri: fragmen Okazaki (Okazaki fragments), dinamai dari Reiji dan Tsuneko Okazaki. Inilah untai lambat (lagging strand).",
    },
    {
      id: "ligase",
      tajuk: "Ligase menyambung",
      tahap: "garpu",
      fokus: "ganti",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "diganti DNA", fokus: "ganti", sorot: ["primer", "untaiLambat"], label: "Primer RNA diganti DNA" },
        { kata: "DNA ligase", fokus: "ligase", sorot: ["ligase", "untaiLambat"], label: "DNA ligase menutup celah" },
        { kata: "menjadi utuh", fokus: "ligase", sorot: [], label: "Untai lambat utuh" },
      ],
      narasi:
        "Setelah itu primer RNA dibuang dan diganti DNA. Celah-celah kecil yang tersisa disambung enzim DNA ligase (DNA ligase), sehingga untai lambat menjadi utuh.",
    },
    {
      id: "koreksi",
      tajuk: "Memeriksa sambil menyalin",
      tahap: "garpu",
      fokus: "koreksi",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "memeriksa hasil kerjanya", fokus: "koreksi", sorot: ["polimerase", "salah"], label: "Basa salah pasang terdeteksi" },
        { kata: "memperbaiki basa", fokus: "koreksi", sorot: ["polimerase"], label: "Dibuang, diganti yang benar" },
        { kata: "satu dalam satu miliar", fokus: "koreksi", sorot: [], label: "Kesalahan akhir: ± 1 per miliar" },
      ],
      narasi:
        "DNA polimerase juga memeriksa hasil kerjanya dan memperbaiki basa yang salah pasang (proofreading). Bersama sistem perbaikan lain, kesalahannya tinggal sekitar satu dalam satu miliar nukleotida.",
    },
    {
      id: "hasil",
      tajuk: "Dua DNA yang sama persis",
      tahap: "garpu",
      fokus: "hasil",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "dua molekul DNA", fokus: "hasil", label: "Dua DNA identik" },
        { kata: "satu untai lama", fokus: "hasil", sorot: ["untaiLama"], label: "Masing-masing: satu untai lama…" },
        { kata: "satu untai baru", fokus: "hasil", sorot: ["untaiBaru"], label: "…dan satu untai baru" },
        { kata: "dua kromatid saudara", fokus: "hasil", sorot: [], label: "Menjadi dua kromatid saudara" },
      ],
      narasi:
        "Hasilnya dua molekul DNA yang sama persis, masing-masing berisi satu untai lama dan satu untai baru. Keduanya lalu dipadatkan menjadi dua kromatid saudara, siap dibagi saat mitosis.",
    },
  ],

  poinKunci: [
    "Replikasi DNA bersifat semikonservatif: tiap DNA anak berisi satu untai lama (cetakan) dan satu untai baru.",
    "Meselson dan Stahl (1958): DNA E. coli dari medium ¹⁵N yang dipindah ke ¹⁴N membentuk satu pita tengah setelah satu generasi (menggugurkan model konservatif), lalu pita tengah + ringan setelah dua generasi (menggugurkan model dispersif).",
    "Helikase membuka heliks di titik asal replikasi, membentuk garpu. Bakteri punya satu titik asal (oriC); genom manusia punya puluhan ribu, sehingga penyalinan berjalan serentak di banyak tempat.",
    "DNA polimerase hanya memanjangkan ujung 3′ dan tidak bisa memulai sendiri; primase membuat primer RNA pendek sebagai titik mulai.",
    "Untai maju dibuat bersambung ke arah garpu; untai lambat dibuat berupa fragmen Okazaki menjauhi garpu (± 1.000–2.000 nukleotida pada bakteri, ± 100–200 pada eukariot). Primer lalu diganti DNA dan celahnya ditutup DNA ligase.",
    "Lebih rinci: protein SSB (single-strand binding protein) menjaga untai tunggal agar tidak kembali berpasangan; topoisomerase meredakan puntiran di depan garpu. Pada E. coli, penyusun utamanya DNA polimerase III, dan primer dibuang oleh DNA polimerase I; pada eukariot, polimerase δ dan ε.",
    "Pemeriksaan (proofreading) oleh DNA polimerase dan sistem perbaikan salah pasang menurunkan kesalahan sampai ± 1 per 10⁹–10¹⁰ nukleotida per penyalinan.",
    "Ujung kromosom linear tidak bisa disalin tuntas oleh untai lambat; karena itu telomer memendek setiap pembelahan (lihat pelajaran 0.5).",
    "Gambar di film disederhanakan: garpu dibuat diam dan mendatar, enzim digambar sebagai gumpalan ungu berlabel, dan fragmen Okazaki digambar hanya beberapa nukleotida.",
  ],

  istilah: [
    { id: "Replikasi DNA", en: "DNA replication", arti: "Penyalinan seluruh DNA sebelum sel membelah." },
    { id: "Cetakan", en: "template", arti: "Untai lama yang urutannya disalin menjadi untai baru." },
    { id: "Semikonservatif", en: "semiconservative", arti: "Tiap DNA anak berisi satu untai lama dan satu untai baru." },
    { id: "Sentrifugasi", en: "centrifugation", arti: "Pemisahan zat menurut beratnya dengan pemutaran cepat." },
    { id: "Titik asal replikasi", en: "origin of replication", arti: "Tempat replikasi dimulai." },
    { id: "Helikase", en: "helicase", arti: "Enzim pembuka heliks; memutus ikatan hidrogen antarpasangan basa." },
    { id: "Garpu replikasi", en: "replication fork", arti: "Titik berbentuk Y tempat heliks terbuka dan disalin." },
    { id: "DNA polimerase", en: "DNA polymerase", arti: "Enzim penyusun untai DNA baru, 5′ → 3′." },
    { id: "Primase", en: "primase", arti: "Enzim pembuat primer RNA." },
    { id: "Primer", en: "primer", arti: "Potongan RNA pendek tempat DNA polimerase mulai bekerja." },
    { id: "Untai maju", en: "leading strand", arti: "Untai baru yang dibuat bersambung ke arah garpu." },
    { id: "Untai lambat", en: "lagging strand", arti: "Untai baru yang dibuat potong-potong menjauhi garpu." },
    { id: "Fragmen Okazaki", en: "Okazaki fragment", arti: "Potongan pendek penyusun untai lambat." },
    { id: "DNA ligase", en: "DNA ligase", arti: "Enzim penyambung celah antarpotongan DNA." },
    { id: "Pemeriksaan", en: "proofreading", arti: "Kemampuan DNA polimerase membuang basa yang salah pasang." },
  ],

  rujukan: [
    {
      teks: "Meselson M, Stahl FW. The replication of DNA in Escherichia coli. PNAS 44:671–682, 1958.",
      url: "https://doi.org/10.1073/pnas.44.7.671",
    },
    {
      teks: "Okazaki R, dkk. Mechanism of DNA chain growth. PNAS 59:598–605, 1968.",
      url: "https://doi.org/10.1073/pnas.59.2.598",
    },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 16.2." },
    { teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022. Bab 5." },
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak, Modul 1 LUHT4326. Universitas Terbuka. KB2." },
  ],
};
