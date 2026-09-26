import * as THREE from "three";
import { MOLEKUL, SIFAT } from "@/lib/warna";
import { lihat, type Studio } from "../studio";
import { bolaHalus, pembuatAcak, tabung } from "../bentuk";
import { bangunDNA } from "../model-dna";
import { bentukEnzim } from "../model-mikroba";
import { alas, aturLabel, buatJamTahap, labelHidup, panah, pelan, v, type Set3D } from "../rangkai-set";
import { bahan, bangunBiji, bangunPolong, bangunTanaman, bangunTumpukan, type OpsiTanaman } from "./model-mendel";
import { bangunHomolog, garis, kali, lantai, tahapan, TANAH, tulis } from "./bantu";

/**
 * SET PELAJARAN 2.1 — Mendel dan kacang ercis.
 *
 *  kebun     kebun biara di Brno: dua bedeng ercis di depan tembok biara
 *  bunga     dua bunga besar (ungu, putih); lunas dibuka, benang sari dibuang,
 *            serbuk sari bunga putih dioleskan ke putik bunga ungu dengan kuas
 *  galur     tiga generasi galur murni biji bulat, masing-masing menyerbuk sendiri
 *  tujuh     tujuh sifat Mendel di tujuh alas yang melengkung seperti galeri
 *  alel      sepasang kromosom homolog: gen, alel R/r, lokus
 *  genotip   RR, Rr, rr beserta bijinya — homozigot dan heterozigot
 *  pati      alel R: enzim → pati bercabang → biji bulat; alel r: gen tersisipi
 *  generasi  P → F1 → F2 dengan warna bunga (juga penutup Tingkat 2)
 */

const SERBUK = "#e3cf8f";
const TANGKAI = "#e9e1cf";
const TEMBOK = "#e4dace";
const GENTING = "#b88f74";
const PATI = "#f1ead8";
const GULA = "#fbf8f1";
const AIR = "#c3d7e3";
const SISIPAN = "#8c8378";

/* ================================================================== *
 * KEBUN
 * ================================================================== */

export function setKebun(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(1856);
  const tanah = bahan(studio, "tanah", ["tanah"], TANAH, 0.004);
  const tanaman: THREE.Group[] = [];
  for (const z of [-1.6, 1.6]) {
    const bedeng = new THREE.BoxGeometry(15, 0.45, 2.2);
    bedeng.translate(0, 0.22, z);
    studio.tambah(tanah, bedeng, grup);
    for (let i = 0; i < 5; i++) {
      const o: OpsiTanaman = {
        tinggi: acak() > 0.3,
        bunga: acak() > 0.35 ? "ungu" : "putih",
        polong: acak() > 0.3 ? "hijau" : "kuning",
      };
      const t = bangunTanaman(studio, grup, o);
      t.position.set(-6 + i * 3 + (acak() - 0.5) * 0.4, 0.45, z + (acak() - 0.5) * 0.3);
      t.rotation.y = acak() * 6;
      tanaman.push(t);
    }
  }
  /* tembok biara di belakang, beratap genting */
  const tembok = new THREE.BoxGeometry(21, 5, 0.7);
  tembok.translate(0, 2.5, -5.2);
  studio.tambah(bahan(studio, "tembok", ["biara"], TEMBOK, 0.004), tembok, grup);
  const atap = new THREE.BoxGeometry(21.6, 0.5, 1.3);
  atap.translate(0, 5.2, -5.1);
  studio.tambah(bahan(studio, "genting", ["biara"], GENTING, 0.004), atap, grup);
  for (const x of [-7, 0, 7]) {
    const jendela = new THREE.CapsuleGeometry(0.6, 1.2, 6, 16);
    jendela.scale(1, 1, 0.2);
    jendela.translate(x, 3, -4.83);
    studio.tambah(bahan(studio, "jendela", ["biara"], "#a79a8a", 0.003), jendela, grup);
  }
  tulis(grup, "kebun biara Santo Thomas, Brno", 0.75, 0, 6.3, -5);
  lantai(grup, 24, 12);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 2.6, 0, 27, 0.25, 1.25),
      dekat: lihat(-3, 3, 1.6, 11, 0.4, 1.25),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 12 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      tanaman.forEach((g, i) => (g.rotation.z = 0.035 * Math.sin(t * 0.9 + i * 0.7)));
    },
  };
}

/* ================================================================== *
 * BUNGA — bunga kupu-kupu ercis, bisa dibuka
 * ================================================================== */

