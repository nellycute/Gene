"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SEL } from "@/lib/warna";

/**
 * SEL HEWAN — versi tiga dimensi, bisa diputar.
 *
 * Dipakai hanya pada adegan penutup pelajaran 0.2: memahami sel sebagai RUANG,
 * bukan gambar. (KEPUTUSAN-DESAIN.md §3)
 *
 * Syarat yang tidak bisa ditawar, dan bagaimana masing-masing dipenuhi:
 *   1. Bahan rata tanpa kilau  → MeshToonMaterial. Tidak punya pantulan
 *      specular, jadi tidak ada sorot putih yang mengubah warna.
 *   2. Maksimal tiga tingkat terang → peta gradasi dua langkah: warna asli
 *      dan satu tingkat lebih gelap. Tidak ada yang mendekati putih/hitam.
 *   3. Tanpa bayangan jatuh gelap → tidak ada shadow map sama sekali; hanya
 *      satu lingkaran tipis di lantai.
 *   4. Dimuat hanya saat pelajaran dibuka → berkas ini diimpor secara dinamis
 *      oleh Panggung3D, tidak pernah ikut halaman depan.
 *
 * Semua warna diambil dari src/lib/warna.ts — aturan yang sama dengan gambar datar.
 */

/** Batas ellipsoid sel: (x/15)² + (y/10)² + (z/11)² < 1 */
const RADIUS = new THREE.Vector3(15, 10, 11);

