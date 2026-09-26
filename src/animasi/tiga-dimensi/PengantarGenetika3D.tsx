"use client";

import * as THREE from "three";
import { MOLEKUL } from "@/lib/warna";
import type { PropsAnimasi } from "../daftar";
import { Film3D, type Pembangun } from "./Film3D";
import { lihat, type Pandangan, type Studio } from "./studio";
import { bolaHalus, lantaiBayang, pembuatAcak, tabung, teksturBayang } from "./bentuk";
import { bangunDNA } from "./model-dna";
import { bangunKromosom } from "./model-kromosom";
import { bangunSelMini } from "./model-sel-mini";
import { bangunBolaSel } from "./model-bola-sel";
import { buatLabel } from "./label3d";
import { bangunSosok, type Sosok } from "./model-sosok";

/**
 * PENGANTAR GENETIKA — film pelajaran 0.1 "Apa itu genetika?" (gaya 3D bergaris, §3).
 *
 * Empat set:
 *  - keluarga: ayah, ibu, dua anak — rambut anak-anak mewarisi campuran sifat
 *    orang tuanya, tetapi tidak ada yang sama persis (pewarisan dan variasi);
 *  - pertanyaan: tiga alas dengan DNA, sel, dan sepasang kromosom;
 *  - garis waktu: jalan setapak 1866 → 1900 → 1902 → 1944–1952 → 1953 yang
 *    disusuri kamera tahun demi tahun, mengikuti narasi;
 *  - cabang: pohon genetika klasik, molekuler, dan populasi, berbuah manfaat.
 *
 * Benda yang bukan entitas biologi (orang, tanaman, buku, pohon) memakai warna
 * netral dan warna alam yang redup, supaya tidak tertukar dengan Peta Warna.
 */

const NETRAL = "#d9d2c5";
const NETRAL_MUDA = "#e4dfd5";
const NETRAL_GELAP = "#c4b8a6";
const BAJU_IBU = "#cbbfae";
const RAMBUT_GELAP = "#3b302b";
const RAMBUT_TERANG = "#9d6e4c";
const DAUN = "#93b171";
const DAUN_TUA = "#6f8f52";
const POLONG = "#a3c46e";
const ERCIS_KUNING = "#e2c14e";
const ERCIS_HIJAU = "#95bd57";
const BUNGA = "#f6f1e7";
const KAYU = "#a88b6d";
const KERTAS = "#f7f2e8";
const BUAH = "#d8ae78";

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

type Set3D = {
  grup: THREE.Group;
  fokus: Record<string, Pandangan>;
  bayangan: { pusat: THREE.Vector3; jangkauan: number };
  perbarui?: (p: PropsAnimasi, dt: number) => void;
};

const TAHAP_SET: Record<string, string> = {
  keluarga: "keluarga",
  pertanyaan: "pertanyaan",
  "garis-waktu": "waktu",
  cabang: "cabang",
};

const bangun: Pembangun = (studio, baca) => {
  const acak = pembuatAcak(23);
  const semua: Record<string, Set3D> = {
    keluarga: setKeluarga(studio, acak),
    pertanyaan: setPertanyaan(studio),
    waktu: setGarisWaktu(studio, acak),
    cabang: setCabang(studio, acak),
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
    const namaSet = TAHAP_SET[p.tahap ?? "keluarga"] ?? "keluarga";
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

export default function PengantarGenetika3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}

/* ================================================================== *
 * KELUARGA — mirip, tapi tidak sama
 * ================================================================== */

function setKeluarga(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  /* Ayah berambut gelap ikal, ibu berambut terang lurus. Anak pertama: ikal
     seperti ayah tapi terang seperti ibu; anak kedua: gelap seperti ayah tapi
     lurus seperti ibu — mirip keduanya, tidak sama dengan siapa pun. */
  const anggota: Sosok[] = [
    { entitas: "ayah", label: "Ayah", x: -3.5, tinggi: 1.12, rambut: RAMBUT_GELAP, keriting: true, baju: NETRAL_GELAP },
    { entitas: "ibu", label: "Ibu", x: -1.15, tinggi: 1.03, rambut: RAMBUT_TERANG, keriting: false, panjang: true, baju: BAJU_IBU },
    { entitas: "anak1", label: "Anak", x: 1.25, tinggi: 0.8, rambut: RAMBUT_TERANG, keriting: true, baju: NETRAL_MUDA },
    { entitas: "anak2", label: "Anak", x: 3.25, tinggi: 0.68, rambut: RAMBUT_GELAP, keriting: false, baju: NETRAL },
  ];
  const sosok = anggota.map((a) => bangunSosok(studio, grup, a, acak));
  grup.add(lantaiBayang(teksturBayang(), 15, 7, 0.01));

  /* penutup: bola sel muncul melayang di atas keluarga — "jawabannya ada di dalam sel" */
  const bola = bangunBolaSel(studio, grup, acak);
  bola.grup.visible = false;
  let skalaBola = 0;

  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.3, 0, 17, 0, 1.3),
      mirip: lihat(-1.2, 2.6, 0, 13, -0.12, 1.3),
      saudara: lihat(2.2, 1.8, 0, 9.5, 0.18, 1.32),
      sel: lihat(0.3, 4.6, 0, 21, 0, 1.24),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 8 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      sosok.forEach((g, i) => {
        g.position.y = 0.035 * Math.sin(t * 1.5 + i * 1.3);
        g.rotation.y = 0.07 * Math.sin(t * 0.6 + i * 0.9);
      });
      const sasaran = p.fokus === "sel" ? 0.17 : 0;
      skalaBola += (sasaran - skalaBola) * (1 - Math.exp(-dt * 2.2));
      bola.grup.visible = skalaBola > 0.004;
      if (bola.grup.visible) {
        bola.grup.scale.setScalar(skalaBola);
        bola.grup.position.set(0.2, 7.3 + 0.15 * Math.sin(t * 1.3), 0);
        bola.grup.rotation.y = 0.35 + t * 0.25;
        bola.ikuti();
      }
    },
  };
}

