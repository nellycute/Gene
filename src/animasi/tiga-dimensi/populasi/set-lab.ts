import * as THREE from "three";
import { BASA, MOLEKUL, SEL, type KodeBasa } from "@/lib/warna";
import { lihat, type Studio } from "../studio";
import { bolaHalus, pembuatAcak, tabung } from "../bentuk";
import { buatLabel } from "../label3d";
import { bangunTabung, bentukEnzim } from "../model-mikroba";
import { bangunDNA } from "../model-dna";
import { bangunSosok } from "../model-sosok";
import { bangunSapi } from "../model-hewan";
import { bangunKromosom } from "../model-kromosom";
import { aturLabel, buatJamTahap, labelHidup, v, type Set3D } from "../rangkai-set";
import { bahan, bangunBiji } from "../mendel/model-mendel";
import { lantai, selTembus, tahapan, tulis } from "../mendel/bantu";
import { bangunTerompet } from "../perluasan/model-perluasan";
import { bangunKromosomKelamin } from "../kelamin/model-kelamin";
import { bangunPitaKodon, bangunTangga } from "../mutasi/model-mutasi";
import { bangunGaris, bangunGel, bangunSumbu, jalankanGel, tampakSebagian, yPita } from "./model-populasi";

/**
 * SET PELAJARAN 6.5–6.7 — laboratorium, penanda, forensik, penutup.
 */

const TINTA = "#1b2430";
const ABU = "#b9ae9c";
const bahanBasa = (studio: Studio, b: KodeBasa) => bahan(studio, `basa-${b}`, [`basa${b}`], BASA[b].warna, 0.003);

/* ================================================================== *
 * LAB — isolasi DNA
 * ================================================================== */

export function setLab(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const tb = new THREE.Group();
  tb.position.set(0, 0, 0);
  tb.scale.setScalar(1.6);
  grup.add(tb);
  bangunTabung(studio, tb, { tinggi: 4, jari: 0.7, isi: 0.55, entitas: ["tabungIsolasi"] });
  /* lapisan alkohol di atas cairan */
  const alkohol = new THREE.CylinderGeometry(0.62, 0.62, 0.9, 24);
  alkohol.translate(0, 2.65, 0);
  studio.tambah(bahan(studio, "alkohol", ["alkohol"], "#eef3f6", 0.003, 0.5), alkohol, tb, false);
  /* benang DNA putih di batas lapisan */
  const benang = new THREE.Group();
  benang.position.set(0, 2.2 * 1.6, 0);
  grup.add(benang);
  const acak = pembuatAcak(7);
  const bDNA = bahan(studio, "benangDNA", ["dna"], "#f7f5ef", 0.003);
  for (let i = 0; i < 9; i++) {
    const titik = Array.from({ length: 6 }, (_, k) => v((acak() - 0.5) * 1.4, k * 0.25 + (acak() - 0.5) * 0.2, (acak() - 0.5) * 0.8));
    studio.tambah(bDNA, tabung(titik, 0.04, 20, 5), benang, false);
  }
  const LANGKAH = ["1. deterjen: sel pecah", "2. enzim: protein terurai", "3. alkohol: DNA mengendap"];
  LANGKAH.forEach((t, i) => tulis(grup, t, 0.5, 5.2, 5.2 - i * 1.1, 0));
  const lBenang = labelHidup(grup, "DNA: benang putih", 0.55);
  lantai(grup, 12, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(2.5, 3.4, 0, 15, 0, 1.35),
      benang: lihat(0, 3.8, 0, 7, 0, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 7 },
    perbarui: (p, dt) => {
      benang.rotation.y = (p.detik ?? 0) * 0.3;
      aturLabel(lBenang, p.fokus === "benang", dt, v(1.8, 4.8, 0.5));
    },
  };
}

/* ================================================================== *
 * PCR — tiga langkah dan pelipatgandaan
 * ================================================================== */

