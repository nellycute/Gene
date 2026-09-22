/**
 * Mode terang / gelap.
 *
 * Kelas `gelap` atau `terang` pada <html> mengalahkan pengaturan perangkat.
 * Tanpa kelas, halaman mengikuti perangkat. Skrip kecil di layout.tsx
 * memasang kelas tersimpan sebelum halaman tergambar agar tidak berkedip.
 */

export const KUNCI_TEMA = "tema-ruang-genetika";

/** Apakah halaman sedang gelap sekarang — dari kelas, atau dari perangkat. */
export function sedangGelap(): boolean {
  if (typeof document === "undefined") return false;
  const akar = document.documentElement;
  if (akar.classList.contains("gelap")) return true;
  if (akar.classList.contains("terang")) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/** Pasang mode secara tegas dan simpan pilihannya. */
export function pasangTema(gelap: boolean) {
  const akar = document.documentElement;
  akar.classList.remove("gelap", "terang");
  akar.classList.add(gelap ? "gelap" : "terang");
  try {
    localStorage.setItem(KUNCI_TEMA, gelap ? "gelap" : "terang");
  } catch {
    /* penyimpanan bisa ditolak di mode penyamaran — abaikan */
  }
}
