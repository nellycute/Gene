"use client";

import { useSyncExternalStore } from "react";

/**
 * Membaca keadaan jendela (alamat, lebar layar, tema) dengan cara yang direstui
 * React: lewat useSyncExternalStore, bukan setState di dalam useEffect.
 * Di server nilainya netral, lalu React memperbaruinya begitu halaman hidup.
 */

const tanpaLangganan = () => () => {};

/** Bagian ?query dari alamat halaman saat ini ("" di server). */
export function usePencarianAlamat(): string {
  return useSyncExternalStore(
    tanpaLangganan,
    () => window.location.search,
    () => "",
  );
}

/** Apakah sebuah media query cocok. `false` di server. */
export function useMediaCocok(kueri: string): boolean {
  return useSyncExternalStore(
    (beritahu) => {
      const mq = window.matchMedia(kueri);
      mq.addEventListener("change", beritahu);
      return () => mq.removeEventListener("change", beritahu);
    },
    () => window.matchMedia(kueri).matches,
    () => false,
  );
}

/**
 * Apakah halaman sedang gelap — mengikuti kelas di <html> atau perangkat.
 * Mendengarkan perubahan kelas (MutationObserver) dan perubahan perangkat.
 */
export function useSedangGelap(): boolean {
  return useSyncExternalStore(
    (beritahu) => {
      const pengamat = new MutationObserver(beritahu);
      pengamat.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", beritahu);
      return () => {
        pengamat.disconnect();
        mq.removeEventListener("change", beritahu);
      };
    },
    () => {
      const akar = document.documentElement;
      if (akar.classList.contains("gelap")) return true;
      if (akar.classList.contains("terang")) return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    },
    () => false,
  );
}
