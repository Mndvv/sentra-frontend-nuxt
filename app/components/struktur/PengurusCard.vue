<template>
  <div
    role="button"
    tabindex="0"
    class="pengurus-card group relative bg-bg-card border border-border hover:border-accent/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent overflow-hidden"
    :class="[
      isFeatured
        ? 'col-span-2 md:col-span-2 flex flex-col sm:flex-row items-center text-center sm:text-left gap-5 p-6 hover:-translate-y-0.5'
        : 'flex flex-col items-center text-center p-5 hover:-translate-y-0.5',
    ]"
    @click="$emit('click')"
    @keydown.enter="$emit('click')"
    @keydown.space.prevent="$emit('click')"
  >
    <!-- Avatar / Portrait -->
    <div
      class="shrink-0 rounded-full border transition-colors duration-200 overflow-hidden"
      :class="[
        isFeatured
          ? 'w-24 h-24 sm:w-28 sm:h-28 border-2 border-border group-hover:border-accent'
          : 'w-20 h-20 border-border group-hover:border-accent mb-3',
      ]"
    >
      <AppImg
        :src="useImageUrl(pengurus.foto, pengurus.nama)"
        :alt="pengurus.nama"
        rounded="full"
        class="w-full h-full rounded-full object-cover"
        @error="onImgError"
      />
    </div>

    <!-- Info -->
    <div
      class="flex flex-col flex-1 min-w-0"
      :class="isFeatured ? 'items-center sm:items-start' : 'items-center'"
    >
      <!-- Role pill -->
      <span
        class="bg-accent-soft text-accent text-[0.65rem] font-bold uppercase tracking-wider rounded-md inline-flex items-center gap-1"
        :class="isFeatured ? 'px-2.5 py-1 mb-1.5' : 'px-2 py-0.5 mb-1'"
      >
        <Icon
          v-if="isFeatured"
          name="material-symbols:workspace-premium-rounded"
          class="text-xs"
          aria-hidden="true"
        />
        {{ pengurus.jabatan }}
      </span>

      <!-- Name -->
      <h3
        class="font-black text-text-main group-hover:text-accent transition-colors m-0 leading-tight"
        :class="
          isFeatured
            ? 'text-xl sm:text-2xl'
            : 'text-sm sm:text-base font-bold line-clamp-2 mt-1'
        "
      >
        {{ pengurus.nama }}
      </h3>

      <!-- Motto (featured only) -->
      <p
        v-if="isFeatured && pengurus.motto"
        class="text-sm text-text-muted italic leading-relaxed mt-1 mb-0 max-w-xl"
      >
        "{{ pengurus.motto }}"
      </p>

      <!-- Kelas (regular cards) -->
      <span
        v-if="!isFeatured && pengurus.kelas"
        class="text-xs text-text-subtle font-medium mt-1 uppercase tracking-wider"
      >
        {{ pengurus.kelas }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImageUrl } from "~/composables/useImageUrl";

defineProps<{
  pengurus: any;
  isFeatured?: boolean;
}>();

defineEmits<{
  (e: "click"): void;
}>();

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement;
  img.src = useImageUrl("", img.alt);
  img.onerror = null;
}
</script>
