<template>
  <div
    class="relative overflow-hidden bg-bg-card border border-border rounded-[20px] p-5 cursor-pointer min-h-[125px] flex flex-col transition-[transform,box-shadow,border-color] duration-300 ease-out shadow-sm hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-12px_rgba(99,102,241,0.25)] hover:border-accent group"
    @click="$emit('click')"
  >
    <!-- Index badge -->
    <span class="absolute top-3 right-3 text-[0.62rem] font-extrabold text-accent bg-accent-soft px-2 py-0.5 rounded-md tracking-wide">
      {{ index }}
    </span>

    <h4 class="text-[0.62rem] font-bold uppercase tracking-wider text-accent mb-1.5">SEKBID {{ index }}</h4>
    <p class="text-[0.88rem] font-semibold text-text-main leading-snug m-0 flex-1 z-10">{{ sekbid.name }}</p>

    <!-- Decorative large number -->
    <div
      class="absolute bottom-[-0.5rem] right-0 text-[5.5rem] font-black leading-none text-text-main opacity-[0.03] pointer-events-none select-none transition-all duration-200 group-hover:opacity-[0.06] group-hover:text-accent group-hover:-translate-y-1"
      aria-hidden="true"
    >{{ index }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sekbid: any
  index: number
}>()

defineEmits(['click'])
</script>
