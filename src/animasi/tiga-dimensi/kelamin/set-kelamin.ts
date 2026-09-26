import * as THREE from "three";
import { lihat, type Studio } from "../studio";
import { bolaHalus, pembuatAcak } from "../bentuk";
import { alas, aturLabel, buatJamTahap, labelHidup, panah, pelan, v, type Set3D } from "../rangkai-set";
import { bangunSosok } from "../model-sosok";
import { bangunAyam, bangunSapi } from "../model-hewan";
import { bangunKromosom, KROMOSOM_MANUSIA } from "../model-kromosom";
import { bahan } from "../mendel/model-mendel";
import { kali, lantai, tulis } from "../mendel/bantu";
import { bangunDomba, bangunKromosomKelamin, bangunLalat, bangunPenyu, bangunSarang, bangunSperma, bangunTelur } from "./model-kelamin";

/**
 * SET PELAJARAN 4.1 dan 4.3 — penentuan kelamin; dipengaruhi dan dibatasi kelamin.
 *
 *  xy        22 pasang autosom kecil + pasangan XX dan XY
 *  gametXY   sel telur X; sperma X dan Y; anak XX dan XY
 *  sry       kromosom Y besar dengan gen SRY → testis; tanpa SRY → ovarium
 *  zw        ayam jantan ZZ dan betina ZW
 *  serangga  belalang XX/XO, lebah 2n/n, lalat buah rasio X : autosom
 *  penyu     sarang telur; dingin → jantan, hangat → betina
 *  botak     tiga laki-laki dan tiga perempuan: BB, Bb, bb
 *  domba     Dorset bertanduk × Suffolk → jantan bertanduk, betina tidak
 *  ayrshire  jantan Mm mahoni-putih, betina Mm merah-putih
 *  dibatasi  pejantan → anak betina yang memerah susu
 */

const RAMBUT = "#3b302b";

/* ================================================================== *
 * XY
 * ================================================================== */

export function setXY(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const L = 2.4;
  KROMOSOM_MANUSIA.forEach((k, i) => {
    const baris = Math.floor(i / 11);
    const x = -11 + (i % 11) * 1.25;
    const y = baris === 0 ? 4.2 : 1.6;
    for (const s of [-1, 1]) {
      const g = new THREE.Group();
      g.position.set(x + s * 0.22, y, 0);
      grup.add(g);
      bangunKromosom(studio, g, { p: L * k.panjang * k.p, q: L * k.panjang * (1 - k.p), jari: 0.14, asal: s < 0 ? "kromatin" : "kromosomAyah" }, 1);
    }
    tulis(grup, k.nama, 0.36, x, y - 1.65, 0.2);
  });
  tulis(grup, "22 pasang autosom", 0.8, -4.75, 6.2);
  const pasang = (x: number, keduanya: ["X", "X"] | ["X", "Y"], teks: string) => {
    const g = new THREE.Group();
    g.position.set(x, 3.2, 0);
    grup.add(g);
    keduanya.forEach((j, k) => {
      const h = bangunKromosomKelamin(studio, g, j, { L: 6.5, asal: k === 0 ? "kromatin" : "kromosomAyah", jari: 0.32, ukuranHuruf: 0.7 });
      h.grup.position.x = (k - 0.5) * 1.4;
    });
    tulis(grup, teks, 0.7, x, -0.7, 0.4);
  };
  pasang(4.5, ["X", "X"], "perempuan: XX");
  pasang(9, ["X", "Y"], "laki-laki: XY");
  tulis(grup, "pasangan ke-23", 0.8, 6.75, 6.6);
  lantai(grup, 26, 5, -1);
  return {
    grup,
    fokus: {
      utuh: lihat(-1, 3.2, 0, 27, 0, 1.38),
      kelamin: lihat(6.75, 3.2, 0, 13, 0, 1.38),
      xx: lihat(4.5, 3.2, 0, 10, 0, 1.38),
    },
    bayangan: { pusat: v(-1, 0, 0), jangkauan: 13 },
  };
}

/* ================================================================== *
 * GAMET XY
 * ================================================================== */

