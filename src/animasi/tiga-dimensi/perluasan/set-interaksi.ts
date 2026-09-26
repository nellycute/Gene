import * as THREE from "three";
import { MOLEKUL, SIFAT } from "@/lib/warna";
import { lihat, type Studio } from "../studio";
import { bolaHalus } from "../bentuk";
import { bentukEnzim } from "../model-mikroba";
import { alas, aturLabel, buatJamTahap, labelHidup, panah, pelan, v, type LabelHidup, type Set3D } from "../rangkai-set";
import { bangunAyam, bangunTikusWarna, type Jengger } from "../model-hewan";
import { bahan, bangunBunga, KERTAS } from "../mendel/model-mendel";
import { lantai, nomorAdegan, papanBerdiri, tahapan, teksDatar, tulis } from "../mendel/bantu";
import { bangunBulir, bangunLabu } from "./model-perluasan";

/**
 * SET PELAJARAN 3.4, 3.5, 3.7 — interaksi gen.
 *
 *  jengger   empat ayam: rose, pea, walnut, single; genotip muncul di "gen"
 *  jalur     zat awal → enzim C → zat antara → enzim P → pigmen ungu; "putus"
 *  kelompok  16 ubin AaBb × AaBb yang berkumpul menurut pola rasio
 */

/* ================================================================== *
 * JENGGER
 * ================================================================== */

export function setJengger(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const DATA: { j: Jengger; nama: string; gen: string }[] = [
    { j: "rose", nama: "rose (mawar)", gen: "R_pp" },
    { j: "pea", nama: "pea (biji)", gen: "rrP_" },
    { j: "walnut", nama: "walnut (kenari)", gen: "R_P_" },
    { j: "single", nama: "single (tunggal)", gen: "rrpp" },
  ];
  const fokus: Set3D["fokus"] = {};
  const lGen: LabelHidup[] = [];
  const ayam = DATA.map((d, k) => {
    const x = (k - 1.5) * 4.6;
    alas(studio, grup, x, 0, 1.8);
    const g = new THREE.Group();
    g.position.set(x - 0.4, 0.55, 0);
    g.rotation.y = -0.35;
    grup.add(g);
    bangunAyam(studio, g, { jengger: d.j });
    tulis(grup, d.nama, 0.5, x, -0.45, 2);
    const l = labelHidup(grup, d.gen, 0.62);
    l.sprite.position.set(x, -1.25, 2);
    lGen.push(l);
    /* tampak dekat ke kepala: kepala ayam ada di x + 1, y ± 3 */
    fokus[`j${k + 1}`] = lihat(x + 0.6, 3.8, 0.36, 6.5, 0.1, 1.28);
    return g;
  });
  fokus.utuh = lihat(0, 1.8, 0, 22, 0, 1.25);
  fokus.gen = lihat(0, 1.5, 0, 22, 0, 1.22);
  lantai(grup, 22, 6);
  return {
    grup,
    fokus,
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const t = p.detik ?? 0;
      ayam.forEach((g, i) => (g.rotation.y = -0.35 + 0.12 * Math.sin(t * 0.6 + i)));
      /* genotip tampil sejak fokus "gen" dan tetap tampil di tampak dekat sesudahnya */
      lGen.forEach((l) => aturLabel(l, f === "gen" || (f !== "utuh" && nomorAdegan(p) >= 1), dt));
    },
  };
}

/* ================================================================== *
 * JALUR — dua enzim berurutan (gen komplementer)
 * ================================================================== */

