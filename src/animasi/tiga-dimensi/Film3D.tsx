"use client";

import { useEffect, useRef } from "react";
import type { PropsAnimasi } from "../daftar";
import { buatStudio, type Permintaan, type Studio } from "./studio";

/**
 * Pembungkus semua gambar 3D bergaris.
 *
 * `bangun` dijalankan SEKALI saat gambar dipasang: ia menyusun model di studio
 * dan mengembalikan fungsi detak yang dipanggil setiap bingkai. Properti
 * adegan (tahap, sorot, fokus, waktu) dibaca lewat `baca()`, jadi pergantian
 * adegan tidak pernah membangun ulang model — hanya kamera dan sorotan yang
 * bergerak.
 *
 * Lapisan "tirai" berwarna panggung dipakai sutradara untuk perpindahan set
 * (misal tubuh → jaringan) agar terasa seperti terus memperbesar.
 */

export type Pembangun = (studio: Studio, baca: () => PropsAnimasi) => (dt: number) => Permintaan;

export function Film3D({ props, bangun }: { props: PropsAnimasi; bangun: Pembangun }) {
  const wadah = useRef<HTMLDivElement>(null);
  const tirai = useRef<HTMLDivElement>(null);
  const propsRef = useRef(props);

  useEffect(() => {
    propsRef.current = props;
  });

  useEffect(() => {
    const el = wadah.current;
    if (!el) return;
    const studio = buatStudio(el, tirai.current);
    studio.mulai(bangun(studio, () => propsRef.current));
    /* alat periksa saat pengembangan: window.__majukanFilm(20) = 20 bingkai seketika */
    const w = window as Window & {
      __majukanFilm?: (n: number) => void;
      __studioFilm?: unknown;
      __propsFilm?: () => PropsAnimasi;
    };
    if (process.env.NODE_ENV !== "production") {
      w.__majukanFilm = studio.majukan;
      w.__studioFilm = studio;
      /* perekam video memeriksa bahwa film sudah membaca adegan terbaru */
      w.__propsFilm = () => propsRef.current;
    }
    return () => {
      if (w.__majukanFilm === studio.majukan) {
        delete w.__majukanFilm;
        delete w.__studioFilm;
        delete w.__propsFilm;
      }
      studio.buang();
    };
  }, [bangun]);

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <div ref={wadah} className="h-full w-full" />
      <div ref={tirai} className="pointer-events-none absolute inset-0 bg-panggung" style={{ opacity: 0 }} />
    </div>
  );
}
