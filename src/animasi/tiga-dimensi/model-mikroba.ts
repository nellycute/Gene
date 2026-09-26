import * as THREE from "three";
import { MOLEKUL, SEL } from "@/lib/warna";
import type { Studio } from "./studio";
import { bolaHalus, tabung } from "./bentuk";
import { buatLabel } from "./label3d";

/**
 * BENDA-BENDA PERCOBAAN — model pelajaran 1.1 (bukti DNA materi genetik).
 *
 * Bakteri Streptococcus pneumoniae (berpasangan, "diplokokus"), bakteri E. coli
 * (batang), bakteriofag T2, tikus percobaan, tabung reaksi, cawan, enzim, dan
 * potongan molekul. Semuanya dibangun dari rumus.
 *
 * Warna:
 *  - dinding bakteri memakai warna dinding sel (sama dengan bakteri 0.2);
 *  - selubung dan ekor fag = protein (hijau), isi kepalanya = DNA (biru);
 *  - enzim = ungu enzim; potongan RNA = jingga RNA;
 *  - benda yang bukan entitas biologi (kapsul polisakarida, tikus, kaca,
 *    cairan, agar) memakai warna netral, supaya tidak tertukar dengan Peta Warna.
 */

export const KAPSUL = "#e9ddb4";
const KACA = "#dbe6ec";
const CAIRAN = "#efe6cc";
const AGAR = "#f0e4c0";
const BULU = "#ece7df";
const TELINGA = "#dcb7aa";
const MATA = "#2a2522";

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/* ------------------------------------------------------------------ *
 * Bakteri
 * ------------------------------------------------------------------ */

/**
 * Pneumokokus: dua sel lonjong bersambung ujung ke ujung. Tinggi ± 3 satuan.
 * `kapsul` = galur S; tanpa kapsul = galur R. `mati` = dipanaskan: sel retak
 * terbuka, potongan DNA-nya berhamburan.
 */
export function bangunDiplokokus(
  studio: Studio,
  induk: THREE.Object3D,
  o: { entitas: string[]; kapsul: boolean; mati?: boolean; acak: () => number },
) {
  const { bagian, tambah } = studio;
  const g = new THREE.Group();
  induk.add(g);
  const dinding = bagian(["dindingSel", ...o.entitas], SEL.dindingSel.warna, {
    garis: 0.004,
    sisi: o.mati ? THREE.DoubleSide : THREE.FrontSide,
  });
  for (const sisi of [-1, 1]) {
    const sel = o.mati
      ? new THREE.SphereGeometry(0.7, 28, 20, sisi * 0.5, Math.PI * 1.45)
      : bolaHalus(0.7, 28, 20);
    sel.scale(1, 1.25, 1);
    sel.translate(0, sisi * 0.86, 0);
    tambah(dinding, sel, g);
  }
  if (o.kapsul && !o.mati) {
    const k = bolaHalus(1.08, 32, 24);
    k.scale(1, 1.72, 1);
    tambah(bagian(["kapsul", ...o.entitas], KAPSUL, { tembus: 0.4, garis: 0.003 }), k, g);
  }
  if (o.mati) {
    /* potongan DNA yang terlepas dari sel yang pecah */
    const bDNA = bagian(["dna", ...o.entitas], MOLEKUL.dna.warna, { garis: false });
    for (let i = 0; i < 5; i++) {
      const a = o.acak() * Math.PI * 2;
      const p = v(Math.cos(a) * 1.2, (o.acak() - 0.5) * 2.4, Math.sin(a) * 1.2);
      tambah(bDNA, potonganUntai(p, 0.55, o.acak), g, false);
    }
    /* sisa kapsul yang terkoyak */
    const bKapsul = bagian(["kapsul", ...o.entitas], KAPSUL, { tembus: 0.45, garis: 0.003, sisi: THREE.DoubleSide });
    for (let i = 0; i < 3; i++) {
      const s = new THREE.SphereGeometry(1.1, 16, 10, i * 2.1, 1.1, 0.5 + i * 0.5, 0.8);
      s.scale(1, 1.6, 1);
      s.translate((o.acak() - 0.5) * 0.4, 0, (o.acak() - 0.5) * 0.4);
      tambah(bKapsul, s, g, false);
    }
  }
  return g;
}