type BungaBesar = {
  grup: THREE.Group;
  lunas: THREE.Group[];
  sayap: THREE.Group[];
  benangSari: THREE.Group;
  serbukPutik: THREE.Group;
  kepalaPutik: THREE.Vector3;
  kepalaSari: THREE.Vector3;
};

function bangunBungaBesar(studio: Studio, induk: THREE.Object3D, warna: "ungu" | "putih"): BungaBesar {
  const grup = new THREE.Group();
  induk.add(grup);
  const e = warna === "ungu" ? "bungaUngu" : "bungaPutih";
  const mahkota = bahan(studio, `mahkota-${warna}`, [e], SIFAT[e].warna, 0.004, undefined, THREE.DoubleSide);
  const hijau = bahan(studio, "tanaman", ["tanaman"], SIFAT.tanaman.warna, 0.003);
  const tangkai = bahan(studio, "tangkaiSari", ["benangSari"], TANGKAI, 0.003);
  const serbuk = bahan(studio, "serbuk", ["serbukSari"], SERBUK, 0.003);
  const putikB = bahan(studio, "putik", ["putik"], "#cfd9a6", 0.003);

  /* kelopak (sepal) hijau */
  const kelopak = new THREE.ConeGeometry(0.35, 0.6, 12, 1, true);
  kelopak.rotateX(Math.PI);
  kelopak.translate(0, -0.05, 0);
  studio.tambah(hijau, kelopak, grup);
  /* bendera: daun mahkota besar tegak di belakang */
  const bendera = bolaHalus(1.1, 28, 20);
  bendera.scale(1.2, 0.88, 0.2);
  bendera.rotateX(-0.4);
  bendera.translate(0, 0.95, -0.45);
  studio.tambah(mahkota, bendera, grup);
  /* dua sayap — ikut membuka bersama lunas */
  const sayap = [-1, 1].map((s) => {
    const g = new THREE.Group();
    g.position.set(s * 0.15, 0.1, 0.3);
    grup.add(g);
    const b = bolaHalus(0.62, 20, 14);
    b.scale(0.5, 0.85, 1.05);
    b.rotateZ(s * 0.35);
    b.translate(s * 0.4, 0.35, 0.15);
    studio.tambah(mahkota, b, g);
    return g;
  });
  /* lunas: dua belahan yang bisa dibuka ke samping */
  const lunas = [-1, 1].map((s) => {
    const g = new THREE.Group();
    g.position.set(0, 0.1, 0.3);
    grup.add(g);
    const b = new THREE.SphereGeometry(0.5, 20, 14, 0, Math.PI);
    b.rotateY(s > 0 ? Math.PI / 2 : -Math.PI / 2);
    b.scale(0.42, 0.62, 1.35);
    b.translate(0, 0.33, 0.48);
    studio.tambah(mahkota, b, g);
    return g;
  });
  /* alat kelamin bunga digambar sedikit lebih besar dari aslinya agar terbaca */
  const BESAR = 1.4;
  const kolom = new THREE.Group();
  kolom.scale.setScalar(BESAR);
  grup.add(kolom);
  /* putik: tangkai melengkung ke depan-atas, kepala putik di ujung */
  const kepalaPutik = v(0, 0.78, 1.05);
  studio.tambah(putikB, tabung([v(0, 0.15, 0.2), v(0, 0.3, 0.6), v(0, 0.55, 0.9), kepalaPutik], 0.055, 20, 8), kolom);
  const kp = bolaHalus(0.1, 12, 10);
  kp.translate(kepalaPutik.x, kepalaPutik.y, kepalaPutik.z);
  studio.tambah(putikB, kp, kolom);
  /* sepuluh benang sari mengelilingi putik, kepala sari dekat kepala putik */
  const benangSari = new THREE.Group();
  kolom.add(benangSari);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const ujung = v(Math.cos(a) * 0.17, 0.72 + Math.sin(a) * 0.1, 0.9 + Math.sin(a) * 0.05);
    studio.tambah(tangkai, tabung([v(Math.cos(a) * 0.12, 0.12, 0.2), v(Math.cos(a) * 0.15, 0.4, 0.6), ujung], 0.022, 12, 6), benangSari, false);
    const k = bolaHalus(0.06, 10, 8);
    k.scale(1, 1.5, 1);
    k.translate(ujung.x, ujung.y + 0.03, ujung.z);
    studio.tambah(serbuk, k, benangSari);
  }
  /* serbuk sari yang menempel di kepala putik (hasil penyerbukan) */
  const serbukPutik = new THREE.Group();
  kolom.add(serbukPutik);
  for (let i = 0; i < 9; i++) {
    const s = bolaHalus(0.035, 8, 6);
    const a = i * 2.4;
    s.translate(kepalaPutik.x + Math.cos(a) * 0.08, kepalaPutik.y + 0.08 + (i % 3) * 0.02, kepalaPutik.z + Math.sin(a) * 0.08);
    studio.tambah(serbuk, s, serbukPutik, false);
  }
  serbukPutik.visible = false;
  return { grup, lunas, sayap, benangSari, serbukPutik, kepalaPutik: kepalaPutik.clone().multiplyScalar(BESAR), kepalaSari: v(0, 0.78, 0.9).multiplyScalar(BESAR) };
}

