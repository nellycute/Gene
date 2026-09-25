import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { SEL, ronaGelap, ronaTerang } from "@/lib/warna";
import type { Pandangan, Studio } from "./studio";
import { lihat } from "./studio";
import { bolaHalus, lantaiBayang, lembaranBerlipat, teksturBayang, teksturBintik } from "./bentuk";
import { bangunMitokondriaIris } from "./model-sel-hewan";

/**
 * SEL TUMBUHAN YANG DIBELAH — pelajaran 0.3 (25 Sep 2026).
 *
 * Kotak bersudut bulat, dipotong mendatar seperti sel hewan di pelajaran yang
 * sama. Tiga ciri khas tampak jelas: dinding sel yang tebal di luar membran,
 * kloroplas yang terbelah memperlihatkan tumpukan tilakoid (grana), dan vakuola
 * pusat yang besar. Tanpa sentriol dan tanpa lisosom khas sel hewan.
 * Semua warna dari src/lib/warna.ts.
 */

const L = 30; // lebar (x)
const T = 14; // tinggi (y)
const D = 21; // dalam (z)
const SUDUT = 3.4;
const TEBAL_DINDING = 1.1;
const TEBAL_MEMBRAN = 0.4;
/** Bagian sel di atas ini dibuang. */
const BIBIR = 2.2;
/** Permukaan sitoplasma yang terpotong. */
const MUKA = 1.9;

