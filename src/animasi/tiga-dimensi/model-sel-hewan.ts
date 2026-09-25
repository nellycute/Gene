import * as THREE from "three";
import { SEL, ronaGelap, ronaTerang } from "@/lib/warna";
import type { Pandangan, Studio } from "./studio";
import { lihat } from "./studio";
import {
  bolaHalus,
  lantaiBayang,
  lembaranBerlipat,
  rapikanJahitan,
  stadion,
  tabung,
  teksturBayang,
  teksturBintik,
  teksturTimbul,
} from "./bentuk";

/**
 * MODEL SEL HEWAN YANG DIBELAH — dipakai pelajaran 0.2 dan 0.3.
 *
 * Sel dibelah mendatar seperti buah; inti diambil seperdelapannya seperti kue
 * yang dipotong sepotong. Semua warna dari src/lib/warna.ts. Ukuran organel
 * sengaja dibesar-besarkan agar terbaca di layar HP — ini ilustrasi, bukan
 * gambar berskala.
 *
 * Mengembalikan daftar sudut pandang per bagian (`fokus`) untuk sutradara kamera.
 */

/* Ukuran (satuan bebas). Sel = elipsoid pipih yang dipotong mendatar. */
export const RX = 16;
export const RY = 8;
export const RZ = 12.5;
const TEBAL = 0.9;
/** Tinggi bibir potongan membran: bagian sel di atas ini dibuang. */
const BIBIR = 2.4;
/** Tinggi permukaan sitoplasma yang terpotong — sedikit di bawah bibir. */
export const MUKA = 2.1;

