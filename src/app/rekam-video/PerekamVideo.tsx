"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Muxer, StreamTarget } from "mp4-muxer";
import { ANIMASI, type PropsAnimasi } from "@/animasi/daftar";
import { SEMUA_ENTITAS } from "@/lib/warna";
import { TINGKAT, TINGGI_STRIP_LOGO, warnaTingkat } from "@/lib/tingkat";
import { jadwalSubtitel, potonganPada } from "@/lib/subtitel";
import { awalFokusSama, isyaratPada, jadwalIsyarat } from "@/lib/isyarat";
import { JEDA_AWAL, lamaAdegan, totalDurasi, type Pelajaran } from "@/lib/tipe";

/* Penjelasan lengkap ada di page.tsx. */

export type ButirAntrian = { slug: string; folder: string; nama: string };

type Studio = { langkahRekam: (ms: number) => void; renderer: { domElement: HTMLCanvasElement } };
type JendelaRekam = Window & {
  __studioFilm?: Studio;
  __propsFilm?: () => PropsAnimasi;
  __statusRekam?: string;
};

/* ---------- ukuran bingkai video ---------- */
const W = 1920;
const H = 1080;
const FPS = 30;
const LAJU_BIT = 5_000_000;
const LAJU_SAMPEL = 48_000;
/** Kartu judul sebelum film, dan kartu penutup sesudahnya (detik). */
const PEMBUKA = 4;
const PENUTUP = 6;
/** Lama silang-pudar kartu ↔ film. */
const PUDAR = 0.6;

const TEPI = 36;
const PANGGUNG = { x: TEPI, y: 100, w: W - TEPI * 2, h: 786 };
const SUBTITEL = { x: TEPI, y: PANGGUNG.y + PANGGUNG.h + 18, w: W - TEPI * 2, h: H - (PANGGUNG.y + PANGGUNG.h + 18) - 30 };

/* Warna antarmuka mode terang (globals.css) — video selalu terang. */
const LATAR = "#fbf9f5";
const PANGGUNG_WARNA = "#f3efe7";
const PERMUKAAN = "#ffffff";
const GARIS = "#ede6d9";
const TINTA = "#1b2430";
const LEMBUT = "#5c6878";
const SAMAR = "#93897a";

const HURUF = '"Plus Jakarta Sans", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';
const ALAMAT = "ruang-genetika.vercel.app";

