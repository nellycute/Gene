import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 1.7 — Dari gen ke sifat
 *
 * STATUS: DRAF — menunggu tinjauan penuh Nely (keputusannya 26 Sep 2026).
 * Ditulis Claude 26 Sep 2026 mengikuti KURIKULUM.md (R1 KB1–KB2): satu gen –
 * satu enzim, genotip–fenotip, P = G + L (+ interaksi, sesuai R1), genom dan
 * satuan bp, kb, Mb.
 *
 * Kekeliruan R1 yang TIDAK diikuti (KURIKULUM.md): manusia ± 20.000 gen
 * penyandi protein, bukan ± 50.000; alel resesif tetap DNA berkodon — pada
 * albinisme, gennya ada tetapi enzimnya tidak berfungsi.
 *
 * Menyentuh penyakit (albinisme, anemia sel sabit): hanya sebagai contoh
 * mekanisme; pengingat "bahan belajar, bukan nasihat medis" ada di Rujukan.
 *
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Gambar: satu film 3D (GenSifat3D).
 */

export const genKeSifat: Pelajaran = {
  slug: "dari-gen-ke-sifat",
  nomor: "1.7",
  level: 1,
  judul: "Dari gen ke sifat",
  ringkas:
    "Bagaimana protein membentuk sifat: satu gen – satu enzim (Beadle dan Tatum), albinisme dan anemia sel sabit, genotip dan fenotip, pengaruh lingkungan (P = G + L), serta ukuran genom dalam bp, kb, dan Mb.",
  tingkat: "Dasar",
  animasi: "gen-sifat",
  draf: true,

  adegan: [
    {
      id: "pembuka",
      tajuk: "Dari protein ke sifat",
      tahap: "alur",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "gen disalin menjadi mRNA", fokus: "awal", label: "Gen → mRNA → protein" },
        { kata: "sifat yang tampak", fokus: "sifat", label: "Protein → sifat?" },
      ],
      narasi:
        "Sekarang rantainya lengkap: gen disalin menjadi mRNA, lalu mRNA diterjemahkan menjadi protein. Tetapi bagaimana protein menghasilkan sifat yang tampak — warna kulit, golongan darah, atau tinggi badan?",
    },
    {
      id: "beadle-tatum",
      tajuk: "1941 · Beadle dan Tatum",
      tahap: "jalur",
      fokus: "jamur",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "George Beadle dan Edward Tatum", fokus: "jamur", label: "1941 · Beadle dan Tatum" },
        { kata: "tak bisa tumbuh", fokus: "cawan", label: "Mutan: tumbuh hanya bila diberi zat tertentu" },
        { kata: "satu langkah", fokus: "jalur", label: "Tiap mutan kehilangan satu langkah" },
      ],
      narasi:
        "Tahun 1941, George Beadle dan Edward Tatum menyinari jamur roti Neurospora dengan sinar-X. Sebagian jamur hasil mutasi tak bisa tumbuh kecuali diberi zat tertentu — setiap mutan kehilangan satu langkah pembuatan zat itu.",
    },
    {
      id: "jalur-arginin",
      tajuk: "Satu langkah, satu enzim",
      tahap: "jalur",
      fokus: "jalur",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "beberapa langkah", fokus: "jalur", sorot: ["enzim", "zat"], label: "Prekursor → ornitin → sitrulin → arginin" },
        { kata: "Tiap langkah", fokus: "jalur", sorot: ["enzim"], label: "Tiap langkah: satu enzim" },
        { kata: "Mutan yang enzimnya rusak", fokus: "mutan", sorot: ["enzimRusak", "zat"], label: "Enzim rusak → jalur terhenti" },
      ],
      narasi:
        "Pembuatan asam amino arginin, misalnya, melewati beberapa langkah: prekursor diubah menjadi ornitin, lalu sitrulin, lalu arginin. Tiap langkah dikerjakan satu enzim. Mutan yang enzimnya rusak berhenti di langkah itu.",
    },
    {
      id: "satu-gen",
      tajuk: "Satu gen – satu polipeptida",
      tahap: "jalur",
      fokus: "mutan",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "satu gen – satu enzim", fokus: "mutan", label: "Satu gen – satu enzim" },
        { kata: "satu gen – satu polipeptida", fokus: "hemoglobin", sorot: ["protein"], label: "Kini: satu gen – satu polipeptida" },
        { kata: "beberapa rantai", fokus: "hemoglobin", sorot: ["rantaiAlfa", "rantaiBeta"], label: "Hemoglobin: 2 rantai α + 2 rantai β" },
      ],
      narasi:
        "Kesimpulannya: satu gen – satu enzim (one gene–one enzyme). Kini diperluas menjadi satu gen – satu polipeptida, karena banyak protein bukan enzim, dan sebagian protein tersusun dari beberapa rantai buatan gen yang berbeda.",
    },
    {
      id: "albino",
      tajuk: "Albinisme",
      tahap: "albino",
      fokus: "normal",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "enzim tirosinase", fokus: "normal", sorot: ["enzim"], label: "Gen TYR → enzim tirosinase" },
        { kata: "pigmen melanin", fokus: "normal", sorot: ["melanin", "asamAmino"], label: "Tirosin → melanin" },
        { kata: "tidak berfungsi", fokus: "albino", sorot: ["enzimRusak"], label: "Enzim tak berfungsi → tanpa melanin" },
        { kata: "albinisme", fokus: "utuh", sorot: [], label: "Albinisme" },
      ],
      narasi:
        "Contoh sederhana: gen TYR menyandi enzim tirosinase, yang mengubah asam amino tirosin menjadi pigmen melanin. Bila kedua salinan gen ini tidak berfungsi, melanin tidak terbentuk — kulit, rambut, dan mata sangat pucat. Inilah albinisme (albinism).",
    },
    {
      id: "sel-sabit",
      tajuk: "Anemia sel sabit",
      tahap: "sabit",
      fokus: "kodon",
      durasi: 26,
      sorot: [],
      isyarat: [
        { kata: "satu basa", fokus: "kodon", label: "Satu basa berubah" },
        { kata: "GAG", fokus: "kodon", label: "GAG → GUG" },
        { kata: "asam amino keenam", fokus: "kodon", sorot: ["asamAmino"], label: "Asam amino ke-6: glutamat → valin" },
        { kata: "menggumpal", fokus: "sel", sorot: ["protein"], label: "Hemoglobin menggumpal menjadi serat" },
        { kata: "seperti sabit", fokus: "sel", label: "Sel darah merah menjadi sabit" },
      ],
      narasi:
        "Perubahan satu basa pun bisa berakibat besar. Pada anemia sel sabit (sickle cell anemia), kodon GAG di gen beta-globin berubah menjadi GUG: asam amino keenam, glutamat, diganti valin. Hemoglobinnya menggumpal, dan sel darah merah melengkung seperti sabit.",
    },
    {
      id: "genotip-fenotip",
      tajuk: "Genotip dan fenotip",
      tahap: "albino",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Genotip (genotype)", fokus: "utuh", label: "Genotip: susunan gen atau alel" },
        { kata: "fenotip (phenotype)", fokus: "utuh", label: "Fenotip: sifat yang tampak atau terukur" },
      ],
      narasi:
        "Inilah hubungan genotip dan fenotip. Genotip (genotype) adalah susunan gen atau alel yang dimiliki; fenotip (phenotype) adalah sifat yang tampak atau terukur — dari warna bulu sampai kadar enzim dalam darah.",
    },
    {
      id: "kucing-siam",
      tajuk: "Lingkungan ikut menentukan",
      tahap: "kucing",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Kucing Siam", fokus: "utuh", label: "Kucing Siam" },
        { kata: "suhu rendah", fokus: "utuh", label: "Tirosinase peka suhu: aktif hanya di bagian dingin" },
        { kata: "telinga, wajah, kaki, ekor", fokus: "ujung", label: "Ujung tubuh dingin → gelap" },
      ],
      narasi:
        "Fenotip tidak ditentukan gen saja. Kucing Siam membawa tirosinase yang hanya bekerja pada suhu rendah, sehingga hanya ujung tubuhnya yang dingin — telinga, wajah, kaki, ekor — yang berwarna gelap.",
    },
    {
      id: "rumus",
      tajuk: "P = G + L",
      tahap: "sapi",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "P = G + L", fokus: "utuh", label: "P = G + L (+ interaksi G × L)" },
        { kata: "interaksi keduanya", fokus: "utuh", label: "Fenotip = genotip + lingkungan + interaksi" },
        { kata: "pakan yang baik", fokus: "pakan", label: "Genotip sama, pakan berbeda → susu berbeda" },
      ],
      narasi:
        "Karena itu pemulia ternak menulis P = G + L: fenotip adalah hasil genotip dan lingkungan, ditambah interaksi keduanya. Sapi yang genotipnya unggul tetap butuh pakan yang baik untuk menghasilkan banyak susu.",
    },
    {
      id: "genom",
      tajuk: "Genom",
      tahap: "genom",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "genom (genome)", fokus: "utuh", sorot: ["dna"], label: "Genom: seluruh DNA satu makhluk" },
        { kata: "3,1 miliar pasang basa", fokus: "utuh", label: "Manusia: ± 3,1 miliar pasang basa per set" },
        { kata: "dua puluh ribu gen", fokus: "gen", sorot: ["gen"], label: "± 20.000 gen penyandi protein" },
        { kata: "dua persen", fokus: "gen", sorot: ["gen"], label: "Hanya ± 1–2% DNA menyandi protein" },
      ],
      narasi:
        "Seluruh DNA satu makhluk disebut genom (genome). Genom manusia berisi sekitar 3,1 miliar pasang basa per set kromosom, dengan sekitar dua puluh ribu gen penyandi protein — hanya sekitar satu sampai dua persen dari seluruh DNA.",
    },
    {
      id: "satuan",
      tajuk: "bp, kb, Mb",
      tahap: "satuan",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "pasangan basa", fokus: "utuh", label: "1 bp = satu pasangan basa" },
        { kata: "kilobasa", fokus: "gen", label: "1 kb = 1.000 bp · gen beta-globin ± 1,6 kb" },
        { kata: "megabasa", fokus: "bakteri", label: "1 Mb = 1.000.000 bp · E. coli ± 4,6 Mb" },
        { kata: "genom manusia", fokus: "manusia", label: "Manusia ± 3.100 Mb" },
      ],
      narasi:
        "Panjang DNA diukur dalam pasangan basa (base pair). Seribu pasang basa disebut satu kilobasa, sejuta pasang basa satu megabasa. Gen beta-globin sekitar 1,6 kilobasa, genom E. coli sekitar 4,6 megabasa, dan genom manusia sekitar 3.100 megabasa.",
    },
    {
      id: "penutup",
      tajuk: "Tingkat 1 selesai",
      tahap: "alur",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Tingkat 1 selesai", fokus: "utuh", label: "DNA → RNA → protein → sifat" },
        { kata: "Tingkat 2", fokus: "sifat", label: "Berikutnya: Hukum Mendel" },
      ],
      narasi:
        "Tingkat 1 selesai: DNA disalin, dibaca, dan diterjemahkan menjadi protein yang membentuk sifat. Di Tingkat 2 kita melihat bagaimana gen-gen itu diwariskan — dimulai dari kebun kacang ercis Gregor Mendel.",
    },
  ],

  poinKunci: [
    "Satu gen – satu enzim (Beadle dan Tatum, 1941): tiap mutan Neurospora kehilangan satu langkah jalur pembuatan zat. Srb dan Horowitz (1944) memetakan jalur arginin: prekursor → ornitin → sitrulin → arginin. Beadle dan Tatum mendapat Nobel 1958.",
    "Kini: satu gen – satu polipeptida. Banyak protein bukan enzim (kolagen, keratin, hemoglobin); hemoglobin dewasa tersusun dari dua rantai α dan dua rantai β dari gen berbeda. Sebagian gen bahkan tidak menyandi protein sama sekali (gen rRNA, tRNA).",
    "Albinisme tipe 1: gen TYR (kromosom 11) tidak berfungsi pada kedua salinannya sehingga tirosinase tidak bekerja dan melanin tidak terbentuk. Alelnya resesif, tetapi tetap berupa DNA berkodon — koreksi atas R1 hlm. 1.16.",
    "Anemia sel sabit: DNA GAG → GTG (mRNA GAG → GUG) pada kodon ke-6 gen β-globin (HBB); glutamat diganti valin. Hemoglobin S membentuk serat saat kadar oksigen rendah, dan sel darah merah menjadi kaku dan melengkung.",
    "Genotip = susunan gen/alel; fenotip = sifat yang tampak atau terukur. R1 menuliskan P = G + L + IGL (interaksi genotip × lingkungan).",
    "Kucing Siam dan kelinci Himalaya membawa alel tirosinase yang peka suhu: enzimnya bekerja di bawah suhu tubuh, jadi bagian tubuh yang dingin berwarna gelap.",
    "Genom manusia ± 3,1 miliar pasang basa per set (haploid); ± 20.000 gen penyandi protein (bukan ± 50.000 seperti di R1); bagian penyandi protein hanya ± 1–2%.",
    "Satuan: 1 kb = 1.000 bp; 1 Mb = 1.000.000 bp; 1 Gb = 10⁹ bp. Contoh: gen β-globin ± 1,6 kb; DNA mitokondria 16,6 kb; genom E. coli ± 4,6 Mb; genom manusia ± 3.100 Mb (3,1 Gb).",
    "Penyakit di pelajaran ini hanya contoh mekanisme gen → sifat; ini bahan belajar, bukan nasihat medis.",
  ],

  istilah: [
    { id: "Satu gen – satu enzim", en: "one gene–one enzyme", arti: "Gagasan Beadle dan Tatum bahwa tiap gen menyandi satu enzim." },
    { id: "Satu gen – satu polipeptida", en: "one gene–one polypeptide", arti: "Perluasannya: tiap gen penyandi protein menyandi satu rantai polipeptida." },
    { id: "Mutan", en: "mutant", arti: "Individu yang membawa mutasi." },
    { id: "Jalur metabolisme", en: "metabolic pathway", arti: "Rangkaian reaksi berurutan, tiap langkah dikerjakan satu enzim." },
    { id: "Tirosinase", en: "tyrosinase", arti: "Enzim pengubah tirosin menjadi melanin." },
    { id: "Melanin", en: "melanin", arti: "Pigmen gelap pada kulit, rambut, dan mata." },
    { id: "Albinisme", en: "albinism", arti: "Tidak terbentuknya melanin karena gen pigmen tidak berfungsi." },
    { id: "Anemia sel sabit", en: "sickle cell anemia", arti: "Kelainan hemoglobin akibat satu perubahan basa di gen β-globin." },
    { id: "Hemoglobin", en: "hemoglobin", arti: "Protein pengangkut oksigen di sel darah merah." },
    { id: "Genotip", en: "genotype", arti: "Susunan gen atau alel yang dimiliki individu." },
    { id: "Fenotip", en: "phenotype", arti: "Sifat yang tampak atau terukur." },
    { id: "Alel", en: "allele", arti: "Bentuk berbeda dari satu gen." },
    { id: "Genom", en: "genome", arti: "Seluruh DNA satu makhluk (satu set kromosom)." },
    { id: "Pasangan basa", en: "base pair (bp)", arti: "Satuan panjang DNA: satu anak tangga." },
    { id: "Kilobasa", en: "kilobase (kb)", arti: "1.000 pasang basa." },
    { id: "Megabasa", en: "megabase (Mb)", arti: "1.000.000 pasang basa." },
  ],

  rujukan: [
    {
      teks: "Beadle GW, Tatum EL. Genetic control of biochemical reactions in Neurospora. PNAS 27:499–506, 1941.",
      url: "https://doi.org/10.1073/pnas.27.11.499",
    },
    { teks: "Srb AM, Horowitz NH. The ornithine cycle in Neurospora and its genetic control. Journal of Biological Chemistry 154:129–139, 1944." },
    { teks: "Ingram VM. Gene mutations in human haemoglobin: the chemical difference between normal and sickle cell haemoglobin. Nature 180:326–328, 1957." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 17.1 dan 17.5." },
    { teks: "MedlinePlus Genetics: TYR gene; HBB gene.", url: "https://medlineplus.gov/genetics/" },
    { teks: "Nurk S, dkk. The complete sequence of a human genome. Science 376:44–53, 2022." },
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak, Modul 1 LUHT4326. Universitas Terbuka. KB1–KB2 (dengan koreksi, lihat Ringkasan)." },
  ],
};
