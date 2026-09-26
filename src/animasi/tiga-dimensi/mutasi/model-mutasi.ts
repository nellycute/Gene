import * as THREE from "three";
import { BASA, MOLEKUL, ronaTerang, SIFAT, type KodeBasa } from "@/lib/warna";
import type { Studio } from "../studio";
import { bolaHalus, pembuatAcak } from "../bentuk";
import { buatLabel } from "../label3d";
import { warnaAsal, type AsalKromosom } from "../model-kromosom";
import { bahan } from "../mendel/model-mendel";
import { garis } from "../mendel/bantu";

/**
 * BENDA-BENDA TINGKAT 5 — mutasi dan variasi.
 *
 *  - pita kodon mRNA (basa berwarna BASA) dengan manik asam amino di bawahnya;
 *  - tangga DNA datar dua untai untuk perbaikan DNA;
 *  - kromosom beruas huruf (A–G) untuk delesi, duplikasi, inversi, translokasi;
 *  - semangka utuh dan terbelah (berbiji / tanpa biji);
 *  - ikon mutagen: matahari (UV), asap.
 */

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/* ================================================================== *
 * Pita kodon
 * ================================================================== */

export const KODE: Record<string, string> = {
  AUG: "Met", GAA: "Glu", GAG: "Glu", UAC: "Tyr", GUG: "Val", CUG: "Leu", AAA: "Lys", GAU: "Asp", ACG: "Thr", AGC: "Ser",
  UAA: "henti", UAG: "henti", UGA: "henti",
};

const bahanBasa = (studio: Studio, b: KodeBasa) => bahan(studio, `basa-${b}`, [`basa${b}`], BASA[b].warna, 0.003);

/**
 * Pita mRNA mendatar: basa-basa berderet dalam kelompok tiga (kodon), manik
 * asam amino di bawah tiap kodon. `ubah` = indeks basa yang diberi cincin.
 * Kodon sesudah kodon henti ditampilkan pucat (tidak diterjemahkan).
 */
export function bangunPitaKodon(studio: Studio, induk: THREE.Object3D, urutan: string, o: { ubah?: number[]; celahKodon?: number } = {}) {
  const g = new THREE.Group();
  induk.add(g);
  const LEBAR = 0.62;
  const CELAH = o.celahKodon ?? 0.35;
  const n = urutan.length;
  const kodon = Math.floor(n / 3);
  const xBasa = (i: number) => i * LEBAR + Math.floor(i / 3) * CELAH;
  const total = xBasa(n - 1);
  const x0 = -total / 2;
  const rangka = bahan(studio, "rangkaRNA", ["rna"], MOLEKUL.rna.warna, 0.003);
  const batang = new THREE.BoxGeometry(total + LEBAR, 0.22, 0.3);
  batang.translate(0, 0.9, 0);
  studio.tambah(rangka, batang, g);
  const pucat = bahan(studio, "basaPucat", ["pucat"], "#d9d6cf", 0.003);
  let berhenti = -1;
  for (let k = 0; k < kodon; k++) if (berhenti < 0 && KODE[urutan.slice(k * 3, k * 3 + 3)] === "henti") berhenti = k;
  for (let i = 0; i < n; i++) {
    const b = urutan[i] as KodeBasa;
    const kd = Math.floor(i / 3);
    const lewat = berhenti >= 0 && kd > berhenti;
    const m = studio.tambah(lewat ? pucat : bahanBasa(studio, b), new THREE.BoxGeometry(LEBAR * 0.82, 1.3, 0.5), g);
    m.position.set(x0 + xBasa(i), 0.1, 0);
    const l = buatLabel(b, 0.42);
    l.position.set(x0 + xBasa(i), 0.1, 0.4);
    g.add(l);
    if (o.ubah?.includes(i)) {
      const r = new THREE.TorusGeometry(0.5, 0.06, 8, 28);
      r.translate(x0 + xBasa(i), 0.1, 0.35);
      studio.tambah(bahan(studio, "cincinUbah", ["tinta"], "#1b2430", false), r, g, false);
    }
  }
  /* asam amino */
  const aa = bahan(studio, "asamAmino", ["asamAmino"], MOLEKUL.asamAmino.warna, 0.003);
  let xSebelum: number | null = null;
  for (let k = 0; k < kodon; k++) {
    const nama = KODE[urutan.slice(k * 3, k * 3 + 3)] ?? "?";
    const x = x0 + xBasa(k * 3 + 1);
    if (berhenti >= 0 && k > berhenti) continue;
    if (nama === "henti") {
      const l = buatLabel("henti", 0.42);
      l.position.set(x, -1.5, 0.3);
      g.add(l);
      continue;
    }
    const m = studio.tambah(aa, bolaHalus(0.42, 18, 12), g);
    m.position.set(x, -1.5, 0);
    const l = buatLabel(nama, 0.42);
    l.position.set(x, -2.3, 0.3);
    g.add(l);
    if (xSebelum !== null) garis(studio, g, v(xSebelum + 0.42, -1.5, 0), v(x - 0.42, -1.5, 0), 0.06, "#a88a2e", "peptida");
    xSebelum = x;
  }
  return g;
}