export function setPCR(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.4;
  const ATAS = "ATGCCGTA";
  const BAWAH = "TACGGCAT";
  const PASANG: Record<string, KodeBasa> = { A: "T", T: "A", G: "C", C: "G" };
  const tangga = bangunTangga(studio, grup, ATAS, BAWAH);
  tangga.grup.position.set(-5, Y, 0);
  const atas = new THREE.Group();
  const bawah = new THREE.Group();
  /* pindahkan basa dan rangka ke grup atas/bawah agar kedua untai bisa dipisah */
  const rangka = tangga.grup.children.filter((c) => c instanceof THREE.Mesh);
  tangga.atas.forEach((m) => atas.add(m));
  tangga.bawah.forEach((m) => bawah.add(m));
  atas.add(rangka[0]);
  bawah.add(rangka[1]);
  tangga.grup.add(atas, bawah);
  /* untai baru: primer (3 basa pertama) lalu basa-basa pemanjangan */
  const L = 0.7;
  const x0 = (-(ATAS.length - 1) * L) / 2;
  const basaBaru = (b: KodeBasa, i: number, y: number) => {
    const m = studio.tambah(bahanBasa(studio, b), new THREE.BoxGeometry(L * 0.75, 0.8, 0.4), tangga.grup);
    m.position.set(x0 + i * L, y, 0);
    const l = buatLabel(b, 0.34);
    l.position.set(0, 0, 0.35);
    m.add(l);
    m.visible = false;
    return m;
  };
  /* untai atas dibaca kiri → kanan; untai bawah kanan → kiri */
  const baruAtas = ATAS.split("").map((b, i) => basaBaru(PASANG[b], i, 0.75));
  const baruBawah = BAWAH.split("").map((b, i) => basaBaru(PASANG[b], i, -0.75));
  const urutBawah = [7, 6, 5, 4, 3, 2, 1, 0];
  const enzim = studio.tambah(bahan(studio, "enzim", ["enzim"], MOLEKUL.enzim.warna, 0.004), bentukEnzim(0.45), tangga.grup);
  const lSuhu = labelHidup(grup, "", 0.6);
  const suhu: Record<string, string> = { pisah: "95 °C", primer: "± 55 °C", panjang: "72 °C" };
  let teksSuhu = "";
  /* grafik 2ⁿ */
  const grafik = new THREE.Group();
  grafik.position.set(1.5, 1, 0);
  grup.add(grafik);
  bangunSumbu(studio, grafik, { lebar: 8, tinggi: 5, judulX: "siklus", judulY: "salinan" });
  const titik = Array.from({ length: 31 }, (_, n) => v((n / 30) * 8, 0.05 + (Math.pow(2, n) / Math.pow(2, 30)) * 4.8, 0.1));
  const kurva = bangunGaris(studio, grafik, titik, TINTA, 0.06, "eksponen");
  tulis(grafik, "2³⁰ ≈ 1 miliar", 0.5, 6, 5.4, 0.2);
  grafik.visible = false;
  const jam = buatJamTahap();
  lantai(grup, 20, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(-2, Y - 0.6, 0, 16, 0, 1.4),
      pisah: lihat(-5, Y, 0, 9.5, 0, 1.4),
      primer: lihat(-5, Y, 0, 9.5, 0, 1.4),
      panjang: lihat(-5, Y, 0, 9.5, 0, 1.4),
      grafik: lihat(4, 3.4, 0, 13, 0, 1.4),
    },
    bayangan: { pusat: v(-2, 0, 0), jangkauan: 10 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const pisah = f === "pisah" || f === "primer" || f === "panjang" ? 1 : 0;
      atas.position.y = pelanSaja(atas.position.y, pisah * 1.3, dt);
      bawah.position.y = pelanSaja(bawah.position.y, -pisah * 1.3, dt);
      /* primer: tiga basa pertama tiap untai baru; pemanjangan menambah sisanya satu per satu */
      const n = f === "primer" ? 3 : f === "panjang" ? 3 + Math.floor(tahapan(j, 0.2, 3) * 5.99) : 0;
      baruAtas.forEach((m, i) => (m.visible = i < n));
      urutBawah.forEach((i, k) => (baruBawah[i].visible = k < n));
      enzim.visible = f === "panjang";
      enzim.position.set(x0 + Math.min(7, n) * L, 0, 0.6);
      if (suhu[f] && teksSuhu !== suhu[f]) {
        lSuhu.sprite.parent?.remove(lSuhu.sprite);
        lSuhu.sprite = labelHidup(grup, suhu[f], 0.7).sprite;
        teksSuhu = suhu[f];
      }
      aturLabel(lSuhu, Boolean(suhu[f]), dt, v(-5, Y + 2.6, 0.5));
      grafik.visible = f === "grafik" || f === "utuh";
      tampakSebagian(kurva, f === "grafik" ? tahapan(j, 0.1, 3) : 1);
    },
  };
}

