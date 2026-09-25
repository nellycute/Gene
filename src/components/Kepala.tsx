"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { TombolTema } from "./TombolTema";
import { levelDariSlug, type Level } from "@/lib/kurikulum";
import { warnaTingkat, TINGKAT } from "@/lib/tingkat";
import { SEL } from "@/lib/warna";

/**
 * BILAH ATAS (KEPUTUSAN-DESAIN.md §7)
 *
 * Tipis, menempel di puncak layar. 54 px di HP, 52 px di laptop.
 * - Laptop: tiga tautan mendatar + tombol mode gelap. Tanpa tombol tiga garis.
 * - HP: tombol tiga garis → panel turun, isi halaman di belakangnya meredup 28%.
 *   Menutup lewat empat jalan: tanda ×, ketuk bagian yang meredup, Esc, atau
 *   memilih isi menu.
 * - Di layar menonton, sisi kiri berubah jadi tombol kembali `← Nama Tingkat`.
 */

const TAUTAN = [
  { href: "/", label: "Materi" },
  { href: "/peta-warna", label: "Peta Warna" },
  { href: "/tentang", label: "Tentang" },
] as const;

type Tahap = "tertutup" | "terbuka" | "menutup";

export function Kepala() {
  const pathname = usePathname();
  /* Keadaan menu diikat ke alamat saat dibuka: berpindah halaman = otomatis
     tertutup, tanpa perlu efek tambahan. */
  const [menu, setMenu] = useState<{ tahap: Tahap; di: string }>({
    tahap: "tertutup",
    di: pathname,
  });
  const tahap = menu.di === pathname ? menu.tahap : "tertutup";
  const pewaktu = useRef<number | null>(null);

  const slug = pathname.match(/^\/pelajaran\/([^/]+)/)?.[1];
  const level = slug ? levelDariSlug(slug) : undefined;

  function buka() {
    if (pewaktu.current) window.clearTimeout(pewaktu.current);
    setMenu({ tahap: "terbuka", di: pathname });
  }

  function tutup() {
    setMenu((m) => (m.tahap === "terbuka" ? { ...m, tahap: "menutup" } : m));
    pewaktu.current = window.setTimeout(
      () => setMenu((m) => ({ ...m, tahap: "tertutup" })),
      140,
    );
  }

  /* Esc menutup menu. */
  useEffect(() => {
    if (tahap !== "terbuka") return;
    const tangani = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenu((m) => (m.tahap === "terbuka" ? { ...m, tahap: "menutup" } : m));
      pewaktu.current = window.setTimeout(
        () => setMenu((m) => ({ ...m, tahap: "tertutup" })),
        140,
      );
    };
    window.addEventListener("keydown", tangani);
    return () => window.removeEventListener("keydown", tangani);
  }, [tahap]);

  const terbuka = tahap === "terbuka";
  const tampak = tahap !== "tertutup";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-garis bg-latar">
        {/* di layar menonton selebar isi halaman (video ¾ + Catatan ¼), agar tombol kembali sejajar dengan video */}
        <div
          className={`relative mx-auto flex h-[54px] max-w-6xl items-center px-4 sm:h-[52px] sm:px-6 ${
            slug ? "lg:max-w-[1920px]" : ""
          }`}
        >
          {level && slug ? <TombolKembali level={level} slug={slug} /> : <Logo />}

          {/* Laptop: tautan mendatar */}
          <nav aria-label="Menu utama" className="ml-auto hidden items-center gap-0.5 sm:flex">
            {TAUTAN.map((t) => {
              const aktif = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  aria-current={aktif ? "page" : undefined}
                  className={`rounded-lg px-3 py-1.5 text-[13.5px] transition hover:bg-latar-lembut ${
                    aktif ? "font-semibold text-teks" : "font-medium text-teks-lembut hover:text-teks"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
            <span className="ml-1.5">
              <TombolTema />
            </span>
          </nav>

          {/* HP: tombol tiga garis */}
          <button
            type="button"
            onClick={terbuka ? tutup : buka}
            aria-expanded={terbuka}
            aria-controls="menu-hp"
            aria-label={terbuka ? "Tutup menu" : "Buka menu"}
            className="ml-auto grid h-10 w-10 place-items-center rounded-lg text-teks transition hover:bg-latar-lembut active:scale-[0.97] sm:hidden"
          >
            <IkonMenu silang={terbuka} />
          </button>

          {/* HP: panel turun dari bilah */}
          {tampak && (
            <nav
              id="menu-hp"
              aria-label="Menu utama"
              className={`absolute inset-x-0 top-full border-b border-garis bg-latar shadow-lembut sm:hidden ${
                terbuka ? "anim-turun" : "anim-naik-hilang"
              }`}
            >
              <ul className="py-1">
                <BarisMenu href="/" ikon={<IkonMateri />} onPilih={tutup}>
                  Materi
                </BarisMenu>
                <BarisMenu href="/peta-warna" ikon={<IkonPetaWarna />} onPilih={tutup}>
                  Peta Warna
                </BarisMenu>
                <BarisMenu href="/tentang" ikon={<IkonTentang />} onPilih={tutup}>
                  Tentang
                </BarisMenu>
                <li className="mx-4 my-1 border-t border-garis" role="separator" />
                <li>
                  <TombolTema wujud="sakelar" />
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>

      {/* HP: lapisan peredup di belakang panel */}
      {tampak && (
        <div
          aria-hidden="true"
          onClick={tutup}
          className={`fixed inset-0 z-30 bg-black/[0.28] sm:hidden ${
            terbuka ? "anim-muncul" : "anim-hilang"
          }`}
        />
      )}
    </>
  );
}

/** `← Nama Tingkat` dengan titik warna tingkat — hanya di layar menonton. */
function TombolKembali({ level, slug }: { level: Level; slug: string }) {
  const warna = warnaTingkat(level.nomor);
  return (
    <Link
      href={`/?buka=${level.nomor}&sorot=${slug}`}
      className="-ml-2 flex h-10 items-center gap-2 rounded-lg px-2 text-[14px] font-semibold transition hover:bg-latar-lembut active:scale-[0.97]"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M9.5 3 4.5 8l5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: warna.batang }}
        aria-hidden="true"
      />
      <span>{level.nama}</span>
    </Link>
  );
}

function BarisMenu({
  href,
  ikon,
  onPilih,
  children,
}: {
  href: string;
  ikon: React.ReactNode;
  onPilih: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onPilih}
        className="flex h-[52px] items-center gap-3 px-4 text-[15px] font-semibold transition hover:bg-latar-lembut"
      >
        <span className="grid w-[18px] place-items-center">{ikon}</span>
        {children}
      </Link>
    </li>
  );
}

/* ---------- ikon ---------- */

function IkonMenu({ silang }: { silang: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {silang ? (
        <path
          d="M5 5l10 10M15 5 5 15"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M3.5 5.5h13M3.5 10h13M3.5 14.5h13"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

/** Empat strip pelangi kecil. */
function IkonMateri() {
  const pilih = [TINGKAT[0], TINGKAT[2], TINGKAT[4], TINGKAT[6]];
  return (
    <span className="flex items-end gap-[2px]" aria-hidden="true">
      {pilih.map((t, i) => (
        <span
          key={t.nomor}
          style={{
            width: 3,
            height: [10, 14, 8, 12][i],
            borderRadius: 1.5,
            background: t.batang,
          }}
        />
      ))}
    </span>
  );
}

/** Empat kotak warna biologi. */
function IkonPetaWarna() {
  const pilih = [SEL.mitokondria, SEL.inti, SEL.reKasar, SEL.golgi];
  return (
    <span className="grid grid-cols-2 gap-[2px]" aria-hidden="true">
      {pilih.map((e) => (
        <span key={e.id} className="h-[7px] w-[7px] rounded-[2px]" style={{ background: e.warna }} />
      ))}
    </span>
  );
}

function IkonTentang() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
