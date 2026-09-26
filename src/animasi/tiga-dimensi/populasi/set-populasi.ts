import * as THREE from "three";
import { SIFAT, type KodeBasa } from "@/lib/warna";
import { lihat, type Studio } from "../studio";
import { bolaHalus, pembuatAcak } from "../bentuk";
import { bangunDNA } from "../model-dna";
import { bangunSapi } from "../model-hewan";
import { aturLabel, buatJamTahap, labelHidup, panah, pelan, v, type Set3D } from "../rangkai-set";
import { bahan, bangunPunnett } from "../mendel/model-mendel";
import { lantai, papanBerdiri, tahapan, tulis } from "../mendel/bantu";
import { bahanManik, bangunGaris, bangunManik, bangunSumbu, tampakSebagian } from "./model-populasi";

/**
 * SET PELAJARAN 6.1–6.2 — frekuensi alel, Hardy-Weinberg, pengubah frekuensi.
 */

const DASAR = "#e8e1d4";

/* ================================================================== *
 * POPULASI — 36 merah : 48 roan : 16 putih (digambar 9 : 12 : 4)
 * ================================================================== */

export function setPopulasi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(1908);
  const JENIS: { bulu: "merah" | "roan" | "putih"; n: number; x: number; label: string }[] = [
    { bulu: "merah", n: 9, x: -9, label: "36 merah (RR)" },
    { bulu: "roan", n: 12, x: 0.5, label: "48 roan (RW)" },
    { bulu: "putih", n: 4, x: 9.5, label: "16 putih (WW)" },
  ];
  const sapi: { g: THREE.Group; acak: THREE.Vector3; kel: THREE.Vector3 }[] = [];
  for (const j of JENIS) {
    for (let i = 0; i < j.n; i++) {
      const g = new THREE.Group();
      g.scale.setScalar(0.42);
      g.rotation.y = -0.35 + (acak() - 0.5) * 0.6;
      grup.add(g);
      bangunSapi(studio, g, { bulu: j.bulu });
      const posAcak = v((acak() - 0.5) * 20, 0, (acak() - 0.5) * 9);
      const kolom = i % 4;
      const baris = Math.floor(i / 4);
      const posKel = v(j.x + (kolom - 1.5) * 2.2 + (baris % 2) * 0.6, 0, -2 + baris * 1.9);
      g.position.copy(posAcak);
      sapi.push({ g, acak: posAcak, kel: posKel });
    }
  }
  const lJenis = JENIS.map((j) => {
    const l = labelHidup(grup, j.label, 0.6);
    return { l, pos: v(j.x, 3.6, -2) };
  });
  /* manik alel: 120 R dan 80 W, digambar 12 : 8 */
  const alel = new THREE.Group();
  alel.position.set(0, 5.6, 0);
  grup.add(alel);
  const bR = bahan(studio, "manikMerah", ["buluMerah"], SIFAT.buluMerah.warna, 0.003);
  const bW = bahan(studio, "manikPutih", ["buluPutih"], SIFAT.buluPutih.warna, 0.003);
  for (let i = 0; i < 20; i++) {
    const m = studio.tambah(i < 12 ? bR : bW, bolaHalus(0.32, 14, 10), alel);
    m.position.set(-5 + i * 0.52 + (i >= 12 ? 0.8 : 0), 0, 0);
  }
  tulis(alel, "alel R: 120 dari 200", 0.5, -2.1, -0.8, 0.3);
  tulis(alel, "alel W: 80 dari 200", 0.5, 3.5, -0.8, 0.3);
  alel.visible = false;
  /* batang p dan q */
  const pq = new THREE.Group();
  pq.position.set(0, 5.2, 0);
  grup.add(pq);
  const batang = (x: number, h: number, b: typeof bR, teks: string) => {
    const g = new THREE.BoxGeometry(1.4, h * 5, 0.6);
    g.translate(x, (h * 5) / 2, 0);
    studio.tambah(b, g, pq);
    tulis(pq, teks, 0.6, x, h * 5 + 0.5, 0.3);
  };
  batang(-1.2, 0.6, bR, "p = 0,6");
  batang(1.2, 0.4, bW, "q = 0,4");
  pq.visible = false;
  lantai(grup, 26, 12);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.6, 0, 20, 0, 1.2),
      hitung: lihat(0, 1.8, 0, 23, 0, 1.2),
      alel: lihat(0, 4, 0, 20, 0, 1.3),
      pq: lihat(0, 5.4, 0, 16, 0, 1.35),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 13 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const kel = f !== "utuh";
      sapi.forEach((s) => s.g.position.lerp(kel ? s.kel : s.acak, Math.min(1, dt * 1.5)));
      lJenis.forEach(({ l, pos }) => aturLabel(l, kel, dt, pos));
      alel.visible = f === "alel";
      pq.visible = f === "pq";
    },
  };
}

