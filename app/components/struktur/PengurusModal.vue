<template>
  <Teleport to="body">
    <div
      v-if="isPengurusModalOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pengurus-modal-name"
      @click.self="closePengurusModal"
    >
      <div
        class="relative bg-bg-card border border-border rounded-2xl sm:rounded-3xl w-full max-w-[520px] md:max-w-[820px] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-[modalSlideUp_0.24s_cubic-bezier(.16,1,0.3,1)]"
      >
        <!-- Close button: 40x40px touch area -->
        <button
          type="button"
          class="absolute top-4 right-4 w-10 h-10 rounded-full bg-bg-card-2 text-text-muted hover:text-text-main hover:bg-accent-soft hover:text-accent transition-colors flex items-center justify-center border-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent z-20"
          aria-label="Tutup"
          @click="closePengurusModal"
        >
          <Icon
            name="material-symbols:close"
            class="text-xl"
            aria-hidden="true"
          />
        </button>

        <template v-if="p">
          <!-- Scrollable container -->
          <div class="overflow-y-auto w-full">
            <!-- Desktop: 2-column grid -->
            <div class="md:grid md:grid-cols-[240px_1fr] min-h-[380px]">
              <!-- ── LEFT COLUMN ───────────────────────────── -->
              <div
                class="p-6 md:p-7 md:border-r md:border-border md:bg-bg-card-2/50 flex flex-col items-center md:items-start gap-4"
              >
                <!-- Avatar -->
                <div class="relative">
                  <AppImg
                    :src="useImageUrl(p.foto, p.nama)"
                    :alt="p.nama"
                    rounded="full"
                    class="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-border shadow-md"
                    @error="onImgError"
                  />
                  <span
                    v-if="p.online"
                    class="absolute bottom-1 right-1 w-3.5 h-3.5 bg-[var(--badge-done-text)] border-2 border-bg-card rounded-full"
                    title="Sedang online"
                  />
                </div>

                <!-- Org badge + role badge -->
                <div
                  class="flex flex-wrap gap-1.5 justify-center md:justify-start"
                >
                  <span
                    class="inline-flex items-center gap-1 bg-bg-card border border-border text-text-subtle text-[0.62rem] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-md leading-none"
                  >
                    <Icon :name="orgIcon" class="text-sm" aria-hidden="true" />
                    {{ orgLabel }}
                  </span>
                  <span
                    class="inline-block bg-accent-soft text-accent text-[0.65rem] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md"
                  >
                    {{ p.jabatan }}
                  </span>
                </div>

                <!-- Nama -->
                <h3
                  id="pengurus-modal-name"
                  class="text-xl font-black text-text-main text-center md:text-left m-0 leading-snug"
                >
                  {{ p.nama }}
                </h3>

                <!-- Quick chips: Kelas, Hobi -->
                <div
                  v-if="p.kelas || p.hobi"
                  class="flex flex-wrap gap-1.5 justify-center md:justify-start"
                >
                  <span
                    v-if="p.kelas"
                    class="inline-flex items-center gap-1 text-[0.72rem] font-medium text-text-muted bg-bg-card border border-border px-2.5 py-0.5 rounded-full"
                  >
                    <Icon
                      name="material-symbols:class"
                      class="text-sm text-text-subtle"
                      aria-hidden="true"
                    />
                    {{ p.kelas }}
                  </span>
                  <span
                    v-if="p.hobi"
                    class="inline-flex items-center gap-1 text-[0.72rem] font-medium text-text-muted bg-bg-card border border-border px-2.5 py-0.5 rounded-full"
                  >
                    <Icon
                      name="material-symbols:favorite-outline"
                      class="text-sm text-text-subtle"
                      aria-hidden="true"
                    />
                    {{ p.hobi }}
                  </span>
                </div>

                <!-- Motto (if present) in clean blockquote style -->
                <div
                  v-if="p.motto"
                  class="w-full pt-3 border-t border-border mt-auto"
                >
                  <p
                    class="text-[0.65rem] font-bold uppercase tracking-widest text-accent mb-1.5"
                  >
                    Motto
                  </p>
                  <blockquote
                    class="m-0 pl-3 border-l border-accent/40 text-[0.82rem] text-text-muted italic leading-relaxed"
                  >
                    &ldquo;{{ p.motto }}&rdquo;
                  </blockquote>
                </div>
              </div>

              <!-- ── RIGHT COLUMN ──────────────────────────── -->
              <div class="p-6 md:p-7 flex flex-col gap-6">
                <!-- Biodata rows -->
                <div v-if="biodataRows.length">
                  <h4
                    class="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-wider text-accent border-b border-border pb-2.5 mb-3"
                  >
                    <Icon
                      name="material-symbols:badge"
                      class="text-base text-accent"
                      aria-hidden="true"
                    />
                    Biodata Lengkap
                  </h4>
                  <div class="flex flex-col gap-1.5">
                    <div
                      v-for="row in biodataRows"
                      :key="row.label"
                      class="flex items-baseline justify-between gap-3 bg-bg-card-2 border border-border rounded-xl px-3.5 py-2"
                    >
                      <span
                        class="shrink-0 min-w-[120px] text-[0.72rem] font-semibold text-text-muted"
                      >
                        {{ row.label }}
                      </span>
                      <span
                        class="text-[0.82rem] font-medium text-text-main text-right"
                      >
                        {{ row.value }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Visi & Misi -->
                <div v-if="hasVisiMisi">
                  <h4
                    class="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-wider text-accent border-b border-border pb-2.5 mb-3"
                  >
                    <Icon
                      name="material-symbols:my-location"
                      class="text-base text-accent"
                      aria-hidden="true"
                    />
                    Visi &amp; Misi
                  </h4>
                  <div
                    v-if="p.visi"
                    class="bg-bg-card-2 border border-border rounded-xl p-3.5 mb-2.5"
                  >
                    <p
                      class="text-[0.7rem] font-bold text-accent uppercase tracking-wider mb-1.5"
                    >
                      Visi
                    </p>
                    <ul
                      v-if="Array.isArray(p.visi)"
                      class="pl-4 m-0 flex flex-col gap-1 list-disc text-text-main text-[0.84rem] leading-relaxed"
                    >
                      <li v-for="(v, i) in p.visi" :key="i">{{ v }}</li>
                    </ul>
                    <p
                      v-else
                      class="text-[0.84rem] text-text-main leading-relaxed m-0"
                    >
                      {{ p.visi }}
                    </p>
                  </div>
                  <div
                    v-if="p.misi?.length"
                    class="bg-bg-card-2 border border-border rounded-xl p-3.5"
                  >
                    <p
                      class="text-[0.7rem] font-bold text-accent uppercase tracking-wider mb-1.5"
                    >
                      Misi
                    </p>
                    <ul
                      class="pl-4 m-0 flex flex-col gap-1 list-disc text-text-main text-[0.84rem] leading-relaxed"
                    >
                      <li v-for="(m, i) in p.misi" :key="i">{{ m }}</li>
                    </ul>
                  </div>
                </div>

                <!-- Program Kerja -->
                <div>
                  <h4
                    class="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-wider text-accent border-b border-border pb-2.5 mb-3"
                  >
                    <Icon
                      name="material-symbols:checklist"
                      class="text-base text-accent"
                      aria-hidden="true"
                    />
                    Program Kerja
                    <span
                      v-if="programs.length"
                      class="ml-auto text-text-subtle font-semibold tracking-normal normal-case"
                    >
                      {{ programs.length }}
                    </span>
                  </h4>

                  <p
                    v-if="isSekbidMember && hasSekbidPrograms"
                    class="text-[0.72rem] text-text-subtle m-0 mb-3 inline-flex items-center gap-1.5"
                  >
                    <Icon
                      :name="sekbidMeta.icon"
                      class="text-sm"
                      :style="{ color: sekbidMeta.color }"
                      aria-hidden="true"
                    />
                    Termasuk program kerja Sekbid {{ p.sekbid_number }}.
                  </p>

                  <div v-if="programs.length" class="flex flex-col gap-2.5">
                    <div
                      v-for="prog in programs"
                      :key="prog.id"
                      class="bg-bg-card-2 border border-border rounded-xl p-3.5 flex flex-col gap-1.5"
                    >
                      <div class="flex items-start justify-between gap-2">
                        <span
                          class="text-[0.86rem] font-semibold text-text-main leading-snug"
                        >
                          {{ prog.nama || prog.name }}
                        </span>
                        <div class="flex items-center gap-1.5 shrink-0">
                          <span
                            v-if="prog._source === 'sekbid'"
                            class="text-[0.58rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md leading-none bg-accent-soft text-accent"
                          >
                            Sekbid
                          </span>
                          <span
                            class="text-[0.62rem] font-semibold px-2 py-0.5 rounded-full leading-none"
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
                      </div>
                      <p
                        v-if="prog.deskripsi || prog.description"
                        class="text-[0.78rem] text-text-muted m-0 leading-relaxed"
                      >
                        {{ prog.deskripsi || prog.description }}
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
                </div>
              </div>
            </div>
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
  isPengurusModalOpen,
  isSekbidModalOpen,
  selectedPengurus,
  closePengurusModal,
  sekbid: sekbidList,
  resolveSekbidPrograms,
} = useStruktur();

