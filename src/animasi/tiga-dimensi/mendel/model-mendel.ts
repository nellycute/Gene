import * as THREE from "three";
import { SIFAT } from "@/lib/warna";
import type { Bagian, Studio } from "../studio";
import { bolaHalus, tabung } from "../bentuk";
import { buatLabel } from "../label3d";
import { bangunKromosom, type AsalKromosom, type Kromosom3D } from "../model-kromosom";

/**
 * BENDA-BENDA PEWARISAN — model bersama Tingkat 2 (dan Tingkat 3–4).
 *
 * Tanaman kacang ercis dengan tujuh sifat Mendel, biji bulat/keriput dan
 * kuning/hijau, papan Punnett, gamet berhuruf alel, sepasang kromosom homolog
 * yang membawa alel, tumpukan biji untuk menghitung rasio, dan koin peluang.
 * Semua warna sifat dari SIFAT di warna.ts; benda yang bukan sifat (papan,
 * gamet, koin) netral dan selalu berlabel.
 */

export const KERTAS = "#fbf9f5";
export const TINTA = "#5c6878";
export const GAMET = "#efe3c6";
const KOIN = "#d6c089";

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

export type WarnaBiji = "kuning" | "hijau";
export type BentukBiji = "bulat" | "keriput";
export type Biji = { warna: WarnaBiji; bentuk: BentukBiji };

/* ------------------------------------------------------------------ *
 * Bahan bersama per studio — satu bahan per sifat, supaya sorot bekerja
 * ------------------------------------------------------------------ */

const simpanan = new WeakMap<Studio, Map<string, Bagian>>();
export function bahan(studio: Studio, kunci: string, entitas: string[], warna: string, garis: false | number = 0.003, tembus?: number, sisi?: THREE.Side) {
  let peta = simpanan.get(studio);
  if (!peta) {
    peta = new Map();
    simpanan.set(studio, peta);
  }
  let b = peta.get(kunci);
  if (!b) {
    b = studio.bagian(entitas, warna, { garis, tembus, sisi });
    peta.set(kunci, b);
  }
  return b;
}

export const bahanBiji = (studio: Studio, b: Biji) =>
  bahan(
    studio,
    `biji-${b.warna}-${b.bentuk}`,
    [b.warna === "kuning" ? "bijiKuning" : "bijiHijau", b.bentuk === "bulat" ? "bijiBulat" : "bijiKeriput"],
    b.warna === "kuning" ? SIFAT.bijiKuning.warna : SIFAT.bijiHijau.warna,
  );

/* ------------------------------------------------------------------ *
 * Biji
 * ------------------------------------------------------------------ */

let gBulat: THREE.BufferGeometry | null = null;
let gKeriput: THREE.BufferGeometry | null = null;

/** Biji keriput: bola yang permukaannya berlekuk-lekuk (pati sedikit, air hilang saat kering). */
function geometriBiji(bentuk: BentukBiji) {
  if (bentuk === "bulat") {
    gBulat ??= (() => {
      const g = bolaHalus(1, 28, 20);
      g.scale(1, 0.92, 1);
      return g;
    })();
    return gBulat;
  }
  gKeriput ??= (() => {
    const g = new THREE.SphereGeometry(1, 40, 28);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const p = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      p.fromBufferAttribute(pos, i);
      const th = Math.atan2(p.z, p.x);
      const ph = Math.acos(THREE.MathUtils.clamp(p.y, -1, 1));
      /* lekuk dalam dan bersudut — harus tetap terbaca "keriput" walau bijinya kecil */
      const lekuk = 0.24 * Math.pow(Math.abs(Math.sin(th * 3 + ph * 2.5) * Math.sin(ph * 3.5 + th)), 0.7);
      p.multiplyScalar(1 - lekuk);
      pos.setXYZ(i, p.x * 1.05, p.y * 0.8, p.z * 1.05);
    }
    g.computeVertexNormals();
    return g;
  })();
  return gKeriput;
}

export function bangunBiji(studio: Studio, induk: THREE.Object3D, b: Biji, r = 0.35) {
  const m = studio.tambah(bahanBiji(studio, b), geometriBiji(b.bentuk), induk);
  m.scale.setScalar(r);
  return m;
}

