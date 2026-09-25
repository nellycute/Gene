import * as THREE from "three";

/**
 * Label tulisan yang melayang di dalam gambar 3D (p, q, 2n, G1, ...).
 * Tinta di atas kertas dengan tepi putih, selalu tampil di depan benda —
 * warna tidak pernah jadi satu-satunya penanda (AGENTS.md aturan 4).
 */
export function buatLabel(teks: string, ukuran = 1) {
  const c = document.createElement("canvas");
  const lebar = Math.max(256, teks.length * 64);
  c.width = lebar;
  c.height = 128;
  const g = c.getContext("2d");
  if (g) {
    g.font = "700 84px system-ui, sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.lineWidth = 14;
    g.lineJoin = "round";
    g.strokeStyle = "rgba(255,255,255,0.95)";
    g.strokeText(teks, lebar / 2, 66);
    g.fillStyle = "#1b2430";
    g.fillText(teks, lebar / 2, 66);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true }));
  s.scale.set((lebar / 128) * ukuran, ukuran, 1);
  s.renderOrder = 10;
  return s;
}
