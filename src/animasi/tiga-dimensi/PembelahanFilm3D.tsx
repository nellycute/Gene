"use client";

import * as THREE from "three";
import { MarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";
import { INTI, SEL, ronaTerang } from "@/lib/warna";
import type { PropsAnimasi } from "../daftar";
import { Film3D, type Pembangun } from "./Film3D";
import { lihat, type Bagian, type Pandangan, type Studio } from "./studio";
import { bolaHalus, lantaiBayang, pembuatAcak, tabung, teksturBayang } from "./bentuk";
import { bangunKromosom, warnaAsal, type AsalKromosom, type Kromosom3D, type OpsiKromosom } from "./model-kromosom";
import { buatLabel } from "./label3d";

/**
 * PEMBELAHAN SEL — gambar pelajaran 0.7 (siklus sel dan mitosis) dan
 * 0.8 (meiosis), gaya 3D bergaris (§3).
 *
 * Satu sel khayal 2n = 4 (sepasang kromosom panjang, sepasang pendek; ungu
 * dari ibu, toska dari ayah) yang benar-benar membelah: kromatin memadat,
 * selaput inti pecah, sentriol pindah ke kutub, serat gelendong menangkap
 * sentromer, kromatid ditarik, lalu membran mencekik sel menjadi dua — atau
 * empat pada meiosis. Setiap keadaan adalah "susunan" sasaran; semua benda
 * bergerak halus menuju susunan itu setiap kali adegan atau isyarat
 * subtitel berganti, jadi gambarnya mengalir seperti video.
 *
 * Membran sel dibuat sebagai permukaan cair (marching cubes): bola-bola yang
 * menjauh melahirkan lekukan pembelahan dengan sendirinya.
 */

/* ------------------------------------------------------------------ *
 * Kromosom sel khayal
 * ------------------------------------------------------------------ */

type DataKromosom = { pasangan: "A" | "B"; asal: AsalKromosom };
const DAFTAR: DataKromosom[] = [
  { pasangan: "A", asal: "kromatin" },
  { pasangan: "A", asal: "kromosomAyah" },
  { pasangan: "B", asal: "kromatin" },
  { pasangan: "B", asal: "kromosomAyah" },
];
const UKURAN = { A: { p: 1.25, q: 2.2 }, B: { p: 0.8, q: 1.35 } } as const;
const JARI = 0.46;
/** Potongan pindah silang di ujung lengan q, pada kromatid bagian dalam pasangan. */
const SILANG: Record<AsalKromosom, OpsiKromosom["silang"]> = {
  kromatin: [{ kromatid: 1, dari: 0.62, sampai: 1 }],
  kromosomAyah: [{ kromatid: 0, dari: 0.62, sampai: 1 }],
};

/* ------------------------------------------------------------------ *
 * Susunan: keadaan sasaran seluruh sel
 * ------------------------------------------------------------------ */

type LetakKromosom = { pos: THREE.Vector3; rx: number; ry: number; pisah: number; x: number };
type Susunan = {
  /** Membran: bola di (±dx, 0, ±dz) — satu, dua, atau empat sel. */
  dx: number;
  dz: number;
  inti: number;
  intiAnak: number;
  intiCucu: number;
  benang: number;
  kromosom: number;
  silang: number;
  gelendong: number;
  kutub: THREE.Vector3[];
  letak: LetakKromosom[];
  pakaiKutubCucu: boolean;
};

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const MIOSIS_RY = Math.PI / 2;

/** Letak kromosom berserakan di dalam inti (profase). */
const SERAK = [v(-1.8, 1.8, 1.1), v(2.0, 1.4, -1.2), v(-1.4, -2.1, -0.9), v(1.8, -2.0, 1.3)];
const RX_SERAK = [0.5, -0.4, 0.9, -0.7];
/** Bidang ekuator mitosis. */
const PIRING = [v(0, 3.4, 0.9), v(0, 0.9, -0.9), v(0, -1.4, 1.0), v(0, -3.6, -0.8)];
const RX_PIRING = [0.25, -0.2, 0.2, -0.25];

function susunanUntuk(tahap: string, fokus: string | undefined): Susunan {
  const dasar: Susunan = {
    dx: 0,
    dz: 0,
    inti: 1,
    intiAnak: 0,
    intiCucu: 0,
    benang: 1,
    kromosom: 0,
    silang: 0,
    gelendong: 0,
    kutub: [v(-3.2, 5.6, 1.2), v(-2.2, 6, 0.6), v(-6.5, 0, -5), v(6.5, 0, -5)],
    letak: SERAK.map((pos, i) => ({ pos, rx: RX_SERAK[i], ry: 0, pisah: 0, x: 1 })),
    pakaiKutubCucu: false,
  };
  const kutubMitosis = [v(-9, 0, 0), v(9, 0, 0), v(-6.5, 0, -5), v(6.5, 0, -5)];
  const urut = (daftar: string[]) => Math.max(0, daftar.indexOf(fokus ?? ""));

  switch (tahap) {
    case "interfase":
      return dasar;
    case "profase": {
      const langkah = urut(["padat", "pecah", "kutub", "gelendong"]);
      return {
        ...dasar,
        benang: 0,
        kromosom: 1,
        inti: langkah >= 1 ? 0 : 1,
        kutub: langkah >= 2 ? kutubMitosis : dasar.kutub,
        gelendong: langkah >= 3 ? 0.55 : 0,
      };
    }
    case "metafase": {
      const baris = urut(["tangkap", "baris"]) >= 1;
      return {
        ...dasar,
        benang: 0,
        kromosom: 1,
        inti: 0,
        kutub: kutubMitosis,
        gelendong: 1,
        letak: (baris ? PIRING : SERAK).map((pos, i) => ({ pos, rx: baris ? RX_PIRING[i] : RX_SERAK[i], ry: 0, pisah: 0, x: 1 })),
      };
    }
    case "anafase": {
      const tarik = urut(["belah", "tarik"]) >= 1;
      return {
        ...dasar,
        benang: 0,
        kromosom: 1,
        inti: 0,
        kutub: kutubMitosis,
        gelendong: 1,
        letak: PIRING.map((pos, i) => ({ pos, rx: RX_PIRING[i], ry: 0, pisah: tarik ? 1 : 0.04, x: 1 })),
      };
    }
    case "telofase": {
      const langkah = urut(["inti", "cekik", "dua"]);
      return {
        ...dasar,
        benang: 0,
        kromosom: langkah >= 1 ? 0.55 : 0.8,
        inti: 0,
        intiAnak: 1,
        kutub: kutubMitosis,
        gelendong: langkah >= 1 ? 0 : 0.4,
        dx: langkah >= 1 ? 6.5 : 1.2,
        letak: PIRING.map((pos, i) => ({
          pos: v(0, pos.y * 0.45, pos.z * 0.6),
          rx: RX_PIRING[i],
          ry: 0,
          pisah: 1.12,
          x: 1,
        })),
      };
    }
    /* ---------------- meiosis ---------------- */
    case "meiosis-pembuka":
      return { ...dasar, benang: 0, kromosom: 1 };
    case "sinapsis":
    case "pindah-silang": {
      const silang = tahap === "pindah-silang" && urut(["awal", "silang"]) >= 1 ? 1 : 0;
      return {
        ...dasar,
        benang: 0,
        kromosom: 1,
        inti: 0.55,
        silang,
        letak: DAFTAR.map((d, i) => ({
          pos: v(d.asal === "kromatin" ? -0.95 : 0.95, d.pasangan === "A" ? 2.2 : -2.6, 0),
          rx: i < 2 ? 0.15 : -0.15,
          ry: 0,
          pisah: 0,
          x: 0.35,
        })),
      };
    }
    case "meiosis-1": {
      const langkah = urut(["baris", "pisah", "dua"]);
      /* pembagian bebas: pasangan A dan B memilih kutub secara acak — di sini
         ibu-A dan ayah-B ke kiri, ayah-A dan ibu-B ke kanan */
      const kiri = (d: DataKromosom) => (d.pasangan === "A" ? d.asal === "kromatin" : d.asal === "kromosomAyah");
      return {
        ...dasar,
        benang: 0,
        kromosom: 1,
        inti: 0,
        silang: 1,
        kutub: kutubMitosis,
        gelendong: langkah >= 2 ? 0 : 1,
        dx: langkah >= 2 ? 6.5 : 0,
        letak: DAFTAR.map((d) => {
          const y = d.pasangan === "A" ? 2.2 : -2.6;
          const sisi = kiri(d) ? -1 : 1;
          const x = langkah >= 1 ? sisi * 6.2 : sisi * 1.35;
          return { pos: v(x, langkah >= 1 ? y * 0.8 : y, 0), rx: 0, ry: MIOSIS_RY, pisah: 0, x: 0.5 };
        }),
      };
    }
    case "gagal-berpisah": {
      /* pasangan A tidak berpisah — keduanya ke kutub kiri; pasangan B berpisah
         normal. Sel kiri: 3 kromosom (n + 1); sel kanan: 1 kromosom (n − 1). */
      const langkah = urut(["baris", "gagal", "dua"]);
      return {
        ...dasar,
        benang: 0,
        kromosom: 1,
        inti: 0,
        silang: 1,
        kutub: kutubMitosis,
        gelendong: langkah >= 2 ? 0 : 1,
        dx: langkah >= 2 ? 6.5 : 0,
        letak: DAFTAR.map((d) => {
          const y = d.pasangan === "A" ? 2.2 : -2.6;
          const sisiAsal = d.asal === "kromatin" ? -1 : 1;
          const xPisah = d.pasangan === "A" ? -6.2 + sisiAsal * 1.0 : sisiAsal * 6.2;
          const x = langkah >= 1 ? xPisah : sisiAsal * 1.35;
          return { pos: v(x, langkah >= 1 ? y * 0.8 : y, 0), rx: 0, ry: MIOSIS_RY, pisah: 0, x: 0.5 };
        }),
      };
    }
    case "meiosis-2": {
      const langkah = urut(["baris2", "pisah2", "empat"]);
      const kiri = (d: DataKromosom) => (d.pasangan === "A" ? d.asal === "kromatin" : d.asal === "kromosomAyah");
      return {
        ...dasar,
        benang: 0,
        kromosom: langkah >= 2 ? 0.7 : 1,
        inti: 0,
        intiCucu: langkah >= 2 ? 1 : 0,
        silang: 1,
        kutub: [v(-6.5, 0, -5.2), v(6.5, 0, -5.2), v(-6.5, 0, 5.2), v(6.5, 0, 5.2)],
        pakaiKutubCucu: true,
        gelendong: langkah >= 2 ? 0 : 1,
        dx: 6.5,
        dz: langkah >= 2 ? 4.8 : 0,
        letak: DAFTAR.map((d) => {
          const y = d.pasangan === "A" ? 1.9 : -2.1;
          return {
            pos: v(kiri(d) ? -6.5 : 6.5, langkah >= 2 ? y * 0.6 : y, 0),
            rx: 0,
            ry: MIOSIS_RY,
            pisah: langkah >= 1 ? (langkah >= 2 ? 0.95 : 0.85) : 0,
            x: 1,
          };
        }),
      };
    }
    default:
      return dasar;
  }
}

/* ------------------------------------------------------------------ */

type Set3D = {
  grup: THREE.Group;
  fokus: Record<string, Pandangan>;
  bayangan: { pusat: THREE.Vector3; jangkauan: number };
  perbarui?: (p: PropsAnimasi, tahap: string, dt: number) => void;
};

const TAHAP_SET: Record<string, string> = {
  siklus: "siklus",
  perbandingan: "banding",
  gamet: "gamet",
  pembuahan: "buah",
};

const bangun: Pembangun = (studio, baca) => {
  const acak = pembuatAcak(41);
  const semua: Record<string, Set3D> = {
    sel: setSel(studio, acak),
    siklus: setSiklus(studio),
    banding: setBanding(studio),
    gamet: setGamet(studio, acak),
    buah: setPembuahan(studio, acak),
  };
  for (const s of Object.values(semua)) {
    s.grup.visible = false;
    studio.scene.add(s.grup);
  }
  let setAktif: string | null = null;
  let setTujuan: string | null = null;
  const tampilkan = (nama: string) => {
    for (const [k, s] of Object.entries(semua)) s.grup.visible = k === nama;
    studio.aturBayangan(semua[nama].bayangan.pusat, semua[nama].bayangan.jangkauan);
    setAktif = nama;
  };

  return (dt) => {
    const p = baca();
    const tahap = p.tahap ?? "interfase";
    const namaSet = TAHAP_SET[tahap] ?? "sel";
    const set = semua[namaSet];
    const kunciFokus = p.fokus && set.fokus[p.fokus] ? p.fokus : pandanganBawaan(tahap, p.fokus);
    const pandangan = set.fokus[kunciFokus] ?? set.fokus.utuh;
    const kunci = `${p.kunci ?? ""}|${tahap}|${kunciFokus}`;

    if (setAktif === null) {
      tampilkan(namaSet);
      setTujuan = namaSet;
      studio.tuju(pandangan, kunci);
    } else if (namaSet !== setTujuan) {
      setTujuan = namaSet;
      studio.ganti(() => {
        tampilkan(namaSet);
        studio.tuju(pandangan, kunci);
      }, 0);
    } else if (!studio.sedangBerganti) {
      studio.tuju(pandangan, kunci);
    }
    if (setAktif) semua[setAktif].perbarui?.(p, tahap, dt);
    return { sorot: p.sorot ?? [], detik: p.detik ?? 0 };
  };
};

/** Sudut pandang sel yang membelah, menurut tahap. */
function pandanganBawaan(tahap: string, fokus: string | undefined) {
  if (tahap === "meiosis-2" && fokus === "empat") return "atas";
  if ((tahap === "telofase" && (fokus === "cekik" || fokus === "dua")) || tahap === "meiosis-2") return "lebar";
  if ((tahap === "meiosis-1" || tahap === "gagal-berpisah") && fokus === "dua") return "lebar";
  if (tahap === "sinapsis" || tahap === "pindah-silang") return "dekat";
  return "utuh";
}

export default function PembelahanFilm3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}

