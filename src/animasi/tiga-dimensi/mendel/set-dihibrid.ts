import * as THREE from "three";
import { SIFAT } from "@/lib/warna";
import { lihat, type Studio } from "../studio";
import { bolaHalus, pembuatAcak } from "../bentuk";
import { alas, aturLabel, buatJamTahap, labelHidup, pelan, v, type Set3D } from "../rangkai-set";
import { bahan, bangunBiji, bangunBunga, bangunGamet, bangunPunnett, bangunTanaman, bangunTumpukan, bijiDari, GAMET, type Biji } from "./model-mendel";
import { bangunHomolog, garis, lantai, muncul, papanBerdiri, selTembus, tahapan, tulis, type Homolog } from "./bantu";

/**
 * SET PELAJARAN 2.5–2.6 — dihibrid, trihibrid, rumus cepat.
 *
 *  hitung2    F2 dihibrid: 315 : 108 : 101 : 32; dua kombinasi baru terangkat
 *  gamet4     sel RrYy (dua pasang homolog) → empat macam gamet
 *  punnett16  papan 4 × 4; biji terbang ke empat kelompok 9 : 3 : 3 : 1
 *  asortasi   metafase I dengan dua pasang homolog; susunan kedua membalik
 *  gamet8     diagram cabang RrYyPp → delapan gamet
 *  punnett64  papan 8 × 8 yang terisi kotak demi kotak
 *  rumus      tabel 2ⁿ, 3ⁿ; kubus 2 × 2 × 2 gamet dan 3 × 3 × 3 genotip
 *  garpu      diagram garpu ¾ / ¼ untuk tiga sifat; jalur bulat–hijau–ungu
 */

/** Ikon bunga kecil untuk sifat ketiga (P/p). */
function ikonBunga(studio: Studio, induk: THREE.Object3D, ungu: boolean, r = 0.16) {
  const e = ungu ? "bungaUngu" : "bungaPutih";
  const m = studio.tambah(bahan(studio, `ikon-${e}`, [e], SIFAT[e].warna, 0.003), bolaHalus(r, 12, 10), induk);
  return m;
}

/* ================================================================== *
 * HITUNG2 — 9 : 3 : 3 : 1
 * ================================================================== */

export function setHitung2(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(556);
  const KEL: { biji: Biji; n: number; teks: string; baru: boolean }[] = [
    { biji: { bentuk: "bulat", warna: "kuning" }, n: 39, teks: "315 bulat kuning", baru: false },
    { biji: { bentuk: "bulat", warna: "hijau" }, n: 13, teks: "108 bulat hijau", baru: true },
    { biji: { bentuk: "keriput", warna: "kuning" }, n: 13, teks: "101 keriput kuning", baru: true },
    { biji: { bentuk: "keriput", warna: "hijau" }, n: 4, teks: "32 keriput hijau", baru: false },
  ];
  const tumpukan = KEL.map((k, i) => {
    const x = (i - 1.5) * 4.8;
    const g = new THREE.Group();
    g.position.x = x;
    grup.add(g);
    alas(studio, g, 0, 0, 1.9);
    const tp = bangunTumpukan(studio, g, k.n, k.biji, acak, 0.23);
    tp.position.set(0, 0.55, 0.1);
    tulis(g, k.teks, 0.5, 0, -0.45, 2);
    const lBaru = labelHidup(grup, "kombinasi baru", 0.52);
    return { g, k, lBaru, x };
  });
  tulis(grup, "F2 dari RrYy × RrYy · 556 biji", 0.6, 0, 4.6);
  lantai(grup, 22, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.4, 0, 22, 0, 1.22),
      baru: lihat(0, 1.8, 0, 18, 0, 1.25),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
    perbarui: (p, dt) => {
      const baru = p.fokus === "baru";
      tumpukan.forEach(({ g, k, lBaru, x }) => {
        g.position.y = pelan(g.position.y, baru && k.baru ? 0.8 : 0, 3, dt);
        aturLabel(lBaru, baru && k.baru, dt, v(x, 3.2, 0));
      });
    },
  };
}

