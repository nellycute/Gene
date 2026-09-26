import * as THREE from "three";
import { lihat, type Studio } from "../studio";
import { pembuatAcak } from "../bentuk";
import { bangunSapi } from "../model-hewan";
import { aturLabel, buatJamTahap, labelHidup, panah, pelan, v, type Set3D } from "../rangkai-set";
import { bahan } from "../mendel/model-mendel";
import { garis, kali, lantai, papanBerdiri, tahapan, tulis } from "../mendel/bantu";
import { bangunKambing, bangunSumbu } from "./model-populasi";

/**
 * SET PELAJARAN 6.3–6.4 — sifat kuantitatif, heritabilitas, pemuliaan.
 */

const ABU = "#b9ae9c";
const TUA = "#6b6255";
const MUDA = "#e3dccf";

/** Kurva lonceng (tabung) di bidang xy, lebar L, tinggi H, digeser dx. */
function lonceng(studio: Studio, induk: THREE.Object3D, L: number, H: number, dx = 0, sigma = 0.18, kunci = "lonceng") {
  const titik: THREE.Vector3[] = [];
  for (let i = 0; i <= 60; i++) {
    const u = i / 60;
    titik.push(v(dx + u * L, 0.05 + H * Math.exp(-((u - 0.5) ** 2) / (2 * sigma * sigma)), 0.1));
  }
  return studio.tambah(bahan(studio, `${kunci}`, ["tinta"], "#1b2430", false), new THREE.TubeGeometry(new THREE.CatmullRomCurve3(titik), 120, 0.05, 6), induk, false);
}

/* ================================================================== *
 * KUANTI — kualitatif vs kuantitatif; P = G + L; G × L
 * ================================================================== */

export function setKuanti(studio: Studio): Set3D {
  const grup = new THREE.Group();
  /* kualitatif: tiga kelompok warna */
  const kuali = new THREE.Group();
  kuali.position.set(-8, 0, 0);
  grup.add(kuali);
  (["merah", "roan", "putih"] as const).forEach((w, i) => {
    const g = new THREE.Group();
    g.position.set((i - 1) * 2.4, 0, 0);
    g.scale.setScalar(0.4);
    kuali.add(g);
    bangunSapi(studio, g, { bulu: w });
    tulis(kuali, w, 0.5, (i - 1) * 2.4, -0.5, 1);
  });
  tulis(kuali, "kualitatif: kelas terpisah", 0.55, 0, 3.4);
  /* kuantitatif: histogram bobot + lonceng */
  const kuanti = new THREE.Group();
  kuanti.position.set(1, 0.3, 0);
  grup.add(kuanti);
  bangunSumbu(studio, kuanti, { lebar: 9, tinggi: 4.4, judulX: "bobot badan", judulY: "jumlah ternak" });
  const bB = bahan(studio, "batangKuanti", ["hitungan"], ABU, 0.004);
  const n = 13;
  for (let i = 0; i < n; i++) {
    const u = (i + 0.5) / n;
    const h = 4 * Math.exp(-((u - 0.5) ** 2) / (2 * 0.18 * 0.18));
    const b = new THREE.BoxGeometry((9 / n) * 0.85, h, 0.4);
    b.translate(u * 9, h / 2, 0);
    studio.tambah(bB, b, kuanti);
  }
  lonceng(studio, kuanti, 9, 4);
  tulis(kuanti, "kuantitatif: diukur, bersambung", 0.55, 4.5, 5.2);
  /* P = G + L: batang bertumpuk untuk tiga ternak */
  const pgl = new THREE.Group();
  grup.add(pgl);
  const bG = bahan(studio, "batangG", ["genetik"], TUA, 0.004);
  const bL = bahan(studio, "batangL", ["lingkungan"], MUDA, 0.004);
  [
    [2.4, 1.2],
    [1.6, 2.4],
    [3, 0.6],
  ].forEach(([g, l], i) => {
    const x = -2.5 + i * 2.5;
    const a = new THREE.BoxGeometry(1.2, g, 0.6);
    a.translate(x, g / 2, 2.5);
    studio.tambah(bG, a, pgl);
    const b = new THREE.BoxGeometry(1.2, l, 0.6);
    b.translate(x, g + l / 2, 2.5);
    studio.tambah(bL, b, pgl);
    tulis(pgl, `ternak ${i + 1}`, 0.42, x, -0.5, 3.2);
  });
  tulis(pgl, "P = G + L", 0.9, 0, 5.2, 2.5);
  tulis(pgl, "gelap: G (genetik) · terang: L (lingkungan)", 0.45, 0, 4.3, 2.5);
  pgl.visible = false;
  /* G × L: dua garis bersilang */
  const gxl = new THREE.Group();
  gxl.position.set(-4, 0.4, 2.5);
  grup.add(gxl);
  bangunSumbu(studio, gxl, { lebar: 8, tinggi: 4.4, judulY: "produksi" });
  tulis(gxl, "lingkungan 1", 0.45, 0.8, -0.6, 0.2);
  tulis(gxl, "lingkungan 2", 0.45, 7.2, -0.6, 0.2);
  garis(studio, gxl, v(0.8, 3.8, 0.1), v(7.2, 1.2, 0.1), 0.07, TUA, "gA");
  garis(studio, gxl, v(0.8, 1.8, 0.1), v(7.2, 3.4, 0.1), 0.07, ABU, "gB");
  tulis(gxl, "genotip A", 0.45, 9.2, 1.2, 0.2);
  tulis(gxl, "genotip B", 0.45, 9.2, 3.4, 0.2);
  gxl.visible = false;
  lantai(grup, 24, 7);
  return {
    grup,
    fokus: {
      utuh: lihat(-2, 2.4, 0, 21, 0, 1.3),
      kuali: lihat(-8, 1.8, 0, 11, 0, 1.3),
      pgl: lihat(0, 2.6, 2.5, 13, 0, 1.35),
      gxl: lihat(0.5, 2.4, 2.5, 15, 0, 1.4),
    },
    bayangan: { pusat: v(-2, 0, 0), jangkauan: 12 },
    perbarui: (p) => {
      const f = p.fokus ?? "utuh";
      pgl.visible = f === "pgl";
      gxl.visible = f === "gxl";
      kuali.visible = f === "utuh" || f === "kuali";
      kuanti.visible = f === "utuh" || f === "kuali";
    },
  };
}

