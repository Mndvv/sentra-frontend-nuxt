<template>
  <nav class="fixed top-0 w-full z-[1000] bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--nav-border)] transition-colors duration-300">
    <div class="max-w-[1280px] mx-auto px-4 md:px-8 py-3 flex justify-between items-center gap-6">
      
      <!-- Hamburger Mobile -->
      <div 
        class="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer z-[1001]" 
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="w-6 h-[2.5px] bg-[var(--text-main)] rounded-sm transition-transform duration-300" :class="{ '-rotate-45 translate-y-[7.5px]': isMenuOpen }"></span>
        <span class="w-6 h-[2.5px] bg-[var(--text-main)] rounded-sm transition-opacity duration-300" :class="{ 'opacity-0': isMenuOpen }"></span>
        <span class="w-6 h-[2.5px] bg-[var(--text-main)] rounded-sm transition-transform duration-300" :class="{ 'rotate-45 -translate-y-[7.5px]': isMenuOpen }"></span>
      </div>

      <!-- Logo -->
      <div class="font-extrabold text-xl tracking-tight shrink-0">
        <NuxtLink to="/" class="flex items-center gap-1.5 text-[var(--text-main)] no-underline">
          SENTRA<span class="text-[var(--accent)]">.</span>
        </NuxtLink>
      </div>

      <!-- Nav Links -->
      <ul 
        class="list-none m-0 p-0 flex flex-col md:flex-row items-center gap-2 md:gap-1 absolute md:static top-0 left-0 w-[75%] max-w-[280px] md:w-auto h-screen md:h-auto bg-[var(--bg-card)] md:bg-transparent pt-[85px] md:pt-0 px-6 md:px-0 shadow-[10px_0_40px_rgba(0,0,0,0.15)] md:shadow-none transition-all duration-300 z-[999] md:translate-x-0"
        :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <li class="w-full md:w-auto"><NuxtLink to="/" class="block w-full text-center md:text-left px-4 py-3 md:2 md:py-2 rounded-xl text-[var(--text-main)] md:text-[var(--text-muted)] font-medium text-base md:text-sm hover:!bg-[var(--accent-soft)] hover:!text-[var(--accent)] transition-colors no-underline" active-class="!text-[var(--accent)] !bg-[var(--accent-soft)] md:!font-semibold whitespace-nowrap" @click="closeMenu">Beranda</NuxtLink></li>
        <li class="w-full md:w-auto"><NuxtLink to="/struktur" class="block w-full text-center md:text-left px-4 py-3 md:px-2 md:py-2 rounded-xl text-[var(--text-main)] md:text-[var(--text-muted)] font-medium text-base md:text-sm hover:!bg-[var(--accent-soft)] hover:!text-[var(--accent)] transition-colors no-underline" active-class="!text-[var(--accent)] !bg-[var(--accent-soft)] md:!font-semibold whitespace-nowrap" @click="closeMenu">Struktur</NuxtLink></li>
        <li class="w-full md:w-auto"><NuxtLink to="/program" class="block w-full text-center md:text-left px-4 py-3 md:px-2 md:py-2 rounded-xl text-[var(--text-main)] md:text-[var(--text-muted)] font-medium text-base md:text-sm hover:!bg-[var(--accent-soft)] hover:!text-[var(--accent)] transition-colors no-underline" active-class="!text-[var(--accent)] !bg-[var(--accent-soft)] md:!font-semibold whitespace-nowrap" @click="closeMenu">Program Kerja</NuxtLink></li>
        <li class="w-full md:w-auto"><NuxtLink to="/dokumentasi" class="block w-full text-center md:text-left px-4 py-3 md:px-2 md:py-2 rounded-xl text-[var(--text-main)] md:text-[var(--text-muted)] font-medium text-base md:text-sm hover:!bg-[var(--accent-soft)] hover:!text-[var(--accent)] transition-colors no-underline" active-class="!text-[var(--accent)] !bg-[var(--accent-soft)] md:!font-semibold whitespace-nowrap" @click="closeMenu">Dokumentasi</NuxtLink></li>
        <li class="w-full md:w-auto"><NuxtLink to="/sponsor" class="block w-full text-center md:text-left px-4 py-3 md:px-2 md:py-2 rounded-xl text-[var(--text-main)] md:text-[var(--text-muted)] font-medium text-base md:text-sm hover:!bg-[var(--accent-soft)] hover:!text-[var(--accent)] transition-colors no-underline" active-class="!text-[var(--accent)] !bg-[var(--accent-soft)] md:!font-semibold whitespace-nowrap" @click="closeMenu">Sponsorship</NuxtLink></li>
        <!-- <li class="w-full md:w-auto"><a href="#" @click.prevent="openAurora" class="block w-full text-center md:text-left px-4 py-3 md:px-3 md:py-2 rounded-xl text-[var(--text-main)] md:text-[var(--text-muted)] font-medium text-base md:text-sm hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] transition-colors no-underline" :class="{ '!text-white !bg-[var(--accent)] md:!bg-[var(--accent-soft)] md:!text-[var(--accent)] whitespace-nowrap': isAuroraOpen }">AURORA</a></li> -->
      </ul>

      <!-- Theme Toggle -->
      <button 
        class="bg-transparent border-none p-2 rounded-xl cursor-pointer transition-colors duration-200 text-[var(--text-muted)] flex items-center justify-center shrink-0 hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]" 
        @click="toggleTheme" 
        aria-label="Toggle Theme"
      >
        <Icon :name="colorMode.value === 'dark' ? 'material-symbols:light-mode-outline' : 'material-symbols:dark-mode-outline'" size="20" />
      </button>

    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const colorMode = useColorMode()
const isMenuOpen = ref(false)

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const isAuroraOpen = useState('isAuroraOpen', () => false)

const closeMenu = () => {
  isMenuOpen.value = false
}

const openAurora = () => {
  isAuroraOpen.value = true
  closeMenu()
}
</script>
