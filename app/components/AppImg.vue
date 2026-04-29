<template>
  <div class="app-img-wrap" :style="wrapStyle">
    <!-- Skeleton shimmer shown while image is loading -->
    <div
      v-if="!loaded"
      class="app-img-skeleton"
      :class="rounded ? `rounded-${rounded}` : ''"
    />

    <!-- NuxtImg handles optimised delivery; src must be a full URL for external domains -->
    <NuxtImg
      :src="src"
      :alt="alt"
      :loading="loading"
      :decoding="decoding"
      :width="width"
      :height="height"
      :fit="fit"
      :class="[
        imgClass,
        rounded ? `rounded-${rounded}` : '',
        'app-img-el transition-opacity duration-300',
        loaded ? 'opacity-100' : 'opacity-0',
      ]"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Resolved full URL (use useImageUrl() before passing) */
  src: string
  alt?: string
  /** Tailwind rounded value: 'full', 'lg', 'xl', etc. */
  rounded?: string
  /** Extra classes forwarded to the <img> element */
  imgClass?: string
  /** object-fit value forwarded to NuxtImg */
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
  width?: string | number
  height?: string | number
  /** Aspect ratio of the wrapper so the skeleton has the right shape, e.g. '1/1', '16/9' */
  aspect?: string
}>(), {
  alt: '',
  fit: 'cover',
  loading: 'lazy',
  decoding: 'async',
})

const emit = defineEmits<{
  (e: 'error', event: Event): void
}>()

const loaded = ref(false)

const wrapStyle = computed(() => {
  if (props.aspect) return { aspectRatio: props.aspect }
  return undefined
})

function onLoad() {
  loaded.value = true
}

// NuxtImg emits string | Event on error
function onError(payload: string | Event) {
  // Still reveal the img element so the browser broken-img / alt text is visible
  loaded.value = true
  if (payload instanceof Event) emit('error', payload)
}
</script>

<style scoped>
.app-img-wrap {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.app-img-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    var(--color-bg-card-2, #1e2130) 25%,
    var(--color-bg-card, #252836) 50%,
    var(--color-bg-card-2, #1e2130) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite linear;
}

.app-img-el {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: v-bind('props.fit');
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