export function setJalur(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 2.2;
  const ungu = bahan(studio, "enzim", ["enzim"], MOLEKUL.enzim.warna, 0.004);
  const zat = (x: number, warna: string, kunci: string, teks: string) => {
    const m = studio.tambah(bahan(studio, kunci, [kunci], warna, 0.003), bolaHalus(0.7, 20, 14), grup);
    m.position.set(x, Y, 0);
    tulis(grup, teks, 0.6, x, Y - 1.35, 0.5);
    return m;
  };
  zat(-8, "#d9d6cf", "zatAwal", "zat awal");
  const zatAntara = zat(0, "#e7ddea", "zatAntara", "zat antara");
  const pigmen = zat(8, SIFAT.bungaUngu.warna, "bungaUngu", "pigmen ungu");
  const enzim = [-4, 4].map((x, k) => {
    const g = new THREE.Group();
    g.position.set(x, Y + 1.4, 0);
    grup.add(g);
    for (const s of [-1, 1]) {
      const h = studio.tambah(ungu, bentukEnzim(0.8), g);
      h.userData.sisi = s;
    }
    tulis(grup, k === 0 ? "enzim dari gen C" : "enzim dari gen P", 0.6, x, Y + 2.8, 0);
    return g;
  });
  panah(studio, grup, [v(-7.2, Y, 0), v(-4, Y + 0.3, 0), v(-0.8, Y, 0)], 0.07);
  panah(studio, grup, [v(0.8, Y, 0), v(4, Y + 0.3, 0), v(7.2, Y, 0)], 0.07);
  /* bunga di ujung jalur: ungu bila jalur utuh, putih bila putus */
  const bungaUngu = bangunBunga(studio, grup, "ungu", []);
  bungaUngu.position.set(10.6, Y, 0);
  bungaUngu.scale.setScalar(2.2);
  const bungaPutih = bangunBunga(studio, grup, "putih", []);
  bungaPutih.position.set(10.6, Y, 0);
  bungaPutih.scale.setScalar(2.2);
  const lPutus = labelHidup(grup, "cc: enzim pertama rusak → putih", 0.6);
  const jam = buatJamTahap();
  let putus = 0;
  lantai(grup, 24, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(1.3, Y + 0.6, 0, 20, 0, 1.3),
      putus: lihat(1.3, Y + 0.6, 0, 20, 0, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 12 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      const j = jam(p);
      putus = pelan(putus, p.fokus === "putus" ? tahapan(j, 0.2, 1.5) : 0, 6, dt);
      /* enzim pertama terbelah saat jalur putus */
      enzim[0].children.forEach((c) => {
        if (!(c instanceof THREE.Mesh)) return;
        const s = c.userData.sisi as number;
        c.position.set(s * 0.6 * putus, -s * 0.3 * putus, 0);
        c.rotation.set(0, s > 0 ? 0 : Math.PI, s * 0.6 * putus);
      });
      enzim[1].rotation.y = Math.sin(t) * 0.3;
      zatAntara.scale.setScalar(1 - 0.85 * putus);
      pigmen.scale.setScalar(1 - 0.85 * putus);
      bungaUngu.visible = putus < 0.5;
      bungaPutih.visible = putus >= 0.5;
      aturLabel(lPutus, putus > 0.5, dt, v(-4, Y - 2.1, 0.5));
    },
  };
}

/* ================================================================== *
 * KELOMPOK — 16 ubin dan pola rasio
 * ================================================================== */

type Kelas = "AB" | "Ab" | "aB" | "ab";
type Pola = { kelompok: Kelas[][]; nama: string[]; ikon?: ((studio: Studio, g: THREE.Group) => void)[] };

const ikonTikus = (w: "agouti" | "hitam" | "albino") => (studio: Studio, g: THREE.Group) => {
  g.scale.setScalar(0.45);
  bangunTikusWarna(studio, g, w);
};
const ikonLabu = (w: "putih" | "kuning" | "hijau", b: "bulat" | "cakram" | "lonjong" = "bulat") => (studio: Studio, g: THREE.Group) => {
  const l = bangunLabu(studio, g, w, b, 0.5);
  l.position.y = 0.4;
};
const ikonBunga = (w: "ungu" | "putih") => (studio: Studio, g: THREE.Group) => {
  const b = bangunBunga(studio, g, w, []);
  b.scale.setScalar(1.3);
  b.position.y = 0.5;
};
const ikonAyam = (j: Jengger) => (studio: Studio, g: THREE.Group) => {
  g.scale.setScalar(0.35);
  bangunAyam(studio, g, { jengger: j });
};
const ikonGandum = (r: number) => (studio: Studio, g: THREE.Group) => {
  g.scale.setScalar(0.35);
  bangunBulir(studio, g, r);
};