const pelanSaja = (a: number, b: number, dt: number) => a + (b - a) * Math.min(1, dt * 4);

/* ================================================================== *
 * GEL — elektroforesis
 * ================================================================== */

export function setGel(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const gel = bangunGel(studio, grup, [
    { nama: "tangga", pb: [100, 200, 300, 500, 1000, 2000] },
    { nama: "sapi", pb: [450] },
    { nama: "babi", pb: [210] },
    { nama: "sampel", pb: [450, 210] },
  ]);
  gel.grup.position.set(0, 3.8, 0);
  gel.grup.rotation.x = -0.35;
  ["100", "200", "300", "500", "1.000", "2.000"].forEach((t, i) => {
    const l = buatLabel(`${t} pb`, 0.3);
    l.userData.pb = [100, 200, 300, 500, 1000, 2000][i];
    gel.grup.add(l);
  });
  const lUkuran = gel.grup.children.filter((c) => c instanceof THREE.Sprite && c.userData.pb) as THREE.Sprite[];
  const lJalan = labelHidup(grup, "pendek → lebih jauh", 0.5);
  const lBabi = labelHidup(grup, "sampel mengandung DNA babi", 0.55);
  const jam = buatJamTahap();
  lantai(grup, 14, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 4, 0, 14.5, 0, 1.3),
      jalan: lihat(0, 4, 0, 14.5, 0, 1.3),
      pita: lihat(-1.2, 4, 0, 13, 0, 1.3),
      contoh: lihat(0.8, 4, 0, 14, 0, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 7 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const u = f === "utuh" ? 0 : f === "jalan" ? tahapan(j, 0.3, 4) : 1;
      jalankanGel(gel, u);
      lUkuran.forEach((l) => {
        l.visible = f === "pita" || f === "contoh";
        l.position.set(gel.lajurX[0] - 1.1, yDari(l.userData.pb as number, gel.tinggi), 0.3);
      });
      /* di kanan gel, tapi tidak terlalu jauh: di 6,8/7,2 ujung kanannya terpotong bingkai */
      aturLabel(lJalan, f === "jalan", dt, v(5.6, 3, 1));
      aturLabel(lBabi, f === "contoh", dt, v(6.0, 3.4, 1.2));
    },
  };
}

const yDari = yPita;

/* ================================================================== *
 * SANGER — potongan berujung warna
 * ================================================================== */

