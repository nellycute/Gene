"use client";

import * as THREE from "three";
import { BASA, MOLEKUL, type KodeBasa } from "@/lib/warna";
import type { PropsAnimasi } from "../daftar";
import { Film3D, type Pembangun } from "./Film3D";
import { lihat, type Pandangan, type Studio } from "./studio";
import { lantaiBayang, teksturBayang } from "./bentuk";
import { bangunDNA } from "./model-dna";
import {
  CELAH,
  NAIK,
  PORSI_PURIN,
  R_BASA,
  R_GULA,
  adalahPurin,
  bangunDNARakit,
  bentukBasa,
  bentukGula,
  keadaanAwal,
  type KeadaanDNA,
} from "./model-dna-rakit";
import { buatLabel } from "./label3d";

/**
 * STRUKTUR DNA — film pelajaran 1.2 (gaya 3D bergaris, §3).
 *
 * Empat set:
 *  - molekul: DNA rakitan (model-dna-rakit.ts). Film dimulai dari heliks
 *    utuh, menyelam ke SATU nukleotida, lalu merakit ulang: empat basa, satu
 *    untai berarah 5′→3′, untai pasangan datang dan basanya berpasangan, tangga
 *    dipilin menjadi heliks putar kanan, diukur, lalu dibuka seperti ritsleting;
 *  - lebar: purin + pirimidin pas di antara dua rangka; dua purin bertabrakan,
 *    dua pirimidin tak bersentuhan;
 *  - chargaff: batang kadar basa manusia dan E. coli (A ≈ T, G ≈ C);
 *  - franklin: pola difraksi sinar-X berbentuk silang (digambar dengan kode,
 *    bukan salinan foto) di samping model heliks ganda.
 */

const TINTA = "#5c6878";
const PELAT = "#2d333c";
const KAKI = "#c4b8a6";

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/** Urutan untai 0 dari ujung 5′. Indeks 8–11 = A G C T (empat basa), 15 = G (pasangan G–C). */
const URUTAN = "CGTAATGCAGCTTACGGATC";
const TUNGGAL = 8;
const EMPAT = [8, 9, 10, 11];
const PASANG_AT = 8;
const PASANG_GC = 15;

type Set3D = {
  grup: THREE.Group;
  fokus: Record<string, Pandangan>;
  bayangan: { pusat: THREE.Vector3; jangkauan: number };
  perbarui?: (p: PropsAnimasi, dt: number) => void;
};

const TAHAP_SET: Record<string, string> = {
  molekul: "molekul",
  lebar: "lebar",
  chargaff: "chargaff",
  franklin: "franklin",
};

const bangun: Pembangun = (studio, baca) => {
  const semua: Record<string, Set3D> = {
    molekul: setMolekul(studio),
    lebar: setLebar(studio),
    chargaff: setChargaff(studio),
    franklin: setFranklin(studio),
  };
  for (const s of Object.values(semua)) {
    s.grup.visible = false;
    studio.scene.add(s.grup);
  }
  let setAktif: string | null = null;
  let setTujuan: string | null = null;
  const tampilkan = (nama: string) => {
    for (const [k, s] of Object.entries(semua)) s.grup.visible = k === nama;
    studio.aturBayangan(semua[nama].bayangan.pusat, semua[nama].bayangan.jangkauan);
    setAktif = nama;
  };

  return (dt) => {
    const p = baca();
    const namaSet = TAHAP_SET[p.tahap ?? "molekul"] ?? "molekul";
    const set = semua[namaSet];
    const kunciFokus = p.fokus && set.fokus[p.fokus] ? p.fokus : "utuh";
    const pandangan = set.fokus[kunciFokus] ?? set.fokus.utuh;
    const kunci = `${p.kunci ?? ""}|${namaSet}|${kunciFokus}`;

    if (setAktif === null) {
      tampilkan(namaSet);
      setTujuan = namaSet;
      studio.tuju(pandangan, kunci);
    } else if (namaSet !== setTujuan) {
      setTujuan = namaSet;
      studio.ganti(() => {
        tampilkan(namaSet);
        studio.tuju(pandangan, kunci);
      }, 0);
    } else if (!studio.sedangBerganti) {
      studio.tuju(pandangan, kunci);
    }
    if (setAktif) semua[setAktif].perbarui?.(p, dt);
    return { sorot: p.sorot ?? [], detik: p.detik ?? 0 };
  };
};

