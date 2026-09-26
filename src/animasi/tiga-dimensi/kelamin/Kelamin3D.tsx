"use client";

import type { PropsAnimasi } from "../../daftar";
import { Film3D } from "../Film3D";
import { rangkaiSetMalas } from "../rangkai-set";
import { setAyrshire, setBotak, setDibatasi, setDomba, setGametXY, setPenyu, setSerangga, setSRY, setXY, setZW } from "./set-kelamin";
import { setGanda, setJarak, setLalat, setLurik, setPautan, setPeta, setPunnettX, setSilang, setTerpautX, setTigaTitik, setUjiLalat } from "./set-pautan";
import { setSilsilah, setSilsilahRatu } from "./set-silsilah";

/**
 * FILM KELAMIN DAN PAUTAN — satu film untuk seluruh Tingkat 4 (4.1–4.7).
 * Set dibangun saat pertama kali dibutuhkan.
 */

const PEMBUAT = {
  xy: setXY,
  gametXY: setGametXY,
  sry: setSRY,
  zw: setZW,
  serangga: setSerangga,
  penyu: setPenyu,
  terpautX: setTerpautX,
  punnettX: setPunnettX,
  silsilahRatu: setSilsilahRatu,
  lurik: setLurik,
  botak: setBotak,
  domba: setDomba,
  ayrshire: setAyrshire,
  dibatasi: setDibatasi,
  lalat: setLalat,
  pautan: setPautan,
  ujiLalat: setUjiLalat,
  silang: setSilang,
  jarak: setJarak,
  ganda: setGanda,
  peta: setPeta,
  tigaTitik: setTigaTitik,
  silsilah: setSilsilah,
};

const TAHAP_SET = Object.fromEntries(Object.keys(PEMBUAT).map((k) => [k, k]));

const bangun = rangkaiSetMalas(PEMBUAT, TAHAP_SET, "xy");

export default function Kelamin3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}
