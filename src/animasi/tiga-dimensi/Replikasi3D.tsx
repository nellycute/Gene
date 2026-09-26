"use client";

import * as THREE from "three";
import { MOLEKUL, ronaTerang } from "@/lib/warna";
import type { PropsAnimasi } from "../daftar";
import { Film3D } from "./Film3D";
import { lihat, type Studio } from "./studio";
import { lantaiBayang, pembuatAcak, tabung, teksturBayang } from "./bentuk";
import { bangunDNARakit, keadaanAwal } from "./model-dna-rakit";
import { bangunCawan, bangunEColi, bangunTabung } from "./model-mikroba";
import { DX, FRAGMEN, GARPU, N, bangunGarpu, xNukleotida, type KeadaanGarpu } from "./model-garpu";
import { aturLabel, buatJamTahap, label, labelHidup, mulus, panah, pelan, rangkaiSet, v, type Set3D } from "./rangkai-set";

/**
 * REPLIKASI DNA — film pelajaran 1.4 (gaya 3D bergaris, §3).
 *
 *  - buka: heliks ganda yang untainya memisah — tiap untai jadi cetakan;
 *  - model: tiga kemungkinan hasil (konservatif, semikonservatif, dispersif);
 *  - meselson: E. coli di ¹⁵N lalu ¹⁴N, tiga tabung sentrifugasi yang pitanya
 *    muncul generasi demi generasi;
 *  - garpu: garpu replikasi lengkap (model-garpu.ts) — helikase, primer,
 *    polimerase, untai maju, fragmen Okazaki, ligase, pemeriksaan, dua DNA anak.
 */

const TAHAP_SET: Record<string, string> = { buka: "buka", model: "model", meselson: "meselson", garpu: "garpu" };

const bangun = rangkaiSet(
  (studio) => {
    const acak = pembuatAcak(41);
    return {
      buka: setBuka(studio),
      model: setModel(studio),
      meselson: setMeselson(studio, acak),
      garpu: setGarpu(studio, acak),
    };
  },
  TAHAP_SET,
  "buka",
);

export default function Replikasi3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}

const LAMA = MOLEKUL.gulaFosfat.warna;
const BARU = ronaTerang(MOLEKUL.gulaFosfat.warna, 0.55);

/* ================================================================== *
 * BUKA — kedua untai memisah menjadi cetakan
 * ================================================================== */

function setBuka(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const dna = bangunDNARakit(studio, grup, "CGTAATGCAGCTTACGGATC");
  const n = dna.n;
  const k = keadaanAwal(n);
  k.pilin = 1;
  for (let i = 0; i < n; i++) {
    k.tampak[0][i] = 1;
    k.tampak[1][i] = 1;
  }
  const lCetak = [labelHidup(grup, "cetakan", 0.45), labelHidup(grup, "cetakan", 0.45)];
  grup.add(lantaiBayang(teksturBayang(), 6, 6, -4.4));
  return {
    grup,
    fokus: {
      utuh: lihat(0, 0, 0, 16, 0.3, 1.36, "putar"),
      heliks: lihat(0, 0, 0, 16, 0.3, 1.36, "putar"),
      buka: lihat(0, 0.8, 0, 17.5, 0.25, 1.36),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 6 },
    perbarui: (p, dt) => {
      const buka = p.fokus === "buka";
      for (let i = 0; i < n; i++) {
        const sasaran = buka ? Math.min(1.6, Math.max(0, (13 - i) * 0.22)) : 0;
        k.lepas[0][i] = pelan(k.lepas[0][i], sasaran, 1.2, dt);
        k.lepas[1][i] = pelan(k.lepas[1][i], sasaran, 1.2, dt);
      }
      dna.perbarui(k);
      aturLabel(lCetak[0], buka, dt, dna.letakGula[0][0].clone().add(v(0.6, 0.6, 0)));
      aturLabel(lCetak[1], buka, dt, dna.letakGula[1][0].clone().add(v(-0.6, 0.6, 0)));
    },
  };
}

/* ================================================================== *
 * MODEL — konservatif, semikonservatif, dispersif
 * ================================================================== */

