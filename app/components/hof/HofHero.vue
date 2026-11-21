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
          Sebuah langit untuk mengenang. Setiap pengurus adalah bintang yang
          pernah menerangi Nawasena, dan jejak dedikasi mereka abadi sebagai
          konstelasi kepemimpinan.
        </p>

        <p
          v-if="!loading && lineage"
          class="inline-flex items-center gap-2 mt-3 text-xs sm:text-sm font-semibold text-accent-soft"
        >
          <span class="w-2 h-2 rounded-full bg-accent shadow-xs" />
          {{ lineage }}
        </p>
      </div>

      <!-- Brightest constellation in the sky: latest demisioner cabinet -->
      <div class="w-full mt-6 max-w-4xl mx-auto">
        <template v-if="hasStars">
          <HofConstellationMap
            :stars="latestStars"
            :variant="'bright'"
            :size="'lg'"
            :show-labels="true"
            :interactive="true"
            @star-click="$emit('star-click', $event)"
          />
        </template>

        <template v-else-if="loading">
          <div
            class="py-12 flex flex-col items-center gap-3 text-white/70 text-sm"
            aria-live="polite"
          >
            <span
              class="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin"
            />
            <p class="m-0">Memetakan konstelasi bintang...</p>
          </div>
        </template>

        <template v-else>
          <p class="py-12 text-white/60 text-sm m-0">
            Langit masih menanti bintang pertamanya.
          </p>
        </template>
      </div>

      <!-- Scroll to lineage CTA -->
      <button
        type="button"
        class="min-h-[44px] inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full px-6 py-2.5 font-semibold text-xs sm:text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer mt-8"
        aria-label="Gulir ke jejak kepengurusan"
        @click="$emit('cta')"
      >
        <span>Telusuri jejak konstelasi</span>
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
import { generationStars } from "~/composables/useHof";

const props = defineProps<{
  generation?: any;
  loading?: boolean;
  lineage?: string;
}>();

defineEmits<{
  (e: "star-click", member: any): void;
  (e: "cta"): void;
}>();

const latestStars = computed(() => generationStars(props.generation));
const hasStars = computed(() => !props.loading && latestStars.value.length > 0);
</script>
