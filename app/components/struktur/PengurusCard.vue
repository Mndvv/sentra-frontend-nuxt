<template>
  <div
    class="group flex flex-col items-center justify-center text-center bg-bg-card border border-border rounded-[22px] transition-[transform,box-shadow,border-color] duration-300 ease-out cursor-pointer shadow-sm hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-12px_rgba(99,102,241,0.25)] hover:border-accent"
    :class="[
      isFeatured 
        ? 'col-span-2 p-10 pt-11 bg-gradient-to-br from-bg-card to-[var(--bento-featured-gradient-end)] border-accent/30' 
        : 'p-[1.75rem_1.25rem_1.6rem]'
    ]"
    @click="$emit('click')"
  >
    <div 
      class="shrink-0 mb-4 transition-transform duration-300 ease-out group-hover:scale-[1.03]"
      :class="isFeatured ? 'w-[130px] h-[130px]' : 'w-[96px] h-[96px]'"
    >
      <img
        :src="useImageUrl(pengurus.foto, pengurus.nama)"
        :alt="pengurus.nama"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover rounded-full border-[3px] border-transparent bg-bg-card-2 transition-colors duration-300 group-hover:border-accent shadow-sm"
        @error="onImgError"
      />
    </div>
    
    <div class="flex flex-col items-center">
      <span class="inline-block bg-accent-soft text-accent px-3 py-1 rounded-md text-[0.65rem] font-bold tracking-wider uppercase mb-2">
        {{ pengurus.jabatan }}
      </span>
      <h3 
        class="m-0 font-extrabold text-text-main leading-tight transition-colors duration-300 group-hover:text-accent"
        :class="isFeatured ? 'text-[1.4rem]' : 'text-[1.1rem]'"
      >
        {{ pengurus.nama }}
      </h3>
      
      <!-- Motto: only shown on the featured (Ketua Umum) card -->
      <p v-if="isFeatured && pengurus.motto" class="mt-2 mb-0 text-[0.9rem] text-text-muted italic leading-relaxed max-w-[90%] mx-auto font-medium">
        "{{ pengurus.motto }}"
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pengurus: any
  isFeatured?: boolean
}>()

defineEmits(['click'])

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = useImageUrl('', img.alt)
  img.onerror = null
}
</script>
