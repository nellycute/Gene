"use client";

import * as THREE from "three";
import { BASA, MOLEKUL } from "@/lib/warna";
import type { PropsAnimasi } from "../daftar";
import { Film3D } from "./Film3D";
import { lihat, type Studio } from "./studio";
import { bolaHalus, lantaiBayang, pembuatAcak, tabung, teksturBayang } from "./bentuk";
import {
  PUNCAK_TRNA,
  bahanNukleotida,
  bangunRantaiProtein,
  bangunRibosom,
  bangunTRNA,
  bangunTRNATegak,
  bangunUntai,
  lipatanAcak,
} from "./model-rna";
import { bentukEnzim } from "./model-mikroba";
import {
  alas,
  aturLabel,
  batangTinta,
  buatJamTahap,
  label,
  labelHidup,
  mulus,
  pelan,
  rangkaiSet,
  v,
  type Set3D,
} from "./rangkai-set";

/**
 * KODE GENETIK DAN TRANSLASI — film pelajaran 1.6 (gaya 3D bergaris, §3).
 *
 *  - mrna: seutas mRNA dan setumpuk asam amino;
 *  - hitung: 4, 16, dan 64 kubus berwarna basa — mengapa kodon tiga huruf;
 *  - tabel: roda kode genetik (diagram datar di dalam film, digambar sendiri);
 *  - baca: kerangka baca yang benar dan yang bergeser satu huruf;
 *  - pemain: ribosom, tRNA berbentuk L, dan enzim pemasang asam amino;
 *  - translasi: ribosom membaca mRNA dari AUG sampai UGA — tRNA masuk,
 *    ikatan peptida terbentuk, ribosom bergeser, faktor pelepas masuk;
 *  - lipat: rantai asam amino melipat menjadi protein;
 *  - polisom: satu mRNA dibaca banyak ribosom sekaligus.
 */

const TAHAP_SET: Record<string, string> = {
  mrna: "mrna",
  hitung: "hitung",
  tabel: "tabel",
  baca: "baca",
  pemain: "pemain",
  translasi: "translasi",
  lipat: "lipat",
  polisom: "polisom",
};

const bangun = rangkaiSet(
  (studio) => {
    const acak = pembuatAcak(61);
    return {
      mrna: setMRNA(studio),
      hitung: setHitung(studio),
      tabel: setTabel(studio),
      baca: setBaca(studio),
      pemain: setPemain(studio, acak),
      translasi: setTranslasi(studio, acak),
      lipat: setLipat(studio, acak),
      polisom: setPolisom(studio, acak),
    };
  },
  TAHAP_SET,
  "mrna",
);

export default function Translasi3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}

const JARAK = 0.6;
const AA3: Record<string, string> = {
  F: "Phe", L: "Leu", S: "Ser", Y: "Tyr", C: "Cys", W: "Trp", P: "Pro", H: "His", Q: "Gln", R: "Arg",
  I: "Ile", M: "Met", T: "Thr", N: "Asn", K: "Lys", V: "Val", A: "Ala", D: "Asp", E: "Glu", G: "Gly", "*": "henti",
};
/** Tabel baku (NCBI tabel 1), urutan basa U, C, A, G untuk huruf pertama, kedua, ketiga. */
const KODE = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
const URUT_BASA = ["U", "C", "A", "G"] as const;
const terjemah = (kodon: string) => {
  const i = URUT_BASA.indexOf(kodon[0] as "U") * 16 + URUT_BASA.indexOf(kodon[1] as "U") * 4 + URUT_BASA.indexOf(kodon[2] as "U");
  return KODE[i];
};

/** mRNA mendatar: 5′ di kiri, basa menghadap ke atas. */
const mendatar = (n: number, y = 0, x0?: number) => (i: number) => ({
  p: v((x0 ?? -((n - 1) * JARAK) / 2) + i * JARAK, y, 0),
  ke5: v(-1, 0, 0),
  keBasa: v(0, 1, 0),
});

/* ================================================================== *
 * mRNA dan 20 asam amino
 * ================================================================== */

