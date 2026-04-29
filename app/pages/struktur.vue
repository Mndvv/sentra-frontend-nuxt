<template>
  <div>
    <main class="max-w-[1120px] mx-auto pt-20 md:pt-24 pb-14 px-4 md:px-6">

      <!-- ── Hero ───────────────────────────────────────── -->
      <header class="text-center mb-9">
        <span class="inline-flex items-center gap-1.5 bg-accent-soft text-accent text-[0.65rem] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full mb-3">
          <Icon name="material-symbols:diversity-3-rounded" class="text-[0.95rem]" />
          Struktur Organisasi
        </span>
        <h1 class="text-[clamp(1.8rem,4.5vw,2.4rem)] font-black tracking-tight m-0 mb-2 leading-tight">
          Kabinet
          <span class="bg-gradient-to-br from-accent to-purple-500 bg-clip-text text-transparent">Nawasena</span>
          2025/2026
        </h1>
        <p class="text-[0.95rem] md:text-[1rem] text-text-muted m-0 max-w-[520px] mx-auto leading-relaxed">
          Susunan pengurus inti dan seksi bidang yang menggerakkan setiap program kerja di SMA Negeri Indonesia.
        </p>

        <!-- Stat chips -->
        <div v-if="!loading" class="flex items-center justify-center gap-2 mt-5 flex-wrap">
          <span class="inline-flex items-center gap-1.5 bg-bg-card border border-border text-[0.78rem] font-semibold text-text-main px-3 py-1.5 rounded-full">
            <Icon name="material-symbols:groups-rounded" class="text-base text-accent" />
            {{ pengurus.length }} Pengurus Inti
          </span>
          <span class="inline-flex items-center gap-1.5 bg-bg-card border border-border text-[0.78rem] font-semibold text-text-main px-3 py-1.5 rounded-full">
            <Icon name="material-symbols:dashboard-rounded" class="text-base text-accent" />
            {{ sekbid.length }} Seksi Bidang
          </span>
          <span class="inline-flex items-center gap-1.5 bg-bg-card border border-border text-[0.78rem] font-semibold text-text-main px-3 py-1.5 rounded-full">
            <Icon name="material-symbols:badge-rounded" class="text-base text-accent" />
            {{ totalAnggotaCount }} Total Anggota
          </span>
        </div>
      </header>

      <!-- ── Organisation tabs (OSIS / MPK) ──────────────── -->
      <div class="flex justify-center mb-10">
        <div role="tablist" aria-label="Organisasi" class="inline-flex items-center bg-bg-card border border-border rounded-full p-1 gap-0.5 shadow-sm">
          <button
            v-for="tab in orgTabs"
            :key="tab.id"
            role="tab"
            :aria-selected="activeOrg === tab.id"
            :disabled="tab.disabled"
            class="relative inline-flex items-center gap-1.5 px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[0.78rem] md:text-[0.82rem] font-semibold transition-all duration-200 select-none"
            :class="[
              activeOrg === tab.id && !tab.disabled
                ? 'bg-gradient-to-br from-accent to-purple-500 text-white shadow-md'
                : 'text-text-muted',
              tab.disabled
                ? 'opacity-55 cursor-not-allowed'
                : (activeOrg === tab.id ? 'cursor-default' : 'cursor-pointer hover:text-text-main hover:bg-bg-card-2'),
            ]"
            @click="!tab.disabled && setActiveOrg(tab.id)"
          >
            <Icon :name="tab.icon" class="text-base" />
            {{ tab.label }}
            <span
              v-if="tab.disabled"
              class="ml-1 inline-flex items-center text-[0.55rem] font-extrabold tracking-[0.12em] uppercase bg-bg-card-2 text-text-subtle px-1.5 py-[2px] rounded-full leading-none border border-border"
            >Soon</span>
          </button>
        </div>
      </div>

      <!-- ── Content area ───────────────────────────────── -->
      <!-- Empty state when MPK is selected (no data yet) -->
      <div v-if="!loading && pengurus.length === 0 && sekbid.length === 0" class="text-center py-14">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-soft text-accent mb-4">
          <Icon name="material-symbols:hourglass-top-rounded" class="text-[40px]" />
        </div>
        <h3 class="text-[1.15rem] font-bold text-text-main m-0 mb-1.5">Sedang Disiapkan</h3>
        <p class="text-[0.9rem] text-text-muted m-0 max-w-md mx-auto leading-relaxed">
          Struktur {{ activeOrg.toUpperCase() }} Nawasena akan segera ditampilkan di sini.
        </p>
      </div>

      <template v-else>
        <!-- ── Pengurus Inti ───────────────────────────── -->
        <section>
          <div class="flex items-end justify-between mb-5 md:mb-6">
            <h2 class="text-[1.1rem] md:text-[1.25rem] font-extrabold text-text-main m-0 leading-tight">Pengurus Inti</h2>
            <span v-if="!loading" class="text-[0.74rem] text-text-subtle font-semibold uppercase tracking-wider">
              {{ pengurus.length }} orang
            </span>
          </div>

          <!-- Skeleton -->
          <div v-if="loading" class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              v-for="i in 6" :key="i"
              class="h-[200px] rounded-[18px] bg-gradient-to-r from-bg-card via-bg-card-2 to-bg-card animate-pulse border border-border"
              :class="{ 'col-span-2': i === 1 }"
            />
          </div>

          <!-- Cards -->
          <div v-else-if="pengurus.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-5">
            <StrukturPengurusCard
              v-for="p in pengurus"
              :key="p.id"
              :pengurus="p"
              :is-featured="isFeatured(p.jabatan)"
              @click="openPengurusModal(p)"
            />
          </div>
          <p v-else class="text-[0.9rem] text-text-muted text-center py-6">Belum ada pengurus inti.</p>
        </section>

        <!-- ── Seksi Bidang ────────────────────────────── -->
        <section class="mt-14 md:mt-16">
          <div class="flex items-end justify-between mb-5 md:mb-6">
            <div>
              <h2 class="text-[1.1rem] md:text-[1.25rem] font-extrabold text-text-main m-0 leading-tight">Seksi Bidang</h2>
              <p class="text-[0.78rem] text-text-muted m-0 mt-0.5">10 sekbid yang merancang & menjalankan program kerja Nawasena.</p>
            </div>
            <span v-if="!loading" class="text-[0.74rem] text-text-subtle font-semibold uppercase tracking-wider whitespace-nowrap">
              {{ sekbid.length }} sekbid
            </span>
          </div>

          <!-- Skeleton -->
          <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
            <div v-for="i in 10" :key="i" class="h-[148px] rounded-[20px] bg-gradient-to-r from-bg-card via-bg-card-2 to-bg-card animate-pulse border border-border" />
          </div>

          <!-- Cards -->
          <div v-else-if="sekbid.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
            <StrukturSekbidCard
              v-for="(s, idx) in sekbid"
              :key="s.number ?? s.id ?? idx"
              :sekbid="s"
              :index="s.number ?? idx + 1"
              @click="openSekbidModal(s)"
            />
          </div>
          <p v-else class="text-[0.9rem] text-text-muted text-center py-6">Belum ada seksi bidang.</p>
        </section>
      </template>

      <!-- ── HoF link ────────────────────────────────── -->
      <div class="text-center mt-14 md:mt-16">
        <NuxtLink
          to="/hof"
          class="inline-flex items-center gap-2 no-underline text-[0.92rem] font-semibold text-text-main bg-bg-card border border-border rounded-full px-6 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-accent hover:text-accent"
        >
          <Icon name="material-symbols:star-rounded" class="text-[1.2rem] text-accent" />
          Hall of Fame Kepengurusan
          <Icon name="material-symbols:arrow-forward-rounded" class="text-[1rem] opacity-60" />
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
import type { Organisasi } from '~/composables/useStruktur'

const {
  loading,
  pengurus,
  sekbid,
  activeOrg,
  setActiveOrg,
  totalAnggotaCount,
  loadStrukturData,
  openPengurusModal,
  openSekbidModal,
} = useStruktur()

useSeoMeta({
  title: 'Struktur Organisasi',
  description: 'Susunan pengurus inti dan 10 seksi bidang Kabinet Nawasena 2025/2026 — siapa saja yang menggerakkan setiap program kerja OSIS.',
  ogTitle: 'Struktur Organisasi — OSIS Nawasena',
  ogDescription: 'Pengurus inti dan seksi bidang Kabinet Nawasena 2025/2026.',
})

// Only Ketua Umum gets the large featured card (span 2, bigger avatar, motto shown)
const isFeatured = (jabatan: string) =>
  !!jabatan && /ketua umum/i.test(jabatan)

interface OrgTab {
  id: Organisasi
  label: string
  icon: string
  disabled: boolean
}

const orgTabs: OrgTab[] = [
  { id: 'osis', label: 'OSIS', icon: 'material-symbols:school-rounded', disabled: false },
  { id: 'mpk',  label: 'MPK',  icon: 'material-symbols:groups-rounded', disabled: true  },
]

onMounted(() => loadStrukturData())
</script>