export function setSanger(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const URUT = "ATGCCTAGGA";
  const potong = new THREE.Group();
  grup.add(potong);
  const bBatang = bahan(studio, "potonganSanger", ["dna"], "#d3d6db", 0.003);
  const batang = URUT.split("").map((b, i) => {
    const g = new THREE.Group();
    potong.add(g);
    const L = 1 + i * 0.6;
    const m = new THREE.BoxGeometry(L, 0.32, 0.3);
    m.translate(L / 2, 0, 0);
    studio.tambah(bBatang, m, g);
    const ujung = studio.tambah(bahanBasa(studio, b as KodeBasa), bolaHalus(0.26, 12, 8), g);
    ujung.position.x = L + 0.1;
    const l = buatLabel(b, 0.4);
    l.position.set(L + 0.1, 0, 0.35);
    g.add(l);
    g.userData.acak = v(-4 + ((i * 7) % 10) * 0.9 - 4, 1 + ((i * 3) % 10) * 0.5, 0);
    g.userData.urut = v(-6, 0.7 + i * 0.52, 0);
    return g;
  });
  const baca = new THREE.Group();
  grup.add(baca);
  tulis(baca, `terbaca: ${URUT}`, 0.7, 2, 6.8);
  baca.visible = false;
  const lUrut = labelHidup(grup, "pendek → panjang", 0.5);
  lantai(grup, 18, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(-1, 3.4, 0, 14, 0, 1.4),
      potong: lihat(-1, 3.4, 0, 14, 0, 1.4),
      baca: lihat(-1, 3.8, 0, 14, 0, 1.4),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 8 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const urut = f !== "utuh";
      batang.forEach((g) => g.position.lerp(urut ? (g.userData.urut as THREE.Vector3) : (g.userData.acak as THREE.Vector3), Math.min(1, dt * 2)));
      baca.visible = f === "baca";
      aturLabel(lUrut, f === "potong", dt, v(-7.4, 3.5, 0.4));
    },
  };
}

/* ================================================================== *
 * NGS — sel alir penuh titik berkedip
 * ================================================================== */

export function setNGS(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const kaca = new THREE.BoxGeometry(12, 5, 0.2);
  kaca.translate(0, 3.4, 0);
  studio.tambah(bahan(studio, "selAlir", ["kaca"], "#dfe7ee", 0.004, 0.8), kaca, grup);
  const acak = pembuatAcak(2);
  const HURUF: KodeBasa[] = ["A", "T", "G", "C"];
  const titik: { m: THREE.Mesh[]; fase: number }[] = [];
  const g = new THREE.SphereGeometry(0.1, 8, 6);
  for (let i = 0; i < 180; i++) {
    const x = -5.6 + acak() * 11.2;
    const y = 1.2 + acak() * 4.4;
    const m = HURUF.map((b) => {
      const mm = studio.tambah(bahanBasa(studio, b), g, grup, false);
      mm.position.set(x, y, 0.15);
      mm.visible = false;
      return mm;
    });
    titik.push({ m, fase: Math.floor(acak() * 4) });
  }
  tulis(grup, "miliaran potongan dibaca serentak", 0.55, 0, 6.6);
  lantai(grup, 14, 4);
  return {
    grup,
    fokus: { utuh: lihat(0, 3.4, 0, 13, 0, 1.45) },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 7 },
    perbarui: (p) => {
      const siklus = Math.floor((p.detik ?? 0) * 1.5);
      titik.forEach((t) => t.m.forEach((m, k) => (m.visible = (siklus + t.fase) % 4 === k)));
    },
  };
}

/* ================================================================== *
 * PENANDA — mikrosatelit, SNP, keragaman, chip
 * ================================================================== */