export function setBunga(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const hijau = bahan(studio, "tanaman", ["tanaman"], SIFAT.tanaman.warna, 0.003);
  const S = 1.25;
  const Y = 3.2;
  const buat = (warna: "ungu" | "putih", x: number) => {
    studio.tambah(hijau, tabung([v(x, 0, 0), v(x + 0.1, 1.5, 0), v(x, Y - 0.1, 0)], 0.1, 20, 8), grup);
    const daun = bolaHalus(0.55, 16, 12);
    daun.scale(1.1, 0.16, 0.55);
    daun.rotateZ(0.3);
    daun.translate(x + 0.55, 1.4, 0);
    studio.tambah(hijau, daun, grup);
    const b = bangunBungaBesar(studio, grup, warna);
    b.grup.position.set(x, Y, 0);
    b.grup.scale.setScalar(S);
    return b;
  };
  const ungu = buat("ungu", -2.6);
  const putih = buat("putih", 2.6);
  tulis(grup, "bunga ungu", 0.42, -2.6, -0.3, 0.8);
  tulis(grup, "bunga putih", 0.42, 2.6, -0.3, 0.8);
  const lBetina = labelHidup(grup, "induk betina (♀)", 0.45);
  const lJantan = labelHidup(grup, "induk jantan (♂)", 0.45);
  const lLunas = labelHidup(grup, "lunas (keel) dibuka", 0.2);
  const lSari = labelHidup(grup, "benang sari", 0.2);
  const lPutik = labelHidup(grup, "kepala putik", 0.2);
  const lSerbuk = labelHidup(grup, "serbuk sari (pollen) bunga putih", 0.3);

  /* kuas: gagang kayu + bulu, membawa serbuk sari */
  const kuas = new THREE.Group();
  grup.add(kuas);
  const gagang = new THREE.CylinderGeometry(0.05, 0.07, 2.2, 10);
  gagang.translate(0, 1.25, 0);
  studio.tambah(bahan(studio, "kayu", ["kuas"], "#b49a7b", 0.003), gagang, kuas);
  const bulu = new THREE.ConeGeometry(0.1, 0.35, 10);
  bulu.rotateX(Math.PI);
  bulu.translate(0, 0.02, 0);
  studio.tambah(bahan(studio, "bulu", ["kuas"], "#6d5d4d", 0.003), bulu, kuas);
  const serbukKuas = new THREE.Group();
  kuas.add(serbukKuas);
  for (let i = 0; i < 7; i++) {
    const s = bolaHalus(0.04, 8, 6);
    s.translate(Math.cos(i * 2.2) * 0.07, -0.12 + (i % 3) * 0.04, Math.sin(i * 2.2) * 0.07);
    studio.tambah(bahan(studio, "serbuk", ["serbukSari"], SERBUK, 0.003), s, serbukKuas, false);
  }
  kuas.visible = false;
  kuas.rotation.z = 0.5;

  const jam = buatJamTahap();
  let buka = 0;
  let bukaPutih = 0;
  let buang = 0;
  const dunia = (b: BungaBesar, p: THREE.Vector3) => p.clone().multiplyScalar(S).add(b.grup.position);

  lantai(grup, 9, 4);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 3.1, 0, 15.5, 0.15, 1.3),
      lunas: lihat(-2.6, 4.1, 1, 7.5, 0.35, 1.1),
      kastrasi: lihat(-2.6, 4.3, 1, 8, 0.35, 1.1),
      kuas: lihat(0, 4, 0.8, 10, 0.25, 1.2),
      hasil: lihat(0, 3.4, 0, 16, 0.15, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 7 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const dikastrasi = f === "kastrasi" || f === "kuas" || f === "hasil";
      buka = pelan(buka, f === "utuh" ? 0 : 1, 3, dt);
      bukaPutih = pelan(bukaPutih, f === "kuas" ? 1 : 0, 3, dt);
      buang = pelan(buang, dikastrasi ? 1 : 0, 2.2, dt);
      for (const [b, n] of [
        [ungu, buka],
        [putih, bukaPutih],
      ] as const) {
        b.lunas.forEach((g, i) => (g.rotation.z = (i === 0 ? 1 : -1) * 1.35 * n));
        b.sayap.forEach((g, i) => (g.rotation.z = (i === 0 ? 1 : -1) * 0.8 * n));
      }
      /* benang sari diangkat keluar lalu hilang */
      ungu.benangSari.position.set(0.9 * buang, 1.4 * buang, 0.5 * buang);
      ungu.benangSari.visible = buang < 0.97;
      ungu.benangSari.scale.setScalar(1 - 0.6 * buang);
      /* penyerbukan sendiri (lunas) atau serbuk dari bunga putih (kuas, hasil) */
      const t = f === "kuas" ? tahapan(j, 0.3, 3.2) : f === "hasil" ? 1 : 0;
      ungu.serbukPutik.visible = f === "lunas" || (f === "kuas" && t > 0.9) || f === "hasil";
      kuas.visible = f === "kuas";
      if (kuas.visible) {
        const dari = dunia(putih, putih.kepalaSari).add(v(0, 0.15, 0.1));
        const ke = dunia(ungu, ungu.kepalaPutik).add(v(0, 0.15, 0.1));
        const tengah = dari.clone().lerp(ke, 0.5).add(v(0, 0.9, 0.6));
        const kurva = new THREE.QuadraticBezierCurve3(dari, tengah, ke);
        kuas.position.copy(kurva.getPoint(Math.min(1, t)));
        kuas.rotation.z = THREE.MathUtils.lerp(0.5, -0.5, t);
        serbukKuas.visible = t < 0.95;
      }
      const pu = dunia(ungu, ungu.kepalaPutik);
      aturLabel(lLunas, f === "lunas", dt, pu.clone().add(v(0, -1.5, 0.4)));
      aturLabel(lSari, f === "lunas" || (f === "kastrasi" && buang < 0.6), dt, pu.clone().add(v(0.8 + buang, 0.35 + buang * 1.2, 0.3)));
      aturLabel(lPutik, f === "lunas" || f === "kastrasi", dt, pu.clone().add(v(-0.85, 0.3, 0.3)));
      aturLabel(lSerbuk, f === "kuas", dt, dunia(putih, putih.kepalaSari).add(v(0, 1.3, 0.3)));
      aturLabel(lBetina, f === "hasil", dt, v(-2.6, 6.4, 0));
      aturLabel(lJantan, f === "hasil", dt, v(2.6, 6.4, 0));
    },
  };
}

