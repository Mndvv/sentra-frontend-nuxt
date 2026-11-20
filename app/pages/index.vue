<template>
  <div class="min-h-screen bg-bg-primary text-text-main">
    <!-- Hero Section -->
    <BerandaHeroSection />

    <!-- Main Container: Strict 1120px max-width matching AppFooter & AppNavbar -->
    <main
      class="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14 md:space-y-20 py-12 md:py-16"
    >
      <!-- ── SECTION 1: Bento Hub (Filosofi, Live Radio & Agenda) ── -->
      <section id="bento-hub" class="scroll-mt-24">
        <BerandaSectionHeader
          title="Pusat Kendali Nawasena"
          subtitle="Arah gerak, siaran radio sekolah, dan jadwal kegiatan mendatang dalam satu pandangan terpadu."
        />

        <!-- Bento Row: Filosofi (7 cols) + Radio (5 cols) on PC -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch mb-6">
          <div class="lg:col-span-7">
            <BerandaFilosofiSection />
          </div>
          <div class="lg:col-span-5">
            <BerandaRadioSection />
          </div>
        </div>

        <!-- Bento Row 2: Agenda Terdekat (12 cols) -->
        <div class="mt-8 pt-8 border-t border-border/60">
          <div class="flex items-center justify-between gap-4 mb-5">
            <div>
              <h3
                class="text-lg sm:text-xl font-bold text-text-main tracking-tight m-0"
              >
                Agenda Kegiatan Terdekat
              </h3>
              <p class="text-xs sm:text-sm text-text-muted m-0 mt-0.5">
                Rencana kegiatan yang telah diagendakan oleh kabinet.
              </p>
            </div>
            <NuxtLink
              to="/program"
              class="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors no-underline shrink-0"
            >
              <span>Semua Agenda</span>
              <Icon
                name="material-symbols:arrow-forward-rounded"
                class="text-sm"
                aria-hidden="true"
              />
            </NuxtLink>
          </div>

          <!-- Loading State -->
          <div
            v-if="agendaLoading"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <div
              v-for="i in 3"
              :key="i"
              class="h-[140px] rounded-xl bg-bg-card border border-border animate-pulse"
            />
          </div>

          <!-- Empty State -->
          <div
            v-else-if="agendas.length === 0"
            class="flex flex-col items-center justify-center gap-3 py-12 px-4 bg-bg-card border border-dashed border-border rounded-xl text-center text-text-muted"
          >
            <Icon
              name="material-symbols:calendar-month-rounded"
              class="text-3xl opacity-40 text-accent"
              aria-hidden="true"
            />
            <div>
              <p class="text-sm font-bold text-text-main mb-1">
                Belum Ada Agenda Mendatang
              </p>
              <p class="text-xs text-text-muted m-0">
                Agenda kegiatan baru akan segera dipublikasikan di sini.
              </p>
            </div>
          </div>

          <!-- Agenda 3-Card Grid -->
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <BerandaAgendaCard
              v-for="(ag, idx) in agendas.slice(0, 3)"
              :key="ag.id"
              :agenda="ag"
              :delay="idx * 80"
            />
          </div>
        </div>
      </section>

      <!-- ── SECTION 2: Program Kerja Showcase ─────────────────── -->
      <section
        id="proker-preview"
        class="scroll-mt-24 pt-4 border-t border-border/80"
      >
        <BerandaSectionHeader
          title="Inisiatif Program Kerja"
          subtitle="Program nyata yang dijalankan seluruh seksi bidang demi kemajuan siswa SMAN 2 Jonggol."
        >
          <template #action>
            <NuxtLink
              to="/program"
              class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent hover:text-accent-hover px-3.5 py-1.5 rounded-lg border border-accent/20 bg-accent-soft hover:bg-accent/15 transition-all no-underline"
            >
              <span>Lihat Seluruh Program</span>
              <Icon
                name="material-symbols:arrow-forward-rounded"
                class="text-base"
                aria-hidden="true"
              />
            </NuxtLink>
          </template>
        </BerandaSectionHeader>

        <!-- Status Filter Tabs -->
        <div
          class="flex items-center gap-2 mb-6 overflow-x-auto pb-1"
          style="scrollbar-width: none"
        >
          <button
            v-for="tab in filterTabs"
            :key="tab"
            type="button"
            class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            :class="
              selectedStatus === tab
                ? 'bg-accent text-white shadow-xs'
                : 'bg-bg-card border border-border text-text-muted hover:text-text-main hover:border-accent/30'
            "
            @click="selectedStatus = tab"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Loading State -->
        <div
          v-if="prokerLoading"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <div
            v-for="i in 4"
            :key="i"
            class="h-[180px] rounded-xl bg-bg-card border border-border animate-pulse"
          />
        </div>

        <!-- Empty State -->
        <div
          v-else-if="filteredPrograms.length === 0"
          class="flex flex-col items-center justify-center gap-3 py-14 px-4 bg-bg-card border border-dashed border-border rounded-xl text-center text-text-muted"
        >
          <Icon
            name="material-symbols:assignment-rounded"
            class="text-3xl opacity-40 text-accent"
            aria-hidden="true"
          />
          <div>
            <p class="text-sm font-bold text-text-main mb-1">
              Tidak Ada Program Terdaftar
            </p>
            <p class="text-xs text-text-muted m-0">
              Tidak ada program dengan filter "{{ selectedStatus }}" saat ini.
            </p>
          </div>
        </div>

        <!-- Proker 4-Card Grid on PC -->
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch"
        >
          <BerandaProkerCard
            v-for="(p, idx) in filteredPrograms"
            :key="p.id"
            :program="p"
            :delay="idx * 70"
          />
        </div>
      </section>

      <!-- ── SECTION 3: Dokumentasi Rekam Jejak ────────────────── -->
      <section
        id="dokum-preview"
        class="scroll-mt-24 pt-4 border-t border-border/80"
      >
        <BerandaSectionHeader
          title="Rekam Jejak & Dokumentasi"
          subtitle="Kilas balik kegiatan, arsip liputan, dan memori perjalanan Kabinet Nawasena."
        >
          <template #action>
            <NuxtLink
              to="/dokumentasi"
              class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent hover:text-accent-hover px-3.5 py-1.5 rounded-lg border border-accent/20 bg-accent-soft hover:bg-accent/15 transition-all no-underline"
            >
              <span>Arsip Dokumentasi</span>
              <Icon
                name="material-symbols:arrow-forward-rounded"
                class="text-base"
                aria-hidden="true"
              />
            </NuxtLink>
          </template>
        </BerandaSectionHeader>

        <!-- Loading State -->
        <div v-if="dokumLoading" class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="i in 3"
            :key="i"
            class="h-[300px] rounded-xl bg-bg-card border border-border animate-pulse"
          />
        </div>

        <!-- Empty State -->
        <div
          v-else-if="dokumHighlights.length === 0"
          class="flex flex-col items-center justify-center gap-3 py-14 px-4 bg-bg-card border border-dashed border-border rounded-xl text-center text-text-muted"
        >
          <Icon
            name="material-symbols:photo-library-rounded"
            class="text-3xl opacity-40 text-accent"
            aria-hidden="true"
          />
          <div>
            <p class="text-sm font-bold text-text-main mb-1">
              Belum Ada Dokumentasi Publikasi
            </p>
            <p class="text-xs text-text-muted m-0">
              Dokumentasi kegiatan sekolah terbaru akan dirilis segera.
            </p>
          </div>
        </div>

        <!-- Dokum 3-Card Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          <BerandaDokumCard
            v-for="(ev, idx) in dokumHighlights"
            :key="ev.id"
            :ev="ev"
            :is-featured="idx === 0"
            :delay="idx * 80"
          />
        </div>
      </section>

      <!-- ── SECTION 4: Kotak Saran & Aspirasi ─────────────────── -->
      <section
        id="kotak-saran"
        class="scroll-mt-24 pt-4 border-t border-border/80"
      >
        <BerandaKotakSaranCta />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAgenda } from "~/composables/useAgenda";