export function setGametXY(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const telur = bangunTelur(studio, grup, "X", 1.6);
  telur.position.set(-5, 3, 0);
  tulis(grup, "sel telur: selalu X", 0.5, -5, 0.8, 0.5);
  const sperma = ["X", "Y"].map((h, i) => {
    const s = bangunSperma(studio, grup, h, 1.3);
    s.position.set(1.5, 4.4 - i * 2.6, 0);
    return s;
  });
  tulis(grup, "sperma: ½ X, ½ Y", 0.5, 3.2, 0.3, 0.5);
  const anak = new THREE.Group();
  grup.add(anak);
  const acak = pembuatAcak(4);
  bangunSosok(studio, anak, { entitas: "anakP", label: "XX · perempuan · ½", x: 7.6, tinggi: 0.7, rambut: RAMBUT, keriting: false, panjang: true, baju: "#cbbfae", ukuranLabel: 0.5 }, acak);
  bangunSosok(studio, anak, { entitas: "anakL", label: "XY · laki-laki · ½", x: 11, tinggi: 0.72, rambut: RAMBUT, keriting: true, baju: "#c4b8a6", ukuranLabel: 0.5 }, acak);
  anak.visible = false;
  lantai(grup, 22, 6, 2);
  return {
    grup,
    fokus: {
      utuh: lihat(-1.5, 2.8, 0, 16, 0, 1.35),
      sperma: lihat(0, 2.8, 0, 16, 0, 1.35),
      anak: lihat(3, 2.6, 0, 23, 0, 1.33),
    },
    bayangan: { pusat: v(2, 0, 0), jangkauan: 11 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      anak.visible = p.fokus === "anak";
      sperma.forEach((s, i) => (s.position.x = 1.5 + 0.25 * Math.sin(t * 2 + i)));
    },
  };
}

/* ================================================================== *
 * SRY
 * ================================================================== */

export function setSRY(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const y = new THREE.Group();
  y.position.set(-4.5, 3.4, 0);
  grup.add(y);
  const Y = bangunKromosomKelamin(studio, y, "Y", { L: 14, asal: "kromosomAyah", alel: "SRY", lokus: 0.06, jari: 0.5, ukuranHuruf: 0.8 });
  const x = new THREE.Group();
  x.position.set(-4.5, 3.4, 0);
  grup.add(x);
  bangunKromosomKelamin(studio, x, "X", { L: 8, asal: "kromatin", jari: 0.45, ukuranHuruf: 0.8 });
  const gonad = (warna: string, teks: string) => {
    const g = new THREE.Group();
    g.position.set(4.5, 3.2, 0);
    grup.add(g);
    const b = bolaHalus(1.1, 24, 16);
    b.scale(1.4, 0.9, 0.9);
    studio.tambah(bahan(studio, `gonad-${teks}`, ["gonad"], warna, 0.004), b, g);
    tulis(g, teks, 0.7, 0, -1.7, 0.5);
    return g;
  };
  const testis = gonad("#e3c1b4", "testis");
  const ovarium = gonad("#efd3c8", "ovarium");
  panah(studio, grup, [v(-2.6, 3.6, 0), v(0.5, 4.2, 0), v(2.6, 3.4, 0)], 0.08);
  tulis(grup, "bakal gonad", 0.5, 0.5, 5, 0);
  let tanpa = 0;
  lantai(grup, 16, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 3, 0, 17, 0, 1.35),
      gen: lihat(-4.5, 3.4 + Y.p * 0.8, 0, 8, 0, 1.35),
      tanpa: lihat(0, 3, 0, 17, 0, 1.35),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
    perbarui: (p, dt) => {
      tanpa = pelan(tanpa, p.fokus === "tanpa" ? 1 : 0, 4, dt);
      y.visible = tanpa < 0.5;
      x.visible = tanpa >= 0.5;
      testis.visible = tanpa < 0.5;
      ovarium.visible = tanpa >= 0.5;
      y.rotation.y = x.rotation.y = 0.3 * Math.sin((p.detik ?? 0) * 0.5);
    },
  };
}

/* ================================================================== *
 * ZW
 * ================================================================== */

