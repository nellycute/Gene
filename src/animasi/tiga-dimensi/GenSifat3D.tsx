"use client";

import * as THREE from "three";
import { MOLEKUL, SEL } from "@/lib/warna";
import type { PropsAnimasi } from "../daftar";
import { Film3D } from "./Film3D";
import { lihat, type Studio } from "./studio";
import { bolaHalus, lantaiBayang, pembuatAcak, tabung, teksturBayang } from "./bentuk";
import { bangunDNA } from "./model-dna";
import { bangunSelMini } from "./model-sel-mini";
import { bangunCawan, bentukEnzim } from "./model-mikroba";
import { bahanNukleotida, bangunRantaiProtein, bangunUntai, lipatanAcak } from "./model-rna";
import { alas, aturLabel, batangTinta, label, labelHidup, panah, pelan, rangkaiSet, v, type Set3D } from "./rangkai-set";

/**
 * DARI GEN KE SIFAT — film pelajaran 1.7 (gaya 3D bergaris, §3).
 *
 *  - alur: gen → mRNA → protein → sifat (kucing kecil sebagai contoh sifat);
 *  - jalur: jamur Neurospora di cawan, jalur arginin dengan tiga enzim; pada
 *    mutan, enzim kedua rusak dan zat menumpuk; hemoglobin 2α + 2β;
 *  - albino: sel pigmen normal membuat butir melanin, sel albino tidak;
 *  - sabit: kodon GAG → GUG, glutamat → valin; sel darah merah cakram dan sabit;
 *  - kucing: kucing Siam — ujung tubuh yang dingin berwarna gelap;
 *  - sapi: P = G + L — dua sapi sama, pakan berbeda, susu berbeda;
 *  - genom: DNA kusut di dalam inti, gen hanya sebagian kecilnya;
 *  - satuan: batang skala logaritmik bp → kb → Mb → Gb.
 *
 * Benda yang bukan entitas warna.ts (jamur, zat antara, melanin, sel darah
 * merah, kucing, sapi, pakan, susu) memakai warna netral dan label.
 */

const NETRAL = "#d9d2c5";
const NETRAL_GELAP = "#c4b8a6";
const MELANIN = "#5a4636";
const KRIM = "#efe2cc";
const TITIK_GELAP = "#5e4636";
const HITAM_SAPI = "#3b3430";
const PUTIH = "#f7f4ee";
const MERAH_MUDA_NETRAL = "#dcb7aa";
const PAKAN = "#9bb06e";
const JAMUR = "#e2c9a6";
const MATA = "#2a2522";

const TAHAP_SET: Record<string, string> = {
  alur: "alur",
  jalur: "jalur",
  albino: "albino",
  sabit: "sabit",
  kucing: "kucing",
  sapi: "sapi",
  genom: "genom",
  satuan: "satuan",
};

const bangun = rangkaiSet(
  (studio) => {
    const acak = pembuatAcak(71);
    return {
      alur: setAlur(studio, acak),
      jalur: setJalur(studio, acak),
      albino: setAlbino(studio, acak),
      sabit: setSabit(studio),
      kucing: setKucing(studio),
      sapi: setSapi(studio),
      genom: setGenom(studio, acak),
      satuan: setSatuan(studio),
    };
  },
  TAHAP_SET,
  "alur",
);

export default function GenSifat3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}

/* ================================================================== *
 * Kucing Siam — dipakai di dua set
 * ================================================================== */