/* ================================================================== *
 * TIGA PERTANYAAN
 * ================================================================== */

function alas(studio: Studio, induk: THREE.Object3D, x: number, z = 0) {
  const g = new THREE.CylinderGeometry(2.1, 2.35, 0.55, 48);
  g.translate(x, 0.275, z);
  studio.tambah(studio.bagian("alas", NETRAL_MUDA, { garis: 0.004 }), g, induk);
}

function setPertanyaan(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const X = [-7.5, 0, 7.5];
  X.forEach((x) => alas(studio, grup, x));

  // 1 — bahan yang diwariskan: sepotong DNA
  const dna = new THREE.Group();
  dna.position.set(X[0], 3.7, 0);
  grup.add(dna);
  bangunDNA(studio, dna, "ATGCGTACGTTAGCCA");

  // 2 — cara bekerja: sel yang sibuk membuat protein
  const sel = new THREE.Group();
  sel.position.set(X[1], 2.6, 0);
  grup.add(sel);
  bangunSelMini(studio, sel, 2.3);
  const bProtein = studio.bagian("protein", MOLEKUL.protein.warna, { garis: 0.003 });
  const protein = [0, 1, 2, 3, 4].map((i) => {
    const m = studio.tambah(bProtein, bolaHalus(0.22 + (i % 2) * 0.06, 16, 12), grup);
    return m;
  });

  // 3 — cara diteruskan: sepasang kromosom, satu dari ibu dan satu dari ayah
  const kromosom = (["kromatin", "kromosomAyah"] as const).map((asal, i) => {
    const g = new THREE.Group();
    g.position.set(X[2] + (i === 0 ? -0.8 : 0.8), 3.2, 0);
    grup.add(g);
    bangunKromosom(studio, g, { p: 1.0, q: 1.7, jari: 0.42, asal });
    return g;
  });

  const tanya = ["Apa yang diwariskan?", "Bagaimana ia bekerja?", "Bagaimana ia diteruskan?"];
  tanya.forEach((teks, i) => {
    const l = buatLabel(teks, 0.62);
    l.position.set(X[i], 6.9, 0);
    grup.add(l);
  });
  grup.add(lantaiBayang(teksturBayang(), 30, 10, 0.01));

  return {
    grup,
    fokus: {
      utuh: lihat(0, 3, 0, 32, 0, 1.3),
      bahan: lihat(X[0], 3.6, 0, 14, -0.2, 1.28),
      kerja: lihat(X[1], 3.3, 0, 13, 0, 1.2),
      teruskan: lihat(X[2], 3.4, 0, 13, 0.2, 1.28),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 14 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      dna.rotation.y = t * 0.5;
      protein.forEach((m, i) => {
        const a = t * 0.7 + (i / protein.length) * Math.PI * 2;
        m.position.set(X[1] + Math.cos(a) * 3.1, 2.9 + 0.5 * Math.sin(a * 2 + i), Math.sin(a) * 3.1);
      });
      kromosom.forEach((g, i) => {
        g.position.y = 3.2 + 0.12 * Math.sin(t * 1.2 + i * Math.PI);
      });
    },
  };
}

