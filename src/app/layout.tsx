import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Kepala } from "@/components/Kepala";
import { Kaki } from "@/components/Kaki";

/* Plus Jakarta Sans — huruf yang dirancang di Jakarta, sangat terbaca di layar
   kecil dan terasa hangat tanpa kehilangan kesan serius. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

/* Huruf monospasi khusus untuk deret basa DNA/RNA, agar A T G C selalu sejajar. */
const monoKode = JetBrains_Mono({
  variable: "--font-mono-kode",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ruang Genetika — belajar genetika dari sel sampai sequencing",
    template: "%s · Ruang Genetika",
  },
  description:
    "Materi genetika berbahasa Indonesia dengan animasi berwarna: dari pengenalan sel, DNA, dan RNA sampai teknik sequencing dan penerapannya. Gratis, tanpa perlu mendaftar.",
  keywords: [
    "genetika",
    "biologi molekuler",
    "DNA",
    "RNA",
    "sel",
    "sequencing",
    "belajar genetika",
    "materi genetika bahasa Indonesia",
  ],
  authors: [{ name: "Nely" }],
  openGraph: {
    title: "Ruang Genetika",
    description:
      "Belajar genetika lewat animasi berwarna — dari sel sampai sequencing. Gratis dan terbuka.",
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#10151c" },
  ],
};

/* Dijalankan sebelum halaman tergambar, supaya tidak ada kedipan putih
   saat penonton memilih mode gelap. */
const skripTema = `
(function () {
  try {
    var t = localStorage.getItem('tema-ruang-genetika');
    if (t === 'gelap') document.documentElement.classList.add('gelap');
    if (t === 'terang') document.documentElement.classList.add('terang');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${monoKode.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: skripTema }} />
      </head>
      <body className="min-h-full flex flex-col bg-latar text-teks">
        <a
          href="#isi-utama"
          className="tombol-tinta sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2"
        >
          Lompat ke isi utama
        </a>
        <Kepala />
        <main id="isi-utama" className="flex-1">
          {children}
        </main>
        <Kaki />
      </body>
    </html>
  );
}