/* ================================================================== *
 * GAMET4 — RrYy → RY, Ry, rY, ry
 * ================================================================== */

export function setGamet4(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.6;
  const sel = selTembus(studio, grup, 3, "selTanaman", "#e4ecd8");
  sel.position.set(0, Y, 0);
  tulis(grup, "sel RrYy", 0.55, 0, Y + 3.5);
  const pasang = (alel: [string, string], x: number, pendek: boolean) => {
    const g = new THREE.Group();
    g.position.set(x, Y + 0.3, 0);
    grup.add(g);
    alel.forEach((a, k) => {
      const h = bangunHomolog(studio, g, a, k === 0 ? "kromatin" : "kromosomAyah", {
        sisi: k === 0 ? -1 : 1,
        p: pendek ? 0.55 : 0.9,
        q: pendek ? 0.95 : 1.6,
        ukuranHuruf: 0.45,
      });
      h.grup.position.x = k === 0 ? -0.4 : 0.4;
    });
    return g;
  };
  pasang(["R", "r"], -1.2, false);
  pasang(["Y", "y"], 1.2, true);
  const GAMET4 = ["RY", "Ry", "rY", "ry"];
  const gamet = GAMET4.map((t, i) => {
    const g = bangunGamet(studio, grup, t, 0.75);
    g.userData.tujuan = v((i - 1.5) * 3.4, 0.9, 1);
    g.visible = false;
    return g;
  });
  const lSeper = GAMET4.map(() => labelHidup(grup, "¼", 0.55));
  const jam = buatJamTahap();
  lantai(grup, 16, 7);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y, 0, 15, 0, 1.35),
      gamet: lihat(0, 3.7, 0, 19.5, 0, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 8 },
    perbarui: (p, dt) => {
      const j = jam(p);
      const ada = p.fokus === "gamet";
      gamet.forEach((g, i) => {
        const u = ada ? tahapan(j, 0.2 + i * 0.35, 1.2) : 0;
        g.position.copy(v(0, Y, 0).lerp(g.userData.tujuan as THREE.Vector3, u));
        g.visible = u > 0.02;
        g.scale.setScalar(0.3 + 0.7 * u);
        aturLabel(lSeper[i], u > 0.95, dt, (g.userData.tujuan as THREE.Vector3).clone().add(v(0, -1.25, 0.2)));
      });
    },
  };
}

/* ================================================================== *
 * PUNNETT16 — 4 × 4 dan pengelompokan 9 : 3 : 3 : 1
 * ================================================================== */

const GAMET2 = ["RY", "Ry", "rY", "ry"];
const gabung = (a: string, b: string) => {
  const urut = (x: string, y: string) => (x === x.toUpperCase() ? x + y : y + x);
  return urut(a[0], b[0]) + urut(a[1], b[1]);
};

