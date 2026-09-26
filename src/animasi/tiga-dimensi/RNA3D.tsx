"use client";

import * as THREE from "three";
import { BASA, MOLEKUL, SEL, type KodeBasa } from "@/lib/warna";
import type { PropsAnimasi } from "../daftar";
import { Film3D } from "./Film3D";
import { lihat, type Studio } from "./studio";
import { bolaHalus, lantaiBayang, pembuatAcak, teksturBayang } from "./bentuk";
import { bangunDNA } from "./model-dna";
import {
  TEMPEL,
  bahanNukleotida,
  bangunIkatan,
  bangunNukleotida,
  bangunRantaiProtein,
  bangunRibosom,
  bangunTRNA,
  bangunUntai,
  lipatanAcak,
  panjangBasa,
  type Letak,
} from "./model-rna";
import { alas, aturLabel, label, labelHidup, panah, pelan, rangkaiSet, v, type Set3D } from "./rangkai-set";

/**
 * RNA — film pelajaran 1.3 (gaya 3D bergaris, §3).
 *
 *  - pembuka: DNA panjang berpilin di atas, seutas RNA pendek di bawahnya;
 *  - banding: satu nukleotida DNA (deoksiribosa, T) di samping satu nukleotida
 *    RNA (ribosa dengan gugus OH, U); timin membawa gugus metil;
 *  - untai: seutas RNA lurus yang melipat menjadi jepit rambut, basanya berpasangan;
 *  - jenis: mRNA, tRNA berbentuk L, dan ribosom;
 *  - perjalanan: mRNA keluar dari inti lewat pori menuju ribosom;
 *  - dogma: DNA → RNA → protein dengan panah replikasi, transkripsi, translasi.
 */

const JARAK = 0.6;

const TAHAP_SET: Record<string, string> = {
  pembuka: "pembuka",
  banding: "banding",
  untai: "untai",
  jenis: "jenis",
  perjalanan: "perjalanan",
  dogma: "dogma",
};

const bangun = rangkaiSet(
  (studio) => {
    const acak = pembuatAcak(31);
    return {
      pembuka: setPembuka(studio),
      banding: setBanding(studio),
      untai: setUntai(studio),
      jenis: setJenis(studio, acak),
      perjalanan: setPerjalanan(studio, acak),
      dogma: setDogma(studio, acak),
    };
  },
  TAHAP_SET,
  "pembuka",
);

export default function RNA3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}

/** Untai lurus mendatar: 5′ di kiri, basa menggantung ke bawah. */
const lurus = (n: number, y = 0, x0?: number) => (i: number): Letak => ({
  p: v((x0 ?? -((n - 1) * JARAK) / 2) + i * JARAK, y, 0),
  ke5: v(-1, 0, 0),
  keBasa: v(0, -1, 0),
});

/* ================================================================== *
 * PEMBUKA — DNA panjang, RNA pendek
 * ================================================================== */

function setPembuka(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const rebah = new THREE.Group();
  rebah.position.set(0, 2.8, 0);
  rebah.rotation.z = Math.PI / 2;
  grup.add(rebah);
  const putar = new THREE.Group();
  rebah.add(putar);
  const URUT = "ATGCGTACCGATTAGCATGCAATCGGCTAAGCTTACGGATCCGTAAGCTTGACTAGCAATGCGTACCGATTAGCATGCAATCGGCTAAGCTTACGGATCCGTAAGCTTGACTAGCAAT";
  bangunDNA(studio, putar, URUT);

  const bahan = bahanNukleotida(studio, { rna: true });
  const URUT_RNA = "AUGGCUUCCGAG";
  const untai = bangunUntai(studio, grup, URUT_RNA, bahan);
  const letak = lurus(URUT_RNA.length, -1.3);
  label(grup, "DNA", 0.6, 0, 4.6);
  label(grup, "RNA", 0.6, 0, -3.0);
  grup.add(lantaiBayang(teksturBayang(), 14, 6, -3.6));

  return {
    grup,
    fokus: {
      utuh: lihat(0, 0.7, 0, 17, 0, 1.42),
      dna: lihat(0, 2.8, 0, 11, 0.12, 1.38),
      rna: lihat(0, -1.5, 0, 8.5, 0, 1.4),
      panjang: lihat(0, 0.7, 0, 33, 0, 1.44),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 12 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      putar.rotation.y = t * 0.4;
      untai.perbarui((i) => {
        const l = letak(i);
        l.p.y += 0.12 * Math.sin(t * 1.3 + i * 0.6);
        return l;
      });
    },
  };
}

