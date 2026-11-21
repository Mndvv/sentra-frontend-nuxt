<template>
  <div
    class="flex items-center gap-1.5 overflow-x-auto pb-1 mb-6 scrollbar-hide w-full"
    role="tablist"
    aria-label="Filter status program kerja"
  >
    <button
      v-for="tab in tabs"
      :key="tab.value"
      type="button"
      role="tab"
      :aria-selected="modelValue === tab.value"
      class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm cursor-pointer select-none whitespace-nowrap shrink-0 min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      :class="[
        modelValue === tab.value
          ? 'bg-accent text-white shadow-sm font-semibold'
          : 'bg-bg-card text-text-muted hover:text-text-main hover:bg-bg-card-2 border border-border font-medium',
      ]"
      @click="$emit('update:modelValue', tab.value)"
    >
      <span
        v-if="tab.dotClass"
        class="w-2 h-2 rounded-full shrink-0 transition-colors"
        :class="modelValue === tab.value ? 'bg-white' : tab.dotClass"
        aria-hidden="true"
      />
      <span>{{ tab.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface FilterTab {
  value: string;
  label: string;
  dotClass?: string;
}

withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "all",
  },
);

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const tabs: FilterTab[] = [
  { value: "all", label: "Semua" },
  {
    value: "Berjalan",
    label: "Berjalan",
    dotClass: "bg-[var(--badge-ongoing-text)]",
  },
  {
    value: "Selesai",
    label: "Selesai",
    dotClass: "bg-[var(--badge-done-text)]",
  },
  {
    value: "Direncanakan",
    label: "Direncanakan",
    dotClass: "bg-[var(--badge-plan-text)]",
  },
  {
    value: "Dibatalkan",
    label: "Dibatalkan",
    dotClass: "bg-[var(--text-subtle)]",
  },
];
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