export function setPunnett16(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const S = 1.45;
  const X = -5.5;
  const Y = 4.4;
  papanBerdiri(studio, grup, 5 * S + 0.5, 5 * S + 0.5, X, Y);
  const papan = bangunPunnett(studio, grup, GAMET2, GAMET2, (i, j) => ({ teks: gabung(GAMET2[j], GAMET2[i]), ikon: () => {} }), S);
  papan.grup.position.set(X, Y, 0.05);
  /* biji dibuat terpisah dari papan supaya bisa terbang ke kelompoknya */
  const KELOMPOK = [
    { kunci: "bulat-kuning", pusat: v(4.2, 5.8, 0), teks: "9 bulat kuning" },
    { kunci: "bulat-hijau", pusat: v(9.4, 5.8, 0), teks: "3 bulat hijau" },
    { kunci: "keriput-kuning", pusat: v(4.2, 2, 0), teks: "3 keriput kuning" },
    { kunci: "keriput-hijau", pusat: v(9.4, 2, 0), teks: "1 keriput hijau" },
  ];
  const isiKelompok = KELOMPOK.map(() => 0);
  const biji: { m: THREE.Object3D; dari: THREE.Vector3; ke: THREE.Vector3; urut: number }[] = [];
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      const g = gabung(GAMET2[j], GAMET2[i]);
      const b = bijiDari(g);
      const k = KELOMPOK.findIndex((x) => x.kunci === `${b.bentuk}-${b.warna}`);
      const n = isiKelompok[k]++;
      const m = bangunBiji(studio, grup, b, S * 0.16);
      const dari = papan.pusat(i, j).add(v(X, Y - S * 0.18, 0.15));
      const ke = KELOMPOK[k].pusat.clone().add(v((n % 3) * 0.95 - 0.95, Math.floor(n / 3) * 0.95 - 0.3, 0.3));
      m.position.copy(dari);
      biji.push({ m, dari, ke, urut: i * 4 + j });
    }
  const lKel = KELOMPOK.map((k) => {
    const l = labelHidup(grup, k.teks, 0.52);
    return { l, pos: k.pusat.clone().add(v(0, -1.45, 0.4)) };
  });
  const jam = buatJamTahap();
  let kumpul = 0;
  lantai(grup, 24, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(X, Y, 0, 13.5, 0, 1.45),
      kelompok: lihat(1.8, Y, 0, 24, 0, 1.45),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
    perbarui: (p, dt) => {
      const j = jam(p);
      const kel = p.fokus === "kelompok";
      kumpul = pelan(kumpul, kel ? 1 : 0, 8, dt);
      for (const b of biji) {
        const u = kel ? tahapan(j, 0.2 + b.urut * 0.08, 1.2) : 0;
        const tengah = b.dari.clone().lerp(b.ke, 0.5).add(v(0, 1.5, 1.2));
        b.m.position.copy(new THREE.QuadraticBezierCurve3(b.dari, tengah, b.ke).getPoint(u));
        b.m.scale.setScalar(S * 0.16 * (1 + 0.9 * u));
      }
      lKel.forEach(({ l, pos }) => aturLabel(l, kel && j > 2.8, dt, pos));
    },
  };
}

/* ================================================================== *
 * ASORTASI — dua pasang homolog di metafase I
 * ================================================================== */

