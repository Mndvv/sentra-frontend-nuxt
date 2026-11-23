<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[2000] flex items-start justify-center p-3 sm:p-4 md:p-6 pt-[10vh] sm:pt-[12vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
        @keydown="onKeyDown"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          aria-hidden="true"
          @click="close"
        />

        <!-- Palette Card -->
        <div
          class="relative w-full max-w-[620px] bg-bg-card/98 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[82vh] sm:max-h-[75vh]"
        >
          <h2 id="command-palette-title" class="sr-only">
            Pencarian Cepat SENTRA
          </h2>

          <!-- Search Input Bar -->
          <div
            class="relative flex items-center px-4 py-3.5 border-b border-border/80 gap-3 bg-bg-card"
          >
            <Icon
              name="material-symbols:search-rounded"
              class="text-xl text-text-muted shrink-0"
              aria-hidden="true"
            />
            <input
              ref="inputRef"
              v-model="searchQuery"
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-autocomplete="list"
              aria-controls="command-palette-results"
              placeholder="Cari halaman, program kerja, pengurus, atau dokumentasi..."
              class="w-full bg-transparent text-text-main placeholder:text-text-subtle text-sm sm:text-base font-medium focus:outline-none focus:ring-0 border-none"
              @keydown="onKeyDown"
            />
            <button
              v-if="searchQuery"
              type="button"
              class="text-text-subtle hover:text-text-main p-1 rounded-md transition-colors cursor-pointer"
              aria-label="Hapus kata kunci"
              @click="clearQuery"
            >
              <Icon
                name="material-symbols:close-rounded"
                class="text-base"
                aria-hidden="true"
              />
            </button>
            <kbd
              class="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-bg-card-2 border border-border text-[0.68rem] font-mono font-semibold text-text-muted select-none"
            >
              ESC
            </kbd>
          </div>

          <!-- Results / Suggestions Container -->
          <div
            id="command-palette-results"
            ref="resultsContainerRef"
            class="flex-1 overflow-y-auto p-2 sm:p-3 space-y-4"
            role="listbox"
          >
            <!-- Empty State (No match found) -->
            <div
              v-if="flattenedItems.length === 0"
              class="py-12 px-4 text-center"
            >
              <div
                class="w-12 h-12 rounded-full bg-bg-card-2 border border-border flex items-center justify-center mx-auto mb-3 text-text-subtle"
              >
                <Icon
                  name="material-symbols:search-off-rounded"
                  class="text-2xl"
                  aria-hidden="true"
                />
              </div>
              <p class="text-sm font-semibold text-text-main m-0">
                Tidak ada hasil untuk "{{ searchQuery }}"
              </p>
              <p
                class="text-xs text-text-muted mt-1.5 max-w-[340px] mx-auto leading-relaxed"
              >
                Coba gunakan kata kunci lain seperti nama divisi, pengurus, atau
                judul program kerja.
              </p>
            </div>

            <!-- Grouped Results -->
            <div
              v-for="group in groupedResults"
              :key="group.category"
              class="space-y-1"
            >
              <!-- Group Header -->
              <div
                class="px-2.5 py-1 flex items-center justify-between text-[0.7rem] font-bold tracking-wider uppercase text-text-subtle"
              >
                <span>{{ group.category }}</span>
                <span class="text-[0.65rem] font-mono"
                  >{{ group.items.length }} hasil</span
                >
              </div>

              <!-- Items -->
              <button
                v-for="item in group.items"
                :id="'cmd-item-' + getItemIndex(item)"
                :key="item.id"
                type="button"
                role="option"
                :aria-selected="selectedIndex === getItemIndex(item)"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer border"
                :class="[
                  selectedIndex === getItemIndex(item)
                    ? 'bg-accent-soft border-accent/30 text-text-main'
                    : 'bg-transparent border-transparent hover:bg-bg-card-2 text-text-muted hover:text-text-main',
                ]"
                @click="executeItem(item)"
                @mouseenter="selectedIndex = getItemIndex(item)"
              >
                <!-- Icon Avatar -->
                <div
                  class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                  :class="[
                    selectedIndex === getItemIndex(item)
                      ? 'bg-accent text-white shadow-xs'
                      : 'bg-bg-card-2 border border-border text-text-muted',
                  ]"
                >
                  <Icon :name="item.icon" class="text-lg" aria-hidden="true" />
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <span
                      class="text-xs sm:text-sm font-semibold truncate text-text-main"
                    >
                      {{ item.title }}
                    </span>
                    <span
                      v-if="item.badge"
                      class="text-[0.65rem] font-medium px-1.5 py-0.5 rounded-md bg-bg-card-2 border border-border/80 text-text-muted shrink-0"
                    >
                      {{ item.badge }}
                    </span>
                  </div>
                  <p
                    v-if="item.subtitle"
                    class="text-[0.72rem] text-text-muted truncate m-0 mt-0.5"
                  >
                    {{ item.subtitle }}
                  </p>
                </div>

                <!-- Action Indicator -->
                <Icon
                  name="material-symbols:arrow-forward-rounded"
                  class="text-sm shrink-0 transition-transform"
                  :class="[
                    selectedIndex === getItemIndex(item)
                      ? 'text-accent translate-x-0.5 opacity-100'
                      : 'text-text-subtle opacity-0',
                  ]"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <!-- Footer Shortcuts -->
          <div
            class="px-4 py-2.5 border-t border-border/80 bg-bg-card-2/60 flex items-center justify-between text-[0.7rem] text-text-subtle"
          >
            <div class="flex items-center gap-3">
              <span class="inline-flex items-center gap-1">
                <kbd
                  class="px-1 py-0.5 rounded bg-bg-card border border-border font-mono text-[0.62rem]"
                  >↑</kbd
                >
                <kbd
                  class="px-1 py-0.5 rounded bg-bg-card border border-border font-mono text-[0.62rem]"
                  >↓</kbd
                >
                <span>Navigasi</span>
              </span>
              <span class="inline-flex items-center gap-1">
                <kbd
                  class="px-1.5 py-0.5 rounded bg-bg-card border border-border font-mono text-[0.62rem]"
                  >↵</kbd
                >
                <span>Pilih</span>
              </span>
              <span class="inline-flex items-center gap-1">
                <kbd
                  class="px-1.5 py-0.5 rounded bg-bg-card border border-border font-mono text-[0.62rem]"
                  >Esc</kbd
                >
                <span>Tutup</span>
              </span>
            </div>

            <span class="hidden sm:inline font-mono text-[0.65rem]">
              SENTRA Command
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useProgram } from "~/composables/useProgram";
import { useDokumentasi } from "~/composables/useDokumentasi";
import { useApi } from "~/composables/useApi";

