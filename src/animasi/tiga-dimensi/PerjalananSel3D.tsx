"use client";

import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { MarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";
import { SEL, ronaTerang } from "@/lib/warna";
import type { PropsAnimasi } from "../daftar";
import { Film3D, type Pembangun } from "./Film3D";
import { lihat, type Pandangan, type Studio } from "./studio";
import { bolaHalus, lantaiBayang, pembuatAcak, teksturBayang, teksturBintik } from "./bentuk";
import { bangunSelHewan } from "./model-sel-hewan";
import { bangunBakteri } from "./model-bakteri";
import { bangunDNA } from "./model-dna";
import { bangunSelMini } from "./model-sel-mini";

/**
 * PERJALANAN MEMPERBESAR — gambar pelajaran 0.2 (gaya 3D bergaris, §3).
 *
 * Satu perjalanan tanpa putus: tubuh yang tersusun dari sel → jaringan seperti
 * ubin → satu sel → sel yang membelah → bakteri di samping sel hewan →
 * perbandingan ukuran → inti → heliks DNA, lalu mundur lagi ke tubuh.
 * Setiap "set" dibangun sekali; kamera bergerak terus mengikuti waktu
 * pelajaran dan isyarat subtitel. Perpindahan set memakai tirai sambil kamera
 * terus maju (memperbesar) atau mundur (memperkecil).
 *
 * Benda yang bukan entitas warna.ts (tubuh, sel darah merah, rambut,
 * penggaris) memakai warna netral kertas, seperti gambar datarnya.
 */

/* Warna netral untuk benda tanpa entitas warna — sama dengan gambar datar. */
const NETRAL = "#d9d2c5";
const NETRAL_MUDA = "#e4dfd5";
const NETRAL_GELAP = "#c4b8a6";
const TINTA_LEMBUT = "#5c6878";

type Set3D = {
  grup: THREE.Group;
  fokus: Record<string, Pandangan>;
  bayangan: { pusat: THREE.Vector3; jangkauan: number };
  perbarui?: (p: PropsAnimasi, tahap: string) => void;
};

/** Tahap naskah → set yang tampil, sudut pandang awal, dan tingkat perbesaran. */
const TAHAP: Record<string, { set: string; fokus: string; tingkat: number }> = {
  tubuh: { set: "tubuh", fokus: "utuh", tingkat: 0 },
  jaringan: { set: "jaringan", fokus: "utuh", tingkat: 1 },
  gabus: { set: "gabus", fokus: "utuh", tingkat: 1 },
  sel: { set: "sel", fokus: "utuh", tingkat: 2 },
  "dua-sel": { set: "duaSel", fokus: "utuh", tingkat: 2 },
  prokariot: { set: "sel", fokus: "berdua", tingkat: 2 },
  skala: { set: "skala", fokus: "bakteri", tingkat: 2 },
  inti: { set: "sel", fokus: "inti", tingkat: 3 },
  dna: { set: "dna", fokus: "utuh", tingkat: 4 },
};

const bangun: Pembangun = (studio, baca) => {
  const acak = pembuatAcak(11);
  const semua: Record<string, Set3D> = {
    tubuh: setTubuh(studio, acak),
    jaringan: setJaringan(studio, acak),
    gabus: setGabus(studio, acak),
    sel: setSel(studio, acak),
    duaSel: setDuaSel(studio, acak),
    skala: setSkala(studio),
    dna: setDNA(studio),
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
    const s = semua[nama];
    studio.aturBayangan(s.bayangan.pusat, s.bayangan.jangkauan);
    setAktif = nama;
  };

  return () => {
    const p = baca();
    const namaTahap = p.tahap && TAHAP[p.tahap] ? p.tahap : "tubuh";
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
      tingkatAktif = info.tingkat;
      studio.tuju(pandangan, kunci);
    }

    if (setAktif) semua[setAktif].perbarui?.(p, namaTahap);
    return { sorot: p.sorot ?? [], detik: p.detik ?? 0 };
  };
};

export default function PerjalananSel3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}

/* ================================================================== *
 * SET 1 — TUBUH YANG TERSUSUN DARI SEL
 * Siluet manusia dari ribuan butir: tiap butir melambangkan sel. Satu
 * petak di lengan diberi warna membran sel — titik yang akan diperbesar.
 * ================================================================== */

