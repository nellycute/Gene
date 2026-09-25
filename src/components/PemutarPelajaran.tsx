"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ANIMASI } from "@/animasi/daftar";
import { Panggung3D } from "@/animasi/tiga-dimensi/Panggung3D";
import { Catatan, type TabCatatan } from "./Catatan";
import { SEMUA_ENTITAS } from "@/lib/warna";
import { useMediaCocok } from "@/lib/jendela";
import { aturBisu, useBisu } from "@/lib/bisu";
import { jadwalSubtitel, potonganPada } from "@/lib/subtitel";
import { isyaratPada, jadwalIsyarat } from "@/lib/isyarat";
import { JEDA_AWAL, jam, lamaAdegan, totalDurasi, type Pelajaran } from "@/lib/tipe";

/**
 * LAYAR MENONTON — "layar bioskop" (KEPUTUSAN-DESAIN.md §5.3, diubah 23 & 25 Sep 2026)
 *
 * Nely: teks yang memanjang ke bawah memaksa menggulir dan memalingkan mata
 * dari video. Maka halaman ini tidak digulir:
 *  - satu kolom: judul satu baris → panggung → subtitel → bilah kendali;
 *  - panggung selebar yang muat dalam tinggi layar (kelas .lebar-bioskop);
 *  - subtitel tampil sepotong-sepotong mengikuti waktu (src/lib/subtitel.ts);
 *  - istilah, ringkasan, naskah utuh, dan rujukan disimpan di Catatan: panel
 *    di samping panggung (laptop) atau lembar dari bawah (HP), hanya saat diminta.
 *
 * Seperti menonton YouTube (25 Sep 2026): satu garis waktu utuh yang bisa
 * diketuk dan digeser; spasi/k = putar-jeda, panah = ±5 detik, j/l = ±10 detik,
 * m = suara, c = subtitel, f = layar penuh; klik video (laptop) atau ketuk dua
 * kali (HP) = putar/jeda. Di dalam video hanya ada label bagian yang sedang
 * dibahas — tidak ada nomor adegan, tombol, atau tulisan "memuat".
 *
 * Suara (24 Sep 2026): narasi dibacakan suara perempuan Edge TTS (sementara).
 * Selama narasi terdengar, rekamanlah yang memegang jam — subtitel dan isyarat
 * gambar dijadwalkan dari waktu setiap kata, jadi ketiganya selalu serempak.
 * Suara yang terlambat datang tidak pernah menahan video lama-lama: video jalan
 * terus, suaranya menyusul ke titik yang sama.
 */

const PILIHAN_KECEPATAN = [0.75, 1, 1.25, 1.5] as const;
/** Awal kalimat boleh ditunggu sebentar; lebih dari ini, video jalan terus dan suara menyusul. */
const TUNGGU_SUARA_MAKS = 0.3;
/** Kendali di layar penuh menghilang setelah sekian milidetik tanpa gerakan, seperti YouTube. */
const KENDALI_HILANG = 2600;

export type Berikutnya = {
  slug: string;
  nomor: string;
  judul: string;
  levelNomor: number;
  levelNama: string;
};

type Posisi = { indeks: number; waktu: number };

