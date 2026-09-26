import * as THREE from "three";
import { DARAH, SIFAT } from "@/lib/warna";
import type { Studio } from "../studio";
import { bolaHalus, pembuatAcak, tabung } from "../bentuk";
import { buatLabel } from "../label3d";
import { bahan } from "../mendel/model-mendel";

/**
 * BENDA-BENDA TINGKAT 3 — perluasan Hukum Mendel.
 *
 *  - perdu berbunga terompet (bunga pukul empat, Linaria) dalam warna bunga SIFAT;
 *  - buah labu: warna (putih/kuning/hijau) dan bentuk (cakram/bulat/lonjong);
 *  - biji dan bulir gandum bergradasi merah (gandum0 … gandum4);
 *  - sel darah merah dengan antigen A, B, M, N — dibedakan warna DAN bentuk;
 *  - antibodi berbentuk Y;
 *  - "hantu": keturunan yang tak pernah lahir (alel letal) — tembus dan dicoret.
 */

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/* ================================================================== *
 * Bunga terompet dan perdu
 * ================================================================== */

export type WarnaTerompet = "merah" | "merahMuda" | "putih" | "ungu";
const ENTITAS_BUNGA: Record<WarnaTerompet, keyof typeof SIFAT> = {
  merah: "bungaMerah",
  merahMuda: "bungaMerahMuda",
  putih: "bungaPutih",
  ungu: "bungaUngu",
};

let gTerompet: THREE.BufferGeometry | null = null;
let gMahkota: THREE.BufferGeometry | null = null;

/** Bunga terompet menghadap +y: tabung sempit yang melebar menjadi lima cuping. */
export function bangunTerompet(studio: Studio, induk: THREE.Object3D, warna: WarnaTerompet, r = 0.5) {
  const e = ENTITAS_BUNGA[warna];
  const b = bahan(studio, `terompet-${warna}`, [e], SIFAT[e].warna, 0.003, undefined, THREE.DoubleSide);
  gTerompet ??= new THREE.LatheGeometry(
    Array.from({ length: 12 }, (_, i) => {
      const t = i / 11;
      return new THREE.Vector2(0.12 + 0.2 * t * t, t * 1.3);
    }),
    20,
  );
  gMahkota ??= (() => {
    const s = new THREE.Shape();
    for (let k = 0; k <= 100; k++) {
      const a = (k / 100) * Math.PI * 2;
      const rr = 0.75 + 0.14 * Math.cos(a * 5);
      if (k === 0) s.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
      else s.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.04, bevelEnabled: false, curveSegments: 4 });
    g.rotateX(-Math.PI / 2);
    g.translate(0, 1.3, 0);
    return g;
  })();
  const g = new THREE.Group();
  induk.add(g);
  studio.tambah(b, gTerompet, g);
  studio.tambah(b, gMahkota, g);
  g.scale.setScalar(r);
  return g;
}

/** Perdu kecil (± 3 tinggi) dengan beberapa bunga terompet di ujung cabang. */
export function bangunPerdu(studio: Studio, induk: THREE.Object3D, warna: WarnaTerompet, benih = 1) {
  const acak = pembuatAcak(benih);
  const g = new THREE.Group();
  induk.add(g);
  const hijau = bahan(studio, "tanaman", ["tanaman"], SIFAT.tanaman.warna, 0.003);
  const ujung: THREE.Vector3[] = [];
  for (let c = 0; c < 5; c++) {
    const a = c * 1.3 + acak();
    const tinggi = 1.8 + acak() * 1.1;
    const pucuk = v(Math.cos(a) * 0.8, tinggi, Math.sin(a) * 0.8);
    studio.tambah(hijau, tabung([v(0, 0, 0), v(Math.cos(a) * 0.25, tinggi * 0.5, Math.sin(a) * 0.25), pucuk], 0.06, 16, 6), g);
    ujung.push(pucuk);
    for (let d = 0; d < 3; d++) {
      const daun = bolaHalus(0.34, 12, 8);
      daun.scale(1, 0.14, 0.55);
      daun.rotateY(a + d * 2);
      const t = 0.35 + d * 0.2;
      daun.translate(Math.cos(a) * 0.8 * t + 0.2 * Math.cos(a + d * 2), tinggi * t, Math.sin(a) * 0.8 * t + 0.2 * Math.sin(a + d * 2));
      studio.tambah(hijau, daun, g);
    }
  }
  for (const p of ujung) {
    const b = bangunTerompet(studio, g, warna, 0.42);
    b.position.copy(p);
    b.rotation.set((acak() - 0.5) * 0.6, 0, (acak() - 0.5) * 0.6);
  }
  return g;
}