export function bangunSelHewan(studio: Studio, induk: THREE.Object3D, acak: () => number) {
  const { bagian, tambah, tambahBanyak } = studio;
  const bintik = teksturBintik(acak);
  bintik.repeat.set(0.09, 0.09);
  const timbul = teksturTimbul(acak);
  timbul.repeat.set(5, 3);

  const sel = new THREE.Group();
  induk.add(sel);

  /* ================================================================ *
   * MEMBRAN SEL — mangkuk berdinding tebal, dipotong mendatar
   * ================================================================ */
  const potongSel = new THREE.Plane(new THREE.Vector3(0, -1, 0), BIBIR);
  tambah(
    bagian("membranSel", SEL.membranSel.warna, { potong: [potongSel], timbul, redupWarnaSaja: true, garis: 0.0035 }),
    elipsoidSel(RX, RY, RZ),
    sel,
  );
  tambah(
    bagian("membranSel", ronaTerang(SEL.membranSel.warna, 0.3), {
      potong: [potongSel],
      sisi: THREE.BackSide,
      redupWarnaSaja: true,
      garis: false,
    }),
    elipsoidSel(RX - TEBAL, RY - TEBAL, RZ - TEBAL),
    sel,
  );
  /* Tepi potongan membran berlapis dua dengan garis gelap di tengah —
     dwilapis fosfolipid, seperti yang disebut narasi. */
  const lapisMembran = bagian("membranSel", ronaTerang(SEL.membranSel.warna, 0.45), {
    sisi: THREE.DoubleSide,
    redupWarnaSaja: true,
    garis: false,
  });
  tambah(lapisMembran, cincinBibir(BIBIR, 0, 0.4), sel, false);
  tambah(lapisMembran, cincinBibir(BIBIR, 0.6, 1), sel, false);
  tambah(
    bagian("membranSel", ronaGelap(SEL.membranSel.warna, 0.15), {
      sisi: THREE.DoubleSide,
      redupWarnaSaja: true,
      garis: false,
    }),
    cincinBibir(BIBIR, 0.4, 0.6),
    sel,
    false,
  );

  /* ---------- permukaan sitoplasma yang terpotong ---------- */
  tambah(
    bagian("sitoplasma", SEL.sitoplasma.warna, { peta: bintik, redupWarnaSaja: true, garis: false }),
    cakramSitoplasma(MUKA),
    sel,
    false,
  );

  sel.add(lantaiBayang(teksturBayang(), RX * 2.9, RZ * 2.9, -RY - 0.05));

  /* ================================================================ *
   * INTI SEL — bola yang diambil seperdelapannya. Setiap bagian inti juga
   * terdaftar sebagai "inti", jadi adegan yang menyorot inti sel menyalakan
   * seluruhnya; adegan yang menyorot satu bagian hanya menyalakan bagian itu.
   * ================================================================ */
  const C = new THREE.Vector3(-4.2, MUKA + 0.7, -1.2);
  const R_LUAR = 4.4;
  const R_DALAM = 4.0;
  /* Bingkai inti diputar di sumbu tegak agar celah potongan menghadap penonton. */
  const putarInti = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -0.72);
  /* Ruang yang dibuang = sisi positif ketiga sumbu sekaligus. three.js membuang
     sisi yang jaraknya negatif, jadi normal bidangnya dibalik. */
  const potongInti = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)].map((n) =>
    new THREE.Plane().setFromNormalAndCoplanarPoint(n.applyQuaternion(putarInti).negate(), C),
  );

  const bolaInti = bolaHalus(R_LUAR, 96, 64);
  bolaInti.translate(C.x, C.y, C.z);
  tambah(bagian(["membranInti", "inti"], SEL.membranInti.warna, { potong: potongInti, potongSudut: true }), bolaInti, sel);

  /* Pori inti: cincin kecil tersebar merata di permukaan selubung. */
  const matriksPori: THREE.Matrix4[] = [];
  const N_PORI = 90;
  for (let i = 0; i < N_PORI; i++) {
    const y = 1 - (2 * (i + 0.5)) / N_PORI;
    const r = Math.sqrt(1 - y * y);
    const phi = i * 2.399963;
    const d = new THREE.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), d);
    matriksPori.push(new THREE.Matrix4().compose(C.clone().addScaledVector(d, R_LUAR), q, new THREE.Vector3(1, 1, 1)));
  }
  tambahBanyak(
    bagian(["membranInti", "inti"], ronaGelap(SEL.membranInti.warna, 0.28), {
      potong: potongInti,
      potongSudut: true,
      garis: false,
    }),
    new THREE.TorusGeometry(0.2, 0.07, 8, 18),
    matriksPori,
    sel,
  );

  const bingkaiInti = new THREE.Group();
  bingkaiInti.position.copy(C);
  bingkaiInti.quaternion.copy(putarInti);
  sel.add(bingkaiInti);

  // nukleolus: bola utuh di sudut potongan, separuhnya menyembul ke celah
  const PUSAT_NUKLEOLUS = 0.42;
  const gNukleolus = bolaHalus(1.3, 48, 32);
  gNukleolus.translate(PUSAT_NUKLEOLUS, PUSAT_NUKLEOLUS, PUSAT_NUKLEOLUS);
  tambah(bagian(["nukleolus", "inti"], SEL.nukleolus.warna), gNukleolus, bingkaiInti);

  /* Tiga muka potong: seperempat lingkaran di bidang xy yang diputar ke
     tempatnya; susunan sumbunya dipilih agar setiap muka menghadap ke celah. */
  const susunanMuka = [
    new THREE.Matrix4(),
    new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0)),
    new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)),
  ];
  // selubung inti berlapis ganda: dua membran dengan celah gelap di tengahnya
  const selubungMuka = bagian(["membranInti", "inti"], ronaTerang(SEL.membranInti.warna, 0.12), {
    sisi: THREE.DoubleSide,
    garis: false,
  });
  const celahMuka = bagian(["membranInti", "inti"], ronaGelap(SEL.membranInti.warna, 0.35), {
    sisi: THREE.DoubleSide,
    garis: false,
  });
  const isiMuka = bagian("inti", SEL.inti.warna, { sisi: THREE.DoubleSide, garis: false });
  const kromatin = bagian(["kromatin", "inti"], SEL.kromatin.warna, { garis: false });
  const R_CELAH = (R_LUAR + R_DALAM) / 2;
  const SEPEREMPAT = Math.PI / 2;
  const JARAK_NUKLEOLUS = Math.sqrt(1.3 ** 2 - PUSAT_NUKLEOLUS ** 2) + 0.3;
  const TEPI = 0.28;
  const batasKromatin = R_DALAM * 0.86;

  for (const susunan of susunanMuka) {
    const muka = new THREE.Group();
    muka.quaternion.setFromRotationMatrix(susunan);
    bingkaiInti.add(muka);
    tambah(selubungMuka, new THREE.RingGeometry(R_DALAM, R_LUAR, 48, 1, 0, SEPEREMPAT), muka, false);
    const celah = new THREE.RingGeometry(R_CELAH - 0.035, R_CELAH + 0.035, 48, 1, 0, SEPEREMPAT);
    celah.translate(0, 0, 0.004);
    tambah(celahMuka, celah, muka, false);
    tambah(isiMuka, new THREE.CircleGeometry(R_DALAM, 48, 0, SEPEREMPAT), muka, false);

    // kromatin: benang kusut berbaring di muka potong, menjauhi nukleolus dan tepi
    for (let k = 0; k < 5; k++) {
      const titik: THREE.Vector3[] = [];
      const r0 = 1.9 + acak() * 1.3;
      const a0 = 0.2 + acak() * (SEPEREMPAT - 0.4);
      let x = r0 * Math.cos(a0);
      let y = r0 * Math.sin(a0);
      let sudut = acak() * Math.PI * 2;
      for (let s = 0; s < 7; s++) {
        const jn = Math.hypot(x - PUSAT_NUKLEOLUS, y - PUSAT_NUKLEOLUS);
        if (jn < JARAK_NUKLEOLUS) {
          x = PUSAT_NUKLEOLUS + ((x - PUSAT_NUKLEOLUS) / (jn || 1)) * JARAK_NUKLEOLUS;
          y = PUSAT_NUKLEOLUS + ((y - PUSAT_NUKLEOLUS) / (jn || 1)) * JARAK_NUKLEOLUS;
        }
        x = Math.max(x, TEPI);
        y = Math.max(y, TEPI);
        const d = Math.hypot(x, y);
        if (d > batasKromatin) {
          x *= batasKromatin / d;
          y *= batasKromatin / d;
        }
        titik.push(new THREE.Vector3(x, y, 0.06));
        sudut += (acak() - 0.5) * 1.9;
        x += Math.cos(sudut) * 0.62;
        y += Math.sin(sudut) * 0.62;
        if (x < TEPI || y < TEPI || Math.hypot(x, y) > batasKromatin) sudut += Math.PI * 0.8;
      }
      tambah(kromatin, tabung(titik, 0.11, 50, 8), muka, false);
    }
  }

  /* ================================================================ *
   * RETIKULUM ENDOPLASMA KASAR — lembaran berlipat yang memeluk inti
   * ================================================================ */
  const reKasar = bagian("reKasar", SEL.reKasar.warna, { garis: 0.0026 });
  const riboER: THREE.Matrix4[] = [];
  [5.35, 6.2, 7.05].forEach((jari, i) => {
    const a0 = -2.25 + i * 0.06;
    const a1 = 0.32 - i * 0.04;
    const gelombang = 6 + i;
    const atas = MUKA + 1.75 - i * 0.22;
    const bawah = MUKA - 1.6;
    const g = lembaranBerlipat({
      pusatX: C.x,
      pusatZ: C.z,
      jari,
      a0,
      a1,
      amplitudo: 0.26,
      gelombang,
      tebal: 0.42,
      tinggi: atas - bawah,
      bevel: 0.14,
    });
    g.translate(0, bawah, 0);
    tambah(reKasar, g, sel);
    for (let k = 0; k < 90; k++) {
      const u = acak();
      const th = a0 + (a1 - a0) * u;
      const sisi = acak() < 0.5 ? -1 : 1;
      const r = jari + 0.26 * Math.sin(u * Math.PI * 2 * gelombang) + sisi * 0.4;
      const y = MUKA + 0.15 + acak() * (atas - MUKA - 0.2);
      riboER.push(new THREE.Matrix4().makeTranslation(C.x + r * Math.cos(th), y, C.z + r * Math.sin(th)));
    }
  });
  // ribosom yang menempel ikut redup bersama RE kasar, tapi menyala saat ribosom dibahas
  tambahBanyak(
    bagian(["reKasar", "ribosom"], SEL.ribosom.warna, { garis: false }),
    new THREE.SphereGeometry(0.13, 8, 6),
    riboER,
    sel,
  );

  /* ---------- retikulum endoplasma halus: jaring tabung ----------
     Tiga tabung panjang berombak yang disambung beberapa tabung melintang —
     terbaca sebagai jaring (reticulum), bukan gumpalan. Satu tabung
     menyambung ke ujung RE kasar ("satu jaringan yang bersambung"). */
  const reHalus = bagian("reHalus", SEL.reHalus.warna, { garis: 0.0022 });
  const tabungREH = (titik: THREE.Vector3[], jari = 0.21) => tambah(reHalus, tabung(titik, jari, 120, 10), sel);
  const TENGGELAM = MUKA - 0.45;
  const tinggiREH = (s: number) => MUKA + 0.2 + 0.07 * Math.sin(s);
  const JALUR_REH = [
    { z: 1.1, fase: 0 },
    { z: 2.05, fase: 1.3 },
    { z: 3.0, fase: 2.6 },
  ];
  const zREH = (jalur: (typeof JALUR_REH)[number], x: number) =>
    jalur.z + 0.22 * Math.sin(((x - 3.6) / 0.55) * 1.4 + jalur.fase);
  for (const jalur of JALUR_REH) {
    const titik: THREE.Vector3[] = [];
    for (let i = 0; i <= 8; i++) {
      const x = 3.6 + i * 0.55;
      const ujung = i === 0 || i === 8;
      titik.push(new THREE.Vector3(x, ujung ? TENGGELAM : tinggiREH(i + jalur.fase), zREH(jalur, x)));
    }
    tabungREH(titik);
  }
  for (const [x, a, b] of [
    [4.4, 0, 1],
    [6.1, 0, 1],
    [5.2, 1, 2],
    [7.0, 1, 2],
  ] as const) {
    const za = zREH(JALUR_REH[a], x);
    const zb = zREH(JALUR_REH[b], x);
    tabungREH(
      [
        new THREE.Vector3(x, MUKA + 0.2, za),
        new THREE.Vector3(x + 0.12, MUKA + 0.24, (za + zb) / 2),
        new THREE.Vector3(x, MUKA + 0.2, zb),
      ],
      0.17,
    );
  }
  tabungREH([
    new THREE.Vector3(2.2, TENGGELAM, 0.25),
    new THREE.Vector3(2.8, MUKA + 0.22, 0.55),
    new THREE.Vector3(3.4, MUKA + 0.24, 0.85),
    new THREE.Vector3(4.0, MUKA + 0.2, zREH(JALUR_REH[0], 4.0)),
  ]);

  /* ================================================================ *
   * BADAN GOLGI — tumpukan kantung melengkung, cembung ke arah inti
   * ================================================================ */
  const golgi = bagian("golgi", SEL.golgi.warna, { garis: 0.0026 });
  const G = { x: 9.9, z: -3.9 };
  const arahG = Math.atan2(C.z - G.z, C.x - G.x);
  [2.3, 2.8, 3.3, 3.85, 4.35].forEach((jari, i) => {
    const rentang = [0.6, 0.68, 0.72, 0.68, 0.6][i];
    const atas = MUKA + [1.3, 1.6, 1.8, 1.6, 1.3][i];
    const bawah = MUKA - 1.2;
    const g = lembaranBerlipat({
      pusatX: G.x,
      pusatZ: G.z,
      jari,
      a0: arahG - rentang,
      a1: arahG + rentang,
      amplitudo: 0,
      gelombang: 0,
      tebal: 0.4,
      tinggi: atas - bawah,
      bevel: 0.15,
    });
    g.translate(0, bawah, 0);
    tambah(golgi, g, sel);
  });
  const gelembung = bagian("golgi", ronaTerang(SEL.golgi.warna, 0.15), { garis: 0.0022 });
  for (let k = 0; k < 9; k++) {
    const kiri = k % 2 === 0;
    const a = arahG + (kiri ? -1 : 1) * (0.75 + acak() * 0.35);
    const jari = 1.9 + acak() * 3.1;
    const g = bolaHalus(0.32 + acak() * 0.14, 20, 14);
    g.translate(G.x + jari * Math.cos(a), MUKA + 0.25 + acak() * 0.5, G.z + jari * Math.sin(a));
    tambah(gelembung, g, sel);
  }

  /* ================================================================ *
   * MITOKONDRIA — kapsul yang diiris memanjang: tampak krista di dalamnya
   * ================================================================ */
  const mitokondria = (x: number, z: number, sudut: number, skalaDasar = 1) => {
    const k = new THREE.Group();
    k.position.set(x, MUKA + 0.3, z);
    k.rotation.y = sudut;
    sel.add(k);
    bangunMitokondriaIris(studio, k, skalaDasar * 1.25, 0.04);
  };
  mitokondria(6.8, 6.0, -0.3);
  mitokondria(11.5, -0.5, 1.35, 0.92);
  mitokondria(-10.0, 4.6, -0.35, 0.9);
  mitokondria(-4.5, 8.0, 0.15, 0.95);
  mitokondria(3.0, 9.6, -0.1, 0.85);

  /* ================================================================ *
   * LISOSOM, PEROKSISOM, VAKUOLA — kantung bulat
   * ================================================================ */
  const lisosom = bagian("lisosom", SEL.lisosom.warna);
  for (const [x, z, r] of [
    [-9.6, 7.6, 1.05],
    [3.0, -7.9, 1.0],
    [11.2, -6.3, 0.95],
  ]) {
    const g = bolaHalus(r, 32, 22);
    g.translate(x, MUKA + 0.2, z);
    tambah(lisosom, g, sel);
  }
  const peroksisom = bagian("peroksisom", SEL.peroksisom.warna);
  for (const [x, z, r] of [
    [-13.0, -0.6, 0.72],
    [10.0, 7.8, 0.7],
  ]) {
    const g = bolaHalus(r, 28, 20);
    g.translate(x, MUKA + 0.12, z);
    tambah(peroksisom, g, sel);
  }
  const gVakuola = bolaHalus(1.74, 40, 28);
  gVakuola.translate(-12.0, MUKA + 0.3, -3.4);
  tambah(bagian("vakuola", SEL.vakuola.warna, { tembus: 0.82 }), gVakuola, sel);

  /* ================================================================ *
   * SENTRIOL — dua laras tegak lurus, masing-masing 9 triplet mikrotubulus
   * ================================================================ */
  const SENTROSOM = { x: 1.2, z: 3.3 };
  const tabungSentriol: THREE.Matrix4[] = [];
  const laras = (pusat: THREE.Vector3, sumbu: THREE.Vector3) => {
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), sumbu.clone().normalize());
    for (let k = 0; k < 9; k++) {
      const a = (k / 9) * Math.PI * 2;
      for (let j = 0; j < 3; j++) {
        const geser = (j - 1) * 0.155;
        const lokal = new THREE.Vector3(
          0.5 * Math.cos(a) + geser * Math.cos(a + 1.15),
          0,
          0.5 * Math.sin(a) + geser * Math.sin(a + 1.15),
        );
        lokal.applyQuaternion(q).add(pusat);
        tabungSentriol.push(new THREE.Matrix4().compose(lokal, q, new THREE.Vector3(1, 1, 1)));
      }
    }
  };
  laras(new THREE.Vector3(0.6, MUKA + 0.7, 3.6), new THREE.Vector3(1, 0, 0.15));
  laras(new THREE.Vector3(1.8, MUKA + 1.2, 3.05), new THREE.Vector3(0.1, 1, 0.2));
  tambahBanyak(
    bagian("sentriol", SEL.sentriol.warna, { garis: false }),
    new THREE.CylinderGeometry(0.078, 0.078, 1.95, 8),
    tabungSentriol,
    sel,
  );

  /* ---------- sitoskeleton: serat tipis yang memancar dari dekat sentriol ----------
     Serat berbaring tepat di permukaan sitoplasma, jadi yang lewat di bawah
     organel tertutup olehnya dengan sendirinya. */
  const serat = bagian("sitoskeleton", SEL.sitoskeleton.warna, { garis: false });
  const cMuka = Math.sqrt(1 - (MUKA / (RY - TEBAL)) ** 2);
  const A = (RX - TEBAL) * cMuka * 0.93;
  const B = (RZ - TEBAL) * cMuka * 0.93;
  const N_SERAT = 14;
  for (let k = 0; k < N_SERAT; k++) {
    const sudut = (k / N_SERAT) * Math.PI * 2 + acak() * 0.3;
    const c = Math.cos(sudut);
    const s = Math.sin(sudut);
    // jarak dari sentrosom ke dinding dalam pada arah ini (akar positif persamaan elips)
    const qa = (c * c) / (A * A) + (s * s) / (B * B);
    const qb = 2 * ((SENTROSOM.x * c) / (A * A) + (SENTROSOM.z * s) / (B * B));
    const qc = SENTROSOM.x ** 2 / (A * A) + SENTROSOM.z ** 2 / (B * B) - 1;
    const ujung = (-qb + Math.sqrt(qb * qb - 4 * qa * qc)) / (2 * qa);
    const titik: THREE.Vector3[] = [];
    const LANGKAH = 9;
    for (let i = 0; i <= LANGKAH; i++) {
      const f = i / LANGKAH;
      const jarak = 1.1 + (ujung - 1.1) * f;
      const liuk = 0.35 * Math.sin(f * Math.PI * 2 + k);
      titik.push(
        new THREE.Vector3(
          SENTROSOM.x + c * jarak - s * liuk,
          MUKA + 0.1 + 0.06 * Math.sin(f * Math.PI * 3 + k),
          SENTROSOM.z + s * jarak + c * liuk,
        ),
      );
    }
    tambah(serat, tabung(titik, 0.055, 60, 5), sel, false);
  }

  /* ---------- ribosom bebas: butiran di permukaan sitoplasma ---------- */
  const riboBebas: THREE.Matrix4[] = [];
  const batasX = (RX - TEBAL) * cMuka * 0.9;
  const batasZ = (RZ - TEBAL) * cMuka * 0.9;
  while (riboBebas.length < 130) {
    const x = (acak() * 2 - 1) * batasX;
    const z = (acak() * 2 - 1) * batasZ;
    if ((x / batasX) ** 2 + (z / batasZ) ** 2 > 1) continue;
    if (Math.hypot(x - C.x, z - C.z) < 4.9) continue;
    riboBebas.push(new THREE.Matrix4().makeTranslation(x, MUKA + 0.05, z));
  }
  tambahBanyak(bagian("ribosom", SEL.ribosom.warna, { garis: false }), new THREE.SphereGeometry(0.12, 8, 6), riboBebas, sel);

  /* ================================================================ *
   * SUDUT PANDANG — titiknya diambil dari letak organel di atas.
   * Azimut 0 = memandang dari depan, tempat celah inti menghadap.
   * ================================================================ */
  const UTUH = lihat(0, -0.6, 0, 48, 0, 1.01, "putar");
  const PANDANG_INTI = lihat(C.x, C.y + 0.4, C.z, 27, 0.07, 0.95);
  const fokus: Record<string, Pandangan> = {
    utuh: UTUH,
    membranSel: lihat(0, -1.5, 0, 46, 0, 1.12, "putar"),
    tepiMembran: lihat(3.2, BIBIR, 11.3, 8, 0.28, 0.72),
    sitoplasma: lihat(0, MUKA, 1.5, 36, 0, 0.9, "putar"),
    inti: PANDANG_INTI,
    membranInti: { ...PANDANG_INTI, jarak: 24 },
    poriInti: lihat(C.x - 2.3, C.y + 2.4, C.z + 2.5, 10, -0.55, 0.85),
    nukleolus: { ...PANDANG_INTI, jarak: 19 },
    kromatin: { ...PANDANG_INTI, jarak: 20 },
    mitokondria: lihat(6.8, MUKA + 0.3, 6.0, 18, 0.25, 0.9),
    krista: lihat(6.8, MUKA + 0.3, 6.0, 10, 0.25, 0.55),
    ribosom: lihat(2.2, MUKA + 0.4, 0.8, 17, 0.35, 0.9),
    riboER: lihat(1.6, MUKA + 0.9, -1.2, 12, 0.7, 0.85),
    reKasar: lihat(0.2, MUKA + 0.8, -3.2, 24, 0.85, 0.95),
    reHalus: lihat(5.6, MUKA + 0.3, 2.0, 16, 0.3, 0.88),
    golgi: lihat(7.6, MUKA + 0.8, -2.6, 19, 0.55, 0.92),
    vesikel: lihat(7.4, MUKA + 0.6, -1.4, 11, 0.8, 0.85),
    lisosom: lihat(-9.6, MUKA + 0.2, 7.6, 14, -0.3, 0.9),
    peroksisom: lihat(10.0, MUKA + 0.1, 7.8, 13, 0.35, 0.9),
    sitoskeleton: lihat(SENTROSOM.x, MUKA, SENTROSOM.z, 30, 0.1, 0.85, "putar"),
    sentriol: lihat(SENTROSOM.x, MUKA + 0.9, SENTROSOM.z, 12, 0.2, 0.9),
  };

  return { fokus, pusatInti: C };
}

