<template>
  <div class="mb-[6rem]">
    <!-- Generation Header -->
    <div class="flex items-center gap-[1.5rem] mb-[3rem]">
      <div 
        class="shrink-0 relative w-[64px] h-[64px] rounded-full flex items-center justify-center bg-gradient-to-br from-bg-card to-bg-card-2 border-[2px] border-[#f59e0b]/25"
        :class="{'!border-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.3)]': isCurrent}"
      >
        <span class="font-serif text-[1.1rem] font-[700] text-[#f59e0b]">{{ romanNumeral }}</span>
        <div v-if="isCurrent" class="absolute top-[2px] right-[2px] w-[11px] h-[11px] rounded-full bg-[#22c55e] border-[2px] border-bg-primary animate-[pingDot_1.8s_ease-in-out_infinite]"></div>
      </div>
      
      <div class="flex-none min-w-0 max-w-[calc(100%-100px)]">
        <p class="text-[0.68rem] font-[700] tracking-[2.5px] uppercase text-[#f59e0b] mb-[0.2rem]">Kepengurusan Angkatan Ke-{{ generation.angkatan }}</p>
        <h2 class="font-serif text-[1.6rem] font-[700] text-text-main m-0 flex flex-wrap items-center gap-[0.7rem] leading-tight">
          {{ periodLabel }}
          <span v-if="isCurrent" class="font-sans text-[0.65rem] font-[700] tracking-[1.5px] uppercase bg-[#22c55e]/15 text-[#4ade80] border border-[#22c55e]/30 px-[10px] py-[3px] rounded-[20px]">Terbaru</span>
        </h2>
        <p class="text-[0.85rem] text-text-muted mt-[0.3rem]">{{ yearRange }}</p>
      </div>

      <div class="flex-1 h-[1px] bg-gradient-to-r from-[#f59e0b]/20 to-transparent min-w-[20px]"></div>
    </div>

    <!-- OSIS Block -->
    <div v-if="generation.osis" class="mb-[3rem]">
      <div class="flex items-center gap-3 mb-[1.5rem]">
        <span class="text-[0.62rem] font-[800] tracking-[2px] uppercase px-3 py-1 rounded-full bg-indigo-500/10 text-[#818cf8] border border-indigo-500/20">OSIS</span>
        <span class="text-[0.85rem] text-text-muted">{{ generation.osis.nama }} &bull; {{ generation.osis.tahun }}</span>
        <div class="flex-1 h-[1px] bg-indigo-500/10"></div>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-[1.5rem]">
        <HofCard 
          v-for="bph in generation.osis.bph" 
          :key="bph.id" 
          :member="bph" 
          :isCurrent="isCurrent"
          org="OSIS"
          @click="openMemberProfileModal(bph)"
        />
        <HofCard 
          v-if="generation.osis.anggota?.length > 0"
          isMore
          :count="generation.osis.anggota.length"
          org="OSIS"
          @click="openPeriodMembersModal(generation.osis, 'OSIS')"
        />
      </div>
    </div>

    <!-- MPK Block -->
    <div v-if="generation.mpk">
      <div class="flex items-center gap-3 mb-[1.5rem]">
        <span class="text-[0.62rem] font-[800] tracking-[2px] uppercase px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">MPK</span>
        <span class="text-[0.85rem] text-text-muted">{{ generation.mpk.nama }} &bull; {{ generation.mpk.tahun }}</span>
        <div class="flex-1 h-[1px] bg-pink-500/10"></div>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-[1.5rem]">
        <HofCard 
          v-for="bph in generation.mpk.bph" 
          :key="bph.id" 
          :member="bph" 
          :isCurrent="isCurrent"
          org="MPK"
          @click="openMemberProfileModal(bph)"
        />
        <HofCard 
          v-if="generation.mpk.anggota?.length > 0"
          isMore
          :count="generation.mpk.anggota.length"
          org="MPK"
          @click="openPeriodMembersModal(generation.mpk, 'MPK')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  generation: any
  index: number
}>()

const { openMemberProfileModal, openPeriodMembersModal } = useHof()

const isCurrent = computed(() => props.index === 0)

const romanNumeral = computed(() => {
  const map = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return map[(props.generation.angkatan ?? 1) - 1] || props.generation.angkatan
})

// Label = OSIS period nama or MPK period nama (prefer OSIS)
const periodLabel = computed(() => {
  return props.generation.osis?.nama ?? props.generation.mpk?.nama ?? `Angkatan ${props.generation.angkatan}`
})

// Year range combining both orgs if they differ
const yearRange = computed(() => {
  const osisTahun = props.generation.osis?.tahun
  const mpkTahun  = props.generation.mpk?.tahun
  if (osisTahun && mpkTahun && osisTahun !== mpkTahun) return `${osisTahun} / ${mpkTahun}`
  return `Tahun Ajaran ${osisTahun ?? mpkTahun ?? ''}`
})
</script>

<style scoped>
@keyframes pingDot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
  50% { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
}
</style>
