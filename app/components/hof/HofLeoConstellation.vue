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

    <!-- Asterism Constellation Chart Container -->
    <div
      class="relative w-full h-[410px] sm:h-[460px] md:h-[500px] rounded-2xl border border-white/10 bg-[#070b18]/70 overflow-hidden shadow-2xl"
    >
      <!-- Background Celestial Grid lines & Constellation Edges -->
      <svg
        class="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
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

      <!-- Concentric Celestial Coordinate Rings for Regulus (Alpha Leonis) -->
      <div
        class="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
        :style="{ left: regulusCoords.x + '%', top: regulusCoords.y + '%' }"
        aria-hidden="true"
      >
        <svg
          class="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 animate-[spin_60s_linear_infinite]"
          viewBox="0 0 120 120"
        >
          <!-- Outer fine coordinate circle -->
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#fbbf24"
            stroke-width="0.75"
            stroke-opacity="0.3"
            stroke-dasharray="3 4"
          />
          <!-- Mid coordinate ring with celestial dashes -->
          <circle
            cx="60"
            cy="60"
            r="40"
            fill="none"
            stroke="#fbbf24"
            stroke-width="1"
            stroke-opacity="0.45"
            stroke-dasharray="8 4 2 4"
          />
          <!-- Inner precision ring -->
          <circle
            cx="60"
            cy="60"
            r="26"
            fill="none"
            stroke="#fef08a"
            stroke-width="0.75"
            stroke-opacity="0.6"
            stroke-dasharray="2 2"
          />
          <!-- Reticle cardinal axis ticks -->
          <line
            x1="60"
            y1="2"
            x2="60"
            y2="8"
            stroke="#fbbf24"
            stroke-width="1"
            stroke-opacity="0.5"
          />
          <line
            x1="60"
            y1="112"
            x2="60"
            y2="118"
            stroke="#fbbf24"
            stroke-width="1"
            stroke-opacity="0.5"
          />
          <line
            x1="2"
            y1="60"
            x2="8"
            y2="60"
            stroke="#fbbf24"
            stroke-width="1"
            stroke-opacity="0.5"
          />
          <line
            x1="112"
            y1="60"
            x2="118"
            y2="60"
            stroke="#fbbf24"
            stroke-width="1"
            stroke-opacity="0.5"
          />
        </svg>
      </div>

      <!-- Star Nodes -->
      <div
        v-for="star in mappedStars"
        :key="star.id"
        class="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
        :style="{ left: star.x + '%', top: star.y + '%' }"
      >
        <!-- REGULUS (ALPHA): Periode Sebelumnya -->
        <template v-if="star.isAlpha && star.hasGeneration">
          <button
            type="button"
            class="relative flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full p-1 transition-transform duration-200 hover:scale-110"
            :class="{ 'scale-110': activeStarId === star.id }"
            :aria-label="`Periode Sebelumnya: ${star.title}, Angkatan ${star.angkatan}`"
            :title="`Periode Sebelumnya: ${star.title} (Angkatan ${star.angkatan}) · Klik untuk melihat kepengurusan`"
            @mouseenter="activeStarId = star.id"
            @focus="activeStarId = star.id"
            @click="handleStarClick(star)"
          >
            <!-- Crisp Star Center Core Orb -->
            <div
              class="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-500 border-2 border-white shadow-[0_0_16px_rgba(251,191,36,0.7)] flex items-center justify-center text-slate-950 font-black text-xs sm:text-sm tracking-tight"
            >
              <span>{{ star.roman }}</span>
            </div>

            <!-- Crisp Astronomical Label -->
            <div class="mt-1 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span
                class="text-[0.62rem] sm:text-[0.68rem] font-bold text-amber-300 uppercase tracking-wider drop-shadow-sm whitespace-nowrap"
              >
                Regulus · {{ star.roman }}
              </span>
            </div>
          </button>
        </template>

        <!-- PERIOD STARS (Angkatan-angkatan yang sudah berbakti) -->
        <template v-else-if="star.hasGeneration">
          <button
            type="button"
            class="relative flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-full p-1 transition-transform duration-200 hover:scale-110"
            :class="{ 'scale-110': activeStarId === star.id }"
            :aria-label="`Kepengurusan Angkatan ${star.angkatan}: ${star.title}`"
            :title="`Angkatan ${star.angkatan}: ${star.title} · Klik untuk melihat kepengurusan`"
            @mouseenter="activeStarId = star.id"
            @focus="activeStarId = star.id"
            @click="handleStarClick(star)"
          >
            <!-- Star Orb -->
            <div
              class="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 border-2 border-indigo-200/90 shadow-[0_0_10px_rgba(165,180,252,0.5)] flex items-center justify-center text-white font-bold text-[0.65rem] sm:text-xs tracking-tight transition-all group-hover:bg-slate-800"
              :class="
                activeStarId === star.id
                  ? 'border-amber-300 ring-2 ring-amber-400/50'
                  : ''
              "
            >
              <span>{{ star.roman }}</span>
            </div>

            <!-- Crisp Astronomical Label -->
            <span
              class="mt-1 text-[0.58rem] sm:text-[0.62rem] font-medium text-slate-300/90 tracking-wide whitespace-nowrap drop-shadow-sm"
            >
              {{ star.leoName }} · {{ star.roman }}
            </span>
          </button>
        </template>

        <!-- GUIDE STARS OF LEO (Titik pembentuk rasi tanpa generasi) -->
        <template v-else>
          <div class="relative flex flex-col items-center pointer-events-none">
            <span
              class="w-2 h-2 rounded-full bg-white/70 border border-white/90 shadow-[0_0_6px_rgba(255,255,255,0.7)]"
            />
            <span
              class="mt-1 text-[0.5rem] font-mono tracking-wider text-white/40 uppercase whitespace-nowrap"
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
import { ref, computed } from "vue";
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

const regulusCoords = { x: 67, y: 64 };

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

const activeStarId = ref<string>("regulus");

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
  if (star?.generation) {
    activeStarId.value = star.id;
    emit("select", star.generation);
  }
}
</script>
