import * as THREE from "three";
import { SIFAT } from "@/lib/warna";
import type { Studio } from "../studio";
import { bolaHalus, pembuatAcak, tabung } from "../bentuk";
import { buatLabel } from "../label3d";
import { bahanBulu } from "../model-hewan";
import { bangunKromosom, KROMOSOM_X, KROMOSOM_Y, type AsalKromosom } from "../model-kromosom";
import { bahan, GAMET, KERTAS, TINTA } from "../mendel/model-mendel";
import { garis } from "../mendel/bantu";

/**
 * BENDA-BENDA TINGKAT 4 — kelamin dan pautan.
 *
 *  - kromosom kelamin X, Y, Z, W (ukuran dari ideogram) dengan penanda alel;
 *  - sel telur dan sperma sederhana;
 *  - domba (bertanduk / tidak, muka hitam Suffolk), lalat buah (liar, hitam,
 *    sayap pendek), penyu dan telurnya;
 *  - lambang silsilah: kotak, lingkaran, terisi, setengah terisi.
 */

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const PASIR = "#e6d3ad";
const CANGKANG = "#8d8a5c";
const KULIT_PENYU = "#a3a07a";

/* ================================================================== *
 * Kromosom kelamin
 * ================================================================== */

export type JenisKelaminKromosom = "X" | "Y" | "Z" | "W";
/* Z ayam kira-kira sebesar kromosom 4–5 ayam; W kecil. Cukup untuk gambar. */
const UKURAN: Record<JenisKelaminKromosom, { panjang: number; p: number }> = {
  X: KROMOSOM_X,
  Y: KROMOSOM_Y,
  Z: { panjang: 0.6, p: 0.45 },
  W: { panjang: 0.24, p: 0.4 },
};

/**
 * Satu kromosom kelamin tegak (sentromer di titik asal), opsional dengan
 * penanda alel: gelang terang di `lokus` (0 = ujung p, 1 = ujung q) + huruf.
 */
export function bangunKromosomKelamin(
  studio: Studio,
  induk: THREE.Object3D,
  jenis: JenisKelaminKromosom,
  o: { L?: number; asal?: AsalKromosom; alel?: string; lokus?: number; jari?: number; ukuranHuruf?: number; sisi?: -1 | 1; kromatid?: 1 | 2 } = {},
) {
  const g = new THREE.Group();
  induk.add(g);
  const L = o.L ?? 6;
  const u = UKURAN[jenis];
  const p = L * u.panjang * u.p;
  const q = L * u.panjang * (1 - u.p);
  const jari = o.jari ?? 0.4;
  const kr = bangunKromosom(studio, g, { p, q, jari, asal: o.asal ?? "kromatin" }, o.kromatid ?? 1);
  if (o.kromatid === 2) kr.buka(0.3);
  if (o.alel) {
    const lokus = o.lokus ?? 0.7;
    const y = p - lokus * (p + q);
    const gelang = bahan(studio, "gelangLokus", ["lokus"], "#f6f1e6", 0.003);
    for (const k of kr.kromatid) {
      const c = new THREE.CylinderGeometry(jari * 1.12, jari * 1.12, jari * 0.55, 24);
      c.translate(0, y, 0);
      studio.tambah(gelang, c, lokus <= u.p ? k.lenganP : k.lenganQ);
    }
    const h = buatLabel(o.alel, o.ukuranHuruf ?? 0.6);
    h.position.set((o.sisi ?? 1) * (jari + 0.55), y, 0.2);
    g.add(h);
  }
  const nama = buatLabel(jenis, (o.ukuranHuruf ?? 0.6) * 1.1);
  nama.position.set(0, p + 0.55, 0.2);
  g.add(nama);
  return { grup: g, p, q, kromosom: kr };
}

/* ================================================================== *
 * Sel telur dan sperma
 * ================================================================== */

export function bangunTelur(studio: Studio, induk: THREE.Object3D, huruf: string, r = 1.4) {
  const g = new THREE.Group();
  induk.add(g);
  studio.tambah(bahan(studio, "selTelur", ["gamet", "selTelur"], GAMET, 0.003, 0.55), bolaHalus(r, 32, 22), g, false);
  const inti = studio.tambah(bahan(studio, "intiTelur", ["gamet"], "#d8c79c", 0.003), bolaHalus(r * 0.35, 18, 12), g);
  inti.position.set(r * 0.15, r * 0.1, r * 0.2);
  const l = buatLabel(huruf, r * 0.55);
  l.position.set(r * 0.15, r * 0.1, r * 0.6);
  g.add(l);
  return g;
}

