"use client";

import * as THREE from "three";
import { BASA, MOLEKUL } from "@/lib/warna";
import type { PropsAnimasi } from "../daftar";
import { Film3D, type Pembangun } from "./Film3D";
import { lihat, type Pandangan, type Studio } from "./studio";
import { bolaHalus, lantaiBayang, pembuatAcak, tabung, teksturBayang } from "./bentuk";
import { bangunDNA, batang } from "./model-dna";
import { buatLabel } from "./label3d";
import {
  KAPSUL,
  bangunCawan,
  bangunDiplokokus,
  bangunEColi,
  bangunFag,
  bangunTabung,
  bangunTikus,
  bentukEnzim,
  bintangPenanda,
  kelipkan,
  potonganUntai,
  type Fag,
} from "./model-mikroba";

/**
 * BUKTI DNA MATERI GENETIK — film pelajaran 1.1 (gaya 3D bergaris, §3).
 *
 * Set-setnya mengikuti jalan cerita:
 *  - kandidat: protein (rantai asam amino) di satu alas, DNA di alas lain;
 *  - syarat: empat alas, satu per syarat materi genetik, masing-masing bergerak;
 *  - bakteri: pneumokokus galur S (berkapsul) dan galur R;
 *  - tikus: empat suntikan Griffith — hasilnya muncul satu per satu;
 *  - transformasi: potongan DNA dari S mati masuk ke R, R berkapsul, lalu membelah;
 *  - avery: tiga tabung ekstrak, tiga enzim, tiga cawan hasil;
 *  - fag, penanda, infeksi: bakteriofag T2, penanda ³⁵S dan ³²P, suntikan DNA
 *    ke E. coli, lalu selubung terlepas di blender;
 *  - sentrifus: pelet dan cairan, tempat penanda radioaktif ditemukan.
 *
 * Tanda radioaktif digambar sebagai bintang tinta yang berkelip — bukan warna,
 * karena radioaktivitas tidak punya warna di Peta Warna.
 */

const ALAS = "#e4dfd5";
const RAK = "#c4b8a6";

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const mulus = (x: number) => {
  const t = THREE.MathUtils.clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
};
const pelan = (sekarang: number, sasaran: number, laju: number, dt: number) =>
  sekarang + (sasaran - sekarang) * (1 - Math.exp(-dt * laju));

type Set3D = {
  grup: THREE.Group;
  fokus: Record<string, Pandangan>;
  bayangan: { pusat: THREE.Vector3; jangkauan: number };
  perbarui?: (p: PropsAnimasi, dt: number) => void;
};

const TAHAP_SET: Record<string, string> = {
  kandidat: "kandidat",
  syarat: "syarat",
  bakteri: "bakteri",
  tikus: "tikus",
  transformasi: "transformasi",
  avery: "avery",
  "avery-hasil": "avery",
  fag: "fag",
  penanda: "penanda",
  infeksi: "infeksi",
  blender: "infeksi",
  sentrifus: "sentrifus",
};

