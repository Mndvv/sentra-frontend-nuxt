<template>
  <div
    class="relative w-full max-w-4xl mx-auto h-[380px] sm:h-[440px] md:h-[480px] select-none"
  >
    <!-- Constellation Legend / Title Badge -->
    <div
      class="absolute top-2 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-semibold shadow-xs"
    >
      <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
      <span>Konstelasi Leo · Peta Perjalanan Kepemimpinan</span>
    </div>

    <!-- SVG Constellation Lines -->
    <svg
      class="absolute inset-0 w-full h-full pointer-events-none z-10"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <!-- Soft glow filter for constellation lines -->
        <filter id="leo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <!-- Super radiant glow filter for Alpha Star Regulus -->
        <radialGradient id="regulus-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.8" />
          <stop offset="50%" stop-color="#6366f1" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Constellation Edges (Connecting the Stars of Leo) -->
      <line
        v-for="(edge, i) in edgesWithCoords"
        :key="i"
        :x1="edge.x1"
        :y1="edge.y1"
        :x2="edge.x2"
        :y2="edge.y2"
        stroke="rgba(165, 180, 252, 0.45)"
        stroke-width="0.35"
        stroke-dasharray="2 1"
        filter="url(#leo-glow)"
      />
      <!-- Brighter core connecting lines -->
      <line
        v-for="(edge, i) in edgesWithCoords"
        :key="`core-${i}`"
        :x1="edge.x1"
        :y1="edge.y1"
        :x2="edge.x2"
        :y2="edge.y2"
        stroke="rgba(255, 255, 255, 0.6)"
        stroke-width="0.2"
      />
    </svg>

    <!-- Star Nodes (Periods & Guiding Stars of Leo) -->
    <div
      v-for="star in mappedStars"
      :key="star.id"
      class="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
      :style="{ left: star.x + '%', top: star.y + '%' }"
    >
      <!-- ── ALPHA STAR: REGULUS (Periode Sebelumnya - Paling Terang) ── -->
      <template v-if="star.isAlpha">
        <button
          type="button"
          class="relative flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full p-2"
          @click="handleStarClick(star)"
        >
          <!-- Outer Pulsing Halo Aura -->
          <span
            class="absolute -inset-4 sm:-inset-6 rounded-full bg-amber-400/25 blur-md animate-ping pointer-events-none"
            aria-hidden="true"
          />
          <span
            class="absolute -inset-3 sm:-inset-4 rounded-full bg-amber-400/30 blur-sm pointer-events-none"
            aria-hidden="true"
          />

          <!-- Star Center Orb -->
          <div
            class="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-amber-400 border-2 border-white shadow-[0_0_20px_rgba(251,191,36,0.9)] flex items-center justify-center text-slate-950 font-black text-xs sm:text-sm tracking-tight transition-transform duration-200 group-hover:scale-115"
          >
            <span>{{ star.roman }}</span>
            <span
              class="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-200 border-2 border-slate-900 flex items-center justify-center text-[0.5rem] font-black text-slate-900"
            >
              ★
            </span>
          </div>

          <!-- Brightest Star Label Badge -->
          <div
            class="mt-2 flex flex-col items-center bg-slate-900/85 backdrop-blur-md border border-amber-400/40 rounded-xl px-2.5 py-1 text-center shadow-lg transition-all duration-200 group-hover:border-amber-400 group-hover:bg-slate-900"
          >
            <span
              class="text-[0.62rem] sm:text-[0.68rem] font-black text-amber-300 tracking-wide uppercase flex items-center gap-1 whitespace-nowrap"
            >
              <Icon name="material-symbols:sparkles" class="text-xs" />
              {{ star.name }} (Regulus)
            </span>
            <span
              class="text-[0.58rem] sm:text-[0.64rem] font-bold text-white/90 whitespace-nowrap"
            >
              {{ star.title }} · Angkatan {{ star.angkatan }}
            </span>
            <span
              class="text-[0.52rem] text-white/60 font-medium whitespace-nowrap"
            >
              {{ star.years }}
            </span>
          </div>
        </button>
      </template>

      <!-- ── STANDARD PERIOD STARS (Angkatan-angkatan Sebelumnya) ── -->
      <template v-else-if="star.hasGeneration">
        <button
          type="button"
          class="relative flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-full p-1"
          @click="handleStarClick(star)"
        >
          <!-- Soft Star Halo -->
          <span
            class="absolute -inset-1.5 rounded-full bg-white/20 blur-xs group-hover:bg-white/40 pointer-events-none"
            aria-hidden="true"
          />

          <!-- Star Orb -->
          <div
            class="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900 border-2 border-white/80 shadow-[0_0_12px_rgba(255,255,255,0.7)] flex items-center justify-center text-white font-black text-[0.68rem] tracking-tight transition-transform duration-200 group-hover:scale-115 group-hover:bg-slate-800"
          >
            <span>{{ star.roman }}</span>
          </div>

          <!-- Star Label -->
          <div
            class="mt-1.5 flex flex-col items-center bg-slate-950/75 backdrop-blur-md border border-white/15 rounded-lg px-2 py-0.5 text-center transition-all duration-200 group-hover:border-indigo-400/50 group-hover:bg-slate-950/95"
          >
            <span
              class="text-[0.58rem] sm:text-[0.64rem] font-bold text-white whitespace-nowrap"
            >
              {{ star.title }}
            </span>
            <span
              class="text-[0.50rem] text-white/60 font-medium whitespace-nowrap"
            >
              Angkatan {{ star.angkatan }} · {{ star.years }}
            </span>
          </div>
        </button>
      </template>

      <!-- ── BACKGROUND CONSTELLATION GUIDE STARS (Titik Pembentuk Rasi Leo) ── -->
      <template v-else>
        <div class="relative flex flex-col items-center pointer-events-none">
          <span
            class="w-3 h-3 rounded-full bg-white/40 blur-[1px] animate-pulse"
          />
          <span
            class="absolute inset-0 w-2 h-2 m-auto rounded-full bg-white border border-white/80 shadow-[0_0_6px_rgba(255,255,255,0.8)]"
          />
          <span
            class="mt-1 text-[0.50rem] font-semibold text-white/40 tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {{ star.leoName }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { romanNumeral } from "~/composables/useHof";