export function PerekamVideo({
  antrian,
  pelajaran,
  namaTingkat,
  berikutnya,
  lanjut,
}: {
  antrian: ButirAntrian[];
  pelajaran?: Pelajaran;
  namaTingkat: string;
  berikutnya?: { nomor: string; judul: string };
  lanjut: boolean;
}) {
  const kanvasRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [film, setFilm] = useState<{ props: PropsAnimasi; lebar: number; tinggi: number } | null>(null);
  const Tiga = pelajaran ? ANIMASI[pelajaran.animasi].Tiga : undefined;

  useEffect(() => {
    const w = window as JendelaRekam;
    const lapor = (teks: string) => {
      w.__statusRekam = teks;
      document.title = teks;
      if (statusRef.current) statusRef.current.textContent = teks;
    };
    let batal = false;

    /* Tanpa slug: cari pelajaran pertama yang videonya belum ada. */
    if (!pelajaran) {
      void (async () => {
        const { berkas } = (await (await fetch("/api/rekam-video")).json()) as { berkas: string[] };
        const ada = new Set(berkas);
        const sisa = antrian.filter((b) => !ada.has(`${b.folder}/${b.nama}.mp4`));
        if (batal) return;
        if (!sisa.length) lapor(`SEMUA SELESAI — ${antrian.length} video`);
        else location.replace(`/rekam-video?slug=${sisa[0].slug}&lanjut=1`);
      })();
      return () => {
        batal = true;
      };
    }

    const butir = antrian.find((b) => b.slug === pelajaran.slug);
    const kanvas = kanvasRef.current;
    if (!butir || !kanvas || !Tiga) {
      lapor("GAGAL: pelajaran ini tidak punya film 3D");
      return;
    }

    void rekam({
      pelajaran,
      butir,
      namaTingkat,
      berikutnya,
      kanvas,
      lapor,
      pasangFilm: (props, lebar, tinggi) => setFilm({ props, lebar, tinggi }),
      aturProps: (props) => flushSync(() => setFilm((f) => (f ? { ...f, props } : f))),
      batal: () => batal,
    })
      .then(() => {
        if (!batal && lanjut) location.replace("/rekam-video");
      })
      .catch((e: unknown) => {
        lapor(`GAGAL: ${e instanceof Error ? e.message : String(e)}`);
        /* rekam semua: coba lagi pelajaran ini sampai tiga kali, baru menyerah */
        if (batal || !lanjut) return;
        const kunci = `rekam-gagal-${pelajaran.slug}`;
        let kali = 0;
        try {
          kali = Number(sessionStorage.getItem(kunci) ?? 0) + 1;
          sessionStorage.setItem(kunci, String(kali));
        } catch {
          kali = 3;
        }
        if (kali < 3) setTimeout(() => location.reload(), 5000);
      });
    return () => {
      batal = true;
    };
  }, [pelajaran, antrian, namaTingkat, berikutnya, lanjut, Tiga]);

  return (
    <div className="fixed inset-0 z-[70] overflow-hidden" style={{ background: LATAR }}>
      {/* Film digambar di sini (tertutup pratinjau); bingkainya disalin ke kanvas video. */}
      {film && Tiga && (
        <div className="absolute left-0 top-0 -z-10" style={{ width: film.lebar, height: film.tinggi }}>
          <Tiga {...film.props} />
        </div>
      )}
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col gap-3 p-4" style={{ background: LATAR }}>
        <p ref={statusRef} className="font-mono text-[13px]">
          Menyiapkan…
        </p>
        <canvas ref={kanvasRef} width={W} height={H} className="w-full rounded-lg shadow" />
      </div>
    </div>
  );
}

/* ================================================================== *
 * Rekaman satu pelajaran
 * ================================================================== */

type Tugas = {
  pelajaran: Pelajaran;
  butir: ButirAntrian;
  namaTingkat: string;
  berikutnya?: { nomor: string; judul: string };
  kanvas: HTMLCanvasElement;
  lapor: (teks: string) => void;
  pasangFilm: (props: PropsAnimasi, lebar: number, tinggi: number) => void;
  aturProps: (props: PropsAnimasi) => void;
  batal: () => boolean;
};

/** Beri giliran pada peramban tanpa setTimeout — pewaktu di tab tersembunyi diperlambat. */
const giliran = () =>
  new Promise<void>((r) => {
    const c = new MessageChannel();
    c.port1.onmessage = () => r();
    c.port2.postMessage(0);
  });

