import * as THREE from "three";
import { lihat, type Studio } from "../studio";
import { bolaHalus } from "../bentuk";
import { aturLabel, labelHidup, panah, v, type Set3D } from "../rangkai-set";
import { bangunAyam, bangunSapi, bangunTikusWarna } from "../model-hewan";
import { bahan, bangunPunnett } from "../mendel/model-mendel";
import { kali, lantai, muncul, papanBerdiri, tulis } from "../mendel/bantu";
import { jadikanHantu } from "./model-perluasan";

/**
 * SET PELAJARAN 3.3 — alel letal.
 *
 *  tikus         kuning × kuning → 2 kuning : 1 agouti; satu "hantu" AʸAʸ dicoret
 *  punnettLetal  Punnett Aʸa × Aʸa; kotak AʸAʸ dicoret, tiga sisanya disorot
 *  creeper       ayam Creeper × Creeper → 2 Creeper : 1 normal (+ telur yang mati)
 *  dexter        sapi Dexter × Dexter → anak berkaki pendek, normal, dan "bulldog"
 */

/**
 * Kerangka bersama: dua induk di atas, empat keturunan di bawah — satu di
 * antaranya hantu yang dicoret.
 */
function susunLetal(
  studio: Studio,
  o: {
    induk: (g: THREE.Group) => void;
    labelInduk: string;
    anak: { buat: (g: THREE.Group) => void; label: string; hantu?: boolean }[];
    lebarInduk: number;
    skalaAnak: number;
  },
) {
  const grup = new THREE.Group();
  const induk = [-o.lebarInduk, o.lebarInduk].map((x) => {
    const g = new THREE.Group();
    g.position.set(x, 0, -3.2);
    grup.add(g);
    o.induk(g);
    return g;
  });
  induk[1].rotation.y = Math.PI;
  kali(grup, 0, 1.6, -3, 0.9);
  tulis(grup, o.labelInduk, 0.6, 0, 4.2, -3.2);
  const anak = new THREE.Group();
  grup.add(anak);
  const hantu: THREE.Sprite[] = [];
  o.anak.forEach((a, k) => {
    const x = (k - (o.anak.length - 1) / 2) * 4.1;
    const g = new THREE.Group();
    g.position.set(x, 0, 2.4);
    g.scale.setScalar(o.skalaAnak);
    anak.add(g);
    a.buat(g);
    if (a.hantu) {
      const s = jadikanHantu(studio, g, 1.4 / o.skalaAnak);
      s.position.set(0, 1.2 / o.skalaAnak, 0.5);
      hantu.push(s);
    }
    tulis(anak, a.label, 0.55, x, -0.5, 3.6);
  });
  panah(studio, grup, [v(0, 3.5, -2.4), v(0, 3.2, 0.4), v(0, 2.7, 1.2)], 0.06);
  return { grup, anak, induk };
}

export function setTikus(studio: Studio): Set3D {
  const { grup, induk } = susunLetal(studio, {
    induk: (g) => bangunTikusWarna(studio, g, "kuning"),
    labelInduk: "kuning (Aʸa) × kuning (Aʸa)",
    lebarInduk: 4.4,
    skalaAnak: 0.8,
    anak: [
      { buat: (g) => bangunTikusWarna(studio, g, "kuning"), label: "kuning Aʸa" },
      { buat: (g) => bangunTikusWarna(studio, g, "kuning"), label: "kuning Aʸa" },
      { buat: (g) => bangunTikusWarna(studio, g, "agouti"), label: "agouti aa" },
      { buat: (g) => bangunTikusWarna(studio, g, "kuning"), label: "AʸAʸ: mati", hantu: true },
    ],
  });
  const lSelalu = labelHidup(grup, "tikus kuning selalu heterozigot", 0.46);
  lantai(grup, 18, 11);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.6, 0, 22, 0, 1.2),
      anak: lihat(0, 1, 2.4, 17, 0, 1.2),
      kuning: lihat(0, 1.3, -3.2, 12, 0, 1.2),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const t = p.detik ?? 0;
      induk.forEach((g, i) => (g.position.y = 0.04 * Math.abs(Math.sin(t * 2 + i))));
      aturLabel(lSelalu, f === "kuning", dt, v(0, 3.4, -3.2));
    },
  };
}