export function setAsortasi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.4;
  const sel = selTembus(studio, grup, 5, "membranSel", "#dfe7ee");
  sel.position.set(0, Y, 0);
  const pasangan = (alel: [string, string], y: number, pendek: boolean) => {
    const g = new THREE.Group();
    g.position.set(0, y, 0);
    g.scale.setScalar(1.25);
    grup.add(g);
    const h: Homolog[] = alel.map((a, k) => {
      const x = bangunHomolog(studio, g, a, k === 0 ? "kromatin" : "kromosomAyah", {
        sisi: k === 0 ? -1 : 1,
        kromatid: 2,
        p: pendek ? 0.5 : 0.8,
        q: pendek ? 0.8 : 1.3,
        ukuranHuruf: 0.6,
      });
      x.grup.position.x = k === 0 ? -0.8 : 0.8;
      return x;
    });
    return { g, h };
  };
  const p1 = pasangan(["R", "r"], Y + 1.7, false);
  const p2 = pasangan(["Y", "y"], Y - 1.8, true);
  garis(studio, grup, v(0, Y - 3.6, 0), v(0, Y + 3.6, 0), 0.02, "#9aa3ad", "bidangTengah");
  tulis(grup, "bidang tengah", 0.45, 0, Y + 4.1);
  tulis(grup, "kutub", 0.45, -5.9, Y);
  tulis(grup, "kutub", 0.45, 5.9, Y);
  const L = {
    kiri1: labelHidup(grup, "gamet RY", 0.58),
    kanan1: labelHidup(grup, "gamet ry", 0.58),
    kiri2: labelHidup(grup, "gamet Ry", 0.58),
    kanan2: labelHidup(grup, "gamet rY", 0.58),
    s1: labelHidup(grup, "susunan 1", 0.55),
    s2: labelHidup(grup, "susunan 2", 0.55),
  };
  let balik = 0;
  lantai(grup, 14, 8);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y, 0, 19, 0.15, 1.38),
      satu: lihat(0, Y, 0, 19, 0.1, 1.38),
      dua: lihat(0, Y, 0, 19, 0.1, 1.38),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      balik = pelan(balik, f === "dua" ? 1 : 0, 2.5, dt);
      p2.g.rotation.y = balik * Math.PI;
      p1.g.rotation.y = 0;
      const bawah = Y - 3.1;
      aturLabel(L.kiri1, f === "satu", dt, v(-3.6, bawah, 1));
      aturLabel(L.kanan1, f === "satu", dt, v(3.6, bawah, 1));
      aturLabel(L.kiri2, f === "dua" && balik > 0.95, dt, v(-3.6, bawah, 1));
      aturLabel(L.kanan2, f === "dua" && balik > 0.95, dt, v(3.6, bawah, 1));
      aturLabel(L.s1, f === "satu", dt, v(0, Y + 5.4, 0));
      aturLabel(L.s2, f === "dua", dt, v(0, Y + 5.4, 0));
    },
  };
}

/* ================================================================== *
 * GAMET8 — diagram cabang
 * ================================================================== */

export function setGamet8(studio: Studio): Set3D {
  const grup = new THREE.Group();
  /* induk F1: tanaman ungu berbiji bulat kuning */
  alas(studio, grup, -10.5, 0, 1.6);
  const t = bangunTanaman(studio, grup, { bunga: "ungu", biji: Array(4).fill({ warna: "kuning", bentuk: "bulat" }) });
  t.position.set(-10.5, 0.55, 0);
  t.scale.setScalar(0.9);
  tulis(grup, "F1: RrYyPp", 0.6, -10.5, -0.5, 1.8);
  const bUngu = bangunBunga(studio, grup, "ungu", []);
  bUngu.scale.setScalar(1.6);
  bUngu.position.set(-12, 7.2, 0);
  const bPutih = bangunBunga(studio, grup, "putih", []);
  bPutih.scale.setScalar(1.6);
  bPutih.position.set(-9, 7.2, 0);
  tulis(grup, "ungu (P)", 0.45, -12, 6.1, 0.4);
  tulis(grup, "putih (p)", 0.45, -9, 6.1, 0.4);

  /* pohon: 2 → 4 → 8 */
  const Y_DAUN = Array.from({ length: 8 }, (_, k) => 8 - k * 1.05);
  const X_ARAS = [-6.6, -2.4, 1.8];
  const akar = v(-8.4, 4.3, 0);
  const aras: { grup: THREE.Group }[] = [];
  const HURUF = [
    ["R", "r"],
    ["Y", "y"],
    ["P", "p"],
  ];
  let induk: { pos: THREE.Vector3; teks: string }[] = [{ pos: akar, teks: "" }];
  for (let a = 0; a < 3; a++) {
    const g = new THREE.Group();
    grup.add(g);
    const anak: { pos: THREE.Vector3; teks: string }[] = [];
    const n = 2 ** (a + 1);
    const lebar = 8 / n;
    for (let k = 0; k < n; k++) {
      const yRata = Y_DAUN.slice(k * lebar, (k + 1) * lebar).reduce((s, y) => s + y, 0) / lebar;
      const pos = v(X_ARAS[a], yRata, 0);
      const orang = induk[Math.floor(k / 2)];
      const huruf = HURUF[a][k % 2];
      garis(studio, g, orang.pos.clone().add(v(0.35, 0, 0)), pos.clone().add(v(-0.35, 0, 0)), 0.035);
      tulis(g, huruf, 0.6, pos.x, pos.y, 0.2);
      anak.push({ pos, teks: orang.teks + huruf });
    }
    aras.push({ grup: g });
    induk = anak;
  }
  const daun = new THREE.Group();
  grup.add(daun);
  const gametDaun = induk.map(({ pos, teks }) => {
    garis(studio, daun, pos.clone().add(v(0.35, 0, 0)), v(5.55, pos.y, 0), 0.02, "#9aa3ad", "garisPutus");
    /* gamet kecil + tulisan di sampingnya — huruf di dalam bola terlalu kecil untuk dibaca */
    const gm = new THREE.Group();
    gm.position.set(6, pos.y, 0);
    daun.add(gm);
    studio.tambah(bahan(studio, "gamet", ["gamet"], GAMET, 0.003), bolaHalus(0.36, 16, 12), gm);
    tulis(gm, teks, 0.55, 1.25, 0, 0.2);
    return gm;
  });
  tulis(daun, "8 macam gamet", 0.58, 6.8, 9.1);
  aras.forEach((a) => (a.grup.visible = false));
  daun.visible = false;
  const jam = buatJamTahap();
  lantai(grup, 24, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(-2.2, 4.3, 0, 25, 0, 1.42),
      induk: lihat(-10.3, 4, 0, 12.5, 0, 1.36),
      cabang: lihat(-2.2, 4.3, 0, 25, 0, 1.42),
    },
    bayangan: { pusat: v(-3, 0, 0), jangkauan: 12 },
    perbarui: (p, dt) => {
      const j = jam(p);
      const c = p.fokus === "cabang" || p.fokus === "utuh";
      aras.forEach((a, i) => (a.grup.visible = c && j > 0.3 + i * 1.1));
      daun.visible = c && j > 3.6;
      gametDaun.forEach((g, i) => muncul(g, daun.visible && j > 3.6 + i * 0.12, dt, 1, 5));
      t.rotation.z = 0.03 * Math.sin((p.detik ?? 0) * 0.9);
    },
  };
}

