"use client";

import type { PropsAnimasi } from "../../daftar";
import { Film3D } from "../Film3D";
import { rangkaiSetMalas } from "../rangkai-set";
import { bangunAyam, bangunTikusWarna, type Jengger } from "../model-hewan";
import { bangunTanaman } from "../mendel/model-mendel";
import { buatSetSilangUmum, type Benda } from "./set-silang";
import { bangunBulir, bangunLabu, bangunPerdu, type WarnaTerompet } from "./model-perluasan";
import { setBanding, setMN, setRoan } from "./set-dominansi";
import { setABO, setKeluargaABO, setKelinci, setTabelABO, setTransfusi } from "./set-abo";
import { setCreeper, setDexter, setPunnettLetal, setTikus } from "./set-letal";
import { setJalur, setJengger, setKelompok } from "./set-interaksi";
import { gradasiGandum, setKurva, setTinggi } from "./set-poligenik";

/**
 * FILM PERLUASAN HUKUM MENDEL — satu film untuk seluruh Tingkat 3 (3.1–3.7).
 *
 * Persilangan (bunga pukul empat, jengger ayam, labu, tikus, Linaria, kacang
 * manis, gandum) memakai satu kerangka P → F1 → F2 (set-silang.ts); yang lain
 * punya set sendiri. Set dibangun saat pertama kali dibutuhkan.
 */

const perdu = (w: WarnaTerompet, label: string, sub?: string, benih = 1): Benda => ({
  buat: (s, g) => {
    g.scale.setScalar(0.95);
    bangunPerdu(s, g, w, benih);
  },
  label,
  sub,
});
const ayam = (j: Jengger, label: string, sub?: string): Benda => ({
  buat: (s, g) => {
    g.rotation.y = -0.4;
    bangunAyam(s, g, { jengger: j });
  },
  label,
  sub,
});
const labu = (w: "putih" | "kuning" | "hijau", label: string, sub?: string): Benda => ({
  buat: (s, g) => {
    const l = bangunLabu(s, g, w, "bulat", 0.95);
    l.position.y = 0.85;
  },
  label,
  sub,
});
const tikus = (w: "agouti" | "hitam" | "albino", label: string, sub?: string): Benda => ({
  buat: (s, g) => {
    g.scale.setScalar(0.85);
    g.rotation.y = -0.5;
    bangunTikusWarna(s, g, w);
  },
  label,
  sub,
});
const ercis = (bunga: "ungu" | "putih", label: string, sub?: string): Benda => ({
  buat: (s, g) => {
    g.scale.setScalar(0.62);
    bangunTanaman(s, g, { bunga });
  },
  label,
  sub,
});
const bulir = (r: number, label: string, sub?: string): Benda => ({
  buat: (s, g) => bangunBulir(s, g, r),
  label,
  sub,
});

const PEMBUAT = {
  mirabilis: buatSetSilangUmum({
    induk: [perdu("merah", "merah", "RR", 1), perdu("putih", "putih", "rr", 2)],
    f1: perdu("merahMuda", "merah muda", "Rr", 3),
    f2: [
      { ...perdu("merah", "merah", "RR", 4), n: 1 },
      { ...perdu("merahMuda", "merah muda", "Rr", 5), n: 2 },
      { ...perdu("putih", "putih", "rr", 6), n: 1 },
    ],
  }),
  mn: setMN,
  roan: setRoan,
  banding: setBanding,
  abo: setABO,
  tabelABO: setTabelABO,
  keluargaABO: setKeluargaABO,
  transfusi: setTransfusi,
  kelinci: setKelinci,
  tikus: setTikus,
  punnettLetal: setPunnettLetal,
  creeper: setCreeper,
  dexter: setDexter,
  jengger: setJengger,
  silangAyam: buatSetSilangUmum({
    tinggi: 3.3,
    induk: [ayam("rose", "rose", "RRpp"), ayam("pea", "pea", "rrPP")],
    f1: ayam("walnut", "walnut", "RrPp"),
    f2: [
      { ...ayam("walnut", "walnut", "R_P_"), n: 9 },
      { ...ayam("rose", "rose", "R_pp"), n: 3 },
      { ...ayam("pea", "pea", "rrP_"), n: 3 },
      { ...ayam("single", "single", "rrpp"), n: 1 },
    ],
  }),
  labu: buatSetSilangUmum({
    tinggi: 2,
    induk: [labu("putih", "putih", "WWYY"), labu("hijau", "hijau", "wwyy")],
    f1: labu("putih", "putih", "WwYy"),
    f2: [
      { ...labu("putih", "putih", "W_ _ _"), n: 12 },
      { ...labu("kuning", "kuning", "wwY_"), n: 3 },
      { ...labu("hijau", "hijau", "wwyy"), n: 1 },
    ],
  }),
  tikusWarna: buatSetSilangUmum({
    tinggi: 1.6,
    induk: [tikus("agouti", "agouti", "AACC"), tikus("albino", "albino", "aacc")],
    f1: tikus("agouti", "agouti", "AaCc"),
    f2: [
      { ...tikus("agouti", "agouti", "A_C_"), n: 9 },
      { ...tikus("hitam", "hitam", "aaC_"), n: 3 },
      { ...tikus("albino", "albino", "_ _cc"), n: 4 },
    ],
  }),
  linaria: buatSetSilangUmum({
    induk: [perdu("merah", "merah", "AAbb", 7), perdu("putih", "putih", "aaBB", 8)],
    f1: perdu("ungu", "ungu", "AaBb", 9),
    f2: [
      { ...perdu("ungu", "ungu", "A_B_", 10), n: 9 },
      { ...perdu("merah", "merah", "A_bb", 11), n: 3 },
      { ...perdu("putih", "putih", "aa_ _", 12), n: 4 },
    ],
  }),
  kacangManis: buatSetSilangUmum({
    induk: [ercis("putih", "putih", "CCpp"), ercis("putih", "putih", "ccPP")],
    f1: ercis("ungu", "ungu", "CcPp"),
    f2: [
      { ...ercis("ungu", "ungu", "C_P_"), n: 9 },
      { ...ercis("putih", "putih", "selainnya"), n: 7 },
    ],
  }),
  jalur: setJalur,
  kelompok: setKelompok,
  gandum: buatSetSilangUmum({
    tinggi: 4.5,
    induk: [bulir(4, "merah tua", "R₁R₁R₂R₂"), bulir(0, "putih", "r₁r₁r₂r₂")],
    f1: bulir(2, "merah sedang", "R₁r₁R₂r₂"),
    f2: [
      { ...bulir(3, "merah (bertingkat)", "ada R"), n: 15 },
      { ...bulir(0, "putih", "tanpa R"), n: 1 },
    ],
    tambahan: gradasiGandum,
  }),
  kurva: setKurva,
  tinggi: setTinggi,
};

const TAHAP_SET = Object.fromEntries(Object.keys(PEMBUAT).map((k) => [k, k]));

const bangun = rangkaiSetMalas(PEMBUAT, TAHAP_SET, "mirabilis");

export default function Perluasan3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}
