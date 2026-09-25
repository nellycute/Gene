import { JEDA_AWAL, type Adegan } from "./tipe";

/**
 * SUBTITEL BERPOTONG
 *
 * Narasi satu adegan bisa sampai ± 60 kata — terlalu panjang untuk dibaca
 * sekaligus tanpa memalingkan mata dari gambar (keluhan Nely, 23 Sep 2026).
 * Maka narasi dipotong per kalimat — kalimat yang panjang dipecah lagi di koma,
 * titik koma, titik dua, atau tanda pisah — lalu potongannya tampil bergiliran
 * mengikuti waktu, seperti subtitel film.
 *
 * Waktu tiap potongan (24 Sep 2026): kalau adegan punya rekaman suara, potongan
 * tampil tepat saat kata pertamanya diucapkan — waktu setiap kata dikirim oleh
 * mesin suara. Tanpa rekaman, lamanya sebanding dengan panjang hurufnya.
 * Naskah utuh tetap bisa dibaca di Catatan → Naskah.
 */

/** Huruf per potongan: ± 2 baris di laptop, 3 baris di HP. */
const MAKS = 110;
/** Potongan sependek ini digabung dengan tetangganya agar tidak berkedip. */
const MIN = 28;
/** Subtitel dan isyarat gambar tampil sedikit lebih dulu dari suaranya — mata butuh waktu membaca. */
export const MAJU = 0.12;

export type Potongan = {
  teks: string;
  /** Posisi huruf pertama potongan di narasi. */
  awal: number;
  /** Awal dan akhir potongan sebagai pecahan lama adegan (0–1), untuk adegan tanpa suara. */
  mulai: number;
  akhir: number;
};

/** Rentang [awal, akhir) di dalam narasi, tanpa spasi di tepinya. */
type Rentang = { awal: number; akhir: number };

export function potongSubtitel(narasi: string): Potongan[] {
  const bagian = pecahKalimat(narasi).flatMap((r) => pecahPanjang(narasi, r));

  const gabung: Rentang[] = [];
  for (const b of bagian) {
    const akhir = gabung[gabung.length - 1];
    const panjangAkhir = akhir ? akhir.akhir - akhir.awal : 0;
    if (akhir && (panjangAkhir < MIN || b.akhir - b.awal < MIN) && b.akhir - akhir.awal <= MAKS) {
      akhir.akhir = b.akhir;
    } else {
      gabung.push({ ...b });
    }
  }

  const total = gabung.reduce((j, r) => j + (r.akhir - r.awal), 0) || 1;
  let jalan = 0;
  return gabung.map((r) => {
    const mulai = jalan / total;
    jalan += r.akhir - r.awal;
    return { teks: narasi.slice(r.awal, r.akhir), awal: r.awal, mulai, akhir: jalan / total };
  });
}

/**
 * Detik (sejak awal adegan) saat narasi sampai pada huruf ke-`posisi`:
 * saat kata itu diucapkan, atau — tanpa rekaman — sebanding panjang huruf
 * di dalam potongan subtitelnya.
 */
export function detikNarasi(adegan: Adegan, posisi: number): number {
  const rekaman = adegan.suara;
  if (rekaman?.kata.length) {
    for (const [letak, detik] of rekaman.kata) if (letak >= posisi) return JEDA_AWAL + detik;
    return JEDA_AWAL + rekaman.kata[rekaman.kata.length - 1][1];
  }
  for (const p of potongSubtitel(adegan.narasi)) {
    if (posisi < p.awal + p.teks.length) {
      const dalam = Math.max(0, posisi - p.awal) / p.teks.length;
      return (p.mulai + dalam * (p.akhir - p.mulai)) * adegan.durasi;
    }
  }
  return adegan.durasi;
}

export type PotonganTerjadwal = { teks: string; /** detik sejak awal adegan */ mulai: number };

/** Potongan subtitel adegan beserta detik tampilnya. */
export function jadwalSubtitel(adegan: Adegan): PotonganTerjadwal[] {
  const maju = adegan.suara ? MAJU : 0;
  return potongSubtitel(adegan.narasi).map((p, i) => ({
    teks: p.teks,
    mulai: i === 0 ? 0 : Math.max(0, detikNarasi(adegan, p.awal) - maju),
  }));
}

/** Potongan yang sedang tampil pada detik `waktu` adegan. */
export function potonganPada(jadwal: PotonganTerjadwal[], waktu: number): number {
  let i = 0;
  for (let j = 0; j < jadwal.length; j++) if (jadwal[j].mulai <= waktu) i = j;
  return i;
}

/**
 * Memecah di akhir kalimat: . ! ? … yang diikuti spasi atau akhir teks.
 * Aman untuk angka karena bilangan desimal bahasa Indonesia memakai koma.
 */
function pecahKalimat(teks: string): Rentang[] {
  const hasil: Rentang[] = [];
  let awal = 0;
  for (let i = 0; i < teks.length; i++) {
    const h = teks[i];
    const akhirKalimat = h === "." || h === "!" || h === "?" || h === "…";
    if (akhirKalimat && (i + 1 === teks.length || teks[i + 1] === " ")) {
      hasil.push(rapikan(teks, awal, i + 1));
      awal = i + 1;
    }
  }
  hasil.push(rapikan(teks, awal, teks.length));
  return hasil.filter((r) => r.akhir > r.awal);
}

/**
 * Kalimat yang terlalu panjang dipecah di jeda alami yang paling dekat ke
 * tengahnya — tidak pernah di dalam kurung, karena padanan Inggris di dalam
 * kurung harus tetap menempel pada istilahnya.
 */
function pecahPanjang(teks: string, r: Rentang): Rentang[] {
  const k = teks.slice(r.awal, r.akhir);
  if (k.length <= MAKS) return [r];

  const titikPotong: number[] = [];
  let kurung = 0;
  for (let i = 0; i < k.length - 1; i++) {
    const h = k[i];
    if (h === "(") kurung++;
    else if (h === ")") kurung = Math.max(0, kurung - 1);
    if (kurung > 0 || k[i + 1] !== " ") continue;
    if (h === "," || h === ";" || h === ":" || h === "—") titikPotong.push(i + 1);
  }

  const tengah = k.length / 2;
  const layak = titikPotong.filter((i) => i >= MIN && k.length - i >= MIN);
  let potong = layak.sort((a, b) => Math.abs(a - tengah) - Math.abs(b - tengah))[0];

  // Tidak ada jeda yang layak: potong di spasi terdekat ke tengah.
  if (potong === undefined) {
    const kiri = k.lastIndexOf(" ", tengah);
    const kanan = k.indexOf(" ", tengah);
    potong = kiri < 0 ? kanan : kanan < 0 ? kiri : tengah - kiri <= kanan - tengah ? kiri : kanan;
    if (potong <= 0) return [r];
  }

  return [
    ...pecahPanjang(teks, rapikan(teks, r.awal, r.awal + potong)),
    ...pecahPanjang(teks, rapikan(teks, r.awal + potong, r.akhir)),
  ];
}

function rapikan(teks: string, awal: number, akhir: number): Rentang {
  while (awal < akhir && /\s/.test(teks[awal])) awal++;
  while (akhir > awal && /\s/.test(teks[akhir - 1])) akhir--;
  return { awal, akhir };
}