export function setZW(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const buat = (x: number, jantan: boolean) => {
    alas(studio, grup, x, 0, 2.2);
    const a = new THREE.Group();
    a.position.set(x - 0.3, 0.55, 0);
    a.rotation.y = jantan ? -0.3 : 0.3 + Math.PI;
    grup.add(a);
    bangunAyam(studio, a, { jantan, bulu: jantan ? "merah" : "putih" });
    const k = new THREE.Group();
    k.position.set(x, 6.4, 0);
    grup.add(k);
    (jantan ? (["Z", "Z"] as const) : (["Z", "W"] as const)).forEach((j, i) => {
      const h = bangunKromosomKelamin(studio, k, j, { L: 4, asal: i === 0 ? "kromatin" : "kromosomAyah", jari: 0.26, ukuranHuruf: 0.6 });
      h.grup.position.x = (i - 0.5) * 1.1;
    });
    tulis(grup, jantan ? "jantan: ZZ" : "betina: ZW", 0.6, x, -0.5, 2.3);
  };
  buat(-4, true);
  buat(4, false);
  lantai(grup, 18, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 3.9, 0, 21.5, 0, 1.3),
      jantan: lihat(-4, 3.9, 0, 13.5, -0.1, 1.3),
      betina: lihat(4, 3.9, 0, 13.5, 0.1, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
  };
}

/* ================================================================== *
 * SERANGGA — belalang, lebah, lalat buah
 * ================================================================== */

function setKromosom(studio: Studio, induk: THREE.Object3D, x: number, y: number, isi: { panjang: number; asal: "kromatin" | "kromosomAyah" }[], huruf?: string[]) {
  const g = new THREE.Group();
  g.position.set(x, y, 0);
  induk.add(g);
  isi.forEach((k, i) => {
    const c = new THREE.Group();
    c.position.x = (i - (isi.length - 1) / 2) * 0.7;
    g.add(c);
    bangunKromosom(studio, c, { p: k.panjang * 0.4, q: k.panjang * 0.6, jari: 0.18, asal: k.asal }, 1);
    if (huruf?.[i]) tulis(c, huruf[i], 0.45, 0, k.panjang * 0.4 + 0.45, 0.2);
  });
  return g;
}

export function setSerangga(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const A = (asal: "kromatin" | "kromosomAyah") => [
    { panjang: 2.2, asal },
    { panjang: 1.6, asal },
  ];
  /* belalang */
  setKromosom(studio, grup, -9.5, 3.4, [...A("kromatin"), ...A("kromosomAyah"), { panjang: 2, asal: "kromatin" }, { panjang: 2, asal: "kromosomAyah" }], ["", "", "", "", "X", "X"]);
  setKromosom(studio, grup, -4.6, 3.4, [...A("kromatin"), ...A("kromosomAyah"), { panjang: 2, asal: "kromatin" }], ["", "", "", "", "X"]);
  tulis(grup, "betina XX", 0.5, -9.5, 1.2);
  tulis(grup, "jantan XO", 0.5, -4.6, 1.2);
  tulis(grup, "belalang", 0.7, -7, 5.9);
  /* lebah */
  setKromosom(studio, grup, 1.6, 3.4, [...A("kromatin"), { panjang: 1.2, asal: "kromatin" }, ...A("kromosomAyah"), { panjang: 1.2, asal: "kromosomAyah" }]);
  setKromosom(studio, grup, 6, 3.4, [...A("kromatin"), { panjang: 1.2, asal: "kromatin" }]);
  tulis(grup, "ratu/pekerja: 2n", 0.5, 1.6, 1.2);
  tulis(grup, "jantan: n", 0.5, 6, 1.2);
  tulis(grup, "lebah madu", 0.7, 3.8, 5.9);
  /* lalat buah */
  const lalat = new THREE.Group();
  lalat.position.set(12.5, 1.9, 0);
  lalat.scale.setScalar(0.9);
  lalat.rotation.y = -0.5;
  grup.add(lalat);
  bangunLalat(studio, lalat);
  tulis(grup, "lalat buah", 0.7, 12.5, 5.9);
  tulis(grup, "X : set autosom", 0.5, 12.5, 4.9);
  tulis(grup, "1 X : 2 set → jantan", 0.45, 12.5, 1.4);
  tulis(grup, "2 X : 2 set → betina", 0.45, 12.5, 0.7);
  lantai(grup, 28, 5, 1.5);
  return {
    grup,
    fokus: {
      utuh: lihat(1.5, 3.3, 0, 28, 0, 1.35),
      belalang: lihat(-7, 3.3, 0, 12, 0, 1.35),
      lebah: lihat(3.8, 3.3, 0, 12, 0, 1.35),
      lalat: lihat(12.5, 3, 0, 10, 0, 1.3),
    },
    bayangan: { pusat: v(1.5, 0, 0), jangkauan: 14 },
    perbarui: (p) => {
      lalat.rotation.y = -0.5 + 0.3 * Math.sin((p.detik ?? 0) * 0.5);
    },
  };
}