/* ================================================================== *
 * RAGAM — V_P = V_G + V_L; h²; contoh; respon seleksi
 * ================================================================== */

export function setRagam(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 3.4;
  /* batang ragam fenotip yang terpecah */
  const pecah = new THREE.Group();
  grup.add(pecah);
  const bVA = bahan(studio, "vA", ["genetikAditif"], "#4d4538", 0.004);
  const bVD = bahan(studio, "vD", ["genetik"], TUA, 0.004);
  const bVL = bahan(studio, "vL", ["lingkungan"], MUDA, 0.004);
  const bVP = bahan(studio, "vP", ["fenotip"], ABU, 0.004);
  const utuh = studio.tambah(bVP, new THREE.BoxGeometry(10, 1.2, 0.6), pecah);
  utuh.position.set(0, Y + 2, 0);
  tulis(pecah, "ragam fenotip (V_P)", 0.5, 0, Y + 3.1, 0.3);
  const bagian = [
    { b: bVA, l: 3, teks: "aditif (V_A)" },
    { b: bVD, l: 1, teks: "dominansi" },
    { b: bVL, l: 6, teks: "lingkungan (V_L)" },
  ];
  let x = -5;
  const ruas = bagian.map((d) => {
    const m = studio.tambah(d.b, new THREE.BoxGeometry(d.l, 1.2, 0.6), pecah);
    m.position.set(x + d.l / 2, Y, 0);
    const l = tulis(pecah, d.teks, 0.42, x + d.l / 2, Y - 1.1, 0.3);
    x += d.l;
    return { m, l };
  });
  tulis(pecah, "genetik (V_G)", 0.42, -3, Y + 0.95, 0.3);
  const lH2 = labelHidup(grup, "h² = V_A ÷ V_P = 3/10 = 0,3", 0.6);
  /* contoh h² */
  const contoh = new THREE.Group();
  contoh.position.set(0, 0, 0);
  grup.add(contoh);
  papanBerdiri(studio, contoh, 11, 5.5, 0, Y + 0.6, -0.4);
  const DATA: [string, number, string][] = [
    ["bobot sapih", 0.25, "0,2–0,3"],
    ["produksi susu", 0.3, "± 0,3"],
    ["kesuburan", 0.05, "± 0,05"],
  ];
  DATA.forEach(([nama, h, teks], i) => {
    const y = Y + 2 - i * 1.4;
    tulis(contoh, nama, 0.48, -3.2, y, 0);
    const b = new THREE.BoxGeometry(h * 12, 0.5, 0.2);
    b.translate(-0.8 + (h * 12) / 2, y, 0);
    studio.tambah(bVA, b, contoh);
    tulis(contoh, teks, 0.45, -0.8 + h * 12 + 1, y, 0.1);
  });
  contoh.visible = false;
  /* respon seleksi: dua lonceng, ekor terpilih, anak bergeser */
  const respon = new THREE.Group();
  respon.position.set(-5, 0.5, 0);
  grup.add(respon);
  lonceng(studio, respon, 10, 3, 0, 0.16, "loncengInduk");
  const terpilih = new THREE.Group();
  respon.add(terpilih);
  for (let i = 0; i < 8; i++) {
    const u = 0.7 + i * 0.03;
    const h = 3 * Math.exp(-((u - 0.5) ** 2) / (2 * 0.16 * 0.16));
    const b = new THREE.BoxGeometry(0.28, h, 0.3);
    b.translate(u * 10, h / 2, 0);
    studio.tambah(bVA, b, terpilih);
  }
  const anak = new THREE.Group();
  anak.position.set(0, 0, 0.4);
  respon.add(anak);
  lonceng(studio, anak, 10, 3, 0, 0.16, "loncengAnak");
  tulis(anak, "anak (bergeser R)", 0.42, 6.6, 3.35, 0.2);
  garis(studio, respon, v(5, 0, 0.2), v(5, 3.3, 0.2), 0.03, "#5c6878", "rata");
  tulis(respon, "rata-rata kawanan", 0.4, 5, 3.7, 0.2);
  tulis(respon, "induk terpilih", 0.42, 8, 1.6, 0.3);
  const lR = labelHidup(grup, "R = h² × S", 0.8);
  const lS = labelHidup(grup, "S: keunggulan induk terpilih", 0.42);
  respon.visible = false;
  const jam = buatJamTahap();
  lantai(grup, 16, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y + 0.8, 0, 14, 0, 1.45),
      pecah: lihat(0, Y + 0.8, 0, 14, 0, 1.45),
      h2: lihat(0, Y + 0.8, 0, 14, 0, 1.45),
      contoh: lihat(0, Y + 0.6, 0, 13, 0, 1.45),
      respon: lihat(0, 2.4, 0, 14, 0, 1.4),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 8 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const terbelah = f !== "utuh" ? 1 : 0;
      pecah.visible = f === "utuh" || f === "pecah" || f === "h2";
      contoh.visible = f === "contoh";
      respon.visible = f === "respon";
      ruas.forEach(({ m, l }) => {
        m.visible = terbelah > 0;
        l.visible = terbelah > 0;
      });
      /* pada h², ruas aditif naik sedikit agar menonjol */
      ruas[0].m.position.z = pelan(ruas[0].m.position.z, f === "h2" ? 0.7 : 0, 4, dt);
      aturLabel(lH2, f === "h2", dt, v(0, Y - 2.4, 0.5));
      anak.position.x = f === "respon" ? 0.9 * tahapan(j, 0.8, 1.5) : 0;
      aturLabel(lR, f === "respon", dt, v(0, 5, 0.3));
      aturLabel(lS, f === "respon", dt, v(4.6, 0.2, 0.8));
    },
  };
}

