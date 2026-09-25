"use client";

import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { MOLEKUL, SEL, ronaGelap, ronaTerang } from "@/lib/warna";
import type { PropsAnimasi } from "../daftar";
import { Film3D, type Pembangun } from "./Film3D";
import { lihat, type Pandangan, type Studio } from "./studio";
import { bolaHalus, lantaiBayang, lembaranBerlipat, pembuatAcak, tabung, teksturBayang } from "./bentuk";
import { bangunMitokondriaIris } from "./model-sel-hewan";
import { bangunRantaiNukleosom } from "./model-nukleosom";

/**
 * INTI SEL DARI DEKAT — gambar pelajaran 0.4 (gaya 3D bergaris, §3).
 *
 * Tiga set:
 *  - inti besar yang diambil seperdelapannya: selaput ganda yang bersambung
 *    dengan RE kasar, pori berupa kompleks protein, eukromatin dan
 *    heterokromatin di muka potong, nukleolus, lalu lintas RNA keluar dan
 *    protein masuk lewat pori, dan DNA yang terurai panjang;
 *  - nukleosom: DNA melilit histon seperti manik-manik pada tali;
 *  - mitokondria besar dengan DNA melingkarnya sendiri.
 */

type Set3D = {
  grup: THREE.Group;
  fokus: Record<string, Pandangan>;
  bayangan: { pusat: THREE.Vector3; jangkauan: number };
  perbarui?: (p: PropsAnimasi, tahap: string, dt: number) => void;
};

const TAHAP: Record<string, { set: string; fokus: string; tingkat: number }> = {
  utuh: { set: "inti", fokus: "utuh", tingkat: 0 },
  "dua-lapis": { set: "inti", fokus: "selaput", tingkat: 0 },
  pori: { set: "inti", fokus: "pori", tingkat: 0 },
  "lalu-lintas": { set: "inti", fokus: "pori", tingkat: 0 },
  kromatin: { set: "inti", fokus: "kromatin", tingkat: 0 },
  nukleosom: { set: "nukleosom", fokus: "utuh", tingkat: 1 },
  nukleolus: { set: "inti", fokus: "nukleolus", tingkat: 0 },
  ukuran: { set: "inti", fokus: "utuh", tingkat: 0 },
  mitokondria: { set: "mitokondria", fokus: "utuh", tingkat: 0 },
};

const bangun: Pembangun = (studio, baca) => {
  const acak = pembuatAcak(23);
  const semua: Record<string, Set3D> = {
    inti: setInti(studio, acak),
    nukleosom: setNukleosom(studio),
    mitokondria: setMitokondria(studio, acak),
  };
  for (const s of Object.values(semua)) {
    s.grup.visible = false;
    studio.scene.add(s.grup);
  }

  let setAktif: string | null = null;
  let setTujuan: string | null = null;
  let tingkatAktif = 0;
  const tampilkan = (nama: string) => {
    for (const [k, s] of Object.entries(semua)) s.grup.visible = k === nama;
    studio.aturBayangan(semua[nama].bayangan.pusat, semua[nama].bayangan.jangkauan);
    setAktif = nama;
  };

  return (dt) => {
    const p = baca();
    const namaTahap = p.tahap && TAHAP[p.tahap] ? p.tahap : "utuh";
    const info = TAHAP[namaTahap];
    const set = semua[info.set];
    const kunciFokus = p.fokus && set.fokus[p.fokus] ? p.fokus : info.fokus;
    const pandangan = set.fokus[kunciFokus];
    const kunci = `${p.kunci ?? ""}|${namaTahap}|${kunciFokus}`;

    if (setAktif === null) {
      tampilkan(info.set);
      setTujuan = info.set;
      tingkatAktif = info.tingkat;
      studio.tuju(pandangan, kunci);
    } else if (info.set !== setTujuan) {
      setTujuan = info.set;
      const arah = info.tingkat === tingkatAktif ? 0 : Math.sign(info.tingkat - tingkatAktif);
      const namaSet = info.set;
      const tingkat = info.tingkat;
      studio.ganti(() => {
        tampilkan(namaSet);
        tingkatAktif = tingkat;
        studio.tuju(pandangan, kunci);
      }, arah);
    } else if (!studio.sedangBerganti) {
      studio.tuju(pandangan, kunci);
    }

    if (setAktif) semua[setAktif].perbarui?.(p, namaTahap, dt);
    return { sorot: p.sorot ?? [], detik: p.detik ?? 0 };
  };
};

