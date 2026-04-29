<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/55 backdrop-blur-md z-[2000] flex items-center justify-center p-4 transition-opacity duration-300"
      @click.self="close"
    >
      <div
        class="sekbid-modal relative bg-bg-card border border-border rounded-3xl w-full max-w-[680px] max-h-[90dvh] overflow-y-auto shadow-[var(--shadow-lg)] animate-[modalSlideUp_0.28s_cubic-bezier(.4,0,.2,1)]"
        :style="cssVars"
      >
        <!-- Close -->
        <button
          class="absolute top-4 right-4 w-[34px] h-[34px] rounded-full bg-bg-card-2 text-text-muted flex items-center justify-center border-none cursor-pointer hover:bg-accent-soft hover:text-accent transition-colors z-20"
          @click="close"
          aria-label="Tutup"
        >
          <Icon name="material-symbols:close" size="20" />
        </button>

        <template v-if="sekbid">
          <!-- ── Hero Header (themed) ───────────────────── -->
          <div class="sekbid-hero relative px-7 md:px-9 pt-9 pb-7 overflow-hidden border-b border-border">
            <!-- Decorative blob -->
            <div class="sekbid-hero-blob absolute -top-20 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none" />
            <div class="sekbid-hero-blob-2 absolute -bottom-24 -left-10 w-52 h-52 rounded-full blur-3xl opacity-70 pointer-events-none" />

            <div class="relative flex items-center gap-4 md:gap-5 z-10">
              <!-- Big icon block (replaces SEKBID N badge as the focal element) -->
              <div class="sekbid-hero-icon w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-2xl flex items-center justify-center shrink-0 shadow-[0_8px_24px_-8px_var(--sekbid-color)]">
                <Icon :name="meta.icon" class="text-[36px] md:text-[44px]" />
              </div>

              <div class="flex-1 min-w-0 pr-8">
                <span class="inline-flex items-center gap-1.5 bg-bg-card border border-border text-[0.6rem] font-extrabold tracking-[0.12em] uppercase px-2 py-[3px] rounded-md mb-2 text-text-subtle leading-none">
                  {{ chipLabel }}
                </span>
                <h2 class="sekbid-hero-title text-[1.2rem] md:text-[1.45rem] font-extrabold m-0 leading-tight">
                  {{ sekbid.name }}
                </h2>
              </div>
            </div>
          </div>

          <!-- ── Body ───────────────────────────────────── -->
          <div class="px-7 md:px-9 py-7 md:py-8">
            <!-- Members section -->
            <section>
              <h4 class="sekbid-section-h flex items-center gap-1.5 text-[0.74rem] font-bold uppercase tracking-[0.08em] pb-2.5 mb-4 border-b border-border">
                <Icon name="material-symbols:group-rounded" class="text-base" />
                {{ isKomisi ? 'Anggota Komisi' : 'Anggota Sekbid' }}
                <span class="ml-auto text-text-subtle font-semibold tracking-normal normal-case">{{ members.length }}</span>
              </h4>

              <div v-if="members.length" class="grid grid-cols-3 sm:grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3">
                <button
                  v-for="member in members"
                  :key="member.name + member.role"
                  type="button"
                  class="sekbid-member group relative flex flex-col items-center text-center bg-bg-card-2 border border-border rounded-2xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                  :title="`Lihat profil ${member.name}`"
                  @click="openMemberProfile(member)"
                >
                  <!-- Koordinator crown -->
                  <span
                    v-if="isKoord(member.role)"
                    class="sekbid-crown absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 border-bg-card"
                    :title="member.role"
                  >
                    <Icon name="material-symbols:workspace-premium-rounded" class="text-base" />
                  </span>
                  <div class="mb-2">
                    <AppImg
                      :src="useImageUrl(member.foto, member.name)"
                      :alt="member.name"
                      rounded="full"
                      class="w-[58px] h-[58px] rounded-full"
                      @error="(e: Event) => onImgError(e, member.name)"
                    />
                  </div>
                  <p
                    v-if="member.role"
                    class="sekbid-role m-0 mb-1 text-[0.58rem] font-bold uppercase tracking-[0.06em] leading-[1.2]"
                  >
                    {{ member.role }}
                  </p>
                  <p class="text-[0.78rem] font-semibold text-text-main m-0 leading-snug line-clamp-2">{{ member.name }}</p>
                </button>
              </div>
              <p v-else class="text-[0.85rem] text-text-muted m-0">Belum ada anggota di sekbid ini.</p>
            </section>

            <!-- Program Kerja section (mirrors koordinator's programKerja) -->
            <section class="mt-7">
              <h4 class="sekbid-section-h flex items-center gap-1.5 text-[0.74rem] font-bold uppercase tracking-[0.08em] pb-2.5 mb-4 border-b border-border">
                <Icon name="material-symbols:checklist-rounded" class="text-base" />
                Program Kerja
                <span class="ml-auto text-text-subtle font-semibold tracking-normal normal-case">{{ programs.length }}</span>
              </h4>

              <!-- Subtle attribution: koordinator authors the sekbid's program kerja -->
              <p
                v-if="koordinator && programs.length"
                class="text-[0.72rem] text-text-subtle m-0 mb-3 inline-flex items-center gap-1"
              >
                <Icon name="material-symbols:workspace-premium-rounded" class="text-[0.9rem]" />
                Disusun oleh
                <button
                  type="button"
                  class="font-semibold text-text-main underline-offset-2 hover:underline cursor-pointer bg-transparent border-0 p-0"
                  @click="openKoordinatorProfile"
                >
                  {{ koordinator.nama }}
                </button>
              </p>

              <div v-if="programs.length" class="flex flex-col gap-2.5">
                <div
                  v-for="prog in programs"
                  :key="prog.id"
                  class="bg-bg-card-2 border border-border rounded-xl px-4 py-3 transition-colors hover:border-[color:var(--sekbid-color)]"
                >
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
                  <p v-if="prog.target" class="text-[0.74rem] text-text-subtle m-0 inline-flex items-center gap-1">
                    <Icon name="material-symbols:flag-rounded" class="text-[0.85rem]" /> {{ prog.target }}
                  </p>
                </div>
              </div>
              <p v-else class="text-[0.85rem] text-text-muted m-0">Belum ada program kerja direkam.</p>
            </section>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const {
  isSekbidModalOpen,
  selectedSekbid,
  closeSekbidModal,
  openPengurusModal,
  findPengurusForSekbidMember,
  findKoordinatorForSekbid,
  resolveSekbidPrograms,
} = useStruktur()

const isOpen  = computed(() => isSekbidModalOpen.value)
const sekbid  = computed(() => selectedSekbid.value)

const meta    = computed(() => useSekbidMeta(sekbid.value?.number))
const members = computed(() => sekbid.value?.members || [])

const isKomisi = computed(() =>
  !!sekbid.value?._isKomisi ||
  (typeof sekbid.value?.number === 'string' && /^[A-E]$/i.test(sekbid.value.number))
)
const chipLabel = computed(() =>
  isKomisi.value ? `Komisi ${sekbid.value?.number}` : `Sekbid ${sekbid.value?.number}`
)

// Sekbid PK = koordinator's PK (legacy SEKBID-scope used as fallback)
const programs    = computed(() => resolveSekbidPrograms(sekbid.value))
const koordinator = computed(() => sekbid.value?.number ? findKoordinatorForSekbid(sekbid.value.number) : null)

const cssVars = computed(() => ({
  '--sekbid-color': meta.value.color,
  '--sekbid-glow':  meta.value.glow,
}))

const isKoord = (role?: string) => /koordinator/i.test(role || '')

const close = () => closeSekbidModal()

/**
 * Click on a sekbid member → open their full Pengurus profile.
 * If we can't find a matching pengurus row (e.g. data inconsistency), we still
 * open a minimal modal using only the member fields we have.
 */
function openMemberProfile(member: { name: string; role?: string; foto?: string }) {
  const num = sekbid.value?.number
  if (!num) return

  const fallbackJabatan = isKomisi.value
    ? (member.role === 'Koordinator' ? `Koordinator Komisi ${num}` : `Komisi ${num}`)
    : (member.role || `Anggota Sekbid ${num}`)
  const full = findPengurusForSekbidMember(num, member.name) ?? {
    nama:          member.name,
    jabatan:       fallbackJabatan,
    foto:          member.foto,
    sekbid_number: isKomisi.value ? null : num,
    sekbid_role:   member.role,
    komisi:        isKomisi.value ? num : null,
    org:           isKomisi.value ? 'MPK' : 'OSIS',
  }

  closeSekbidModal()
  openPengurusModal(full)
}

function openKoordinatorProfile() {
  if (!koordinator.value) return
  closeSekbidModal()
  openPengurusModal(koordinator.value)
}

function onImgError(e: Event, name: string) {
  const img = e.target as HTMLImageElement
  img.src = useImageUrl('', name)
  img.onerror = null
}
</script>

<style scoped>
.sekbid-hero {
  background: linear-gradient(135deg, var(--sekbid-glow) 0%, transparent 65%);
}
.sekbid-hero-blob {
  background: var(--sekbid-glow);
}
.sekbid-hero-blob-2 {
  background: var(--sekbid-glow);
}
.sekbid-hero-icon {
  background: var(--sekbid-color);
  color: white;
}
.sekbid-hero-title {
  color: var(--text-main);
}
.sekbid-section-h {
  color: var(--sekbid-color);
}
.sekbid-role {
  color: var(--sekbid-color);
}
.sekbid-crown {
  background: var(--sekbid-color);
  color: white;
}
</style>

<style>
/* modalSlideUp keyframes are global, defined in PengurusModal.vue */
</style>