/* ================================================================== *
 * SEL YANG MEMBELAH
 * ================================================================== */

function setSel(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();

  /* membran: permukaan cair */
  const S = 14;
  const bMembran = studio.bagian("membranSel", ronaTerang(SEL.membranSel.warna, 0.35), { tembus: 0.36, garis: 0.004 });
  const permukaan = new MarchingCubes(48, bMembran.bahan, false, false, 60000);
  permukaan.scale.setScalar(S);
  permukaan.castShadow = false;
  grup.add(permukaan);

  /* selubung inti: utama, dua anak, empat cucu — tiap kelompok bisa memudar sendiri */
  const bInti = studio.bagian(["membranInti", "inti"], SEL.membranInti.warna, { tembus: 0.3, garis: 0.003 });
  const bAnak = studio.bagian(["membranInti", "inti"], SEL.membranInti.warna, { tembus: 0, garis: 0.003 });
  const bCucu = studio.bagian(["membranInti", "inti"], SEL.membranInti.warna, { tembus: 0, garis: 0.003 });
  const intiUtama = studio.tambah(bInti, bolaHalus(5.2, 48, 36), grup, false);
  const intiAnak = [-6.5, 6.5].map((x) => {
    const m = studio.tambah(bAnak, bolaHalus(2.9, 32, 24), grup, false);
    m.position.set(x, 0, 0);
    return m;
  });
  const intiCucu = [
    [-6.5, -4.8],
    [6.5, -4.8],
    [-6.5, 4.8],
    [6.5, 4.8],
  ].map(([x, z]) => {
    const m = studio.tambah(bCucu, bolaHalus(2.2, 28, 20), grup, false);
    m.position.set(x, 0, z);
    return m;
  });

  /* kromatin interfase: empat benang longgar, diwarnai menurut asalnya */
  const benang: THREE.Mesh[] = [];
  DAFTAR.forEach((d) => {
    const titik: THREE.Vector3[] = [];
    const p = v((acak() - 0.5) * 4, (acak() - 0.5) * 4, (acak() - 0.5) * 4);
    const arah = v(acak() - 0.5, acak() - 0.5, acak() - 0.5).normalize();
    for (let i = 0; i < 16; i++) {
      titik.push(p.clone());
      arah.add(v(acak() - 0.5, acak() - 0.5, acak() - 0.5).multiplyScalar(1.2)).normalize();
      p.addScaledVector(arah, 1.05);
      if (p.length() > 4.1) p.multiplyScalar(4.1 / p.length());
    }
    benang.push(studio.tambah(studio.bagian([d.asal, "kromosom"], warnaAsal(d.asal), { garis: false }), tabung(titik, 0.16, 120, 6), grup, false));
  });

  /* kromosom: tanpa pindah silang, dan versi sesudah pindah silang (meiosis) */
  const buatSet = (silang: boolean): Kromosom3D[] =>
    DAFTAR.map((d) => {
      const u = UKURAN[d.pasangan];
      return bangunKromosom(studio, grup, { p: u.p, q: u.q, jari: JARI, asal: d.asal, silang: silang ? SILANG[d.asal] : undefined });
    });
  const polos = buatSet(false);
  const tersilang = buatSet(true);

  /* sentriol: empat pasang (kutub) */
  const bSentriol = studio.bagian("sentriol", SEL.sentriol.warna, { garis: 0.003 });
  const sentriol = [0, 1, 2, 3].map(() => {
    const g = new THREE.Group();
    const a = new THREE.CylinderGeometry(0.28, 0.28, 1.1, 14);
    const b = new THREE.CylinderGeometry(0.28, 0.28, 1.1, 14).rotateZ(Math.PI / 2).translate(0.5, 0.5, 0);
    studio.tambah(bSentriol, a, g);
    studio.tambah(bSentriol, b, g);
    grup.add(g);
    return g;
  });

  /* serat gelendong: batang tipis yang diregangkan tiap bingkai */
  const bSerat = studio.bagian("sitoskeleton", SEL.sitoskeleton.warna, { garis: false, tembus: 0 });
  const bentukSerat = new THREE.CylinderGeometry(0.055, 0.055, 1, 6).translate(0, 0.5, 0);
  const serat = Array.from({ length: 36 }, () => {
    const m = studio.tambah(bSerat, bentukSerat, grup, false);
    m.visible = false;
    return m;
  });
  const tarikSerat = (m: THREE.Mesh, dari: THREE.Vector3, ke: THREE.Vector3) => {
    const arah = ke.clone().sub(dari);
    const panjang = arah.length();
    if (panjang < 0.05) {
      m.visible = false;
      return;
    }
    m.visible = true;
    m.position.copy(dari);
    m.quaternion.setFromUnitVectors(v(0, 1, 0), arah.normalize());
    m.scale.set(1, panjang, 1);
  };
  /* serat kutub: memancar ke arah ekuator */
  const pancar = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2;
    return v(0, Math.cos(a) * 3.2, Math.sin(a) * 3.2);
  });

  grup.add(lantaiBayang(teksturBayang(), 36, 26, -9.2));

  /* gagal berpisah: tanda jumlah kromosom di kedua sel anak */
  const tandaLebih = buatLabel("n + 1", 2.2);
  tandaLebih.position.set(-6.5, 7.9, 0);
  const tandaKurang = buatLabel("n − 1", 2.2);
  tandaKurang.position.set(6.5, 7.9, 0);
  tandaLebih.visible = tandaKurang.visible = false;
  grup.add(tandaLebih, tandaKurang);

  /* keadaan saat ini — bergerak halus menuju susunan sasaran */
  const kini = susunanUntuk("interfase", undefined);
  const kiniLetak = kini.letak.map((l) => ({ ...l, pos: l.pos.clone() }));
  const kiniKutub = kini.kutub.map((k) => k.clone());
  let membranTerakhir = "";

  const aturKromosom = (k: Kromosom3D, l: LetakKromosom, skala: number) => {
    k.grup.visible = skala > 0.01;
    k.grup.position.copy(l.pos);
    k.grup.rotation.set(l.rx, l.ry, 0);
    k.grup.scale.setScalar(Math.max(0.001, skala));
    const geser = JARI * 0.8;
    const jarakPisah = 5.4 * l.pisah;
    k.simpul.visible = l.pisah < 0.03;
    k.kromatid.forEach((kr, i) => {
      const sisi = i === 0 ? -1 : 1;
      kr.grup.position.x = sisi * (geser + jarakPisah);
      if (l.pisah > 0.03) {
        /* lengan tertinggal di belakang sentromer yang ditarik ke kutub */
        const a = Math.min(1, l.pisah * 2.5) * 0.95;
        kr.lenganP.rotation.z = sisi * -a;
        kr.lenganQ.rotation.z = sisi * a;
      } else {
        kr.lenganP.rotation.z = -sisi * 0.24 * l.x;
        kr.lenganQ.rotation.z = sisi * 0.24 * l.x;
      }
    });
  };

  const gambarMembran = () => {
    const kunci = `${kini.dx.toFixed(3)}|${kini.dz.toFixed(3)}`;
    if (kunci === membranTerakhir) return;
    membranTerakhir = kunci;
    permukaan.reset();
    const ux = kini.dx / (2 * S);
    const uz = kini.dz / (2 * S);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) permukaan.addBall(0.5 + sx * ux, 0.5, 0.5 + sz * uz, 2.7, 12);
    permukaan.update();
  };
  gambarMembran();

  const aturTembus = (b: Bagian, nilai: number) => {
    if (Math.abs(b.tembus - nilai) < 0.004) return;
    b.tembus = nilai;
    b.terapan = -1;
  };

  return {
    grup,
    fokus: {
      utuh: lihat(0, 0, 0, 40, 0, 1.25),
      dekat: lihat(0, 0, 0, 24, 0.15, 1.2),
      lebar: lihat(0, 0, 0, 52, 0, 1.2),
      atas: lihat(0, 0, 0, 50, 0.1, 0.62),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 18 },
    perbarui: (p, tahap, dt) => {
      const sasaran = susunanUntuk(tahap, p.fokus);
      const k = 1 - Math.exp(-dt * 1.6);
      const kc = 1 - Math.exp(-dt * 3.5);
      kini.dx += (sasaran.dx - kini.dx) * k;
      kini.dz += (sasaran.dz - kini.dz) * k;
      kini.inti += (sasaran.inti - kini.inti) * k;
      kini.intiAnak += (sasaran.intiAnak - kini.intiAnak) * k;
      kini.intiCucu += (sasaran.intiCucu - kini.intiCucu) * k;
      kini.benang += (sasaran.benang - kini.benang) * k;
      kini.kromosom += (sasaran.kromosom - kini.kromosom) * k;
      kini.silang += (sasaran.silang - kini.silang) * kc;
      kini.gelendong += (sasaran.gelendong - kini.gelendong) * k;
      kiniKutub.forEach((kt, i) => kt.lerp(sasaran.kutub[i], k));
      kiniLetak.forEach((l, i) => {
        const s = sasaran.letak[i];
        l.pos.lerp(s.pos, k);
        l.rx += (s.rx - l.rx) * k;
        l.ry += (s.ry - l.ry) * k;
        l.pisah += (s.pisah - l.pisah) * k;
        l.x += (s.x - l.x) * k;
      });

      gambarMembran();
      tandaLebih.visible = tandaKurang.visible = tahap === "gagal-berpisah" && p.fokus === "dua" && kini.dx > 5;
      aturTembus(bInti, 0.3 * kini.inti);
      intiUtama.visible = kini.inti > 0.02;
      intiUtama.scale.setScalar(0.85 + 0.15 * kini.inti);
      aturTembus(bAnak, 0.3 * kini.intiAnak);
      for (const m of intiAnak) {
        m.visible = kini.intiAnak > 0.02 && kini.dz < 0.5;
        m.scale.setScalar(0.5 + 0.5 * kini.intiAnak);
      }
      aturTembus(bCucu, 0.3 * kini.intiCucu);
      for (const m of intiCucu) {
        m.visible = kini.intiCucu > 0.02;
        m.scale.setScalar(0.5 + 0.5 * kini.intiCucu);
      }
      for (const b of benang) {
        b.visible = kini.benang > 0.02;
        b.scale.setScalar(Math.max(0.001, kini.benang));
      }
      polos.forEach((kr, i) => aturKromosom(kr, kiniLetak[i], kini.kromosom * (1 - kini.silang)));
      tersilang.forEach((kr, i) => aturKromosom(kr, kiniLetak[i], kini.kromosom * kini.silang));

      sentriol.forEach((s, i) => {
        s.position.copy(kiniKutub[i]);
        s.visible = i < 2 || sasaran.pakaiKutubCucu;
      });

      /* serat gelendong: dari tiap kutub ke manik sentromer terdekat, plus serat kutub */
      aturTembus(bSerat, 0.85 * kini.gelendong);
      let n = 0;
      if (kini.gelendong > 0.02) {
        const kutubAktif = sasaran.pakaiKutubCucu ? kiniKutub : kiniKutub.slice(0, 2);
        const aktif = kini.silang > 0.5 ? tersilang : polos;
        const tujuan = new THREE.Vector3();
        for (const kr of aktif) {
          for (const kt of kr.kromatid) {
            kt.grup.getWorldPosition(tujuan);
            let terdekat = kutubAktif[0];
            for (const kk of kutubAktif) if (kk.distanceTo(tujuan) < terdekat.distanceTo(tujuan)) terdekat = kk;
            if (n < serat.length) tarikSerat(serat[n++], terdekat, tujuan.clone());
          }
        }
        for (const kk of kutubAktif) {
          for (const arah of pancar) {
            if (n >= serat.length) break;
            const ujung = v(kk.x * 0.25, 0, kk.z * 0.25).add(arah.clone().multiplyScalar(sasaran.pakaiKutubCucu ? 0.4 : 1));
            tarikSerat(serat[n++], kk, ujung);
          }
        }
      }
      for (; n < serat.length; n++) serat[n].visible = false;
    },
  };
}

