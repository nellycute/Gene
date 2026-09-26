import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { BASA, MOLEKUL, type KodeBasa } from "@/lib/warna";
import type { Studio } from "./studio";
import { tabung } from "./bentuk";

/**
 * HELIKS GANDA DNA — tegak, berpusat di titik asal.
 *
 * Skala: 1 satuan = 1 nm. Jari-jari 1 nm (lebar 2 nm), naik 0,34 nm per
 * pasangan basa, 10 pasang basa per putaran (3,4 nm). Kedua rangka digeser
 * ± 150° satu sama lain sehingga alur besar dan alur kecil terlihat berbeda,
 * seperti DNA sungguhan — bukan tangga yang simetris.
 *
 * Tiap basa berwarna BASA dari warna.ts dan terdaftar sebagai entitas
 * basaA/basaT/basaG/basaC, jadi satu jenis basa bisa disorot sendiri.
 */

const PASANGAN: Record<KodeBasa, KodeBasa> = { A: "T", T: "A", G: "C", C: "G", U: "A" };

export function bangunDNA(studio: Studio, induk: THREE.Object3D, urutan: string) {
  const { bagian, tambah } = studio;
  const JARI = 1.0;
  const NAIK = 0.34;
  const PUTAR = (Math.PI * 2) / 10;
  const GESER_ALUR = (150 / 180) * Math.PI;
  const huruf = urutan.split("") as KodeBasa[];
  const n = huruf.length;
  const y0 = (-(n - 1) * NAIK) / 2;

  /* z = −sin: sudut bertambah searah putaran sekrup kanan terhadap sumbu +y
     yang naik — heliks PUTAR KANAN seperti DNA sungguhan (bentuk B). Versi
     sebelum 26 Sep 2026 memakai +sin sehingga heliksnya berpilin ke kiri. */
  const titikUntai = (i: number, fase: number) =>
    new THREE.Vector3(JARI * Math.cos(i * PUTAR + fase), y0 + i * NAIK, -JARI * Math.sin(i * PUTAR + fase));

  /* rangka gula-fosfat: dua pita spiral + manik fosfat di tiap nukleotida */
  const rangka = bagian("gulaFosfat", MOLEKUL.gulaFosfat.warna, { garis: 0.003 });
  const manik: THREE.BufferGeometry[] = [];
  for (const fase of [0, GESER_ALUR]) {
    const titik: THREE.Vector3[] = [];
    for (let s = -4; s <= (n - 1) * 8 + 4; s++) titik.push(titikUntai(s / 8, fase));
    tambah(rangka, tabung(titik, 0.19, n * 14, 10), induk);
    for (let i = 0; i < n; i++) {
      const g = new THREE.SphereGeometry(0.27, 14, 10);
      const p = titikUntai(i, fase);
      g.translate(p.x, p.y, p.z);
      manik.push(g);
    }
  }
  tambah(rangka, mergeGeometries(manik), induk);

  /* pasangan basa: dua batang berwarna dari tiap rangka menuju tengah,
     disambung ikatan hidrogen tipis di celahnya */
  const perBasa: Record<string, THREE.BufferGeometry[]> = { A: [], T: [], G: [], C: [] };
  const ikatan: THREE.BufferGeometry[] = [];
  const CELAH = 0.07;
  for (let i = 0; i < n; i++) {
    const b1 = huruf[i];
    const b2 = PASANGAN[b1];
    const p1 = titikUntai(i, 0);
    const p2 = titikUntai(i, GESER_ALUR);
    const tengah = p1.clone().add(p2).multiplyScalar(0.5);
    const arah = p2.clone().sub(p1).normalize();
    const a1 = p1.clone().addScaledVector(arah, 0.16);
    const e1 = tengah.clone().addScaledVector(arah, -CELAH);
    const a2 = p2.clone().addScaledVector(arah, -0.16);
    const e2 = tengah.clone().addScaledVector(arah, CELAH);
    perBasa[b1].push(batang(a1, e1, 0.15));
    perBasa[b2].push(batang(a2, e2, 0.15));
    ikatan.push(batang(e1, e2, 0.05));
  }
  for (const kode of ["A", "T", "G", "C"] as const) {
    if (!perBasa[kode].length) continue;
    tambah(bagian(`basa${kode}`, BASA[kode].warna, { garis: 0.003 }), mergeGeometries(perBasa[kode]), induk);
  }
  tambah(bagian("ikatanHidrogen", MOLEKUL.ikatanHidrogen.warna, { garis: false }), mergeGeometries(ikatan), induk, false);

  return { tinggi: (n - 1) * NAIK };
}

/** Silinder dari titik a ke titik b. */
export function batang(a: THREE.Vector3, b: THREE.Vector3, jari: number, sisi = 12) {
  const panjang = a.distanceTo(b);
  const g = new THREE.CylinderGeometry(jari, jari, panjang, sisi);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
  g.applyMatrix4(new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(0.5), q, new THREE.Vector3(1, 1, 1)));
  return g;
}