export default function IntiSel3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}

/* ================================================================== *
 * SET 1 — INTI BESAR YANG DIPOTONG SEPERDELAPAN
 * ================================================================== */

function setInti(studio: Studio, acak: () => number): Set3D {
  const { bagian, tambah, tambahBanyak } = studio;
  const grup = new THREE.Group();
  const C = new THREE.Vector3(0, 0, 0);
  const R_LUAR = 10;
  const R_DALAM = 9.1;
  const R_CELAH = (R_LUAR + R_DALAM) / 2;
  const putar = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -0.72);
  const potong = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)].map((n) =>
    new THREE.Plane().setFromNormalAndCoplanarPoint(n.applyQuaternion(putar).negate(), C),
  );

  /* selubung: tetap padat saat diredupkan (hanya warnanya yang memudar), supaya
     pori dan isi inti di sisi belakang tidak tembus terlihat */
  tambah(
    bagian(["membranInti", "inti"], SEL.membranInti.warna, {
      potong,
      potongSudut: true,
      garis: 0.004,
      redupWarnaSaja: true,
    }),
    bolaHalus(R_LUAR, 128, 96),
    grup,
  );

  /* pori inti: kompleks protein berbentuk cincin dengan delapan tonjolan */
  const cincin = new THREE.TorusGeometry(0.42, 0.13, 10, 28);
  const tonjolan: THREE.BufferGeometry[] = [cincin];
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2;
    tonjolan.push(new THREE.SphereGeometry(0.12, 10, 8).translate(Math.cos(a) * 0.42, Math.sin(a) * 0.42, 0.1));
  }
  const bentukPori = mergeGeometries(tonjolan.map((g) => g.toNonIndexed()));
  const matriksPori: THREE.Matrix4[] = [];
  const arahPori: THREE.Vector3[] = [];
  const N_PORI = 120;
  for (let i = 0; i < N_PORI; i++) {
    const y = 1 - (2 * (i + 0.5)) / N_PORI;
    const r = Math.sqrt(1 - y * y);
    const phi = i * 2.399963;
    const d = new THREE.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r);
    arahPori.push(d);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), d);
    matriksPori.push(new THREE.Matrix4().compose(C.clone().addScaledVector(d, R_LUAR + 0.02), q, new THREE.Vector3(1, 1, 1)));
  }
  tambahBanyak(
    bagian(["protein", "pori", "membranInti", "inti"], MOLEKUL.protein.warna, { potong, potongSudut: true, garis: false }),
    bentukPori,
    matriksPori,
    grup,
  );

  /* muka potong: selubung berlapis dua + isi inti */
  const bingkai = new THREE.Group();
  bingkai.quaternion.copy(putar);
  grup.add(bingkai);
  const susunan = [
    new THREE.Matrix4(),
    new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0)),
    new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)),
  ];
  const Q = Math.PI / 2;
  const selubung = bagian(["membranInti", "inti"], ronaTerang(SEL.membranInti.warna, 0.12), {
    sisi: THREE.DoubleSide,
    garis: false,
    redupWarnaSaja: true,
  });
  const celah = bagian(["membranInti", "inti"], ronaGelap(SEL.membranInti.warna, 0.35), {
    sisi: THREE.DoubleSide,
    garis: false,
    redupWarnaSaja: true,
  });
  const isi = bagian("inti", SEL.inti.warna, { sisi: THREE.DoubleSide, garis: false, redupWarnaSaja: true });
  const eu = bagian(["kromatin", "eukromatin", "inti"], SEL.kromatin.warna, { garis: false });
  const hetero = bagian(["kromatin", "heterokromatin", "inti"], ronaGelap(SEL.kromatin.warna, 0.28), { garis: 0.003 });

  /* nukleolus di sudut potongan */
  const PN = 1.1;
  const nukleolus = bagian(["nukleolus", "inti"], SEL.nukleolus.warna, { garis: 0.004 });
  tambah(nukleolus, bolaHalus(2.7, 48, 32).translate(PN, PN, PN), bingkai);
  const JARAK_NUK = Math.sqrt(2.7 ** 2 - PN ** 2) + 0.6;

  const heteroGeo: THREE.BufferGeometry[] = [];
  for (const s of susunan) {
    const muka = new THREE.Group();
    muka.quaternion.setFromRotationMatrix(s);
    bingkai.add(muka);
    tambah(selubung, new THREE.RingGeometry(R_DALAM, R_LUAR, 64, 1, 0, Q), muka, false);
    tambah(celah, new THREE.RingGeometry(R_CELAH - 0.07, R_CELAH + 0.07, 64, 1, 0, Q).translate(0, 0, 0.005), muka, false);
    tambah(isi, new THREE.CircleGeometry(R_DALAM, 64, 0, Q), muka, false);

    /* eukromatin: benang longgar di tengah muka */
    for (let k = 0; k < 9; k++) {
      const titik: THREE.Vector3[] = [];
      let x = 3 + acak() * 3.2;
      let y = 3 + acak() * 3.2;
      let sudut = acak() * Math.PI * 2;
      for (let n = 0; n < 9; n++) {
        const jn = Math.hypot(x - PN, y - PN);
        if (jn < JARAK_NUK) {
          x = PN + ((x - PN) / (jn || 1)) * JARAK_NUK;
          y = PN + ((y - PN) / (jn || 1)) * JARAK_NUK;
        }
        x = Math.max(x, 0.5);
        y = Math.max(y, 0.5);
        const d = Math.hypot(x, y);
        if (d > R_DALAM * 0.74) {
          x *= (R_DALAM * 0.74) / d;
          y *= (R_DALAM * 0.74) / d;
        }
        titik.push(new THREE.Vector3(x, y, 0.08));
        sudut += (acak() - 0.5) * 2;
        x += Math.cos(sudut) * 0.95;
        y += Math.sin(sudut) * 0.95;
      }
      tambah(eu, tabung(titik, 0.13, 70, 8), muka, false);
    }
    /* heterokromatin: gumpalan padat menempel di tepi dalam selubung */
    for (let k = 0; k < 7; k++) {
      const a = 0.12 + (k / 6) * (Q - 0.24) + (acak() - 0.5) * 0.08;
      const rr = R_DALAM - 0.75 - acak() * 0.35;
      for (let j = 0; j < 4; j++) {
        const g = bolaHalus(0.45 + acak() * 0.35, 14, 10);
        g.scale(1, 1, 0.45);
        const aa = a + (acak() - 0.5) * 0.09;
        const r2 = rr - acak() * 0.5;
        g.translate(r2 * Math.cos(aa), r2 * Math.sin(aa), 0.1);
        g.applyMatrix4(s);
        heteroGeo.push(g);
      }
    }
  }
  tambah(hetero, mergeGeometries(heteroGeo), bingkai, false);

  /* RE kasar: lembaran berlipat yang lapisan dalamnya menyambung ke selubung luar */
  const reKasar = bagian("reKasar", SEL.reKasar.warna, { garis: 0.003 });
  const ribo: THREE.Matrix4[] = [];
  [R_LUAR + 0.35, R_LUAR + 1.6, R_LUAR + 2.85].forEach((jari, i) => {
    const a0 = -2.5 + i * 0.05;
    const a1 = -0.7 - i * 0.05;
    const tinggi = 7.5 - i * 0.8;
    const g = lembaranBerlipat({
      pusatX: C.x,
      pusatZ: C.z,
      jari,
      a0,
      a1,
      amplitudo: i === 0 ? 0.05 : 0.35,
      gelombang: 7 + i,
      tebal: 0.55,
      tinggi,
      bevel: 0.18,
    });
    g.translate(0, -tinggi / 2 - 0.5, 0);
    tambah(reKasar, g, grup);
    for (let k = 0; k < 110; k++) {
      const u = acak();
      const th = a0 + (a1 - a0) * u;
      const sisi = acak() < 0.5 ? -1 : 1;
      const r = jari + (i === 0 ? 0.05 : 0.35) * Math.sin(u * Math.PI * 2 * (7 + i)) + sisi * 0.42;
      if (i === 0 && sisi < 0) continue;
      const y = -tinggi / 2 - 0.5 + 0.3 + acak() * (tinggi - 0.6);
      ribo.push(new THREE.Matrix4().makeTranslation(r * Math.cos(th), y, r * Math.sin(th)));
    }
  });
  tambahBanyak(bagian(["reKasar", "ribosom"], SEL.ribosom.warna, { garis: false }), new THREE.SphereGeometry(0.17, 8, 6), ribo, grup);

  /* lalu lintas lewat pori: RNA keluar, protein masuk, subunit ribosom keluar */
  const poriDepan = arahPori
    .map((d, i) => ({ d, i }))
    .filter(({ d }) => d.x < -0.45 && d.z > 0.05 && Math.abs(d.y) < 0.7)
    .slice(0, 9)
    .map(({ d }) => d);
  const rna = bagian("rna", MOLEKUL.rna.warna, { garis: 0.003 });
  const protein = bagian(["protein"], ronaTerang(MOLEKUL.protein.warna, 0.1), { garis: 0.003 });
  const subunit = bagian(["ribosom"], SEL.ribosom.warna, { garis: 0.003 });
  /* untai RNA: meliuk, cukup tebal untuk terlihat dari kejauhan */
  const bentukRNA = tabung(
    Array.from({ length: 12 }, (_, i) => new THREE.Vector3(Math.sin(i * 1.2) * 0.55, i * 0.3 - 1.6, Math.cos(i * 0.9) * 0.35)),
    0.17,
    60,
    8,
  );
  /* subunit ribosom: satu besar dan satu kecil */
  const bentukSubunit = mergeGeometries([
    bolaHalus(0.6, 18, 14).scale(1.15, 0.85, 1),
    bolaHalus(0.42, 16, 12).scale(1.2, 0.8, 1).translate(0, 0.62, 0),
  ]);
  const lalu: { mesh: THREE.Mesh; d: THREE.Vector3; fase: number; masuk: boolean; jenis: string }[] = [];
  poriDepan.forEach((d, i) => {
    const jenis = i % 3 === 0 ? "protein" : i % 3 === 1 ? "rna" : "subunit";
    for (let salinan = 0; salinan < 2; salinan++) {
      const mesh =
        jenis === "rna"
          ? tambah(rna, bentukRNA, grup, false)
          : jenis === "protein"
            ? tambah(protein, bolaHalus(0.7, 18, 14), grup, false)
            : tambah(subunit, bentukSubunit, grup, false);
      /* dimiringkan dari sumbu pori agar bentuknya terbaca dari samping */
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().add(new THREE.Vector3(0, 0.6, 0)).normalize());
      lalu.push({ mesh, d, fase: i * 0.37 + salinan * 0.5, masuk: jenis === "protein", jenis });
    }
  });

  /* DNA yang terurai panjang: benang yang terus memanjang keluar dari inti */
  const jalur: THREE.Vector3[] = [];
  for (let i = 0; i <= 160; i++) {
    const t = i / 160;
    jalur.push(new THREE.Vector3(-4 - t * 180, 1.5 * Math.sin(t * 38), 5 + 2.5 * Math.cos(t * 23) + t * 12));
  }
  jalur.unshift(new THREE.Vector3(2, 2, 2));
  const gUrai = tabung(jalur, 0.28, 1600, 8);
  const hitungUrai = gUrai.index ? gUrai.index.count : 0;
  const benangUrai = tambah(bagian("dna", MOLEKUL.dna.warna, { garis: false }), gUrai, grup, false);
  benangUrai.visible = false;

  grup.add(lantaiBayang(teksturBayang(), 34, 30, -R_LUAR - 1.2));

  const DEPAN = lihat(0, 0, 0, 52, 0.07, 1.05, "ayun");
  return {
    grup,
    fokus: {
      utuh: lihat(0, 0, 0, 58, 0.07, 1.05, "putar"),
      selaput: lihat(0.62, 0, 9.46, 9, 0.2, 0.55),
      sambungRE: lihat(-5.5, -1, -8.5, 18, -2.3, 1.15),
      pori: lihat(-8.4, 2, 4.6, 13, -1.05, 1.1),
      kromatin: { ...DEPAN, jarak: 40 },
      eukromatin: lihat(2.8, 3.2, 3.6, 22, 0.07, 1.0),
      heterokromatin: lihat(4.6, 5.4, 4.8, 17, 0.1, 0.95),
      nukleolus: lihat(1, 1.2, 1.1, 20, 0.07, 1.0),
      urai: lihat(-40, 0, 8, 120, 0.25, 1.1),
    },
    bayangan: { pusat: new THREE.Vector3(0, 0, 0), jangkauan: 16 },
    perbarui: (p, tahap) => {
      const lalulintas = tahap === "lalu-lintas" || tahap === "nukleolus" || tahap === "pori";
      const t = p.detik ?? 0;
      for (const l of lalu) {
        const tampil = lalulintas && (tahap !== "nukleolus" || l.jenis === "subunit");
        l.mesh.visible = tampil;
        if (!tampil) continue;
        const u = ((t * 0.22 + l.fase) % 1 + 1) % 1;
        const jalan = l.masuk ? 1 - u : u;
        l.mesh.position.copy(l.d).multiplyScalar(R_LUAR - 2 + jalan * 8);
      }
      const urai = tahap === "ukuran" && p.fokus === "urai";
      benangUrai.visible = urai;
      if (urai && gUrai.index) {
        const q = THREE.MathUtils.clamp((p.sejak ?? 0) / 7, 0, 1);
        gUrai.setDrawRange(0, Math.floor((hitungUrai * q) / 3) * 3);
      }
    },
  };
}

