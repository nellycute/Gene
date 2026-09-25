/**
 * EDGE TTS — mesin suara narasi SEMENTARA.
 *
 * Memakai layanan "Read Aloud" Microsoft Edge, dengan protokol yang sama
 * seperti pustaka Python edge-tts (github.com/rany2/edge-tts). Ditulis ulang
 * di Node karena komputer Nely tidak punya Python, dan pustaka yang memakai
 * berkas biner akan diblokir Smart App Control. WebSocket bawaan Node dipakai
 * langsung — tanpa paket tambahan.
 *
 * Selain berkas mp3, layanan ini mengirim WAKTU SETIAP KATA. Itulah yang
 * membuat subtitel dan gerak gambar bisa persis mengikuti suara.
 */

import { createHash, randomBytes, randomUUID } from "node:crypto";

const TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const VERSI_CHROMIUM = "143.0.3650.75";
const VERSI_UTAMA = VERSI_CHROMIUM.split(".")[0];
const ALAMAT = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${TOKEN}`;
const TICK_PER_DETIK = 10_000_000;

/** Selisih jam komputer terhadap jam server (detik) — dikoreksi bila server menolak. */
let koreksiJam = 0;

/** Tanda keabsahan permintaan: SHA-256 dari waktu (dibulatkan 5 menit, satuan 100 ns sejak 1601) + token. */
function tandaGec() {
  let detik = Math.floor(Date.now() / 1000 + koreksiJam) + 11_644_473_600;
  detik -= detik % 300;
  const tick = BigInt(detik) * 10_000_000n;
  return createHash("sha256").update(`${tick}${TOKEN}`, "ascii").digest("hex").toUpperCase();
}

function stempelWaktu() {
  const d = new Date();
  const hari = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getUTCDay()];
  const bulan = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getUTCMonth()];
  const dua = (n) => String(n).padStart(2, "0");
  return `${hari} ${bulan} ${dua(d.getUTCDate())} ${d.getUTCFullYear()} ${dua(d.getUTCHours())}:${dua(
    d.getUTCMinutes(),
  )}:${dua(d.getUTCSeconds())} GMT+0000 (Coordinated Universal Time)`;
}

/** "id-ID-GadisNeural" → nama lengkap yang dimengerti layanan. */
function namaSuaraLengkap(suara) {
  const m = /^([a-z]{2,})-([A-Z]{2,})-(.+Neural)$/.exec(suara);
  if (!m) return suara;
  let [, bahasa, wilayah, nama] = m;
  const strip = nama.indexOf("-");
  if (strip !== -1) {
    wilayah = `${wilayah}-${nama.slice(0, strip)}`;
    nama = nama.slice(strip + 1);
  }
  return `Microsoft Server Speech Text to Speech Voice (${bahasa}-${wilayah}, ${nama})`;
}

const lolosXml = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Mengubah teks menjadi suara.
 * @returns {Promise<{ mp3: Buffer, kata: { teks: string, mulai: number, lama: number }[] }>}
 *          `mulai` dan `lama` dalam detik, dihitung dari awal rekaman.
 */
export async function ucapkan(teks, { suara = "id-ID-GadisNeural", laju = "+0%", nada = "+0Hz", volume = "+0%" } = {}) {
  for (let percobaan = 1; ; percobaan++) {
    try {
      return await sekali(teks, { suara, laju, nada, volume });
    } catch (galat) {
      if (percobaan >= 4) throw galat;
      await new Promise((ok) => setTimeout(ok, 1500 * percobaan));
    }
  }
}

function sekali(teks, { suara, laju, nada, volume }) {
  const alamat =
    `${ALAMAT}&ConnectionId=${randomUUID().replace(/-/g, "")}` +
    `&Sec-MS-GEC=${tandaGec()}&Sec-MS-GEC-Version=1-${VERSI_CHROMIUM}`;
  const ws = new WebSocket(alamat, {
    headers: {
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
      Origin: "chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold",
      "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${VERSI_UTAMA}.0.0.0 Safari/537.36 Edg/${VERSI_UTAMA}.0.0.0`,
      "Accept-Language": "en-US,en;q=0.9",
      Cookie: `muid=${randomBytes(16).toString("hex").toUpperCase()};`,
    },
  });
  ws.binaryType = "arraybuffer";

  return new Promise((selesai, gagal) => {
    const potonganAudio = [];
    const kata = [];
    let beres = false;
    const akhiri = (galat) => {
      if (beres) return;
      beres = true;
      clearTimeout(batasWaktu);
      try {
        ws.close();
      } catch {
        /* sudah tertutup */
      }
      if (galat) gagal(galat);
      else selesai({ mp3: Buffer.concat(potonganAudio), kata });
    };
    const batasWaktu = setTimeout(() => akhiri(new Error("Edge TTS tidak menjawab dalam 60 detik")), 60_000);

    ws.addEventListener("open", () => {
      ws.send(
        `X-Timestamp:${stempelWaktu()}\r\n` +
          "Content-Type:application/json; charset=utf-8\r\n" +
          "Path:speech.config\r\n\r\n" +
          '{"context":{"synthesis":{"audio":{"metadataoptions":{' +
          '"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"true"},' +
          '"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}\r\n',
      );
      const ssml =
        "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>" +
        `<voice name='${namaSuaraLengkap(suara)}'>` +
        `<prosody pitch='${nada}' rate='${laju}' volume='${volume}'>${lolosXml(teks)}</prosody>` +
        "</voice></speak>";
      ws.send(
        `X-RequestId:${randomUUID().replace(/-/g, "")}\r\n` +
          "Content-Type:application/ssml+xml\r\n" +
          `X-Timestamp:${stempelWaktu()}Z\r\n` +
          "Path:ssml\r\n\r\n" +
          ssml,
      );
    });

    ws.addEventListener("message", (e) => {
      if (typeof e.data === "string") {
        const pisah = e.data.indexOf("\r\n\r\n");
        const kepala = e.data.slice(0, pisah);
        const isi = e.data.slice(pisah + 4);
        const jalur = /Path:([^\r\n]+)/.exec(kepala)?.[1];
        if (jalur === "audio.metadata") {
          for (const m of JSON.parse(isi).Metadata ?? []) {
            if (m.Type !== "WordBoundary") continue;
            kata.push({
              teks: m.Data.text.Text,
              mulai: m.Data.Offset / TICK_PER_DETIK,
              lama: m.Data.Duration / TICK_PER_DETIK,
            });
          }
        } else if (jalur === "turn.end") {
          akhiri();
        }
        return;
      }
      const data = Buffer.from(e.data);
      const panjangKepala = data.readUInt16BE(0);
      const kepala = data.subarray(2, 2 + panjangKepala).toString("utf8");
      if (!/Path:audio/.test(kepala)) return;
      const isi = data.subarray(2 + panjangKepala);
      if (isi.length) potonganAudio.push(isi);
    });

    ws.addEventListener("error", (e) => akhiri(new Error(`Edge TTS: ${e.message ?? "sambungan gagal"}`)));
    ws.addEventListener("close", (e) => {
      if (!beres) akhiri(new Error(`Edge TTS menutup sambungan sebelum selesai (kode ${e.code})`));
    });
  });
}