const POLA: Record<string, Pola> = {
  utuh: { kelompok: [], nama: [] },
  "9331": {
    kelompok: [["AB"], ["Ab"], ["aB"], ["ab"]],
    nama: ["9 walnut", "3 rose", "3 pea", "1 single"],
    ikon: [ikonAyam("walnut"), ikonAyam("rose"), ikonAyam("pea"), ikonAyam("single")],
  },
  "934": {
    kelompok: [["AB"], ["Ab"], ["aB", "ab"]],
    nama: ["9 agouti", "3 hitam", "4 albino"],
    ikon: [ikonTikus("agouti"), ikonTikus("hitam"), ikonTikus("albino")],
  },
  "1231": {
    kelompok: [["AB", "Ab"], ["aB"], ["ab"]],
    nama: ["12 putih", "3 kuning", "1 hijau"],
    ikon: [ikonLabu("putih"), ikonLabu("kuning"), ikonLabu("hijau")],
  },
  "97": {
    kelompok: [["AB"], ["Ab", "aB", "ab"]],
    nama: ["9 ungu", "7 putih"],
    ikon: [ikonBunga("ungu"), ikonBunga("putih")],
  },
  "961": {
    kelompok: [["AB"], ["Ab", "aB"], ["ab"]],
    nama: ["9 cakram", "6 bulat", "1 lonjong"],
    ikon: [ikonLabu("putih", "cakram"), ikonLabu("putih", "bulat"), ikonLabu("putih", "lonjong")],
  },
  "151": {
    kelompok: [["AB", "Ab", "aB"], ["ab"]],
    nama: ["15 merah", "1 putih"],
    ikon: [ikonGandum(2), ikonGandum(0)],
  },
  "133": {
    kelompok: [["AB", "Ab", "ab"], ["aB"]],
    nama: ["13 putih", "3 berwarna"],
    ikon: [ikonAyam("single"), ikonAyam("single")],
  },
};
/* pola untuk pembahasan hitungan: sama dengan 9 : 3 : 4 */
POLA.gabung = POLA["1231"];
POLA.hitung = POLA["934"];
POLA.tebak = POLA["934"];

