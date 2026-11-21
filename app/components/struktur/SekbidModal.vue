<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sekbid-modal-title"
      @click.self="close"
    >
      <div
        class="relative bg-bg-card border border-border rounded-2xl sm:rounded-3xl w-full max-w-[680px] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-[modalSlideUp_0.24s_cubic-bezier(.16,1,0.3,1)]"
        :style="cssVars"
      >
        <!-- Close button: 40x40px touch area -->
        <button
          type="button"
          class="absolute top-4 right-4 w-10 h-10 rounded-full bg-bg-card-2 text-text-muted hover:text-text-main hover:bg-accent-soft hover:text-accent transition-colors flex items-center justify-center border-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent z-20"
          aria-label="Tutup"
          @click="close"
        >
          <Icon
            name="material-symbols:close"
            class="text-xl"
            aria-hidden="true"
          />
        </button>

        <template v-if="sekbid">
          <!-- ── Header ─────────────────────────────────── -->
          <div
            class="px-6 sm:px-8 pt-7 pb-6 border-b border-border flex items-center gap-4"
          >
            <div
              class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
              :style="{ background: 'var(--sekbid-color)', color: '#ffffff' }"
            >
              <Icon
                :name="meta.icon"
                class="text-[32px] sm:text-[38px]"
                aria-hidden="true"
              />
            </div>

            <div class="flex-1 min-w-0 pr-10">
              <span
                class="inline-flex items-center gap-1.5 bg-bg-card-2 border border-border text-[0.62rem] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-md mb-1.5 text-text-subtle leading-none"
              >
                {{ chipLabel }}
              </span>
              <h2
                id="sekbid-modal-title"
                class="text-xl sm:text-2xl font-black text-text-main m-0 leading-tight"
              >
                {{ sekbid.name }}
              </h2>
            </div>
          </div>

          <!-- ── Content (Scrollable) ───────────────────── -->
          <div class="overflow-y-auto px-6 sm:px-8 py-6 flex flex-col gap-6">
            <!-- Anggota Sekbid / Komisi -->
            <section>
              <h4
                class="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-wider text-accent pb-2.5 mb-4 border-b border-border"
              >
                <Icon
                  name="material-symbols:group-rounded"
                  class="text-base text-accent"
                  aria-hidden="true"
                />
                {{ isKomisi ? "Anggota Komisi" : "Anggota Sekbid" }}
                <span
                  class="ml-auto text-text-subtle font-semibold tracking-normal normal-case"
                >
                  {{ members.length }}
                </span>
              </h4>

              <div
                v-if="members.length"
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
              >
                <button
                  v-for="member in members"
                  :key="member.name + (member.role || '')"
                  type="button"
                  class="group relative flex flex-col items-center text-center bg-bg-card-2 border border-border rounded-2xl p-3 sm:p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-accent/40 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  :title="`Lihat profil ${member.name}`"
                  @click="openMemberProfile(member)"
                >
                  <!-- Koordinator indicator -->
                  <span
                    v-if="isKoord(member.role)"
                    class="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center shadow-sm border-2 border-bg-card"
                    :style="{
                      background: 'var(--sekbid-color)',
                      color: '#ffffff',
                    }"
                    :title="member.role"
                  >
                    <Icon
                      name="material-symbols:workspace-premium-rounded"
                      class="text-sm"
                      aria-hidden="true"
                    />
                  </span>

                  <div class="mb-2">
                    <AppImg
                      :src="useImageUrl(member.foto, member.name)"
                      :alt="member.name"
                      rounded="full"
                      class="w-14 h-14 rounded-full border-2 border-border group-hover:border-accent transition-colors duration-200"
                      @error="(e: Event) => onImgError(e, member.name)"
                    />
                  </div>

                  <p
                    v-if="member.role"
                    class="m-0 mb-1 text-[0.6rem] font-bold uppercase tracking-wider leading-tight text-text-muted"
                  >
                    {{ member.role }}
                  </p>
                  <p
                    class="text-[0.78rem] font-semibold text-text-main m-0 leading-snug line-clamp-2"
                  >
                    {{ member.name }}
                  </p>
                </button>
              </div>
              <p v-else class="text-[0.84rem] text-text-muted m-0">
                Belum ada anggota di sekbid ini.
              </p>
            </section>

            <!-- Program Kerja -->
            <section>
              <h4
                class="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-wider text-accent pb-2.5 mb-4 border-b border-border"
              >
                <Icon
                  name="material-symbols:checklist-rounded"
                  class="text-base text-accent"
                  aria-hidden="true"
                />
                Program Kerja
                <span
                  class="ml-auto text-text-subtle font-semibold tracking-normal normal-case"
                >
                  {{ programs.length }}
                </span>
              </h4>

              <p
                v-if="koordinator && programs.length"
                class="text-[0.72rem] text-text-subtle m-0 mb-3 inline-flex items-center gap-1.5"
              >
                <Icon
                  name="material-symbols:workspace-premium-rounded"
                  class="text-sm text-accent"
                  aria-hidden="true"
                />
                Disusun oleh
                <button
                  type="button"
                  class="font-semibold text-text-main underline-offset-2 hover:underline hover:text-accent cursor-pointer bg-transparent border-0 p-0 transition-colors"
                  @click="openKoordinatorProfile"
                >
                  {{ koordinator.nama }}
                </button>
              </p>

              <div v-if="programs.length" class="flex flex-col gap-2.5">
                <div
                  v-for="prog in programs"
                  :key="prog.id"
                  class="bg-bg-card-2 border border-border rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors hover:border-accent/40"
                >
                  <div class="flex items-start justify-between gap-2">
                    <span
                      class="text-[0.88rem] font-semibold text-text-main leading-snug"
                    >
                      {{ prog.name }}
                    </span>
                    <span
                      class="text-[0.62rem] font-semibold px-2 py-0.5 rounded-full shrink-0 leading-none"
                      :class="{
                        'bg-[var(--badge-ongoing-bg)] text-[var(--badge-ongoing-text)]':
                          prog.status === 'Berjalan',
                        'bg-[var(--badge-done-bg)] text-[var(--badge-done-text)]':
                          prog.status === 'Selesai',
                        'bg-[var(--badge-plan-bg)] text-[var(--badge-plan-text)]':
                          !prog.status || prog.status === 'Direncanakan',
                      }"
                    >
                      {{ prog.status || "Direncanakan" }}
                    </span>
                  </div>
                  <p
                    v-if="prog.description"
                    class="text-[0.8rem] text-text-muted m-0 leading-relaxed"
                  >
                    {{ prog.description }}
                  </p>
                  <p
                    v-if="prog.target"
                    class="text-[0.72rem] text-text-subtle m-0 inline-flex items-center gap-1"
                  >
                    <Icon
                      name="material-symbols:flag-rounded"
                      class="text-xs"
                      aria-hidden="true"
                    />
                    Target: {{ prog.target }}
                  </p>
                </div>
              </div>
              <p v-else class="text-[0.84rem] text-text-muted m-0">
                Belum ada program kerja direkam.
              </p>
            </section>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from "vue";
