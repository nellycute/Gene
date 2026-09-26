import * as THREE from "three";
import { lihat, type Studio } from "../studio";
import { pembuatAcak } from "../bentuk";
import { buatLabel } from "../label3d";
import { alas, aturLabel, buatJamTahap, labelHidup, panah, pelan, v, type Set3D } from "../rangkai-set";
import { bangunSosok } from "../model-sosok";
import { bangunAyam } from "../model-hewan";
import { bangunKromosom, type AsalKromosom } from "../model-kromosom";
import { bahan, bangunGamet, bangunPunnett } from "../mendel/model-mendel";
import { garis, kali, lantai, papanBerdiri, selTembus, tahapan, tulis } from "../mendel/bantu";
import { bangunKromosomKelamin, bangunLalat, bangunSilsilah, type StatusSilsilah } from "./model-kelamin";

/**
 * SET PELAJARAN 4.2, 4.4–4.6 — terpaut kelamin, pautan, pindah silang, peta.
 */

const RAMBUT = "#3b302b";

/* ================================================================== *
 * Kromatid berhuruf dengan dua lokus — dipakai pautan dan pindah silang
 * ================================================================== */

const LOKUS = [0.22, 0.78];

function kromatidBeralel(
  studio: Studio,
  induk: THREE.Object3D,
  asal: AsalKromosom,
  huruf: string[],
  o: { silang?: { dari: number; sampai: number }; sisi?: -1 | 1; lokus?: number[]; p?: number; q?: number; jari?: number; ukuran?: number } = {},
) {
  const g = new THREE.Group();
  induk.add(g);
  const p = o.p ?? 1.2;
  const q = o.q ?? 2.6;
  const jari = o.jari ?? 0.26;
  const lokus = o.lokus ?? LOKUS;
  bangunKromosom(studio, g, { p, q, jari, asal, silang: o.silang ? [{ kromatid: 0, ...o.silang }] : undefined }, 1);
  const gelang = bahan(studio, "gelangLokus", ["lokus"], "#f6f1e6", 0.003);
  lokus.forEach((f, i) => {
    const y = p - f * (p + q);
    const c = new THREE.CylinderGeometry(jari * 1.12, jari * 1.12, jari * 0.5, 20);
    c.translate(0, y, 0);
    studio.tambah(gelang, c, g);
    if (huruf[i]) {
      const l = buatLabel(huruf[i], o.ukuran ?? 0.62);
      l.position.set((o.sisi ?? 1) * (jari + 0.4), y, 0.2);
      g.add(l);
    }
  });
  return g;
}

/* ================================================================== *
 * TERPAUT X
 * ================================================================== */

export function setTerpautX(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(3);
  bangunSosok(studio, grup, { entitas: "p", label: "perempuan XᴮXᵇ: normal (pembawa)", x: -4.5, tinggi: 1, rambut: RAMBUT, keriting: false, panjang: true, baju: "#cbbfae", ukuranLabel: 0.5 }, acak);
  bangunSosok(studio, grup, { entitas: "l", label: "laki-laki XᵇY: buta warna", x: 4.5, tinggi: 1.05, rambut: RAMBUT, keriting: true, baju: "#c4b8a6", ukuranLabel: 0.5 }, acak);
  const pasangan = (x: number, isi: { j: "X" | "Y"; alel?: string; asal: AsalKromosom }[]) => {
    const g = new THREE.Group();
    g.position.set(x, 7.2, 0);
    grup.add(g);
    isi.forEach((k, i) => {
      const h = bangunKromosomKelamin(studio, g, k.j, { L: 5.5, asal: k.asal, alel: k.alel, lokus: 0.85, jari: 0.3, ukuranHuruf: 0.6, sisi: i === 0 ? -1 : 1 });
      h.grup.position.x = (i - 0.5) * 1.6;
    });
    return g;
  };
  pasangan(-4.5, [
    { j: "X", alel: "Xᴮ", asal: "kromatin" },
    { j: "X", alel: "Xᵇ", asal: "kromosomAyah" },
  ]);
  pasangan(4.5, [
    { j: "X", alel: "Xᵇ", asal: "kromatin" },
    { j: "Y", asal: "kromosomAyah" },
  ]);
  tulis(grup, "Y tidak membawa gen ini", 0.42, 6.2, 5, 0.3);
  lantai(grup, 18, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 4.4, 0, 22, 0, 1.3),
      pria: lihat(4.5, 4.6, 0, 13, 0.1, 1.3),
      wanita: lihat(-4.5, 4.6, 0, 13, -0.1, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
  };
}

