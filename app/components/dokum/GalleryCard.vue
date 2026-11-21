<template>
  <div
    ref="el"
    class="h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0"
    :class="[
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      isFeatured ? 'col-span-full' : '',
    ]"
    :style="{ transitionDelay: delay ? `${delay}ms` : '0ms' }"
  >
    <NuxtLink
      :to="'/dokumentasi/' + articleSlug(ev)"
      class="group flex flex-col h-full bg-bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-200 hover:-translate-y-1 no-underline text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      :class="isFeatured ? 'lg:flex-row lg:min-h-[320px]' : ''"
    >
      <!-- Media -->
      <div
        class="relative overflow-hidden bg-bg-card-2 shrink-0 aspect-[16/10]"
        :class="isFeatured ? 'lg:w-[50%] lg:aspect-auto' : ''"
      >
        <AppImg
          :src="useImageUrl(ev.thumbnail)"
          :alt="ev.title || 'Dokumentasi kegiatan'"
          img-class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          class="h-full w-full"
        />

        <!-- Tag badge -->
        <span
          class="absolute top-3 left-3 z-10 bg-bg-card/90 backdrop-blur-xs text-text-main text-[0.68rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs border border-border/60"
        >
          {{ ev.tag_text || "Kegiatan" }}
        </span>

        <!-- Photo count badge -->
        <span
          class="absolute top-3 right-3 z-10 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1 shadow-xs tabular-nums"
        >
          <Icon
            name="material-symbols:photo-camera-rounded"
            class="text-xs"
            aria-hidden="true"
          />
          {{ ev.images?.length || 0 }}
        </span>
      </div>

      <!-- Body -->
      <div
        class="p-5 flex flex-col flex-1 justify-between gap-3"
        :class="isFeatured ? 'lg:p-8 lg:justify-center' : ''"
      >
        <div class="flex flex-col gap-2">
          <p
            class="text-xs text-text-muted font-bold uppercase tracking-wider tabular-nums m-0"
          >
            <time :datetime="ev.start_date || ''">{{
              formatRangeIndo(ev.start_date, ev.end_date)
            }}</time>
          </p>

          <h3
            class="font-bold text-text-main group-hover:text-accent transition-colors m-0"
            :class="
              isFeatured
                ? 'text-xl sm:text-2xl md:text-3xl font-extrabold line-clamp-2 md:line-clamp-3 leading-snug'
                : 'text-base sm:text-lg font-bold line-clamp-2 leading-snug'
            "
          >
            {{ ev.title }}
          </h3>

          <p
            v-if="ev.description"
            class="text-xs sm:text-sm text-text-muted line-clamp-2 leading-relaxed m-0"
            :class="isFeatured ? 'lg:line-clamp-3' : ''"
          >
            {{ ev.description }}
          </p>
        </div>

        <span
          class="text-xs sm:text-sm font-semibold text-accent flex items-center gap-1 mt-auto pt-2"
        >
          Baca artikel
          <Icon
            name="material-symbols:arrow-forward-rounded"
            class="text-base transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { articleSlug } from "~/utils/articleSlug";
import { formatRangeIndo } from "~/utils/formatDate";

defineProps<{
  ev: any;
  isFeatured?: boolean;
  delay?: number;
}>();

const { el, isVisible } = useScrollReveal();
</script>
