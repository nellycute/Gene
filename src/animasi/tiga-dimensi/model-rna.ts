import * as THREE from "three";
import { BASA, MOLEKUL, SEL, type KodeBasa } from "@/lib/warna";
import type { Bagian, Studio } from "./studio";
import { bolaHalus, tabung } from "./bentuk";
import { CELAH, PORSI_PURIN, R_BASA, R_GULA, adalahPurin, bentukBasa, bentukFosfat, bentukGula } from "./model-dna-rakit";

/**
 * RNA DAN MESIN PENERJEMAH — model pelajaran 1.3–1.6.
 *
 * Nukleotida memakai bentuk yang sama dengan DNA rakitan 1.2 (fosfat, gula segi
 * lima, basa bercincin), tetapi:
 *  - rangkanya berwarna RNA (jingga) — rangka DNA kelabu — agar dua untai
 *    tidak tertukar saat tampil bersama (transkripsi, translasi);
 *  - gulanya ribosa: ada bola kecil gugus OH di karbon 2′.
 *
 * Skala: 1 satuan ≈ 1 nm untuk nukleotida. tRNA dan ribosom DIPERKECIL dari
 * ukuran aslinya agar muat bersama mRNA dalam satu gambar (lihat Ringkasan).
 */

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const SUMBU_Y = v(0, 1, 0);

/** Panjang basa dalam satu anak tangga baku (sama dengan DNA rakitan). */
export function panjangBasa(b: KodeBasa) {
  const bersih = 2 * R_BASA - CELAH;
  return bersih * (adalahPurin(b) ? PORSI_PURIN : 1 - PORSI_PURIN);
}
/** Jarak gula ke titik tempel basa. */
export const TEMPEL = R_GULA - R_BASA;

/* ------------------------------------------------------------------ *
 * Bahan bersama — satu set per film agar sorot per entitas tetap berlaku
 * ------------------------------------------------------------------ */

export type BahanNukleotida = {
  rangka: Bagian;
  basa: Record<KodeBasa, Bagian>;
  oh: Bagian | null;
};

export function bahanNukleotida(
  studio: Studio,
  o: { rna: boolean; entitas?: string[]; entitasBasa?: string[] },
): BahanNukleotida {
  const e = o.entitas ?? [];
  const basa = {} as Record<KodeBasa, Bagian>;
  for (const k of ["A", "T", "G", "C", "U"] as const) {
    basa[k] = studio.bagian([`basa${k}`, adalahPurin(k) ? "purin" : "pirimidin", ...(o.entitasBasa ?? [])], BASA[k].warna, { garis: 0.003 });
  }
  return {
    rangka: o.rna
      ? studio.bagian(["rna", ...e], MOLEKUL.rna.warna, { garis: 0.003 })
      : studio.bagian(["gulaFosfat", ...e], MOLEKUL.gulaFosfat.warna, { garis: 0.003 }),
    basa,
    oh: o.rna ? studio.bagian(["rna", "gugusOH", ...e], MOLEKUL.rna.warna, { garis: 0.003 }) : null,
  };
}

let gFosfat: THREE.BufferGeometry | null = null;
let gGula: THREE.BufferGeometry | null = null;
let gPurin: THREE.BufferGeometry | null = null;
let gPirimidin: THREE.BufferGeometry | null = null;
const bentuk = () => {
  gFosfat ??= bentukFosfat();
  gGula ??= bentukGula();
  gPurin ??= bentukBasa(true);
  gPirimidin ??= bentukBasa(false);
  return { gFosfat, gGula, gPurin, gPirimidin };
};

/**
 * Satu nukleotida dalam kerangka lokalnya: gula di titik asal (muka menghadap
 * +z), sumbu +y menunjuk ke arah 5′ (fosfat di atas-belakang gula), basa
 * menjulur ke +x dengan muka menghadap +z — sama seperti tangga pada 1.2.
 */