type Kapsul = { a: THREE.Vector3; b: THREE.Vector3; r: number; pipih?: number };

function setTubuh(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  const tubuh: Kapsul[] = [
    { a: v(0, 23.3, 0), b: v(0, 23.4, 0.05), r: 1.85 },
    { a: v(0, 20.6, 0), b: v(0, 21.9, 0), r: 0.72 },
    { a: v(0, 16.4, 0), b: v(0, 19.1, 0), r: 2.6, pipih: 0.62 },
    { a: v(0, 12.3, 0), b: v(0, 15.6, 0), r: 2.3, pipih: 0.66 },
  ];
  for (const s of [-1, 1]) {
    tubuh.push(
      { a: v(2.75 * s, 19.35, 0), b: v(2.8 * s, 19.3, 0), r: 0.95 },
      { a: v(3.1 * s, 19.1, 0), b: v(3.85 * s, 14.9, 0.15), r: 0.8 },
      { a: v(3.85 * s, 14.9, 0.15), b: v(4.35 * s, 10.9, 0.7), r: 0.68 },
      { a: v(4.35 * s, 10.9, 0.7), b: v(4.5 * s, 9.5, 0.9), r: 0.55 },
      { a: v(1.25 * s, 12.0, 0), b: v(1.45 * s, 6.6, 0.1), r: 1.15 },
      { a: v(1.45 * s, 6.6, 0.1), b: v(1.55 * s, 1.3, -0.1), r: 0.85 },
      { a: v(1.55 * s, 0.55, -0.1), b: v(1.6 * s, 0.5, 1.35), r: 0.5 },
    );
  }

  /* petak kulit lengan yang akan diperbesar */
  const PETAK = v(4.12, 12.9, 1.12);
  const titik = titikPermukaan(tubuh, 0.5, acak);
  const matriks: THREE.Matrix4[][] = [[], [], []];
  const q = new THREE.Quaternion();
  for (const p of titik) {
    const s = 0.85 + acak() * 0.3;
    const m = new THREE.Matrix4().compose(p, q, new THREE.Vector3(s, s, s));
    if (p.distanceTo(PETAK) < 0.95) matriks[2].push(m);
    else matriks[acak() < 0.5 ? 0 : 1].push(m);
  }
  const butir = new THREE.SphereGeometry(0.27, 12, 9);
  studio.tambahBanyak(studio.bagian("tubuh", NETRAL, { garis: false }), butir, matriks[0], grup);
  studio.tambahBanyak(studio.bagian("tubuh", NETRAL_MUDA, { garis: false }), butir, matriks[1], grup);
  studio.tambahBanyak(studio.bagian(["tubuh", "membranSel"], SEL.membranSel.warna, { garis: false }), butir, matriks[2], grup);

  /* lingkaran penanda di sekeliling petak */
  const cincin = new THREE.TorusGeometry(1.3, 0.07, 10, 48);
  cincin.translate(PETAK.x, PETAK.y, PETAK.z + 0.25);
  studio.tambah(studio.bagian(["tubuh", "membranSel"], SEL.membranSel.warna, { garis: 0.004 }), cincin, grup, false);

  grup.add(lantaiBayang(teksturBayang(), 14, 8, -0.05));

  return {
    grup,
    fokus: {
      utuh: lihat(0, 12.6, 0, 54, 0, 1.3, "putar"),
      lengan: lihat(PETAK.x, PETAK.y, PETAK.z, 9, 0.35, 1.35),
    },
    bayangan: { pusat: v(0, 12, 0), jangkauan: 16 },
  };
}