export function PemutarPelajaran({
  pelajaran,
  berikutnya,
}: {
  pelajaran: Pelajaran;
  berikutnya?: Berikutnya;
}) {
  const adegan = pelajaran.adegan;
  const total = totalDurasi(pelajaran);
  const adaSuara = adegan.some((a) => a.suara);
  /** Detik mulai tiap adegan, dihitung dari awal pelajaran — untuk garis waktu utuh. */
  const awalAdegan = useMemo(() => {
    const hasil: number[] = [];
    let jalan = 0;
    for (const a of adegan) {
      hasil.push(jalan);
      jalan += lamaAdegan(a);
    }
    return hasil;
  }, [adegan]);

  /* Posisi = adegan ke berapa + detik berjalan di dalamnya. Disimpan juga
     di ref agar detak pewaktu selalu membaca nilai terbaru, termasuk saat
     penonton baru saja melompat. */
  const [posisi, setPosisi] = useState<Posisi>({ indeks: 0, waktu: 0 });
  const posisiRef = useRef(posisi);
  const aturPosisi = useCallback((p: Posisi) => {
    posisiRef.current = p;
    setPosisi(p);
  }, []);
  const { indeks, waktu } = posisi;

  const [berjalan, setBerjalan] = useState(false);
  const [kecepatan, setKecepatan] = useState<number>(1);
  const [subtitel, setSubtitel] = useState(true);
  const [selesai, setSelesai] = useState(false);
  const bisu = useBisu();
  const pakaiSuara = adaSuara && !bisu;

  const [bukaCatatan, setBukaCatatan] = useState(false);
  const [tab, setTab] = useState<TabCatatan>("istilah");
  const lebar = useMediaCocok("(min-width: 1024px)");

  /* Layar penuh: API Fullscreen bila ada; bila tidak (iPhone), tiruan — pemutar
     menutup seluruh layar lewat CSS (.bioskop-penuh). */
  const bioskopRef = useRef<HTMLElement | null>(null);
  const [penuh, setPenuh] = useState(false);
  const [kendaliTampil, setKendaliTampil] = useState(true);
  const pewaktuKendaliRef = useRef<number | null>(null);

  const rafRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  /** Rekaman yang sedang terpasang di elemen audio (el.src berupa alamat lengkap, jadi dicatat sendiri). */
  const berkasRef = useRef<string | null>(null);
  /** Penonton baru saja melompat (garis waktu, panah, tombol): suara harus menyusul ke titik baru. */
  const lompatRef = useRef(false);
  /** Garis waktu sedang digeser: waktu berhenti dan suara diam sampai dilepas. */
  const gesekRef = useRef(false);
  /** Rekaman yang gagal dimuat — adegannya tayang tanpa suara, tanpa kotak peringatan. */
  const gagalRef = useRef(new Set<string>());
  const diunduhRef = useRef(new Set<string>());
  /* Dibaca detak pewaktu tanpa harus memulai ulang detaknya. */
  const kecepatanRef = useRef(kecepatan);
  const pakaiSuaraRef = useRef(pakaiSuara);
  useEffect(() => {
    kecepatanRef.current = kecepatan;
    const el = audioRef.current;
    if (el) el.defaultPlaybackRate = el.playbackRate = kecepatan;
  }, [kecepatan]);
  useEffect(() => {
    pakaiSuaraRef.current = pakaiSuara;
  }, [pakaiSuara]);

  const sekarang = adegan[indeks];

  /* Gambar pelajaran ini, dari daftar animasi. */
  const animasi = ANIMASI[pelajaran.animasi];
  const Datar = animasi.Datar;
  const pakai3D = Boolean(animasi.Tiga) && (animasi.tiga === "semua" || sekarang.tampilan === "3d");

  /* Mesin 3D mulai diunduh begitu pelajaran dibuka — hanya kalau pelajaran ini
     memang memakainya — supaya sudah siap sebelum adegannya tiba. */
  const ada3D =
    Boolean(animasi.muat3D) && (animasi.tiga === "semua" || adegan.some((a) => a.tampilan === "3d"));
  useEffect(() => {
    if (!ada3D) return;
    void animasi.muat3D?.();
  }, [ada3D, animasi]);

  /* ---------- jalannya waktu ----------
     Satu detak untuk semuanya. Selama narasi adegan terdengar, rekaman suara
     yang memimpin: waktu adegan = jeda awal + detik rekaman, jadi subtitel dan
     gambar tidak pernah mendahului atau tertinggal dari suaranya. Di jeda awal
     dan akhir adegan — atau tanpa suara — jam detak yang memimpin. Perpindahan
     adegan diputuskan di dalam detak, bukan lewat efek terpisah. */
  useEffect(() => {
    if (!berjalan) return;
    const el = audioRef.current;
    let cap = performance.now();
    let detakTerakhir = cap;
    let lamaTunggu = 0;

    const tolakPutar = (galat: unknown) => {
      const nama = galat instanceof DOMException ? galat.name : "";
      if (nama === "AbortError") return; // diputus jeda atau pergantian berkas — wajar
      if (nama === "NotAllowedError") {
        /* peramban menunggu sentuhan penonton — tombol Putar akan memulainya lagi */
        setBerjalan(false);
        return;
      }
      if (berkasRef.current) gagalRef.current.add(berkasRef.current);
    };

    const langkah = (t: number) => {
      const selisih = Math.min(0.25, (t - cap) / 1000);
      cap = t;
      detakTerakhir = performance.now();
      if (gesekRef.current) {
        if (el && !el.paused) el.pause();
        rafRef.current = requestAnimationFrame(langkah);
        return;
      }
      let { indeks: i, waktu: w } = posisiRef.current;
      const rekaman = pakaiSuaraRef.current ? adegan[i].suara : undefined;

      let ikutSuara = false;
      let tahan = false;
      if (el && rekaman && !gagalRef.current.has(rekaman.berkas)) {
        if (berkasRef.current !== rekaman.berkas) {
          el.src = rekaman.berkas;
          berkasRef.current = rekaman.berkas;
          el.defaultPlaybackRate = el.playbackRate = kecepatanRef.current;
          lamaTunggu = 0;
        }
        const sasaran = w - JEDA_AWAL;
        const dalam = sasaran >= 0 && sasaran < rekaman.durasi - 0.05;
        if (dalam && lompatRef.current) {
          lompatRef.current = false;
          if (el.ended || Math.abs(el.currentTime - sasaran) > 0.1) el.currentTime = sasaran;
          if (el.paused) el.play().catch(tolakPutar);
          lamaTunggu = 0;
          tahan = true;
        } else if (dalam && !el.ended) {
          const selisihSuara = el.currentTime - sasaran;
          if (el.paused) {
            /* suara sempat berbunyi sementara detak tertahan: gambar yang menyusul,
               bukan suara yang diulang */
            if (selisihSuara > 0 && selisihSuara < 1.5) w = JEDA_AWAL + el.currentTime;
            else if (Math.abs(selisihSuara) > 0.15) el.currentTime = sasaran;
            el.play().catch(tolakPutar);
          } else if (!el.seeking && el.readyState >= 3) {
            /* suara datang terlambat (jaringan lambat): dikejar ke titik gambar */
            if (selisihSuara < -0.25 || selisihSuara > 0.6) el.currentTime = sasaran;
            else ikutSuara = true;
          }
          if (ikutSuara) lamaTunggu = 0;
          else {
            lamaTunggu += selisih;
            tahan = lamaTunggu < TUNGGU_SUARA_MAKS;
          }
        } else {
          lompatRef.current = false;
          lamaTunggu = 0;
          if (!el.paused) el.pause();
          if (sasaran < 0 && el.currentTime > 0.05) el.currentTime = 0;
        }
      } else {
        lompatRef.current = false;
        if (el && !el.paused) el.pause();
      }

      if (ikutSuara && el) w = JEDA_AWAL + el.currentTime;
      else if (!tahan) w += selisih * kecepatanRef.current;

      let tamat = false;
      while (w >= lamaAdegan(adegan[i])) {
        if (i < adegan.length - 1) {
          w -= lamaAdegan(adegan[i]);
          i += 1;
        } else {
          w = lamaAdegan(adegan[i]);
          tamat = true;
          break;
        }
      }
      aturPosisi({ indeks: i, waktu: w });
      if (tamat) {
        setBerjalan(false);
        setSelesai(true);
        return;
      }
      rafRef.current = requestAnimationFrame(langkah);
    };
    rafRef.current = requestAnimationFrame(langkah);

    /* Pengaman: kalau peramban menahan detak gambar (HP kewalahan, tab
       tersembunyi) sementara suara terus berbunyi, suara ikut ditahan. Begitu
       detak kembali, gambar menyusul suaranya — tetap serempak. */
    const jaga = () => {
      if (el && !el.paused && performance.now() - detakTerakhir > 600) el.pause();
    };
    el?.addEventListener("timeupdate", jaga);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el?.removeEventListener("timeupdate", jaga);
      el?.pause();
    };
  }, [berjalan, adegan, aturPosisi]);

  /* Berkas suara yang gagal dimuat (jaringan putus): adegan itu jalan tanpa
     suara — tidak ada kotak peringatan (permintaan Nely, 25 Sep 2026). */
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const gagal = () => {
      if (berkasRef.current) gagalRef.current.add(berkasRef.current);
    };
    el.addEventListener("error", gagal);
    return () => el.removeEventListener("error", gagal);
  }, []);

  /* Rekaman dua adegan berikutnya diunduh lebih dulu, agar suara tidak pernah ditunggu. */
  const rekamanBerikutnya = pakaiSuara
    ? adegan
        .slice(indeks, indeks + 3)
        .map((a) => a.suara?.berkas)
        .filter(Boolean)
        .join(" ")
    : "";
  useEffect(() => {
    for (const berkas of rekamanBerikutnya.split(" ")) {
      if (!berkas || diunduhRef.current.has(berkas)) continue;
      diunduhRef.current.add(berkas);
      fetch(berkas)
        .then((r) => r.arrayBuffer())
        .catch(() => diunduhRef.current.delete(berkas));
    }
  }, [rekamanBerikutnya]);

  /* Pindah tab atau layar HP terkunci = jeda. Kalau tidak, suara terus berjalan
     sementara gambar berhenti, dan keduanya tidak lagi serempak. */
  useEffect(() => {
    if (!berjalan) return;
    const tangani = () => {
      if (document.hidden) setBerjalan(false);
    };
    document.addEventListener("visibilitychange", tangani);
    return () => document.removeEventListener("visibilitychange", tangani);
  }, [berjalan]);

  /**
   * Memulai suara LANGSUNG di dalam sentuhan penonton. Peramban HP hanya
   * mengizinkan suara mulai dari sentuhan; sekali diizinkan, elemen audio yang
   * sama boleh diputar lagi oleh detak pewaktu untuk adegan-adegan berikutnya.
   */
  function mulaiSuaraDariSentuhan(p = posisiRef.current, izinkan = pakaiSuara) {
    const el = audioRef.current;
    const rekaman = adegan[p.indeks].suara;
    if (!el || !rekaman || !izinkan || gagalRef.current.has(rekaman.berkas)) return;
    if (berkasRef.current !== rekaman.berkas) {
      el.src = rekaman.berkas;
      berkasRef.current = rekaman.berkas;
      el.defaultPlaybackRate = el.playbackRate = kecepatan;
    }
    const sasaran = Math.max(0, p.waktu - JEDA_AWAL);
    if (sasaran >= rekaman.durasi - 0.05) return;
    /* penonton sendiri yang menekan Putar — jeda awal tidak perlu ditunggu */
    if (p.waktu < JEDA_AWAL) aturPosisi({ indeks: p.indeks, waktu: JEDA_AWAL });
    try {
      el.currentTime = sasaran;
    } catch {
      /* Safari lama menolak sebelum data siap — detak pewaktu akan menyusul */
    }
    lompatRef.current = false;
    el.play().catch(() => {});
  }

  function gantiBisu() {
    const jadiBisu = !bisu;
    aturBisu(jadiBisu);
    pakaiSuaraRef.current = adaSuara && !jadiBisu;
    if (jadiBisu) audioRef.current?.pause();
    else if (berjalan) mulaiSuaraDariSentuhan(posisiRef.current, true);
  }

  /* ---------- kendali ---------- */
  const keAdegan = useCallback(
    (i: number) => {
      aturPosisi({ indeks: i, waktu: 0 });
      lompatRef.current = true;
      setSelesai(false);
    },
    [aturPosisi],
  );

  /** Lompat ke detik mana pun dari seluruh pelajaran (garis waktu, panah). */
  function lompatKe(detik: number) {
    const d = Math.min(Math.max(0, detik), Math.max(0, total - 0.05));
    let i = 0;
    while (i < adegan.length - 1 && awalAdegan[i + 1] <= d) i++;
    aturPosisi({ indeks: i, waktu: d - awalAdegan[i] });
    lompatRef.current = true;
    setSelesai(false);
  }

  function tampilkanKendali() {
    setKendaliTampil(true);
    if (pewaktuKendaliRef.current) window.clearTimeout(pewaktuKendaliRef.current);
    pewaktuKendaliRef.current = window.setTimeout(() => setKendaliTampil(false), KENDALI_HILANG);
  }
  useEffect(
    () => () => {
      if (pewaktuKendaliRef.current) window.clearTimeout(pewaktuKendaliRef.current);
    },
    [],
  );

  function putarJeda() {
    tampilkanKendali();
    if (selesai) {
      const awal = { indeks: 0, waktu: 0 };
      aturPosisi(awal);
      lompatRef.current = true;
      setSelesai(false);
      setBerjalan(true);
      mulaiSuaraDariSentuhan(awal);
      return;
    }
    if (!berjalan) mulaiSuaraDariSentuhan();
    setBerjalan(!berjalan);
  }

  const mundur = useCallback(() => {
    if (waktu > 2.5) keAdegan(indeks);
    else if (indeks > 0) keAdegan(indeks - 1);
  }, [waktu, indeks, keAdegan]);

  const maju = useCallback(() => {
    if (indeks < adegan.length - 1) keAdegan(indeks + 1);
  }, [indeks, adegan.length, keAdegan]);

  /* ---------- layar penuh ---------- */
  /* Tampilan penuh langsung berlaku (tiruan CSS); API Fullscreen menyusul bila
     peramban mengizinkan. Tidak ada yang ditunggu — di sebagian peramban janji
     kunci-miring tidak pernah dijawab. */
  function gantiPenuh() {
    const el = bioskopRef.current;
    if (!el) return;
    if (penuh) {
      if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
      bukaKunciLayar();
      setPenuh(false);
      return;
    }
    setBukaCatatan(false);
    setPenuh(true);
    tampilkanKendali();
    if (document.fullscreenEnabled && el.requestFullscreen) {
      el.requestFullscreen({ navigationUI: "hide" })
        .then(() => {
          /* panggungnya melebar — HP dimiringkan otomatis bila peramban mengizinkan */
          const orientasi = screen.orientation as ScreenOrientation & { lock?: (arah: string) => Promise<void> };
          orientasi.lock?.("landscape")?.catch(() => {});
        })
        .catch(() => {
          /* ditolak — tiruan layar penuh tetap berlaku */
        });
    }
  }

  /* Keluar lewat tombol Esc / gerakan kembali peramban. */
  useEffect(() => {
    const tangani = () => {
      if (!document.fullscreenElement) {
        bukaKunciLayar();
        setPenuh(false);
      }
    };
    document.addEventListener("fullscreenchange", tangani);
    return () => document.removeEventListener("fullscreenchange", tangani);
  }, []);

  /* Tiruan layar penuh butuh halaman tanpa transform dan tanpa gulir (globals.css). */
  useEffect(() => {
    if (!penuh) return;
    document.documentElement.setAttribute("data-bioskop-penuh", "");
    return () => document.documentElement.removeAttribute("data-bioskop-penuh");
  }, [penuh]);

  /* Esc menutup Catatan, di mana pun fokusnya. */
  useEffect(() => {
    if (!bukaCatatan) return;
    const tangani = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBukaCatatan(false);
    };
    window.addEventListener("keydown", tangani);
    return () => window.removeEventListener("keydown", tangani);
  }, [bukaCatatan]);

  /* Di HP lembar Catatan menutupi subtitel dan tombol — jadi pelajaran dijeda
     dulu. Di laptop panelnya di samping, pelajaran boleh terus berjalan. */
  function aturCatatan(buka: boolean) {
    if (buka && !lebar) setBerjalan(false);
    setBukaCatatan(buka);
  }

  const lewatSebelumnya = awalAdegan[indeks] ?? 0;
  const posisiTotal = Math.min(lewatSebelumnya + waktu, total);

  /* ---------- tombol keyboard, seperti YouTube ----------
     Didengar di seluruh halaman: spasi langsung berfungsi tanpa harus
     mengeklik pemutar dulu. */
  function tanganiTombol(e: KeyboardEvent) {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
    const sasaran = e.target instanceof HTMLElement ? e.target : null;
    if (sasaran?.closest("input, select, textarea, [contenteditable='true']")) return;
    /* Di dalam Catatan, tombol panah dan spasi milik Catatan sendiri. */
    if (sasaran?.closest("[data-catatan]")) return;
    /* Tombol dan tautan di luar pemutar (menu atas) tetap bekerja seperti biasa. */
    const diLuar = sasaran && sasaran !== document.body && !bioskopRef.current?.contains(sasaran);
    if (diLuar && sasaran.closest("button, a")) return;

    const tombol = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const tindakan: Record<string, () => void> = {
      " ": putarJeda,
      k: putarJeda,
      ArrowLeft: () => lompatKe(posisiTotal - 5),
      ArrowRight: () => lompatKe(posisiTotal + 5),
      j: () => lompatKe(posisiTotal - 10),
      l: () => lompatKe(posisiTotal + 10),
      m: gantiBisu,
      c: () => setSubtitel((s) => !s),
      f: gantiPenuh,
    };
    if (tombol === "Escape" && penuh && !document.fullscreenElement) {
      setPenuh(false);
      return;
    }
    const kerjakan = tindakan[tombol];
    if (!kerjakan || (tombol === "m" && !adaSuara)) return;
    e.preventDefault();
    kerjakan();
  }
  const tanganiTombolRef = useRef(tanganiTombol);
  useEffect(() => {
    tanganiTombolRef.current = tanganiTombol;
  });
  useEffect(() => {
    const dengar = (e: KeyboardEvent) => tanganiTombolRef.current(e);
    window.addEventListener("keydown", dengar);
    return () => window.removeEventListener("keydown", dengar);
  }, []);

  /* ---------- klik dan ketuk di video ----------
     Laptop: klik sekali = putar/jeda, klik dua kali = layar penuh (YouTube).
     HP: ketuk dua kali = putar/jeda; satu ketukan hanya memunculkan kendali.
     Menyeret tetap memutar gambar 3D — seretan tidak dihitung sebagai ketukan. */
  const tekananRef = useRef<{ x: number; y: number; t: number; jenis: string } | null>(null);
  const ketukTerakhirRef = useRef<{ x: number; y: number; t: number } | null>(null);
  /* Sebagian peramban HP ikut mengirim "klik dua kali" untuk ketukan ganda —
     layar penuh lewat klik dua kali hanya untuk tetikus. */
  const jenisTekanRef = useRef("mouse");

  function tekanPanggung(e: React.PointerEvent) {
    tekananRef.current = { x: e.clientX, y: e.clientY, t: performance.now(), jenis: e.pointerType };
    jenisTekanRef.current = e.pointerType;
  }

  function lepasPanggung(e: React.PointerEvent) {
    const awal = tekananRef.current;
    tekananRef.current = null;
    if (!awal || selesai) return;
    if (e.target instanceof HTMLElement && e.target.closest("button, a")) return;
    const kini = { x: e.clientX, y: e.clientY, t: performance.now() };
    if (Math.hypot(kini.x - awal.x, kini.y - awal.y) > 8 || kini.t - awal.t > 400) return;
    if (awal.jenis === "mouse") {
      putarJeda();
      return;
    }
    const dulu = ketukTerakhirRef.current;
    if (dulu && kini.t - dulu.t < 320 && Math.hypot(kini.x - dulu.x, kini.y - dulu.y) < 40) {
      ketukTerakhirRef.current = null;
      putarJeda();
    } else {
      ketukTerakhirRef.current = kini;
      tampilkanKendali();
    }
  }

  /* Isyarat subtitel: begitu kata kuncinya diucapkan, gambar ikut berubah. */
  const jadwal = useMemo(() => jadwalIsyarat(sekarang), [sekarang]);
  const isyarat = isyaratPada(jadwal, waktu);
  const sorot = isyarat?.sorot ?? sekarang.sorot ?? [];
  const tahap = isyarat?.tahap ?? sekarang.tahap;
  const fokus = isyarat?.fokus ?? sekarang.fokus;
  const sejak = waktu - (isyarat?.mulai ?? 0);
  const kunciGambar = `${indeks}:${isyarat?.nomor ?? "-"}`;
  const entitasSorot = sorot.map((id) => SEMUA_ENTITAS[id]).filter(Boolean);

  /* Subtitel: tiap potongan tampil saat kata pertamanya diucapkan. */
  const potongan = useMemo(() => jadwalSubtitel(sekarang), [sekarang]);
  const iPotong = potonganPada(potongan, waktu);

  const sembunyikanKendali = penuh && berjalan && !kendaliTampil;

  const isiCatatan = (wujud: "panel" | "lembar") => (
    <Catatan
      pelajaran={pelajaran}
      tab={tab}
      onTab={setTab}
      indeksAdegan={indeks}
      onLompat={keAdegan}
      onTutup={() => setBukaCatatan(false)}
      wujud={wujud}
    />
  );

  return (
    <div className="flex items-stretch justify-center gap-5">
      {adaSuara && <audio ref={audioRef} preload="auto" />}

      <section
        ref={bioskopRef}
        tabIndex={-1}
        aria-label={`Pemutar pelajaran: ${pelajaran.judul}`}
        data-kendali={sembunyikanKendali ? "sembunyi" : "tampil"}
        onPointerMove={penuh ? (e) => e.pointerType === "mouse" && tampilkanKendali() : undefined}
        className={penuh ? "bioskop-penuh outline-none" : "lebar-bioskop min-w-0 shrink outline-none"}
      >
        {/* ================= JUDUL: satu baris ================= */}
        <header className="judul-bioskop mb-2.5 flex min-w-0 items-center gap-2">
          <span className="shrink-0 font-mono text-[11px] font-semibold text-teks-samar">{pelajaran.nomor}</span>
          <h1 className="min-w-0 truncate text-[16px] font-extrabold tracking-tight sm:text-[18px]">
            {pelajaran.judul}
          </h1>
          {pelajaran.draf && (
            <span
              title="Naskah draf — belum ditinjau"
              className="ml-auto shrink-0 rounded-md border border-garis-tegas px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] text-teks-samar"
            >
              Draf
            </span>
          )}
        </header>

        {/* ================= PANGGUNG: selalu kertas terang ================= */}
        <div
          onPointerDown={tekanPanggung}
          onPointerUp={lepasPanggung}
          onDoubleClick={(e) => {
            if (jenisTekanRef.current !== "mouse" || selesai) return;
            if (e.target instanceof HTMLElement && e.target.closest("button, a")) return;
            gantiPenuh();
          }}
          className="panggung-bioskop relative overflow-hidden rounded-[13px] bg-panggung"
        >
          <div className="aspect-[800/570] w-full">
            {pakai3D && animasi.Tiga ? (
              <Panggung3D
                Tiga={animasi.Tiga}
                tahap={tahap}
                sorot={sorot}
                fokus={fokus}
                detik={posisiTotal}
                sejak={sejak}
                kunci={kunciGambar}
                datar={<Datar tahap={tahap} sorot={sorot} />}
              />
            ) : (
              <Datar tahap={tahap} sorot={sorot} />
            )}
          </div>

          {/* lencana kiri atas: bagian yang sedang dibahas — satu-satunya tulisan di dalam video */}
          <div className="pointer-events-none absolute left-2.5 top-2.5 flex max-w-[70%] flex-col items-start gap-1.5 sm:left-3 sm:top-3">
            {isyarat?.label ? (
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-[12.5px] font-semibold text-[#1b2430] shadow-sm sm:text-[13px]">
                {isyarat.label}
              </span>
            ) : entitasSorot.length ? (
              entitasSorot.map((e) => (
                <span
                  key={e.id}
                  className="flex max-w-full items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[12.5px] font-semibold text-[#1b2430] shadow-sm sm:text-[13px]"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: e.warna }} aria-hidden="true" />
                  <span className="truncate">{e.nama}</span>
                  <span className="hidden truncate font-normal italic text-[#93897a] sm:inline">{e.inggris}</span>
                </span>
              ))
            ) : sekarang.tajuk ? (
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-[12.5px] font-semibold text-[#1b2430] shadow-sm sm:text-[13px]">
                {sekarang.tajuk}
              </span>
            ) : null}
          </div>

          {/* selesai — satu-satunya tempat "Berikutnya" muncul */}
          {selesai && (
            <div className="absolute inset-0 grid place-items-center bg-white/80 p-4 backdrop-blur-sm">
              <div className="w-full max-w-xs text-center text-[#1b2430]">
                <p className="text-lg font-bold">Pelajaran selesai</p>
                {berikutnya ? (
                  <Link
                    href={`/pelajaran/${berikutnya.slug}`}
                    className="mt-4 flex items-center gap-3 rounded-[13px] bg-[#1b2430] px-4 py-3 text-left text-white transition active:scale-[0.97]"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] opacity-70">
                        Berikutnya · {berikutnya.nomor}
                      </span>
                      <span className="block truncate text-[14px] font-bold">{berikutnya.judul}</span>
                    </span>
                    <IkonLompat arah="maju" />
                  </Link>
                ) : (
                  <Link
                    href={`/?buka=${pelajaran.level}&sorot=${pelajaran.slug}`}
                    className="mt-4 block rounded-[13px] bg-[#1b2430] px-4 py-3 text-[14px] font-semibold text-white transition active:scale-[0.97]"
                  >
                    Kembali ke daftar
                  </Link>
                )}
                <button
                  type="button"
                  onClick={putarJeda}
                  className="mt-2 h-10 w-full rounded-lg border border-[#ded6c7] bg-white text-[14px] font-semibold transition active:scale-[0.97]"
                >
                  Putar ulang
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= SUBTITEL: sepotong demi sepotong ================= */}
        {subtitel && (
          <div className="subtitel-bioskop mt-2.5 flex min-h-[88px] items-center justify-center rounded-[13px] bg-permukaan px-4 py-3 shadow-[0_0_0_1px_var(--garis)] sm:min-h-[76px] sm:px-6">
            <p key={`${indeks}-${iPotong}`} className="anim-muncul text-center text-[15px] leading-relaxed sm:text-[16.5px]">
              {potongan[iPotong]?.teks}
            </p>
          </div>
        )}

        {/* ================= BILAH KENDALI ================= */}
        <div className="kendali-bioskop mt-2.5 rounded-[13px] bg-latar-lembut px-3 py-2.5 sm:px-3.5">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5 sm:gap-x-2">
            <Tombol onClick={mundur} label="Ke bagian sebelumnya">
              <IkonLompat arah="mundur" />
            </Tombol>

            <button
              type="button"
              onClick={putarJeda}
              aria-label={berjalan ? "Jeda" : "Putar"}
              title={berjalan ? "Jeda (spasi)" : "Putar (spasi)"}
              className="tombol-tinta grid h-11 w-11 shrink-0 place-items-center rounded-full"
            >
              {selesai ? <IkonUlang /> : berjalan ? <IkonJeda /> : <IkonPutar />}
            </button>

            <Tombol onClick={maju} label="Ke bagian berikutnya">
              <IkonLompat arah="maju" />
            </Tombol>

            {/* garis waktu utuh, seperti YouTube — satu baris sendiri di atas tombol, selebar video */}
            <GarisWaktu
              total={total}
              posisi={posisiTotal}
              onGeser={(detik) => {
                gesekRef.current = true;
                lompatKe(detik);
              }}
              onLepas={() => {
                gesekRef.current = false;
                lompatRef.current = true;
              }}
            />

            <span className="shrink-0 font-mono text-[10.5px] tabular-nums text-teks-lembut sm:text-[11px]">
              {jam(posisiTotal)} / {jam(total)}
            </span>

            <div className="ml-auto flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSubtitel((s) => !s)}
                aria-pressed={subtitel}
                aria-label="Subtitel"
                title="Subtitel (c)"
                className={`h-8 rounded-lg border px-2 font-mono text-[10.5px] font-semibold tracking-[0.06em] transition active:scale-[0.97] ${
                  subtitel ? "border-teks bg-teks text-tombol-teks" : "border-garis-tegas text-teks-lembut hover:text-teks"
                }`}
              >
                CC
              </button>

              {adaSuara && (
                <button
                  type="button"
                  onClick={gantiBisu}
                  aria-pressed={!bisu}
                  aria-label="Suara narasi"
                  title={bisu ? "Nyalakan suara (m)" : "Matikan suara (m)"}
                  className={`grid h-8 w-9 place-items-center rounded-lg border transition active:scale-[0.97] ${
                    bisu ? "border-garis-tegas text-teks-lembut hover:text-teks" : "border-teks bg-teks text-tombol-teks"
                  }`}
                >
                  <IkonSuara bisu={bisu} />
                </button>
              )}

              <label className="sr-only" htmlFor="kecepatan">
                Kecepatan
              </label>
              <select
                id="kecepatan"
                value={kecepatan}
                onChange={(e) => setKecepatan(Number(e.target.value))}
                className="h-8 w-[54px] rounded-lg border border-garis-tegas bg-permukaan px-1.5 font-mono text-[11px] font-semibold text-teks-lembut"
              >
                {PILIHAN_KECEPATAN.map((k) => (
                  <option key={k} value={k}>
                    {k}×
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={gantiPenuh}
                aria-pressed={penuh}
                aria-label={penuh ? "Keluar dari layar penuh" : "Layar penuh"}
                title={penuh ? "Keluar dari layar penuh (f)" : "Layar penuh (f)"}
                className="tombol-garis grid h-8 w-9 place-items-center rounded-lg bg-permukaan"
              >
                <IkonLayarPenuh penuh={penuh} />
              </button>

              {!penuh && (
                <TombolCatatan
                  terbuka={bukaCatatan}
                  onClick={() => aturCatatan(!bukaCatatan)}
                  className="hidden sm:inline-flex"
                />
              )}
            </div>
          </div>

          {!penuh && (
            <TombolCatatan
              terbuka={bukaCatatan}
              onClick={() => aturCatatan(!bukaCatatan)}
              className="mt-2.5 flex w-full justify-center sm:hidden"
              panjang
            />
          )}
        </div>
      </section>

      {/* ================= CATATAN: panel samping di laptop ================= */}
      {bukaCatatan && lebar && !penuh && (
        <aside aria-label="Catatan pelajaran" className="anim-masuk-geser relative w-[340px] shrink-0">
          <div className="absolute inset-0">{isiCatatan("panel")}</div>
        </aside>
      )}

      {/* ================= CATATAN: lembar dari bawah di HP =================
          Dipasang langsung di <body>: pembungkus halaman punya animasi geser
          (transform), dan di dalamnya `fixed` akan menempel ke pembungkus itu,
          bukan ke layar. */}
      {bukaCatatan &&
        !lebar &&
        !penuh &&
        createPortal(
          <>
            <div
              aria-hidden="true"
              onClick={() => setBukaCatatan(false)}
              className="anim-muncul fixed inset-0 z-40 bg-black/[0.18]"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Catatan pelajaran"
              className="anim-naik-lembar tinggi-lembar fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-2xl flex-col overflow-hidden rounded-t-[18px] bg-permukaan shadow-lembut"
            >
              {isiCatatan("lembar")}
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}

/** Lepas kunci miring layar setelah keluar dari layar penuh. */
function bukaKunciLayar() {
  const orientasi = screen.orientation as ScreenOrientation & { unlock?: () => void };
  try {
    orientasi.unlock?.();
  } catch {
    /* peramban tanpa kunci orientasi */
  }
}

/**
 * GARIS WAKTU UTUH — satu garis seperti YouTube (permintaan Nely, 25 Sep 2026),
 * menggantikan garis putus-putus per adegan. Diketuk untuk melompat, digeser
 * untuk mencari; selama digeser waktu berhenti dan suara diam.
 */
function GarisWaktu({
  total,
  posisi,
  onGeser,
  onLepas,
}: {
  total: number;
  posisi: number;
  onGeser: (detik: number) => void;
  onLepas: () => void;
}) {
  const garisRef = useRef<HTMLDivElement>(null);
  const [digeser, setDigeser] = useState(false);
  const persen = total > 0 ? Math.min(100, (posisi / total) * 100) : 0;

  const detikDari = (x: number) => {
    const kotak = garisRef.current?.getBoundingClientRect();
    if (!kotak || kotak.width === 0) return posisi;
    return (Math.min(Math.max(x - kotak.left, 0), kotak.width) / kotak.width) * total;
  };
  const selesaiGeser = () => {
    if (!digeser) return;
    setDigeser(false);
    onLepas();
  };

  return (
    <div
      ref={garisRef}
      role="slider"
      tabIndex={0}
      aria-label="Garis waktu"
      aria-valuemin={0}
      aria-valuemax={Math.round(total)}
      aria-valuenow={Math.round(posisi)}
      aria-valuetext={`${jam(posisi)} dari ${jam(total)}`}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setDigeser(true);
        onGeser(detikDari(e.clientX));
      }}
      onPointerMove={(e) => {
        if (digeser) onGeser(detikDari(e.clientX));
      }}
      onPointerUp={selesaiGeser}
      onPointerCancel={selesaiGeser}
      onKeyDown={(e) => {
        if (e.key !== "Home" && e.key !== "End") return;
        e.preventDefault();
        onGeser(e.key === "Home" ? 0 : total);
        onLepas();
      }}
      className="group relative order-first flex h-6 w-full cursor-pointer touch-none items-center"
    >
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-garis-tegas transition-[height] duration-150 group-hover:h-1.5">
        <div className="absolute inset-y-0 left-0 bg-teks" style={{ width: `${persen}%` }} />
      </div>
      <div
        aria-hidden="true"
        className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teks shadow-sm transition-transform duration-150 ${
          digeser ? "scale-125" : "scale-100"
        }`}
        style={{ left: `${persen}%` }}
      />
    </div>
  );
}

function TombolCatatan({
  terbuka,
  onClick,
  className = "",
  panjang = false,
}: {
  terbuka: boolean;
  onClick: () => void;
  className?: string;
  panjang?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={terbuka}
      aria-label="Catatan: istilah, ringkasan, naskah, rujukan"
      className={`items-center gap-1.5 rounded-lg border px-2.5 font-semibold transition active:scale-[0.97] ${
        terbuka ? "border-teks bg-teks text-tombol-teks" : "border-garis-tegas bg-permukaan text-teks-lembut hover:text-teks"
      } ${panjang ? "h-10 text-[13.5px]" : "h-8 text-[12.5px]"} ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 3.5h10M3 8h10M3 12.5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      Catatan
      {panjang && <span className="font-normal opacity-70">· istilah, ringkasan, naskah</span>}
    </button>
  );
}

function Tombol({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="tombol-garis grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-permukaan"
    >
      {children}
    </button>
  );
}

/* ---------- ikon ---------- */

function IkonPutar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.2v13.6L19 12 8 5.2Z" fill="currentColor" />
    </svg>
  );
}

function IkonJeda() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="7" y="5" width="3.6" height="14" rx="1.2" fill="currentColor" />
      <rect x="13.4" y="5" width="3.6" height="14" rx="1.2" fill="currentColor" />
    </svg>
  );
}

function IkonSuara({ bisu }: { bisu: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" fill="currentColor" />
      {bisu ? (
        <path d="M16 9.5l5 5m0-5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path
          d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function IkonLayarPenuh({ penuh }: { penuh: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={
          penuh
            ? "M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"
            : "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
        }
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IkonUlang() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 12a8 8 0 1 1-2.6-5.9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 3.5V9h-5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IkonLompat({ arah }: { arah: "maju" | "mundur" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ transform: arah === "mundur" ? "scaleX(-1)" : undefined }}
    >
      <path d="M6 5.5v13L15 12 6 5.5Z" fill="currentColor" />
      <rect x="16.4" y="5.5" width="2.6" height="13" rx="1.1" fill="currentColor" />
    </svg>
  );
}
