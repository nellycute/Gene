"use client";

import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { INTI, MOLEKUL, SEL } from "@/lib/warna";
import type { PropsAnimasi } from "../daftar";
import { Film3D, type Pembangun } from "./Film3D";
import { lihat, type Pandangan, type Studio } from "./studio";
import { bolaHalus, lantaiBayang, pembuatAcak, tabung, teksturBayang } from "./bentuk";
import { bangunDNA } from "./model-dna";
import { buatLabel } from "./label3d";
import { bangunRantaiNukleosom } from "./model-nukleosom";
import {
  bangunKromosom,
  KROMOSOM_MANUSIA,
  KROMOSOM_X,
  KROMOSOM_Y,
  type AsalKromosom,
  type Kromosom3D,
} from "./model-kromosom";

/**
 * KROMOSOM — gambar pelajaran 0.5 dan 0.6 (gaya 3D bergaris, §3).
 *
 * Set-set yang dipilih menurut `tahap` naskah:
 *   kromatin  — benang kromatin di dalam inti yang memadat menjadi kromosom
 *   pemadatan — lima tingkat berjajar: DNA → nukleosom → serat → lengkung → kromosom
 *   anatomi   — satu kromosom besar: kromatid saudara, sentromer, lengan p/q, telomer
 *   replikasi — satu batang yang disalin menjadi dua kromatid
 *   homolog   — pasangan dari ibu (ungu) dan ayah (toska) dengan pita gen sejajar
 *   ploidi    — dua set (2n) dan satu set (n)
 *   kelamin   — XX dan XY
 *   kariotipe — 23 pasang kromosom manusia dijajarkan menurut ukuran; berpita
 *               (pewarnaan G); fokus "sebar" = tersebar di kaca seperti hasil
 *               tetesan, lalu berpindah ke barisnya
 * Tambahan 25 Sep 2026:
 *   bentuk         — metasentrik, submetasentrik, akrosentrik, telosentrik
 *   jumlah         — enam spesies, tiap kartu berisi batang kromosom sebanyak 2n
 *   zw             — kromosom kelamin burung: ZZ jantan, ZW betina
 *   kariotipe-sapi — 29 pasang autosom akrosentrik + X dan Y
 */

type Set3D = {
  grup: THREE.Group;
  fokus: Record<string, Pandangan>;
  bayangan: { pusat: THREE.Vector3; jangkauan: number };
  perbarui?: (p: PropsAnimasi, dt: number) => void;
};

const TAHAP: Record<string, { set: string; fokus: string; tingkat: number }> = {
  kromatin: { set: "kromatin", fokus: "utuh", tingkat: 0 },
  pemadatan: { set: "pemadatan", fokus: "utuh", tingkat: 1 },
  anatomi: { set: "anatomi", fokus: "utuh", tingkat: 2 },
  replikasi: { set: "replikasi", fokus: "utuh", tingkat: 2 },
  homolog: { set: "homolog", fokus: "utuh", tingkat: 2 },
  ploidi: { set: "ploidi", fokus: "utuh", tingkat: 2 },
  kelamin: { set: "kelamin", fokus: "utuh", tingkat: 2 },
  kariotipe: { set: "kariotipe", fokus: "utuh", tingkat: 1 },
  bentuk: { set: "bentuk", fokus: "utuh", tingkat: 2 },
  jumlah: { set: "jumlah", fokus: "utuh", tingkat: 1 },
  zw: { set: "zw", fokus: "utuh", tingkat: 2 },
  "kariotipe-sapi": { set: "sapi", fokus: "utuh", tingkat: 1 },
};