/* ================================================================== *
 * PUNNETT TERPAUT X
 * ================================================================== */

function lambangMini(studio: Studio, induk: THREE.Object3D, jk: "L" | "P", status: StatusSilsilah, s = 0.5) {
  const d = bangunSilsilah(studio, induk, { orang: [{ id: "a", jk, status, x: 0, gen: 0 }], kawin: [], anak: [] }, { ukuran: s });
  return d.grup;
}

export function setPunnettX(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const S = 2;
  const Y = 4.2;
  papanBerdiri(studio, grup, 3 * S + 0.5, 3 * S + 0.5, 0, Y);
  const SEL = [
    [
      { t: "XᴮXᴮ", jk: "P" as const, s: "normal" as StatusSilsilah },
      { t: "XᴮY", jk: "L" as const, s: "normal" as StatusSilsilah },
    ],
    [
      { t: "XᴮXᵇ", jk: "P" as const, s: "pembawa" as StatusSilsilah },
      { t: "XᵇY", jk: "L" as const, s: "sakit" as StatusSilsilah },
    ],
  ];
  const papan = bangunPunnett(
    studio,
    grup,
    ["Xᴮ", "Y"],
    ["Xᴮ", "Xᵇ"],
    (i, j) => ({
      teks: SEL[i][j].t,
      ikon: (g) => {
        const m = lambangMini(studio, g, SEL[i][j].jk, SEL[i][j].s, 0.55);
        m.position.set(0, -S * 0.2, 0.15);
      },
    }),
    S,
  );
  papan.grup.position.set(0, Y, 0.05);
  papan.sel.flat().forEach((s) => (s.visible = false));
  tulis(grup, "ayah XᴮY (normal)", 0.5, 1, Y + 1.5 * S + 0.6, 0.2);
  tulis(grup, "ibu XᴮXᵇ", 0.5, -1.5 * S - 1.4, Y - 0.2, 0.2);
  tulis(grup, "(pembawa)", 0.42, -1.5 * S - 1.4, Y - 0.9, 0.2);
  const cincin = bahan(studio, "cincinSorot", ["tinta"], "#1b2430", false);
  const sorot = (j: number) => {
    const g = new THREE.Group();
    grup.add(g);
    for (let i = 0; i < 2; i++) {
      const r = new THREE.TorusGeometry(S * 0.47, 0.05, 6, 36);
      const q = papan.pusat(i, j);
      r.translate(q.x, q.y + Y, 0.35);
      studio.tambah(cincin, r, g, false);
    }
    g.visible = false;
    return g;
  };
  const sorotPutra = sorot(1);
  const sorotPutri = sorot(0);
  const lPutra = labelHidup(grup, "anak laki-laki: ½ buta warna", 0.5);
  const lPutri = labelHidup(grup, "anak perempuan: normal, ½ pembawa", 0.5);
  const jam = buatJamTahap();
  lantai(grup, 12, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(-0.8, Y, 0, 17, 0, 1.45),
      isi: lihat(-0.8, Y, 0, 17, 0, 1.45),
      putra: lihat(0.5, Y, 0, 16, 0.08, 1.45),
      putri: lihat(-1.5, Y, 0, 16, -0.08, 1.45),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 7 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      papan.sel.flat().forEach((s, i) => (s.visible = f !== "utuh" && (f !== "isi" || j > 0.3 + i * 0.5)));
      sorotPutra.visible = f === "putra";
      sorotPutri.visible = f === "putri";
      aturLabel(lPutra, f === "putra", dt, v(1, Y - 1.5 * S - 0.7, 0.4));
      aturLabel(lPutri, f === "putri", dt, v(-1, Y - 1.5 * S - 0.7, 0.4));
    },
  };
}

/* ================================================================== *
 * LURIK — terpaut Z
 * ================================================================== */

