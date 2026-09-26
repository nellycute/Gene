"use client";

import * as THREE from "three";
import { BASA, MOLEKUL, SEL, type KodeBasa } from "@/lib/warna";
import type { PropsAnimasi } from "../daftar";
import { Film3D } from "./Film3D";
import { lihat, type Studio } from "./studio";
import { bolaHalus, lantaiBayang, pembuatAcak, tabung, teksturBayang } from "./bentuk";
import { bangunDNA } from "./model-dna";
import { NAIK, R_GULA, bangunDNARakit, keadaanAwal } from "./model-dna-rakit";
import { bahanNukleotida, bangunRantaiProtein, bangunRibosom, bangunUntai, lipatanAcak, type Letak } from "./model-rna";
import {
  aturLabel,
  batangTinta,
  buatJamTahap,
  label,
  labelHidup,
  pelan,
  rangkaiSet,
  v,
  type LabelHidup,
  type Set3D,
} from "./rangkai-set";

/**
 * TRANSKRIPSI — film pelajaran 1.5 (gaya 3D bergaris, §3).
 *
 *  - transkripsi: satu gen dalam bentuk tangga mendatar (untai pengode di atas,
 *    5′ di kiri; untai cetakan di bawah). RNA polimerase menempel di promotor,
 *    membuka gelembung, lalu bergerak ke kanan. RNA jingga dirangkai berpasangan
 *    dengan cetakan di dalam gelembung, lalu menjuntai keluar. Di terminator,
 *    polimerase dan RNA terlepas;
 *  - olah: pra-mRNA diberi tudung 5′, ekor poli-A, lalu intron dipotong dan
 *    ekson disambung; penyambungan alternatif menghasilkan dua mRNA;
 *  - keluar: mRNA matang melewati pori inti menuju ribosom;
 *  - bakteri: transkripsi dan translasi bersamaan di sel tanpa inti.
 */

const TAHAP_SET: Record<string, string> = { transkripsi: "transkripsi", olah: "olah", keluar: "keluar", bakteri: "bakteri" };

const bangun = rangkaiSet(
  (studio) => {
    const acak = pembuatAcak(51);
    return {
      transkripsi: setTranskripsi(studio),
      olah: setOlah(studio, acak),
      keluar: setKeluar(studio, acak),
      bakteri: setBakteri(studio, acak),
    };
  },
  TAHAP_SET,
  "transkripsi",
);

export default function Transkripsi3D(props: PropsAnimasi) {
  return <Film3D props={props} bangun={bangun} />;
}

/* ================================================================== *
 * TRANSKRIPSI — gelembung yang bergerak menyusuri gen
 * ================================================================== */

/** Untai pengode 5′→3′: promotor (0–8), gen (9–32), terminator (33–35). */
const PENGODE = "CTATAAAAGATGGCTTCCGAGACCGTAAAGTGAGCC";
const MULAI = 9;
const AKHIR = 32;
const RNA_URUT = PENGODE.slice(MULAI, AKHIR + 1).replace(/T/g, "U");
const HIBRID = 7;