export function bangunNukleotida(studio: Studio, induk: THREE.Object3D, basa: KodeBasa, bahan: BahanNukleotida) {
  const { gFosfat, gGula, gPurin, gPirimidin } = bentuk();
  const g = new THREE.Group();
  induk.add(g);
  studio.tambah(bahan.rangka, gGula, g);
  const fosfat = studio.tambah(bahan.rangka, gFosfat, g);
  fosfat.position.set(-0.24, 0.26, 0);
  const tangkai = new THREE.CylinderGeometry(0.045, 0.045, 0.3, 8);
  tangkai.rotateZ(0.75);
  tangkai.translate(-0.12, 0.14, 0);
  studio.tambah(bahan.rangka, tangkai, g, false);
  if (bahan.oh) {
    /* gugus OH di karbon 2′ — ciri ribosa */
    const oh = bolaHalus(0.07, 12, 8);
    oh.translate(0.13, -0.2, 0.05);
    studio.tambah(bahan.oh, oh, g);
  }
  const b = studio.tambah(bahan.basa[basa], adalahPurin(basa) ? gPurin : gPirimidin, g);
  b.position.set(TEMPEL, 0, 0);
  b.rotation.x = Math.PI / 2;
  b.scale.set(panjangBasa(basa), 1, 1);
  return g;
}

/** Arahkan nukleotida: `keKe5` = arah menuju ujung 5′, `keBasa` = arah basa menjulur. */
export function arahkan(g: THREE.Object3D, posisi: THREE.Vector3, keKe5: THREE.Vector3, keBasa: THREE.Vector3) {
  const y = keKe5.clone().normalize();
  const x = keBasa.clone().addScaledVector(y, -keBasa.dot(y)).normalize();
  const z = new THREE.Vector3().crossVectors(x, y);
  g.position.copy(posisi);
  g.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(x, y, z));
}

/* ------------------------------------------------------------------ *
 * Untai RNA yang letaknya diatur setiap bingkai
 * ------------------------------------------------------------------ */

export type Letak = { p: THREE.Vector3; ke5: THREE.Vector3; keBasa: THREE.Vector3 };

export function bangunUntai(studio: Studio, induk: THREE.Object3D, urutan: string, bahan: BahanNukleotida) {
  const huruf = urutan.split("") as KodeBasa[];
  const nukleotida = huruf.map((b) => bangunNukleotida(studio, induk, b, bahan));
  const gBatang = new THREE.CylinderGeometry(1, 1, 1, 8);
  const sambung = huruf.slice(1).map(() => studio.tambah(bahan.rangka, gBatang, induk, false));
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  /** `letak(i)` memberi posisi dan arah nukleotida ke-i; `tampak(i)` 0..1. */
  const perbarui = (letak: (i: number) => Letak, tampak: (i: number) => number = () => 1) => {
    huruf.forEach((_, i) => {
      const l = letak(i);
      const n = nukleotida[i];
      arahkan(n, l.p, l.ke5, l.keBasa);
      const t = tampak(i);
      n.visible = t > 0.02;
      n.scale.setScalar(Math.max(t, 0.001));
      n.updateMatrix();
    });
    /* sambungan gula ke fosfat nukleotida berikutnya (arah 3′) */
    sambung.forEach((m, i) => {
      const t = Math.min(tampak(i), tampak(i + 1));
      a.set(0, 0, 0).applyMatrix4(nukleotida[i].matrix);
      b.set(-0.24, 0.26, 0).applyMatrix4(nukleotida[i + 1].matrix);
      const panjang = a.distanceTo(b);
      m.visible = t > 0.02 && panjang < 2.2;
      if (!m.visible) return;
      m.position.copy(a).add(b).multiplyScalar(0.5);
      m.quaternion.setFromUnitVectors(SUMBU_Y, tmp.copy(b).sub(a).normalize());
      m.scale.set(0.045 * t, panjang, 0.045 * t);
    });
  };
  return { huruf, nukleotida, perbarui };
}

