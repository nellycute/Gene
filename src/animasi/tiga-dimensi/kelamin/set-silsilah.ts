import * as THREE from "three";
import { lihat, type Studio } from "../studio";
import { v, type Set3D } from "../rangkai-set";
import { lantai, papanBerdiri, tulis } from "../mendel/bantu";
import { bangunSilsilah, type Orang, type Silsilah } from "./model-kelamin";

/**
 * SET SILSILAH — pelajaran 4.2 (hemofilia keluarga Ratu Victoria) dan 4.7
 * (lambang dan pola pewarisan). Lambang hitam-putih di atas papan kertas,
 * seperti silsilah di buku genetika.
 */

/* ================================================================== *
 * Keluarga Ratu Victoria (disederhanakan)
 * ================================================================== */

export function setSilsilahRatu(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 6;
  papanBerdiri(studio, grup, 19, 11.5, 0, Y - 3.6);
  const o = (id: string, jk: "L" | "P", status: Orang["status"], x: number, gen: number, label: string): Orang => ({ id, jk, status, x, gen, label });
  const d: Silsilah = {
    orang: [
      o("albert", "L", "normal", -1, 0, "Albert"),
      o("victoria", "P", "pembawa", 1, 0, "Victoria"),
      o("edward", "L", "normal", -6.5, 1, "Edward VII"),
      o("alice", "P", "pembawa", -2.2, 1, "Alice"),
      o("leopold", "L", "sakit", 2.2, 1, "Leopold"),
      o("beatrice", "P", "pembawa", 6.5, 1, "Beatrice"),
      o("friedrich", "L", "sakit", -3.4, 2, "Friedrich"),
      o("alexandra", "P", "pembawa", -1, 2, "Alexandra"),
      o("eugenie", "P", "pembawa", 5.3, 2, "V. Eugenie"),
      o("leopoldM", "L", "sakit", 7.7, 2, "Leopold M."),
      o("alexei", "L", "sakit", -1, 3, "Alexei"),
      o("alfonso", "L", "sakit", 4.2, 3, "Alfonso"),
      o("gonzalo", "L", "sakit", 6.4, 3, "Gonzalo"),
    ],
    kawin: [["albert", "victoria"]],
    anak: [
      { ortu: ["albert", "victoria"], anak: ["edward", "alice", "leopold", "beatrice"] },
      { ortu: ["alice"], anak: ["friedrich", "alexandra"] },
      { ortu: ["beatrice"], anak: ["eugenie", "leopoldM"] },
      { ortu: ["alexandra"], anak: ["alexei"] },
      { ortu: ["eugenie"], anak: ["alfonso", "gonzalo"] },
    ],
  };
  const s = bangunSilsilah(studio, grup, d, { jarakBaris: 2.5, ukuran: 0.8, ukuranLabel: 0.46 });
  s.grup.position.set(0, Y, 0.1);
  ["I", "II", "III", "IV"].forEach((r, g) => tulis(grup, r, 0.5, -9, Y - g * 2.5, 0.2));
  tulis(grup, "■ hemofilia · ◐ pembawa", 0.55, 5.6, Y + 1.3, 0.2);
  lantai(grup, 20, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y - 3.6, 0, 19.5, 0, 1.45),
      ratu: lihat(0, Y - 1.3, 0, 12, 0, 1.45),
      cucu: lihat(1.5, Y - 5.8, 0, 13.5, 0, 1.45),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
  };
}

/* ================================================================== *
 * Lambang dan pola pewarisan (4.7)
 * ================================================================== */

type Pola = { kunci: string; judul: string; x: number; d: Silsilah; kerabat?: [string, string][] };

