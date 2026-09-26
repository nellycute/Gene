import * as THREE from "three";
import { MOLEKUL, SEL } from "@/lib/warna";
import { lihat, type Studio } from "../studio";
import { bolaHalus, pembuatAcak } from "../bentuk";
import { buatLabel } from "../label3d";
import { bentukEnzim } from "../model-mikroba";
import { bangunDNA } from "../model-dna";
import { bangunSapi, bangunAyam } from "../model-hewan";
import { bangunSosok } from "../model-sosok";
import { bangunKromosom } from "../model-kromosom";
import { aturLabel, buatJamTahap, labelHidup, panah, pelan, v, type Set3D } from "../rangkai-set";
import { bahan } from "../mendel/model-mendel";
import { lantai, papanBerdiri, tahapan, tulis } from "../mendel/bantu";
import { bangunAsap, bangunMatahari, bangunPitaKodon, bangunTangga, gantiBasa } from "./model-mutasi";

/**
 * SET PELAJARAN 5.1–5.2 — mutasi gen dan perbaikan DNA.
 *
 *  kodon      pita mRNA + asam amino: normal, diam, salah makna, tanpa makna,
 *             pergeseran kerangka baca, dan kalimat tiga-huruf
 *  penyebab   heliks DNA dengan salah salin; matahari (UV), sinar-X, asap;
 *             sapi tak bertanduk dan ayam (manfaat mutasi)
 *  rusak      heliks DNA dengan tanda kerusakan yang terus muncul lalu hilang
 *  perbaikan  tangga DNA; polimerase menyunting; perbaikan salah pasang
 *  uv         dimer timin → eksisi → diisi kembali
 *  patah      kromosom patah; homolog menjadi contekan; bila gagal, potongan lepas
 *  gagal      xeroderma pigmentosum (orang + matahari); gumpalan sel kanker
 */

const NORMAL = "AUGGAAUACGAGCUGAAA";

/* ================================================================== *
 * KODON
 * ================================================================== */

export function setKodon(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 3.4;
  const VERSI: Record<string, { urutan: string; ubah: number[]; judul: string }> = {
    utuh: { urutan: NORMAL, ubah: [], judul: "normal" },
    diam: { urutan: "AUGGAGUACGAGCUGAAA", ubah: [5], judul: "diam: GAA → GAG" },
    salah: { urutan: "AUGGAAUACGUGCUGAAA", ubah: [10], judul: "salah makna: GAG → GUG" },
    henti: { urutan: "AUGGAAUAGGAGCUGAAA", ubah: [8], judul: "tanpa makna: UAC → UAG" },
    geser: { urutan: "AUGGAUACGAGCUGAAA", ubah: [], judul: "delesi satu A: kerangka bergeser" },
  };
  const normal = bangunPitaKodon(studio, grup, NORMAL);
  normal.position.set(0, Y + 3.6, 0);
  normal.scale.setScalar(0.8);
  tulis(grup, "normal", 0.5, -7.6, Y + 3.6);
  const versi: Record<string, THREE.Group> = {};
  for (const [k, d] of Object.entries(VERSI)) {
    if (k === "utuh") continue;
    const g = new THREE.Group();
    grup.add(g);
    const p = bangunPitaKodon(studio, g, d.urutan, { ubah: d.ubah });
    p.position.set(0, Y - 1.2, 0);
    tulis(g, d.judul, 0.55, 0, Y + 1.2);
    g.visible = false;
    versi[k] = g;
  }
  /* kalimat tiga-huruf */
  const kalimat = new THREE.Group();
  grup.add(kalimat);
  papanBerdiri(studio, kalimat, 12, 3.2, 0, Y - 0.6, -0.5);
  tulis(kalimat, "IBU DAN AYU MAU TEH", 0.75, 0, Y + 0.2, 0);
  tulis(kalimat, "IBD ANA YUM AUT EH", 0.75, 0, Y - 1.2, 0);
  tulis(kalimat, "(huruf U pertama hilang)", 0.42, 0, Y - 2.4, 0);
  kalimat.visible = false;
  lantai(grup, 14, 4);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y + 3.2, 0, 13, 0, 1.45),
      diam: lihat(0, Y + 0.7, 0, 17, 0, 1.45),
      salah: lihat(0, Y + 0.7, 0, 17, 0, 1.45),
      henti: lihat(0, Y + 0.7, 0, 17, 0, 1.45),
      geser: lihat(0, Y + 0.7, 0, 17, 0, 1.45),
      kalimat: lihat(0, Y - 0.6, 0, 11, 0, 1.45),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 8 },
    perbarui: (p) => {
      const f = p.fokus ?? "utuh";
      for (const [k, g] of Object.entries(versi)) g.visible = k === f;
      kalimat.visible = f === "kalimat";
      normal.visible = f !== "kalimat";
    },
  };
}

