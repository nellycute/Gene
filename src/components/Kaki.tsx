import Link from "next/link";

/**
 * Kaki halaman: satu baris saja. Halaman pertama harus muat satu layar HP
 * (KEPUTUSAN-DESAIN.md §5.1), jadi tidak ada ruang untuk kaki yang panjang.
 * Penjelasan lisensi dan pengingat medis pindah ke halaman /tentang.
 */
export function Kaki() {
  return (
    <footer className="border-t border-garis">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 text-[11.5px] text-teks-samar sm:px-6">
        <p>
          Bebas dipakai mengajar ·{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.id"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-teks-lembut"
          >
            CC BY-SA
          </a>
        </p>
        <p>
          Bahan belajar, bukan nasihat medis ·{" "}
          <Link href="/tentang" className="underline underline-offset-2 hover:text-teks-lembut">
            Tentang
          </Link>
        </p>
      </div>
    </footer>
  );
}