/* ================================================================== *
 * PUNNETT64 — 8 × 8
 * ================================================================== */

const GAMET3 = ["RYP", "RYp", "RyP", "Ryp", "rYP", "rYp", "ryP", "ryp"];

export function setPunnett64(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const S = 1.05;
  const Y = 5.4;
  papanBerdiri(studio, grup, 9 * S + 0.5, 9 * S + 0.5, 0, Y);
  const gab3 = (a: string, b: string) =>
    [0, 1, 2].map((k) => (a[k] === a[k].toUpperCase() ? a[k] + b[k] : b[k] + a[k])).join("");
  const papan = bangunPunnett(
    studio,
    grup,
    GAMET3,
    GAMET3,
    (i, j) => {
      const g = gab3(GAMET3[j], GAMET3[i]);
      return {
        teks: g,
        biji: bijiDari(g),
        ikon: (sel) => {
          const m = ikonBunga(studio, sel, /P/.test(g), S * 0.09);
          m.position.set(S * 0.28, -S * 0.18, 0.15);
        },
      };
    },
    S,
  );
  papan.grup.position.set(0, Y, 0.05);
  const sel = papan.sel.flat();
  sel.forEach((s) => (s.visible = false));
  const jam = buatJamTahap();
  lantai(grup, 12, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y + 0.3, 0, 21.5, 0, 1.45),
      dekat: lihat(-2.2, Y + 2.2, 0, 7, 0.1, 1.42),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 7 },
    perbarui: (p, dt) => {
      const j = jam(p);
      /* kotak terisi satu per satu — terasa betapa lamanya menggambar 64 kotak */
      sel.forEach((s, i) => muncul(s, p.fokus === "dekat" || j > 0.3 + i * 0.09, dt, 1, 6));
    },
  };
}

