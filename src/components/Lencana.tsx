import type { Tingkat } from "@/lib/tipe";

/** Penanda tingkat kesulitan. Warnanya mengikuti palet entitas biologi. */
export function Lencana({ tingkat }: { tingkat: Tingkat }) {
  const gaya: Record<Tingkat, string> = {
    Dasar: "border-[#4A9D5B] text-[#3C7F4A]",
    Menengah: "border-[#E0A32E] text-[#A8760F]",
    Lanjut: "border-[#8B3A62] text-[#A3467A]",
  };
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${gaya[tingkat]}`}
    >
      {tingkat}
    </span>
  );
}