function bangunKucing(studio: Studio, induk: THREE.Object3D) {
  const { bagian, tambah } = studio;
  const g = new THREE.Group();
  induk.add(g);
  const krim = bagian(["kucing", "tubuhHangat"], KRIM, { garis: 0.004 });
  const gelap = bagian(["kucing", "ujungDingin"], TITIK_GELAP, { garis: 0.004 });
  const mata = bagian("kucing", "#6e9ec9", { garis: false });
  const badan = bolaHalus(1, 32, 22);
  badan.scale(1.55, 0.85, 0.85);
  badan.translate(0, 1.55, 0);
  tambah(krim, badan, g);
  for (const [x, z] of [
    [-0.95, -0.4],
    [-0.95, 0.4],
    [0.95, -0.4],
    [0.95, 0.4],
  ]) {
    const kaki = new THREE.CapsuleGeometry(0.2, 0.9, 6, 12);
    kaki.translate(x, 0.65, z);
    tambah(krim, kaki, g);
    const telapak = bolaHalus(0.24, 12, 8);
    telapak.scale(1, 0.8, 1.2);
    telapak.translate(x, 0.15, z + 0.05);
    tambah(gelap, telapak, g);
    const betis = new THREE.CapsuleGeometry(0.21, 0.35, 6, 12);
    betis.translate(x, 0.35, z);
    tambah(gelap, betis, g);
  }
  const kepala = bolaHalus(0.72, 28, 20);
  kepala.translate(1.75, 2.35, 0);
  tambah(krim, kepala, g);
  const topeng = bolaHalus(0.5, 24, 16);
  topeng.scale(0.75, 0.85, 1);
  topeng.translate(2.18, 2.22, 0);
  tambah(gelap, topeng, g);
  for (const z of [-0.36, 0.36]) {
    const telinga = new THREE.ConeGeometry(0.28, 0.6, 12);
    telinga.translate(1.65, 3.05, z);
    tambah(gelap, telinga, g);
    const m = bolaHalus(0.08, 10, 8);
    m.translate(2.52, 2.42, z * 0.6);
    tambah(mata, m, g, false);
  }
  tambah(gelap, tabung([v(-1.45, 1.7, 0), v(-2.1, 2.2, 0.2), v(-2.4, 3.1, 0), v(-2.2, 3.6, -0.2)], 0.14, 30, 10), g);
  return g;
}

/* ================================================================== *
 * ALUR — gen → mRNA → protein → sifat
 * ================================================================== */

function setAlur(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const X = [-10.5, -3.5, 3.5, 10.5];
  X.forEach((x) => alas(studio, grup, x));
  const dna = new THREE.Group();
  dna.position.set(X[0], 3.2, 0);
  grup.add(dna);
  bangunDNA(studio, dna, "ATGGCTTCCGAGAC");
  const mrna = bangunUntai(studio, grup, "AUGGCUUCCG", bahanNukleotida(studio, { rna: true }));
  bangunRantaiProtein(studio, grup, lipatanAcak(v(X[2], 2.7, 0), 1.2, 18, 0.6, acak));
  const kucing = new THREE.Group();
  kucing.position.set(X[3] - 0.2, 0.55, 0);
  kucing.scale.setScalar(0.85);
  grup.add(kucing);
  bangunKucing(studio, kucing);
  for (let i = 0; i < 3; i++) panah(studio, grup, [v(X[i] + 1.9, 3.2, 0), v((X[i] + X[i + 1]) / 2, 3.7, 0), v(X[i + 1] - 1.9, 3.2, 0)]);
  label(grup, "gen (DNA)", 0.55, X[0], 6.2);
  label(grup, "mRNA", 0.55, X[1], 6.2);
  label(grup, "protein", 0.55, X[2], 6.2);
  label(grup, "sifat", 0.55, X[3], 6.2);
  grup.add(lantaiBayang(teksturBayang(), 32, 7, 0.01));
  return {
    grup,
    fokus: {
      utuh: lihat(0, 3.2, 0, 31, 0, 1.36),
      awal: lihat(-3.5, 3.2, 0, 21, 0, 1.36),
      sifat: lihat(7, 3, 0, 17, 0.1, 1.34),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 16 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      dna.rotation.y = t * 0.45;
      mrna.perbarui((i) => ({ p: v(X[1] - 0.2 + 0.15 * Math.sin(t * 1.2 + i * 0.6), 5.4 - i * 0.6, 0), ke5: v(0, 1, 0), keBasa: v(1, 0, 0) }));
      kucing.rotation.y = 0.4 + 0.25 * Math.sin(t * 0.5);
    },
  };
}

/* ================================================================== *
 * JALUR — Beadle dan Tatum, jalur arginin, hemoglobin
 * ================================================================== */