/** E. coli: batang berujung bulat, mendatar di sumbu x. */
export function bangunEColi(studio: Studio, induk: THREE.Object3D, panjang: number, jari: number, entitas: string[] = [], tembus = 1) {
  const g = new THREE.CapsuleGeometry(jari, panjang, 12, 32);
  g.rotateZ(Math.PI / 2);
  return studio.tambah(studio.bagian(["dindingSel", ...entitas], SEL.dindingSel.warna, { garis: 0.004, tembus }), g, induk);
}

/* ------------------------------------------------------------------ *
 * Molekul lepas
 * ------------------------------------------------------------------ */

/** Seutas pendek yang berkelok — potongan DNA atau RNA. */
export function potonganUntai(pusat: THREE.Vector3, panjang: number, acak: () => number, jari = 0.05) {
  const titik: THREE.Vector3[] = [];
  const arah = v(acak() - 0.5, acak() - 0.5, acak() - 0.5).normalize();
  const tegak = v(0, 1, 0).cross(arah).normalize();
  for (let i = 0; i <= 8; i++) {
    const f = i / 8 - 0.5;
    titik.push(pusat.clone().addScaledVector(arah, f * panjang).addScaledVector(tegak, 0.08 * Math.sin(i * 1.7)));
  }
  return tabung(titik, jari, 24, 6);
}

/** Enzim: bola bercelah seperti mulut yang siap memotong. */
export function bentukEnzim(r: number) {
  const g = new THREE.SphereGeometry(r, 28, 20, 0.45, Math.PI * 2 - 0.9);
  g.rotateY(-Math.PI / 2);
  return g;
}

/* ------------------------------------------------------------------ *
 * Bakteriofag T2
 * ------------------------------------------------------------------ */

export type Fag = {
  grup: THREE.Group;
  /** Gulungan DNA di dalam kepala — mengecil saat disuntikkan. */
  isi: THREE.Mesh | null;
};

/**
 * Fag T2 berdiri tegak: kaki-kaki serabut ekor di y ≈ −0,6, lempeng dasar di
 * y = 0, kepala segi dua puluh memanjang di y ≈ 2,6. Kepalanya tembus pandang
 * agar DNA di dalamnya terlihat.
 */
export function bangunFag(
  studio: Studio,
  induk: THREE.Object3D,
  o: { entitasProtein?: string[]; entitasDNA?: string[]; berisi?: boolean; acak: () => number },
): Fag {
  const { bagian, tambah } = studio;
  const grup = new THREE.Group();
  induk.add(grup);
  const ep = ["protein", ...(o.entitasProtein ?? [])];
  const protein = bagian(ep, MOLEKUL.protein.warna, { garis: 0.004 });
  const kulitKepala = bagian(ep, MOLEKUL.protein.warna, { garis: 0.004, tembus: 0.45 });

  const kepala = new THREE.IcosahedronGeometry(0.62, 0);
  kepala.scale(1, 1.4, 1);
  kepala.translate(0, 2.55, 0);
  tambah(kulitKepala, kepala, grup);
  const leher = new THREE.CylinderGeometry(0.24, 0.24, 0.12, 12);
  leher.translate(0, 1.62, 0);
  tambah(protein, leher, grup);
  const ekor = new THREE.CylinderGeometry(0.15, 0.15, 1.45, 14);
  ekor.translate(0, 0.86, 0);
  tambah(protein, ekor, grup);
  for (let i = 0; i < 7; i++) {
    const cincin = new THREE.TorusGeometry(0.17, 0.035, 6, 16);
    cincin.rotateX(Math.PI / 2);
    cincin.translate(0, 0.3 + i * 0.19, 0);
    tambah(protein, cincin, grup, false);
  }
  const dasar = new THREE.CylinderGeometry(0.36, 0.36, 0.1, 6);
  dasar.translate(0, 0.08, 0);
  tambah(protein, dasar, grup);
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * Math.PI * 2 + 0.3;
    const d = v(Math.cos(a), 0, Math.sin(a));
    tambah(
      protein,
      tabung([d.clone().multiplyScalar(0.34).setY(0.08), d.clone().multiplyScalar(0.95).setY(0.28), d.clone().multiplyScalar(1.35).setY(-0.6)], 0.035, 20, 6),
      grup,
      false,
    );
  }

  let isi: THREE.Mesh | null = null;
  if (o.berisi !== false) {
    const titik: THREE.Vector3[] = [];
    for (let i = 0; i < 40; i++) {
      const t = i / 40;
      const a = t * Math.PI * 2 * 5;
      const r = 0.34 * Math.sin(Math.PI * (0.15 + t * 0.7));
      titik.push(v(r * Math.cos(a) + (o.acak() - 0.5) * 0.06, 2.0 + t * 1.1, r * Math.sin(a) + (o.acak() - 0.5) * 0.06));
    }
    isi = tambah(bagian(["dna", ...(o.entitasDNA ?? [])], MOLEKUL.dna.warna, { garis: false }), tabung(titik, 0.045, 160, 6), grup, false);
  }
  return { grup, isi };
}

