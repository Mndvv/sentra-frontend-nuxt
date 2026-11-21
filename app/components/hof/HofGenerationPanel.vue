<template>
  <section
    class="relative bg-bg-card border rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-200 overflow-hidden mb-8"
    :class="
      isLatest
        ? 'border-accent/40 shadow-md ring-1 ring-accent/20'
        : 'border-border'
    "
  >
    <!-- Header -->
    <header
      class="relative z-10 flex items-center justify-between gap-4 flex-wrap mb-5"
    >
      <div class="flex items-center gap-3.5 min-w-0">
        <div
          class="relative w-12 h-12 rounded-full border bg-bg-card-2 flex items-center justify-center shrink-0 shadow-xs"
          :class="
            isLatest
              ? 'border-accent text-accent ring-2 ring-accent/20'
              : 'border-border text-accent'
          "
          aria-hidden="true"
        >
          <span class="font-black text-base tracking-tight leading-none">{{
            roman
          }}</span>
          <span
            v-if="isLatest"
            class="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-accent border-2 border-bg-card"
          />
        </div>

        <div class="min-w-0">
          <h2
            class="text-xl sm:text-2xl font-black text-text-main m-0 leading-tight truncate"
          >
            {{ title }}
          </h2>
          <p class="text-xs sm:text-sm text-text-muted mt-0.5 m-0 font-medium">
            Angkatan ke-{{ generation.angkatan }} · {{ yearRange }}
          </p>
        </div>
      </div>

      <span
        v-if="isLatest"
        class="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-accent bg-accent-soft border border-accent/20 rounded-full px-3 py-1"
      >
        <span class="w-2 h-2 rounded-full bg-accent" />
        Kabinet Sebelumnya
      </span>
    </header>

    <!-- Constellation Map -->
    <div class="relative z-10 my-4">
      <HofConstellationMap
        :stars="stars"
        :size="'md'"
        :variant="isLatest ? 'bright' : 'faint'"
        :show-labels="true"
        :interactive="true"
        @star-click="$emit('star-click', $event)"
      />
    </div>

    <!-- Footer: Org breakdown & member buttons -->
    <footer
      class="relative z-10 flex flex-wrap gap-2.5 mt-6 pt-4 border-t border-border"
    >
      <button
        v-for="org in orgLinks"
        :key="org.key"
        type="button"
        class="min-h-[44px] inline-flex items-center gap-2.5 bg-bg-card-2 border border-border hover:border-accent/40 rounded-full px-4 py-2 text-xs sm:text-sm text-text-main font-semibold transition-all hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        @click="$emit('members', org.period, org.name)"
      >
        <span
          class="text-[0.62rem] font-extrabold uppercase tracking-wider text-white rounded-full px-2 py-0.5"
          :class="org.key === 'mpk' ? 'bg-purple-600' : 'bg-accent'"
        >
          {{ org.name }}
        </span>
        <span class="font-bold text-text-main">{{ org.period.nama }}</span>
        <span class="text-text-subtle text-xs">({{ org.total }} anggota)</span>
        <Icon
          name="material-symbols:arrow-forward-rounded"
          class="text-sm text-text-subtle"
          aria-hidden="true"
        />
      </button>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { romanNumeral, generationStars } from "~/composables/useHof";

const props = defineProps<{
  generation: any;
  isLatest?: boolean;
}>();

defineEmits<{
  (e: "star-click", member: any): void;
  (e: "members", period: any, org: "OSIS" | "MPK"): void;
}>();

const roman = computed(() => romanNumeral(props.generation.angkatan));

const title = computed(
  () =>
    props.generation.osis?.nama ??
    props.generation.mpk?.nama ??
    `Kepengurusan Angkatan ${props.generation.angkatan}`,
);

const yearRange = computed(() => {
  const o = props.generation.osis?.tahun;
  const m = props.generation.mpk?.tahun;
  if (o && m && o !== m) return `Tahun Ajaran ${o} / ${m}`;
  return `Tahun Ajaran ${o ?? m ?? ""}`;
});

const stars = computed(() => generationStars(props.generation));

interface OrgLink {
  key: "osis" | "mpk";
  name: "OSIS" | "MPK";
  period: any;
  total: number;
}

const orgLinks = computed<OrgLink[]>(() => {
  const links: OrgLink[] = [];
  for (const [key, name] of [
    ["osis", "OSIS"],
    ["mpk", "MPK"],
  ] as const) {
    const p = props.generation[key];
    if (!p) continue;
    links.push({
      key,
      name,
      period: p,
      total: (p.bph?.length || 0) + (p.anggota?.length || 0),
    });
  }
  return links;
});
</script>
