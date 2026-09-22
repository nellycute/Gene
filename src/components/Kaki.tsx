import Link from "next/link";

export function Kaki() {
  return (
    <footer className="mt-20 border-t border-garis bg-latar-lembut">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-bold tracking-tight">
              Ruang<span className="text-aksen">Genetika</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-teks-lembut">
              Materi genetika berbahasa Indonesia, gratis dan terbuka untuk
              siapa saja. Dibuat oleh Nely.
            </p>
          </div>

          <div className="text-sm">
            <p className="mb-3 font-semibold">Jelajahi</p>
            <ul className="space-y-2 text-teks-lembut">
              <li>
                <Link href="/#materi" className="hover:text-teks">
                  Daftar materi
                </Link>
              </li>
              <li>
                <Link href="/peta-warna" className="hover:text-teks">
                  Peta warna
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-teks">
                  Tentang project ini
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-garis pt-6 text-xs leading-relaxed text-teks-samar">
          <p>
            Materi di situs ini dibagikan dengan lisensi{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/deed.id"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-teks-lembut"
            >
              Creative Commons BY-SA 4.0
            </a>
            . Kamu bebas memakai dan menyebarkannya — termasuk untuk mengajar —
            asalkan mencantumkan sumbernya dan tetap membukanya untuk orang lain.
          </p>
          <p className="mt-2">
            Isi situs ini adalah bahan belajar, bukan nasihat medis atau hasil
            pemeriksaan genetik pribadi.
          </p>
        </div>
      </div>
    </footer>
  );
}
