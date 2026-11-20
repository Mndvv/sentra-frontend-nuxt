<template>
  <div
    ref="el"
    class="transition-all duration-700"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
  >
    <div
      class="relative rounded-2xl bg-bg-card border border-border p-7 sm:p-10 md:p-12 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 overflow-hidden"
    >
      <!-- Ambient subtle background glow -->
      <div
        class="absolute -top-24 -right-24 w-80 h-80 bg-accent/10 rounded-full blur-[90px] pointer-events-none"
        aria-hidden="true"
      />

      <div
        class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10"
      >
        <!-- Icon & Content -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-5 max-w-[680px]"
        >
          <div
            class="w-14 h-14 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 shadow-md"
          >
            <Icon
              name="material-symbols:mark-email-unread-rounded"
              class="text-2xl"
              aria-hidden="true"
            />
          </div>

          <div>
            <div
              class="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-wider uppercase mb-1"
            >
              <span>Kanal Aspirasi Siswa</span>
              <span class="w-1 h-1 rounded-full bg-accent" />
              <span>AURORA</span>
            </div>
            <h3
              class="text-xl sm:text-2xl font-black text-text-main tracking-tight leading-snug mb-2"
            >
              Suaramu Membentuk Arah Nawasena
            </h3>
            <p class="text-text-muted text-xs sm:text-sm leading-relaxed m-0">
              Punya gagasan program baru, aspirasi, atau evaluasi demi kemajuan
              sekolah? Sampaikan secara aman dan 100% anonim. Setiap suara
              diperhatikan secara berkala oleh komisi MPK & OSIS.
            </p>
          </div>
        </div>

        <!-- Action Button -->
        <div class="shrink-0 w-full sm:w-auto">
          <button
            type="button"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-accent text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
            @click="openAurora"
          >
            <Icon
              name="material-symbols:edit-note-rounded"
              class="text-xl"
              aria-hidden="true"
            />
            <span>Sampaikan Aspirasi</span>
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