export function setSilsilah(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 6.4;
  const o = (id: string, jk: "L" | "P", status: Orang["status"], x: number, gen: number, label?: string): Orang => ({ id, jk, status, x, gen, label });
  const POLA: Pola[] = [
    {
      kunci: "lambang",
      judul: "lambang",
      x: -24,
      d: {
        orang: [
          o("l", "L", "normal", -2.5, 0, "laki-laki"),
          o("p", "P", "normal", 2.5, 0, "perempuan"),
          o("ls", "L", "sakit", -2.5, 1, "menampakkan"),
          o("pp", "P", "pembawa", 2.5, 1, "pembawa"),
          o("a1", "L", "normal", -1.5, 2.6),
          o("a2", "P", "normal", 0, 2.6),
          o("a3", "L", "normal", 1.5, 2.6),
        ],
        kawin: [["ls", "pp"]],
        anak: [{ ortu: ["ls", "pp"], anak: ["a1", "a2", "a3"] }],
      },
    },
    {
      kunci: "ad",
      judul: "autosom dominan",
      x: -9,
      d: {
        orang: [
          o("i1", "L", "sakit", -1.2, 0),
          o("i2", "P", "normal", 1.2, 0),
          o("s0", "L", "normal", -6, 1),
          o("ii1", "P", "sakit", -3.6, 1),
          o("ii2", "L", "normal", -1.2, 1),
          o("ii3", "L", "sakit", 1.2, 1),
          o("ii4", "P", "normal", 3.6, 1),
          o("iii1", "L", "sakit", -6, 2),
          o("iii2", "P", "normal", -3.6, 2),
        ],
        kawin: [
          ["i1", "i2"],
          ["s0", "ii1"],
        ],
        anak: [
          { ortu: ["i1", "i2"], anak: ["ii1", "ii2", "ii3", "ii4"] },
          { ortu: ["s0", "ii1"], anak: ["iii1", "iii2"] },
        ],
      },
    },
    {
      kunci: "ar",
      judul: "autosom resesif",
      x: 5,
      d: {
        orang: [
          o("i1", "L", "pembawa", -1.2, 0),
          o("i2", "P", "pembawa", 1.2, 0),
          o("ii1", "L", "normal", -3.6, 1),
          o("ii2", "P", "sakit", -1.2, 1),
          o("ii3", "L", "pembawa", 1.2, 1),
          o("ii4", "P", "normal", 3.6, 1),
        ],
        kawin: [["i1", "i2"]],
        anak: [{ ortu: ["i1", "i2"], anak: ["ii1", "ii2", "ii3", "ii4"] }],
      },
    },
    {
      kunci: "xr",
      judul: "terpaut X resesif",
      x: 19,
      d: {
        orang: [
          o("i1", "L", "sakit", -1.2, 0, "kakek"),
          o("i2", "P", "normal", 1.2, 0),
          o("ii1", "L", "normal", -2.4, 1),
          o("ii2", "P", "pembawa", 0, 1, "ibu"),
          o("ii3", "L", "normal", 2.4, 1),
          o("iii1", "L", "sakit", -1.2, 2, "cucu"),
          o("iii2", "P", "pembawa", 1.2, 2),
          o("iii3", "L", "normal", 3.6, 2),
        ],
        kawin: [
          ["i1", "i2"],
          ["ii2", "ii3"],
        ],
        anak: [
          { ortu: ["i1", "i2"], anak: ["ii1", "ii2"] },
          { ortu: ["ii2", "ii3"], anak: ["iii1", "iii2", "iii3"] },
        ],
      },
    },
    {
      kunci: "ternak",
      judul: "ternak: kawin sedarah",
      x: 33,
      d: {
        orang: [
          o("d1", "P", "pembawa", -3.6, 0, "induk 1"),
          o("s", "L", "pembawa", 0, 0, "pejantan"),
          o("d2", "P", "normal", 3.6, 0, "induk 2"),
          o("a", "L", "pembawa", -1.8, 1),
          o("b", "P", "pembawa", 1.8, 1),
          o("c", "L", "sakit", 0, 2, "anak: homozigot"),
        ],
        kawin: [
          ["d1", "s"],
          ["s", "d2"],
          ["a", "b"],
        ],
        anak: [
          { ortu: ["d1", "s"], anak: ["a"] },
          { ortu: ["s", "d2"], anak: ["b"] },
          { ortu: ["a", "b"], anak: ["c"] },
        ],
      },
      kerabat: [["a", "b"]],
    },
  ];
  const fokus: Set3D["fokus"] = {};
  for (const p of POLA) {
    const g = new THREE.Group();
    g.position.x = p.x;
    grup.add(g);
    papanBerdiri(studio, g, 12.5, 9.5, 0, Y - 2.4);
    const s = bangunSilsilah(studio, g, p.d, { jarakBaris: 2.5, ukuran: 0.85, ukuranLabel: 0.48, kerabat: p.kerabat });
    s.grup.position.set(0, Y, 0.1);
    tulis(g, p.judul, 0.65, 0, Y + 1.5, 0.2);
    ["I", "II", "III"].slice(0, 1 + Math.max(...p.d.orang.map((x) => Math.ceil(x.gen)))).forEach((r, k) => tulis(g, r, 0.45, -5.6, Y - k * 2.5, 0.2));
    fokus[p.kunci] = lihat(p.x, Y - 2, 0, 17.5, 0, 1.45);
  }
  /* garis ganda perkawinan kerabat diberi keterangan */
  tulis(grup, "garis ganda: perkawinan kerabat", 0.42, 33, Y - 1.9, 0.3);
  fokus.utuh = lihat(5, Y - 2.4, 0, 34, 0, 1.45);
  lantai(grup, 70, 5, 5);
  return {
    grup,
    fokus,
    bayangan: { pusat: v(5, 0, 0), jangkauan: 30 },
  };
}