/* ================================================================== *
 * RUMUS — 2ⁿ, 3ⁿ
 * ================================================================== */

export function setRumus(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 5.8;
  papanBerdiri(studio, grup, 15, 6.2, 0, Y);
  const KOLOM = [-5.4, -1.8, 1.8, 5.4];
  const JUDUL = ["n", "gamet 2ⁿ", "genotip 3ⁿ", "fenotip 2ⁿ"];
  JUDUL.forEach((t, k) => tulis(grup, t, 0.5, KOLOM[k], Y + 2.3, 0.1));
  garis(studio, grup, v(-7.2, Y + 1.8, 0.05), v(7.2, Y + 1.8, 0.05), 0.025);
  const BARIS = [
    ["1", "2", "3", "2"],
    ["2", "4", "9", "4"],
    ["3", "8", "27", "8"],
  ];
  const yBaris = (i: number) => Y + 1.2 - i * 1.1;
  const baris = BARIS.map((b, i) => {
    const g = new THREE.Group();
    grup.add(g);
    b.forEach((t, k) => tulis(g, t, 0.55, KOLOM[k], yBaris(i), 0.1));
    return g;
  });
  const lRasio = labelHidup(grup, "rasio fenotip: (3 : 1)ⁿ", 0.5);
  const lRasio3 = labelHidup(grup, "n = 3 → 27 : 9 : 9 : 9 : 3 : 3 : 3 : 1", 0.46);
  const bingkai = new THREE.Group();
  grup.add(bingkai);
  const yb = yBaris(2);
  for (const [a, b] of [
    [v(-7, yb - 0.5, 0.1), v(7, yb - 0.5, 0.1)],
    [v(-7, yb + 0.5, 0.1), v(7, yb + 0.5, 0.1)],
  ])
    garis(studio, bingkai, a, b, 0.035);

  /* kubus peluang di depan papan */
  const kubus = new THREE.Group();
  grup.add(kubus);
  const gamet8 = new THREE.Group();
  gamet8.position.set(-4.6, 1.2, 3.5);
  kubus.add(gamet8);
  for (let k = 0; k < 8; k++) {
    const gm = bangunGamet(studio, gamet8, GAMET3[k], 0.3);
    gm.position.set(((k >> 2) & 1) * 0.75 - 0.37, ((k >> 1) & 1) * 0.75 - 0.37, (k & 1) * 0.75 - 0.37);
  }
  tulis(kubus, "2 × 2 × 2 = 8 gamet", 0.45, -4.6, -0.2, 3.9);
  const genotip27 = new THREE.Group();
  genotip27.position.set(0, 1.3, 3.5);
  kubus.add(genotip27);
  const kotak = bahan(studio, "kotakGenotip", ["genotip"], "#d9d2c5", 0.003);
  for (let a = 0; a < 3; a++)
    for (let b = 0; b < 3; b++)
      for (let c = 0; c < 3; c++) {
        const k = new THREE.BoxGeometry(0.42, 0.42, 0.42);
        k.translate((a - 1) * 0.5, (b - 1) * 0.5, (c - 1) * 0.5);
        studio.tambah(kotak, k, genotip27);
      }
  tulis(kubus, "3 × 3 × 3 = 27 genotip", 0.45, 0, -0.2, 3.9);
  const fenotip8 = new THREE.Group();
  fenotip8.position.set(4.6, 1.2, 3.5);
  kubus.add(fenotip8);
  for (let k = 0; k < 8; k++) {
    const g = new THREE.Group();
    g.position.set(((k >> 2) & 1) * 0.8 - 0.4, ((k >> 1) & 1) * 0.8 - 0.4, (k & 1) * 0.8 - 0.4);
    fenotip8.add(g);
    bangunBiji(studio, g, { bentuk: k & 4 ? "keriput" : "bulat", warna: k & 2 ? "hijau" : "kuning" }, 0.22);
    const f = ikonBunga(studio, g, !(k & 1), 0.1);
    f.position.set(0.22, 0.2, 0.1);
  }
  tulis(kubus, "2 × 2 × 2 = 8 fenotip", 0.45, 4.6, -0.2, 3.9);

  /* contoh genotip tertentu: RrYYpp */
  const contoh = new THREE.Group();
  grup.add(contoh);
  const XC = 13;
  papanBerdiri(studio, contoh, 7, 6.2, XC, Y);
  const LANGKAH = [
    "Rr × Rr → Rr: ½",
    "Yy × Yy → YY: ¼",
    "Pp × Pp → pp: ¼",
    "½ × ¼ × ¼ = 1/32",
  ];
  const lLangkah = LANGKAH.map((t, i) => {
    const l = tulis(contoh, t, i === 3 ? 0.55 : 0.48, XC, Y + 1.2 - i * 1.15, 0.1);
    return l;
  });
  tulis(contoh, "peluang RrYYpp", 0.52, XC, Y + 2.35, 0.1);
  const jam = buatJamTahap();
  lantai(grup, 32, 8);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y + 0.2, 0, 16.5, 0, 1.45),
      tiga: lihat(0, 4.3, 1.5, 22, 0, 1.3),
      genotip: lihat(XC, Y, 0, 12, 0, 1.45),
    },
    bayangan: { pusat: v(3, 0, 0), jangkauan: 14 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const t = p.detik ?? 0;
      baris.forEach((b, i) => (b.visible = i < 2 || f === "tiga" || f === "genotip"));
      bingkai.visible = f === "tiga";
      aturLabel(lRasio, f === "utuh", dt, v(0, Y - 2.3, 0.2));
      aturLabel(lRasio3, f === "tiga" || f === "genotip", dt, v(0, Y - 2.3, 0.2));
      kubus.visible = f === "tiga" || f === "genotip";
      [gamet8, genotip27, fenotip8].forEach((g, i) => muncul(g, kubus.visible && j > 0.2 + i * 0.5, dt, 1, 4));
      gamet8.rotation.y = genotip27.rotation.y = fenotip8.rotation.y = t * 0.35;
      gamet8.rotation.x = genotip27.rotation.x = fenotip8.rotation.x = 0.35;
      lLangkah.forEach((l, i) => {
        const tampak = f === "genotip" && j > 0.3 + i * 1.3;
        l.material.opacity = pelan(l.material.opacity, tampak ? 1 : 0, 5, dt);
        l.visible = l.material.opacity > 0.02;
      });
    },
  };
}

