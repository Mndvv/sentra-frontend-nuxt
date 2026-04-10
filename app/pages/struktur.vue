<template>
  <div>
    <main class="max-w-[1120px] mx-auto px-4 md:px-6 py-12 md:py-20 mt-16 md:mt-20">
      <div class="text-center mb-10 md:mb-14">
        <h2 class="text-[1.8rem] md:text-[2.2rem] font-extrabold tracking-tight mb-2">Struktur Organisasi</h2>
        <p class="text-text-muted text-[1rem]">Kabinet Nawasena 2025/2026</p>
      </div>

      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <div v-for="i in 4" :key="i" class="h-[200px] md:h-[250px] rounded-2xl bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card-2)] to-[var(--bg-card)] bg-[length:800px_100%] animate-[skeletonShimmer_1.5s_infinite_linear] border border-border" :class="{ 'md:col-span-2': i <= 2 }"></div>
      </div>
      
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <StrukturPengurusCard 
          v-for="p in pengurus" 
          :key="p.id" 
          :pengurus="p" 
          :is-featured="isFeatured(p.jabatan)" 
          @click="openPengurusModal(p)" 
        />
      </div>

      <div class="mt-16 md:mt-24">
        <h3 class="text-[1.5rem] font-bold mb-6 md:mb-8 text-center md:text-left">Seksi Bidang</h3>
        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <div v-for="i in 10" :key="i" class="h-[100px] md:h-[120px] rounded-2xl bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card-2)] to-[var(--bg-card)] bg-[length:800px_100%] animate-[skeletonShimmer_1.5s_infinite_linear] border border-border"></div>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
          <StrukturSekbidCard 
            v-for="(s, index) in sekbid" 
            :key="s.id" 
            :sekbid="s" 
            :index="index + 1" 
            @click="openSekbidModal(s)" 
          />
        </div>
      </div>

      <div class="text-center mt-20 md:mt-24">
        <NuxtLink to="/hof" class="inline-flex items-center justify-center gap-2 text-text-main no-underline px-7 py-3.5 rounded-full bg-accent-soft border border-border font-semibold text-[0.95rem] transition-all duration-300 shadow hover:-translate-y-0.5 hover:shadow-md hover:border-accent">
          <Icon name="material-symbols:star" class="text-[1.2rem] text-accent" />
          Hall of Fame Kepengurusan
        </NuxtLink>
      </div>
    </main>

    <StrukturPengurusModal />
    <StrukturSekbidModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const { loading, pengurus, sekbid, loadStrukturData, openPengurusModal, openSekbidModal } = useStruktur()

useHead({
  title: 'Struktur Organisasi — OSIS Nawasena'
})

const isFeatured = (jabatan: string) => {
  return ['Ketua', 'Wakil Ketua', 'Sekretaris Umum', 'Bendahara Umum'].some(role => jabatan.includes(role))
}

onMounted(() => {
  loadStrukturData()
})
</script>

<style>
@keyframes skeletonShimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
</style>