/** Garis-garis ikatan hidrogen antara dua basa (2 untuk A–U/A–T, 3 untuk G–C). */
export function bangunIkatan(studio: Studio, induk: THREE.Object3D, jumlah: number, bahan: Bagian) {
  const g = new THREE.Group();
  induk.add(g);
  for (let j = 0; j < jumlah; j++) {
    const m = new THREE.CylinderGeometry(0.017, 0.017, CELAH - 0.03, 6);
    m.rotateZ(Math.PI / 2);
    m.translate(0, (j - (jumlah - 1) / 2) * 0.1, 0.03);
    studio.tambah(bahan, m, g, false);
  }
  return g;
}

/* ------------------------------------------------------------------ *
 * tRNA berbentuk L
 * ------------------------------------------------------------------ */

export type TRNA = { grup: THREE.Group; asamAmino: THREE.Mesh; antikodon: THREE.Group };

/**
 * tRNA tegak: antikodon di bawah (y ≈ 0, tiga basa menghadap −y), siku di
 * kiri-atas, lengan penerima ke kanan dengan asam amino di ujungnya (y ≈ 4,2).
 * Tiap lengan berupa batang berpasangan pendek, seperti aslinya.
 */
export function bangunTRNA(
  studio: Studio,
  induk: THREE.Object3D,
  antikodon: string,
  o: { entitas?: string[]; bahanBasa?: Record<KodeBasa, Bagian>; asamAmino?: boolean } = {},
): TRNA {
  const { bagian, tambah } = studio;
  const grup = new THREE.Group();
  induk.add(grup);
  const e = ["rna", "trna", ...(o.entitas ?? [])];
  const badan = bagian(e, MOLEKUL.rna.warna, { garis: 0.004 });
  const anak = bagian(["ikatanHidrogen", "trna", ...(o.entitas ?? [])], MOLEKUL.ikatanHidrogen.warna, { garis: false });

  /* dua lengan: tiap lengan = dua pita sejajar + anak tangga pendek */
  const lengan = (a: THREE.Vector3, b: THREE.Vector3) => {
    const arah = b.clone().sub(a).normalize();
    const samping = new THREE.Vector3().crossVectors(arah, v(0, 0, 1)).normalize().multiplyScalar(0.28);
    for (const s of [-1, 1]) {
      tambah(badan, tabung([a.clone().addScaledVector(samping, s), b.clone().addScaledVector(samping, s)], 0.12, 12, 10), grup);
    }
    const n = Math.round(a.distanceTo(b) / 0.42);
    for (let i = 1; i < n; i++) {
      const p = a.clone().lerp(b, i / n);
      const g = new THREE.CylinderGeometry(0.05, 0.05, 0.56, 6);
      g.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(SUMBU_Y, samping.clone().normalize())));
      g.translate(p.x, p.y, p.z);
      tambah(anak, g, grup, false);
    }
  };
  const siku = v(-0.6, 3.6, 0);
  lengan(v(-0.6, 0.75, 0), siku);
  lengan(siku, v(2.4, 3.6, 0));
  /* simpul antikodon di bawah */
  const simpul = bolaHalus(0.5, 20, 14);
  simpul.scale(1.2, 0.8, 0.8);
  simpul.translate(-0.6, 0.55, 0);
  tambah(badan, simpul, grup);
  /* ujung 3′ (CCA) menjulur, tempat asam amino menempel */
  tambah(badan, tabung([v(2.4, 3.9, 0), v(2.85, 4.2, 0), v(3.0, 4.6, 0)], 0.09, 12, 8), grup);
  const aa = bolaHalus(0.34, 20, 14);
  const asamAmino = tambah(bagian(["asamAmino", ...(o.entitas ?? [])], MOLEKUL.asamAmino.warna, { garis: 0.004 }), aa, grup);
  asamAmino.position.set(3.0, 4.95, 0);
  asamAmino.visible = o.asamAmino !== false;

  /* tiga basa antikodon menjulur ke bawah */
  const ak = new THREE.Group();
  ak.position.set(-0.6, 0.2, 0);
  grup.add(ak);
  const { gPurin, gPirimidin } = bentuk();
  (antikodon.split("") as KodeBasa[]).forEach((b, i) => {
    const bb =
      o.bahanBasa?.[b] ??
      bagian([`basa${b}`, "antikodon", ...(o.entitas ?? [])], BASA[b].warna, { garis: 0.003 });
    const m = tambah(bb, adalahPurin(b) ? gPurin : gPirimidin, ak);
    /* basa menunjuk ke −y, berjajar di x; urutan antikodon ditulis 5′→3′ tetapi
       berpasangan antiparalel dengan kodon, jadi dijajarkan dari kanan ke kiri */
    m.position.set((1 - i) * 0.6, 0, 0);
    /* panjang basa menunjuk ke bawah (−y), mukanya menghadap penonton (+z) */
    m.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(v(0, -1, 0), v(0, 0, 1), v(-1, 0, 0)));
    m.scale.set(panjangBasa(b), 1, 1);
  });
  return { grup, asamAmino, antikodon: ak };
}