export default function StrukturDNA3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}

/* ================================================================== *
 * Label yang bisa memudar
 * ================================================================== */

type LabelHidup = { sprite: THREE.Sprite; nilai: number };

function labelHidup(induk: THREE.Object3D, teks: string, ukuran: number): LabelHidup {
  const sprite = buatLabel(teks, ukuran);
  sprite.visible = false;
  induk.add(sprite);
  return { sprite, nilai: 0 };
}

function aturLabel(l: LabelHidup, tampak: boolean, dt: number, letak?: THREE.Vector3) {
  l.nilai += ((tampak ? 1 : 0) - l.nilai) * Math.min(1, dt * 5);
  l.sprite.visible = l.nilai > 0.02;
  l.sprite.material.opacity = l.nilai;
  if (letak) l.sprite.position.copy(letak);
}

function batangTinta(induk: THREE.Object3D, studio: Studio, a: THREE.Vector3, b: THREE.Vector3, jari = 0.05) {
  const panjang = a.distanceTo(b);
  const g = new THREE.CylinderGeometry(jari, jari, panjang, 8);
  const q = new THREE.Quaternion().setFromUnitVectors(v(0, 1, 0), b.clone().sub(a).normalize());
  g.applyMatrix4(new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(0.5), q, v(1, 1, 1)));
  return studio.tambah(studio.bagian("ukuran", TINTA, { garis: false }), g, induk, false);
}

/* ================================================================== *
 * MOLEKUL — dari satu nukleotida sampai heliks ganda
 * ================================================================== */

type Sasaran = {
  tampak0: (i: number) => number;
  tampak1: (i: number) => number;
  lepas0: (i: number) => number;
  lepas1: (i: number) => number;
  sambung: number;
  pilin: number;
};

const SEMUA = () => 1;
const TIDAK = () => 0;

function sasaranUntuk(fokus: string): Sasaran {
  const tangga: Sasaran = { tampak0: SEMUA, tampak1: SEMUA, lepas0: TIDAK, lepas1: TIDAK, sambung: 1, pilin: 0 };
  const heliks: Sasaran = { ...tangga, pilin: 1 };
  const untai: Sasaran = { ...tangga, tampak1: TIDAK };
  switch (fokus) {
    case "jauh":
    case "dekat":
      return heliks;
    case "nukleotida":
      return { ...untai, tampak0: (i) => (i === TUNGGAL ? 1 : 0) };
    case "empat":
      return { ...untai, tampak0: (i) => (EMPAT.includes(i) ? 1 : 0), sambung: 0 };
    case "untai":
    case "sambungan":
    case "arah":
    case "ujung5":
    case "ujung3":
      return untai;
    case "pasang":
    case "at":
    case "gc":
      return tangga;
    case "buka":
      /* ritsleting terbuka dari atas: makin ke atas makin renggang */
      return {
        ...heliks,
        lepas0: (i) => Math.min(1.5, Math.max(0, (10 - i) * 0.26)),
        lepas1: (i) => Math.min(1.5, Math.max(0, (10 - i) * 0.26)),
      };
    default:
      return heliks;
  }
}

