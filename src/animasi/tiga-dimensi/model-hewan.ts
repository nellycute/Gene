import * as THREE from "three";
import { SIFAT } from "@/lib/warna";
import type { Studio } from "./studio";
import { bolaHalus, pembuatAcak, tabung } from "./bentuk";
import { bahan } from "./mendel/model-mendel";

/**
 * HEWAN PERCOBAAN PEWARISAN — sapi, ayam, kelinci, tikus (Tingkat 2 ke atas).
 *
 * Semua menghadap +x (tampak samping), berdiri di y = 0. Warna bulu dari
 * SIFAT di warna.ts (buluHitam, buluMerah, buluPutih, ...), satu warna bulu =
 * satu warna tetap apa pun hewannya. Paruh, kuku, mata, dan moncong memakai
 * warna netral dan tidak pernah disorot sendiri.
 */

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const NETRAL_KAKI = "#d6a94a";
const MATA = "#1d1a18";
const MERAH_MUDA = "#e3a79c";

export type WarnaBulu = "hitam" | "merah" | "putih" | "kuning" | "agouti" | "chinchilla" | "mahoni" | "lurik";

const ENTITAS_BULU: Record<Exclude<WarnaBulu, "lurik">, keyof typeof SIFAT> = {
  hitam: "buluHitam",
  merah: "buluMerah",
  putih: "buluPutih",
  kuning: "buluKuning",
  agouti: "buluAgouti",
  chinchilla: "buluChinchilla",
  mahoni: "buluMahoni",
};

/** Garis-garis hitam-putih bulu ayam lurik (barred), digambar di kanvas. */
let teksturLurik: THREE.CanvasTexture | null = null;
function lurik() {
  if (teksturLurik) return teksturLurik;
  const c = document.createElement("canvas");
  c.width = 16;
  c.height = 128;
  const g = c.getContext("2d");
  if (g) {
    for (let i = 0; i < 8; i++) {
      g.fillStyle = SIFAT.buluPutih.warna;
      g.fillRect(0, i * 16, 16, 9);
      g.fillStyle = SIFAT.buluHitam.warna;
      g.fillRect(0, i * 16 + 9, 16, 7);
    }
  }
  teksturLurik = new THREE.CanvasTexture(c);
  teksturLurik.colorSpace = THREE.SRGBColorSpace;
  teksturLurik.wrapS = teksturLurik.wrapT = THREE.RepeatWrapping;
  teksturLurik.repeat.set(1, 3);
  return teksturLurik;
}

const buluLurikPerStudio = new WeakMap<Studio, ReturnType<typeof bahan>>();
export const bahanBulu = (studio: Studio, w: WarnaBulu) => {
  if (w === "lurik") {
    let b = buluLurikPerStudio.get(studio);
    if (!b) {
      b = studio.bagian(["buluLurik"], "#ffffff", { garis: 0.004, peta: lurik() });
      buluLurikPerStudio.set(studio, b);
    }
    return b;
  }
  const e = ENTITAS_BULU[w];
  return bahan(studio, `bulu-${w}`, [e], SIFAT[e].warna, 0.004);
};

const bahanMata = (studio: Studio, albino = false) =>
  albino ? bahan(studio, "mataAlbino", ["mataAlbino"], SIFAT.mataAlbino.warna, false) : bahan(studio, "mataHewan", ["mata"], MATA, false);

/* ================================================================== *
 * SAPI
 * ================================================================== */

export type OpsiSapi = {
  bulu: "hitam" | "merah" | "putih" | "roan";
  kakiPendek?: boolean;
  tanduk?: boolean;
  /** Belang besar di atas dasar putih (sapi Ayrshire). */
  belang?: "merah" | "mahoni" | "hitam";
  /** Kaki berwarna putih seperti kaus kaki (sapi Bali). */
  kakiPutih?: boolean;
};

/**
 * Sapi berbulu polos. "roan": dasar merah bertabur helai putih (kodominansi).
 * Kaki pendek untuk sapi Dexter heterozigot. Panjang ± 6, tinggi ± 3,5.
 */