/* ================================================================== *
 * HW — Punnett populasi, syarat, menaksir pembawa
 * ================================================================== */

export function setHW(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.4;
  const S = 2;
  papanBerdiri(studio, grup, 3 * S + 0.5, 3 * S + 0.5, 0, Y);
  const ISI = [
    ["RR 0,36", "RW 0,24"],
    ["RW 0,24", "WW 0,16"],
  ];
  const BULU: ("merah" | "roan" | "putih")[][] = [
    ["merah", "roan"],
    ["roan", "putih"],
  ];
  const papan = bangunPunnett(
    studio,
    grup,
    ["R 0,6", "W 0,4"],
    ["R 0,6", "W 0,4"],
    (i, j) => ({
      teks: ISI[i][j],
      ikon: (g) => {
        const s = new THREE.Group();
        s.scale.setScalar(0.17);
        s.position.set(-0.3, -S * 0.36, 0.1);
        g.add(s);
        bangunSapi(studio, s, { bulu: BULU[i][j] });
      },
    }),
    S,
  );
  papan.grup.position.set(0, Y, 0.05);
  const persamaan = labelHidup(grup, "p² + 2pq + q² = 1", 0.9);
  /* papan syarat */
  const syarat = new THREE.Group();
  grup.add(syarat);
  papanBerdiri(studio, syarat, 7, 6.5, 8.5, Y);
  ["populasi besar", "kawin acak", "tanpa mutasi", "tanpa migrasi", "tanpa seleksi"].forEach((t, i) =>
    tulis(syarat, `${i + 1}. ${t}`, 0.5, 8.5, Y + 2 - i * 1, 0.2),
  );
  syarat.visible = false;
  /* papan pembawa */
  const pembawa = new THREE.Group();
  grup.add(pembawa);
  papanBerdiri(studio, pembawa, 7, 6.5, -8.5, Y);
  ["q² = 1/10.000 = 0,0001", "q = 0,01 · p = 0,99", "2pq = 2 × 0,99 × 0,01", "≈ 0,02 → 1 dari 50 pembawa"].forEach((t, i) =>
    tulis(pembawa, t, 0.5, -8.5, Y + 1.8 - i * 1.2, 0.2),
  );
  pembawa.visible = false;
  lantai(grup, 26, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y + 0.6, 0, 16, 0, 1.45),
      punnett: lihat(0, Y, 0, 14, 0, 1.45),
      syarat: lihat(4.2, Y, 0, 19, 0, 1.45),
      resesif: lihat(-4.2, Y, 0, 19, 0, 1.45),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 13 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      aturLabel(persamaan, f === "utuh", dt, v(0, Y + 4, 0.3));
      syarat.visible = f === "syarat";
      pembawa.visible = f === "resesif";
    },
  };
}

/* ================================================================== *
 * PENGUBAH — empat alas
 * ================================================================== */