interface SearchItem {
  id: string;
  category: "Halaman" | "Program Kerja" | "Pengurus" | "Dokumentasi";
  title: string;
  subtitle?: string;
  badge?: string;
  icon: string;
  to?: string;
  action?: () => void;
}

const router = useRouter();
const isOpen = useState("isCommandPaletteOpen", () => false);
const isAuroraOpen = useState("isAuroraOpen", () => false);

const inputRef = ref<HTMLInputElement | null>(null);
const searchQuery = ref("");
const selectedIndex = ref(0);

const { programs, loadPrograms } = useProgram();
const { dokumentasi, loadDokumentasiData } = useDokumentasi();
const { fetchPengurus } = useApi();
const pengurusList = ref<any[]>([]);

let _pengurusLoaded = false;

const loadAllData = async () => {
  try {
    const promises: Promise<any>[] = [loadPrograms(), loadDokumentasiData()];
    if (!_pengurusLoaded) {
      promises.push(
        fetchPengurus().then((res: any) => {
          if (Array.isArray(res)) {
            pengurusList.value = res;
            _pengurusLoaded = true;
          }
        }),
      );
    }
    await Promise.all(promises);
  } catch (err) {
    console.error("Failed to load command palette data:", err);
  }
};

const staticPages: SearchItem[] = [
  {
    id: "page-home",
    category: "Halaman",
    title: "Beranda",
    subtitle: "Halaman utama portal resmi SENTRA",
    icon: "material-symbols:home-outline-rounded",
    to: "/",
  },
  {
    id: "page-struktur",
    category: "Halaman",
    title: "Struktur Organisasi",
    subtitle: "Pengurus inti dan seksi bidang OSIS & MPK Nawasena",
    icon: "material-symbols:account-tree-outline-rounded",
    to: "/struktur",
  },
  {
    id: "page-program",
    category: "Halaman",
    title: "Program Kerja",
    subtitle: "Inisiatif, target capaian, dan agenda kegiatan",
    icon: "material-symbols:event-note-outline-rounded",
    to: "/program",
  },
  {
    id: "page-dokumentasi",
    category: "Halaman",
    title: "Dokumentasi",
    subtitle: "Galeri arsip liputan dan foto kegiatan sekolah",
    icon: "material-symbols:photo-library-outline-rounded",
    to: "/dokumentasi",
  },
  {
    id: "page-sponsor",
    category: "Halaman",
    title: "Sponsorship",
    subtitle: "Paket kemitraan dan kolaborasi resmi",
    icon: "material-symbols:handshake-outline-rounded",
    to: "/sponsor",
  },
  {
    id: "page-hof",
    category: "Halaman",
    title: "Hall of Fame",
    subtitle: "Demisioner dan jejak kepengurusan terdahulu",
    icon: "material-symbols:auto-awesome-outline-rounded",
    to: "/hof",
  },
  {
    id: "page-aurora",
    category: "Halaman",
    title: "Aspirasi Nawasena",
    subtitle: "Kirim masukan atau aspirasi via kotak suara AURORA",
    icon: "material-symbols:chat-bubble-outline-rounded",
    action: () => {
      isAuroraOpen.value = true;
    },
  },
];

