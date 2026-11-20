<template>
  <div
    ref="el"
    class="transition-all duration-700 h-full"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    :style="{ transitionDelay: delay ? `${delay}ms` : '0ms' }"
  >
    <div
      class="h-full flex flex-col justify-between bg-bg-card border border-border rounded-xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-accent/40 group cursor-default"
    >
      <div>
        <!-- Badges: Status + Sekbid -->
        <div class="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
          <!-- Status pill -->
          <span
            class="text-[0.7rem] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border"
            :class="{
              'bg-[var(--badge-ongoing-bg)] text-[var(--badge-ongoing-text)] border-amber-500/20':
                program.status === 'Berjalan',
              'bg-[var(--badge-done-bg)] text-[var(--badge-done-text)] border-green-500/20':
                program.status === 'Selesai',
              'bg-[var(--badge-plan-bg)] text-[var(--badge-plan-text)] border-indigo-500/20':
                !program.status || program.status === 'Direncanakan',
            }"
          >
            <span
              class="w-1.5 h-1.5 rounded-full"
              :class="{
                'bg-amber-500 animate-pulse': program.status === 'Berjalan',
                'bg-green-500': program.status === 'Selesai',
                'bg-indigo-400':
                  !program.status || program.status === 'Direncanakan',
              }"
            />
            {{ program.status || "Direncanakan" }}
          </span>

          <!-- Sekbid Tag -->
          <span
            class="text-[0.68rem] font-semibold px-2 py-0.5 rounded-md bg-bg-card-2 text-text-subtle border border-border/80"
          >
            {{ program.sekbid_name || "BPH" }}
          </span>
        </div>

        <!-- Title -->
        <h4
          class="text-sm sm:text-base font-bold text-text-main leading-snug mb-2 group-hover:text-accent transition-colors"
        >
          {{ program.nama }}
        </h4>

        <!-- Description -->
        <p
          v-if="program.deskripsi"
          class="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3 m-0"
        >
          {{ program.deskripsi }}
        </p>
      </div>

      <!-- Footer indicator -->
      <div
        class="pt-4 mt-4 border-t border-border/50 flex items-center justify-between text-xs text-text-subtle"
      >
        <span class="text-[0.72rem] font-medium text-text-subtle"
          >Program Nawasena</span
        >
        <Icon
          name="material-symbols:arrow-forward-rounded"
          class="text-sm text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  program: {
    id?: number | string;
    nama: string;
    deskripsi?: string;
    status?: string;
    sekbid_name?: string;
  };
  delay?: number;
}>();

const { el, isVisible } = useScrollReveal();
</script>