import { useImageUrl } from "~/composables/useImageUrl";
import { useSekbidMeta } from "~/composables/useSekbidMeta";

const {
  isSekbidModalOpen,
  isPengurusModalOpen,
  selectedSekbid,
  closeSekbidModal,
  openPengurusModal,
  findPengurusForSekbidMember,
  findKoordinatorForSekbid,
  resolveSekbidPrograms,
} = useStruktur();

const isOpen = computed(() => isSekbidModalOpen.value);
const sekbid = computed(() => selectedSekbid.value);

const meta = computed(() => useSekbidMeta(sekbid.value?.number));
const members = computed(() => sekbid.value?.members || []);

const isKomisi = computed(
  () =>
    !!sekbid.value?._isKomisi ||
    (typeof sekbid.value?.number === "string" &&
      /^[A-E]$/i.test(sekbid.value.number)),
);
const chipLabel = computed(() =>
  isKomisi.value
    ? `Komisi ${sekbid.value?.number}`
    : `Sekbid ${sekbid.value?.number}`,
);

const programs = computed(() => resolveSekbidPrograms(sekbid.value));
const koordinator = computed(() =>
  sekbid.value?.number ? findKoordinatorForSekbid(sekbid.value.number) : null,
);

const cssVars = computed(() => ({
  "--sekbid-color": meta.value.color,
  "--sekbid-glow": meta.value.glow,
}));

const isKoord = (role?: string) => /koordinator/i.test(role || "");

const close = () => closeSekbidModal();

function openMemberProfile(member: {
  name: string;
  role?: string;
  foto?: string;
}) {
  const num = sekbid.value?.number;
  if (!num) return;

  const fallbackJabatan = isKomisi.value
    ? member.role === "Koordinator"
      ? `Koordinator Komisi ${num}`
      : `Komisi ${num}`
    : member.role || `Anggota Sekbid ${num}`;
  const full = findPengurusForSekbidMember(num, member.name) ?? {
    nama: member.name,
    jabatan: fallbackJabatan,
    foto: member.foto,
    sekbid_number: isKomisi.value ? null : num,
    sekbid_role: member.role,
    komisi: isKomisi.value ? num : null,
    org: isKomisi.value ? "MPK" : "OSIS",
  };

  closeSekbidModal();
  openPengurusModal(full);
}

function openKoordinatorProfile() {
  if (!koordinator.value) return;
  closeSekbidModal();
  openPengurusModal(koordinator.value);
}

function onImgError(e: Event, name: string) {
  const img = e.target as HTMLImageElement;
  img.src = useImageUrl("", name);
  img.onerror = null;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && isSekbidModalOpen.value) {
    close();
  }
}

function restoreScroll() {
  if (!import.meta.client) return;
  if (!isSekbidModalOpen.value && !isPengurusModalOpen.value) {
    document.body.style.overflow = "";
  }
}

watch(
  isOpen,
  (open) => {
    if (!import.meta.client) return;
    if (open) {
      window.addEventListener("keydown", onKeydown);
      document.body.style.overflow = "hidden";
    } else {
      window.removeEventListener("keydown", onKeydown);
      restoreScroll();
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (!import.meta.client) return;
  window.removeEventListener("keydown", onKeydown);
  restoreScroll();
});
</script>

<style scoped>
@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-\[modalSlideUp_0\.24s_cubic-bezier\(\.16\,1\,0\.3\,1\)\] {
    animation: none !important;
  }
}
</style>