function setJalur(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const { bagian, tambah } = studio;

  /* dua cawan: mutan pada medium minimal (tak tumbuh) dan + arginin (tumbuh) */
  const bJamur = bagian(["jamur"], JAMUR, { garis: false });
  const cawan = (x: number, tumbuh: boolean, teks: string) => {
    const c = new THREE.Group();
    c.position.set(x, 0.02, 0);
    grup.add(c);
    bangunCawan(studio, c, 1.6);
    const n = tumbuh ? 26 : 3;
    for (let i = 0; i < n; i++) {
      const a = acak() * Math.PI * 2;
      const titik: THREE.Vector3[] = [v(0, 0.2, 0)];
      for (let k = 1; k <= 4; k++) titik.push(v(Math.cos(a + (acak() - 0.5) * 0.6) * 0.3 * k * (tumbuh ? 1 : 0.3), 0.2 + 0.04 * k, Math.sin(a + (acak() - 0.5) * 0.6) * 0.3 * k * (tumbuh ? 1 : 0.3)));
      tambah(bJamur, tabung(titik, 0.035, 16, 5), c, false);
    }
    label(grup, teks, 0.42, x, 1.7);
  };
  cawan(-8.2, false, "mutan · medium minimal");
  cawan(-4.2, true, "mutan · + arginin");
  label(grup, "sinar-X → mutasi", 0.45, -6.2, 3.4);

  /* jalur arginin */
  const Y = 2.2;
  const STASIUN = [1.2, 4.6, 8.0, 11.4];
  const NAMA = ["prekursor", "ornitin", "sitrulin", "arginin"];
  const bZat = bagian(["zat"], NETRAL_GELAP, { garis: 0.004 });
  const bArg = bagian(["zat", "asamAmino"], MOLEKUL.asamAmino.warna, { garis: 0.004 });
  const bentukZat = [
    () => bolaHalus(0.3, 14, 10),
    () => new THREE.BoxGeometry(0.46, 0.46, 0.46),
    () => new THREE.CylinderGeometry(0.26, 0.26, 0.5, 14),
    () => bolaHalus(0.32, 14, 10),
  ];
  STASIUN.forEach((x, i) => label(grup, NAMA[i], 0.45, x, Y + 1.3));
  const bEnzim = bagian(["enzim"], MOLEKUL.enzim.warna, { garis: 0.004, sisi: THREE.DoubleSide });
  const bRusak = bagian(["enzim", "enzimRusak"], MOLEKUL.enzim.warna, { garis: 0.004, sisi: THREE.DoubleSide });
  const enzim = [0, 1, 2].map((i) => {
    const m = tambah(bEnzim, bentukEnzim(0.5), grup);
    m.position.set((STASIUN[i] + STASIUN[i + 1]) / 2, Y - 0.1, 0);
    return m;
  });
  /* enzim kedua versi rusak: dua belahan yang renggang */
  const rusak = new THREE.Group();
  rusak.position.copy(enzim[1].position);
  grup.add(rusak);
  for (const s of [-1, 1]) {
    const h = new THREE.SphereGeometry(0.5, 20, 14, 0, Math.PI);
    h.rotateY(s > 0 ? 0 : Math.PI);
    const m = tambah(bRusak, h, rusak);
    /* dua belahan yang terbuka lebar: enzim tak berfungsi */
    m.position.set(s * 0.34, s * 0.12, 0);
    m.rotation.z = s * 0.7;
  }
  label(grup, "enzim 1", 0.36, enzim[0].position.x, Y - 1.0);
  label(grup, "enzim 2", 0.36, enzim[1].position.x, Y - 1.0);
  label(grup, "enzim 3", 0.36, enzim[2].position.x, Y - 1.0);
  batangTinta(studio, grup, v(STASIUN[0] - 0.6, Y - 0.55, 0), v(STASIUN[3] + 0.6, Y - 0.55, 0), 0.03);
  /* token zat yang berjalan di sabuk */
  const TOKEN = 10;
  const token = Array.from({ length: TOKEN }, () => ({
    wujud: [0, 1, 2, 3].map((k) => {
      const m = tambah(k === 3 ? bArg : bZat, bentukZat[k](), grup);
      m.visible = false;
      return m;
    }),
  }));
  const lMutan = labelHidup(grup, "enzim 2 rusak → ornitin menumpuk", 0.45);

  /* hemoglobin: 2 rantai α + 2 rantai β */
  const hb = new THREE.Group();
  hb.position.set(6.3, 6.2, 0);
  grup.add(hb);
  const bAlfa = bagian(["protein", "rantaiAlfa"], MOLEKUL.protein.warna, { garis: 0.004 });
  const bBeta = bagian(["protein", "rantaiBeta"], MOLEKUL.protein.warna, { garis: 0.004 });
  [
    [-0.7, 0.6, 0.4, bAlfa],
    [0.7, -0.6, 0.4, bAlfa],
    [0.7, 0.6, -0.4, bBeta],
    [-0.7, -0.6, -0.4, bBeta],
  ].forEach(([x, y, z, b]) => {
    const g = bolaHalus(0.75, 20, 14);
    g.scale(1, 0.9, 0.85);
    g.translate(x as number, y as number, z as number);
    tambah(b as ReturnType<typeof bagian>, g, hb);
  });
  const lHb = labelHidup(grup, "hemoglobin · α α β β", 0.45);
  let nilaiHb = 0;
  let nilaiMutan = 0;

  return {
    grup,
    fokus: {
      utuh: lihat(1.5, 2.5, 0, 26, 0, 1.3),
      jamur: lihat(-6.2, 1.5, 0, 12, 0, 1.2),
      cawan: lihat(-6.2, 0.6, 0, 9.5, 0, 1.05),
      jalur: lihat(6.3, 2.4, 0, 16, 0, 1.3),
      mutan: lihat(6.3, 2.4, 0, 16, 0, 1.3),
      hemoglobin: lihat(6.3, 4.8, 0, 13, 0.1, 1.3),
    },
    bayangan: { pusat: v(1, 0, 0), jangkauan: 13 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      const mutan = p.fokus === "mutan";
      nilaiMutan = pelan(nilaiMutan, mutan ? 1 : 0, 3, dt);
      nilaiHb = pelan(nilaiHb, p.fokus === "hemoglobin" ? 1 : 0, 2.5, dt);
      enzim[1].visible = nilaiMutan < 0.5;
      rusak.visible = nilaiMutan >= 0.5;
      enzim.forEach((e, i) => (e.rotation.y = t * 1.2 + i));
      /* token berjalan dari kiri ke kanan; wujudnya berubah tiap melewati enzim */
      token.forEach((tk, i) => {
        let s = ((t * 0.9 + (i / TOKEN) * (STASIUN[3] - STASIUN[0] + 1.2)) % (STASIUN[3] - STASIUN[0] + 1.2)) + STASIUN[0] - 0.6;
        let tumpuk = 0;
        if (nilaiMutan >= 0.5 && s > enzim[1].position.x - 0.7) {
          s = enzim[1].position.x - 0.7;
          tumpuk = i;
        }
        const tahap = s < enzim[0].position.x ? 0 : s < enzim[1].position.x ? 1 : s < enzim[2].position.x ? 2 : 3;
        tk.wujud.forEach((m, k) => {
          m.visible = k === tahap;
          if (k === tahap) {
            m.position.set(s - (tumpuk ? (tumpuk % 4) * 0.45 : 0), Y + 0.1 + (tumpuk ? Math.floor(tumpuk / 4) * 0.5 : 0), 0.1);
            m.rotation.y = t + i;
          }
        });
      });
      aturLabel(lMutan, mutan, dt, v(enzim[1].position.x, Y + 2.3, 0.2));
      hb.visible = nilaiHb > 0.02;
      hb.scale.setScalar(Math.max(0.001, nilaiHb));
      hb.rotation.y = t * 0.5;
      aturLabel(lHb, p.fokus === "hemoglobin", dt, v(6.3, 8.0, 0.2));
    },
  };
}

