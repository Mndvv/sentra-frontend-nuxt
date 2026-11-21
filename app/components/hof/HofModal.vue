<template>
  <Transition name="hof-modal">
    <div
      v-if="isHofModalOpen"
      class="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none"
      role="dialog"
      aria-modal="true"
      :aria-label="modalTitle"
      @click.self="closeHofModal"
    >
      <div
        ref="panel"
        class="relative w-full max-w-[720px] max-h-[88vh] bg-bg-card border border-border rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden outline-none"
        tabindex="-1"
      >
        <!-- Modal Header -->
        <header
          class="flex items-center justify-between gap-3 px-6 py-4 border-b border-border bg-bg-card-2/50"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <span
              class="w-8 h-8 rounded-lg bg-accent-soft text-accent flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <Icon name="material-symbols:auto-awesome" class="text-base" />
            </span>
            <h3
              class="text-base sm:text-lg font-bold text-text-main m-0 truncate"
            >
              {{ modalTitle }}
            </h3>
          </div>

          <button
            type="button"
            class="w-9 h-9 rounded-full bg-bg-card border border-border text-text-muted hover:text-text-main hover:bg-accent-soft hover:text-accent flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0"
            aria-label="Tutup"
            @click="closeHofModal"
          >
            <Icon name="material-symbols:close" class="text-lg" />
          </button>
        </header>

        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto w-full">
          <!-- ── MEMBER PROFILE ───────────────────────────────── -->
          <div
            v-if="modalType === 'MEMBER_PROFILE'"
            class="flex flex-col items-center text-center gap-3 py-4"
          >
            <div class="relative w-24 h-24 rounded-full">
              <AppImg
                :src="useImageUrl(modalData?.foto, modalData?.nama)"
                :alt="modalData?.nama"
                rounded="full"
                loading="lazy"
                class="w-full h-full rounded-full border-2 border-accent shadow-md"
              />
            </div>
            <span
              class="text-xs font-bold uppercase tracking-wider text-accent bg-accent-soft px-3 py-1 rounded-full border border-accent/20"
            >
              {{ modalData?.jabatan }}
            </span>
            <h4 class="text-xl font-black text-text-main m-0">
              {{ modalData?.nama }}
            </h4>
            <p
              v-if="modalData?.motto"
              class="text-sm text-text-muted italic max-w-md leading-relaxed m-0 mt-1"
            >
              "{{ modalData?.motto }}"
            </p>
          </div>

          <!-- ── PERIOD MEMBERS ───────────────────────────────── -->
          <div
            v-else-if="modalType === 'PERIOD_MEMBERS'"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            <button
              v-for="m in modalData?.members ?? modalData"
              :key="m.id ?? m.nama"
              type="button"
              class="group flex flex-col items-center text-center p-3 rounded-xl bg-bg-card-2 border border-border hover:border-accent/40 hover:shadow-xs transition-all cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              @click="openMemberProfileModal(m)"
            >
              <div
                class="w-14 h-14 rounded-full mb-2 overflow-hidden border border-border group-hover:border-accent transition-colors"
              >
                <AppImg
                  :src="useImageUrl(m.foto, m.nama)"
                  :alt="m.nama"
                  rounded="full"
                  loading="lazy"
                  class="w-full h-full"
                />
              </div>
              <span
                class="text-[0.62rem] font-bold uppercase tracking-wider text-text-muted mb-0.5"
              >
                {{ m.jabatan }}
              </span>
              <span class="text-xs font-semibold text-text-main line-clamp-1">
                {{ m.nama }}
              </span>
            </button>
          </div>

          <!-- ── OLDER PERIODS ────────────────────────────────── -->
          <div
            v-else-if="modalType === 'OLDER_PERIODS'"
            class="flex flex-col gap-3"
          >
            <div
              v-for="g in modalData"
              :key="g.angkatan"
              class="p-4 rounded-xl bg-bg-card-2 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <span
                  class="text-xs font-bold uppercase tracking-wider text-accent"
                >
                  Angkatan Ke-{{ g.angkatan }}
                </span>
                <p class="text-sm font-semibold text-text-main m-0 mt-0.5">
                  {{ g.osis?.nama || g.mpk?.nama || "Arsip Angkatan" }}
                </p>
              </div>

              <div class="flex items-center gap-2">
                <button
                  v-if="g.osis"
                  type="button"
                  class="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-accent text-white hover:bg-accent-hover transition-colors cursor-pointer"
                  @click="openPeriodMembersModal(g.osis, 'OSIS', true)"
                >
                  OSIS: {{ g.osis.nama }}
                  <Icon
                    name="material-symbols:chevron-right"
                    class="text-base"
                  />
                </button>
                <button
                  v-if="g.mpk"
                  type="button"
                  class="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors cursor-pointer"
                  @click="openPeriodMembersModal(g.mpk, 'MPK', true)"
                >
                  MPK: {{ g.mpk.nama }}
                  <Icon
                    name="material-symbols:chevron-right"
                    class="text-base"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useHof } from "~/composables/useHof";
import { useImageUrl } from "~/composables/useImageUrl";

const {
  isHofModalOpen,
  modalType,
  modalTitle,
  modalData,
  closeHofModal,
  openPeriodMembersModal,
  openMemberProfileModal,
} = useHof();

const panel = ref<HTMLElement | null>(null);

watch(isHofModalOpen, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? "hidden" : "";
    if (val) {
      setTimeout(() => panel.value?.focus(), 50);
    }
  }
});

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isHofModalOpen.value) closeHofModal();
};

onMounted(() => {
  if (import.meta.client) window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener("keydown", onKeydown);
    document.body.style.overflow = "";
  }
});
</script>

<style scoped>
.hof-modal-enter-active,
.hof-modal-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.hof-modal-enter-from,
.hof-modal-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
