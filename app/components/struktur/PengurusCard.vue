<template>
  <div
    class="pengurus-card group relative flex bg-bg-card border border-border rounded-[22px] transition-[transform,box-shadow,border-color] duration-300 ease-out cursor-pointer shadow-sm hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(99,102,241,0.25)] hover:border-accent will-change-transform overflow-hidden"
    :class="[
      isFeatured 
        ? 'col-span-2 flex-col md:flex-row items-center text-center md:text-left p-8 md:p-10 bg-gradient-to-br from-bg-card to-[var(--bento-featured-gradient-end)] border-accent/30 gap-6' 
        : 'flex-col items-center justify-center text-center p-[1.5rem_1rem_1.4rem]'
    ]"
    @click="$emit('click')"
  >
    <!-- Decorative glow on featured card -->
    <div
      v-if="isFeatured"
      class="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent-glow blur-3xl opacity-60 pointer-events-none transition-opacity duration-500 group-hover:opacity-90"
      aria-hidden="true"
    />

    <!-- Avatar -->
    <div 
      class="shrink-0 transition-transform duration-300 ease-out group-hover:scale-[1.03] z-10"
      :class="[
        isFeatured ? 'w-[120px] h-[120px] md:w-[140px] md:h-[140px]' : 'w-[100px] h-[100px] mb-3.5'
      ]"
    >
      <AppImg
        :src="useImageUrl(pengurus.foto, pengurus.nama)"
        :alt="pengurus.nama"
        rounded="full"
        img-class="border-[3px] border-transparent group-hover:border-accent transition-colors duration-300"
        class="w-full h-full rounded-full"
        @error="onImgError"
      />
    </div>
    
    <!-- Info -->
    <div class="flex flex-col flex-1 min-w-0 z-10" :class="isFeatured ? 'items-center md:items-start' : 'items-center'">
      <span class="inline-flex items-center gap-1 bg-accent-soft text-accent px-3 py-1 rounded-md text-[0.65rem] font-bold tracking-[0.08em] uppercase mb-2">
        <Icon v-if="isFeatured" name="material-symbols:workspace-premium-rounded" class="text-[0.85rem]" />
        {{ pengurus.jabatan }}
      </span>
      <h3 
        class="m-0 font-extrabold text-text-main leading-tight transition-colors duration-300 group-hover:text-accent"
        :class="isFeatured ? 'text-[1.3rem] md:text-[1.5rem]' : 'text-[1.05rem]'"
      >
        {{ pengurus.nama }}
      </h3>
      
      <!-- Motto: only shown on the featured (Ketua Umum) card -->
      <p v-if="isFeatured && pengurus.motto" class="mt-2.5 mb-0 text-[0.9rem] text-text-muted italic leading-relaxed font-medium" :class="!isFeatured || 'max-md:max-w-[90%] max-md:mx-auto'">
        "{{ pengurus.motto }}"
      </p>

      <!-- Class chip on regular cards (subtle context) -->
      <span
        v-if="!isFeatured && pengurus.kelas"
        class="mt-1.5 text-[0.68rem] font-semibold text-text-subtle uppercase tracking-wider"
      >{{ pengurus.kelas }}</span>
    </div>

    <!-- Featured: bottom accent line -->
    <div
      v-if="isFeatured"
      class="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
      aria-hidden="true"
    />
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