const props = defineProps<{
  generations?: any[];
}>();

const emit = defineEmits<{
  (e: "select", generation: any): void;
}>();

interface LeoStarLayout {
  id: string;
  leoName: string;
  x: number; // percentage
  y: number; // percentage
  isAlpha?: boolean; // Regulus is Alpha (brightest star!)
}

/**
 * Astronomical skeleton of Constellation Leo (The Lion)
 * - Regulus (Alpha Leonis, Heart of the Lion): (67, 64) - The Brightest Star!
 * - Denebola (Beta Leonis, Tail): (18, 50)
 * - Zosma (Delta Leonis, Back): (38, 36)
 * - Chertan (Theta Leonis, Flank): (39, 64)
 * - Algieba (Gamma Leonis, Neck): (62, 35)
 * - Adhafera (Zeta Leonis, Mane): (64, 19)
 * - Al Jabbah (Mu Leonis, Head): (75, 14)
 * - Ras Elased (Epsilon Leonis, Snout): (82, 22)
 * - Subra (Omicron Leonis, Front Paw): (75, 80)
 */
const LEO_STARS: LeoStarLayout[] = [
  { id: "denebola", leoName: "Denebola", x: 18, y: 50 },
  { id: "zosma", leoName: "Zosma", x: 38, y: 36 },
  { id: "chertan", leoName: "Chertan", x: 39, y: 64 },
  { id: "algieba", leoName: "Algieba", x: 62, y: 35 },
  { id: "adhafera", leoName: "Adhafera", x: 64, y: 19 },
  { id: "al_jabbah", leoName: "Al Jabbah", x: 75, y: 14 },
  { id: "ras_elased", leoName: "Ras Elased", x: 82, y: 22 },
  { id: "regulus", leoName: "Regulus (Alpha)", x: 67, y: 64, isAlpha: true },
  { id: "subra", leoName: "Subra", x: 75, y: 80 },
];

/**
 * Connecting edges of the Leo constellation stick figure
 */
const LEO_EDGES: [string, string][] = [
  // The Sickle (Head & Mane of the Lion)
  ["ras_elased", "al_jabbah"],
  ["al_jabbah", "adhafera"],
  ["adhafera", "algieba"],
  ["algieba", "regulus"],
  ["regulus", "subra"],
  // The Body
  ["algieba", "zosma"],
  ["zosma", "chertan"],
  ["chertan", "regulus"],
  // The Hind Triangle & Tail
  ["zosma", "denebola"],
  ["chertan", "denebola"],
];

const starCoordsMap = computed(() => {
  const map = new Map<string, { x: number; y: number }>();
  for (const s of LEO_STARS) {
    map.set(s.id, { x: s.x, y: s.y });
  }
  return map;
});

const edgesWithCoords = computed(() => {
  return LEO_EDGES.map(([fromId, toId]) => {
    const from = starCoordsMap.value.get(fromId) || { x: 0, y: 0 };
    const to = starCoordsMap.value.get(toId) || { x: 0, y: 0 };
    return {
      x1: from.x,
      y1: from.y,
      x2: to.x,
      y2: to.y,
    };
  });
});

/**
 * Map generations into the stars of Leo:
 * - Regulus (isAlpha: true) ALWAYS gets the most recent demisioner cabinet (generations[0])!
 * - Earlier generations (generations[1], [2], ...) map onto the path of Leo (denebola, zosma, chertan, etc.).
 */
const mappedStars = computed(() => {
  const gens = props.generations || [];
  const latestGen = gens[0] || null;
  const olderGens = gens.slice(1);

  // Remaining slots for older generations (excluding regulus)
  const nonAlphaSlots = LEO_STARS.filter((s) => !s.isAlpha);

  return LEO_STARS.map((star) => {
    if (star.isAlpha) {
      // Regulus: The Alpha Star represents the latest demisioner cabinet!
      const gen = latestGen;
      return {
        ...star,
        hasGeneration: !!gen,
        generation: gen,
        name: "Periode Sebelumnya",
        title: gen?.osis?.nama ?? gen?.mpk?.nama ?? "Kabinet Sebelumnya",
        angkatan: gen?.angkatan ?? "VII",
        roman: gen ? romanNumeral(gen.angkatan) : "VII",
        years: gen?.osis?.tahun ?? gen?.mpk?.tahun ?? "2025/2026",
      };
    }

    // Older generation assignment
    const slotIndex = nonAlphaSlots.findIndex((s) => s.id === star.id);
    const gen = olderGens[slotIndex] || null;

    if (!gen) {
      return {
        ...star,
        hasGeneration: false,
        generation: null,
      };
    }

    return {
      ...star,
      hasGeneration: true,
      generation: gen,
      name: `Angkatan ${gen.angkatan}`,
      title: gen.osis?.nama ?? gen.mpk?.nama ?? `Periode ke-${gen.angkatan}`,
      angkatan: gen.angkatan,
      roman: romanNumeral(gen.angkatan),
      years: gen.osis?.tahun ?? gen.mpk?.tahun ?? "",
    };
  });
});

function handleStarClick(star: any) {
  if (star.generation) {
    emit("select", star.generation);
  }
}
</script>
