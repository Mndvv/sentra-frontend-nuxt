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
    <div class="flex items-center gap-3 mb-5">
      <span
        class="w-11 h-11 rounded-xl flex items-center justify-center bg-accent-soft text-accent shrink-0"
        aria-hidden="true"
      >
        <Icon :name="icon" class="text-xl" />
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
    <ul class="flex-1 flex flex-col gap-2.5 mb-6 list-none p-0 m-0">
      <li
        v-for="(perk, i) in perks"
        :key="i"
        class="flex items-start gap-2.5 text-xs sm:text-sm text-text-muted leading-snug"
      >
        <Icon
          name="material-symbols:check-circle-rounded"
          class="text-accent text-base shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <span>{{ perk }}</span>
      </li>
    </ul>

    <!-- Action Button -->
    <button
      type="button"
      class="mt-auto w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-5 font-semibold text-sm transition-all cursor-pointer no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
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
defineProps<{
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
</script>