/* ================================================================== *
 * GALUR MURNI — tiga generasi, selalu biji bulat
 * ================================================================== */

export function setGalur(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(3);
  const X = [-7, 0, 7];
  X.forEach((x, i) => {
    alas(studio, grup, x, 0, 2.3);
    const t = bangunTanaman(studio, grup, { biji: Array(4).fill({ warna: "kuning", bentuk: "bulat" }) });
    t.position.set(x - 0.6, 0.55, -0.6);
    const tumpuk = bangunTumpukan(studio, grup, 14, { warna: "kuning", bentuk: "bulat" }, acak, 0.2);
    tumpuk.position.set(x + 0.9, 0.55, 0.9);
    tulis(grup, `generasi ${i + 1}`, 0.6, x, -0.45, 2.4);
    if (i < 2) {
      panah(studio, grup, [v(x + 1.6, 3.2, 0), v(x + 3.5, 4.2, 0), v(x + 5.4, 3.2, 0)], 0.07);
      tulis(grup, "menyerbuk sendiri", 0.45, x + 3.5, 4.8, 0);
    }
  });
  tulis(grup, "galur murni biji bulat", 0.75, 0, 7.2);
  const lBulat = labelHidup(grup, "semua bulat", 0.5);
  const lBulat2 = labelHidup(grup, "semua bulat", 0.5);
  const lBulat3 = labelHidup(grup, "semua bulat", 0.5);
  lantai(grup, 22, 8);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 3, 0, 26, 0, 1.3),
      bawah: lihat(0, 1, 1, 19, 0, 1.12),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
    perbarui: (p, dt) => {
      const tampak = p.fokus === "bawah";
      [lBulat, lBulat2, lBulat3].forEach((l, i) => aturLabel(l, tampak, dt, v(X[i] + 0.9, 1.6, 2.2)));
    },
  };
}