/** Sperma menghadap −x: kepala lonjong + ekor bergelombang. */
export function bangunSperma(studio: Studio, induk: THREE.Object3D, huruf: string, s = 1) {
  const g = new THREE.Group();
  induk.add(g);
  const b = bahan(studio, "sperma", ["gamet", "sperma"], GAMET, 0.003);
  const kepala = bolaHalus(0.35, 18, 12);
  kepala.scale(1.35, 0.9, 0.9);
  studio.tambah(b, kepala, g);
  const titik: THREE.Vector3[] = [];
  for (let i = 0; i <= 12; i++) titik.push(v(0.4 + i * 0.22, Math.sin(i * 0.9) * 0.12, 0));
  studio.tambah(b, tabung(titik, 0.045, 40, 6), g, false);
  const l = buatLabel(huruf, 0.42);
  l.position.set(0, 0, 0.45);
  g.add(l);
  g.scale.setScalar(s);
  return g;
}

/* ================================================================== *
 * Domba
 * ================================================================== */

/** Domba menghadap +x, tinggi ± 2,8. Bulu wol berbintil; muka hitam untuk Suffolk. */
export function bangunDomba(studio: Studio, induk: THREE.Object3D, o: { tanduk?: boolean; jantan?: boolean; mukaHitam?: boolean }) {
  const g = new THREE.Group();
  induk.add(g);
  const wol = bahanBulu(studio, "putih");
  const muka = o.mukaHitam ? bahanBulu(studio, "hitam") : bahan(studio, "mukaDomba", ["mukaDomba"], "#e9dcc9", 0.004);
  const tanduk = bahan(studio, "tandukDomba", ["tanduk"], "#d8c9a8", 0.003);
  const badan = new THREE.SphereGeometry(1, 36, 24);
  const pos = badan.attributes.position as THREE.BufferAttribute;
  const p = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    p.fromBufferAttribute(pos, i);
    const bintil = 1 + 0.05 * Math.sin(p.x * 17) * Math.sin(p.y * 15) * Math.sin(p.z * 13);
    pos.setXYZ(i, p.x * 1.55 * bintil, p.y * 0.95 * bintil, p.z * 0.95 * bintil);
  }
  badan.computeVertexNormals();
  badan.translate(0, 1.7, 0);
  studio.tambah(wol, badan, g);
  for (const [x, z] of [
    [-1, -0.45],
    [-1, 0.45],
    [1, -0.45],
    [1, 0.45],
  ]) {
    const k = new THREE.CapsuleGeometry(0.14, 0.9, 6, 10);
    k.translate(x, 0.55, z);
    studio.tambah(muka, k, g);
  }
  const kepala = bolaHalus(0.45, 20, 14);
  kepala.scale(1.35, 0.9, 0.8);
  kepala.translate(1.85, 2.3, 0);
  studio.tambah(muka, kepala, g);
  for (const z of [-1, 1]) {
    const telinga = bolaHalus(0.18, 10, 8);
    telinga.scale(1.6, 0.4, 0.6);
    telinga.translate(1.55, 2.5, z * 0.5);
    studio.tambah(muka, telinga, g);
    const m = bolaHalus(0.06, 8, 6);
    m.translate(2.2, 2.45, z * 0.28);
    studio.tambah(bahan(studio, "mataDomba", ["mata"], "#1d1a18", false), m, g, false);
    if (o.tanduk) {
      /* tanduk melingkar spiral di sisi kepala; jantan lebih besar */
      const s = o.jantan ? 1 : 0.6;
      const titik: THREE.Vector3[] = [];
      for (let i = 0; i <= 30; i++) {
        const a = (i / 30) * Math.PI * 1.7;
        const r = (0.55 - i * 0.012) * s;
        titik.push(v(1.55 - Math.sin(a) * r, 2.75 - (1 - Math.cos(a)) * r, z * (0.35 + i * 0.012 * s)));
      }
      studio.tambah(tanduk, tabung(titik, 0.12 * s, 60, 10), g);
    }
  }
  return g;
}

/* ================================================================== *
 * Lalat buah
 * ================================================================== */