export function bangunSapi(studio: Studio, induk: THREE.Object3D, o: OpsiSapi) {
  const g = new THREE.Group();
  induk.add(g);
  const dasar: Exclude<WarnaBulu, "lurik"> = o.bulu === "roan" ? "merah" : o.belang ? "putih" : o.bulu;
  const bulu = o.belang ? bahanBelang(studio, o.belang) : bahanBulu(studio, dasar);
  const moncong = bahan(studio, `moncong-${dasar}`, [ENTITAS_BULU[dasar]], dasar === "putih" ? MERAH_MUDA : dasar === "hitam" ? "#45403c" : "#9c5a4b", 0.004);
  const kaki = o.kakiPendek ? 0.55 : 1.1;
  const angkat = o.kakiPendek ? -0.5 : 0;
  const badan = new THREE.CapsuleGeometry(1.1, 2.2, 8, 20);
  badan.rotateZ(Math.PI / 2);
  badan.scale(1, 1, 0.95);
  badan.translate(0, 2.1 + angkat, 0);
  studio.tambah(bulu, badan, g);
  for (const [x, z] of [
    [-1.25, -0.5],
    [-1.25, 0.5],
    [1.2, -0.5],
    [1.2, 0.5],
  ]) {
    const k = new THREE.CapsuleGeometry(0.24, kaki, 6, 12);
    k.translate(x, 0.2 + kaki / 2, z);
    studio.tambah(o.kakiPutih ? bahanBulu(studio, "putih") : bulu, k, g);
  }
  const leher = new THREE.CapsuleGeometry(0.6, 0.6, 8, 14);
  leher.rotateZ(-0.9);
  leher.translate(1.9, 2.55 + angkat, 0);
  studio.tambah(bulu, leher, g);
  const kepala = bolaHalus(0.62, 22, 16);
  kepala.scale(1.25, 0.9, 0.8);
  kepala.translate(2.6, 2.8 + angkat, 0);
  studio.tambah(bulu, kepala, g);
  const m = bolaHalus(0.38, 16, 12);
  m.scale(0.9, 0.85, 1);
  m.translate(3.25, 2.6 + angkat, 0);
  studio.tambah(moncong, m, g);
  for (const z of [-1, 1]) {
    const telinga = bolaHalus(0.24, 12, 8);
    telinga.scale(0.5, 0.35, 1.2);
    telinga.translate(2.3, 3.15 + angkat, z * 0.6);
    studio.tambah(bulu, telinga, g);
    const mm = bolaHalus(0.07, 8, 6);
    mm.translate(2.95, 3.0 + angkat, z * 0.36);
    studio.tambah(bahanMata(studio), mm, g, false);
    if (o.tanduk) {
      const t = new THREE.ConeGeometry(0.09, 0.45, 10);
      t.rotateX(z * 0.9);
      t.translate(2.4, 3.35 + angkat, z * 0.45);
      studio.tambah(bahan(studio, "tanduk", ["tanduk"], "#e8dcc2", 0.003), t, g);
    }
  }
  studio.tambah(bulu, tabung([v(-2.2, 2.6 + angkat, 0), v(-2.5, 1.9 + angkat, 0.1), v(-2.5, 1.1 + angkat, 0)], 0.08, 16, 6), g);
  if (o.bulu === "roan") taburHelai(studio, g, angkat);
  return g;
}

/**
 * Kulit belang: dasar putih dengan bercak-bercak besar, digambar di kanvas dan
 * dibungkuskan ke badan. Warnanya dari SIFAT (buluPutih + buluMerah/buluMahoni).
 */
