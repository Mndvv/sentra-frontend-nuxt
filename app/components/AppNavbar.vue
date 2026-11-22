<template>
  <header
    class="sticky top-0 z-[100] w-full h-16 bg-bg-card/98 backdrop-blur-md border-b border-border shadow-xs transition-colors duration-200"
  >
    <div
      class="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between"
    >
      <!-- Brand -->
      <NuxtLink
        to="/"
        class="flex items-center gap-1 text-text-main font-black text-xl tracking-tight no-underline select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full py-1"
        aria-label="Beranda Sentra"
      >
        SENTRA<span class="text-accent">.</span>
      </NuxtLink>

      <!-- Desktop Nav Links -->
      <nav
        class="hidden md:flex items-center gap-1"
        aria-label="Navigasi utama"
      >
        <NuxtLink
          to="/"
          exact-active-class="!bg-accent-soft !text-accent font-semibold"
          class="text-text-muted hover:text-text-main hover:bg-bg-card-2 px-3.5 py-1.5 rounded-full text-[0.82rem] transition-colors no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent font-medium"
        >
          Beranda
        </NuxtLink>
        <NuxtLink
          to="/struktur"
          active-class="!bg-accent-soft !text-accent font-semibold"
          class="text-text-muted hover:text-text-main hover:bg-bg-card-2 px-3.5 py-1.5 rounded-full text-[0.82rem] transition-colors no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent font-medium"
        >
          Struktur
        </NuxtLink>
        <NuxtLink
          to="/program"
          active-class="!bg-accent-soft !text-accent font-semibold"
          class="text-text-muted hover:text-text-main hover:bg-bg-card-2 px-3.5 py-1.5 rounded-full text-[0.82rem] transition-colors no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent font-medium"
        >
          Program
        </NuxtLink>
        <NuxtLink
          to="/dokumentasi"
          active-class="!bg-accent-soft !text-accent font-semibold"
          class="text-text-muted hover:text-text-main hover:bg-bg-card-2 px-3.5 py-1.5 rounded-full text-[0.82rem] transition-colors no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent font-medium"
        >
          Dokumentasi
        </NuxtLink>
        <NuxtLink
          to="/sponsor"
          active-class="!bg-accent-soft !text-accent font-semibold"
          class="text-text-muted hover:text-text-main hover:bg-bg-card-2 px-3.5 py-1.5 rounded-full text-[0.82rem] transition-colors no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent font-medium"
        >
          Sponsorship
        </NuxtLink>
        <NuxtLink
          to="/hof"
          active-class="!bg-accent-soft !text-accent font-semibold"
          class="text-text-muted hover:text-text-main hover:bg-bg-card-2 px-3.5 py-1.5 rounded-full text-[0.82rem] transition-colors no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent font-medium"
        >
          Hall of Fame
        </NuxtLink>
        <button
          type="button"
          class="text-text-muted hover:text-text-main hover:bg-bg-card-2 px-3.5 py-1.5 rounded-full text-[0.82rem] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer border-none bg-transparent font-medium"
          :class="{
            '!bg-accent-soft !text-accent font-semibold': isAuroraOpen,
          }"
          @click="openAurora"
        >
          Aspirasi
        </button>
      </nav>

      <!-- Right Actions -->
      <div class="flex items-center gap-2">
        <!-- Theme Toggle -->
        <button
          type="button"
          class="relative w-9 h-9 rounded-full flex items-center justify-center p-2 hover:bg-bg-card-2 text-text-muted hover:text-text-main transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer border border-border/60 bg-bg-card"
          @click="toggleTheme"
          aria-label="Ganti mode tema"
        >
          <Icon
            :name="
              colorMode.value === 'dark'
                ? 'material-symbols:light-mode-outline'
                : 'material-symbols:dark-mode-outline'
            "
            size="18"
          />
        </button>

        <!-- Mobile Hamburger Button -->
        <button
          type="button"
          class="md:hidden relative w-9 h-9 rounded-full flex items-center justify-center p-2 hover:bg-bg-card-2 text-text-muted hover:text-text-main transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer border border-border/60 bg-bg-card"
          @click="isMenuOpen = !isMenuOpen"
          aria-label="Menu navigasi"
          :aria-expanded="isMenuOpen"
        >
          <div
            class="w-5 h-4 flex flex-col justify-between items-center"
            aria-hidden="true"
          >
            <span
              class="w-5 h-[2px] bg-text-main rounded-full transition-transform duration-300 origin-center"
              :class="{ 'rotate-45 translate-y-[7px]': isMenuOpen }"
            />
            <span
              class="w-5 h-[2px] bg-text-main rounded-full transition-opacity duration-200"
              :class="{ 'opacity-0': isMenuOpen }"
            />
            <span
              class="w-5 h-[2px] bg-text-main rounded-full transition-transform duration-300 origin-center"
              :class="{ '-rotate-45 -translate-y-[7px]': isMenuOpen }"
            />
          </div>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Off-Canvas Smart Sidebar -->
  <Teleport to="body">
    <!-- Backdrop -->
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-xs z-[998] md:hidden transition-opacity"
      @click="closeMenu"
      aria-hidden="true"
    />

    <!-- Slide-in Drawer -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-250 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <aside
        v-if="isMenuOpen"
        class="fixed inset-y-0 right-0 w-[300px] max-w-[85vw] h-[100dvh] bg-bg-card/95 backdrop-blur-lg border-l border-border shadow-2xl flex flex-col z-[999] md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi mobile"
      >
        <!-- Drawer Header -->
        <div
          class="h-16 px-4 flex items-center justify-between border-b border-border shrink-0"
        >
          <NuxtLink
            to="/"
            class="flex items-center gap-1 text-text-main font-black text-xl tracking-tight no-underline select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full py-1"
            aria-label="Beranda Sentra"
            @click="closeMenu"
          >
            SENTRA<span class="text-accent">.</span>
          </NuxtLink>

          <button
            type="button"
            class="relative w-9 h-9 rounded-full flex items-center justify-center p-2 hover:bg-bg-card-2 text-text-muted hover:text-text-main transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer border border-border/60 bg-bg-card"
            @click="closeMenu"
            aria-label="Tutup menu"
          >
            <Icon name="material-symbols:close-rounded" size="20" />
          </button>
        </div>

        <!-- Main Nav list -->
        <nav
          class="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1.5"
          aria-label="Daftar tautan menu mobile"
        >
          <NuxtLink
            to="/"
            exact-active-class="!bg-accent-soft !text-accent font-semibold"
            class="min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-text-main hover:bg-bg-card-2 transition-colors no-underline"
            @click="closeMenu"
          >
            <Icon
              name="material-symbols:home-outline-rounded"
              size="20"
              class="shrink-0"
            />
            <span>Beranda</span>
          </NuxtLink>

          <NuxtLink
            to="/struktur"
            active-class="!bg-accent-soft !text-accent font-semibold"
            class="min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-text-main hover:bg-bg-card-2 transition-colors no-underline"
            @click="closeMenu"
          >
            <Icon
              name="material-symbols:account-tree-outline-rounded"
              size="20"
              class="shrink-0"
            />
            <span>Struktur</span>
          </NuxtLink>

          <NuxtLink
            to="/program"
            active-class="!bg-accent-soft !text-accent font-semibold"
            class="min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-text-main hover:bg-bg-card-2 transition-colors no-underline"
            @click="closeMenu"
          >
            <Icon
              name="material-symbols:event-note-outline-rounded"
              size="20"
              class="shrink-0"
            />
            <span>Program</span>
          </NuxtLink>

          <NuxtLink
            to="/dokumentasi"
            active-class="!bg-accent-soft !text-accent font-semibold"
            class="min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-text-main hover:bg-bg-card-2 transition-colors no-underline"
            @click="closeMenu"
          >
            <Icon
              name="material-symbols:photo-library-outline-rounded"
              size="20"
              class="shrink-0"
            />
            <span>Dokumentasi</span>
          </NuxtLink>

          <NuxtLink
            to="/sponsor"
            active-class="!bg-accent-soft !text-accent font-semibold"
            class="min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-text-main hover:bg-bg-card-2 transition-colors no-underline"
            @click="closeMenu"
          >
            <Icon
              name="material-symbols:handshake-outline-rounded"
              size="20"
              class="shrink-0"
            />
            <span>Sponsorship</span>
          </NuxtLink>

          <NuxtLink
            to="/hof"
            active-class="!bg-accent-soft !text-accent font-semibold"
            class="min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-text-main hover:bg-bg-card-2 transition-colors no-underline"
            @click="closeMenu"
          >
            <Icon
              name="material-symbols:auto-awesome-outline-rounded"
              size="20"
              class="shrink-0"
            />
            <span>Hall of Fame</span>
          </NuxtLink>
        </nav>

        <!-- Smart Footer inside drawer -->
        <div
          class="p-4 border-t border-border flex flex-col gap-2.5 bg-bg-card-2/50 shrink-0"
        >
          <!-- Aspirasi button -->
          <button
            type="button"
            class="min-h-[44px] w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-accent-soft text-accent border border-accent/20 hover:bg-accent hover:text-white transition-all cursor-pointer"
            @click="openAurora"
          >
            <Icon
              name="material-symbols:chat-bubble-outline-rounded"
              size="18"
            />
            <span>Aspirasi Nawasena</span>
          </button>

          <!-- Theme switch row -->
          <button
            type="button"
            class="min-h-[44px] w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-text-main hover:bg-bg-card border border-border/60 transition-colors cursor-pointer"
            @click="toggleTheme"
            :aria-label="
              colorMode.value === 'dark'
                ? 'Ganti ke Mode Terang'
                : 'Ganti ke Mode Gelap'
            "
          >
            <div class="flex items-center gap-2.5">
              <Icon
                :name="
                  colorMode.value === 'dark'
                    ? 'material-symbols:dark-mode-outline'
                    : 'material-symbols:light-mode-outline'
                "
                size="18"
              />
              <span>{{
                colorMode.value === "dark" ? "Mode Gelap" : "Mode Terang"
              }}</span>
            </div>
            <span class="text-xs text-text-muted font-normal">Ubah</span>
          </button>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

const colorMode = useColorMode();
const route = useRoute();

const isMenuOpen = ref(false);
const isAuroraOpen = useState("isAuroraOpen", () => false);

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const openAurora = () => {
  isAuroraOpen.value = true;
  closeMenu();
};

// Close mobile menu on Escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isMenuOpen.value) {
    closeMenu();
  }
};

// Close mobile menu on route change
watch(
  () => route.path,
  () => {
    closeMenu();
  },
);

// Body scroll locking
watch(isMenuOpen, (isOpen) => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }
});

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
});
</script>