/* ================================================================== *
 * SIKLUS SEL — cincin G1 · S · G2 · M, dengan sel kecil yang berkeliling
 * ================================================================== */

function setSiklus(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const R = 8;
  const fase = [
    { nama: "G1", bagian: 0.4, warna: "#d3c9b8" },
    { nama: "S", bagian: 0.3, warna: "#c2b59f" },
    { nama: "G2", bagian: 0.2, warna: "#b0a288" },
    { nama: "M", bagian: 0.1, warna: "#5c6878" },
  ];
  const tengah: Record<string, number> = {};
  let mulai = Math.PI / 2;
  for (const f of fase) {
    const panjang = f.bagian * Math.PI * 2 - 0.06;
    const busur = new THREE.TorusGeometry(R, 0.55, 14, 64, panjang);
    busur.rotateZ(mulai - panjang);
    const ent = f.nama === "M" ? ["fase", "faseM"] : ["fase", `fase${f.nama}`, "interfase"];
    studio.tambah(studio.bagian(ent, f.warna, { garis: 0.004 }), busur, grup);
    const sudutTengah = mulai - panjang / 2;
    tengah[f.nama] = sudutTengah;
    const l = buatLabel(f.nama, 1.6);
    l.position.set(Math.cos(sudutTengah) * (R + 2.3), Math.sin(sudutTengah) * (R + 2.3), 0);
    grup.add(l);
    mulai -= f.bagian * Math.PI * 2;
  }
  const lInter = buatLabel("interfase = G1 + S + G2", 0.9);
  lInter.position.set(0, -0.2, 0);
  grup.add(lInter);

  /* sel kecil yang berkeliling cincin */
  const sel = new THREE.Group();
  grup.add(sel);
  const bSel = studio.bagian("membranSel", ronaTerang(SEL.membranSel.warna, 0.3), { tembus: 0.55, garis: 0.004 });
  const bInti = studio.bagian(["membranInti", "inti"], SEL.membranInti.warna, { garis: 0.003 });
  const tubuhA = studio.tambah(bSel, bolaHalus(1.6, 32, 24), sel, false);
  const tubuhB = studio.tambah(bSel, bolaHalus(1.6, 32, 24), sel, false);
  const intiA = studio.tambah(bInti, bolaHalus(0.7, 20, 14), sel, false);
  const intiB = studio.tambah(bInti, bolaHalus(0.7, 20, 14), sel, false);
  const bDNA = studio.bagian(["kromatin", "kromosom"], SEL.kromatin.warna, { garis: 0.003 });
  const salinan = [0, 1].map(() => studio.tambah(bDNA, bolaHalus(0.28, 12, 10), sel, false));

  let sudut = tengah.G1 + 0.4;
  let besar = 0.8;
  let belah = 0;
  let dna = 0;
  return {
    grup,
    /* cincin + labelnya setinggi ± 22 satuan; pada jarak 50 masih ada ruang untuk lencana di pojok */
    fokus: { utuh: lihat(0, -0.4, 0, 50, 0, 1.45) },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 12 },
    perbarui: (p, _t, dt) => {
      const f = p.fokus ?? "";
      const sasaran = tengah[f] ?? tengah.G1 + 0.4;
      const k = 1 - Math.exp(-dt * 1.8);
      sudut += (sasaran - sudut) * k;
      besar += ((f === "G1" ? 1.1 : f === "" ? 0.8 : 1.15) - besar) * k;
      dna += ((f === "S" || f === "G2" || f === "M" ? 1 : 0) - dna) * k;
      belah += ((f === "M" ? 1 : 0) - belah) * k;
      sel.position.set(Math.cos(sudut) * R, Math.sin(sudut) * R, 1.2);
      sel.scale.setScalar(besar);
      const g = belah * 1.3;
      tubuhA.position.set(-g, 0, 0);
      tubuhB.position.set(g, 0, 0);
      intiA.position.set(-g, 0, 0.3);
      intiB.position.set(g, 0, 0.3);
      salinan[0].position.set(-g - 0.25 * dna, 0.2, 1.0);
      salinan[1].position.set(g + 0.25 * dna, -0.1, 1.0);
      salinan[1].visible = dna > 0.1;
    },
  };
}