/* ------------------------------------------------------------------ *
 * Ribosom
 * ------------------------------------------------------------------ */

/**
 * Ribosom dua subunit. mRNA lewat di celah antara keduanya pada y ≈ 0,
 * memanjang di sumbu x. Subunit besar di atas (boleh tembus pandang agar
 * tRNA di dalamnya terlihat), subunit kecil di bawah.
 */
export function bangunRibosom(studio: Studio, induk: THREE.Object3D, acak: () => number, o: { tembusBesar?: number; entitas?: string[] } = {}) {
  const { bagian, tambah } = studio;
  const e = o.entitas ?? [];
  const kecil = new THREE.Group();
  const besar = new THREE.Group();
  induk.add(kecil, besar);
  const bKecil = bagian(["ribosom", "subunitKecil", ...e], SEL.ribosom.warna, { garis: 0.004 });
  const bBesar = bagian(["ribosom", "subunitBesar", ...e], SEL.ribosom.warna, { garis: 0.004, tembus: o.tembusBesar ?? 1 });
  const gumpal = (b: Bagian, grup: THREE.Group, sx: number, sy: number, sz: number, y: number, n: number) => {
    const inti = bolaHalus(1, 32, 22);
    inti.scale(sx, sy, sz);
    inti.translate(0, y, 0);
    tambah(b, inti, grup);
    for (let i = 0; i < n; i++) {
      const a = acak() * Math.PI * 2;
      const h = (acak() - 0.5) * 0.9;
      const r = 0.45 + acak() * 0.35;
      const g = bolaHalus(r * Math.min(sx, sy), 16, 12);
      g.translate(Math.cos(a) * sx * 0.75, y + h * sy, Math.sin(a) * sz * 0.75);
      tambah(b, g, grup);
    }
  };
  gumpal(bKecil, kecil, 3.0, 1.05, 2.0, -1.25, 5);
  gumpal(bBesar, besar, 3.4, 2.1, 2.3, 2.45, 7);
  return { kecil, besar };
}

/* ------------------------------------------------------------------ *
 * Rantai protein
 * ------------------------------------------------------------------ */

/** Rantai protein: pita hijau berkelok melewati `titik`, bermanik asam amino kuning. */
export function bangunRantaiProtein(studio: Studio, induk: THREE.Object3D, titik: THREE.Vector3[], jariManik = 0.2, manikPerTitik = 1.6) {
  studio.tambah(studio.bagian("protein", MOLEKUL.protein.warna, { garis: 0.003 }), tabung(titik, jariManik * 0.5, titik.length * 10, 8), induk);
  const bManik = studio.bagian("asamAmino", MOLEKUL.asamAmino.warna, { garis: 0.003 });
  const kurva = new THREE.CatmullRomCurve3(titik);
  const jumlah = Math.round(titik.length * manikPerTitik);
  const manik: THREE.Mesh[] = [];
  for (let i = 0; i < jumlah; i++) {
    const m = studio.tambah(bManik, bolaHalus(jariManik, 14, 10), induk);
    m.position.copy(kurva.getPoint(i / (jumlah - 1)));
    manik.push(m);
  }
  return manik;
}