/**
 * Mitokondria yang diiris memanjang: kapsul, dinding potong berlapis dua, dan
 * krista berkelok di muka potongnya. `naik` = tinggi irisan di atas pusat.
 */
export function bangunMitokondriaIris(studio: Studio, induk: THREE.Object3D, skala: number, naik: number) {
  const { bagian, tambah } = studio;
  const r = 0.95 * skala;
  const L = 1.25 * skala;
  const dunia = new THREE.Vector3();
  induk.updateWorldMatrix(true, false);
  induk.getWorldPosition(dunia);
  const potong = new THREE.Plane(new THREE.Vector3(0, -1, 0), dunia.y + naik);

  const g = new THREE.CapsuleGeometry(r, L * 2, 12, 32);
  g.rotateZ(Math.PI / 2);
  tambah(bagian("mitokondria", SEL.mitokondria.warna, { potong: [potong] }), g, induk);

  const tutup = new THREE.Group();
  tutup.position.y = naik + 0.003;
  tutup.rotation.x = -Math.PI / 2;
  induk.add(tutup);
  const rPotong = Math.sqrt(r * r - naik * naik);
  const rDalam = r * 0.8;
  const cincin = stadion(L, rPotong);
  cincin.holes.push(stadion(L, rDalam));
  /* Muka potong selalu padat (diredupkan lewat warna saja), supaya bagian
     dalam kapsul yang gelap tidak terlihat saat mitokondria diredupkan. */
  const padat = { sisi: THREE.DoubleSide, garis: false, redupWarnaSaja: true } as const;
  tambah(
    bagian("mitokondria", ronaGelap(SEL.mitokondria.warna, 0.06), padat),
    new THREE.ShapeGeometry(cincin, 24),
    tutup,
    false,
  );
  tambah(
    bagian("mitokondria", ronaTerang(SEL.mitokondria.warna, 0.5), padat),
    new THREE.ShapeGeometry(stadion(L, rDalam), 24),
    tutup,
    false,
  );
  const titik: THREE.Vector3[] = [];
  const n = Math.min(16, Math.max(5, Math.round(8 * skala)));
  for (let i = 0; i <= n; i++) {
    const t = -L - rDalam * 0.55 + (2 * L + rDalam * 1.1) * (i / n);
    titik.push(new THREE.Vector3(t, (i % 2 === 0 ? 1 : -1) * rDalam * 0.78, 0.05));
  }
  tambah(
    bagian("mitokondria", SEL.mitokondria.warna, { garis: false }),
    tabung(titik, Math.min(0.075 * skala, 0.2), 160, 6),
    tutup,
    false,
  );
  /* bidang irisannya dikembalikan, agar model yang nanti dipindah bisa ikut menggesernya */
  return potong;
}

