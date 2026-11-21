<template>
  <Teleport to="body">
    <div
      v-if="isLightboxModalOpen"
      ref="dialog"
      class="fixed inset-0 z-[2000] bg-black/92 backdrop-blur-sm flex flex-col justify-between p-3 sm:p-5 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Galeri foto"
      tabindex="-1"
      @click.self="closeLightboxModal"
    >
      <!-- Top Bar -->
      <header
        class="flex items-center justify-between gap-4 w-full shrink-0 z-20"
      >
        <h3
          class="text-sm sm:text-base font-bold text-white truncate max-w-[60%]"
        >
          {{ lightboxTitle || "Foto" }}
        </h3>
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <span
            class="text-xs sm:text-sm text-white/70 font-semibold px-2.5 py-1 rounded-full bg-white/10 tabular-nums"
            aria-live="polite"
          >
            {{ currentIndex + 1 }} / {{ photos.length }}
          </span>
          <button
            type="button"
            class="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            aria-label="Tutup galeri"
            @click="closeLightboxModal"
          >
            <Icon
              name="material-symbols:close-rounded"
              size="24"
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      <!-- Stage & Navigation -->
      <div
        class="relative flex-1 flex items-center justify-center w-full min-h-0 my-auto py-2"
        @click.self="closeLightboxModal"
      >
        <!-- Prev Button -->
        <button
          v-if="photos.length > 1"
          type="button"
          class="absolute left-1 sm:left-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
          aria-label="Foto sebelumnya"
          :disabled="currentIndex === 0"
          @click="prev"
        >
          <Icon
            name="material-symbols:chevron-left-rounded"
            size="30"
            aria-hidden="true"
          />
        </button>

        <!-- Main Photo + Caption -->
        <div
          class="flex flex-col items-center justify-center max-w-full max-h-full px-12 sm:px-16"
          @click.self="closeLightboxModal"
        >
          <img
            :key="currentPhoto?.url"
            :src="useImageUrl(currentPhoto?.url)"
            :alt="currentPhoto?.caption || lightboxTitle || 'Foto kegiatan'"
            loading="eager"
            decoding="async"
            class="max-h-[68vh] sm:max-h-[72vh] max-w-full object-contain mx-auto rounded-lg shadow-2xl transition-all"
          />
          <p
            v-if="currentPhoto?.caption"
            class="text-xs sm:text-sm text-white/80 text-center mt-2 max-w-xl mx-auto px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-sm"
          >
            {{ currentPhoto.caption }}
          </p>
        </div>

        <!-- Next Button -->
        <button
          v-if="photos.length > 1"
          type="button"
          class="absolute right-1 sm:right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
          aria-label="Foto berikutnya"
          :disabled="currentIndex === photos.length - 1"
          @click="next"
        >
          <Icon
            name="material-symbols:chevron-right-rounded"
            size="30"
            aria-hidden="true"
          />
        </button>
      </div>

      <!-- Bottom Thumbnails -->
      <div v-if="photos.length > 1" class="w-full shrink-0 pt-2 z-20">
        <div
          ref="thumbList"
          class="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-1 px-2 max-w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <button
            v-for="(img, i) in photos"
            :key="i"
            type="button"
            class="relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            :class="
              i === currentIndex
                ? 'ring-2 ring-accent scale-105 opacity-100'
                : 'opacity-50 hover:opacity-80'
            "
            :data-active="i === currentIndex ? 'true' : undefined"
            :aria-label="`Foto ${i + 1}${img.caption ? `: ${img.caption}` : ''}`"
            :aria-current="i === currentIndex ? 'true' : undefined"
            @click="jump(i)"
          >
            <AppImg
              :src="useImageUrl(img.url)"
              :alt="''"
              class="h-full w-full object-cover"
            />
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, nextTick, onMounted, onUnmounted, ref } from "vue";

const {
  selectedPhotos: photos,
  selectedPhotoIndex: currentIndex,
  lightboxTitle,
  isLightboxModalOpen,
  closeLightboxModal,
} = useDokumentasi();

const dialog = ref<HTMLElement | null>(null);
const thumbList = ref<HTMLElement | null>(null);
let lastFocused: HTMLElement | null = null;

const currentPhoto = computed(() => photos.value[currentIndex.value]);

const next = () => {
  if (currentIndex.value < photos.value.length - 1) currentIndex.value++;
};
const prev = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};
const jump = (i: number) => {
  currentIndex.value = i;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (!isLightboxModalOpen.value) return;
  if (e.key === "ArrowRight") next();
  else if (e.key === "ArrowLeft") prev();
  else if (e.key === "Escape") closeLightboxModal();
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  if (import.meta.client) document.body.style.overflow = "";
});

watch(isLightboxModalOpen, async (open) => {
  if (!import.meta.client) return;
  if (open) {
    lastFocused = (document.activeElement as HTMLElement) || null;
    document.body.style.overflow = "hidden";
    await nextTick();
    dialog.value?.focus();
    scrollActiveThumb();
  } else {
    document.body.style.overflow = "";
    lastFocused?.focus?.();
    lastFocused = null;
  }
});

function scrollActiveThumb() {
  const active = thumbList.value?.querySelector<HTMLElement>(
    '[data-active="true"]',
  );
  active?.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  });
}

watch(currentIndex, () => {
  if (isLightboxModalOpen.value) scrollActiveThumb();
});
</script>
