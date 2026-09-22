"use client";

import { useSyncExternalStore } from "react";

/**
 * Pilihan penonton: pakai gambar datar alih-alih 3D.
 * Disimpan di perangkat agar penonton dengan HP lemah cukup memilih sekali.
 * Dibaca lewat useSyncExternalStore supaya semua tombol selalu sepakat.
 */

const KUNCI = "tampilan-3d-ruang-genetika";
const PERISTIWA = "tampilan-3d-berubah";

function baca(): boolean {
  try {
    return localStorage.getItem(KUNCI) === "datar";
  } catch {
    return false;
  }
}

export function usePakaiDatar(): boolean {
  return useSyncExternalStore(
    (beritahu) => {
      window.addEventListener("storage", beritahu);
      window.addEventListener(PERISTIWA, beritahu);
      return () => {
        window.removeEventListener("storage", beritahu);
        window.removeEventListener(PERISTIWA, beritahu);
      };
    },
    baca,
    () => false,
  );
}

export function aturPakaiDatar(datar: boolean) {
  try {
    if (datar) localStorage.setItem(KUNCI, "datar");
    else localStorage.removeItem(KUNCI);
  } catch {
    /* penyimpanan bisa ditolak — pilihan tetap berlaku untuk sesi ini lewat peristiwa */
  }
  window.dispatchEvent(new Event(PERISTIWA));
}