async function rekam(t: Tugas) {
  const { pelajaran, butir, kanvas, lapor } = t;
  const w = window as JendelaRekam;
  const ctx = kanvas.getContext("2d", { alpha: false });
  if (!ctx) throw new Error("kanvas 2D tidak ada");

  await Promise.all(
    [`800 40px ${HURUF}`, `600 26px ${HURUF}`, `500 38px ${HURUF}`, `italic 400 26px ${HURUF}`, `600 26px ${MONO}`].map(
      (f) => document.fonts.load(f),
    ),
  );
  await document.fonts.ready;

  /* ---------- garis waktu pelajaran ---------- */
  const adegan = pelajaran.adegan;
  const awal: number[] = [];
  let jalan = 0;
  for (const a of adegan) {
    awal.push(jalan);
    jalan += lamaAdegan(a);
  }
  const total = totalDurasi(pelajaran);
  const lamaVideo = PEMBUKA + total + PENUTUP;
  const jumlahBingkai = Math.ceil(lamaVideo * FPS);
  const jadwal = adegan.map((a) => ({ isyarat: jadwalIsyarat(a), subtitel: jadwalSubtitel(a) }));

  const posisiPada = (detik: number) => {
    const d = Math.min(Math.max(0, detik), total - 1e-3);
    let i = 0;
    while (i < adegan.length - 1 && awal[i + 1] <= d) i++;
    return { i, waktu: d - awal[i], d };
  };

  /** Sama persis dengan yang dihitung PemutarPelajaran untuk panggung. */
  const propsPada = (detik: number): PropsAnimasi => {
    const { i, waktu, d } = posisiPada(detik);
    const a = adegan[i];
    const isy = isyaratPada(jadwal[i].isyarat, waktu);
    return {
      tahap: isy?.tahap ?? a.tahap,
      sorot: isy?.sorot ?? a.sorot ?? [],
      fokus: isy?.fokus ?? a.fokus,
      detik: d,
      sejak: waktu - (isy?.mulai ?? 0),
      sejakFokus: waktu - awalFokusSama(a, jadwal[i].isyarat, waktu),
      kunci: `${i}:${isy?.nomor ?? "-"}`,
    };
  };

  /* ---------- suara: semua rekaman adegan disusun di satu jalur ---------- */
  lapor(`${butir.nama}: menyusun suara…`);
  const panjangSampel = Math.ceil(lamaVideo * LAJU_SAMPEL);
  const ruangSuara = new OfflineAudioContext(2, panjangSampel, LAJU_SAMPEL);
  let tanpaSuara = 0;
  for (let i = 0; i < adegan.length; i++) {
    const s = adegan[i].suara;
    if (!s) {
      tanpaSuara++;
      continue;
    }
    const data = await (await fetch(s.berkas)).arrayBuffer();
    const buf = await ruangSuara.decodeAudioData(data);
    const sumber = ruangSuara.createBufferSource();
    sumber.buffer = buf;
    sumber.connect(ruangSuara.destination);
    sumber.start(PEMBUKA + awal[i] + JEDA_AWAL);
  }
  const suara = await ruangSuara.startRendering();

  /* ---------- penyimpan: potongan MP4 dikirim berurutan ke laptop ---------- */
  const alamat = (aksi: string, extra = "") =>
    `/api/rekam-video?aksi=${aksi}&folder=${encodeURIComponent(butir.folder)}&nama=${encodeURIComponent(butir.nama)}${extra}`;
  /* server pengembangan kadang tersendat sesaat (menyusun ulang halaman) — dicoba lagi */
  const kirim = async (aksi: string, isi?: BodyInit, extra = "") => {
    for (let coba = 1; ; coba++) {
      try {
        const r = await fetch(alamat(aksi, extra), { method: "POST", body: isi });
        if (r.ok) return;
        if (coba >= 6) throw new Error(`simpan ${aksi}: ${r.status}`);
      } catch (e) {
        if (coba >= 6) throw e;
      }
      await new Promise((r) => setTimeout(r, 1000 * coba));
    }
  };
  await kirim("mulai");
  /* berurutan: tambalan kepala berkas di akhir tidak boleh didahului potongan lama */
  let antre: Promise<void> = Promise.resolve();
  let menunggu = 0;
  let galat: unknown = null;
  const target = new StreamTarget({
    chunked: true,
    chunkSize: 4 * 1024 * 1024,
    onData: (data, posisi) => {
      const salinan = data.slice();
      menunggu++;
      antre = antre
        .then(() => kirim("tulis", salinan, `&posisi=${posisi}`))
        .catch((e) => {
          galat = e;
        })
        .finally(() => {
          menunggu--;
        });
    },
  });
  const muxer = new Muxer({
    target,
    video: { codec: "avc", width: W, height: H, frameRate: FPS },
    audio: { codec: "aac", numberOfChannels: 2, sampleRate: LAJU_SAMPEL },
    fastStart: false,
    firstTimestampBehavior: "offset",
  });

  /* ---------- sandi suara (AAC) ---------- */
  const penyandiSuara = new AudioEncoder({
    output: (c, m) => muxer.addAudioChunk(c, m),
    error: (e) => {
      galat = e;
    },
  });
  penyandiSuara.configure({ codec: "mp4a.40.2", sampleRate: LAJU_SAMPEL, numberOfChannels: 2, bitrate: 160_000 });
  const kiri = suara.getChannelData(0);
  const kanan = suara.getChannelData(1);
  const POTONG = 4800;
  for (let s = 0; s < panjangSampel; s += POTONG) {
    const n = Math.min(POTONG, panjangSampel - s);
    const planar = new Float32Array(n * 2);
    planar.set(kiri.subarray(s, s + n), 0);
    planar.set(kanan.subarray(s, s + n), n);
    const ad = new AudioData({
      format: "f32-planar",
      sampleRate: LAJU_SAMPEL,
      numberOfFrames: n,
      numberOfChannels: 2,
      timestamp: Math.round((s / LAJU_SAMPEL) * 1e6),
      data: planar,
    });
    penyandiSuara.encode(ad);
    ad.close();
  }
  await penyandiSuara.flush();

  /* ---------- sandi gambar (H.264) ---------- */
  const penyandi = new VideoEncoder({
    output: (c, m) => muxer.addVideoChunk(c, m),
    error: (e) => {
      galat = e;
    },
  });
  penyandi.configure({
    codec: "avc1.640028",
    width: W,
    height: H,
    bitrate: LAJU_BIT,
    framerate: FPS,
    latencyMode: "quality",
    avc: { format: "avc" },
  });

  /* ---------- pasang film ---------- */
  const dpr = window.devicePixelRatio || 1;
  t.pasangFilm(propsPada(0), Math.round(PANGGUNG.w / dpr), Math.round(PANGGUNG.h / dpr));
  lapor(`${butir.nama}: memuat film…`);
  for (let i = 0; i < 600 && !(w.__studioFilm && w.__propsFilm); i++) await new Promise((r) => setTimeout(r, 50));
  const studio = w.__studioFilm;
  if (!studio || !w.__propsFilm) throw new Error("film tidak termuat");
  const glKanvas = studio.renderer.domElement;
  const tirai = glKanvas.parentElement?.nextElementSibling as HTMLElement | null;

  /** Kirim adegan ke film, dan pastikan film sudah membacanya sebelum bingkai digambar. */
  const setelProps = async (p: PropsAnimasi) => {
    t.aturProps(p);
    for (let k = 0; k < 50; k++) {
      const kini = w.__propsFilm?.();
      if (kini && kini.detik === p.detik && kini.kunci === p.kunci) return;
      await giliran();
    }
    throw new Error("film tidak mengikuti adegan");
  };
  /* bingkai pemanasan: set pertama dibangun, kamera menempati tempatnya */
  await setelProps(propsPada(0));
  for (let k = 0; k < 3; k++) studio.langkahRekam(1000 / FPS);

  /* ---------- gambar tiap bingkai ---------- */
  const warna = warnaTingkat(pelajaran.level);
  const kartuAwal = () => gambarPembuka(ctx, pelajaran, t.namaTingkat, warna);
  const kartuAkhir = () => gambarPenutup(ctx, t.berikutnya, warna);
  let potonganTerakhir = "";
  let sejakPotongan = 0;
  const mulaiRekam = performance.now();

  for (let f = 0; f < jumlahBingkai; f++) {
    if (t.batal()) return;
    if (galat) throw galat;
    const detik = f / FPS;
    const detikFilm = detik - PEMBUKA;

    if (detik < PEMBUKA - PUDAR) {
      kartuAwal();
    } else {
      const props = propsPada(detikFilm);
      await setelProps(props);
      studio.langkahRekam(1000 / FPS);

      /* layar video: judul · panggung · subtitel */
      ctx.globalAlpha = 1;
      ctx.fillStyle = LATAR;
      ctx.fillRect(0, 0, W, H);
      gambarKepala(ctx, pelajaran, warna);
      ctx.save();
      jalurBulat(ctx, PANGGUNG.x, PANGGUNG.y, PANGGUNG.w, PANGGUNG.h, 26);
      ctx.clip();
      ctx.fillStyle = PANGGUNG_WARNA;
      ctx.fillRect(PANGGUNG.x, PANGGUNG.y, PANGGUNG.w, PANGGUNG.h);
      ctx.drawImage(glKanvas, PANGGUNG.x, PANGGUNG.y, PANGGUNG.w, PANGGUNG.h);
      const tutup = Number(tirai?.style.opacity || 0);
      if (tutup > 0) {
        ctx.globalAlpha = tutup;
        ctx.fillRect(PANGGUNG.x, PANGGUNG.y, PANGGUNG.w, PANGGUNG.h);
        ctx.globalAlpha = 1;
      }
      const { i, waktu } = posisiPada(detikFilm);
      if (detikFilm >= 0 && detikFilm < total)
        gambarLencana(ctx, adegan[i].tajuk, props.sorot ?? [], isyaratPada(jadwal[i].isyarat, waktu)?.label);
      ctx.restore();

      const dalamFilm = detikFilm >= 0 && detikFilm < total;
      const teks = dalamFilm ? (jadwal[i].subtitel[potonganPada(jadwal[i].subtitel, waktu)]?.teks ?? "") : "";
      if (teks !== potonganTerakhir) {
        potonganTerakhir = teks;
        sejakPotongan = detik;
      }
      gambarSubtitel(ctx, teks, Math.min(1, (detik - sejakPotongan) / 0.18));

      /* silang-pudar dengan kartu pembuka / penutup */
      if (detik < PEMBUKA) {
        ctx.globalAlpha = 1 - (detik - (PEMBUKA - PUDAR)) / PUDAR;
        kartuAwal();
      } else if (detikFilm > total + 0.3) {
        ctx.globalAlpha = Math.min(1, (detikFilm - total - 0.3) / PUDAR);
        kartuAkhir();
      }
      ctx.globalAlpha = 1;
    }

    const bingkai = new VideoFrame(kanvas, { timestamp: Math.round((f * 1e6) / FPS), duration: Math.round(1e6 / FPS) });
    penyandi.encode(bingkai, { keyFrame: f % (FPS * 2) === 0 });
    bingkai.close();
    while (penyandi.encodeQueueSize > 6) await new Promise((r) => penyandi.addEventListener("dequeue", r, { once: true }));
    while (menunggu > 6) await antre;

    if (f % FPS === 0) {
      const lalu = (performance.now() - mulaiRekam) / 1000;
      const sisa = f > 0 ? Math.round(((jumlahBingkai - f) * lalu) / f) : 0;
      lapor(
        `${butir.nama}: ${Math.round((f / jumlahBingkai) * 100)}% (${Math.floor(detik / 60)}:${String(Math.floor(detik % 60)).padStart(2, "0")} dari ${Math.floor(lamaVideo / 60)}:${String(Math.floor(lamaVideo % 60)).padStart(2, "0")}) · sisa ± ${Math.ceil(sisa / 60)} menit${tanpaSuara ? ` · ${tanpaSuara} adegan tanpa suara` : ""}`,
      );
      await giliran();
    }
  }

  lapor(`${butir.nama}: menutup berkas…`);
  await penyandi.flush();
  muxer.finalize();
  await antre;
  if (galat) throw galat;
  await kirim("selesai", keteranganYouTube(pelajaran, t.namaTingkat, awal));
  lapor(`SELESAI: ${butir.nama}`);
}