const p = computed(() => selectedPengurus.value);

const orgKey = computed(() =>
  String(p.value?.organisasi ?? p.value?.org ?? "osis").toLowerCase(),
);
const orgLabel = computed(() => (orgKey.value === "mpk" ? "MPK" : "OSIS"));
const orgIcon = computed(() =>
  orgKey.value === "mpk"
    ? "material-symbols:groups-rounded"
    : "material-symbols:school-rounded",
);

const isSekbidMember = computed(() => !!p.value?.sekbid_number);
const sekbidMeta = computed(() => useSekbidMeta(p.value?.sekbid_number));

/** Sekbid programs in PengurusModal shape. */
const sekbidPrograms = computed<any[]>(() => {
  if (!isSekbidMember.value) return [];
  const sekbidObj = sekbidList.value.find(
    (s: any) => s.number === p.value!.sekbid_number,
  );
  if (!sekbidObj) return [];
  return resolveSekbidPrograms(sekbidObj).map((prog: any) => ({
    id: prog.id,
    nama: prog.nama ?? prog.name,
    deskripsi: prog.deskripsi ?? prog.description,
    target: prog.target,
    status: prog.status,
  }));
});

const programs = computed<any[]>(() => {
  if (!p.value) return [];
  const personal = p.value.programKerja || [];

  if (!isSekbidMember.value) {
    return personal.map((prog: any) => ({ ...prog, _source: "personal" }));
  }

  const seen = new Set<number | string>(personal.map((prog: any) => prog.id));
  const sekbidTagged = sekbidPrograms.value
    .filter((prog: any) => !seen.has(prog.id))
    .map((prog: any) => ({ ...prog, _source: "sekbid" }));

  const personalTag =
    p.value.sekbid_role && /koordinator/i.test(p.value.sekbid_role)
      ? "sekbid"
      : "personal";

  return [
    ...personal.map((prog: any) => ({ ...prog, _source: personalTag })),
    ...sekbidTagged,
  ];
});