export function setLurik(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const induk = (x: number, jantan: boolean, label: string) => {
    alas(studio, grup, x, -2.5, 2);
    const g = new THREE.Group();
    g.position.set(x - 0.3, 0.55, -2.5);
    g.rotation.y = jantan ? Math.PI - 0.3 : -0.3;
    grup.add(g);
    bangunAyam(studio, g, { jantan, bulu: jantan ? "hitam" : "lurik" });
    tulis(grup, label, 0.55, x, 4.6, -2.5);
  };
  induk(-4.5, false, "betina lurik ZᴮW");
  induk(4.5, true, "jantan polos ZᵇZᵇ");
  kali(grup, 0, 2.2, -2.5, 0.9);
  const anak = new THREE.Group();
  grup.add(anak);
  const ANAK: { lurik: boolean; x: number }[] = [
    { lurik: true, x: -4.2 },
    { lurik: true, x: -2.2 },
    { lurik: false, x: 2.2 },
    { lurik: false, x: 4.2 },
  ];
  for (const a of ANAK) {
    const g = new THREE.Group();
    g.position.set(a.x - 0.3, 0, 3);
    g.scale.setScalar(0.45);
    g.rotation.y = -0.4;
    anak.add(g);
    bangunAyam(studio, g, { bulu: a.lurik ? "lurik" : "hitam" });
  }
  tulis(anak, "anak jantan ZᴮZᵇ: lurik", 0.5, -3.2, -0.5, 4.2);
  tulis(anak, "anak betina ZᵇW: polos", 0.5, 3.2, -0.5, 4.2);
  lantai(grup, 18, 11);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.7, 0, 20, 0, 1.2),
      anak: lihat(0, 1.1, 3, 13, 0, 1.2),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
  };
}

/* ================================================================== *
 * LALAT
 * ================================================================== */

export function setLalat(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const DATA = [
    { o: {}, label: "tipe liar: abu-abu, sayap normal" },
    { o: { hitam: true }, label: "mutan: tubuh hitam" },
    { o: { sayapPendek: true }, label: "mutan: sayap pendek" },
  ];
  const lalat = DATA.map((d, k) => {
    const x = (k - 1) * 5;
    alas(studio, grup, x, 0, 1.9);
    const g = new THREE.Group();
    g.position.set(x, 0.55, 0);
    g.rotation.y = -0.6;
    grup.add(g);
    bangunLalat(studio, g, d.o);
    tulis(grup, d.label, 0.46, x, -0.5, 2);
    return g;
  });
  tulis(grup, "Drosophila melanogaster (diperbesar ± 1.000×)", 0.46, 0, 4.2);
  lantai(grup, 18, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.6, 0, 18, 0, 1.25),
      dekat: lihat(0, 1.5, 0, 9, 0.1, 1.15),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      lalat.forEach((g, i) => (g.rotation.y = -0.6 + 0.4 * Math.sin(t * 0.4 + i * 2)));
    },
  };
}

/* ================================================================== *
 * PAUTAN — bebas vs berpautan
 * ================================================================== */

export function setPautan(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.4;
  /* kiri: dua gen di dua pasang kromosom berbeda */
  const kiri = new THREE.Group();
  kiri.position.set(-6, 0, 0);
  grup.add(kiri);
  selTembus(studio, kiri, 2.8, "selInduk", "#e9e3d6").position.y = Y;
  const pasangKiri = (x: number, alel: [string, string], p: number, q: number) => {
    [0, 1].forEach((k) => {
      const g = kromatidBeralel(studio, kiri, k === 0 ? "kromatin" : "kromosomAyah", [alel[k]], { lokus: [0.6], p, q, jari: 0.22, sisi: k === 0 ? -1 : 1 });
      g.position.set(x + (k - 0.5) * 0.9, Y + 0.3, 0);
    });
  };
  pasangKiri(-1, ["A", "a"], 0.9, 1.5);
  pasangKiri(1.1, ["B", "b"], 0.6, 1);
  tulis(kiri, "gen di kromosom berbeda", 0.7, 0, Y + 3.4);
  const gametKiri = ["AB", "Ab", "aB", "ab"].map((t, i) => {
    const g = bangunGamet(studio, kiri, t, 0.65);
    g.position.set((i - 1.5) * 1.5, 0.9, 1.2);
    return g;
  });
  tulis(kiri, "4 macam gamet", 0.65, 0, -0.35, 1.6);
  /* kanan: dua gen di satu kromosom */
  const kanan = new THREE.Group();
  kanan.position.set(6, 0, 0);
  grup.add(kanan);
  selTembus(studio, kanan, 2.8, "selInduk", "#e9e3d6").position.y = Y;
  [0, 1].forEach((k) => {
    const g = kromatidBeralel(studio, kanan, k === 0 ? "kromatin" : "kromosomAyah", k === 0 ? ["A", "B"] : ["a", "b"], { jari: 0.24, sisi: k === 0 ? -1 : 1, p: 0.8, q: 1.6 });
    g.position.set((k - 0.5) * 1, Y + 0.4, 0);
  });
  tulis(kanan, "dua gen di satu kromosom", 0.7, 0, Y + 3.4);
  const gametKanan = ["AB", "ab"].map((t, i) => {
    const g = bangunGamet(studio, kanan, t, 0.65);
    g.position.set((i - 0.5) * 1.8, 0.9, 1.2);
    return g;
  });
  tulis(kanan, "2 macam gamet", 0.65, 0, -0.35, 1.6);
  lantai(grup, 26, 7);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 3.6, 0, 22, 0, 1.33),
      bebas: lihat(-6, 3.6, 0, 12.5, 0, 1.33),
      taut: lihat(6, 3.6, 0, 12.5, 0, 1.33),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 12 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      [...gametKiri, ...gametKanan].forEach((g, i) => (g.position.y = 0.9 + 0.08 * Math.sin(t * 2 + i)));
    },
  };
}