/** Butir-butir tersebar merata di permukaan sekumpulan kapsul, tanpa saling menumpuk. */
function titikPermukaan(kapsul: Kapsul[], jarakMin: number, acak: () => number) {
  const hasil: THREE.Vector3[] = [];
  const kisi = new Map<string, THREE.Vector3[]>();
  const sel = (x: number) => Math.floor(x / jarakMin);
  const kunci = (a: number, b: number, c: number) => `${a},${b},${c}`;
  const terlaluDekat = (p: THREE.Vector3) => {
    const [cx, cy, cz] = [sel(p.x), sel(p.y), sel(p.z)];
    for (let i = -1; i <= 1; i++)
      for (let j = -1; j <= 1; j++)
        for (let k = -1; k <= 1; k++)
          for (const q of kisi.get(kunci(cx + i, cy + j, cz + k)) ?? []) if (q.distanceTo(p) < jarakMin) return true;
    return false;
  };
  const jarakRuas = (p: THREE.Vector3, k: Kapsul) => {
    const ab = k.b.clone().sub(k.a);
    const t = THREE.MathUtils.clamp(p.clone().sub(k.a).dot(ab) / Math.max(ab.lengthSq(), 1e-6), 0, 1);
    return p.distanceTo(k.a.clone().addScaledVector(ab, t));
  };

  for (const k of kapsul) {
    const sumbu = k.b.clone().sub(k.a);
    const L = sumbu.length();
    const arah = L > 1e-4 ? sumbu.clone().normalize() : new THREE.Vector3(0, 1, 0);
    const e1 = new THREE.Vector3(1, 0, 0).cross(arah);
    if (e1.lengthSq() < 1e-4) e1.set(0, 0, 1).cross(arah);
    e1.normalize();
    const e2 = arah.clone().cross(e1).normalize();
    const luas = 2 * Math.PI * k.r * L + 4 * Math.PI * k.r * k.r;
    const coba = Math.ceil((luas / (jarakMin * jarakMin)) * 2.4);
    const pusat = k.a.clone().add(k.b).multiplyScalar(0.5);
    for (let c = 0; c < coba; c++) {
      const u = acak() * (L + 2 * k.r) - k.r;
      let p: THREE.Vector3;
      if (u >= 0 && u <= L) {
        const t = acak() * Math.PI * 2;
        p = k.a
          .clone()
          .addScaledVector(arah, u)
          .addScaledVector(e1, Math.cos(t) * k.r)
          .addScaledVector(e2, Math.sin(t) * k.r);
      } else {
        const d = new THREE.Vector3(acak() * 2 - 1, acak() * 2 - 1, acak() * 2 - 1);
        if (d.lengthSq() > 1 || d.lengthSq() < 1e-4) continue;
        d.normalize();
        const ujung = u < 0 ? k.a : k.b;
        if ((u < 0 && d.dot(arah) > 0) || (u > L && d.dot(arah) < 0)) d.addScaledVector(arah, -2 * d.dot(arah));
        p = ujung.clone().addScaledVector(d, k.r);
      }
      if (k.pipih) p.z = pusat.z + (p.z - pusat.z) * k.pipih;
      if (kapsul.some((lain) => lain !== k && jarakRuas(p, lain) < lain.r * (lain.pipih ?? 1) * 0.97)) continue;
      if (terlaluDekat(p)) continue;
      hasil.push(p);
      const kk = kunci(sel(p.x), sel(p.y), sel(p.z));
      const daftar = kisi.get(kk);
      if (daftar) daftar.push(p);
      else kisi.set(kk, [p]);
    }
  }
  return hasil;
}

/* ================================================================== *
 * SET 2 — JARINGAN: sel-sel berjajar seperti ubin
 * Tiap ubin = satu sel yang dibelah: dinding membran biru, sitoplasma pucat,
 * dan kubah inti. Dinding dua ubin yang bersebelahan = dua membran.
 * ================================================================== */

const segienam = (r: number) => {
  const s = new THREE.Shape();
  for (let k = 0; k < 6; k++) {
    const a = Math.PI / 6 + (k * Math.PI) / 3;
    if (k === 0) s.moveTo(r * Math.cos(a), r * Math.sin(a));
    else s.lineTo(r * Math.cos(a), r * Math.sin(a));
  }
  s.closePath();
  return s;
};

/* ================================================================== *
 * SET 1b — IRISAN GABUS (Hooke, 1665)
 * Kamar-kamar kosong: yang dilihat Hooke hanyalah dinding sel mati, isinya
 * sudah hilang. Dinding memakai warna dindingSel dari warna.ts.
 * ================================================================== */