/* ================================================================== *
 * PENYU
 * ================================================================== */

export function setPenyu(studio: Studio): Set3D {
  const grup = new THREE.Group();
  [-5, 5].forEach((x, i) => {
    const s = bangunSarang(studio, grup, 14, i + 3);
    s.position.x = x;
  });
  tulis(grup, "pasir lebih dingin", 0.55, -5, -0.6, 2.6);
  tulis(grup, "pasir lebih hangat", 0.55, 5, -0.6, 2.6);
  const anak = [-1, 1].map((sisi, i) => {
    const g = new THREE.Group();
    grup.add(g);
    for (let k = 0; k < 3; k++) {
      const p = bangunPenyu(studio, g, 0.45);
      p.position.set(sisi * 5 + (k - 1) * 1.3, 0.55, 2.4 + (k % 2) * 0.4);
      p.rotation.y = -Math.PI / 2 + (k - 1) * 0.2;
    }
    tulis(g, i === 0 ? "lebih banyak jantan" : "lebih banyak betina", 0.5, sisi * 5, 1.6, 2.8);
    return g;
  });
  const induk = bangunPenyu(studio, grup, 1.3);
  induk.position.set(0, 0, -2.5);
  induk.rotation.y = -0.4;
  lantai(grup, 20, 8);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.4, 0, 20, 0, 1.2),
      hangat: lihat(4.5, 1.2, 1, 11, 0.15, 1.15),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      anak.forEach((g, i) => (g.position.z = 0.15 * Math.sin(t * 2 + i)));
    },
  };
}

/* ================================================================== *
 * BOTAK
 * ================================================================== */

export function setBotak(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(12);
  const DATA: { g: string; botakL: boolean; botakP: boolean }[] = [
    { g: "BB", botakL: true, botakP: true },
    { g: "Bb", botakL: true, botakP: false },
    { g: "bb", botakL: false, botakP: false },
  ];
  DATA.forEach((d, k) => {
    const x = (k - 1) * 3.4;
    bangunSosok(studio, grup, { entitas: `l${k}`, label: `${d.g} · ${d.botakL ? "botak" : "tidak"}`, x: x - 9.5, tinggi: 1, rambut: RAMBUT, keriting: false, baju: "#c4b8a6", botak: d.botakL, ukuranLabel: 0.52 }, acak);
    bangunSosok(
      studio,
      grup,
      { entitas: `p${k}`, label: `${d.g} · ${d.botakP ? "botak ringan" : "tidak"}`, x: x + 3.5, tinggi: 0.95, rambut: RAMBUT, keriting: false, panjang: !d.botakP, baju: "#cbbfae", botak: d.botakP, ukuranLabel: 0.52 },
      acak,
    );
  });
  tulis(grup, "laki-laki", 0.7, -9.5, 5.8);
  tulis(grup, "perempuan", 0.7, 3.5, 5.8);
  lantai(grup, 26, 5, -3);
  return {
    grup,
    fokus: {
      utuh: lihat(-3, 2.6, 0, 26, 0, 1.3),
      pria: lihat(-9.5, 2.6, 0, 14, 0, 1.3),
      wanita: lihat(3.5, 2.6, 0, 14, 0, 1.3),
    },
    bayangan: { pusat: v(-3, 0, 0), jangkauan: 13 },
  };
}

/* ================================================================== *
 * DOMBA
 * ================================================================== */

export function setDomba(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const letak = (x: number, z: number, o: Parameters<typeof bangunDomba>[2], label: string, rot = 0) => {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = rot;
    grup.add(g);
    bangunDomba(studio, g, o);
    tulis(grup, label, 0.55, x, 3.9, z);
    return g;
  };
  letak(-5, -2.5, { tanduk: true, jantan: true }, "Dorset ♂ HH (bertanduk)");
  letak(5, -2.5, { mukaHitam: true }, "Suffolk ♀ hh (tak bertanduk)", Math.PI);
  kali(grup, 0, 2, -2.5, 0.9);
  const anak = new THREE.Group();
  grup.add(anak);
  const a1 = new THREE.Group();
  a1.position.set(-2.8, 0, 3);
  a1.scale.setScalar(0.75);
  anak.add(a1);
  bangunDomba(studio, a1, { tanduk: true, jantan: true, mukaHitam: true });
  tulis(anak, "anak jantan Hh: bertanduk", 0.5, -2.8, -0.5, 4.3);
  const a2 = new THREE.Group();
  a2.position.set(2.8, 0, 3);
  a2.scale.setScalar(0.75);
  anak.add(a2);
  bangunDomba(studio, a2, { mukaHitam: true });
  tulis(anak, "anak betina Hh: tak bertanduk", 0.5, 2.8, -0.5, 4.3);
  anak.visible = false;
  lantai(grup, 20, 11);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.8, 0, 22, 0, 1.2),
      induk: lihat(0, 1.8, -2.5, 17, 0, 1.25),
      anak: lihat(0, 1.4, 3, 13.5, 0, 1.2),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
    perbarui: (p) => {
      anak.visible = p.fokus !== "induk";
    },
  };
}

