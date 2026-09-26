import * as THREE from "three";
import type { PropsAnimasi } from "../daftar";
import type { Pembangun } from "./Film3D";
import { lihat, type Pandangan, type Studio } from "./studio";
import { buatLabel } from "./label3d";

/**
 * RANGKAIAN SET — kerangka bersama film Tingkat 1 ke atas.
 *
 * Satu film = beberapa set (panggung kecil). `tahap` adegan/isyarat memilih
 * set, `fokus` memilih sudut kamera di dalam set. Perpindahan antar-set memakai
 * tirai studio agar mengalir, bukan berganti seperti salindia.
 */

export type Set3D = {
  grup: THREE.Group;
  fokus: Record<string, Pandangan>;
  bayangan: { pusat: THREE.Vector3; jangkauan: number };
  perbarui?: (p: PropsAnimasi, dt: number) => void;
};

export function rangkaiSet(
  buatSemua: (studio: Studio) => Record<string, Set3D>,
  tahapKeSet: Record<string, string>,
  bawaan: string,
): Pembangun {
  return (studio, baca) => {
    const semua = buatSemua(studio);
    for (const s of Object.values(semua)) {
      s.grup.visible = false;
      studio.scene.add(s.grup);
    }
    let setAktif: string | null = null;
    let setTujuan: string | null = null;
    const tampilkan = (nama: string) => {
      for (const [k, s] of Object.entries(semua)) s.grup.visible = k === nama;
      studio.aturBayangan(semua[nama].bayangan.pusat, semua[nama].bayangan.jangkauan);
      setAktif = nama;
    };

    return (dt) => {
      const p = baca();
      const namaSet = tahapKeSet[p.tahap ?? bawaan] ?? bawaan;
      const set = semua[namaSet];
      const kunciFokus = p.fokus && set.fokus[p.fokus] ? p.fokus : "utuh";
      const pandangan = set.fokus[kunciFokus] ?? set.fokus.utuh ?? lihat(0, 0, 0, 20);
      const kunci = `${p.kunci ?? ""}|${namaSet}|${kunciFokus}`;

      if (setAktif === null) {
        tampilkan(namaSet);
        setTujuan = namaSet;
        studio.tuju(pandangan, kunci);
      } else if (namaSet !== setTujuan) {
        setTujuan = namaSet;
        studio.ganti(() => {
          tampilkan(namaSet);
          studio.tuju(pandangan, kunci);
        }, 0);
      } else if (!studio.sedangBerganti) {
        studio.tuju(pandangan, kunci);
      }
      if (setAktif) semua[setAktif].perbarui?.(p, dt);
      return { sorot: p.sorot ?? [], detik: p.detik ?? 0 };
    };
  };
}

/* ------------------------------------------------------------------ *
 * Bantuan kecil yang dipakai hampir semua set
 * ------------------------------------------------------------------ */

export const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

export const mulus = (x: number) => {
  const t = THREE.MathUtils.clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
};

/** Mendekati sasaran dengan halus, tidak bergantung laju bingkai. */
export const pelan = (sekarang: number, sasaran: number, laju: number, dt: number) =>
  sekarang + (sasaran - sekarang) * (1 - Math.exp(-dt * laju));

export const ALAS = "#e4dfd5";
export const TINTA = "#5c6878";

export function alas(studio: Studio, induk: THREE.Object3D, x: number, z = 0, jari = 2.1) {
  const g = new THREE.CylinderGeometry(jari, jari + 0.25, 0.55, 48);
  g.translate(x, 0.275, z);
  studio.tambah(studio.bagian("alas", ALAS, { garis: 0.004 }), g, induk);
}

export function label(induk: THREE.Object3D, teks: string, ukuran: number, x: number, y: number, z = 0) {
  const l = buatLabel(teks, ukuran);
  l.position.set(x, y, z);
  induk.add(l);
  return l;
}

/** Label yang muncul dan memudar halus. */
export type LabelHidup = { sprite: THREE.Sprite; nilai: number };

export function labelHidup(induk: THREE.Object3D, teks: string, ukuran: number): LabelHidup {
  const sprite = buatLabel(teks, ukuran);
  sprite.visible = false;
  induk.add(sprite);
  return { sprite, nilai: 0 };
}

export function aturLabel(l: LabelHidup, tampak: boolean, dt: number, letak?: THREE.Vector3) {
  l.nilai += ((tampak ? 1 : 0) - l.nilai) * Math.min(1, dt * 5);
  l.sprite.visible = l.nilai > 0.02;
  l.sprite.material.opacity = l.nilai;
  if (letak) l.sprite.position.copy(letak);
}

