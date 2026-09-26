/**
 * BUAT SUARA — merekam narasi setiap adegan dengan Edge TTS (suara perempuan
 * "Gadis", bahasa Indonesia). Suara ini SEMENTARA, sampai ada pengisi suara.
 *
 * Untuk tiap adegan dihasilkan:
 *  - public/suara/<slug>/<id-adegan>.mp3
 *  - satu entri di src/konten/suara.json: lama rekaman dan waktu setiap kata,
 *    yang dipakai pemutar untuk menyelaraskan subtitel dan isyarat gambar.
 *
 * Hanya adegan yang narasinya berubah yang direkam ulang. Kalau narasi diubah
 * tetapi alat ini belum dijalankan, adegan itu otomatis tayang tanpa suara
 * (lihat src/lib/daftar-pelajaran.ts) — suara tidak pernah tertinggal dari teks.
 *
 *   npm run suara            rekam adegan yang baru atau berubah
 *   npm run suara -- --semua rekam ulang semuanya
 */

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { lamaMp3, ucapkan } from "./edge-tts.mjs";
import { muatSemuaPelajaran } from "./muat-konten.mjs";

const SUARA = "id-ID-GadisNeural";
/** Sedikit lebih pelan dari bawaan — penontonnya sedang belajar. */
const LAJU = "-5%";
const BERKAS_DATA = "src/konten/suara.json";
const FOLDER_MP3 = "public/suara";
const SEMUA = process.argv.includes("--semua");
/** --coba: hanya tampilkan teks ucapan yang akan direkam, tanpa merekam apa pun. */
const COBA = process.argv.includes("--coba");

/* ------------------------------------------------------------------ *
 * Teks yang diucapkan
 * ------------------------------------------------------------------ */

/**
 * Pelafalan khusus. Subtitel tetap memakai tulisan aslinya; hanya suaranya
 * yang membaca versi di kanan.
 */
/* Pasangan alel yang dikenali sebagai genotip ("Rr", "RRYY", "rryy"). Sengaja
   daftar tertutup, supaya kata biasa seperti "ada" tidak ikut dieja. */
const PASANGAN_ALEL = "RR|Rr|rr|YY|Yy|yy|PP|Pp|pp|DD|Dd|dd|BB|Bb|bb|AA|Aa|aa|CC|Cc|cc|WW|Ww|ww|EE|Ee|ee|LL|Ll|ll|SS|Ss|ss";
const NAMA_HURUF = { r: "er", y: "ye", p: "pe", d: "de", b: "be", a: "a", c: "ce", i: "i", w: "we", e: "e", l: "el", m: "em", s: "es", n: "en", h: "ha", g: "ge", t: "te" };

