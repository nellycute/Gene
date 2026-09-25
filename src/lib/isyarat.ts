import type { Adegan, Isyarat } from "./tipe";
import { MAJU, detikNarasi } from "./subtitel";

/**
 * JADWAL ISYARAT — kapan gambar berubah di tengah adegan.
 *
 * Waktu sebuah isyarat = saat kata kuncinya diucapkan (dari waktu kata di
 * rekaman suara), atau — tanpa rekaman — saat kata itu tampil di subtitel
 * berpotong (src/lib/subtitel.ts). Jadi kamera bergerak persis ketika
 * penonton mendengar atau membaca kata tersebut.
 */

export type IsyaratTerjadwal = Isyarat & {
  /** Detik sejak awal adegan. */
  mulai: number;
  /** Urutan isyarat di adegan — dipakai sebagai kunci perubahan. */
  nomor: number;
};

export function jadwalIsyarat(adegan: Adegan): IsyaratTerjadwal[] {
  if (!adegan.isyarat?.length) return [];
  const narasi = adegan.narasi.toLowerCase();
  const maju = adegan.suara ? MAJU : 0;
  const hasil: IsyaratTerjadwal[] = [];
  adegan.isyarat.forEach((isyarat, nomor) => {
    const letak = narasi.indexOf(isyarat.kata.toLowerCase());
    if (letak < 0) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Isyarat "${isyarat.kata}" tidak ditemukan di narasi adegan "${adegan.id}".`);
      }
      return;
    }
    hasil.push({ ...isyarat, mulai: Math.max(0, detikNarasi(adegan, letak) - maju), nomor });
  });
  return hasil.sort((a, b) => a.mulai - b.mulai);
}

/** Isyarat terakhir yang sudah lewat pada detik `waktu` adegan ini. */
export function isyaratPada(jadwal: IsyaratTerjadwal[], waktu: number): IsyaratTerjadwal | undefined {
  let aktif: IsyaratTerjadwal | undefined;
  for (const i of jadwal) if (i.mulai <= waktu + 1e-6) aktif = i;
  return aktif;
}
