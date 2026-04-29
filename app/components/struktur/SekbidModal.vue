<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/55 backdrop-blur-md z-[2000] flex items-center justify-center p-4 transition-opacity duration-300"
      @click.self="close"
    >
      <div class="relative bg-bg-card border border-border rounded-3xl w-full max-w-[680px] max-h-[90dvh] overflow-y-auto p-8 shadow-[var(--shadow-lg)] animate-[modalSlideUp_0.28s_cubic-bezier(.4,0,.2,1)]">
        
        <!-- Close -->
        <button
          class="absolute top-4 right-4 w-[34px] h-[34px] rounded-full bg-bg-card-2 text-text-muted flex items-center justify-center border-none cursor-pointer hover:bg-accent-soft hover:text-accent transition-colors"
          @click="close"
          aria-label="Tutup"
        >
          <Icon name="material-symbols:close" size="20" />
        </button>

        <template v-if="sekbid">
          <!-- ── Header ─────────────────────────────────── -->
          <div class="mb-7 pr-8">
            <span class="inline-block bg-accent-soft text-accent text-[0.62rem] font-extrabold tracking-[0.08em] uppercase px-2.5 py-1 rounded-md mb-2">
              SEKBID {{ sekbid.number }}
            </span>
            <h2 class="text-[1.4rem] font-extrabold text-text-main m-0 mb-2 leading-tight">{{ sekbid.name }}</h2>
            <p v-if="sekbid.description" class="text-[0.9rem] text-text-muted m-0 leading-relaxed">{{ sekbid.description }}</p>
          </div>

          <!-- ── Members ────────────────────────────────── -->
          <div class="mt-6">
            <h4 class="flex items-center gap-1.5 text-[0.76rem] font-bold uppercase tracking-[0.06em] text-accent border-b border-border pb-2 mb-4">
              <Icon name="material-symbols:group" class="text-sm" /> Anggota Sekbid
            </h4>
            <div v-if="members.length" class="grid grid-cols-3 sm:grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3">
              <div v-for="member in members" :key="member.name + member.role" class="flex flex-col items-center text-center bg-bg-card-2 border border-border rounded-2xl p-3.5 transition-all duration-200 hover:border-accent hover:-translate-y-0.5">
                <div class="mb-2">
                  <AppImg
                    :src="useImageUrl(member.foto, member.name)"
                    :alt="member.name"
                    rounded="full"
                    class="w-[58px] h-[58px] rounded-full"
                    @error="(e) => onImgError(e, member.name)"
                  />
                </div>
                <p v-if="member.role" class="text-[0.58rem] font-bold uppercase tracking-[0.06em] text-accent m-0 mb-1 leading-[1.2]">{{ member.role }}</p>
                <p class="text-[0.78rem] font-semibold text-text-main m-0 leading-snug line-clamp-2">{{ member.name }}</p>
              </div>
            </div>
            <p v-else class="text-[0.85rem] text-text-muted m-0">Belum ada anggota di sekbid ini.</p>
          </div>

          <!-- ── Program Kerja ──────────────────────────── -->
          <div class="mt-6">
            <h4 class="flex items-center gap-1.5 text-[0.76rem] font-bold uppercase tracking-[0.06em] text-accent border-b border-border pb-2 mb-4">
              <Icon name="material-symbols:checklist" class="text-sm" /> Program Kerja
            </h4>
            <div v-if="sekbid.programs?.length" class="flex flex-col gap-2.5">
              <div v-for="prog in sekbid.programs" :key="prog.id" class="bg-bg-card-2 border border-border rounded-xl px-3.5 py-2.5">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <span class="text-[0.88rem] font-semibold text-text-main">{{ prog.name }}</span>
                  <span
                    class="text-[0.65rem] font-bold px-2 py-0.5 rounded-full shrink-0"
                    :class="{
                      'bg-[var(--badge-ongoing-bg)] text-[var(--badge-ongoing-text)]': prog.status === 'Berjalan',
                      'bg-[var(--badge-done-bg)] text-[var(--badge-done-text)]': prog.status === 'Selesai',
                      'bg-[var(--badge-plan-bg)] text-[var(--badge-plan-text)]': !prog.status || prog.status === 'Direncanakan',
                    }"
                  >{{ prog.status || 'Direncanakan' }}</span>
                </div>
                <p v-if="prog.description" class="text-[0.8rem] text-text-muted m-0 mb-1">{{ prog.description }}</p>
                <p v-if="prog.target" class="text-[0.75rem] text-text-subtle m-0">Target: {{ prog.target }}</p>
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

const { isSekbidModalOpen, selectedSekbid, closeSekbidModal } = useStruktur()
const isOpen  = computed(() => isSekbidModalOpen.value)
const sekbid  = computed(() => selectedSekbid.value)

// members from API: { name, role, foto } — already filtered by sekbid_number in backend
const members = computed(() => sekbid.value?.members || [])

const close = () => closeSekbidModal()

function onImgError(e: Event, name: string) {
  const img = e.target as HTMLImageElement
  img.src = useImageUrl('', name)
  img.onerror = null
}
</script>

<style>
/* modalSlideUp is assumed to act globally, as added in PengurusModal.vue */
</style>
