<template>
  <header
    class="relative min-h-[92svh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#05070e] bg-gradient-to-b from-[#05070e] to-[#090e1f] text-white pt-20 pb-16"
  >
    <!-- Night-sky backdrop & Starfield -->
    <HofStarfield :density="110" seed="hof-hero-sky" tone="light" shooting />

    <!-- Ambient astronomical coordinates and declination grid lines -->
    <div
      class="pointer-events-none absolute inset-0 overflow-hidden opacity-25"
      aria-hidden="true"
    >
      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-slate-500/15"
      />
      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-dashed border-slate-500/10"
      />
    </div>

    <div
      class="relative z-10 w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
    >
      <div class="max-w-2xl mx-auto flex flex-col items-center">
        <!-- Micro category label -->
        <span
          class="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3"
        >
          ARSIP KEHORMATAN KEPEMIMPINAN NAWASENA
        </span>

        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight m-0 text-white"
        >
          Hall of Fame
        </h1>

        <p
          class="text-white/80 text-sm sm:text-base leading-relaxed mt-4 mb-0 m-0"
        >
          Peta perjalanan dedikasi dan kepemimpinan Nawasena yang terukir di rasi
          Leo. Bintang Regulus yang paling cemerlang melambangkan kabinet
          sebelumnya, membersamai jejak pengabdian dari masa ke masa.
        </p>

        <div v-if="!loading && lineage" class="mt-4">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-white/10 bg-white/5 text-white/80 font-mono text-xs"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>{{ lineage }}</span>
          </div>
        </div>
      </div>

      <!-- Leo Constellation Journey Map -->
      <div class="w-full mt-6 max-w-4xl mx-auto">
        <template v-if="loading">
          <div
            class="py-16 flex flex-col items-center gap-3 text-white/70 text-sm"
            aria-live="polite"
          >
            <span
              class="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin"
            />
            <p class="m-0 font-mono text-xs text-white/60">
              Memetakan konstelasi Leo...
            </p>
          </div>
        </template>

        <template v-else>
          <HofLeoConstellation
            :generations="generationsList"
            @select="$emit('select', $event)"
          />
        </template>
      </div>

      <!-- Scroll to lineage CTA -->
      <button
        type="button"
        class="min-h-[44px] inline-flex items-center gap-2.5 px-6 py-2.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer mt-6"
        aria-label="Gulir ke jejak kepengurusan"
        @click="$emit('cta')"
      >
        <span>Telusuri Jejak Kepengurusan</span>
        <Icon
          name="material-symbols:keyboard-arrow-down-rounded"
          class="text-lg text-white/70"
          aria-hidden="true"
        />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  generations?: any[];
  generation?: any;
  loading?: boolean;
  lineage?: string;
}>();

defineEmits<{
  (e: "select", generation: any): void;
  (e: "cta"): void;
}>();

const generationsList = computed(() => {
  if (props.generations && props.generations.length) {
    return props.generations;
  }
  if (props.generation) {
    return [props.generation];
  }
  return [];
});
</script>