export function setPenanda(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.6;
  /* dua individu: kromosom dengan kotak ulangan */
  const ulang = (x: number, n: number, label: string) => {
    const g = new THREE.Group();
    g.position.set(x, Y, 0);
    grup.add(g);
    const kr = new THREE.Group();
    kr.rotation.z = Math.PI / 2;
    g.add(kr);
    bangunKromosom(studio, kr, { p: 2, q: 4, jari: 0.3, asal: "kromatin" }, 1);
    for (let i = 0; i < n; i++) {
      const b = studio.tambah(bahanBasa(studio, i % 2 === 0 ? "C" : "A"), new THREE.BoxGeometry(0.3, 0.8, 0.8), g);
      b.position.set(-1 + i * 0.34, 0, 0);
    }
    tulis(g, label, 0.45, 0, -1, 0.3);
    return g;
  };
  const mikro = new THREE.Group();
  grup.add(mikro);
  mikro.add(ulang(-5, 5, "individu 1: (CA)×5"));
  mikro.add(ulang(3, 8, "individu 2: (CA)×8"));
  /* SNP: dua pita basa berbeda satu */
  const snp = new THREE.Group();
  snp.position.set(0, 1.6, 0);
  grup.add(snp);
  const s1 = bangunPitaKodon(studio, snp, "AUGGAAUAC");
  s1.scale.setScalar(0.55);
  s1.position.set(-4.5, 0, 0);
  const s2 = bangunPitaKodon(studio, snp, "AUGGAGUAC", { ubah: [5] });
  s2.scale.setScalar(0.55);
  s2.position.set(4.5, 0, 0);
  tulis(snp, "SNP: beda satu basa", 0.5, 0, -1.4, 0.3);
  snp.visible = false;
  /* keragaman: dua populasi manik */
  const ragam = new THREE.Group();
  grup.add(ragam);
  const acak = pembuatAcak(9);
  const pop = (x: number, huruf: KodeBasa[], label: string) => {
    for (let i = 0; i < 24; i++) {
      const b = huruf[Math.floor(acak() * huruf.length)];
      const m = studio.tambah(bahanBasa(studio, b), bolaHalus(0.25, 10, 8), ragam);
      m.position.set(x + (i % 6) * 0.6 - 1.5, 1.2 + Math.floor(i / 6) * 0.6, 0);
    }
    tulis(ragam, label, 0.48, x, 0.3, 0.4);
  };
  pop(-4, ["A", "T", "G", "C", "U"], "populasi beragam");
  pop(4, ["A", "G"], "populasi seragam");
  ragam.visible = false;
  /* chip SNP */
  const chip = new THREE.Group();
  chip.position.set(0, 3.2, 0);
  grup.add(chip);
  studio.tambah(bahan(studio, "chipBesar", ["chip"], "#c9cdd3", 0.004), new THREE.BoxGeometry(6, 3.6, 0.2), chip);
  const k = [bahan(studio, "genAA", ["genotip"], "#4d4538", false), bahan(studio, "genAB", ["genotip"], ABU, false), bahan(studio, "genBB", ["genotip"], "#efe9dd", false)];
  const acak2 = pembuatAcak(12);
  for (let i = 0; i < 16 * 9; i++) {
    const t = new THREE.BoxGeometry(0.26, 0.26, 0.05);
    t.translate(-2.6 + (i % 16) * 0.35, -1.45 + Math.floor(i / 16) * 0.36, 0.12);
    studio.tambah(k[Math.floor(acak2() * 3)], t, chip, false);
  }
  const anak = new THREE.Group();
  anak.position.set(5, -3.2, 1);
  anak.scale.setScalar(0.4);
  chip.add(anak);
  bangunSapi(studio, anak, { bulu: "hitam" });
  tulis(chip, "puluhan ribu SNP sekaligus", 0.5, 0, 2.4, 0.2);
  chip.visible = false;
  lantai(grup, 20, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(-1, Y - 0.4, 0, 16, 0, 1.4),
      mikro: lihat(-1, Y - 0.4, 0, 15, 0, 1.4),
      snp: lihat(0, 2.2, 0, 14, 0, 1.4),
      keragaman: lihat(0, 2, 0, 13, 0, 1.35),
      chip: lihat(0.5, 2.6, 0, 11, 0, 1.4),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
    perbarui: (p) => {
      const f = p.fokus ?? "utuh";
      mikro.visible = f === "utuh" || f === "mikro";
      snp.visible = f === "snp";
      ragam.visible = f === "keragaman";
      chip.visible = f === "chip";
    },
  };
}

/* ================================================================== *
 * SIDIK — profil STR
 * ================================================================== */

/** Profil STR: tiap lokus dua batang di posisi sesuai jumlah ulangannya. */
function profil(studio: Studio, induk: THREE.Object3D, alel: [number, number][], y: number, judul: string, sorot?: boolean) {
  const g = new THREE.Group();
  g.position.y = y;
  induk.add(g);
  const b = bahan(studio, sorot ? "strSorot" : "strBiasa", ["profil"], sorot ? "#4d4538" : ABU, 0.003);
  alel.forEach(([a1, a2], l) => {
    for (const a of [a1, a2]) {
      const m = new THREE.BoxGeometry(0.22, 1, 0.3);
      m.translate(l * 4 - 6 + (a - 8) * 0.3, 0.5, 0);
      studio.tambah(b, m, g);
    }
  });
  const bDasar = bahan(studio, "garisDasar", ["tinta"], "#5c6878", false);
  const d = new THREE.BoxGeometry(16, 0.04, 0.05);
  d.translate(0, 0, 0);
  studio.tambah(bDasar, d, g, false);
  tulis(g, judul, 0.6, -10.2, 0.5, 0.2);
  return g;
}