function setGabus(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const R = 1.35;
  const TINGGI = 2.3;
  const KOLOM = 12;
  const BARIS = 10;
  const sx = Math.sqrt(3) * R;
  const sz = 1.5 * R;
  const dinding: THREE.BufferGeometry[] = [];
  for (let b = 0; b < BARIS; b++) {
    for (let k = 0; k < KOLOM; k++) {
      const x = (k - (KOLOM - 1) / 2) * sx + (b % 2 ? sx / 2 : 0);
      const z = (b - (BARIS - 1) / 2) * sz;
      const tepi = (x / ((KOLOM / 2) * sx)) ** 2 + (z / ((BARIS / 2) * sz)) ** 2;
      if (tepi > 1.0 && acak() < 0.7) continue;
      /* gabus sungguhan tidak serapi sarang lebah: ukuran dan tebal dinding sedikit berbeda */
      const r = R * (0.95 + acak() * 0.08);
      const bentuk = segienam(r);
      bentuk.holes.push(segienam(r - (0.2 + acak() * 0.07)));
      const g = new THREE.ExtrudeGeometry(bentuk, { depth: TINGGI, bevelEnabled: false });
      g.rotateX(-Math.PI / 2);
      g.rotateY((acak() - 0.5) * 0.08);
      g.translate(x, -TINGGI, z);
      dinding.push(g);
    }
  }
  studio.tambah(studio.bagian("dindingSel", SEL.dindingSel.warna, { garis: 0.003 }), mergeGeometries(dinding), grup);
  /* dasar yang gelap di balik kamar kosong — tidak ada sitoplasma, tidak ada inti */
  const dasar = new THREE.CircleGeometry(KOLOM * sx * 0.56, 72);
  dasar.rotateX(-Math.PI / 2);
  dasar.translate(0, -TINGGI + 0.02, 0);
  studio.tambah(studio.bagian("dindingSel", NETRAL_GELAP, { garis: false }), dasar, grup, false);
  grup.add(lantaiBayang(teksturBayang(), 44, 34, -TINGGI - 0.05));

  return {
    grup,
    fokus: {
      utuh: lihat(0, -1, 0, 38, 0.25, 0.9, "putar"),
      dekat: lihat(sx / 2, -0.8, 0, 11, 0.3, 0.72),
    },
    bayangan: { pusat: new THREE.Vector3(0, -1, 0), jangkauan: 22 },
  };
}

function setJaringan(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const R = 1.5;
  const TINGGI = 2.2;
  const TEBAL = 0.16;
  const KOLOM = 13;
  const BARIS = 11;
  const sx = Math.sqrt(3) * R;
  const sz = 1.5 * R;

  const bentukDinding = segienam(R);
  bentukDinding.holes.push(segienam(R - TEBAL));
  const dindingDasar = new THREE.ExtrudeGeometry(bentukDinding, { depth: TINGGI, bevelEnabled: false });
  dindingDasar.rotateX(-Math.PI / 2);
  dindingDasar.translate(0, -TINGGI, 0);
  const atasDasar = new THREE.ShapeGeometry(segienam(R - TEBAL));
  atasDasar.rotateX(-Math.PI / 2);
  atasDasar.translate(0, -0.22, 0);

  const dinding: THREE.BufferGeometry[] = [];
  const atas: THREE.BufferGeometry[] = [];
  const inti: THREE.BufferGeometry[] = [];
  const nukleolus: THREE.BufferGeometry[] = [];
  for (let b = 0; b < BARIS; b++) {
    for (let k = 0; k < KOLOM; k++) {
      const x = (k - (KOLOM - 1) / 2) * sx + (b % 2 ? sx / 2 : 0);
      const z = (b - (BARIS - 1) / 2) * sz;
      /* tepi lembaran tidak lurus sempurna, seperti potongan jaringan */
      const tepi = (x / ((KOLOM / 2) * sx)) ** 2 + (z / ((BARIS / 2) * sz)) ** 2;
      if (tepi > 1.02 && acak() < 0.65) continue;
      dinding.push(dindingDasar.clone().translate(x, 0, z));
      atas.push(atasDasar.clone().translate(x, 0, z));
      const r = 0.55 + acak() * 0.14;
      const jx = (acak() - 0.5) * 0.5;
      const jz = (acak() - 0.5) * 0.5;
      inti.push(bolaHalus(r, 20, 14).translate(x + jx, -0.34, z + jz));
      nukleolus.push(bolaHalus(0.17, 10, 8).translate(x + jx - 0.12, -0.34 + r * 0.82, z + jz + 0.08));
    }
  }
  const bintik = teksturBintik(acak);
  bintik.repeat.set(0.6, 0.6);
  studio.tambah(studio.bagian("membranSel", SEL.membranSel.warna, { garis: 0.003 }), mergeGeometries(dinding), grup);
  studio.tambah(
    studio.bagian("sitoplasma", SEL.sitoplasma.warna, { peta: bintik, garis: false }),
    mergeGeometries(atas),
    grup,
    false,
  );
  studio.tambah(studio.bagian(["inti", "membranInti"], SEL.membranInti.warna, { garis: 0.003 }), mergeGeometries(inti), grup);
  studio.tambah(studio.bagian(["inti", "nukleolus"], SEL.nukleolus.warna, { garis: false }), mergeGeometries(nukleolus), grup, false);
  grup.add(lantaiBayang(teksturBayang(), 46, 36, -TINGGI - 0.05));

  return {
    grup,
    fokus: {
      utuh: lihat(0, -1, 0, 40, 0.25, 0.9, "putar"),
      ubin: lihat(sx / 2, -0.3, 0, 10, 0.3, 0.72),
    },
    bayangan: { pusat: new THREE.Vector3(0, -1, 0), jangkauan: 22 },
  };
}

