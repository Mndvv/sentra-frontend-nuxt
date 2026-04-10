<template>
  <div 
    v-if="isArticleModalOpen" 
    class="fixed inset-0 bg-black/70 backdrop-blur-md z-[2000] flex items-start justify-center p-4 md:p-8 overflow-y-auto"
    @click.self="closeArticleModal"
  >
    <div class="bg-bg-card rounded-3xl w-full max-w-[860px] relative shadow-[0_40px_80px_rgba(0,0,0,0.4)] animate-[articleSlideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] my-auto overflow-hidden">
      <!-- Close button -->
      <button 
        class="absolute top-5 right-5 z-10 bg-black/40 backdrop-blur-md border-none text-white w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-250 hover:bg-accent hover:rotate-90"
        @click="closeArticleModal"
      >
        <Icon name="material-symbols:close" size="24" />
      </button>

      <!-- Hero Foto -->
      <div class="relative h-[260px] md:h-[420px] overflow-hidden">
        <img :src="useImageUrl(event?.thumbnail)" :alt="event?.title" class="w-full h-full object-cover block">
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <span class="inline-block bg-accent text-white font-sans text-[0.68rem] font-bold tracking-[0.1em] uppercase px-3.5 py-1.5 rounded-full mb-3">{{ event?.tag_text || 'Kegiatan' }}</span>
          <h2 class="font-serif text-[1.5rem] md:text-[2rem] font-[900] leading-[1.15] mb-2 text-white">{{ event?.title }}</h2>
          <div class="font-sans text-[0.85rem] opacity-80 text-white">{{ formatRangeIndo(event?.start_date, event?.end_date) }}</div>
        </div>
      </div>

      <!-- Body -->
      <div class="p-6 md:p-10 pb-8 md:pb-12 text-text-main">
        <h3 v-if="event?.narasi_title" class="font-serif text-[1.4rem] font-bold leading-[1.3] mb-5">{{ event?.narasi_title }}</h3>
        
        <div class="font-sans text-[0.95rem] leading-[1.9] mb-10 html-content" v-html="renderedNarasi"></div>
        
        <div v-if="event?.narasi_footer" class="font-sans text-[0.82rem] text-text-muted italic mt-6 pt-4 border-t border-border">
          {{ event?.narasi_footer }}
        </div>

        <div v-if="hasPhotos" class="flex items-center gap-4 my-10">
          <div class="flex-1 h-px bg-border"></div>
          <span class="font-sans text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-accent whitespace-nowrap">Galeri Kegiatan</span>
          <div class="flex-1 h-px bg-border"></div>
        </div>

        <div v-if="hasPhotos">
          <div class="grid gap-3 mb-8" :class="gridClass">
            <div 
              v-for="(img, i) in previewPhotos" 
              :key="i"
              class="relative rounded-xl overflow-hidden cursor-pointer bg-black/5 aspect-square group"
              :class="{ 'md:col-span-2 md:row-span-2': isHeroPhoto(i, previewPhotos.length) }"
              @click="openLightboxModal(photos, i)"
            >
              <img :src="useImageUrl(img.url)" :alt="img.caption" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 brightness-90 group-hover:scale-105 group-hover:brightness-100">
              <div v-if="img.caption" class="absolute inset-0 bg-transparent flex items-end p-3 transition-colors duration-300 group-hover:bg-black/45 z-10">
                <span class="font-sans text-[0.75rem] text-white leading-[1.4] translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">{{ img.caption }}</span>
              </div>
            </div>
          </div>
          
          <button 
            v-if="photos.length > previewPhotos.length"
            class="flex items-center justify-center gap-2 w-full p-3.5 border-2 border-dashed border-indigo-500/40 rounded-xl bg-transparent text-accent font-sans text-[0.85rem] font-semibold cursor-pointer transition-all duration-200 mt-2 hover:bg-indigo-500/10 hover:border-solid"
            @click="openLightboxModal(photos, previewPhotos.length)"
          >
            <Icon name="material-symbols:photo-library" size="18" />
            Lihat semua {{ photos.length }} foto
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

const {
  selectedEvent: event,
  isArticleModalOpen,
  closeArticleModal,
  openLightboxModal
} = useDokumentasi()

const hasPhotos = computed(() => Array.isArray(event.value?.images) && event.value.images.length > 0)
const photos = computed(() => event.value?.images || [])
const previewPhotos = computed(() => photos.value.slice(0, 8))

const gridClass = computed(() => {
  const count = previewPhotos.value.length;
  if (count === 1) return 'grid-cols-1'
  if (count === 2) return 'grid-cols-2'
  if (count === 3) return 'grid-cols-2 md:grid-cols-3'
  if (count === 4) return 'grid-cols-2 md:grid-cols-2'
  return 'grid-cols-2 md:grid-cols-3'
})

const isHeroPhoto = (index: number, total: number) => {
  // Logic from dokum.css responsive grid
  if (index !== 0) return false;
  if (total === 3) return true; // spans row 2, col 2 on md
  if (total >= 5) return true;  // spans col 2 on md
  return false;
}

const renderedNarasi = computed(() => {
  if (!event.value) return ''
  let html = event.value.narasi
  if (!html || !html.trim()) {
    html = event.value.description ? `<p>${event.value.description}</p>` : ''
  }
  return html
})

const formatRangeIndo = (sStr: string, eStr: string) => {
  const formatDateIndo = (dStr: string) => {
    if (!dStr) return '';
    if (dStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      try {
        const d = new Date(dStr);
        if (!isNaN(d.getTime())) {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
          return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
        }
      } catch (e) { }
    }
    return dStr;
  }
  const start = formatDateIndo(sStr);
  const end = formatDateIndo(eStr);
  if (!start) return '';
  if (!end || start === end) return start;
  return `${start} - ${end}`;
}

watch(isArticleModalOpen, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})
</script>

<style>
@keyframes articleSlideUp {
  from { transform: translateY(40px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.html-content p { margin-bottom: 1rem; }
.html-content p:last-child { margin-bottom: 0; }
.html-content img { max-width: 100%; border-radius: 12px; margin: 1.25rem 0; display: block; }
.html-content h2 { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; margin: 1.5rem 0 0.75rem; color: var(--text-main); }
.html-content h3 { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; margin: 1.25rem 0 0.5rem; color: var(--text-main); }
.html-content blockquote { border-left: 3px solid var(--accent); padding: 0.5rem 0 0.5rem 1.2rem; margin: 1.25rem 0; font-style: italic; color: var(--text-muted); }
.html-content ul, .html-content ol { padding-left: 1.5rem; margin-bottom: 1rem; }
.html-content li { margin-bottom: 0.25rem; }
.html-content strong { font-weight: 600; }
.html-content em { font-style: italic; }
</style>