import { useProgram } from "~/composables/useProgram";
import { useDokumentasi } from "~/composables/useDokumentasi";

const { loading: agendaLoading, agendas, loadAgendas } = useAgenda();
const { loading: prokerLoading, programs, loadPrograms } = useProgram();
const {
  loading: dokumLoading,
  dokumentasi,
  loadDokumentasiData,
} = useDokumentasi();

// Status filter for Proker
const filterTabs = ["Semua", "Berjalan", "Direncanakan", "Selesai"] as const;
type FilterTab = (typeof filterTabs)[number];
const selectedStatus = ref<FilterTab>("Semua");

const filteredPrograms = computed(() => {
  const list = [...programs.value];
  if (selectedStatus.value !== "Semua") {
    return list.filter((p) => p.status === selectedStatus.value).slice(0, 4);
  }
  // Order priority: Berjalan -> Direncanakan -> Selesai
  const order: Record<string, number> = {
    Berjalan: 0,
    Direncanakan: 1,
    Selesai: 2,
  };
  return list
    .sort((a, b) => (order[a.status] ?? 1) - (order[b.status] ?? 1))
    .slice(0, 4);
});

const dokumHighlights = computed(() => dokumentasi.value.slice(0, 3));

useSeoMeta({
  title: "Beranda",
  description:
    "Portal resmi SENTRA OSIS & MPK Nawasena SMAN 2 Jonggol 2025/2026 — pusat informasi program kerja, agenda kegiatan, siaran radio sekolah, dan kanal aspirasi siswa.",
  ogTitle: "Beranda — SENTRA Nawasena SMAN 2 Jonggol",
  ogDescription:
    "Portal resmi SENTRA OSIS & MPK Nawasena SMAN 2 Jonggol periode 2025/2026.",
});

onMounted(() => {
  loadAgendas();
  loadPrograms();
  loadDokumentasiData();
});
</script>