/* ================================================================== *
 * GARIS WAKTU 1866 → 1953
 * ================================================================== */

const LANGKAH_TAHUN = 15;
const zJalan = (x: number) => 1.6 * Math.sin(x / 11);

/** Tanaman kacang ercis: batang, daun, sulur, bunga, dan polong berisi biji kuning dan hijau. */
function bangunErcis(studio: Studio, induk: THREE.Object3D, acak: () => number) {
  const { bagian, tambah } = studio;
  const hijau = bagian("tanaman", DAUN_TUA, { garis: 0.003 });
  const daun = bagian("tanaman", DAUN, { garis: 0.003 });
  tambah(hijau, tabung([v(0, 0, 0), v(0.18, 1.4, 0.1), v(-0.12, 2.8, 0), v(0.12, 4.2, -0.1), v(0, 5.3, 0)], 0.1, 60, 8), induk);

  for (const [y, arah] of [
    [1.2, 0.3],
    [2.2, 1.9],
    [3.2, 0.9],
    [4.2, 2.6],
  ] as const) {
    for (const sisi of [-1, 1]) {
      const g = bolaHalus(0.55, 20, 14);
      g.scale(1, 0.16, 0.62);
      g.translate(sisi * 0.62, 0, 0);
      g.rotateY(arah);
      g.translate(0, y, 0);
      tambah(daun, g, induk);
    }
  }
  /* sulur: pegas yang mengecil */
  for (const [y, arah] of [
    [4.6, 0.5],
    [3.7, 2.4],
  ] as const) {
    const titik: THREE.Vector3[] = [];
    for (let i = 0; i <= 30; i++) {
      const f = i / 30;
      const r = 0.35 * (1 - f * 0.7);
      const a = f * Math.PI * 5;
      titik.push(v(0.4 + f * 1.1 + r * Math.cos(a), y + f * 0.5 + r * Math.sin(a), r * Math.sin(a) * 0.4).applyAxisAngle(v(0, 1, 0), arah));
    }
    tambah(hijau, tabung(titik, 0.035, 60, 5), induk, false);
  }
  /* bunga putih di puncak */
  const bunga = bagian("tanaman", BUNGA, { garis: 0.003 });
  for (const [x, y, z] of [
    [0.1, 5.55, 0.1],
    [-0.5, 4.9, 0.3],
  ] as const) {
    for (let k = 0; k < 3; k++) {
      const g = bolaHalus(0.3, 16, 12);
      g.scale(1, 0.55, 0.35);
      g.rotateZ((k - 1) * 0.9);
      g.translate(x, y, z);
      tambah(bunga, g, induk);
    }
  }
  /* polong: satu terbuka memperlihatkan biji kuning dan hijau — satu tanaman, keturunan yang beragam */
  const polong = bagian("tanaman", POLONG, { garis: 0.003 });
  const pod = (x: number, y: number, sudut: number, terbuka: boolean) => {
    const g = new THREE.Group();
    g.position.set(x, y, 0.35);
    g.rotation.z = sudut;
    induk.add(g);
    const kulit = new THREE.CapsuleGeometry(0.3, 1.6, 8, 18);
    kulit.scale(1, 1, terbuka ? 0.5 : 0.75);
    if (terbuka) kulit.translate(0, 0, -0.12);
    tambah(polong, kulit, g);
    if (!terbuka) return;
    for (let i = 0; i < 5; i++) {
      const kuning = acak() < 0.6;
      const b = bolaHalus(0.22, 16, 12);
      b.translate(0, -0.72 + i * 0.36, 0.12);
      tambah(bagian("ercis", kuning ? ERCIS_KUNING : ERCIS_HIJAU, { garis: 0.003 }), b, g);
    }
  };
  pod(0.55, 2.7, -0.5, true);
  pod(-0.6, 3.6, 0.6, false);
}

/** Buku terbuka: karya Mendel yang ditemukan kembali. */
function bangunBuku(studio: Studio, induk: THREE.Object3D) {
  const { bagian, tambah } = studio;
  const sampul = bagian("buku", NETRAL_GELAP, { garis: 0.004 });
  const kertas = bagian("buku", KERTAS, { garis: 0.004 });
  const tulisan = bagian("buku", "#b3a893", { garis: false });
  const alasBuku = new THREE.BoxGeometry(4.6, 0.1, 3.2);
  alasBuku.translate(0, 0.05, 0);
  tambah(sampul, alasBuku, induk);
  for (const sisi of [-1, 1]) {
    const halaman = new THREE.BoxGeometry(2.15, 0.16, 2.95);
    halaman.rotateZ(-sisi * 0.1);
    halaman.translate(sisi * 1.12, 0.2, 0);
    tambah(kertas, halaman, induk);
    for (let b = 0; b < 6; b++) {
      const baris = new THREE.BoxGeometry(1.5, 0.02, 0.09);
      baris.rotateZ(-sisi * 0.1);
      baris.translate(sisi * 1.12, 0.29 + sisi * -0.0, -1.0 + b * 0.38);
      tambah(tulisan, baris, induk, false);
    }
  }
  /* polong ercis di atas halaman kanan */
  const polong = new THREE.CapsuleGeometry(0.26, 1.4, 8, 16);
  polong.rotateZ(Math.PI / 2);
  polong.rotateY(0.5);
  polong.translate(1.2, 0.55, 0.2);
  tambah(bagian("tanaman", POLONG, { garis: 0.003 }), polong, induk);
}

