<template>
  <div>
    <main
      class="max-w-[1120px] mx-auto pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <!-- Masthead -->
      <header class="mb-8 md:mb-10">
        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-text-main m-0 leading-tight"
        >
          Inisiatif <span class="text-accent">Nawasena</span>
          <span class="text-text-muted font-normal text-2xl sm:text-3xl"
            >2026/2027</span
          >
        </h1>

        <p
          class="text-base sm:text-lg text-text-muted mt-3 mb-6 max-w-2xl leading-relaxed"
        >
          Target capaian dan status pelaksanaan program kerja OSIS dan MPK SMAN
          2 Jonggol.
        </p>

        <div
          class="flex items-center gap-2.5 text-xs font-semibold text-text-subtle uppercase tracking-wider"
        >
          <span class="inline-flex items-center gap-1.5">
            <span
              class="w-2 h-2 rounded-full bg-[var(--badge-done-text)]"
            ></span>
            {{ programCountLabel }}
          </span>
          <span class="text-border">·</span>
          <span>{{ programs.length }} program tercatat</span>
        </div>
      </header>

      <!-- Stats Dashboard (mission control) -->
      <ProgramProkerStats
        v-if="!loading"
        :programs="programs"
        v-model:active-filter="filter"
      />

      <!-- Controls & Program Listing Section -->
      <section class="mt-8 md:mt-10">
        <div class="flex items-center justify-between mb-4">
          <h2
            class="text-xl md:text-2xl font-black text-text-main m-0 tracking-tight"
          >
            Daftar Program Kerja
          </h2>
          <span
            v-if="!loading"
            class="text-xs font-semibold text-text-subtle uppercase tracking-wider"
          >
            {{ displayPrograms.length }} Program
          </span>
        </div>

        <!-- Controls Toolbar -->
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
        >
          <ProgramProkerFilterTabs
            v-model="filter"
            class="!mb-0 flex-1 min-w-0"
          />

          <!-- Search Input -->
          <div class="relative w-full sm:w-72 md:w-80 shrink-0">
            <div
              class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-subtle"
            >
              <Icon name="material-symbols:search-rounded" class="text-lg" />
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari program kerja..."
              aria-label="Cari program kerja"
              class="w-full h-11 pl-10 pr-10 text-sm bg-bg-card border border-border rounded-full text-text-main placeholder:text-text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent transition-all shadow-sm"
            />
            <button
              v-if="searchQuery"
              type="button"
              aria-label="Hapus pencarian"
              class="absolute inset-y-0 right-0 w-11 h-11 flex items-center justify-center text-text-subtle hover:text-text-main transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
              @click="searchQuery = ''"
            >
              <Icon name="material-symbols:close-rounded" class="text-base" />
            </button>
          </div>
        </div>

        <!-- Loading Skeletons -->
        <div
          v-if="loading"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div
            v-for="i in 6"
            :key="i"
            class="h-[180px] rounded-2xl border border-border bg-bg-card-2 animate-pulse"
          ></div>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="displayPrograms.length === 0"
          class="text-center py-16 px-4"
        >
          <div
            class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-bg-card-2 border border-border text-text-subtle mb-4"
          >
            <Icon name="material-symbols:search-off-rounded" class="text-2xl" />
          </div>
          <h3 class="text-base font-bold text-text-main m-0 mb-1">
            {{ searchQuery ? "Program tidak ditemukan" : "Belum ada program" }}
          </h3>
          <p class="text-sm text-text-muted max-w-md mx-auto m-0">
            {{
              searchQuery
                ? `Tidak ada program kerja yang cocok dengan kata kunci "${searchQuery}". Silakan coba kata kunci lain.`
                : "Tidak ada program kerja untuk filter yang sedang aktif."
            }}
          </p>
          <button
            v-if="searchQuery || filter !== 'all'"
            type="button"
            class="mt-4 inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] text-xs font-semibold text-accent bg-accent-soft border border-accent/20 rounded-xl hover:bg-accent/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            @click="
              searchQuery = '';
              filter = 'all';
            "
          >
            <Icon name="material-symbols:restart-alt-rounded" class="text-sm" />
            Reset Filter dan Pencarian
          </button>
        </div>

        <!-- Program Grid -->
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <ProgramProkerCard
            v-for="prog in displayPrograms"
            :key="prog.id"
            :prog="prog"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useProgram } from "~/composables/useProgram";

const { loading, programs, filter, filteredPrograms, loadPrograms } =
  useProgram();

const searchQuery = ref("");

const displayPrograms = computed(() => {
  const list = filteredPrograms.value;
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (p: any) =>
      (p.nama && p.nama.toLowerCase().includes(q)) ||
      (p.deskripsi && p.deskripsi.toLowerCase().includes(q)) ||
      (p.sekbid_name && p.sekbid_name.toLowerCase().includes(q)) ||
      (p.owner_id && String(p.owner_id).includes(q)),
  );
});

const programCountLabel = computed(() => {
  const total = programs.value.length;
  if (loading.value) return "Memetakan program kerja...";
  if (total === 0) return "Belum ada program tercatat";
  return `${total} program tercatat untuk kabinet 2026/2027`;
});

useSeoMeta({
  title: "Program Kerja",
  description:
    "Target capaian dan status pelaksanaan program kerja OSIS dan MPK SMAN 2 Jonggol periode 2026/2027.",
  ogTitle: "Program Kerja - OSPK Nawasena",
  ogDescription:
    "Target capaian dan status pelaksanaan program kerja OSIS dan MPK SMAN 2 Jonggol 2026/2027.",
});

onMounted(() => {
  loadPrograms();
});
</script>
