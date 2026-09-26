import * as THREE from "three";
import { SIFAT } from "@/lib/warna";
import { lihat, type Pandangan, type Studio } from "../studio";
import { pembuatAcak, tabung } from "../bentuk";
import { aturLabel, labelHidup, pelan, v, type Set3D } from "../rangkai-set";
import type { PropsAnimasi } from "../../daftar";
import { bangunSosok } from "../model-sosok";
import { bangunSapi } from "../model-hewan";
import { bahan } from "../mendel/model-mendel";
import { garis, lantai, tulis } from "../mendel/bantu";
import { bangunBijiGandum } from "./model-perluasan";

/**
 * SET PELAJARAN 3.6 — polimeri dan sifat poligenik.
 *
 *  gradasi  (tambahan set gandum) lima tumpukan biji: 4, 3, 2, 1, 0 alel R,
 *           banyaknya 1 : 4 : 6 : 4 : 1, warnanya gandum4 … gandum0
 *  kurva    histogram 2n + 1 kelas yang makin rapat → kurva lonceng
 *  tinggi   "histogram hidup": orang berbaris menurut tinggi badannya
 */

const KOEF = [1, 4, 6, 4, 1];

/** Isi tambahan untuk set gandum: gradasi warna biji di sebelah kanan F2. */
export function gradasiGandum(studio: Studio, grup: THREE.Group, xMulai: number): { fokus: Record<string, Pandangan>; perbarui: (p: PropsAnimasi, dt: number) => void } {
  const g = new THREE.Group();
  g.position.x = xMulai + 1;
  grup.add(g);
  const acak = pembuatAcak(1909);
  KOEF.forEach((n, k) => {
    const r = 4 - k;
    const x = k * 1.9;
    /* tiap biji mewakili satu dari enam belas bagian */
    for (let i = 0; i < n; i++) {
      const b = bangunBijiGandum(studio, g, r, 0.32);
      b.position.set(x + (acak() - 0.5) * 0.25, 0.35 + i * 0.5, (acak() - 0.5) * 0.2);
      b.rotation.set(Math.PI / 2 + (acak() - 0.5) * 0.4, acak() * 3, 0);
    }
    tulis(g, String(n), 0.6, x, 0.35 + n * 0.5 + 0.5);
    tulis(g, `${r} R`, 0.45, x, -0.4, 0.6);
  });
  tulis(g, "jumlah alel merah (R)", 0.42, 3.8, -1.15, 0.6);
  g.visible = false;
  return {
    fokus: { gradasi: lihat(xMulai + 5.2, 2, 0, 12.5, 0, 1.3) },
    perbarui: (p) => {
      g.visible = p.fokus === "gradasi" || p.fokus === "utuh";
    },
  };
}

/* ================================================================== *
 * KURVA — makin banyak gen, makin mulus
 * ================================================================== */

const binomial = (n: number) => {
  const baris = [1];
  for (let k = 1; k <= n; k++) baris.push((baris[k - 1] * (n - k + 1)) / k);
  return baris;
};