/* ================================================================== *
 * PERBANDINGAN — hasil mitosis dan hasil meiosis berdampingan
 * ================================================================== */

function setBanding(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const bSel = studio.bagian("membranSel", ronaTerang(SEL.membranSel.warna, 0.35), { tembus: 0.32, garis: 0.004 });

  /** Satu kromatid tunggal (sesudah berpisah), boleh membawa potongan pindah silang. */
  const kromatid = (induk: THREE.Object3D, pasangan: "A" | "B", asal: AsalKromosom, silang: boolean, x: number, y: number) => {
    const g = new THREE.Group();
    g.position.set(x, y, 0);
    induk.add(g);
    const u = UKURAN[pasangan];
    bangunKromosom(
      studio,
      g,
      { p: u.p, q: u.q, jari: JARI, asal, silang: silang ? [{ kromatid: 0, dari: 0.62, sampai: 1 }] : undefined },
      1,
    );
  };

  /* mitosis: dua sel, masing-masing empat kromosom yang sama persis */
  for (const cx of [-13, -6.5]) {
    const sel = new THREE.Group();
    sel.position.set(cx, 0, 0);
    grup.add(sel);
    studio.tambah(bSel, bolaHalus(3.2, 36, 28), sel, false);
    kromatid(sel, "A", "kromatin", false, -1.4, 0.4);
    kromatid(sel, "A", "kromosomAyah", false, -0.45, 0.4);
    kromatid(sel, "B", "kromatin", false, 0.55, 0.1);
    kromatid(sel, "B", "kromosomAyah", false, 1.4, 0.1);
  }
  const lMitosis = buatLabel("Mitosis: 2 sel sama, 2n", 1.1);
  lMitosis.position.set(-9.75, 5, 0);
  grup.add(lMitosis);

  /* meiosis: empat sel, masing-masing dua kromosom — tidak ada dua yang sama */
  const gamet: [AsalKromosom, boolean, AsalKromosom, boolean][] = [
    ["kromatin", false, "kromosomAyah", true],
    ["kromatin", true, "kromosomAyah", false],
    ["kromosomAyah", true, "kromatin", true],
    ["kromosomAyah", false, "kromatin", false],
  ];
  gamet.forEach(([asalA, silangA, asalB, silangB], i) => {
    const sel = new THREE.Group();
    sel.position.set(4.5 + (i % 2) * 5.6, i < 2 ? 2.7 : -2.9, 0);
    grup.add(sel);
    studio.tambah(bSel, bolaHalus(2.5, 32, 24), sel, false);
    kromatid(sel, "A", asalA, silangA, -0.55, 0.2);
    kromatid(sel, "B", asalB, silangB, 0.65, 0);
  });
  const lMeiosis = buatLabel("Meiosis: 4 sel berbeda, n", 1.1);
  lMeiosis.position.set(7.3, 6.8, 0);
  grup.add(lMeiosis);
  grup.add(lantaiBayang(teksturBayang(), 40, 16, -6.2));

  return {
    grup,
    fokus: {
      utuh: lihat(-1.5, 0.5, 0, 46, 0, 1.45),
      mitosis: lihat(-9.75, 0.3, 0, 22, -0.15, 1.45),
      meiosis: lihat(7.3, 0, 0, 22, 0.15, 1.45),
    },
    bayangan: { pusat: v(-1.5, 0, 0), jangkauan: 20 },
  };
}