function setMRNA(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const URUT = "AUGGCUUCCGAGACCUUC";
  const mrna = bangunUntai(studio, grup, URUT, bahanNukleotida(studio, { rna: true, entitas: ["mrna"] }));
  const letak = mendatar(URUT.length, 0, -8.6);
  const bAA = studio.bagian("asamAmino", MOLEKUL.asamAmino.warna, { garis: 0.004 });
  const tumpuk: THREE.Mesh[] = [];
  for (let i = 0; i < 20; i++) {
    const m = studio.tambah(bAA, bolaHalus(0.34, 16, 12), grup);
    const a = i * 2.4;
    const r = 0.4 + (i % 5) * 0.35;
    m.position.set(6.2 + Math.cos(a) * r, 0.4 + Math.floor(i / 5) * 0.55, Math.sin(a) * r);
    tumpuk.push(m);
  }
  label(grup, "mRNA · 4 huruf", 0.55, -3.5, 2.2);
  label(grup, "20 macam asam amino", 0.55, 6.2, 3.2);
  grup.add(lantaiBayang(teksturBayang(), 22, 6, -1.4));
  return {
    grup,
    fokus: {
      utuh: lihat(-1, 0.8, 0, 22, 0, 1.4),
      mrna: lihat(-3.5, 0.6, 0, 11, 0, 1.4),
      asam: lihat(6.2, 1.2, 0, 9, 0.1, 1.36),
    },
    bayangan: { pusat: v(0, -1, 0), jangkauan: 12 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      mrna.perbarui((i) => {
        const l = letak(i);
        l.p.y += 0.1 * Math.sin(t * 1.3 + i * 0.5);
        return l;
      });
      tumpuk.forEach((m, i) => (m.position.y += 0.004 * Math.sin(t * 2 + i)));
    },
  };
}

/* ================================================================== *
 * HITUNG — 4, 16, 64
 * ================================================================== */

function setHitung(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const S = 0.5;
  const G = 0.62;
  const bBasa = Object.fromEntries(URUT_BASA.map((b) => [b, studio.bagian(`basa${b}`, BASA[b].warna, { garis: 0.004 })]));
  const kubus = new THREE.BoxGeometry(S, S, S);
  const taruh = (b: (typeof URUT_BASA)[number], x: number, y: number, z: number) => {
    const m = studio.tambah(bBasa[b], kubus, grup);
    m.position.set(x, y, z);
  };
  const X = [-8, 0, 8];
  X.forEach((x) => alas(studio, grup, x, 0, 2.2));
  /* 1 huruf: 4 kubus */
  URUT_BASA.forEach((b, i) => taruh(b, X[0] + (i - 1.5) * G, 1.0, 0));
  /* 2 huruf: 4 × 4 — tiap baris diwarnai huruf pertamanya */
  URUT_BASA.forEach((b, i) => URUT_BASA.forEach((_, j) => taruh(b, X[1] + (j - 1.5) * G, 0.9 + (3 - i) * G, 0)));
  /* 3 huruf: 4 × 4 × 4 — tiap lapisan diwarnai huruf pertamanya */
  URUT_BASA.forEach((b, i) => URUT_BASA.forEach((_, j) => URUT_BASA.forEach((__, k) => taruh(b, X[2] + (j - 1.5) * G, 0.9 + (3 - i) * G, (k - 1.5) * G))));
  label(grup, "1 huruf · 4", 0.55, X[0], 3.9);
  label(grup, "2 huruf · 16", 0.55, X[1], 3.9);
  label(grup, "3 huruf · 64", 0.55, X[2], 3.9);
  label(grup, "20 asam amino", 0.45, 0, 5.2);
  grup.add(lantaiBayang(teksturBayang(), 26, 7, 0.01));
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.2, 0, 24, 0.05, 1.3),
      satu: lihat(X[0], 1.6, 0, 9, -0.1, 1.25),
      dua: lihat(X[1], 1.9, 0, 10, 0, 1.25),
      tiga: lihat(X[2], 1.9, 0, 11, 0.35, 1.15),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 13 },
  };
}

/* ================================================================== *
 * TABEL — roda kode genetik (datar)
 * ================================================================== */

