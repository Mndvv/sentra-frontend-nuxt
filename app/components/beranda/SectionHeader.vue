<template>
  <div
    ref="el"
    class="mb-8 md:mb-10 transition-all duration-700"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
  >
    <div
      class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-4 border-b border-border/80"
    >
      <div>
        <h2
          class="text-2xl sm:text-3xl font-black tracking-tight text-text-main leading-tight"
        >
          {{ title }}
        </h2>
        <p
          v-if="subtitle"
          class="text-text-muted text-sm sm:text-base leading-relaxed mt-1"
        >
          {{ subtitle }}
        </p>
      </div>
      <div v-if="$slots.action" class="shrink-0">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();

const { el, isVisible } = useScrollReveal();
</script>