export function setSidik(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const LOKUS = ["D3S1358", "vWA", "FGA", "D8S1179"];
  const TKP: [number, number][] = [
    [8, 11],
    [9, 13],
    [7, 12],
    [10, 10],
  ];
  profil(studio, grup, TKP, 5.2, "bukti TKP", true);
  profil(studio, grup, [
    [9, 12],
    [8, 13],
    [7, 9],
    [11, 12],
  ], 3.3, "tersangka 1");
  profil(studio, grup, TKP, 1.4, "tersangka 2", true);
  LOKUS.forEach((n, l) => tulis(grup, n, 0.5, l * 4 - 6 + 0.6, 7, 0.2));
  const lCocok = labelHidup(grup, "cocok di semua lokus", 0.62);
  /* ulangan STR dari dekat */
  const str = new THREE.Group();
  str.position.set(0, 3.5, 3);
  grup.add(str);
  for (let a = 0; a < 2; a++) {
    const n = a === 0 ? 8 : 11;
    for (let i = 0; i < n; i++) {
      const b = studio.tambah(bahanBasa(studio, (["G", "A", "T", "A"] as KodeBasa[])[i % 4]), new THREE.BoxGeometry(0.3, 0.5, 0.3), str);
      b.position.set(-3 + i * 0.36, a * -0.9, 0);
    }
    tulis(str, `alel ${a + 1}: ${n} ulangan`, 0.42, 3.4, a * -0.9, 0.3);
  }
  str.visible = false;
  /* barang bukti */
  const bukti = new THREE.Group();
  bukti.position.set(-9, 0, 2);
  grup.add(bukti);
  const tetes = bolaHalus(0.4, 14, 10);
  tetes.scale(1, 1.3, 1);
  tetes.translate(0, 0.6, 0);
  studio.tambah(bahan(studio, "tetesDarah", ["selDarahMerah"], "#b64a46", 0.003), tetes, bukti);
  studio.tambah(bahan(studio, "rambut", ["rambut"], "#3b302b", false), tabung([v(1, 0.2, 0), v(1.4, 0.8, 0.1), v(1.2, 1.4, 0)], 0.03, 12, 5), bukti, false);
  tulis(bukti, "darah · rambut", 0.42, 0.6, -0.4, 0.3);
  bukti.visible = false;
  lantai(grup, 22, 7);
  return {
    grup,
    fokus: {
      utuh: lihat(-1, 4, 0, 17, 0, 1.45),
      str: lihat(0, 3.2, 3, 9, 0, 1.4),
      tkp: lihat(-2, 3.6, 1, 18, 0, 1.4),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      str.visible = f === "str";
      bukti.visible = f === "tkp";
      aturLabel(lCocok, f === "tkp", dt, v(7.6, 2.4, 0.5));
    },
  };
}

/* ================================================================== *
 * AYAH — uji paternitas
 * ================================================================== */

