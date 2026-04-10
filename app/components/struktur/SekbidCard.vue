<template>
  <div 
    class="bg-bg-card p-5 md:p-6 rounded-2xl border border-border flex flex-col relative overflow-hidden transition-all duration-300 cursor-pointer shadow hover:-translate-y-1 hover:shadow-lg hover:border-accent group min-h-[140px]"
    @click="$emit('click')"
  >
    <h4 class="text-[0.75rem] text-accent uppercase tracking-wider mb-2 font-bold">Seksi Bidang {{ index }}</h4>
    <p class="text-[0.95rem] font-semibold text-text-main leading-tight z-10">{{ sekbid.nama }}</p>
    <div class="absolute -bottom-4 right-0 text-[6rem] font-black text-text-main opacity-[0.03] leading-none select-none transition-all duration-300 group-hover:text-accent group-hover:-translate-y-1">{{ index }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sekbid: any
  index: number
}>()

defineEmits(['click'])
</script>
