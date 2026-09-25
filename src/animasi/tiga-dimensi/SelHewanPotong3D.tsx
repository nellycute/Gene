"use client";

import * as THREE from "three";
import type { PropsAnimasi } from "../daftar";
import { Film3D, type Pembangun } from "./Film3D";
import type { Pandangan } from "./studio";
import { bangunSelHewan } from "./model-sel-hewan";
import { bangunSelTumbuhan } from "./model-sel-tumbuhan";
import { pembuatAcak } from "./bentuk";

/**
 * SEL YANG DIBELAH — gambar pelajaran 0.3 (gaya 3D bergaris, §3).
 *
 * Dua set: sel hewan (bawaan) dan sel tumbuhan (tahap "tumbuhan", 25 Sep 2026).
 * Kamera menuju bagian yang sedang dibahas: pertama dari `fokus` (isyarat
 * subtitel atau fokus adegan), lalu dari entitas pertama yang disorot, dan
 * kalau tidak ada keduanya, memandang seluruh sel sambil berputar pelan.
 * Kedua sel berada di titik asal (bidang irisannya berlaku di koordinat dunia);
 * hanya satu yang tampil pada satu waktu.
 */

const bangun: Pembangun = (studio, baca) => {
  const hewan = new THREE.Group();
  const tumbuhan = new THREE.Group();
  studio.scene.add(hewan, tumbuhan);
  const fokusHewan = bangunSelHewan(studio, hewan, pembuatAcak(7)).fokus;
  const fokusTumbuhan = bangunSelTumbuhan(studio, tumbuhan, pembuatAcak(13)).fokus;
  tumbuhan.visible = false;

  let aktif: "hewan" | "tumbuhan" | null = null;
  let tujuan: "hewan" | "tumbuhan" | null = null;
  const tampilkan = (nama: "hewan" | "tumbuhan") => {
    hewan.visible = nama === "hewan";
    tumbuhan.visible = nama === "tumbuhan";
    aktif = nama;
  };

  return () => {
    const p = baca();
    const nama = p.tahap === "tumbuhan" ? "tumbuhan" : "hewan";
    const fokus: Record<string, Pandangan> = nama === "tumbuhan" ? fokusTumbuhan : fokusHewan;
    const sorot = p.sorot ?? [];
    const kunciFokus = (p.fokus && fokus[p.fokus] && p.fokus) || sorot.find((id) => fokus[id]) || "utuh";
    const kunci = `${p.kunci ?? ""}|${nama}|${kunciFokus}`;

    if (aktif === null) {
      tampilkan(nama);
      tujuan = nama;
      studio.tuju(fokus[kunciFokus], kunci);
    } else if (nama !== tujuan) {
      tujuan = nama;
      studio.ganti(() => {
        tampilkan(nama);
        studio.tuju(fokus[kunciFokus], kunci);
      }, 0);
    } else if (!studio.sedangBerganti) {
      studio.tuju(fokus[kunciFokus], kunci);
    }
    return { sorot, detik: p.detik ?? 0 };
  };
};

export default function SelHewanPotong3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}
