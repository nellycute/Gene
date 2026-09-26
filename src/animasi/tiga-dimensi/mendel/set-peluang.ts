import * as THREE from "three";
import { lihat, type Studio } from "../studio";
import { pembuatAcak } from "../bentuk";
import { bangunSosok } from "../model-sosok";
import { bangunSapi } from "../model-hewan";
import { alas, aturLabel, buatJamTahap, labelHidup, panah, pelan, v, type Set3D } from "../rangkai-set";
import { bahan, bangunBiji, bangunKoin, bangunPunnett, bangunTumpukan, bijiDari } from "./model-mendel";
import { kali, lantai, muncul, papanBerdiri, tahapan, teksDatar, tulis } from "./bantu";

/**
 * SET PELAJARAN 2.3–2.4 — Punnett, peluang, uji silang, silang balik.
 *
 *  punnett   papan Punnett 2 × 2 berdiri: kosong → gamet di kepala → kotak terisi
 *  koin      koin bersisi R dan r: satu koin, dua koin (ayah dan ibu), dua jalan ke Rr
 *  keluarga  orang tua Aa × Aa, anak pertama albino; Punnett kecil ¼ aa
 *  uji       bulat: RR atau Rr? disilangkan dengan rr — dua kemungkinan hasil
 *  balik     F1 × induk dominan / induk resesif
 *  sapi      sapi Angus: pejantan hitam × betina merah → anak merah
 */

const KULIT_ALBINO = "#f3e4da";
const RAMBUT_ALBINO = "#efe6d3";
const RAMBUT_GELAP = "#3b302b";

/* ================================================================== *
 * PUNNETT 2 × 2
 * ================================================================== */

export function setPunnett(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const S = 1.8;
  const Y = 4;
  papanBerdiri(studio, grup, 3 * S + 0.6, 3 * S + 0.6, 0, Y);
  const gen = (i: number, j: number) => {
    const a = ["R", "r"][j];
    const b = ["R", "r"][i];
    return a === "R" || b === "R" ? (a === "R" && b === "R" ? "RR" : "Rr") : "rr";
  };
  const papan = bangunPunnett(studio, grup, ["R", "r"], ["R", "r"], (i, j) => ({ teks: gen(i, j), biji: bijiDari(gen(i, j)) }), S);
  papan.grup.position.set(0, Y, 0.05);
  tulis(grup, "jantan Rr", 0.45, 0.9, Y + 3.4, 0.2);
  tulis(grup, "betina Rr", 0.45, -4.3, Y - 0.9, 0.2);
  const lKali = labelHidup(grup, "Rr × Rr", 0.6);
  papan.kepala.forEach((k) => (k.visible = false));
  papan.sel.flat().forEach((s) => (s.visible = false));
  const jam = buatJamTahap();
  lantai(grup, 10, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(-0.5, Y + 0.2, 0, 15.5, 0, 1.45),
      kosong: lihat(-0.5, Y + 0.2, 0, 15.5, 0, 1.45),
      kepala: lihat(-0.5, Y + 0.2, 0, 15.5, 0, 1.45),
      isi: lihat(-0.5, Y + 0.2, 0, 15.5, 0.05, 1.45),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 6 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const adaKepala = f === "kepala" || f === "isi" || f === "utuh";
      const adaIsi = f === "isi" || f === "utuh";
      papan.kepala.forEach((k, i) => muncul(k, adaKepala && (f !== "kepala" || j > 0.3 + i * 0.35), dt, 1, 5));
      papan.sel.flat().forEach((s, i) => muncul(s, adaIsi && (f !== "isi" || j > 0.2 + i * 0.5), dt, 1, 5));
      aturLabel(lKali, f === "kosong", dt, v(0, Y, 0.6));
    },
  };
}

/* ================================================================== *
 * KOIN — peluang
 * ================================================================== */

type Koin = { grup: THREE.Group; putar: THREE.Group };

function koinBerhuruf(studio: Studio, induk: THREE.Object3D): Koin {
  const grup = new THREE.Group();
  induk.add(grup);
  const putar = new THREE.Group();
  grup.add(putar);
  const k = bangunKoin(studio, putar, 1);
  k.rotation.x = -Math.PI / 2;
  const atas = teksDatar("R", 1.1);
  atas.rotation.x = -Math.PI / 2;
  atas.position.y = 0.08;
  putar.add(atas);
  const bawah = teksDatar("r", 1.1);
  bawah.rotation.x = Math.PI / 2;
  bawah.position.y = -0.08;
  putar.add(bawah);
  return { grup, putar };
}

