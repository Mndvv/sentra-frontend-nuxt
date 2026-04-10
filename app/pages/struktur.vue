<template>
  <div>
    <main class="max-w-[1120px] mx-auto pt-20 md:pt-24 pb-14 px-4 md:px-6">

      <!-- Page heading -->
      <div class="text-center mb-10">
        <h2 class="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-text-main tracking-tight mb-1.5">Struktur Organisasi</h2>
        <p class="text-[1rem] text-text-muted m-0">Kabinet Nawasena 2025/2026</p>
      </div>

      <!-- ── Pengurus Inti ───────────────────────────── -->
      <section>
        <!-- Skeleton -->
        <div v-if="loading" class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="i in 6" :key="i"
            class="h-[200px] rounded-[18px] bg-gradient-to-r from-bg-card via-bg-card-2 to-bg-card animate-pulse border border-border"
            :class="{ 'col-span-2': i === 1 }"
          />
        </div>

        <!-- Cards -->
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-5">
          <StrukturPengurusCard
            v-for="p in pengurus"
            :key="p.id"
            :pengurus="p"
            :is-featured="isFeatured(p.jabatan)"
            @click="openPengurusModal(p)"
          />
        </div>
      </section>

      <!-- ── Seksi Bidang ────────────────────────────── -->
      <section class="mt-16">
        <h3 class="text-[1.3rem] font-extrabold text-text-main mb-5 md:mb-6">Seksi Bidang</h3>

        <!-- Skeleton -->
        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
          <div v-for="i in 10" :key="i" class="h-[120px] rounded-[18px] bg-gradient-to-r from-bg-card via-bg-card-2 to-bg-card animate-pulse border border-border" />
        </div>

        <!-- Cards -->
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
          <StrukturSekbidCard
            v-for="(s, idx) in sekbid"
            :key="s.number ?? s.id ?? idx"
            :sekbid="s"
            :index="idx + 1"
            @click="openSekbidModal(s)"
          />
        </div>
      </section>

      <!-- ── HoF link ────────────────────────────────── -->
      <div class="text-center mt-16">
        <NuxtLink to="/hof" class="inline-flex items-center gap-2 no-underline text-[0.95rem] font-semibold text-text-main bg-accent-soft border border-border rounded-full px-7 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-accent">
          <Icon name="material-symbols:star" class="text-[1.2rem] text-accent" />
          Hall of Fame Kepengurusan
        </NuxtLink>
      </div>
    </main>

    <!-- Modals (rendered via Teleport inside each component) -->
    <StrukturPengurusModal />
    <StrukturSekbidModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const { loading, pengurus, sekbid, loadStrukturData, openPengurusModal, openSekbidModal } = useStruktur()

useHead({ title: 'Struktur Organisasi — OSIS Nawasena' })

// Only Ketua Umum gets the large featured card (span 2, bigger avatar, motto shown)
const isFeatured = (jabatan: string) =>
  !!jabatan && /ketua umum/i.test(jabatan)

onMounted(() => loadStrukturData())
</script>