/* ================================================================== *
 * PENYEBAB
 * ================================================================== */

export function setPenyebab(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const dna = new THREE.Group();
  dna.position.set(0, 3.2, 0);
  dna.rotation.z = Math.PI / 2;
  dna.scale.setScalar(0.55);
  grup.add(dna);
  bangunDNA(studio, dna, "ATGCGTACGGTACCTAGCAT");
  const tanda = buatLabel("✕", 0.8);
  tanda.position.set(0.6, 4.3, 0.6);
  grup.add(tanda);
  tulis(grup, "salah salin saat replikasi", 0.5, 0.6, 5.1, 0.6);
  const mutagen = new THREE.Group();
  grup.add(mutagen);
  const matahari = bangunMatahari(studio, mutagen);
  matahari.position.set(-5.5, 6.2, 0);
  tulis(mutagen, "sinar UV", 0.5, -5.5, 4.6, 0.4);
  tulis(mutagen, "sinar-X", 0.9, 0, 7.2, 0);
  const asap = bangunAsap(studio, mutagen);
  asap.position.set(5.5, 4.4, 0);
  tulis(mutagen, "zat kimia (asap rokok)", 0.5, 5.5, 3.7, 0.4);
  panah(studio, mutagen, [v(-4.5, 5.6, 0), v(-3, 4.6, 0), v(-2, 3.8, 0)], 0.06);
  panah(studio, mutagen, [v(4.5, 5.2, 0), v(3.3, 4.4, 0), v(2.2, 3.8, 0)], 0.06);
  mutagen.visible = false;
  const manfaat = new THREE.Group();
  grup.add(manfaat);
  const s1 = bangunSapi(studio, manfaat, { bulu: "merah", tanduk: true });
  s1.position.set(-9, 0, 3);
  s1.scale.setScalar(0.55);
  const s2 = bangunSapi(studio, manfaat, { bulu: "merah" });
  s2.position.set(-4.6, 0, 3);
  s2.scale.setScalar(0.55);
  tulis(manfaat, "bertanduk → tak bertanduk (mutasi polled)", 0.46, -6.8, -0.5, 4);
  const ay = new THREE.Group();
  ay.position.set(5.5, 0, 3);
  ay.scale.setScalar(0.7);
  ay.rotation.y = -0.4;
  manfaat.add(ay);
  bangunAyam(studio, ay, { bulu: "merah" });
  tulis(manfaat, "ayam leher gundul: tahan panas", 0.46, 5.5, -0.5, 4);
  manfaat.visible = false;
  lantai(grup, 22, 8);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 3.6, 0, 14, 0, 1.4),
      mutagen: lihat(0, 4.6, 0, 19, 0, 1.4),
      manfaat: lihat(-1, 2.2, 2, 21, 0, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
    perbarui: (p) => {
      const f = p.fokus ?? "utuh";
      const t = p.detik ?? 0;
      mutagen.visible = f === "mutagen";
      manfaat.visible = f === "manfaat";
      matahari.rotation.z = t * 0.3;
      tanda.visible = f !== "manfaat";
    },
  };
}