/* ================================================================== *
 * Gambar bingkai
 * ================================================================== */

type Warna = { batang: string; teks: string };

function jalurBulat(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/** Tulisan dengan stabilo warna tingkat di separuh bawahnya, seperti judul di website. */
function tulisStabilo(ctx: CanvasRenderingContext2D, teks: string, x: number, y: number, ukuran: number, warna: string) {
  const lebar = ctx.measureText(teks).width;
  ctx.save();
  ctx.globalAlpha *= 0.3;
  ctx.fillStyle = warna;
  ctx.fillRect(x - ukuran * 0.08, y - ukuran * 0.34, lebar + ukuran * 0.16, ukuran * 0.52);
  ctx.restore();
  ctx.fillText(teks, x, y);
}

/** Tujuh strip logo (warna tingkat 0→6) + kata Ruang Genetika. Mengembalikan lebar. */
function gambarLogo(ctx: CanvasRenderingContext2D, x: number, yDasar: number, skala: number, kanan = false) {
  const lebarStrip = 7 * 3 * skala + 6 * 2 * skala;
  ctx.font = `800 ${17 * skala}px ${HURUF}`;
  const lebarKata = ctx.measureText("Ruang Genetika").width;
  const total = lebarStrip + 10 * skala + lebarKata;
  const x0 = kanan ? x - total : x;
  TINGKAT.forEach((tk, i) => {
    const h = TINGGI_STRIP_LOGO[i] * skala;
    ctx.fillStyle = tk.batang;
    jalurBulat(ctx, x0 + i * 5 * skala, yDasar - h, 3 * skala, h, 1.5 * skala);
    ctx.fill();
  });
  ctx.fillStyle = TINTA;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Ruang Genetika", x0 + lebarStrip + 10 * skala, yDasar - 1 * skala);
  return total;
}

function gambarKepala(ctx: CanvasRenderingContext2D, p: Pelajaran, warna: Warna) {
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  ctx.font = `600 26px ${MONO}`;
  ctx.fillStyle = SAMAR;
  ctx.fillText(p.nomor, TEPI + 4, 66);
  const xJudul = TEPI + 4 + ctx.measureText(p.nomor).width + 20;
  const lebarLogo = gambarLogo(ctx, W - TEPI, 70, 1.9, true);
  ctx.font = `800 40px ${HURUF}`;
  ctx.fillStyle = TINTA;
  tulisStabilo(ctx, potongLebar(ctx, p.judul, W - TEPI - lebarLogo - 40 - xJudul), xJudul, 66, 40, warna.batang);
}

/**
 * Lencana kiri atas panggung — satu-satunya tulisan di dalam video, dengan
 * urutan yang sama seperti di website: label isyarat → entitas disorot → tajuk.
 */
function gambarLencana(ctx: CanvasRenderingContext2D, tajuk: string | undefined, sorot: string[], label?: string) {
  if (label) return gambarPil(ctx, [{ nama: label }]);
  const entitas = sorot.map((id) => SEMUA_ENTITAS[id]).filter(Boolean);
  if (entitas.length) return gambarPil(ctx, entitas.map((e) => ({ nama: e.nama, inggris: e.inggris, titik: e.warna })));
  if (tajuk) gambarPil(ctx, [{ nama: tajuk }]);
}

function gambarPil(ctx: CanvasRenderingContext2D, pil: { nama: string; inggris?: string; titik?: string }[]) {
  let y = PANGGUNG.y + 24;
  const x = PANGGUNG.x + 24;
  const TINGGI = 52;
  for (const p of pil) {
    ctx.font = `600 26px ${HURUF}`;
    const lebarNama = ctx.measureText(p.nama).width;
    ctx.font = `italic 400 26px ${HURUF}`;
    const lebarInggris = p.inggris ? ctx.measureText(p.inggris).width + 14 : 0;
    const lebar = 44 + (p.titik ? 28 : 0) + lebarNama + lebarInggris;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.10)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    jalurBulat(ctx, x, y, lebar, TINGGI, TINGGI / 2);
    ctx.fill();
    ctx.restore();
    let cx = x + 22;
    if (p.titik) {
      ctx.fillStyle = p.titik;
      ctx.beginPath();
      ctx.arc(cx + 8, y + TINGGI / 2, 8, 0, Math.PI * 2);
      ctx.fill();
      cx += 28;
    }
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.font = `600 26px ${HURUF}`;
    ctx.fillStyle = TINTA;
    ctx.fillText(p.nama, cx, y + TINGGI / 2 + 1);
    if (p.inggris) {
      ctx.font = `italic 400 26px ${HURUF}`;
      ctx.fillStyle = SAMAR;
      ctx.fillText(p.inggris, cx + lebarNama + 14, y + TINGGI / 2 + 1);
    }
    y += TINGGI + 12;
  }
  ctx.textBaseline = "alphabetic";
}