/* ================================================================== *
 * Labu
 * ================================================================== */

export function bangunLabu(studio: Studio, induk: THREE.Object3D, warna: "putih" | "kuning" | "hijau", bentuk: "bulat" | "cakram" | "lonjong" = "bulat", r = 0.7) {
  const e = warna === "putih" ? "labuPutih" : warna === "kuning" ? "labuKuning" : "labuHijau";
  const b = bahan(studio, `labu-${warna}`, [e], SIFAT[e].warna, 0.004);
  const g = new THREE.Group();
  induk.add(g);
  const bola = new THREE.SphereGeometry(1, 36, 24);
  const pos = bola.attributes.position as THREE.BufferAttribute;
  const p = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    p.fromBufferAttribute(pos, i);
    const a = Math.atan2(p.z, p.x);
    /* rusuk membujur; bentuk cakram bergerigi di tepinya */
    const rusuk = 1 + (bentuk === "cakram" ? 0.1 : 0.05) * Math.cos(a * (bentuk === "cakram" ? 10 : 8));
    const sy = bentuk === "cakram" ? 0.42 : bentuk === "lonjong" ? 1.9 : 0.92;
    pos.setXYZ(i, p.x * rusuk, p.y * sy, p.z * rusuk);
  }
  bola.computeVertexNormals();
  if (bentuk === "lonjong") bola.rotateZ(Math.PI / 2 - 0.15);
  studio.tambah(b, bola, g);
  const tangkai = new THREE.CylinderGeometry(0.08, 0.12, 0.35, 8);
  tangkai.translate(bentuk === "lonjong" ? 1.7 : 0, bentuk === "lonjong" ? 0.45 : bentuk === "cakram" ? 0.52 : 1.0, 0);
  if (bentuk === "lonjong") tangkai.rotateZ(0);
  studio.tambah(bahan(studio, "tangkaiLabu", ["tanaman"], "#7c9a5a", 0.003), tangkai, g);
  g.scale.setScalar(r);
  return g;
}

/* ================================================================== *
 * Gandum
 * ================================================================== */

export const kunciGandum = (jumlahR: number) => `gandum${Math.max(0, Math.min(4, jumlahR))}` as "gandum0";

let gBijiGandum: THREE.BufferGeometry | null = null;
export function bangunBijiGandum(studio: Studio, induk: THREE.Object3D, jumlahR: number, r = 0.2) {
  const e = kunciGandum(jumlahR);
  gBijiGandum ??= (() => {
    const g = new THREE.SphereGeometry(1, 18, 12);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const p = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      p.fromBufferAttribute(pos, i);
      /* alur memanjang di satu sisi biji */
      const alur = p.z > 0 ? 1 - 0.25 * Math.exp(-(p.x * p.x) / 0.02) : 1;
      pos.setXYZ(i, p.x * 0.62 * alur, p.y * 1.0, p.z * 0.55 * alur);
    }
    g.computeVertexNormals();
    return g;
  })();
  const m = studio.tambah(bahan(studio, e, [e], SIFAT[e].warna, 0.003), gBijiGandum, induk);
  m.scale.setScalar(r);
  return m;
}

/** Bulir gandum tegak: tangkai + dua baris biji berselang-seling + janggut. */
export function bangunBulir(studio: Studio, induk: THREE.Object3D, jumlahR: number) {
  const g = new THREE.Group();
  induk.add(g);
  const jerami = bahan(studio, "jerami", ["tanaman"], "#c9b27a", 0.003);
  studio.tambah(jerami, tabung([v(0, 0, 0), v(0.05, 1.2, 0), v(0, 2.4, 0)], 0.05, 12, 6), g);
  for (let i = 0; i < 9; i++) {
    for (const s of [-1, 1]) {
      const b = bangunBijiGandum(studio, g, jumlahR, 0.2);
      b.position.set(s * 0.14, 2.45 + i * 0.22 + (s > 0 ? 0.11 : 0), 0);
      b.rotation.z = -s * 0.45;
      const janggut = tabung([v(s * 0.2, 2.6 + i * 0.22, 0), v(s * 0.45, 3.3 + i * 0.22, 0)], 0.012, 4, 4);
      studio.tambah(jerami, janggut, g, false);
    }
  }
  return g;
}

/* ================================================================== *
 * Sel darah merah, antigen, antibodi
 * ================================================================== */

export type Antigen = "A" | "B" | "M" | "N";
const KUNCI_ANTIGEN: Record<Antigen, keyof typeof DARAH> = { A: "antigenA", B: "antigenB", M: "antigenM", N: "antigenN" };

let gSelDarah: THREE.BufferGeometry | null = null;