/** Lemparan koin berulang: melambung, berputar, jatuh pada sisi `hasil(n)`. */
function lempar(k: Koin, detik: number, geser: number, hasil: (n: number) => boolean) {
  const PERIODE = 2.4;
  const u = (detik + geser) / PERIODE;
  const n = Math.floor(u);
  const fase = u - n;
  const naik = Math.min(1, fase / 0.55);
  k.putar.position.y = 0.08 + Math.sin(naik * Math.PI) * 2.2;
  const akhir = hasil(n) ? 0 : Math.PI;
  k.putar.rotation.x = fase < 0.55 ? akhir + (1 - naik) * Math.PI * 4 : akhir;
}

export function setKoin(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const meja = new THREE.CylinderGeometry(6.5, 6.7, 0.4, 64);
  meja.translate(0, -0.2, 0);
  studio.tambah(bahan(studio, "meja", ["meja"], "#e4dfd5", 0.004), meja, grup);

  const satu = new THREE.Group();
  grup.add(satu);
  const k1 = koinBerhuruf(studio, satu);
  tulis(satu, "koin bersisi R dan r", 0.42, 0, 0.1, 2.2);
  const lSatu = labelHidup(grup, "peluang R = ½", 0.55);

  const dua = new THREE.Group();
  grup.add(dua);
  const kAyah = koinBerhuruf(studio, dua);
  kAyah.grup.position.x = -2.2;
  const kIbu = koinBerhuruf(studio, dua);
  kIbu.grup.position.x = 2.2;
  tulis(dua, "dari ayah", 0.45, -2.2, 0.1, 2.2);
  tulis(dua, "dari ibu", 0.45, 2.2, 0.1, 2.2);
  const lDua = labelHidup(grup, "R dan R: ½ × ½ = ¼", 0.55);

  const tambah = new THREE.Group();
  grup.add(tambah);
  const JALAN: [boolean, boolean, number][] = [
    [true, false, -3.6],
    [false, true, 3.6],
  ];
  for (const [ayahR, ibuR, x] of JALAN) {
    const a = koinBerhuruf(studio, tambah);
    a.grup.position.x = x - 1.2;
    a.putar.rotation.x = ayahR ? 0 : Math.PI;
    const b = koinBerhuruf(studio, tambah);
    b.grup.position.x = x + 1.2;
    b.putar.rotation.x = ibuR ? 0 : Math.PI;
    tulis(tambah, x < 0 ? "jalan 1: R ayah, r ibu" : "jalan 2: r ayah, R ibu", 0.42, x, 0.1, 2.2);
    tulis(tambah, "Rr  ¼", 0.6, x, 1.6, 0);
  }
  tulis(tambah, "+", 1.1, 0, 0.9, 0);
  const lTambah = labelHidup(grup, "Rr = ¼ + ¼ = ½", 0.6);
  lantai(grup, 16, 16);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.3, 0.6, 9.5, 0, 1.1),
      satu: lihat(0, 1.3, 0.6, 9.5, 0, 1.1),
      dua: lihat(0, 1.3, 0.6, 11.5, 0, 1.1),
      tambah: lihat(0, 1, 0.6, 15, 0, 1.05),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 8 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const t = p.detik ?? 0;
      muncul(satu, f === "utuh" || f === "satu", dt);
      muncul(dua, f === "dua", dt);
      muncul(tambah, f === "tambah", dt);
      /* satu koin: berselang-seling acak-tampak; dua koin: sama-sama R */
      lempar(k1, t, 0, (n) => [true, false, false, true, false, true][n % 6]);
      lempar(kAyah, t, 0, () => true);
      lempar(kIbu, t, 0.3, () => true);
      aturLabel(lSatu, f === "satu", dt, v(0, 3.2, 0));
      aturLabel(lDua, f === "dua", dt, v(0, 3.4, 0));
      aturLabel(lTambah, f === "tambah", dt, v(0, 3.3, 0));
    },
  };
}

/* ================================================================== *
 * KELUARGA — albinisme
 * ================================================================== */