function setTranskripsi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const putar = new THREE.Group();
  putar.rotation.z = Math.PI / 2;
  grup.add(putar);
  const dna = bangunDNARakit(studio, putar, PENGODE);
  const n = dna.n;
  const k = keadaanAwal(n);
  for (let i = 0; i < n; i++) {
    k.tampak[0][i] = 1;
    k.tampak[1][i] = 1;
  }
  const tengah = (n - 1) / 2;
  const LANGKAH = NAIK * 1.5;
  const x = (i: number) => (i - tengah) * LANGKAH;

  /* RNA */
  const bahan = bahanNukleotida(studio, { rna: true });
  const rna = bangunUntai(studio, grup, RNA_URUT, bahan);

  /* RNA polimerase: gumpalan ungu tembus pandang yang menyelimuti gelembung */
  const bPol = studio.bagian(["enzim", "polimerase"], MOLEKUL.enzim.warna, { garis: 0.004, tembus: 0.32 });
  const polimerase = new THREE.Group();
  grup.add(polimerase);
  const gPol = bolaHalus(1, 36, 26);
  gPol.scale(3.1, 2.5, 2.1);
  studio.tambah(bPol, gPol, polimerase);

  /* kurung penanda wilayah di bawah DNA */
  const kurung = (i0: number, i1: number, teks: string, entitas: string) => {
    const y = -2.6;
    batangTinta(studio, grup, v(x(i0) - 0.2, y, 0), v(x(i1) + 0.2, y, 0), 0.05, entitas);
    for (const i of [i0, i1]) batangTinta(studio, grup, v(x(i) + (i === i0 ? -0.2 : 0.2), y, 0), v(x(i) + (i === i0 ? -0.2 : 0.2), y + 0.3, 0), 0.05, entitas);
    label(grup, teks, 0.5, (x(i0) + x(i1)) / 2, y - 0.55);
  };
  kurung(0, MULAI - 1, "promotor", "promotor");
  kurung(MULAI, AKHIR, "gen", "gen");
  kurung(AKHIR + 1, n - 1, "terminator", "terminator");

  const lPengode = labelHidup(grup, "untai pengode  5′ → 3′", 0.42);
  const lCetak = labelHidup(grup, "untai cetakan  3′ → 5′", 0.42);
  const lPol = labelHidup(grup, "RNA polimerase", 0.45);
  const lRNA = labelHidup(grup, "RNA", 0.5);
  const l5 = labelHidup(grup, "5′", 0.42);
  grup.add(lantaiBayang(teksturBayang(), 22, 7, -3.6));

  const jamTahap = buatJamTahap();
  let c = 8;
  let buka = 0;
  let lepas = 0;
  let adaPol = 0;

  const URUT = ["utuh", "gen", "promotor", "buka", "cetakan", "jalan", "pasang", "lanjut", "ekor", "akhir", "lepas"];

  return {
    grup,
    fokus: {
      utuh: lihat(0, -0.3, 0, 23, 0, 1.42),
      gen: lihat(x(20), -0.6, 0, 19, 0, 1.42),
      promotor: lihat(x(5), 0, 0, 11, 0, 1.4),
      buka: lihat(x(7), 0, 0, 11, 0, 1.4),
      cetakan: lihat(x(8), -0.2, 0, 13, 0, 1.42),
      jalan: lihat(x(14), 0.4, 0, 15, 0, 1.4),
      pasang: lihat(x(18.5), -0.2, 0, 7, 0, 1.4),
      lanjut: lihat(x(21), 0.8, 0, 16, 0, 1.4),
      ekor: lihat(x(18), 1.8, 0, 14, 0.1, 1.38),
      akhir: lihat(x(29), 0.4, 0, 13, 0, 1.4),
      lepas: lihat(x(24), 2.4, 0, 18, 0, 1.38),
    },
    bayangan: { pusat: v(0, -1, 0), jangkauan: 12 },
    perbarui: (p, dt) => {
      const f = URUT.includes(p.fokus ?? "") ? (p.fokus as string) : "utuh";
      const t = URUT.indexOf(f);
      const jam = jamTahap(p);
      const detik = p.detik ?? 0;

      /* posisi polimerase (c = pasangan basa terdepan yang sedang disalin) */
      let sasaranC = 8;
      if (f === "promotor") sasaranC = 5;
      else if (f === "buka" || f === "cetakan") sasaranC = MULAI;
      else if (f === "jalan") sasaranC = Math.min(22, MULAI + jam * 1.3);
      else if (f === "pasang") sasaranC = 22;
      else if (f === "lanjut") sasaranC = Math.min(30, 22 + jam * 1.2);
      else if (f === "ekor") sasaranC = 30;
      else if (f === "akhir") sasaranC = Math.min(AKHIR + 0.5, 30 + jam * 1.2);
      else if (f === "lepas") sasaranC = AKHIR + 0.5;
      c = Math.abs(sasaranC - c) > 4 ? sasaranC : pelan(c, sasaranC, 3, dt);
      buka = pelan(buka, t >= URUT.indexOf("buka") && f !== "lepas" ? 1 : 0, 2.5, dt);
      lepas = pelan(lepas, f === "lepas" ? 1 : 0, 1.2, dt);
      adaPol = pelan(adaPol, t >= URUT.indexOf("promotor") ? 1 : 0, 3, dt);

      /* gelembung: pasangan di sekitar polimerase terbuka */
      for (let i = 0; i < n; i++) {
        const d = i - (c - 3);
        const w = THREE.MathUtils.clamp((6.5 - Math.abs(d)) / 1.5, 0, 1) * buka;
        k.lepas[0][i] = 0.9 * w;
        k.lepas[1][i] = 0.9 * w;
      }
      dna.perbarui(k);

      /* RNA: berpasangan dengan cetakan di dalam gelembung, lalu menjuntai ke atas-depan */
      const naik = v(0, 3.2 * lepas, 1.2 * lepas);
      const keluar = c - HIBRID;
      const titikKeluar = v(x(keluar), R_GULA - 0.9, 0);
      rna.perbarui(
        (r): Letak => {
          const i = MULAI + r;
          const m = keluar - i;
          if (m <= 0) {
            const lep = k.lepas[1][Math.max(0, Math.min(n - 1, Math.round(i)))];
            return { p: v(x(i), R_GULA - lep, 0).add(naik), ke5: v(-1, 0, 0), keBasa: v(0, -1, 0) };
          }
          /* ekor: melengkung naik dan mendekat ke penonton */
          const p = titikKeluar.clone();
          let arah = v(-1, 0, 0);
          const langkah = Math.ceil(m);
          for (let s = 1; s <= langkah; s++) {
            const bagianLangkah = s === langkah ? m - (langkah - 1) : 1;
            /* melengkung naik sedikit, lalu condong ke arah penonton — tidak keluar bingkai */
            const th = Math.min(1.05, s * 0.16);
            arah = v(-Math.cos(th), Math.sin(th) * 0.5, Math.sin(th) * 0.75).normalize();
            p.addScaledVector(arah, LANGKAH * bagianLangkah);
          }
          p.y += 0.08 * Math.sin(detik * 1.4 + r * 0.6);
          return { p: p.add(naik), ke5: arah, keBasa: v(-arah.y, arah.x, 0).normalize() };
        },
        (r) => THREE.MathUtils.clamp((c - (MULAI + r)) * buka + 0.3, 0, 1) * (f === "utuh" || f === "gen" || f === "promotor" ? 0 : 1),
      );

      polimerase.position.set(x(c - 3), 0.25 + 3.4 * lepas, 0.9 * lepas);
      polimerase.visible = adaPol * (1 - lepas) > 0.02;
      polimerase.scale.setScalar(Math.max(0.001, adaPol * (1 - 0.6 * lepas)));

      const lb = (l: LabelHidup, ya: boolean, pos: THREE.Vector3) => aturLabel(l, ya, dt, pos);
      lb(lPengode, f === "cetakan" || f === "buka", v(x(1.5), 1.55, 0.3));
      lb(lCetak, f === "cetakan", v(x(1.5), -1.65, 0.3));
      lb(lPol, f === "promotor" || f === "jalan" || f === "akhir", v(x(c - 3), 3.1, 0.3));
      const ujung5 = rna.nukleotida[0].position;
      lb(lRNA, f === "ekor" || f === "lanjut" || f === "lepas", ujung5.clone().add(v(-0.6, 0.7, 0)));
      lb(l5, f === "ekor" || f === "jalan", ujung5.clone().add(v(0.3, 0.5, 0)));
    },
  };
}