/** Batang tinta dari a ke b — garis ukur, panah, penunjuk. */
export function batangTinta(studio: Studio, induk: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3, jari = 0.05, entitas = "tinta") {
  const panjang = a.distanceTo(b);
  const g = new THREE.CylinderGeometry(jari, jari, panjang, 8);
  const q = new THREE.Quaternion().setFromUnitVectors(v(0, 1, 0), b.clone().sub(a).normalize());
  g.applyMatrix4(new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(0.5), q, v(1, 1, 1)));
  return studio.tambah(studio.bagian(entitas, TINTA, { garis: false }), g, induk, false);
}

/** Panah tinta melengkung melewati titik-titik, dengan kepala kerucut di ujung. */
export function panah(studio: Studio, induk: THREE.Object3D, titik: THREE.Vector3[], jari = 0.09, entitas = "tinta") {
  const kurva = new THREE.CatmullRomCurve3(titik);
  const bahan = studio.bagian(entitas, TINTA, { garis: false });
  const g = new THREE.Group();
  induk.add(g);
  studio.tambah(bahan, new THREE.TubeGeometry(kurva, 60, jari, 8), g, false);
  const ujung = kurva.getPoint(1);
  const arah = kurva.getTangent(1).normalize();
  const kepala = new THREE.ConeGeometry(jari * 3, jari * 7, 14);
  kepala.applyMatrix4(
    new THREE.Matrix4().compose(ujung.clone().addScaledVector(arah, jari * 2), new THREE.Quaternion().setFromUnitVectors(v(0, 1, 0), arah), v(1, 1, 1)),
  );
  studio.tambah(bahan, kepala, g, false);
  return g;
}

/**
 * Jam tahap: detik film sejak `fokus` (atau tahap) terakhir BERGANTI. Berbeda
 * dengan `sejak`, jam ini tidak kembali ke nol saat isyarat berikutnya memakai
 * fokus yang sama — jadi gerakan panjang tidak mengulang dari awal di tengah
 * kalimat. Lompatan garis waktu disamakan dengan `sejak`.
 */
export function buatJamTahap() {
  let kunci = "";
  let jam = 0;
  let detikLalu = 0;
  return (p: PropsAnimasi) => {
    const k = `${p.tahap ?? ""}|${p.fokus ?? ""}`;
    const detik = p.detik ?? 0;
    const beda = detik - detikLalu;
    if (k !== kunci) {
      kunci = k;
      jam = p.sejakFokus ?? p.sejak ?? 0;
    } else if (beda < 0 || beda > 1) {
      jam = p.sejakFokus ?? p.sejak ?? 0;
    } else {
      jam += beda;
    }
    detikLalu = detik;
    return jam;
  };
}

/**
 * Seperti rangkaiSet, tetapi tiap set baru DIBANGUN saat pertama kali dipakai.
 * Dipakai film satu-tingkat (misalnya semua pelajaran Mendel berbagi satu
 * film): pelajaran 2.1 tidak perlu membangun set milik 2.6. Pembangunan
 * terjadi di balik tirai perpindahan set, jadi tidak terlihat.
 */
export function rangkaiSetMalas(
  pembuat: Record<string, (studio: Studio) => Set3D>,
  tahapKeSet: Record<string, string>,
  bawaan: string,
): Pembangun {
  return (studio, baca) => {
    const jadi: Record<string, Set3D> = {};
    const ambil = (nama: string) => {
      if (!jadi[nama]) {
        const s = pembuat[nama](studio);
        s.grup.visible = false;
        studio.scene.add(s.grup);
        jadi[nama] = s;
      }
      return jadi[nama];
    };
    let setAktif: string | null = null;
    let setTujuan: string | null = null;
    const tampilkan = (nama: string) => {
      for (const [k, s] of Object.entries(jadi)) s.grup.visible = k === nama;
      const s = ambil(nama);
      s.grup.visible = true;
      studio.aturBayangan(s.bayangan.pusat, s.bayangan.jangkauan);
      setAktif = nama;
    };

    return (dt) => {
      const p = baca();
      const namaSet = tahapKeSet[p.tahap ?? ""] ?? bawaan;
      const set = ambil(namaSet);
      const kunciFokus = p.fokus && set.fokus[p.fokus] ? p.fokus : "utuh";
      const pandangan = set.fokus[kunciFokus] ?? set.fokus.utuh ?? lihat(0, 0, 0, 20);
      const kunci = `${p.kunci ?? ""}|${namaSet}|${kunciFokus}`;

      if (setAktif === null) {
        tampilkan(namaSet);
        setTujuan = namaSet;
        studio.tuju(pandangan, kunci);
      } else if (namaSet !== setTujuan) {
        setTujuan = namaSet;
        studio.ganti(() => {
          tampilkan(namaSet);
          studio.tuju(pandangan, kunci);
        }, 0);
      } else if (!studio.sedangBerganti) {
        studio.tuju(pandangan, kunci);
      }
      if (setAktif) jadi[setAktif].perbarui?.(p, dt);
      return { sorot: p.sorot ?? [], detik: p.detik ?? 0 };
    };
  };
}