function teksturRoda() {
  const c = document.createElement("canvas");
  c.width = c.height = 1024;
  const g = c.getContext("2d");
  const cx = 512;
  const R = [70, 160, 255, 335, 500];
  if (g) {
    g.fillStyle = "#fbf9f5";
    g.beginPath();
    g.arc(cx, cx, R[4] + 8, 0, Math.PI * 2);
    g.fill();
    /* sudut 0 di atas, searah jarum jam */
    const busur = (r0: number, r1: number, a0: number, a1: number, warna: string) => {
      g.beginPath();
      g.arc(cx, cx, r1, a0 - Math.PI / 2, a1 - Math.PI / 2);
      g.arc(cx, cx, r0, a1 - Math.PI / 2, a0 - Math.PI / 2, true);
      g.closePath();
      g.fillStyle = warna;
      g.fill();
      g.strokeStyle = "#fbf9f5";
      g.lineWidth = 2;
      g.stroke();
    };
    const tulis = (teks: string, r: number, a: number, ukuran: number, warna: string, tebal = 700) => {
      g.save();
      g.translate(cx + r * Math.sin(a), cx - r * Math.cos(a));
      let putar = a;
      if (a > Math.PI / 2 && a < (3 * Math.PI) / 2) putar += Math.PI;
      g.rotate(putar);
      g.fillStyle = warna;
      g.font = `${tebal} ${ukuran}px system-ui, sans-serif`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(teks, 0, 0);
      g.restore();
    };
    const langkah1 = (Math.PI * 2) / 4;
    for (let i = 0; i < 4; i++) {
      const a0 = i * langkah1;
      busur(R[0], R[1], a0, a0 + langkah1, BASA[URUT_BASA[i]].warna);
      tulis(URUT_BASA[i], (R[0] + R[1]) / 2, a0 + langkah1 / 2, 58, "#ffffff", 800);
      for (let j = 0; j < 4; j++) {
        const b0 = a0 + (j * langkah1) / 4;
        busur(R[1], R[2], b0, b0 + langkah1 / 4, BASA[URUT_BASA[j]].warna);
        tulis(URUT_BASA[j], (R[1] + R[2]) / 2, b0 + langkah1 / 8, 40, "#ffffff", 800);
        for (let k = 0; k < 4; k++) {
          const c0 = b0 + (k * langkah1) / 16;
          busur(R[2], R[3], c0, c0 + langkah1 / 16, BASA[URUT_BASA[k]].warna);
          tulis(URUT_BASA[k], (R[2] + R[3]) / 2, c0 + langkah1 / 32, 22, "#ffffff", 800);
        }
      }
    }
    /* cincin asam amino: kodon berurutan dengan asam amino sama digabung */
    const sudutKodon = (n: number) => (n * Math.PI * 2) / 64;
    let n = 0;
    while (n < 64) {
      let m = n;
      while (m + 1 < 64 && KODE[m + 1] === KODE[n] && Math.floor((m + 1) / 16) === Math.floor(n / 16)) m++;
      const aa = KODE[n];
      const henti = aa === "*";
      const met = aa === "M";
      busur(R[3], R[4], sudutKodon(n), sudutKodon(m + 1), henti ? "#1b2430" : met ? MOLEKUL.asamAmino.warna : "#efe9de");
      const tengah = (sudutKodon(n) + sudutKodon(m + 1)) / 2;
      tulis(AA3[aa], (R[3] + R[4]) / 2 + (henti ? 0 : 6), tengah, henti ? 24 : 30, henti ? "#ffffff" : "#1b2430");
      if (met) tulis("mulai", R[4] - 26, tengah, 18, "#1b2430", 600);
      n = m + 1;
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function setTabel(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const bahan = new THREE.MeshBasicMaterial({ map: teksturRoda(), transparent: true });
  bahan.userData.outlineParameters = { visible: false };
  const R = 5.2;
  const roda = new THREE.Mesh(new THREE.CircleGeometry(R, 96), bahan);
  roda.position.set(0, 5.6, 0);
  grup.add(roda);
  const tepi = new THREE.TorusGeometry(R + 0.05, 0.09, 8, 96);
  tepi.translate(0, 5.6, -0.02);
  studio.tambah(studio.bagian("roda", "#c4b8a6", { garis: 0.004 }), tepi, grup);
  label(grup, "huruf ke-1 di tengah → huruf ke-3 di luar", 0.42, 0, -0.1);
  /* penunjuk: kodon henti dan kodon mulai */
  const sudutKe = (n: number) => ((n + 0.5) * Math.PI * 2) / 64;
  const titikRoda = (n: number, r: number) => v(r * Math.sin(sudutKe(n)), 5.6 + r * Math.cos(sudutKe(n)), 0.05);
  const NO = (kodon: string) => URUT_BASA.indexOf(kodon[0] as "U") * 16 + URUT_BASA.indexOf(kodon[1] as "U") * 4 + URUT_BASA.indexOf(kodon[2] as "U");
  const lHenti = labelHidup(grup, "henti: UAA · UAG · UGA", 0.45);
  const lMulai = labelHidup(grup, "AUG · metionin · mulai", 0.45);
  const lLeu = labelHidup(grup, "Leu: UUA UUG CUU CUC CUA CUG", 0.42);
  grup.add(lantaiBayang(teksturBayang(), 12, 6, 0.01));
  return {
    grup,
    fokus: {
      utuh: lihat(0, 5.4, 0, 21, 0, 1.52),
      henti: lihat(3.4, 6.6, 0, 9, 0.12, 1.5),
      mulai: lihat(-1.2, 2.1, 0, 9, -0.08, 1.52),
      leusin: lihat(1.2, 7.0, 0, 13, 0.05, 1.52),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 8 },
    perbarui: (p, dt) => {
      aturLabel(lHenti, p.fokus === "henti", dt, titikRoda(NO("UAG"), R + 1.6).add(v(1.4, 0.4, 0)));
      aturLabel(lMulai, p.fokus === "mulai", dt, titikRoda(NO("AUG"), R + 1.1).add(v(-1.2, -0.2, 0)));
      aturLabel(lLeu, p.fokus === "leusin", dt, v(0, 5.6 + R + 0.9, 0.1));
    },
  };
}

/* ================================================================== *
 * BACA — kerangka baca
 * ================================================================== */

function setBaca(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const URUT = "AUGGCUUCCGAGACCUUCGGA";
  const n = URUT.length;
  const x0 = -((n - 1) * JARAK) / 2;
  const mrna = bangunUntai(studio, grup, URUT, bahanNukleotida(studio, { rna: true, entitas: ["mrna"] }));
  const letak = mendatar(n, 0, x0);
  URUT.split("").forEach((h, i) => label(grup, h, 0.36, x0 + i * JARAK, 1.35, 0.1));

  const kerangka = (geser: number) => {
    const g = new THREE.Group();
    grup.add(g);
    for (let i = geser; i + 3 <= n; i += 3) {
      const xa = x0 + i * JARAK - 0.22;
      const xb = x0 + (i + 2) * JARAK + 0.22;
      batangTinta(studio, g, v(xa, -0.7, 0), v(xb, -0.7, 0), 0.04);
      batangTinta(studio, g, v(xa, -0.7, 0), v(xa, -0.45, 0), 0.04);
      batangTinta(studio, g, v(xb, -0.7, 0), v(xb, -0.45, 0), 0.04);
      label(g, AA3[terjemah(URUT.slice(i, i + 3))], 0.4, (xa + xb) / 2, -1.25);
    }
    return g;
  };
  const benar = kerangka(0);
  const geser = kerangka(1);
  let nilai = 0;
  return {
    grup,
    fokus: {
      utuh: lihat(0, 0, 0, 16, 0, 1.45),
      benar: lihat(0, 0, 0, 15, 0, 1.45),
      geser: lihat(0, 0, 0, 15, 0, 1.45),
    },
    bayangan: { pusat: v(0, -2, 0), jangkauan: 9 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      nilai = pelan(nilai, p.fokus === "geser" ? 1 : 0, 3, dt);
      benar.visible = nilai < 0.5;
      geser.visible = nilai >= 0.5;
      mrna.perbarui((i) => {
        const l = letak(i);
        l.p.y += 0.05 * Math.sin(t * 1.2 + i * 0.5);
        return l;
      });
    },
  };
}

/* ================================================================== *
 * PEMAIN — ribosom, tRNA, enzim pemasang asam amino
 * ================================================================== */

function setPemain(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const ribo = new THREE.Group();
  ribo.position.set(-6, 1.2, 0);
  ribo.scale.setScalar(0.9);
  grup.add(ribo);
  const { kecil, besar } = bangunRibosom(studio, ribo, acak);
  const trnaG = new THREE.Group();
  trnaG.position.set(1.4, -1.6, 0);
  grup.add(trnaG);
  bangunTRNA(studio, trnaG, "CAU");
  const enzim = studio.tambah(
    studio.bagian(["enzim", "sintetase"], MOLEKUL.enzim.warna, { garis: 0.004, sisi: THREE.DoubleSide }),
    bentukEnzim(1.0),
    grup,
  );
  enzim.position.set(1.4 + 3.3, -1.6 + 4.9, 0);
  label(grup, "ribosom", 0.55, -6, 6.0);
  label(grup, "tRNA", 0.55, 0.2, 3.2);
  label(grup, "antikodon", 0.42, 0.8, -2.6);
  label(grup, "enzim pemasang (sintetase)", 0.42, 4.7, 5.0);
  return {
    grup,
    fokus: {
      utuh: lihat(-1, 1.5, 0, 20, 0, 1.4),
      ribosom: lihat(-6, 1.4, 0, 12, -0.15, 1.38),
      trna: lihat(1.8, 0.8, 0, 11, 0.1, 1.4),
      enzim: lihat(4, 2.8, 0, 9, 0.15, 1.38),
    },
    bayangan: { pusat: v(-1, -3, 0), jangkauan: 11 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      kecil.position.y = -0.3 + 0.05 * Math.sin(t);
      besar.position.y = 0.3 + 0.05 * Math.sin(t + 1);
      ribo.rotation.y = 0.25 * Math.sin(t * 0.4);
      trnaG.rotation.y = 0.2 * Math.sin(t * 0.5);
      enzim.rotation.y = t * 0.6;
    },
  };
}

/* ================================================================== *
 * TRANSLASI — dari AUG sampai UGA
 * ================================================================== */

/** 5′ pemimpin, delapan kodon (Met Ala Ser Glu Thr Phe Gly henti), 3′ ekor. */
const PEMIMPIN = "GCCACC";
const KODON = ["AUG", "GCU", "UCC", "GAG", "ACC", "UUC", "GGA", "UGA"];
const MRNA_TRANSLASI = PEMIMPIN + KODON.join("") + "AAAAAA";
const antikodonDari = (kodon: string) =>
  kodon
    .split("")
    .reverse()
    .map((h) => ({ A: "U", U: "A", G: "C", C: "G" })[h] as string)
    .join("");
const Y_T = 1.1;
/** Waktu mulai siklus pemanjangan untuk kodon c (2..7). */
const T_SIKLUS = (c: number) => 16 + (c - 2) * 3.6;
const T_HENTI = T_SIKLUS(8);

function waktuTranslasi(fokus: string, jam: number) {
  switch (fokus) {
    /* waktu disetel mengikuti narasi: subunit kecil (0,5–2,5), mencari AUG (3–8),
       tRNA-Met masuk (9,5–11,5), subunit besar bergabung (13–15) */
    case "inisiasi":
      return Math.min(jam, 16);
    case "elongasi":
      return 16 + Math.min(jam * 0.6, 1.2);
    case "ikatan":
      return 17.2 + Math.min(jam, 1.0);
    case "translokasi":
      return 18.2 + Math.min(jam, T_HENTI - 18.2);
    case "henti":
      return T_HENTI + Math.min(Math.max(0, jam - 5), 1.2);
    case "lepas":
      return T_HENTI + 1.2 + Math.min(jam, 3);
    default:
      return 0;
  }
}

function setTranslasi(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const n = MRNA_TRANSLASI.length;
  const mrna = bangunUntai(studio, grup, MRNA_TRANSLASI, bahanNukleotida(studio, { rna: true, entitas: ["mrna"] }));

  const ribo = new THREE.Group();
  grup.add(ribo);
  const { kecil, besar } = bangunRibosom(studio, ribo, acak, { tembusBesar: 0.3 });

  /* tRNA untuk kodon 1..7 */
  const trna = KODON.slice(0, 7).map((k) => {
    const t = bangunTRNATegak(studio, grup, antikodonDari(k));
    t.asamAmino.visible = false; // asam amino digambar sebagai manik rantai di bawah
    return t;
  });
  /* manik asam amino (satu per kodon) dan sambungan peptidanya */
  const bAA = studio.bagian("asamAmino", MOLEKUL.asamAmino.warna, { garis: 0.004 });
  const manik = KODON.slice(0, 7).map(() => studio.tambah(bAA, bolaHalus(0.32, 18, 12), grup));
  const bPeptida = studio.bagian(["protein", "ikatanPeptida"], MOLEKUL.protein.warna, { garis: false });
  const gSambung = new THREE.CylinderGeometry(0.09, 0.09, 1, 8);
  const sambung = KODON.slice(0, 6).map(() => studio.tambah(bPeptida, gSambung, grup, false));
  const lManik = KODON.slice(0, 7).map((k) => labelHidup(grup, AA3[terjemah(k)], 0.3));

  const pelepas = studio.tambah(
    studio.bagian(["protein", "faktorPelepas"], MOLEKUL.protein.warna, { garis: 0.004 }),
    (() => {
      const g = bolaHalus(0.55, 20, 14);
      g.scale(1, 2.6, 1);
      return g;
    })(),
    grup,
  );

  const lKodon = KODON.map((k) => labelHidup(grup, k, 0.36));
  const l5 = labelHidup(grup, "5′", 0.42);
  const l3 = labelHidup(grup, "3′", 0.42);
  const lRantai = labelHidup(grup, "rantai polipeptida", 0.42);
  const lPelepas = labelHidup(grup, "faktor pelepas", 0.42);
  const lRibo = labelHidup(grup, "ribosom", 0.5);
  grup.add(lantaiBayang(teksturBayang(), 14, 6, -3.2));

  const jamTahap = buatJamTahap();
  const pusatKodon = (c: number) => PEMIMPIN.length + 3 * (c - 1) + 1;
  const aaPos = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.5, 0, 18, 0, 1.4),
      inisiasi: lihat(0, 1.2, 0, 15, 0, 1.4),
      elongasi: lihat(0.6, 2.2, 0, 12.5, 0, 1.4),
      ikatan: lihat(0.9, 4.0, 0, 9.5, 0, 1.36),
      translokasi: lihat(-0.8, 3.6, 0, 17.5, 0, 1.38),
      henti: lihat(0.6, 3.4, 0, 15.5, 0, 1.4),
      lepas: lihat(-0.5, 3.0, 0, 20, 0, 1.38),
    },
    bayangan: { pusat: v(0, -1, 0), jangkauan: 9 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "inisiasi";
      const tau = waktuTranslasi(f, jamTahap(p));
      const detik = p.detik ?? 0;

      /* letak mRNA: `o` = indeks nukleotida yang berada di tengah tempat P */
      let o = 1 + 6 * mulus((tau - 3) / 5);
      for (let c = 2; c <= 7; c++) o += 3 * mulus((tau - (T_SIKLUS(c) + 2.2)) / 1.0);
      mrna.perbarui((i) => ({ p: v((i - o) * JARAK, 0.04 * Math.sin(detik * 1.5 + i * 0.5), 0), ke5: v(-1, 0, 0), keBasa: v(0, 1, 0) }));
      const xNuk = (i: number) => (i - o) * JARAK;

      /* subunit: kecil datang dari bawah, besar turun setelah tRNA-Met duduk */
      const lepas = mulus((tau - (T_HENTI + 1.9)) / 1.8);
      const dKecil = 1 - mulus((tau - 0.5) / 2);
      kecil.position.set(-1.2 * lepas, -3 * dKecil - 2.2 * lepas, 0);
      const dBesar = 1 - mulus((tau - 13) / 2);
      besar.position.set(1.2 * lepas, 4.5 * dBesar + 2.6 * lepas, 0);
      besar.visible = tau > 12.6;

      /* tRNA: masuk ke tempat A (Met: ke P), ikut bergeser, lalu keluar */
      const masukMulai = (c: number) => (c === 1 ? 9.5 : T_SIKLUS(c));
      const masukLama = (c: number) => (c === 1 ? 2.0 : 1.2);
      const keluarMulai = (c: number) => (c < 7 ? T_SIKLUS(c + 1) + 2.2 : T_HENTI + 1.6);
      const posTRNA: THREE.Vector3[] = [];
      const posDuduk: THREE.Vector3[] = [];
      trna.forEach((t, i) => {
        const c = i + 1;
        const duduk = v(xNuk(pusatKodon(c)), Y_T, 0);
        const um = mulus((tau - masukMulai(c)) / masukLama(c));
        const uk = mulus((tau - keluarMulai(c)) / 1.3);
        const pos = duduk.clone().add(v(3, 4.5, 1.5).multiplyScalar(1 - um)).add(v(-1.8, 4, 1.8).multiplyScalar(uk));
        t.grup.position.copy(pos);
        t.grup.rotation.z = 0.35 * (1 - um) - 0.5 * uk;
        const s = um * (1 - uk);
        t.grup.visible = s > 0.02;
        t.grup.scale.setScalar(Math.max(0.001, 0.7 + 0.3 * s));
        posTRNA.push(pos);
        posDuduk.push(duduk);
      });

      /* rantai: manik c menempel di tRNA-nya sampai ikatan peptida berikutnya;
         setelah itu menjadi bagian ekor rantai yang keluar dari subunit besar */
      const puncak = (c: number) => aaPos.copy(PUNCAK_TRNA).applyAxisAngle(v(0, 0, 1), trna[c - 1].grup.rotation.z).add(posTRNA[c - 1]);
      let ikat = 1;
      let proses = 0;
      for (let c = 2; c <= 7; c++) {
        const u = (tau - (T_SIKLUS(c) + 1.2)) / 1.0;
        if (u >= 1) ikat = c;
        else if (u > 0) {
          proses = mulus(u);
          break;
        }
      }
      /* jangkar = asam amino terbaru yang memegang rantai — diukur dari letak
         duduk tRNA-nya, supaya rantai tidak ikut terbang saat tRNA pergi */
      const puncakDuduk = (c: number) => PUNCAK_TRNA.clone().add(posDuduk[c - 1]);
      const jangkarLama = puncakDuduk(ikat);
      const jangkarBaru = ikat < 7 ? puncakDuduk(ikat + 1) : jangkarLama;
      const lepasRantai = mulus((tau - (T_HENTI + 1.2)) / 1.4);
      const geserRantai = v(-2.2, 1.2, 1.6).multiplyScalar(lepasRantai);
      const arahEkor = (d: number) => v(-0.32 * d, 0.46 * d, 0.1 * Math.sin(d * 1.3));
      manik.forEach((m, i) => {
        const c = i + 1;
        const tampak = mulus((tau - masukMulai(c)) / masukLama(c));
        m.visible = tampak > 0.02;
        m.scale.setScalar(Math.max(0.001, tampak));
        let pos: THREE.Vector3;
        if (c > ikat + (proses > 0 ? 1 : 0)) pos = puncak(c).clone();
        else if (c === ikat && proses === 0) pos = tau < masukMulai(c) + masukLama(c) ? puncak(c).clone() : jangkarLama.clone();
        else if (proses > 0) {
          /* sedang dipindahkan: rantai lama bergeser menyambung ke asam amino baru */
          const dari = jangkarLama.clone().add(arahEkor(ikat - c));
          const ke = jangkarBaru.clone().add(arahEkor(ikat + 1 - c));
          pos = c === ikat + 1 ? jangkarBaru.clone() : dari.lerp(ke, proses);
        } else pos = jangkarLama.clone().add(arahEkor(ikat - c));
        m.position.copy(pos.add(geserRantai));
      });
      const panjangRantai = ikat + (proses > 0.5 ? 1 : 0);
      sambung.forEach((s, i) => {
        const a = manik[i].position;
        const b = manik[i + 1].position;
        const ada = i + 2 <= panjangRantai && manik[i + 1].visible;
        s.visible = ada;
        if (!ada) return;
        s.position.copy(a).add(b).multiplyScalar(0.5);
        s.quaternion.setFromUnitVectors(v(0, 1, 0), tmp.copy(b).sub(a).normalize());
        s.scale.set(1, a.distanceTo(b), 1);
      });

      /* faktor pelepas di tempat A saat kodon henti tiba */
      const up = mulus((tau - T_HENTI) / 1.2);
      const uk = mulus((tau - (T_HENTI + 2.2)) / 1.2);
      pelepas.position.set(xNuk(pusatKodon(8)) + 2 * (1 - up), 2.4 + 3.5 * (1 - up) + 3 * uk, 0.2);
      pelepas.visible = up > 0.02 && uk < 0.98;

      /* label */
      KODON.forEach((k, i) => aturLabel(lKodon[i], true, dt, v(xNuk(pusatKodon(i + 1)), -2.75, 0.2)));
      manik.forEach((m, i) => aturLabel(lManik[i], m.visible, dt, m.position.clone().add(v(0.45, 0.35, 0.3))));
      aturLabel(l5, true, dt, v(xNuk(0) - 0.5, 0.5, 0.2));
      aturLabel(l3, true, dt, v(xNuk(n - 1) + 0.5, 0.5, 0.2));
      aturLabel(lRantai, f === "translokasi", dt, manik[0].position.clone().add(v(-1.6, 0.5, 0.3)));
      aturLabel(lPelepas, f === "henti", dt, pelepas.position.clone().add(v(1.9, 1.2, 0.3)));
      aturLabel(lRibo, f === "inisiasi" && tau > 14, dt, v(-2.8, 4.9, 0.3));
    },
  };
}