/** Tebal separuh sel darah merah pada jarak x (0–1) dari pusat: tebal di tepi, tipis di tengah. */
const tebalSel = (x: number) => 0.5 * Math.sqrt(Math.max(0, 1 - x * x)) * (0.28 + 1.6 * x * x - 1.1 * x ** 4);

/** Cakram cekung dua sisi (jari-jari 1) berbaring di bidang xz, antigen di permukaan atasnya. */
export function bangunSelDarah(studio: Studio, induk: THREE.Object3D, antigen: Antigen[], r = 1) {
  const g = new THREE.Group();
  induk.add(g);
  gSelDarah ??= (() => {
    /* profil dari pusat bawah → tepi → pusat atas, supaya normalnya menghadap keluar */
    const titik: THREE.Vector2[] = [];
    for (let i = 0; i <= 24; i++) {
      const x = i / 24;
      titik.push(new THREE.Vector2(Math.max(0.001, x), -tebalSel(x)));
    }
    for (let i = 24; i >= 0; i--) {
      const x = i / 24;
      titik.push(new THREE.Vector2(Math.max(0.001, x), tebalSel(x)));
    }
    return new THREE.LatheGeometry(titik, 40);
  })();
  studio.tambah(bahan(studio, "selDarahMerah", ["selDarahMerah"], DARAH.selDarahMerah.warna, 0.004), gSelDarah, g);
  const acak = pembuatAcak(antigen.join("").length + 3);
  const jumlah = 16;
  for (let i = 0; i < jumlah; i++) {
    const jenis = antigen[i % Math.max(1, antigen.length)];
    if (!jenis) break;
    const a = (i / jumlah) * Math.PI * 2 + acak() * 0.2;
    const rr = i % 2 === 0 ? 0.8 : 0.5;
    const tinggi = tebalSel(rr) + 0.1;
    const m = bangunAntigen(studio, g, jenis, 0.1);
    m.position.set(Math.cos(a) * rr, tinggi, Math.sin(a) * rr);
  }
  g.scale.setScalar(r);
  return g;
}

export function bangunAntigen(studio: Studio, induk: THREE.Object3D, jenis: Antigen, s = 0.1) {
  const e = KUNCI_ANTIGEN[jenis];
  const b = bahan(studio, e, [e], DARAH[e].warna, 0.003);
  const geo =
    jenis === "A"
      ? bolaHalus(s, 10, 8)
      : jenis === "B"
        ? new THREE.BoxGeometry(s * 1.6, s * 1.6, s * 1.6)
        : jenis === "M"
          ? new THREE.ConeGeometry(s, s * 2.4, 10)
          : new THREE.TorusGeometry(s * 0.8, s * 0.35, 8, 16);
  const m = studio.tambah(b, geo, induk);
  if (jenis === "N") m.rotation.x = Math.PI / 2;
  if (jenis === "M") m.position.y = s * 1.2;
  /* tangkai pendek yang menambat antigen ke membran */
  const tangkai = new THREE.CylinderGeometry(s * 0.2, s * 0.2, s * 1.4, 6);
  tangkai.translate(0, -s * 1.1, 0);
  studio.tambah(b, tangkai, m, false);
  return m;
}

/** Antibodi berbentuk Y (tinggi ± 1). */
export function bangunAntibodi(studio: Studio, induk: THREE.Object3D, s = 1) {
  const g = new THREE.Group();
  induk.add(g);
  const b = bahan(studio, "antibodi", ["antibodi"], DARAH.antibodi.warna, 0.003);
  const batang = new THREE.CapsuleGeometry(0.08, 0.45, 4, 8);
  batang.translate(0, -0.25, 0);
  studio.tambah(b, batang, g);
  for (const sx of [-1, 1]) {
    const lengan = new THREE.CapsuleGeometry(0.075, 0.45, 4, 8);
    lengan.rotateZ(-sx * 0.65);
    lengan.translate(sx * 0.2, 0.22, 0);
    studio.tambah(b, lengan, g);
  }
  g.scale.setScalar(s);
  return g;
}

/* ================================================================== *
 * Hantu: keturunan yang tak pernah lahir
 * ================================================================== */

/** Membuat semua bahan di dalam `benda` menjadi kelabu tembus dan memberi tanda silang. */
export function jadikanHantu(studio: Studio, benda: THREE.Object3D, ukuranSilang = 1.2) {
  const hantu = bahan(studio, "hantu", ["hantu"], "#b9bec5", 0.003, 0.28);
  benda.traverse((o) => {
    if (o instanceof THREE.Mesh && !(o instanceof THREE.InstancedMesh)) o.material = hantu.bahan;
  });
  const silang = buatLabel("✕", ukuranSilang);
  benda.add(silang);
  return silang;
}
