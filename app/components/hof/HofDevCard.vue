<template>
  <article
    class="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-bg-card border border-border shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-200 hover:-translate-y-0.5 max-w-[320px] w-full"
  >
    <!-- Avatar with developer badge -->
    <div class="relative w-20 h-20 rounded-full shrink-0">
      <AppImg
        :src="useImageUrl(dev.foto, dev.nama)"
        :alt="dev.nama"
        rounded="full"
        loading="lazy"
        class="w-full h-full rounded-full border border-border"
      />
      <span
        class="absolute -right-1 -bottom-1 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center shadow-xs border-2 border-bg-card"
        aria-hidden="true"
      >
        <Icon name="material-symbols:code" class="text-sm" />
      </span>
    </div>

    <!-- Dev Info -->
    <div class="flex flex-col items-center gap-1.5 w-full">
      <span
        class="inline-block text-[0.65rem] font-bold tracking-widest uppercase text-accent bg-accent-soft border border-accent/20 rounded-full px-3 py-0.5"
      >
        {{ dev.role }}
      </span>
      <h3
        class="text-base sm:text-lg font-bold text-text-main m-0 leading-tight"
      >
        {{ dev.nama }}
      </h3>
      <p v-if="dev.periode_dev" class="text-xs text-text-subtle italic m-0">
        Periode Dev {{ dev.periode_dev }}
      </p>
      <p
        v-if="dev.deskripsi"
        class="text-xs text-text-muted leading-relaxed m-0 mt-1 line-clamp-3"
      >
        {{ dev.deskripsi }}
      </p>

      <!-- Tech Stack -->
      <div
        v-if="(dev.tech_stack || []).length"
        class="flex flex-wrap justify-center gap-1.5 mt-2"
      >
        <span
          v-for="(stack, i) in dev.tech_stack"
          :key="i"
          class="text-[0.68rem] font-semibold text-text-muted bg-bg-card-2 border border-border rounded-md px-2 py-0.5"
        >
          {{ stack }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useImageUrl } from "~/composables/useImageUrl";

defineProps<{
  dev: any;
}>();
</script>