/* ================================================================== *
 * SET 3 — SEL HEWAN (juga untuk "inti" dan "prokariot")
 * Bakteri diletakkan di samping sel dengan skala sebenarnya (± 10 kali
 * lebih kecil), dan hanya tampil di adegan prokariot.
 * ================================================================== */

function setSel(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const { fokus } = bangunSelHewan(studio, grup, acak);
  const bakteri = new THREE.Group();
  bakteri.position.set(20.5, 3.4, 8.5);
  bakteri.rotation.y = -0.35;
  grup.add(bakteri);
  bangunBakteri(studio, bakteri, acak);

  return {
    grup,
    fokus: {
      ...fokus,
      bakteri: lihat(20.2, 3.4, 8.6, 7.5, 0.2, 0.95),
      berdua: lihat(8, 0, 4, 64, 0.28, 1.0),
      eukariot: lihat(-4.2, 2.8, -1.2, 36, 0.07, 0.95),
    },
    bayangan: { pusat: new THREE.Vector3(3, 0, 2), jangkauan: 26 },
    perbarui: (_p, tahap) => {
      bakteri.visible = tahap === "prokariot";
    },
  };
}

/* ================================================================== *
 * SET 4 — SATU SEL MENJADI DUA
 * Membran digambar sebagai permukaan cair (marching cubes) supaya lekukan
 * saat membelah terlihat mulus. Pembelahan berjalan mengikuti waktu sejak
 * isyarat "membelah", jadi ikut berhenti saat pelajaran dijeda.
 * ================================================================== */