const bangun: Pembangun = (studio, baca) => {
  const acak = pembuatAcak(31);
  const semua: Record<string, Set3D> = {
    kromatin: setKromatin(studio, acak),
    pemadatan: setPemadatan(studio),
    anatomi: setAnatomi(studio),
    replikasi: setReplikasi(studio),
    homolog: setHomolog(studio),
    ploidi: setPloidi(studio),
    kelamin: setKelamin(studio),
    kariotipe: setKariotipe(studio, acak),
    bentuk: setBentuk(studio),
    jumlah: setJumlah(studio),
    zw: setZW(studio),
    sapi: setKariotipeSapi(studio),
  };
  for (const s of Object.values(semua)) {
    s.grup.visible = false;
    studio.scene.add(s.grup);
  }

  let setAktif: string | null = null;
  let setTujuan: string | null = null;
  let tingkatAktif = 0;
  const tampilkan = (nama: string) => {
    for (const [k, s] of Object.entries(semua)) s.grup.visible = k === nama;
    studio.aturBayangan(semua[nama].bayangan.pusat, semua[nama].bayangan.jangkauan);
    setAktif = nama;
  };

  return (dt) => {
    const p = baca();
    const namaTahap = p.tahap && TAHAP[p.tahap] ? p.tahap : "kromatin";
    const info = TAHAP[namaTahap];
    const set = semua[info.set];
    const kunciFokus = p.fokus && set.fokus[p.fokus] ? p.fokus : info.fokus;
    const pandangan = set.fokus[kunciFokus];
    const kunci = `${p.kunci ?? ""}|${namaTahap}|${kunciFokus}`;

    if (setAktif === null) {
      tampilkan(info.set);
      setTujuan = info.set;
      tingkatAktif = info.tingkat;
      studio.tuju(pandangan, kunci);
    } else if (info.set !== setTujuan) {
      setTujuan = info.set;
      const arah = Math.sign(info.tingkat - tingkatAktif);
      const namaSet = info.set;
      const tingkat = info.tingkat;
      studio.ganti(() => {
        tampilkan(namaSet);
        tingkatAktif = tingkat;
        studio.tuju(pandangan, kunci);
      }, arah);
    } else if (!studio.sedangBerganti) {
      studio.tuju(pandangan, kunci);
    }

    if (setAktif) semua[setAktif].perbarui?.(p, dt);
    return { sorot: p.sorot ?? [], detik: p.detik ?? 0 };
  };
};

export default function KromosomFilm3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}

/** Nilai yang mendekati sasarannya dengan halus, sekali per bingkai. */
function dekati(sekarang: number, sasaran: number, laju: number, dt: number) {
  return sekarang + (sasaran - sekarang) * Math.min(1, dt * laju);
}

/* Label lama berukuran 2:1 — dipertahankan agar tata letak set di atas tidak bergeser. */
const label = (teks: string, ukuran = 1) => buatLabel(teks, ukuran);

/* ================================================================== *
 * KROMATIN → KROMOSOM di dalam inti
 * ================================================================== */

function setKromatin(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const R = 9;
  studio.tambah(
    studio.bagian(["membranInti", "inti"], SEL.membranInti.warna, { tembus: 0.22, garis: 0.003 }),
    bolaHalus(R, 64, 48),
    grup,
    false,
  );

  /* benang kromatin kusut */
  const benang: THREE.Mesh[] = [];
  const bahanBenang = studio.bagian(["kromatin", "inti"], SEL.kromatin.warna, { garis: false });
  for (let k = 0; k < 16; k++) {
    const titik: THREE.Vector3[] = [];
    const p = new THREE.Vector3((acak() - 0.5) * 9, (acak() - 0.5) * 9, (acak() - 0.5) * 9);
    const arah = new THREE.Vector3(acak() - 0.5, acak() - 0.5, acak() - 0.5).normalize();
    for (let i = 0; i < 12; i++) {
      titik.push(p.clone());
      arah.add(new THREE.Vector3(acak() - 0.5, acak() - 0.5, acak() - 0.5).multiplyScalar(1.1)).normalize();
      p.addScaledVector(arah, 1.3);
      if (p.length() > R * 0.78) p.multiplyScalar((R * 0.78) / p.length());
    }
    const pusat = titik.reduce((a, b) => a.add(b), new THREE.Vector3()).multiplyScalar(1 / titik.length);
    const g = tabung(titik.map((t) => t.clone().sub(pusat)), 0.16, 90, 6);
    const m = studio.tambah(bahanBenang, g, grup, false);
    m.position.copy(pusat);
    benang.push(m);
  }

  /* empat kromosom yang muncul saat memadat */
  const kromosom: THREE.Group[] = [];
  const letak: [number, number, number, AsalKromosom, number][] = [
    [-3.2, 1.8, 1, "kromatin", 0.4],
    [2.8, 2.4, -1.5, "kromosomAyah", -0.3],
    [-2.2, -2.8, -0.5, "kromosomAyah", 0.8],
    [3.3, -2.2, 1.8, "kromatin", -0.7],
  ];
  for (const [x, y, z, asal, putar] of letak) {
    const k = bangunKromosom(studio, grup, { p: 1.5, q: 2.3, jari: 0.55, asal });
    k.grup.position.set(x, y, z);
    k.grup.rotation.set(0.2, putar, putar * 0.6);
    k.grup.scale.setScalar(0.001);
    kromosom.push(k.grup);
  }
  grup.add(lantaiBayang(teksturBayang(), 24, 22, -R - 0.6));

  let padat = 0;
  return {
    grup,
    fokus: {
      utuh: lihat(0, 0, 0, 38, 0.1, 1.2, "putar"),
      padat: lihat(0, 0, 0, 30, 0.1, 1.15, "putar"),
    },
    bayangan: { pusat: new THREE.Vector3(0, 0, 0), jangkauan: 12 },
    perbarui: (p, dt) => {
      padat = dekati(padat, p.fokus === "padat" ? 1 : 0, 1.4, dt);
      for (const b of benang) b.scale.setScalar(Math.max(0.001, 1 - padat));
      for (const k of kromosom) k.scale.setScalar(Math.max(0.001, padat));
    },
  };
}