function gambarSubtitel(ctx: CanvasRenderingContext2D, teks: string, alfa: number) {
  const { x, y, w, h } = SUBTITEL;
  ctx.fillStyle = PERMUKAAN;
  jalurBulat(ctx, x, y, w, h, 26);
  ctx.fill();
  ctx.strokeStyle = GARIS;
  ctx.lineWidth = 2;
  ctx.stroke();
  if (!teks) return;
  let ukuran = 38;
  let baris: string[] = [];
  for (; ukuran >= 28; ukuran -= 2) {
    ctx.font = `500 ${ukuran}px ${HURUF}`;
    baris = bungkus(ctx, teks, w - 120);
    if (baris.length <= 2) break;
  }
  const jarak = ukuran * 1.42;
  ctx.save();
  ctx.globalAlpha *= alfa;
  ctx.fillStyle = TINTA;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const y0 = y + h / 2 - ((baris.length - 1) * jarak) / 2;
  baris.forEach((b, i) => ctx.fillText(b, x + w / 2, y0 + i * jarak + ukuran * 0.04));
  ctx.restore();
}

function gambarPembuka(ctx: CanvasRenderingContext2D, p: Pelajaran, namaTingkat: string, warna: Warna) {
  ctx.fillStyle = LATAR;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = warna.batang;
  ctx.fillRect(0, H - 14, W, 14);
  const x = 170;
  gambarLogo(ctx, x, 250, 2.6);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.font = `600 30px ${MONO}`;
  ctx.fillStyle = warna.teks;
  ctx.fillText(`TINGKAT ${p.level} · ${namaTingkat.toUpperCase()}`, x, 430);
  ctx.font = `800 80px ${HURUF}`;
  ctx.fillStyle = TINTA;
  const baris = bungkus(ctx, `${p.nomor}  ${p.judul}`, W - x * 2);
  baris.forEach((b, i) => tulisStabilo(ctx, b, x, 540 + i * 100, 80, warna.batang));
  ctx.font = `400 36px ${HURUF}`;
  ctx.fillStyle = LEMBUT;
  bungkus(ctx, p.ringkas, W - x * 2 - 100).forEach((b, i) =>
    ctx.fillText(b, x, 540 + baris.length * 100 + 30 + i * 52),
  );
}

