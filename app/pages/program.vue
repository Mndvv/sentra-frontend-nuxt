<template>
  <div>
    <main class="max-w-[1120px] mx-auto pt-20 md:pt-24 pb-14 px-4 md:px-6">

      <!-- ── Hero header ──────────────────────────────────── -->
      <header class="text-center mb-9">
        <span class="inline-flex items-center gap-1.5 bg-accent-soft text-accent text-[0.65rem] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full mb-3">
          <Icon name="material-symbols:assignment-rounded" class="text-[0.95rem]" />
          Program Kerja
        </span>
        <h1 class="text-[clamp(1.8rem,4.5vw,2.4rem)] font-black tracking-tight m-0 mb-2 leading-tight">
          Inisiatif
          <span class="bg-gradient-to-br from-accent to-purple-500 bg-clip-text text-transparent">Nawasena</span>
        </h1>
        <p class="text-[0.95rem] md:text-[1rem] text-text-muted m-0 max-w-[520px] mx-auto leading-relaxed">
          Target pencapaian dan status pelaksanaan program kerja OSIS-MPK Nawasena 2025/2026.
        </p>
      </header>

      <!-- ── Stats Dashboard (chart + numbers) ────────────── -->
      <div v-if="loading" class="bg-bg-card border border-border rounded-2xl p-5 md:p-7 mb-8">
        <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-center">
          <div class="flex justify-center">
            <div class="w-[200px] h-[200px] md:w-[220px] md:h-[220px] rounded-full bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card-2)] to-[var(--bg-card)] bg-[length:800px_100%] animate-[skeletonShimmer_1.5s_infinite_linear] border border-border"></div>
          </div>
          <div class="space-y-3">
            <div class="h-16 rounded-xl bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card-2)] to-[var(--bg-card)] bg-[length:800px_100%] animate-[skeletonShimmer_1.5s_infinite_linear] border border-border"></div>
            <div class="grid grid-cols-2 gap-2.5">
              <div v-for="i in 3" :key="i" class="h-12 rounded-xl bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card-2)] to-[var(--bg-card)] bg-[length:800px_100%] animate-[skeletonShimmer_1.5s_infinite_linear] border border-border"></div>
            </div>
          </div>
        </div>
      </div>
      <ProgramProkerStats v-else :programs="programs" v-model:active-filter="filter" />

      <!-- ── Filter + Grid section ────────────────────────── -->
      <section>
        <div class="flex items-end justify-between mb-5 md:mb-6">
          <h2 class="text-[1.1rem] md:text-[1.25rem] font-extrabold text-text-main m-0 leading-tight">Daftar Program</h2>
          <span v-if="!loading" class="text-[0.74rem] text-text-subtle font-semibold uppercase tracking-wider">
            {{ filteredPrograms.length }} program
          </span>
        </div>

        <!-- Filter Tabs -->
        <ProgramProkerFilterTabs v-model="filter" />

        <!-- Program Grid -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="i in 9" :key="i" class="h-[174px] rounded-2xl bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card-2)] to-[var(--bg-card)] bg-[length:800px_100%] animate-[skeletonShimmer_1.5s_infinite_linear] border border-border"></div>
        </div>
        <div v-else-if="filteredPrograms.length === 0" class="text-center py-14">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bg-card-2 border border-border text-text-subtle mb-3">
            <Icon name="material-symbols:search-off" class="text-[28px]" />
          </div>
          <p class="text-[0.9rem] text-text-muted font-medium m-0">Tidak ada program dengan status ini.</p>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProgramProkerCard v-for="prog in filteredPrograms" :key="prog.id" :prog="prog" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const { loading, programs, filter, filteredPrograms, loadPrograms } = useProgram()

useSeoMeta({
  title: 'Program Kerja',
  description: 'Daftar program kerja, target capaian, dan status pelaksanaan kabinet OSIS-MPK Nawasena 2025/2026.',
  ogTitle: 'Program Kerja — OSPK Nawasena',
  ogDescription: 'Daftar program kerja kabinet OSIS-MPK Nawasena 2025/2026.',
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