/* ================================================================== *
 * LIMA TINGKAT PEMADATAN, berjajar dari kiri ke kanan
 * (ukuran tiap tingkat tidak sebanding — tiap tingkat diperbesar agar terbaca)
 * ================================================================== */

function setPemadatan(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const X = { dna: -40, nukleosom: -24, serat: -8, lengkung: 8, kromosom: 24 };

  /* 1. DNA telanjang */
  const dna = new THREE.Group();
  dna.position.set(X.dna, 0, 0);
  dna.scale.setScalar(1.15);
  grup.add(dna);
  bangunDNA(studio, dna, "ATGCGTACCTAGGCATTA");

  /* 2. nukleosom: manik-manik pada tali */
  const nuk = new THREE.Group();
  nuk.position.set(X.nukleosom, 0, 0);
  nuk.scale.setScalar(0.3);
  nuk.rotation.z = 0.9;
  grup.add(nuk);
  bangunRantaiNukleosom(studio, nuk, 3);

  /* 3. serat 30 nm: nukleosom bertumpuk melingkar seperti per */
  const cakram: THREE.BufferGeometry[] = [];
  const lilit: THREE.BufferGeometry[] = [];
  const N = 42;
  for (let i = 0; i < N; i++) {
    const a = (i / 6) * Math.PI * 2;
    const y = -4.2 + (i / N) * 8.4;
    const pusat = new THREE.Vector3(Math.cos(a) * 1.35, y, Math.sin(a) * 1.35);
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, -a));
    const m = new THREE.Matrix4().compose(pusat, q, new THREE.Vector3(1, 1, 1));
    cakram.push(new THREE.CylinderGeometry(0.75, 0.75, 0.5, 18).applyMatrix4(m));
    lilit.push(new THREE.TorusGeometry(0.8, 0.17, 8, 20).applyMatrix4(m));
  }
  const serat = new THREE.Group();
  serat.position.set(X.serat, 0, 0);
  grup.add(serat);
  studio.tambah(studio.bagian("histon", INTI.histon.warna, { garis: 0.003 }), mergeGeometries(cakram), serat);
  studio.tambah(studio.bagian("dna", MOLEKUL.dna.warna, { garis: 0.003 }), mergeGeometries(lilit), serat);

  /* 4. lengkung: serat membentuk lengkung-lengkung pada poros protein */
  const lengkung = new THREE.Group();
  lengkung.position.set(X.lengkung, 0, 0);
  grup.add(lengkung);
  const bahanLengkung = studio.bagian("kromatin", SEL.kromatin.warna, { garis: 0.003 });
  for (let i = 0; i < 18; i++) {
    const y = -4.2 + (i / 17) * 8.4;
    const a = i * 2.4;
    const arah = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const samping = new THREE.Vector3(-Math.sin(a), 0, Math.cos(a));
    const titik: THREE.Vector3[] = [];
    for (let j = 0; j <= 12; j++) {
      const t = (j / 12) * Math.PI;
      titik.push(
        new THREE.Vector3(0, y, 0)
          .addScaledVector(arah, Math.sin(t) * 2.3)
          .addScaledVector(samping, Math.cos(t) * 0.55)
          .add(new THREE.Vector3(0, Math.sin(t * 2) * 0.25, 0)),
      );
    }
    studio.tambah(bahanLengkung, tabung(titik, 0.2, 40, 8), lengkung, false);
  }
  /* poros protein tempat lengkung-lengkung berpangkal */
  studio.tambah(
    studio.bagian(["protein", "kromatin"], MOLEKUL.protein.warna, { garis: false }),
    new THREE.CylinderGeometry(0.28, 0.28, 9, 12),
    lengkung,
    false,
  );

  /* 5. kromosom */
  const kr = new THREE.Group();
  kr.position.set(X.kromosom, 0.3, 0);
  grup.add(kr);
  bangunKromosom(studio, kr, { p: 2.4, q: 3.6, jari: 0.85, asal: "kromatin" });

  const tingkat = (x: number, jarak = 15) => lihat(x, 0, 0, jarak, 0.25, 1.25);
  return {
    grup,
    fokus: {
      utuh: lihat(-8, 0, 0, 92, 0.12, 1.3),
      dna: tingkat(X.dna, 14),
      nukleosom: tingkat(X.nukleosom, 15),
      serat: tingkat(X.serat, 15),
      lengkung: tingkat(X.lengkung, 17),
      kromosom: tingkat(X.kromosom, 19),
    },
    bayangan: { pusat: new THREE.Vector3(-8, 0, 0), jangkauan: 38 },
  };
}