function gambarPenutup(
  ctx: CanvasRenderingContext2D,
  berikutnya: { nomor: string; judul: string } | undefined,
  warna: Warna,
) {
  ctx.fillStyle = LATAR;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = warna.batang;
  ctx.fillRect(0, H - 14, W, 14);
  const x = 170;
  gambarLogo(ctx, x, 250, 2.6);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.font = `800 72px ${HURUF}`;
  ctx.fillStyle = TINTA;
  tulisStabilo(ctx, "Pelajaran selesai", x, 440, 72, warna.batang);
  ctx.font = `400 36px ${HURUF}`;
  ctx.fillStyle = LEMBUT;
  ctx.fillText("Tonton versi interaktifnya, gratis — bisa dijeda, diputar, lengkap dengan catatan istilah:", x, 540);
  ctx.font = `600 52px ${MONO}`;
  ctx.fillStyle = TINTA;
  ctx.fillText(ALAMAT, x, 630);
  if (berikutnya) {
    ctx.font = `600 28px ${MONO}`;
    ctx.fillStyle = SAMAR;
    ctx.fillText(`BERIKUTNYA · ${berikutnya.nomor}`, x, 780);
    ctx.font = `800 48px ${HURUF}`;
    ctx.fillStyle = TINTA;
    ctx.fillText(potongLebar(ctx, berikutnya.judul, W - x * 2), x, 846);
  }
}