/** Persegi bersudut bulat di bidang xy, berpusat di titik asal. */
function persegiBulat(l: number, d: number, r: number) {
  const s = new THREE.Shape();
  const x = l / 2;
  const y = d / 2;
  s.moveTo(-x + r, -y);
  s.lineTo(x - r, -y);
  s.absarc(x - r, -y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x, y - r);
  s.absarc(x - r, y - r, r, 0, Math.PI / 2, false);
  s.lineTo(-x + r, y);
  s.absarc(-x + r, y - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(-x, -y + r);
  s.absarc(-x + r, -y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

/** Cincin datar (bidang y = tinggi) di antara dua persegi bulat. */
function cincinDatar(sisih0: number, sisih1: number, tinggi: number) {
  const luar = persegiBulat(L - 2 * sisih0, D - 2 * sisih0, Math.max(0.2, SUDUT - sisih0));
  luar.holes.push(persegiBulat(L - 2 * sisih1, D - 2 * sisih1, Math.max(0.2, SUDUT - sisih1)));
  const g = new THREE.ShapeGeometry(luar, 24);
  g.rotateX(-Math.PI / 2);
  g.translate(0, tinggi, 0);
  return g;
}

/**
 * Kloroplas yang diiris mendatar: lensa hijau, muka potong berselaput ganda,
 * dan tumpukan tilakoid (grana) seperti tumpukan koin. `naik` = tinggi irisan.
 */
function bangunKloroplasIris(studio: Studio, induk: THREE.Object3D, skala: number, naik: number) {
  const { bagian, tambah } = studio;
  const a = 1.6 * skala;
  const b = 0.95 * skala;
  const c = 1.05 * skala;
  const dunia = new THREE.Vector3();
  induk.updateWorldMatrix(true, false);
  induk.getWorldPosition(dunia);
  const potong = new THREE.Plane(new THREE.Vector3(0, -1, 0), dunia.y + naik);

  const lensa = bolaHalus(1, 32, 24);
  lensa.scale(a, b, c);
  tambah(bagian("kloroplas", SEL.kloroplas.warna, { potong: [potong], garis: 0.003 }), lensa, induk);

  const tutup = new THREE.Group();
  tutup.position.y = naik + 0.003;
  tutup.rotation.x = -Math.PI / 2;
  induk.add(tutup);
  const f = Math.sqrt(Math.max(0, 1 - (naik / b) ** 2));
  const padat = { sisi: THREE.DoubleSide, garis: false, redupWarnaSaja: true } as const;
  const elips = (sx: number, sy: number) => {
    const s = new THREE.Shape();
    s.absellipse(0, 0, sx, sy, 0, Math.PI * 2, false, 0);
    return s;
  };
  const cincin = elips(a * f, c * f);
  cincin.holes.push(elips(a * f * 0.88, c * f * 0.86));
  tambah(bagian("kloroplas", ronaGelap(SEL.kloroplas.warna, 0.08), padat), new THREE.ShapeGeometry(cincin, 32), tutup, false);
  tambah(
    bagian("kloroplas", ronaTerang(SEL.kloroplas.warna, 0.45), padat),
    new THREE.ShapeGeometry(elips(a * f * 0.88, c * f * 0.86), 32),
    tutup,
    false,
  );
  /* grana: tumpukan tilakoid */
  const grana = bagian("kloroplas", ronaGelap(SEL.kloroplas.warna, 0.25), { garis: false });
  for (const [x, z] of [
    [-0.9, 0.1],
    [0, -0.25],
    [0.9, 0.2],
  ] as const) {
    for (let k = 0; k < 4; k++) {
      const koin = new THREE.CylinderGeometry(0.26 * skala, 0.26 * skala, 0.07 * skala, 16);
      koin.translate(x * skala, naik + 0.05 + k * 0.1 * skala, z * skala);
      tambah(grana, koin, induk, false);
    }
  }
}

export function bangunSelTumbuhan(studio: Studio, induk: THREE.Object3D, acak: () => number) {
  const { bagian, tambah, tambahBanyak } = studio;
  const sel = new THREE.Group();
  induk.add(sel);
  const bintik = teksturBintik(acak);
  bintik.repeat.set(0.09, 0.09);
  const potongSel = new THREE.Plane(new THREE.Vector3(0, -1, 0), BIBIR);

  /* ---------- dinding sel dan membran ---------- */
  tambah(
    bagian("dindingSel", SEL.dindingSel.warna, { potong: [potongSel], redupWarnaSaja: true, garis: 0.0035 }),
    new RoundedBoxGeometry(L, T, D, 6, SUDUT),
    sel,
  );
  tambah(
    bagian("membranSel", ronaTerang(SEL.membranSel.warna, 0.3), {
      potong: [potongSel],
      sisi: THREE.BackSide,
      redupWarnaSaja: true,
      garis: false,
    }),
    new RoundedBoxGeometry(L - 2 * TEBAL_DINDING, T - 2 * TEBAL_DINDING, D - 2 * TEBAL_DINDING, 6, SUDUT - TEBAL_DINDING),
    sel,
  );
  /* muka potong: dinding (tebal) lalu membran (tipis) */
  tambah(
    bagian("dindingSel", ronaTerang(SEL.dindingSel.warna, 0.35), { sisi: THREE.DoubleSide, redupWarnaSaja: true, garis: false }),
    cincinDatar(0, TEBAL_DINDING, BIBIR),
    sel,
    false,
  );
  tambah(
    bagian("membranSel", SEL.membranSel.warna, { sisi: THREE.DoubleSide, redupWarnaSaja: true, garis: false }),
    cincinDatar(TEBAL_DINDING, TEBAL_DINDING + TEBAL_MEMBRAN, BIBIR + 0.002),
    sel,
    false,
  );
  /* plasmodesmata: saluran halus menembus dinding, tampak sebagai celah gelap di muka potong */
  const saluran = bagian("dindingSel", ronaGelap(SEL.dindingSel.warna, 0.35), { garis: false });
  for (const [x, z, putar] of [
    [-6, -D / 2 + TEBAL_DINDING / 2, 0],
    [4, -D / 2 + TEBAL_DINDING / 2, 0],
    [-8, D / 2 - TEBAL_DINDING / 2, 0],
    [7, D / 2 - TEBAL_DINDING / 2, 0],
    [L / 2 - TEBAL_DINDING / 2, -3, Math.PI / 2],
    [-L / 2 + TEBAL_DINDING / 2, 4, Math.PI / 2],
  ] as const) {
    const g = new THREE.BoxGeometry(0.16, 0.02, TEBAL_DINDING + 0.1);
    g.rotateY(putar);
    g.translate(x, BIBIR + 0.006, z);
    tambah(saluran, g, sel, false);
  }

  /* ---------- permukaan sitoplasma ---------- */
  const sisih = TEBAL_DINDING + TEBAL_MEMBRAN;
  const mukaSitoplasma = new THREE.ShapeGeometry(persegiBulat(L - 2 * sisih, D - 2 * sisih, SUDUT - sisih), 24);
  mukaSitoplasma.rotateX(-Math.PI / 2);
  mukaSitoplasma.translate(0, MUKA, 0);
  tambah(
    bagian("sitoplasma", SEL.sitoplasma.warna, { peta: bintik, redupWarnaSaja: true, garis: false }),
    mukaSitoplasma,
    sel,
    false,
  );
  sel.add(lantaiBayang(teksturBayang(), L * 1.7, D * 1.9, -T / 2 - 0.05));

  /* ---------- vakuola pusat: kubah besar yang memenuhi sebagian besar sel ---------- */
  const vakuola = bolaHalus(1, 64, 40);
  vakuola.scale(8.6, 1.3, 6.6);
  vakuola.translate(2.8, MUKA, 0.6);
  tambah(bagian("vakuola", SEL.vakuola.warna, { tembus: 0.9, garis: 0.003 }), vakuola, sel);

  /* ---------- inti: terdesak vakuola ke tepi ---------- */
  const C = new THREE.Vector3(-9.6, MUKA - 0.4, -4.4);
  const bolaInti = bolaHalus(2.6, 48, 32);
  bolaInti.translate(C.x, C.y, C.z);
  tambah(bagian(["membranInti", "inti"], SEL.membranInti.warna, { garis: 0.003 }), bolaInti, sel);
  const nukleolus = bolaHalus(0.8, 24, 16);
  nukleolus.translate(C.x + 0.9, C.y + 2.2, C.z + 0.9);
  tambah(bagian(["nukleolus", "inti"], SEL.nukleolus.warna, { garis: false }), nukleolus, sel);

  /* RE kasar memeluk inti */
  const reKasar = bagian("reKasar", SEL.reKasar.warna, { garis: 0.0026 });
  [3.3, 4.0].forEach((jari, i) => {
    const g = lembaranBerlipat({
      pusatX: C.x,
      pusatZ: C.z,
      jari,
      a0: -0.2 + i * 0.05,
      a1: 1.6 - i * 0.05,
      amplitudo: 0.2,
      gelombang: 5 + i,
      tebal: 0.34,
      tinggi: 2.4 - i * 0.3,
      bevel: 0.12,
    });
    g.translate(0, MUKA - 1.1, 0);
    tambah(reKasar, g, sel);
  });

  /* badan Golgi kecil */
  const golgi = bagian("golgi", SEL.golgi.warna, { garis: 0.0026 });
  const G = { x: -4.2, z: 6.2 };
  [1.3, 1.75, 2.2].forEach((jari, i) => {
    const g = lembaranBerlipat({
      pusatX: G.x,
      pusatZ: G.z,
      jari,
      a0: -1.9 - 0.55,
      a1: -1.9 + 0.55,
      amplitudo: 0,
      gelombang: 0,
      tebal: 0.32,
      tinggi: 1.9 + (i === 1 ? 0.3 : 0),
      bevel: 0.12,
    });
    g.translate(0, MUKA - 1.0, 0);
    tambah(golgi, g, sel);
  });

  /* ---------- kloroplas: berjajar di sepanjang tepi, di antara dinding dan vakuola ---------- */
  const TEMPAT_KLOROPLAS: [number, number, number][] = [
    [-2.2, -7.9, 0.2],
    [3.6, -8.2, -0.15],
    [9.2, -7.6, 0.4],
    [12.4, -3.2, 1.3],
    [12.6, 3.4, 1.6],
    [9.0, 8.1, -0.3],
    [3.4, 8.3, 0.1],
    [-10.2, 4.2, 1.2],
    [-12.2, -1.2, 1.5],
  ];
  const posisiKloroplas: THREE.Vector3[] = [];
  for (const [x, z, putar] of TEMPAT_KLOROPLAS) {
    const k = new THREE.Group();
    k.position.set(x, MUKA + 0.2, z);
    k.rotation.y = putar;
    sel.add(k);
    bangunKloroplasIris(studio, k, 1.15, 0.05);
    posisiKloroplas.push(k.position.clone());
  }

  /* mitokondria dan peroksisom */
  for (const [x, z, putar] of [
    [-6.8, -7.2, 0.3],
    [5.8, 5.4, -0.9],
  ] as const) {
    const k = new THREE.Group();
    k.position.set(x, MUKA + 0.3, z);
    k.rotation.y = putar;
    sel.add(k);
    bangunMitokondriaIris(studio, k, 0.95, 0.04);
  }
  const peroksisom = bolaHalus(0.62, 24, 16);
  peroksisom.translate(-1.2, MUKA + 0.1, 7.6);
  tambah(bagian("peroksisom", SEL.peroksisom.warna), peroksisom, sel);

  /* ribosom bebas */
  const ribosom: THREE.Matrix4[] = [];
  const batasX = L / 2 - TEBAL_DINDING - 1.2;
  const batasZ = D / 2 - TEBAL_DINDING - 1.2;
  while (ribosom.length < 110) {
    const x = (acak() * 2 - 1) * batasX;
    const z = (acak() * 2 - 1) * batasZ;
    if (((x - 2.8) / 8.9) ** 2 + ((z - 0.6) / 6.9) ** 2 < 1) continue; // bukan di atas vakuola
    ribosom.push(new THREE.Matrix4().makeTranslation(x, MUKA + 0.05, z));
  }
  tambahBanyak(bagian("ribosom", SEL.ribosom.warna, { garis: false }), new THREE.SphereGeometry(0.12, 8, 6), ribosom, sel);

  const kl = posisiKloroplas[4];
  const fokus: Record<string, Pandangan> = {
    utuh: lihat(0, -0.8, 0, 50, 0.1, 1.0, "putar"),
    dinding: lihat(L / 2 - 1.5, BIBIR, 2.5, 11, 1.15, 0.78),
    kloroplas: lihat(kl.x, kl.y + 0.4, kl.z, 9, 0.9, 0.72),
    vakuola: lihat(2.8, MUKA + 0.5, 0.6, 28, 0.15, 0.85),
    inti: lihat(C.x, C.y + 1.2, C.z, 16, -0.3, 0.9),
  };
  return { fokus };
}
