<template>
  <div class="bg-bg-card border border-border rounded-2xl p-5 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-md cursor-default">
    <div class="flex items-center gap-2 flex-wrap">
      <span
        class="text-[0.62rem] font-bold px-2 py-0.5 rounded-full"
        :class="{
          'bg-[var(--badge-ongoing-bg)] text-[var(--badge-ongoing-text)]': program.status === 'Berjalan',
          'bg-[var(--badge-done-bg)] text-[var(--badge-done-text)]': program.status === 'Selesai',
          'bg-[var(--badge-plan-bg)] text-[var(--badge-plan-text)]': !program.status || program.status === 'Direncanakan',
        }"
      >{{ program.status || 'Direncanakan' }}</span>
      <span
        v-if="program.sekbid_name"
        class="text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-bg-card-2 text-text-subtle border border-border"
      >{{ program.sekbid_name }}</span>
      <span
        v-else
        class="text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-accent-soft text-accent"
      >BPH</span>
    </div>
    <h4 class="text-[0.88rem] font-bold text-text-main leading-snug m-0">{{ program.nama }}</h4>
    <p v-if="program.deskripsi" class="text-[0.78rem] text-text-muted leading-relaxed m-0 line-clamp-2">{{ program.deskripsi }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  program: any
}>()
</script>