/* ================================================================== *
 * GAMET — sperma dan sel telur (25 Sep 2026)
 * Sel telur jauh lebih besar daripada sperma; kepala sperma sengaja
 * dibesarkan agar inti dan akrosomnya terbaca.
 * ================================================================== */

/** Zona pelusida (lapisan glikoprotein di luar sel telur) bukan entitas di
 *  warna.ts, jadi digambar netral seperti benda latar di film lain. */
const NETRAL_MUDA = "#e4dfd5";

const mulus = (x: number) => {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
};

/** Benang kromatin pendek di dalam inti, diwarnai menurut asalnya. */
function kusut(studio: Studio, induk: THREE.Object3D, asal: AsalKromosom, r: number, acak: () => number, jumlah = 4) {
  const b = studio.bagian([asal, "kromosom"], warnaAsal(asal), { garis: false });
  for (let k = 0; k < jumlah; k++) {
    const titik: THREE.Vector3[] = [];
    const p = v((acak() - 0.5) * r, (acak() - 0.5) * r, (acak() - 0.5) * r);
    const arah = v(acak() - 0.5, acak() - 0.5, acak() - 0.5).normalize();
    for (let i = 0; i < 7; i++) {
      titik.push(p.clone());
      arah.add(v(acak() - 0.5, acak() - 0.5, acak() - 0.5).multiplyScalar(1.3)).normalize();
      p.addScaledVector(arah, r * 0.28);
      if (p.length() > r * 0.7) p.multiplyScalar((r * 0.7) / p.length());
    }
    studio.tambah(b, tabung(titik, r * 0.07, 40, 6), induk, false);
  }
}

