<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-7 w-full">
    <div class="bg-bg-card border border-border p-4 lg:p-[1.25rem_1.5rem] rounded-2xl shadow flex flex-col gap-1 justify-center">
      <span class="text-[1.6rem] lg:text-[2rem] font-[800] tracking-[-1px] leading-none text-text-main">{{ total }}</span>
      <span class="text-[0.75rem] font-semibold text-text-muted uppercase tracking-[0.06em]">Total Program</span>
    </div>
    
    <div class="bg-bg-card border border-border p-4 lg:p-[1.25rem_1.5rem] rounded-2xl shadow flex flex-col gap-1 justify-center">
      <span class="text-[1.6rem] lg:text-[2rem] font-[800] tracking-[-1px] leading-none text-[#22c55e]">{{ selesai }}</span>
      <span class="text-[0.75rem] font-semibold text-text-muted uppercase tracking-[0.06em]">Selesai</span>
    </div>
    
    <div class="bg-bg-card border border-border p-4 lg:p-[1.25rem_1.5rem] rounded-2xl shadow flex flex-col gap-1 justify-center">
      <span class="text-[1.6rem] lg:text-[2rem] font-[800] tracking-[-1px] leading-none text-[#f59e0b]">{{ berjalan }}</span>
      <span class="text-[0.75rem] font-semibold text-text-muted uppercase tracking-[0.06em]">Berjalan</span>
    </div>
    
    <div class="bg-bg-card border border-border p-4 lg:p-[1.25rem_1.5rem] rounded-2xl shadow flex flex-col justify-center">
      <div class="flex items-center gap-3 mb-1">
        <div class="flex-1 h-[6px] bg-border rounded-[3px] overflow-hidden">
          <div class="h-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-[3px] transition-all duration-700 ease-out" :style="{ width: percent + '%' }"></div>
        </div>
        <span class="text-[1.6rem] lg:text-[2rem] font-[800] tracking-[-1px] leading-none text-text-main">
          {{ percent }}<small class="text-[1.1rem] font-[700] tracking-normal ml-0.5">%</small>
        </span>
      </div>
      <span class="text-[0.75rem] font-semibold text-text-muted uppercase tracking-[0.06em]">Selesai</span>
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
const percent = computed(() => total.value > 0 ? Math.round((selesai.value / total.value) * 100) : 0)
</script>