/* ================================================================== *
 * TUJUH SIFAT — galeri melengkung
 * ================================================================== */

const R_GALERI = 17;
const LANGKAH = 0.28;

export function setTujuh(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const fokus: Set3D["fokus"] = {};
  const tanaman = (o: OpsiTanaman, s = 0.62) => (g: THREE.Group) => {
    const t = bangunTanaman(studio, g, o);
    t.scale.setScalar(s);
    return t;
  };
  type Isi = (g: THREE.Group) => THREE.Object3D;
  const biji = (w: "kuning" | "hijau", b: "bulat" | "keriput"): Isi => (g) => {
    const m = bangunBiji(studio, g, { warna: w, bentuk: b }, 0.6);
    m.position.y = 0.6;
    return m;
  };
  const bunga = (w: "ungu" | "putih"): Isi => (g) => {
    const b = bangunBungaBesar(studio, g, w).grup;
    b.scale.setScalar(0.62);
    b.position.y = 0.35;
    return b;
  };
  const polong = (w: "hijau" | "kuning", bentuk: "gembung" | "bersekat"): Isi => (g) => {
    const b = bangunPolong(studio, g, { polong: w, bentukPolong: bentuk }, []);
    b.scale.setScalar(1.3);
    b.position.y = 1.2;
    b.rotation.z = 0.25;
    return b;
  };
  const SIFAT7: { judul: string; kiri: [Isi, string]; kanan: [Isi, string]; besar?: boolean }[] = [
    { judul: "bentuk biji", kiri: [biji("kuning", "bulat"), "bulat"], kanan: [biji("kuning", "keriput"), "keriput"] },
    { judul: "warna biji", kiri: [biji("kuning", "bulat"), "kuning"], kanan: [biji("hijau", "bulat"), "hijau"] },
    { judul: "warna bunga", kiri: [bunga("ungu"), "ungu"], kanan: [bunga("putih"), "putih"] },
    { judul: "bentuk polong", kiri: [polong("hijau", "gembung"), "gembung"], kanan: [polong("hijau", "bersekat"), "bersekat"] },
    { judul: "warna polong", kiri: [polong("hijau", "gembung"), "hijau"], kanan: [polong("kuning", "gembung"), "kuning"] },
    { judul: "letak bunga", kiri: [tanaman({ letakBunga: "ketiak" }), "ketiak daun"], kanan: [tanaman({ letakBunga: "ujung" }), "ujung batang"], besar: true },
    { judul: "tinggi batang", kiri: [tanaman({ tinggi: true }), "tinggi"], kanan: [tanaman({ tinggi: false }), "kerdil"], besar: true },
  ];
  const putar: THREE.Object3D[] = [];
  SIFAT7.forEach((s, i) => {
    const sudut = (i - 3) * LANGKAH;
    const st = new THREE.Group();
    st.position.set(R_GALERI * Math.sin(sudut), 0, R_GALERI * Math.cos(sudut) - R_GALERI);
    st.rotation.y = sudut;
    grup.add(st);
    alas(studio, st, 0, 0, 1.9);
    for (const [k, [isi, teks]] of [s.kiri, s.kanan].entries()) {
      const g = new THREE.Group();
      g.position.set(k === 0 ? -1.05 : 1.05, 0.55, 0);
      st.add(g);
      const benda = isi(g);
      if (!s.besar) putar.push(benda);
      tulis(st, teks, 0.4, k === 0 ? -1.05 : 1.05, 0.3, 2.3);
    }
    tulis(st, s.judul, 0.6, 0, s.besar ? 4.4 : 3.3, 0);
    const pusat = st.position.clone();
    fokus[`s${i + 1}`] = s.besar ? lihat(pusat.x, 2.3, pusat.z, 12.5, sudut, 1.25) : lihat(pusat.x, 1.7, pusat.z, 10, sudut, 1.2);
  });
  fokus.utuh = lihat(0, 1.8, -R_GALERI * 0.12, 30, 0, 1.2);
  lantai(grup, 36, 14);
  return {
    grup,
    fokus,
    bayangan: { pusat: v(0, 0, -3), jangkauan: 17 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      putar.forEach((b, i) => (b.rotation.y = t * 0.4 + i));
    },
  };
}