/** Sperma menghadap +x: kepala (inti berisi DNA ayah, bertudung akrosom),
 *  bagian tengah yang dililit mitokondria, lalu ekor. */
function bangunSperma(studio: Studio, induk: THREE.Object3D, acak: () => number) {
  const g = new THREE.Group();
  induk.add(g);
  const kepala = bolaHalus(0.62, 28, 20);
  kepala.scale(1, 0.66, 0.5);
  studio.tambah(studio.bagian("membranSel", ronaTerang(SEL.membranSel.warna, 0.3), { tembus: 0.55, garis: 0.004 }), kepala, g);
  const inti = bolaHalus(0.5, 20, 14);
  inti.scale(1, 0.6, 0.42);
  inti.translate(-0.06, 0, 0);
  studio.tambah(studio.bagian(["inti", "kromosomAyah"], INTI.kromosomAyah.warna, { garis: 0.003 }), inti, g);
  /* akrosom: kantong enzim sejenis lisosom di ujung kepala, pembuka jalan menembus lapisan sel telur */
  const akrosom = new THREE.SphereGeometry(0.64, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.32);
  akrosom.rotateZ(-Math.PI / 2);
  akrosom.scale(1, 0.68, 0.52);
  studio.tambah(studio.bagian(["akrosom", "lisosom"], ronaTerang(SEL.lisosom.warna, 0.45), { garis: 0.003 }), akrosom, g);

  /* bagian tengah: poros mikrotubulus (lanjutan ekor) yang dililit mitokondria */
  const tengah = new THREE.CylinderGeometry(0.16, 0.2, 1.1, 14);
  tengah.rotateZ(Math.PI / 2);
  tengah.translate(-1.15, 0, 0);
  studio.tambah(studio.bagian("sitoskeleton", ronaTerang(SEL.sitoskeleton.warna, 0.25), { garis: 0.003 }), tengah, g);
  const spiral: THREE.Vector3[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    spiral.push(v(-0.62 - t * 1.06, Math.cos(t * Math.PI * 10) * 0.2, Math.sin(t * Math.PI * 10) * 0.2));
  }
  studio.tambah(studio.bagian("mitokondria", SEL.mitokondria.warna, { garis: false }), tabung(spiral, 0.07, 120, 6), g, false);

  /* ekor: tabung lurus yang titik-titiknya digoyang setiap bingkai */
  const PANJANG = 6.8;
  const titik: THREE.Vector3[] = [];
  for (let i = 0; i <= 28; i++) titik.push(v(-1.7 - (i / 28) * PANJANG, 0, 0));
  const ekorG = tabung(titik, 0.07, 110, 6);
  studio.tambah(studio.bagian("sitoskeleton", SEL.sitoskeleton.warna, { garis: false }), ekorG, g, false);
  const asli = Float32Array.from(ekorG.attributes.position.array as Float32Array);
  const fase = acak() * Math.PI * 2;
  const kibas = (t: number, kuat = 1) => {
    const pos = ekorG.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = asli[i * 3];
      const s = Math.min(1, (-1.7 - x) / PANJANG);
      pos.setY(i, asli[i * 3 + 1] + kuat * 0.6 * s * Math.sin((x + 1.7) * 1.4 + t * 9 + fase));
    }
    pos.needsUpdate = true;
  };
  return { grup: g, kibas };
}