/* ================================================================== *
 * ANATOMI — satu kromosom besar
 * ================================================================== */

function setAnatomi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const P = 2.6;
  const Q = 4.4;
  bangunKromosom(studio, grup, { p: P, q: Q, jari: 0.95, asal: "kromatin" });
  const lp = label("p", 1.3);
  lp.position.set(-3.1, P * 0.55, 0.6);
  const lq = label("q", 1.3);
  lq.position.set(-3.4, -Q * 0.55, 0.6);
  grup.add(lp, lq);
  grup.add(lantaiBayang(teksturBayang(), 10, 6, -Q - 1.4));
  return {
    grup,
    fokus: {
      utuh: lihat(0, -0.6, 0, 24, 0, 1.4),
      putar: lihat(0, -0.6, 0, 22, 0, 1.4, "putar"),
      sentromer: lihat(0, 0, 0, 9, 0.1, 1.35),
      telomer: lihat(-1, P, 0, 8, 0.15, 1.2),
    },
    bayangan: { pusat: new THREE.Vector3(0, -1, 0), jangkauan: 8 },
  };
}

/* ================================================================== *
 * REPLIKASI — satu batang menjadi dua kromatid
 * ================================================================== */

function setReplikasi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const k = bangunKromosom(studio, grup, { p: 2.4, q: 4, jari: 0.9, asal: "kromatin" });
  grup.add(lantaiBayang(teksturBayang(), 10, 6, -5.4));
  const geser = 0.9 * 0.8;
  let dua = 1;
  const atur = (t: number) => {
    k.kromatid[0].grup.position.x = -geser * t;
    k.kromatid[1].grup.position.x = geser * t;
    k.buka(t);
  };
  atur(1);
  return {
    grup,
    fokus: {
      utuh: lihat(0, -0.8, 0, 22, 0, 1.4),
      satu: lihat(0, -0.8, 0, 20, 0.35, 1.35),
      salin: lihat(0, -0.8, 0, 20, 0.1, 1.35),
      dua: lihat(0, -0.8, 0, 22, 0, 1.4),
    },
    bayangan: { pusat: new THREE.Vector3(0, -1, 0), jangkauan: 8 },
    perbarui: (p, dt) => {
      dua = dekati(dua, p.fokus === "satu" ? 0 : 1, p.fokus === "salin" ? 0.9 : 2, dt);
      atur(dua);
    },
  };
}

/* ================================================================== *
 * HOMOLOG — sepasang dari ibu dan ayah, gen di posisi yang sama
 * ================================================================== */

function setHomolog(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const pita = [0.14, 0.3, 0.55, 0.7, 0.86];
  for (const [x, asal] of [
    [-2.4, "kromatin"],
    [2.4, "kromosomAyah"],
  ] as const) {
    const g = new THREE.Group();
    g.position.x = x;
    grup.add(g);
    bangunKromosom(studio, g, { p: 2.3, q: 3.9, jari: 0.8, asal, pita });
  }
  grup.add(lantaiBayang(teksturBayang(), 14, 7, -5.2));
  return {
    grup,
    fokus: {
      utuh: lihat(0, -0.8, 0, 26, 0, 1.4),
      ibu: lihat(-2.4, -0.8, 0, 17, -0.2, 1.4),
      ayah: lihat(2.4, -0.8, 0, 17, 0.2, 1.4),
      pita: lihat(0, -0.8, 0, 19, 0, 1.45),
    },
    bayangan: { pusat: new THREE.Vector3(0, -1, 0), jangkauan: 9 },
  };
}

/* ================================================================== *
 * PLOIDI — dua set (diploid) dan satu set (haploid)
 * ================================================================== */