const belangPerStudio = new WeakMap<Studio, Map<string, ReturnType<typeof bahan>>>();
function bahanBelang(studio: Studio, w: "merah" | "mahoni" | "hitam") {
  let peta = belangPerStudio.get(studio);
  if (!peta) {
    peta = new Map();
    belangPerStudio.set(studio, peta);
  }
  const ada = peta.get(w);
  if (ada) return ada;
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const g = c.getContext("2d");
  const acak = pembuatAcak(w.length * 31);
  if (g) {
    g.fillStyle = SIFAT.buluPutih.warna;
    g.fillRect(0, 0, 256, 256);
    g.fillStyle = SIFAT[ENTITAS_BULU[w]].warna;
    for (let i = 0; i < 14; i++) {
      g.beginPath();
      const x = acak() * 256;
      const y = 40 + acak() * 176;
      g.ellipse(x, y, 18 + acak() * 26, 14 + acak() * 22, acak() * 3, 0, Math.PI * 2);
      g.fill();
    }
  }
  const tx = new THREE.CanvasTexture(c);
  tx.colorSpace = THREE.SRGBColorSpace;
  const b = studio.bagian([ENTITAS_BULU[w], "buluPutih"], "#ffffff", { garis: 0.004, peta: tx });
  peta.set(w, b);
  return b;
}

/** Helai putih yang tersebar di badan sapi merah — tampak roan dari jauh. */
function taburHelai(studio: Studio, g: THREE.Group, angkat: number) {
  const acak = pembuatAcak(77);
  const putih = bahanBulu(studio, "putih");
  const bintik = bolaHalus(0.055, 6, 5);
  const m: THREE.Matrix4[] = [];
  const q = new THREE.Quaternion();
  for (let i = 0; i < 900; i++) {
    /* titik acak di permukaan kapsul badan */
    const x = (acak() - 0.5) * 3.9;
    const a = acak() * Math.PI * 2;
    const r = 1.1 * (Math.abs(x) > 1.1 ? Math.sqrt(Math.max(0, 1 - ((Math.abs(x) - 1.1) / 1.1) ** 2)) : 1);
    const p = v(x, 2.1 + angkat + Math.cos(a) * r * 1.01, Math.sin(a) * r * 0.96);
    m.push(new THREE.Matrix4().compose(p, q, v(1, 1, 1)));
  }
  studio.tambahBanyak(putih, bintik, m, g);
}

/** Petak kulit berbulu dari dekat: helai merah dan putih berdiri berdampingan. */
export function bangunPetakBulu(studio: Studio, induk: THREE.Object3D, warna: WarnaBulu[], lebar = 3, acakBenih = 5) {
  const g = new THREE.Group();
  induk.add(g);
  const acak = pembuatAcak(acakBenih);
  const kulit = new THREE.BoxGeometry(lebar, 0.2, lebar);
  studio.tambah(bahan(studio, "kulit", ["kulit"], "#d9c2ad", 0.004), kulit, g);
  const helai = new THREE.CylinderGeometry(0.03, 0.045, 1, 5);
  helai.translate(0, 0.5, 0);
  const matriks: THREE.Matrix4[][] = warna.map(() => []);
  const n = Math.round(lebar * 22);
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const x = -lebar / 2 + (i + 0.5) * (lebar / n) + (acak() - 0.5) * 0.05;
      const z = -lebar / 2 + (j + 0.5) * (lebar / n) + (acak() - 0.5) * 0.05;
      const q = new THREE.Quaternion().setFromEuler(new THREE.Euler((acak() - 0.5) * 0.5, 0, (acak() - 0.5) * 0.5));
      const k = Math.floor(acak() * warna.length);
      matriks[k].push(new THREE.Matrix4().compose(v(x, 0.1, z), q, v(1, 0.28 + acak() * 0.18, 1)));
    }
  warna.forEach((w, k) => studio.tambahBanyak(bahanBulu(studio, w), helai, matriks[k], g));
  return g;
}

/* ================================================================== *
 * AYAM
 * ================================================================== */

export type Jengger = "single" | "rose" | "pea" | "walnut";

