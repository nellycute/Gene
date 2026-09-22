"use client";

import { useEffect, useState } from "react";

type Tema = "terang" | "gelap" | "sistem";

const KUNCI = "tema-ruang-genetika";

export function TombolTema() {
  const [tema, setTema] = useState<Tema>("sistem");
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    const tersimpan = localStorage.getItem(KUNCI) as Tema | null;
    if (tersimpan === "terang" || tersimpan === "gelap") setTema(tersimpan);
    setSiap(true);
  }, []);

  function ganti() {
    const berikut: Tema =
      tema === "sistem" ? "gelap" : tema === "gelap" ? "terang" : "sistem";
    setTema(berikut);

    const akar = document.documentElement;
    akar.classList.remove("gelap", "terang");
    if (berikut === "sistem") {
      localStorage.removeItem(KUNCI);
    } else {
      akar.classList.add(berikut);
      localStorage.setItem(KUNCI, berikut);
    }
  }

  const label =
    tema === "sistem"
      ? "Mengikuti pengaturan perangkat"
      : tema === "gelap"
        ? "Mode gelap"
        : "Mode terang";

  return (
    <button
      type="button"
      onClick={ganti}
      title={label}
      aria-label={`${label}. Klik untuk mengganti.`}
      className="grid h-9 w-9 place-items-center rounded-lg border border-garis text-teks-lembut transition hover:border-garis-tegas hover:text-teks"
    >
      {/* Sebelum tema tersimpan terbaca, tampilkan ikon netral agar tidak berkedip */}
      {!siap || tema === "sistem" ? (
        <IkonSistem />
      ) : tema === "gelap" ? (
        <IkonBulan />
      ) : (
        <IkonMatahari />
      )}
    </button>
  );
}

function IkonMatahari() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
        <line
          key={d}
          x1="12"
          y1="2.6"
          x2="12"
          y2="5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          transform={`rotate(${d} 12 12)`}
        />
      ))}
    </svg>
  );
}

function IkonBulan() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IkonSistem() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="4.5"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 20.5h7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