export default function SelHewan3D() {
  const wadah = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wadah.current;
    if (!el) return;

    /* ---------- dasar ---------- */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "none";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
    camera.position.set(0, 9, 52);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const cahaya = new THREE.DirectionalLight(0xffffff, 1.4);
    cahaya.position.set(6, 10, 9);
    scene.add(cahaya);

    /* Peta gradasi dua langkah: 59% (bayangan) dan 100% (warna asli). */
    const gradasi = new THREE.DataTexture(
      new Uint8Array([150, 150, 150, 255, 255, 255, 255, 255]),
      2,
      1,
      THREE.RGBAFormat,
    );
    gradasi.minFilter = THREE.NearestFilter;
    gradasi.magFilter = THREE.NearestFilter;
    gradasi.needsUpdate = true;

    const bahan = (warna: string, opsi: Partial<THREE.MeshToonMaterialParameters> = {}) =>
      new THREE.MeshToonMaterial({ color: new THREE.Color(warna), gradientMap: gradasi, ...opsi });

    const geometriSemua: THREE.BufferGeometry[] = [];
    const bahanSemua: THREE.Material[] = [];
    const ingat = <G extends THREE.BufferGeometry>(g: G) => {
      geometriSemua.push(g);
      return g;
    };
    const ingatBahan = <M extends THREE.Material>(m: M) => {
      bahanSemua.push(m);
      return m;
    };

    const bola = ingat(new THREE.SphereGeometry(1, 40, 28));

    /* ---------- bayangan tipis di lantai ---------- */
    const lantai = new THREE.Mesh(
      ingat(new THREE.CircleGeometry(17, 48)),
      ingatBahan(new THREE.MeshBasicMaterial({ color: 0x1b2430, transparent: true, opacity: 0.07 })),
    );
    lantai.rotation.x = -Math.PI / 2;
    lantai.position.y = -11.6;
    scene.add(lantai);

    /* Segala isi sel dikumpulkan dalam satu grup agar ikut berputar bersama. */
    const sel = new THREE.Group();
    scene.add(sel);

    /* ---------- inti sel ---------- */
    const pusatInti = new THREE.Vector3(-4, 0.5, 0);
    const inti = new THREE.Mesh(bola, ingatBahan(bahan(SEL.inti.warna, { transparent: true, opacity: 0.92 })));
    inti.scale.setScalar(3.6);
    inti.position.copy(pusatInti);
    sel.add(inti);

    const membranInti = new THREE.Mesh(
      bola,
      ingatBahan(bahan(SEL.membranInti.warna, { transparent: true, opacity: 0.35, depthWrite: false })),
    );
    membranInti.scale.setScalar(3.85);
    membranInti.position.copy(pusatInti);
    sel.add(membranInti);

    const nukleolus = new THREE.Mesh(bola, ingatBahan(bahan(SEL.nukleolus.warna)));
    nukleolus.scale.setScalar(1.05);
    nukleolus.position.copy(pusatInti).add(new THREE.Vector3(-0.9, 0.7, 1.2));
    sel.add(nukleolus);

    /* ---------- mitokondria ---------- */
    const kapsul = ingat(new THREE.CapsuleGeometry(0.78, 2.4, 6, 16));
    const bahanMito = ingatBahan(bahan(SEL.mitokondria.warna));
    const posisiMito: [number, number, number, number, number, number][] = [
      [6, 3.2, 2, 0.3, 0.8, 0.2],
      [8.5, -3, -3, 1.2, 0.2, 0.5],
      [-8, -4.6, 3, 0.4, -0.6, 1.0],
      [2, -5.8, 5, 0.9, 1.4, 0.3],
    ];
    for (const [x, y, z, rx, ry, rz] of posisiMito) {
      const m = new THREE.Mesh(kapsul, bahanMito);
      m.position.set(x, y, z);
      m.rotation.set(rx, ry, rz);
      sel.add(m);
    }

    /* ---------- lisosom, peroksisom, vakuola ---------- */
    const tambahBola = (warna: string, r: number, titik: [number, number, number][], opsi = {}) => {
      const b = ingatBahan(bahan(warna, opsi));
      for (const [x, y, z] of titik) {
        const m = new THREE.Mesh(bola, b);
        m.scale.setScalar(r);
        m.position.set(x, y, z);
        sel.add(m);
      }
    };
    tambahBola(SEL.lisosom.warna, 0.85, [
      [-9, 4, -2],
      [4, 5.2, -4],
      [-1, -6.2, -5],
    ]);
    tambahBola(SEL.peroksisom.warna, 0.62, [
      [-11, -1, 1.5],
      [0.5, 6.6, 3],
    ]);
    tambahBola(SEL.vakuola.warna, 1.25, [[-9.5, -3.6, -3.2]], { transparent: true, opacity: 0.7 });

    /* ---------- badan Golgi: tumpukan cakram pipih ---------- */
    const golgi = new THREE.Group();
    const bahanGolgi = ingatBahan(bahan(SEL.golgi.warna));
    [1.7, 2.05, 2.3, 2.05, 1.7].forEach((r, i) => {
      const cakram = new THREE.Mesh(ingat(new THREE.CylinderGeometry(r, r, 0.17, 36)), bahanGolgi);
      cakram.position.y = i * 0.36;
      golgi.add(cakram);
    });
    golgi.position.set(3.2, -5.2, -2);
    golgi.rotation.set(0.25, 0.3, -0.35);
    sel.add(golgi);

    /* ---------- retikulum endoplasma: busur tabung ---------- */
    const busur = (radius: number, tebal: number, panjang: number) =>
      ingat(new THREE.TorusGeometry(radius, tebal, 10, 40, panjang));

    const bahanREKasar = ingatBahan(bahan(SEL.reKasar.warna));
    const titikRibosomRE: THREE.Vector3[] = [];
    [5.3, 6.1, 6.9].forEach((radius, i) => {
      const t = new THREE.Mesh(busur(radius, 0.24, 1.5), bahanREKasar);
      t.position.copy(pusatInti);
      t.rotation.set(0.15 * i, 0, -0.75);
      sel.add(t);
      // ribosom menempel di sepanjang busur
      for (let k = 0; k <= 9; k++) {
        const sudut = (k / 9) * 1.5;
        const p = new THREE.Vector3(Math.cos(sudut) * radius, Math.sin(sudut) * radius, 0.26);
        p.applyEuler(t.rotation).add(pusatInti);
        titikRibosomRE.push(p);
      }
    });

    const bahanREHalus = ingatBahan(bahan(SEL.reHalus.warna));
    [2.2, 2.9].forEach((radius, i) => {
      const t = new THREE.Mesh(busur(radius, 0.2, 2.2), bahanREHalus);
      t.position.set(11, 0.5 - i * 0.8, 1.5);
      t.rotation.set(0.6 + i * 0.4, 0.9, 0.2);
      sel.add(t);
    });

    /* ---------- ribosom: satu InstancedMesh untuk ratusan titik ---------- */
    const acak = pembuatAcak(7);
    const bebas: THREE.Vector3[] = [];
    while (bebas.length < 70) {
      const p = new THREE.Vector3(
        (acak() * 2 - 1) * RADIUS.x,
        (acak() * 2 - 1) * RADIUS.y,
        (acak() * 2 - 1) * RADIUS.z,
      );
      const dalam =
        (p.x / RADIUS.x) ** 2 + (p.y / RADIUS.y) ** 2 + (p.z / RADIUS.z) ** 2 < 0.8;
      if (dalam && p.distanceTo(pusatInti) > 4.6) bebas.push(p);
    }
    const semuaRibosom = [...titikRibosomRE, ...bebas];
    const ribosom = new THREE.InstancedMesh(
      ingat(new THREE.SphereGeometry(0.16, 10, 8)),
      ingatBahan(bahan(SEL.ribosom.warna)),
      semuaRibosom.length,
    );
    const matriks = new THREE.Matrix4();
    semuaRibosom.forEach((p, i) => {
      matriks.makeTranslation(p.x, p.y, p.z);
      ribosom.setMatrixAt(i, matriks);
    });
    sel.add(ribosom);

    /* ---------- sentriol: dua silinder tegak lurus ---------- */
    const silinder = ingat(new THREE.CylinderGeometry(0.3, 0.3, 1.5, 12));
    const bahanSentriol = ingatBahan(bahan(SEL.sentriol.warna));
    const s1 = new THREE.Mesh(silinder, bahanSentriol);
    s1.position.set(0.8, 2.6, 1.8);
    s1.rotation.z = Math.PI / 2;
    const s2 = new THREE.Mesh(silinder, bahanSentriol);
    s2.position.set(1.6, 1.6, 1.8);
    sel.add(s1, s2);

    /* ---------- membran sel: cangkang tembus pandang, digambar terakhir ---------- */
    const membran = new THREE.Mesh(
      bola,
      ingatBahan(
        bahan(SEL.membranSel.warna, {
          transparent: true,
          opacity: 0.1,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
      ),
    );
    membran.scale.copy(RADIUS);
    membran.renderOrder = 10;
    sel.add(membran);

    /* ---------- kendali putar ---------- */
    const kendali = new OrbitControls(camera, renderer.domElement);
    kendali.enableZoom = false;
    kendali.enablePan = false;
    kendali.enableDamping = true;
    kendali.dampingFactor = 0.08;
    kendali.autoRotate = true;
    kendali.autoRotateSpeed = 0.9;
    kendali.minPolarAngle = 0.7;
    kendali.maxPolarAngle = 2.3;

    /* ---------- ukuran mengikuti wadah ---------- */
    const ukur = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    ukur();
    const pengamat = new ResizeObserver(ukur);
    pengamat.observe(el);

    renderer.setAnimationLoop(() => {
      kendali.update();
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      pengamat.disconnect();
      kendali.dispose();
      geometriSemua.forEach((g) => g.dispose());
      bahanSemua.forEach((m) => m.dispose());
      gradasi.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={wadah} className="h-full w-full" aria-hidden="true" />;
}

/** Pembangkit angka acak yang hasilnya selalu sama — agar sel tidak berubah bentuk tiap dibuka. */
function pembuatAcak(benih: number) {
  let s = benih >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
