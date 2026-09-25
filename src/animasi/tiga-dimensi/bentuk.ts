import * as THREE from "three";

/**
 * BENTUK DAN TEKSTUR BERSAMA untuk semua model 3D bergaris.
 * Semuanya dibangun dari rumus — tidak ada model atau gambar yang diunduh.
 */

export function bolaHalus(r: number, lebar: number, tinggi: number) {
  const g = new THREE.SphereGeometry(r, lebar, tinggi);
  rapikanJahitan(g, lebar, tinggi);
  return g;
}

/** Samakan normal di garis sambungan bola agar tidak tampak garis tipis saat diberi cahaya. */
export function rapikanJahitan(g: THREE.BufferGeometry, lebar: number, tinggi: number) {
  const n = g.attributes.normal as THREE.BufferAttribute;
  const kolom = lebar + 1;
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  for (let iy = 0; iy <= tinggi; iy++) {
    const i0 = iy * kolom;
    const i1 = iy * kolom + lebar;
    a.fromBufferAttribute(n, i0);
    b.fromBufferAttribute(n, i1);
    a.add(b).normalize();
    n.setXYZ(i0, a.x, a.y, a.z);
    n.setXYZ(i1, a.x, a.y, a.z);
  }
  n.needsUpdate = true;
}

/**
 * Lembaran tegak berlipat: pita tipis mengikuti busur di sekitar satu titik pusat,
 * bergelombang ke dalam-luar, lalu ditarik ke atas. Dipakai untuk retikulum
 * endoplasma (bergelombang) dan badan Golgi (busur polos).
 */
export function lembaranBerlipat(o: {
  pusatX: number;
  pusatZ: number;
  jari: number;
  a0: number;
  a1: number;
  amplitudo: number;
  gelombang: number;
  tebal: number;
  tinggi: number;
  bevel: number;
}) {
  const n = 200;
  const luar: THREE.Vector2[] = [];
  const dalam: THREE.Vector2[] = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const th = o.a0 + (o.a1 - o.a0) * u;
    const r = o.jari + o.amplitudo * Math.sin(u * Math.PI * 2 * o.gelombang);
    const c = Math.cos(th);
    const s = Math.sin(th);
    luar.push(new THREE.Vector2(o.pusatX + (r + o.tebal / 2) * c, -(o.pusatZ + (r + o.tebal / 2) * s)));
    dalam.push(new THREE.Vector2(o.pusatX + (r - o.tebal / 2) * c, -(o.pusatZ + (r - o.tebal / 2) * s)));
  }
  const bentuk = new THREE.Shape([...luar, ...dalam.reverse()]);
  const g = new THREE.ExtrudeGeometry(bentuk, {
    depth: o.tinggi,
    bevelEnabled: true,
    bevelThickness: o.bevel,
    bevelSize: o.bevel * 0.8,
    bevelSegments: 3,
    curveSegments: 1,
    steps: 1,
  });
  g.rotateX(-Math.PI / 2);
  return g;
}

/** Bentuk stadion (persegi panjang berujung setengah lingkaran) — irisan memanjang sebuah kapsul. */
export function stadion(L: number, r: number) {
  const s = new THREE.Shape();
  s.moveTo(-L, -r);
  s.lineTo(L, -r);
  s.absarc(L, 0, r, -Math.PI / 2, Math.PI / 2, false);
  s.lineTo(-L, r);
  s.absarc(-L, 0, r, Math.PI / 2, Math.PI * 1.5, false);
  return s;
}

/** Tabung mengikuti titik-titik, dengan kelengkungan halus. */
export function tabung(titik: THREE.Vector3[], jari: number, segmen = 80, sisi = 8, tertutup = false) {
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(titik, tertutup), segmen, jari, sisi, tertutup);
}

/* ------------------------------------------------------------------ *
 * TEKSTUR — digambar sendiri di kanvas, tidak mengunduh apa pun
 * ------------------------------------------------------------------ */

/** Butiran halus di permukaan sitoplasma. Dasarnya putih, jadi warna asli tidak bergeser. */
export function teksturBintik(acak: () => number) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  if (g) {
    g.fillStyle = "#ffffff";
    g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 900; i++) {
      g.fillStyle = acak() < 0.55 ? "rgba(110,140,165,0.22)" : "rgba(255,255,255,0.95)";
      g.beginPath();
      g.arc(acak() * 256, acak() * 256, 0.6 + acak() * 1.6, 0, Math.PI * 2);
      g.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Tekstur timbul halus untuk kulit membran, seperti permukaan lembut bertekstur. */
export function teksturTimbul(acak: () => number) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  if (g) {
    g.fillStyle = "#808080";
    g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 1400; i++) {
      const x = acak() * 256;
      const y = acak() * 256;
      const r = 1 + acak() * 3.2;
      const terang = acak() < 0.5;
      const grad = g.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, terang ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)");
      grad.addColorStop(1, "rgba(128,128,128,0)");
      g.fillStyle = grad;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/** Bayangan bundar lembut di lantai. */
export function teksturBayang() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(128, 128, 20, 128, 128, 128);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.55, "rgba(255,255,255,0.55)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Bayangan lembut di "lantai" di bawah sebuah benda — tanpa peta bayangan. */
export function lantaiBayang(tekstur: THREE.Texture, lebar: number, dalam: number, y: number) {
  const bahan = new THREE.MeshBasicMaterial({
    map: tekstur,
    color: 0x1b2430,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  });
  bahan.userData.outlineParameters = { visible: false };
  const m = new THREE.Mesh(new THREE.PlaneGeometry(lebar, dalam), bahan);
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  return m;
}

/** Pembangkit angka acak yang hasilnya selalu sama — agar bentuk tidak berubah tiap dibuka. */
export function pembuatAcak(benih: number) {
  let s = benih >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