export function setKeluarga(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(4);
  const orang = [
    bangunSosok(studio, grup, { entitas: "ayah", ukuranLabel: 0.6, label: "Ayah · Aa", x: -6, tinggi: 1.1, rambut: RAMBUT_GELAP, keriting: false, baju: "#c4b8a6" }, acak),
    bangunSosok(studio, grup, { entitas: "ibu", ukuranLabel: 0.6, label: "Ibu · Aa", x: -3.4, tinggi: 1.02, rambut: RAMBUT_GELAP, keriting: true, panjang: true, baju: "#cbbfae" }, acak),
    bangunSosok(
      studio,
      grup,
      { entitas: "anak1", ukuranLabel: 0.6, label: "Anak 1 · albino (aa)", x: 0.8, tinggi: 0.78, rambut: RAMBUT_ALBINO, keriting: false, baju: "#e4dfd5", kulit: KULIT_ALBINO },
      acak,
    ),
    bangunSosok(studio, grup, { entitas: "anak2", ukuranLabel: 0.6, label: "Anak 2 · ?", x: 4.6, tinggi: 0.68, rambut: RAMBUT_GELAP, keriting: true, baju: "#d9d2c5" }, acak),
  ];
  kali(grup, -4.7, 2.2, 0.8, 0.7);
  const lPeluang = labelHidup(grup, "peluang albino: ¼", 0.6);
  /* Punnett kecil Aa × Aa */
  const kecil = new THREE.Group();
  kecil.position.set(9.8, 3.8, 0);
  grup.add(kecil);
  const gen = (i: number, j: number) => {
    const a = ["A", "a"][j];
    const b = ["A", "a"][i];
    return a === "A" || b === "A" ? (a === "A" && b === "A" ? "AA" : "Aa") : "aa";
  };
  papanBerdiri(studio, grup, 5.5, 5.5, 9.8, 3.8);
  bangunPunnett(studio, kecil, ["A", "a"], ["A", "a"], (i, j) => ({ teks: gen(i, j) === "aa" ? "aa ¼" : gen(i, j) }), 1.75);
  const sorotAA = new THREE.Group();
  kecil.add(sorotAA);
  const bingkai = new THREE.TorusGeometry(0.75, 0.06, 8, 40);
  bingkai.translate(1.75, -1.75, 0.2);
  sorotAA.add(new THREE.Mesh(bingkai, bahan(studio, "tinta", ["tinta"], "#5c6878", false).bahan));
  kecil.visible = false;
  lantai(grup, 22, 7);
  return {
    grup,
    fokus: {
      utuh: lihat(-0.5, 2.5, 0, 17, 0, 1.3),
      sel: lihat(5.2, 3.3, 0, 19.5, 0.05, 1.33),
    },
    bayangan: { pusat: v(2, 0, 0), jangkauan: 10 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      orang.forEach((g, i) => (g.rotation.y = 0.07 * Math.sin(t * 0.6 + i)));
      muncul(kecil, p.fokus === "sel", dt, 1, 3);
      aturLabel(lPeluang, true, dt, v(4.6, 4.6, 0.3));
    },
  };
}

/* ================================================================== *
 * UJI SILANG
 * ================================================================== */

export function setUji(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y_ATAS = 5.4;
  /* pertanyaan di tengah atas */
  const tanya = bangunBiji(studio, grup, { warna: "kuning", bentuk: "bulat" }, 0.75);
  tanya.position.set(-1.5, Y_ATAS, 0);
  tulis(grup, "bulat: RR atau Rr?", 0.4, -1.5, Y_ATAS + 1.35, 0);
  kali(grup, 0, Y_ATAS, 0.4, 0.7);
  const penguji = bangunBiji(studio, grup, { warna: "kuning", bentuk: "keriput" }, 0.75);
  penguji.position.set(1.5, Y_ATAS, 0);
  tulis(grup, "penguji rr", 0.4, 1.5, Y_ATAS + 1.35, 0);
  /* dua kemungkinan hasil */
  const PANEL = [
    { x: -6.5, judul: "jika RR × rr", anak: ["Rr", "Rr", "Rr", "Rr"], hasil: "semua bulat" },
    { x: 6.5, judul: "jika Rr × rr", anak: ["Rr", "rr", "Rr", "rr"], hasil: "½ bulat : ½ keriput" },
  ];
  const putar: THREE.Object3D[] = [tanya, penguji];
  for (const d of PANEL) {
    const nampan = new THREE.BoxGeometry(5.2, 0.4, 2);
    nampan.translate(d.x, 0.2, 0);
    studio.tambah(bahan(studio, "alasPanjang", ["alas"], "#e4dfd5", 0.004), nampan, grup);
    d.anak.forEach((g, k) => {
      const b = bangunBiji(studio, grup, bijiDari(g), 0.5);
      b.position.set(d.x - 1.8 + k * 1.2, 0.95, 0);
      putar.push(b);
      tulis(grup, g, 0.46, d.x - 1.8 + k * 1.2, 1.95, 0);
    });
    tulis(grup, d.judul, 0.55, d.x, 2.9, 0);
    tulis(grup, d.hasil, 0.5, d.x, -0.55, 1.2);
    panah(studio, grup, [v(Math.sign(d.x) * 2.3, Y_ATAS - 0.5, 0), v(Math.sign(d.x) * 4.4, Y_ATAS - 1.2, 0), v(d.x * 0.95, 3.3, 0)], 0.06);
  }
  const lPasti = labelHidup(grup, "ada keriput → induk pasti Rr", 0.46);
  const lHampir = labelHidup(grup, "semua bulat → hampir pasti RR", 0.46);
  lantai(grup, 22, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 3.2, 0, 25, 0, 1.33),
      tanya: lihat(0, Y_ATAS, 0, 10, 0, 1.35),
      kiri: lihat(-6.5, 1.8, 0, 11, -0.1, 1.28),
      kanan: lihat(6.5, 1.8, 0, 11, 0.1, 1.28),
      pastiRr: lihat(6.5, 0.9, 0, 12.5, 0.1, 1.28),
      pastiRR: lihat(-6.5, 0.9, 0, 12.5, -0.1, 1.28),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      putar.forEach((b, i) => (b.rotation.y = t * 0.4 + i));
      aturLabel(lPasti, p.fokus === "pastiRr", dt, v(6.5, -1.4, 1.2));
      aturLabel(lHampir, p.fokus === "pastiRR", dt, v(-6.5, -1.4, 1.2));
    },
  };
}

