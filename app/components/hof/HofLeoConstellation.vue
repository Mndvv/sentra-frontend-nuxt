<template>
  <div class="relative w-full max-w-4xl mx-auto flex flex-col items-center">
    <!-- ── Asterism Celestial Chart Area ──────────────────────────────── -->
    <div class="relative w-full aspect-[1000/600] select-none">
      <!-- Constellation Identification Badge -->
      <div
        class="absolute top-2 left-3 sm:top-3 sm:left-4 z-20 flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0a0f1d]/85 border border-white/10 text-white/80 text-[0.62rem] sm:text-xs font-mono uppercase tracking-wider pointer-events-none"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span>Formasi Rasi Leo</span>
      </div>

      <!-- Astronomical Telemetry Header -->
      <div
        class="hidden sm:flex absolute top-3 right-4 z-20 items-center gap-2 text-slate-400 text-[0.62rem] font-mono tracking-wider pointer-events-none"
      >
        <span>RA 10h-12h · DEC +10°-+25°</span>
      </div>

      <!-- SVG Constellation & Astronomical Grid Lines -->
      <svg
        class="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <!-- Soft celestial glow filter -->
          <filter id="celestial-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <!-- Optical corona for Alpha star Regulus -->
          <radialGradient id="regulus-corona" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.55" />
            <stop offset="60%" stop-color="#fbbf24" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#fbbf24" stop-opacity="0" />
          </radialGradient>
          <!-- Optical corona for Major stars -->
          <radialGradient id="major-corona" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#e0e7ff" stop-opacity="0.45" />
            <stop offset="100%" stop-color="#e0e7ff" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Celestial Coordinate Grid & Declination Lines -->
        <g class="opacity-60">
          <!-- Declination Arc -->
          <ellipse
            cx="500"
            cy="300"
            rx="390"
            ry="230"
            fill="none"
            stroke="rgba(148, 163, 184, 0.08)"
            stroke-width="1"
            stroke-dasharray="4 8"
          />
          <!-- Coordinate Meridian & Parallel -->
          <line
            x1="100"
            y1="300"
            x2="900"
            y2="300"
            stroke="rgba(148, 163, 184, 0.07)"
            stroke-width="1"
            stroke-dasharray="3 6"
          />
          <line
            x1="500"
            y1="60"
            x2="500"
            y2="540"
            stroke="rgba(148, 163, 184, 0.07)"
            stroke-width="1"
            stroke-dasharray="3 6"
          />
          <!-- Grid Telemetry Markers -->
          <text
            x="105"
            y="295"
            fill="rgba(148, 163, 184, 0.35)"
            font-size="10"
            font-family="monospace"
          >
            +10°
          </text>
          <text
            x="865"
            y="295"
            fill="rgba(148, 163, 184, 0.35)"
            font-size="10"
            font-family="monospace"
          >
            +20°
          </text>
          <text
            x="506"
            y="75"
            fill="rgba(148, 163, 184, 0.35)"
            font-size="10"
            font-family="monospace"
          >
            11h RA
          </text>
        </g>

        <!-- Constellation Connector Lines (Faint Celestial Edges) -->
        <line
          v-for="edge in edgesWithCoords"
          :key="edge.id"
          :x1="edge.x1"
          :y1="edge.y1"
          :x2="edge.x2"
          :y2="edge.y2"
          stroke="rgba(165, 180, 252, 0.35)"
          stroke-width="1.5"
          stroke-dasharray="6 4"
        />

        <!-- Active Edges Connected to Selected Star -->
        <line
          v-for="edge in activeEdges"
          :key="`active-${edge.id}`"
          :x1="edge.x1"
          :y1="edge.y1"
          :x2="edge.x2"
          :y2="edge.y2"
          stroke="rgba(255, 255, 255, 0.75)"
          stroke-width="2"
          filter="url(#celestial-glow)"
        />

        <!-- Subtle Optical Coronas Behind Major Stars -->
        <circle
          cx="670"
          cy="390"
          r="26"
          fill="url(#regulus-corona)"
        />
        <circle
          cx="180"
          cy="310"
          r="16"
          fill="url(#major-corona)"
        />
        <circle
          cx="620"
          cy="220"
          r="16"
          fill="url(#major-corona)"
        />
        <circle
          cx="380"
          cy="220"
          r="16"
          fill="url(#major-corona)"
        />
      </svg>

      <!-- ── Star Nodes (Mapped Astronomical Buttons) ──────────────────── -->
      <div
        v-for="star in mappedStars"
        :key="star.id"
        class="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
        :style="{ left: `${star.x / 10}%`, top: `${star.y / 6}%` }"
      >
        <button
          type="button"
          class="relative min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center rounded-full cursor-pointer transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070e]"
          :class="[
            selectedStarId === star.id ? 'z-30 scale-110' : 'hover:scale-105 z-20',
          ]"
          :aria-label="star.ariaLabel"
          :aria-pressed="selectedStarId === star.id"
          @click="handleStarClick(star)"
          @focus="selectStar(star)"
        >
          <!-- Regulus: Alpha Leonis -->
          <template v-if="star.tier === 'alpha'">
            <div
              class="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-400 border-2 border-white text-slate-950 font-black text-xs flex items-center justify-center shadow-[0_0_14px_rgba(251,191,36,0.85)] transition-all"
              :class="[
                selectedStarId === star.id
                  ? 'ring-2 ring-amber-300 ring-offset-2 ring-offset-[#05070e]'
                  : 'group-hover:ring-2 group-hover:ring-amber-400/60 group-hover:ring-offset-1 group-hover:ring-offset-[#05070e]',
              ]"
            >
              <span>{{ star.roman || 'α' }}</span>
            </div>
          </template>

          <!-- Major Stars (Denebola, Algieba, Zosma) -->
          <template v-else-if="star.tier === 'major'">
            <div
              class="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border border-indigo-200 text-slate-950 font-bold text-[0.62rem] sm:text-[0.68rem] flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.7)] transition-all"
              :class="[
                selectedStarId === star.id
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-[#05070e]'
                  : 'group-hover:ring-2 group-hover:ring-white/50 group-hover:ring-offset-1 group-hover:ring-offset-[#05070e]',
              ]"
            >
              <span v-if="star.hasGeneration">{{ star.roman }}</span>
            </div>
          </template>

          <!-- Guide Stars -->
          <template v-else>
            <div
              class="rounded-full transition-all flex items-center justify-center"
              :class="[
                star.hasGeneration
                  ? 'w-4 h-4 sm:w-5 sm:h-5 bg-indigo-100 border border-white text-slate-950 font-bold text-[0.55rem] shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                  : 'w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white/90 border border-indigo-200/60 shadow-[0_0_5px_rgba(255,255,255,0.5)]',
                selectedStarId === star.id
                  ? 'ring-2 ring-indigo-300 ring-offset-2 ring-offset-[#05070e] scale-125'
                  : 'group-hover:ring-2 group-hover:ring-white/50 group-hover:ring-offset-1 group-hover:ring-offset-[#05070e]',
              ]"
            >
              <span v-if="star.hasGeneration">{{ star.roman }}</span>
            </div>
          </template>

          <!-- Star Name Tag -->
          <span
            class="absolute -bottom-3 sm:-bottom-3.5 left-1/2 -translate-x-1/2 text-[0.52rem] sm:text-[0.6rem] font-mono tracking-wider whitespace-nowrap pointer-events-none transition-all duration-150"
            :class="[
              selectedStarId === star.id
                ? 'text-amber-200 font-semibold opacity-100'
                : 'text-slate-400 opacity-60 group-hover:opacity-100',
            ]"
          >
            {{ star.leoName }}
          </span>
        </button>
      </div>
    </div>

    <!-- ── Celestial Inspection HUD Card ─────────────────────────────── -->
    <div
      v-if="selectedStar"
      class="w-full max-w-xl mx-auto mt-2 sm:mt-4 px-3 sm:px-0"
      role="region"
      aria-live="polite"
      aria-label="Inspeksi Bintang Terpilih"
    >
      <Transition name="fade-hud" mode="out-in">
        <div
          :key="selectedStar.id"
          class="bg-[#0a0f1d] border border-white/12 rounded-xl p-3.5 sm:p-4 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <!-- Star Telemetry & Details -->
          <div class="flex-1 min-w-0">
            <!-- Astronomical Catalog Line -->
            <div
              class="flex items-center gap-1.5 text-[0.65rem] sm:text-xs font-mono text-indigo-300 uppercase tracking-wider"
            >
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :class="selectedStar.isAlpha ? 'bg-amber-400' : 'bg-indigo-300'"
              />
              <span class="font-semibold">{{ selectedStar.leoName }} ({{ selectedStar.bayer }})</span>
              <span class="text-white/30">·</span>
              <span class="text-white/60 truncate">{{ selectedStar.catalog }}</span>
            </div>

            <!-- Cabinet Details or Guiding Star Description -->
            <div v-if="selectedStar.hasGeneration" class="mt-1.5">
              <div class="flex items-baseline gap-2">
                <h3 class="text-sm sm:text-base font-bold text-white tracking-tight truncate m-0">
                  {{ selectedStar.title }}
                </h3>
                <span class="text-[0.65rem] sm:text-xs font-mono text-amber-300 shrink-0">
                  Angkatan {{ selectedStar.angkatan }}
                </span>
              </div>
              <p v-if="selectedStar.years" class="text-xs text-slate-400 mt-0.5 m-0">
                Masa Bakti: {{ selectedStar.years }}
              </p>
            </div>

            <div v-else class="mt-1.5">
              <h3 class="text-xs sm:text-sm font-semibold text-slate-200 m-0">
                Bintang Pembimbing Rasi Leo
              </h3>
              <p class="text-[0.68rem] sm:text-xs text-slate-400 mt-0.5 m-0">
                Titik koordinat astronomis penuntun formasi rasi Leo.
              </p>
            </div>
          </div>

          <!-- Action Button (only if star has generation) -->
          <div v-if="selectedStar.hasGeneration" class="shrink-0 pt-1 sm:pt-0">
            <button
              type="button"
              class="min-h-[44px] w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              @click="emitSelect(selectedStar.generation)"
            >
              Buka Detail Kepengurusan
            </button>
          </div>
        </div>
      </Transition>
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
  bayer: string;
  catalog: string;
  x: number;
  y: number;
  magnitude: number;
  tier: "alpha" | "major" | "guide";
  isAlpha?: boolean;
}