const hasSekbidPrograms = computed(() =>
  programs.value.some((prog) => prog._source === "sekbid"),
);

const hasVisiMisi = computed(() => {
  if (!p.value) return false;
  const hasVisi = Array.isArray(p.value.visi)
    ? p.value.visi.length > 0
    : !!p.value.visi;
  const hasMisi = Array.isArray(p.value.misi) && p.value.misi.length > 0;
  return hasVisi || hasMisi;
});

const biodataRows = computed(() => {
  if (!p.value) return [];
  return [
    { label: "Nama", value: p.value.nama },
    { label: "Kelas", value: p.value.kelas },
    {
      label: "Tempat / Tgl Lahir",
      value: [p.value.tempatLahir, p.value.tanggalLahir]
        .filter(Boolean)
        .join(", "),
    },
    { label: "Alamat", value: p.value.alamat },
    { label: "Hobi", value: p.value.hobi },
  ].filter((r) => Boolean(r.value));
});

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement;
  img.src = useImageUrl("", p.value?.nama);
  img.onerror = null;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && isPengurusModalOpen.value) {
    closePengurusModal();
  }
}

function restoreScroll() {
  if (!import.meta.client) return;
  if (!isSekbidModalOpen.value && !isPengurusModalOpen.value) {
    document.body.style.overflow = "";
  }
}

watch(
  isPengurusModalOpen,
  (isOpen) => {
    if (!import.meta.client) return;
    if (isOpen) {
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