export function setAyah(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(3);
  const IBU: [number, number][] = [
    [8, 10],
    [12, 14],
    [7, 9],
  ];
  const ANAK: [number, number][] = [
    [10, 11],
    [12, 15],
    [9, 11],
  ];
  const A: [number, number][] = [
    [9, 13],
    [13, 14],
    [8, 10],
  ];
  const B: [number, number][] = [
    [11, 12],
    [15, 16],
    [11, 12],
  ];
  const baris: [string, [number, number][], boolean][] = [
    ["ibu", IBU, false],
    ["anak", ANAK, true],
    ["terduga ayah A", A, false],
    ["terduga ayah B", B, true],
  ];
  const kel = new THREE.Group();
  grup.add(kel);
  baris.forEach(([n, d, s], i) => profil(studio, kel, d, 6.2 - i * 1.6, n, s && false));
  kel.position.x = 2;
  kel.scale.setScalar(0.8);
  const orang = new THREE.Group();
  grup.add(orang);
  bangunSosok(studio, orang, { entitas: "ibu", label: "ibu", x: -9.5, tinggi: 0.7, rambut: "#3b302b", keriting: false, panjang: true, baju: "#cbbfae" }, acak);
  bangunSosok(studio, orang, { entitas: "anak", label: "anak", x: -7.6, tinggi: 0.5, rambut: "#3b302b", keriting: true, baju: "#e4dfd5" }, acak);
  const lCocok = labelHidup(grup, "alel dari ayah ada pada B, tidak pada A", 0.55);
  lantai(grup, 22, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(-1, 3.4, 0, 18, 0, 1.4),
      cocok: lihat(1, 3.4, 0, 15, 0, 1.45),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
    perbarui: (p, dt) => aturLabel(lCocok, p.fokus === "cocok", dt, v(2, 0, 0.6)),
  };
}

/* ================================================================== *
 * SPESIES — barcode DNA
 * ================================================================== */

function barcode(studio: Studio, induk: THREE.Object3D, urutan: string, x: number, y: number, label: string) {
  const g = new THREE.Group();
  g.position.set(x, y, 0);
  induk.add(g);
  urutan.split("").forEach((b, i) => {
    const m = studio.tambah(bahanBasa(studio, b as KodeBasa), new THREE.BoxGeometry(0.22, 1, 0.2), g);
    m.position.x = i * 0.26 - (urutan.length * 0.26) / 2;
  });
  tulis(g, label, 0.45, -(urutan.length * 0.26) / 2 - 1.4, 0, 0.2);
  return g;
}

export function setSpesies(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const SAPI = "ATGACCAACATCCGAAAGAC";
  const BABI = "ATGACCAACATCCGAAAAAC".replace(/AAAAC$/, "ATCAC");
  const AYAM = "ATGGCCCCAAACCTCCGAAA";
  barcode(studio, grup, SAPI, 1, 5.6, "sapi");
  barcode(studio, grup, BABI, 1, 4.2, "babi");
  barcode(studio, grup, AYAM, 1, 2.8, "ayam");
  const sampel = barcode(studio, grup, BABI, 1, 0.9, "sampel daging");
  const daging = studio.tambah(bahan(studio, "daging", ["daging"], "#d98b86", 0.004), new THREE.BoxGeometry(1.6, 0.8, 1.2), grup);
  daging.position.set(-6.8, 0.6, 1);
  const lCocok = labelHidup(grup, "cocok dengan babi", 0.55);
  lantai(grup, 18, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 3.2, 0, 15, 0, 1.4),
      daging: lihat(0, 2.6, 0, 13, 0, 1.4),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
    perbarui: (p, dt) => {
      aturLabel(lCocok, p.fokus === "daging", dt, v(5.2, 0.9, 0.5));
      sampel.position.z = p.fokus === "daging" ? 0.3 : 0;
    },
  };
}

/* ================================================================== *
 * ETIKA — gembok, DNA, keluarga
 * ================================================================== */