/** Ayam menghadap +x, tinggi ± 3 (± 2,5 bila kaki pendek/Creeper). */
export function bangunAyam(studio: Studio, induk: THREE.Object3D, o: { jengger?: Jengger; kakiPendek?: boolean; bulu?: WarnaBulu; jantan?: boolean } = {}) {
  const g = new THREE.Group();
  induk.add(g);
  const bulu = bahanBulu(studio, o.bulu ?? "putih");
  const kakiB = bahan(studio, "kakiAyam", ["kakiAyam"], NETRAL_KAKI, 0.003);
  const jengger = bahan(studio, "jengger", ["jengger"], SIFAT.jengger.warna, 0.003);
  const kaki = o.kakiPendek ? 0.35 : 0.95;
  const Y = kaki + 0.75;
  const badan = bolaHalus(1, 28, 20);
  badan.scale(1.15, 0.85, 0.78);
  badan.rotateZ(0.12);
  badan.translate(0, Y, 0);
  studio.tambah(bulu, badan, g);
  /* ekor: tiga bulu melengkung ke atas-belakang */
  for (let i = 0; i < 3; i++) {
    const e = bolaHalus(0.5, 16, 10);
    e.scale(0.35, 1, 0.12);
    e.rotateZ(0.6 - i * 0.25);
    e.translate(-1.05 - i * 0.08, Y + 0.55 + i * 0.1, (i - 1) * 0.12);
    studio.tambah(bulu, e, g);
  }
  if (o.jantan) {
    /* ayam jantan: bulu ekor panjang melengkung (sabit) */
    for (let i = 0; i < 3; i++) {
      const z = (i - 1) * 0.15;
      studio.tambah(bulu, tabung([v(-0.9, Y + 0.4, z), v(-1.5, Y + 1.5 + i * 0.15, z), v(-2.2, Y + 1.2, z), v(-2.4, Y + 0.3 - i * 0.2, z)], 0.09, 20, 6), g);
    }
  }
  const sayap = bolaHalus(0.7, 18, 12);
  sayap.scale(1.1, 0.6, 0.25);
  for (const z of [-0.72, 0.72]) {
    const s = sayap.clone();
    s.translate(-0.1, Y + 0.05, z);
    studio.tambah(bulu, s, g);
  }
  const leher = new THREE.CapsuleGeometry(0.3, 0.5, 6, 12);
  leher.rotateZ(-0.35);
  leher.translate(0.85, Y + 0.75, 0);
  studio.tambah(bulu, leher, g);
  const HX = 1.05;
  const HY = Y + 1.3;
  const kepala = bolaHalus(0.36, 20, 14);
  kepala.translate(HX, HY, 0);
  studio.tambah(bulu, kepala, g);
  const paruh = new THREE.ConeGeometry(0.12, 0.35, 10);
  paruh.rotateZ(-Math.PI / 2);
  paruh.translate(HX + 0.45, HY - 0.05, 0);
  studio.tambah(kakiB, paruh, g);
  for (const z of [-0.26, 0.26]) {
    const m = bolaHalus(0.055, 8, 6);
    m.translate(HX + 0.2, HY + 0.08, z);
    studio.tambah(bahanMata(studio), m, g, false);
  }
  /* pial: dua gelambir merah di bawah paruh */
  for (const z of [-0.07, 0.07]) {
    const p = bolaHalus(0.14, 12, 8);
    p.scale(0.8, 1.3, 0.5);
    p.translate(HX + 0.3, HY - 0.35, z);
    studio.tambah(jengger, p, g);
  }
  const jg = new THREE.Group();
  g.add(jg);
  tambahJengger(studio, jg, jengger, o.jengger ?? "single", HX, HY + 0.3);
  if (o.jantan) {
    jg.scale.setScalar(1.45);
    jg.position.set(-HX * 0.45, -(HY + 0.3) * 0.45 + 0.05, 0);
  }
  /* kaki bersisik kuning dengan tiga jari */
  for (const z of [-0.28, 0.28]) {
    const k = new THREE.CylinderGeometry(0.06, 0.07, kaki + 0.2, 8);
    k.translate(0.05, kaki / 2, z);
    studio.tambah(kakiB, k, g);
    for (const a of [-0.5, 0, 0.5]) {
      const jari = new THREE.CylinderGeometry(0.035, 0.035, 0.35, 6);
      jari.rotateZ(Math.PI / 2);
      jari.rotateY(a);
      jari.translate(0.2, 0.03, z + Math.sin(a) * 0.1);
      studio.tambah(kakiB, jari, g, false);
    }
  }
  return g;
}