/** Tumpukan biji untuk menghitung rasio. */
export function bangunTumpukan(studio: Studio, induk: THREE.Object3D, jumlah: number, b: Biji, acak: () => number, r = 0.22) {
  const g = new THREE.Group();
  induk.add(g);
  for (let i = 0; i < jumlah; i++) {
    const lapis = Math.floor(Math.sqrt(i / 3));
    const a = i * 2.4;
    const jari = (1 - lapis * 0.25) * Math.sqrt(i % 30) * r * 1.1;
    const m = bangunBiji(studio, g, b, r);
    m.position.set(Math.cos(a) * jari + (acak() - 0.5) * 0.05, r + lapis * r * 1.6, Math.sin(a) * jari);
    m.rotation.set(acak() * 3, acak() * 3, 0);
  }
  return g;
}

/* ------------------------------------------------------------------ *
 * Tanaman kacang ercis
 * ------------------------------------------------------------------ */

export type OpsiTanaman = {
  tinggi?: boolean;
  bunga?: "ungu" | "putih";
  letakBunga?: "ketiak" | "ujung";
  polong?: "hijau" | "kuning";
  bentukPolong?: "gembung" | "bersekat";
  /** Biji yang tampak di polong yang terbuka. */
  biji?: Biji[];
  entitas?: string[];
};

export function bangunBunga(studio: Studio, induk: THREE.Object3D, warna: "ungu" | "putih", e: string[]) {
  const b = bahan(studio, `bunga-${warna}-${e.join(",")}`, [warna === "ungu" ? "bungaUngu" : "bungaPutih", ...e], warna === "ungu" ? SIFAT.bungaUngu.warna : SIFAT.bungaPutih.warna, 0.003);
  const g = new THREE.Group();
  induk.add(g);
  const bendera = bolaHalus(0.34, 16, 12);
  bendera.scale(1, 1, 0.3);
  bendera.translate(0, 0.25, -0.05);
  studio.tambah(b, bendera, g);
  for (const s of [-1, 1]) {
    const sayap = bolaHalus(0.2, 12, 10);
    sayap.scale(0.9, 0.6, 0.6);
    sayap.translate(s * 0.18, 0.02, 0.12);
    studio.tambah(b, sayap, g);
  }
  const lunas = bolaHalus(0.14, 12, 10);
  lunas.scale(0.8, 0.6, 1.2);
  lunas.translate(0, -0.05, 0.2);
  studio.tambah(b, lunas, g);
  return g;
}

export function bangunPolong(studio: Studio, induk: THREE.Object3D, o: OpsiTanaman, e: string[]) {
  const warna = o.polong ?? "hijau";
  const b = bahan(studio, `polong-${warna}-${e.join(",")}`, [warna === "hijau" ? "polongHijau" : "polongKuning", ...e], warna === "hijau" ? SIFAT.polongHijau.warna : SIFAT.polongKuning.warna, 0.003);
  const g = new THREE.Group();
  induk.add(g);
  if ((o.bentukPolong ?? "gembung") === "gembung") {
    const kulit = new THREE.CapsuleGeometry(0.24, 1.2, 8, 16);
    kulit.scale(1, 1, o.biji ? 0.55 : 0.8);
    if (o.biji) kulit.translate(0, 0, -0.12);
    studio.tambah(b, kulit, g);
  } else {
    /* polong bersekat: menyempit di antara biji */
    for (let i = 0; i < 5; i++) {
      const s = bolaHalus(0.19, 14, 10);
      s.scale(1, 1.1, 0.7);
      s.translate(0, -0.6 + i * 0.3, 0);
      studio.tambah(b, s, g);
    }
  }
  (o.biji ?? []).forEach((bj, i) => {
    const m = bangunBiji(studio, g, bj, 0.15);
    m.position.set(0, -0.48 + i * 0.24, 0.1);
  });
  return g;
}