function setDuaSel(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const SKALA = 8;
  const membran = studio.bagian("membranSel", ronaTerang(SEL.membranSel.warna, 0.3), { tembus: 0.5, garis: 0.004 });
  const permukaan = new MarchingCubes(44, membran.bahan, false, false, 40000);
  permukaan.scale.setScalar(SKALA);
  permukaan.castShadow = false;
  grup.add(permukaan);

  const bahanInti = studio.bagian(["inti", "membranInti"], SEL.membranInti.warna);
  const intiKiri = studio.tambah(bahanInti, bolaHalus(1.45, 32, 24), grup);
  const intiKanan = studio.tambah(bahanInti, bolaHalus(1.45, 32, 24), grup);
  const bahanNukleolus = studio.bagian(["inti", "nukleolus"], SEL.nukleolus.warna, { garis: false });
  const nukKiri = studio.tambah(bahanNukleolus, bolaHalus(0.42, 16, 12), grup);
  const nukKanan = studio.tambah(bahanNukleolus, bolaHalus(0.42, 16, 12), grup);

  const bahanMito = studio.bagian("mitokondria", SEL.mitokondria.warna, { garis: 0.003 });
  const mito: { mesh: THREE.Mesh; dasar: THREE.Vector3; sisi: number }[] = [];
  for (let i = 0; i < 10; i++) {
    const g = new THREE.CapsuleGeometry(0.3, 0.75, 8, 16);
    g.rotateZ(Math.PI / 2);
    const mesh = studio.tambah(bahanMito, g, grup);
    const sudut = acak() * Math.PI * 2;
    const jari = 2.2 + acak() * 1.2;
    const dasar = new THREE.Vector3(Math.cos(sudut) * jari, (acak() - 0.5) * 2.2, Math.sin(sudut) * jari);
    mesh.rotation.set(acak() * 3, acak() * 3, acak() * 3);
    mito.push({ mesh, dasar, sisi: dasar.x < 0 ? -1 : 1 });
  }
  grup.add(lantaiBayang(teksturBayang(), 26, 18, -5.2));

  let terakhir = -1;
  const halus = (a: number, b: number, x: number) => {
    const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };
  const gambarPembelahan = (p: number) => {
    if (Math.abs(p - terakhir) < 0.002) return;
    terakhir = p;
    const d = 0.19 * halus(0.05, 1, p);
    /* dua bola yang semula berimpit, lalu menjauh: lekukan di tengah lahir sendiri */
    const kuat = THREE.MathUtils.lerp(0.29 ** 2 * 92 * 0.5, 0.235 ** 2 * 92, halus(0, 0.6, p));
    permukaan.reset();
    permukaan.addBall(0.5 - d, 0.5, 0.5, kuat, 12);
    permukaan.addBall(0.5 + d, 0.5, 0.5, kuat, 12);
    permukaan.update();
    const geserInti = 2 * d * SKALA * halus(0.15, 0.85, p);
    intiKiri.position.x = -geserInti;
    intiKanan.position.x = geserInti;
    nukKiri.position.set(-geserInti - 0.3, 0.6, 0.5);
    nukKanan.position.set(geserInti - 0.3, 0.6, 0.5);
    const geserSel = 2 * d * SKALA;
    for (const m of mito) {
      m.mesh.position.copy(m.dasar);
      m.mesh.position.x = m.dasar.x * (1 - 0.35 * halus(0, 1, p)) + m.sisi * geserSel;
    }
  };
  gambarPembelahan(0);

  return {
    grup,
    fokus: { utuh: lihat(0, 0, 0, 38, 0, 1.1, "putar") },
    bayangan: { pusat: new THREE.Vector3(0, 0, 0), jangkauan: 16 },
    perbarui: (p) => {
      const t = p.fokus === "membelah" ? (p.sejak ?? 0) / 5.5 : 0;
      gambarPembelahan(THREE.MathUtils.clamp(t, 0, 1));
    },
  };
}

/* ================================================================== *
 * SET 5 — SEBERAPA KECIL? Semua sesuai skala: 1 µm = 0,3 satuan.
 * bakteri 2 µm · sel darah merah 8 µm · sel hewan 20 µm · rambut 80 µm
 * ================================================================== */

