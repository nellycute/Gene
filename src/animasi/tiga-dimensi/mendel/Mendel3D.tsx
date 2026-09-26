"use client";

import type { PropsAnimasi } from "../../daftar";
import { Film3D } from "../Film3D";
import { rangkaiSetMalas } from "../rangkai-set";
import { setAlel, setBunga, setGalur, setGenerasi, setGenotip, setKebun, setPati, setTujuh } from "./set-dasar";
import { buatSetSilang, setHitung, setMeiosis, setPembuahan, setSampel, setSegregasi } from "./set-monohibrid";
import { setBalik, setKeluarga, setKoin, setPunnett, setSapi, setUji } from "./set-peluang";
import { setAsortasi, setGamet4, setGamet8, setGarpu, setHitung2, setPunnett16, setPunnett64, setRumus } from "./set-dihibrid";

/**
 * FILM PEWARISAN MENDEL — satu film untuk seluruh Tingkat 2 (2.1–2.6).
 *
 * Setiap `tahap` di naskah = satu set; set baru dibangun saat pertama kali
 * dibutuhkan (rangkaiSetMalas), jadi pelajaran 2.1 tidak ikut membangun papan
 * Punnett 8 × 8 milik 2.6. Semua warna sifat (biji, bunga, polong, bulu sapi)
 * dari SIFAT di warna.ts; kromosom ibu ungu, ayah toska seperti di Tingkat 0.
 */

const PEMBUAT = {
  kebun: setKebun,
  bunga: setBunga,
  galur: setGalur,
  tujuh: setTujuh,
  alel: setAlel,
  genotip: setGenotip,
  pati: setPati,
  generasi: setGenerasi,
  silang: buatSetSilang({ a: "RR", b: "rr", f1: "Rr", ketA: "bulat", ketB: "keriput", ketF1: "semua bulat" }),
  hitung: setHitung,
  segregasi: setSegregasi,
  pembuahan: setPembuahan,
  meiosis: setMeiosis,
  sampel: setSampel,
  punnett: setPunnett,
  koin: setKoin,
  keluarga: setKeluarga,
  uji: setUji,
  balik: setBalik,
  sapi: setSapi,
  dihibrid: buatSetSilang({ a: "RRYY", b: "rryy", f1: "RrYy", ketA: "bulat kuning", ketB: "keriput hijau", ketF1: "semua bulat kuning" }),
  hitung2: setHitung2,
  gamet4: setGamet4,
  punnett16: setPunnett16,
  asortasi: setAsortasi,
  gamet8: setGamet8,
  punnett64: setPunnett64,
  rumus: setRumus,
  garpu: setGarpu,
};

const TAHAP_SET = Object.fromEntries(Object.keys(PEMBUAT).map((k) => [k, k]));

const bangun = rangkaiSetMalas(PEMBUAT, TAHAP_SET, "kebun");

export default function Mendel3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}