/* ================================================================== *
 * UJI SILANG LALAT — 965 : 944 : 206 : 185
 * ================================================================== */

export function setUjiLalat(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const induk = (x: number, o: Parameters<typeof bangunLalat>[2], label: string) => {
    const g = new THREE.Group();
    g.position.set(x, 0.1, -3.4);
    g.rotation.y = -0.5;
    g.scale.setScalar(0.8);
    grup.add(g);
    bangunLalat(studio, g, o);
    tulis(grup, label, 0.5, x, 2.6, -3.4);
  };
  induk(-5.5, {}, "♀ heterozigot: abu-abu, sayap normal");
  induk(5.5, { hitam: true, sayapPendek: true }, "♂ hitam, sayap pendek");
  kali(grup, 0, 1.2, -3.4, 0.8);
  const DATA = [
    { n: 965, o: {}, label: "abu-abu, normal", induk: true },
    { n: 944, o: { hitam: true, sayapPendek: true }, label: "hitam, pendek", induk: true },
    { n: 206, o: { sayapPendek: true }, label: "abu-abu, pendek", induk: false },
    { n: 185, o: { hitam: true }, label: "hitam, normal", induk: false },
  ];
  const bBatang = bahan(studio, "batangLalat", ["hitungan"], "#b9ae9c", 0.004);
  const bBaru = bahan(studio, "batangBaru", ["hitungan", "rekombinan"], "#8f8475", 0.004);
  const batang = DATA.map((d, k) => {
    const x = (k - 1.5) * 3.4;
    const g = new THREE.Group();
    g.position.set(x - 0.6, 0, 2.2);
    g.scale.setScalar(0.6);
    g.rotation.y = -0.5;
    grup.add(g);
    bangunLalat(studio, g, d.o);
    const m = studio.tambah(d.induk ? bBatang : bBaru, new THREE.BoxGeometry(0.7, 1, 0.7), grup);
    m.position.set(x + 0.9, 0, 2.2);
    const l = tulis(grup, String(d.n), 0.55, x + 0.9, 0, 2.3);
    tulis(grup, d.label, 0.42, x, -0.6, 3.4);
    return { m, l, n: d.n };
  });
  const HARAPAN = 575;
  const skala = 4 / 1000;
  const garisHarapan = new THREE.Group();
  grup.add(garisHarapan);
  garis(studio, garisHarapan, v(-6.5, HARAPAN * skala, 2.6), v(6.5, HARAPAN * skala, 2.6), 0.03, "#5c6878", "harapan");
  tulis(garisHarapan, "harapan bila bebas: ± 575", 0.42, 7.8, HARAPAN * skala, 2.6);
  const lPersen = labelHidup(grup, "(206 + 185) ÷ 2.300 ≈ 17%", 0.55);
  const jam = buatJamTahap();
  lantai(grup, 20, 12);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.6, 0, 21, 0, 1.2),
      induk: lihat(0, 1.2, -3.4, 16, 0, 1.2),
      harapan: lihat(0, 1.8, 2, 19, 0, 1.3),
      hasil: lihat(0, 1.8, 2, 19, 0, 1.3),
      baru: lihat(2.2, 1.4, 2.2, 13, 0.1, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const nyata = f === "hasil" || f === "baru" || f === "utuh";
      batang.forEach((b, k) => {
        const tinggi = (f === "induk" ? 0.01 : nyata ? b.n : HARAPAN) * skala;
        const t = f === "hasil" ? tahapan(j, 0.2 + k * 0.3, 1) : 1;
        b.m.scale.y = pelan(b.m.scale.y, Math.max(0.01, tinggi * t + 0.01), 5, dt);
        b.m.position.y = b.m.scale.y / 2;
        b.l.position.y = b.m.scale.y + 0.45;
        b.l.visible = f !== "induk";
        b.l.material.opacity = nyata ? 1 : 0;
      });
      garisHarapan.visible = f === "harapan" || f === "hasil";
      aturLabel(lPersen, f === "baru", dt, v(3.9, 3.2, 2.6));
    },
  };
}

