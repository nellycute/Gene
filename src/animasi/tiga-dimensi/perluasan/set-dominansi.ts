import * as THREE from "three";
import { lihat, type Studio } from "../studio";
import { alas, aturLabel, labelHidup, v, type Set3D } from "../rangkai-set";
import { bangunPetakBulu, bangunSapi } from "../model-hewan";
import { lantai, tulis } from "../mendel/bantu";
import { bangunSelDarah, bangunTerompet, type Antigen } from "./model-perluasan";

/**
 * SET PELAJARAN 3.1 — dominansi tidak sempurna dan kodominansi.
 *
 *  mn       tiga sel darah merah: golongan M, MN, N (antigen M kerucut, N cincin)
 *  roan     sapi Shorthorn merah × putih, anak roan; petak kulit dari dekat
 *  banding  bunga merah muda (di tengah-tengah) vs bulu roan (berdampingan)
 */

export function setMN(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const DATA: { antigen: Antigen[]; label: string; sub: string; x: number; f: string }[] = [
    { antigen: ["M"], label: "golongan M", sub: "LᴹLᴹ", x: -5, f: "mm" },
    { antigen: ["M", "N"], label: "golongan MN", sub: "LᴹLᴺ", x: 0, f: "mn" },
    { antigen: ["N"], label: "golongan N", sub: "LᴺLᴺ", x: 5, f: "nn" },
  ];
  const sel = DATA.map((d) => {
    const g = new THREE.Group();
    g.position.set(d.x, 2.6, 0);
    grup.add(g);
    const s = bangunSelDarah(studio, g, d.antigen, 1.9);
    s.rotation.x = 1.05;
    tulis(grup, d.label, 0.7, d.x, 0.1, 1);
    tulis(grup, d.sub, 0.6, d.x, -0.75, 1);
    return g;
  });
  tulis(grup, "antigen M: kerucut · antigen N: cincin", 0.55, 0, 5.4);
  lantai(grup, 16, 5);
  const fokus: Set3D["fokus"] = { utuh: lihat(0, 2.3, 0, 19, 0, 1.28) };
  for (const d of DATA) fokus[d.f] = lihat(d.x, 2.4, 0, 9, 0, 1.2);
  return {
    grup,
    fokus,
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      sel.forEach((g, i) => (g.rotation.y = t * 0.3 + i));
    },
  };
}

export function setRoan(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const merah = bangunSapi(studio, grup, { bulu: "merah", tanduk: true });
  merah.position.set(-6.2, 0, -1);
  const putih = bangunSapi(studio, grup, { bulu: "putih", tanduk: true });
  putih.position.set(6.2, 0, -1);
  putih.rotation.y = Math.PI;
  const anak = bangunSapi(studio, grup, { bulu: "roan" });
  anak.position.set(-0.8, 0, 2.2);
  anak.scale.setScalar(0.62);
  tulis(grup, "merah", 0.5, -6.2, 4.4, -1);
  tulis(grup, "putih", 0.5, 6.2, 4.4, -1);
  tulis(grup, "anak: roan", 0.5, 0, -0.6, 3.6);
  /* petak kulit melayang, hanya untuk tampak dekat */
  const petak = new THREE.Group();
  petak.position.set(0, 6.4, 1);
  petak.rotation.x = 0.35;
  grup.add(petak);
  bangunPetakBulu(studio, petak, ["merah", "putih"], 2.6);
  const lHelai = labelHidup(grup, "helai merah + helai putih", 0.4);
  petak.visible = false;
  lantai(grup, 22, 8);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.2, 0, 23, 0, 1.3),
      anak: lihat(-0.4, 1.4, 2.2, 11, 0.1, 1.25),
      helai: lihat(0, 6.4, 1, 8.5, 0, 0.85),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      petak.visible = f === "helai";
      petak.rotation.y = (p.detik ?? 0) * 0.2;
      aturLabel(lHelai, f === "helai", dt, v(0, 7.9, 1.4));
    },
  };
}

export function setBanding(studio: Studio): Set3D {
  const grup = new THREE.Group();
  alas(studio, grup, -4, 0, 2);
  const bunga = bangunTerompet(studio, grup, "merahMuda", 1.3);
  bunga.position.set(-4, 0.6, 0);
  bunga.rotation.x = 0.35;
  tulis(grup, "dominansi tidak sempurna", 0.46, -4, -0.5, 2);
  tulis(grup, "merah muda: di tengah-tengah", 0.4, -4, -1.2, 2);
  alas(studio, grup, 4, 0, 2);
  const petak = new THREE.Group();
  petak.position.set(4, 0.8, 0);
  grup.add(petak);
  bangunPetakBulu(studio, petak, ["merah", "putih"], 2.4, 9);
  tulis(grup, "kodominansi", 0.46, 4, -0.5, 2);
  tulis(grup, "roan: merah dan putih berdampingan", 0.4, 4, -1.2, 2);
  const l121 = labelHidup(grup, "keduanya: F2 1 : 2 : 1", 0.55);
  lantai(grup, 16, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 1.6, 0, 16, 0, 1.18),
      kiri: lihat(-3.5, 1.6, 0, 10, -0.1, 1.15),
      kanan: lihat(3.5, 1.4, 0, 10, 0.1, 1.05),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 7 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      bunga.rotation.y = t * 0.3;
      petak.rotation.y = -t * 0.2;
      aturLabel(l121, p.fokus === "utuh", dt, v(0, 4.6, 0));
    },
  };
}