/** Tanaman ercis tegak di titik asal. Tinggi ± 5 (tinggi) atau ± 2 (kerdil). */
export function bangunTanaman(studio: Studio, induk: THREE.Object3D, o: OpsiTanaman = {}) {
  const e = o.entitas ?? [];
  const g = new THREE.Group();
  induk.add(g);
  const hijau = bahan(studio, `tanaman-${e.join(",")}`, ["tanaman", ...e], SIFAT.tanaman.warna, 0.003);
  const ruas = o.tinggi === false ? 3 : 7;
  const titik: THREE.Vector3[] = [];
  for (let i = 0; i <= ruas; i++) titik.push(v(0.08 * Math.sin(i * 1.7), i * 0.72, 0.06 * Math.cos(i * 1.3)));
  studio.tambah(hijau, tabung(titik, 0.08, ruas * 12, 8), g);
  for (let i = 1; i <= ruas; i++) {
    const arah = i * 1.9;
    for (const s of [-1, 1]) {
      const daun = bolaHalus(0.38, 16, 12);
      daun.scale(1, 0.18, 0.6);
      daun.translate(s * 0.42, 0, 0);
      daun.rotateY(arah);
      daun.translate(titik[i].x, titik[i].y - 0.1, titik[i].z);
      studio.tambah(hijau, daun, g);
    }
  }
  /* bunga di ketiak daun (sepanjang batang) atau bergerombol di ujung */
  const letakBunga =
    (o.letakBunga ?? "ketiak") === "ketiak"
      ? [Math.max(2, ruas - 3), ruas - 1].map((i) => titik[i].clone().add(v(0.35, 0.1, 0.1)))
      : [0, 1, 2].map((k) => titik[ruas].clone().add(v(Math.cos(k * 2.1) * 0.3, 0.25 + k * 0.08, Math.sin(k * 2.1) * 0.3)));
  for (const p of letakBunga) {
    const f = bangunBunga(studio, g, o.bunga ?? "ungu", e);
    f.position.copy(p);
  }
  /* satu polong menggantung di tengah batang */
  const pol = bangunPolong(studio, g, o, e);
  const ip = Math.max(1, Math.floor(ruas / 2));
  pol.position.copy(titik[ip]).add(v(-0.45, -0.3, 0.2));
  pol.rotation.z = -0.4;
  return g;
}

/* ------------------------------------------------------------------ *
 * Gamet dan kromosom beralel
 * ------------------------------------------------------------------ */

export function bangunGamet(studio: Studio, induk: THREE.Object3D, teks: string, r = 0.5) {
  const g = new THREE.Group();
  induk.add(g);
  studio.tambah(bahan(studio, "gamet", ["gamet"], GAMET, 0.003), bolaHalus(r, 20, 14), g);
  const l = buatLabel(teks, r * 0.9);
  l.position.z = r + 0.05;
  g.add(l);
  return g;
}

export type PasanganAlel = { grup: THREE.Group; kromosom: Kromosom3D[]; label: THREE.Sprite[] };

/**
 * Sepasang kromosom homolog (ungu dari ibu, toska dari ayah) dengan pita di
 * lokus yang sama dan huruf alel di sampingnya.
 */
export function bangunPasanganAlel(
  studio: Studio,
  induk: THREE.Object3D,
  alel: [string, string],
  o: { p?: number; q?: number; lokus?: number; jarak?: number; kromatid?: 1 | 2; ukuranHuruf?: number } = {},
): PasanganAlel {
  const grup = new THREE.Group();
  induk.add(grup);
  const p = o.p ?? 0.9;
  const q = o.q ?? 1.6;
  const lokus = o.lokus ?? 0.62;
  const jarak = o.jarak ?? 0.9;
  const asal: AsalKromosom[] = ["kromatin", "kromosomAyah"];
  const kromosom = asal.map((a, i) => {
    const k = new THREE.Group();
    k.position.x = (i === 0 ? -1 : 1) * jarak;
    grup.add(k);
    return bangunKromosom(studio, k, { p, q, jari: 0.3, asal: a, pita: [lokus] }, o.kromatid ?? 1);
  });
  const y = p - lokus * (p + q);
  const label = alel.map((a, i) => {
    const l = buatLabel(a, o.ukuranHuruf ?? 0.55);
    l.position.set((i === 0 ? -1 : 1) * (jarak + 0.65), y, 0.2);
    grup.add(l);
    return l;
  });
  return { grup, kromosom, label };
}

/* ------------------------------------------------------------------ *
 * Papan Punnett
 * ------------------------------------------------------------------ */

export type IsiSel = { teks: string; biji?: Biji; ikon?: (induk: THREE.Group) => void };

