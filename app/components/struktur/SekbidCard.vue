<template>
  <div
    class="sekbid-card group relative overflow-hidden bg-bg-card border border-border rounded-[20px] p-5 cursor-pointer min-h-[148px] flex flex-col gap-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md will-change-transform"
    :style="cssVars"
    @click="$emit('click')"
  >
    <!-- Header: themed icon + sekbid number chip -->
    <div class="flex items-start justify-between gap-2 z-10">
      <div
        class="sekbid-icon w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-[6deg]"
      >
        <Icon :name="meta.icon" size="26" />
      </div>
      <span class="text-[0.58rem] font-extrabold uppercase tracking-[0.12em] px-2 py-[3px] rounded-md bg-bg-card-2 border border-border text-text-subtle leading-none">
        {{ chipLabel }}
      </span>
    </div>

    <!-- Name -->
    <h4 class="sekbid-name text-[0.92rem] font-bold text-text-main leading-snug m-0 line-clamp-3 transition-colors duration-300 z-10">
      {{ sekbid.name }}
    </h4>

    <!-- Footer: counts -->
    <div class="flex items-center gap-2 text-[0.7rem] text-text-muted mt-auto z-10">
      <span class="inline-flex items-center gap-1">
        <Icon name="material-symbols:group-rounded" class="text-[0.95rem]" />
        {{ memberCount }}
      </span>
      <span class="opacity-40">·</span>
      <span class="inline-flex items-center gap-1">
        <Icon name="material-symbols:checklist-rounded" class="text-[0.95rem]" />
        {{ programCount }}
      </span>
    </div>

    <!-- Decorative themed glow blur (corner) -->
    <div class="sekbid-glow absolute -bottom-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-60 pointer-events-none transition-opacity duration-500 group-hover:opacity-100" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  sekbid: any
  index: number | string
}>()

defineEmits(['click'])

const meta = computed(() => useSekbidMeta(props.sekbid?.number ?? props.index))

const isKomisi = computed(() =>
  !!props.sekbid?._isKomisi ||
  (typeof props.sekbid?.number === 'string' && /^[A-E]$/i.test(props.sekbid.number)),
)

const chipLabel = computed(() =>
  isKomisi.value ? `Komisi ${props.sekbid?.number}` : `Sekbid ${props.index}`,
)

const memberCount  = computed(() => Array.isArray(props.sekbid?.members)  ? props.sekbid.members.length  : 0)
const programCount = computed(() => Array.isArray(props.sekbid?.programs) ? props.sekbid.programs.length : 0)

const cssVars = computed(() => ({
  '--sekbid-color': meta.value.color,
  '--sekbid-glow':  meta.value.glow,
}))
</script>

<style scoped>
.sekbid-card:hover {
  border-color: var(--sekbid-color);
  box-shadow: 0 10px 30px -12px var(--sekbid-glow);
}
.sekbid-card:hover .sekbid-name {
  color: var(--sekbid-color);
}
.sekbid-icon {
  background: var(--sekbid-glow);
  color: var(--sekbid-color);
}
.sekbid-glow {
  background: var(--sekbid-glow);
}
</style>