function tambahJengger(studio: Studio, g: THREE.Group, b: ReturnType<typeof bahan>, jenis: Jengger, x: number, y: number) {
  if (jenis === "single") {
    /* satu bilah tegak bergerigi lima */
    const bilah = bolaHalus(0.3, 16, 10);
    bilah.scale(1.3, 0.55, 0.3);
    bilah.translate(x - 0.05, y, 0);
    studio.tambah(b, bilah, g);
    for (let i = 0; i < 5; i++) {
      const gigi = new THREE.ConeGeometry(0.09, 0.42 - Math.abs(i - 2) * 0.06, 8);
      gigi.scale(1, 1, 0.55);
      gigi.translate(x - 0.3 + i * 0.15, y + 0.3 - Math.abs(i - 2) * 0.03, 0);
      studio.tambah(b, gigi, g);
    }
  } else if (jenis === "rose") {
    /* pipih lebar berbintil, dengan taji menunjuk ke belakang */
    const alas = bolaHalus(0.3, 16, 10);
    alas.scale(1.2, 0.35, 0.9);
    alas.translate(x, y - 0.05, 0);
    studio.tambah(b, alas, g);
    const acak = pembuatAcak(3);
    for (let i = 0; i < 14; i++) {
      const bintil = bolaHalus(0.06, 8, 6);
      bintil.translate(x - 0.25 + acak() * 0.5, y + 0.05, (acak() - 0.5) * 0.4);
      studio.tambah(b, bintil, g, false);
    }
    const taji = new THREE.ConeGeometry(0.07, 0.5, 8);
    taji.rotateZ(Math.PI / 2 + 0.25);
    taji.translate(x - 0.55, y + 0.05, 0);
    studio.tambah(b, taji, g);
  } else if (jenis === "pea") {
    /* rendah, tiga baris sejajar, yang tengah sedikit lebih tinggi */
    for (const [z, t] of [
      [-0.1, 0.08],
      [0, 0.13],
      [0.1, 0.08],
    ]) {
      const baris = new THREE.CapsuleGeometry(0.06, 0.4, 4, 8);
      baris.rotateZ(Math.PI / 2);
      baris.translate(x + 0.02, y - 0.12 + t, z);
      studio.tambah(b, baris, g);
    }
  } else {
    /* walnut: gumpalan bulat berlekuk seperti kenari */
    const bentuk = new THREE.SphereGeometry(0.24, 24, 16);
    const pos = bentuk.attributes.position as THREE.BufferAttribute;
    const p = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      p.fromBufferAttribute(pos, i);
      const lekuk = 1 - 0.12 * Math.abs(Math.sin(p.x * 22) * Math.cos(p.z * 18));
      pos.setXYZ(i, p.x * 1.25 * lekuk, p.y * 0.75 * lekuk, p.z * 1.05 * lekuk);
    }
    bentuk.computeVertexNormals();
    bentuk.translate(x, y - 0.05, 0);
    studio.tambah(b, bentuk, g);
  }
}

/* ================================================================== *
 * KELINCI
 * ================================================================== */

export type PolaKelinci = "agouti" | "chinchilla" | "himalaya" | "albino";