export function setKelompok(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const S = 1.05;
  const X_PAPAN = -6.2;
  const Y = 4.2;
  papanBerdiri(studio, grup, 5 * S + 0.5, 5 * S + 0.5, X_PAPAN, Y);
  const GAMET = ["AB", "Ab", "aB", "ab"];
  tulis(grup, "AaBb × AaBb", 0.65, X_PAPAN, Y + 3.5);
  GAMET.forEach((gm, j) => {
    tulis(grup, gm, 0.5, X_PAPAN + (j - 1.5) * S + 0.5 * S, Y + 2 * S, 0.1);
    tulis(grup, gm, 0.5, X_PAPAN - 2 * S, Y + (1.5 - j) * S - 0.5 * S, 0.1);
  });
  const kertas = bahan(studio, "ubin", ["ubin"], KERTAS, 0.003);
  type Ubin = { g: THREE.Group; kelas: Kelas; asal: THREE.Vector3 };
  const ubin: Ubin[] = [];
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      const a = GAMET[i];
      const b = GAMET[j];
      const gen = [a[0], b[0]].sort().join("") + [a[1], b[1]].sort().join("");
      const kelas = `${/A/.test(gen) ? "A" : "a"}${/B/.test(gen) ? "B" : "b"}` as Kelas;
      const g = new THREE.Group();
      grup.add(g);
      studio.tambah(kertas, new THREE.BoxGeometry(S * 0.92, S * 0.92, 0.12), g);
      const tx = teksDatar(gen, S * 0.34);
      tx.position.z = 0.07;
      g.add(tx);
      const asal = v(X_PAPAN + (j - 1.5) * S + 0.5 * S, Y + (1.5 - i) * S - 0.5 * S, 0.12);
      g.position.copy(asal);
      ubin.push({ g, kelas, asal });
    }
  /* tempat kelompok: kolom-kolom di kanan papan */
  const X_KEL = 0.2;
  const LEBAR_KEL = 3.6;
  const lKel = [0, 1, 2, 3].map(() => labelHidup(grup, "", 0.62));
  const ikonGrup = new Map<string, THREE.Group[]>();
  const ikonUntuk = (kunci: string) => {
    if (!ikonGrup.has(kunci)) {
      const pola = POLA[kunci];
      const daftar = (pola.ikon ?? []).map((buat, k) => {
        const g = new THREE.Group();
        g.position.set(X_KEL + k * LEBAR_KEL + 1, 0.2, 1.2);
        grup.add(g);
        buat(studio, g);
        g.visible = false;
        return g;
      });
      ikonGrup.set(kunci, daftar);
    }
    return ikonGrup.get(kunci) ?? [];
  };
  /* batang hitungan nyata (90 : 30 : 40) */
  const batang = new THREE.Group();
  grup.add(batang);
  const BATANG = [90, 30, 40];
  const bBatang = bahan(studio, "batangHitung", ["hitungan"], "#b9ae9c", 0.004);
  const mBatang = BATANG.map((n, k) => {
    const m = studio.tambah(bBatang, new THREE.BoxGeometry(0.5, 1, 0.5), batang);
    m.position.set(X_KEL + k * LEBAR_KEL + 2.6, 0, -0.6);
    const l = tulis(batang, String(n), 0.5, X_KEL + k * LEBAR_KEL + 2.6, n * 0.05 + 0.9, -0.6);
    m.userData.label = l;
    m.userData.tinggi = n * 0.05;
    return m;
  });
  const lTebak = labelHidup(grup, "160 = 10 × 16 → 9 : 3 : 4", 0.55);
  let polaAktif = "";
  const jam = buatJamTahap();
  lantai(grup, 22, 6, -1);
  return {
    grup,
    fokus: {
      utuh: lihat(X_PAPAN + 0.3, Y, 0, 12, 0, 1.4),
      ...Object.fromEntries(Object.keys(POLA).filter((k) => k !== "utuh").map((k) => [k, lihat(-0.8, 3.3, 0, 19.5, 0, 1.35)])),
    },
    bayangan: { pusat: v(-1, 0, 0), jangkauan: 12 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const kunci = POLA[f] ? f : "utuh";
      const pola = POLA[kunci];
      const j = jam(p);
      if (kunci !== polaAktif) {
        for (const [k, d] of ikonGrup) d.forEach((g) => (g.visible = k === kunci));
        ikonUntuk(kunci).forEach((g) => (g.visible = true));
        polaAktif = kunci;
      }
      /* ubin terbang ke kolom kelompoknya, tiga ubin per baris */
      const isi = pola.kelompok.map(() => 0);
      ubin.forEach((u, i) => {
        const k = pola.kelompok.findIndex((kel) => kel.includes(u.kelas));
        let tujuan = u.asal;
        if (k >= 0) {
          const n = isi[k]++;
          tujuan = v(X_KEL + k * LEBAR_KEL + (n % 3) * S, 1.6 + Math.floor(n / 3) * S, 0.12);
        }
        const tunda = Math.min(1, tahapan(j, i * 0.05, 1.1) + (kunci === "utuh" ? 1 : 0));
        u.g.position.lerp(tujuan, Math.min(1, dt * 5 * (0.3 + tunda)));
      });
      lKel.forEach((l, k) => {
        const ada = k < pola.nama.length;
        if (ada && l.sprite.userData.teks !== pola.nama[k]) {
          /* ganti tulisan label: buat ulang teksturnya lewat sprite baru */
          const baru = labelHidup(grup, pola.nama[k], 0.62);
          l.sprite.parent?.remove(l.sprite);
          l.sprite.material.map?.dispose();
          l.sprite.material.dispose();
          l.sprite = baru.sprite;
          l.sprite.userData.teks = pola.nama[k];
          l.nilai = 0;
        }
        const tinggiKol = Math.ceil(isi[k] / 3) * S;
        aturLabel(l, ada && j > 0.8, dt, v(X_KEL + k * LEBAR_KEL + S, 1.6 + tinggiKol + 0.2, 0.3));
      });
      const hitung = f === "hitung" || f === "tebak";
      batang.visible = hitung;
      mBatang.forEach((m) => {
        const h = m.userData.tinggi as number;
        m.scale.y = pelan(m.scale.y, hitung ? h : 0.01, 4, dt);
        m.position.y = 0.55 + m.scale.y / 2;
        (m.userData.label as THREE.Sprite).position.y = 0.55 + m.scale.y + 0.4;
      });
      aturLabel(lTebak, f === "tebak", dt, v(5.6, 7.6, 0.3));
    },
  };
}