function setMolekul(studio: Studio): Set3D {
  const grup = new THREE.Group();
  /* Selama berupa tangga, molekul direbahkan: untai atas 5′→3′ dari kiri ke
     kanan, seperti diagram buku — dan pas di panggung yang lebar. Saat dipilin,
     ia berdiri menjadi heliks. */
  const putar = new THREE.Group();
  grup.add(putar);
  const dna = bangunDNARakit(studio, putar, URUTAN);
  const n = dna.n;
  const k: KeadaanDNA = keadaanAwal(n);
  let pertama = true;

  /* ---------- label di dalam gambar ---------- */
  const lFosfat = labelHidup(putar, "fosfat", 0.15);
  const lGula = labelHidup(putar, "gula", 0.15);
  const lBasa = labelHidup(putar, "basa", 0.15);
  const lHuruf = EMPAT.map((i) => labelHidup(putar, URUTAN[i], 0.3));
  const l5 = [labelHidup(putar, "5′", 0.34), labelHidup(putar, "5′", 0.34)];
  const l3 = [labelHidup(putar, "3′", 0.34), labelHidup(putar, "3′", 0.34)];
  const lOH = labelHidup(putar, "OH", 0.2);
  const lPasang = [labelHidup(putar, "A — T", 0.2), labelHidup(putar, "G ≡ C", 0.2)];
  const lLebar = labelHidup(putar, "± 2 nm", 0.4);
  const lPutaran = labelHidup(putar, "± 3,4 nm · 10 pasang basa", 0.36);
  const lAnak = labelHidup(putar, "0,34 nm", 0.22);
  const lAlurBesar = labelHidup(putar, "alur besar", 0.34);
  const lAlurKecil = labelHidup(putar, "alur kecil", 0.34);

  /* penggaris ukuran: lebar 2 nm di atas heliks, satu putaran di sisi kanan */
  const ukur = new THREE.Group();
  ukur.visible = false;
  putar.add(ukur);
  const yAtas = (n - 1) / 2 * NAIK + 0.55;
  batangTinta(ukur, studio, v(-1, yAtas, 0), v(1, yAtas, 0));
  for (const x of [-1, 1]) batangTinta(ukur, studio, v(x, yAtas - 0.12, 0), v(x, yAtas + 0.12, 0));
  const yPutaranAtas = ((n - 1) / 2 - 4) * NAIK;
  const yPutaranBawah = ((n - 1) / 2 - 14) * NAIK;
  batangTinta(ukur, studio, v(1.55, yPutaranAtas, 0), v(1.55, yPutaranBawah, 0));
  for (const y of [yPutaranAtas, yPutaranBawah]) batangTinta(ukur, studio, v(1.43, y, 0), v(1.67, y, 0));
  let skalaUkur = 0;

  grup.add(lantaiBayang(teksturBayang(), 6, 6, -(n / 2) * NAIK - 0.9));

  const pelan = (sekarang: number, sasaran: number, laju: number, dt: number) =>
    sekarang + (sasaran - sekarang) * (1 - Math.exp(-dt * laju));

  const tinggi = (i: number) => ((n - 1) / 2 - i) * NAIK;
  /** Letak mendatar sebuah anak tangga saat molekul direbahkan (tangga lebih renggang 1,5×). */
  const xTangga = (i: number) => -tinggi(i) * 1.5;

  return {
    grup,
    fokus: {
      utuh: lihat(0, 0, 0, 24, 0.3, 1.25, "putar"),
      jauh: lihat(0, 0, 0, 24, 0.3, 1.25, "putar"),
      dekat: lihat(0, 0.6, 0, 11, 0.3, 1.2, "putar"),
      nukleotida: lihat(xTangga(TUNGGAL), 0.55, 0, 3.4, 0.05, 1.4),
      empat: lihat(0, 0.5, 0, 7.2, 0.05, 1.4),
      untai: lihat(0, 0.55, 0, 14.5, 0.05, 1.4),
      sambungan: lihat(-0.25, 0.8, 0, 3.8, 0.2, 1.35),
      arah: lihat(0, 0.55, 0, 14.5, 0.05, 1.4),
      ujung5: lihat(xTangga(0) + 0.6, 0.6, 0, 6.5, -0.12, 1.38),
      ujung3: lihat(xTangga(n - 1) - 0.6, 0.6, 0, 6.5, 0.12, 1.4),
      pasang: lihat(0, 0, 0, 14.5, 0, 1.4),
      at: lihat(xTangga(PASANG_AT), 0.05, 0, 4.8, 0.05, 1.38),
      gc: lihat(xTangga(PASANG_GC), 0.05, 0, 4.8, -0.05, 1.38),
      pilin: lihat(0, 0, 0, 16, 0.2, 1.36, "putar"),
      antiparalel: lihat(0, 0, 0, 16, 0.1, 1.4),
      ukuran: lihat(0.6, 0.3, 0, 16, 0, 1.45),
      anakTangga: lihat(0, 0.1, 0, 4.6, 0, 1.28),
      alur: lihat(0, 0, 0, 12.5, 0.3, 1.42, "putar"),
      buka: lihat(0, 0.6, 0, 17, 0.25, 1.36),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 6 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "jauh";
      const s = sasaranUntuk(f);

      /* untai pasangan datang dari samping, bukan muncul di tempat */
      for (let i = 0; i < n; i++) {
        if (s.tampak1(i) > 0.5 && k.tampak[1][i] < 0.03) k.lepas[1][i] = 3.2;
      }
      if (pertama) {
        /* pembukaan langsung dalam keadaan jadi, tanpa merakit */
        for (let i = 0; i < n; i++) {
          k.tampak[0][i] = s.tampak0(i);
          k.tampak[1][i] = s.tampak1(i);
          k.lepas[1][i] = s.lepas1(i);
        }
        k.pilin = s.pilin;
        k.sambung = s.sambung;
        pertama = false;
      }

      for (let i = 0; i < n; i++) {
        /* nukleotida yang jauh dari tengah menyusul belakangan — terlihat bersambung satu per satu */
        const tunda = 1 + 0.32 * Math.abs(i - (n - 1) / 2);
        k.tampak[0][i] = pelan(k.tampak[0][i], s.tampak0(i), 4 / tunda, dt);
        k.tampak[1][i] = pelan(k.tampak[1][i], s.tampak1(i), 4 / tunda, dt);
        k.lepas[0][i] = pelan(k.lepas[0][i], s.lepas0(i), 1.3, dt);
        k.lepas[1][i] = pelan(k.lepas[1][i], s.lepas1(i), (f === "buka" ? 1.3 : 1.1) / tunda ** 0.4, dt);
      }
      k.sambung = pelan(k.sambung, s.sambung, 1.6, dt);
      k.pilin = pelan(k.pilin, s.pilin, 0.85, dt);
      dna.perbarui(k);
      putar.rotation.z = (Math.PI / 2) * (1 - k.pilin);

      /* ---------- label ---------- */
      const keluar = (titik: THREE.Vector3, jarak: number, y = 0) => {
        const d = v(titik.x, 0, titik.z);
        if (d.lengthSq() < 1e-6) d.set(1, 0, 0);
        return titik.clone().addScaledVector(d.normalize(), jarak).add(v(0, y, 0));
      };
      const diNukleotida = f === "nukleotida";
      aturLabel(lFosfat, diNukleotida, dt, keluar(dna.letakFosfat[0][TUNGGAL], 0.45, 0.12));
      aturLabel(lGula, diNukleotida, dt, keluar(dna.letakGula[0][TUNGGAL], 0.5, -0.15));
      aturLabel(lBasa, diNukleotida, dt, dna.letakBasa[0][TUNGGAL].clone().add(v(-0.1, 0.32, 0)));
      EMPAT.forEach((i, j) => aturLabel(lHuruf[j], f === "empat", dt, dna.letakGula[0][i].clone().add(v(0.85, 0, 0))));

      const tampakArah0 = ["arah", "ujung5", "ujung3", "antiparalel"].includes(f);
      aturLabel(l5[0], tampakArah0, dt, dna.letakFosfat[0][0].clone().add(v(0.1, 0.42, 0)));
      aturLabel(l3[0], tampakArah0, dt, dna.letakGula[0][n - 1].clone().add(v(0.1, -0.5, 0)));
      aturLabel(lOH, f === "ujung3", dt, dna.letakGula[0][n - 1].clone().add(v(0.4, -0.4, 0)));
      aturLabel(l5[1], f === "antiparalel", dt, dna.letakFosfat[1][n - 1].clone().add(v(-0.1, -0.45, 0)));
      aturLabel(l3[1], f === "antiparalel", dt, dna.letakGula[1][0].clone().add(v(-0.1, 0.5, 0)));

      aturLabel(lPasang[0], f === "at", dt, dna.letakGula[1][PASANG_AT].clone().add(v(-0.5, 0, 0.1)));
      aturLabel(lPasang[1], f === "gc", dt, dna.letakGula[1][PASANG_GC].clone().add(v(-0.5, 0, 0.1)));

      const diUkur = f === "ukuran" || f === "anakTangga";
      aturLabel(lLebar, diUkur, dt, v(0, yAtas + 0.4, 0));
      aturLabel(lPutaran, diUkur, dt, v(2.9, (yPutaranAtas + yPutaranBawah) / 2, 0));
      aturLabel(lAnak, f === "anakTangga", dt, v(-1.7, tinggi(9.5), 0));
      skalaUkur = pelan(skalaUkur, diUkur ? 1 : 0, 5, dt);
      ukur.visible = skalaUkur > 0.02;
      ukur.scale.setScalar(Math.max(0.001, skalaUkur));

      /* alur: titik tengah alur kecil ada di antara kedua rangka pada sisi 150° */
      const iAlur = 10;
      const thAlur = -k.pilin * iAlur * (Math.PI / 5) + (Math.PI - k.pilin * (Math.PI / 6)) / 2;
      const diAlur = f === "alur";
      aturLabel(lAlurKecil, diAlur, dt, v(Math.cos(thAlur) * 1.7, tinggi(iAlur), -Math.sin(thAlur) * 1.7));
      aturLabel(lAlurBesar, diAlur, dt, v(-Math.cos(thAlur) * 1.7, tinggi(iAlur - 2), Math.sin(thAlur) * 1.7));
    },
  };
}

