<template>
  <div
    class="bg-bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6 mb-8 w-full"
  >
    <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-center">
      <!-- Left Section: Progres Keseluruhan -->
      <div
        class="flex flex-col justify-center pr-0 lg:pr-6 lg:border-r lg:border-border"
      >
        <div class="flex items-center justify-between mb-2">
          <span
            class="text-xs font-bold uppercase tracking-wider text-text-muted"
            >Capaian Selesai</span
          >
          <span class="text-xs font-semibold text-text-subtle"
            >{{ selesai }}/{{ total }} Program</span
          >
        </div>

        <div
          class="text-3xl sm:text-4xl font-black text-text-main leading-none tracking-tight"
        >
          {{ completionRate }}%
        </div>

        <!-- Progress Bar -->
        <div
          class="w-full h-2.5 rounded-full bg-bg-card-2 border border-border overflow-hidden mt-3 relative"
          role="progressbar"
          :aria-valuenow="completionRate"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Capaian program selesai"
        >
          <div
            class="h-full rounded-full bg-accent transition-all duration-500 ease-out"
            :style="{ width: `${completionRate}%` }"
          />
        </div>

        <!-- Subtitle counters -->
        <div
          class="flex items-center flex-wrap gap-2 text-xs font-medium text-text-muted mt-3"
        >
          <span class="font-semibold text-text-main">{{ total }} Total</span>
          <span class="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
          <span class="inline-flex items-center gap-1.5">
            <span
              class="w-1.5 h-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            BPH: {{ bphCount }}
          </span>
          <span class="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
          <span class="inline-flex items-center gap-1.5">
            <span
              class="w-1.5 h-1.5 rounded-full bg-[var(--badge-plan-text)]"
              aria-hidden="true"
            />
            Sekbid: {{ sekbidCount }}
          </span>
          <template v-if="dibatalkan > 0">
            <span class="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
            <button
              type="button"
              class="text-xs transition-colors cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
              :class="
                activeFilter === 'Dibatalkan'
                  ? 'font-bold text-accent'
                  : 'text-text-subtle'
              "
              @click="toggleFilter('Dibatalkan')"
            >
              {{ dibatalkan }} Dibatalkan
            </button>
          </template>
        </div>
      </div>

      <!-- Right Section: Interactive Status Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          v-for="card in metricCards"
          :key="card.key"
          role="button"
          tabindex="0"
          :aria-pressed="isCardActive(card.key)"
          :aria-label="`Filter ${card.label}: ${card.count} program`"
          class="group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none min-h-[80px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          :class="[
            isCardActive(card.key)
              ? 'border-accent bg-accent-soft/40 ring-1 ring-accent/30 shadow-xs'
              : 'border-border bg-bg-card-2 hover:border-accent/30 hover:bg-bg-card hover:shadow-xs',
          ]"
          @click="toggleFilter(card.key)"
          @keydown.enter="toggleFilter(card.key)"
          @keydown.space.prevent="toggleFilter(card.key)"
        >
          <!-- Card Header (Label + Dot) -->
          <div class="flex items-center justify-between gap-1.5 mb-2">
            <span
              class="text-xs font-semibold text-text-muted uppercase tracking-wider truncate"
            >
              {{ card.label }}
            </span>
            <span
              class="w-2 h-2 rounded-full shrink-0"
              :class="card.dotClass"
              aria-hidden="true"
            />
          </div>

          <!-- Card Counter -->
          <div
            class="text-2xl sm:text-3xl font-extrabold tracking-tight leading-none"
            :class="card.textClass"
          >
            {{ card.count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ProgramItem {
  id?: number | string;
  nama?: string;
  status?: string | null;
  scope?: string | null;
  [key: string]: any;
}

interface MetricCard {
  key: string;
  label: string;
  count: number;
  dotClass: string;
  textClass: string;
}

const props = withDefaults(
  defineProps<{
    programs?: ProgramItem[];
    activeFilter?: string;
  }>(),
  {
    programs: () => [],
    activeFilter: "all",
  },
);

const emit = defineEmits<{
  (e: "update:activeFilter", value: string): void;
}>();

const total = computed(() => props.programs.length);
const selesai = computed(
  () => props.programs.filter((p) => p.status === "Selesai").length,
);
const berjalan = computed(
  () => props.programs.filter((p) => p.status === "Berjalan").length,
);
const direncanakan = computed(
  () =>
    props.programs.filter((p) => !p.status || p.status === "Direncanakan")
      .length,
);
const dibatalkan = computed(
  () => props.programs.filter((p) => p.status === "Dibatalkan").length,
);

const bphCount = computed(
  () => props.programs.filter((p) => p.scope !== "SEKBID").length,
);
const sekbidCount = computed(
  () => props.programs.filter((p) => p.scope === "SEKBID").length,
);

const completionRate = computed(() => {
  if (total.value <= 0) return 0;
  return Math.round((selesai.value / total.value) * 100);
});

function isCardActive(key: string): boolean {
  if (key === "all") {
    return !props.activeFilter || props.activeFilter === "all";
  }
  return props.activeFilter === key;
}

function toggleFilter(key: string) {
  if (key === "all") {
    emit("update:activeFilter", "all");
  } else {
    emit("update:activeFilter", props.activeFilter === key ? "all" : key);
  }
}

const metricCards = computed<MetricCard[]>(() => [
  {
    key: "all",
    label: "Semua",
    count: total.value,
    dotClass: "bg-accent",
    textClass: "text-text-main",
  },
  {
    key: "Berjalan",
    label: "Berjalan",
    count: berjalan.value,
    dotClass: "bg-[var(--badge-ongoing-text)]",
    textClass: "text-[var(--badge-ongoing-text)]",
  },
  {
    key: "Selesai",
    label: "Selesai",
    count: selesai.value,
    dotClass: "bg-[var(--badge-done-text)]",
    textClass: "text-[var(--badge-done-text)]",
  },
  {
    key: "Direncanakan",
    label: "Direncanakan",
    count: direncanakan.value,
    dotClass: "bg-[var(--badge-plan-text)]",
    textClass: "text-[var(--badge-plan-text)]",
  },
]);
</script>