/** Titik-titik jalan acak di dalam bola — bentuk gumpalan protein yang terlipat. */
export function lipatanAcak(pusat: THREE.Vector3, jari: number, jumlah: number, langkah: number, acak: () => number) {
  const titik = [pusat.clone().add(v(-jari * 0.7, -jari * 0.7, jari * 0.2))];
  for (let i = 1; i < jumlah; i++) {
    const p = titik[i - 1].clone().add(v(acak() - 0.5, acak() - 0.5, acak() - 0.5).normalize().multiplyScalar(langkah));
    const d = p.clone().sub(pusat);
    if (d.length() > jari) p.sub(d.multiplyScalar(0.45));
    titik.push(p);
  }
  return titik;
}

/**
 * tRNA TEGAK — penyederhanaan untuk adegan ribosom (1.6): antikodon di bawah
 * (basa menunjuk −y, 5′ di kanan), batang tegak, dua lengan samping, dan asam
 * amino di puncak. Bentuk aslinya huruf L (lihat bangunTRNA); di sini dibuat
 * tegak supaya tiga tRNA bisa berjajar di dalam ribosom dan pasangannya dengan
 * kodon terlihat jelas.
 */
export const PUNCAK_TRNA = v(0.28, 3.75, 0);

export function bangunTRNATegak(studio: Studio, induk: THREE.Object3D, antikodon: string, o: { entitas?: string[] } = {}) {
  const { bagian, tambah } = studio;
  const grup = new THREE.Group();
  induk.add(grup);
  const e = ["rna", "trna", ...(o.entitas ?? [])];
  const badan = bagian(e, MOLEKUL.rna.warna, { garis: 0.004 });
  const anak = bagian(["ikatanHidrogen", "trna"], MOLEKUL.ikatanHidrogen.warna, { garis: false });
  for (const x of [-0.28, 0.28]) tambah(badan, tabung([v(x, 0.75, 0), v(x, 3.05, 0)], 0.11, 10, 10), grup);
  for (let y = 1.0; y < 3.0; y += 0.4) {
    const g = new THREE.CylinderGeometry(0.045, 0.045, 0.56, 6);
    g.rotateZ(Math.PI / 2);
    g.translate(0, y, 0);
    tambah(anak, g, grup, false);
  }
  const simpul = bolaHalus(0.5, 20, 14);
  simpul.scale(1.25, 0.7, 0.8);
  simpul.translate(0, 0.52, 0);
  tambah(badan, simpul, grup);
  for (const s of [-1, 1]) {
    const lengan = new THREE.TorusGeometry(0.3, 0.1, 8, 20);
    lengan.translate(s * 0.72, 2.0, 0);
    tambah(badan, lengan, grup);
  }
  tambah(badan, tabung([v(0.28, 3.0, 0), v(0.34, 3.25, 0), v(0.28, 3.45, 0)], 0.08, 10, 8), grup);
  const asamAmino = tambah(bagian(["asamAmino", ...(o.entitas ?? [])], MOLEKUL.asamAmino.warna, { garis: 0.004 }), bolaHalus(0.32, 18, 12), grup);
  asamAmino.position.copy(PUNCAK_TRNA);
  const { gPurin, gPirimidin } = bentuk();
  (antikodon.split("") as KodeBasa[]).forEach((b, i) => {
    const m = tambah(bagian([`basa${b}`, "antikodon"], BASA[b].warna, { garis: 0.003 }), adalahPurin(b) ? gPurin : gPirimidin, grup);
    m.position.set((1 - i) * 0.6, 0.2, 0);
    m.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(v(0, -1, 0), v(0, 0, 1), v(-1, 0, 0)));
    m.scale.set(panjangBasa(b), 1, 1);
  });
  return { grup, asamAmino };
}