function setSkala(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const UM = 0.3;
  const netral = studio.bagian("pembanding", NETRAL, { garis: 0.004 });
  const tinta = studio.bagian("pembanding", TINTA_LEMBUT, { garis: false });

  /* bakteri 2 µm */
  const bakteri = new THREE.Group();
  bakteri.position.set(-14, 0.2, 0);
  bakteri.rotation.y = 0.5;
  bakteri.scale.setScalar((2 * UM) / 3.44);
  grup.add(bakteri);
  bangunBakteri(studio, bakteri, pembuatAcak(5));

  /* sel darah merah 8 µm: cakram cekung di kedua sisi, berdiri miring */
  /* profil dari bawah ke atas, supaya permukaan hasil putaran menghadap ke luar */
  const profil = [
    [0.001, -0.1],
    [0.3, -0.13],
    [0.52, -0.21],
    [0.72, -0.27],
    [0.87, -0.25],
    [0.96, -0.15],
    [1.0, 0.0],
    [0.96, 0.15],
    [0.87, 0.25],
    [0.72, 0.27],
    [0.52, 0.21],
    [0.3, 0.13],
    [0.001, 0.1],
  ].map(([x, y]) => new THREE.Vector2(x * 4 * UM, y * 4 * UM));
  const lengkung = new THREE.SplineCurve(profil).getPoints(60);
  const darahMerah = new THREE.LatheGeometry(lengkung, 64);
  darahMerah.rotateX(Math.PI / 2 - 0.5);
  darahMerah.translate(-10.5, 4 * UM, 0);
  studio.tambah(netral, darahMerah, grup);

  /* sel hewan 20 µm */
  const selHewan = new THREE.Group();
  selHewan.position.set(-3.2, 10 * UM, 0);
  grup.add(selHewan);
  bangunSelMini(studio, selHewan, 10 * UM);

  /* rambut 80 µm: batang besar di belakang, bersisik halus */
  const R_RAMBUT = 40 * UM;
  const sisik = teksturSisik();
  sisik.repeat.set(10, 5);
  const bahanRambut = studio.bagian("pembanding", NETRAL_GELAP, { timbul: sisik, garis: 0.003 });
  const rambut = new THREE.CylinderGeometry(R_RAMBUT, R_RAMBUT, 34, 96, 1, false);
  rambut.translate(16, 17, -10);
  studio.tambah(bahanRambut, rambut, grup);

  /* empat sel hewan berjajar selebar rambut — muncul saat disebut */
  const barisan = new THREE.Group();
  grup.add(barisan);
  for (let i = 0; i < 4; i++) {
    const s = new THREE.Group();
    s.position.set(16 - R_RAMBUT + 10 * UM + i * 20 * UM, 10 * UM, 5.5);
    barisan.add(s);
    bangunSelMini(studio, s, 10 * UM);
  }

  /* penggaris: garis dengan tanda tiap 10 µm */
  const garis: THREE.BufferGeometry[] = [new THREE.BoxGeometry(46, 0.05, 0.08).translate(7, 0.03, 3.4)];
  for (let x = -16; x <= 30; x += 10 * UM) garis.push(new THREE.BoxGeometry(0.06, 0.05, 0.5).translate(x, 0.03, 3.4));
  studio.tambah(tinta, mergeGeometries(garis), grup, false);

  const bayang = teksturBayang();
  for (const [x, z, lebar] of [
    [-14, 0, 1.2],
    [-10.5, 0, 3],
    [-3.2, 0, 7.5],
  ]) {
    const m = lantaiBayang(bayang, lebar, lebar * 0.7, 0.01);
    m.position.x = x;
    m.position.z = z;
    grup.add(m);
  }

  return {
    grup,
    fokus: {
      bakteri: lihat(-14, 0.35, 0, 4.2, 0.2, 1.2),
      darahMerah: lihat(-11.8, 0.9, 0, 9, 0.2, 1.2),
      selHewan: lihat(-7.5, 2, 0, 19, 0.2, 1.18),
      rambut: lihat(8.5, 8, -2, 72, 0.3, 1.2),
      empatSel: lihat(16, 3.5, 3, 40, 0.1, 1.15),
    },
    bayangan: { pusat: new THREE.Vector3(7, 4, -3), jangkauan: 28 },
    perbarui: (p) => {
      barisan.visible = p.fokus === "empatSel";
    },
  };
}

/** Sisik kutikula rambut: garis-garis melengkung yang saling menumpuk. */
function teksturSisik() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  if (g) {
    g.fillStyle = "#808080";
    g.fillRect(0, 0, 128, 128);
    g.strokeStyle = "rgba(0,0,0,0.5)";
    g.lineWidth = 3;
    for (let y = 0; y < 128; y += 32) {
      for (let x = -16; x < 144; x += 32) {
        g.beginPath();
        g.arc(x + (y % 64 ? 16 : 0), y, 18, 0.15 * Math.PI, 0.85 * Math.PI);
        g.stroke();
      }
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/* ================================================================== *
 * SET 6 — HELIKS GANDA DNA (1 satuan = 1 nm)
 * ================================================================== */

function setDNA(studio: Studio): Set3D {
  const grup = new THREE.Group();
  bangunDNA(studio, grup, "ATGCGTACCTAGGCATTACGGATCCGTAAGCTTGACTAGC");
  grup.rotation.z = 0.35;
  return {
    grup,
    fokus: { utuh: lihat(0, 0, 0, 21, 0, 1.25, "putar") },
    bayangan: { pusat: new THREE.Vector3(0, 0, 0), jangkauan: 10 },
  };
}