/** Sel telur: zona pelusida, membran, dan (bila diminta) inti berisi kromatin ibu. */
function bangunSelTelur(studio: Studio, induk: THREE.Object3D, R: number, acak: () => number, denganInti = true) {
  const g = new THREE.Group();
  induk.add(g);
  studio.tambah(studio.bagian("zonaPelusida", NETRAL_MUDA, { tembus: 0.3, garis: 0.003 }), bolaHalus(R * 1.2, 64, 48), g, false);
  const membran = studio.tambah(
    studio.bagian("membranSel", ronaTerang(SEL.membranSel.warna, 0.45), { tembus: 0.4, garis: 0.004 }),
    bolaHalus(R, 64, 48),
    g,
    false,
  );
  if (denganInti) {
    const inti = new THREE.Group();
    inti.position.set(R * 0.28, R * 0.12, 0);
    g.add(inti);
    studio.tambah(studio.bagian(["membranInti", "inti"], SEL.membranInti.warna, { tembus: 0.4, garis: 0.003 }), bolaHalus(R * 0.24, 32, 24), inti, false);
    kusut(studio, inti, "kromatin", R * 0.24, acak);
  }
  return { grup: g, membran };
}

function setGamet(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const sperma = [0, 1, 2, 3].map((i) => {
    const s = bangunSperma(studio, grup, acak);
    s.grup.position.set(-11.5 + (i % 2) * 1.2, 3.3 - i * 2.2, (i % 2 ? 1 : -1) * 0.8);
    return s;
  });
  const R = 6.5;
  const telur = bangunSelTelur(studio, grup, R, acak);
  telur.grup.position.set(9, 0, 0);
  /* badan kutub: sel kecil berisi kromosom buangan, terselip di celah antara membran dan zona */
  const bKutub = studio.bagian("badanKutub", ronaTerang(SEL.membranSel.warna, 0.45), { tembus: 0.6, garis: 0.004 });
  const bIsiKutub = studio.bagian(["badanKutub", "kromatin"], SEL.kromatin.warna, { garis: false });
  for (const arah of [v(-0.17, 1, 0.17), v(0.16, 1, -0.1)]) {
    const m = studio.tambah(bKutub, bolaHalus(0.55, 20, 14), grup, false);
    m.position.copy(arah.normalize().multiplyScalar(R + 0.6)).add(telur.grup.position);
    const isi = studio.tambah(bIsiKutub, bolaHalus(0.2, 12, 10), grup, false);
    isi.position.copy(m.position);
  }
  const lSperma = buatLabel("sperma", 1.3);
  lSperma.position.set(-12, 4.9, 0);
  const lTelur = buatLabel("sel telur", 1.3);
  lTelur.position.set(9, -9.3, 0);
  const lKutub = buatLabel("badan kutub", 0.6);
  lKutub.position.set(9, 8.7, 0);
  grup.add(lSperma, lTelur, lKutub, lantaiBayang(teksturBayang(), 42, 18, -8.4));

  return {
    grup,
    fokus: {
      utuh: lihat(-1, 0, 0, 52, 0, 1.4),
      sperma: lihat(-13, 0.5, 0, 21, -0.15, 1.35),
      telur: lihat(9, 0.3, 0, 33, 0.15, 1.35),
      kutub: lihat(9, 6.5, 0, 12, 0.2, 1.1),
      kepala: lihat(-11.4, 3.3, 0, 7.5, -0.25, 1.3),
    },
    bayangan: { pusat: v(-1, 0, 0), jangkauan: 22 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      /* dari dekat, label "sperma" hanya terpotong di tepi atas */
      lSperma.visible = p.fokus !== "kepala";
      sperma.forEach((s, i) => {
        s.kibas(t + i * 0.3);
        s.grup.position.x = -11.5 + (i % 2) * 1.2 + 0.25 * Math.sin(t * 1.3 + i);
      });
    },
  };
}

/* ================================================================== *
 * PEMBUAHAN — sperma masuk, dua inti bertemu, zigot membelah 2 → 4 → 8
 * ================================================================== */