export function setEtika(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(8);
  const dna = new THREE.Group();
  dna.position.set(0, 3.2, 0);
  dna.scale.setScalar(0.5);
  grup.add(dna);
  bangunDNA(studio, dna, "ATGCGTACGGTACC");
  const gembok = new THREE.Group();
  gembok.position.set(0, 3.2, 1.2);
  grup.add(gembok);
  const logam = bahan(studio, "gembok", ["gembok"], "#c9b27a", 0.004);
  studio.tambah(logam, new THREE.BoxGeometry(1.4, 1.1, 0.5), gembok);
  const lengkung = new THREE.TorusGeometry(0.45, 0.1, 10, 24, Math.PI);
  lengkung.translate(0, 0.55, 0);
  studio.tambah(logam, lengkung, gembok);
  ["ayah", "ibu", "anak"].forEach((n, i) =>
    bangunSosok(studio, grup, { entitas: n, label: n, x: -7 + i * 2, tinggi: i === 2 ? 0.6 : 0.8, rambut: "#3b302b", keriting: i === 1, panjang: i === 1, baju: "#d9d2c5" }, acak),
  );
  tulis(grup, "izin · keamanan data · aturan hukum", 0.55, 3.5, 6);
  lantai(grup, 18, 5);
  return {
    grup,
    fokus: { utuh: lihat(-1.5, 2.6, 0, 16, 0, 1.3) },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
    perbarui: (p) => {
      dna.rotation.y = (p.detik ?? 0) * 0.4;
    },
  };
}

/* ================================================================== *
 * PENUTUP — tujuh tingkat
 * ================================================================== */

export function setPenutup(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const R = 9;
  const buat: ((g: THREE.Group) => void)[] = [
    (g) => {
      selTembus(studio, g, 0.9, "membranSel", SEL.membranSel.warna, "membranSel", 0.35).position.y = 1.2;
      const inti = studio.tambah(bahan(studio, "intiPenutup", ["inti"], SEL.inti.warna, 0.003), bolaHalus(0.35, 14, 10), g);
      inti.position.y = 1.2;
    },
    (g) => {
      const d = new THREE.Group();
      d.position.y = 1.4;
      d.scale.setScalar(0.3);
      g.add(d);
      bangunDNA(studio, d, "ATGCGTAC");
    },
    (g) => {
      const b = bangunBiji(studio, g, { warna: "kuning", bentuk: "bulat" }, 0.5);
      b.position.y = 1;
    },
    (g) => {
      const b = bangunTerompet(studio, g, "merahMuda", 0.8);
      b.position.y = 0.5;
    },
    (g) => {
      const k = new THREE.Group();
      k.position.y = 1.5;
      g.add(k);
      bangunKromosomKelamin(studio, k, "X", { L: 3, jari: 0.2, ukuranHuruf: 0.4 });
    },
    (g) => {
      const s = bangunPitaKodon(studio, g, "AUGGUG");
      s.scale.setScalar(0.35);
      s.position.y = 1.4;
    },
    (g) => {
      for (let i = 0; i < 3; i++) {
        const c = new THREE.Group();
        c.position.set((i - 1) * 0.7, 0.3, (i % 2) * 0.4);
        c.scale.setScalar(0.18);
        g.add(c);
        bangunSapi(studio, c, { bulu: (["merah", "roan", "putih"] as const)[i] });
      }
    },
  ];
  const NAMA = ["0 · sel", "1 · DNA", "2 · Mendel", "3 · perluasan", "4 · kelamin, pautan", "5 · mutasi", "6 · populasi, terapan"];
  const alasB = bahan(studio, "alasPenutup", ["alas"], "#e4dfd5", 0.004);
  const benda = buat.map((f, i) => {
    const a = ((i - 3) / 3) * 1.1;
    const g = new THREE.Group();
    g.position.set(Math.sin(a) * R, 0, Math.cos(a) * R - R);
    grup.add(g);
    const alas = new THREE.CylinderGeometry(1.1, 1.2, 0.4, 32);
    alas.translate(0, 0.2, 0);
    studio.tambah(alasB, alas, g);
    const isi = new THREE.Group();
    isi.scale.setScalar(1.3);
    g.add(isi);
    f(isi);
    tulis(g, `Tingkat ${NAMA[i]}`, 0.5, 0, -0.5, 1.3);
    return g;
  });
  lantai(grup, 24, 10);
  return {
    grup,
    fokus: { utuh: lihat(0, 1.4, -2, 16.5, 0, 1.25, "ayun") },
    bayangan: { pusat: v(0, 0, -2), jangkauan: 12 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      benda.forEach((g, i) => (g.rotation.y = 0.3 * Math.sin(t * 0.6 + i)));
    },
  };
}