export function setPengubah(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const X = [-9, -3, 3, 9];
  const alasB = bahan(studio, "alasPengubah", ["alas"], DASAR, 0.004);
  X.forEach((x) => {
    const a = new THREE.CylinderGeometry(2, 2.2, 0.5, 40);
    a.translate(x, 0.25, 0);
    studio.tambah(alasB, a, grup);
  });
  /* mutasi: potongan DNA dengan tanda */
  const dna = new THREE.Group();
  dna.position.set(X[0], 2.6, 0);
  dna.scale.setScalar(0.45);
  grup.add(dna);
  bangunDNA(studio, dna, "ATGCGTACGGTA");
  tulis(grup, "✕", 0.8, X[0] + 0.6, 2.6, 0.8);
  tulis(grup, "mutasi", 0.6, X[0], -0.6, 2.2);
  /* seleksi: tiga sapi, satu dipilih */
  for (let i = 0; i < 3; i++) {
    const g = new THREE.Group();
    g.position.set(X[1] + (i - 1) * 1.2, 0.5, (i - 1) * 0.5);
    g.scale.setScalar(0.32);
    grup.add(g);
    bangunSapi(studio, g, { bulu: i === 1 ? "hitam" : "merah" });
  }
  tulis(grup, "✓", 0.8, X[1], 2.4, 0.6);
  tulis(grup, "seleksi", 0.6, X[1], -0.6, 2.2);
  /* migrasi: dua kelompok dan panah */
  const bola = (x: number, b: KodeBasa) => {
    for (let i = 0; i < 5; i++) {
      const m = bangunManik(studio, grup, b, 0.26);
      m.position.set(x + (i % 3) * 0.55 - 0.55, 0.8 + Math.floor(i / 3) * 0.55, 0);
    }
  };
  bola(X[2] - 1, "A");
  bola(X[2] + 1.2, "G");
  panah(studio, grup, [v(X[2] - 0.9, 2.2, 0), v(X[2] + 0.1, 2.7, 0), v(X[2] + 1.1, 2.2, 0)], 0.06);
  tulis(grup, "migrasi", 0.6, X[2], -0.6, 2.2);
  /* hanyutan: dadu */
  const dadu = new THREE.Group();
  dadu.position.set(X[3], 1.3, 0);
  grup.add(dadu);
  studio.tambah(bahan(studio, "dadu", ["dadu"], "#f4f0e6", 0.006), new THREE.BoxGeometry(1.2, 1.2, 1.2), dadu);
  const bTitik = bahan(studio, "titikDadu", ["dadu"], "#1b2430", false);
  for (const [x, y] of [
    [-0.3, 0.3],
    [0, 0],
    [0.3, -0.3],
  ]) {
    const t = bolaHalus(0.1, 8, 6);
    t.translate(x, y, 0.61);
    studio.tambah(bTitik, t, dadu, false);
  }
  tulis(grup, "hanyutan genetik", 0.6, X[3], -0.6, 2.2);
  const lLaju = labelHidup(grup, "± 1 per 100.000 – 1.000.000 gamet", 0.5);
  lantai(grup, 26, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.4, 0, 22, 0, 1.25),
      mutasi: lihat(X[0], 1.8, 0, 9, 0, 1.25),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 12 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      dadu.rotation.set(t * 0.7, t * 0.9, 0);
      aturLabel(lLaju, p.fokus === "mutasi", dt, v(X[0], 4.4, 0.4));
    },
  };
}

/* ================================================================== *
 * SELEKSI — frekuensi naik; peternak memilih induk
 * ================================================================== */

export function setSeleksi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const grafik = new THREE.Group();
  grafik.position.set(-8, 1.2, 0);
  grup.add(grafik);
  bangunSumbu(studio, grafik, { lebar: 9, tinggi: 5, judulX: "generasi", judulY: "frekuensi alel" });
  const titik: THREE.Vector3[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = i / 40;
    const q = 1 / (1 + Math.exp(-(x - 0.5) * 10));
    titik.push(v(x * 9, 0.1 + q * 4.6, 0.1));
  }
  const kurva = bangunGaris(studio, grafik, titik, "#1b2430", 0.07, "seleksi");
  tulis(grafik, "alel yang disukai", 0.45, 6.5, 5.3, 0.2);
  /* peternak memilih induk: enam sapi dengan batang catatan bobot */
  const buatan = new THREE.Group();
  buatan.position.set(5.5, 0, 0);
  grup.add(buatan);
  const BOBOT = [3.1, 4.4, 2.6, 4.9, 3.5, 2.9];
  const bBatang = bahan(studio, "batangBobot", ["hitungan"], "#b9ae9c", 0.004);
  const bTerpilih = bahan(studio, "batangTerpilih", ["terpilih"], "#6b6255", 0.004);
  BOBOT.forEach((b, i) => {
    const x = (i - 2.5) * 1.35;
    const g = new THREE.Group();
    g.position.set(x, 0, 1.4);
    g.scale.setScalar(0.3);
    g.rotation.y = -Math.PI / 2;
    buatan.add(g);
    bangunSapi(studio, g, { bulu: "merah" });
    const terpilih = b > 4;
    const bt = new THREE.BoxGeometry(0.6, b * 0.7, 0.4);
    bt.translate(x, (b * 0.7) / 2, -0.8);
    studio.tambah(terpilih ? bTerpilih : bBatang, bt, buatan);
    if (terpilih) tulis(buatan, "dipilih", 0.42, x, b * 0.7 + 0.5, -0.8);
  });
  tulis(buatan, "catatan bobot", 0.45, 0, -0.6, 2.4);
  const jam = buatJamTahap();
  lantai(grup, 24, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(-3.5, 3.4, 0, 14, 0, 1.4),
      buatan: lihat(5.5, 2.2, 0, 13, 0, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 12 },
    perbarui: (p) => {
      const j = jam(p);
      tampakSebagian(kurva, p.fokus === "utuh" ? tahapan(j, 0.2, 4) : 1);
    },
  };
}

/* ================================================================== *
 * MIGRASI — pejantan pindah kandang
 * ================================================================== */

