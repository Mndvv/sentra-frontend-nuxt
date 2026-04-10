<template>
  <div
    class="group flex flex-col items-center justify-center text-center bg-bg-card border border-border rounded-[20px] transition-all duration-200 cursor-pointer shadow hover:-translate-y-1 hover:shadow-md hover:border-accent"
    :class="[
      isFeatured 
        ? 'col-span-2 p-8 pt-9 bg-gradient-to-br from-bg-card to-[var(--bento-featured-gradient-end)] border-accent/25' 
        : 'p-[1.4rem_1rem_1.25rem]'
    ]"
    @click="$emit('click')"
  >
    <div 
      class="shrink-0 mb-3.5 group-hover:border-accent"
      :class="isFeatured ? 'w-[110px] h-[110px]' : 'w-[80px] h-[80px]'"
    >
      <img
        :src="useImageUrl(pengurus.foto, pengurus.nama)"
        :alt="pengurus.nama"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover rounded-full border-[3px] border-transparent bg-bg-card-2 transition-colors duration-200 group-hover:border-accent"
        @error="onImgError"
      />
    </div>
    
    <div class="flex flex-col items-center">
      <span class="inline-block bg-accent-soft text-accent px-2.5 py-0.5 rounded-md text-[0.6rem] font-bold tracking-wider uppercase mb-1.5">
        {{ pengurus.jabatan }}
      </span>
      <h3 
        class="m-0 font-bold text-text-main leading-tight transition-colors duration-200"
        :class="isFeatured ? 'text-[1.15rem]' : 'text-[0.92rem]'"
      >
        {{ pengurus.nama }}
      </h3>
      
      <!-- Motto: only shown on the featured (Ketua Umum) card -->
      <p v-if="isFeatured && pengurus.motto" class="mt-1.5 mb-0 text-[0.78rem] text-text-muted italic leading-relaxed">
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
