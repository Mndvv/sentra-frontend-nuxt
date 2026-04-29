<template>
  <!--
    Wrapper sizes itself from user-passed Tailwind classes (e.g. w-[96px] h-[96px]).
    Children fill the wrapper.

    NOTE: We use a plain <img> rather than <NuxtImg> for backend-served photos.
    Routing user uploads through IPX/sharp drops EXIF orientation, so portrait
    photos taken on phones end up rotated sideways. Plain <img> lets the browser
    apply the orientation tag itself.
  -->
  <div class="app-img-wrap" :class="rounded ? `rounded-${rounded}` : ''" :style="wrapStyle">
    <!-- Skeleton shimmer shown while image is loading -->
    <div v-if="!loaded" class="app-img-skeleton" />

    <img
      :src="src"
      :alt="alt"
      :loading="loading"
      :decoding="decoding"
      :class="[
        'app-img-el transition-opacity duration-300',
        imgClass,
        loaded ? 'opacity-100' : 'opacity-0',
      ]"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = withDefaults(defineProps<{
  /** Resolved full URL (use useImageUrl() before passing) */
  src: string
  alt?: string
  /** Tailwind rounded value: 'full', 'lg', 'xl', etc. Applied to the wrapper so corners clip correctly. */
  rounded?: string
  /** Extra classes forwarded to the <img> element (e.g. border styles) */
  imgClass?: string
  /** object-fit value applied to the inner <img> */
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
  /** Aspect ratio of the wrapper so the skeleton has the right shape, e.g. '1/1', '16/9' */
  aspect?: string
}>(), {
  alt: '',
  fit: 'cover',
  loading: 'lazy',
  decoding: 'async',
})

const emit = defineEmits<{
  (e: 'load', event: Event): void
  (e: 'error', event: Event): void
}>()

const loaded = ref(false)

// Reset loaded state when src changes so skeleton replays and
// the browser fetches the new URL (no stale image after photo update).
watch(() => props.src, () => {
  loaded.value = false
})

const wrapStyle = computed(() => {
  if (props.aspect) return { aspectRatio: props.aspect }
  return undefined
})

function onLoad(event: Event) {
  loaded.value = true
  emit('load', event)
}

function onError(event: Event) {
  // Still reveal the img element so the browser broken-img / alt text is visible
  loaded.value = true
  emit('error', event)
}
</script>

<style scoped>
/*
  Use :where() to keep specificity at 0 so user-passed Tailwind classes
  (w-[96px], h-full, etc.) on the AppImg root reliably win.
*/
:where(.app-img-wrap) {
  position: relative;
  display: block;
  overflow: hidden;
}

:where(.app-img-skeleton) {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    var(--color-bg-card-2, rgba(0, 0, 0, 0.06)) 25%,
    var(--color-bg-card, rgba(0, 0, 0, 0.12)) 50%,
    var(--color-bg-card-2, rgba(0, 0, 0, 0.06)) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite linear;
  pointer-events: none;
}

/*
  NOT inside :where() because we need specificity 0,1,0 to beat Tailwind's
  preflight rule `img { height: auto; max-width: 100% }` (specificity 0,0,1).
  Without this, landscape photos render shorter than the wrapper, exposing
  the photo's bottom edge inside circular avatars.
*/
.app-img-el {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: v-bind('props.fit');
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