/* ================================================================== *
 * LEBAR — mengapa selalu purin dengan pirimidin
 * ================================================================== */

function setLebar(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const { bagian, tambah } = studio;
  const gGula = bentukGula();
  const gPurin = bentukBasa(true);
  const gPirimidin = bentukBasa(false);
  const gRangka = new THREE.CylinderGeometry(0.06, 0.06, 1.3, 10);
  const gIkatan = new THREE.CylinderGeometry(0.017, 0.017, CELAH - 0.03, 6);
  gIkatan.rotateZ(Math.PI / 2);

  /* anak tangga baku: lebar yang sama dengan model rakitan */
  const TALI = 2 * R_BASA;
  const BERSIH = TALI - CELAH;
  const SKALA = 1.9;
  const KOLOM: { kiri: KodeBasa; kanan: KodeBasa; entitas: string; teks: string; x: number }[] = [
    { kiri: "A", kanan: "T", entitas: "pasanganBenar", teks: "A–T", x: -6.9 },
    { kiri: "G", kanan: "C", entitas: "pasanganBenar", teks: "G–C", x: -2.3 },
    { kiri: "A", kanan: "G", entitas: "duaPurin", teks: "A–G · dua purin", x: 2.3 },
    { kiri: "C", kanan: "T", entitas: "duaPirimidin", teks: "C–T · dua pirimidin", x: 6.9 },
  ];

  for (const kol of KOLOM) {
    const g = new THREE.Group();
    g.position.set(kol.x, 1.9, 0);
    g.scale.setScalar(SKALA);
    grup.add(g);
    const abu = bagian(["gulaFosfat", kol.entitas], MOLEKUL.gulaFosfat.warna, { garis: 0.003 });

    for (const sisi of [-1, 1]) {
      const r = tambah(abu, gRangka, g);
      r.position.set(sisi * (R_GULA + 0.12), 0, 0);
      const gula = tambah(abu, gGula, g);
      gula.position.set(sisi * R_GULA, 0, 0);
      /* muka gula menghadap penonton; ujungnya menunjuk ke 5′ (kiri ke atas, kanan ke bawah) */
      if (sisi > 0) gula.rotation.z = Math.PI;
    }

    const panjang = (b: KodeBasa) => BERSIH * (adalahPurin(b) ? PORSI_PURIN : 1 - PORSI_PURIN);
    const kiri = tambah(bagian([`basa${kol.kiri}`, kol.entitas], BASA[kol.kiri].warna, { garis: 0.003 }), adalahPurin(kol.kiri) ? gPurin : gPirimidin, g);
    /* basa berdiri menghadap penonton, seperti anak tangga di diagram */
    kiri.rotation.x = Math.PI / 2;
    kiri.position.set(-R_BASA, 0, kol.entitas === "duaPurin" ? 0.05 : 0);
    kiri.scale.set(panjang(kol.kiri), 1, 1);
    const kanan = tambah(bagian([`basa${kol.kanan}`, kol.entitas], BASA[kol.kanan].warna, { garis: 0.003 }), adalahPurin(kol.kanan) ? gPurin : gPirimidin, g);
    kanan.position.set(R_BASA, 0, kol.entitas === "duaPurin" ? -0.05 : 0);
    kanan.rotation.set(Math.PI / 2, Math.PI, 0);
    kanan.scale.set(panjang(kol.kanan), 1, 1);

    if (kol.entitas === "pasanganBenar") {
      const n = kol.kiri === "G" || kol.kiri === "C" ? 3 : 2;
      const ujungKiri = -R_BASA + panjang(kol.kiri);
      for (let j = 0; j < n; j++) {
        const m = tambah(bagian(["ikatanHidrogen", kol.entitas], MOLEKUL.ikatanHidrogen.warna, { garis: false }), gIkatan, g, false);
        m.position.set(ujungKiri + CELAH / 2, (j - (n - 1) / 2) * 0.1, 0.03);
      }
    }

    /* garis bantu tinta: lebar rangka yang baku, sama di keempat kolom */
    for (const sisi of [-1, 1]) {
      batangTinta(g, studio, v(sisi * (R_GULA + 0.12), -0.95, 0), v(sisi * (R_GULA + 0.12), -0.8, 0), 0.02);
    }
    const l = buatLabel(kol.teks, 0.44);
    l.position.set(kol.x, 0.2, 0.3);
    grup.add(l);
  }
  const lPas = buatLabel("pas", 0.4);
  lPas.position.set(-4.6, 3.75, 0);
  grup.add(lPas);
  const lLebar = buatLabel("bertabrakan", 0.4);
  lLebar.position.set(2.3, 3.75, 0);
  grup.add(lLebar);
  const lSempit = buatLabel("tak bersentuhan", 0.4);
  lSempit.position.set(6.9, 3.75, 0);
  grup.add(lSempit);
  grup.add(lantaiBayang(teksturBayang(), 20, 5, 0.01));

  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.1, 0, 22, 0, 1.42),
      benar: lihat(-4.6, 2.1, 0, 12, 0, 1.45),
      purin2: lihat(2.3, 2.1, 0, 8.5, 0.12, 1.45),
      pirimidin2: lihat(6.9, 2.1, 0, 8.5, -0.12, 1.45),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
  };
}