function setPloidi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const ukuran: [number, number][] = [
    [1.9, 3.3],
    [1.4, 2.4],
    [0.9, 1.6],
  ];
  const cincin = studio.bagian("membranSel", SEL.membranSel.warna, { garis: 0.003 });

  /* diploid: tiap ukuran hadir berpasangan (ibu + ayah) */
  const kiri = new THREE.Group();
  kiri.position.x = -8;
  grup.add(kiri);
  ukuran.forEach(([p, q], i) => {
    (["kromatin", "kromosomAyah"] as const).forEach((asal, j) => {
      const g = new THREE.Group();
      g.position.set(-3.4 + i * 3.4 + (j - 0.5) * 1.3, 0, 0);
      kiri.add(g);
      bangunKromosom(studio, g, { p, q, jari: 0.5, asal });
    });
  });
  studio.tambah(cincin, new THREE.TorusGeometry(7, 0.16, 10, 96).rotateX(Math.PI / 2).translate(0, -4, 0), kiri, false);
  const l2n = label("2n", 1.6);
  l2n.position.set(0, 5.3, 0);
  kiri.add(l2n);

  /* haploid: satu dari tiap ukuran — campuran ibu dan ayah */
  const kanan = new THREE.Group();
  kanan.position.x = 9.5;
  grup.add(kanan);
  const campur: AsalKromosom[] = ["kromatin", "kromosomAyah", "kromatin"];
  ukuran.forEach(([p, q], i) => {
    const g = new THREE.Group();
    g.position.set(-2.4 + i * 2.4, 0, 0);
    kanan.add(g);
    bangunKromosom(studio, g, { p, q, jari: 0.5, asal: campur[i] });
  });
  studio.tambah(cincin, new THREE.TorusGeometry(4.6, 0.16, 10, 80).rotateX(Math.PI / 2).translate(0, -4, 0), kanan, false);
  const ln = label("n", 1.6);
  ln.position.set(0, 5.3, 0);
  kanan.add(ln);

  return {
    grup,
    fokus: {
      utuh: lihat(0, 0, 0, 44, 0, 1.3),
      diploid: lihat(-8, 0, 0, 27, -0.15, 1.3),
      haploid: lihat(9.5, 0, 0, 22, 0.15, 1.3),
    },
    bayangan: { pusat: new THREE.Vector3(0, -2, 0), jangkauan: 18 },
  };
}

/* ================================================================== *
 * KROMOSOM KELAMIN — XX dan XY
 * ================================================================== */

function setKelamin(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const L = 7;
  const pasang = (x: number, keduaY: boolean) => {
    const g = new THREE.Group();
    g.position.x = x;
    grup.add(g);
    const a = new THREE.Group();
    a.position.x = -1.5;
    g.add(a);
    bangunKromosom(studio, a, { p: L * KROMOSOM_X.panjang * KROMOSOM_X.p, q: L * KROMOSOM_X.panjang * (1 - KROMOSOM_X.p), jari: 0.6, asal: "kromatin" });
    const b = new THREE.Group();
    b.position.x = 1.5;
    g.add(b);
    const k = keduaY ? KROMOSOM_Y : KROMOSOM_X;
    bangunKromosom(studio, b, { p: L * k.panjang * k.p, q: L * k.panjang * (1 - k.p), jari: 0.6, asal: "kromosomAyah" });
    const teks = label(keduaY ? "XY" : "XX", 1.5);
    teks.position.set(0, 4.2, 0);
    g.add(teks);
  };
  pasang(-5.5, false);
  pasang(5.5, true);
  grup.add(lantaiBayang(teksturBayang(), 24, 8, -3.8));
  return {
    grup,
    fokus: {
      utuh: lihat(0, 0.4, 0, 32, 0, 1.4),
      xx: lihat(-5.5, 0.4, 0, 17, -0.15, 1.4),
      xy: lihat(5.5, 0.4, 0, 17, 0.15, 1.4),
      y: lihat(7, 0, 0, 9, 0.2, 1.35),
    },
    bayangan: { pusat: new THREE.Vector3(0, 0, 0), jangkauan: 13 },
  };
}

/* ================================================================== *
 * KARIOTIPE — 23 pasang dijajarkan menurut ukuran (laki-laki: XY)
 * ================================================================== */

/** Pita G yang sama untuk kedua homolog bernomor sama — letaknya ditetapkan dari nomornya. */
function pitaUntuk(nomor: number) {
  const acak = pembuatAcak(100 + nomor);
  const jumlah = 3 + Math.floor(acak() * 4);
  return Array.from({ length: jumlah }, (_, i) => (i + 0.3 + acak() * 0.4) / jumlah);
}

