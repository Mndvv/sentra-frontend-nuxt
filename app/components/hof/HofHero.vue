<template>
  <header
    class="relative min-h-[92svh] md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#08071a] via-[#121133] to-[#1e1a4d] text-white pt-20 pb-16"
  >
    <!-- Night-sky backdrop & Starfield -->
    <HofStarfield :density="110" seed="hof-hero-sky" tone="light" shooting />

    <div
      class="relative z-10 w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
    >
      <div class="max-w-2xl mx-auto">
        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight m-0 text-white drop-shadow-md"
        >
          Hall of Fame
        </h1>
        <p
          class="text-white/80 text-sm sm:text-base leading-relaxed mt-4 mb-2 m-0"
        >
          Peta perjalanan cahaya kepemimpinan Nawasena yang terukir di rasi Leo.
          Bintang Regulus yang paling terang melambangkan kabinet sebelumnya,
          membersamai jejak dedikasi dari masa ke masa.
        </p>

        <p
          v-if="!loading && lineage"
          class="inline-flex items-center gap-2 mt-3 text-xs sm:text-sm font-semibold text-accent-soft"
        >
          <span class="w-2 h-2 rounded-full bg-accent shadow-xs" />
          {{ lineage }}
        </p>
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
            <p class="m-0">Memetakan konstelasi Leo...</p>
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
        class="min-h-[44px] inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full px-6 py-2.5 font-semibold text-xs sm:text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer mt-6"
        aria-label="Gulir ke jejak kepengurusan"
        @click="$emit('cta')"
      >
        <span>Jelajahi Angkatan Kepengurusan</span>
        <Icon
          name="material-symbols:keyboard-arrow-down-rounded"
          class="text-lg"
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
