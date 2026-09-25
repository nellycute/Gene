/**
 * Memuat semua naskah pelajaran (src/konten/*.ts) dari Node, tanpa esbuild/tsx —
 * keduanya memakai berkas biner yang diblokir Smart App Control di komputer Nely.
 * TypeScript sendiri murni JavaScript, jadi dipakai untuk membuang tipe, lalu
 * hasilnya diimpor sebagai modul.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";

export const FOLDER_KONTEN = "src/konten";

/** @returns {Promise<{ berkas: string, pelajaran: any }[]>} urut nama berkas */
export async function muatSemuaPelajaran() {
  const hasil = [];
  for (const berkas of readdirSync(FOLDER_KONTEN).filter((f) => f.endsWith(".ts")).sort()) {
    const sumber = readFileSync(join(FOLDER_KONTEN, berkas), "utf8");
    const js = ts.transpileModule(sumber, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const modul = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
    for (const nilai of Object.values(modul)) {
      if (nilai && typeof nilai === "object" && Array.isArray(nilai.adegan) && nilai.slug) {
        hasil.push({ berkas, pelajaran: nilai });
      }
    }
  }
  return hasil;
}