function setPembuahan(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const R = 7;
  const telur = bangunSelTelur(studio, grup, R, acak, false);
  const sperma = bangunSperma(studio, grup, acak);

  /* dua inti: dari ayah (toska) dan dari ibu (ungu). Selaputnya menghilang
     saat bertemu, lalu kromosom keduanya berkumpul di tengah. */
  const intiAyah = new THREE.Group();
  const intiIbu = new THREE.Group();
  grup.add(intiAyah, intiIbu);
  const selaput = ([
    [intiAyah, "kromosomAyah", "dari ayah"],
    [intiIbu, "kromatin", "dari ibu"],
  ] as const).map(([g, asal, teks]) => {
    const m = studio.tambah(
      studio.bagian(["membranInti", "inti"], SEL.membranInti.warna, { tembus: 0.4, garis: 0.003 }),
      bolaHalus(1.5, 28, 20),
      g,
      false,
    );
    kusut(studio, g, asal, 1.5, acak, 5);
    const label = buatLabel(teks, 0.8);
    label.position.set(0, 2.3, 0);
    g.add(label);
    return { m, label };
  });

  /* zigot yang membelah: tiap sel terbelah dua di sumbu x, lalu y, lalu z.
     Semuanya tetap di dalam zona, jadi tiap belahan membuat sel lebih kecil
     (jari-jari tiap tahap: zigot, 2, 4, 8 sel). */
  const bBlastomer = studio.bagian("membranSel", ronaTerang(SEL.membranSel.warna, 0.5), { tembus: 0.55, garis: 0.004 });
  const bIntiBlastomer = studio.bagian(["membranInti", "inti"], SEL.membranInti.warna, { garis: false });
  const blastomer = Array.from({ length: 8 }, () => {
    const g = new THREE.Group();
    grup.add(g);
    studio.tambah(bBlastomer, bolaHalus(1, 32, 24), g, false);
    studio.tambah(bIntiBlastomer, bolaHalus(0.22, 16, 12), g, false);
    g.visible = false;
    return g;
  });
  const JARI_TAHAP = [R, 4.3, 3.6, 3.2];
  grup.add(lantaiBayang(teksturBayang(), 34, 24, -R * 1.25));

  const awal = v(-26, 2.5, 2.5);
  const ujung = v(-R + 0.9, 0.3, 0.3);
  sperma.grup.position.copy(awal);
  sperma.grup.lookAt(ujung.clone().sub(awal).normalize().multiplyScalar(40).add(awal));
  sperma.grup.rotateY(-Math.PI / 2);

  let jalan = 0; // 0 jauh → 0,85 menempel → 1 kepala masuk
  let satu = 0; // 0 dua inti terpisah → 1 bertemu di tengah
  let belah = 0; // 0 zigot → 1 dua sel → 2 empat sel → 3 delapan sel
  return {
    grup,
    fokus: {
      utuh: lihat(-4, 0, 0, 46, 0, 1.35),
      dekati: lihat(-8, 0.5, 0, 46, -0.25, 1.35),
      masuk: lihat(-3.2, 0.4, 0, 23, -0.3, 1.3),
      bersatu: lihat(0, 0, 0, 15, 0, 1.3),
      membelah: lihat(0, 0, 0, 36, 0.2, 1.2),
    },
    bayangan: { pusat: v(-4, 0, 0), jangkauan: 20 },
    perbarui: (p, _tahap, dt) => {
      const t = p.detik ?? 0;
      const sejak = p.sejak ?? 0;
      /* sasaran dihitung dari isyarat yang berlaku (aman saat penonton melompat),
         lalu nilainya didekati halus agar tidak pernah meloncat */
      const urutan = Math.max(0, ["dekati", "masuk", "bersatu", "membelah"].indexOf(p.fokus ?? "dekati"));
      const sasaranJalan = urutan === 0 ? 0.85 * mulus(sejak / 2.4) : urutan === 1 ? 0.85 + 0.15 * mulus(sejak / 1.6) : 1;
      /* setelah sperma masuk, kedua inti mulai saling mendekat; bertemu saat isyarat "bersatu" */
      const sasaranSatu = urutan >= 2 ? 1 : urutan === 1 ? 0.3 * mulus((sejak - 2) / 5) : 0;
      jalan += (sasaranJalan - jalan) * (1 - Math.exp(-dt * 8));
      satu += (sasaranSatu - satu) * (1 - Math.exp(-dt * 0.8));
      belah += ((urutan === 3 ? Math.min(3, sejak * 0.75) : 0) - belah) * (1 - Math.exp(-dt * 8));

      /* sperma berenang ke permukaan, lalu kepalanya masuk dan intinya menjadi inti ayah */
      sperma.grup.position.lerpVectors(awal, ujung, jalan);
      sperma.kibas(t, 1 - mulus((jalan - 0.85) / 0.15) * 0.8);
      const muncul = mulus((jalan - 0.9) / 0.1);
      sperma.grup.visible = muncul < 0.6;

      /* dua inti bergerak ke tengah; selaputnya larut saat bertemu */
      intiAyah.position.lerpVectors(v(-R + 2.2, 0.3, 0.3), v(-0.5, 0, 0), mulus(satu));
      intiIbu.position.lerpVectors(v(R * 0.3, R * 0.14, 0), v(0.5, 0, 0), mulus(satu));
      intiAyah.scale.setScalar(0.35 + 0.65 * muncul);
      intiAyah.visible = muncul > 0.01 && belah < 0.02;
      intiIbu.visible = belah < 0.02;
      for (const s of selaput) {
        s.m.visible = satu < 0.8;
        s.label.visible = satu < 0.6;
      }

      /* pembelahan: membran zigot diganti bola-bola blastomer di dalam zona */
      telur.membran.visible = belah < 0.02;
      const L = [0, 1, 2].map((k) => mulus(belah - k));
      const tahapIni = Math.min(2, Math.floor(belah));
      const r = THREE.MathUtils.lerp(JARI_TAHAP[tahapIni], JARI_TAHAP[tahapIni + 1], Math.min(1, belah - tahapIni));
      /* sel bersebelahan hanya sedikit bertumpuk, seperti gugus anggur */
      const jarak = 0.9 * r;
      blastomer.forEach((b, i) => {
        const bit = [i & 1, (i >> 1) & 1, (i >> 2) & 1];
        /* sel yang belum terpisah dari saudaranya tidak digambar dua kali */
        const tampak = belah >= 0.02 && bit.every((nyala, k) => !nyala || L[k] > 0.001);
        b.visible = tampak;
        if (!tampak) return;
        b.position.set(
          (bit[0] ? 1 : -1) * jarak * L[0],
          (bit[1] ? 1 : -1) * jarak * L[1],
          (bit[2] ? 1 : -1) * jarak * L[2],
        );
        b.scale.setScalar(r);
      });
    },
  };
}