const groupedResults = computed(() => {
  const groups: { category: string; items: SearchItem[] }[] = [];
  const q = searchQuery.value.trim().toLowerCase();

  // 1. Halaman
  const matchedPages = staticPages.filter((p) => {
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
      (p.to && p.to.toLowerCase().includes(q))
    );
  });
  if (matchedPages.length > 0) {
    groups.push({ category: "Halaman", items: matchedPages });
  }

  if (q) {
    // 2. Program Kerja
    const matchedProker: SearchItem[] = [];
    for (const p of programs.value || []) {
      const nama = String(p.nama || "");
      const sekbid = String(p.sekbid || "");
      const ket = String(p.ket || p.deskripsi || "");
      if (
        nama.toLowerCase().includes(q) ||
        sekbid.toLowerCase().includes(q) ||
        ket.toLowerCase().includes(q)
      ) {
        matchedProker.push({
          id: `proker-${p.id ?? nama}`,
          category: "Program Kerja",
          title: nama,
          subtitle: sekbid
            ? `${sekbid} · ${ket || "Program Kerja"}`
            : ket || "Program Kerja Nawasena",
          badge: p.status || "Direncanakan",
          icon: "material-symbols:event-note-outline-rounded",
          to: "/program",
        });
        if (matchedProker.length >= 6) break;
      }
    }
    if (matchedProker.length > 0) {
      groups.push({ category: "Program Kerja", items: matchedProker });
    }

    // 3. Pengurus & Sekbid
    const matchedPengurus: SearchItem[] = [];
    for (const p of pengurusList.value || []) {
      const nama = String(p.nama || "");
      const jabatan = String(p.jabatan || "");
      const divisi = String(
        p.divisi || p.sekbid_name || p.komisi || p.sekbid_role || "",
      );
      if (
        nama.toLowerCase().includes(q) ||
        jabatan.toLowerCase().includes(q) ||
        divisi.toLowerCase().includes(q)
      ) {
        const orgLabel = (p.org || p.organisasi || "OSIS").toUpperCase();
        matchedPengurus.push({
          id: `pengurus-${p.id ?? nama}`,
          category: "Pengurus",
          title: nama,
          subtitle:
            [jabatan, divisi].filter(Boolean).join(" · ") ||
            "Pengurus Nawasena",
          badge: orgLabel,
          icon: "material-symbols:person-outline-rounded",
          to: "/struktur",
        });
        if (matchedPengurus.length >= 6) break;
      }
    }
    if (matchedPengurus.length > 0) {
      groups.push({ category: "Pengurus", items: matchedPengurus });
    }

    // 4. Dokumentasi
    const matchedDokum: SearchItem[] = [];
    for (const d of dokumentasi.value || []) {
      const judul = String(d.judul || "");
      const kegiatan = String(d.kegiatan || "");
      const deskripsi = String(d.deskripsi || "");
      if (
        judul.toLowerCase().includes(q) ||
        kegiatan.toLowerCase().includes(q) ||
        deskripsi.toLowerCase().includes(q)
      ) {
        matchedDokum.push({
          id: `dokum-${d.id ?? d.slug ?? judul}`,
          category: "Dokumentasi",
          title: judul || kegiatan,
          subtitle:
            kegiatan && kegiatan !== judul
              ? kegiatan
              : d.tanggal || "Dokumentasi Kegiatan",
          badge: d.kategori || "Dokumentasi",
          icon: "material-symbols:photo-library-outline-rounded",
          to: d.slug ? `/dokumentasi/${d.slug}` : "/dokumentasi",
        });
        if (matchedDokum.length >= 6) break;
      }
    }
    if (matchedDokum.length > 0) {
      groups.push({ category: "Dokumentasi", items: matchedDokum });
    }
  }

  return groups;
});