/* ================================================================== *
 * OLAH — tudung, ekor, penyambungan
 * ================================================================== */

type Ruas = { grup: THREE.Group; panjang: number; ekson: boolean; nomor: number };

function ruasRNA(studio: Studio, induk: THREE.Object3D, panjang: number, ekson: boolean, nomor: number, acak: () => number): Ruas {
  const g = new THREE.Group();
  induk.add(g);
  const tanda = ekson ? ["rna", "mrna", "ekson"] : ["rna", "intron"];
  const bRangka = studio.bagian(tanda, MOLEKUL.rna.warna, { garis: 0.003 });
  studio.tambah(bRangka, tabung([v(0, 0, 0), v(panjang, 0, 0)], ekson ? 0.2 : 0.1, 12, 10), g);
  const huruf = ["A", "U", "G", "C"] as const;
  for (let xx = 0.25; xx < panjang; xx += 0.42) {
    const b = huruf[Math.floor(acak() * 4)] as KodeBasa;
    const m = new THREE.CylinderGeometry(0.07, 0.07, 0.42, 8);
    m.translate(xx, -0.3, 0);
    studio.tambah(studio.bagian([`basa${b}`, ...tanda.slice(1)], BASA[b].warna, { garis: 0.003 }), m, g);
  }
  return { grup: g, panjang, ekson, nomor };
}