function setGarisWaktu(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const TAHUN = ["1866", "1900", "1902", "1944–1952", "1953"];
  const xTahun = TAHUN.map((_, i) => i * LANGKAH_TAHUN);
  const titikTahun = xTahun.map((x) => v(x, 0, zJalan(x)));

  /* jalan setapak berkelok */
  const jalan: THREE.Vector3[] = [];
  for (let x = -8; x <= xTahun[4] + 8; x += 2) jalan.push(v(x, 0.06, zJalan(x)));
  studio.tambah(studio.bagian("jalan", NETRAL, { garis: false }), tabung(jalan, 0.9, 200, 4), grup, false);

  titikTahun.forEach((t, i) => {
    alas(studio, grup, t.x, t.z);
    const l = buatLabel(TAHUN[i], 1.05);
    l.position.set(t.x, 0.9, t.z + 3.4);
    grup.add(l);
  });

  const letakkan = (i: number, y = 0.55) => {
    const g = new THREE.Group();
    g.position.set(titikTahun[i].x, y, titikTahun[i].z);
    grup.add(g);
    return g;
  };
  const keterangan = (i: number, teks: string, y: number, dx = 0) => {
    const l = buatLabel(teks, 0.55);
    l.position.set(titikTahun[i].x + dx, y, titikTahun[i].z);
    grup.add(l);
  };

  // 1866 — kebun Mendel
  bangunErcis(studio, letakkan(0), acak);
  keterangan(0, "kacang ercis", 6.6);

  // 1900 — karyanya ditemukan kembali
  bangunBuku(studio, letakkan(1));
  keterangan(1, "karya Mendel", 2.6);

  // 1902 — gen di kromosom
  const pasangan = (["kromatin", "kromosomAyah"] as const).map((asal, k) => {
    const g = letakkan(2, 3.3);
    g.position.x += k === 0 ? -0.8 : 0.8;
    bangunKromosom(studio, g, { p: 1.0, q: 1.75, jari: 0.42, asal });
    return g;
  });
  keterangan(2, "kromosom", 6.3);

  // 1944–1952 — DNA atau protein?
  const dnaPendek = letakkan(3, 3.1);
  dnaPendek.position.x -= 1.0;
  bangunDNA(studio, dnaPendek, "GATTACAGCT");
  const bProtein = studio.bagian("protein", MOLEKUL.protein.warna, { garis: 0.003 });
  for (const [dx, dy, dz, r] of [
    [1.3, 1.6, 0.3, 0.62],
    [1.9, 2.5, -0.4, 0.5],
    [1.1, 3.3, 0.5, 0.56],
    [2.1, 3.9, 0.1, 0.44],
    [1.5, 4.6, -0.3, 0.5],
  ]) {
    const g = bolaHalus(r, 22, 16);
    g.translate(titikTahun[3].x + dx, dy, titikTahun[3].z + dz);
    studio.tambah(bProtein, g, grup);
  }
  keterangan(3, "DNA", 5.4, -1.0);
  keterangan(3, "protein", 5.6, 1.7);

  // 1953 — heliks ganda
  const heliks = letakkan(4, 5.6);
  bangunDNA(studio, heliks, "ATGCGTACCGATTAGCATGCAATCGGCTAA");
  keterangan(4, "heliks ganda", 11.3);

  /* bayangan lantai per tonggak — satu bidang panjang membuat teksturnya melar jadi pita gelap */
  const bayang = teksturBayang();
  for (const t of titikTahun) {
    const lantai = lantaiBayang(bayang, 8, 7, 0.02);
    lantai.position.x = t.x;
    lantai.position.z = t.z;
    grup.add(lantai);
  }

  const dekat = (i: number, y: number, jarak: number) =>
    lihat(titikTahun[i].x, y, titikTahun[i].z, jarak, 0.22, 1.22);
  return {
    grup,
    fokus: {
      utuh: lihat(xTahun[2], 3, 0, 80, 0.32, 1.15),
      awal: lihat(xTahun[0] + 6, 3, 0, 34, 0.45, 1.18),
      "1866": dekat(0, 3.0, 15),
      "1900": dekat(1, 1.6, 12),
      "1902": dekat(2, 3.2, 13),
      "1944": dekat(3, 3.1, 15),
      "1953": dekat(4, 4.6, 25),
      semua: lihat(xTahun[2], 3, 0, 80, 0.32, 1.15),
    },
    bayangan: { pusat: v(xTahun[2], 0, 0), jangkauan: 40 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      heliks.rotation.y = t * 0.45;
      dnaPendek.rotation.y = t * 0.5;
      pasangan.forEach((g, k) => {
        g.position.y = 3.3 + 0.1 * Math.sin(t * 1.1 + k * Math.PI);
      });
    },
  };
}