/* ================================================================== *
 * RUSAK — kerusakan harian
 * ================================================================== */

export function setRusak(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const dna = new THREE.Group();
  dna.position.set(0, 3, 0);
  dna.rotation.z = Math.PI / 2;
  dna.scale.setScalar(0.6);
  grup.add(dna);
  bangunDNA(studio, dna, "ATGCGTACGGTACCTAGCATTA");
  const acak = pembuatAcak(9);
  const tanda = Array.from({ length: 10 }, () => {
    const l = buatLabel("✕", 0.6);
    l.position.set((acak() - 0.5) * 12, 3 + (acak() - 0.5) * 1.2, 0.8);
    grup.add(l);
    return { l, fase: acak() * 6 };
  });
  tulis(grup, "panas tubuh · hasil metabolisme · sinar matahari", 0.5, 0, 5.4);
  const lPerbaiki = labelHidup(grup, "muncul … lalu diperbaiki", 0.5);
  lantai(grup, 16, 4);
  return {
    grup,
    fokus: { utuh: lihat(0, 3.4, 0, 15, 0, 1.4) },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 8 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      /* tanda kerusakan berkedip: muncul, bertahan sebentar, hilang (diperbaiki) */
      tanda.forEach(({ l, fase }) => {
        const u = (t * 0.5 + fase) % 3;
        l.visible = u < 1.6;
        l.material.opacity = u < 1.2 ? 1 : 1 - (u - 1.2) / 0.4;
      });
      aturLabel(lPerbaiki, true, dt, v(0, 1.2, 0.8));
    },
  };
}

/* ================================================================== *
 * PERBAIKAN — penyuntingan dan perbaikan salah pasang
 * ================================================================== */

export function setPerbaikan(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 3;
  const INDUK = "TACGGTCATGCA";
  const BARU = "ATGCCAGTACGT";
  const tangga = bangunTangga(studio, grup, INDUK, BARU, { rangkaBawah: "baru" });
  tangga.grup.position.set(0, Y, 0);
  tulis(grup, "untai induk", 0.45, -5.6, Y + 1.7);
  tulis(grup, "untai baru", 0.45, -5.6, Y - 1.8);
  /* polimerase: enzim ungu yang meluncur di untai baru */
  const enzim = new THREE.Group();
  grup.add(enzim);
  studio.tambah(bahan(studio, "enzim", ["enzim"], MOLEKUL.enzim.warna, 0.004), bentukEnzim(0.65), enzim);
  const lEnzim = labelHidup(grup, "DNA polimerase", 0.45);
  const SALAH = 6;
  const benar = BARU[SALAH] as "A";
  const jam = buatJamTahap();
  let fasa = "";
  let sudahBenar = false;
  const potong = tangga.bawah.slice(4, 9);
  lantai(grup, 12, 4);
  return {
    grup,
    fokus: {
      baca: lihat(0, Y, 0, 11, 0, 1.4),
      buang: lihat(0, Y, 0, 11, 0, 1.4),
      salah: lihat(0, Y, 0, 11, 0, 1.4),
      potong: lihat(0, Y, 0, 11, 0, 1.4),
      utuh: lihat(0, Y, 0, 11, 0, 1.4),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 7 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "baca";
      const j = jam(p);
      const m = tangga.bawah[SALAH];
      if (f !== fasa) {
        /* basa salah dipasang lagi setiap kali sebuah tahap dimulai */
        gantiBasa(studio, m, f === "baca" || f === "salah" || f === "buang" || f === "potong" ? "G" : benar);
        fasa = f;
        sudahBenar = false;
      }
      const xSalah = m.userData.asal.x as number;
      const benahi = () => {
        if (!sudahBenar) gantiBasa(studio, m, benar);
        sudahBenar = true;
      };
      if (f === "baca") {
        /* enzim bergerak dari kiri ke basa yang salah */
        enzim.position.set(THREE.MathUtils.lerp(-4, xSalah, tahapan(j, 0, 3)), Y - 2.1, 0.3);
      } else if (f === "buang") {
        enzim.position.set(xSalah, Y - 2.1, 0.3);
      } else {
        enzim.position.set(-6, Y - 3, 0.5);
      }
      /* penyuntingan: basa salah keluar lalu masuk kembali sebagai basa benar */
      const keluar = f === "buang" ? tahapan(j, 0.3, 0.8) * (1 - tahapan(j, 1.3, 0.8)) : 0;
      if (f === "buang" && j > 1.3) benahi();
      /* perbaikan salah pasang: potongan untai baru diangkat lalu disalin ulang */
      const angkat = f === "potong" ? tahapan(j, 0.2, 1) * (1 - tahapan(j, 1.8, 1)) : 0;
      if (f === "potong" && j > 1.8) benahi();
      potong.forEach((q) => {
        q.position.y = -0.55 - angkat * 1.6 - (q === m ? keluar * 1.4 : 0);
        q.visible = angkat < 0.95;
      });
      enzim.visible = f === "baca" || f === "buang";
      aturLabel(lEnzim, enzim.visible, dt, enzim.position.clone().add(v(0, -1.2, 0.3)));
    },
  };
}