/** Lama rekaman mp3 dalam detik — dihitung dari bingkai-bingkai MPEG di dalamnya. */
export function lamaMp3(mp3) {
  const LAJU_BIT = {
    1: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
    2: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
  };
  const LAJU_CUPLIK = { 3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000] };
  let i = 0;
  let detik = 0;
  // lewati tanda ID3 bila ada
  if (mp3.subarray(0, 3).toString("latin1") === "ID3") {
    i = 10 + ((mp3[6] << 21) | (mp3[7] << 14) | (mp3[8] << 7) | mp3[9]);
  }
  while (i + 4 <= mp3.length) {
    if (mp3[i] !== 0xff || (mp3[i + 1] & 0xe0) !== 0xe0) {
      i++;
      continue;
    }
    const versi = (mp3[i + 1] >> 3) & 3; // 3 = MPEG-1, 2 = MPEG-2, 0 = MPEG-2.5
    const lapisan = (mp3[i + 1] >> 1) & 3; // 1 = Layer III
    const kodeBit = mp3[i + 2] >> 4;
    const kodeCuplik = (mp3[i + 2] >> 2) & 3;
    const bantalan = (mp3[i + 2] >> 1) & 1;
    if (versi === 1 || lapisan !== 1 || kodeBit === 0 || kodeBit === 15 || kodeCuplik === 3) {
      i++;
      continue;
    }
    const lajuBit = LAJU_BIT[versi === 3 ? 1 : 2][kodeBit] * 1000;
    const lajuCuplik = LAJU_CUPLIK[versi][kodeCuplik];
    const cuplikPerBingkai = versi === 3 ? 1152 : 576;
    const panjang = Math.floor(((cuplikPerBingkai / 8) * lajuBit) / lajuCuplik) + bantalan;
    detik += cuplikPerBingkai / lajuCuplik;
    i += panjang;
  }
  return detik;
}