export function setMigrasi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(12);
  const pagar = bahan(studio, "pagar", ["pagar"], "#b49a7b", 0.003);
  const kandang = (x: number) => {
    for (const [a, b] of [
      [v(x - 4, 0.5, -3), v(x + 4, 0.5, -3)],
      [v(x - 4, 0.5, 3), v(x + 4, 0.5, 3)],
      [v(x - 4, 0.5, -3), v(x - 4, 0.5, 3)],
      [v(x + 4, 0.5, -3), v(x + 4, 0.5, 3)],
    ]) {
      const g = new THREE.CylinderGeometry(0.08, 0.08, a.distanceTo(b), 6);
      g.applyMatrix4(new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(0.5), new THREE.Quaternion().setFromUnitVectors(v(0, 1, 0), b.clone().sub(a).normalize()), v(1, 1, 1)));
      studio.tambah(pagar, g, grup);
    }
  };
  kandang(-5);
  kandang(5);
  for (let i = 0; i < 5; i++) {
    const a = new THREE.Group();
    a.position.set(-5 + (acak() - 0.5) * 6, 0, (acak() - 0.5) * 4);
    a.scale.setScalar(0.36);
    a.rotation.y = acak() * 6;
    grup.add(a);
    bangunSapi(studio, a, { bulu: "hitam" });
    const b = new THREE.Group();
    b.position.set(5 + (acak() - 0.5) * 6, 0, (acak() - 0.5) * 4);
    b.scale.setScalar(0.36);
    b.rotation.y = acak() * 6;
    grup.add(b);
    bangunSapi(studio, b, { bulu: "merah" });
  }
  tulis(grup, "populasi A", 0.55, -5, 3.4, -3);
  tulis(grup, "populasi B", 0.55, 5, 3.4, -3);
  const pejantan = new THREE.Group();
  pejantan.scale.setScalar(0.45);
  grup.add(pejantan);
  bangunSapi(studio, pejantan, { bulu: "hitam", tanduk: true });
  const lPindah = labelHidup(grup, "pejantan membawa alelnya", 0.5);
  const jam = buatJamTahap();
  lantai(grup, 24, 9);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.4, 0, 20, 0, 1.15),
      pindah: lihat(0, 1.4, 0, 20, 0, 1.15),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
    perbarui: (p, dt) => {
      const j = jam(p);
      const u = p.fokus === "pindah" ? tahapan(j, 0.2, 3.5) : 0;
      /* keluar dari kandang A, lewat depan, masuk kandang B */
      const lintas = new THREE.CatmullRomCurve3([v(-3, 0, 0), v(-1.5, 0, 4.2), v(1.5, 0, 4.2), v(3, 0, 0)]);
      pejantan.position.copy(lintas.getPoint(u));
      pejantan.rotation.y = u > 0 && u < 1 ? -0.3 : 0;
      aturLabel(lPindah, p.fokus === "pindah", dt, pejantan.position.clone().add(v(0, 2.4, 0)));
    },
  };
}

/* ================================================================== *
 * HANYUTAN — jalan acak, leher botol, kawin sedarah
 * ================================================================== */

/** Jalan acak Wright-Fisher (binomial didekati) dengan benih tetap. */
function jalanAcak(N: number, generasi: number, benih: number) {
  const acak = pembuatAcak(benih);
  let p = 0.5;
  const hasil = [p];
  for (let g = 0; g < generasi; g++) {
    let k = 0;
    for (let i = 0; i < 2 * N; i++) if (acak() < p) k++;
    p = k / (2 * N);
    hasil.push(p);
  }
  return hasil;
}