function setOlah(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const SUSUNAN: [number, boolean, number][] = [
    [2.8, true, 1],
    [2.4, false, 1],
    [2.4, true, 2],
    [3.0, false, 2],
    [2.4, true, 3],
    [2.0, false, 3],
    [2.8, true, 4],
  ];
  const baris = new THREE.Group();
  grup.add(baris);
  const ruas = SUSUNAN.map(([p, e, no]) => ruasRNA(studio, baris, p, e, no, acak));
  const total = SUSUNAN.reduce((j, [p]) => j + p, 0);
  const x0 = -total / 2;
  const totalEkson = SUSUNAN.filter(([, e]) => e).reduce((j, [p]) => j + p, 0);

  /* tudung 5′: guanin termodifikasi */
  const bTudung = studio.bagian(["tudung", "basaG"], BASA.G.warna, { garis: 0.004 });
  const tudung = new THREE.Group();
  baris.add(tudung);
  studio.tambah(bTudung, bolaHalus(0.42, 20, 14), tudung);
  const metil = bolaHalus(0.15, 12, 8);
  metil.translate(-0.3, 0.3, 0.1);
  studio.tambah(bTudung, metil, tudung);

  /* ekor poli-A */
  const bEkor = studio.bagian(["ekor", "basaA"], BASA.A.warna, { garis: 0.003 });
  const ekor = Array.from({ length: 14 }, () => studio.tambah(bEkor, bolaHalus(0.17, 12, 8), baris));

  /* spliseosom di tiap intron */
  const bSplis = studio.bagian(["enzim", "spliseosom"], MOLEKUL.enzim.warna, { garis: 0.004, tembus: 0.7 });
  const splis = ruas.filter((r) => !r.ekson).map(() => studio.tambah(bSplis, bolaHalus(0.75, 20, 14), baris));

  /* label */
  const lEkson = ruas.filter((r) => r.ekson).map((r) => labelHidup(grup, `ekson ${r.nomor}`, 0.4));
  const lIntron = ruas.filter((r) => !r.ekson).map(() => labelHidup(grup, "intron", 0.38));
  const lTudung = labelHidup(grup, "tudung 5′", 0.42);
  const lEkor = labelHidup(grup, "ekor poli-A", 0.42);
  const lPra = labelHidup(grup, "pra-mRNA", 0.5);
  const lMatang = labelHidup(grup, "mRNA matang", 0.5);

  /* penyambungan alternatif: baris kedua tanpa ekson 2, dan protein hasilnya */
  const baris2 = new THREE.Group();
  baris2.position.y = -3.2;
  grup.add(baris2);
  const alt = [
    [2.8, 1],
    [2.4, 3],
    [2.8, 4],
  ].map(([p, no]) => ruasRNA(studio, baris2, p, true, no, acak));
  let xa = -totalEkson / 2;
  for (const r of alt) {
    r.grup.position.x = xa;
    xa += r.panjang;
  }
  const tudung2 = studio.tambah(bTudung, bolaHalus(0.42, 20, 14), baris2);
  tudung2.position.set(-totalEkson / 2 - 0.4, 0, 0);
  for (let i = 0; i < 10; i++) studio.tambah(bEkor, bolaHalus(0.17, 12, 8), baris2).position.set(xa + 0.3 + i * 0.34, 0, 0);
  const lAlt = [labelHidup(grup, "mRNA 1 · ekson 1-2-3-4", 0.42), labelHidup(grup, "mRNA 2 · ekson 1-3-4", 0.42)];
  const protein1 = new THREE.Group();
  const protein2 = new THREE.Group();
  grup.add(protein1, protein2);
  bangunRantaiProtein(studio, protein1, lipatanAcak(v(0, 0, 0), 0.8, 14, 0.5, acak), 0.16);
  bangunRantaiProtein(studio, protein2, lipatanAcak(v(0, 0, 0), 0.65, 10, 0.5, acak), 0.16);
  protein1.position.set(totalEkson / 2 + 3.4, 0, 0);
  protein2.position.set(totalEkson / 2 + 3.4, -3.2, 0);
  let nilaiAlt = 0;

  const URUT = ["pra", "tudung", "ekor", "olahUtuh", "potong", "sambung", "alternatif"];
  let nilaiTudung = 0;
  let nilaiEkor = 0;
  let potong = 0;
  let sambung = 0;
  const jamTahap = buatJamTahap();

  return {
    grup,
    fokus: {
      utuh: lihat(0, -0.6, 0, 21, 0, 1.42),
      pra: lihat(0, 0, 0, 20, 0, 1.42),
      tudung: lihat(x0 + 0.5, 0, 0, 9, -0.1, 1.38),
      ekor: lihat(-x0 + 1.5, 0, 0, 10, 0.1, 1.38),
      olahUtuh: lihat(0, 0, 0, 20, 0, 1.42),
      potong: lihat(0, 0.8, 0, 18, 0, 1.4),
      sambung: lihat(-1, 0, 0, 18, 0, 1.42),
      alternatif: lihat(1, -1.6, 0, 20, 0, 1.42),
    },
    bayangan: { pusat: v(0, -4, 0), jangkauan: 12 },
    perbarui: (p, dt) => {
      const f = URUT.includes(p.fokus ?? "") ? (p.fokus as string) : "pra";
      const t = URUT.indexOf(f);
      const jam = jamTahap(p);
      const detik = p.detik ?? 0;
      nilaiTudung = pelan(nilaiTudung, t >= 1 ? 1 : 0, 3, dt);
      nilaiEkor = f === "ekor" ? Math.min(1, jam / 3) : pelan(nilaiEkor, t >= 2 ? 1 : 0, 3, dt);
      potong = pelan(potong, t >= 4 ? 1 : 0, 1.4, dt);
      sambung = f === "sambung" || f === "alternatif" ? pelan(sambung, 1, 1.2, dt) : pelan(sambung, 0, 3, dt);
      nilaiAlt = pelan(nilaiAlt, f === "alternatif" ? 1 : 0, 2, dt);

      /* susun ruas: sebelum disambung berurutan; saat disambung ekson merapat */
      let xLepas = x0;
      let xRapat = -totalEkson / 2;
      let iIntron = 0;
      let iEkson = 0;
      for (const r of ruas) {
        const xs = r.ekson ? THREE.MathUtils.lerp(xLepas, xRapat, sambung) : xLepas;
        r.grup.position.set(xs, 0, 0);
        if (r.ekson) {
          aturLabel(lEkson[iEkson++], t >= 3, dt, v(xs + r.panjang / 2, 0.9, 0.2));
          xRapat += r.panjang;
        } else {
          /* intron terangkat membentuk lengkung lalu hilang */
          const s = Math.max(0.001, 1 - sambung);
          r.grup.position.y = 1.2 * potong;
          r.grup.scale.setScalar(s);
          r.grup.visible = s > 0.03;
          const sp = splis[iIntron];
          sp.position.set(xLepas + r.panjang / 2, 0.6 + 0.9 * potong, 0.2);
          const nilaiSp = THREE.MathUtils.clamp(potong * 2 - sambung * 2, 0, 1);
          sp.visible = nilaiSp > 0.02;
          sp.scale.setScalar(Math.max(nilaiSp, 0.001));
          aturLabel(lIntron[iIntron], (t === 3 || t === 4) && sambung < 0.2, dt, v(xLepas + r.panjang / 2, 1.1 + 1.3 * potong, 0.2));
          iIntron++;
        }
        xLepas += r.panjang;
      }
      const xKiri = THREE.MathUtils.lerp(x0, -totalEkson / 2, sambung);
      const xKanan = THREE.MathUtils.lerp(x0 + total, totalEkson / 2, sambung);
      tudung.position.set(xKiri - 0.4, 0, 0);
      tudung.visible = nilaiTudung > 0.02;
      tudung.scale.setScalar(Math.max(nilaiTudung, 0.001));
      ekor.forEach((b, i) => {
        const ada = THREE.MathUtils.clamp(nilaiEkor * ekor.length - i, 0, 1);
        b.visible = ada > 0.02;
        b.scale.setScalar(Math.max(ada, 0.001));
        b.position.set(xKanan + 0.3 + i * 0.34, 0.12 * Math.sin(detik * 2 + i * 0.7), 0);
      });
      aturLabel(lTudung, t >= 1 && t <= 3, dt, v(xKiri - 0.4, 1.0, 0.3));
      aturLabel(lEkor, t >= 2 && t <= 3, dt, v(xKanan + 2.5, 0.8, 0.3));
      aturLabel(lPra, t <= 2, dt, v(0, 2.2, 0));
      aturLabel(lMatang, f === "sambung", dt, v(0, 2.2, 0));

      /* baris alternatif */
      baris.position.y = 0;
      baris2.visible = nilaiAlt > 0.02;
      baris2.scale.setScalar(Math.max(nilaiAlt, 0.001));
      for (const g of [protein1, protein2]) {
        g.visible = nilaiAlt > 0.02;
        g.scale.setScalar(Math.max(nilaiAlt, 0.001));
        g.rotation.y = detik * 0.4;
      }
      aturLabel(lAlt[0], f === "alternatif", dt, v(-totalEkson / 2 - 1, 1.6, 0.3));
      aturLabel(lAlt[1], f === "alternatif", dt, v(-totalEkson / 2 - 1, -1.8, 0.3));
    },
  };
}