/* ================================================================== *
 * BANDING — deoksiribosa vs ribosa, timin vs urasil
 * ================================================================== */

function setBanding(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const skala = new THREE.Group();
  skala.scale.setScalar(2.2);
  grup.add(skala);

  const bDNA = bahanNukleotida(studio, { rna: false, entitas: ["gulaDNA"] });
  const bRNA = bahanNukleotida(studio, { rna: true, entitas: ["gulaRNA"] });
  const nDNA = bangunNukleotida(studio, skala, "T", bDNA);
  nDNA.position.set(-2.15, 0, 0);
  const nRNA = bangunNukleotida(studio, skala, "U", bRNA);
  nRNA.position.set(1.85, 0, 0);

  /* gugus metil pada timin: satu bola kecil di tepi cincinnya */
  const metil = bolaHalus(0.085, 14, 10);
  metil.translate(TEMPEL + panjangBasa("T") * 0.62, 0.3, 0);
  studio.tambah(studio.bagian(["basaT", "metil"], BASA.T.warna, { garis: 0.003 }), metil, nDNA);

  label(skala, "DNA", 0.3, -1.95, 0.95);
  label(skala, "RNA", 0.3, 2.05, 0.95);
  label(skala, "deoksiribosa", 0.16, -2.15, -0.5);
  label(skala, "H", 0.16, -1.97, -0.3, 0.1);
  label(skala, "ribosa", 0.16, 1.85, -0.5);
  label(skala, "OH", 0.16, 2.08, -0.36, 0.1);
  label(skala, "T · timin", 0.16, -1.6, 0.45);
  label(skala, "U · urasil", 0.16, 2.35, 0.45);
  const lMetil = labelHidup(skala, "CH₃", 0.15);

  return {
    grup,
    fokus: {
      utuh: lihat(0, 0.3, 0, 14, 0, 1.45),
      gula: lihat(0, 0, 0, 13, 0, 1.45),
      gulaDNA: lihat(-4.4, -0.2, 0, 6.8, -0.1, 1.45),
      gulaRNA: lihat(4.1, -0.2, 0, 6.8, 0.1, 1.45),
      basa: lihat(0, 0.4, 0, 13, 0, 1.45),
      metil: lihat(-3.4, 0.6, 0, 5.8, -0.05, 1.42),
    },
    bayangan: { pusat: v(0, -2, 0), jangkauan: 8 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      nDNA.rotation.y = 0.18 * Math.sin(t * 0.7);
      nRNA.rotation.y = 0.18 * Math.sin(t * 0.7 + 1.2);
      aturLabel(lMetil, p.fokus === "metil", dt, v(-2.15 + TEMPEL + panjangBasa("T") * 0.62 + 0.32, 0.32, 0.1));
    },
  };
}

/* ================================================================== *
 * UNTAI — lurus lalu melipat menjadi jepit rambut
 * ================================================================== */

/** Batang 5 pasang (G–C, G–C, C–G, A–U, C–G) dan simpul UUCG. */
const JEPIT = "GGCACUUCGGUGCC";
const BATANG = 5;