interface MappedStar extends LeoStarLayout {
  hasGeneration: boolean;
  generation: any | null;
  name: string;
  title: string;
  angkatan: string | number;
  roman: string;
  years: string;
  ariaLabel: string;
}

/**
 * Astronomical coordinates for constellation Leo (The Lion) mapped into 1000x600 space:
 * - Denebola (Tail / Beta): x: 180, y: 310
 * - Zosma (Delta): x: 380, y: 220
 * - Chertan (Theta): x: 390, y: 390
 * - Algieba (Neck / Gamma): x: 620, y: 220
 * - Adhafera (Zeta): x: 640, y: 120
 * - Al Jabbah (Mu): x: 750, y: 90
 * - Ras Elased (Epsilon): x: 820, y: 140
 * - Regulus (Heart / Alpha): x: 670, y: 390
 * - Subra (Omicron): x: 750, y: 490
 */
const LEO_STARS: LeoStarLayout[] = [
  {
    id: "regulus",
    leoName: "Regulus",
    bayer: "Alpha Leonis",
    catalog: "Jantung Rasi Leo",
    x: 670,
    y: 390,
    magnitude: 1.35,
    tier: "alpha",
    isAlpha: true,
  },
  {
    id: "denebola",
    leoName: "Denebola",
    bayer: "Beta Leonis",
    catalog: "Ekor Rasi Leo",
    x: 180,
    y: 310,
    magnitude: 2.14,
    tier: "major",
  },
  {
    id: "algieba",
    leoName: "Algieba",
    bayer: "Gamma Leonis",
    catalog: "Surai dan Leher Rasi Leo",
    x: 620,
    y: 220,
    magnitude: 2.01,
    tier: "major",
  },
  {
    id: "zosma",
    leoName: "Zosma",
    bayer: "Delta Leonis",
    catalog: "Punggung Rasi Leo",
    x: 380,
    y: 220,
    magnitude: 2.56,
    tier: "major",
  },
  {
    id: "chertan",
    leoName: "Chertan",
    bayer: "Theta Leonis",
    catalog: "Pinggul Rasi Leo",
    x: 390,
    y: 390,
    magnitude: 3.32,
    tier: "guide",
  },
  {
    id: "adhafera",
    leoName: "Adhafera",
    bayer: "Zeta Leonis",
    catalog: "Lekukan Surai Rasi Leo",
    x: 640,
    y: 120,
    magnitude: 3.44,
    tier: "guide",
  },
  {
    id: "al_jabbah",
    leoName: "Al Jabbah",
    bayer: "Mu Leonis",
    catalog: "Dahi Rasi Leo",
    x: 750,
    y: 90,
    magnitude: 3.88,
    tier: "guide",
  },
  {
    id: "ras_elased",
    leoName: "Ras Elased",
    bayer: "Epsilon Leonis",
    catalog: "Moncong Utara Rasi Leo",
    x: 820,
    y: 140,
    magnitude: 2.98,
    tier: "guide",
  },
  {
    id: "subra",
    leoName: "Subra",
    bayer: "Omicron Leonis",
    catalog: "Pijakan Cakar Rasi Leo",
    x: 750,
    y: 490,
    magnitude: 3.52,
    tier: "guide",
  },
];

