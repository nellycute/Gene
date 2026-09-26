import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { BASA, MOLEKUL, ronaTerang, type KodeBasa } from "@/lib/warna";
import type { Bagian, Studio } from "./studio";
import { bolaHalus, tabung } from "./bentuk";
import { batang } from "./model-dna";
import { bentukEnzim } from "./model-mikroba";

/**
 * GARPU REPLIKASI — model pelajaran 1.4.
 *
 * Skema tiga dimensi yang disederhanakan: heliks induk berpilin ke kanan di
 * sebelah kanan, garpu di x = GARPU, dua untai cetakan lurus ke kiri. Untai
 * baru tumbuh di antara keduanya:
 *  - atas = untai maju, bersambung ke arah garpu (5′ di kiri);
 *  - bawah = untai lambat, fragmen Okazaki menjauhi garpu (5′ di sisi garpu).
 * Setiap fragmen (dan untai maju) dimulai dengan primer RNA — rangka jingga,
 * dan basa U di tempat T — yang kemudian diganti DNA lalu disambung ligase.
 *
 * Warna: rangka untai lama kelabu (rangka gula-fosfat), rangka untai baru
 * kelabu muda (rona terang warna yang sama — bahannya memang sama), primer
 * jingga (RNA), semua enzim ungu dengan label.
 */

export const GARPU = 4;
/** Kelipatan FRAGMEN, agar setiap fragmen Okazaki utuh. */
export const N = 24;
export const DX = 0.5;
export const FRAGMEN = 6;
const Y_CETAK = 1.6;
const Y_BARU = 0.5;
const PANJANG_BASA = 0.5;
const PANJANG_INDUK = 8;

export const xNukleotida = (k: number) => GARPU - 0.8 - k * DX;

const PASANG: Record<string, KodeBasa> = { A: "T", T: "A", G: "C", C: "G" };
const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

export type KeadaanGarpu = {
  /** Jumlah nukleotida untai maju yang sudah ada, dihitung dari ujung 5′ (kiri). */
  maju: number;
  /** Jumlah nukleotida tiap fragmen Okazaki (0..FRAGMEN), fragmen 0 paling dekat garpu. */
  fragmen: number[];
  /** 0..1 — primer RNA sudah diganti DNA. */
  ganti: number;
  /** 0..1 — celah antarfragmen sudah disambung. */
  sambung: number;
  /** 0..1 — dua DNA anak memisah. */
  pisah: number;
  /** Detik film, untuk heliks induk yang berputar. */
  detik: number;
  /** Basa salah pasang di untai maju: 0 = tak ada, 1 = tampak. */
  salah: number;
};

type Nuk = {
  bola: THREE.Mesh;
  ruas: THREE.Mesh | null;
  stub: THREE.Mesh;
  /** Versi RNA (primer): rangka jingga dan basa RNA. */
  bolaRNA?: THREE.Mesh;
  ruasRNA?: THREE.Mesh | null;
  stubRNA?: THREE.Mesh;
};