/* ================================================================== *
 * PEMULIAAN — seleksi, sistem perkawinan, genomik, bangsa lokal
 * ================================================================== */

export function setPemuliaan(studio: Studio): Set3D {
  const grup = new THREE.Group();
  /* seleksi: empat pejantan dengan batang nilai pemuliaan */
  const seleksi = new THREE.Group();
  seleksi.position.set(-7, 0, 0);
  grup.add(seleksi);
  const NP = [1.8, 3.4, 2.4, 4.2];
  NP.forEach((n, i) => {
    const x = (i - 1.5) * 1.8;
    const g = new THREE.Group();
    g.position.set(x, 0, 1.6);
    g.scale.setScalar(0.3);
    g.rotation.y = -Math.PI / 2;
    seleksi.add(g);
    bangunSapi(studio, g, { bulu: "hitam", tanduk: true });
    const b = new THREE.BoxGeometry(0.7, n * 0.8, 0.4);
    b.translate(x, (n * 0.8) / 2, -0.6);
    studio.tambah(bahan(studio, n > 3 ? "npTinggi" : "npBiasa", ["hitungan"], n > 3 ? TUA : ABU, 0.004), b, seleksi);
  });
  tulis(seleksi, "seleksi: nilai pemuliaan", 0.55, 0, 4.4);
  /* sistem perkawinan: pasangan pejantan–betina */
  const kawin = new THREE.Group();
  kawin.position.set(1.5, 0, 0);
  grup.add(kawin);
  for (let i = 0; i < 2; i++) {
    const a = new THREE.Group();
    a.position.set(-1.4, 0, i * 2.4 - 1.2);
    a.scale.setScalar(0.3);
    kawin.add(a);
    bangunSapi(studio, a, { bulu: "hitam", tanduk: true });
    const b = new THREE.Group();
    b.position.set(1.4, 0, i * 2.4 - 1.2);
    b.scale.setScalar(0.3);
    b.rotation.y = Math.PI;
    kawin.add(b);
    bangunSapi(studio, b, { bulu: i === 0 ? "merah" : "putih" });
    kali(kawin, 0, 0.9, i * 2.4 - 1.2, 0.5);
  }
  tulis(kawin, "sistem perkawinan", 0.55, 0, 3.2);
  /* genomik: chip kecil */
  const genomik = new THREE.Group();
  genomik.position.set(1.5, 4.8, 0);
  grup.add(genomik);
  const chip = new THREE.BoxGeometry(2.4, 1.2, 0.15);
  studio.tambah(bahan(studio, "chip", ["chip"], "#c9cdd3", 0.004), chip, genomik);
  const acak = pembuatAcak(4);
  const bTitik = [bahan(studio, "chipA", ["hitungan"], TUA, false), bahan(studio, "chipB", ["hitungan"], ABU, false)];
  for (let i = 0; i < 40; i++) {
    const t = new THREE.BoxGeometry(0.14, 0.14, 0.05);
    t.translate(-1.05 + (i % 10) * 0.23, -0.4 + Math.floor(i / 10) * 0.25, 0.1);
    studio.tambah(bTitik[acak() > 0.5 ? 0 : 1], t, genomik, false);
  }
  tulis(genomik, "data DNA: seleksi genomik", 0.45, 0, 1.1, 0.2);
  genomik.visible = false;
  /* bangsa lokal */
  const lokal = new THREE.Group();
  lokal.position.set(9, 0, 0);
  grup.add(lokal);
  const bali = new THREE.Group();
  bali.position.set(-1.8, 0, 0);
  bali.scale.setScalar(0.5);
  lokal.add(bali);
  bangunSapi(studio, bali, { bulu: "merah", kakiPutih: true });
  tulis(lokal, "sapi Bali", 0.5, -1.2, -0.5, 1.2);
  const madura = new THREE.Group();
  madura.position.set(1.8, 0, 1.2);
  madura.scale.setScalar(0.45);
  lokal.add(madura);
  bangunSapi(studio, madura, { bulu: "merah" });
  tulis(lokal, "sapi Madura", 0.5, 2.2, -0.5, 2.4);
  tulis(lokal, "alel adaptasi tropis", 0.55, 0.2, 3.4);
  lantai(grup, 28, 7, 1);
  return {
    grup,
    fokus: {
      utuh: lihat(1, 2, 0, 22, 0, 1.3),
      seleksi: lihat(-7, 2, 0, 11, 0, 1.3),
      kawin: lihat(1.5, 1.6, 0, 9.5, 0, 1.2),
      genomik: lihat(-2.5, 3, 0, 14, 0, 1.3),
      lokal: lihat(9, 1.6, 0, 11, 0, 1.25),
    },
    bayangan: { pusat: v(1, 0, 0), jangkauan: 14 },
    perbarui: (p) => {
      genomik.visible = p.fokus === "genomik";
    },
  };
}