/* ================================================================== *
 * SILANG — pindah silang pada bivalen
 * ================================================================== */

function bivalen(studio: Studio, induk: THREE.Object3D, silang: { dari: number; sampai: number } | null, lokus = LOKUS, huruf: [string[], string[]] = [["A", "B"], ["a", "b"]]) {
  const g = new THREE.Group();
  induk.add(g);
  /* urutan kiri → kanan: kromatid ibu (luar), ibu (dalam), ayah (dalam), ayah (luar) */
  const X = [-1.5, -0.55, 0.55, 1.5];
  const susun: { asal: AsalKromosom; huruf: string[]; silang?: { dari: number; sampai: number }; sisi: -1 | 1 }[] = [
    { asal: "kromatin", huruf: huruf[0], sisi: -1 },
    { asal: "kromatin", huruf: [], silang: silang ?? undefined, sisi: -1 },
    { asal: "kromosomAyah", huruf: [], silang: silang ?? undefined, sisi: 1 },
    { asal: "kromosomAyah", huruf: huruf[1], sisi: 1 },
  ];
  /* huruf hanya di kromatid paling luar agar tidak menumpuk; pertukaran pada
     kromatid dalam terbaca dari warnanya, dan hurufnya tampak jelas di gamet */
  susun.forEach((s, i) => {
    const k = kromatidBeralel(studio, g, s.asal, s.huruf, { silang: s.silang, sisi: i < 2 ? -1 : 1, lokus, jari: 0.26 });
    k.position.x = X[i];
  });
  return g;
}

export function setSilang(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.2;
  const sebelum = bivalen(studio, grup, null);
  sebelum.position.set(0, Y, 0);
  const sesudah = bivalen(studio, grup, { dari: 0.5, sampai: 1 });
  sesudah.position.set(0, Y, 0);
  sesudah.visible = false;
  /* penanda kiasma */
  const yK = Y + 1.2 - 0.5 * (1.2 + 2.6);
  const kiasma = new THREE.Group();
  kiasma.position.set(0, yK, 0.4);
  grup.add(kiasma);
  const tinta = bahan(studio, "tintaKiasma", ["tinta"], "#1b2430", false);
  for (const a of [0.7, -0.7]) {
    const b = new THREE.BoxGeometry(1.6, 0.07, 0.07);
    b.rotateZ(a);
    studio.tambah(tinta, b, kiasma, false);
  }
  const lKiasma = labelHidup(grup, "kiasma", 0.55);
  kiasma.visible = false;
  /* empat gamet hasil meiosis */
  const gamet = new THREE.Group();
  grup.add(gamet);
  const GAMET: { asal: AsalKromosom; silang?: { dari: number; sampai: number }; h: string[]; ket: string }[] = [
    { asal: "kromatin", h: ["A", "B"], ket: "parental" },
    { asal: "kromatin", silang: { dari: 0.5, sampai: 1 }, h: ["A", "b"], ket: "rekombinan" },
    { asal: "kromosomAyah", silang: { dari: 0.5, sampai: 1 }, h: ["a", "B"], ket: "rekombinan" },
    { asal: "kromosomAyah", h: ["a", "b"], ket: "parental" },
  ];
  GAMET.forEach((d, i) => {
    const x = 5.2 + i * 3;
    const s = selTembus(studio, gamet, 1.35, "gametTembus", "#efe3c6", "gamet", 0.35);
    s.position.set(x, Y - 0.2, 0);
    const k = kromatidBeralel(studio, gamet, d.asal, d.h, { silang: d.silang, p: 0.7, q: 1.5, jari: 0.2, ukuran: 0.55 });
    k.position.set(x - 0.2, Y + 0.3, 0);
    tulis(gamet, d.ket, 0.55, x, Y - 2.1, 0.5);
  });
  gamet.visible = false;
  const jam = buatJamTahap();
  lantai(grup, 22, 6, 3);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y - 0.4, 0, 11, 0, 1.35),
      tukar: lihat(0, Y - 0.4, 0, 11, 0, 1.35),
      kiasma: lihat(0, yK + 0.5, 0, 8, 0, 1.35),
      gamet: lihat(5.2, Y - 0.4, 0, 19, 0, 1.35),
    },
    bayangan: { pusat: v(3, 0, 0), jangkauan: 11 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const tukar = f === "kiasma" || f === "gamet" || (f === "tukar" && j > 0.8);
      sebelum.visible = !tukar;
      sesudah.visible = tukar;
      kiasma.visible = f === "kiasma" || (f === "tukar" && j > 0.3 && j < 1.2);
      aturLabel(lKiasma, f === "kiasma", dt, v(3.2, yK + 0.4, 0.5));
      gamet.visible = f === "gamet";
    },
  };
}