export function setPunnettLetal(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const S = 1.9;
  const Y = 4.2;
  papanBerdiri(studio, grup, 3 * S + 0.5, 3 * S + 0.5, 0, Y);
  const GEN = [
    ["AʸAʸ", "Aʸa"],
    ["Aʸa", "aa"],
  ];
  const papan = bangunPunnett(
    studio,
    grup,
    ["Aʸ", "a"],
    ["Aʸ", "a"],
    (i, j) => ({
      teks: GEN[i][j],
      ikon: (g) => {
        const t = new THREE.Group();
        t.scale.setScalar(0.3);
        t.position.set(-0.05, -S * 0.3, 0.2);
        g.add(t);
        bangunTikusWarna(studio, t, i === 1 && j === 1 ? "agouti" : "kuning");
      },
    }),
    S,
  );
  papan.grup.position.set(0, Y, 0.05);
  /* tanda silang besar di kotak AʸAʸ */
  const coret = new THREE.Group();
  const pusat = papan.pusat(0, 0).add(v(0, Y, 0.35));
  coret.position.copy(pusat);
  grup.add(coret);
  const tinta = bahan(studio, "coret", ["coret"], "#5c6878", false);
  for (const a of [Math.PI / 4, -Math.PI / 4]) {
    const b = new THREE.BoxGeometry(S * 1.1, 0.12, 0.05);
    b.rotateZ(a);
    studio.tambah(tinta, b, coret, false);
  }
  const lMati = labelHidup(grup, "mati sebelum lahir", 0.42);
  const lSisa = labelHidup(grup, "2 kuning : 1 agouti", 0.6);
  const sorotSisa = new THREE.Group();
  grup.add(sorotSisa);
  const cincin = bahan(studio, "cincinSisa", ["tinta"], "#1b2430", false);
  for (const [i, j] of [
    [0, 1],
    [1, 0],
    [1, 1],
  ]) {
    const r = new THREE.TorusGeometry(S * 0.47, 0.04, 6, 36);
    const q = papan.pusat(i, j);
    r.translate(q.x, q.y + Y, 0.3);
    studio.tambah(cincin, r, sorotSisa, false);
  }
  lantai(grup, 10, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y - 0.2, 0, 16, 0, 1.45),
      coret: lihat(0, Y - 0.2, 0, 16, 0, 1.45),
      sisa: lihat(0, Y - 0.2, 0, 16, 0, 1.45),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 6 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const ada = f === "coret" || f === "sisa";
      muncul(coret, ada, dt, 1, 5);
      sorotSisa.visible = f === "sisa";
      aturLabel(lMati, ada, dt, pusat.clone().add(v(0, S * 0.62, 0.2)));
      aturLabel(lSisa, f === "sisa", dt, v(0, Y - 1.5 * S - 0.9, 0.4));
    },
  };
}

export function setCreeper(studio: Studio): Set3D {
  const { grup } = susunLetal(studio, {
    induk: (g) => bangunAyam(studio, g, { jengger: "single", kakiPendek: true }),
    labelInduk: "Creeper × Creeper",
    lebarInduk: 4.4,
    skalaAnak: 0.75,
    anak: [
      { buat: (g) => bangunAyam(studio, g, { jengger: "single", kakiPendek: true }), label: "Creeper" },
      { buat: (g) => bangunAyam(studio, g, { jengger: "single", kakiPendek: true }), label: "Creeper" },
      { buat: (g) => bangunAyam(studio, g, { jengger: "single" }), label: "normal" },
      {
        buat: (g) => {
          const telur = bolaHalus(0.8, 20, 14);
          telur.scale(0.8, 1, 0.8);
          telur.translate(0, 0.8, 0);
          studio.tambah(bahan(studio, "telur", ["telur"], "#efe6d6", 0.003), telur, g);
        },
        label: "homozigot: mati di telur",
        hantu: true,
      },
    ],
  });
  lantai(grup, 18, 11);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.6, 0, 22, 0, 1.2),
      anak: lihat(0, 1, 2.4, 17, 0, 1.2),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
  };
}

export function setDexter(studio: Studio): Set3D {
  const { grup } = susunLetal(studio, {
    induk: (g) => {
      g.scale.setScalar(0.8);
      bangunSapi(studio, g, { bulu: "hitam", kakiPendek: true });
    },
    labelInduk: "Dexter berkaki pendek × Dexter berkaki pendek",
    lebarInduk: 4,
    skalaAnak: 0.42,
    anak: [
      { buat: (g) => bangunSapi(studio, g, { bulu: "hitam", kakiPendek: true }), label: "kaki pendek" },
      { buat: (g) => bangunSapi(studio, g, { bulu: "hitam", kakiPendek: true }), label: "kaki pendek" },
      { buat: (g) => bangunSapi(studio, g, { bulu: "hitam" }), label: "normal" },
      { buat: (g) => bangunSapi(studio, g, { bulu: "hitam", kakiPendek: true }), label: "“bulldog”: gugur", hantu: true },
    ],
  });
  lantai(grup, 20, 11);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.6, 0, 21, 0, 1.2),
      gugur: lihat(4, 1, 2.4, 12, 0.15, 1.2),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
  };
}