const bangun: Pembangun = (studio, baca) => {
  const acak = pembuatAcak(11);
  const semua: Record<string, Set3D> = {
    kandidat: setKandidat(studio, acak),
    syarat: setSyarat(studio),
    bakteri: setBakteri(studio, acak),
    tikus: setTikus(studio, acak),
    transformasi: setTransformasi(studio, acak),
    avery: setAvery(studio, acak),
    fag: setFag(studio, acak),
    penanda: setPenanda(studio, acak),
    infeksi: setInfeksi(studio, acak),
    sentrifus: setSentrifus(studio, acak),
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
    const namaSet = TAHAP_SET[p.tahap ?? "kandidat"] ?? "kandidat";
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

export default function BuktiDNA3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}

/* ================================================================== *
 * Bantuan bersama
 * ================================================================== */

function alas(studio: Studio, induk: THREE.Object3D, x: number, z = 0, jari = 2.1) {
  const g = new THREE.CylinderGeometry(jari, jari + 0.25, 0.55, 48);
  g.translate(x, 0.275, z);
  studio.tambah(studio.bagian("alas", ALAS, { garis: 0.004 }), g, induk);
}

function label(induk: THREE.Object3D, teks: string, ukuran: number, x: number, y: number, z = 0) {
  const l = buatLabel(teks, ukuran);
  l.position.set(x, y, z);
  induk.add(l);
  return l;
}

/** Rantai protein kecil: pita hijau berkelok dengan manik asam amino kuning. */
function bangunProtein(studio: Studio, induk: THREE.Object3D, titik: THREE.Vector3[], jariManik = 0.2) {
  studio.tambah(studio.bagian("protein", MOLEKUL.protein.warna, { garis: 0.003 }), tabung(titik, jariManik * 0.5, titik.length * 10, 8), induk);
  const bManik = studio.bagian("asamAmino", MOLEKUL.asamAmino.warna, { garis: 0.003 });
  const kurva = new THREE.CatmullRomCurve3(titik);
  const manik: THREE.Mesh[] = [];
  const jumlah = Math.round(titik.length * 1.6);
  for (let i = 0; i < jumlah; i++) {
    const p = kurva.getPoint(i / (jumlah - 1));
    const g = bolaHalus(jariManik, 14, 10);
    const m = studio.tambah(bManik, g, induk);
    m.position.copy(p);
    manik.push(m);
  }
  return manik;
}

/* ================================================================== *
 * KANDIDAT — protein atau DNA?
 * ================================================================== */

function setKandidat(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  alas(studio, grup, -4);
  alas(studio, grup, 4);

  /* protein: rantai yang terlipat menggumpal — jalan acak di dalam sebuah bola */
  const pusatProtein = v(-4, 3.3, 0);
  const lipatan: THREE.Vector3[] = [pusatProtein.clone().add(v(-0.9, -0.9, 0.3))];
  for (let i = 1; i < 22; i++) {
    const berikut = lipatan[i - 1].clone().add(v(acak() - 0.5, acak() - 0.5, acak() - 0.5).normalize().multiplyScalar(0.62));
    const dariPusat = berikut.clone().sub(pusatProtein);
    if (dariPusat.length() > 1.25) berikut.sub(dariPusat.multiplyScalar(0.45));
    lipatan.push(berikut);
  }
  const protein = new THREE.Group();
  grup.add(protein);
  bangunProtein(studio, protein, lipatan);

  const dna = new THREE.Group();
  dna.position.set(4, 3.9, 0);
  grup.add(dna);
  bangunDNA(studio, dna, "ATGCGTACCGATTAGCATGCA");

  label(grup, "Protein", 0.6, -4, 5.6);
  label(grup, "DNA", 0.6, 4, 7.9);
  grup.add(lantaiBayang(teksturBayang(), 16, 7, 0.01));

  return {
    grup,
    fokus: {
      utuh: lihat(0, 3.4, 0, 21, 0, 1.3),
      protein: lihat(-4, 3.4, 0, 12, -0.2, 1.3),
      dna: lihat(4, 3.9, 0, 12, 0.2, 1.32),
      dekat: lihat(4, 3.9, 0, 9.5, 0.25, 1.35, "putar"),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      dna.rotation.y = t * 0.45;
      protein.rotation.y = 0;
      protein.position.y = 0.08 * Math.sin(t * 1.2);
    },
  };
}

/* ================================================================== *
 * EMPAT SYARAT
 * ================================================================== */

function setSyarat(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const X = [-9, -3, 3, 9];
  X.forEach((x) => alas(studio, grup, x));

  // 1 — menyimpan informasi: urutan basa bisa dibaca
  const d1 = new THREE.Group();
  d1.position.set(X[0], 3.2, 0);
  grup.add(d1);
  bangunDNA(studio, d1, "ATGCGTACGTTA");
  label(grup, "A T G C G T A C…", 0.5, X[0], 5.9);

  // 2 — dapat digandakan: salinan yang sama persis bergeser keluar
  const asli = new THREE.Group();
  asli.position.set(X[1] - 0.9, 3.2, 0);
  grup.add(asli);
  bangunDNA(studio, asli, "GATTACAGCT");
  const salinan = new THREE.Group();
  grup.add(salinan);
  bangunDNA(studio, salinan, "GATTACAGCT");
  label(grup, "salinan", 0.45, X[1] + 0.9, 5.3);

  // 3 — dapat diterjemahkan menjadi sifat: DNA → rantai protein
  const d3 = new THREE.Group();
  d3.position.set(X[2] - 0.9, 3.2, 0);
  grup.add(d3);
  bangunDNA(studio, d3, "CCGATAGCTA");
  const rantai: THREE.Vector3[] = [];
  for (let i = 0; i < 7; i++) rantai.push(v(X[2] + 1.0 + 0.3 * Math.sin(i * 1.3), 1.6 + i * 0.52, 0.25 * Math.cos(i * 1.3)));
  const manik = bangunProtein(studio, grup, rantai, 0.19);
  label(grup, "DNA → protein", 0.45, X[2], 5.6);

  // 4 — stabil, tetapi sesekali berubah: satu pasangan basa berganti
  const d4 = new THREE.Group();
  d4.position.set(X[3], 3.0, 0);
  grup.add(d4);
  bangunDNA(studio, d4, "TACGTGCATC");
  const ubah = new THREE.Group();
  ubah.position.set(X[3], 5.1, 0);
  grup.add(ubah);
  const pasangan = (kiri: "A" | "G", kanan: "T" | "C") => {
    const g = new THREE.Group();
    ubah.add(g);
    studio.tambah(studio.bagian(`basa${kiri}`, BASA[kiri].warna, { garis: 0.003 }), batang(v(-0.85, 0, 0), v(-0.04, 0, 0), 0.15), g);
    studio.tambah(studio.bagian(`basa${kanan}`, BASA[kanan].warna, { garis: 0.003 }), batang(v(0.04, 0, 0), v(0.85, 0, 0), 0.15), g);
    for (const x of [-1, 1]) {
      const b = bolaHalus(0.27, 14, 10);
      b.translate(x, 0, 0);
      studio.tambah(studio.bagian("gulaFosfat", MOLEKUL.gulaFosfat.warna, { garis: 0.003 }), b, g);
    }
    return g;
  };
  const pasAT = pasangan("A", "T");
  const pasGC = pasangan("G", "C");
  label(grup, "mutasi", 0.45, X[3], 6.1);

  grup.add(lantaiBayang(teksturBayang(), 26, 7, 0.01));

  return {
    grup,
    fokus: {
      utuh: lihat(0, 3.3, 0, 34, 0, 1.3),
      simpan: lihat(X[0], 3.6, 0, 11, -0.15, 1.3),
      ganda: lihat(X[1], 3.4, 0, 11, 0, 1.3),
      ekspresi: lihat(X[2], 3.4, 0, 11, 0.1, 1.3),
      mutasi: lihat(X[3], 3.8, 0, 11, 0.15, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 14 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      const sejak = p.sejak ?? 99;
      for (const g of [d1, asli, salinan, d3, d4]) g.rotation.y = t * 0.45;
      /* salinan: meluncur keluar dari yang asli setiap kali syarat ini dibahas */
      const geser = p.fokus === "ganda" ? mulus(sejak / 2.2) : 1;
      salinan.position.set(X[1] - 0.9 + 1.8 * geser, 3.2, 0);
      salinan.visible = geser > 0.03;
      /* protein: manik bertambah satu per satu saat diterjemahkan */
      const berapa = p.fokus === "ekspresi" ? Math.floor(sejak * 4) : manik.length;
      manik.forEach((m, i) => (m.visible = i < berapa));
      /* mutasi: pasangan A–T berganti G–C, lalu kembali */
      const gc = Math.floor(t / 1.8) % 2 === 1;
      pasAT.visible = !gc;
      pasGC.visible = gc;
      ubah.rotation.y = 0.4 * Math.sin(t * 0.8);
    },
  };
}

/* ================================================================== *
 * BAKTERI — galur S dan galur R
 * ================================================================== */

function setBakteri(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const s = bangunDiplokokus(studio, grup, { entitas: ["galurS"], kapsul: true, acak });
  s.position.set(-3, 2.6, 0);
  const r = bangunDiplokokus(studio, grup, { entitas: ["galurR"], kapsul: false, acak });
  r.position.set(3, 2.6, 0);
  label(grup, "Galur S", 0.62, -3, 5.9);
  label(grup, "kapsul", 0.42, -4.75, 3.9);
  label(grup, "Galur R", 0.62, 3, 5.9);
  label(grup, "tanpa kapsul", 0.42, 3, -0.2, 0.8);
  grup.add(lantaiBayang(teksturBayang(), 13, 6, -0.4));
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.8, 0, 16, 0, 1.35),
      s: lihat(-3, 2.8, 0, 9, -0.2, 1.35),
      r: lihat(3, 2.8, 0, 9, 0.2, 1.35),
    },
    bayangan: { pusat: v(0, 1, 0), jangkauan: 7 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      s.rotation.set(0.25 * Math.sin(t * 0.5), t * 0.3, 0.3);
      r.rotation.set(0.25 * Math.sin(t * 0.5 + 1), -t * 0.3, -0.3);
      s.position.y = 2.6 + 0.12 * Math.sin(t * 1.1);
      r.position.y = 2.6 + 0.12 * Math.sin(t * 1.1 + 2);
    },
  };
}