/* ================================================================== *
 * Tangga DNA datar
 * ================================================================== */

export type Tangga = { grup: THREE.Group; atas: THREE.Mesh[]; bawah: THREE.Mesh[]; lebar: number };

/** Dua untai mendatar; basa atas menghadap bawah dan sebaliknya. */
export function bangunTangga(studio: Studio, induk: THREE.Object3D, atas: string, bawah: string, o: { rangkaBawah?: "dna" | "baru" } = {}): Tangga {
  const g = new THREE.Group();
  induk.add(g);
  const L = 0.7;
  const n = atas.length;
  const x0 = (-(n - 1) * L) / 2;
  const rangka = bahan(studio, "rangkaDNA", ["gulaFosfat"], MOLEKUL.gulaFosfat.warna, 0.003);
  const baru = bahan(studio, "rangkaBaru", ["gulaFosfat", "untaiBaru"], "#c9cdd3", 0.003);
  const bt = new THREE.BoxGeometry(n * L, 0.22, 0.3);
  bt.translate(0, 1.1, 0);
  studio.tambah(rangka, bt, g);
  const bb = new THREE.BoxGeometry(n * L, 0.22, 0.3);
  bb.translate(0, -1.1, 0);
  studio.tambah(o.rangkaBawah === "baru" ? baru : rangka, bb, g);
  const buat = (s: string, y: number) =>
    s.split("").map((b, i) => {
      const m = studio.tambah(bahanBasa(studio, b as KodeBasa), new THREE.BoxGeometry(L * 0.75, 0.95, 0.4), g);
      m.position.set(x0 + i * L, y, 0);
      m.userData.asal = m.position.clone();
      const l = buatLabel(b, 0.36);
      l.position.set(0, 0, 0.35);
      m.add(l);
      return m;
    });
  return { grup: g, atas: buat(atas, 0.55), bawah: buat(bawah, -0.55), lebar: n * L };
}

/** Ganti warna satu basa tangga (untuk basa salah pasang yang diperbaiki). */
export function gantiBasa(studio: Studio, m: THREE.Mesh, b: KodeBasa) {
  m.material = bahanBasa(studio, b).bahan;
  const l = m.children.find((c) => c instanceof THREE.Sprite);
  if (l) m.remove(l);
  const baru = buatLabel(b, 0.36);
  baru.position.set(0, 0, 0.35);
  m.add(baru);
}

/* ================================================================== *
 * Kromosom beruas huruf
 * ================================================================== */

export type Ruas = { h: string; asal?: AsalKromosom };

/**
 * Kromosom tegak dari ruas-ruas berhuruf (atas → bawah). `sentromer` = indeks
 * ruas tempat sentromer berada (di atas ruas itu). Tiap ruas satu kotak
 * bulat bertepi, supaya potongan yang hilang, berulang, atau terbalik terlihat.
 */