/* ================================================================== *
 * KELUAR — mRNA matang lewat pori inti menuju ribosom
 * ================================================================== */

function setKeluar(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const { bagian, tambah } = studio;
  const PUSAT_INTI = v(9.5, 0, 0);
  for (const [r, tembus] of [
    [6.5, 0.22],
    [6.2, 0.16],
  ] as const) {
    tambah(bagian("membranInti", SEL.membranInti.warna, { tembus, garis: 0.003, sisi: THREE.DoubleSide }), bolaHalus(r, 48, 32), grup).position.copy(PUSAT_INTI);
  }
  const pori = new THREE.TorusGeometry(0.75, 0.22, 12, 32);
  pori.rotateY(Math.PI / 2);
  pori.translate(PUSAT_INTI.x - 6.35, 0, 0);
  tambah(bagian("membranInti", SEL.membranInti.warna, { garis: 0.004 }), pori, grup);

  const ribo = new THREE.Group();
  ribo.position.set(-5.2, 0, 0);
  ribo.scale.setScalar(0.8);
  grup.add(ribo);
  bangunRibosom(studio, ribo, acak, { tembusBesar: 0.55 });

  const URUT = "AUGGCUUCCGAGACCGUAAAGUGA";
  const mrna = bangunUntai(studio, grup, URUT, bahanNukleotida(studio, { rna: true, entitas: ["mrna"] }));
  const bTudung = bagian(["tudung", "basaG", "mrna"], BASA.G.warna, { garis: 0.004 });
  const tudung = tambah(bTudung, bolaHalus(0.35, 18, 12), grup);
  const bEkor = bagian(["ekor", "basaA", "mrna"], BASA.A.warna, { garis: 0.003 });
  const ekor = Array.from({ length: 8 }, () => tambah(bEkor, bolaHalus(0.15, 12, 8), grup));
  const jalan = new THREE.CatmullRomCurve3([v(8, -1.2, 0.3), v(5.5, -0.5, 0.3), v(3.2, 0, 0), v(0, 0.6, 0), v(-3.2, 0.15, 0), v(-5.2, 0.05, 0), v(-9.5, 0.05, 0)]);
  const L = jalan.getLength();
  let maju = 0;
  label(grup, "inti", 0.6, 9.5, 7.1);
  label(grup, "pori inti", 0.45, 3.1, 1.6, 0.6);
  label(grup, "ribosom", 0.5, -5.2, 3.4);
  label(grup, "sitoplasma", 0.5, -1.2, -3.2);

  return {
    grup,
    fokus: {
      utuh: lihat(2, 0, 0, 24, 0, 1.42),
      pori: lihat(3.1, 0.2, 0, 11, -0.3, 1.34),
      ribosom: lihat(-2.4, 0.4, 0, 13, -0.1, 1.38),
    },
    bayangan: { pusat: v(2, -4, 0), jangkauan: 14 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      maju = pelan(maju, p.fokus === "ribosom" ? 0.9 : 0.55, 0.6, dt);
      const kepala = maju * L;
      const pada = (s: number) => THREE.MathUtils.clamp(s / L, 0, 1);
      mrna.perbarui(
        (i) => {
          const s = pada(kepala - (i + 1) * 0.6);
          const pos = jalan.getPointAt(s);
          pos.y += 0.05 * Math.sin(t * 1.5 + i * 0.7);
          return { p: pos, ke5: jalan.getTangentAt(s), keBasa: v(0, -1, 0) };
        },
        (i) => (kepala - (i + 1) * 0.6 > 0 ? 1 : 0),
      );
      tudung.position.copy(jalan.getPointAt(pada(kepala)));
      ekor.forEach((b, i) => {
        const s = kepala - (URUT.length + 1 + i * 0.55) * 0.6;
        b.visible = s > 0;
        b.position.copy(jalan.getPointAt(pada(s)));
        b.position.y += 0.1 * Math.sin(t * 2 + i);
      });
      ribo.rotation.y = 0.12 * Math.sin(t * 0.5);
    },
  };
}