export type Punnett = {
  grup: THREE.Group;
  sel: THREE.Group[][];
  kepala: THREE.Group[];
  /** Pusat sel (i = baris, j = kolom) dalam koordinat grup. */
  pusat: (i: number, j: number) => THREE.Vector3;
};

/**
 * Papan Punnett datar menghadap +z, berpusat di titik asal. Kolom = gamet
 * induk jantan (di atas), baris = gamet induk betina (di kiri).
 */
export function bangunPunnett(
  studio: Studio,
  induk: THREE.Object3D,
  kolom: string[],
  baris: string[],
  isi: (i: number, j: number) => IsiSel,
  s = 1.6,
): Punnett {
  const grup = new THREE.Group();
  induk.add(grup);
  const n = kolom.length + 1;
  const m = baris.length + 1;
  const W = n * s;
  const H = m * s;
  const papan = new THREE.BoxGeometry(W + 0.2, H + 0.2, 0.12);
  papan.translate(0, 0, -0.08);
  studio.tambah(bahan(studio, "papan", ["papan"], KERTAS, 0.004), papan, grup);
  const bGaris = bahan(studio, "garisPapan", ["papan"], TINTA, false);
  const garis = (a: THREE.Vector3, b: THREE.Vector3) => {
    const g = new THREE.CylinderGeometry(0.025, 0.025, a.distanceTo(b), 6);
    g.applyMatrix4(new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(0.5), new THREE.Quaternion().setFromUnitVectors(v(0, 1, 0), b.clone().sub(a).normalize()), v(1, 1, 1)));
    studio.tambah(bGaris, g, grup, false);
  };
  for (let j = 1; j < n; j++) garis(v(-W / 2 + j * s, H / 2, 0), v(-W / 2 + j * s, -H / 2, 0));
  for (let i = 1; i < m; i++) garis(v(-W / 2, H / 2 - i * s, 0), v(W / 2, H / 2 - i * s, 0));
  const pusat = (i: number, j: number) => v(-W / 2 + (j + 1.5) * s, H / 2 - (i + 1.5) * s, 0.05);
  const kepala: THREE.Group[] = [];
  kolom.forEach((t, j) => {
    const g = bangunGamet(studio, grup, t, s * 0.3);
    g.position.set(-W / 2 + (j + 1.5) * s, H / 2 - 0.5 * s, 0.2);
    kepala.push(g);
  });
  baris.forEach((t, i) => {
    const g = bangunGamet(studio, grup, t, s * 0.3);
    g.position.set(-W / 2 + 0.5 * s, H / 2 - (i + 1.5) * s, 0.2);
    kepala.push(g);
  });
  const sel = baris.map((_, i) =>
    kolom.map((__, j) => {
      const g = new THREE.Group();
      g.position.copy(pusat(i, j));
      grup.add(g);
      const d = isi(i, j);
      const l = buatLabel(d.teks, s * (d.teks.length > 4 ? 0.2 : 0.26));
      l.position.set(0, d.biji || d.ikon ? s * 0.22 : 0, 0.1);
      g.add(l);
      if (d.biji) {
        const b = bangunBiji(studio, g, d.biji, s * 0.16);
        b.position.set(0, -s * 0.18, 0.15);
      }
      d.ikon?.(g);
      return g;
    }),
  );
  return { grup, sel, kepala, pusat };
}

/* ------------------------------------------------------------------ *
 * Koin peluang
 * ------------------------------------------------------------------ */

export function bangunKoin(studio: Studio, induk: THREE.Object3D, r = 0.7) {
  const g = new THREE.Group();
  induk.add(g);
  const k = new THREE.CylinderGeometry(r, r, r * 0.14, 32);
  k.rotateX(Math.PI / 2);
  studio.tambah(bahan(studio, "koin", ["koin"], KOIN, 0.004), k, g);
  return g;
}

/** Fenotip biji dari genotip huruf (R/r bentuk, Y/y warna). */
export function bijiDari(genotip: string): Biji {
  return {
    bentuk: genotip.includes("R") || !/[rR]/.test(genotip) ? "bulat" : "keriput",
    warna: genotip.includes("Y") || !/[yY]/.test(genotip) ? "kuning" : "hijau",
  };
}