function setKariotipe(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const L = 5.4;
  const baris: string[][] = [
    ["1", "2", "3", "4", "5"],
    ["6", "7", "8", "9", "10", "11", "12"],
    ["13", "14", "15", "16", "17", "18"],
    ["19", "20", "21", "22", "XY"],
  ];
  const yBaris = [9.5, 3.2, -2.4, -7.4];
  const lebarKolom = 3.6;
  let letakXY = new THREE.Vector3();
  /* tiap kromosom punya dua tempat: tersebar di kaca (hasil tetesan) dan di barisnya */
  const bergerak: { g: THREE.Group; susun: THREE.Vector3; sebar: THREE.Vector3; putar: number }[] = [];
  const nomorLabel: THREE.Sprite[] = [];
  baris.forEach((isi, b) => {
    isi.forEach((nama, k) => {
      const x = (k - (isi.length - 1) / 2) * lebarKolom;
      const y = yBaris[b];
      const data =
        nama === "XY"
          ? [KROMOSOM_X, KROMOSOM_Y]
          : [KROMOSOM_MANUSIA[Number(nama) - 1], KROMOSOM_MANUSIA[Number(nama) - 1]];
      data.forEach((d, j) => {
        const g = new THREE.Group();
        g.position.set(x + (j - 0.5) * 1.35, y, 0);
        grup.add(g);
        const k3: Kromosom3D = bangunKromosom(studio, g, {
          p: L * d.panjang * d.p,
          q: L * d.panjang * (1 - d.p),
          jari: 0.28 + 0.12 * d.panjang,
          asal: j === 0 ? "kromatin" : "kromosomAyah",
          pita: pitaUntuk(nama === "XY" ? 23 + j : Number(nama)),
        });
        k3.buka(0.55);
        const sudut = acak() * Math.PI * 2;
        const jari = Math.sqrt(acak()) * 11;
        bergerak.push({
          g,
          susun: g.position.clone(),
          sebar: new THREE.Vector3(Math.cos(sudut) * jari * 1.25, 1 + Math.sin(sudut) * jari, 0.3),
          putar: (acak() - 0.5) * Math.PI * 1.6,
        });
      });
      const nomor = label(nama === "XY" ? "X Y" : nama, 1.25);
      /* tepat di celah antara ujung bawah baris ini dan ujung atas baris berikutnya */
      nomor.position.set(x, y - (b === 0 ? 4.1 : b === 1 ? 3.9 : 3.1), 0);
      grup.add(nomor);
      nomorLabel.push(nomor);
      if (nama === "XY") letakXY = new THREE.Vector3(x, y, 0);
    });
  });

  /* kaca preparat di belakang kromosom yang tersebar */
  const kaca = new THREE.BoxGeometry(34, 26, 0.3);
  kaca.translate(0, 1, -0.9);
  const mKaca = studio.tambah(studio.bagian("kaca", "#dfe9ee", { tembus: 0.55, garis: 0.003 }), kaca, grup, false);

  let s = 0; // 0 = tersusun, 1 = tersebar
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1, 0, 62, 0, 1.5),
      sebar: lihat(0, 1, 0, 50, 0, 1.5),
      xy: lihat(letakXY.x, letakXY.y, 0, 14, 0.1, 1.45),
    },
    bayangan: { pusat: new THREE.Vector3(0, 1, 0), jangkauan: 18 },
    perbarui: (p, dt) => {
      s = dekati(s, p.fokus === "sebar" ? 1 : 0, 1.6, dt);
      for (const b of bergerak) {
        b.g.position.lerpVectors(b.susun, b.sebar, s);
        b.g.rotation.z = b.putar * s;
      }
      mKaca.visible = s > 0.02;
      for (const l of nomorLabel) l.visible = s < 0.3;
    },
  };
}

/* ================================================================== *
 * EMPAT BENTUK KROMOSOM — menurut letak sentromer
 * ================================================================== */

