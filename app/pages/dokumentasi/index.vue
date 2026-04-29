<template>
  <main class="max-w-[1120px] mx-auto px-4 md:px-6 py-12 md:py-20 mt-16 md:mt-20">
    <div class="text-center mb-10 md:mb-14">
      <h2 class="font-serif text-[1.8rem] md:text-[2.2rem] font-[900] tracking-tight mb-2 text-text-main">Dokumentasi</h2>
      <p class="text-text-muted text-[1rem]">Rekam jejak dan memori perjalanan Nawasena.</p>
    </div>

    <!-- Gallery Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      <div v-if="loading" class="h-[380px] md:col-span-2 lg:col-span-3 rounded-[18px] bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card-2)] to-[var(--bg-card)] bg-[length:800px_100%] animate-[skeletonShimmer_1.5s_infinite_linear] border border-border"></div>
      <div v-if="loading" v-for="i in 6" :key="i" class="h-[380px] rounded-[18px] bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card-2)] to-[var(--bg-card)] bg-[length:800px_100%] animate-[skeletonShimmer_1.5s_infinite_linear] border border-border"></div>
      
      <div v-if="!loading && dokumentasi.length === 0" class="col-span-full text-center py-16 text-text-muted bg-bg-card rounded-2xl border border-dashed border-border shadow-sm max-w-[600px] mx-auto flex flex-col items-center w-full">
        <span class="text-[3rem] mb-4 opacity-50">📂</span>
        <p class="font-semibold text-[1.1rem]">Belum ada dokumentasi yang dipublikasikan.</p>
      </div>

      <DokumGalleryCard 
        v-if="!loading"
        v-for="(ev, index) in dokumentasi" 
        :key="ev.id" 
        :ev="ev" 
        :is-featured="index === 0"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

definePageMeta({
  pageTransition: { name: 'article-slide', mode: 'out-in' },
})

const { loading, dokumentasi, loadDokumentasiData } = useDokumentasi()

useSeoMeta({
  title: 'Dokumentasi',
  description: 'Galeri dokumentasi kegiatan dan acara OSIS Nawasena — rekam jejak dan memori perjalanan kabinet Nawasena 2025/2026.',
  ogTitle: 'Dokumentasi — OSIS Nawasena',
  ogDescription: 'Galeri dokumentasi kegiatan dan acara OSIS Nawasena.',
})

onMounted(() => {
  loadDokumentasiData()
})
</script>

<style>
@keyframes skeletonShimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
</style>
