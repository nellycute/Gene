import * as THREE from "three";
import { lihat, type Studio } from "../studio";
import { pembuatAcak } from "../bentuk";
import { alas, aturLabel, buatJamTahap, labelHidup, pelan, v, type Set3D } from "../rangkai-set";
import { bangunSosok } from "../model-sosok";
import { bangunKelinci, type PolaKelinci } from "../model-hewan";
import { bangunPunnett } from "../mendel/model-mendel";
import { bangunHomolog, garis, kali, lantai, papanBerdiri, tahapan, tulis } from "../mendel/bantu";
import { bangunAntibodi, bangunSelDarah, type Antigen } from "./model-perluasan";

/**
 * SET PELAJARAN 3.2 — alel ganda, golongan darah ABO, kelinci.
 *
 *  abo          tiga alel (Iᴬ, Iᴮ, i) di kromosom; satu orang membawa dua;
 *               empat sel darah merah A, B, AB, O
 *  tabelABO     enam genotip → empat golongan, dengan sel kecil di tiap baris
 *  keluargaABO  ayah A (Iᴬi) × ibu B (Iᴮi) → Punnett → anak A, B, AB, O
 *  transfusi    sel A + anti-B: tetap terpisah; sel B + anti-B: menggumpal
 *  kelinci      empat alel: agouti, chinchilla, himalaya, albino
 */

const GOLONGAN: { nama: string; antigen: Antigen[] }[] = [
  { nama: "A", antigen: ["A"] },
  { nama: "B", antigen: ["B"] },
  { nama: "AB", antigen: ["A", "B"] },
  { nama: "O", antigen: [] },
];

export function setABO(studio: Studio): Set3D {
  const grup = new THREE.Group();
  /* tiga alel sebagai tiga potong kromosom berhuruf */
  const alel = new THREE.Group();
  alel.position.set(-8, 3.4, 0);
  grup.add(alel);
  (["Iᴬ", "Iᴮ", "i"] as const).forEach((a, k) => {
    const h = bangunHomolog(studio, alel, a, k === 1 ? "kromosomAyah" : "kromatin", { sisi: 1, ukuranHuruf: 0.6, p: 0.7, q: 1.2 });
    h.grup.position.x = (k - 1) * 1.9;
  });
  tulis(grup, "tiga alel di populasi", 0.5, -8, 5.9);
  /* satu orang membawa dua */
  const orang = new THREE.Group();
  grup.add(orang);
  bangunSosok(studio, orang, { entitas: "orang", label: "satu orang: Iᴬ i", x: -8, tinggi: 0.55, rambut: "#3b302b", keriting: false, baju: "#cbbfae", ukuranLabel: 0.5 }, pembuatAcak(2));
  const pasangan = new THREE.Group();
  pasangan.position.set(-8, 3.4, 0);
  orang.add(pasangan);
  const h1 = bangunHomolog(studio, pasangan, "Iᴬ", "kromatin", { sisi: -1, ukuranHuruf: 0.6, p: 0.7, q: 1.2 });
  h1.grup.position.x = -0.5;
  const h2 = bangunHomolog(studio, pasangan, "i", "kromosomAyah", { sisi: 1, ukuranHuruf: 0.6, p: 0.7, q: 1.2 });
  h2.grup.position.x = 0.5;
  orang.visible = false;
  /* empat golongan */
  const sel = GOLONGAN.map((gol, k) => {
    const g = new THREE.Group();
    g.position.set(1.2 + k * 3.3, 2.8, 0);
    grup.add(g);
    const s = bangunSelDarah(studio, g, gol.antigen, 1.35);
    s.rotation.x = 0.8;
    tulis(grup, `golongan ${gol.nama}`, 0.5, 1.2 + k * 3.3, 0.6, 1);
    return g;
  });
  tulis(grup, "antigen A: bulat · antigen B: kotak", 0.42, 6.15, 5.2);
  lantai(grup, 26, 6, -1);
  return {
    grup,
    fokus: {
      utuh: lihat(-1.3, 2.9, 0, 26, 0, 1.3),
      alel: lihat(-8, 3.2, 0, 11, 0, 1.3),
      orang: lihat(-8, 2.1, 0, 12.5, 0, 1.3),
      sel: lihat(6.15, 2.6, 0, 16, 0, 1.25),
    },
    bayangan: { pusat: v(-1, 0, 0), jangkauan: 13 },
    perbarui: (p) => {
      const f = p.fokus ?? "utuh";
      const t = p.detik ?? 0;
      alel.visible = f !== "orang";
      orang.visible = f === "orang";
      sel.forEach((g, i) => (g.rotation.y = t * 0.3 + i));
    },
  };
}