const LAFAL = [
  [/\bMeiosis II\b/g, "Meiosis dua"],
  [/\bMeiosis I\b/g, "Meiosis satu"],
  [/\b2n = 46\b/g, "dua en sama dengan empat puluh enam"],
  [/\bn = 23\b/g, "en sama dengan dua puluh tiga"],
  [/\bditulis 2n\b/g, "ditulis dua en"],
  [/\bnama p,/g, "nama pe,"],
  [/\bpanjang q,/g, "panjang ki,"],
  /* rumus kromosom kelamin dieja huruf demi huruf, bukan dibaca sebagai kata */
  [/\b46,XX\b/g, "empat puluh enam, eks eks"],
  [/\b46,XY\b/g, "empat puluh enam, eks ye"],
  [/\bmemakai XY\b/g, "memakai eks ye"],
  [/\bZW\b/g, "zet we"],
  [/\bZZ\b/g, "zet zet"],
  /* notasi dan padanan Inggris yang berisi angka: cukup tampil di subtitel */
  [/\s*\(XO\)/g, ""],
  [/\s*\(trisomy 21\)/g, ""],
  /* 1.1: lambang penanda radioaktif cukup tampil di subtitel */
  [/\s*\([¹²³⁴⁵]+[SPN]\)/g, ""],
  [/\bT2\b/g, "te dua"],
  /* 1.2: kurung berisi tanda petik tidak tertangkap pola padanan Inggris */
  [/\s*\(Chargaff's rules\)/g, ""],
  /* 1.3 dst.: singkatan jenis RNA dieja huruf demi huruf */
  [/\bmRNA\b/g, "em er en a"],
  [/\btRNA\b/g, "te er en a"],
  [/\brRNA\b/g, "er er en a"],
  /* Tingkat 2 dst.: fase meiosis bernomor Romawi */
  [/\b([Pp]rofase|[Mm]etafase|[Aa]nafase|[Tt]elofase) (II|I)\b/g, (m) => m.replace(/ II$/, " dua").replace(/ I$/, " satu")],
  /* lambang persilangan */
  [/\bF([1-3])\b/g, (m) => `ef ${["", "satu", "dua", "tiga"][+m[1]]}`],
  [/\s:\s/g, " banding "],
  [/\s×\s/g, " kali "],
  [/(\d+)\/(\d+)/g, (m) => m.replace("/", " per ")],
  /* genotip dan gamet berhuruf: huruf besar "besar", huruf kecil "kecil" —
     "Rr" → "er besar er kecil". Hanya rangkaian huruf alel yang dikenal. */
  [
    new RegExp(`\\b(?:(?:${PASANGAN_ALEL})+|[Rr][Yy][Pp]?|[Rr][Pp]|[Yy][Pp])\\b`, "g"),
    (token) =>
      token
        .split("")
        .map((h) => `${NAMA_HURUF[h.toLowerCase()]} ${h === h.toUpperCase() ? "besar" : "kecil"}`)
        .join(" "),
  ],
  /* alel tunggal huruf kecil yang berdiri sendiri: "alel r" → "er kecil" */
  [/(?<=\s)[rypdb](?=[\s,.;:)—])(?! [=+]| kuadrat)/g, (h) => `${{ r: "er", y: "ye", p: "pe", d: "de", b: "be" }[h]} kecil`],
  /* Tingkat 6: rumus Hardy-Weinberg — p dan q di sini frekuensi, bukan alel */
  [/p² \+ 2pq \+ q² = 1/g, "pe kuadrat tambah dua pe ki tambah ki kuadrat sama dengan satu"],
  [/\bp \+ q = 1\b/g, "pe tambah ki sama dengan satu"],
  [/\bp = /g, "pe sama dengan "],
  [/(?<!\+ )\bq = /g, "ki sama dengan "],
  [/\bp kuadrat\b/g, "pe kuadrat"],
  [/\bq kuadrat\b/g, "ki kuadrat"],
  [/(?<=kuadrat) = /g, " sama dengan "],
  [/\b2pq\b/g, "dua pe ki"],
  [/\bRW\b/g, "er besar we besar"],
  [/\bh²/g, "ha kuadrat"],
  [/\bPCR\b/g, "pe ce er"],
  [/\bSNP\b/g, "es en pe"],
  [/\bSTR\b/g, "es te er"],
  /* 1.7 */
  [/\s*\(one gene–one enzyme\)/g, ""],
  [/\bTYR\b/g, "te ye er"],
  [/\bP = G \+ L\b/g, "pe sama dengan ge tambah el"],
  /* kodon (1.6): tiga huruf basa RNA dieja satu per satu, misalnya AUG → "a u ge" */
  [/\b[AUGC]{3}\b/g, (kodon) => kodon.split("").map((h) => ({ A: "a", U: "u", G: "ge", C: "se" })[h]).join(" ")],
  /* Tingkat 3: alel golongan darah ABO — "IᴬIᴮ" → "i a, i be", "Iᴮi" → "i be, i kecil" */
  [
    /I[ᴬᴮ](?:I[ᴬᴮ]|i)?|\bii\b|(?<=\s)i(?=[\s,.;:)—])/g,
    (token) =>
      (token.match(/I[ᴬᴮ]|i/g) ?? [])
        .map((b) => ({ "Iᴬ": "i a", "Iᴮ": "i be", i: "i kecil" })[b])
        .join(", "),
  ],
  /* huruf alel besar yang berdiri sendiri dan tak dikenal suara Indonesia */
  [/\b(alel|gen) C\b/g, (m) => m.replace(/C$/, "ce")],
  [/(?<=\s)W(?=[\s,.;:)—])/g, "we"],
  /* Tingkat 4: kromosom kelamin berhuruf ("XᴮXᵇ" → "eks be besar, eks be kecil") */
  [
    /[XZ][ᴮᵇᴴʰ](?:[XZ][ᴮᵇᴴʰ]|[YW])?/g,
    (token) =>
      (token.match(/[XZ][ᴮᵇᴴʰ]|[YW]/g) ?? [])
        .map((b) =>
          b.length === 1
            ? { Y: "ye", W: "we" }[b]
            : `${{ X: "eks", Z: "zet" }[b[0]]} ${{ "ᴮ": "be besar", "ᵇ": "be kecil", "ᴴ": "ha besar", "ʰ": "ha kecil" }[b[1]]}`,
        )
        .join(", "),
  ],
  [/(?<!memakai |46,)\bXX\b/g, "eks eks"],
  [/(?<!memakai |46,)\bXY\b/g, "eks ye"],
  [/(?<!\()\bXO\b(?!\))/g, "eks o"],
  [/\bSRY\b/g, "es er ye"],
  /* Tingkat 5: rumus kariotipe dan singkatan penyakit */
  [/\b45,X\b/g, "empat puluh lima, eks"],
  [/\b47,XXY\b/g, "empat puluh tujuh, eks eks ye"],
  [/\b63,X\b/g, "enam puluh tiga, eks"],
  [/\bBLAD\b/g, "be el a de"],
  [/\bBSE\b/g, "be es e"],
  [/\bPRRS\b/g, "pe er er es"],
  [/(?<=\d) \+ (?=\d)/g, " tambah "],
  [/(?<=\d) = (?=\d)/g, " sama dengan "],
  /* ujung untai DNA */
  [/5′/g, "lima aksen"],
  [/3′/g, "tiga aksen"],
];

