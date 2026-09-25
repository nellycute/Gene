import * as THREE from "three";
import { SEL, ronaTerang } from "@/lib/warna";
import type { Studio } from "./studio";
import { stadion, tabung } from "./bentuk";

/**
 * BAKTERI (sel prokariot) YANG DIBELAH MEMANJANG
 *
 * Kapsul berdinding sel, dibelah mendatar seperti mitokondria: tampak dinding
 * sel, membran, sitoplasma, dan DNA melingkar yang mengambang bebas tanpa inti
 * (nukleoid), ditambah plasmid, ribosom, dan flagelum.
 *
 * Panjang ± 3,4 satuan = 2 µm pada skala sel hewan 0.3 (32 satuan = 20 µm).
 * `induk` harus sudah diletakkan (posisi dan skala) sebelum dibangun, karena
 * bidang potongnya dihitung dalam ruang dunia.
 */
export function bangunBakteri(studio: Studio, induk: THREE.Object3D, acak: () => number) {
  const { bagian, tambah, tambahBanyak } = studio;
  const L = 1.1;
  const R = 0.62;
  const R_MEMBRAN = 0.53;
  const R_SITOPLASMA = 0.47;
  const NAIK = 0.02;

  induk.updateWorldMatrix(true, false);
  const pusat = new THREE.Vector3();
  const skala = new THREE.Vector3();
  induk.getWorldPosition(pusat);
  induk.getWorldScale(skala);
  const potong = new THREE.Plane(new THREE.Vector3(0, -1, 0), pusat.y + NAIK * skala.y);

  const gDinding = new THREE.CapsuleGeometry(R, 2 * L, 12, 32);
  gDinding.rotateZ(Math.PI / 2);
  tambah(bagian("dindingSel", SEL.dindingSel.warna, { potong: [potong], garis: 0.004 }), gDinding, induk);

  /* muka potong: dinding (terang), membran, sitoplasma */
  const tutup = new THREE.Group();
  tutup.position.y = NAIK + 0.003;
  tutup.rotation.x = -Math.PI / 2;
  induk.add(tutup);
  const rPotong = Math.sqrt(R * R - NAIK * NAIK);
  const cincinDinding = stadion(L, rPotong);
  cincinDinding.holes.push(stadion(L, R_MEMBRAN));
  /* Muka potong selalu padat (diredupkan lewat warna saja): kalau ikut tembus
     pandang, bagian dalam kapsul yang gelap akan terlihat dari atas. */
  const padat = { sisi: THREE.DoubleSide, garis: false, redupWarnaSaja: true } as const;
  tambah(
    bagian("dindingSel", ronaTerang(SEL.dindingSel.warna, 0.3), padat),
    new THREE.ShapeGeometry(cincinDinding, 24),
    tutup,
    false,
  );
  const cincinMembran = stadion(L, R_MEMBRAN);
  cincinMembran.holes.push(stadion(L, R_SITOPLASMA));
  tambah(bagian("membranSel", SEL.membranSel.warna, padat), new THREE.ShapeGeometry(cincinMembran, 24), tutup, false);
  tambah(bagian("sitoplasma", SEL.sitoplasma.warna, padat), new THREE.ShapeGeometry(stadion(L, R_SITOPLASMA), 24), tutup, false);

  /* nukleoid: DNA bakteri berupa satu lingkaran kusut, bebas di sitoplasma */
  const nukleoid: THREE.Vector3[] = [];
  const N = 26;
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const goyah = 0.75 + acak() * 0.5;
    nukleoid.push(
      new THREE.Vector3(Math.cos(t) * 0.78 * goyah + Math.sin(t * 3) * 0.12, Math.sin(t) * 0.24 * goyah, 0.05),
    );
  }
  const kromatin = bagian("kromatin", SEL.kromatin.warna, { garis: false });
  tambah(kromatin, tabung(nukleoid, 0.034, 220, 6, true), tutup, false);
  const plasmid = new THREE.TorusGeometry(0.1, 0.022, 6, 24);
  plasmid.translate(1.18, 0.2, 0.04);
  tambah(kromatin, plasmid, tutup, false);

  /* ribosom bebas */
  const ribo: THREE.Matrix4[] = [];
  while (ribo.length < 24) {
    const x = (acak() * 2 - 1) * (L + R_SITOPLASMA * 0.7);
    const y = (acak() * 2 - 1) * R_SITOPLASMA * 0.8;
    const diLengkung = Math.abs(x) > L && Math.hypot(Math.abs(x) - L, y) > R_SITOPLASMA * 0.85;
    if (diLengkung || (Math.abs(x) < 0.95 && Math.abs(y) < 0.2)) continue;
    ribo.push(new THREE.Matrix4().makeTranslation(x, y, 0.035));
  }
  tambahBanyak(bagian("ribosom", SEL.ribosom.warna, { garis: false }), new THREE.SphereGeometry(0.042, 8, 6), ribo, tutup);

  /* flagelum: cambuk spiral dari salah satu ujung */
  const cambuk: THREE.Vector3[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = i / 80;
    const redam = 0.35 + 0.65 * t;
    cambuk.push(
      new THREE.Vector3(
        -(L + R * 0.92) - t * 3.2,
        0.13 * redam * Math.cos(t * Math.PI * 2 * 4.5),
        0.13 * redam * Math.sin(t * Math.PI * 2 * 4.5),
      ),
    );
  }
  tambah(bagian("sitoskeleton", SEL.sitoskeleton.warna, { garis: false }), tabung(cambuk, 0.032, 240, 6), induk, false);
}
