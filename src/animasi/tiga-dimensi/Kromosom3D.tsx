"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { INTI, SEL, ronaGelap } from "@/lib/warna";

/**
 * KROMOSOM — versi tiga dimensi, bisa diputar (pelajaran 0.4).
 *
 * Yang ingin diperlihatkan: kromosom bukan huruf X pipih, melainkan dua batang
 * SERAT yang tergulung rapat. Tiap lengan digambar sebagai tabung tebal, lalu
 * dililit tabung tipis berbentuk spiral — gulungan di atas gulungan.
 *
 * Syarat §3 dipenuhi dengan cara yang sama seperti SelHewan3D: MeshToonMaterial
 * tanpa kilau, peta gradasi dua langkah, tanpa shadow map. Warna dari warna.ts.
 */

/** Spiral yang melilit sumbu lurus dari `dari` ke `ke`. */
class Spiral extends THREE.Curve<THREE.Vector3> {
  private sumbu: THREE.Vector3;
  private u: THREE.Vector3;
  private v: THREE.Vector3;
  constructor(
    private dari: THREE.Vector3,
    private ke: THREE.Vector3,
    private jariJari: number,
    private putaran: number,
  ) {
    super();
    this.sumbu = new THREE.Vector3().subVectors(ke, dari);
    const arah = this.sumbu.clone().normalize();
    const bantu = Math.abs(arah.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
    this.u = new THREE.Vector3().crossVectors(arah, bantu).normalize();
    this.v = new THREE.Vector3().crossVectors(arah, this.u).normalize();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const sudut = t * this.putaran * Math.PI * 2;
    return target
      .copy(this.dari)
      .addScaledVector(this.sumbu, t)
      .addScaledVector(this.u, Math.cos(sudut) * this.jariJari)
      .addScaledVector(this.v, Math.sin(sudut) * this.jariJari);
  }
}

export default function Kromosom3D() {
  const wadah = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wadah.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "none";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 3, 36);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const cahaya = new THREE.DirectionalLight(0xffffff, 1.3);
    cahaya.position.set(5, 8, 9);
    scene.add(cahaya);

    const gradasi = new THREE.DataTexture(
      new Uint8Array([150, 150, 150, 255, 255, 255, 255, 255]),
      2,
      1,
      THREE.RGBAFormat,
    );
    gradasi.minFilter = THREE.NearestFilter;
    gradasi.magFilter = THREE.NearestFilter;
    gradasi.needsUpdate = true;

    const geometri: THREE.BufferGeometry[] = [];
    const bahanSemua: THREE.Material[] = [];
    const bahan = (warna: string) => {
      const m = new THREE.MeshToonMaterial({ color: new THREE.Color(warna), gradientMap: gradasi });
      bahanSemua.push(m);
      return m;
    };
    const ingat = <G extends THREE.BufferGeometry>(g: G) => {
      geometri.push(g);
      return g;
    };

    const lantai = new THREE.Mesh(
      ingat(new THREE.CircleGeometry(9, 40)),
      (() => {
        const m = new THREE.MeshBasicMaterial({ color: 0x1b2430, transparent: true, opacity: 0.07 });
        bahanSemua.push(m);
        return m;
      })(),
    );
    lantai.rotation.x = -Math.PI / 2;
    lantai.position.y = -8.4;
    scene.add(lantai);

    const kromosom = new THREE.Group();
    scene.add(kromosom);

    const bahanLengan = bahan(SEL.kromatin.warna);
    const bahanSpiral = bahan(ronaGelap(SEL.kromatin.warna, 0.2));
    const bahanSentromer = bahan(INTI.sentromer.warna);
    const bahanTelomer = bahan(INTI.telomer.warna);
    const bola = ingat(new THREE.SphereGeometry(1, 24, 18));

    /* Dua kromatid, masing-masing lengan p (atas, pendek) dan q (bawah, panjang).
       Lengan membuka ke luar dari sentromer agar bentuk X terbaca dari depan. */
    const pLen = 4.6;
    const qLen = 7.0;
    const tebal = 0.62;
    const kromatid = [-1, 1];
    for (const k of kromatid) {
      const pangkal = new THREE.Vector3(k * 0.62, 0, 0);
      const ujungP = new THREE.Vector3(k * (0.62 + pLen * 0.28), pLen, k * 0.15);
      const ujungQ = new THREE.Vector3(k * (0.62 + qLen * 0.22), -qLen, -k * 0.15);

      for (const ujung of [ujungP, ujungQ]) {
        // lengan tebal, sedikit melengkung
        const tengah = new THREE.Vector3().lerpVectors(pangkal, ujung, 0.5).add(new THREE.Vector3(k * 0.25, 0, 0.35));
        const jalur = new THREE.CatmullRomCurve3([pangkal, tengah, ujung]);
        const lengan = new THREE.Mesh(ingat(new THREE.TubeGeometry(jalur, 40, tebal, 14, false)), bahanLengan);
        kromosom.add(lengan);

        // spiral gulungan di permukaan lengan
        const putaran = Math.round(pangkal.distanceTo(ujung) * 2.2);
        const spiral = new THREE.Mesh(
          ingat(new THREE.TubeGeometry(new Spiral(pangkal, ujung, tebal * 0.98, putaran), 360, 0.11, 8, false)),
          bahanSpiral,
        );
        kromosom.add(spiral);

        // telomer: tudung di ujung
        const tudung = new THREE.Mesh(bola, bahanTelomer);
        tudung.scale.setScalar(tebal * 0.92);
        tudung.position.copy(ujung);
        kromosom.add(tudung);

        // ujung pangkal ditutup bola agar tabung tidak tampak berlubang
        const tutup = new THREE.Mesh(bola, bahanLengan);
        tutup.scale.setScalar(tebal);
        tutup.position.copy(pangkal);
        kromosom.add(tutup);
      }
    }

    // sentromer: pinggang yang menyatukan kedua kromatid
    const sentromer = new THREE.Mesh(bola, bahanSentromer);
    sentromer.scale.set(1.5, 0.78, 0.95);
    kromosom.add(sentromer);

    kromosom.position.y = 1.2;

    const kendali = new OrbitControls(camera, renderer.domElement);
    kendali.enableZoom = false;
    kendali.enablePan = false;
    kendali.enableDamping = true;
    kendali.dampingFactor = 0.08;
    kendali.autoRotate = true;
    kendali.autoRotateSpeed = 1.1;
    kendali.minPolarAngle = 0.6;
    kendali.maxPolarAngle = 2.5;
    kendali.target.set(0, 0, 0);

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
      geometri.forEach((g) => g.dispose());
      bahanSemua.forEach((m) => m.dispose());
      gradasi.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={wadah} className="h-full w-full" aria-hidden="true" />;
}
