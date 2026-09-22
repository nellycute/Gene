import type { Config } from "tailwindcss";

/**
 * Nama warna di sini sengaja memakai bahasa Indonesia agar kode terbaca wajar:
 * bg-latar, text-teks-lembut, border-garis.
 *
 * Nilainya mengambil dari variabel CSS di src/app/globals.css, sehingga
 * pergantian mode terang dan gelap terjadi otomatis tanpa satu pun kelas
 * tambahan di dalam komponen.
 *
 * Tidak ada warna aksen. Antarmuka hanya kertas dan tinta
 * (KEPUTUSAN-DESAIN.md §1.1). Warna tingkat diambil dari src/lib/tingkat.ts
 * dan dipasang lewat style, bukan kelas, karena hanya boleh muncul sebagai
 * garis tipis dan label kecil.
 */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        latar: "var(--latar)",
        "latar-lembut": "var(--latar-lembut)",
        permukaan: "var(--permukaan)",
        panggung: "var(--panggung)",
        teks: "var(--teks)",
        "teks-lembut": "var(--teks-lembut)",
        "teks-samar": "var(--teks-samar)",
        "teks-pudar": "var(--teks-pudar)",
        "tombol-teks": "var(--tombol-teks)",
        garis: "var(--garis)",
        "garis-tegas": "var(--garis-tegas)",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono-kode)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        lembut: "var(--bayang)",
      },
      transitionTimingFunction: {
        buka: "cubic-bezier(.2,.8,.25,1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