/* ================================================================== *
 * CHARGAFF — kadar basa dua makhluk
 * ================================================================== */

/** Dibulatkan dari data Chargaff yang lazim dikutip buku ajar (lihat Ringkasan 1.2). */
const KADAR: { nama: string; x: number; nilai: Record<"A" | "T" | "G" | "C", number> }[] = [
  { nama: "Manusia", x: -3.3, nilai: { A: 31, T: 29, G: 20, C: 20 } },
  { nama: "E. coli", x: 3.3, nilai: { A: 25, T: 24, G: 26, C: 26 } },
];

function setChargaff(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const batang: THREE.Mesh[] = [];
  const TINGGI_PER_PERSEN = 0.13;
  for (const makhluk of KADAR) {
    (["A", "T", "G", "C"] as const).forEach((b, j) => {
      const x = makhluk.x + (j - 1.5) * 1.25 + (j >= 2 ? 0.25 : -0.25);
      const h = makhluk.nilai[b] * TINGGI_PER_PERSEN;
      const g = new THREE.BoxGeometry(0.95, 1, 0.95);
      g.translate(0, 0.5, 0);
      const m = studio.tambah(studio.bagian(`basa${b}`, BASA[b].warna, { garis: 0.004 }), g, grup);
      m.position.set(x, 0, 0);
      m.userData.tinggi = h;
      m.scale.y = 0.001;
      batang.push(m);
      const l = buatLabel(`${b} ${makhluk.nilai[b]}%`, 0.42);
      l.position.set(x, h + 0.45, 0.3);
      grup.add(l);
    });
    const l = buatLabel(makhluk.nama, 0.6);
    l.position.set(makhluk.x, -0.55, 0.9);
    grup.add(l);
    /* alas tipis per makhluk */
    const alas = new THREE.BoxGeometry(5.9, 0.12, 1.8);
    alas.translate(makhluk.x, -0.06, 0);
    studio.tambah(studio.bagian("alas", "#e4dfd5", { garis: 0.003 }), alas, grup);
  }
  grup.add(lantaiBayang(teksturBayang(), 16, 6, -0.11));
  let naik = 0;

  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.2, 0, 17, 0, 1.25),
      banding: lihat(0, 2.2, 0, 17, 0.12, 1.2),
    },
    bayangan: { pusat: v(0, 1, 0), jangkauan: 9 },
    perbarui: (_p, dt) => {
      naik = Math.min(1, naik + dt * 0.6);
      const e = 1 - (1 - naik) ** 3;
      for (const m of batang) m.scale.y = Math.max(0.001, (m.userData.tinggi as number) * e);
    },
  };
}

