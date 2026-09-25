import * as THREE from "three";
import { SEL, ronaTerang } from "@/lib/warna";
import type { Studio } from "./studio";
import { bolaHalus } from "./bentuk";

/**
 * SEL BULAT KECIL YANG DIBELAH — versi sederhana sel hewan untuk adegan yang
 * memperlihatkan banyak sel sekaligus (perbandingan ukuran, deret sel).
 * Bahasa gambarnya sama dengan sel besar: mangkuk biru, sitoplasma pucat,
 * inti ungu menyembul. `induk` harus sudah diletakkan sebelum dibangun.
 */
export function bangunSelMini(studio: Studio, induk: THREE.Object3D, r: number) {
  const { bagian, tambah } = studio;
  induk.updateWorldMatrix(true, false);
  const pusat = new THREE.Vector3();
  const skala = new THREE.Vector3();
  induk.getWorldPosition(pusat);
  induk.getWorldScale(skala);

  const POTONG = 0.2 * r;
  const MUKA = 0.17 * r;
  const DALAM = 0.88 * r;
  const potong = new THREE.Plane(new THREE.Vector3(0, -1, 0), pusat.y + POTONG * skala.y);

  tambah(bagian("membranSel", SEL.membranSel.warna, { potong: [potong], garis: 0.004 }), bolaHalus(r, 48, 32), induk);
  tambah(
    bagian("membranSel", ronaTerang(SEL.membranSel.warna, 0.3), { potong: [potong], sisi: THREE.BackSide, garis: false }),
    bolaHalus(DALAM, 48, 32),
    induk,
  );
  const bibir = new THREE.RingGeometry(Math.sqrt(DALAM ** 2 - POTONG ** 2), Math.sqrt(r ** 2 - POTONG ** 2), 64);
  bibir.rotateX(-Math.PI / 2);
  bibir.translate(0, POTONG, 0);
  tambah(
    bagian("membranSel", ronaTerang(SEL.membranSel.warna, 0.45), { sisi: THREE.DoubleSide, garis: false }),
    bibir,
    induk,
    false,
  );
  const cakram = new THREE.CircleGeometry(Math.sqrt(DALAM ** 2 - MUKA ** 2), 64);
  cakram.rotateX(-Math.PI / 2);
  cakram.translate(0, MUKA, 0);
  tambah(bagian("sitoplasma", SEL.sitoplasma.warna, { sisi: THREE.DoubleSide, garis: false }), cakram, induk, false);

  const inti = bolaHalus(0.34 * r, 32, 24);
  inti.translate(-0.2 * r, 0.1 * r, -0.12 * r);
  tambah(bagian(["membranInti", "inti"], SEL.membranInti.warna), inti, induk);
  const nukleolus = bolaHalus(0.11 * r, 20, 14);
  nukleolus.translate(-0.24 * r, 0.38 * r, -0.06 * r);
  tambah(bagian(["nukleolus", "inti"], SEL.nukleolus.warna, { garis: false }), nukleolus, induk);

  for (const [x, z, sudut] of [
    [0.36, 0.22, 0.4],
    [0.18, -0.42, -0.6],
    [-0.1, 0.5, 1.2],
  ]) {
    const g = new THREE.CapsuleGeometry(0.07 * r, 0.16 * r, 8, 16);
    g.rotateZ(Math.PI / 2);
    g.rotateY(sudut);
    g.translate(x * r, MUKA + 0.03 * r, z * r);
    tambah(bagian("mitokondria", SEL.mitokondria.warna, { garis: 0.003 }), g, induk);
  }
}
