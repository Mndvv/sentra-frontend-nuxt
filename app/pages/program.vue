<template>
  <main class="max-w-[1120px] mx-auto px-4 md:px-6 py-12 md:py-20 mt-16 md:mt-20">
    <div class="text-center mb-10 md:mb-14">
      <h2 class="text-[1.8rem] md:text-[2.2rem] font-extrabold tracking-tight mb-2 text-text-main">Program Kerja</h2>
      <p class="text-text-muted text-[1rem]">Inisiatif dan target pencapaian OSIS Nawasena 2025/2026.</p>
    </div>

    <!-- Stats Section -->
    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7 w-full">
      <div v-for="i in 4" :key="i" class="h-[108px] rounded-2xl bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card-2)] to-[var(--bg-card)] bg-[length:800px_100%] animate-[skeletonShimmer_1.5s_infinite_linear] border border-border" :class="{ 'col-span-2 md:col-span-1': i === 4 }"></div>
    </div>
    <ProgramProkerStats v-else :programs="programs" />

    <!-- Filter Tabs -->
    <ProgramProkerFilterTabs v-model="filter" />

    <!-- Program Grid -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="i in 9" :key="i" class="h-[174px] rounded-2xl bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card-2)] to-[var(--bg-card)] bg-[length:800px_100%] animate-[skeletonShimmer_1.5s_infinite_linear] border border-border"></div>
    </div>
    <div v-else-if="filteredPrograms.length === 0" class="col-span-full text-center py-12 px-4 text-text-muted font-medium flex flex-col items-center gap-3 w-full">
      <Icon name="material-symbols:search-off" class="text-4xl opacity-40" />
      <p>Tidak ada program dengan status ini.</p>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProgramProkerCard v-for="prog in filteredPrograms" :key="prog.id" :prog="prog" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const { loading, programs, filter, filteredPrograms, loadPrograms } = useProgram()

useSeoMeta({
  title: 'Program Kerja',
  description: 'Daftar program kerja, target capaian, dan status pelaksanaan kabinet OSIS Nawasena 2025/2026.',
  ogTitle: 'Program Kerja — OSIS Nawasena',
  ogDescription: 'Daftar program kerja kabinet OSIS Nawasena 2025/2026.',
})

onMounted(() => {
  loadPrograms()
})
</script>

<style>
@keyframes skeletonShimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
</style>
