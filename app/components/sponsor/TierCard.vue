<template>
  <div 
    class="bg-bg-card rounded-[24px] p-8 border-[2px] border-black/5 dark:border-white/5 shadow-sm relative overflow-hidden transition-all duration-350 flex flex-col hover:-translate-y-[10px] hover:shadow-[0_24px_48px_rgba(99,102,241,0.18)]"
    :class="{ '!border-[#2563eb] bg-gradient-to-br from-[#2563eb]/10 to-bg-card': isFeatured }"
  >
    <div v-if="isFeatured" class="absolute top-[18px] -right-[34px] bg-gradient-to-br from-[#2563eb] to-[#7c3aed] text-white text-[0.65rem] font-[800] tracking-[1.5px] uppercase py-1.5 px-[44px] rotate-[35deg] shadow-md z-10">RECOMMENDED</div>
    
    <div class="text-[2.2rem] w-[58px] h-[58px] rounded-[16px] flex items-center justify-center mb-[1.4rem]" :class="theme.iconBg">
      {{ icon }}
    </div>
    
    <div class="text-[0.72rem] font-[800] tracking-[2.5px] uppercase mb-[0.3rem] text-center" :class="theme.text">{{ label }}</div>
    <div class="text-[1.45rem] font-[800] text-text-main mb-[0.5rem] text-center">{{ title }}</div>
    <div class="text-[0.88rem] text-text-muted leading-[1.65] mb-[1.4rem] text-center">{{ desc }}</div>
    
    <hr class="border-none h-[1px] bg-black/5 dark:bg-white/5 mb-[1.2rem]">
    
    <ul class="list-none p-0 m-[0_0_1.2rem] flex-1">
      <li v-for="(perk, i) in perks" :key="i" class="flex items-start gap-[0.7rem] py-[0.55rem] text-[0.88rem] border-b border-black/5 dark:border-white/5 leading-[1.5] last:border-none">
        <div class="w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0 text-[0.72rem] font-[700] mt-[2px]" :class="theme.dotBg">✓</div>
        <span>{{ perk }}</span>
      </li>
    </ul>
    
    <div class="text-[1.55rem] font-[800] text-center p-[0.9rem_1rem] rounded-[14px] mb-[1rem] tracking-[-0.5px]" :class="theme.priceBg">{{ price }}</div>
    
    <a href="#sponsor-form" class="block text-center p-[12px_20px] rounded-[50px] font-[700] text-[0.9rem] no-underline border-[2px] transition-all duration-300 font-sans" :class="[theme.btnBorder, theme.btnHover, isFeatured ? theme.btnFeatured : 'bg-transparent text-current']">
      Pilih Paket
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  label: string
  title: string
  desc: string
  perks: string[]
  price: string
  isFeatured?: boolean
  colorTheme: 'sapphire' | 'amethyst' | 'topaz' | 'alex'
}>()

const themeMap = {
  sapphire: {
    iconBg: 'bg-[#2563eb]/10',
    text: 'text-[#2563eb]',
    dotBg: 'bg-[#2563eb]/15 text-[#2563eb]',
    priceBg: 'bg-[#2563eb]/10 text-[#1d4ed8]',
    btnBorder: 'border-[#2563eb] text-[#2563eb]',
    btnHover: 'hover:bg-[#2563eb] hover:text-white',
    btnFeatured: '!bg-[#2563eb] !text-white'
  },
  amethyst: {
    iconBg: 'bg-[#9333ea]/10',
    text: 'text-[#9333ea]',
    dotBg: 'bg-[#9333ea]/15 text-[#9333ea]',
    priceBg: 'bg-[#9333ea]/10 text-[#7e22ce]',
    btnBorder: 'border-[#9333ea] text-[#9333ea]',
    btnHover: 'hover:bg-[#9333ea] hover:text-white',
    btnFeatured: '!bg-[#9333ea] !text-white'
  },
  topaz: {
    iconBg: 'bg-[#d97706]/10',
    text: 'text-[#d97706]',
    dotBg: 'bg-[#d97706]/15 text-[#d97706]',
    priceBg: 'bg-[#d97706]/10 text-[#b45309]',
    btnBorder: 'border-[#d97706] text-[#d97706]',
    btnHover: 'hover:bg-[#d97706] hover:text-white',
    btnFeatured: '!bg-[#d97706] !text-white'
  },
  alex: {
    iconBg: 'bg-[#0d9488]/10',
    text: 'text-[#0d9488]',
    dotBg: 'bg-[#0d9488]/15 text-[#0d9488]',
    priceBg: 'bg-[#0d9488]/10 text-[#0f766e]',
    btnBorder: 'border-[#0d9488] text-[#0d9488]',
    btnHover: 'hover:bg-[#0d9488] hover:text-white',
    btnFeatured: '!bg-[#0d9488] !text-white'
  }
}

const theme = computed(() => themeMap[props.colorTheme] || themeMap.sapphire)
</script>