/* ------------------------------------------------------------------ *
 * Tikus percobaan
 * ------------------------------------------------------------------ */

/** Tikus bergaya boneka, menghadap +z. Tinggi ± 1,6. */
export function bangunTikus(studio: Studio, induk: THREE.Object3D, entitas: string) {
  const { bagian, tambah } = studio;
  const g = new THREE.Group();
  induk.add(g);
  const bulu = bagian(entitas, BULU, { garis: 0.004 });
  const merah = bagian(entitas, TELINGA, { garis: 0.004 });
  const hitam = bagian(entitas, MATA, { garis: false });
  const badan = bolaHalus(1, 32, 24);
  badan.scale(0.82, 0.7, 1.3);
  badan.translate(0, 0.78, 0);
  tambah(bulu, badan, g);
  const kepala = bolaHalus(0.55, 28, 20);
  kepala.scale(0.85, 0.82, 1.15);
  kepala.translate(0, 1.05, 1.3);
  tambah(bulu, kepala, g);
  const hidung = bolaHalus(0.1, 12, 8);
  hidung.translate(0, 1.0, 1.95);
  tambah(merah, hidung, g);
  for (const sx of [-1, 1]) {
    const telinga = bolaHalus(0.3, 20, 14);
    telinga.scale(1, 1, 0.3);
    telinga.translate(sx * 0.36, 1.55, 1.12);
    tambah(merah, telinga, g);
    const mata = new THREE.SphereGeometry(0.07, 10, 8);
    mata.translate(sx * 0.22, 1.18, 1.72);
    tambah(hitam, mata, g, false);
    for (const sz of [-1, 1]) {
      const kaki = bolaHalus(0.15, 12, 8);
      kaki.scale(1, 0.6, 1.4);
      kaki.translate(sx * 0.48, 0.1, sz * 0.7);
      tambah(merah, kaki, g);
    }
  }
  tambah(merah, tabung([v(0, 0.55, -1.2), v(0.2, 0.25, -1.8), v(-0.3, 0.12, -2.5), v(0.1, 0.1, -3.1)], 0.06, 30, 8), g);
  return g;
}

/* ------------------------------------------------------------------ *
 * Peralatan kaca
 * ------------------------------------------------------------------ */