export function bangunKromosomRuas(studio: Studio, induk: THREE.Object3D, ruas: Ruas[], o: { sentromer?: number; tinggi?: number; jari?: number; hurufDiKiri?: boolean } = {}) {
  const g = new THREE.Group();
  induk.add(g);
  const T = o.tinggi ?? 0.8;
  const J = o.jari ?? 0.45;
  const sentromer = o.sentromer ?? 2;
  const total = ruas.length * T + 0.35;
  let y = total / 2;
  ruas.forEach((r, i) => {
    if (i === sentromer) {
      const s = bolaHalus(J * 0.75, 16, 10);
      s.scale(1, 0.55, 1);
      s.translate(0, y - 0.17, 0);
      studio.tambah(bahan(studio, "sentromerRuas", ["sentromer"], "#6a5a80", 0.003), s, g);
      y -= 0.35;
    }
    const asal = r.asal ?? "kromatin";
    /* ruas berselang terang-gelap menurut hurufnya, jadi urutan yang terbalik
       atau berulang terlihat juga dari polanya, bukan hanya dari huruf */
    const terang = r.h.charCodeAt(0) % 2 === 0;
    const warna = terang ? ronaTerang(warnaAsal(asal), 0.35) : warnaAsal(asal);
    const c = new THREE.CapsuleGeometry(J, T - J * 0.9, 6, 16);
    c.translate(0, y - T / 2, 0);
    studio.tambah(bahan(studio, `ruas-${asal}-${terang}`, [asal, "kromosom"], warna, 0.004), c, g);
    const l = buatLabel(r.h, 0.5);
    l.position.set((o.hurufDiKiri ? -1 : 1) * (J + 0.45), y - T / 2, 0.2);
    g.add(l);
    y -= T;
  });
  return g;
}

/* ================================================================== *
 * Semangka
 * ================================================================== */

let teksturKulit: THREE.CanvasTexture | null = null;
function kulit() {
  if (teksturKulit) return teksturKulit;
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 64;
  const g = c.getContext("2d");
  if (g) {
    g.fillStyle = "#8fbf6a";
    g.fillRect(0, 0, 256, 64);
    g.fillStyle = SIFAT.kulitSemangka.warna;
    for (let i = 0; i < 12; i++) {
      g.beginPath();
      for (let y = 0; y <= 64; y += 4) g.lineTo(i * 21.3 + 5 + Math.sin(y * 0.4 + i) * 3, y);
      for (let y = 64; y >= 0; y -= 4) g.lineTo(i * 21.3 + 15 + Math.sin(y * 0.4 + i) * 3, y);
      g.fill();
    }
  }
  teksturKulit = new THREE.CanvasTexture(c);
  teksturKulit.colorSpace = THREE.SRGBColorSpace;
  return teksturKulit;
}

export function bangunSemangka(studio: Studio, induk: THREE.Object3D, o: { biji: boolean; terbelah?: boolean }) {
  const g = new THREE.Group();
  induk.add(g);
  const bKulit = studio.bagian(["kulitSemangka"], "#ffffff", { garis: 0.004, peta: kulit() });
  const R = 1.2;
  if (!o.terbelah) {
    const s = new THREE.SphereGeometry(R, 32, 22);
    s.scale(1.25, 1, 1);
    studio.tambah(bKulit, s, g);
    return g;
  }
  /* setengah bola menghadap depan (+z), permukaan potong merah */
  const s = new THREE.SphereGeometry(R, 32, 22, 0, Math.PI * 2, 0, Math.PI / 2);
  s.scale(1.25, 1, 1);
  s.rotateX(-Math.PI / 2);
  studio.tambah(bKulit, s, g);
  const daging = new THREE.CircleGeometry(R * 0.93, 40);
  daging.scale(1.25, 1, 1);
  daging.translate(0, 0, 0.01);
  studio.tambah(bahan(studio, "dagingSemangka", ["dagingSemangka"], SIFAT.dagingSemangka.warna, 0.003), daging, g);
  const tepi = new THREE.RingGeometry(R * 0.93, R, 40);
  tepi.scale(1.25, 1, 1);
  tepi.translate(0, 0, 0.012);
  studio.tambah(bahan(studio, "tepiSemangka", ["kulitSemangka"], "#e9efd9", false), tepi, g);
  const acak = pembuatAcak(o.biji ? 5 : 6);
  const bBiji = o.biji ? bahan(studio, "bijiSemangka", ["bijiSemangka"], SIFAT.bijiSemangka.warna, false) : bahan(studio, "bijiKosong", ["bijiSemangka"], "#f4ece0", false);
  for (let i = 0; i < 26; i++) {
    const a = acak() * Math.PI * 2;
    const r = (0.35 + acak() * 0.45) * R;
    const b = bolaHalus(o.biji ? 0.08 : 0.05, 8, 6);
    b.scale(1, 1.6, 0.4);
    b.translate(Math.cos(a) * r * 1.25, Math.sin(a) * r, 0.03);
    studio.tambah(bBiji, b, g, false);
  }
  return g;
}