/* ================================================================== *
 * BAKTERI — transkripsi dan translasi bersamaan
 * ================================================================== */

function setBakteri(studio: Studio, acak: () => number): Set3D {
  const grup = new THREE.Group();
  const rebah = new THREE.Group();
  rebah.rotation.z = Math.PI / 2;
  rebah.position.y = 2.2;
  grup.add(rebah);
  bangunDNA(studio, rebah, "ATGCGTACCGATTAGCATGCAATCGGCTAAGCTTACGGATCCGTAAGC");

  const pol = studio.tambah(
    studio.bagian(["enzim", "polimerase"], MOLEKUL.enzim.warna, { garis: 0.004, tembus: 0.6 }),
    (() => {
      const g = bolaHalus(1, 28, 20);
      g.scale(1.8, 1.5, 1.4);
      return g;
    })(),
    grup,
  );
  pol.position.set(3, 2.2, 0);

  /* RNA menjuntai dari polimerase, sudah ditempeli ribosom-ribosom kecil */
  const titik: THREE.Vector3[] = [];
  for (let i = 0; i <= 30; i++) {
    const u = i / 30;
    titik.push(v(3 - u * 8, 1.1 - 3.2 * Math.sin(u * Math.PI * 0.55) - u * 0.4, 0.4 * Math.sin(u * 6)));
  }
  studio.tambah(studio.bagian(["rna", "mrna"], MOLEKUL.rna.warna, { garis: 0.003 }), tabung(titik, 0.12, 120, 8), grup);
  const kurva = new THREE.CatmullRomCurve3(titik);
  const ribo = [0.3, 0.55, 0.8].map((u) => {
    const g = new THREE.Group();
    g.position.copy(kurva.getPoint(u));
    g.scale.setScalar(0.3);
    grup.add(g);
    bangunRibosom(studio, g, acak);
    return g;
  });
  label(grup, "DNA bakteri", 0.5, -5.5, 3.7);
  label(grup, "RNA polimerase", 0.45, 3, 4.1);
  label(grup, "ribosom sudah bekerja", 0.45, -1.8, -2.9);
  grup.add(lantaiBayang(teksturBayang(), 18, 7, -3.6));

  return {
    grup,
    fokus: { utuh: lihat(-1, 0.5, 0, 17, 0, 1.38) },
    bayangan: { pusat: v(-1, -1, 0), jangkauan: 10 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      rebah.rotation.x = t * 0.5;
      ribo.forEach((g, i) => {
        g.rotation.y = 0.3 * Math.sin(t * 0.8 + i);
      });
    },
  };
}