/**
 * Padanan Inggris di dalam kurung — "siklus sel (cell cycle)" — tidak
 * dibacakan: suara berbahasa Indonesia akan melafalkannya dengan ejaan
 * Indonesia, dan itu mengajarkan lafal yang salah. Tulisannya tetap tampil di
 * subtitel. Kurung berisi kode seperti (G1) atau (S) tetap dibacakan.
 */
const KURUNG_INGGRIS = /\s*\(([A-Za-z][A-Za-z \-]{2,})\)/g;

/**
 * Menyusun teks ucapan beserta peta posisi: `peta[i]` = posisi huruf di narasi
 * asli untuk huruf ke-i teks ucapan. Dengan peta ini, waktu kata dari Edge
 * bisa dikembalikan ke posisinya di subtitel.
 */
function susunUcapan(narasi) {
  const suntingan = [];
  for (const m of narasi.matchAll(KURUNG_INGGRIS)) {
    if (m[1] === m[1].toUpperCase()) continue; // singkatan seperti (DNA): tetap dibaca
    suntingan.push({ awal: m.index, akhir: m.index + m[0].length, ganti: "" });
  }
  for (const [pola, ganti] of LAFAL) {
    for (const m of narasi.matchAll(pola)) {
      suntingan.push({ awal: m.index, akhir: m.index + m[0].length, ganti: typeof ganti === "function" ? ganti(m[0]) : ganti });
    }
  }
  suntingan.sort((a, b) => a.awal - b.awal);

  let teks = "";
  const peta = [];
  let i = 0;
  for (const s of suntingan) {
    if (s.awal < i) continue; // bertumpuk — yang pertama menang
    for (; i < s.awal; i++) {
      teks += narasi[i];
      peta.push(i);
    }
    for (const h of s.ganti) {
      teks += h;
      peta.push(s.awal);
    }
    i = s.akhir;
  }
  for (; i < narasi.length; i++) {
    teks += narasi[i];
    peta.push(i);
  }
  return { teks, peta };
}

/** Mencocokkan kata-kata dari Edge dengan posisinya di narasi: [posisi huruf, detik mulai]. */
function petakanKata(kataEdge, { teks, peta }) {
  const hasil = [];
  let kursor = 0;
  const kecil = teks.toLowerCase();
  for (const k of kataEdge) {
    const letak = kecil.indexOf(k.teks.toLowerCase(), kursor);
    if (letak < 0) {
      console.warn(`    ! kata "${k.teks}" tidak ditemukan di teks ucapan — dilewati`);
      continue;
    }
    hasil.push([peta[letak], bulat(k.mulai)]);
    kursor = letak + k.teks.length;
  }
  return hasil;
}

const bulat = (n) => Math.round(n * 1000) / 1000;
const sidik = (teks) => createHash("sha256").update(teks).digest("hex").slice(0, 10);

/* ------------------------------------------------------------------ *
 * Menjalankan
 * ------------------------------------------------------------------ */

const lama = existsSync(BERKAS_DATA) ? JSON.parse(readFileSync(BERKAS_DATA, "utf8")) : { pelajaran: {} };
const baru = { pelajaran: {} };
let direkam = 0;
let dipakaiUlang = 0;

