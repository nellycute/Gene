import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { BASA, MOLEKUL, type KodeBasa } from "@/lib/warna";
import type { Bagian, Studio } from "./studio";
import { bolaHalus } from "./bentuk";

/**
 * DNA YANG BISA DIRAKIT — model pelajaran 1.2 (Struktur DNA).
 *
 * Berbeda dengan model-dna.ts (heliks jadi, satu potong), di sini setiap
 * nukleotida adalah benda sendiri: gugus fosfat, gula deoksiribosa (segi lima),
 * dan basa (purin = cincin ganda, pirimidin = cincin tunggal). Letak semuanya
 * dihitung ulang setiap bingkai dari beberapa angka keadaan, jadi film bisa
 * menampilkan satu nukleotida, menyambungnya menjadi untai, mendatangkan untai
 * pasangannya, memilin tangga menjadi heliks, lalu membukanya seperti ritsleting
 * — semuanya dengan gerakan yang mengalir.
 *
 * Skala: 1 satuan = 1 nm. Lebar heliks 2 nm, jarak antarpasangan basa 0,34 nm,
 * 10 pasang basa per putaran. Pilinan PUTAR KANAN (bentuk B): menurun sepanjang
 * sumbu, sudutnya berkurang — sama dengan naik sambil memutar ke kiri-ke-kanan
 * seperti sekrup biasa.
 *
 * Untai 0 berjalan 5′ (atas) → 3′ (bawah); untai 1 antiparalel, 5′ di bawah.
 * Karena itu fosfat untai 0 berada DI ATAS gulanya, fosfat untai 1 DI BAWAH,
 * dan ujung segi lima gula (letak oksigen cincin) menunjuk ke arah 5′.
 */

export const NAIK = 0.34;
const R_FOSFAT = 1.0;
export const R_GULA = 0.74;
export const R_BASA = 0.56;
export const CELAH = 0.13;
/** Purin lebih panjang dari pirimidin; jumlah keduanya selalu selebar satu anak tangga. */
export const PORSI_PURIN = 0.6;
const LANGKAH = Math.PI / 5;
const LEBAR_BASA = 0.17;
const TEBAL_BASA = 0.075;

export const PASANGAN: Record<KodeBasa, KodeBasa> = { A: "T", T: "A", G: "C", C: "G", U: "A" };
export const adalahPurin = (b: KodeBasa) => b === "A" || b === "G";

/** Keadaan seluruh molekul — diubah halus oleh film setiap bingkai. */
export type KeadaanDNA = {
  /** 0..1 per nukleotida: [untai 0, untai 1]. */
  tampak: [number[], number[]];
  /** Dorongan keluar (nm) per nukleotida — untai datang dari jauh, atau ritsleting dibuka. */
  lepas: [number[], number[]];
  /** 0 = nukleotida terpisah renggang, 1 = bersambung rapat. */
  sambung: number;
  /** 0 = tangga lurus, 1 = heliks ganda. */
  pilin: number;
  /** Sudut awal pilinan (radian) — agar tangga menghadap kamera. */
  sudut: number;
};

export function keadaanAwal(n: number): KeadaanDNA {
  return {
    tampak: [Array(n).fill(0), Array(n).fill(0)],
    lepas: [Array(n).fill(0), Array(n).fill(0)],
    sambung: 1,
    pilin: 0,
    sudut: 0,
  };
}

/* ------------------------------------------------------------------ *
 * Bentuk dasar — dibuat sekali, dipakai bersama semua nukleotida
 * ------------------------------------------------------------------ */

export function bentukFosfat() {
  /* fosfor di tengah, empat oksigen di sudut limas */
  const bagianBagian = [bolaHalus(0.12, 16, 12)];
  const arah = [
    [1, 1, 1],
    [-1, -1, 1],
    [-1, 1, -1],
    [1, -1, -1],
  ];
  for (const [x, y, z] of arah) {
    const o = bolaHalus(0.062, 10, 8);
    const d = new THREE.Vector3(x, y, z).normalize().multiplyScalar(0.125);
    o.translate(d.x, d.y, d.z);
    bagianBagian.push(o);
  }
  return mergeGeometries(bagianBagian);
}