/* ================================================================== *
 * ALBINO — tirosin → melanin
 * ================================================================== */

function setAlbino(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const { bagian, tambah } = studio;
  const X = [-4.2, 4.2];
  const sel = X.map((x) => {
    const g = new THREE.Group();
    g.position.set(x, 1.6, 0);
    grup.add(g);
    bangunSelMini(studio, g, 2.4);
    return g;
  });
  const bMelanin = bagian(["melanin"], MELANIN, { garis: 0.003 });
  const bTirosin = bagian(["asamAmino", "tirosin"], MOLEKUL.asamAmino.warna, { garis: 0.003 });
  const bEnzim = bagian(["enzim"], MOLEKUL.enzim.warna, { garis: 0.004, sisi: THREE.DoubleSide });
  const bRusak = bagian(["enzim", "enzimRusak"], MOLEKUL.enzim.warna, { garis: 0.004, sisi: THREE.DoubleSide });

  /* sel normal: butir melanin memenuhi sitoplasma */
  const butir: THREE.Mesh[] = [];
  for (let i = 0; i < 26; i++) {
    const a = acak() * Math.PI * 2;
    const r = 1.1 + acak() * 0.9;
    const m = tambah(bMelanin, bolaHalus(0.13 + acak() * 0.06, 10, 8), grup);
    m.position.set(X[0] + Math.cos(a) * r, 2.15, Math.sin(a) * r);
    butir.push(m);
  }
  const eNormal = tambah(bEnzim, bentukEnzim(0.42), grup);
  eNormal.position.set(X[0] + 1.3, 2.5, 0.9);
  const eAlbino = new THREE.Group();
  eAlbino.position.set(X[1] + 1.3, 2.5, 0.9);
  grup.add(eAlbino);
  for (const s of [-1, 1]) {
    const h = new THREE.SphereGeometry(0.42, 18, 12, 0, Math.PI);
    h.rotateY(s > 0 ? 0 : Math.PI);
    const m = tambah(bRusak, h, eAlbino);
    m.position.x = s * 0.16;
    m.rotation.z = s * 0.35;
  }
  /* tirosin yang beredar di kedua sel */
  const tirosin = [0, 1].map((k) =>
    Array.from({ length: 6 }, () => {
      const m = tambah(bTirosin, bolaHalus(0.13, 10, 8), grup);
      m.userData.k = k;
      return m;
    }),
  );
  /* sehelai rambut di atas tiap sel: gelap dan pucat */
  tambah(bagian("rambut", MELANIN, { garis: 0.004 }), tabung([v(X[0] - 1.2, 4.5, -0.6), v(X[0], 5.4, 0), v(X[0] + 1.3, 4.9, 0.5)], 0.13, 30, 8), grup);
  tambah(bagian("rambut", "#f1ead9", { garis: 0.004 }), tabung([v(X[1] - 1.2, 4.5, -0.6), v(X[1], 5.4, 0), v(X[1] + 1.3, 4.9, 0.5)], 0.13, 30, 8), grup);
  label(grup, "sel pigmen normal", 0.5, X[0], -0.5);
  label(grup, "sel pigmen albino", 0.5, X[1], -0.5);
  label(grup, "melanin", 0.42, X[0] - 2.4, 2.6);
  label(grup, "tirosinase", 0.4, X[0] + 1.6, 3.3);
  label(grup, "tirosinase tak berfungsi", 0.4, X[1] + 1.6, 3.3);
  grup.add(lantaiBayang(teksturBayang(), 18, 7, 0.01));

  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.4, 0, 20, 0, 1.12),
      normal: lihat(X[0], 2.4, 0, 11, -0.1, 1.05),
      albino: lihat(X[1], 2.4, 0, 11, 0.1, 1.05),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      tirosin.forEach((daftar, k) =>
        daftar.forEach((m, i) => {
          const a = t * 0.6 + (i / daftar.length) * Math.PI * 2;
          m.position.set(X[k] + Math.cos(a) * 1.6, 2.25 + 0.1 * Math.sin(t * 2 + i), Math.sin(a) * 1.6);
        }),
      );
      eNormal.rotation.y = t * 1.2;
      butir.forEach((m, i) => (m.position.y = 2.15 + 0.04 * Math.sin(t * 1.5 + i)));
      sel.forEach((g, i) => (g.rotation.y = 0.1 * Math.sin(t * 0.4 + i)));
    },
  };
}