/* ================================================================== *
 * BENTUK KHUSUS SEL
 * ================================================================== */

/** Goyangan kecil pada keliling sel — sel sungguhan tidak pernah elips sempurna. */
function goyang(t: number) {
  return 1 + 0.035 * Math.sin(3 * t + 0.6) + 0.022 * Math.sin(5 * t + 2.1) + 0.012 * Math.sin(8 * t + 0.3);
}

/** Elipsoid bergoyang. Goyangan hanya bergantung pada arah mendatar, jadi bibir potongannya bisa dihitung tepat. */
function elipsoidSel(rx: number, ry: number, rz: number) {
  const lebar = 160;
  const tinggi = 96;
  const g = new THREE.SphereGeometry(1, lebar, tinggi);
  const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const z = p.getZ(i);
    const w = goyang(Math.atan2(z, x));
    p.setXYZ(i, x * rx * w, y * ry, z * rz * w);
  }
  g.computeVertexNormals();
  rapikanJahitan(g, lebar, tinggi);
  return g;
}

/**
 * Bidang potong membran pada ketinggian y: pita di antara elipsoid luar dan
 * dalam. `dari` dan `sampai` (0 = tepi luar, 1 = tepi dalam) memilih sebagian
 * tebalnya, sehingga tepi potongan bisa digambar berlapis.
 */