function setUntai(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const bahan = bahanNukleotida(studio, { rna: true });
  const untai = bangunUntai(studio, grup, JEPIT, bahan);
  const n = JEPIT.length;
  const bIkatan = studio.bagian("ikatanHidrogen", MOLEKUL.ikatanHidrogen.warna, { garis: false });
  const ikatan = Array.from({ length: BATANG }, (_, i) => {
    const g = bangunIkatan(studio, grup, JEPIT[i] === "A" || JEPIT[i] === "U" ? 2 : 3, bIkatan);
    g.rotation.z = Math.PI / 2;
    return g;
  });
  const l5 = labelHidup(grup, "5′", 0.4);
  const l3 = labelHidup(grup, "3′", 0.4);
  let lipat = 0;

  const Y = 0.74;
  const X0 = -2.4;
  const PUSAT_SIMPUL = v(X0 + (BATANG - 1) * JARAK + 0.62, 0, 0);
  const letakLipat = (i: number): Letak => {
    if (i < BATANG) return { p: v(X0 + i * JARAK, Y, 0), ke5: v(-1, 0, 0), keBasa: v(0, -1, 0) };
    if (i >= n - BATANG) return { p: v(X0 + (n - 1 - i) * JARAK, -Y, 0), ke5: v(1, 0, 0), keBasa: v(0, 1, 0) };
    const a = (Math.PI / 180) * (60 - (i - BATANG) * (120 / (n - 2 * BATANG - 1)));
    const arahJalan = v(Math.sin(a), -Math.cos(a), 0);
    return {
      p: PUSAT_SIMPUL.clone().add(v(Math.cos(a), Math.sin(a), 0).multiplyScalar(0.95)),
      ke5: arahJalan.clone().negate(),
      keBasa: v(-Math.cos(a), -Math.sin(a), 0),
    };
  };
  const letakLurus = lurus(n, 0);

  return {
    grup,
    fokus: {
      utuh: lihat(0, 0, 0, 10, 0, 1.45),
      lurus: lihat(0, -0.2, 0, 10, 0, 1.45),
      lipat: lihat(-0.6, 0, 0, 7.5, 0.1, 1.45),
    },
    bayangan: { pusat: v(0, -1, 0), jangkauan: 6 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      lipat = pelan(lipat, p.fokus === "lipat" ? 1 : 0, 1.1, dt);
      const f = THREE.MathUtils.smoothstep(lipat, 0, 1);
      untai.perbarui((i) => {
        const a = letakLurus(i);
        const b = letakLipat(i);
        return {
          p: a.p.clone().lerp(b.p, f),
          ke5: a.ke5.clone().lerp(b.ke5, f).normalize(),
          keBasa: a.keBasa.clone().lerp(b.keBasa, f).normalize(),
        };
      });
      /* ikatan hidrogen di tengah celah pasangan batang */
      ikatan.forEach((g, i) => {
        const atas = Y - TEMPEL - panjangBasa(JEPIT[i] as KodeBasa);
        const bawah = -Y + TEMPEL + panjangBasa(JEPIT[n - 1 - i] as KodeBasa);
        g.position.set(X0 + i * JARAK, (atas + bawah) / 2, 0);
        const s = THREE.MathUtils.smoothstep(lipat, 0.85, 1);
        g.visible = s > 0.02;
        g.scale.setScalar(Math.max(s, 0.001));
      });
      grup.rotation.y = 0.2 * Math.sin(t * 0.5);
      const u0 = untai.nukleotida[0].position;
      const u1 = untai.nukleotida[n - 1].position;
      aturLabel(l5, true, dt, u0.clone().add(v(-0.6, 0.4, 0)));
      aturLabel(l3, true, dt, u1.clone().add(v(f > 0.5 ? -0.6 : 0.6, f > 0.5 ? -0.4 : 0.4, 0)));
    },
  };
}

/* ================================================================== *
 * JENIS — mRNA, tRNA, ribosom
 * ================================================================== */