/* ================================================================== *
 * SET 2 — NUKLEOSOM: manik-manik pada tali (1 satuan = 1 nm)
 * Delapan histon membentuk gulungan; DNA (2 nm) melilitnya ± 1,7 kali,
 * lalu tersambung ke gulungan berikutnya lewat DNA penghubung.
 * ================================================================== */

function setNukleosom(studio: Studio): Set3D {
  const grup = new THREE.Group();
  bangunRantaiNukleosom(studio, grup, 6);

  return {
    grup,
    fokus: {
      utuh: lihat(0, 0, 0, 92, 0.1, 1.2, "putar"),
      satu: lihat(-32.5, 2.5, 0, 26, 0.3, 1.1),
    },
    bayangan: { pusat: new THREE.Vector3(0, 0, 0), jangkauan: 44 },
  };
}

/* ================================================================== *
 * SET 3 — MITOKONDRIA DENGAN DNA-NYA SENDIRI
 * DNA mitokondria: lingkaran-lingkaran kecil di matriks, beberapa salinan.
 * ================================================================== */

function setMitokondria(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const mito = new THREE.Group();
  mito.position.set(0, 0, 0);
  grup.add(mito);
  const SKALA = 6.5;
  bangunMitokondriaIris(studio, mito, SKALA, 0.25);

  /* cincin DNA di permukaan matriks (muka potong), di sela krista */
  const dna = studio.bagian("dna", MOLEKUL.dna.warna, { garis: 0.003 });
  const tempat: [number, number][] = [
    [-6.2, 1.6],
    [-2.4, -2.1],
    [1.9, 2.0],
    [5.6, -1.4],
  ];
  for (const [x, z] of tempat) {
    const titik: THREE.Vector3[] = [];
    const N = 24;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const r = 1.05 + 0.18 * Math.sin(a * 3 + x) + (acak() - 0.5) * 0.1;
      titik.push(new THREE.Vector3(x + Math.cos(a) * r, 0.25 + 0.34, z + Math.sin(a) * r * 0.8));
    }
    studio.tambah(dna, tabung(titik, 0.1, 120, 8, true), mito, false);
  }
  grup.add(lantaiBayang(teksturBayang(), 34, 16, -7));

  return {
    grup,
    fokus: {
      utuh: lihat(0, 0, 0, 42, 0.2, 0.95, "putar"),
      cincin: lihat(-2.4, 0.3, -2.1, 11, 0.25, 0.6),
    },
    bayangan: { pusat: new THREE.Vector3(0, 0, 0), jangkauan: 18 },
  };
}
