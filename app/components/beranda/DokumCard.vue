<template>
  <div
    ref="el"
    class="transition-all duration-700 h-full"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    :style="{ transitionDelay: delay ? `${delay}ms` : '0ms' }"
  >
    <NuxtLink
      :to="`/dokumentasi/${articleSlug(ev)}`"
      class="h-full flex flex-col bg-bg-card border border-border rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-accent/40 group no-underline text-text-main cursor-pointer"
    >
      <!-- Thumbnail with aspect ratio -->
      <div
        class="relative overflow-hidden aspect-[16/10] bg-bg-card-2 shrink-0"
      >
        <AppImg
          :src="useImageUrl(ev.thumbnail)"
          :alt="ev.title"
          img-class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          class="w-full h-full"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
        />

        <!-- Tag & Featured Pill -->
        <div class="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            class="bg-bg-card/90 backdrop-blur-md text-text-main text-[0.7rem] font-bold px-2.5 py-1 rounded-md shadow-xs border border-border/50"
          >
            {{ ev.tag_text || "Dokumentasi" }}
          </span>
          <span
            v-if="isFeatured"
            class="bg-accent text-white text-[0.68rem] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1"
          >
            <Icon
              name="material-symbols:star-rounded"
              class="text-xs"
              aria-hidden="true"
            />
            Utama
          </span>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-5 flex flex-col flex-1 justify-between">
        <div>
          <!-- Date -->
          <div
            class="flex items-center gap-1.5 text-xs text-text-subtle mb-2 font-medium"
          >
            <Icon
              name="material-symbols:calendar-month-rounded"
              class="text-sm text-accent"
              aria-hidden="true"
            />
            <span>{{ formatDate(ev.start_date) }}</span>
          </div>

          <!-- Headline -->
          <h3
            class="text-base sm:text-lg font-bold text-text-main leading-snug group-hover:text-accent transition-colors line-clamp-2 mb-2"
          >
            {{ ev.title }}
          </h3>

          <!-- Excerpt -->
          <p
            v-if="ev.description"
            class="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-2 m-0"
          >
            {{ ev.description }}
          </p>
        </div>

        <!-- Read Action -->
        <div
          class="pt-4 mt-4 border-t border-border/50 flex items-center justify-between text-xs font-bold text-accent"
        >
          <span>Baca Selengkapnya</span>
          <Icon
            name="material-symbols:arrow-forward-rounded"
            class="text-base group-hover:translate-x-1 transition-transform duration-200"
            aria-hidden="true"
          />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { articleSlug } from "~/utils/articleSlug";

defineProps<{
  ev: {
    id?: number | string;
    title: string;
    description?: string;
    thumbnail?: string;
    tag_text?: string;
    start_date: string;
    slug?: string;
  };
  isFeatured?: boolean;
  delay?: number;
}>();

const { el, isVisible } = useScrollReveal();

function formatDate(s: string) {
  if (!s) return "";
  try {
    const d = new Date(s);
    if (isNaN(d.getTime())) return s;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return s;
  }
}
</script>
