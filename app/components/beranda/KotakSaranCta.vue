<template>
  <div
    ref="el"
    class="transition-all duration-700"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
  >
    <div
      class="relative rounded-2xl bg-bg-card border border-border p-6 sm:p-8 md:p-10 shadow-xs hover:border-accent/40 transition-all duration-200"
    >
      <div
        class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8"
      >
        <!-- Icon & Content -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 max-w-[680px]"
        >
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent text-white flex items-center justify-center shrink-0"
          >
            <Icon
              name="material-symbols:mark-email-unread-rounded"
              class="text-2xl"
              aria-hidden="true"
            />
          </div>

          <div>
            <span
              class="block text-accent text-xs font-bold uppercase tracking-wider mb-1"
            >
              Kotak Aspirasi Siswa (AURORA)
            </span>
            <h3
              class="text-xl sm:text-2xl font-black text-text-main tracking-tight leading-snug mb-1.5"
            >
              Punya Saran atau Masukan untuk Sekolah?
            </h3>
            <p class="text-text-muted text-xs sm:text-sm leading-relaxed m-0">
              Tulis usulan kegiatan, kritik fasilitas, atau aspirasi langsung ke
              pengurus OSIS dan MPK. Bisa dikirim secara anonim tanpa
              menyertakan nama.
            </p>
          </div>
        </div>

        <!-- Action Button -->
        <div class="shrink-0 w-full sm:w-auto">
          <button
            type="button"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-150 hover:bg-accent-hover hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
            @click="openAurora"
          >
            <Icon
              name="material-symbols:edit-note-rounded"
              class="text-xl"
              aria-hidden="true"
            />
            <span>Tulis Masukan</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { el, isVisible } = useScrollReveal();
const isAuroraOpen = useState("isAuroraOpen", () => false);

const openAurora = () => {
  isAuroraOpen.value = true;
};
</script>
