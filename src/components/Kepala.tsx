import Link from "next/link";
import { TombolTema } from "./TombolTema";

export function Kepala() {
  return (
    <header className="kaca-latar sticky top-0 z-40 border-b border-garis">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-bold tracking-tight"
        >
          <TandaHeliks />
          <span className="text-[17px]">
            Ruang<span className="text-aksen">Genetika</span>
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-1 text-sm">
          <Tautan href="/#materi">Materi</Tautan>
          <Tautan href="/peta-warna">Peta Warna</Tautan>
          <Tautan href="/tentang">Tentang</Tautan>
          <div className="ml-1.5">
            <TombolTema />
          </div>
        </nav>
      </div>
    </header>
  );
}

function Tautan({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="hidden rounded-lg px-3 py-2 text-teks-lembut transition hover:bg-latar-lembut hover:text-teks sm:block"
    >
      {children}
    </Link>
  );
}

/** Tanda pengenal: heliks ganda kecil dengan warna aksen. */
function TandaHeliks() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path
        d="M8 3c0 5 10 5 10 10S8 18 8 23"
        stroke="var(--aksen)"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M18 3c0 5-10 5-10 10s10 5 10 10"
        stroke="var(--aksen)"
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity="0.45"
      />
      {[7.5, 13, 18.5].map((y) => (
        <line
          key={y}
          x1="9.2"
          y1={y}
          x2="16.8"
          y2={y}
          stroke="var(--aksen)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}