/* ================================================================== *
 * TIKUS — empat suntikan Griffith
 * ================================================================== */

const HASIL_TIKUS = [true, false, false, true]; // true = tikus mati

function setTikus(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const X = [-7.5, -2.5, 2.5, 7.5];
  const KETERANGAN = ["S hidup", "R hidup", "S dipanaskan", "R hidup + S mati"];
  const tikus: THREE.Group[] = [];
  const hasil: { mati: THREE.Sprite; sehat: THREE.Sprite }[] = [];

  X.forEach((x, i) => {
    const e = `tikus${i + 1}`;
    alas(studio, grup, x, 0, 2.2);
    const pegangan = new THREE.Group();
    pegangan.position.set(x, 0.55, 0.3);
    pegangan.rotation.y = 0.55;
    grup.add(pegangan);
    const t = bangunTikus(studio, pegangan, e);
    tikus.push(t);

    /* tabung suntikan berisi bakteri, melayang di atas tikusnya */
    const tab = new THREE.Group();
    tab.position.set(x, 4.2, 0);
    grup.add(tab);
    bangunTabung(studio, tab, { tinggi: 2.1, jari: 0.62, isi: 0.8, entitas: [e] });
    const isi = (kapsul: boolean, mati: boolean, dx: number) => {
      const b = bangunDiplokokus(studio, tab, { entitas: [e], kapsul, mati, acak });
      b.scale.setScalar(0.3);
      b.position.set(dx, 0.85, 0);
      return b;
    };
    if (i === 0) isi(true, false, 0);
    if (i === 1) isi(false, false, 0);
    if (i === 2) isi(true, true, 0);
    if (i === 3) {
      isi(false, false, -0.22);
      isi(true, true, 0.24);
    }
    label(grup, KETERANGAN[i], 0.44, x, 3.75, 0.4);
    const mati = buatLabel("mati", 0.55);
    const sehat = buatLabel("sehat", 0.55);
    for (const l of [mati, sehat]) {
      l.position.set(x, 2.85, 1.2);
      l.visible = false;
      grup.add(l);
    }
    hasil.push({ mati, sehat });
  });
  grup.add(lantaiBayang(teksturBayang(), 22, 7, 0.01));

  const rebah = [0, 0, 0, 0];
  const ungkap = [0, 0, 0, 0];

  return {
    grup,
    fokus: {
      utuh: lihat(0, 3, 0, 27, 0, 1.28),
      tikus1: lihat(X[0] + 1.2, 3.4, 0, 16.5, -0.12, 1.3),
      tikus2: lihat(X[1] + 0.8, 3.4, 0, 16.5, -0.05, 1.3),
      tikus3: lihat(X[2] - 0.8, 3.4, 0, 16.5, 0.05, 1.3),
      tikus4: lihat(X[3] - 1.2, 3.4, 0, 16.5, 0.12, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 12 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      const sampai = p.fokus?.startsWith("tikus") ? Number(p.fokus.slice(5)) : 0;
      tikus.forEach((g, i) => {
        const terungkap = i < sampai;
        ungkap[i] = pelan(ungkap[i], terungkap ? 1 : 0, 4, dt);
        rebah[i] = pelan(rebah[i], terungkap && HASIL_TIKUS[i] ? 1 : 0, 2.5, dt);
        g.rotation.z = rebah[i] * (Math.PI / 2) * 0.92;
        g.position.y = rebah[i] * 0.55 + (1 - rebah[i]) * 0.04 * Math.abs(Math.sin(t * 2.2 + i));
        const l = HASIL_TIKUS[i] ? hasil[i].mati : hasil[i].sehat;
        l.visible = ungkap[i] > 0.02;
        l.material.opacity = ungkap[i];
      });
    },
  };
}

/* ================================================================== *
 * TRANSFORMASI — zat dari S mati mengubah R
 * ================================================================== */

function setTransformasi(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const mati = bangunDiplokokus(studio, grup, { entitas: ["galurS"], kapsul: true, mati: true, acak });
  mati.position.set(-3.6, 2.4, 0);
  label(grup, "S mati", 0.5, -3.6, 5.2);

  /* potongan DNA yang akan masuk */
  const potongan = studio.tambah(
    studio.bagian("dna", MOLEKUL.dna.warna, { garis: false }),
    potonganUntai(v(0, 0, 0), 0.9, acak, 0.07),
    grup,
    false,
  );
  const AWAL = v(-1.6, 2.9, 0.4);
  const AKHIR = v(1.5, 2.5, 0.15);

  const r = new THREE.Group();
  r.position.set(1.5, 2.4, 0);
  grup.add(r);
  bangunDiplokokus(studio, r, { entitas: ["galurR"], kapsul: false, acak });
  const kapsulBaru = studio.tambah(
    studio.bagian(["kapsul", "galurS"], KAPSUL, { tembus: 0.4, garis: 0.003 }),
    (() => {
      const k = bolaHalus(1.08, 32, 24);
      k.scale(1, 1.72, 1);
      return k;
    })(),
    r,
  );
  const anak = bangunDiplokokus(studio, grup, { entitas: ["galurS"], kapsul: true, acak });
  const lR = label(grup, "R → S", 0.5, 1.5, 5.3);
  const lAnak = label(grup, "keturunan: S", 0.45, 4.9, 5.3);
  grup.add(lantaiBayang(teksturBayang(), 16, 6, -0.4));

  let tumbuh = 0;
  let belah = 0;
  let masuk = 0;

  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.6, 0, 16, 0, 1.35),
      masuk: lihat(-0.2, 2.6, 0, 9.5, 0.1, 1.35),
      anak: lihat(2.6, 2.6, 0, 12, 0.1, 1.35),
      akhir: lihat(0.6, 2.6, 0, 16, 0, 1.35),
    },
    bayangan: { pusat: v(0, 1, 0), jangkauan: 8 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      const sejak = p.sejak ?? 99;
      const tahap = { utuh: 0, masuk: 1, anak: 2, akhir: 2 }[p.fokus ?? "utuh"] ?? 0;
      masuk = tahap === 1 ? mulus(sejak / 3) : tahap > 1 ? 1 : pelan(masuk, 0, 3, dt);
      potongan.position.lerpVectors(AWAL, AKHIR, masuk);
      potongan.rotation.set(t * 0.6, t * 0.4, 0);
      potongan.scale.setScalar(1 - 0.4 * masuk);
      tumbuh = pelan(tumbuh, tahap >= 2 ? 1 : tahap === 1 ? mulus((sejak - 2.6) / 2) : 0, 3, dt);
      kapsulBaru.visible = tumbuh > 0.02;
      kapsulBaru.scale.setScalar(Math.max(0.001, 0.6 + 0.4 * tumbuh));
      belah = pelan(belah, tahap >= 2 ? 1 : 0, 1.4, dt);
      anak.visible = belah > 0.03;
      anak.position.set(1.5 + 3.4 * belah, 2.4, 0);
      anak.scale.setScalar(Math.max(0.001, belah));
      lAnak.visible = belah > 0.5;
      lR.visible = tumbuh > 0.5;
      r.rotation.y = t * 0.3;
      anak.rotation.y = -t * 0.3;
      mati.rotation.y = t * 0.15;
    },
  };
}

