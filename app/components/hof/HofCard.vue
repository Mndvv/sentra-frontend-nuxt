<template>
  <div 
    class="bg-bg-card rounded-[20px] p-[1.8rem_1.2rem_1.5rem] text-center border border-border shadow-sm transition-all duration-350 relative overflow-hidden cursor-pointer group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12),0_0_0_1px_rgba(245,158,11,0.12)] hover:border-[#f59e0b]/25 focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50"
    :class="{'!border-indigo-500/15 hover:!border-indigo-500/30 hover:!shadow-[0_20px_40px_rgba(99,102,241,0.15),0_0_0_1px_rgba(99,102,241,0.15)]': isCurrent}"
    @click="$emit('click')"
  >
    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f59e0b]/40 to-transparent opacity-0 transition-opacity duration-350 group-hover:opacity-100" :class="{'via-indigo-500/40': isCurrent}"></div>
    
    <template v-if="!isMore">
      <div class="relative w-[78px] h-[78px] mx-auto mb-[1rem]">
        <AppImg
          :src="useImageUrl(member?.foto, member?.nama)"
          :alt="member?.nama"
          rounded="full"
          class="w-[78px] h-[78px] rounded-full bg-bg-primary"
          @error="(e) => (e.target as HTMLImageElement).src = useImageUrl('', member?.nama)"
        />
        <div class="absolute -inset-[4px] rounded-full border-[2px] border-[#f59e0b]/30 transition-colors duration-300 group-hover:border-[#f59e0b]/70" :class="{'!border-indigo-500/35 group-hover:!border-indigo-500/80': isCurrent}"></div>
      </div>
      <div class="text-[0.68rem] font-[700] tracking-[1.5px] uppercase text-[#f59e0b] mb-[0.4rem]" :class="{'!text-[#818cf8]': isCurrent}">{{ member?.jabatan }}</div>
      <h3 class="text-[0.88rem] font-[600] text-text-main leading-[1.4] m-0">{{ member?.nama }}</h3>
    </template>
    <template v-else>
      <div class="w-[78px] h-[78px] mx-auto mb-[1rem] flex items-center justify-center rounded-full bg-[#f59e0b]/10 text-[#f59e0b] transition-transform duration-300 group-hover:scale-110">
        <Icon name="material-symbols:groups" size="32" />
      </div>
      <h3 class="text-[0.88rem] font-[600] text-[#f59e0b] leading-[1.4] m-0 mb-1">Lihat Anggota<br>Lainnya</h3>
      <p class="text-[0.7rem] text-text-muted m-0">{{ count }} anggota lain</p>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  member?: any
  isCurrent?: boolean
  isMore?: boolean
  count?: number
}>()

defineEmits(['click'])
</script>