function setJenis(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const bahan = bahanNukleotida(studio, { rna: true, entitas: ["mrna"] });
  const URUT = "AUGGCUUCCGAG";
  const mrna = bangunUntai(studio, grup, URUT, bahan);
  const letak = lurus(URUT.length, 5.2);

  const pegang = new THREE.Group();
  pegang.position.set(-5.7, -3.2, 0);
  grup.add(pegang);
  bangunTRNA(studio, pegang, "CAU");

  const ribo = new THREE.Group();
  ribo.position.set(5, -1.6, 0);
  ribo.scale.setScalar(0.85);
  grup.add(ribo);
  bangunRibosom(studio, ribo, acak);

  label(grup, "mRNA", 0.55, 0, 7.0);
  label(grup, "tRNA", 0.55, -4.5, 3.2);
  label(grup, "ribosom (rRNA + protein)", 0.5, 5, 3.6);
  const lAk = labelHidup(grup, "antikodon", 0.4);
  const lAa = labelHidup(grup, "asam amino", 0.4);
  const lBesar = labelHidup(grup, "subunit besar", 0.4);
  const lKecil = labelHidup(grup, "subunit kecil", 0.4);

  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.3, 0, 24, 0, 1.42),
      mrna: lihat(0, 5, 0, 10, 0, 1.4),
      trna: lihat(-4.4, -0.8, 0, 11.5, 0.05, 1.42),
      trnaAtas: lihat(-2.9, 1.3, 0, 6.5, 0.1, 1.42),
      trnaBawah: lihat(-6.2, -3.1, 0, 6, -0.05, 1.42),
      rrna: lihat(5, -0.4, 0, 12.5, 0.15, 1.38),
    },
    bayangan: { pusat: v(0, -4, 0), jangkauan: 12 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      mrna.perbarui((i) => {
        const l = letak(i);
        l.p.y += 0.1 * Math.sin(t * 1.2 + i * 0.5);
        return l;
      });
      pegang.rotation.y = 0.25 * Math.sin(t * 0.6);
      ribo.rotation.y = 0.3 * Math.sin(t * 0.4);
      aturLabel(lAk, p.fokus === "trnaBawah" || p.fokus === "trna", dt, v(-4.1, -3.9, 0.5));
      aturLabel(lAa, p.fokus === "trnaAtas" || p.fokus === "trna", dt, v(-1.2, 2.2, 0.5));
      aturLabel(lBesar, p.fokus === "rrna", dt, v(8.6, 0.9, 0.5));
      aturLabel(lKecil, p.fokus === "rrna", dt, v(8.3, -3.0, 0.5));
    },
  };
}

/* ================================================================== *
 * PERJALANAN — mRNA keluar dari inti menuju ribosom
 * ================================================================== */

function setPerjalanan(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const { bagian, tambah } = studio;

  /* inti: selaput ganda tembus pandang dengan satu pori di sisi kanan */
  const PUSAT_INTI = v(9.5, 0, 0);
  for (const [r, tembus] of [
    [6.5, 0.22],
    [6.2, 0.16],
  ] as const) {
    tambah(bagian("membranInti", SEL.membranInti.warna, { tembus, garis: 0.003, sisi: THREE.DoubleSide }), bolaHalus(r, 48, 32), grup).position.copy(PUSAT_INTI);
  }
  const pori = new THREE.TorusGeometry(0.75, 0.22, 12, 32);
  pori.rotateY(Math.PI / 2);
  pori.translate(PUSAT_INTI.x - 6.35, 0, 0);
  tambah(bagian("membranInti", SEL.membranInti.warna, { garis: 0.004 }), pori, grup);
  const gen = new THREE.Group();
  gen.position.set(8.8, -2.2, 0);
  gen.rotation.z = Math.PI / 2;
  grup.add(gen);
  bangunDNA(studio, gen, "ATGGCTTCCGAGACCGTA");

  const ribo = new THREE.Group();
  ribo.position.set(-5.2, 0, 0);
  ribo.scale.setScalar(0.8);
  grup.add(ribo);
  bangunRibosom(studio, ribo, acak, { tembusBesar: 0.55 });

  const URUT = "AUGGCUUCCGAGACCGUAAAGUGA";
  const bahan = bahanNukleotida(studio, { rna: true, entitas: ["mrna"] });
  const mrna = bangunUntai(studio, grup, URUT, bahan);
  const jalan = new THREE.CatmullRomCurve3([
    v(8, -1.2, 0.3),
    v(5.5, -0.5, 0.3),
    v(3.2, 0, 0),
    v(0, 0.6, 0),
    v(-3.2, 0.15, 0),
    v(-5.2, 0.05, 0),
    v(-9.5, 0.05, 0),
  ]);
  const panjangJalan = jalan.getLength();
  let maju = 0;

  /* tiga kodon di belakang AUG diberi tulisan saat kamera mendekat */
  const kodon = [0, 1, 2].map((k) => labelHidup(grup, URUT.slice(6 + k * 3, 9 + k * 3), 0.4));
  label(grup, "inti", 0.6, 9.5, 7.1);
  label(grup, "pori inti", 0.45, 3.1, 1.6, 0.6);
  label(grup, "ribosom", 0.5, -5.2, 3.4);
  label(grup, "sitoplasma", 0.5, -1.2, -3.2);

  return {
    grup,
    fokus: {
      utuh: lihat(2, 0, 0, 24, 0, 1.42),
      inti: lihat(6.5, 0, 0, 15, -0.15, 1.38),
      pori: lihat(3.1, 0.2, 0, 9, -0.35, 1.32),
      ribosom: lihat(-2.6, 0.4, 0, 12, -0.1, 1.38),
      kodon: lihat(-1.2, 0.4, 0, 7.5, 0, 1.42),
    },
    bayangan: { pusat: v(2, -4, 0), jangkauan: 14 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      const sasaran = { inti: 0.35, pori: 0.62, ribosom: 0.95, kodon: 0.95 }[p.fokus ?? "inti"] ?? 0.35;
      maju = pelan(maju, sasaran, 0.6, dt);
      const kepala = maju * panjangJalan;
      mrna.perbarui(
        (i) => {
          const s = THREE.MathUtils.clamp((kepala - i * JARAK) / panjangJalan, 0, 1);
          const pos = jalan.getPointAt(s);
          const arah = jalan.getTangentAt(s);
          pos.y += 0.05 * Math.sin(t * 1.5 + i * 0.7);
          return { p: pos, ke5: arah, keBasa: v(0, -1, 0) };
        },
        (i) => ((kepala - i * JARAK) / panjangJalan > 0.001 ? 1 : 0),
      );
      ribo.rotation.y = 0.12 * Math.sin(t * 0.5);
      kodon.forEach((l, k) => {
        const tengah = mrna.nukleotida[6 + k * 3 + 1].position;
        aturLabel(l, p.fokus === "kodon", dt, tengah.clone().add(v(0, 1.0, 0)));
      });
    },
  };
}

