"use client";

import { useSyncExternalStore } from "react";

/**
 * Pilihan penonton: tonton tanpa suara. Disimpan di perangkat — yang menonton
 * di tempat umum cukup mematikannya sekali. Dibaca lewat useSyncExternalStore.
 */

const KUNCI = "suara-ruang-genetika";
const PERISTIWA = "suara-berubah";

function baca(): boolean {
  try {
    return localStorage.getItem(KUNCI) === "bisu";
  } catch {
    return false;
  }
}

export function useBisu(): boolean {
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

export function aturBisu(bisu: boolean) {
  try {
    if (bisu) localStorage.setItem(KUNCI, "bisu");
    else localStorage.removeItem(KUNCI);
  } catch {
    /* penyimpanan bisa ditolak — pilihan tetap berlaku untuk sesi ini lewat peristiwa */
  }
  window.dispatchEvent(new Event(PERISTIWA));
}