/** Dupleks kecil: dua pita berpilin, tiap pita terbagi 6 potong berwarna lama/baru. */
function dupleks(studio: Studio, induk: THREE.Object3D, pusat: THREE.Vector3, warna: [boolean[], boolean[]], entitas: string) {
  const bLama = studio.bagian(["gulaFosfat", "untaiLama", entitas], LAMA, { garis: 0.004 });
  const bBaru = studio.bagian(["gulaFosfat", "untaiBaru", entitas], BARU, { garis: 0.004 });
  const TINGGI = 3.2;
  const POTONG = warna[0].length;
  for (const [s, fase] of [
    [0, 0],
    [1, (5 * Math.PI) / 6],
  ] as const) {
    for (let j = 0; j < POTONG; j++) {
      const titik: THREE.Vector3[] = [];
      for (let u = 0; u <= 12; u++) {
        const y = -TINGGI / 2 + ((j + u / 12) / POTONG) * TINGGI;
        const a = -(y / 3.4) * Math.PI * 2 * 2.2 + fase;
        titik.push(v(pusat.x + 0.55 * Math.cos(a), pusat.y + y, pusat.z - 0.55 * Math.sin(a)));
      }
      studio.tambah(warna[s][j] ? bBaru : bLama, tabung(titik, 0.14, 24, 8), induk);
    }
  }
}

function setModel(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const semua = (x: boolean) => Array(6).fill(x) as boolean[];
  const selang = (mulai: boolean) => Array.from({ length: 6 }, (_, j) => (j % 2 === 0) === mulai);
  const KOLOM = [
    { nama: "Konservatif", entitas: "konservatif", x: -8, anak: [[semua(false), semua(false)], [semua(true), semua(true)]] },
    { nama: "Semikonservatif", entitas: "semikonservatif", x: 0, anak: [[semua(false), semua(true)], [semua(true), semua(false)]] },
    { nama: "Dispersif", entitas: "dispersif", x: 8, anak: [[selang(true), selang(false)], [selang(false), selang(true)]] },
  ] as const;
  for (const k of KOLOM) {
    dupleks(studio, grup, v(k.x, 5.4, 0), [semua(false), semua(false)], k.entitas);
    panah(studio, grup, [v(k.x, 3.4, 0), v(k.x, 2.4, 0)], 0.08, k.entitas);
    dupleks(studio, grup, v(k.x - 1.5, 0, 0), k.anak[0] as unknown as [boolean[], boolean[]], k.entitas);
    dupleks(studio, grup, v(k.x + 1.5, 0, 0), k.anak[1] as unknown as [boolean[], boolean[]], k.entitas);
    label(grup, k.nama, 0.6, k.x, 7.8);
  }
  /* keterangan warna */
  const kotak = (x: number, warna: string, teks: string) => {
    const g = new THREE.BoxGeometry(0.9, 0.4, 0.4);
    g.translate(x, -2.9, 0);
    studio.tambah(studio.bagian("keterangan", warna, { garis: 0.003 }), g, grup);
    label(grup, teks, 0.45, x + 2.0, -2.9);
  };
  kotak(-4.6, LAMA, "untai lama");
  kotak(1.6, BARU, "untai baru");
  label(grup, "induk", 0.45, -11.2, 5.4);
  label(grup, "anak", 0.45, -11.2, 0);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.3, 0, 33, 0, 1.42),
      konservatif: lihat(-8, 2.5, 0, 15, -0.1, 1.42),
      semikonservatif: lihat(0, 2.5, 0, 15, 0, 1.42),
      dispersif: lihat(8, 2.5, 0, 15, 0.1, 1.42),
    },
    bayangan: { pusat: v(0, -2, 0), jangkauan: 12 },
  };
}

/* ================================================================== *
 * MESELSON–STAHL
 * ================================================================== */

