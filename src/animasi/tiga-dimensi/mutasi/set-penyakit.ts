import * as THREE from "three";
import { MOLEKUL } from "@/lib/warna";
import { warnaAsal } from "../model-kromosom";
import { lihat, type Studio } from "../studio";
import { bolaHalus, pembuatAcak } from "../bentuk";
import { bangunDNA } from "../model-dna";
import { bangunSapi } from "../model-hewan";
import { bangunSosok } from "../model-sosok";
import { bangunTabung } from "../model-mikroba";
import { aturLabel, labelHidup, v, type Set3D } from "../rangkai-set";
import { bahan, bangunPunnett } from "../mendel/model-mendel";
import { kali, lantai, papanBerdiri, tulis } from "../mendel/bantu";
import { bangunSilsilah } from "../kelamin/model-kelamin";
import { bangunSelDarah } from "../perluasan/model-perluasan";
import { bangunBabi } from "./model-mutasi";

/**
 * SET PELAJARAN 5.6 — penyakit genetik.
 *
 *  penyakit        tiga papan: satu gen (silsilah), kromosom, banyak gen + lingkungan
 *  talasemia       dua orang tua pembawa, Punnett Tt × Tt, tabung darah dan DNA
 *  ternakPenyakit  sapi Holstein (BLAD), babi (RYR1), uji DNA pejantan;
 *                  "bukan genetik": prion dan virus
 */

export function setPenyakit(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.2;
  const papan = (x: number, judul: string) => {
    papanBerdiri(studio, grup, 6, 5.4, x, Y);
    tulis(grup, judul, 0.55, x, Y + 2, 0.2);
  };
  papan(-7, "satu gen");
  papan(0, "kromosom");
  papan(7, "banyak gen + lingkungan");
  /* satu gen: silsilah kecil autosom resesif */
  const s = bangunSilsilah(
    studio,
    grup,
    {
      orang: [
        { id: "a", jk: "L", status: "pembawa", x: -1, gen: 0 },
        { id: "b", jk: "P", status: "pembawa", x: 1, gen: 0 },
        { id: "c", jk: "L", status: "normal", x: -1.6, gen: 1 },
        { id: "d", jk: "P", status: "sakit", x: 0, gen: 1 },
        { id: "e", jk: "L", status: "pembawa", x: 1.6, gen: 1 },
      ],
      kawin: [["a", "b"]],
      anak: [{ ortu: ["a", "b"], anak: ["c", "d", "e"] }],
    },
    { jarakBaris: 2, ukuran: 0.7 },
  );
  s.grup.position.set(-7, Y + 0.7, 0.1);
  /* kromosom: tiga salinan kromosom kecil */
  for (let i = 0; i < 3; i++) {
    const g = new THREE.Group();
    g.position.set(-0.6 + i * 0.6, Y - 0.2, 0.2);
    grup.add(g);
    const asal = i === 1 ? "kromosomAyah" : "kromatin";
    studio.tambah(bahan(studio, `kromKecil-${asal}`, [asal], warnaAsal(asal), 0.004), new THREE.CapsuleGeometry(0.2, 1.6, 6, 12), g);
  }
  tulis(grup, "trisomi, delesi, …", 0.45, 0, Y - 1.8, 0.2);
  /* banyak gen + lingkungan: DNA kecil + matahari/makanan sebagai lingkungan */
  const dna = new THREE.Group();
  dna.position.set(6, Y, 0.3);
  dna.scale.setScalar(0.35);
  grup.add(dna);
  bangunDNA(studio, dna, "ATGCGTACGGTA");
  tulis(grup, "+", 0.9, 7.2, Y, 0.3);
  tulis(grup, "gizi, gaya hidup", 0.45, 8.4, Y - 0.2, 0.3);
  tulis(grup, "bahan belajar, bukan nasihat medis", 0.5, 0, Y - 3.4, 0.6);
  lantai(grup, 24, 5);
  return {
    grup,
    fokus: { utuh: lihat(0, Y - 0.3, 0, 19, 0, 1.45) },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 12 },
  };
}

