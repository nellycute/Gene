import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OutlineEffect } from "three/examples/jsm/effects/OutlineEffect.js";
import { ronaGelap } from "@/lib/warna";

/**
 * STUDIO 3D BERGARIS — dasar bersama semua gambar 3D (KEPUTUSAN-DESAIN.md §3)
 *
 * Satu tempat untuk hal-hal yang sama di setiap pelajaran 3D:
 *  - gaya gambar: bahan toon tiga tingkat terang + garis tepi satu rona;
 *  - pendaftaran bagian per entitas warna.ts, supaya `sorot` bisa meredupkan
 *    yang tidak dibahas menjadi kelabu tembus pandang;
 *  - "sutradara" kamera: bergeser pelan ke sudut pandang yang diminta adegan
 *    atau isyarat subtitel, lalu terus bergerak (berputar atau berayun)
 *    mengikuti waktu pelajaran — berhenti saat pelajaran dijeda, seperti video;
 *  - perpindahan antar-set (misal tubuh → jaringan): layar memudar ke warna
 *    panggung sambil kamera terus maju, jadi terasa seperti satu perjalanan
 *    memperbesar, bukan pergantian slide.
 *
 * Begitu penonton menyeret gambar, kamera otomatis berhenti sampai isyarat
 * berikutnya — pilihan penonton tidak direbut.
 */

export type Opsi = {
  sisi?: THREE.Side;
  potong?: THREE.Plane[];
  /** true = yang dibuang hanya ruang di sisi luar SEMUA bidang potong (satu sudut, bukan setengah). */
  potongSudut?: boolean;
  /** Opasitas dasar; di bawah 1 untuk bagian yang memang tembus pandang. */
  tembus?: number;
  peta?: THREE.Texture | null;
  timbul?: THREE.Texture | null;
  /** Tebal garis tepi; false = tanpa garis (bagian pipih dan butiran kecil). */
  garis?: false | number;
  /** Permukaan besar diredupkan lewat warna saja — kalau dibuat tembus, isi di baliknya ikut terlihat. */
  redupWarnaSaja?: boolean;
};

export type Bagian = {
  entitas: string[];
  warna: THREE.Color;
  tembus: number;
  bahan: THREE.MeshToonMaterial;
  redupWarnaSaja: boolean;
  /** 0 = menyala penuh, 1 = redup. Bergerak halus menuju sasarannya. */
  redup: number;
  terapan: number;
};

/**
 * Ke mana kamera memandang. `gerak`: "putar" = mengitari pelan tanpa henti,
 * "ayun" = bergoyang ± 11° di sekitar azimut (untuk benda yang punya "muka",
 * misal inti yang dipotong).
 */
export type Pandangan = {
  titik: THREE.Vector3;
  jarak: number;
  azimut: number;
  kutub: number;
  gerak: "putar" | "ayun";
};

export function lihat(
  x: number,
  y: number,
  z: number,
  jarak: number,
  azimut = 0.15,
  kutub = 0.92,
  gerak: Pandangan["gerak"] = "ayun",
): Pandangan {
  return { titik: new THREE.Vector3(x, y, z), jarak, azimut, kutub, gerak };
}

/** Yang diminta komponen pada setiap detak gambar. */
export type Permintaan = {
  /** Entitas yang disorot. Kosong = semua menyala. */
  sorot: string[];
  /** Waktu pelajaran (detik) — penggerak putaran dan ayunan kamera. */
  detik: number;
};

const ABU = new THREE.Color("#c5cbd2");
/** Satu putaran penuh tiap ± 70 detik: cukup pelan untuk tetap bisa dibaca. */
const LAJU_PUTAR = (Math.PI * 2) / 70;

export type Studio = ReturnType<typeof buatStudio>;