for (const { pelajaran } of await muatSemuaPelajaran()) {
  const { slug } = pelajaran;
  console.log(`\n${pelajaran.nomor} ${pelajaran.judul}`);
  const folder = join(FOLDER_MP3, slug);
  mkdirSync(folder, { recursive: true });
  baru.pelajaran[slug] = {};

  for (const adegan of pelajaran.adegan) {
    const ucapan = susunUcapan(adegan.narasi);
    const namaBerkas = `${adegan.id}.mp3`;
    const sebelumnya = lama.pelajaran?.[slug]?.[adegan.id];
    const masihSama =
      !SEMUA &&
      sebelumnya &&
      sebelumnya.narasi === adegan.narasi &&
      sebelumnya.ucapan === ucapan.teks &&
      lama.suara === SUARA &&
      lama.laju === LAJU &&
      existsSync(join(folder, namaBerkas));
    if (COBA) {
      if (!masihSama) console.log(`  ? ${adegan.id}
    ${ucapan.teks}`);
      continue;
    }
    if (masihSama) {
      baru.pelajaran[slug][adegan.id] = sebelumnya;
      dipakaiUlang++;
      console.log(`  = ${adegan.id}`);
      continue;
    }

    const { mp3, kata } = await ucapkan(ucapan.teks, { suara: SUARA, laju: LAJU });
    if (!mp3.length || !kata.length) throw new Error(`Rekaman kosong untuk ${slug}/${adegan.id}`);
    writeFileSync(join(folder, namaBerkas), mp3);
    const durasi = bulat(lamaMp3(mp3));
    baru.pelajaran[slug][adegan.id] = {
      narasi: adegan.narasi,
      ucapan: ucapan.teks,
      /* ?v= berubah setiap rekaman berubah, agar peramban tidak memutar rekaman lama */
      berkas: `/suara/${slug}/${namaBerkas}?v=${sidik(mp3)}`,
      durasi,
      kata: petakanKata(kata, ucapan),
    };
    direkam++;
    console.log(`  + ${adegan.id} — ${durasi.toFixed(1)} detik, ${kata.length} kata`);
  }

  /* rekaman adegan yang sudah dihapus atau berganti nama — TIDAK dijalankan
     pada --coba, karena pada mode itu daftar rekaman sengaja kosong */
  if (COBA) continue;
  for (const f of readdirSync(folder)) {
    if (!baru.pelajaran[slug][f.replace(/\.mp3$/, "")]) rmSync(join(folder, f));
  }
}

if (COBA) process.exit(0);

/* folder pelajaran yang sudah tidak ada */
for (const f of readdirSync(FOLDER_MP3)) {
  if (!baru.pelajaran[f]) rmSync(join(FOLDER_MP3, f), { recursive: true });
}

writeFileSync(BERKAS_DATA, tulisData({ suara: SUARA, laju: LAJU, ...baru }));
console.log(`\nSelesai: ${direkam} adegan direkam, ${dipakaiUlang} dipakai ulang.`);

/** JSON yang tetap enak dibaca: satu baris untuk deret waktu kata tiap adegan. */
function tulisData(data) {
  const baris = ["{"];
  baris.push(`  "catatan": "Dibuat otomatis oleh alat/buat-suara.mjs (npm run suara). Jangan diubah dengan tangan.",`);
  baris.push(`  "suara": ${JSON.stringify(data.suara)},`);
  baris.push(`  "laju": ${JSON.stringify(data.laju)},`);
  baris.push(`  "pelajaran": {`);
  const slugs = Object.keys(data.pelajaran);
  slugs.forEach((slug, i) => {
    baris.push(`    ${JSON.stringify(slug)}: {`);
    const ids = Object.keys(data.pelajaran[slug]);
    ids.forEach((id, j) => {
      const a = data.pelajaran[slug][id];
      baris.push(`      ${JSON.stringify(id)}: {`);
      baris.push(`        "narasi": ${JSON.stringify(a.narasi)},`);
      baris.push(`        "ucapan": ${JSON.stringify(a.ucapan)},`);
      baris.push(`        "berkas": ${JSON.stringify(a.berkas)},`);
      baris.push(`        "durasi": ${a.durasi},`);
      baris.push(`        "kata": ${JSON.stringify(a.kata)}`);
      baris.push(`      }${j < ids.length - 1 ? "," : ""}`);
    });
    baris.push(`    }${i < slugs.length - 1 ? "," : ""}`);
  });
  baris.push("  }");
  baris.push("}");
  return `${baris.join("\n")}\n`;
}