/* ================================================================== *
 * DOGMA SENTRAL
 * ================================================================== */

function setDogma(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const X = [-7.5, 0, 7.5];
  X.forEach((x) => alas(studio, grup, x));

  const dna = new THREE.Group();
  dna.position.set(X[0], 3.5, 0);
  grup.add(dna);
  bangunDNA(studio, dna, "ATGGCTTCCGAGACCGTA");

  const bahan = bahanNukleotida(studio, { rna: true });
  const URUT = "AUGGCUUCCG";
  const rna = bangunUntai(studio, grup, URUT, bahan);

  bangunRantaiProtein(studio, grup, lipatanAcak(v(X[2], 2.9, 0), 1.25, 20, 0.62, acak));

  panah(studio, grup, [v(-5.2, 5.2, 0), v(-3.6, 6.1, 0), v(-1.7, 5.4, 0)]);
  panah(studio, grup, [v(1.9, 5.4, 0), v(3.7, 6.1, 0), v(5.4, 5.2, 0)]);
  panah(studio, grup, [v(-6.4, 7.4, 0), v(-7.5, 8.3, 0), v(-8.6, 7.4, 0), v(-8.4, 6.6, 0)]);
  label(grup, "replikasi", 0.5, X[0], 9.0);
  label(grup, "transkripsi", 0.5, -3.7, 6.9);
  label(grup, "translasi", 0.5, 3.7, 6.9);
  label(grup, "DNA", 0.55, X[0], -0.35, 1.9);
  label(grup, "RNA", 0.55, X[1], -0.35, 1.9);
  label(grup, "protein", 0.55, X[2], -0.35, 1.9);
  grup.add(lantaiBayang(teksturBayang(), 28, 7, 0.01));

  return {
    grup,
    fokus: {
      utuh: lihat(0, 4.2, 0, 27, 0, 1.36),
      replikasi: lihat(X[0], 5.2, 0, 13, -0.12, 1.34),
      transkripsi: lihat(-3.7, 4.4, 0, 14, 0, 1.36),
      translasi: lihat(3.7, 4.4, 0, 14, 0.05, 1.36),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 13 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      dna.rotation.y = t * 0.45;
      rna.perbarui((i) => ({
        p: v(X[1] - 0.2 + 0.18 * Math.sin(t * 1.1 + i * 0.6), 5.6 - i * JARAK, 0),
        ke5: v(0, 1, 0),
        keBasa: v(1, 0, 0),
      }));
    },
  };
}