/* ================================================================== *
 * Ikon mutagen
 * ================================================================== */

export function bangunMatahari(studio: Studio, induk: THREE.Object3D) {
  const g = new THREE.Group();
  induk.add(g);
  const b = bahan(studio, "matahari", ["cahaya"], "#f2c14e", 0.003);
  studio.tambah(b, bolaHalus(0.7, 20, 14), g);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const k = new THREE.ConeGeometry(0.14, 0.5, 8);
    k.rotateZ(a - Math.PI / 2);
    k.translate(Math.cos(a) * 1.05, Math.sin(a) * 1.05, 0);
    studio.tambah(b, k, g);
  }
  return g;
}

export function bangunAsap(studio: Studio, induk: THREE.Object3D) {
  const g = new THREE.Group();
  induk.add(g);
  const b = bahan(studio, "asap", ["asap"], "#b8b6b2", 0.003, 0.7);
  const acak = pembuatAcak(8);
  for (let i = 0; i < 7; i++) {
    const s = bolaHalus(0.35 + acak() * 0.25, 14, 10);
    s.translate((acak() - 0.5) * 1.2, i * 0.35, (acak() - 0.5) * 0.6);
    studio.tambah(b, s, g, false);
  }
  return g;
}

/** Babi sederhana menghadap +x, panjang ± 3. */
export function bangunBabi(studio: Studio, induk: THREE.Object3D) {
  const g = new THREE.Group();
  induk.add(g);
  const kulitB = bahan(studio, "kulitBabi", ["babi"], "#e8b9ab", 0.004);
  const badan = new THREE.CapsuleGeometry(0.9, 1.6, 8, 18);
  badan.rotateZ(Math.PI / 2);
  badan.translate(0, 1.4, 0);
  studio.tambah(kulitB, badan, g);
  const kepala = bolaHalus(0.65, 18, 12);
  kepala.translate(1.55, 1.55, 0);
  studio.tambah(kulitB, kepala, g);
  const moncong = new THREE.CylinderGeometry(0.28, 0.3, 0.3, 18);
  moncong.rotateZ(Math.PI / 2);
  moncong.translate(2.2, 1.45, 0);
  studio.tambah(kulitB, moncong, g);
  for (const z of [-1, 1]) {
    const t = new THREE.ConeGeometry(0.22, 0.4, 8);
    t.rotateX(z * 0.3);
    t.translate(1.35, 2.2, z * 0.35);
    studio.tambah(kulitB, t, g);
    const m = bolaHalus(0.06, 8, 6);
    m.translate(2.0, 1.75, z * 0.25);
    studio.tambah(bahan(studio, "mataBabi", ["mata"], "#1d1a18", false), m, g, false);
    for (const x of [-0.9, 0.9]) {
      const k = new THREE.CylinderGeometry(0.16, 0.14, 0.8, 10);
      k.translate(x, 0.4, z * 0.45);
      studio.tambah(kulitB, k, g);
    }
  }
  return g;
}