/* ================================================================== *
 * AYRSHIRE
 * ================================================================== */

export function setAyrshire(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const jantan = bangunSapi(studio, grup, { bulu: "putih", belang: "mahoni", tanduk: true });
  jantan.position.set(-5, 0, 0);
  const betina = bangunSapi(studio, grup, { bulu: "putih", belang: "merah", tanduk: true });
  betina.position.set(5, 0, 0);
  betina.rotation.y = Math.PI;
  tulis(grup, "jantan Mm: mahoni-putih", 0.55, -5, 4.8);
  tulis(grup, "betina Mm: merah-putih", 0.55, 5, 4.8);
  tulis(grup, "genotip sama, warna berbeda", 0.6, 0, 6);
  lantai(grup, 22, 7);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.6, 0, 22, 0, 1.3),
      jantan: lihat(-4.5, 2.4, 0, 12, -0.1, 1.28),
      betina: lihat(4.5, 2.4, 0, 12, 0.1, 1.28),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
  };
}

/* ================================================================== *
 * DIBATASI — produksi susu
 * ================================================================== */

export function setDibatasi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const pejantan = bangunSapi(studio, grup, { bulu: "hitam", tanduk: true });
  pejantan.position.set(-7, 0, -1);
  const induk = bangunSapi(studio, grup, { bulu: "putih", belang: "merah" });
  induk.position.set(1, 0, -1);
  const anak = bangunSapi(studio, grup, { bulu: "hitam" });
  anak.position.set(-2, 0, 3.4);
  anak.scale.setScalar(0.85);
  const ember = (x: number, z: number, penuh: number) => {
    const e = new THREE.CylinderGeometry(0.55, 0.45, 1, 24, 1, true);
    e.translate(x, 0.5, z);
    studio.tambah(studio.bagian("ember", "#c9ced4", { garis: 0.004, sisi: THREE.DoubleSide, tembus: 0.5 }), e, grup);
    const s = new THREE.CylinderGeometry(0.5, 0.45, penuh, 24);
    s.translate(x, penuh / 2 + 0.02, z);
    studio.tambah(bahan(studio, "susu", ["susu"], "#fbfaf5", 0.003), s, grup);
  };
  ember(4.8, 0.4, 0.8);
  ember(1.8, 4.6, 0.85);
  tulis(grup, "pejantan: membawa gen, tidak memerah susu", 0.48, -7, 4.6, -1);
  tulis(grup, "induk betina: memerah susu", 0.48, 2.4, 4.6, -1);
  const lAnak = labelHidup(grup, "anak betina dari pejantan itu", 0.5);
  const arah = panah(studio, grup, [v(-5.8, 3.4, -0.8), v(-4.8, 4, 1.5), v(-3.2, 3, 3.2)], 0.07);
  arah.visible = false;
  const jam = buatJamTahap();
  lantai(grup, 22, 11, -1.5);
  return {
    grup,
    fokus: {
      utuh: lihat(-1.5, 2.2, 0.5, 23, 0, 1.25),
      susu: lihat(2.5, 1.8, 0, 13, 0.1, 1.25),
      pejantan: lihat(-6, 2.4, -1, 12, -0.1, 1.25),
      anak: lihat(-2.5, 2, 2, 16, 0, 1.2),
    },
    bayangan: { pusat: v(-1.5, 0, 0), jangkauan: 11 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      arah.visible = f === "anak" || (f === "pejantan" && j > 0.5);
      aturLabel(lAnak, f === "anak", dt, v(-2, 4.1, 3.6));
    },
  };
}
