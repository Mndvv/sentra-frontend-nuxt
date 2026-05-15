<template>
  <div 
    class="bg-bg-card rounded-[20px] p-[1.8rem_1.2rem_1.5rem] text-center border border-border shadow-sm transition-all duration-350 relative overflow-hidden cursor-pointer group hover:-translate-y-2 focus:outline-none"
    :class="[cardHoverClass]"
    @click="$emit('click')"
  >
    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-350 group-hover:opacity-100"
      :style="`background-image: linear-gradient(to right, transparent, ${accentColor}60, transparent)`"
    ></div>
    
    <template v-if="!isMore">
      <div class="relative w-[78px] h-[78px] mx-auto mb-[1rem]">
        <AppImg
          :src="useImageUrl(member?.foto, member?.nama)"
          :alt="member?.nama"
          rounded="full"
          class="w-[78px] h-[78px] rounded-full bg-bg-primary"
          @error="(e) => (e.target as HTMLImageElement).src = useImageUrl('', member?.nama)"
        />
        <div class="absolute -inset-[4px] rounded-full border-[2px] transition-colors duration-300"
          :style="`border-color: ${accentColor}50`"
          :class="['group-hover:!border-opacity-80']"
        ></div>
      </div>
      <div class="text-[0.68rem] font-[700] tracking-[1.5px] uppercase mb-[0.4rem]" :style="`color: ${accentColor}`">{{ member?.jabatan }}</div>
      <h3 class="text-[0.88rem] font-[600] text-text-main leading-[1.4] m-0">{{ member?.nama }}</h3>
    </template>
    <template v-else>
      <div class="w-[78px] h-[78px] mx-auto mb-[1rem] flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
        :style="`background-color: ${accentColor}18; color: ${accentColor}`">
        <Icon name="material-symbols:groups" size="32" />
      </div>
      <h3 class="text-[0.88rem] font-[600] leading-[1.4] m-0 mb-1" :style="`color: ${accentColor}`">Lihat Anggota<br>Lainnya</h3>
      <p class="text-[0.7rem] text-text-muted m-0">{{ count }} anggota lain</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  member?: any
  isCurrent?: boolean
  isMore?: boolean
  count?: number
  org?: 'OSIS' | 'MPK'
}>()

defineEmits(['click'])

// OSIS non-current: amber, OSIS current: indigo, MPK: pink
const accentColor = computed(() => {
  if (props.org === 'MPK') return '#ec4899'
  if (props.isCurrent) return '#818cf8'
  return '#f59e0b'
})

const cardHoverClass = computed(() => {
  if (props.org === 'MPK')
    return 'hover:shadow-[0_20px_40px_rgba(236,72,153,0.15),0_0_0_1px_rgba(236,72,153,0.12)] hover:border-pink-500/25'
  if (props.isCurrent)
    return 'hover:shadow-[0_20px_40px_rgba(99,102,241,0.15),0_0_0_1px_rgba(99,102,241,0.15)] hover:border-indigo-500/30 !border-indigo-500/15'
  return 'hover:shadow-[0_20px_40px_rgba(0,0,0,0.12),0_0_0_1px_rgba(245,158,11,0.12)] hover:border-[#f59e0b]/25'
})
</script>
