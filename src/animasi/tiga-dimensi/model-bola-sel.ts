import * as THREE from "three";
import { SEL, ronaGelap, ronaTerang } from "@/lib/warna";
import type { Studio } from "./studio";
import { bolaHalus, lembaranBerlipat, tabung, teksturBintik, teksturTimbul } from "./bentuk";
import { bangunMitokondriaIris } from "./model-sel-hewan";

/**
 * BOLA SEL — gambar ikon aplikasi Ruang Genetika (25 Sep 2026).
 *
 * Nely ingin ikon di layar HP berupa "bola sel yang mengambang". Sel pelajaran
 * (model-sel-hewan.ts) pipih seperti piring, jadi untuk ikon dibuat bola:
 * sel hewan yang diambil seperdelapannya seperti jeruk diiris sepotong. Inti
 * ungu terbelah di pusat bola; mitokondria, badan Golgi, RE kasar, lisosom,
 * dan ribosom duduk di dasar irisan. Semua warna dari src/lib/warna.ts.
 *
 * Irisan yang dibuang = ruang x > 0, y > 0, z > 0. Pandang dari arah (1, 1, 1):
 * azimut π/4, kutub ± 0,96.
 *
 * Bidang irisan three.js berlaku di koordinat dunia. Bangun bola di titik asal;
 * kalau sesudahnya dipindah, diputar, atau diskalakan, panggil `ikuti()` agar
 * bidang-bidang irisannya ikut.
 */

const R = 10;
const TEBAL = 0.75;
const R_INTI = 4.2;
const TEBAL_INTI = 0.4;
const SEPEREMPAT = Math.PI / 2;

/** Tiga muka irisan: bidang xy, yz, dan zx — tiap muka menghadap ke dalam irisan. */
const SUSUNAN_MUKA = [
  new THREE.Matrix4(),
  new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0)),
  new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)),
];