/* ================================================================== *
 * UV — dimer timin dan perbaikan eksisi
 * ================================================================== */

export function setUV(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 2.6;
  const tangga = bangunTangga(studio, grup, "GCATTAGC", "CGTAATCG");
  tangga.grup.position.set(0, Y, 0);
  const matahari = bangunMatahari(studio, grup);
  matahari.position.set(-4.5, Y + 4, 0);
  const sinar = panah(studio, grup, [v(-3.6, Y + 3.2, 0), v(-1.6, Y + 2.2, 0), v(-0.4, Y + 1.5, 0)], 0.06);
  const T1 = tangga.atas[3];
  const T2 = tangga.atas[4];
  const ikat = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.16, 0.16), bahan(studio, "ikatDimer", ["dimer"], "#1b2430", false).bahan);
  grup.add(ikat);
  const lDimer = labelHidup(grup, "dimer timin: untai tertekuk", 0.5);
  const lEksisi = labelHidup(grup, "dipotong, lalu diisi kembali", 0.5);
  const jam = buatJamTahap();
  lantai(grup, 10, 4);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y + 1.2, 0, 11, 0, 1.4),
      dimer: lihat(0, Y + 0.5, 0, 8, 0, 1.4),
      eksisi: lihat(0, Y + 0.5, 0, 10, 0, 1.4),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 6 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const dimer = f === "dimer" || (f === "eksisi" && j < 0.8);
      const tekuk = dimer ? 1 : 0;
      T1.position.x = T1.userData.asal.x + 0.15 * tekuk;
      T2.position.x = T2.userData.asal.x - 0.15 * tekuk;
      T1.rotation.z = -0.35 * tekuk;
      T2.rotation.z = 0.35 * tekuk;
      ikat.visible = dimer;
      ikat.position.set(tangga.grup.position.x + (T1.position.x + T2.position.x) / 2, Y + 0.75, 0.3);
      /* eksisi: potongan berisi dimer diangkat, lalu kembali normal */
      const u = f === "eksisi" ? tahapan(j, 0.8, 1) * (1 - tahapan(j, 2.2, 1)) : 0;
      tangga.atas.slice(2, 6).forEach((m) => {
        m.position.y = m.userData.asal.y + u * 1.6;
        m.visible = u < 0.9;
      });
      sinar.visible = f === "utuh";
      aturLabel(lDimer, f === "dimer", dt, v(0, Y - 2.2, 0.5));
      aturLabel(lEksisi, f === "eksisi", dt, v(0, Y - 2.2, 0.5));
    },
  };
}

/* ================================================================== *
 * PATAH — patah untai ganda
 * ================================================================== */