/* ================================================================== *
 * ALEL — sepasang homolog, gen, lokus
 * ================================================================== */

export function setAlel(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const pasangan = new THREE.Group();
  pasangan.position.set(0, 4.2, 0);
  pasangan.scale.setScalar(2);
  grup.add(pasangan);
  const ibu = bangunHomolog(studio, pasangan, "R", "kromatin", { sisi: -1 });
  ibu.grup.position.x = -0.8;
  const ayah = bangunHomolog(studio, pasangan, "r", "kromosomAyah", { sisi: 1 });
  ayah.grup.position.x = 0.8;
  const yLokus = 4.2 + 2 * (0.9 - 0.62 * 2.5);
  tulis(grup, "sepasang kromosom homolog", 0.5, 0, 7.6);
  tulis(grup, "dari ibu", 0.38, -2, 0.2, 0.5);
  tulis(grup, "dari ayah", 0.38, 2, 0.2, 0.5);
  const lGen = labelHidup(grup, "gen bentuk biji", 0.42);
  const lLokus = labelHidup(grup, "lokus (locus)", 0.42);
  const lAlel = labelHidup(grup, "alel R dan alel r", 0.42);
  const penunjuk = new THREE.Group();
  grup.add(penunjuk);
  garis(studio, penunjuk, v(-3.4, yLokus, 0.3), v(3.4, yLokus, 0.3), 0.025);
  penunjuk.visible = false;
  lantai(grup, 8, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 3.9, 0, 15, 0.2, 1.3),
      lokus: lihat(0, yLokus + 0.4, 0, 11.5, 0.3, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 5 },
    perbarui: (p, dt) => {
      const t = p.detik ?? 0;
      pasangan.rotation.y = 0.25 * Math.sin(t * 0.4);
      const dekat = p.fokus === "lokus";
      penunjuk.visible = dekat;
      aturLabel(lGen, !dekat, dt, v(0, yLokus + 0.9, 0.6));
      aturLabel(lLokus, dekat, dt, v(-4.2, yLokus + 0.55, 0.6));
      aturLabel(lAlel, dekat, dt, v(0, yLokus - 1.2, 0.6));
    },
  };
}

/* ================================================================== *
 * GENOTIP — RR, Rr, rr
 * ================================================================== */

export function setGenotip(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const DATA = [
    { alel: ["R", "R"], bentuk: "bulat" as const, homo: true },
    { alel: ["R", "r"], bentuk: "bulat" as const, homo: false },
    { alel: ["r", "r"], bentuk: "keriput" as const, homo: true },
  ];
  const pasangan: THREE.Group[] = [];
  const label = DATA.map((d, i) => {
    const x = (i - 1) * 6;
    alas(studio, grup, x, 0, 2);
    const g = new THREE.Group();
    g.position.set(x, 4.6, 0);
    g.scale.setScalar(1.35);
    grup.add(g);
    pasangan.push(g);
    d.alel.forEach((a, k) => {
      const h = bangunHomolog(studio, g, a, k === 0 ? "kromatin" : "kromosomAyah", { sisi: k === 0 ? -1 : 1 });
      h.grup.position.x = k === 0 ? -0.55 : 0.55;
    });
    const b = bangunBiji(studio, grup, { warna: "kuning", bentuk: d.bentuk }, 0.65);
    b.position.set(x, 1.25, 0.3);
    tulis(grup, d.alel.join(""), 0.75, x, -0.4, 2.2);
    tulis(grup, d.bentuk, 0.5, x, -1.3, 2.2);
    return labelHidup(grup, d.homo ? "homozigot" : "heterozigot", 0.48);
  });
  lantai(grup, 20, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 3, 0, 23, 0, 1.3),
      homo: lihat(0, 3, 0, 23, 0, 1.3),
      hetero: lihat(0, 3.7, 0, 16.5, 0.1, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      DATA.forEach((d, i) => {
        const pilih = (f === "homo" && d.homo) || (f === "hetero" && !d.homo);
        pasangan[i].position.y = pelan(pasangan[i].position.y, pilih ? 5.1 : 4.6, 3, dt);
        aturLabel(label[i], pilih, dt, v((i - 1) * 6, 7.9, 0));
      });
    },
  };
}

