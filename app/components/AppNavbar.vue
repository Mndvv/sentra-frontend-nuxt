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

  <!-- Mobile Backdrop & Dropdown Menu Sheet -->
  <Teleport to="body">
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-black/40 backdrop-blur-xs z-[998] md:hidden transition-opacity"
      aria-hidden="true"
      @click="closeMenu"
    />

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="isMenuOpen"
        class="fixed top-16 inset-x-0 bg-bg-card border-b border-border shadow-xl px-4 py-3 flex flex-col gap-1 z-[999] md:hidden"
        aria-label="Menu navigasi mobile"
      >
        <NuxtLink
          to="/"
          exact-active-class="!bg-accent-soft !text-accent font-semibold"
          class="min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-text-main hover:bg-bg-card-2 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent no-underline"
          @click="closeMenu"
        >
          Beranda
        </NuxtLink>
        <NuxtLink
          to="/struktur"
          active-class="!bg-accent-soft !text-accent font-semibold"
          class="min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-text-main hover:bg-bg-card-2 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent no-underline"
          @click="closeMenu"
        >
          Struktur
        </NuxtLink>
        <NuxtLink
          to="/program"
          active-class="!bg-accent-soft !text-accent font-semibold"
          class="min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-text-main hover:bg-bg-card-2 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent no-underline"
          @click="closeMenu"
        >
          Program
        </NuxtLink>
        <NuxtLink
          to="/dokumentasi"
          active-class="!bg-accent-soft !text-accent font-semibold"
          class="min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-text-main hover:bg-bg-card-2 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent no-underline"
          @click="closeMenu"
        >
          Dokumentasi
        </NuxtLink>
        <NuxtLink
          to="/sponsor"
          active-class="!bg-accent-soft !text-accent font-semibold"
          class="min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-text-main hover:bg-bg-card-2 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent no-underline"
          @click="closeMenu"
        >
          Sponsorship
        </NuxtLink>
        <NuxtLink
          to="/hof"
          active-class="!bg-accent-soft !text-accent font-semibold"
          class="min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-text-main hover:bg-bg-card-2 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent no-underline"
          @click="closeMenu"
        >
          Hall of Fame
        </NuxtLink>
        <button
          type="button"
          class="w-full min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-left text-text-main hover:bg-bg-card-2 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer border-none bg-transparent"
          :class="{
            '!bg-accent-soft !text-accent font-semibold': isAuroraOpen,
          }"
          @click="openAurora"
        >
          Aspirasi
        </button>
      </nav>
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

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>