/* ================================================================== *
 * SABIT — satu basa, satu asam amino, bentuk sel berubah
 * ================================================================== */

function setSabit(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const { bagian, tambah } = studio;
  const bahan = bahanNukleotida(studio, { rna: true, entitas: ["mrna"] });
  const baris = [
    { urut: "CCUGAGGAG", aa: ["Pro", "Glu", "Glu"], y: 3.2, teks: "normal" },
    { urut: "CCUGUGGAG", aa: ["Pro", "Val", "Glu"], y: -0.6, teks: "sel sabit" },
  ];
  const X0 = -9.4;
  const untai = baris.map((b) => bangunUntai(studio, grup, b.urut, bahan));
  const bAA = bagian("asamAmino", MOLEKUL.asamAmino.warna, { garis: 0.004 });
  baris.forEach((b) => {
    b.urut.split("").forEach((h, i) => label(grup, h, 0.32, X0 + i * 0.6, b.y + 1.25, 0.1));
    b.aa.forEach((nama, k) => {
      const x = X0 + (k * 3 + 1) * 0.6;
      tambah(bAA, bolaHalus(0.3, 16, 12), grup).position.set(x, b.y - 1.0, 0);
      label(grup, nama, 0.36, x, b.y - 1.65);
    });
    label(grup, b.teks, 0.45, X0 - 1.6, b.y + 0.3);
  });
  label(grup, "kodon ke-5 · 6 · 7", 0.4, X0 + 2.4, 5.2);
  /* penanda kodon ke-6 */
  batangTinta(studio, grup, v(X0 + 1.55, 5.0 - 0.6, 0), v(X0 + 3.25, 5.0 - 0.6, 0), 0.04);

  /* sel darah merah: cakram cekung (normal) dan sabit berisi serat hemoglobin */
  const bSel = bagian(["selDarahMerah"], NETRAL, { garis: 0.004 });
  const lengkung: THREE.Vector2[] = [];
  for (let i = 0; i <= 24; i++) {
    const u = i / 24;
    const r = u * 1.1;
    lengkung.push(new THREE.Vector2(Math.max(0.001, r), 0.22 + 0.25 * Math.pow(u, 3) - 0.18 * Math.cos(u * Math.PI * 0.5) * (1 - u)));
  }
  const cakram = (x: number, y: number, rx: number) => {
    const g = new THREE.LatheGeometry(lengkung.concat(lengkung.slice().reverse().map((p) => new THREE.Vector2(p.x, -p.y))), 40);
    const m = tambah(bSel, g, grup);
    m.position.set(x, y, 0);
    m.rotation.x = rx;
    return m;
  };
  const normal = [cakram(3.2, 3.4, 1.2), cakram(5.3, 3.0, 0.8), cakram(4.2, 4.4, 1.5)];
  const sabit: THREE.Group[] = [];
  const bSerat = bagian(["protein", "hemoglobinS"], MOLEKUL.protein.warna, { garis: false });
  for (const [x, y, r] of [
    [3.6, -0.3, 0.3],
    [6.0, -0.7, -0.4],
    [4.6, 0.9, 1.2],
  ]) {
    const g = new THREE.Group();
    g.position.set(x, y, 0);
    g.rotation.z = r;
    grup.add(g);
    const titik: THREE.Vector3[] = [];
    for (let i = 0; i <= 16; i++) {
      const a = Math.PI * (0.15 + 0.7 * (i / 16));
      titik.push(v(Math.cos(a) * 1.2, Math.sin(a) * 1.2 - 0.9, 0));
    }
    tambah(bSel, tabung(titik, 0.3, 40, 16), g);
    for (let s = 0; s < 3; s++) {
      const a0 = Math.PI * (0.2 + 0.2 * s);
      tambah(bSerat, tabung([v(Math.cos(a0) * 1.2, Math.sin(a0) * 1.2 - 0.9, 0.12), v(Math.cos(a0 + 0.35) * 1.2, Math.sin(a0 + 0.35) * 1.2 - 0.9, 0.12)], 0.05, 8, 6), g, false);
    }
    sabit.push(g);
  }
  label(grup, "sel darah merah normal", 0.42, 4.3, 5.8);
  label(grup, "sel sabit", 0.42, 4.8, -2.6);
  grup.add(lantaiBayang(teksturBayang(), 24, 7, -3.4));

  return {
    grup,
    fokus: {
      utuh: lihat(-2, 1.4, 0, 23, 0, 1.4),
      kodon: lihat(-7, 1.4, 0, 13, 0, 1.42),
      sel: lihat(4.5, 1.6, 0, 13, 0.1, 1.38),
    },
    bayangan: { pusat: v(-2, -1, 0), jangkauan: 12 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      untai.forEach((u, k) =>
        u.perbarui((i) => ({ p: v(X0 + i * 0.6, baris[k].y + 0.05 * Math.sin(t * 1.3 + i * 0.6), 0), ke5: v(-1, 0, 0), keBasa: v(0, 1, 0) })),
      );
      normal.forEach((m, i) => (m.rotation.y = t * 0.3 + i));
      sabit.forEach((g, i) => (g.rotation.y = 0.3 * Math.sin(t * 0.5 + i)));
    },
  };
}

