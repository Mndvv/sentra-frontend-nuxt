<template>
  <main class="max-w-[1120px] mx-auto pt-8 md:pt-10 pb-16 px-4 sm:px-6 lg:px-8">
    <!-- ── Masthead ─────────────────────────────────────── -->
    <header class="mb-8 md:mb-10">
      <h1
        class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-text-main m-0 leading-tight"
      >
        Rekam Jejak <span class="text-accent">Nawasena</span>
      </h1>
      <p
        class="text-base sm:text-lg text-text-muted mt-3 mb-4 max-w-2xl leading-relaxed"
      >
        Galeri dokumentasi kegiatan dan arsip memori perjalanan kepengurusan
        OSIS dan MPK SMAN 2 Jonggol.
      </p>
      <div
        v-if="!loading && dokumentasi.length"
        class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-bg-card-2 border border-border text-text-muted tabular-nums"
      >
        <span>{{ dokumentasi.length }} kegiatan</span>
        <span aria-hidden="true" class="text-text-subtle">·</span>
        <span>{{ totalPhotos }} foto terdokumentasi</span>
      </div>
    </header>

    <!-- ── Controls Toolbar ─────────────────────────────── -->
    <div
      v-if="!loading && dokumentasi.length > 0"
      class="sticky top-16 z-20 bg-bg-primary py-3 mb-8 border-b border-border/80"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4"
      >
        <!-- Tag pills list -->
        <div
          class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap"
          role="group"
          aria-label="Saring kegiatan berdasarkan tag"
        >
          <button
            type="button"
            class="min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent whitespace-nowrap"
            :class="
              activeTag === null
                ? 'bg-accent text-white shadow-sm font-semibold'
                : 'bg-bg-card text-text-muted hover:text-text-main hover:bg-bg-card-2 border border-border font-medium'
            "
            :aria-pressed="activeTag === null"
            @click="activeTag = null"
          >
            Semua
          </button>
          <button
            v-for="tag in tags"
            :key="tag"
            type="button"
            class="min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent whitespace-nowrap"
            :class="
              activeTag === tag
                ? 'bg-accent text-white shadow-sm font-semibold'
                : 'bg-bg-card text-text-muted hover:text-text-main hover:bg-bg-card-2 border border-border font-medium'
            "
            :aria-pressed="activeTag === tag"
            @click="activeTag = tag"
          >
            {{ tag }}
          </button>
        </div>

        <!-- Live Search Input -->
        <div class="w-full sm:w-64 relative shrink-0">
          <Icon
            name="material-symbols:search-rounded"
            class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-lg pointer-events-none"
            aria-hidden="true"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari dokumentasi..."
            class="w-full min-h-[44px] pl-10 pr-10 py-2 text-xs sm:text-sm bg-bg-card border border-border rounded-full text-text-main placeholder:text-text-muted focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent transition-colors"
            aria-label="Cari dokumentasi kegiatan"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="absolute right-1 top-1/2 -translate-y-1/2 min-w-[36px] min-h-[36px] flex items-center justify-center text-text-muted hover:text-text-main rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            aria-label="Hapus kata kunci pencarian"
            @click="searchQuery = ''"
          >
            <Icon name="material-symbols:close-rounded" class="text-base" />
          </button>
        </div>
      </div>
    </div>

    <!-- ── Loading Skeleton ─────────────────────────────── -->
    <div
      v-if="loading"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      role="status"
      aria-live="polite"
    >
      <span class="sr-only">Memuat dokumentasi...</span>
      <div
        v-for="i in 6"
        :key="i"
        class="rounded-2xl border border-border bg-bg-card overflow-hidden animate-pulse flex flex-col"
        :class="
          i === 1
            ? 'col-span-full lg:flex-row lg:min-h-[320px]'
            : 'min-h-[360px]'
        "
        aria-hidden="true"
      >
        <div
          class="bg-bg-card-2 shrink-0"
          :class="
            i === 1
              ? 'aspect-[16/10] lg:w-1/2 lg:aspect-auto'
              : 'aspect-[16/10]'
          "
        />
        <div class="p-5 flex-1 flex flex-col justify-between gap-3">
          <div class="space-y-3">
            <div class="h-3 w-28 bg-border/60 rounded" />
            <div class="h-6 w-3/4 bg-border/60 rounded" />
            <div class="space-y-1.5">
              <div class="h-3.5 w-full bg-border/40 rounded" />
              <div class="h-3.5 w-4/5 bg-border/40 rounded" />
            </div>
          </div>
          <div class="h-4 w-28 bg-border/40 rounded pt-2" />
        </div>
      </div>
    </div>

    <!-- ── Empty State ──────────────────────────────────── -->
    <div
      v-else-if="filtered.length === 0"
      class="py-16 px-4 text-center max-w-md mx-auto flex flex-col items-center"
    >
      <div
        class="w-14 h-14 rounded-2xl bg-bg-card border border-border flex items-center justify-center text-text-muted mb-4 shadow-xs"
        aria-hidden="true"
      >
        <Icon
          :name="
            isSearchingOrFiltered
              ? 'material-symbols:search-off-rounded'
              : 'material-symbols:folder-open-rounded'
          "
          class="text-2xl"
        />
      </div>
      <h2 class="text-lg sm:text-xl font-bold text-text-main mb-2">
        {{
          isSearchingOrFiltered
            ? "Tidak ada kegiatan yang sesuai"
            : "Belum ada dokumentasi"
        }}
      </h2>
      <p class="text-sm text-text-muted leading-relaxed mb-6">
        {{
          searchQuery && activeTag
            ? `Tidak ada kegiatan berlabel "${activeTag}" yang cocok dengan pencarian "${searchQuery}".`
            : searchQuery
              ? `Tidak ada kegiatan yang cocok dengan kata kunci "${searchQuery}".`
              : activeTag
                ? `Belum ada kegiatan dengan label "${activeTag}".`
                : "Dokumentasi kegiatan Nawasena akan segera ditampilkan di sini."
        }}
      </p>
      <button
        v-if="isSearchingOrFiltered"
        type="button"
        class="min-h-[44px] px-5 py-2.5 rounded-xl bg-bg-card hover:bg-bg-card-2 border border-border text-text-main hover:text-accent text-sm font-semibold transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent inline-flex items-center gap-2 cursor-pointer"
        @click="resetFilters"
      >
        <Icon name="material-symbols:restart-alt-rounded" class="text-lg" />
        Tampilkan semua kegiatan
      </button>
    </div>

    <!-- ── Archive Gallery ──────────────────────────────── -->
    <div v-else class="space-y-12">
      <section
        v-for="(group, gi) in groups"
        :key="group.year || 'arsip'"
        class="space-y-6"
      >
        <div class="flex items-center gap-3 sm:gap-4">
          <h2
            class="text-xl sm:text-2xl font-black text-text-main tracking-tight m-0 tabular-nums"
          >
            {{ group.year || "Arsip" }}
          </h2>
          <div class="flex-1 h-px bg-border" aria-hidden="true" />
          <span
            class="text-xs font-bold uppercase tracking-wider text-text-muted tabular-nums"
          >
            {{ group.items.length }} kegiatan
          </span>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          <DokumGalleryCard
            v-for="(ev, i) in group.items"
            :key="ev.id"
            :ev="ev"
            :is-featured="!isSearchingOrFiltered && gi === 0 && i === 0"
            :delay="Math.min(i, 5) * 70"
          />
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { yearOf } from "~/utils/formatDate";