/** Tabung reaksi berdasar bulat, dasar di y = 0. Mengembalikan kaca dan cairannya. */
export function bangunTabung(studio: Studio, induk: THREE.Object3D, o: { tinggi: number; jari: number; isi: number; kerucut?: boolean; entitas?: string[] }) {
  const { bagian, tambah } = studio;
  const profil = (r: number, h: number, dasar: number) => {
    const t: THREE.Vector2[] = [];
    if (o.kerucut) {
      t.push(new THREE.Vector2(0.001, dasar));
      t.push(new THREE.Vector2(r, dasar + r * 1.8));
    } else {
      for (let i = 0; i <= 10; i++) {
        const a = -Math.PI / 2 + (i / 10) * (Math.PI / 2);
        t.push(new THREE.Vector2(Math.max(0.001, r * Math.cos(a)), dasar + r + r * Math.sin(a)));
      }
    }
    t.push(new THREE.Vector2(r, h));
    return t;
  };
  const e = o.entitas ?? [];
  const kaca = tambah(
    bagian(["kaca", ...e], KACA, { tembus: 0.28, garis: 0.003, sisi: THREE.DoubleSide }),
    new THREE.LatheGeometry(profil(o.jari, o.tinggi, 0), 32),
    induk,
    false,
  );
  const cairan = tambah(
    bagian(["cairan", ...e], CAIRAN, { tembus: 0.42, garis: false, sisi: THREE.DoubleSide }),
    new THREE.LatheGeometry(profil(o.jari * 0.9, o.tinggi * o.isi, 0.05), 32),
    induk,
    false,
  );
  const tutupCairan = new THREE.CircleGeometry(o.jari * 0.9, 32);
  tutupCairan.rotateX(-Math.PI / 2);
  tutupCairan.translate(0, o.tinggi * o.isi, 0);
  tambah(bagian(["cairan", ...e], CAIRAN, { tembus: 0.5, garis: false, sisi: THREE.DoubleSide }), tutupCairan, induk, false);
  return { kaca, cairan };
}

/** Cawan petri berisi agar, pusat di (0,0,0). */
export function bangunCawan(studio: Studio, induk: THREE.Object3D, jari: number, entitas: string[] = []) {
  const { bagian, tambah } = studio;
  const kaca = new THREE.CylinderGeometry(jari, jari, 0.28, 40, 1, true);
  kaca.translate(0, 0.14, 0);
  tambah(bagian(["kaca", ...entitas], KACA, { tembus: 0.35, garis: 0.003, sisi: THREE.DoubleSide }), kaca, induk, false);
  const agar = new THREE.CylinderGeometry(jari * 0.97, jari * 0.97, 0.14, 40);
  agar.translate(0, 0.07, 0);
  tambah(bagian(["agar", ...entitas], AGAR, { garis: 0.003 }), agar, induk);
}

/* ------------------------------------------------------------------ *
 * Penanda radioaktif
 * ------------------------------------------------------------------ */

/**
 * Bintang tinta kecil yang berkelip di sekitar bagian yang berpenanda.
 * Bukan warna: radioaktivitas tidak punya warna di Peta Warna, jadi cukup tanda.
 */
export function bintangPenanda(induk: THREE.Object3D, pusat: THREE.Vector3, jari: THREE.Vector3, jumlah: number, acak: () => number) {
  const bintang: THREE.Sprite[] = [];
  for (let i = 0; i < jumlah; i++) {
    const s = buatLabel("✦", 0.34);
    s.position.set(
      pusat.x + (acak() * 2 - 1) * jari.x,
      pusat.y + (acak() * 2 - 1) * jari.y,
      pusat.z + (acak() * 2 - 1) * jari.z,
    );
    s.userData.fase = acak() * Math.PI * 2;
    s.userData.lebar = s.scale.x;
    s.userData.tinggi = s.scale.y;
    s.visible = false;
    induk.add(s);
    bintang.push(s);
  }
  return bintang;
}

/** Kelipkan bintang; `nilai` 0..1 = seberapa tampak. */
export function kelipkan(bintang: THREE.Sprite[], nilai: number, detik: number) {
  for (const s of bintang) {
    const k = 0.55 + 0.45 * Math.sin(detik * 3.2 + (s.userData.fase as number));
    s.visible = nilai > 0.02;
    s.material.opacity = nilai * k;
    const u = 0.8 + 0.3 * k;
    s.scale.set((s.userData.lebar as number) * u, (s.userData.tinggi as number) * u, 1);
  }
}