export function bangunBolaSel(studio: Studio, induk: THREE.Object3D, acak: () => number) {
  const { bagian, tambah, tambahBanyak } = studio;
  const grup = new THREE.Group();
  induk.add(grup);

  /* three.js membuang sisi yang jaraknya negatif; dengan potongSudut, yang
     dibuang hanya ruang di sisi negatif KETIGA bidang sekaligus = satu irisan. */
  const potong = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)].map(
    (n) => new THREE.Plane(n.negate(), 0),
  );
  const bidangIkut = potong.map((bidang) => ({ bidang, asal: bidang.clone() }));
  const timbul = teksturTimbul(acak);
  timbul.repeat.set(6, 3);
  const bintik = teksturBintik(acak);
  bintik.repeat.set(0.12, 0.12);

  /* ---------- membran sel ---------- */
  tambah(
    bagian("membranSel", SEL.membranSel.warna, { potong, potongSudut: true, timbul, garis: 0.0035 }),
    bolaHalus(R, 128, 96),
    grup,
  );

  const muka = SUSUNAN_MUKA.map((susunan) => {
    const g = new THREE.Group();
    g.quaternion.setFromRotationMatrix(susunan);
    grup.add(g);
    return g;
  });
  const cincin = (r0: number, r1: number) => new THREE.RingGeometry(r0, r1, 72, 1, 0, SEPEREMPAT);

  /* tepi membran di muka irisan: dua lapis terang dengan garis gelap di tengah */
  const lapis = bagian("membranSel", ronaTerang(SEL.membranSel.warna, 0.45), { sisi: THREE.DoubleSide, garis: false });
  const garisTengah = bagian("membranSel", ronaGelap(SEL.membranSel.warna, 0.15), {
    sisi: THREE.DoubleSide,
    garis: false,
  });
  const sitoplasma = bagian("sitoplasma", SEL.sitoplasma.warna, { peta: bintik, sisi: THREE.DoubleSide, garis: false });
  const tengahTepi = R - TEBAL / 2;
  for (const m of muka) {
    tambah(lapis, cincin(R - TEBAL, R), m, false);
    const garis = cincin(tengahTepi - 0.06, tengahTepi + 0.06);
    garis.translate(0, 0, 0.004);
    tambah(garisTengah, garis, m, false);
    tambah(sitoplasma, cincin(R_INTI, R - TEBAL), m, false);
  }

  /* ---------- inti: bola ungu yang ikut teriris, nukleolus di sudutnya ---------- */
  tambah(
    bagian(["membranInti", "inti"], SEL.membranInti.warna, { potong, potongSudut: true }),
    bolaHalus(R_INTI, 96, 64),
    grup,
  );
  const pori: THREE.Matrix4[] = [];
  const N_PORI = 70;
  for (let i = 0; i < N_PORI; i++) {
    const y = 1 - (2 * (i + 0.5)) / N_PORI;
    const r = Math.sqrt(1 - y * y);
    const phi = i * 2.399963;
    const d = new THREE.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), d);
    pori.push(new THREE.Matrix4().compose(d.clone().multiplyScalar(R_INTI), q, new THREE.Vector3(1, 1, 1)));
  }
  tambahBanyak(
    bagian(["membranInti", "inti"], ronaGelap(SEL.membranInti.warna, 0.28), { potong, potongSudut: true, garis: false }),
    new THREE.TorusGeometry(0.19, 0.065, 8, 18),
    pori,
    grup,
  );
  const selubung = bagian(["membranInti", "inti"], ronaTerang(SEL.membranInti.warna, 0.12), {
    sisi: THREE.DoubleSide,
    garis: false,
  });
  const isiInti = bagian("inti", SEL.inti.warna, { sisi: THREE.DoubleSide, garis: false });
  const kromatin = bagian(["kromatin", "inti"], SEL.kromatin.warna, { garis: false });
  const PUSAT_NUKLEOLUS = 0.5;
  const jarakNukleolus = 1.35 + 0.35;
  for (const m of muka) {
    tambah(selubung, cincin(R_INTI - TEBAL_INTI, R_INTI), m, false);
    tambah(isiInti, new THREE.CircleGeometry(R_INTI - TEBAL_INTI, 60, 0, SEPEREMPAT), m, false);
    /* kromatin: benang kusut di muka irisan inti, menjauhi nukleolus */
    for (let k = 0; k < 4; k++) {
      const titik: THREE.Vector3[] = [];
      let sudut = acak() * Math.PI * 2;
      const r0 = 2.0 + acak() * 0.9;
      const a0 = 0.25 + acak() * (SEPEREMPAT - 0.5);
      let x = r0 * Math.cos(a0);
      let y = r0 * Math.sin(a0);
      for (let s = 0; s < 6; s++) {
        const d = Math.hypot(x - PUSAT_NUKLEOLUS, y - PUSAT_NUKLEOLUS);
        if (d < jarakNukleolus) {
          x = PUSAT_NUKLEOLUS + ((x - PUSAT_NUKLEOLUS) / (d || 1)) * jarakNukleolus;
          y = PUSAT_NUKLEOLUS + ((y - PUSAT_NUKLEOLUS) / (d || 1)) * jarakNukleolus;
        }
        const batas = (R_INTI - TEBAL_INTI) * 0.86;
        x = Math.max(x, 0.3);
        y = Math.max(y, 0.3);
        const jarak = Math.hypot(x, y);
        if (jarak > batas) {
          x *= batas / jarak;
          y *= batas / jarak;
        }
        titik.push(new THREE.Vector3(x, y, 0.06));
        sudut += (acak() - 0.5) * 1.8;
        x += Math.cos(sudut) * 0.55;
        y += Math.sin(sudut) * 0.55;
      }
      tambah(kromatin, tabung(titik, 0.1, 40, 6), m, false);
    }
  }
  const gNukleolus = bolaHalus(1.35, 40, 28);
  gNukleolus.translate(PUSAT_NUKLEOLUS, PUSAT_NUKLEOLUS, PUSAT_NUKLEOLUS);
  tambah(bagian(["nukleolus", "inti"], SEL.nukleolus.warna), gNukleolus, grup);

  /* ---------- organel di dasar irisan (bidang y = 0, x > 0, z > 0) ---------- */
  const titikDasar = (r: number, sudut: number) => ({ x: r * Math.cos(sudut), z: r * Math.sin(sudut) });

  // RE kasar: dua lembar berlipat yang memeluk inti, bertabur ribosom
  const reKasar = bagian("reKasar", SEL.reKasar.warna, { garis: 0.0026 });
  const ribosomRE: THREE.Matrix4[] = [];
  [5.0, 5.75].forEach((jari, i) => {
    const a0 = 0.16 + i * 0.05;
    const a1 = SEPEREMPAT - 0.16 - i * 0.05;
    const gelombang = 5 + i;
    const g = lembaranBerlipat({ pusatX: 0, pusatZ: 0, jari, a0, a1, amplitudo: 0.22, gelombang, tebal: 0.36, tinggi: 2.1 - i * 0.35, bevel: 0.12 });
    g.translate(0, -1.0, 0);
    tambah(reKasar, g, grup);
    for (let k = 0; k < 46; k++) {
      const u = acak();
      const th = a0 + (a1 - a0) * u;
      const sisi = acak() < 0.5 ? -1 : 1;
      const r = jari + 0.22 * Math.sin(u * Math.PI * 2 * gelombang) + sisi * 0.34;
      const y = 0.15 + acak() * (0.9 - i * 0.3);
      ribosomRE.push(new THREE.Matrix4().makeTranslation(r * Math.cos(th), y, r * Math.sin(th)));
    }
  });
  tambahBanyak(bagian(["reKasar", "ribosom"], SEL.ribosom.warna, { garis: false }), new THREE.SphereGeometry(0.12, 8, 6), ribosomRE, grup);

  // badan Golgi: tumpukan kantung melengkung, cembung ke arah inti
  const golgi = bagian("golgi", SEL.golgi.warna, { garis: 0.0026 });
  const G = titikDasar(7.35, 0.78);
  const arahG = Math.atan2(-G.z, -G.x);
  [1.25, 1.7, 2.15, 2.6].forEach((jari, i) => {
    const rentang = [0.62, 0.7, 0.7, 0.62][i];
    const tinggi = [1.1, 1.4, 1.4, 1.1][i];
    const g = lembaranBerlipat({ pusatX: G.x, pusatZ: G.z, jari, a0: arahG - rentang, a1: arahG + rentang, amplitudo: 0, gelombang: 0, tebal: 0.34, tinggi: tinggi + 1, bevel: 0.13 });
    g.translate(0, -1.0, 0);
    tambah(golgi, g, grup);
  });
  const gelembung = bagian("golgi", ronaTerang(SEL.golgi.warna, 0.15), { garis: 0.0022 });
  for (let k = 0; k < 5; k++) {
    const a = arahG + (k % 2 === 0 ? -1 : 1) * (0.85 + acak() * 0.3);
    const jari = 1.2 + acak() * 1.6;
    const g = bolaHalus(0.28 + acak() * 0.1, 18, 12);
    g.translate(G.x + jari * Math.cos(a), 0.25 + acak() * 0.4, G.z + jari * Math.sin(a));
    tambah(gelembung, g, grup);
  }

  // mitokondria: kapsul yang diiris memanjang, krista terlihat
  for (const [r, sudut, arah, skala] of [
    [7.1, 0.2, 1.75, 1.05],
    [7.0, 1.36, -0.25, 1.0],
  ] as const) {
    const t = titikDasar(r, sudut);
    const k = new THREE.Group();
    k.position.set(t.x, 0.28, t.z);
    k.rotation.y = arah;
    grup.add(k);
    const bidang = bangunMitokondriaIris(studio, k, skala, 0.04);
    bidangIkut.push({ bidang, asal: bidang.clone() });
  }

  // lisosom dan peroksisom: kantung bulat yang menyembul
  for (const [entitas, r, sudut, jari] of [
    ["lisosom", 8.45, 0.55, 0.62],
    ["peroksisom", 8.5, 1.05, 0.5],
  ] as const) {
    const t = titikDasar(r, sudut);
    const g = bolaHalus(jari, 28, 20);
    g.translate(t.x, 0.15, t.z);
    tambah(bagian(entitas, SEL[entitas].warna), g, grup);
  }

  /* ---------- ribosom bebas dan serat sitoskeleton di ketiga muka ---------- */
  const ribosomBebas: THREE.Matrix4[] = [];
  const serat = bagian("sitoskeleton", SEL.sitoskeleton.warna, { garis: false });
  SUSUNAN_MUKA.forEach((susunan, i) => {
    const q = new THREE.Quaternion().setFromRotationMatrix(susunan);
    const keDunia = (x: number, y: number, z = 0.05) => new THREE.Vector3(x, y, z).applyQuaternion(q);
    const jumlah = i === 2 ? 26 : 40;
    for (let n = 0, dicoba = 0; n < jumlah && dicoba < 400; dicoba++) {
      const r = R_INTI + 0.5 + acak() * (R - TEBAL - R_INTI - 1.0);
      const a = 0.06 + acak() * (SEPEREMPAT - 0.12);
      if (i === 2 && r > 4.6 && r < 6.5) continue; // di dasar, jangan tertimbun RE kasar
      ribosomBebas.push(new THREE.Matrix4().makeTranslation(keDunia(r * Math.cos(a), r * Math.sin(a))));
      n++;
    }
    if (i === 2) return; // dasar sudah ramai
    for (let k = 0; k < 3; k++) {
      const a = 0.25 + k * 0.5 + acak() * 0.2;
      const titik: THREE.Vector3[] = [];
      for (let s = 0; s <= 6; s++) {
        const r = R_INTI + 0.4 + (s / 6) * (R - TEBAL - R_INTI - 0.8);
        const liuk = 0.22 * Math.sin(s * 1.3 + k);
        titik.push(keDunia(r * Math.cos(a + liuk / r), r * Math.sin(a + liuk / r), 0.035));
      }
      tambah(serat, tabung(titik, 0.05, 40, 5), grup, false);
    }
  });
  tambahBanyak(bagian("ribosom", SEL.ribosom.warna, { garis: false }), new THREE.SphereGeometry(0.12, 8, 6), ribosomBebas, grup);

  /** Setelah bola dipindah/diputar/diskalakan: geser bidang-bidang irisannya. */
  const ikuti = () => {
    grup.updateWorldMatrix(true, false);
    for (const b of bidangIkut) b.bidang.copy(b.asal).applyMatrix4(grup.matrixWorld);
  };
  return { grup, ikuti };
}
