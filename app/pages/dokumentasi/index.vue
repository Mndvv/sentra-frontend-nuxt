<template>
  <div>
    <main class="max-w-[1120px] mx-auto pt-20 md:pt-24 pb-14 px-4 md:px-6">

      <!-- ── Hero header ──────────────────────────────────── -->
      <header class="text-center mb-9">
        <span class="inline-flex items-center gap-1.5 bg-accent-soft text-accent text-[0.65rem] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full mb-3">
          <Icon name="material-symbols:photo-library-rounded" class="text-[0.95rem]" />
          Dokumentasi
        </span>
        <h1 class="text-[clamp(1.8rem,4.5vw,2.4rem)] font-black tracking-tight m-0 mb-2 leading-tight">
          Rekam Jejak
          <span class="bg-gradient-to-br from-accent to-purple-500 bg-clip-text text-transparent">Nawasena</span>
        </h1>
        <p class="text-[0.95rem] md:text-[1rem] text-text-muted m-0 max-w-[520px] mx-auto leading-relaxed">
          Galeri dokumentasi kegiatan dan memori perjalanan kabinet OSIS-MPK Nawasena 2025/2026.
        </p>

        <!-- Stat chips -->
        <div v-if="!loading && dokumentasi.length > 0" class="flex items-center justify-center gap-2 mt-5 flex-wrap">
          <span class="inline-flex items-center gap-1.5 bg-bg-card border border-border text-[0.78rem] font-semibold text-text-main px-3 py-1.5 rounded-full">
            <Icon name="material-symbols:article-rounded" class="text-base text-accent" />
            {{ dokumentasi.length }} Artikel
          </span>
          <span class="inline-flex items-center gap-1.5 bg-bg-card border border-border text-[0.78rem] font-semibold text-text-main px-3 py-1.5 rounded-full">
            <Icon name="material-symbols:photo-camera-rounded" class="text-base text-accent" />
            {{ totalPhotos }} Foto
          </span>
        </div>
      </header>

      <!-- ── Gallery section ──────────────────────────────── -->
      <section>
        <div class="flex items-end justify-between mb-5 md:mb-6">
          <h2 class="text-[1.1rem] md:text-[1.25rem] font-extrabold text-text-main m-0 leading-tight">Galeri Kegiatan</h2>
          <span v-if="!loading && dokumentasi.length > 0" class="text-[0.74rem] text-text-subtle font-semibold uppercase tracking-wider">
            {{ dokumentasi.length }} kegiatan
          </span>
        </div>

        <!-- Skeleton -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <div class="h-[380px] md:col-span-2 lg:col-span-3 rounded-[18px] bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card-2)] to-[var(--bg-card)] bg-[length:800px_100%] animate-[skeletonShimmer_1.5s_infinite_linear] border border-border"></div>
          <div v-for="i in 6" :key="i" class="h-[380px] rounded-[18px] bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card-2)] to-[var(--bg-card)] bg-[length:800px_100%] animate-[skeletonShimmer_1.5s_infinite_linear] border border-border"></div>
        </div>

        <!-- Empty state -->
        <div v-else-if="dokumentasi.length === 0" class="text-center py-14">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-bg-card-2 border border-border text-text-subtle mb-4">
            <Icon name="material-symbols:folder-open-rounded" class="text-[40px]" />
          </div>
          <h3 class="text-[1.15rem] font-bold text-text-main m-0 mb-1.5">Belum Ada Dokumentasi</h3>
          <p class="text-[0.9rem] text-text-muted m-0 max-w-md mx-auto leading-relaxed">
            Dokumentasi kegiatan Nawasena akan segera ditampilkan di sini.
          </p>
        </div>

        <!-- Gallery Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <DokumGalleryCard 
            v-for="(ev, index) in dokumentasi" 
            :key="ev.id" 
            :ev="ev" 
            :is-featured="index === 0"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'

definePageMeta({
  pageTransition: { name: 'article-slide', mode: 'out-in' },
})

const { loading, dokumentasi, loadDokumentasiData } = useDokumentasi()

const totalPhotos = computed(() =>
  dokumentasi.value.reduce((sum: number, ev: any) => sum + (ev.images?.length || 0), 0)
)

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