definePageMeta({
  pageTransition: { name: "article-slide", mode: "out-in" },
});

const { loading, dokumentasi, loadDokumentasiData } = useDokumentasi();

const activeTag = ref<string | null>(null);
const searchQuery = ref("");

const isSearchingOrFiltered = computed(
  () => activeTag.value !== null || !!searchQuery.value.trim(),
);

const resetFilters = () => {
  activeTag.value = null;
  searchQuery.value = "";
};

const totalPhotos = computed(() =>
  dokumentasi.value.reduce(
    (sum: number, ev: any) => sum + (ev.images?.length || 0),
    0,
  ),
);

/** Distinct tags present in the dokumentasi list, alphabetised */
const tags = computed(() => {
  const seen = new Set<string>();
  for (const ev of dokumentasi.value) {
    const t = String(ev?.tag_text || "").trim();
    if (t) seen.add(t);
  }
  return Array.from(seen).sort((a, b) => a.localeCompare(b, "id"));
});

/** Sorted by start_date descending */
const sorted = computed(() =>
  [...dokumentasi.value].sort((a, b) =>
    String(b?.start_date || "").localeCompare(String(a?.start_date || "")),
  ),
);

/** Filtered by activeTag and searchQuery */
const filtered = computed(() => {
  let list = sorted.value;
  if (activeTag.value !== null) {
    const wanted = activeTag.value.toLowerCase();
    list = list.filter(
      (ev) =>
        String(ev?.tag_text || "")
          .trim()
          .toLowerCase() === wanted,
    );
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    list = list.filter((ev) => {
      const title = String(ev?.title || "").toLowerCase();
      const desc = String(ev?.description || "").toLowerCase();
      const tag = String(ev?.tag_text || "").toLowerCase();
      return title.includes(q) || desc.includes(q) || tag.includes(q);
    });
  }
  return list;
});

interface YearGroup {
  year: string;
  items: any[];
}

/** Groups the visible entries by year of start_date */
const groups = computed<YearGroup[]>(() => {
  const out: YearGroup[] = [];
  const index = new Map<string, YearGroup>();
  for (const ev of filtered.value) {
    const y = yearOf(ev?.start_date);
    let group = index.get(y);
    if (!group) {
      group = { year: y, items: [] };
      index.set(y, group);
      out.push(group);
    }
    group.items.push(ev);
  }
  return out;
});

useSeoMeta({
  title: "Dokumentasi - OSIS Nawasena",
  description:
    "Galeri dokumentasi kegiatan dan arsip memori perjalanan kepengurusan OSIS dan MPK SMAN 2 Jonggol.",
  ogTitle: "Dokumentasi - OSIS Nawasena",
  ogDescription:
    "Galeri dokumentasi kegiatan dan arsip memori perjalanan kepengurusan OSIS dan MPK SMAN 2 Jonggol.",
});

onMounted(() => {
  loadDokumentasiData();
});
</script>
