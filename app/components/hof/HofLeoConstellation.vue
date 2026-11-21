<template>
  <div class="relative w-full max-w-4xl mx-auto select-none">
    <!-- Constellation Identification Header -->
    <div
      class="flex items-center justify-between px-2 mb-2 sm:mb-3 text-xs font-mono text-slate-400"
    >
      <div class="flex items-center gap-2">
        <span
          class="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
        />
        <span
          class="text-white/90 font-semibold tracking-wide uppercase text-[0.68rem] sm:text-xs"
        >
          Konstelasi Leo · Peta Jejak Kepemimpinan
        </span>
      </div>
      <span class="hidden sm:inline text-white/40 text-[0.65rem]">
        Bintang Regulus melambangkan periode sebelumnya
      </span>
    </div>

    <!-- ── Asterism Constellation Chart Container ── -->
    <div
      class="relative w-full h-[410px] sm:h-[460px] md:h-[500px] rounded-2xl border border-white/10 bg-[#070b18]/70 overflow-hidden shadow-2xl"
    >
      <!-- Background Celestial Grid lines & Declination Arc -->
      <svg
        class="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <!-- Radiant golden aura for Regulus -->
          <radialGradient id="regulus-halo-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.65" />
            <stop offset="35%" stop-color="#f59e0b" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Faint astronomical coordinate markings -->
        <ellipse
          cx="50"
          cy="50"
          rx="42"
          ry="38"
          fill="none"
          stroke="rgba(148, 163, 184, 0.08)"
          stroke-width="0.25"
          stroke-dasharray="2 2"
        />

        <!-- Constellation Edges (Connecting the Stars of Leo) -->
        <line
          v-for="(edge, i) in edgesWithCoords"
          :key="`bg-${i}`"
          :x1="edge.x1"
          :y1="edge.y1"
          :x2="edge.x2"
          :y2="edge.y2"
          stroke="rgba(165, 180, 252, 0.35)"
          stroke-width="0.35"
          stroke-dasharray="2 1.5"
        />
        <line
          v-for="(edge, i) in edgesWithCoords"
          :key="`fg-${i}`"
          :x1="edge.x1"
          :y1="edge.y1"
          :x2="edge.x2"
          :y2="edge.y2"
          stroke="rgba(255, 255, 255, 0.65)"
          stroke-width="0.2"
        />
      </svg>

      <!-- ── Star Nodes with Integrated Leadership Period Badges ── -->
      <div
        v-for="star in mappedStars"
        :key="star.id"
        class="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
        :style="{ left: star.x + '%', top: star.y + '%' }"
      >
        <!-- ── REGULUS (ALPHA): PERIODE SEBELUMNYA (Paling Terang) ── -->
        <template v-if="star.isAlpha && star.hasGeneration">
          <button
            type="button"
            class="relative flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-2xl p-2 transition-transform duration-200 hover:scale-105"
            :aria-label="`Periode Sebelumnya: ${star.title}, Angkatan ${star.angkatan}`"
            @click="handleStarClick(star)"
          >
            <!-- Glowing Beacon Aura -->
            <span
              class="absolute -inset-3 sm:-inset-5 rounded-full bg-amber-400/20 blur-md pointer-events-none"
              aria-hidden="true"
            />
            <span
              class="absolute -inset-1.5 sm:-inset-2.5 rounded-full bg-amber-300/30 blur-xs pointer-events-none"
              aria-hidden="true"
            />

            <!-- Star Center Orb -->
            <div
              class="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border-2 border-white shadow-[0_0_20px_rgba(251,191,36,0.85)] flex items-center justify-center text-slate-950 font-black text-xs sm:text-sm tracking-tight"
            >
              <span>{{ star.roman }}</span>
            </div>

            <!-- Prominent Badge: Periode Sebelumnya -->
            <div
              class="mt-2 flex flex-col items-center bg-[#090e1f]/95 border border-amber-400/50 rounded-xl px-3 py-1.5 text-center shadow-xl transition-all duration-200 group-hover:border-amber-400 group-hover:bg-[#0c132a]"
            >
              <div class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span
                  class="text-[0.62rem] sm:text-[0.68rem] font-black text-amber-300 tracking-wide uppercase whitespace-nowrap"
                >
                  Periode Sebelumnya (Regulus)
                </span>
              </div>
              <span
                class="text-[0.65rem] sm:text-[0.72rem] font-bold text-white whitespace-nowrap mt-0.5 max-w-[150px] sm:max-w-[200px] truncate"
              >
                {{ star.title }} · Angkatan {{ star.angkatan }}
              </span>
              <span
                v-if="star.years"
                class="text-[0.55rem] sm:text-[0.6rem] text-slate-400 font-medium whitespace-nowrap mt-0.5"
              >
                Masa Bakti {{ star.years }}
              </span>
            </div>
          </button>
        </template>

        <!-- ── PERIOD STARS (Angkatan-angkatan yang sudah berbakti) ── -->
        <template v-else-if="star.hasGeneration">
          <button
            type="button"
            class="relative flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-xl p-1.5 transition-transform duration-200 hover:scale-105"
            :aria-label="`Kepengurusan Angkatan ${star.angkatan}: ${star.title}`"
            @click="handleStarClick(star)"
          >
            <!-- Ambient Star Glow -->
            <span
              class="absolute -inset-2 rounded-full bg-white/15 blur-xs group-hover:bg-white/30 pointer-events-none"
              aria-hidden="true"
            />

            <!-- Star Orb -->
            <div
              class="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 border-2 border-white/90 shadow-[0_0_10px_rgba(255,255,255,0.7)] flex items-center justify-center text-white font-bold text-[0.65rem] sm:text-xs tracking-tight transition-colors group-hover:bg-slate-800"
            >
              <span>{{ star.roman }}</span>
            </div>

            <!-- Integrated Period Badge -->
            <div
              class="mt-1.5 flex flex-col items-center bg-[#090e1f]/90 border border-white/15 rounded-lg px-2.5 py-1 text-center shadow-md transition-all duration-200 group-hover:border-indigo-300/50 group-hover:bg-[#0c132a]"
            >
              <span
                class="text-[0.6rem] sm:text-[0.68rem] font-bold text-white whitespace-nowrap max-w-[130px] sm:max-w-[180px] truncate"
              >
                {{ star.title }}
              </span>
              <span
                class="text-[0.52rem] sm:text-[0.58rem] text-slate-400 font-medium whitespace-nowrap"
              >
                Angkatan {{ star.angkatan }} · {{ star.years }}
              </span>
            </div>
          </button>
        </template>

        <!-- ── GUIDE STARS OF LEO (Titik pembentuk rasi tanpa generasi) ── -->
        <template v-else>
          <div class="relative flex flex-col items-center pointer-events-none">
            <span
              class="w-2 h-2 rounded-full bg-white/40 border border-white/60 shadow-[0_0_5px_rgba(255,255,255,0.5)]"
            />
            <span
              class="mt-1 text-[0.5rem] font-mono tracking-wider text-white/30 uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            >
              {{ star.leoName }}
            </span>
          </div>
        </template>
      </div>
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
  x: number; // percentage 0..100
  y: number; // percentage 0..100
  isAlpha?: boolean;
}