/* ================================================================== *
 * JARAK — makin jauh, makin sering pindah silang
 * ================================================================== */

export function setJarak(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 3;
  const kr = new THREE.Group();
  kr.position.set(0, Y, 0);
  kr.rotation.z = -Math.PI / 2;
  grup.add(kr);
  bangunKromosom(studio, kr, { p: 3, q: 8, jari: 0.45, asal: "kromatin" }, 1);
  /* letak gen di sepanjang sumbu x setelah diputar: x = −y lokal */
  const GEN = [
    { h: "A", x: -1.5 },
    { h: "B", x: 0.2 },
    { h: "C", x: 6.5 },
  ];
  const gelang = bahan(studio, "gelangLokus", ["lokus"], "#f6f1e6", 0.003);
  for (const g of GEN) {
    const c = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 20);
    c.rotateZ(Math.PI / 2);
    c.translate(g.x, Y, 0);
    studio.tambah(gelang, c, grup);
    tulis(grup, g.h, 0.7, g.x, Y + 1.1, 0.3);
  }
  /* titik-titik pindah silang dari banyak meiosis, tersebar merata */
  const acak = pembuatAcak(50);
  const titik = new THREE.Group();
  grup.add(titik);
  for (let i = 0; i < 26; i++) {
    const x = -3 + acak() * 11;
    const l = buatLabel("✕", 0.4);
    l.position.set(x, Y - 0.9 - (i % 3) * 0.35, 0.3);
    titik.add(l);
  }
  tulis(grup, "✕ = titik pindah silang dari banyak meiosis", 0.45, 2.5, Y - 2.6, 0.3);
  const kurung = (a: number, b: number, y: number, teks: string) => {
    const g = new THREE.Group();
    grup.add(g);
    garis(studio, g, v(a, y, 0.2), v(b, y, 0.2), 0.04);
    garis(studio, g, v(a, y, 0.2), v(a, y - 0.3, 0.2), 0.04);
    garis(studio, g, v(b, y, 0.2), v(b, y - 0.3, 0.2), 0.04);
    tulis(g, teks, 0.48, (a + b) / 2, y + 0.45, 0.2);
    return g;
  };
  const dekat = kurung(-1.5, 0.2, Y + 2.1, "A–B dekat: jarang terpisah");
  const jauh = kurung(-1.5, 6.5, Y + 3.2, "A–C jauh: sering terpisah");
  lantai(grup, 16, 4, 2.5);
  return {
    grup,
    fokus: {
      utuh: lihat(2.5, Y + 0.5, 0, 16, 0, 1.4),
      jauh: lihat(2.5, Y + 0.8, 0, 16, 0, 1.4),
    },
    bayangan: { pusat: v(2.5, 0, 0), jangkauan: 9 },
    perbarui: (p) => {
      dekat.visible = true;
      jauh.visible = p.fokus === "jauh";
    },
  };
}

/* ================================================================== *
 * GANDA — pindah silang ganda
 * ================================================================== */

export function setGanda(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.4;
  const LOK3 = [0.12, 0.5, 0.9];
  const H: [string[], string[]] = [
    ["A", "B", "C"],
    ["a", "b", "c"],
  ];
  const sebelum = bivalen(studio, grup, null, LOK3, H);
  sebelum.position.set(-4.5, Y, 0);
  const sesudah = bivalen(studio, grup, { dari: 0.3, sampai: 0.7 }, LOK3, H);
  sesudah.position.set(4.5, Y, 0);
  tulis(grup, "sebelum", 0.55, -4.5, Y + 2.1);
  tulis(grup, "sesudah pindah silang ganda", 0.55, 4.5, Y + 2.1);
  const tanda = new THREE.Group();
  grup.add(tanda);
  for (const f of [0.3, 0.7]) {
    const y = Y + 1.2 - f * 3.8;
    const l = buatLabel("✕", 0.5);
    l.position.set(-4.5, y, 0.5);
    tanda.add(l);
  }
  panah(studio, grup, [v(-2, Y - 0.6, 0), v(0, Y - 0.2, 0), v(2, Y - 0.6, 0)], 0.07);
  const lHasil = labelHidup(grup, "A…C tetap seperti induk; hanya B yang tertukar", 0.5);
  lantai(grup, 18, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y - 0.6, 0, 17, 0, 1.38),
      hasil: lihat(2, Y - 0.6, 0, 15, 0.1, 1.38),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
    perbarui: (p, dt) => aturLabel(lHasil, p.fokus === "hasil", dt, v(4.5, Y - 3.4, 0.5)),
  };
}