/* ================================================================== *
 * AVERY — tiga tabung, tiga enzim
 * ================================================================== */

function setAvery(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const X = [-4.2, 0, 4.2];
  const ENZIM = ["protease", "RNase", "DNase"];
  const SASARAN = ["protein", "rna", "dna"];

  const rak = new THREE.BoxGeometry(12, 0.5, 1.8);
  rak.translate(0, 0.25, 0);
  studio.tambah(studio.bagian("rak", RAK, { garis: 0.004 }), rak, grup);

  const molekul: THREE.Mesh[][][] = []; // [tabung][jenis][butir]
  const enzim: THREE.Mesh[] = [];
  const isiCawan: THREE.Group[] = [];

  X.forEach((x, i) => {
    const tab = new THREE.Group();
    tab.position.set(x, 0.5, 0);
    grup.add(tab);
    bangunTabung(studio, tab, { tinggi: 3.6, jari: 0.72, isi: 0.78 });

    /* isi ekstrak: DNA (biru), RNA (jingga), protein (hijau) */
    const perJenis: THREE.Mesh[][] = [[], [], []];
    const bJenis = [
      studio.bagian("protein", MOLEKUL.protein.warna, { garis: 0.003 }),
      studio.bagian("rna", MOLEKUL.rna.warna, { garis: false }),
      studio.bagian("dna", MOLEKUL.dna.warna, { garis: false }),
    ];
    for (let j = 0; j < 12; j++) {
      const jenis = j % 3;
      const p = v((acak() - 0.5) * 0.8, 0.6 + acak() * 1.9, (acak() - 0.5) * 0.8);
      const g = jenis === 0 ? bolaHalus(0.14, 12, 8) : potonganUntai(v(0, 0, 0), 0.5, acak, jenis === 2 ? 0.06 : 0.045);
      const m = studio.tambah(bJenis[jenis], g, tab, false);
      m.position.copy(p);
      m.rotation.set(acak() * 3, acak() * 3, 0);
      perJenis[jenis].push(m);
    }
    molekul.push(perJenis);

    const e = studio.tambah(studio.bagian("enzim", MOLEKUL.enzim.warna, { garis: 0.003, sisi: THREE.DoubleSide }), bentukEnzim(0.42), grup);
    enzim.push(e);
    label(grup, ENZIM[i], 0.5, x, 6.3);

    /* cawan hasil di depan tabung: bakteri R ditambah, lihat apakah S muncul */
    const cawan = new THREE.Group();
    cawan.position.set(x, 0.02, 2.9);
    grup.add(cawan);
    bangunCawan(studio, cawan, 1.3, [`hasil${i + 1}`]);
    const isi = new THREE.Group();
    cawan.add(isi);
    isiCawan.push(isi);
    const tambahBakteri = (kapsul: boolean, dx: number, dz: number) => {
      const b = bangunDiplokokus(studio, isi, { entitas: [`hasil${i + 1}`, kapsul ? "galurS" : "galurR"], kapsul, acak });
      b.scale.setScalar(0.24);
      b.rotation.z = Math.PI / 2;
      b.position.set(dx, 0.35, dz);
    };
    tambahBakteri(false, -0.5, -0.3);
    tambahBakteri(false, 0.4, 0.5);
    if (SASARAN[i] !== "dna") {
      tambahBakteri(true, 0.45, -0.35);
      tambahBakteri(true, -0.35, 0.45);
    }
    label(grup, SASARAN[i] === "dna" ? "hanya R" : "S muncul", 0.42, x, -0.35, 4.4);
  });
  grup.add(lantaiBayang(teksturBayang(), 16, 8, 0.01));

  const turun = [0, 0, 0];
  const hancur = [0, 0, 0];
  const tampak = [0, 0, 0];

  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.3, 1.4, 19, 0, 1.22),
      tabung1: lihat(X[0], 2.2, 1.4, 10, -0.12, 1.15),
      tabung2: lihat(X[1], 2.2, 1.4, 10, 0, 1.15),
      tabung3: lihat(X[2], 2.2, 1.4, 10, 0.12, 1.15),
    },
    bayangan: { pusat: v(0, 0, 1), jangkauan: 9 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      const hasil = p.tahap === "avery-hasil";
      const sampai = !hasil ? 0 : p.fokus?.startsWith("tabung") ? Number(p.fokus.slice(6)) : 3;
      X.forEach((x, i) => {
        const aktif = i < sampai;
        turun[i] = pelan(turun[i], aktif ? 1 : 0, 2.2, dt);
        hancur[i] = pelan(hancur[i], aktif ? 1 : 0, 1.3, dt);
        tampak[i] = pelan(tampak[i], aktif && hancur[i] > 0.6 ? 1 : 0, 3, dt);
        const e = enzim[i];
        e.position.set(x + 0.15 * Math.sin(t * 2 + i), 5.2 - 2.7 * turun[i] + 0.1 * Math.sin(t * 1.7 + i), 0);
        e.rotation.y = t * 1.3 + i;
        e.scale.setScalar(1 - 0.35 * turun[i]);
        /* hanya molekul sasaran enzim ini yang hancur */
        const sasaran = molekul[i][["protein", "rna", "dna"].indexOf(SASARAN[i])];
        sasaran.forEach((m) => {
          const s = Math.max(0.001, 1 - hancur[i]);
          m.scale.setScalar(s);
          m.visible = s > 0.02;
        });
        isiCawan[i].visible = tampak[i] > 0.02;
        isiCawan[i].scale.setScalar(Math.max(0.001, tampak[i]));
        molekul[i].flat().forEach((m, j) => (m.rotation.y = t * 0.5 + j));
      });
    },
  };
}

