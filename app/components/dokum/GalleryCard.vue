<template>
  <NuxtLink
    :to="`/dokumentasi/${articleSlug(ev)}`"
    class="bg-bg-card rounded-[18px] overflow-hidden border border-border shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(99,102,241,0.25)] hover:border-indigo-500/30 flex flex-col relative p-0 group h-full focus:outline-none focus:ring-2 focus:ring-accent no-underline text-text-main"
    :class="{ 'md:col-span-2 lg:col-span-3 flex-col lg:flex-row lg:max-h-[380px]': isFeatured }"
  >
    <div 
      class="relative overflow-hidden bg-[#0f172a] flex-shrink-0"
      :class="isFeatured ? 'h-[240px] lg:h-full lg:w-[55%] lg:min-w-[55%]' : 'h-[210px]'"
    >
      <AppImg
        :src="useImageUrl(ev.thumbnail)"
        :alt="ev.title"
        img-class="transition-transform duration-500 brightness-[0.92] group-hover:scale-[1.06] group-hover:brightness-100"
        class="w-full h-full"
      />
      <span class="absolute top-3 left-3 bg-indigo-500/90 backdrop-blur-md text-white font-sans text-[0.65rem] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full z-10">{{ ev.tag_text || 'Kegiatan' }}</span>
      <span class="absolute bottom-3 right-3 bg-black/50 backdrop-blur-[8px] text-white font-sans text-[0.72rem] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 z-10">
        <span class="text-[0.55rem] opacity-70 leading-none pb-px">◈</span> {{ ev.images?.length || 0 }} Foto
      </span>
    </div>
    <div class="p-[1.25rem_1.35rem_1.5rem] flex-1 flex flex-col gap-2" :class="{ 'lg:p-8 lg:justify-center': isFeatured }">
      <span class="font-sans text-[0.7rem] font-bold text-accent tracking-[0.07em] uppercase">{{ formatRangeIndo(ev.start_date, ev.end_date) }}</span>
      <h3 class="font-serif font-bold text-text-main m-0" :class="isFeatured ? 'text-[1.65rem] line-clamp-3 leading-tight' : 'text-[1.05rem] line-clamp-2 leading-[1.35]'">{{ ev.title }}</h3>
      <p class="font-sans text-text-muted m-0 flex-1" :class="isFeatured ? 'text-[0.95rem] line-clamp-4 leading-relaxed mt-2' : 'text-[0.83rem] line-clamp-3 leading-[1.6]'">{{ ev.description || '' }}</p>
      <div class="mt-auto pt-[0.85rem] flex items-center gap-[5px] font-sans text-[0.78rem] font-bold text-accent transition-[gap] duration-200 group-hover:gap-[10px]">
        Baca Artikel <Icon name="material-symbols:arrow-forward" size="16" class="text-[1rem]" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { articleSlug } from '~/utils/articleSlug'

defineProps<{
  ev: any
  isFeatured?: boolean
}>()

const formatRangeIndo = (sStr: string, eStr: string) => {
  const formatDateIndo = (dStr: string) => {
    if (!dStr) return '';
    if (dStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      try {
        const d = new Date(dStr);
        if (!isNaN(d.getTime())) {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
          return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
        }
      } catch (e) { }
    }
    return dStr;
  }
  const start = formatDateIndo(sStr);
  const end = formatDateIndo(eStr);
  if (!start) return '';
  if (!end || start === end) return start;
  return `${start} - ${end}`;
}
</script>
