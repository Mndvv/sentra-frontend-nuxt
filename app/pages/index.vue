<template>
  <div>
    <BerandaHeroSection />
    <main class="max-w-[1120px] mx-auto px-4 md:px-6 relative">
      <section id="nawasena-section" class="py-12 md:py-20">
        <div class="mb-7 md:mb-10">
          <h2 class="text-[1.4rem] md:text-[1.9rem] font-extrabold tracking-tight mb-2">Filosofi</h2>
          <p class="text-text-muted text-[0.875rem] md:text-[0.95rem] leading-[1.6]">Mengenal makna dibalik nama Nawasena.</p>
        </div>
        <div class="bg-bg-card p-5 md:p-8 rounded-2xl shadow-md border border-border transition-all duration-300">
          <p class="leading-relaxed">Nama <strong class="font-bold">Nawasena</strong> yang diambil dari bahasa Sanskerta secara ontologis menempatkan organisasi ini pada posisi kompas moral yang mengarahkan pandangan jauh ke cakrawala.<em class="italic"> Masa depan yang cerah </em> bukan sekadar angan, namun menjadi jangkar bagi setiap tindakan yang diambil oleh para pengurusnya. Di sini, Nawasena berperan sebagai payung besar atau oikos yang menaungi OSIS dan MPK dalam satu napas perjuangan yang harmonis.</p>
        </div>
      </section>
      
      <section id="agenda" class="py-12 md:py-20">
        <div class="mb-7 md:mb-10">
          <h2 class="text-[1.4rem] md:text-[1.9rem] font-extrabold tracking-tight mb-2">Agenda Mendatang</h2>
        </div>
        
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div v-for="i in 3" :key="i" class="h-[140px] rounded-2xl bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card-2)] to-[var(--bg-card)] bg-[length:800px_100%] animate-[skeletonShimmer_1.5s_infinite_linear] border border-border shrink-0"></div>
        </div>
        <div v-else-if="agendas.length === 0" class="text-center py-12 text-text-muted bg-bg-card rounded-2xl border border-dashed border-border">
          Belum ada agenda mendatang
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" id="agenda-list">
          <BerandaAgendaCard v-for="agenda in agendas" :key="agenda.id" :agenda="agenda" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const { loading, agendas, loadAgendas } = useAgenda()

useHead({
  title: 'Beranda — OSIS Nawasena SENTRA'
})

onMounted(() => {
  loadAgendas()
})
</script>

<style>
@keyframes skeletonShimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
</style>