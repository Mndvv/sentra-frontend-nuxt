<template>
  <header class="min-h-[85vh] md:min-h-[90vh] flex items-center justify-center text-center px-4 md:px-[10%] pt-24 md:pt-28 pb-12 md:pb-20 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.12),transparent),radial-gradient(ellipse_50%_50%_at_80%_80%,rgba(168,85,247,0.07),transparent)] before:pointer-events-none">
    <div class="relative z-10 w-full">
      <span class="inline-block bg-accent-soft text-accent px-4 py-1.5 rounded-full text-[0.75rem] font-bold tracking-wider uppercase mb-7 border border-[rgba(99,102,241,0.2)]">NAWASENA 2025/2026</span>
      <h1 class="text-[clamp(1.9rem,7vw,2.4rem)] md:text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.1] mb-6 font-black tracking-[-0.5px] md:tracking-[-1.5px]">Membangun Masa Depan <span class="bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">Cerah</span> Bersama.</h1>
      <p class="text-text-muted max-w-[540px] mx-auto mb-10 text-[0.95rem] md:text-[1.05rem] leading-[1.7]">Sebuah mercusuar digital yang mengintegrasikan gerak organisasi dan menampung titah aspirasi demi kemajuan sekolah.</p>
      <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
        <button 
          class="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white px-7 py-3 rounded-xl font-semibold text-[0.9rem] border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(99,102,241,0.45)] w-full md:w-auto active:translate-y-0"
          @click="scrollToFilosofi"
        >
          Filosofi Kami
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const scrollToFilosofi = () => {
  if (import.meta.client) {
    const el = document.getElementById('nawasena-section')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
