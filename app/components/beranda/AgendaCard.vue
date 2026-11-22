<template>
  <div
    ref="el"
    class="transition-all duration-700 h-full"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    :style="{ transitionDelay: delay ? `${delay}ms` : '0ms' }"
  >
    <div
      class="h-full flex flex-col justify-between bg-bg-card border border-border rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-accent/40 group cursor-default"
    >
      <div>
        <!-- Date Badge & Range -->
        <div class="flex items-center justify-between gap-2 mb-3.5">
          <div
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-soft border border-accent/20 text-accent text-xs font-bold"
          >
            <Icon
              name="material-symbols:calendar-today-rounded"
              class="text-sm shrink-0"
              aria-hidden="true"
            />
            <span>{{ parsedDateRange }}</span>
          </div>

          <span
            class="text-[0.7rem] font-semibold text-text-subtle uppercase tracking-wider"
          >
            Agenda
          </span>
        </div>

        <h4
          class="text-base sm:text-lg font-bold text-text-main group-hover:text-accent transition-colors leading-snug mb-2"
        >
          {{ agenda.judul }}
        </h4>

        <p
          class="text-text-muted text-xs sm:text-sm leading-relaxed line-clamp-3 m-0"
        >
          {{ agenda.ket || "Kegiatan resmi OSIS/MPK Nawasena." }}
        </p>
      </div>

      <!-- Footer indicator -->
      <div
        class="pt-4 mt-4 border-t border-border/50 flex items-center justify-between text-xs text-text-subtle"
      >
        <span class="inline-flex items-center gap-1">
          <Icon
            name="material-symbols:schedule-rounded"
            class="text-sm"
            aria-hidden="true"
          />
          Terjadwal
        </span>
        <Icon
          name="material-symbols:arrow-forward-rounded"
          class="text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-accent transition-all duration-200"
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  agenda: {
    id?: number | string;
    judul: string;
    ket?: string;
    start_date: string;
    end_date?: string;
  };
  delay?: number;
}>();

const { el, isVisible } = useScrollReveal();
const { formatDate } = useAgenda();

const parsedDateRange = computed(() => {
  if (!props.agenda.start_date) return "Segera";
  if (
    props.agenda.end_date &&
    props.agenda.end_date !== props.agenda.start_date
  ) {
    return `${formatDate(props.agenda.start_date)} - ${formatDate(props.agenda.end_date)}`;
  }
  return formatDate(props.agenda.start_date);
});
</script>