/** Lalat buah menghadap +x, panjang ± 3 (diperbesar). */
export function bangunLalat(studio: Studio, induk: THREE.Object3D, o: { hitam?: boolean; sayapPendek?: boolean } = {}) {
  const g = new THREE.Group();
  induk.add(g);
  const e = o.hitam ? "tubuhHitam" : "tubuhLalat";
  const tubuh = bahan(studio, e, [e], SIFAT[e].warna, 0.004);
  const mata = bahan(studio, "mataLalat", ["mataLalat"], SIFAT.mataLalat.warna, 0.003);
  const sayap = bahan(studio, "sayapLalat", ["sayap"], "#dfe7ee", 0.003, 0.45);
  const kaki = bahan(studio, `kakiLalat-${e}`, [e], SIFAT[e].warna, false);
  const dada = bolaHalus(0.45, 20, 14);
  dada.scale(1.1, 0.9, 0.9);
  dada.translate(0.3, 1.1, 0);
  studio.tambah(tubuh, dada, g);
  const perut = bolaHalus(0.5, 20, 14);
  perut.scale(1.5, 0.8, 0.85);
  perut.translate(-0.7, 1.0, 0);
  studio.tambah(tubuh, perut, g);
  const kepala = bolaHalus(0.3, 18, 12);
  kepala.translate(0.95, 1.15, 0);
  studio.tambah(tubuh, kepala, g);
  for (const z of [-1, 1]) {
    const m = bolaHalus(0.19, 16, 12);
    m.scale(0.8, 1, 0.8);
    m.translate(1.05, 1.2, z * 0.2);
    studio.tambah(mata, m, g);
    /* sayap: panjang dan lebar, atau keriput pendek (vestigial) */
    const s = bolaHalus(0.55, 16, 10);
    if (o.sayapPendek) {
      s.scale(0.45, 0.06, 0.3);
      s.translate(-0.05, 1.5, z * 0.35);
    } else {
      s.scale(1.6, 0.04, 0.55);
      s.rotateY(z * 0.18);
      s.translate(-0.7, 1.45, z * 0.45);
    }
    studio.tambah(sayap, s, g);
    for (let i = 0; i < 3; i++) {
      const x = 0.55 - i * 0.3;
      studio.tambah(kaki, tabung([v(x, 0.95, z * 0.25), v(x + (i - 1) * 0.2, 0.7, z * 0.7), v(x + (i - 1) * 0.35, 0, z * 0.85)], 0.03, 10, 5), g, false);
    }
  }
  return g;
}

/* ================================================================== *
 * Penyu
 * ================================================================== */

export function bangunPenyu(studio: Studio, induk: THREE.Object3D, s = 1) {
  const g = new THREE.Group();
  induk.add(g);
  const cangkang = new THREE.SphereGeometry(1, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2);
  cangkang.scale(1.3, 0.6, 1);
  cangkang.translate(0, 0.2, 0);
  studio.tambah(bahan(studio, "cangkang", ["penyu"], CANGKANG, 0.004), cangkang, g);
  const kulit = bahan(studio, "kulitPenyu", ["penyu"], KULIT_PENYU, 0.004);
  const kepala = bolaHalus(0.32, 14, 10);
  kepala.scale(1.3, 0.9, 0.9);
  kepala.translate(1.55, 0.35, 0);
  studio.tambah(kulit, kepala, g);
  for (const [x, z, sx] of [
    [0.8, 0.9, 1.3],
    [0.8, -0.9, 1.3],
    [-0.9, 0.8, 0.8],
    [-0.9, -0.8, 0.8],
  ]) {
    const sirip = bolaHalus(0.35, 12, 8);
    sirip.scale(sx, 0.18, 0.55);
    sirip.rotateY(z > 0 ? -0.6 : 0.6);
    sirip.translate(x, 0.18, z);
    studio.tambah(kulit, sirip, g);
  }
  g.scale.setScalar(s);
  return g;
}