function setBentuk(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const BENTUK = [
    { kunci: "meta", nama: "metasentrik", p: 1.55, q: 1.55 },
    { kunci: "submeta", nama: "submetasentrik", p: 1.0, q: 2.1 },
    { kunci: "akro", nama: "akrosentrik", p: 0.4, q: 2.7 },
    { kunci: "telo", nama: "telosentrik", p: 0.06, q: 3.05 },
  ];
  const fokus: Record<string, Pandangan> = { utuh: lihat(0, 0, 0, 34, 0, 1.4) };
  BENTUK.forEach((b, i) => {
    const x = (i - 1.5) * 6.4;
    const g = new THREE.Group();
    /* dirata-tengahkan menurut panjang total, jadi letak sentromernya yang tampak bergeser */
    g.position.set(x, (b.q - b.p) / 2, 0);
    grup.add(g);
    bangunKromosom(studio, g, { p: b.p, q: b.q, jari: 0.55, asal: "kromatin" });
    const l = label(b.nama, 0.8);
    l.position.set(x, -3.9, 0.4);
    grup.add(l);
    /* sedikit ke bawah dan mundur agar nama bentuknya ikut terbingkai */
    fokus[b.kunci] = lihat(x, -1, 0, 14, 0.08 * (i - 1.5), 1.38);
  });
  grup.add(lantaiBayang(teksturBayang(), 30, 8, -3.6));
  return { grup, fokus, bayangan: { pusat: new THREE.Vector3(0, 0, 0), jangkauan: 14 } };
}

/* ================================================================== *
 * JUMLAH KROMOSOM TIAP SPESIES — kartu berisi batang sebanyak 2n
 * Tiap pasang: satu ungu (dari induk betina) dan satu toska (dari induk jantan).
 * ================================================================== */

function setJumlah(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const SPESIES = [
    { kunci: "lalat", nama: "Lalat buah", n2: 8 },
    { kunci: "padi", nama: "Padi", n2: 24 },
    { kunci: "kucing", nama: "Kucing", n2: 38 },
    { kunci: "manusia", nama: "Manusia", n2: 46 },
    { kunci: "simpanse", nama: "Simpanse", n2: 48 },
    { kunci: "anjing", nama: "Anjing", n2: 78 },
  ];
  const bIbu = studio.bagian(["kromatin", "kromosom"], SEL.kromatin.warna, { garis: false });
  const bAyah = studio.bagian(["kromosomAyah", "kromosom"], INTI.kromosomAyah.warna, { garis: false });
  const bKartu = studio.bagian("kartu", "#ece6da", { garis: 0.004 });
  const batang = new THREE.CapsuleGeometry(0.1, 0.62, 4, 10);
  const fokus: Record<string, Pandangan> = { utuh: lihat(0, 0, 0.6, 46, 0, 0.82) };
  const LEBAR = 9.4;
  const DALAM = 7.2;

  SPESIES.forEach((s, i) => {
    const cx = ((i % 3) - 1) * 11.2;
    const cz = (Math.floor(i / 3) - 0.5) * 9.4;
    const kartu = new THREE.BoxGeometry(LEBAR, 0.28, DALAM);
    kartu.translate(cx, -0.14, cz);
    studio.tambah(bKartu, kartu, grup);

    const pasang = s.n2 / 2;
    const kolom = Math.ceil(Math.sqrt(pasang * 1.7));
    const barisN = Math.ceil(pasang / kolom);
    const jarakX = Math.min(1.05, (LEBAR - 1.2) / kolom);
    const jarakZ = Math.min(1.3, (DALAM - 2.2) / Math.max(1, barisN));
    const ibu: THREE.Matrix4[] = [];
    const ayah: THREE.Matrix4[] = [];
    for (let j = 0; j < pasang; j++) {
      const c = j % kolom;
      const r = Math.floor(j / kolom);
      const x = cx + (c - (kolom - 1) / 2) * jarakX;
      const z = cz - 0.5 + (r - (barisN - 1) / 2) * jarakZ;
      /* makin ke belakang makin kecil, seperti kariotipe */
      const panjang = 1.25 - 0.7 * (j / Math.max(1, pasang - 1));
      const skala = new THREE.Vector3(1, panjang, 1);
      const q = new THREE.Quaternion();
      ibu.push(new THREE.Matrix4().compose(new THREE.Vector3(x - 0.15, 0.45 * panjang, z), q, skala));
      ayah.push(new THREE.Matrix4().compose(new THREE.Vector3(x + 0.15, 0.45 * panjang, z), q, skala));
    }
    studio.tambahBanyak(bIbu, batang, ibu, grup);
    studio.tambahBanyak(bAyah, batang, ayah, grup);
    const l = label(`${s.nama} · 2n = ${s.n2}`, 0.8);
    l.position.set(cx, 0.35, cz + DALAM / 2 - 0.55);
    grup.add(l);
    fokus[s.kunci] = lihat(cx, 0.2, cz, 13, 0, 0.78);
  });
  grup.add(lantaiBayang(teksturBayang(), 44, 26, -0.3));
  return { grup, fokus, bayangan: { pusat: new THREE.Vector3(0, 0, 0), jangkauan: 20 } };
}

