<template>
  <div class="bg-bg-card border border-border rounded-2xl shadow-md p-5 md:p-7 mb-8 w-full">
    <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-center">

      <!-- ── Donut Chart ──────────────────────────────────── -->
      <div class="flex items-center justify-center">
        <div class="relative w-[200px] h-[200px] md:w-[220px] md:h-[220px]">
          <svg viewBox="0 0 120 120" class="w-full h-full -rotate-90">
            <!-- Background ring -->
            <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" stroke-width="12" />
            <!-- Selesai arc (green) -->
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke="#22c55e" stroke-width="12" stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference - selesaiArc"
              class="transition-all duration-1000 ease-out"
            />
            <!-- Berjalan arc (amber) -->
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke="#f59e0b" stroke-width="12" stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference - berjalanArc"
              :style="{ transform: `rotate(${selesaiDeg}deg)`, transformOrigin: '60px 60px' }"
              class="transition-all duration-1000 ease-out"
            />
            <!-- Direncanakan arc (slate) -->
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke="#94a3b8" stroke-width="12" stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference - direncanakanArc"
              :style="{ transform: `rotate(${selesaiDeg + berjalanDeg}deg)`, transformOrigin: '60px 60px' }"
              class="transition-all duration-1000 ease-out"
            />
            <!-- Dibatalkan arc (red) -->
            <circle
              v-if="dibatalkan > 0"
              cx="60" cy="60" r="50" fill="none"
              stroke="#f87171" stroke-width="12" stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference - dibatalkanArc"
              :style="{ transform: `rotate(${selesaiDeg + berjalanDeg + direncanakanDeg}deg)`, transformOrigin: '60px 60px' }"
              class="transition-all duration-1000 ease-out"
            />
          </svg>
          <!-- Center label -->
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-[2rem] md:text-[2.2rem] font-[900] tracking-[-2px] leading-none text-text-main">{{ percent }}<small class="text-[1.1rem] font-[700] tracking-normal">%</small></span>
            <span class="text-[0.68rem] font-semibold text-text-muted uppercase tracking-[0.08em] mt-1">Selesai</span>
          </div>
        </div>
      </div>

      <!-- ── Stats + Legend ────────────────────────────────── -->
      <div class="flex flex-col gap-3">
        <!-- Total banner -->
        <div class="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-accent/8 to-purple-500/5 border border-accent/15">
          <div class="w-10 h-10 rounded-xl bg-accent/12 flex items-center justify-center shrink-0">
            <Icon name="material-symbols:assignment-rounded" class="text-accent text-[1.2rem]" />
          </div>
          <div>
            <span class="text-[1.5rem] font-[800] tracking-[-1px] leading-none text-text-main">{{ total }}</span>
            <span class="text-[0.72rem] font-semibold text-text-muted uppercase tracking-[0.06em] ml-2">Total Program</span>
          </div>
        </div>

        <!-- Status rows -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div class="flex items-center gap-3 p-3 rounded-xl bg-bg-card-2 border border-border">
            <span class="w-3 h-3 rounded-full bg-[#22c55e] shrink-0"></span>
            <div class="flex-1 min-w-0">
              <span class="text-[0.72rem] font-semibold text-text-muted uppercase tracking-[0.04em]">Selesai</span>
            </div>
            <span class="text-[1.15rem] font-[800] tracking-[-0.5px] text-[#22c55e]">{{ selesai }}</span>
          </div>

          <div class="flex items-center gap-3 p-3 rounded-xl bg-bg-card-2 border border-border">
            <span class="w-3 h-3 rounded-full bg-[#f59e0b] shrink-0"></span>
            <div class="flex-1 min-w-0">
              <span class="text-[0.72rem] font-semibold text-text-muted uppercase tracking-[0.04em]">Berjalan</span>
            </div>
            <span class="text-[1.15rem] font-[800] tracking-[-0.5px] text-[#f59e0b]">{{ berjalan }}</span>
          </div>

          <div class="flex items-center gap-3 p-3 rounded-xl bg-bg-card-2 border border-border">
            <span class="w-3 h-3 rounded-full bg-[#94a3b8] shrink-0"></span>
            <div class="flex-1 min-w-0">
              <span class="text-[0.72rem] font-semibold text-text-muted uppercase tracking-[0.04em]">Direncanakan</span>
            </div>
            <span class="text-[1.15rem] font-[800] tracking-[-0.5px] text-text-main">{{ direncanakan }}</span>
          </div>

          <div v-if="dibatalkan > 0" class="flex items-center gap-3 p-3 rounded-xl bg-bg-card-2 border border-border">
            <span class="w-3 h-3 rounded-full bg-[#f87171] shrink-0"></span>
            <div class="flex-1 min-w-0">
              <span class="text-[0.72rem] font-semibold text-text-muted uppercase tracking-[0.04em]">Dibatalkan</span>
            </div>
            <span class="text-[1.15rem] font-[800] tracking-[-0.5px] text-[#f87171]">{{ dibatalkan }}</span>
          </div>
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
}>()

const total = computed(() => props.programs.length)
const selesai = computed(() => props.programs.filter(p => p.status === 'Selesai').length)
const berjalan = computed(() => props.programs.filter(p => p.status === 'Berjalan').length)
const direncanakan = computed(() => props.programs.filter(p => !p.status || p.status === 'Direncanakan').length)
const dibatalkan = computed(() => props.programs.filter(p => p.status === 'Dibatalkan').length)
const bphCount = computed(() => props.programs.filter(p => p.scope !== 'SEKBID').length)
const sekbidCount = computed(() => props.programs.filter(p => p.scope === 'SEKBID').length)
const percent = computed(() => total.value > 0 ? Math.round((selesai.value / total.value) * 100) : 0)

// Donut chart math
const circumference = 2 * Math.PI * 50 // ~314.16
const safeTotal = computed(() => Math.max(total.value, 1))
const selesaiArc = computed(() => (selesai.value / safeTotal.value) * circumference)
const berjalanArc = computed(() => (berjalan.value / safeTotal.value) * circumference)
const direncanakanArc = computed(() => (direncanakan.value / safeTotal.value) * circumference)
const dibatalkanArc = computed(() => (dibatalkan.value / safeTotal.value) * circumference)
const selesaiDeg = computed(() => (selesai.value / safeTotal.value) * 360)
const berjalanDeg = computed(() => (berjalan.value / safeTotal.value) * 360)
const direncanakanDeg = computed(() => (direncanakan.value / safeTotal.value) * 360)
</script>
