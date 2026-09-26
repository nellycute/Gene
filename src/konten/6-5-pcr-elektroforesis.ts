import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 6.5 — Isolasi DNA, PCR, dan elektroforesis
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R2 bab 4).
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 6 (Populasi3D).
 */

export const pcrElektroforesis: Pelajaran = {
  slug: "isolasi-dna-pcr-elektroforesis",
  nomor: "6.5",
  level: 6,
  judul: "Isolasi DNA, PCR, dan elektroforesis",
  ringkas:
    "DNA diisolasi dengan memecah sel, menguraikan protein, dan mengendapkan DNA dengan alkohol. PCR memperbanyak satu potongan DNA secara berlipat dua tiap siklus (denaturasi 95 °C, penempelan primer ± 55 °C, pemanjangan 72 °C). Elektroforesis gel memisahkan potongan menurut panjangnya.",
  tingkat: "Lanjut",
  animasi: "populasi",
  draf: true,

  adegan: [
    {
      id: "isolasi",
      tajuk: "Isolasi DNA",
      tahap: "lab",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "isolasi DNA", fokus: "utuh", label: "Isolasi DNA" },
        { kata: "deterjen", fokus: "utuh", label: "Sel dipecah · protein diuraikan" },
        { kata: "benang putih", fokus: "benang", label: "Alkohol: DNA mengendap seperti benang" },
      ],
      narasi:
        "Pekerjaan laboratorium dimulai dengan isolasi DNA (DNA extraction): sel dipecah dengan deterjen, protein diuraikan enzim, lalu DNA diendapkan dengan alkohol hingga tampak sebagai benang putih.",
    },
    {
      id: "pcr",
      tajuk: "PCR",
      tahap: "pcr",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Kary Mullis", fokus: "utuh", label: "PCR · Kary Mullis, 1983" },
        { kata: "miliaran salinan", fokus: "grafik", label: "Satu potongan → miliaran salinan" },
      ],
      narasi:
        "Reaksi berantai polimerase (PCR), ditemukan Kary Mullis pada 1983, memperbanyak satu potongan DNA pilihan menjadi miliaran salinan hanya dalam beberapa jam.",
    },
    {
      id: "siklus",
      tajuk: "Tiga langkah tiap siklus",
      tahap: "pcr",
      fokus: "pisah",
      durasi: 26,
      sorot: [],
      isyarat: [
        { kata: "95 derajat", fokus: "pisah", label: "1. Denaturasi 95 °C: untai berpisah" },
        { kata: "penempelan primer", fokus: "primer", label: "2. Penempelan primer ± 55 °C" },
        { kata: "pemanjangan", fokus: "panjang", sorot: ["enzim"], label: "3. Pemanjangan 72 °C" },
      ],
      narasi:
        "Setiap siklus PCR punya tiga langkah: pemisahan untai pada 95 derajat, penempelan primer pada sekitar 55 derajat, dan pemanjangan oleh DNA polimerase tahan panas pada 72 derajat. Setiap siklus menggandakan jumlah DNA.",
    },
    {
      id: "berlipat",
      tajuk: "Berlipat dua",
      tahap: "pcr",
      fokus: "grafik",
      durasi: 18,
      sorot: [],
      isyarat: [
        { kata: "berlipat dua", fokus: "grafik", label: "1 → 2 → 4 → 8 → …" },
        { kata: "satu miliar", fokus: "grafik", label: "2³⁰ ≈ 1 miliar" },
      ],
      narasi:
        "Karena berlipat dua tiap siklus, tiga puluh siklus menghasilkan sekitar satu miliar salinan dari satu molekul awal.",
    },
    {
      id: "elektroforesis",
      tajuk: "Elektroforesis gel",
      tahap: "gel",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "elektroforesis gel", fokus: "utuh", label: "Elektroforesis gel agarosa" },
        { kata: "bermuatan negatif", fokus: "jalan", label: "DNA (−) ditarik ke kutub (+)" },
        { kata: "Potongan pendek", fokus: "jalan", label: "Pendek → lebih cepat, lebih jauh" },
      ],
      narasi:
        "Hasil PCR dilihat dengan elektroforesis gel (gel electrophoresis). DNA bermuatan negatif, sehingga ditarik ke kutub positif melewati gel agarosa. Potongan pendek bergerak lebih cepat daripada potongan panjang.",
    },
    {
      id: "membaca-pita",
      tajuk: "Membaca pita",
      tahap: "gel",
      fokus: "pita",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "pita", fokus: "pita", label: "DNA tampak sebagai pita" },
        { kata: "penanda ukuran", fokus: "pita", label: "Tangga ukuran: panjang dalam pasangan basa" },
      ],
      narasi:
        "Setelah diwarnai, DNA tampak sebagai pita. Letak pita dibandingkan dengan penanda ukuran (DNA ladder) untuk mengetahui panjangnya dalam pasangan basa.",
    },
    {
      id: "contoh",
      tajuk: "Satu pita, satu jawaban",
      tahap: "gel",
      fokus: "contoh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "alel penyakit", fokus: "contoh", label: "Membawa alel penyakit?" },
        { kata: "DNA babi", fokus: "contoh", label: "Daging mengandung DNA babi?" },
      ],
      narasi:
        "Dengan cara ini, laboratorium bisa memeriksa apakah seekor sapi membawa alel penyakit, atau apakah sebuah daging mengandung DNA babi — satu pita tambahan sudah memberi jawaban.",
    },
  ],

  poinKunci: [
    "Isolasi DNA: lisis sel (deterjen), pencernaan protein (proteinase K), pemurnian, pengendapan dengan etanol/isopropanol dingin.",
    "PCR (Mullis, 1983; Nobel Kimia 1993): templat DNA, dua primer, dNTP, DNA polimerase tahan panas (Taq dari Thermus aquaticus), 25–35 siklus.",
    "Tiap siklus: denaturasi ± 95 °C, penempelan primer ± 50–65 °C, pemanjangan ± 72 °C. Jumlah salinan ≈ 2ⁿ untuk n siklus.",
    "Elektroforesis gel agarosa: DNA (bermuatan negatif karena gugus fosfat) bergerak ke anoda (+); potongan pendek lebih jauh. Pita diwarnai lalu dibandingkan dengan tangga DNA.",
    "Penerapan: uji pembawa alel penyakit ternak, identifikasi spesies (kehalalan daging), diagnosis penyakit menular.",
  ],

  istilah: [
    { id: "Isolasi DNA", en: "DNA extraction", arti: "Memisahkan DNA dari bagian sel lainnya." },
    { id: "PCR", en: "polymerase chain reaction", arti: "Reaksi berantai polimerase untuk memperbanyak potongan DNA." },
    { id: "Primer", en: "primer", arti: "Potongan DNA pendek tempat polimerase mulai menyalin." },
    { id: "Elektroforesis gel", en: "gel electrophoresis", arti: "Memisahkan potongan DNA menurut panjangnya di dalam gel." },
    { id: "Tangga DNA", en: "DNA ladder", arti: "Campuran potongan DNA berukuran diketahui sebagai pembanding." },
  ],

  rujukan: [
    { teks: "Saiki RK, dkk. Primer-directed enzymatic amplification of DNA with a thermostable DNA polymerase. Science 239:487–491, 1988." },
    { teks: "Mullis KB. The unusual origin of the polymerase chain reaction. Scientific American 262:56–65, 1990." },
    { teks: "Green MR, Sambrook J. Molecular Cloning: A Laboratory Manual, edisi ke-4. Cold Spring Harbor Laboratory Press, 2012." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 4." },
  ],
};
