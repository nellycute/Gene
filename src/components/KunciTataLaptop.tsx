"use client";

import { useEffect } from "react";

/**
 * KUNCI TATA LETAK LAYAR MENONTON DI LAPTOP (Nely, 26 Sep 2026)
 *
 * Nely: di laptop teman, video dan Catatan ukurannya berbeda, ada celah di
 * antaranya, dan berubah lagi saat di-zoom. Ia ingin tampilannya PERSIS seperti
 * di laptopnya di semua ukuran layar. Maka di layar ≥ 1024 px, halaman dirancang
 * untuk satu kanvas tetap seukuran layar laptop Nely (1267 × 667 px CSS; kelas
 * `tata-terkunci` di globals.css membekukan ukurannya), lalu seluruh halaman
 * diperbesar/diperkecil sekaligus dengan CSS `zoom` — seperti foto yang di-zoom.
 * Sisa layar yang lebih lebar atau lebih tinggi menjadi pinggiran kertas.
 * Saat penonton zoom-out peramban, layar CSS membesar dan skala ikut naik,
 * jadi yang terlihat tetap sama.
 */

export const KANVAS_LEBAR = 1267;
export const KANVAS_TINGGI = 667;

export function KunciTataLaptop() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const lebar = window.matchMedia("(min-width: 1024px)");

    const terapkan = () => {
      if (!lebar.matches) {
        html.classList.remove("tata-terkunci");
        body.style.removeProperty("zoom");
      } else {
        html.classList.add("tata-terkunci");
        const skala = Math.min(window.innerWidth / KANVAS_LEBAR, window.innerHeight / KANVAS_TINGGI);
        body.style.setProperty("zoom", String(Math.round(skala * 1000) / 1000));
      }
      window.dispatchEvent(new Event("ubah-skala"));
    };

    terapkan();
    window.addEventListener("resize", terapkan);
    lebar.addEventListener("change", terapkan);
    return () => {
      window.removeEventListener("resize", terapkan);
      lebar.removeEventListener("change", terapkan);
      html.classList.remove("tata-terkunci");
      body.style.removeProperty("zoom");
      window.dispatchEvent(new Event("ubah-skala"));
    };
  }, []);

  return null;
}