/** Kelinci duduk menghadap +x, tinggi ± 2,6. */
export function bangunKelinci(studio: Studio, induk: THREE.Object3D, pola: PolaKelinci) {
  const g = new THREE.Group();
  induk.add(g);
  const dasar = bahanBulu(studio, pola === "agouti" ? "agouti" : pola === "chinchilla" ? "chinchilla" : "putih");
  /* kelinci himalaya: pigmen hanya di ujung tubuh yang dingin (telinga, hidung, kaki, ekor) */
  const ujung = pola === "himalaya" ? bahanBulu(studio, "hitam") : dasar;
  const badan = bolaHalus(1, 28, 20);
  badan.scale(1.2, 0.9, 0.85);
  badan.translate(-0.2, 0.95, 0);
  studio.tambah(dasar, badan, g);
  const kepala = bolaHalus(0.55, 24, 16);
  kepala.scale(1.1, 0.95, 0.9);
  kepala.translate(0.95, 1.6, 0);
  studio.tambah(dasar, kepala, g);
  const hidung = bolaHalus(0.16, 12, 8);
  hidung.translate(1.52, 1.55, 0);
  studio.tambah(ujung, hidung, g);
  for (const z of [-0.18, 0.18]) {
    const t = new THREE.CapsuleGeometry(0.14, 1, 6, 12);
    t.scale(1, 1, 0.45);
    t.rotateZ(0.35);
    t.rotateX(z > 0 ? -0.15 : 0.15);
    t.translate(0.6, 2.55, z);
    studio.tambah(ujung, t, g);
    const m = bolaHalus(0.075, 10, 8);
    m.translate(1.28, 1.75, z * 1.6);
    studio.tambah(bahanMata(studio, pola === "albino"), m, g, false);
  }
  for (const z of [-0.45, 0.45]) {
    const kd = bolaHalus(0.18, 12, 8);
    kd.scale(1.6, 0.6, 1);
    kd.translate(0.75, 0.12, z * 0.6);
    studio.tambah(ujung, kd, g);
    const kb = bolaHalus(0.26, 12, 8);
    kb.scale(2, 0.55, 1);
    kb.translate(-0.3, 0.15, z);
    studio.tambah(ujung, kb, g);
  }
  const ekor = bolaHalus(0.24, 12, 8);
  ekor.translate(-1.4, 1.05, 0);
  studio.tambah(ujung, ekor, g);
  return g;
}

/* ================================================================== *
 * TIKUS
 * ================================================================== */

/** Tikus menghadap +x, panjang badan ± 2 (ekor ± 1,8), tinggi ± 1,2. */
export function bangunTikusWarna(studio: Studio, induk: THREE.Object3D, warna: "kuning" | "agouti" | "hitam" | "albino") {
  const g = new THREE.Group();
  induk.add(g);
  const bulu = bahanBulu(studio, warna === "albino" ? "putih" : warna);
  const telinga = bahan(studio, "telingaTikus", ["telinga"], MERAH_MUDA, 0.003);
  const badan = bolaHalus(1, 26, 18);
  badan.scale(1.2, 0.62, 0.7);
  badan.translate(0, 0.62, 0);
  studio.tambah(bulu, badan, g);
  const kepala = bolaHalus(0.5, 22, 14);
  kepala.scale(1.2, 0.85, 0.85);
  kepala.translate(1.25, 0.72, 0);
  studio.tambah(bulu, kepala, g);
  const hidung = bolaHalus(0.08, 8, 6);
  hidung.translate(1.85, 0.68, 0);
  studio.tambah(telinga, hidung, g);
  for (const z of [-0.25, 0.25]) {
    const t = bolaHalus(0.26, 14, 10);
    t.scale(0.35, 1, 1);
    t.translate(1.05, 1.18, z * 1.2);
    studio.tambah(telinga, t, g);
    const m = bolaHalus(0.065, 8, 6);
    m.translate(1.6, 0.85, z * 0.9);
    studio.tambah(bahanMata(studio, warna === "albino"), m, g, false);
    for (const x of [-0.6, 0.6]) {
      const k = bolaHalus(0.12, 8, 6);
      k.scale(1.5, 0.5, 1);
      k.translate(x, 0.06, z * 1.8);
      studio.tambah(telinga, k, g);
    }
  }
  studio.tambah(telinga, tabung([v(-1.1, 0.5, 0), v(-1.7, 0.25, 0.25), v(-2.4, 0.15, -0.1), v(-2.9, 0.3, 0.1)], 0.05, 24, 6), g);
  return g;
}
