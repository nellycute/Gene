"use client";

import { useSedangGelap } from "@/lib/jendela";
import { pasangTema } from "@/lib/tema";

/**
 * Dua wujud untuk satu pengaturan yang sama:
 *  - `ikon`    : tombol kecil di bilah atas laptop.
 *  - `sakelar` : baris "Mode gelap" dengan sakelar di dalam menu HP.
 *
 * Tidak menyimpan keadaan sendiri — membaca langsung dari <html>, sehingga
 * kedua wujud selalu sepakat.
 */
export function TombolTema({ wujud = "ikon" }: { wujud?: "ikon" | "sakelar" }) {
  const gelap = useSedangGelap();
  const ganti = () => pasangTema(!gelap);

  if (wujud === "sakelar") {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={gelap}
        onClick={ganti}
        className="flex h-[52px] w-full items-center gap-3 px-4 text-left"
      >
        <IkonTema gelap={gelap} />
        <span className="flex-1 text-[15px] font-semibold">Mode gelap</span>
        <span
          aria-hidden="true"
          className={`relative h-6 w-10 rounded-full border transition-colors duration-150 ${
            gelap ? "border-teks bg-teks" : "border-garis-tegas bg-latar-lembut"
          }`}
        >
          <span
            className={`absolute top-[3px] h-4 w-4 rounded-full transition-transform duration-150 ease-buka ${
              gelap ? "translate-x-[19px] bg-tombol-teks" : "translate-x-[3px] bg-teks-samar"
            }`}
          />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={ganti}
      aria-label={gelap ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
      title={gelap ? "Mode terang" : "Mode gelap"}
      className="tombol-garis grid h-9 w-9 place-items-center rounded-lg"
    >
      <IkonTema gelap={gelap} />
    </button>
  );
}

function IkonTema({ gelap }: { gelap: boolean }) {
  return gelap ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
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
