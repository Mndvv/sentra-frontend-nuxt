<template>
  <div 
    v-if="isLightboxModalOpen" 
    class="fixed inset-0 bg-black/95 backdrop-blur-sm z-[3000] flex items-center justify-center"
  >
    <div class="relative w-full h-full flex flex-col">
      <!-- Header -->
      <div class="absolute top-0 left-0 right-0 p-[1.2rem_1.5rem] bg-gradient-to-b from-black/70 to-transparent flex justify-between items-center z-10">
        <h3 class="font-serif text-[1.1rem] text-white m-0">{{ selectedEvent?.title || 'Foto' }}</h3>
        <div class="flex items-center gap-4">
          <span class="font-sans text-[0.82rem] text-white/70 bg-white/10 px-[14px] py-1 rounded-[20px]">{{ currentIndex + 1 }} / {{ photos.length }}</span>
          <button 
            class="bg-white/15 border-none text-white w-[42px] h-[42px] rounded-full text-[1.4rem] cursor-pointer flex items-center justify-center transition-all duration-250 hover:bg-white/30 hover:rotate-90"
            @click="closeLightboxModal"
          >
            <Icon name="material-symbols:close" size="24" />
          </button>
        </div>
      </div>

      <!-- Navigation Prev -->
      <button 
        v-if="photos.length > 1"
        class="absolute top-1/2 -translate-y-1/2 left-2 md:left-6 bg-white/15 border-none text-white w-[40px] md:w-[54px] h-[40px] md:h-[54px] rounded-full cursor-pointer flex items-center justify-center transition-all duration-250 backdrop-blur-[5px] z-10 hover:bg-white/30 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
        @click="prev"
        :disabled="currentIndex === 0"
      >
        <Icon name="material-symbols:chevron-left" size="32" class="text-[1.8rem]" />
      </button>

      <!-- Stage -->
      <div class="flex-1 flex items-center justify-center p-[4rem_1rem_3rem] md:p-[5rem_5rem_4rem] relative">
        <img
          :key="currentPhoto?.url"
          :src="useImageUrl(currentPhoto?.url)"
          loading="eager"
          decoding="async"
          class="max-w-full max-h-[70vh] object-contain rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-[fadeIn_0.3s_ease]"
        >
        
        <div v-if="currentPhoto?.caption" class="absolute bottom-[20px] md:bottom-[80px] left-1/2 -translate-x-1/2 bg-black/50 text-white font-sans text-[0.85rem] px-[18px] py-[6px] rounded-[20px] whitespace-nowrap max-w-[80%] overflow-hidden text-ellipsis">
          {{ currentPhoto.caption }}
        </div>
      </div>

      <!-- Navigation Next -->
      <button 
        v-if="photos.length > 1"
        class="absolute top-1/2 -translate-y-1/2 right-2 md:right-6 bg-white/15 border-none text-white w-[40px] md:w-[54px] h-[40px] md:h-[54px] rounded-full cursor-pointer flex items-center justify-center transition-all duration-250 backdrop-blur-[5px] z-10 hover:bg-white/30 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
        @click="next"
        :disabled="currentIndex === photos.length - 1"
      >
        <Icon name="material-symbols:chevron-right" size="32" class="text-[1.8rem]" />
      </button>

      <!-- Thumbnails -->
      <div class="bg-black/60 p-[0.8rem_1rem] overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-accent">
        <div class="inline-flex gap-2 min-w-max mx-auto justify-center w-full" ref="thumbList">
          <div
            v-for="(img, i) in photos"
            :key="i"
            class="w-[72px] h-[50px] rounded-[6px] cursor-pointer border-2 transition-all duration-250 shrink-0 overflow-hidden"
            :class="i === currentIndex ? 'border-accent opacity-100 scale-105' : 'border-transparent opacity-55 hover:opacity-85'"
            @click="jump(i)"
          >
            <AppImg :src="useImageUrl(img.url)" class="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'

const {
  selectedEvent,
  selectedPhotos: photos,
  selectedPhotoIndex: currentIndex,
  isLightboxModalOpen,
  closeLightboxModal
} = useDokumentasi()

const currentPhoto = computed(() => photos.value[currentIndex.value])

const next = () => {
  if (currentIndex.value < photos.value.length - 1) {
    currentIndex.value++
  }
}

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const jump = (i: number) => {
  currentIndex.value = i
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!isLightboxModalOpen.value) return
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'Escape') closeLightboxModal()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

watch(isLightboxModalOpen, (val) => {
  if (import.meta.client && val) {
    // Scroll thumbnail into view
    setTimeout(() => {
      const activeThumb = document.querySelector('.border-accent.scale-105')
      if (activeThumb) activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }, 100)
  }
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
</style>