export function buatStudio(el: HTMLDivElement, tirai: HTMLDivElement | null) {
  const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- dasar ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.localClippingEnabled = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  /* Pemetaan nada "netral" menjaga rona dan kejenuhan warna dasar — penting
     karena warna di sini adalah alat belajar. */
  renderer.toneMapping = THREE.NeutralToneMapping;
  el.appendChild(renderer.domElement);
  Object.assign(renderer.domElement.style, {
    display: "block",
    width: "100%",
    height: "100%",
    touchAction: "none",
  });

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.05, 600);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xdfe7ef, 1.35));
  const utama = new THREE.DirectionalLight(0xffffff, 1.9);
  utama.position.set(-14, 30, 18);
  utama.castShadow = true;
  utama.shadow.mapSize.set(2048, 2048);
  utama.shadow.bias = -0.0004;
  utama.shadow.normalBias = 0.03;
  scene.add(utama);
  scene.add(utama.target);
  const isi = new THREE.DirectionalLight(0xfff3e6, 0.3);
  isi.position.set(16, 12, -14);
  scene.add(isi);

  /** Area bayangan mengikuti set yang sedang tampil. */
  const aturBayangan = (pusat: THREE.Vector3, jangkauan: number) => {
    utama.position.copy(pusat).add(new THREE.Vector3(-14, 30, 18).multiplyScalar(jangkauan / 22));
    utama.target.position.copy(pusat);
    Object.assign(utama.shadow.camera, {
      left: -jangkauan,
      right: jangkauan,
      top: jangkauan,
      bottom: -jangkauan,
      near: 0.5,
      far: jangkauan * 4.2,
    });
    utama.shadow.camera.updateProjectionMatrix();
  };
  aturBayangan(new THREE.Vector3(), 22);

  /* Tiga tingkat terang — gelap, tengah, terang (KEPUTUSAN-DESAIN.md §3 syarat 1). */
  const gradasiToon = new THREE.DataTexture(
    new Uint8Array([110, 110, 110, 255, 190, 190, 190, 255, 255, 255, 255, 255]),
    3,
    1,
    THREE.RGBAFormat,
  );
  gradasiToon.minFilter = THREE.NearestFilter;
  gradasiToon.magFilter = THREE.NearestFilter;
  gradasiToon.generateMipmaps = false;
  gradasiToon.needsUpdate = true;

  /* ---------- pendaftaran bagian ---------- */
  const semuaBagian: Bagian[] = [];

  const bagian = (entitas: string | string[], hex: string, o: Opsi = {}): Bagian => {
    const warna = new THREE.Color(hex);
    const tembus = o.tembus ?? 1;
    const bahan = new THREE.MeshToonMaterial({
      color: warna.clone(),
      gradientMap: gradasiToon,
      side: o.sisi ?? THREE.FrontSide,
      clippingPlanes: o.potong ?? null,
      clipIntersection: o.potongSudut ?? false,
      clipShadows: true,
      /* Semua bagian sudah "tembus" sejak awal (opasitas 1) supaya peredupan
         cukup mengubah angka opasitas, tanpa menyusun ulang shader. */
      transparent: !o.redupWarnaSaja,
      opacity: tembus,
      map: o.peta ?? null,
      bumpMap: o.timbul ?? null,
      bumpScale: 0.9,
    });
    /* Garis tepi = warna entitas itu sendiri yang digelapkan, bukan hitam. */
    bahan.userData.outlineParameters =
      o.garis === false
        ? { visible: false }
        : { thickness: o.garis ?? 0.0045, color: new THREE.Color(ronaGelap(hex, 0.55)).toArray(), visible: true };
    const b: Bagian = {
      entitas: Array.isArray(entitas) ? entitas : [entitas],
      warna,
      tembus,
      bahan,
      redupWarnaSaja: o.redupWarnaSaja ?? false,
      redup: 0,
      terapan: -1,
    };
    semuaBagian.push(b);
    return b;
  };

  const tambah = (b: Bagian, g: THREE.BufferGeometry, induk: THREE.Object3D, bayangan = true) => {
    const m = new THREE.Mesh(g, b.bahan);
    m.castShadow = bayangan;
    m.receiveShadow = true;
    induk.add(m);
    return m;
  };

  const tambahBanyak = (b: Bagian, g: THREE.BufferGeometry, matriks: THREE.Matrix4[], induk: THREE.Object3D) => {
    const m = new THREE.InstancedMesh(g, b.bahan, matriks.length);
    matriks.forEach((mt, i) => m.setMatrixAt(i, mt));
    m.instanceMatrix.needsUpdate = true;
    m.castShadow = true;
    m.receiveShadow = true;
    induk.add(m);
    return m;
  };

  const terapkanRedup = (b: Bagian) => {
    b.bahan.color.copy(b.warna).lerp(ABU, b.redup * 0.82);
    if (!b.redupWarnaSaja) {
      b.bahan.opacity = b.tembus * (1 - 0.74 * b.redup);
      b.bahan.depthWrite = b.redup < 0.5 && b.tembus >= 1;
    }
    b.terapan = b.redup;
  };

  /* ---------- kamera ---------- */
  const kendali = new OrbitControls(camera, renderer.domElement);
  kendali.enableDamping = true;
  kendali.dampingFactor = 0.08;
  kendali.enablePan = false;
  /* Tanpa perbesaran: roda tetikus harus tetap menggulir halaman, bukan menangkapnya. */
  kendali.enableZoom = false;
  kendali.minPolarAngle = 0.2;
  kendali.maxPolarAngle = 1.45;

  const bola = new THREE.Spherical();
  const selisih = new THREE.Vector3();
  let pandangan: Pandangan = lihat(0, 0, 0, 40);
  let kunciPandangan = "";
  let dipegangPenonton = false;
  /* Kamera diambil alih penonton hanya kalau gambar benar-benar DISERET. Klik
     atau ketuk dua kali (putar/jeda ala YouTube, 25 Sep 2026) tidak boleh
     menghentikan kamera pemandu — OrbitControls sendiri menganggap setiap
     tekanan sebagai "mulai memegang". */
  let tekanan: { x: number; y: number } | null = null;
  const tekan = (e: PointerEvent) => {
    tekanan = { x: e.clientX, y: e.clientY };
  };
  const seret = (e: PointerEvent) => {
    if (tekanan && Math.hypot(e.clientX - tekanan.x, e.clientY - tekanan.y) > 6) dipegangPenonton = true;
  };
  const lepas = () => {
    tekanan = null;
  };
  renderer.domElement.addEventListener("pointerdown", tekan);
  renderer.domElement.addEventListener("pointermove", seret);
  window.addEventListener("pointerup", lepas);
  window.addEventListener("pointercancel", lepas);

  /* Putaran dihitung sejak pandangan ini dimulai, jadi setiap adegan dibuka
     dari sisi depannya, lalu berputar pelan dari sana. */
  let detikAwal: number | null = null;
  const azimutSasaran = (p: Pandangan, detik: number) => {
    if (kurangiGerak) return p.azimut;
    if (detikAwal === null) detikAwal = detik;
    return p.gerak === "putar"
      ? p.azimut + (detik - detikAwal) * LAJU_PUTAR
      : p.azimut + 0.2 * Math.sin((detik - detikAwal) * 0.35);
  };

  let sudahDipandu = false;

  /**
   * Minta kamera menuju sebuah pandangan. `kunci` baru = kamera kembali dipandu.
   * Permintaan pertama langsung menempatkan kamera, tanpa meluncur.
   */
  const tuju = (p: Pandangan, kunci: string) => {
    if (!sudahDipandu) {
      lompat(p, kunci);
      return;
    }
    if (kunci === kunciPandangan) return;
    if (p !== pandangan) detikAwal = null;
    kunciPandangan = kunci;
    pandangan = p;
    dipegangPenonton = false;
  };

  /** Pindahkan kamera seketika — dipakai saat layar tertutup tirai. */
  const lompat = (p: Pandangan, kunci: string, faktorJarak = 1, detik = 0) => {
    sudahDipandu = true;
    kunciPandangan = kunci;
    detikAwal = detik;
    pandangan = p;
    dipegangPenonton = false;
    kendali.target.copy(p.titik);
    bola.set(p.jarak * faktorJarak, p.kutub, azimutSasaran(p, detik));
    camera.position.setFromSpherical(bola).add(kendali.target);
    kendali.update();
  };

  /* ---------- perpindahan antar-set ---------- */
  let transisi: { t: number; tukar: () => void; ditukar: boolean; arah: number } | null = null;
  let faktorZoom = 1;

  /**
   * Ganti set dengan tirai. `arah` 1 = memperbesar (kamera terus maju),
   * -1 = mengecil (kamera mundur), 0 = sekadar berganti.
   */
  const ganti = (tukar: () => void, arah: number) => {
    if (kurangiGerak) {
      tukar();
      return;
    }
    transisi = { t: 0, tukar, ditukar: false, arah };
  };
  const TUTUP = 0.4;
  const BUKA = 0.55;

  /* ---------- ukuran ---------- */
  const ukur = () => {
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;
    /* Layar menonton laptop diperbesar lewat CSS zoom (KunciTataLaptop) —
       kanvas ikut diperhalus agar gambar tidak buram saat diperbesar. */
    const zoom = parseFloat(getComputedStyle(document.body).zoom) || 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio * zoom, 3));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  ukur();
  const pengamat = new ResizeObserver(ukur);
  pengamat.observe(el);
  /* zoom berubah tanpa mengubah ukuran CSS, jadi ResizeObserver tidak berbunyi */
  window.addEventListener("ubah-skala", ukur);

  const efek = new OutlineEffect(renderer, { defaultThickness: 0.003, defaultKeepAlive: true });
  const jam = new THREE.Timer();

  let putaran: ((waktu: number) => void) | null = null;
  /** Jam bingkai manual tidak boleh mundur, kalau tidak dt negatif dan tirai tersangkut. */
  let jamManual = 0;

  /**
   * Jalankan n bingkai seketika. Hanya untuk pemeriksaan: panel browser Claude
   * yang tertutup jendela lain menahan requestAnimationFrame, sehingga film
   * berhenti. Dipasang di window oleh Film3D saat pengembangan saja.
   */
  const majukan = (n: number, langkahMs = 100) => {
    if (!putaran) return;
    let t = Math.max(performance.now(), jamManual);
    for (let i = 0; i < n; i++) {
      t += langkahMs;
      renderer.clear(); // lihat langkahRekam
      putaran(t);
    }
    jamManual = t;
  };

  /**
   * Perekam video YouTube (src/app/rekam-video): detak peramban dihentikan, lalu
   * film dimajukan tepat `ms` per bingkai. Hasil rekaman jadi sama persis berapa
   * pun lamanya komputer menggambar satu bingkai.
   */
  let jamRekam: number | null = null;
  const langkahRekam = (ms: number) => {
    if (!putaran) return;
    if (jamRekam === null) {
      renderer.setAnimationLoop(null);
      jamRekam = Math.max(performance.now(), jamManual);
    }
    jamRekam += ms;
    /* OutlineEffect tidak pernah membersihkan kanvas sendiri (autoClear-nya
       undefined); biasanya peramban mengosongkannya tiap kali tampil. Bingkai
       yang digambar beruntun tanpa tampil akan menumpuk — bayangan lantai jadi
       hitam pekat, benda yang bergerak berbekas. */
    renderer.clear();
    putaran(jamRekam);
  };

  /** Mulai detak gambar. `detak` dipanggil tiap bingkai sebelum menggambar. */
  const mulai = (detak: (dt: number) => Permintaan) => {
    renderer.setAnimationLoop((putaran = (waktu: number) => {
      jam.update(waktu);
      /* tidak pernah negatif: jam bingkai manual (majukan) bisa mendahului jam peramban */
      const dt = Math.max(0, Math.min(jam.getDelta(), 0.1));
      const { sorot, detik } = detak(dt);

      for (const b of semuaBagian) {
        const sasaran = sorot.length === 0 || b.entitas.some((e) => sorot.includes(e)) ? 0 : 1;
        if (kurangiGerak) b.redup = sasaran;
        else {
          b.redup += (sasaran - b.redup) * Math.min(1, dt * 5);
          if (Math.abs(sasaran - b.redup) < 0.003) b.redup = sasaran;
        }
        if (b.redup !== b.terapan) terapkanRedup(b);
      }

      /* tirai: tutup → tukar set → buka, sambil kamera terus bergerak */
      let lajuKamera = 2.2;
      if (transisi) {
        transisi.t += dt;
        const tr = transisi;
        if (!tr.ditukar) {
          faktorZoom = tr.arah > 0 ? 0.55 : tr.arah < 0 ? 1.7 : 1;
          lajuKamera = 3.2;
          if (tirai) tirai.style.opacity = String(Math.min(1, tr.t / TUTUP));
          if (tr.t >= TUTUP) {
            tr.ditukar = true;
            tr.tukar();
            /* set baru dimulai dari jarak yang meneruskan arah gerak */
            const mulaiDari = tr.arah > 0 ? 1.8 : tr.arah < 0 ? 0.6 : 1;
            lompat(pandangan, kunciPandangan, mulaiDari, detik);
            faktorZoom = 1;
          }
        } else {
          const u = (tr.t - TUTUP) / BUKA;
          if (tirai) tirai.style.opacity = String(Math.max(0, 1 - u));
          if (u >= 1) transisi = null;
        }
      }

      if (!dipegangPenonton) {
        const k = kurangiGerak ? 1 : 1 - Math.exp(-dt * lajuKamera);
        selisih.copy(camera.position).sub(kendali.target);
        bola.setFromVector3(selisih);
        bola.radius += (pandangan.jarak * faktorZoom - bola.radius) * k;
        bola.phi += (pandangan.kutub - bola.phi) * k;
        bola.theta += bedaSudut(azimutSasaran(pandangan, detik), bola.theta) * k;
        kendali.target.lerp(pandangan.titik, k);
        camera.position.setFromSpherical(bola).add(kendali.target);
      }
      kendali.update();
      efek.render(scene, camera);
    }));
  };

  /** Satu gambar diam dari kamera saat ini, PNG berlatar tembus pandang — untuk ikon aplikasi. */
  const potret = () => {
    kendali.update();
    efek.render(scene, camera);
    return renderer.domElement.toDataURL("image/png");
  };

  const buang = () => {
    renderer.setAnimationLoop(null);
    pengamat.disconnect();
    window.removeEventListener("ubah-skala", ukur);
    renderer.domElement.removeEventListener("pointerdown", tekan);
    renderer.domElement.removeEventListener("pointermove", seret);
    window.removeEventListener("pointerup", lepas);
    window.removeEventListener("pointercancel", lepas);
    kendali.dispose();
    scene.traverse((o) => {
      if (o instanceof THREE.Sprite) {
        o.material.map?.dispose();
        o.material.dispose();
      }
      if (o instanceof THREE.InstancedMesh) o.dispose();
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        for (const bahan of Array.isArray(o.material) ? o.material : [o.material]) {
          if ("map" in bahan && bahan.map instanceof THREE.Texture) bahan.map.dispose();
          if ("bumpMap" in bahan && bahan.bumpMap instanceof THREE.Texture) bahan.bumpMap.dispose();
          bahan.dispose();
        }
      }
    });
    for (const b of semuaBagian) b.bahan.dispose();
    gradasiToon.dispose();
    renderer.dispose();
    if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
  };

  return {
    renderer,
    scene,
    camera,
    kendali,
    kurangiGerak,
    gradasiToon,
    bagian,
    tambah,
    tambahBanyak,
    tuju,
    lompat,
    ganti,
    aturBayangan,
    mulai,
    majukan,
    langkahRekam,
    potret,
    buang,
    get sedangBerganti() {
      return transisi !== null && !transisi.ditukar;
    },
  };
}

/** Selisih sudut terpendek dari b ke a, di antara −π dan π. */
export function bedaSudut(a: number, b: number) {
  const d = (a - b) % (Math.PI * 2);
  return d > Math.PI ? d - Math.PI * 2 : d < -Math.PI ? d + Math.PI * 2 : d;
}