/* ================================================================== *
 * PATI — mengapa r membuat biji keriput
 * ================================================================== */

export function setPati(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(11);
  const ungu = bahan(studio, "enzim", ["enzim"], MOLEKUL.enzim.warna, 0.004);
  const pati = bahan(studio, "pati", ["pati"], PATI, 0.003);
  const ROW = [5.2, 0.9];

  const barisDNA = (y: number, sisipan: boolean) => {
    const g = new THREE.Group();
    g.position.set(-8, y + 0.2, 0);
    g.rotation.z = Math.PI / 2;
    g.scale.setScalar(0.42);
    grup.add(g);
    bangunDNA(studio, g, "ATGCGTACGGTACCTA");
    if (sisipan) {
      const s = new THREE.CylinderGeometry(1.35, 1.35, 1.6, 20);
      studio.tambah(bahan(studio, "sisipan", ["dna", "sisipan"], SISIPAN, 0.004), s, g);
    }
    tulis(grup, sisipan ? "alel r: gen tersisipi" : "alel R: gen utuh", 0.5, -8, y - 1.3, 0.5);
  };
  barisDNA(ROW[0], false);
  barisDNA(ROW[1], true);

  /* baris R: enzim utuh → pati bercabang → biji bulat */
  const enzim = studio.tambah(ungu, bentukEnzim(0.75), grup);
  enzim.position.set(-3.6, ROW[0], 0);
  tulis(grup, "enzim pencabang pati", 0.5, -3.6, ROW[0] - 1.3, 0.5);
  const cabang = new THREE.Group();
  cabang.position.set(0.8, ROW[0] - 0.9, 0);
  grup.add(cabang);
  const tumbuh = (p: THREE.Vector3, arah: number, kedalaman: number) => {
    let q = p.clone();
    for (let i = 0; i < 4 - kedalaman; i++) {
      const b = bolaHalus(0.14, 10, 8);
      q = q.clone().add(v(Math.sin(arah) * 0.3, Math.cos(arah) * 0.3, (acak() - 0.5) * 0.15));
      b.translate(q.x, q.y, q.z);
      studio.tambah(pati, b, cabang, false);
      if (kedalaman < 2 && i === 1) tumbuh(q, arah + (acak() > 0.5 ? 0.7 : -0.7), kedalaman + 1);
    }
  };
  tumbuh(v(0, 0, 0), 0, 0);
  tumbuh(v(0, 0, 0), 0.6, 1);
  tumbuh(v(0, 0, 0), -0.6, 1);
  tulis(grup, "pati bercabang", 0.5, 0.8, ROW[0] - 1.3, 0.5);
  const bulat = bangunBiji(studio, grup, { warna: "kuning", bentuk: "bulat" }, 1);
  bulat.position.set(5.2, ROW[0], 0);
  tulis(grup, "biji bulat", 0.55, 5.2, ROW[0] - 1.5, 0.5);
  panah(studio, grup, [v(-6.2, ROW[0], 0), v(-4.6, ROW[0], 0)], 0.05);
  panah(studio, grup, [v(-2.6, ROW[0], 0), v(-0.6, ROW[0], 0)], 0.05);
  panah(studio, grup, [v(2.4, ROW[0], 0), v(3.9, ROW[0], 0)], 0.05);

  /* baris r: enzim tak jadi → gula menumpuk, air masuk → keriput saat kering */
  const pecahan = new THREE.Group();
  pecahan.position.set(-3.6, ROW[1], 0);
  grup.add(pecahan);
  for (const s of [-1, 1]) {
    const k = studio.tambah(ungu, bentukEnzim(0.45), pecahan);
    k.position.set(s * 0.4, s * 0.2, 0);
    k.rotation.set(s, s * 0.5, 0.4);
  }
  tulis(grup, "enzim tak jadi", 0.5, -3.6, ROW[1] - 1.3, 0.5);
  const gula = new THREE.Group();
  gula.position.set(0.8, ROW[1], 0);
  grup.add(gula);
  const bGula = bahan(studio, "gula", ["gula"], GULA, 0.003);
  for (let i = 0; i < 14; i++) {
    const k = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    k.rotateY(acak() * 3);
    k.translate((acak() - 0.5) * 1.8, (acak() - 0.5) * 1.3, (acak() - 0.5) * 0.8);
    studio.tambah(bGula, k, gula);
  }
  tulis(grup, "gula menumpuk", 0.5, 0.8, ROW[1] - 1.3, 0.5);
  const keriput = bangunBiji(studio, grup, { warna: "kuning", bentuk: "keriput" }, 1);
  keriput.position.set(5.2, ROW[1], 0);
  tulis(grup, "biji keriput", 0.55, 5.2, ROW[1] - 1.5, 0.5);
  const air = new THREE.Group();
  grup.add(air);
  const tetes: THREE.Mesh[] = [];
  for (let i = 0; i < 5; i++) {
    const t = bolaHalus(0.13, 10, 8);
    t.scale(1, 1.3, 1);
    tetes.push(studio.tambah(bahan(studio, "air", ["air"], AIR, 0.003), t, air, false));
  }
  panah(studio, grup, [v(-6.2, ROW[1], 0), v(-4.6, ROW[1], 0)], 0.05);
  panah(studio, grup, [v(-2.6, ROW[1], 0), v(-0.6, ROW[1], 0)], 0.05);
  panah(studio, grup, [v(2.4, ROW[1], 0), v(3.9, ROW[1], 0)], 0.05);
  return {
    grup,
    fokus: {
      utuh: lihat(-1.2, 3.1, 0, 26, 0, 1.38),
      bulat: lihat(-1.2, ROW[0], 0, 16, 0.1, 1.4),
      keriput: lihat(-1.2, ROW[1] + 0.3, 0, 16, 0.1, 1.4),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      enzim.rotation.y = Math.sin(t * 1.3) * 0.4;
      cabang.rotation.y = t * 0.3;
      gula.rotation.y = Math.sin(t * 0.7) * 0.3;
      /* tetes air mengalir masuk ke biji selama biji masih menyerap air */
      tetes.forEach((m, i) => {
        const u = (t * 0.45 + i / tetes.length) % 1;
        m.position.set(5.2 + (1 - u) * 1.5 * Math.cos(i * 1.3), ROW[1] + 1.6 * (1 - u), (1 - u) * 1.2 * Math.sin(i * 1.3));
        m.scale.setScalar(1 - u * 0.8);
      });
      keriput.rotation.y = t * 0.3;
      bulat.rotation.y = t * 0.3;
    },
  };
}