export function bangunSarang(studio: Studio, induk: THREE.Object3D, jumlahTelur: number, benih = 1) {
  const g = new THREE.Group();
  induk.add(g);
  const acak = pembuatAcak(benih);
  const gundukan = new THREE.SphereGeometry(2.4, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  gundukan.scale(1, 0.35, 1);
  studio.tambah(bahan(studio, "pasir", ["pasir"], PASIR, 0.004), gundukan, g);
  const telur = bahan(studio, "telurPenyu", ["telur"], "#f3eee2", 0.003);
  for (let i = 0; i < jumlahTelur; i++) {
    const a = i * 2.4 + acak();
    const r = 0.3 + Math.sqrt(i / jumlahTelur) * 1.3;
    const t = bolaHalus(0.28, 12, 8);
    t.translate(Math.cos(a) * r, 0.62 - r * 0.18 + acak() * 0.1, Math.sin(a) * r);
    studio.tambah(telur, t, g);
  }
  return g;
}

/* ================================================================== *
 * Lambang silsilah
 * ================================================================== */

export type StatusSilsilah = "normal" | "pembawa" | "sakit";
export type Orang = { id: string; jk: "L" | "P"; status: StatusSilsilah; x: number; gen: number; label?: string };
export type Silsilah = { orang: Orang[]; kawin: [string, string][]; anak: { ortu: [string, string] | [string]; anak: string[] }[] };

/**
 * Menggambar silsilah di bidang xy (menghadap +z). Generasi ke-g berada di
 * y = −g × jarakBaris. Mengembalikan peta id → grup lambang, agar bisa disorot.
 */
export function bangunSilsilah(studio: Studio, induk: THREE.Object3D, d: Silsilah, o: { jarakBaris?: number; ukuran?: number; ukuranLabel?: number; kerabat?: [string, string][] } = {}) {
  const grup = new THREE.Group();
  induk.add(grup);
  const J = o.jarakBaris ?? 2.6;
  const U = o.ukuran ?? 0.8;
  const kertas = bahan(studio, "lambangKosong", ["silsilah"], KERTAS, 0.012);
  const isi = bahan(studio, "lambangIsi", ["silsilah"], TINTA, 0.004);
  const posisi = new Map<string, THREE.Vector3>();
  const lambang = new Map<string, THREE.Group>();
  for (const p of d.orang) posisi.set(p.id, v(p.x, -p.gen * J, 0));
  const bentuk = (jk: "L" | "P", setengah?: 0 | 1) => {
    if (jk === "L") {
      const b = new THREE.BoxGeometry(setengah === undefined ? U : U / 2, U, 0.25);
      if (setengah !== undefined) b.translate((setengah === 0 ? -1 : 1) * (U / 4), 0, 0);
      return b;
    }
    const c = new THREE.CylinderGeometry(U / 2, U / 2, 0.25, 32, 1, false, setengah === undefined ? 0 : setengah === 0 ? Math.PI : 0, setengah === undefined ? Math.PI * 2 : Math.PI);
    c.rotateX(Math.PI / 2);
    return c;
  };
  for (const p of d.orang) {
    const g = new THREE.Group();
    g.position.copy(posisi.get(p.id)!);
    grup.add(g);
    if (p.status === "pembawa") {
      studio.tambah(isi, bentuk(p.jk, 0), g);
      studio.tambah(kertas, bentuk(p.jk, 1), g);
    } else {
      studio.tambah(p.status === "sakit" ? isi : kertas, bentuk(p.jk), g);
    }
    if (p.label) {
      const l = buatLabel(p.label, o.ukuranLabel ?? 0.36);
      l.position.set(0, -U * 0.95, 0.2);
      g.add(l);
    }
    lambang.set(p.id, g);
  }
  const Z = -0.02;
  for (const [a, b] of d.kawin) {
    const pa = posisi.get(a)!;
    const pb = posisi.get(b)!;
    garis(studio, grup, v(Math.min(pa.x, pb.x) + U / 2, pa.y, Z), v(Math.max(pa.x, pb.x) - U / 2, pa.y, Z), 0.035);
    if (o.kerabat?.some(([x, y]) => (x === a && y === b) || (x === b && y === a)))
      garis(studio, grup, v(Math.min(pa.x, pb.x) + U / 2, pa.y - 0.15, Z), v(Math.max(pa.x, pb.x) - U / 2, pa.y - 0.15, Z), 0.035);
  }
  for (const k of d.anak) {
    const po = k.ortu.map((id) => posisi.get(id)!);
    const xTengah = po.reduce((s, p) => s + p.x, 0) / po.length;
    const yOrtu = po[0].y;
    const yGaris = yOrtu - J * 0.5;
    const xs = k.anak.map((id) => posisi.get(id)!.x);
    garis(studio, grup, v(xTengah, po.length === 1 ? yOrtu - U / 2 : yOrtu, Z), v(xTengah, yGaris, Z), 0.035);
    garis(studio, grup, v(Math.min(xTengah, ...xs), yGaris, Z), v(Math.max(xTengah, ...xs), yGaris, Z), 0.035);
    for (const id of k.anak) {
      const p = posisi.get(id)!;
      garis(studio, grup, v(p.x, yGaris, Z), v(p.x, p.y + U / 2, Z), 0.035);
    }
  }
  return { grup, lambang, posisi };
}

/** Lambang tunggal untuk legenda. */
export function lambangTunggal(studio: Studio, induk: THREE.Object3D, jk: "L" | "P", status: StatusSilsilah, label: string, x: number, y: number) {
  const s = bangunSilsilah(studio, induk, { orang: [{ id: "a", jk, status, x, gen: 0, label }], kawin: [], anak: [] }, { ukuranLabel: 0.4 });
  s.grup.position.y = y;
  return s.grup;
}

