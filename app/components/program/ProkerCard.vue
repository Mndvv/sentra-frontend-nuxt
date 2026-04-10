<template>
  <article class="bg-bg-card border border-border rounded-2xl shadow p-[1.25rem_1.35rem_1.35rem] flex flex-col gap-[0.6rem] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-md hover:border-[rgba(99,102,241,0.25)] h-full">
    <div class="flex items-start justify-between">
      <div class="flex gap-[0.4rem] flex-wrap">
        <span class="inline-flex items-center text-[0.68rem] font-bold px-2 py-[3px] rounded-[6px] tracking-[0.04em] uppercase" :style="scopeStyle">{{ prog.scope || 'BPH' }}</span>
        <span class="inline-flex items-center text-[0.68rem] font-bold px-2 py-[3px] rounded-[6px] tracking-[0.04em] uppercase" :class="statusBadgeClass">
          <span class="inline-block w-[6px] h-[6px] rounded-full mr-[5px] align-middle" :class="statusDotClass"></span>
          {{ statusLabel }}
        </span>
      </div>
    </div>
    
    <h3 class="text-[0.95rem] font-bold text-text-main leading-[1.4] m-0">{{ prog.nama }}</h3>
    
    <div v-if="prog.scope === 'SEKBID' && prog.owner_id" class="text-[0.75rem] text-text-subtle font-medium flex items-center gap-[3px]">
      <Icon name="material-symbols:group" class="opacity-[0.55] text-[0.85rem] align-middle" />
      {{ prog.sekbid_name ? `Sekbid ${prog.owner_id} · ${prog.sekbid_name}` : `Sekbid ${prog.owner_id}` }}
    </div>
    
    <p v-if="prog.deskripsi" class="text-[0.82rem] text-text-muted leading-[1.55] m-0 line-clamp-2 flex-1">{{ prog.deskripsi }}</p>
    <div v-else class="flex-1"></div>
    
    <div v-if="prog.target" class="text-[0.78rem] text-text-subtle font-medium mt-auto pt-[0.5rem] border-t border-border flex items-center gap-1 block w-full">
      <Icon name="material-symbols:calendar-month" class="opacity-[0.6] text-[0.9rem] align-middle" />
      {{ prog.target }}
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  prog: any
}>()

const SCOPE_COLORS: Record<string, any> = {
  'BPH':    { bg: 'rgba(99,102,241,0.10)', text: '#6366f1', border: 'rgba(99,102,241,0.2)' },
  'SEKBID': { bg: 'rgba(168,85,247,0.10)', text: '#a855f7', border: 'rgba(168,85,247,0.2)' },
}

const STATUS_CONFIG: Record<string, any> = {
  'Berjalan':    { dotClass: 'bg-[#fbbf24] dark:bg-[#f59e0b]', badgeClass: 'bg-[rgba(254,243,199,0.12)] text-[#fbbf24] dark:bg-[rgba(245,158,11,0.12)] dark:text-[#d97706]', label: 'Berjalan' },
  'Selesai':     { dotClass: 'bg-[#4ade80] dark:bg-[#22c55e]', badgeClass: 'bg-[rgba(220,252,231,0.12)] text-[#4ade80] dark:bg-[rgba(34,197,94,0.12)] dark:text-[#16a34a]', label: 'Selesai' },
  'Direncanakan':{ dotClass: 'bg-[#94a3b8] dark:bg-[#94a3b8]', badgeClass: 'bg-[rgba(226,232,240,0.1)] text-[#94a3b8] dark:bg-[rgba(148,163,184,0.12)] dark:text-[#64748b]', label: 'Direncanakan' },
}

// Ensure proper fallback to var based styling or static styling. using tailwind classes instead of vars for testing
const scopeData = computed(() => SCOPE_COLORS[props.prog.scope] || SCOPE_COLORS['BPH'])
const scopeStyle = computed(() => `background:${scopeData.value.bg};color:${scopeData.value.text};border:1px solid ${scopeData.value.border}`)

const statusData = computed(() => STATUS_CONFIG[props.prog.status || 'Direncanakan'] || STATUS_CONFIG['Direncanakan'])

// Support backward compat by falling back to simple inline if needed
const isDarkClassSupportFallbackToInlineDot = computed(() => statusData.value.dotClass || `bg-[#94a3b8]`)
const isDarkClassSupportFallbackToInlineBadge = computed(() => statusData.value.badgeClass || `bg-[rgba(148,163,184,0.12)] text-[#64748b]`)

const statusDotClass = computed(() => {
    switch (props.prog.status) {
        case 'Berjalan': return 'bg-[#f59e0b]';
        case 'Selesai': return 'bg-[#22c55e]';
        default: return 'bg-[#94a3b8]';
    }
})

const statusBadgeClass = computed(() => {
    switch (props.prog.status) {
        case 'Berjalan': return 'bg-orange-100 text-[#d97706] dark:bg-orange-500/10 dark:text-[#fbbf24]';
        case 'Selesai': return 'bg-green-100 text-[#16a34a] dark:bg-green-500/10 dark:text-[#4ade80]';
        default: return 'bg-slate-200 text-[#64748b] dark:bg-slate-500/10 dark:text-[#94a3b8]';
    }
})

const statusLabel = computed(() => statusData.value.label)
</script>
