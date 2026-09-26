import { mkdir, open, readdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * PENYIMPAN VIDEO YOUTUBE — hanya di laptop (mode pengembangan).
 *
 * Perekam di /rekam-video mengirim potongan MP4 ke sini selama merekam, dan
 * potongan itu ditulis ke folder "Video YouTube" di root proyek, satu subfolder
 * per tingkat. Selama direkam, berkasnya bernama "….sedang.mp4" — berkas yang
 * belum tuntas tidak pernah terlihat seperti video jadi. Folder ini ditahan
 * .gitignore dan .vercelignore (ukurannya GB).
 */

export const dynamic = "force-dynamic";

const AKAR = path.join(process.cwd(), "Video YouTube");

const tolak = () => new Response("Tidak tersedia", { status: 404 });

/** Nama berkas Windows yang aman: tanpa garis miring dan tanda terlarang. */
function aman(nama: string | null) {
  const bersih = (nama ?? "").replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, " ").trim();
  if (!bersih || bersih.startsWith(".")) throw new Error("nama tidak sah");
  return bersih;
}

/** Semua video yang sudah jadi, sebagai "Subfolder/Nama.mp4". */
export async function GET() {
  if (process.env.NODE_ENV === "production") return tolak();
  const hasil: string[] = [];
  await mkdir(AKAR, { recursive: true });
  for (const d of await readdir(AKAR, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    for (const f of await readdir(path.join(AKAR, d.name)))
      if (f.endsWith(".mp4") && !f.endsWith(".sedang.mp4")) hasil.push(`${d.name}/${f}`);
  }
  return Response.json({ berkas: hasil });
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") return tolak();
  const url = new URL(request.url);
  const folder = path.join(AKAR, aman(url.searchParams.get("folder")));
  const nama = aman(url.searchParams.get("nama"));
  const sedang = path.join(folder, `${nama}.sedang.mp4`);
  const aksi = url.searchParams.get("aksi");

  if (aksi === "mulai") {
    await mkdir(folder, { recursive: true });
    await writeFile(sedang, new Uint8Array(0));
    return Response.json({ ok: true });
  }

  if (aksi === "tulis") {
    const posisi = Number(url.searchParams.get("posisi"));
    if (!Number.isSafeInteger(posisi) || posisi < 0) return new Response("posisi?", { status: 400 });
    const isi = new Uint8Array(await request.arrayBuffer());
    const berkas = await open(sedang, "r+");
    try {
      await berkas.write(isi, 0, isi.length, posisi);
    } finally {
      await berkas.close();
    }
    return Response.json({ ok: true });
  }

  if (aksi === "selesai") {
    const jadi = path.join(folder, `${nama}.mp4`);
    await rm(jadi, { force: true });
    await rename(sedang, jadi);
    const keterangan = await request.text();
    if (keterangan) await writeFile(path.join(folder, `${nama} - keterangan YouTube.txt`), keterangan, "utf8");
    return Response.json({ ok: true });
  }

  return new Response("aksi?", { status: 400 });
}
