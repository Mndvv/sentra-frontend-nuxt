<template>
  <div class="bg-bg-card border border-border rounded-2xl shadow-md p-5 md:p-7 mb-8 w-full">
    <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-center">

      <!-- ── Donut Chart (interactive) ────────────────────── -->
      <div class="flex items-center justify-center">
        <div class="relative w-[200px] h-[200px] md:w-[220px] md:h-[220px]">
          <svg viewBox="0 0 120 120" class="w-full h-full -rotate-90">
            <!-- Background ring (click = reset to "all") -->
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke="var(--border)" stroke-width="12"
              class="cursor-pointer"
              @click="toggleFilter('all')"
            />
            <!-- Selesai arc -->
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke="#22c55e"
              :stroke-width="arcWidth('Selesai')" stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference - selesaiArc"
              :opacity="arcOpacity('Selesai')"
              class="transition-all duration-500 ease-out cursor-pointer"
              @click="toggleFilter('Selesai')"
            />
            <!-- Berjalan arc -->
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke="#f59e0b"
              :stroke-width="arcWidth('Berjalan')" stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference - berjalanArc"
              :style="{ transform: `rotate(${selesaiDeg}deg)`, transformOrigin: '60px 60px' }"
              :opacity="arcOpacity('Berjalan')"
              class="transition-all duration-500 ease-out cursor-pointer"
              @click="toggleFilter('Berjalan')"
            />
            <!-- Direncanakan arc -->
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke="#94a3b8"
              :stroke-width="arcWidth('Direncanakan')" stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference - direncanakanArc"
              :style="{ transform: `rotate(${selesaiDeg + berjalanDeg}deg)`, transformOrigin: '60px 60px' }"
              :opacity="arcOpacity('Direncanakan')"
              class="transition-all duration-500 ease-out cursor-pointer"
              @click="toggleFilter('Direncanakan')"
            />
            <!-- Dibatalkan arc -->
            <circle
              v-if="dibatalkan > 0"
              cx="60" cy="60" r="50" fill="none"
              stroke="#f87171"
              :stroke-width="arcWidth('Dibatalkan')" stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference - dibatalkanArc"
              :style="{ transform: `rotate(${selesaiDeg + berjalanDeg + direncanakanDeg}deg)`, transformOrigin: '60px 60px' }"
              :opacity="arcOpacity('Dibatalkan')"
              class="transition-all duration-500 ease-out cursor-pointer"
              @click="toggleFilter('Dibatalkan')"
            />
          </svg>
          <!-- Center label (dynamic based on active filter) -->
          <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span class="text-[2rem] md:text-[2.2rem] font-[900] tracking-[-2px] leading-none" :style="{ color: centerColor }">
              {{ centerValue }}<small v-if="activeFilter === 'all'" class="text-[1.1rem] font-[700] tracking-normal">%</small>
            </span>
            <span class="text-[0.68rem] font-semibold text-text-muted uppercase tracking-[0.08em] mt-1">{{ centerLabel }}</span>
          </div>
        </div>
      </div>

      <!-- ── Stats + Legend (interactive) ─────────────────── -->
      <div class="flex flex-col gap-3">
        <!-- Total banner (click = reset) -->
        <button
          type="button"
          class="flex items-center gap-3 p-3.5 rounded-xl border text-left w-full transition-all duration-200"
          :class="activeFilter === 'all'
            ? 'bg-gradient-to-r from-accent/12 to-purple-500/8 border-accent/30 ring-1 ring-accent/20'
            : 'bg-gradient-to-r from-accent/8 to-purple-500/5 border-accent/15 hover:border-accent/25'"
          @click="toggleFilter('all')"
        >
          <div class="w-10 h-10 rounded-xl bg-accent/12 flex items-center justify-center shrink-0">
            <Icon name="material-symbols:assignment-rounded" class="text-accent text-[1.2rem]" />
          </div>
          <div>
            <span class="text-[1.5rem] font-[800] tracking-[-1px] leading-none text-text-main">{{ total }}</span>
            <span class="text-[0.72rem] font-semibold text-text-muted uppercase tracking-[0.06em] ml-2">Total Program</span>
          </div>
        </button>

        <!-- Status rows (clickable) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            v-for="s in statusItems"
            :key="s.key"
            type="button"
            class="flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200"
            :class="activeFilter === s.key
              ? `bg-[${s.color}]/8 border-[${s.color}]/30 ring-1 ring-[${s.color}]/20`
              : 'bg-bg-card-2 border-border hover:border-[rgba(99,102,241,0.2)]'"
            :style="activeFilter === s.key ? `background:${s.color}12;border-color:${s.color}40;box-shadow:0 0 0 1px ${s.color}25` : ''"
            @click="toggleFilter(s.key)"
          >
            <span class="w-3 h-3 rounded-full shrink-0" :style="{ background: s.color }"></span>
            <div class="flex-1 min-w-0">
              <span class="text-[0.72rem] font-semibold text-text-muted uppercase tracking-[0.04em]">{{ s.label }}</span>
            </div>
            <span class="text-[1.15rem] font-[800] tracking-[-0.5px]" :style="{ color: s.color }">{{ s.count }}</span>
          </button>
        </div>

        <!-- Scope breakdown -->
        <div class="flex items-center gap-2 pt-2 border-t border-border mt-1">
          <div class="flex items-center gap-1.5 text-[0.72rem] font-semibold text-text-muted">
            <span class="inline-block w-2 h-2 rounded-sm bg-[#6366f1]"></span>
            BPH: {{ bphCount }}
          </div>
          <span class="text-border">·</span>
          <div class="flex items-center gap-1.5 text-[0.72rem] font-semibold text-text-muted">
            <span class="inline-block w-2 h-2 rounded-sm bg-[#a855f7]"></span>
            Sekbid: {{ sekbidCount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  programs: any[]
  activeFilter: string
}>()

const emit = defineEmits<{
  (e: 'update:activeFilter', value: string): void
}>()

// Toggle: click same filter again → reset to "all"
function toggleFilter(key: string) {
  emit('update:activeFilter', props.activeFilter === key ? 'all' : key)
}

// ── Counts ────────────────────────────────────────────────────────
const total = computed(() => props.programs.length)
const selesai = computed(() => props.programs.filter(p => p.status === 'Selesai').length)
const berjalan = computed(() => props.programs.filter(p => p.status === 'Berjalan').length)
const direncanakan = computed(() => props.programs.filter(p => !p.status || p.status === 'Direncanakan').length)
const dibatalkan = computed(() => props.programs.filter(p => p.status === 'Dibatalkan').length)
const bphCount = computed(() => props.programs.filter(p => p.scope !== 'SEKBID').length)
const sekbidCount = computed(() => props.programs.filter(p => p.scope === 'SEKBID').length)
const percent = computed(() => total.value > 0 ? Math.round((selesai.value / total.value) * 100) : 0)

// ── Status items for the legend ───────────────────────────────────
const statusItems = computed(() => {
  const items = [
    { key: 'Selesai',      label: 'Selesai',      color: '#22c55e', count: selesai.value },
    { key: 'Berjalan',     label: 'Berjalan',     color: '#f59e0b', count: berjalan.value },
    { key: 'Direncanakan', label: 'Direncanakan', color: '#94a3b8', count: direncanakan.value },
  ]
  if (dibatalkan.value > 0) {
    items.push({ key: 'Dibatalkan', label: 'Dibatalkan', color: '#f87171', count: dibatalkan.value })
  }
  return items
})

// ── Center label (reacts to active filter) ────────────────────────
const STATUS_COLORS: Record<string, string> = {
  Selesai: '#22c55e', Berjalan: '#f59e0b', Direncanakan: '#94a3b8', Dibatalkan: '#f87171',
}
const centerValue = computed(() => {
  if (props.activeFilter === 'all') return String(percent.value)
  const item = statusItems.value.find(s => s.key === props.activeFilter)
  return item ? String(item.count) : String(percent.value)
})
const centerLabel = computed(() => {
  if (props.activeFilter === 'all') return 'Selesai'
  return props.activeFilter
})
const centerColor = computed(() => {
  if (props.activeFilter === 'all') return 'var(--text-main)'
  return STATUS_COLORS[props.activeFilter] || 'var(--text-main)'
})

// ── Donut chart math ──────────────────────────────────────────────
const circumference = 2 * Math.PI * 50 // ~314.16
const safeTotal = computed(() => Math.max(total.value, 1))
const selesaiArc = computed(() => (selesai.value / safeTotal.value) * circumference)
const berjalanArc = computed(() => (berjalan.value / safeTotal.value) * circumference)
const direncanakanArc = computed(() => (direncanakan.value / safeTotal.value) * circumference)
const dibatalkanArc = computed(() => (dibatalkan.value / safeTotal.value) * circumference)
const selesaiDeg = computed(() => (selesai.value / safeTotal.value) * 360)
const berjalanDeg = computed(() => (berjalan.value / safeTotal.value) * 360)
const direncanakanDeg = computed(() => (direncanakan.value / safeTotal.value) * 360)

// ── Interactive arc styling (highlight active, dim others) ────────
function arcWidth(status: string): number {
  if (props.activeFilter === 'all') return 12
  return props.activeFilter === status ? 15 : 10
}
function arcOpacity(status: string): number {
  if (props.activeFilter === 'all') return 1
  return props.activeFilter === status ? 1 : 0.25
}
</script>
