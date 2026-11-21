<template>
  <div
    role="button"
    tabindex="0"
    class="sekbid-card group relative flex flex-col justify-between bg-bg-card border border-border hover:border-accent/40 rounded-2xl p-4 sm:p-5 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 min-h-[155px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    :style="cssVars"
    @click="$emit('click')"
    @keydown.enter="$emit('click')"
    @keydown.space.prevent="$emit('click')"
  >
    <!-- Top row: icon + chip -->
    <div class="flex items-start justify-between gap-2">
      <div
        class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
        :style="{
          background: 'var(--sekbid-glow)',
          color: 'var(--sekbid-color)',
        }"
      >
        <Icon :name="meta.icon" class="text-2xl" aria-hidden="true" />
      </div>
      <span
        class="text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-bg-card-2 border border-border text-text-subtle leading-none shrink-0"
      >
        {{ chipLabel }}
      </span>
    </div>

    <!-- Body: Name -->
    <div class="my-2.5">
      <h3
        class="text-sm sm:text-[0.92rem] font-bold text-text-main leading-snug line-clamp-3 group-hover:text-accent transition-colors m-0"
      >
        {{ sekbid.name }}
      </h3>
    </div>

    <!-- Footer: counts -->
    <div class="flex items-center gap-2 text-xs text-text-muted mt-auto">
      <span class="inline-flex items-center gap-1">
        <Icon
          name="material-symbols:group-rounded"
          class="text-sm"
          aria-hidden="true"
        />
        {{ memberCount }}
      </span>
      <span class="text-text-subtle/40" aria-hidden="true">•</span>
      <span class="inline-flex items-center gap-1">
        <Icon
          name="material-symbols:checklist-rounded"
          class="text-sm"
          aria-hidden="true"
        />
        {{ programCount }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSekbidMeta } from "~/composables/useSekbidMeta";

const props = defineProps<{
  sekbid: any;
  index: number | string;
}>();

defineEmits<{
  (e: "click"): void;
}>();

const meta = computed(() => useSekbidMeta(props.sekbid?.number ?? props.index));

const isKomisi = computed(
  () =>
    !!props.sekbid?._isKomisi ||
    (typeof props.sekbid?.number === "string" &&
      /^[A-E]$/i.test(props.sekbid.number)),
);

const chipLabel = computed(() =>
  isKomisi.value ? `Komisi ${props.sekbid?.number}` : `Sekbid ${props.index}`,
);

const memberCount = computed(() =>
  Array.isArray(props.sekbid?.members) ? props.sekbid.members.length : 0,
);
const programCount = computed(() =>
  Array.isArray(props.sekbid?.programs) ? props.sekbid.programs.length : 0,
);

const cssVars = computed(() => ({
  "--sekbid-color": meta.value.color,
  "--sekbid-glow": meta.value.glow,
}));
</script>