export function bentukGula() {
  const s = new THREE.Shape();
  for (let k = 0; k < 5; k++) {
    const a = Math.PI / 2 + (k * Math.PI * 2) / 5;
    const x = 0.16 * Math.cos(a);
    const y = 0.16 * Math.sin(a);
    if (k === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, {
    depth: 0.07,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 1,
  });
  g.translate(0, 0, -0.035);
  return g;
}

/** Cincin segi-n: x dalam satuan panjang basa (0..1), y dalam nm. */
function cincin(pusatX: number, jariX: number, jariY: number, sisi: number, putar = 0) {
  const s = new THREE.Shape();
  for (let k = 0; k < sisi; k++) {
    const a = putar + (k * Math.PI * 2) / sisi;
    const x = pusatX + jariX * Math.cos(a);
    const y = jariY * Math.sin(a);
    if (k === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  s.closePath();
  return s;
}

/**
 * Basa memanjang di sumbu +x dari titik tempel (x = 0) sampai ujung dalam
 * (x = 1); skala x instans = panjang sebenarnya. Tebal di sumbu y, lebar di z.
 * Purin menempel pada gula lewat cincin segi limanya (N9), seperti aslinya.
 */
export function bentukBasa(purin: boolean) {
  const opsi = { depth: TEBAL_BASA, bevelEnabled: false };
  const potong: THREE.BufferGeometry[] = [];
  const tangkai = new THREE.Shape();
  tangkai.moveTo(0, -0.035);
  tangkai.lineTo(purin ? 0.16 : 0.24, -0.035);
  tangkai.lineTo(purin ? 0.16 : 0.24, 0.035);
  tangkai.lineTo(0, 0.035);
  tangkai.closePath();
  potong.push(new THREE.ExtrudeGeometry(tangkai, opsi));
  if (purin) {
    potong.push(new THREE.ExtrudeGeometry(cincin(0.33, 0.19, 0.15, 5, Math.PI), opsi));
    potong.push(new THREE.ExtrudeGeometry(cincin(0.7, 0.3, LEBAR_BASA, 6), opsi));
  } else {
    potong.push(new THREE.ExtrudeGeometry(cincin(0.62, 0.38, LEBAR_BASA, 6), opsi));
  }
  const g = mergeGeometries(potong);
  g.translate(0, 0, -TEBAL_BASA / 2);
  g.rotateX(-Math.PI / 2);
  return g;
}

/* ------------------------------------------------------------------ *
 * Model
 * ------------------------------------------------------------------ */

type Nukleotida = {
  basa: KodeBasa;
  fosfat: THREE.Mesh;
  gula: THREE.Mesh;
  basaMesh: THREE.Mesh;
  /** Tangkai fosfat → gula sendiri. */
  sendiri: THREE.Mesh;
  /** Gula → fosfat nukleotida berikutnya di arah 3′. */
  lanjut: THREE.Mesh | null;
};

export type DNARakit = ReturnType<typeof bangunDNARakit>;

/**
 * `urutan` = basa untai 0 dari ujung 5′ (atas). Untai 1 otomatis pasangannya.
 * `bagianTambahan` memberi tanda entitas ekstra (misal "untai0") bila perlu.
 */
export function bangunDNARakit(studio: Studio, induk: THREE.Object3D, urutan: string) {
  const { bagian, tambah } = studio;
  const huruf = urutan.split("") as KodeBasa[];
  const n = huruf.length;
  const tengah = (n - 1) / 2;

  const gFosfat = bentukFosfat();
  const gGula = bentukGula();
  const gBatang = new THREE.CylinderGeometry(1, 1, 1, 10);
  const gPurin = bentukBasa(true);
  const gPirimidin = bentukBasa(false);
  const gIkatan = new THREE.CylinderGeometry(1, 1, 1, 6);

  const abu = MOLEKUL.gulaFosfat.warna;
  const bFosfat = [0, 1].map((s) => bagian(["gulaFosfat", "fosfat", `untai${s}`], abu, { garis: 0.003 }));
  const bGula = [0, 1].map((s) => bagian(["gulaFosfat", "gula", `untai${s}`], abu, { garis: 0.003 }));
  const bSambung = [0, 1].map((s) => bagian(["gulaFosfat", `untai${s}`], abu, { garis: false }));
  const bBasa = {} as Record<KodeBasa, Bagian>;
  for (const k of ["A", "T", "G", "C"] as const) {
    bBasa[k] = bagian([`basa${k}`, adalahPurin(k) ? "purin" : "pirimidin"], BASA[k].warna, { garis: 0.003 });
  }
  const bIkatan = bagian("ikatanHidrogen", MOLEKUL.ikatanHidrogen.warna, { garis: false });

  const buatNukleotida = (s: number, basa: KodeBasa): Nukleotida => ({
    basa,
    fosfat: tambah(bFosfat[s], gFosfat, induk),
    gula: tambah(bGula[s], gGula, induk),
    basaMesh: tambah(bBasa[basa], adalahPurin(basa) ? gPurin : gPirimidin, induk),
    sendiri: tambah(bSambung[s], gBatang, induk, false),
    lanjut: null,
  });
  const untai: [Nukleotida[], Nukleotida[]] = [
    huruf.map((b) => buatNukleotida(0, b)),
    huruf.map((b) => buatNukleotida(1, PASANGAN[b])),
  ];
  for (let i = 0; i < n; i++) {
    if (i < n - 1) untai[0][i].lanjut = tambah(bSambung[0], gBatang, induk, false);
    if (i > 0) untai[1][i].lanjut = tambah(bSambung[1], gBatang, induk, false);
  }
  const ikatan = huruf.map((b) =>
    Array.from({ length: b === "G" || b === "C" ? 3 : 2 }, () => tambah(bIkatan, gIkatan, induk, false)),
  );

  /* ---------- letak yang dicatat untuk label ---------- */
  const letakFosfat: [THREE.Vector3[], THREE.Vector3[]] = [huruf.map(() => new THREE.Vector3()), huruf.map(() => new THREE.Vector3())];
  const letakGula: [THREE.Vector3[], THREE.Vector3[]] = [huruf.map(() => new THREE.Vector3()), huruf.map(() => new THREE.Vector3())];
  const letakBasa: [THREE.Vector3[], THREE.Vector3[]] = [huruf.map(() => new THREE.Vector3()), huruf.map(() => new THREE.Vector3())];

  const arah = (sudut: number, keluar = new THREE.Vector3()) => keluar.set(Math.cos(sudut), 0, -Math.sin(sudut));
  const SUMBU_Y = new THREE.Vector3(0, 1, 0);
  const SUMBU_X = new THREE.Vector3(1, 0, 0);
  const q = new THREE.Quaternion();
  const q2 = new THREE.Quaternion();
  const tmp = new THREE.Vector3();
  const tmp2 = new THREE.Vector3();

  /** Letakkan batang silinder dari a ke b. */
  const pasangBatang = (m: THREE.Mesh, a: THREE.Vector3, b: THREE.Vector3, jari: number, faktor: number) => {
    const panjang = a.distanceTo(b);
    m.visible = faktor > 0.02 && panjang > 1e-4;
    if (!m.visible) return;
    m.position.copy(a).add(b).multiplyScalar(0.5);
    tmp.copy(b).sub(a).normalize();
    m.quaternion.setFromUnitVectors(SUMBU_Y, tmp);
    m.scale.set(jari * faktor, panjang, jari * faktor);
  };

  const skalakan = (m: THREE.Mesh, f: number) => {
    m.visible = f > 0.02;
    m.scale.setScalar(Math.max(f, 0.001));
  };

  const perbarui = (k: KeadaanDNA) => {
    /* Tangga (pilin 0) digambar seperti diagram buku: anak tangga lebih renggang
       dan muka basa menghadap penonton. Saat dipilin, basa berputar mendatar dan
       merapat ke 0,34 nm — seperti heliks sungguhan. */
    const jarak = (1 + 0.5 * (1 - k.pilin)) * (1 + 1.2 * (1 - k.sambung));
    const tegak = (Math.PI / 2) * (1 - k.pilin);
    const qTegak = new THREE.Quaternion().setFromAxisAngle(SUMBU_X, tegak);
    const lurus = Math.PI - k.pilin * (Math.PI / 6); // 180° → 150°: alur besar dan kecil muncul saat dipilin
    const sambungTampak = THREE.MathUtils.smoothstep(k.sambung, 0.7, 1);

    for (let i = 0; i < n; i++) {
      const y = (tengah - i) * NAIK * jarak;
      /* putar kanan: turun satu anak tangga = sudut berkurang */
      const th0 = k.sudut - k.pilin * i * LANGKAH;
      const th = [th0, th0 + lurus];
      const titikTempel = [arah(th[0]).multiplyScalar(R_BASA), arah(th[1]).multiplyScalar(R_BASA)];
      const tali = titikTempel[1].clone().sub(titikTempel[0]);
      const panjangTali = tali.length();
      tali.normalize();
      const bersih = panjangTali - CELAH;

      for (const s of [0, 1] as const) {
        const nk = untai[s][i];
        const t = k.tampak[s][i];
        const geser = arah(th[s]).multiplyScalar(k.lepas[s][i]);
        geser.y = y;
        const tanda = s === 0 ? 1 : -1;

        /* fosfat: setengah langkah ke arah 5′ */
        const thP = th[s] + tanda * k.pilin * LANGKAH * 0.5;
        const pF = letakFosfat[s][i].copy(arah(thP)).multiplyScalar(R_FOSFAT).add(geser);
        pF.y += tanda * NAIK * 0.5 * (1 + 0.5 * (1 - k.pilin));
        nk.fosfat.position.copy(pF);
        skalakan(nk.fosfat, t);

        const pG = letakGula[s][i].copy(arah(th[s])).multiplyScalar(R_GULA).add(geser);
        nk.gula.position.copy(pG);
        /* muka segi lima menghadap searah putaran (ke kamera saat berupa tangga);
           ujungnya menunjuk ke arah 5′ */
        q.setFromAxisAngle(SUMBU_Y, th[s]);
        q2.setFromAxisAngle(new THREE.Vector3(0, 0, 1), s === 0 ? 0 : Math.PI);
        nk.gula.quaternion.copy(q).multiply(q2);
        skalakan(nk.gula, t);

        pasangBatang(nk.sendiri, pF, pG, 0.05, t);

        /* basa: dari titik tempel menuju sumbu, sepanjang tali pasangan */
        const arahBasa = s === 0 ? tali : tmp2.copy(tali).negate();
        const pB = titikTempel[s].clone().add(geser);
        pB.y = y;
        nk.basaMesh.position.copy(pB);
        nk.basaMesh.quaternion.setFromUnitVectors(SUMBU_X, arahBasa).multiply(qTegak);
        const panjang = bersih * (adalahPurin(nk.basa) ? PORSI_PURIN : 1 - PORSI_PURIN);
        nk.basaMesh.visible = t > 0.02;
        nk.basaMesh.scale.set(Math.max(panjang * t, 0.001), Math.max(t, 0.001), Math.max(t, 0.001));
        letakBasa[s][i].copy(pB).addScaledVector(arahBasa, panjang * 0.6);
      }
    }

    /* sambungan antarnukleotida (ikatan fosfodiester) */
    for (let i = 0; i < n; i++) {
      const l0 = untai[0][i].lanjut;
      if (l0) pasangBatang(l0, letakGula[0][i], letakFosfat[0][i + 1], 0.05, Math.min(k.tampak[0][i], k.tampak[0][i + 1]) * sambungTampak);
      const l1 = untai[1][i].lanjut;
      if (l1) pasangBatang(l1, letakGula[1][i], letakFosfat[1][i - 1], 0.05, Math.min(k.tampak[1][i], k.tampak[1][i - 1]) * sambungTampak);
    }

    /* ikatan hidrogen: hanya bila kedua basa hadir dan berdekatan */
    for (let i = 0; i < n; i++) {
      const renggang = k.lepas[0][i] + k.lepas[1][i];
      const f = k.tampak[0][i] * k.tampak[1][i] * THREE.MathUtils.clamp(1 - renggang / 0.2, 0, 1);
      const th0 = k.sudut - k.pilin * i * LANGKAH;
      const a0 = arah(th0).multiplyScalar(R_BASA);
      const a1 = arah(th0 + lurus).multiplyScalar(R_BASA);
      const tali = a1.clone().sub(a0);
      const L = tali.length() - CELAH;
      tali.normalize();
      const purin0 = adalahPurin(huruf[i]);
      const titikCelah = a0.clone().addScaledVector(tali, L * (purin0 ? PORSI_PURIN : 1 - PORSI_PURIN));
      titikCelah.y = (tengah - i) * NAIK * jarak;
      /* ikatan berjajar searah lebar basa: mendatar di heliks, tegak di tangga */
      const samping = new THREE.Vector3()
        .crossVectors(tali, SUMBU_Y)
        .normalize()
        .multiplyScalar(Math.cos(tegak))
        .addScaledVector(SUMBU_Y, -Math.sin(tegak));
      const garis = ikatan[i];
      garis.forEach((m, j) => {
        const off = (j - (garis.length - 1) / 2) * 0.1;
        const a = titikCelah.clone().addScaledVector(samping, off).addScaledVector(tali, 0.015);
        const b = a.clone().addScaledVector(tali, CELAH - 0.03);
        pasangBatang(m, a, b, 0.017, f);
      });
    }
  };

  return {
    n,
    huruf,
    perbarui,
    letakFosfat,
    letakGula,
    letakBasa,
  };
}