export function setKurva(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const LEBAR = 13;
  const TINGGI = 5.2;
  const MAKS = 21;
  /* warna batang: gradasi gandum untuk tiga contoh pertama (satu sifat, makin
     banyak alel R makin merah); pada "banyak gen" dan ternak tetap sama */
  const batang = Array.from({ length: MAKS }, () => {
    const m = studio.tambah(bahan(studio, "gandum2", ["gandum2"], SIFAT.gandum2.warna, 0.004), new THREE.BoxGeometry(1, 1, 0.8), grup);
    m.scale.set(0.001, 0.001, 1);
    return m;
  });
  garis(studio, grup, v(-LEBAR / 2 - 0.3, 0.3, 0.5), v(LEBAR / 2 + 0.3, 0.3, 0.5), 0.035);
  const lSumbu = labelHidup(grup, "sedikit ← nilai sifat → banyak", 0.58);
  const lTernak = labelHidup(grup, "produksi susu per hari", 0.62);
  /* kurva lonceng halus di atas batang */
  const titik: THREE.Vector3[] = [];
  for (let i = 0; i <= 60; i++) {
    const x = -LEBAR / 2 + (i / 60) * LEBAR;
    /* sebaran binomial 20 alel: simpangan baku √5 kelas × lebar kelas */
    const z = x / (Math.sqrt(5) * (LEBAR / 21));
    titik.push(v(x, 0.3 + TINGGI * Math.exp(-(z * z) / 2), 0.5));
  }
  const lonceng = studio.tambah(bahan(studio, "garisLonceng", ["tinta"], "#1b2430", false), tabung(titik, 0.06, 120, 6), grup, false);
  lonceng.visible = false;
  const sapi = new THREE.Group();
  sapi.position.set(LEBAR / 2 + 2.6, 0, 0);
  sapi.rotation.y = -0.9;
  sapi.scale.setScalar(0.55);
  grup.add(sapi);
  bangunSapi(studio, sapi, { bulu: "hitam" });
  sapi.visible = false;
  const N: Record<string, number> = { n1: 1, n2: 2, n3: 3, banyak: 10, ternak: 10, utuh: 2 };
  lantai(grup, 18, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.8, 0, 17, 0, 1.4),
      n1: lihat(0, 2.8, 0, 17, 0, 1.4),
      n2: lihat(0, 2.8, 0, 17, 0, 1.4),
      n3: lihat(0, 2.8, 0, 17, 0, 1.4),
      banyak: lihat(0, 2.8, 0, 17, 0, 1.4),
      ternak: lihat(1.5, 2.8, 0, 19, 0, 1.4),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const n = N[f] ?? 2;
      const kelas = 2 * n + 1;
      const koef = binomial(2 * n);
      const maks = Math.max(...koef);
      const lebarBatang = LEBAR / kelas;
      batang.forEach((m, i) => {
        const ada = i < kelas;
        const h = ada ? (koef[i] / maks) * TINGGI : 0.001;
        const w = ada ? lebarBatang * 0.86 : 0.001;
        m.scale.x = pelan(m.scale.x, w, 6, dt);
        m.scale.y = pelan(m.scale.y, h, 6, dt);
        const xs = -LEBAR / 2 + (i + 0.5) * lebarBatang;
        m.position.x = pelan(m.position.x, ada ? xs : 0, 6, dt);
        m.position.y = 0.3 + m.scale.y / 2;
      });
      lonceng.visible = n >= 10;
      sapi.visible = f === "ternak";
      aturLabel(lSumbu, f !== "ternak", dt, v(0, -0.45, 0.6));
      aturLabel(lTernak, f === "ternak", dt, v(0, -0.45, 0.6));
    },
  };
}

/* ================================================================== *
 * TINGGI — histogram hidup
 * ================================================================== */

export function setTinggi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(1914);
  const KOLOM = [1, 2, 4, 5, 4, 2, 1];
  const RAMBUT = ["#3b302b", "#5a4538", "#2a2522", "#6b5040"];
  const BAJU = ["#c4b8a6", "#cbbfae", "#d9d2c5", "#b7ab98", "#e4dfd5"];
  KOLOM.forEach((n, k) => {
    const x = (k - 3) * 1.55;
    const tinggi = 0.62 + k * 0.07;
    for (let i = 0; i < n; i++) {
      bangunSosok(
        studio,
        grup,
        {
          entitas: "orang",
          label: "",
          x,
          tinggi,
          rambut: RAMBUT[Math.floor(acak() * RAMBUT.length)],
          keriting: acak() > 0.5,
          panjang: acak() > 0.6,
          baju: BAJU[Math.floor(acak() * BAJU.length)],
        },
        acak,
      ).position.z = -i * 1.3;
    }
    tulis(grup, `${150 + k * 6}`, 0.42, x, -0.5, 1.2);
  });
  tulis(grup, "tinggi badan (cm)", 0.45, 0, -1.25, 1.2);
  /* garis kurva di belakang barisan */
  const titik: THREE.Vector3[] = [];
  for (let i = 0; i <= 50; i++) {
    const x = -5.8 + (i / 50) * 11.6;
    const z = x / 2.3;
    titik.push(v(x, 4.9 + 2.4 * Math.exp(-(z * z) / 2), -2.6));
  }
  const kurva = studio.tambah(bahan(studio, "garisLonceng", ["tinta"], "#1b2430", false), tabung(titik, 0.06, 100, 6), grup, false);
  kurva.visible = false;
  lantai(grup, 14, 9);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.2, -2, 18, 0, 1.25),
      kurva: lihat(0, 3.4, -2, 17, 0, 0.95),
    },
    bayangan: { pusat: v(0, 0, -2), jangkauan: 9 },
    perbarui: (p) => {
      kurva.visible = p.fokus === "kurva";
    },
  };
}
