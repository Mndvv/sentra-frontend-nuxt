<template>
  <div class="bg-bg-primary text-text-main transition-colors duration-300">
    <div class="min-h-[100svh] flex items-center justify-center relative overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(245,158,11,0.09),transparent),radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(99,102,241,0.07),transparent)]">
      <div class="absolute inset-0 opacity-60 pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f59e0b\' fill-opacity=\'0.025\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
      
      <!-- Stars (visible in dark mode) -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden hidden [.dark-theme_&]:block">
         <div v-for="i in 30" :key="i" class="absolute rounded-full bg-white opacity-[0.15] animate-[starTwinkle_3s_ease-in-out_infinite]" :style="`left: ${Math.random()*100}%; top: ${Math.random()*100}%; width: ${Math.random()*2+1}px; height: ${Math.random()*2+1}px; animation-duration: ${Math.random()*2+2}s; animation-delay: ${Math.random()*2}s;`"></div>
      </div>

      <div class="relative z-10 text-center px-4 md:px-[2rem] pt-[8rem] pb-[6rem]">
        <div class="mx-auto mb-[1.5rem] w-[80px] h-[80px] animate-[emblemPulse_3s_ease-in-out_infinite] drop-shadow-[0_0_20px_rgba(245,158,11,0.55)] flex items-center justify-center text-[#f59e0b] bg-bg-card rounded-full border-2 border-[#f59e0b]/30">
           <Icon name="material-symbols:history-edu" size="40" />
        </div>
        
        <p class="text-[0.72rem] font-[700] tracking-[4px] uppercase text-[#f59e0b] mb-[1rem]">Honoring the Legacy</p>
        
        <h1 class="font-serif text-[clamp(2.5rem,8vw,6rem)] font-[900] leading-none mb-[1.5rem] tracking-[-1px]">
          Hall of <span class="bg-gradient-to-br from-[#fef3c7] via-[#f59e0b] to-[#d97706] bg-clip-text text-transparent">Fame</span>
        </h1>
        
        <p class="text-text-muted text-[1rem] max-w-[480px] mx-auto mb-[3rem] leading-[1.8]">
          Sebuah ruang penganugerahan dan rekam jejak bagi mereka yang telah menorehkan bakti nyata, dedikasi, serta kepemimpinan yang menginspirasi.
        </p>
        
        <a href="#demisioner" class="inline-flex items-center justify-center w-[44px] h-[44px] rounded-full border-[1.5px] border-[#f59e0b]/30 text-[#f59e0b] transition-colors duration-300 hover:border-[#f59e0b] animate-[bounceDown_2s_ease-in-out_infinite]">
           <Icon name="material-symbols:arrow-downward" size="20" />
        </a>
      </div>
    </div>

    <!-- MAIN HOF AREA -->
    <main class="max-w-[1120px] mx-auto px-4 md:px-6 py-[4rem] md:py-[6rem]" id="demisioner">
      
      <div v-if="loading" class="text-center py-16 text-slate-400">
        <Icon name="material-symbols:refresh" size="48" class="animate-spin mb-4 opacity-60" />
        <p>Memuat prasasti...</p>
      </div>

      <div v-else-if="error || (!topPeriods.length && !developers.length)" class="text-center py-[4rem] text-text-muted bg-bg-card border border-dashed border-border rounded-[20px] max-w-[600px] mx-auto">
        <Icon name="material-symbols:history-edu" size="48" class="mb-4 opacity-50" />
        <p>Belum ada catatan kepengurusan yang tersimpan di Hall of Fame.</p>
      </div>

      <template v-else>
        <!-- Top Periods -->
        <HofPeriodBlock 
          v-for="(p, index) in topPeriods" 
          :key="p.id" 
          :period="p" 
          :index="index" 
        />

        <!-- Older Periods Button -->
        <button 
          v-if="otherPeriods.length > 0"
          class="block w-full mt-[4rem] p-[15px] bg-bg-card-2 border border-dashed border-border text-text-muted rounded-[12px] text-center font-[600] text-[0.9rem] cursor-pointer transition-all duration-300 hover:bg-accent-soft hover:text-text-main hover:border-accent focus:outline-none focus:border-accent"
          @click="openOlderPeriodsModal"
        >
          <Icon name="material-symbols:history" size="18" class="align-middle mr-1" />
          Tampilkan Periode Terdahulu ({{ otherPeriods.length }} Periode)
        </button>

        <!-- Developers -->
        <div v-if="developers.length > 0" class="mt-[8rem] mb-[6rem] text-center">
          <div class="flex items-center gap-[1.5rem] mb-[2.5rem]">
            <div class="flex-1 h-[1px] bg-gradient-to-r from-transparent to-indigo-500/30"></div>
            <div class="w-[52px] h-[52px] rounded-[16px] bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/25 flex items-center justify-center shrink-0 text-[#818cf8]">
              <Icon name="material-symbols:terminal" size="24" />
            </div>
            <div class="flex-1 h-[1px] bg-gradient-to-l from-transparent to-indigo-500/30"></div>
          </div>
          
          <h4 class="text-[0.7rem] font-[700] tracking-[3px] uppercase text-[#818cf8] mb-[0.6rem]">Sentra System Developer</h4>
          <h2 class="font-serif text-[2rem] font-[700] text-text-main mb-[0.6rem]">Behind the Code</h2>
          <p class="text-text-muted text-[0.9rem] max-w-[460px] mx-auto mb-[3rem] leading-[1.75]">Platform karya anak bangsa. Dipersembahkan oleh pengembang independen Nawasena untuk mengukir sejarah digital OSIS.</p>
          
          <div class="flex flex-wrap gap-[2rem] justify-center text-left">
            <HofDevCard 
              v-for="(dev, i) in developers" 
              :key="dev.id" 
              :dev="dev" 
              :isAlt="i % 2 !== 0" 
            />
          </div>

          <!-- Dev Quote -->
          <div class="mt-[4rem] text-[0.95rem] text-text-muted italic leading-[1.9] max-w-[580px] mx-auto text-center p-[2rem] border border-border rounded-[16px] bg-bg-card-2 relative shadow-sm">
            <span class="absolute top-[-26px] left-[1.3rem] text-[4rem] font-serif text-indigo-500/25 leading-none">"</span>
            Teknologi yang hebat bukanlah yang paling rumit, melainkan yang mampu mempermudah urusan banyak orang dan terus hidup melintasi generasi.
          </div>
        </div>
      </template>
    </main>

    <div class="text-center pb-[4rem]">
       <NuxtLink to="/" class="inline-flex items-center gap-2 text-text-muted no-underline text-[0.88rem] font-[500] p-[10px_22px] rounded-[50px] border border-border transition-all duration-300 hover:text-text-main hover:border-accent hover:bg-accent-soft">
         <Icon name="material-symbols:arrow-back" size="18" /> Kembali ke Beranda
       </NuxtLink>
    </div>

    <!-- Modal -->
    <HofModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const { loading, error, topPeriods, otherPeriods, developers, loadHofData, openOlderPeriodsModal } = useHof()

useHead({
  title: 'Hall of Fame — OSIS Nawasena',
})

// Using color-mode logic directly in Tailwind classes handles the dark mode effectively.

onMounted(() => {
  loadHofData()
})
</script>

<style>
@keyframes emblemPulse {
  0%, 100% { filter: drop-shadow(0 0 16px rgba(245,158,11,0.5)); transform: scale(1); }
  50% { filter: drop-shadow(0 0 28px rgba(245,158,11,0.85)); transform: scale(1.06); }
}
@keyframes starTwinkle {
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.4); }
}
@keyframes bounceDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}
</style>
