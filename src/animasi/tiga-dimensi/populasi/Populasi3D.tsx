"use client";

import type { PropsAnimasi } from "../../daftar";
import { Film3D } from "../Film3D";
import { rangkaiSetMalas } from "../rangkai-set";
import { setHanyutan, setHW, setMigrasi, setPengubah, setPopulasi, setSeleksi } from "./set-populasi";
import { setHeterosis, setKambing, setKuanti, setPemuliaan, setRagam } from "./set-kuanti";
import { setAyah, setEtika, setGel, setLab, setNGS, setPCR, setPenanda, setPenutup, setSanger, setSidik, setSpesies } from "./set-lab";

/**
 * FILM POPULASI DAN TERAPAN — satu film untuk seluruh Tingkat 6 (6.1–6.7).
 * Set dibangun saat pertama kali dibutuhkan.
 */

const PEMBUAT = {
  populasi: setPopulasi,
  hw: setHW,
  pengubah: setPengubah,
  seleksi: setSeleksi,
  migrasi: setMigrasi,
  hanyutan: setHanyutan,
  kuanti: setKuanti,
  ragam: setRagam,
  pemuliaan: setPemuliaan,
  heterosis: setHeterosis,
  kambing: setKambing,
  lab: setLab,
  pcr: setPCR,
  gel: setGel,
  sanger: setSanger,
  ngs: setNGS,
  penanda: setPenanda,
  sidik: setSidik,
  ayah: setAyah,
  spesies: setSpesies,
  etika: setEtika,
  penutup: setPenutup,
};

const TAHAP_SET = Object.fromEntries(Object.keys(PEMBUAT).map((k) => [k, k]));

const bangun = rangkaiSetMalas(PEMBUAT, TAHAP_SET, "populasi");

export default function Populasi3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}