export function setTalasemia(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(5);
  bangunSosok(studio, grup, { entitas: "ayah", label: "ayah pembawa (Tt)", x: -9, tinggi: 1, rambut: "#3b302b", keriting: false, baju: "#c4b8a6", ukuranLabel: 0.5 }, acak);
  bangunSosok(studio, grup, { entitas: "ibu", label: "ibu pembawa (Tt)", x: -5.8, tinggi: 0.95, rambut: "#3b302b", keriting: false, panjang: true, baju: "#cbbfae", ukuranLabel: 0.5 }, acak);
  kali(grup, -7.4, 2.3, 0.6, 0.7);
  const S = 1.8;
  papanBerdiri(studio, grup, 3 * S + 0.5, 3 * S + 0.5, 1, 3.9);
  const ISI = [
    ["TT normal", "Tt pembawa"],
    ["Tt pembawa", "tt mayor"],
  ];
  const papan = bangunPunnett(studio, grup, ["T", "t"], ["T", "t"], (i, j) => ({ teks: ISI[i][j] }), S);
  papan.grup.position.set(1, 3.9, 0.05);
  const cincin = new THREE.TorusGeometry(S * 0.47, 0.06, 8, 30);
  const q = papan.pusat(1, 1);
  cincin.translate(q.x + 1, q.y + 3.9, 0.35);
  const sorot = studio.tambah(bahan(studio, "cincinMayor", ["tinta"], "#1b2430", false), cincin, grup, false);
  const lSeper = labelHidup(grup, "peluang ¼ setiap kelahiran", 0.5);
  /* uji: tabung darah + sel darah + DNA */
  const uji = new THREE.Group();
  uji.position.set(8.5, 0, 0);
  grup.add(uji);
  bangunTabung(studio, uji, { tinggi: 3, jari: 0.45, isi: 0.7, entitas: ["tabungDarah"] });
  const sel = bangunSelDarah(studio, uji, [], 0.7);
  sel.position.set(1.6, 1.4, 0.3);
  sel.rotation.x = 1;
  const dna = new THREE.Group();
  dna.position.set(1.6, 3.2, 0.3);
  dna.scale.setScalar(0.3);
  uji.add(dna);
  bangunDNA(studio, dna, "ATGGTGCACC");
  tulis(uji, "uji darah dan DNA", 0.5, 0.8, -0.5, 0.8);
  uji.visible = false;
  lantai(grup, 24, 6, -1);
  return {
    grup,
    fokus: {
      utuh: lihat(-3, 2.8, 0, 18, 0, 1.35),
      anak: lihat(0, 3.2, 0, 15, 0, 1.4),
      uji: lihat(4, 2.8, 0, 17, 0, 1.35),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 12 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      sorot.visible = f === "anak";
      uji.visible = f === "uji";
      aturLabel(lSeper, f === "anak", dt, v(1, 3.9 - 1.5 * S - 0.7, 0.4));
    },
  };
}

export function setTernakPenyakit(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const sapi = [-7, -2].map((x, i) => {
    const s = bangunSapi(studio, grup, { bulu: "putih", belang: "hitam" });
    s.position.set(x, 0, i * 1.2 - 0.6);
    s.scale.setScalar(0.8);
    return s;
  });
  const labelHewan = new THREE.Group();
  grup.add(labelHewan);
  tulis(labelHewan, "sapi Holstein: BLAD", 0.7, -4.5, 3.9);
  const babi = new THREE.Group();
  babi.position.set(4, 0, 0);
  grup.add(babi);
  bangunBabi(studio, babi);
  tulis(labelHewan, "babi: hipertermia malignan", 0.7, 5, 3.4);
  /* uji DNA pejantan */
  const uji = new THREE.Group();
  grup.add(uji);
  const tb = new THREE.Group();
  tb.position.set(0.8, 0, 2.6);
  uji.add(tb);
  bangunTabung(studio, tb, { tinggi: 2.4, jari: 0.35, isi: 0.5, entitas: ["tabungDNA"] });
  tulis(uji, "uji DNA: pejantan pembawa tidak dipakai", 0.5, 0.8, -0.5, 3.4);
  uji.visible = false;
  /* bukan genetik: prion (protein salah lipat) dan virus */
  const bukan = new THREE.Group();
  bukan.position.set(0, 0, 3);
  grup.add(bukan);
  const prot = bahan(studio, "prion", ["protein"], MOLEKUL.protein.warna, 0.003);
  const acak = pembuatAcak(4);
  for (let i = 0; i < 6; i++) {
    const b = bolaHalus(0.28, 10, 8);
    b.translate(-5 + (acak() - 0.5) * 1.2, 2 + (acak() - 0.5) * 1.2, (acak() - 0.5) * 0.6);
    studio.tambah(prot, b, bukan);
  }
  tulis(bukan, "BSE: prion (protein salah lipat)", 0.5, -5, 0.4, 0.4);
  const virus = new THREE.Group();
  virus.position.set(5, 2, 0);
  bukan.add(virus);
  studio.tambah(bahan(studio, "virus", ["virus"], "#c7b8a8", 0.004), bolaHalus(0.6, 18, 12), virus);
  for (let i = 0; i < 14; i++) {
    const a = i * 2.4;
    const t = new THREE.CylinderGeometry(0.05, 0.05, 0.35, 6);
    const n = v(Math.cos(a) * Math.sin(i), Math.cos(i * 1.3), Math.sin(a) * Math.sin(i)).normalize();
    t.translate(0, 0.75, 0);
    t.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(v(0, 1, 0), n));
    studio.tambah(bahan(studio, "paku", ["virus"], "#9c8f80", false), t, virus, false);
  }
  tulis(bukan, "PRRS: virus", 0.5, 5, 0.4, 0.4);
  tulis(bukan, "menular — bukan diwariskan", 0.6, 0, 4.6, 0.4);
  bukan.visible = false;
  lantai(grup, 22, 8);
  return {
    grup,
    fokus: {
      utuh: lihat(-1, 2, 0, 17.5, 0, 1.3),
      babi: lihat(4.5, 1.8, 0, 11, 0.1, 1.3),
      uji: lihat(-1, 2, 1, 18, 0, 1.3),
      bukan: lihat(0, 2.5, 3, 16, 0, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
    perbarui: (p) => {
      const f = p.fokus ?? "utuh";
      const t = p.detik ?? 0;
      uji.visible = f === "uji";
      bukan.visible = f === "bukan";
      sapi.forEach((s) => (s.visible = f !== "bukan"));
      babi.visible = f !== "bukan";
      labelHewan.visible = f !== "bukan";
      virus.rotation.y = t * 0.5;
    },
  };
}