/* ================================================================== *
 * HETEROSIS — dua bangsa, F1, grafik
 * ================================================================== */

export function setHeterosis(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const hewan = new THREE.Group();
  grup.add(hewan);
  const a = new THREE.Group();
  a.position.set(-7, 0, 0);
  a.scale.setScalar(0.45);
  hewan.add(a);
  bangunSapi(studio, a, { bulu: "hitam" });
  const b = new THREE.Group();
  b.position.set(-2.5, 0, 0);
  b.scale.setScalar(0.45);
  b.rotation.y = Math.PI;
  hewan.add(b);
  bangunSapi(studio, b, { bulu: "putih" });
  kali(hewan, -4.75, 1.2, 0, 0.7);
  tulis(hewan, "bangsa A", 0.5, -7, -0.5, 1);
  tulis(hewan, "bangsa B", 0.5, -2.5, -0.5, 1);
  const f1 = new THREE.Group();
  f1.position.set(-4.75, 0, 3.4);
  f1.scale.setScalar(0.45);
  hewan.add(f1);
  bangunSapi(studio, f1, { bulu: "roan" });
  tulis(hewan, "F1 silangan", 0.5, -4.75, -0.5, 4.4);
  /* grafik batang */
  const grafik = new THREE.Group();
  grafik.position.set(2.5, 0.3, 0);
  grup.add(grafik);
  const bB = bahan(studio, "batangHet", ["hitungan"], ABU, 0.004);
  const bF = bahan(studio, "batangF1", ["hitungan", "f1"], TUA, 0.004);
  const NILAI: [string, number, typeof bB][] = [
    ["A", 3, bB],
    ["B", 2, bB],
    ["F1", 3.1, bF],
    ["F2", 2.8, bB],
  ];
  const batang = NILAI.map(([n, h, bh], i) => {
    const m = studio.tambah(bh, new THREE.BoxGeometry(1, 1, 0.5), grafik);
    m.position.set(i * 1.6, h / 2, 0);
    m.scale.y = h;
    tulis(grafik, n, 0.5, i * 1.6, -0.5, 0.3);
    return m;
  });
  garis(studio, grafik, v(-0.7, 2.5, 0.3), v(5.6, 2.5, 0.3), 0.03, "#5c6878", "tetua");
  tulis(grafik, "rata-rata tetua", 0.4, 7.2, 2.5, 0.3);
  const lHet = labelHidup(grafik, "heterosis", 0.5);
  grafik.visible = false;
  lantai(grup, 22, 8);
  return {
    grup,
    fokus: {
      utuh: lihat(-4.5, 1.4, 1.5, 13, 0, 1.2),
      grafik: lihat(1, 2, 1, 16, 0, 1.35),
      f2: lihat(3, 1.8, 0, 11, 0, 1.4),
    },
    bayangan: { pusat: v(-1, 0, 0), jangkauan: 11 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      grafik.visible = f !== "utuh";
      batang[3].visible = f === "f2";
      aturLabel(lHet, f !== "utuh", dt, v(3.2, 3.8, 0.4));
    },
  };
}