export function setPatah(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4;
  const atas = new THREE.Group();
  const bawah = new THREE.Group();
  grup.add(atas, bawah);
  bangunKromosom(studio, atas, { p: 1.2, q: 1.2, jari: 0.4, asal: "kromatin" }, 1);
  bangunKromosom(studio, bawah, { p: 0.01, q: 1.8, jari: 0.4, asal: "kromatin" }, 1);
  const homolog = new THREE.Group();
  homolog.position.set(3.2, Y - 0.4, 0);
  grup.add(homolog);
  bangunKromosom(studio, homolog, { p: 1.2, q: 3, jari: 0.4, asal: "kromosomAyah" }, 1);
  tulis(grup, "kromosom homolog", 0.45, 4.8, Y + 1.6);
  const lPatah = labelHidup(grup, "kedua untai patah", 0.5);
  const jam = buatJamTahap();
  let pisah = 0;
  lantai(grup, 10, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(1, Y - 0.5, 0, 11, 0, 1.35),
      sambung: lihat(1.5, Y - 0.5, 0, 11, 0, 1.35),
      gagal: lihat(1, Y - 1, 0, 12, 0, 1.35),
    },
    bayangan: { pusat: v(1, 0, 0), jangkauan: 6 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const sasaran = f === "utuh" ? 0.6 : f === "sambung" ? 0.6 * (1 - tahapan(j, 1.2, 1.2)) : 1.8;
      pisah = pelan(pisah, sasaran, 4, dt);
      atas.position.set(0, Y + 0.2 + pisah * 0.4, 0);
      bawah.position.set(f === "gagal" ? pisah * 1.2 : 0, Y - 1.3 - pisah * 0.4, 0);
      bawah.rotation.z = f === "gagal" ? pisah * 0.5 : 0;
      homolog.position.x = pelan(homolog.position.x, f === "sambung" ? 1.2 : 3.2, 3, dt);
      aturLabel(lPatah, f === "utuh", dt, v(-1.8, Y - 1, 0.5));
    },
  };
}

/* ================================================================== *
 * GAGAL — xeroderma pigmentosum; kanker
 * ================================================================== */

export function setGagal(studio: Studio): Set3D {
  const grup = new THREE.Group();
  bangunSosok(studio, grup, { entitas: "orang", label: "xeroderma pigmentosum: perbaikan eksisi rusak", x: -4, tinggi: 1, rambut: "#3b302b", keriting: false, baju: "#cbbfae", ukuranLabel: 0.46 }, pembuatAcak(3));
  const m = bangunMatahari(studio, grup);
  m.position.set(-7.5, 6, 0);
  tulis(grup, "sangat peka sinar matahari", 0.46, -4, 5.8);
  /* gumpalan sel yang terus membelah */
  const gumpal = new THREE.Group();
  gumpal.position.set(5, 2.6, 0);
  grup.add(gumpal);
  const acak = pembuatAcak(21);
  const bSel = bahan(studio, "selKanker", ["membranSel"], SEL.membranSel.warna, 0.004, 0.6);
  const sel = Array.from({ length: 30 }, (_, i) => {
    const s = studio.tambah(bSel, bolaHalus(0.45, 14, 10), gumpal);
    const a = i * 2.4;
    const r = 0.25 * Math.sqrt(i) * 1.3;
    s.position.set(Math.cos(a) * r, (acak() - 0.5) * 1.2 * Math.min(1, r), Math.sin(a) * r);
    s.userData.urut = i;
    return s;
  });
  const lKanker = labelHidup(grup, "mutasi gen pengatur pembelahan → membelah tak terkendali", 0.45);
  const jam = buatJamTahap();
  lantai(grup, 18, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(-2, 2.8, 0, 16, 0, 1.3),
      kanker: lihat(4, 2.6, 0, 12, 0, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
    perbarui: (p, dt) => {
      const j = jam(p);
      const n = p.fokus === "kanker" ? Math.min(30, 2 + j * 6) : 3;
      sel.forEach((s) => (s.visible = (s.userData.urut as number) < n));
      aturLabel(lKanker, p.fokus === "kanker", dt, v(5, 0.2, 1.5));
    },
  };
}