/**
 * Constellation connector lines in SVG (Edges of the Leo stick figure)
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

const selectedStarId = ref("regulus");

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
      id: `${fromId}-${toId}`,
      fromId,
      toId,
      x1: from.x,
      y1: from.y,
      x2: to.x,
      y2: to.y,
    };
  });
});

const activeEdges = computed(() => {
  const selectedId = selectedStarId.value;
  return edgesWithCoords.value.filter(
    (e) => e.fromId === selectedId || e.toId === selectedId,
  );
});

const mappedStars = computed<MappedStar[]>(() => {
  const gens = props.generations || [];
  const latestGen = gens[0] || null;
  const olderGens = gens.slice(1);

  const alphaStar = LEO_STARS.find((s) => s.isAlpha)!;
  const nonAlphaStars = LEO_STARS.filter((s) => !s.isAlpha);

  const mappedAlpha: MappedStar = (() => {
    if (!latestGen) {
      return {
        ...alphaStar,
        hasGeneration: false,
        generation: null,
        name: "Regulus",
        title: "",
        angkatan: "",
        roman: "α",
        years: "",
        ariaLabel: `Bintang Regulus (${alphaStar.bayer})`,
      };
    }
    const title =
      latestGen.osis?.nama ??
      latestGen.mpk?.nama ??
      `Kepengurusan Angkatan ${latestGen.angkatan}`;
    const years = latestGen.osis?.tahun ?? latestGen.mpk?.tahun ?? "";
    const roman = romanNumeral(latestGen.angkatan);
    return {
      ...alphaStar,
      hasGeneration: true,
      generation: latestGen,
      name: "Periode Sebelumnya",
      title,
      angkatan: String(latestGen.angkatan),
      roman,
      years,
      ariaLabel: `Bintang Utama Regulus: ${title}, Angkatan ${latestGen.angkatan}`,
    };
  })();

  const mappedNonAlpha: MappedStar[] = nonAlphaStars.map((star, idx) => {
    const gen = olderGens[idx] || null;
    if (!gen) {
      return {
        ...star,
        hasGeneration: false,
        generation: null,
        name: star.leoName,
        title: "",
        angkatan: "",
        roman: "",
        years: "",
        ariaLabel: `Bintang Pembimbing ${star.leoName} (${star.bayer})`,
      };
    }
    const title =
      gen.osis?.nama ?? gen.mpk?.nama ?? `Kepengurusan Angkatan ${gen.angkatan}`;
    const years = gen.osis?.tahun ?? gen.mpk?.tahun ?? "";
    const roman = romanNumeral(gen.angkatan);
    return {
      ...star,
      hasGeneration: true,
      generation: gen,
      name: `Angkatan ${gen.angkatan}`,
      title,
      angkatan: gen.angkatan,
      roman,
      years,
      ariaLabel: `Bintang ${star.leoName}: ${title}, Angkatan ${gen.angkatan}`,
    };
  });

  return [mappedAlpha, ...mappedNonAlpha];
});

const selectedStar = computed<MappedStar>(() => {
  const found = mappedStars.value.find((s) => s.id === selectedStarId.value);
  return (found ?? mappedStars.value[0]) as MappedStar;
});

function selectStar(star: { id: string }) {
  selectedStarId.value = star.id;
}

function emitSelect(generation: any) {
  if (generation) {
    emit("select", generation);
  }
}

function handleStarClick(star: { id: string; generation?: any }) {
  if (selectedStarId.value === star.id && star.generation) {
    emitSelect(star.generation);
  } else {
    selectStar(star);
  }
}
</script>

<style scoped>
.fade-hud-enter-active,
.fade-hud-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-hud-enter-from {
  opacity: 0;
  transform: translateY(3px);
}
.fade-hud-leave-to {
  opacity: 0;
  transform: translateY(-3px);
}
</style>
