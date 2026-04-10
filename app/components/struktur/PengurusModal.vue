<template>
  <Teleport to="body">
    <div
      v-if="isPengurusModalOpen"
      class="fixed inset-0 bg-black/55 backdrop-blur-md z-[2000] flex items-center justify-center p-4 transition-opacity duration-300"
      @click.self="closePengurusModal"
    >
      <div class="relative bg-bg-card border border-border rounded-3xl w-full max-w-[520px] max-h-[90dvh] overflow-y-auto p-7 md:p-8 shadow-[var(--shadow-lg)] animate-[modalSlideUp_0.28s_cubic-bezier(.4,0,.2,1)]">

        <!-- Close -->
        <button
          class="absolute top-4 right-4 w-8 h-8 rounded-full bg-bg-card-2 text-text-muted flex items-center justify-center border-none cursor-pointer hover:bg-accent-soft hover:text-accent transition-colors"
          @click="closePengurusModal"
          aria-label="Tutup"
        >
          <Icon name="material-symbols:close" size="20" />
        </button>

        <template v-if="p">

          <!-- ── Profile header ───────────────────────── -->
          <div class="flex gap-5 items-start mb-6 pr-8 max-sm:flex-col max-sm:items-center max-sm:text-center">
            <!-- Avatar -->
            <div class="relative shrink-0">
              <img
                :src="useImageUrl(p.foto, p.nama)"
                :alt="p.nama"
                class="w-[88px] h-[88px] rounded-full object-cover border-[3px] border-accent bg-bg-card-2"
                loading="lazy"
                decoding="async"
                @error="onImgError"
              />
              <span v-if="p.online" class="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-bg-card rounded-full" title="Sedang online" />
            </div>
            <!-- Meta -->
            <div class="flex-1 pt-1">
              <span class="inline-block bg-accent-soft text-accent text-[0.62rem] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md mb-2">{{ p.jabatan }}</span>
              <h3 class="text-[1.25rem] font-extrabold text-text-main m-0 mb-2 leading-tight">{{ p.nama }}</h3>
              <div class="flex flex-wrap gap-2 max-sm:justify-center">
                <span v-if="p.kelas" class="inline-flex items-center gap-1 text-[0.75rem] text-text-muted bg-bg-card-2 border border-border px-2 py-0.5 rounded-full">
                  <Icon name="material-symbols:class" class="text-sm" /> {{ p.kelas }}
                </span>
                <span v-if="p.hobi" class="inline-flex items-center gap-1 text-[0.75rem] text-text-muted bg-bg-card-2 border border-border px-2 py-0.5 rounded-full">
                  <Icon name="material-symbols:favorite-outline" class="text-sm" /> {{ p.hobi }}
                </span>
              </div>
            </div>
          </div>

          <!-- ── Biodata ───────────────────────────────── -->
          <div class="mt-5">
            <h4 class="flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-wider text-accent border-b border-border pb-2 mb-3">
              <Icon name="material-symbols:badge" class="text-sm" /> Biodata Lengkap
            </h4>
            <div class="flex flex-col gap-2">
              <div v-for="row in biodataRows" :key="row.label" class="flex items-baseline gap-3 bg-bg-card-2 border border-border rounded-xl px-3.5 py-2">
                <span class="shrink-0 min-w-[130px] text-[0.73rem] font-semibold text-text-muted">{{ row.label }}</span>
                <span class="text-[0.83rem] text-text-main" :class="{ 'italic': row.italic }">{{ row.value }}</span>
              </div>
            </div>
          </div>

          <!-- ── Visi & Misi ──────────────────────────── -->
          <div v-if="hasVisiMisi" class="mt-5">
            <h4 class="flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-wider text-accent border-b border-border pb-2 mb-3">
              <Icon name="material-symbols:my-location" class="text-sm" /> Visi &amp; Misi
            </h4>
            <div v-if="p.visi" class="mb-3">
              <p class="text-[0.73rem] font-bold text-text-muted mb-1.5">Visi</p>
              <ul v-if="Array.isArray(p.visi)" class="pl-4 flex flex-col gap-1 m-0">
                <li v-for="(v, i) in p.visi" :key="i" class="text-[0.87rem] text-text-main">{{ v }}</li>
              </ul>
              <p v-else class="text-[0.87rem] text-text-main m-0">{{ p.visi }}</p>
            </div>
            <div v-if="p.misi?.length">
              <p class="text-[0.73rem] font-bold text-text-muted mb-1.5">Misi</p>
              <ul class="pl-4 flex flex-col gap-1 m-0">
                <li v-for="(m, i) in p.misi" :key="i" class="text-[0.87rem] text-text-main">{{ m }}</li>
              </ul>
            </div>
          </div>

          <!-- ── Program Kerja ───────────────────────── -->
          <div class="mt-5">
            <h4 class="flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-wider text-accent border-b border-border pb-2 mb-3">
              <Icon name="material-symbols:checklist" class="text-sm" /> Program Kerja
            </h4>
            <div v-if="p.programKerja?.length" class="flex flex-col gap-2.5">
              <div v-for="prog in p.programKerja" :key="prog.id" class="bg-bg-card-2 border border-border rounded-xl px-3.5 py-2.5">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <span class="text-[0.87rem] font-semibold text-text-main">{{ prog.nama }}</span>
                  <span
                    class="text-[0.62rem] font-bold px-2 py-0.5 rounded-full shrink-0"
                    :class="{
                      'bg-[var(--badge-ongoing-bg)] text-[var(--badge-ongoing-text)]': prog.status === 'Berjalan',
                      'bg-[var(--badge-done-bg)] text-[var(--badge-done-text)]': prog.status === 'Selesai',
                      'bg-[var(--badge-plan-bg)] text-[var(--badge-plan-text)]': !prog.status || prog.status === 'Direncanakan',
                    }"
                  >{{ prog.status || 'Direncanakan' }}</span>
                </div>
                <p v-if="prog.deskripsi" class="text-[0.78rem] text-text-muted m-0 mb-1">{{ prog.deskripsi }}</p>
                <p v-if="prog.target" class="text-[0.72rem] text-text-subtle m-0">Target: {{ prog.target }}</p>
              </div>
            </div>
            <p v-else class="text-[0.85rem] text-text-muted m-0">Belum ada program kerja direkam.</p>
          </div>

        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { isPengurusModalOpen, selectedPengurus, closePengurusModal } = useStruktur()
const p = computed(() => selectedPengurus.value)

const hasVisiMisi = computed(() => {
  if (!p.value) return false
  const hasVisi = Array.isArray(p.value.visi) ? p.value.visi.length > 0 : !!p.value.visi
  const hasMisi = Array.isArray(p.value.misi) && p.value.misi.length > 0
  return hasVisi || hasMisi
})

const biodataRows = computed(() => {
  if (!p.value) return []
  return [
    { label: 'Nama',              value: p.value.nama || '—' },
    { label: 'Kelas',             value: p.value.kelas || '—' },
    { label: 'Tempat / Tgl Lahir', value: [p.value.tempatLahir, p.value.tanggalLahir].filter(Boolean).join(', ') || '—' },
    { label: 'Alamat',            value: p.value.alamat || '—' },
    { label: 'Hobi',              value: p.value.hobi || '—' },
    { label: 'Motto',             value: `"${p.value.motto || '—'}"`, italic: true },
  ]
})

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = useImageUrl('', p.value?.nama)
  img.onerror = null
}
</script>

<style>
@keyframes modalSlideUp {
  from { opacity: 0; transform: translateY(18px) scale(0.97); }
  to   { opacity: 1; transform: none; }
}
</style>