/* ---------- teks ---------- */

function bungkus(ctx: CanvasRenderingContext2D, teks: string, lebar: number) {
  const kata = teks.split(/\s+/);
  const baris: string[] = [];
  let kini = "";
  for (const k of kata) {
    const coba = kini ? `${kini} ${k}` : k;
    if (ctx.measureText(coba).width > lebar && kini) {
      baris.push(kini);
      kini = k;
    } else kini = coba;
  }
  if (kini) baris.push(kini);
  return baris;
}

function potongLebar(ctx: CanvasRenderingContext2D, teks: string, lebar: number) {
  if (ctx.measureText(teks).width <= lebar) return teks;
  let s = teks;
  while (s.length > 1 && ctx.measureText(`${s}…`).width > lebar) s = s.slice(0, -1);
  return `${s.trimEnd()}…`;
}

/* ---------- keterangan untuk kotak deskripsi YouTube ---------- */

function jamYouTube(detik: number) {
  const m = Math.floor(detik / 60);
  const d = Math.floor(detik % 60);
  return `${m}:${String(d).padStart(2, "0")}`;
}

function keteranganYouTube(p: Pelajaran, namaTingkat: string, awal: number[]) {
  /* Bab YouTube: mulai 0:00, tiap bab ≥ 10 detik, minimal tiga bab. */
  const total = PEMBUKA + totalDurasi(p);
  const bab: { detik: number; judul: string }[] = [{ detik: 0, judul: "Pembuka" }];
  p.adegan.forEach((a, i) => {
    if (!a.tajuk) return;
    const detik = Math.floor(PEMBUKA + awal[i]);
    if (detik - bab[bab.length - 1].detik >= 10 && total - detik >= 10) bab.push({ detik, judul: a.tajuk });
  });
  const baris = [
    `${p.nomor} ${p.judul} — Ruang Genetika`,
    "",
    p.ringkas,
    "",
    "Tonton versi interaktifnya (bisa dijeda, diputar, lengkap dengan catatan istilah), gratis tanpa daftar:",
    `https://${ALAMAT}/pelajaran/${p.slug}`,
    "",
    `Tingkat ${p.level} · ${namaTingkat}`,
  ];
  if (bab.length >= 3) baris.push("", "Bab:", ...bab.map((b) => `${jamYouTube(b.detik)} ${b.judul}`));
  if (p.poinKunci.length) baris.push("", "Poin kunci:", ...p.poinKunci.map((k) => `• ${k}`));
  if (p.istilah.length) baris.push("", "Istilah:", ...p.istilah.map((s) => `• ${s.id} (${s.en}) — ${s.arti}`));
  if (p.rujukan.length) baris.push("", "Rujukan:", ...p.rujukan.map((r) => `• ${r.teks}${r.url ? ` ${r.url}` : ""}`));
  baris.push("", "Semua gambar dan animasi dibuat dari nol dengan kode. Narasi: suara sintetis.", "", "#genetika #biologi #belajargenetika");
  return baris.join("\n");
}
