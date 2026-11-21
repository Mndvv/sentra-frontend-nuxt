<template>
  <article
    class="relative flex flex-col bg-bg-card rounded-2xl border p-6 sm:p-7 h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    :class="
      featured
        ? 'border-accent/40 shadow-md ring-1 ring-accent/20'
        : 'border-border shadow-sm'
    "
  >
    <!-- Featured Pill Badge -->
    <span
      v-if="featured"
      class="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-accent text-white text-[0.68rem] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm"
    >
      <Icon
        name="material-symbols:auto-awesome"
        class="text-xs"
        aria-hidden="true"
      />
      Pilihan Utama
    </span>

    <!-- Tier Header -->
    <div class="flex items-center gap-3.5 mb-5">
      <span
        class="w-12 h-12 rounded-xl flex items-center justify-center p-2.5 shrink-0 transition-transform duration-200"
        :class="gemBadgeClass"
        aria-hidden="true"
      >
        <SponsorGemstoneIcon
          v-if="isGemstone"
          :gem="tierId || label"
          class="w-full h-full"
        />
        <Icon v-else :name="icon" class="text-xl" />
      </span>
      <div class="min-w-0">
        <p
          class="text-[0.68rem] font-bold tracking-widest uppercase text-text-subtle leading-none mb-1"
        >
          {{ label }}
        </p>
        <h3 class="text-lg font-bold text-text-main leading-tight m-0">
          {{ title }}
        </h3>
      </div>
    </div>

    <!-- Pricing -->
    <div class="mb-2">
      <span
        class="text-2xl sm:text-3xl font-black tracking-tight text-text-main tabular-nums"
      >
        {{ price }}
      </span>
      <span class="text-text-subtle text-xs font-medium ml-1">/ paket</span>
    </div>

    <!-- Description -->
    <p class="text-xs sm:text-sm text-text-muted leading-relaxed mb-5">
      {{ desc }}
    </p>

    <hr class="border-t border-border mb-5" />

    <!-- Perks List -->
    <ul class="flex flex-col gap-2.5 list-none p-0 m-0 mb-8 flex-1">
      <li
        v-for="(perk, i) in perks"
        :key="i"
        class="flex items-start gap-2.5 text-xs sm:text-sm text-text-muted leading-relaxed"
      >
        <span
          class="w-4 h-4 rounded-full bg-[var(--badge-done-bg)] text-[var(--badge-done-text)] flex items-center justify-center shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <Icon name="material-symbols:check" class="text-xs" />
        </span>
        <span>{{ perk }}</span>
      </li>
    </ul>

    <!-- Action Button -->
    <button
      type="button"
      class="w-full min-h-[44px] py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      :class="
        featured
          ? 'bg-accent text-white hover:bg-accent-hover shadow-sm'
          : 'border border-accent/30 text-accent hover:bg-accent-soft'
      "
      @click="$emit('select', tierId || label.toLowerCase())"
    >
      Pilih Paket
      <Icon
        name="material-symbols:arrow-forward"
        class="text-base"
        aria-hidden="true"
      />
    </button>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  icon: string;
  label: string;
  title: string;
  desc: string;
  price: string;
  perks: string[];
  featured?: boolean;
  tierId?: string;
}>();

defineEmits<{
  (e: "select", tierId: string): void;
}>();

const isGemstone = computed(() => {
  const id = (props.tierId || props.label || "").toLowerCase();
  return ["amethyst", "topaz", "sapphire", "alexandrite"].some((g) =>
    id.includes(g),
  );
});

const gemBadgeClass = computed(() => {
  const id = (props.tierId || props.label || "").toLowerCase();
  if (id.includes("amethyst")) {
    return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20";
  }
  if (id.includes("topaz")) {
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
  }
  if (id.includes("sapphire")) {
    return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
  }
  if (id.includes("alexandrite")) {
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
  }
  return "bg-accent-soft text-accent border border-accent/20";
});
</script>