/* ================================================================== *
 * KUCING SIAM
 * ================================================================== */

function setKucing(studio: Studio): Set3D {
  const grup = new THREE.Group();
  alas(studio, grup, 0, 0, 3.2);
  const kucing = new THREE.Group();
  kucing.position.set(0, 0.55, 0);
  grup.add(kucing);
  bangunKucing(studio, kucing);
  const lHangat = labelHidup(grup, "badan hangat → enzim tak aktif → pucat", 0.42);
  const lDingin = labelHidup(grup, "ujung dingin → enzim aktif → gelap", 0.42);
  grup.add(lantaiBayang(teksturBayang(), 10, 7, 0.56));
  return {
    grup,
    fokus: {
      utuh: lihat(0.2, 2.2, 0, 12, 0.3, 1.3),
      ujung: lihat(1.3, 2.4, 0, 9, 0.55, 1.28),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 5 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      kucing.rotation.y = 0.35 * Math.sin(t * 0.35);
      aturLabel(lHangat, true, dt, v(-1.6, 3.1, 0.8));
      aturLabel(lDingin, p.fokus === "ujung", dt, v(2.0, 4.6, 0.6));
    },
  };
}

/* ================================================================== *
 * SAPI — P = G + L
 * ================================================================== */

function bangunSapi(studio: Studio, induk: THREE.Object3D) {
  const { bagian, tambah } = studio;
  const g = new THREE.Group();
  induk.add(g);
  const putih = bagian("sapi", PUTIH, { garis: 0.004 });
  const hitam = bagian("sapi", HITAM_SAPI, { garis: 0.004 });
  const merah = bagian("sapi", MERAH_MUDA_NETRAL, { garis: 0.004 });
  const badan = new THREE.CapsuleGeometry(1.05, 2.1, 8, 20);
  badan.rotateZ(Math.PI / 2);
  badan.translate(0, 2.1, 0);
  tambah(putih, badan, g);
  for (const [x, y, z, r] of [
    [-0.6, 2.5, 0.85, 0.45],
    [0.8, 1.8, 0.9, 0.38],
    [0.2, 2.7, -0.9, 0.5],
  ]) {
    const b = bolaHalus(r, 14, 10);
    b.scale(1.3, 1, 0.4);
    b.translate(x, y, z);
    tambah(hitam, b, g);
  }
  for (const [x, z] of [
    [-1.2, -0.5],
    [-1.2, 0.5],
    [1.2, -0.5],
    [1.2, 0.5],
  ]) {
    const kaki = new THREE.CapsuleGeometry(0.22, 1.1, 6, 12);
    kaki.translate(x, 0.75, z);
    tambah(putih, kaki, g);
  }
  const kepala = bolaHalus(0.7, 24, 18);
  kepala.scale(1.1, 0.9, 0.85);
  kepala.translate(2.35, 2.7, 0);
  tambah(putih, kepala, g);
  const moncong = bolaHalus(0.42, 18, 12);
  moncong.translate(2.95, 2.45, 0);
  tambah(merah, moncong, g);
  for (const z of [-0.35, 0.35]) {
    const tanduk = new THREE.ConeGeometry(0.1, 0.45, 10);
    tanduk.rotateX(z > 0 ? 0.6 : -0.6);
    tanduk.translate(2.1, 3.4, z * 1.3);
    tambah(bagian("sapi", "#e8dcc2", { garis: 0.004 }), tanduk, g);
    const m = bolaHalus(0.07, 10, 8);
    m.translate(2.85, 2.9, z * 0.9);
    tambah(bagian("sapi", MATA, { garis: false }), m, g, false);
  }
  const ambing = bolaHalus(0.45, 16, 12);
  ambing.translate(-0.7, 1.05, 0);
  tambah(merah, ambing, g);
  tambah(hitam, tabung([v(-2.1, 2.5, 0), v(-2.5, 1.9, 0.1), v(-2.5, 1.1, 0)], 0.07, 16, 6), g);
  return g;
}

