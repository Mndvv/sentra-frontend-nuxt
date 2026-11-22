<template>
  <div
    class="min-h-screen bg-bg-primary text-text-main flex flex-col justify-between p-4 sm:p-6 lg:p-8"
  >
    <!-- Brand Top Header -->
    <header class="w-full max-w-5xl mx-auto flex items-center justify-between py-2">
      <button
        type="button"
        class="flex items-center gap-1 text-text-main font-black text-xl tracking-tight no-underline select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full py-1 transition-colors"
        aria-label="Beranda Sentra"
        @click="handleClearError"
      >
        SENTRA<span class="text-accent">.</span>
      </button>

      <button
        type="button"
        class="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-bg-card text-text-muted hover:text-text-main hover:bg-bg-card-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        :aria-label="colorMode.value === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'"
        @click="toggleTheme"
      >
        <Icon
          :name="colorMode.value === 'dark' ? 'material-symbols:light-mode-rounded' : 'material-symbols:dark-mode-rounded'"
          class="text-lg"
          aria-hidden="true"
        />
      </button>
    </header>

    <!-- Main Card -->
    <main
      class="max-w-lg w-full mx-auto my-auto bg-bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-lg text-center"
      role="alert"
      aria-live="assertive"
    >
      <!-- Badge -->
      <div
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-soft text-accent border border-accent/20 mb-6"
      >
        {{ errorInfo.badge }}
      </div>

      <!-- Status Icon -->
      <div
        class="w-14 h-14 mx-auto rounded-full bg-accent-soft border border-accent/20 flex items-center justify-center text-accent mb-5 text-2xl"
      >
        <Icon :name="errorInfo.icon" aria-hidden="true" />
      </div>

      <!-- Large Bold Status Code -->
      <h1 class="text-5xl sm:text-6xl font-black text-text-main tracking-tight mb-2">
        {{ errorInfo.code }}
      </h1>

      <!-- Title -->
      <h2 class="text-xl sm:text-2xl font-bold text-text-main mb-3 leading-snug">
        {{ errorInfo.title }}
      </h2>

      <!-- Description -->
      <p class="text-sm sm:text-base text-text-muted leading-relaxed mb-8 max-w-md mx-auto">
        {{ errorInfo.description }}
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
          @click="handleClearError"
        >
          <Icon name="material-symbols:home-rounded" class="text-lg" aria-hidden="true" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          type="button"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border bg-bg-card hover:bg-bg-card-2 text-text-main font-medium text-sm transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
          @click="handleReload"
        >
          <Icon name="material-symbols:refresh-rounded" class="text-lg" aria-hidden="true" />
          <span>Muat Ulang Halaman</span>
        </button>
      </div>

      <!-- Collapsible Technical Details -->
      <div
        v-if="hasTechnicalDetails"
        class="mt-8 pt-6 border-t border-border"
      >
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text-main transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1"
          :aria-expanded="showDetails"
          aria-controls="error-details"
          @click="showDetails = !showDetails"
        >
          <span>{{ showDetails ? "Tutup Detail Teknis" : "Lihat Detail Teknis" }}</span>
          <Icon
            :name="showDetails ? 'material-symbols:keyboard-arrow-up-rounded' : 'material-symbols:keyboard-arrow-down-rounded'"
            class="text-base"
            aria-hidden="true"
          />
        </button>

        <pre
          v-if="showDetails"
          id="error-details"
          class="mt-3 p-3 rounded-lg bg-bg-card-2 border border-border/80 text-left text-xs font-mono text-text-muted overflow-x-auto whitespace-pre-wrap break-all"
        >{{ technicalDetailsText }}</pre>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full max-w-5xl mx-auto py-4 text-center text-xs text-text-muted">
      &copy; {{ currentYear }} SENTRA. Seluruh hak cipta dilindungi.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const currentYear = new Date().getFullYear();

const statusCode = computed(() => Number(props.error?.statusCode || 404));

interface ErrorMeta {
  code: number | string;
  badge: string;
  title: string;
  description: string;
  icon: string;
}

const errorInfo = computed<ErrorMeta>(() => {
  const code = statusCode.value;

  if (code === 404) {
    return {
      code: 404,
      badge: "404 · Halaman Tidak Ditemukan",
      title: "Halaman yang Anda Cari Tidak Tersedia",
      description:
        "Alamat URL yang dimasukkan salah, tautan telah kedaluwarsa, atau konten telah dipindahkan ke direktori lain.",
      icon: "material-symbols:search-off-rounded",
    };
  }

  if (code === 500) {
    return {
      code: 500,
      badge: "500 · Gangguan Server",
      title: "Server Sedang Mengalami Kendala",
      description:
        "Terjadi gangguan teknis internal pada server SENTRA. Tim pengembang sedang menanganinya.",
      icon: "material-symbols:dns-outline-rounded",
    };
  }

  if (code === 504 || code === 408) {
    return {
      code: props.error?.statusCode || 504,
      badge: "Timeout · Batas Waktu Terlampaui",
      title: "Koneksi ke Server Terputus",
      description:
        "Permintaan membutuhkan waktu terlalu lama untuk direspons. Silakan periksa koneksi internet Anda lalu coba muat ulang.",
      icon: "material-symbols:timer-off-outline-rounded",
    };
  }

  return {
    code: props.error?.statusCode || "Error",
    badge: "Kendala Teknis",
    title: "Terjadi Kesalahan Tak Terduga",
    description: "Aplikasi menemui kendala saat memuat permintaan Anda.",
    icon: "material-symbols:error-outline-rounded",
  };
});

const showDetails = ref(false);

const hasTechnicalDetails = computed(() => {
  return Boolean(props.error?.message || props.error?.statusMessage);
});

const technicalDetailsText = computed(() => {
  const lines: string[] = [];
  lines.push(`Status Code: ${props.error?.statusCode || 404}`);
  if (props.error?.statusMessage) {
    lines.push(`Status Message: ${props.error.statusMessage}`);
  }
  if (props.error?.message && props.error.message !== props.error?.statusMessage) {
    lines.push(`Message: ${props.error.message}`);
  }
  return lines.join("\n");
});

const handleClearError = () => {
  clearError({ redirect: "/" });
};

const handleReload = () => {
  if (import.meta.client) {
    window.location.reload();
  }
};

useSeoMeta({
  title: computed(() => `${errorInfo.value.code} · ${errorInfo.value.title}`),
  description: computed(() => errorInfo.value.description),
});
</script>
