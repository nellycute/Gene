import type { Config } from "tailwindcss";

/**
 * Nama warna di sini sengaja memakai bahasa Indonesia agar kode terbaca wajar:
 * bg-latar, text-teks-lembut, border-garis.
 *
 * Nilainya mengambil dari variabel CSS di src/app/globals.css, sehingga
 * pergantian mode terang dan gelap terjadi otomatis tanpa satu pun kelas
 * tambahan di dalam komponen.
 */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        latar: "var(--latar)",
        "latar-lembut": "var(--latar-lembut)",
        permukaan: "var(--permukaan)",
        teks: "var(--teks)",
        "teks-lembut": "var(--teks-lembut)",
        "teks-samar": "var(--teks-samar)",
        garis: "var(--garis)",
        "garis-tegas": "var(--garis-tegas)",
        aksen: "var(--aksen)",
        "aksen-lembut": "var(--aksen-lembut)",
        "aksen-teks": "var(--aksen-teks)",
        sorot: "var(--sorot)",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono-kode)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        lembut: "var(--bayang)",
      },
    },
  },
  plugins: [],
} satisfies Config;