function setMeselson(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();

  /* dua cawan: medium ¹⁵N lalu ¹⁴N */
  for (const [x, teks] of [
    [-10, "medium ¹⁵N"],
    [-6, "medium ¹⁴N"],
  ] as const) {
    const cawan = new THREE.Group();
    cawan.position.set(x, 0.05, 0);
    grup.add(cawan);
    bangunCawan(studio, cawan, 1.5);
    for (let i = 0; i < 6; i++) {
      const b = bangunEColi(studio, cawan, 0.5, 0.18);
      b.position.set((acak() - 0.5) * 1.8, 0.33, (acak() - 0.5) * 1.8);
      b.rotation.y = acak() * 3;
    }
    label(grup, teks, 0.5, x, 1.6);
  }
  panah(studio, grup, [v(-8.6, 0.9, 0), v(-7.4, 0.9, 0)]);

  /* tiga tabung sentrifugasi: generasi 0, 1, 2 */
  const X = [-1.5, 2.2, 5.9];
  const Y_PITA = { berat: 1.35, tengah: 2.25, ringan: 3.15 };
  const bPita = studio.bagian("dna", MOLEKUL.dna.warna, { garis: 0.003 });
  const pita = (x: number, y: number) => {
    const g = new THREE.CylinderGeometry(0.72, 0.72, 0.12, 32);
    const m = studio.tambah(bPita, g, grup);
    m.position.set(x, y, 0);
    return m;
  };
  const tabungTampak: THREE.Mesh[][] = [];
  X.forEach((x, i) => {
    const tab = new THREE.Group();
    tab.position.set(x, 0.3, 0);
    grup.add(tab);
    bangunTabung(studio, tab, { tinggi: 4.6, jari: 0.85, isi: 0.85 });
    label(grup, `generasi ${i}`, 0.5, x, 5.6);
    tabungTampak.push(
      i === 0 ? [pita(x, Y_PITA.berat)] : i === 1 ? [pita(x, Y_PITA.tengah)] : [pita(x, Y_PITA.tengah), pita(x, Y_PITA.ringan)],
    );
  });
  label(grup, "ringan · ¹⁴N/¹⁴N", 0.42, 9.3, Y_PITA.ringan);
  label(grup, "tengah · ¹⁵N/¹⁴N", 0.42, 9.3, Y_PITA.tengah);
  label(grup, "berat · ¹⁵N/¹⁵N", 0.42, 9.3, Y_PITA.berat);
  const rak = new THREE.BoxGeometry(10.5, 0.4, 1.8);
  rak.translate(2.2, 0.2, 0);
  studio.tambah(studio.bagian("rak", "#c4b8a6", { garis: 0.004 }), rak, grup);
  grup.add(lantaiBayang(teksturBayang(), 26, 7, 0.01));

  const nilai = [0, 0, 0];
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.3, 0, 30, 0, 1.4),
      bakteri: lihat(-8, 0.9, 0, 12, 0, 1.2),
      gen0: lihat(0.5, 2.6, 0, 15, 0, 1.42),
      gen1: lihat(2.2, 2.6, 0, 15, 0, 1.42),
      gen2: lihat(4.2, 2.6, 0, 16, 0, 1.42),
      hasil: lihat(3.2, 2.6, 0, 19, 0, 1.42),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 13 },
    perbarui: (p, dt) => {
      const tahap = { gen0: 1, gen1: 2, gen2: 3, hasil: 3 }[p.fokus ?? ""] ?? 0;
      tabungTampak.forEach((daftar, i) => {
        nilai[i] = pelan(nilai[i], tahap > i ? 1 : 0, 3, dt);
        for (const m of daftar) {
          m.visible = nilai[i] > 0.02;
          m.scale.set(Math.max(nilai[i], 0.001), 1, Math.max(nilai[i], 0.001));
        }
      });
    },
  };
}

/* ================================================================== *
 * GARPU REPLIKASI
 * ================================================================== */

/** Urutan tahap; tiap tahap memakai `sejak` untuk gerakannya sendiri. */
const URUT = ["asal", "helikase", "garpu", "primase", "arah", "pasang", "maju", "lambat", "okazaki", "ganti", "ligase", "koreksi", "hasil"];
const FRAG = Math.ceil(N / FRAGMEN);

function keadaanUntuk(fokus: string, sejak: number, detik: number): KeadaanGarpu {
  const t = Math.max(0, URUT.indexOf(fokus));
  const di = (nama: string) => t === URUT.indexOf(nama);
  const lewat = (nama: string) => t > URUT.indexOf(nama);
  const k: KeadaanGarpu = { maju: 0, fragmen: Array(FRAG).fill(0), ganti: 0, sambung: 0, pisah: 0, detik, salah: 0 };
  const fTerjauh = FRAG - 1;

  /* primer: untai maju (ujung kiri) dan fragmen terjauh */
  if (t >= URUT.indexOf("primase")) {
    k.maju = 2;
    k.fragmen[fTerjauh] = 2;
  }
  if (di("primase")) {
    k.maju = Math.min(2, sejak * 2);
    k.fragmen[fTerjauh] = Math.min(2, Math.max(0, sejak * 2 - 1));
  }
  /* polimerase mulai memanjangkan */
  if (di("arah")) k.maju = 2 + Math.min(8, sejak * 2.2);
  if (lewat("arah")) k.maju = 10;
  if (di("maju")) k.maju = 10 + Math.min(N - 10, sejak * 3.5);
  if (lewat("maju")) k.maju = N;
  /* untai lambat: fragmen terjauh sudah jadi saat untai maju tumbuh */
  if (t >= URUT.indexOf("arah")) k.fragmen[fTerjauh] = Math.min(FRAGMEN, 2 + (di("arah") ? sejak * 1.2 : 4));
  if (di("lambat") || di("okazaki")) {
    const mulai = di("lambat") ? 0 : 6;
    for (let f = fTerjauh - 1; f >= 0; f--) {
      const urutan = fTerjauh - 1 - f;
      k.fragmen[f] = THREE.MathUtils.clamp((sejak + mulai - urutan * 2.2) * 3, 0, FRAGMEN);
    }
  }
  if (lewat("okazaki")) k.fragmen.fill(FRAGMEN);
  if (di("ganti")) k.ganti = mulus(sejak / 3);
  if (lewat("ganti")) k.ganti = 1;
  if (di("ligase")) k.sambung = mulus(sejak / 4);
  if (lewat("ligase")) k.sambung = 1;
  if (di("koreksi")) k.salah = sejak < 2.5 ? 1 : Math.max(0, 1 - (sejak - 2.5) * 1.5);
  if (di("hasil")) k.pisah = mulus(sejak / 2.5);
  return k;
}