/* ================================================================== *
 * KAMBING — Etawa × Kacang → Peranakan Etawa
 * ================================================================== */

export function setKambing(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const etawa = new THREE.Group();
  etawa.position.set(-5, 0, -1.5);
  grup.add(etawa);
  bangunKambing(studio, etawa, { besar: true, telingaPanjang: true, dasar: "putih", belang: "hitam", janggut: true });
  tulis(grup, "Etawa (India): besar, telinga panjang", 0.6, -5, 4.8, -1.5);
  const kacang = new THREE.Group();
  kacang.position.set(4.5, 0, -1.5);
  kacang.rotation.y = Math.PI;
  grup.add(kacang);
  bangunKambing(studio, kacang, { dasar: "hitam", belang: "merah" });
  tulis(grup, "Kacang (lokal): kecil, tangguh", 0.6, 4.5, 3.8, -1.5);
  kali(grup, 0, 1.8, -1.5, 0.8);
  const pe = new THREE.Group();
  pe.position.set(0, 0, 3);
  pe.rotation.y = -0.4;
  grup.add(pe);
  bangunKambing(studio, pe, { besar: true, telingaPanjang: true, dasar: "putih", belang: "merah" });
  pe.scale.setScalar(0.9);
  tulis(grup, "Peranakan Etawa (PE)", 0.65, 0, -0.6, 4.4);
  panah(studio, grup, [v(0, 3, -1.2), v(0, 3.2, 0.8), v(0, 3, 2)], 0.06);
  lantai(grup, 20, 10);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.2, 0, 16.5, 0, 1.25),
      pe: lihat(0, 2, 3, 11, 0.1, 1.25),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      pe.rotation.y = -0.4 + 0.2 * Math.sin(t * 0.5);
    },
  };
}