function cincinBibir(y: number, dari = 0, sampai = 1) {
  const segmen = 320;
  const cL = Math.sqrt(1 - (y / RY) ** 2);
  const cD = Math.sqrt(1 - (y / (RY - TEBAL)) ** 2);
  const posisi: number[] = [];
  const normal: number[] = [];
  const indeks: number[] = [];
  for (let i = 0; i <= segmen; i++) {
    const t = (i / segmen) * Math.PI * 2;
    const ux = Math.cos(t);
    const uz = Math.sin(t);
    const w = goyang(t);
    const lx = ux * cL * RX * w;
    const lz = uz * cL * RZ * w;
    const dx = ux * cD * (RX - TEBAL) * w;
    const dz = uz * cD * (RZ - TEBAL) * w;
    posisi.push(lx + (dx - lx) * dari, y, lz + (dz - lz) * dari);
    posisi.push(lx + (dx - lx) * sampai, y, lz + (dz - lz) * sampai);
    normal.push(0, 1, 0, 0, 1, 0);
  }
  for (let i = 0; i < segmen; i++) {
    const a = i * 2;
    indeks.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(posisi, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(normal, 3));
  g.setIndex(indeks);
  return g;
}

/** Permukaan sitoplasma: bidang datar yang menutup mangkuk tepat di dinding dalamnya. */
function cakramSitoplasma(y: number) {
  const segmen = 256;
  const c = Math.sqrt(1 - (y / (RY - TEBAL)) ** 2);
  const titik: THREE.Vector2[] = [];
  for (let i = 0; i < segmen; i++) {
    const t = (i / segmen) * Math.PI * 2;
    const w = goyang(t) * 1.002;
    titik.push(new THREE.Vector2(Math.cos(t) * c * (RX - TEBAL) * w, -Math.sin(t) * c * (RZ - TEBAL) * w));
  }
  const g = new THREE.ShapeGeometry(new THREE.Shape(titik), 1);
  g.rotateX(-Math.PI / 2);
  g.translate(0, y, 0);
  return g;
}
