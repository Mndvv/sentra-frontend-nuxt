<template>
  <div 
    class="bg-bg-card p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 border border-transparent shadow hover:-translate-y-1 hover:shadow-lg hover:border-border cursor-pointer group"
    :class="{ 'md:col-span-2 bg-gradient-to-br from-bg-card to-accent-soft border-border': isFeatured }"
    @click="$emit('click')"
  >
    <div class="relative w-[90px] h-[90px] md:w-[110px] md:h-[110px] mb-4">
      <img :src="useImageUrl(pengurus.foto)" :alt="pengurus.nama" loading="lazy" class="w-full h-full object-cover rounded-full border-[3px] border-transparent transition-all duration-300 group-hover:border-accent p-0.5" />
    </div>
    <div class="flex flex-col items-center">
      <span class="inline-block bg-accent-soft text-accent px-2.5 py-1 rounded-md text-[0.65rem] font-bold tracking-wider uppercase mb-2">{{ pengurus.jabatan }}</span>
      <h3 class="text-[1.1rem] font-bold leading-tight mb-1 text-text-main group-hover:text-accent transition-colors">{{ pengurus.nama }}</h3>
      <p v-if="isFeatured" class="text-text-muted text-sm">{{ pengurus.email || '-' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pengurus: any
  isFeatured?: boolean
}>()

defineEmits(['click'])
</script>
