<template>
  <div
    ref="el"
    class="transition-all duration-700 h-full"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
  >
    <div
      class="relative h-full flex flex-col justify-between bg-bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 overflow-hidden"
    >
      <!-- Subtle compass geometric watermark in background (palette consistent) -->
      <div
        class="absolute -right-8 -bottom-8 w-48 h-48 opacity-[0.03] text-accent pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
          />
          <polygon points="50,10 58,42 90,50 58,58 50,90 42,58 10,50 42,42" />
        </svg>
      </div>

      <div>
        <div class="flex items-center gap-2 text-accent mb-4">
          <Icon
            name="material-symbols:explore-rounded"
            class="text-xl"
            aria-hidden="true"
          />
          <span class="text-xs font-bold tracking-wider uppercase"
            >Makna & Filosofi</span
          >
        </div>

        <h3
          class="text-xl sm:text-2xl font-black text-text-main tracking-tight leading-snug mb-3"
        >
          Kompas Penggerak Nawasena
        </h3>

        <p class="text-text-muted text-sm sm:text-base leading-relaxed">
          Nama <strong class="text-accent font-bold">Nawasena</strong> berakar
          dari bahasa Sanskerta yang menempatkan organisasi ini sebagai kompas
          moral.
          <span class="text-text-main font-semibold"
            >Masa depan yang cerah</span
          >
          bukan sekadar angan, melainkan jangkar penentu gerak dalam menaungi
          OSIS dan MPK dalam satu harmoni perjuangan.
        </p>
      </div>

      <!-- Etymology Chips -->
      <div class="flex flex-wrap gap-2 pt-6 mt-6 border-t border-border/60">
        <div
          v-for="chip in chips"
          :key="chip.word"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card-2 border border-border text-xs text-text-main"
        >
          <Icon
            :name="chip.icon"
            class="text-accent text-sm shrink-0"
            aria-hidden="true"
          />
          <span class="font-bold text-accent">{{ chip.word }}</span>
          <span class="text-text-subtle">·</span>
          <span class="text-text-muted">{{ chip.meaning }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { el, isVisible } = useScrollReveal();

const chips = [
  { word: "Nawa", meaning: "Baru", icon: "material-symbols:sparkles-rounded" },
  {
    word: "Sena",
    meaning: "Kekuatan / Pasukan",
    icon: "material-symbols:shield-rounded",
  },
  {
    word: "Nawasena",
    meaning: "Pasukan pembawa masa depan cerah",
    icon: "material-symbols:flare-rounded",
  },
];
</script>
