"use client";

import type { PropsAnimasi } from "../../daftar";
import { Film3D } from "../Film3D";
import { rangkaiSetMalas } from "../rangkai-set";
import { setGagal, setKodon, setPatah, setPenyebab, setPerbaikan, setRusak, setUV } from "./set-gen";
import { setAneuploid, setDown, setFusi, setGandumRoti, setKelaminAneu, setKolkisin, setNondisjunction, setPloidi, setSemangka, setStruktur } from "./set-kromosom";
import { setPenyakit, setTalasemia, setTernakPenyakit } from "./set-penyakit";

/**
 * FILM MUTASI DAN VARIASI — satu film untuk seluruh Tingkat 5 (5.1–5.6).
 * Set dibangun saat pertama kali dibutuhkan.
 */

const PEMBUAT = {
  kodon: setKodon,
  penyebab: setPenyebab,
  rusak: setRusak,
  perbaikan: setPerbaikan,
  uv: setUV,
  patah: setPatah,
  gagal: setGagal,
  nondisjunction: setNondisjunction,
  aneuploid: setAneuploid,
  down: setDown,
  kelaminAneu: setKelaminAneu,
  ploidi: setPloidi,
  semangka: setSemangka,
  kolkisin: setKolkisin,
  gandumRoti: setGandumRoti,
  struktur: setStruktur,
  fusi: setFusi,
  penyakit: setPenyakit,
  talasemia: setTalasemia,
  ternakPenyakit: setTernakPenyakit,
};

const TAHAP_SET = Object.fromEntries(Object.keys(PEMBUAT).map((k) => [k, k]));

const bangun = rangkaiSetMalas(PEMBUAT, TAHAP_SET, "kodon");

export default function Mutasi3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}