/* ================================================================== *
 * LIPAT — rantai melipat menjadi protein
 * ================================================================== */

function setLipat(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const N = 26;
  const bAA = studio.bagian("asamAmino", MOLEKUL.asamAmino.warna, { garis: 0.004 });
  const bPeptida = studio.bagian("protein", MOLEKUL.protein.warna, { garis: 0.003 });
  const manik = Array.from({ length: N }, () => studio.tambah(bAA, bolaHalus(0.3, 16, 12), grup));
  const gSambung = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
  const sambung = Array.from({ length: N - 1 }, () => studio.tambah(bPeptida, gSambung, grup, false));
  const lurus = manik.map((_, i) => v(-((N - 1) * 0.62) / 2 + i * 0.62, 2.5, 0));
  const lipat = lipatanAcak(v(0, 2.8, 0), 1.7, N, 0.62, acak);
  /* selubung tembus pandang: bentuk akhir protein */
  const selubung = studio.tambah(
    studio.bagian(["protein", "bentukProtein"], MOLEKUL.protein.warna, { garis: 0.003, tembus: 0.28 }),
    (() => {
      const g = bolaHalus(2.4, 32, 24);
      g.scale(1.1, 0.9, 1);
      g.translate(0, 2.8, 0);
      return g;
    })(),
    grup,
  );
  const tmp = new THREE.Vector3();
  let f = 0;
  let jadi = 0;
  grup.add(lantaiBayang(teksturBayang(), 12, 6, 0.01));
  const lJadi = labelHidup(grup, "enzim · pengangkut · rangka · sinyal", 0.45);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.6, 0, 15, 0, 1.36),
      lurus: lihat(0, 2.6, 0, 15, 0, 1.4),
      lipat: lihat(0, 2.8, 0, 11, 0.2, 1.36, "putar"),
      jadi: lihat(0, 2.8, 0, 12, 0.2, 1.3, "putar"),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 7 },
    perbarui: (p, dt) => {
      f = pelan(f, p.fokus === "lipat" || p.fokus === "jadi" ? 1 : 0, 0.8, dt);
      jadi = pelan(jadi, p.fokus === "jadi" ? 1 : 0, 1.5, dt);
      manik.forEach((m, i) => m.position.lerpVectors(lurus[i], lipat[i], THREE.MathUtils.smoothstep(f, 0, 1)));
      sambung.forEach((s, i) => {
        const a = manik[i].position;
        const b = manik[i + 1].position;
        s.position.copy(a).add(b).multiplyScalar(0.5);
        s.quaternion.setFromUnitVectors(v(0, 1, 0), tmp.copy(b).sub(a).normalize());
        s.scale.set(1, a.distanceTo(b), 1);
      });
      selubung.visible = jadi > 0.02;
      selubung.scale.setScalar(Math.max(0.001, 0.6 + 0.4 * jadi));
      aturLabel(lJadi, p.fokus === "jadi", dt, v(0, 6.0, 0));
    },
  };
}

