import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 0.1 — Apa itu genetika?
 *
 * STATUS: TERBIT 25 Sep 2026 (akurasinya diperiksa Claude atas izin Nely). Ditulis Claude 25 Sep 2026 mengikuti peta KURIKULUM.md
 * (R1 pendahuluan & KB1; R2 bab 1; R3 1.1–1.2). Tanggal dan nama tokoh
 * dicocokkan dengan sumber di `rujukan`.
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Gambar: satu film 3D (PengantarGenetika3D) — keluarga, tiga pertanyaan,
 * garis waktu 1866–1953, dan pohon cabang genetika.
 */

export const apaItuGenetika: Pelajaran = {
  slug: "apa-itu-genetika",
  nomor: "0.1",
  level: 0,
  judul: "Apa itu genetika?",
  ringkas:
    "Mengapa anak mirip orang tuanya tetapi tidak sama persis: pewarisan dan variasi, tiga pertanyaan besar genetika, perjalanan penemuannya dari kebun Mendel sampai heliks ganda, dan manfaatnya kini.",
  tingkat: "Dasar",
  animasi: "pengantar",

  adegan: [
    {
      id: "keluarga",
      tajuk: "Mirip, tapi tidak sama",
      tahap: "keluarga",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "mirip ayah dan ibu", fokus: "mirip", sorot: ["ayah", "ibu", "anak1"], label: "Mirip orang tuanya" },
        { kata: "bahkan dengan saudaranya", fokus: "saudara", sorot: ["anak1", "anak2"], label: "Tidak sama dengan saudaranya" },
        { kata: "Genetika (genetics)", fokus: "utuh", sorot: [], label: "Genetika: ilmu pewarisan dan variasi" },
      ],
      narasi:
        "Perhatikan keluarga ini. Anak-anaknya mirip ayah dan ibu, tapi tidak ada yang sama persis — bahkan dengan saudaranya sendiri. Mirip karena pewarisan (heredity); berbeda karena variasi (variation). Genetika (genetics) adalah ilmu tentang keduanya.",
    },
    {
      id: "tiga-pertanyaan",
      tajuk: "Tiga pertanyaan besar",
      tahap: "pertanyaan",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Bahan apa", fokus: "bahan", label: "1 · Bahan apa yang diwariskan?" },
        { kata: "Bagaimana bahan itu bekerja", fokus: "kerja", label: "2 · Bagaimana ia bekerja?" },
        { kata: "bagaimana ia diteruskan", fokus: "teruskan", label: "3 · Bagaimana ia diteruskan?" },
      ],
      narasi:
        "Genetika menjawab tiga pertanyaan besar. Bahan apa yang diwariskan dari orang tua kepada anaknya? Bagaimana bahan itu bekerja membentuk tubuh? Dan bagaimana ia diteruskan dari satu generasi ke generasi berikutnya?",
    },
    {
      id: "mendel",
      tajuk: "1866 · Kebun Mendel",
      tahap: "garis-waktu",
      fokus: "awal",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Gregor Mendel", fokus: "1866", label: "Gregor Mendel · kacang ercis" },
        { kata: "terbit tahun 1866", fokus: "1866", label: "1866 · sifat dibawa “faktor”" },
      ],
      narasi:
        "Jawabannya dicari lebih dari seratus lima puluh tahun. Di kebun biara di Brno, Gregor Mendel menyilangkan ribuan tanaman kacang ercis (pea) dan mencatat sifat keturunannya. Hasilnya terbit tahun 1866: sifat diwariskan lewat “faktor” — kini kita sebut gen (gene).",
    },
    {
      id: "ditemukan-kembali",
      tajuk: "1900 · Ditemukan kembali",
      tahap: "garis-waktu",
      fokus: "1866",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Tahun 1900", fokus: "1900", label: "1900 · karya Mendel ditemukan kembali" },
        { kata: "William Bateson", fokus: "1900", label: "1906 · lahir nama “genetika”" },
      ],
      narasi:
        "Tulisan Mendel lama terabaikan. Tahun 1900, tiga peneliti — Hugo de Vries, Carl Correns, dan Erich von Tschermak — menemukan kembali karyanya. Tahun 1906, William Bateson mengusulkan nama untuk ilmu yang baru lahir ini: genetika.",
    },
    {
      id: "kromosom",
      tajuk: "1902 · Gen di kromosom",
      tahap: "garis-waktu",
      fokus: "1900",
      durasi: 23,
      sorot: [],
      isyarat: [
        { kata: "Tahun 1902", fokus: "1902", label: "1902 · Sutton dan Boveri" },
        { kata: "gen terletak di kromosom", fokus: "1902", label: "Teori kromosom pewarisan" },
      ],
      narasi:
        "Tahun 1902, Walter Sutton dan Theodor Boveri memperhatikan bahwa kromosom (chromosome) bergerak persis seperti faktor Mendel: berpasangan, lalu berpisah saat sel kelamin (gamete) dibentuk. Mereka mengusulkan: gen terletak di kromosom — teori kromosom pewarisan (chromosome theory of inheritance).",
    },
    {
      id: "dna-materi",
      tajuk: "1944–1952 · DNA pembawa pesan",
      tahap: "garis-waktu",
      fokus: "1902",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Percobaan Avery", fokus: "1944", label: "1944 · Avery dan rekan" },
        { kata: "Hershey dan Chase", fokus: "1944", label: "1952 · Hershey dan Chase" },
        {
          kata: "DNA-lah",
          fokus: "1944",
          sorot: ["gulaFosfat", "basaA", "basaT", "basaG", "basaC", "ikatanHidrogen"],
          label: "DNA = materi genetik",
        },
      ],
      narasi:
        "Tapi kromosom tersusun dari protein dan DNA. Mana yang membawa pesan? Percobaan Avery dan rekannya (1944) serta Hershey dan Chase (1952) memberi jawaban yang sama: DNA-lah materi genetik (genetic material).",
    },
    {
      id: "heliks-ganda",
      tajuk: "1953 · Heliks ganda",
      tahap: "garis-waktu",
      fokus: "1944",
      durasi: 23,
      sorot: [],
      isyarat: [
        { kata: "Tahun 1953", fokus: "1953", label: "1953 · heliks ganda" },
        { kata: "genetika modern", fokus: "semua", label: "1866 → 1953" },
      ],
      narasi:
        "Tahun 1953, James Watson dan Francis Crick — berbekal foto difraksi sinar-X karya Rosalind Franklin — menemukan bentuk DNA: heliks ganda (double helix), dua untai berpilin yang basanya saling berpasangan. Dari sinilah genetika modern melesat.",
    },
    {
      id: "cabang",
      tajuk: "Cabang dan manfaat",
      tahap: "cabang",
      durasi: 25,
      sorot: [],
      isyarat: [
        {
          kata: "genetika klasik",
          fokus: "klasik",
          sorot: ["cabangKlasik", "batangPohon"],
          label: "Genetika klasik · pewarisan sifat",
        },
        {
          kata: "genetika molekuler",
          fokus: "molekuler",
          sorot: ["cabangMolekuler", "batangPohon"],
          label: "Genetika molekuler · cara gen bekerja",
        },
        {
          kata: "genetika populasi",
          fokus: "populasi",
          sorot: ["cabangPopulasi", "batangPohon"],
          label: "Genetika populasi · gen dalam kelompok",
        },
        {
          kata: "Hasilnya dipakai",
          fokus: "manfaat",
          sorot: [],
          label: "Kedokteran · pertanian · forensik · pelestarian",
        },
      ],
      narasi:
        "Kini genetika bercabang: genetika klasik (classical genetics) mempelajari pewarisan sifat, genetika molekuler (molecular genetics) mempelajari cara gen bekerja, dan genetika populasi (population genetics) mempelajari gen dalam kelompok besar. Hasilnya dipakai di kedokteran, pertanian, forensik, hingga pelestarian satwa langka.",
    },
    {
      id: "penutup",
      tajuk: "Mulai dari sel",
      tahap: "keluarga",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [{ kata: "tersimpan di dalam hampir setiap sel", fokus: "sel", label: "Jawabannya ada di dalam sel" }],
      narasi:
        "Semua cabang itu berangkat dari satu pertanyaan sederhana: mengapa anak mirip orang tuanya? Jawabannya tersimpan di dalam hampir setiap sel tubuhmu. Karena itu, perjalanan kita dimulai dari sel — unit terkecil kehidupan.",
    },
  ],

  poinKunci: [
    "Genetika adalah ilmu tentang pewarisan (mengapa anak mirip orang tuanya) dan variasi (mengapa tidak ada yang sama persis).",
    "Tiga pertanyaan genetika: bahan apa yang diwariskan, bagaimana ia bekerja, dan bagaimana ia diteruskan ke generasi berikutnya.",
    "1866 Mendel → 1900 ditemukan kembali → 1902 teori kromosom → 1944–1952 DNA terbukti materi genetik → 1953 heliks ganda.",
    "Cabang utama: genetika klasik, molekuler, dan populasi; manfaatnya di kedokteran, pertanian, forensik, dan pelestarian.",
  ],

  istilah: [
    { id: "Genetika", en: "genetics", arti: "Ilmu tentang pewarisan dan variasi sifat makhluk hidup." },
    { id: "Pewarisan", en: "heredity", arti: "Diturunkannya sifat dari orang tua kepada keturunannya." },
    { id: "Variasi", en: "variation", arti: "Perbedaan sifat di antara individu, bahkan di antara saudara kandung." },
    { id: "Gen", en: "gene", arti: "Satuan pewarisan: potongan DNA yang membawa satu instruksi." },
    { id: "Kromosom", en: "chromosome", arti: "Untaian DNA yang terbungkus protein; tempat gen berada." },
    { id: "Sel kelamin", en: "gamete", arti: "Sel telur atau sperma, yang membawa separuh kromosom induknya." },
    {
      id: "Teori kromosom pewarisan",
      en: "chromosome theory of inheritance",
      arti: "Gagasan Sutton dan Boveri bahwa gen terletak di kromosom.",
    },
    { id: "Materi genetik", en: "genetic material", arti: "Bahan pembawa pesan pewarisan; pada makhluk hidup, DNA." },
    { id: "Heliks ganda", en: "double helix", arti: "Bentuk DNA: dua untai berpilin yang basanya saling berpasangan." },
  ],

  rujukan: [
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 14–16." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 1." },
    { teks: "NHGRI Talking Glossary of Genomic and Genetic Terms.", url: "https://www.genome.gov/genetics-glossary" },
  ],
};
