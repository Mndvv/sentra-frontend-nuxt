<template>
  <div>
    <BerandaHeroSection />

    <main class="max-w-[1120px] mx-auto px-4 md:px-6">

      <!-- ── Filosofi ─────────────────────────────────────── -->
      <section id="nawasena-section" class="py-12 md:py-16 border-t border-border first:border-t-0">
        <div class="mb-7">
          <h2 class="text-[1.5rem] md:text-[1.9rem] font-extrabold tracking-tight mb-1 text-text-main">Filosofi</h2>
          <p class="text-text-muted text-sm">Mengenal makna dibalik nama Nawasena.</p>
        </div>
        <div class="bg-bg-card border border-border rounded-2xl px-5 py-5 md:px-8 md:py-6 shadow relative overflow-hidden">
          <div class="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-accent to-purple-500 rounded-l-2xl" />
          <p class="leading-relaxed text-[0.95rem] text-text-main">
            Nama <strong>Nawasena</strong> yang diambil dari bahasa Sanskerta secara ontologis menempatkan
            organisasi ini pada posisi kompas moral yang mengarahkan pandangan jauh ke cakrawala.
            <em>Masa depan yang cerah</em> bukan sekadar angan, namun menjadi jangkar bagi setiap tindakan
            yang diambil oleh para pengurusnya. Di sini, Nawasena berperan sebagai payung besar atau
            <em>oikos</em> yang menaungi OSIS dan MPK dalam satu napas perjuangan yang harmonis.
          </p>
        </div>
      </section>

      <!-- ── Agenda ────────────────────────────────────────── -->
      <section id="agenda" class="py-12 md:py-16 border-t border-border">
        <div class="mb-7">
          <h2 class="text-[1.5rem] md:text-[1.9rem] font-extrabold tracking-tight mb-1 text-text-main">Agenda Mendatang</h2>
          <p class="text-text-muted text-sm">Kegiatan dan acara yang sudah direncanakan.</p>
        </div>
        <div v-if="agendaLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="i in 3" :key="i" class="h-[140px] rounded-2xl bg-gradient-to-r from-bg-card via-bg-card-2 to-bg-card animate-pulse border border-border" />
        </div>
        <div v-else-if="agendas.length === 0" class="flex flex-col items-center gap-3 py-12 bg-bg-card border border-dashed border-border rounded-2xl text-text-muted">
          <Icon name="material-symbols:calendar-today" class="text-4xl opacity-40" />
          <p class="text-sm">Belum ada agenda mendatang.</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <BerandaAgendaCard v-for="ag in agendas" :key="ag.id" :agenda="ag" />
        </div>
      </section>

      <!-- ── Program Kerja Preview ──────────────────────────── -->
      <section id="proker-preview" class="py-12 md:py-16 border-t border-border">
        <div class="flex items-end justify-between flex-wrap gap-3 mb-7">
          <div>
            <h2 class="text-[1.5rem] md:text-[1.9rem] font-extrabold tracking-tight mb-1 text-text-main">Program Kerja</h2>
            <p class="text-text-muted text-sm">Inisiatif nyata demi kemajuan bersama.</p>
          </div>
          <NuxtLink
            to="/program"
            class="flex items-center gap-1.5 text-sm font-bold text-accent px-3 py-1.5 rounded-lg border border-accent-soft bg-accent-soft hover:bg-accent/15 transition-colors no-underline"
          >
            Lihat semua <Icon name="material-symbols:arrow-forward" class="text-base" />
          </NuxtLink>
        </div>
        <div v-if="prokerLoading" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="i in 4" :key="i" class="h-[120px] rounded-2xl bg-gradient-to-r from-bg-card via-bg-card-2 to-bg-card animate-pulse border border-border" />
        </div>
        <div v-else-if="programHighlights.length === 0" class="flex flex-col items-center gap-3 py-12 bg-bg-card border border-dashed border-border rounded-2xl text-text-muted">
          <Icon name="material-symbols:assignment" class="text-4xl opacity-40" />
          <p class="text-sm">Belum ada program kerja.</p>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <BerandaProkerCard v-for="p in programHighlights" :key="p.id" :program="p" />
        </div>
      </section>

      <!-- ── Dokumentasi Preview ───────────────────────────── -->
      <section id="dokum-preview" class="py-12 md:py-16 border-t border-border">
        <div class="flex items-end justify-between flex-wrap gap-3 mb-7">
          <div>
            <h2 class="text-[1.5rem] md:text-[1.9rem] font-extrabold tracking-tight mb-1 text-text-main">Dokumentasi Terbaru</h2>
            <p class="text-text-muted text-sm">Rekam jejak dan memori perjalanan Nawasena.</p>
          </div>
          <NuxtLink
            to="/dokumentasi"
            class="flex items-center gap-1.5 text-sm font-bold text-accent px-3 py-1.5 rounded-lg border border-accent-soft bg-accent-soft hover:bg-accent/15 transition-colors no-underline"
          >
            Lihat semua <Icon name="material-symbols:arrow-forward" class="text-base" />
          </NuxtLink>
        </div>
        <div v-if="dokumLoading" class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="i in 3" :key="i" class="h-[260px] rounded-2xl bg-gradient-to-r from-bg-card via-bg-card-2 to-bg-card animate-pulse border border-border" />
        </div>
        <div v-else-if="dokumHighlights.length === 0" class="flex flex-col items-center gap-3 py-12 bg-bg-card border border-dashed border-border rounded-2xl text-text-muted">
          <Icon name="material-symbols:folder-open" class="text-4xl opacity-40" />
          <p class="text-sm">Belum ada dokumentasi yang dipublikasikan.</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min">
          <BerandaDokumCard
            v-for="(ev, idx) in dokumHighlights"
            :key="ev.id"
            :ev="ev"
            :is-featured="idx === 0"
            @click="openArticleModal"
          />
        </div>
      </section>

    </main>

    <!-- Modals (artikel + lightbox) -->
    <DokumArticleModal />
    <DokumLightboxModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useDokumentasi } from '~/composables/useDokumentasi'

const { loading: agendaLoading, agendas, loadAgendas } = useAgenda()
const { loading: prokerLoading, programs, loadPrograms } = useProgram()
const { loading: dokumLoading, dokumentasi, loadDokumentasiData, openArticleModal } = useDokumentasi()

const programHighlights = computed(() => {
  const order: Record<string, number> = { Berjalan: 0, Direncanakan: 1, Selesai: 2 }
  return [...programs.value]
    .sort((a, b) => (order[a.status] ?? 1) - (order[b.status] ?? 1))
    .slice(0, 4)
})

const dokumHighlights = computed(() => dokumentasi.value.slice(0, 3))

useHead({ title: 'Beranda — OSIS Nawasena SENTRA' })

onMounted(() => {
  loadAgendas()
  loadPrograms()
  loadDokumentasiData()
})
</script>