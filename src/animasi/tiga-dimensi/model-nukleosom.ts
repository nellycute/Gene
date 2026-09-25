import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { INTI, MOLEKUL } from "@/lib/warna";
import type { Studio } from "./studio";
import { bolaHalus, tabung } from "./bentuk";

/**
 * NUKLEOSOM — DNA melilit gulungan delapan histon ± 1,7 kali, lalu tersambung
 * ke gulungan berikutnya lewat DNA penghubung: "manik-manik pada tali".
 * Skala 1 satuan = 1 nm (DNA 2 nm, gulungan ± 11 nm).
 */
export function bangunRantaiNukleosom(studio: Studio, induk: THREE.Object3D, jumlah: number, jarak = 13) {
  const histon = studio.bagian("histon", INTI.histon.warna, { garis: 0.004 });
  const dna = studio.bagian("dna", MOLEKUL.dna.warna, { garis: 0.003 });
  const R_LILIT = 4.3;
  const titikDNA: THREE.Vector3[] = [];
  const gHiston: THREE.BufferGeometry[] = [];
  const pusatPusat: THREE.Vector3[] = [];
  for (let n = 0; n < jumlah; n++) {
    const pusat = new THREE.Vector3((n - (jumlah - 1) / 2) * jarak, n % 2 === 0 ? 2.5 : -2.5, n % 2 === 0 ? 0 : 3);
    pusatPusat.push(pusat);
    const sumbu = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.3 + (n % 2) * 0.5, n * 0.9, 0.2));
    for (const lapis of [-1.15, 1.15]) {
      for (let k = 0; k < 4; k++) {
        const a = (k / 4) * Math.PI * 2 + (lapis > 0 ? Math.PI / 4 : 0);
        const g = bolaHalus(1.75, 20, 14);
        g.translate(Math.cos(a) * 1.55, Math.sin(a) * 1.55, lapis);
        g.applyMatrix4(new THREE.Matrix4().compose(pusat, sumbu, new THREE.Vector3(1, 1, 1)));
        gHiston.push(g);
      }
    }
    for (let i = 0; i <= 44; i++) {
      const t = i / 44;
      const a = t * 1.7 * Math.PI * 2 - Math.PI / 2;
      const lokal = new THREE.Vector3(Math.cos(a) * R_LILIT, Math.sin(a) * R_LILIT, (t - 0.5) * 3.2);
      titikDNA.push(lokal.applyQuaternion(sumbu).add(pusat));
    }
  }
  studio.tambah(histon, mergeGeometries(gHiston), induk);
  const awal = titikDNA[0].clone().add(new THREE.Vector3(-6, -2, 0));
  const akhir = titikDNA[titikDNA.length - 1].clone().add(new THREE.Vector3(6, 2, 0));
  studio.tambah(dna, tabung([awal, ...titikDNA, akhir], 1.0, 150 * jumlah, 12), induk);
  return { pusat: pusatPusat };
}