/* ================================================================== *
 * FRANKLIN — pola difraksi sinar-X dan model heliks ganda
 * ================================================================== */

/**
 * Pola difraksi heliks yang disederhanakan, digambar sendiri: bintik-bintik di
 * garis lapis membentuk huruf X, garis lapis ke-4 kosong (ciri heliks ganda
 * dengan alur tak sama), dan busur kuat di atas-bawah dari jarak 0,34 nm.
 */
function teksturDifraksi() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 640;
  const g = c.getContext("2d");
  if (g) {
    g.fillStyle = "#1e232a";
    g.fillRect(0, 0, 512, 640);
    const cx = 256;
    const cy = 320;
    const bintik = (x: number, y: number, rx: number, ry: number, kuat: number) => {
      g.save();
      g.translate(x, y);
      g.scale(rx, ry);
      const grad = g.createRadialGradient(0, 0, 0, 0, 0, 1);
      grad.addColorStop(0, `rgba(240,236,226,${kuat})`);
      grad.addColorStop(1, "rgba(240,236,226,0)");
      g.fillStyle = grad;
      g.beginPath();
      g.arc(0, 0, 1, 0, Math.PI * 2);
      g.fill();
      g.restore();
    };
    const JARAK = 26;
    for (let l = 1; l <= 7; l++) {
      if (l === 4) continue;
      const kuat = l <= 3 ? 0.95 : 0.6;
      for (const sy of [-1, 1]) {
        for (const sx of [-1, 1]) {
          bintik(cx + sx * (16 + l * 17), cy + sy * l * JARAK, 17, 10, kuat);
        }
      }
    }
    /* busur meridian 0,34 nm */
    for (const sy of [-1, 1]) {
      g.save();
      g.strokeStyle = "rgba(240,236,226,0.85)";
      g.lineWidth = 14;
      g.lineCap = "round";
      g.shadowColor = "rgba(240,236,226,0.8)";
      g.shadowBlur = 14;
      g.beginPath();
      g.arc(cx, cy, 262, sy > 0 ? Math.PI / 2 - 0.22 : -Math.PI / 2 - 0.22, sy > 0 ? Math.PI / 2 + 0.22 : -Math.PI / 2 + 0.22);
      g.stroke();
      g.restore();
    }
    /* bayang penahan sinar di tengah */
    g.fillStyle = "#15191e";
    g.beginPath();
    g.arc(cx, cy, 22, 0, Math.PI * 2);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function setFranklin(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const { bagian, tambah } = studio;
  const PUSAT = v(-2.2, 2.9, 0);

  /* pelat foto di atas tiang */
  const bingkai = new THREE.BoxGeometry(3.3, 4.1, 0.14);
  bingkai.translate(PUSAT.x, PUSAT.y, PUSAT.z - 0.08);
  tambah(bagian("pelat", PELAT, { garis: 0.004 }), bingkai, grup);
  const tiang = new THREE.CylinderGeometry(0.09, 0.09, PUSAT.y - 2, 10);
  tiang.translate(PUSAT.x, (PUSAT.y - 2) / 2, -0.15);
  tambah(bagian("pelat", KAKI, { garis: 0.004 }), tiang, grup);
  const kaki = new THREE.CylinderGeometry(0.7, 0.8, 0.12, 24);
  kaki.translate(PUSAT.x, 0.06, -0.15);
  tambah(bagian("pelat", KAKI, { garis: 0.004 }), kaki, grup);
  const bahanFoto = new THREE.MeshBasicMaterial({ map: teksturDifraksi() });
  bahanFoto.userData.outlineParameters = { visible: false };
  const foto = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 3.75), bahanFoto);
  foto.position.copy(PUSAT);
  grup.add(foto);
  const lFoto = buatLabel("pola difraksi sinar-X", 0.42);
  lFoto.position.set(PUSAT.x, PUSAT.y + 2.5, 0.2);
  grup.add(lFoto);

  /* model heliks ganda di sampingnya */
  const heliks = new THREE.Group();
  heliks.position.set(2.6, 3.2, 0);
  grup.add(heliks);
  bangunDNA(studio, heliks, "ATGCGTACCGATTAGCATGC");
  const lModel = buatLabel("model heliks ganda", 0.42);
  lModel.position.set(2.6, 6.9, 0.2);
  grup.add(lModel);

  grup.add(lantaiBayang(teksturBayang(), 12, 6, 0.01));

  return {
    grup,
    fokus: {
      utuh: lihat(0.2, 3.4, 0, 18, 0, 1.4),
      foto: lihat(PUSAT.x + 1.2, PUSAT.y, 0, 13, 0.12, 1.45),
      silang: lihat(PUSAT.x, PUSAT.y, 0, 9, 0, 1.52),
      model: lihat(1.9, 3.7, 0, 17, -0.15, 1.38),
    },
    bayangan: { pusat: v(0, 1, 0), jangkauan: 8 },
    perbarui: (p) => {
      heliks.rotation.y = (p.detik ?? 0) * 0.45;
    },
  };
}