/* ================================================================== *
 * POHON CABANG GENETIKA
 * ================================================================== */

function setCabang(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const { bagian, tambah } = studio;
  const batang = bagian("batangPohon", KAYU, { garis: 0.004 });
  tambah(batang, tabung([v(0, 0, 0), v(0.15, 2, 0), v(-0.1, 4, 0), v(0, 5.4, 0)], 0.62, 60, 14), grup);

  const CABANG = [
    { entitas: "cabangKlasik", teks: "Genetika klasik", ujung: v(-5.2, 9.2, 0.6), tengah: v(-2.4, 6.9, 0.2) },
    { entitas: "cabangMolekuler", teks: "Genetika molekuler", ujung: v(0.2, 10.8, -0.6), tengah: v(0.1, 8.2, -0.2) },
    { entitas: "cabangPopulasi", teks: "Genetika populasi", ujung: v(5.2, 9.2, 0.6), tengah: v(2.4, 6.9, 0.2) },
  ];
  const tajuk: THREE.Group[] = [];
  for (const c of CABANG) {
    tambah(bagian(["batangPohon", c.entitas], KAYU, { garis: 0.004 }), tabung([v(0, 5.2, 0), c.tengah, c.ujung], 0.32, 40, 10), grup);
    const g = new THREE.Group();
    g.position.copy(c.ujung);
    grup.add(g);
    tajuk.push(g);
    for (let i = 0; i < 9; i++) {
      const r = 0.9 + acak() * 0.5;
      const b = bolaHalus(r, 20, 14);
      b.translate((acak() - 0.5) * 2.6, (acak() - 0.3) * 1.6, (acak() - 0.5) * 2.2);
      tambah(bagian(c.entitas, i % 3 === 0 ? DAUN_TUA : DAUN, { garis: 0.003 }), b, g);
    }
    const l = buatLabel(c.teks, 0.72);
    l.position.copy(c.ujung).add(v(0, 2.3, 0));
    grup.add(l);
  }

  /* buah: manfaat genetika */
  const MANFAAT = [
    { teks: "Kedokteran", posisi: v(-4.0, 7.2, 1.6) },
    { teks: "Pertanian", posisi: v(-1.4, 8.4, 1.8) },
    { teks: "Forensik", posisi: v(1.6, 8.4, 1.8) },
    { teks: "Pelestarian", posisi: v(4.1, 7.2, 1.6) },
  ];
  const buah = bagian("manfaat", BUAH, { garis: 0.004 });
  for (const m of MANFAAT) {
    const b = bolaHalus(0.42, 20, 14);
    b.translate(m.posisi.x, m.posisi.y, m.posisi.z);
    tambah(buah, b, grup);
    const l = buatLabel(m.teks, 0.5);
    l.position.copy(m.posisi).add(v(0, -0.85, 0.3));
    grup.add(l);
  }
  grup.add(lantaiBayang(teksturBayang(), 16, 10, 0.01));

  return {
    grup,
    fokus: {
      utuh: lihat(0, 6.4, 0, 31, 0, 1.3),
      klasik: lihat(-5.2, 8.8, 0.6, 15, -0.3, 1.25),
      molekuler: lihat(0.2, 10.2, -0.6, 15, 0, 1.25),
      populasi: lihat(5.2, 8.8, 0.6, 15, 0.3, 1.25),
      manfaat: lihat(0, 7.6, 0.8, 19, 0, 1.3),
    },
    bayangan: { pusat: v(0, 4, 0), jangkauan: 12 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      tajuk.forEach((g, i) => {
        g.rotation.z = 0.03 * Math.sin(t * 0.9 + i * 1.7);
      });
    },
  };
}