/**
 * Astronomical skeleton of Constellation Leo (The Lion)
 * - Regulus (Alpha Leonis, Heart of the Lion): (67, 64) - The Brightest Star!
 * - Denebola (Beta Leonis, Tail): (18, 50)
 * - Zosma (Delta Leonis, Back): (38, 32)
 * - Chertan (Theta Leonis, Flank): (39, 68)
 * - Algieba (Gamma Leonis, Neck): (62, 30)
 * - Adhafera (Zeta Leonis, Mane): (64, 16)
 * - Al Jabbah (Mu Leonis, Head): (75, 12)
 * - Ras Elased (Epsilon Leonis, Snout): (83, 20)
 * - Subra (Omicron Leonis, Front Paw): (75, 84)
 */
const LEO_STARS: LeoStarLayout[] = [
  { id: "denebola", leoName: "Denebola", x: 18, y: 50 },
  { id: "zosma", leoName: "Zosma", x: 38, y: 32 },
  { id: "chertan", leoName: "Chertan", x: 39, y: 68 },
  { id: "algieba", leoName: "Algieba", x: 62, y: 30 },
  { id: "adhafera", leoName: "Adhafera", x: 64, y: 16 },
  { id: "al_jabbah", leoName: "Al Jabbah", x: 75, y: 12 },
  { id: "ras_elased", leoName: "Ras Elased", x: 83, y: 20 },
  { id: "regulus", leoName: "Regulus (Alpha)", x: 67, y: 64, isAlpha: true },
  { id: "subra", leoName: "Subra", x: 75, y: 84 },
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
      if (!gen) {
        return {
          ...star,
          hasGeneration: false,
          generation: null,
          name: "Regulus",
          title: "",
          angkatan: "",
          roman: "α",
          years: "",
        };
      }
      return {
        ...star,
        hasGeneration: true,
        generation: gen,
        name: "Periode Sebelumnya",
        title: gen.osis?.nama ?? gen.mpk?.nama ?? `Periode ke-${gen.angkatan}`,
        angkatan: String(gen.angkatan),
        roman: romanNumeral(gen.angkatan),
        years: gen.osis?.tahun ?? gen.mpk?.tahun ?? "",
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
