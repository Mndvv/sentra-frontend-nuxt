<template>
  <div class="bg-bg-card p-5 md:p-8 rounded-2xl shadow-md border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <small class="text-accent font-semibold block mb-2">
      {{ agenda.end_date ? `${formatDate(agenda.start_date)} s.d. ${formatDate(agenda.end_date)}` : formatDate(agenda.start_date) }}
    </small>
    <h3 class="text-lg font-bold mb-2">{{ agenda.judul }}</h3>
    <p class="text-text-muted text-[0.95rem] m-0">{{ agenda.ket }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  agenda: any
}>()

const { formatDate } = useAgenda()
</script>
