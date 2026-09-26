import * as THREE from "three";
import { lihat, type Pandangan, type Studio } from "../studio";
import { alas, aturLabel, labelHidup, panah, v, type LabelHidup, type Set3D } from "../rangkai-set";
import type { PropsAnimasi } from "../../daftar";
import { kali, lantai, tulis } from "../mendel/bantu";

/**
 * PERSILANGAN P → F1 → F2 — kerangka bersama banyak set Tingkat 3
 * (bunga pukul empat, jengger ayam, labu, tikus, Linaria, kacang manis,
 * gandum). Tiap "benda" dibangun oleh fungsi kecil, jadi model apa pun bisa
 * dipakai: bunga, ayam, labu, tikus, bulir gandum.
 *
 *   P: induk × induk  →  F1  →  F2: beberapa kelompok, masing-masing satu
 *   contoh benda + angka perbandingannya.
 */

export type Benda = {
  buat: (studio: Studio, g: THREE.Group) => void;
  label: string;
  /** Genotip atau keterangan kecil di bawah label. */
  sub?: string;
};

export type OpsiSilang = {
  induk: [Benda, Benda];
  f1: Benda;
  f2: (Benda & { n: number })[];
  /** Tinggi benda kira-kira (untuk menaruh judul dan kamera). */
  tinggi?: number;
  /** Isi tambahan di sebelah kanan F2 (misalnya gradasi gandum). */
  tambahan?: (studio: Studio, grup: THREE.Group, xMulai: number) => { fokus: Record<string, Pandangan>; perbarui?: (p: PropsAnimasi, dt: number) => void };
};

export function buatSetSilangUmum(o: OpsiSilang) {
  return (studio: Studio): Set3D => {
    const grup = new THREE.Group();
    const T = o.tinggi ?? 3.2;
    const Y_JUDUL = T + 1.9;
    const letak = (b: Benda, x: number, induk: THREE.Object3D = grup) => {
      alas(studio, induk, x, 0, 1.25);
      const g = new THREE.Group();
      g.position.set(x, 0.55, 0);
      induk.add(g);
      b.buat(studio, g);
      tulis(induk, b.label, 0.46, x, -0.45, 1.5);
      if (b.sub) tulis(induk, b.sub, 0.4, x, -1.15, 1.5);
      return g;
    };
    /* P */
    const XP = [-10.4, -6.6];
    const benda: THREE.Group[] = [];
    o.induk.forEach((b, i) => benda.push(letak(b, XP[i])));
    kali(grup, -8.5, T * 0.55, 0.8, 0.8);
    tulis(grup, "P", 0.9, -8.5, Y_JUDUL);
    panah(studio, grup, [v(-4.9, T * 0.5, 0), v(-3.5, T * 0.5 + 0.7, 0), v(-2.1, T * 0.5, 0)], 0.07);
    /* F1 */
    const f1 = new THREE.Group();
    grup.add(f1);
    benda.push(letak(o.f1, 0, f1));
    tulis(f1, "F1", 0.9, 0, Y_JUDUL);
    panah(studio, grup, [v(2, T * 0.5, 0), v(3.3, T * 0.5 + 0.7, 0), v(4.6, T * 0.5, 0)], 0.07);
    tulis(grup, "F1 × F1", 0.4, 3.3, T * 0.5 + 1.4);
    /* F2 */
    const f2 = new THREE.Group();
    grup.add(f2);
    const X0 = 6.6;
    const LANGKAH = 3.1;
    const lAngka: LabelHidup[] = [];
    o.f2.forEach((b, k) => {
      const x = X0 + k * LANGKAH;
      benda.push(letak(b, x, f2));
      const l = labelHidup(f2, String(b.n), 0.9);
      l.sprite.position.set(x, T + 0.9, 0.3);
      lAngka.push(l);
    });
    const xAkhir = X0 + (o.f2.length - 1) * LANGKAH;
    const xTengahF2 = (X0 + xAkhir) / 2;
    tulis(f2, "F2", 0.9, xTengahF2, Y_JUDUL + 0.9);
    f1.visible = false;
    f2.visible = false;
    const lebar = xAkhir + 1.8 - -11.8;
    const tambahan = o.tambahan?.(studio, grup, xAkhir + 3.2);
    lantai(grup, lebar + 4, 6, (xAkhir - 11.8) / 2);
    const yT = T * 0.45;
    const fokus: Record<string, Pandangan> = {
      utuh: lihat((xAkhir - 11.8) / 2, yT, 0, Math.max(26, lebar * 0.86), 0, 1.3),
      p: lihat(-8.5, yT, 0, 14.5, 0, 1.3),
      f1: lihat(-2.5, yT, 0, 21, 0, 1.3),
      f2: lihat(xTengahF2, yT + 0.7, 0, Math.max(16, (xAkhir - X0 + 4) * 1.05), 0, 1.3),
      ...tambahan?.fokus,
    };
    return {
      grup,
      fokus,
      bayangan: { pusat: v((xAkhir - 11.8) / 2, 0, 0), jangkauan: lebar / 2 + 3 },
      perbarui: (p, dt) => {
        const f = p.fokus ?? "utuh";
        const t = p.detik ?? 0;
        /* F1 muncul sejak fokus F1; F2 sejak fokus F2 (atau pada tampak utuh) */
        const adaF1 = f !== "p";
        const adaF2 = f !== "p" && f !== "f1";
        f1.visible = adaF1;
        f2.visible = adaF2;
        lAngka.forEach((l) => aturLabel(l, adaF2 && f !== "gradasi", dt, l.sprite.position));
        benda.forEach((b, i) => (b.rotation.y = 0.25 * Math.sin(t * 0.5 + i)));
        tambahan?.perbarui?.(p, dt);
      },
    };
  };
}
