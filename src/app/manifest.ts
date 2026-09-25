import type { MetadataRoute } from "next";

/**
 * APLIKASI DI LAYAR HP (25 Sep 2026)
 *
 * "Tambahkan ke layar utama" memasang ikon bola sel — permintaan Nely: "bola sel
 * yang mengambang" — dan website terbuka penuh seperti aplikasi, tanpa kolom
 * alamat peramban. Ikonnya digambar dari model 3D bola sel
 * (src/animasi/tiga-dimensi/model-bola-sel.ts), bukan gambar dari internet.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ruang Genetika",
    short_name: "Ruang Genetika",
    description: "Belajar genetika lewat animasi 3D berwarna — dari sel sampai sequencing. Gratis.",
    lang: "id",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fbf9f5",
    theme_color: "#fbf9f5",
    icons: [
      { src: "/ikon/ikon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/ikon/ikon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/ikon/ikon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