const flattenedItems = computed(() => {
  return groupedResults.value.flatMap((g) => g.items);
});

const itemIndexMap = computed(() => {
  const map = new Map<string, number>();
  flattenedItems.value.forEach((item, index) => {
    map.set(item.id, index);
  });
  return map;
});

const getItemIndex = (item: SearchItem): number => {
  return itemIndexMap.value.get(item.id) ?? 0;
};

const close = () => {
  isOpen.value = false;
};

const clearQuery = () => {
  searchQuery.value = "";
  selectedIndex.value = 0;
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const executeItem = (item?: SearchItem) => {
  if (!item) return;
  close();
  if (item.action) {
    item.action();
  } else if (item.to) {
    router.push(item.to);
  }
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (flattenedItems.value.length > 0) {
      selectedIndex.value =
        (selectedIndex.value + 1) % flattenedItems.value.length;
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (flattenedItems.value.length > 0) {
      selectedIndex.value =
        (selectedIndex.value - 1 + flattenedItems.value.length) %
        flattenedItems.value.length;
    }
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (
      flattenedItems.value.length > 0 &&
      selectedIndex.value < flattenedItems.value.length
    ) {
      executeItem(flattenedItems.value[selectedIndex.value]);
    }
  } else if (e.key === "Escape") {
    e.preventDefault();
    close();
  }
};

watch(searchQuery, () => {
  selectedIndex.value = 0;
});

watch(selectedIndex, (idx) => {
  nextTick(() => {
    const el = document.getElementById(`cmd-item-${idx}`);
    if (el) {
      el.scrollIntoView({ block: "nearest" });
    }
  });
});

watch(isOpen, (val) => {
  if (val) {
    searchQuery.value = "";
    selectedIndex.value = 0;
    loadAllData();
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
  if (import.meta.client) {
    document.body.style.overflow = val ? "hidden" : "";
  }
});

onMounted(() => {
  if (import.meta.client) {
    loadAllData();
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = "";
  }
});
</script>