function setSapi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const { bagian, tambah } = studio;
  const X = [-5, 5];
  const bPakan = bagian("pakan", PAKAN, { garis: 0.004 });
  const bKayu = bagian("palung", NETRAL_GELAP, { garis: 0.004 });
  const bEmber = bagian("ember", "#c9ced4", { garis: 0.004, sisi: THREE.DoubleSide, tembus: 0.4 });
  const bSusu = bagian("susu", "#fbfaf5", { garis: 0.003 });
  X.forEach((x, i) => {
    const s = new THREE.Group();
    s.position.set(x - 1, 0, 0);
    grup.add(s);
    bangunSapi(studio, s);
    /* palung pakan di depan kepala */
    const palung = new THREE.BoxGeometry(1.8, 0.5, 1.2);
    palung.translate(x + 2.8, 0.25, 0);
    tambah(bKayu, palung, grup);
    const isi = new THREE.BoxGeometry(1.6, i === 0 ? 0.45 : 0.1, 1.0);
    isi.translate(x + 2.8, 0.5 + (i === 0 ? 0.22 : 0.05), 0);
    tambah(bPakan, isi, grup);
    /* ember susu */
    const ember = new THREE.CylinderGeometry(0.55, 0.45, 1.0, 24, 1, true);
    ember.translate(x - 3.4, 0.5, 1.2);
    tambah(bEmber, ember, grup);
    const susu = new THREE.CylinderGeometry(0.5, 0.46, i === 0 ? 0.85 : 0.25, 24);
    susu.translate(x - 3.4, i === 0 ? 0.45 : 0.15, 1.2);
    tambah(bSusu, susu, grup);
    label(grup, i === 0 ? "pakan baik → banyak susu" : "pakan kurang → sedikit susu", 0.42, x, -0.6, 1.6);
  });
  label(grup, "P = G + L", 0.9, 0, 5.4);
  label(grup, "genotip sama (G)", 0.45, 0, 4.4);
  grup.add(lantaiBayang(teksturBayang(), 24, 8, 0.01));
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.4, 0, 22, 0, 1.3),
      pakan: lihat(0, 1.5, 0, 19, 0.1, 1.22),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
  };
}

/* ================================================================== *
 * GENOM — DNA kusut di dalam inti; gen hanya sebagian kecil
 * ================================================================== */