/* ================================================================== *
 * PETA — Sturtevant 1913, cM, peta genetik vs fisik
 * ================================================================== */

export function setPeta(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const SK = 0.28;
  const X0 = -8;
  const penggaris = (y: number, panjang: number, bahanKey: string, warna: string) => {
    const b = new THREE.BoxGeometry(panjang * SK, 0.35, 0.35);
    b.translate(X0 + (panjang * SK) / 2, y, 0);
    studio.tambah(bahan(studio, bahanKey, ["kromatin"], warna, 0.004), b, grup);
  };
  /* peta kromosom X Sturtevant */
  const Y1 = 5.2;
  penggaris(Y1, 60, "petaX", "#b6a6cf");
  const GEN = [
    { n: "kuning (y)", cm: 0 },
    { n: "putih (w)", cm: 1 },
    { n: "vermilion (v)", cm: 30.7 },
    { n: "miniatur (m)", cm: 33.7 },
    { n: "rudimenter (r)", cm: 57.6 },
  ];
  GEN.forEach((g, i) => {
    const x = X0 + g.cm * SK;
    garis(studio, grup, v(x, Y1 - 0.3, 0.25), v(x, Y1 + 0.5, 0.25), 0.035);
    tulis(grup, g.n, 0.52, x + (i === 1 ? 0.8 : i === 0 ? -0.5 : i === 3 ? 1.1 : 0), Y1 + 1 + (i % 2) * 0.65, 0.2);
    tulis(grup, String(g.cm).replace(".", ","), 0.46, x + (i === 1 ? 0.35 : i === 0 ? -0.2 : 0), Y1 - 0.8, 0.3);
  });
  tulis(grup, "kromosom X lalat buah (Sturtevant, 1913) · satuan cM", 0.58, X0 + 8.4, Y1 + 2.9);
  /* b – vg, 17 cM */
  const cm = new THREE.Group();
  grup.add(cm);
  const Y2 = 1.8;
  const bPeta = bahan(studio, "peta2", ["kromatin"], "#b6a6cf", 0.004);
  const b2 = new THREE.BoxGeometry(17 * SK * 2, 0.35, 0.35);
  b2.translate(X0 + 17 * SK, Y2, 0);
  studio.tambah(bPeta, b2, cm);
  garis(studio, cm, v(X0, Y2 - 0.3, 0.25), v(X0, Y2 + 0.5, 0.25), 0.035);
  garis(studio, cm, v(X0 + 17 * SK * 2, Y2 - 0.3, 0.25), v(X0 + 17 * SK * 2, Y2 + 0.5, 0.25), 0.035);
  tulis(cm, "hitam (b)", 0.42, X0, Y2 + 0.9, 0.2);
  tulis(cm, "sayap pendek (vg)", 0.42, X0 + 17 * SK * 2, Y2 + 0.9, 0.2);
  tulis(cm, "17% rekombinan = ± 17 cM", 0.5, X0 + 17 * SK, Y2 - 0.9, 0.3);
  cm.visible = false;
  /* peta genetik vs fisik: garis penghubung tidak sejajar */
  const fisik = new THREE.Group();
  grup.add(fisik);
  const Yg = 1.9;
  const Yf = -0.4;
  const bFisik = bahan(studio, "petaFisik", ["dna"], "#9aa3ad", 0.004);
  const bf = new THREE.BoxGeometry(16, 0.3, 0.3);
  bf.translate(0, Yf, 0);
  studio.tambah(bFisik, bf, fisik);
  const bg = new THREE.BoxGeometry(16, 0.3, 0.3);
  bg.translate(0, Yg, 0);
  studio.tambah(bPeta, bg, fisik);
  const TITIK = [
    [0, 0],
    [3, 1.2],
    [4.2, 5.5],
    [8, 8.3],
    [12, 10.5],
    [16, 16],
  ];
  for (const [g, f] of TITIK) garis(studio, fisik, v(-8 + g, Yg - 0.15, 0), v(-8 + f, Yf + 0.15, 0), 0.025, "#5c6878", "penghubung");
  tulis(fisik, "peta genetik (cM)", 0.46, -10.4, Yg, 0.2);
  tulis(fisik, "peta fisik (pasangan basa)", 0.46, -10.9, Yf, 0.2);
  tulis(fisik, "titik panas rekombinasi", 0.4, -3.2, (Yg + Yf) / 2 + 0.2, 0.4);
  fisik.visible = false;
  /* penanda DNA di dekat gen */
  const penanda = new THREE.Group();
  grup.add(penanda);
  const xg = X0 + 30.7 * SK;
  const cincinP = new THREE.TorusGeometry(0.35, 0.06, 8, 24);
  cincinP.translate(xg + 0.4, Y1, 0.25);
  studio.tambah(bahan(studio, "cincinPenanda", ["penanda"], "#1b2430", false), cincinP, penanda);
  tulis(penanda, "penanda DNA ikut diwariskan bersama gen", 0.46, xg + 1, Y1 - 1.6, 0.4);
  penanda.visible = false;
  lantai(grup, 22, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(0.4, 5.6, 0, 16.5, 0, 1.45),
      cm: lihat(-2, 3.6, 0, 17, 0, 1.45),
      fisik: lihat(-1.5, 1.4, 0, 17, 0, 1.45),
      penanda: lihat(xg, 4.6, 0, 11, 0, 1.45),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
    perbarui: (p) => {
      const f = p.fokus ?? "utuh";
      cm.visible = f === "cm";
      fisik.visible = f === "fisik";
      penanda.visible = f === "penanda";
    },
  };
}