/* ================================================================== *
 * POLISOM
 * ================================================================== */

function setPolisom(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const titik: THREE.Vector3[] = [];
  for (let i = 0; i <= 40; i++) {
    const u = i / 40;
    titik.push(v(-10 + u * 20, 0.8 * Math.sin(u * Math.PI * 2), 0.6 * Math.cos(u * Math.PI * 3)));
  }
  studio.tambah(studio.bagian(["rna", "mrna"], MOLEKUL.rna.warna, { garis: 0.003 }), tabung(titik, 0.14, 160, 8), grup);
  const kurva = new THREE.CatmullRomCurve3(titik);
  const ribo: THREE.Group[] = [];
  [0.14, 0.32, 0.5, 0.68, 0.86].forEach((u, k) => {
    const g = new THREE.Group();
    g.position.copy(kurva.getPoint(u));
    g.scale.setScalar(0.42);
    grup.add(g);
    bangunRibosom(studio, g, acak);
    ribo.push(g);
    /* makin ke ujung 3′, rantainya makin panjang */
    const panjang = 2 + k * 3;
    const tt: THREE.Vector3[] = [];
    for (let j = 0; j < panjang; j++) tt.push(g.position.clone().add(v(-0.2 * j + 0.3 * Math.sin(j), 1.8 + 0.42 * j, 0.25 * Math.cos(j * 1.4))));
    if (tt.length > 1) bangunRantaiProtein(studio, grup, tt, 0.18, 1);
  });
  label(grup, "5′", 0.5, -10.6, 0.3);
  label(grup, "3′", 0.5, 10.6, 0.3);
  label(grup, "arah baca →", 0.45, 0, -2.4);
  grup.add(lantaiBayang(teksturBayang(), 24, 6, -2.8));
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.2, 0, 22, 0, 1.36),
      dekat: lihat(4, 3.5, 0, 12, 0.1, 1.32),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 12 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      ribo.forEach((g, i) => (g.rotation.y = 0.2 * Math.sin(t * 0.7 + i)));
    },
  };
}