/* ================================================================== *
 * FAG — bakteriofag T2 di permukaan E. coli
 * ================================================================== */

function setFag(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const bakteri = bangunEColi(studio, grup, 9, 2.2);
  bakteri.position.set(0, -2.2, 0);
  const fag = bangunFag(studio, grup, { acak });
  fag.grup.scale.setScalar(1.35);
  fag.grup.position.set(0, 0.75, 0);
  label(grup, "selubung protein", 0.44, -2.4, 4.3);
  label(grup, "DNA", 0.44, 1.7, 4.0);
  label(grup, "E. coli", 0.5, 4.5, -0.6, 2.4);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.3, 0, 13, 0.2, 1.3),
      kepala: lihat(0, 3.9, 0, 9.5, 0.2, 1.36, "putar"),
      bakteri: lihat(0, 0.4, 0, 7.5, 0.35, 1.18),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 7 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      fag.grup.rotation.y = t * 0.2;
      fag.grup.position.y = 0.75 + 0.04 * Math.sin(t * 1.4);
    },
  };
}

/* ================================================================== *
 * PENANDA — ³⁵S pada protein, ³²P pada DNA
 * ================================================================== */

function setPenanda(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  alas(studio, grup, -3.2, 0, 2.3);
  alas(studio, grup, 3.2, 0, 2.3);
  const fag1 = bangunFag(studio, grup, { entitasProtein: ["penandaProtein"], acak });
  fag1.grup.position.set(-3.2, 1.35, 0);
  fag1.grup.scale.setScalar(1.25);
  const fag2 = bangunFag(studio, grup, { entitasDNA: ["penandaDNA"], acak });
  fag2.grup.position.set(3.2, 1.35, 0);
  fag2.grup.scale.setScalar(1.25);
  /* bintang pada selubung fag 1 (seluruh badan) dan pada isi kepala fag 2 */
  const b1 = bintangPenanda(grup, v(-3.2, 3.6, 0), v(1.1, 2.0, 0.8), 9, acak);
  const b2 = bintangPenanda(grup, v(3.2, 4.5, 0), v(0.5, 0.8, 0.5), 7, acak);
  label(grup, "³⁵S · protein", 0.58, -3.2, 6.9);
  label(grup, "³²P · DNA", 0.58, 3.2, 6.9);
  grup.add(lantaiBayang(teksturBayang(), 14, 6, 0.01));
  let n1 = 0;
  let n2 = 0;
  return {
    grup,
    fokus: {
      utuh: lihat(0, 3.6, 0, 17, 0, 1.3),
      fag1: lihat(-3.2, 3.8, 0, 9.5, -0.15, 1.3),
      fag2: lihat(3.2, 3.8, 0, 9.5, 0.15, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 8 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      n1 = pelan(n1, p.fokus === "fag1" || p.fokus === "fag2" ? 1 : 0, 3, dt);
      n2 = pelan(n2, p.fokus === "fag2" ? 1 : 0, 3, dt);
      kelipkan(b1, n1, t);
      kelipkan(b2, n2, t);
      fag1.grup.rotation.y = t * 0.25;
      fag2.grup.rotation.y = -t * 0.25;
    },
  };
}

/* ================================================================== *
 * INFEKSI — DNA disuntikkan, lalu selubung terlepas di blender
 * ================================================================== */

function setInfeksi(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const bakteri = bangunEColi(studio, grup, 6.5, 1.6, [], 0.55);
  bakteri.position.set(0, 0, 0);
  const X = [-2.3, 0, 2.3];
  const fag: Fag[] = [];
  const suntikan: THREE.Mesh[] = [];
  const bDNA = studio.bagian("dna", MOLEKUL.dna.warna, { garis: false });
  X.forEach((x, i) => {
    const f = bangunFag(studio, grup, { acak });
    f.grup.scale.setScalar(0.62);
    f.grup.position.set(x, 1.95, 0);
    f.grup.rotation.y = i;
    fag.push(f);
    /* DNA yang masuk: dari ekor turun lalu melingkar di dalam sel */
    const titik: THREE.Vector3[] = [v(x, 1.75, 0)];
    for (let k = 1; k <= 30; k++) {
      const a = k * 0.55;
      const r = 0.15 + k * 0.022;
      titik.push(v(x + r * Math.cos(a), 1.2 - k * 0.035, r * Math.sin(a) * 0.9));
    }
    const m = studio.tambah(bDNA, tabung(titik, 0.05, 180, 6), grup, false);
    suntikan.push(m);
  });
  label(grup, "E. coli", 0.5, 4.6, -1.2, 1.4);
  grup.add(lantaiBayang(teksturBayang(), 12, 6, -1.8));

  let alir = 0;
  let lepas = 0;
  const jumlahIndeks = (suntikan[0].geometry.index?.count ?? 0);

  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.4, 0, 13.5, 0.15, 1.28),
      suntik: lihat(0, 1.6, 0, 11, 0.2, 1.25),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 7 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      const sejak = p.sejak ?? 99;
      const blender = p.tahap === "blender";
      alir = blender ? 1 : p.fokus === "suntik" ? mulus(sejak / 3.5) : pelan(alir, 0, 3, dt);
      lepas = pelan(lepas, blender ? 1 : 0, 1.1, dt);
      fag.forEach((f, i) => {
        if (f.isi) {
          f.isi.scale.setScalar(Math.max(0.001, 1 - alir));
          f.isi.visible = alir < 0.98;
        }
        const arah = i - 1;
        f.grup.position.set(X[i] + arah * 3 * lepas, 1.95 + 3.2 * lepas + 0.04 * Math.sin(t * 2 + i), 1.4 * lepas * (i === 1 ? 1 : -0.5));
        f.grup.rotation.z = arah * 1.2 * lepas + (i === 1 ? 0.6 * lepas : 0);
        const m = suntikan[i];
        m.geometry.setDrawRange(0, Math.floor(jumlahIndeks * alir));
        m.visible = alir > 0.01;
      });
      bakteri.rotation.x = 0.05 * Math.sin(t * 0.7);
    },
  };
}