/* ================================================================== *
 * SILANG BALIK
 * ================================================================== */

export function setBalik(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(9);
  const TIGA = [
    { x: -7, gen: "RR", ket: "induk bulat" },
    { x: 0, gen: "Rr", ket: "F1" },
    { x: 7, gen: "rr", ket: "induk keriput" },
  ];
  for (const d of TIGA) {
    alas(studio, grup, d.x, 0, 1.9);
    const tp = bangunTumpukan(studio, grup, 16, bijiDari(d.gen), acak, 0.24);
    tp.position.set(d.x, 0.55, 0.2);
    tulis(grup, d.gen, 0.65, d.x, -0.45, 2);
    tulis(grup, d.ket, 0.48, d.x, -1.2, 2);
  }
  panah(studio, grup, [v(-1.4, 2.4, 0), v(-3.5, 3.4, 0), v(-5.6, 2.4, 0)], 0.07);
  panah(studio, grup, [v(1.4, 2.4, 0), v(3.5, 3.4, 0), v(5.6, 2.4, 0)], 0.07);
  kali(grup, -3.5, 4.1, 0, 0.55);
  kali(grup, 3.5, 4.1, 0, 0.55);
  tulis(grup, "silang balik", 0.5, -3.5, 5, 0);
  tulis(grup, "silang balik", 0.5, 3.5, 5, 0);
  const lUji = labelHidup(grup, "= uji silang", 0.62);
  lantai(grup, 20, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2, 0, 22, 0, 1.27),
      resesif: lihat(3.5, 2, 0, 13.5, 0.12, 1.27),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
    perbarui: (p, dt) => aturLabel(lUji, p.fokus === "resesif", dt, v(3.5, 5.9, 0)),
  };
}

/* ================================================================== *
 * SAPI ANGUS — warna bulu polos, tak bertanduk
 * ================================================================== */

export function setSapi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const jantan = bangunSapi(studio, grup, { bulu: "hitam" });
  jantan.position.set(-5.2, 0, 0);
  jantan.scale.setScalar(1.08);
  const betina = bangunSapi(studio, grup, { bulu: "merah" });
  betina.position.set(5.2, 0, 0);
  betina.rotation.y = Math.PI;
  const anak = bangunSapi(studio, grup, { bulu: "merah" });
  anak.position.set(0.4, 0, 2.6);
  anak.rotation.y = 0.4;
  const Sanak = 0.55;
  anak.scale.setScalar(0.001);
  tulis(grup, "pejantan hitam", 0.55, -5.2, 5.1, 0);
  tulis(grup, "betina merah (bb)", 0.55, 5.2, 5.1, 0);
  kali(grup, 0, 2.6, 0, 0.7);
  const lTanya = labelHidup(grup, "BB atau Bb?", 0.6);
  const lAnak = labelHidup(grup, "anak merah (bb) → pejantan Bb", 0.55);
  const jam = buatJamTahap();
  lantai(grup, 22, 8);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.4, 0, 22, 0, 1.3),
      pejantan: lihat(-4.6, 2.6, 0, 10.5, -0.15, 1.3),
      anak: lihat(0, 2, 1, 16, 0, 1.28),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const t = p.detik ?? 0;
      jantan.rotation.y = 0.08 * Math.sin(t * 0.5);
      const s = f === "anak" ? tahapan(j, 0.2, 1.4) : 0;
      anak.userData.s = pelan((anak.userData.s as number) ?? 0, s, 6, dt);
      anak.scale.setScalar(Math.max(0.001, (anak.userData.s as number) * Sanak));
      anak.visible = (anak.userData.s as number) > 0.01;
      aturLabel(lTanya, f === "pejantan" || f === "utuh", dt, v(-5.2, 6, 0));
      aturLabel(lAnak, f === "anak" && j > 1.2, dt, v(0.4, -0.4, 3.6));
    },
  };
}