function setGenom(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const { bagian, tambah } = studio;
  const inti = tambah(bagian("inti", SEL.inti.warna, { tembus: 0.14, garis: 0.003, sisi: THREE.DoubleSide }), bolaHalus(4.2, 48, 32), grup);
  inti.position.set(0, 4.4, 0);
  /* seutas DNA panjang yang berkelok memenuhi inti */
  const titik: THREE.Vector3[] = [v(0, 4.4, 0)];
  for (let i = 1; i < 260; i++) {
    const p = titik[i - 1].clone().add(v(acak() - 0.5, acak() - 0.5, acak() - 0.5).normalize().multiplyScalar(0.55));
    const d = p.clone().sub(v(0, 4.4, 0));
    if (d.length() > 3.5) p.sub(d.multiplyScalar(0.3));
    titik.push(p);
  }
  const kurva = new THREE.CatmullRomCurve3(titik);
  tambah(bagian("dna", MOLEKUL.dna.warna, { garis: false }), new THREE.TubeGeometry(kurva, 1400, 0.06, 6), grup, false);
  /* gen: potongan pendek yang ditebalkan — hanya sebagian kecil DNA */
  const bGen = bagian(["dna", "gen"], MOLEKUL.dna.warna, { garis: 0.003 });
  for (let k = 0; k < 9; k++) {
    const u0 = acak() * 0.95;
    const ruas: THREE.Vector3[] = [];
    for (let j = 0; j <= 4; j++) ruas.push(kurva.getPoint(u0 + j * 0.0015));
    tambah(bGen, tabung(ruas, 0.11, 10, 8), grup);
  }
  const lGen = labelHidup(grup, "gen: bagian kecil dari DNA", 0.5);
  label(grup, "genom di dalam inti", 0.55, 0, 9.3);
  grup.add(lantaiBayang(teksturBayang(), 12, 9, 0.01));
  return {
    grup,
    fokus: {
      utuh: lihat(0, 4.4, 0, 20, 0.2, 1.35, "putar"),
      gen: lihat(0, 4.4, 0, 14, 0.2, 1.35, "putar"),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 7 },
    perbarui: (p, dt) => aturLabel(lGen, p.fokus === "gen", dt, v(0, 9.0, 0.5)),
  };
}

/* ================================================================== *
 * SATUAN — skala logaritmik
 * ================================================================== */

function setSatuan(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const { bagian, tambah } = studio;
  const SKALA = 1.7; // satuan panjang per kelipatan 10
  const X0 = -9;
  const bBatang = bagian("dna", MOLEKUL.dna.warna, { garis: 0.004 });
  const BATANG = [
    { teks: "gen β-globin · ± 1,6 kb", bp: 1600, y: 5.2, fokus: "gen" },
    { teks: "genom E. coli · ± 4,6 Mb", bp: 4.6e6, y: 3.6, fokus: "bakteri" },
    { teks: "genom manusia · ± 3.100 Mb", bp: 3.1e9, y: 2.0, fokus: "manusia" },
  ];
  for (const b of BATANG) {
    const L = Math.log10(b.bp) * SKALA;
    const g = new THREE.CylinderGeometry(0.28, 0.28, L, 20);
    g.rotateZ(Math.PI / 2);
    g.translate(X0 + L / 2, b.y, 0);
    tambah(bBatang, g, grup);
    label(grup, b.teks, 0.62, X0 + L + 3.9, b.y);
  }
  /* sumbu dengan tanda 1 bp, 1 kb, 1 Mb, 1 Gb */
  batangTinta(studio, grup, v(X0, 0.9, 0), v(X0 + 9.6 * SKALA, 0.9, 0), 0.04);
  for (const [pangkat, teks] of [
    [0, "1 bp"],
    [3, "1 kb"],
    [6, "1 Mb"],
    [9, "1 Gb"],
  ] as const) {
    const x = X0 + pangkat * SKALA;
    batangTinta(studio, grup, v(x, 0.7, 0), v(x, 1.1, 0), 0.04);
    label(grup, teks, 0.6, x, 0.15);
  }
  label(grup, "tiap tanda: seribu kali lipat", 0.55, X0 + 4.8 * SKALA, -0.8);
  return {
    grup,
    fokus: {
      utuh: lihat(-0.5, 2.8, 0, 25, 0, 1.45),
      gen: lihat(-4, 4.4, 0, 14, 0, 1.45),
      bakteri: lihat(0, 3.4, 0, 18, 0, 1.45),
      manusia: lihat(-0.5, 2.8, 0, 25, 0, 1.45),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 12 },
  };
}