function setGarpu(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const model = new THREE.Group();
  model.position.x = -1.5;
  grup.add(model);
  const garpu = bangunGarpu(studio, model, acak);
  const { helikase, primase, polMaju, polLambat, ligase } = garpu.enzim;
  const X = (x: number) => x - 1.5;

  /* label */
  const lHelikase = labelHidup(grup, "helikase", 0.45);
  const lPrimase = labelHidup(grup, "primase", 0.45);
  const lPolA = labelHidup(grup, "DNA polimerase", 0.45);
  const lPolB = labelHidup(grup, "DNA polimerase", 0.45);
  const lLigase = labelHidup(grup, "ligase", 0.45);
  const lMaju = labelHidup(grup, "untai maju →", 0.5);
  const lLambat = labelHidup(grup, "← untai lambat", 0.5);
  const lOkazaki = labelHidup(grup, "fragmen Okazaki", 0.45);
  const l5 = labelHidup(grup, "5′", 0.45);
  const l3 = labelHidup(grup, "3′", 0.45);
  const lPrimer = labelHidup(grup, "primer RNA", 0.42);
  const lAnak = [labelHidup(grup, "DNA anak · lama + baru", 0.5), labelHidup(grup, "DNA anak · lama + baru", 0.5)];
  const lGarpu = labelHidup(grup, "garpu replikasi", 0.5);
  const lAsal = labelHidup(grup, "titik asal", 0.5);
  const lSalah = labelHidup(grup, "salah pasang", 0.32);

  const tampak: Record<string, number> = {};
  const muncul = (nama: string, ya: boolean, dt: number) => {
    tampak[nama] = pelan(tampak[nama] ?? 0, ya ? 1 : 0, 4, dt);
    return tampak[nama];
  };
  const pasang = (m: THREE.Object3D, f: number, x: number, y: number) => {
    m.visible = f > 0.02;
    m.scale.setScalar(Math.max(f, 0.001));
    m.position.set(x, y, 0.15);
  };
  grup.add(lantaiBayang(teksturBayang(), 28, 8, -3.9));
  const xUjung = X(xNukleotida(N - 1));
  const jamTahap = buatJamTahap();

  return {
    grup,
    fokus: {
      utuh: lihat(0.5, 0, 0, 30, 0, 1.4),
      asal: lihat(3.5, 0, 0, 22, 0.1, 1.4),
      helikase: lihat(X(GARPU), -0.6, 0, 9, 0.15, 1.38),
      garpu: lihat(1.5, 0, 0, 20, 0.05, 1.4),
      primase: lihat(X(xNukleotida(N - 3)), 0, 0, 12, -0.05, 1.4),
      arah: lihat(X(xNukleotida(N - 8)), 0.4, 0, 12, 0, 1.4),
      pasang: lihat(X(xNukleotida(N - 8)), 1.0, 0, 6.5, 0, 1.36),
      maju: lihat(-1, 0.3, 0, 22, 0, 1.4),
      lambat: lihat(-1, -0.4, 0, 22, 0, 1.4),
      okazaki: lihat(-1.5, -0.9, 0, 17, 0, 1.4),
      ganti: lihat(-1.5, -0.9, 0, 17, 0, 1.4),
      ligase: lihat(-1.5, -0.9, 0, 17, 0, 1.4),
      koreksi: lihat(X(xNukleotida(2)), 0.9, 0, 8.5, 0.1, 1.38),
      hasil: lihat(0, 0, 0, 20, 0, 1.4),
    },
    bayangan: { pusat: v(0, -2, 0), jangkauan: 14 },
    perbarui: (p, dt) => {
      const f = URUT.includes(p.fokus ?? "") ? (p.fokus as string) : "asal";
      const t = URUT.indexOf(f);
      const sejak = jamTahap(p);
      const detik = p.detik ?? 0;
      const k = keadaanUntuk(f, sejak, detik);
      garpu.perbarui(k);

      const selesai = f === "hasil";
      /* helikase selalu di garpu */
      pasang(helikase, muncul("helikase", t >= 1 && !selesai, dt), GARPU - 0.35, -1.4);
      helikase.rotation.x = detik * 2;
      /* primase: ke primer yang sedang dibuat */
      const fAktif = f === "lambat" || f === "okazaki" ? Math.max(0, FRAG - 2 - Math.floor(Math.max(0, sejak + (f === "okazaki" ? 6 : 0)) / 2.2)) : FRAG - 1;
      const xPrimase = f === "primase" ? xNukleotida(FRAG * FRAGMEN - FRAGMEN) : xNukleotida(fAktif * FRAGMEN);
      pasang(primase, muncul("primase", f === "primase" || f === "lambat" || f === "okazaki", dt), xPrimase, -0.35);
      /* polimerase untai maju: di ujung pertumbuhan */
      /* saat memeriksa, polimerase mundur sedikit dan berdiri di samping basa yang salah */
      const xMaju = f === "koreksi" ? xNukleotida(0.6) : garpu.ujungMaju(k);
      pasang(polMaju, muncul("polMaju", t >= URUT.indexOf("arah") && !selesai, dt) * (f === "koreksi" ? 0.75 : 1), xMaju - DX * 0.3, f === "koreksi" ? 1.25 : 0.95);
      polMaju.rotation.set(0, detik * 0.8, 0);
      /* polimerase untai lambat: di ujung fragmen yang sedang tumbuh */
      let fTumbuh = FRAG - 1;
      for (let i = 0; i < FRAG; i++) if (k.fragmen[i] > 0 && k.fragmen[i] < FRAGMEN) fTumbuh = i;
      const xLambat = xNukleotida(fTumbuh * FRAGMEN + Math.max(0, Math.ceil(k.fragmen[fTumbuh]) - 1));
      pasang(polLambat, muncul("polLambat", t >= URUT.indexOf("arah") && t <= URUT.indexOf("okazaki"), dt), xLambat, -0.95);
      polLambat.rotation.set(0, -detik * 0.8, 0);
      /* ligase: berpindah dari celah ke celah */
      const celah = Math.min(FRAG - 2, Math.floor(Math.max(0, sejak) / 1.2));
      pasang(ligase, muncul("ligase", f === "ligase", dt), xNukleotida(celah * FRAGMEN + FRAGMEN - 0.5), -0.5);

      /* label */
      const lbl = (l: ReturnType<typeof labelHidup>, ya: boolean, x: number, y: number) => aturLabel(l, ya, dt, v(X(x), y, 0.3));
      lbl(lAsal, f === "asal", GARPU + 2, 2.5);
      lbl(lGarpu, f === "garpu" || f === "asal", GARPU - 0.5, 2.9);
      lbl(lHelikase, f === "helikase" || f === "garpu", GARPU - 0.35, -2.7);
      lbl(lPrimase, f === "primase" || f === "lambat" || f === "okazaki", xPrimase, 0.35);
      lbl(lPrimer, f === "primase" || f === "ganti", xNukleotida(N - 1.5), 0.0);
      lbl(lPolA, f === "arah" || f === "pasang" || f === "maju" || f === "koreksi", xMaju, 2.9);
      lbl(lPolB, f === "lambat" || f === "okazaki", xLambat, -2.9);
      lbl(lLigase, f === "ligase", xNukleotida(celah * FRAGMEN + FRAGMEN - 0.5), -2.9);
      lbl(lMaju, f === "maju" || f === "lambat", xNukleotida(4), 3.0);
      lbl(lLambat, f === "lambat" || f === "okazaki" || f === "ligase", xNukleotida(4), -3.0);
      lbl(lSalah, f === "koreksi" && k.salah > 0.5, xNukleotida(2), -0.35);
      lbl(lOkazaki, f === "okazaki", xNukleotida(FRAGMEN * 2.5), -2.3);
      lbl(l5, f === "arah", xNukleotida(N - 1) - 0.5, 0.5);
      lbl(l3, f === "arah", garpu.ujungMaju(k) + 0.5, 0.5);
      aturLabel(lAnak[0], selesai, dt, v(xUjung + 5, 3.8, 0.3));
      aturLabel(lAnak[1], selesai, dt, v(xUjung + 5, -3.8, 0.3));
    },
  };
}
