<template>
  <div
    ref="el"
    class="mb-8 transition-all duration-500 ease-out"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
  >
    <h2
      :id="id"
      class="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-main m-0 leading-tight"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="text-text-muted text-sm sm:text-base leading-relaxed max-w-xl mt-2 m-0"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  id?: string;
}>();

const { el, isVisible } = useScrollReveal();
</script>