/* ================================================================== *
 * SENTRIFUS — pelet dan cairan
 * ================================================================== */

function setSentrifus(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const X = [-2.6, 2.6];
  const rak = new THREE.BoxGeometry(8.2, 0.5, 1.8);
  rak.translate(0, 0.25, 0);
  studio.tambah(studio.bagian("rak", RAK, { garis: 0.004 }), rak, grup);

  const bintang: THREE.Sprite[][] = [];
  X.forEach((x, i) => {
    const tab = new THREE.Group();
    tab.position.set(x, 0.5, 0);
    grup.add(tab);
    bangunTabung(studio, tab, { tinggi: 5.2, jari: 0.95, isi: 0.8, kerucut: true });

    /* pelet: bakteri yang berisi DNA fag, menumpuk di ujung kerucut */
    for (let k = 0; k < 7; k++) {
      const b = bangunEColi(studio, tab, 0.42, 0.16);
      b.position.set((acak() - 0.5) * 0.55, 0.35 + k * 0.1 + acak() * 0.15, (acak() - 0.5) * 0.4);
      b.rotation.set(acak() * 3, acak() * 3, acak() * 3);
      const d = studio.tambah(studio.bagian("dna", MOLEKUL.dna.warna, { garis: false }), potonganUntai(v(0, 0, 0), 0.3, acak, 0.035), tab, false);
      d.position.copy(b.position).add(v(0, 0.02, 0.12));
    }
    /* cairan: selubung fag yang kosong */
    for (let k = 0; k < 6; k++) {
      const f = bangunFag(studio, tab, { berisi: false, acak });
      f.grup.scale.setScalar(0.2);
      f.grup.position.set((acak() - 0.5) * 0.9, 2.2 + k * 0.33, (acak() - 0.5) * 0.7);
      f.grup.rotation.set(acak() * 3, acak() * 3, acak() * 3);
    }
    bintang.push(
      i === 0
        ? bintangPenanda(grup, v(x, 3.9, 0.3), v(0.7, 1.0, 0.4), 8, acak)
        : bintangPenanda(grup, v(x, 1.25, 0.3), v(0.35, 0.35, 0.35), 7, acak),
    );
    label(grup, i === 0 ? "³⁵S" : "³²P", 0.7, x, 6.5);
  });
  label(grup, "cairan", 0.46, -5.0, 3.9);
  label(grup, "pelet", 0.46, -4.6, 1.2);

  /* fag baru yang keluar dari bakteri ber-³²P */
  const ledakan = new THREE.Group();
  ledakan.position.set(7.8, 2.4, 0);
  grup.add(ledakan);
  bangunEColi(studio, ledakan, 1.6, 0.6);
  const anakFag: THREE.Group[] = [];
  for (let k = 0; k < 8; k++) {
    const f = bangunFag(studio, ledakan, { acak });
    f.grup.scale.setScalar(0.22);
    anakFag.push(f.grup);
  }
  const lBaru = label(grup, "fag baru", 0.46, 7.8, 5.0);
  grup.add(lantaiBayang(teksturBayang(), 18, 7, 0.01));

  const nilai = [0, 0];
  let baru = 0;

  return {
    grup,
    fokus: {
      utuh: lihat(0.8, 3, 0, 16, 0, 1.32),
      pelet: lihat(-2.6, 1.6, 0, 7.5, -0.1, 1.25),
      cairan: lihat(-2.6, 3.9, 0, 8, -0.1, 1.38),
      tabung1: lihat(X[0], 3.2, 0, 9.5, -0.1, 1.35),
      tabung2: lihat(X[1], 2.2, 0, 9.5, 0.1, 1.3),
      baru: lihat(5.6, 2.8, 0, 12.5, 0.2, 1.32),
      akhir: lihat(2.2, 3, 0, 20, 0, 1.32),
    },
    bayangan: { pusat: v(1, 0, 0), jangkauan: 10 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      const f = p.fokus ?? "utuh";
      const tahap = { tabung1: 1, tabung2: 2, baru: 3, akhir: 3 }[f] ?? 0;
      nilai[0] = pelan(nilai[0], tahap >= 1 ? 1 : 0, 3, dt);
      nilai[1] = pelan(nilai[1], tahap >= 2 ? 1 : 0, 3, dt);
      kelipkan(bintang[0], nilai[0], t);
      kelipkan(bintang[1], nilai[1], t);
      baru = pelan(baru, tahap >= 3 ? 1 : 0, 1.5, dt);
      ledakan.visible = baru > 0.02;
      ledakan.scale.setScalar(Math.max(0.001, 0.4 + 0.6 * baru));
      lBaru.visible = baru > 0.5;
      anakFag.forEach((g, k) => {
        const a = (k / anakFag.length) * Math.PI * 2 + t * 0.2;
        const r = 0.8 + 1.1 * baru;
        g.position.set(Math.cos(a) * r, Math.sin(a) * r * 0.8, 0.3 * Math.sin(a * 2));
        g.rotation.z = a - Math.PI / 2;
      });
    },
  };
}
