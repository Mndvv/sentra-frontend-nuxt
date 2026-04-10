<template>
  <div class="bg-bg-card rounded-[24px] p-[2.5rem_2rem] border border-indigo-500/15 shadow-sm max-w-[360px] w-full text-center relative overflow-hidden transition-all duration-350 hover:-translate-y-2 hover:border-indigo-500/30 hover:shadow-[0_24px_48px_rgba(99,102,241,0.15),0_0_0_1px_rgba(99,102,241,0.15)]">
    <!-- Glow Blob -->
    <div 
      class="absolute w-[220px] h-[220px] rounded-full blur-[40px] pointer-events-none -top-[80px] -right-[60px]"
      :class="isAlt ? 'bg-[radial-gradient(circle,rgba(13,148,136,0.12),transparent)]' : 'bg-[radial-gradient(circle,rgba(99,102,241,0.12),transparent)]'"
    ></div>

    <div class="relative w-[96px] h-[96px] mx-auto mb-[1.4rem]">
      <img :src="useImageUrl(dev.foto)" :alt="dev.nama" class="w-[96px] h-[96px] rounded-full object-cover block bg-bg-primary" @error="(e) => (e.target as HTMLImageElement).src = useImageUrl('uploads/pp/default.webp')">
      
      <!-- Spinning Ring -->
      <div 
        class="absolute -inset-[5px] rounded-full border-[2px] animate-[spin_8s_linear_infinite]"
        :class="isAlt ? 'border-[#0d9488]/40 border-t-[#2dd4bf] border-r-transparent border-l-transparent' : 'border-indigo-500/40 border-t-[#818cf8] border-r-transparent border-l-transparent'"
      ></div>

      <!-- Badge Icon -->
      <div 
        class="absolute -bottom-[4px] -right-[4px] w-[28px] h-[28px] rounded-full flex items-center justify-center border-[2px] border-bg-primary text-white"
        :class="isAlt ? 'bg-gradient-to-br from-[#0d9488] to-[#0891b2]' : 'bg-gradient-to-br from-[#6366f1] to-[#a855f7]'"
      >
        <Icon name="material-symbols:code" size="14" />
      </div>
    </div>

    <!-- Role Chip -->
    <div 
      class="inline-block border text-[0.68rem] font-[700] tracking-[1.5px] uppercase px-[14px] py-[4px] rounded-[20px] mb-[0.7rem]"
      :class="isAlt ? 'bg-[#0d9488]/15 text-[#2dd4bf] border-[#0d9488]/25' : 'bg-indigo-500/15 text-[#818cf8] border-indigo-500/25'"
    >
      {{ dev.role }}
    </div>

    <h3 class="text-[1.2rem] font-[700] text-text-main mb-[0.8rem]">{{ dev.nama }}</h3>
    <p class="text-[0.75rem] text-text-subtle italic mb-1">Periode Dev {{ dev.periode_dev }}</p>
    <p class="text-[0.86rem] text-text-muted leading-[1.75] mb-[1.2rem]">{{ dev.deskripsi }}</p>

    <div class="flex gap-[0.5rem] flex-wrap justify-center mb-4">
      <span 
        v-for="(stack, i) in (dev.tech_stack || [])" 
        :key="i"
        class="border text-[0.72rem] font-[600] px-[11px] py-[4px] rounded-[8px] bg-indigo-500/5 border-indigo-500/20 text-text-muted"
      >
        {{ stack }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  dev: any
  isAlt?: boolean
}>()
</script>