export function setHanyutan(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const G = 40;
  const buatGrafik = (x: number, N: number, judul: string) => {
    const g = new THREE.Group();
    g.position.set(x, 1, 0);
    grup.add(g);
    bangunSumbu(studio, g, { lebar: 7, tinggi: 4.5, judulX: "generasi", judulY: "frekuensi" });
    tulis(g, judul, 0.5, 3.5, 5.4, 0.2);
    const garisList = [0, 1, 2, 3, 4, 5].map((k) => {
      const d = jalanAcak(N, G, N * 17 + k);
      const titik = d.map((p, i) => v((i / G) * 7, 0.05 + p * 4.4, 0.1 + k * 0.02));
      return bangunGaris(studio, g, titik, "#5c6878", 0.035, "hanyut");
    });
    return { g, garisList };
  };
  const kecil = buatGrafik(-8.5, 10, "populasi kecil (10 ekor)");
  const besar = buatGrafik(0.5, 500, "populasi besar (500 ekor)");
  /* leher botol: manik beraneka warna → sedikit → tumbuh kembali dengan warna yang tersisa */
  const botol = new THREE.Group();
  botol.position.set(12, 0, 0);
  grup.add(botol);
  const WARNA: KodeBasa[] = ["A", "T", "G", "C", "U"];
  const acak = pembuatAcak(33);
  const manik = Array.from({ length: 36 }, (_, i) => {
    const b = WARNA[i % 5];
    const m = bangunManik(studio, botol, b, 0.26);
    m.userData.b = b;
    m.userData.asal = v((acak() - 0.5) * 3.6, 0.5 + acak() * 2.2, (acak() - 0.5) * 2.4);
    m.position.copy(m.userData.asal as THREE.Vector3);
    return m;
  });
  const bBotol = bahan(studio, "kacaBotol", ["kaca"], "#dfe7ee", 0.003, 0.3);
  const lb = new THREE.LatheGeometry(
    [v(0, 0, 0), v(2.4, 0.1, 0), v(2.5, 2.4, 0), v(0.6, 3.2, 0), v(0.55, 4.4, 0)].map((p) => new THREE.Vector2(p.x, p.y)),
    32,
  );
  const kaca = studio.tambah(bBotol, lb, botol, false);
  kaca.scale.set(1.05, 1.1, 1.05);
  tulis(botol, "leher botol", 0.5, 0, 5.4, 0.2);
  botol.visible = false;
  /* kawin sedarah: batang heterozigot turun, homozigot naik */
  const kawin = new THREE.Group();
  kawin.position.set(12, 0, 0);
  grup.add(kawin);
  const bHetero = bahan(studio, "hetero", ["hitungan"], "#b9ae9c", 0.004);
  const bHomo = bahan(studio, "homo", ["hitungan", "homozigot"], "#6b6255", 0.004);
  const mHetero = studio.tambah(bHetero, new THREE.BoxGeometry(1.4, 1, 0.6), kawin);
  mHetero.position.x = -1.2;
  const mHomo = studio.tambah(bHomo, new THREE.BoxGeometry(1.4, 1, 0.6), kawin);
  mHomo.position.x = 1.2;
  tulis(kawin, "heterozigot", 0.45, -1.2, -0.5, 0.4);
  tulis(kawin, "homozigot", 0.45, 1.2, -0.5, 0.4);
  kawin.visible = false;
  const jam = buatJamTahap();
  lantai(grup, 34, 6, 2);
  return {
    grup,
    fokus: {
      utuh: lihat(-4, 3.4, 0, 19, 0, 1.4),
      kecil: lihat(-5, 3.1, 0, 13.5, 0, 1.4),
      botol: lihat(12, 2.8, 0, 12, 0, 1.3),
      kawin: lihat(12, 2.4, 0, 10, 0, 1.3),
    },
    bayangan: { pusat: v(2, 0, 0), jangkauan: 17 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const u = f === "utuh" || f === "kecil" ? tahapan(j, 0.2, 5) : 1;
      [...kecil.garisList, ...besar.garisList].forEach((m) => tampakSebagian(m, u));
      besar.g.visible = f === "utuh";
      botol.visible = f === "botol";
      kawin.visible = f === "kawin";
      if (f === "botol") {
        /* 0–1,5 d: menyusut menjadi 5 manik (hanya A dan G); lalu tumbuh kembali hanya dengan A dan G */
        const susut = tahapan(j, 0.3, 1.2);
        const tumbuh = tahapan(j, 2, 2);
        manik.forEach((m, i) => {
          const tersisa = i < 5 ? i % 2 === 0 : false;
          const bangkit = i >= 5 && tumbuh > (i - 5) / 31;
          m.visible = susut < 0.99 || tersisa || bangkit;
          if (bangkit) {
            const b: KodeBasa = i % 2 === 0 ? "A" : "G";
            if (m.userData.b !== b) {
              m.material = bahanManik(studio, b).bahan;
              m.userData.b = b;
            }
          }
          const leher = v(0, 3.6, 0);
          m.position.lerpVectors(m.userData.asal as THREE.Vector3, leher, susut * (1 - tumbuh) * (tersisa ? 0.4 : 1));
        });
      }
      const F = f === "kawin" ? tahapan(j, 0.2, 3) : 0;
      mHetero.scale.y = pelan(mHetero.scale.y, 3 * (1 - 0.7 * F), 5, dt);
      mHetero.position.y = mHetero.scale.y / 2;
      mHomo.scale.y = pelan(mHomo.scale.y, 3 * (0.6 + 0.7 * F), 5, dt);
      mHomo.position.y = mHomo.scale.y / 2;
    },
  };
}