/* ================================================================== *
 * GARPU — diagram garpu (forked-line)
 * ================================================================== */

export function setGarpu(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y_DAUN = Array.from({ length: 8 }, (_, k) => 8.6 - k * 1.15);
  const X = [-7.2, -2.4, 2.4];
  const X_HASIL = 7.4;
  type Simpul = { pos: THREE.Vector3; dominan: boolean[] };
  let simpul: Simpul[] = [{ pos: v(-10.6, 4.6, 0), dominan: [] }];
  const semuaJalur: { a: THREE.Vector3; b: THREE.Vector3; jalan: boolean[] }[] = [];
  const NAMA = [
    ["¾ bulat", "¼ keriput"],
    ["¾ kuning", "¼ hijau"],
    ["¾ ungu", "¼ putih"],
  ];
  for (let a = 0; a < 3; a++) {
    const baru: Simpul[] = [];
    const n = 2 ** (a + 1);
    const lebar = 8 / n;
    for (let k = 0; k < n; k++) {
      const y = Y_DAUN.slice(k * lebar, (k + 1) * lebar).reduce((s, y) => s + y, 0) / lebar;
      const ortu = simpul[Math.floor(k / 2)];
      const dom = k % 2 === 0;
      const pos = v(X[a], y, 0);
      semuaJalur.push({ a: ortu.pos.clone().add(v(1.25, 0, 0)), b: pos.clone().add(v(-1.75, 0, 0)), jalan: [...ortu.dominan, dom] });
      garis(studio, grup, ortu.pos.clone().add(v(1.25, 0, 0)), pos.clone().add(v(-1.75, 0, 0)), 0.03);
      tulis(grup, NAMA[a][dom ? 0 : 1], 0.56, pos.x + 0.1, pos.y + 0.02, 0.2);
      /* ikon sifat di atas-kiri tulisan */
      const ikon = new THREE.Group();
      ikon.position.set(pos.x - 1.45, pos.y + 0.05, 0.3);
      grup.add(ikon);
      if (a === 0) bangunBiji(studio, ikon, { bentuk: dom ? "bulat" : "keriput", warna: "kuning" }, 0.17);
      if (a === 1) bangunBiji(studio, ikon, { bentuk: "bulat", warna: dom ? "kuning" : "hijau" }, 0.17);
      if (a === 2) ikonBunga(studio, ikon, dom, 0.15);
      baru.push({ pos, dominan: [...ortu.dominan, dom] });
    }
    simpul = baru;
  }
  tulis(grup, "RrYyPp ×", 0.55, -10.6, 5.2);
  tulis(grup, "RrYyPp", 0.55, -10.6, 4.4);
  const HASIL = simpul.map((s) => {
    const n = s.dominan.reduce((x, d) => x * (d ? 3 : 1), 1);
    garis(studio, grup, s.pos.clone().add(v(1.25, 0, 0)), v(X_HASIL - 1, s.pos.y, 0), 0.015, "#9aa3ad", "garisPutus");
    return tulis(grup, `${n}/64`, 0.6, X_HASIL, s.pos.y, 0.2);
  });
  tulis(grup, "kalikan sepanjang cabang", 0.52, X_HASIL - 1, 9.8);
  /* jalur contoh: bulat → hijau → ungu */
  const CONTOH = [true, false, true];
  const jalurContoh = new THREE.Group();
  grup.add(jalurContoh);
  for (const j of semuaJalur) {
    const cocok = j.jalan.every((d, i) => d === CONTOH[i]);
    if (cocok) garis(studio, jalurContoh, j.a.clone().add(v(0, 0, 0.1)), j.b.clone().add(v(0, 0, 0.1)), 0.09, "#1b2430", "jalurContoh");
  }
  const iContoh = simpul.findIndex((s) => s.dominan.every((d, i) => d === CONTOH[i]));
  garis(studio, jalurContoh, simpul[iContoh].pos.clone().add(v(1.25, 0, 0.1)), v(X_HASIL - 1, simpul[iContoh].pos.y, 0.1), 0.09, "#1b2430", "jalurContoh");
  const lContoh = labelHidup(grup, "¾ × ¼ × ¾ = 9/64", 0.6);
  lantai(grup, 26, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(-1.4, 4.7, 0, 23, 0, 1.45),
      ujung: lihat(4.6, 4.7, 0, 15, 0.05, 1.45),
      contoh: lihat(0.3, 4.7, 0, 24, 0, 1.45),
    },
    bayangan: { pusat: v(-2, 0, 0), jangkauan: 13 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      jalurContoh.visible = f === "contoh";
      HASIL.forEach((l, i) => {
        const s = f === "ujung" || (f === "contoh" && i === iContoh) ? 1.25 : 1;
        l.scale.set(pelan(l.scale.x, (l.userData.lebar ??= l.scale.x) * s, 5, dt), pelan(l.scale.y, (l.userData.tinggi ??= l.scale.y) * s, 5, dt), 1);
      });
      aturLabel(lContoh, f === "contoh", dt, v(X_HASIL + 3.7, simpul[iContoh].pos.y, 0.3));
    },
  };
}