export function setTabelABO(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.4;
  papanBerdiri(studio, grup, 11, 8, 0, Y);
  const BARIS: [string, string, Antigen[]][] = [
    ["IᴬIᴬ", "A", ["A"]],
    ["Iᴬi", "A", ["A"]],
    ["IᴮIᴮ", "B", ["B"]],
    ["Iᴮi", "B", ["B"]],
    ["IᴬIᴮ", "AB", ["A", "B"]],
    ["ii", "O", []],
  ];
  tulis(grup, "genotip", 0.45, -3, Y + 3.3, 0.1);
  tulis(grup, "golongan", 0.45, 1.3, Y + 3.3, 0.1);
  garis(studio, grup, v(-5.2, Y + 2.85, 0.05), v(5.2, Y + 2.85, 0.05), 0.025);
  const yBaris = (i: number) => Y + 2.25 - i * 1.02;
  BARIS.forEach(([g, gol, ag], i) => {
    tulis(grup, g, 0.55, -3, yBaris(i), 0.1);
    tulis(grup, gol, 0.6, 1.3, yBaris(i), 0.1);
    const s = bangunSelDarah(studio, grup, ag, 0.4);
    s.position.set(3.6, yBaris(i), 0.3);
    s.rotation.x = 1.2;
    if (i === 1 || i === 3 || i === 4) garis(studio, grup, v(-5.2, yBaris(i) - 0.52, 0.05), v(5.2, yBaris(i) - 0.52, 0.05), 0.012, "#9aa3ad", "garisTipis");
  });
  const bingkai = new THREE.Group();
  grup.add(bingkai);
  for (const y of [yBaris(3) - 0.52, yBaris(5) - 0.52])
    garis(studio, bingkai, v(-5.3, y, 0.1), v(5.3, y, 0.1), 0.05);
  for (const x of [-5.3, 5.3]) garis(studio, bingkai, v(x, yBaris(3) - 0.52, 0.1), v(x, yBaris(5) - 0.52, 0.1), 0.05);
  const l64 = labelHidup(grup, "6 genotip → 4 golongan", 0.5);
  lantai(grup, 12, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y + 0.3, 0, 15.5, 0, 1.45),
      ab: lihat(0, Y - 0.8, 0, 12, 0, 1.45),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 7 },
    perbarui: (p, dt) => {
      bingkai.visible = p.fokus === "ab";
      aturLabel(l64, true, dt, v(0, Y + 4.6, 0.2));
    },
  };
}

export function setKeluargaABO(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(8);
  bangunSosok(studio, grup, { entitas: "ayah", label: "Ayah · A (Iᴬi)", x: -9, tinggi: 1.05, rambut: "#3b302b", keriting: false, baju: "#c4b8a6", ukuranLabel: 0.75 }, acak);
  bangunSosok(studio, grup, { entitas: "ibu", label: "Ibu · B (Iᴮi)", x: -5.6, tinggi: 1, rambut: "#3b302b", keriting: true, panjang: true, baju: "#cbbfae", ukuranLabel: 0.75 }, acak);
  kali(grup, -7.3, 2.4, 0.6, 0.7);
  /* Punnett 2 × 2 */
  const S = 1.7;
  papanBerdiri(studio, grup, 3 * S + 0.5, 3 * S + 0.5, 1, 3.8);
  const GEN = [
    ["IᴬIᴮ", "Iᴬi"],
    ["Iᴮi", "ii"],
  ];
  const GOL = [
    ["AB", "A"],
    ["B", "O"],
  ];
  const AG: Antigen[][][] = [
    [["A", "B"], ["A"]],
    [["B"], []],
  ];
  const papan = bangunPunnett(
    studio,
    grup,
    ["Iᴬ", "i"],
    ["Iᴮ", "i"],
    (i, j) => ({
      teks: `${GEN[i][j]} · ${GOL[i][j]}`,
      ikon: (g) => {
        const s = bangunSelDarah(studio, g, AG[i][j], 0.36);
        s.position.set(0, -S * 0.2, 0.25);
        s.rotation.x = 1.1;
      },
    }),
    S,
  );
  papan.grup.position.set(1, 3.8, 0.05);
  tulis(grup, "dari ayah", 0.5, 1.85, 3.8 + 1.5 * S + 0.55, 0.2);
  tulis(grup, "dari ibu", 0.5, 1 - 1.5 * S - 0.9, 3.8 - 0.6, 0.2);
  /* empat anak — muncul pada fokus "anak" */
  const anak = new THREE.Group();
  grup.add(anak);
  const URUT = ["A", "B", "AB", "O"];
  URUT.forEach((g, k) => bangunSosok(studio, anak, { entitas: `anak${k}`, label: `${g} · ¼`, x: 6.4 + k * 1.9, tinggi: 0.62, rambut: "#3b302b", keriting: k % 2 === 0, baju: "#e4dfd5", ukuranLabel: 0.62 }, acak));
  anak.visible = false;
  lantai(grup, 26, 6, -0.5);
  return {
    grup,
    fokus: {
      utuh: lihat(-3, 2.8, 0, 20, 0, 1.33),
      anak: lihat(0.8, 2.8, 0, 24, 0, 1.33),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 13 },
    perbarui: (p) => {
      anak.visible = p.fokus === "anak";
    },
  };
}