/* ================================================================== *
 * TIGA TITIK
 * ================================================================== */

export function setTigaTitik(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 2.4;
  const SK = 0.62;
  const X0 = -5.3;
  const b = new THREE.BoxGeometry(18 * SK + 1.2, 0.4, 0.4);
  b.translate(X0 + (17 * SK) / 2, Y, 0);
  studio.tambah(bahan(studio, "petaTiga", ["kromatin"], "#b6a6cf", 0.004), b, grup);
  const POS = { A: 0, B: 10, C: 17 };
  for (const [h, cm] of Object.entries(POS)) {
    const x = X0 + cm * SK;
    garis(studio, grup, v(x, Y - 0.35, 0.3), v(x, Y + 0.55, 0.3), 0.04);
    tulis(grup, h, 0.8, x, Y - 1.1, 0.3);
  }
  const busur = (a: number, c: number, tinggi: number, teks: string) => {
    const g = new THREE.Group();
    grup.add(g);
    const xa = X0 + a * SK;
    const xc = X0 + c * SK;
    const titik: THREE.Vector3[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      titik.push(v(xa + (xc - xa) * t, Y + 0.6 + Math.sin(t * Math.PI) * tinggi, 0.3));
    }
    studio.tambah(bahan(studio, "busur", ["tinta"], "#5c6878", false), new THREE.TubeGeometry(new THREE.CatmullRomCurve3(titik), 40, 0.04, 6), g, false);
    tulis(g, teks, 0.55, (xa + xc) / 2, Y + 0.95 + tinggi, 0.3);
    g.visible = false;
    return g;
  };
  const ab = busur(0, 10, 1.2, "10 cM");
  const bc = busur(10, 17, 1.2, "7 cM");
  const ac = busur(0, 17, 3, "17 cM");
  const lUrut = labelHidup(grup, "10 + 7 = 17 → B di tengah", 0.6);
  const ganda = new THREE.Group();
  grup.add(ganda);
  for (const cm of [4, 13.5]) {
    const l = buatLabel("✕", 0.6);
    l.position.set(X0 + cm * SK, Y, 0.6);
    ganda.add(l);
  }
  tulis(ganda, "dua pindah silang: A dan C tetap bersama", 0.5, X0 + 8.5 * SK, Y - 2.1, 0.4);
  ganda.visible = false;
  lantai(grup, 16, 4, 0);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y + 1.2, 0, 16, 0, 1.45),
      ab: lihat(0, Y + 1.2, 0, 16, 0, 1.45),
      bc: lihat(0, Y + 1.2, 0, 16, 0, 1.45),
      ac: lihat(0, Y + 1.6, 0, 16, 0, 1.45),
      urut: lihat(0, Y + 1.6, 0, 16, 0, 1.45),
      ganda: lihat(0, Y + 0.6, 0, 16, 0, 1.45),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 8 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      ab.visible = ["ab", "bc", "ac", "urut"].includes(f);
      bc.visible = ["bc", "ac", "urut"].includes(f);
      ac.visible = ["ac", "urut", "ganda"].includes(f);
      ganda.visible = f === "ganda";
      aturLabel(lUrut, f === "urut", dt, v(0, Y + 5.2, 0.3));
    },
  };
}

