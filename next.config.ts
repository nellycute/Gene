import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Gelembung "N" di pojok layar hanya berguna bagi programmer. Nely membuka
     website lewat mode pengembangan (pintasan "Ruang Genetika" di Desktop),
     jadi gelembung itu disembunyikan agar tidak menutupi halaman. Galat
     tetap ditampilkan kalau ada. */
  devIndicators: false,
};

export default nextConfig;