/* ================================================================== *
 * GENERASI — P, F1, F2 (warna bunga)
 * ================================================================== */

export function setGenerasi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const tanaman: THREE.Group[] = [];
  const tanam = (x: number, bunga: "ungu" | "putih") => {
    alas(studio, grup, x, 0, 1.15);
    const t = bangunTanaman(studio, grup, { bunga });
    t.position.set(x, 0.55, 0);
    t.scale.setScalar(0.85);
    tanaman.push(t);
  };
  tanam(-11, "ungu");
  tanam(-7.6, "putih");
  kali(grup, -9.3, 2.4, 0.6);
  tanam(-1.3, "ungu");
  tanam(1.3, "ungu");
  [6.2, 8.6, 11, 13.4].forEach((x, i) => tanam(x, i === 2 ? "putih" : "ungu"));
  panah(studio, grup, [v(-5.8, 2.6, 0), v(-4.3, 3.1, 0), v(-2.8, 2.6, 0)], 0.07);
  panah(studio, grup, [v(2.8, 2.6, 0), v(3.7, 3.1, 0), v(4.6, 2.6, 0)], 0.07);
  tulis(grup, "menyerbuk sendiri", 0.42, 3.7, 3.8, 0);
  const G = [
    { x: -9.3, huruf: "P", ket: "induk: ungu × putih" },
    { x: 0, huruf: "F1", ket: "semua ungu" },
    { x: 9.8, huruf: "F2", ket: "3 ungu : 1 putih" },
  ];
  for (const g of G) {
    tulis(grup, g.huruf, 0.95, g.x, 6.4, 0);
    tulis(grup, g.ket, 0.55, g.x, -0.5, 1.6);
  }
  lantai(grup, 30, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(1.2, 2.9, 0, 34, 0, 1.33),
      p: lihat(-9.3, 3.1, 0, 15, -0.1, 1.3),
      f1: lihat(0, 3.1, 0, 14.5, 0, 1.3),
      f2: lihat(9.8, 3.1, 0, 17, 0.1, 1.3),
    },
    bayangan: { pusat: v(1, 0, 0), jangkauan: 15 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      tanaman.forEach((g, i) => (g.rotation.z = 0.03 * Math.sin(t * 0.9 + i)));
    },
  };
}