export function setTransfusi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(12);
  const cawan = (x: number) => {
    const c = new THREE.CylinderGeometry(3, 3.1, 0.3, 48);
    c.translate(x, 0.15, 0);
    studio.tambah(studio.bagian("cawan", "#dfe7ee", { garis: 0.004, tembus: 0.55 }), c, grup);
  };
  cawan(-4.5);
  cawan(4.5);
  type Isi = { sel: THREE.Group[]; asal: THREE.Vector3[]; gumpal: THREE.Vector3[]; ab: THREE.Group[] };
  const isi = (x: number, golongan: Antigen): Isi => {
    const sel: THREE.Group[] = [];
    const asal: THREE.Vector3[] = [];
    const gumpal: THREE.Vector3[] = [];
    for (let i = 0; i < 7; i++) {
      const s = bangunSelDarah(studio, grup, [golongan], 0.6);
      const a = (i / 7) * Math.PI * 2 + acak();
      const p = v(x + Math.cos(a) * 1.9, 0.75, Math.sin(a) * 1.9);
      s.position.copy(p);
      s.rotation.set(0.9 + acak(), acak() * 3, 0);
      sel.push(s);
      asal.push(p);
      gumpal.push(v(x + (acak() - 0.5) * 1.3, 0.75 + (i % 3) * 0.45, (acak() - 0.5) * 1.3));
    }
    const ab: THREE.Group[] = [];
    for (let i = 0; i < 9; i++) {
      const y = bangunAntibodi(studio, grup, 0.45);
      y.position.set(x + (acak() - 0.5) * 3.6, 1.6 + acak() * 1.2, (acak() - 0.5) * 3.6);
      y.rotation.set(acak() * 3, acak() * 3, acak() * 3);
      ab.push(y);
    }
    return { sel, asal, gumpal, ab };
  };
  const kiri = isi(-4.5, "A");
  const kanan = isi(4.5, "B");
  tulis(grup, "sel golongan A + anti-B", 0.45, -4.5, -0.6, 3.3);
  tulis(grup, "sel golongan B + anti-B", 0.45, 4.5, -0.6, 3.3);
  const lAman = labelHidup(grup, "tetap terpisah", 0.5);
  const lGumpal = labelHidup(grup, "menggumpal", 0.5);
  const jam = buatJamTahap();
  let g = 0;
  lantai(grup, 18, 8);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.3, 0, 17, 0, 1.05),
      gumpal: lihat(2.5, 1.3, 0, 14, 0.15, 1.05),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      const j = jam(p);
      g = pelan(g, p.fokus === "gumpal" ? tahapan(j, 0.3, 2.5) : 0, 6, dt);
      kanan.sel.forEach((s, i) => s.position.lerpVectors(kanan.asal[i], kanan.gumpal[i], g));
      /* antibodi melayang pelan; di cawan kanan mereka turun ke gumpalan */
      [kiri, kanan].forEach((d, k) =>
        d.ab.forEach((a, i) => {
          a.rotation.y += dt * 0.4;
          a.position.y = (k === 1 ? 1.6 - g * 0.6 : 1.6) + 0.15 * Math.sin(t + i);
        }),
      );
      aturLabel(lAman, p.fokus === "gumpal", dt, v(-4.5, 3.4, 0));
      aturLabel(lGumpal, p.fokus === "gumpal" && g > 0.6, dt, v(4.5, 3.4, 0));
    },
  };
}

export function setKelinci(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const DATA: { pola: PolaKelinci; label: string; sub: string }[] = [
    { pola: "agouti", label: "agouti (liar)", sub: "C_" },
    { pola: "chinchilla", label: "chinchilla", sub: "cᶜʰ_" },
    { pola: "himalaya", label: "himalaya", sub: "cʰ_" },
    { pola: "albino", label: "albino", sub: "cc" },
  ];
  const fokus: Set3D["fokus"] = {};
  const hewan = DATA.map((d, k) => {
    const x = (k - 1.5) * 4.4;
    alas(studio, grup, x, 0, 1.8);
    const g = new THREE.Group();
    g.position.set(x - 0.2, 0.55, 0);
    g.rotation.y = -0.5;
    grup.add(g);
    bangunKelinci(studio, g, d.pola);
    tulis(grup, d.label, 0.48, x, -0.45, 2);
    tulis(grup, d.sub, 0.5, x, -1.2, 2);
    fokus[`c${k + 1}`] = lihat(x, 1.4, 0, 11, 0, 1.25);
    return g;
  });
  tulis(grup, "C  >  cᶜʰ  >  cʰ  >  c", 0.7, 0, 4.9);
  fokus.utuh = lihat(0, 1.5, 0, 22, 0, 1.25);
  lantai(grup, 20, 6);
  return {
    grup,
    fokus,
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      hewan.forEach((g, i) => {
        g.rotation.y = -0.5 + 0.2 * Math.sin(t * 0.5 + i);
      });
    },
  };
}