/* ================================================================== *
 * ZW — kromosom kelamin burung: jantan ZZ, betina ZW
 * ================================================================== */

function setZW(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Z = { p: 1.3, q: 2.3 };
  const W = { p: 0.45, q: 0.85 };
  const pasang = (x: number, betina: boolean) => {
    const g = new THREE.Group();
    g.position.x = x;
    grup.add(g);
    /* kiri dari induk betina (ungu), kanan dari induk jantan (toska):
       betina menerima W dari induknya yang betina dan Z dari yang jantan */
    const kiri = new THREE.Group();
    kiri.position.x = -1.5;
    g.add(kiri);
    const k = betina ? W : Z;
    bangunKromosom(studio, kiri, { p: k.p, q: k.q, jari: 0.6, asal: "kromatin" });
    const kanan = new THREE.Group();
    kanan.position.x = 1.5;
    g.add(kanan);
    bangunKromosom(studio, kanan, { p: Z.p, q: Z.q, jari: 0.6, asal: "kromosomAyah" });
    const teks = label(betina ? "ZW" : "ZZ", 1.5);
    teks.position.set(0, 3.6, 0);
    g.add(teks);
    const siapa = label(betina ? "betina" : "jantan", 0.8);
    siapa.position.set(0, -3.4, 0.4);
    g.add(siapa);
  };
  pasang(-5.5, false);
  pasang(5.5, true);
  grup.add(lantaiBayang(teksturBayang(), 24, 8, -3.2));
  return {
    grup,
    fokus: {
      utuh: lihat(0, 0.2, 0, 30, 0, 1.4),
      zz: lihat(-5.5, 0.2, 0, 16, -0.15, 1.4),
      zw: lihat(5.5, 0.2, 0, 16, 0.15, 1.4),
    },
    bayangan: { pusat: new THREE.Vector3(0, 0, 0), jangkauan: 13 },
  };
}

/* ================================================================== *
 * KARIOTIPE SAPI — 2n = 60: 29 pasang autosom akrosentrik, X submetasentrik
 * yang besar, dan Y kecil (submetasentrik pada Bos taurus).
 * ================================================================== */

function setKariotipeSapi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const L = 4.6;
  const barisIsi = [8, 8, 7, 7];
  /* baris terakhir sedikit lebih jauh: X sapi yang panjang tidak boleh menyentuh nomor di atasnya */
  const yBaris = [8.6, 2.8, -2.6, -8.3];
  const lebarKolom = 3.3;
  let nomor = 1;
  let letakXY = new THREE.Vector3();
  barisIsi.forEach((n, b) => {
    for (let k = 0; k < n; k++) {
      const x = (k - (n - 1) / 2) * lebarKolom;
      const y = yBaris[b];
      const akhir = nomor > 29;
      const panjangAuto = 1.0 - 0.62 * ((nomor - 1) / 28);
      const data = akhir
        ? [
            { panjang: 0.82, p: 0.36 },
            { panjang: 0.3, p: 0.34 },
          ]
        : [
            { panjang: panjangAuto, p: 0.04 },
            { panjang: panjangAuto, p: 0.04 },
          ];
      data.forEach((d, j) => {
        const g = new THREE.Group();
        g.position.set(x + (j - 0.5) * 1.2, y + L * d.panjang * (0.5 - d.p), 0);
        grup.add(g);
        const k3 = bangunKromosom(studio, g, {
          p: L * d.panjang * d.p,
          q: L * d.panjang * (1 - d.p),
          jari: 0.24 + 0.1 * d.panjang,
          asal: j === 0 ? "kromatin" : "kromosomAyah",
          pita: pitaUntuk(200 + (akhir ? 30 + j : nomor)),
        });
        k3.buka(0.5);
      });
      const teks = label(akhir ? "X Y" : String(nomor), 1.05);
      teks.position.set(x, y - 2.9, 0);
      grup.add(teks);
      if (akhir) letakXY = new THREE.Vector3(x, y, 0);
      nomor++;
    }
  });
  return {
    grup,
    fokus: {
      utuh: lihat(0, 0.6, 0, 60, 0, 1.5),
      xy: lihat(letakXY.x, letakXY.y, 0, 13, 0.1, 1.45),
    },
    bayangan: { pusat: new THREE.Vector3(0, 0.6, 0), jangkauan: 18 },
  };
}
