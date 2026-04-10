<template>
  <div class="mb-[6rem]">
    <div class="flex items-center gap-[1.5rem] mb-[3rem]">
      <div 
        class="shrink-0 relative w-[64px] h-[64px] rounded-full flex items-center justify-center bg-gradient-to-br from-bg-card to-bg-card-2 border-[2px] border-[#f59e0b]/25"
        :class="{'!border-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.3)]': isCurrent}"
      >
        <span class="font-serif text-[1.1rem] font-[700] text-[#f59e0b]">{{ romanNumeral }}</span>
        <div v-if="isCurrent" class="absolute top-[2px] right-[2px] w-[11px] h-[11px] rounded-full bg-[#22c55e] border-[2px] border-bg-primary animate-[pingDot_1.8s_ease-in-out_infinite]"></div>
      </div>
      
      <div class="flex-none min-w-0 max-w-[calc(100%-100px)]">
        <p class="text-[0.68rem] font-[700] tracking-[2.5px] uppercase text-[#f59e0b] mb-[0.2rem]">Kepengurusan Periode</p>
        <h2 class="font-serif text-[1.6rem] font-[700] text-text-main m-0 flex flex-wrap items-center gap-[0.7rem] leading-tight">
          {{ period.nama }}
          <span v-if="isCurrent" class="font-sans text-[0.65rem] font-[700] tracking-[1.5px] uppercase bg-[#22c55e]/15 text-[#4ade80] border border-[#22c55e]/30 px-[10px] py-[3px] rounded-[20px]">Terbaru</span>
        </h2>
        <p class="text-[0.85rem] text-text-muted mt-[0.3rem]">Tahun Ajaran {{ period.tahun }}</p>
      </div>

      <div class="flex-1 h-[1px] bg-gradient-to-r from-[#f59e0b]/20 to-transparent min-w-[20px]"></div>
    </div>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-[1.5rem]">
      <HofCard 
        v-for="bph in period.bph" 
        :key="bph.id" 
        :member="bph" 
        :isCurrent="isCurrent" 
        @click="openMemberProfileModal(bph)"
      />
      
      <HofCard 
        v-if="period.anggota?.length > 0"
        isMore
        :count="period.anggota.length"
        @click="openPeriodMembersModal(period)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  period: any
  index: number
}>()

const { openMemberProfileModal, openPeriodMembersModal } = useHof()

const isCurrent = computed(() => props.index === 0)

const romanNumeral = computed(() => {
  const map = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return map[props.period.angkatan - 1] || props.period.angkatan
})
</script>

<style scoped>
@keyframes pingDot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
  50% { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
}
</style>