export function bangunGarpu(studio: Studio, induk: THREE.Object3D, acak: () => number) {
  const { bagian, tambah } = studio;
  const huruf = ["A", "T", "G", "C"] as const;
  const atas = Array.from({ length: N }, () => huruf[Math.floor(acak() * 4)] as KodeBasa);
  const bawah = atas.map((b) => PASANG[b]);

  /* ---------- bahan ---------- */
  const abu = MOLEKUL.gulaFosfat.warna;
  const bLama = bagian(["gulaFosfat", "untaiLama"], abu, { garis: 0.003 });
  const bMaju = bagian(["gulaFosfat", "untaiBaru", "untaiMaju"], ronaTerang(abu, 0.55), { garis: 0.003 });
  const bLambat = bagian(["gulaFosfat", "untaiBaru", "untaiLambat"], ronaTerang(abu, 0.55), { garis: 0.003 });
  const bPrimer = bagian(["rna", "primer"], MOLEKUL.rna.warna, { garis: 0.003 });
  const cacheBasa = new Map<string, Bagian>();
  const bBasa = (b: KodeBasa, ...tanda: string[]) => {
    const kunci = `${b}|${tanda.join(",")}`;
    let x = cacheBasa.get(kunci);
    if (!x) {
      x = bagian([`basa${b}`, ...tanda], BASA[b].warna, { garis: 0.003 });
      cacheBasa.set(kunci, x);
    }
    return x;
  };
  const bIkatan = bagian("ikatanHidrogen", MOLEKUL.ikatanHidrogen.warna, { garis: false });

  const gBola = bolaHalus(0.14, 14, 10);
  const gRuas = new THREE.CylinderGeometry(0.06, 0.06, DX, 8);
  gRuas.rotateZ(Math.PI / 2);
  gRuas.translate(-DX / 2, 0, 0);
  const gStub = new THREE.CylinderGeometry(0.1, 0.1, PANJANG_BASA - 0.05, 10);

  /** Satu nukleotida skema: bola fosfat-gula, ruas ke kiri, basa menjulur ke `arahBasa` (±1 di y). */
  const nukleotida = (k: number, y: number, arahBasa: number, basa: KodeBasa, rangka: Bagian, tanda: string[], grup: THREE.Object3D, primer = false): Nuk => {
    const x = xNukleotida(k);
    const bola = tambah(rangka, gBola, grup);
    bola.position.set(x, y, 0);
    const ruas = k < N - 1 ? tambah(rangka, gRuas, grup, false) : null;
    ruas?.position.set(x, y, 0);
    const stub = tambah(bBasa(basa, ...tanda), gStub, grup);
    stub.position.set(x, y + arahBasa * (PANJANG_BASA / 2 + 0.05), 0);
    const n: Nuk = { bola, ruas, stub };
    if (primer) {
      n.bolaRNA = tambah(bPrimer, gBola, grup);
      n.bolaRNA.position.copy(bola.position);
      n.ruasRNA = ruas ? tambah(bPrimer, gRuas, grup, false) : null;
      n.ruasRNA?.position.copy(ruas!.position);
      const basaRNA: KodeBasa = basa === "T" ? "U" : basa;
      n.stubRNA = tambah(bBasa(basaRNA, "primer"), gStub, grup);
      n.stubRNA.position.copy(stub.position);
    }
    return n;
  };

  /* ---------- dua DNA anak (tiap anak: cetakan lama + untai baru) ---------- */
  const anakAtas = new THREE.Group();
  const anakBawah = new THREE.Group();
  induk.add(anakAtas, anakBawah);
  atas.forEach((b, k) => nukleotida(k, Y_CETAK, -1, b, bLama, ["untaiLama"], anakAtas));
  bawah.forEach((b, k) => nukleotida(k, -Y_CETAK, 1, b, bLama, ["untaiLama"], anakBawah));
  const primerMaju = (k: number) => k >= N - 2;
  const primerLambat = (k: number) => k % FRAGMEN < 2;
  const maju = bawah.map((b, k) => nukleotida(k, Y_BARU, 1, b, bMaju, ["untaiBaru", "untaiMaju"], anakAtas, primerMaju(k)));
  const lambat = atas.map((b, k) => nukleotida(k, -Y_BARU, -1, b, bLambat, ["untaiBaru", "untaiLambat"], anakBawah, primerLambat(k)));

  /* ikatan hidrogen tiap anak tangga */
  const ikatan = (k: number, yTengah: number, basa: KodeBasa, grup: THREE.Object3D) => {
    const jumlah = basa === "G" || basa === "C" ? 3 : 2;
    const g = new THREE.Group();
    g.position.set(xNukleotida(k), yTengah, 0);
    grup.add(g);
    for (let j = 0; j < jumlah; j++) {
      const m = new THREE.CylinderGeometry(0.018, 0.018, 0.12, 6);
      m.translate((j - (jumlah - 1) / 2) * 0.07, 0, 0.11);
      tambah(bIkatan, m, g, false);
    }
    return g;
  };
  const ikMaju = atas.map((b, k) => ikatan(k, (Y_CETAK + Y_BARU) / 2, b, anakAtas));
  const ikLambat = bawah.map((b, k) => ikatan(k, -(Y_CETAK + Y_BARU) / 2, b, anakBawah));

  /* basa salah pasang di untai maju (untuk adegan pemeriksaan) */
  const K_SALAH = 2;
  const benar = bawah[K_SALAH];
  const basaSalah: KodeBasa = benar === "G" ? "A" : "G";
  const salah = tambah(bBasa(basaSalah, "salah"), gStub, anakAtas);
  salah.position.copy(maju[K_SALAH].stub.position);
  salah.rotation.z = 0.35;

  /* ---------- heliks induk (putar kanan terhadap +x) ---------- */
  const dupleks = new THREE.Group();
  dupleks.position.set(GARPU, 0, 0);
  induk.add(dupleks);
  const R = 1.0;
  const GESER = (5 * Math.PI) / 6;
  const sudut = (x: number) => (x * Math.PI * 2) / 3.4;
  const titik = (x: number, fase: number) => v(x, R * Math.cos(sudut(x) + fase), R * Math.sin(sudut(x) + fase));
  for (const fase of [0, GESER]) {
    const t: THREE.Vector3[] = [];
    for (let x = 0; x <= PANJANG_INDUK; x += 0.1) t.push(titik(x, fase));
    tambah(bLama, tabung(t, 0.08, 200, 8), dupleks);
  }
  const perBasa: Record<string, THREE.BufferGeometry[]> = { A: [], T: [], G: [], C: [] };
  const ikInduk: THREE.BufferGeometry[] = [];
  for (let j = 0; j * 0.34 + 0.2 < PANJANG_INDUK; j++) {
    const x = 0.2 + j * 0.34;
    const b1 = huruf[Math.floor(acak() * 4)];
    const b2 = PASANG[b1];
    const p1 = titik(x, 0);
    const p2 = titik(x, GESER);
    const tengah = p1.clone().add(p2).multiplyScalar(0.5);
    const arah = p2.clone().sub(p1).normalize();
    perBasa[b1].push(batang(p1, tengah.clone().addScaledVector(arah, -0.05), 0.09));
    perBasa[b2].push(batang(p2, tengah.clone().addScaledVector(arah, 0.05), 0.09));
    ikInduk.push(batang(tengah.clone().addScaledVector(arah, -0.05), tengah.clone().addScaledVector(arah, 0.05), 0.03));
  }
  for (const b of huruf) if (perBasa[b].length) tambah(bBasa(b, "untaiLama"), mergeGeometries(perBasa[b]), dupleks);
  tambah(bIkatan, mergeGeometries(ikInduk), dupleks, false);

  /* penghubung heliks → cetakan (dihitung ulang tiap bingkai karena heliks berputar) */
  const gPenghubung = new THREE.CylinderGeometry(0.07, 0.07, 1, 8);
  const penghubung = [tambah(bLama, gPenghubung, induk, false), tambah(bLama, gPenghubung, induk, false)];

  /* ---------- enzim ---------- */
  const ungu = MOLEKUL.enzim.warna;
  const helikase = tambah(bagian(["enzim", "helikase"], ungu, { garis: 0.004 }), new THREE.TorusGeometry(0.5, 0.22, 14, 28), induk);
  helikase.rotation.y = Math.PI / 2;
  helikase.position.set(GARPU - 0.35, -Y_CETAK + 0.2, 0);
  const primase = tambah(bagian(["enzim", "primase"], ungu, { garis: 0.004 }), bolaHalus(0.42, 20, 14), induk);
  const bPol = bagian(["enzim", "polimerase"], ungu, { garis: 0.004, sisi: THREE.DoubleSide });
  const polMaju = tambah(bPol, bentukEnzim(0.72), induk);
  const polLambat = tambah(bPol, bentukEnzim(0.72), induk);
  const ligase = tambah(bagian(["enzim", "ligase"], ungu, { garis: 0.004 }), bolaHalus(0.38, 20, 14), induk);

  const q = new THREE.Quaternion();
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const tampakkan = (m: THREE.Object3D | null | undefined, f: number) => {
    if (!m) return;
    m.visible = f > 0.02;
    m.scale.setScalar(Math.max(f, 0.001));
  };
  const tampakkanRuas = (m: THREE.Object3D | null | undefined, f: number) => {
    if (!m) return;
    m.visible = f > 0.02;
    m.scale.set(1, Math.max(f, 0.001), Math.max(f, 0.001));
  };

  const perbarui = (k: KeadaanGarpu) => {
    /* untai maju: nukleotida k ada bila k ≥ N − maju */
    maju.forEach((n, i) => {
      const ada = THREE.MathUtils.clamp(k.maju - (N - 1 - i), 0, 1);
      const rna = primerMaju(i) ? 1 - k.ganti : 0;
      const tetangga = i < N - 1 ? THREE.MathUtils.clamp(k.maju - (N - 2 - i), 0, 1) : 0;
      const ruas = Math.min(ada, tetangga);
      tampakkan(n.bola, ada * (1 - rna));
      tampakkanRuas(n.ruas, ruas * (1 - rna));
      tampakkan(n.bolaRNA, ada * rna);
      tampakkanRuas(n.ruasRNA, ruas * rna);
      const stubBenar = i === K_SALAH ? 1 - k.salah : 1;
      tampakkan(n.stub, ada * (1 - rna) * stubBenar);
      tampakkan(n.stubRNA, ada * rna);
      tampakkan(ikMaju[i], ada * stubBenar);
    });
    tampakkan(salah, k.salah * (k.maju >= N - K_SALAH ? 1 : 0));

    /* untai lambat: fragmen f memuat k = 6f … 6f+5, tumbuh dari sisi garpu */
    lambat.forEach((n, i) => {
      const f = Math.floor(i / FRAGMEN);
      const dalam = i % FRAGMEN;
      const ada = THREE.MathUtils.clamp((k.fragmen[f] ?? 0) - dalam, 0, 1);
      const rna = primerLambat(i) ? 1 - k.ganti : 0;
      /* ruas ke kiri: di dalam fragmen ikut tumbuh; antarfragmen menunggu ligase */
      const ujungFragmen = dalam === FRAGMEN - 1;
      const kiriAda =
        i < N - 1 ? THREE.MathUtils.clamp((k.fragmen[Math.floor((i + 1) / FRAGMEN)] ?? 0) - ((i + 1) % FRAGMEN), 0, 1) : 0;
      const ruas = Math.min(ada, kiriAda) * (ujungFragmen ? k.sambung : 1);
      const rnaRuas = primerLambat(i) && primerLambat(i + 1) ? rna : 0;
      tampakkan(n.bola, ada * (1 - rna));
      tampakkanRuas(n.ruas, ruas * (1 - rnaRuas));
      tampakkan(n.bolaRNA, ada * rna);
      tampakkanRuas(n.ruasRNA, ruas * rnaRuas);
      tampakkan(n.stub, ada * (1 - rna));
      tampakkan(n.stubRNA, ada * rna);
      tampakkan(ikLambat[i], ada);
    });

    /* dua DNA anak memisah */
    anakAtas.position.y = 1.4 * k.pisah;
    anakBawah.position.y = -1.4 * k.pisah;

    /* heliks induk berputar pelan — seolah terus dibuka helikase */
    dupleks.rotation.x = -k.detik * 0.7;
    tampakkan(dupleks, 1 - k.pisah);
    [0, GESER].forEach((fase, s) => {
      const c = Math.cos(fase + dupleks.rotation.x);
      const sn = Math.sin(fase + dupleks.rotation.x);
      a.set(GARPU, R * c, R * sn);
      b.set(xNukleotida(0), s === 0 ? Y_CETAK : -Y_CETAK, 0);
      const m = penghubung[s];
      m.position.copy(a).add(b).multiplyScalar(0.5);
      q.setFromUnitVectors(v(0, 1, 0), b.clone().sub(a).normalize());
      m.quaternion.copy(q);
      m.scale.set(1, a.distanceTo(b), 1);
      m.visible = k.pisah < 0.95;
    });
  };

  /** Letak ujung pertumbuhan (untuk enzim dan kamera). */
  const ujungMaju = (k: KeadaanGarpu) => xNukleotida(Math.max(0, N - Math.max(1, Math.ceil(k.maju))));

  return {
    perbarui,
    ujungMaju,
    enzim: { helikase, primase, polMaju, polLambat, ligase },
    anakAtas,
    anakBawah,
    Y_CETAK,
    Y_BARU,
    K_SALAH,
  };
}
