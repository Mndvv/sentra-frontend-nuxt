<template>
  <section
    class="relative bg-bg-card border rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-200 overflow-hidden mb-8"
    :class="
      isLatest
        ? 'border-accent/40 shadow-md ring-1 ring-accent/20'
        : 'border-border'
    "
  >
    <!-- Header -->
    <header
      class="relative z-10 flex items-center justify-between gap-4 flex-wrap mb-5"
    >
      <div class="flex items-center gap-3.5 min-w-0">
        <div
          class="relative w-12 h-12 rounded-full border bg-bg-card-2 flex items-center justify-center shrink-0 shadow-xs"
          :class="
            isLatest
              ? 'border-accent text-accent ring-2 ring-accent/20'
              : 'border-border text-accent'
          "
          aria-hidden="true"
        >
          <span class="font-black text-base tracking-tight leading-none">{{
            roman
          }}</span>
          <span
            v-if="isLatest"
            class="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-accent border-2 border-bg-card"
          />
        </div>

        <div class="min-w-0">
          <h2
            class="text-xl sm:text-2xl font-black text-text-main m-0 leading-tight truncate"
          >
            {{ title }}
          </h2>
          <p class="text-xs sm:text-sm text-text-muted mt-0.5 m-0 font-medium">
            Angkatan ke-{{ generation.angkatan }} · {{ yearRange }}
          </p>
        </div>
      </div>

      <span
        v-if="isLatest"
        class="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-accent bg-accent-soft border border-accent/20 rounded-full px-3 py-1"
      >
        <span class="w-2 h-2 rounded-full bg-accent" />
        Kabinet Sebelumnya
      </span>
    </header>

    <!-- Leadership Bento Grid -->
    <div class="relative z-10 my-6">
      <div
        v-if="stars.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <button
          v-for="member in stars"
          :key="member.id ?? member.nama"
          type="button"
          class="group relative flex text-left p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
          :class="[
            isLeader(member)
              ? 'sm:col-span-2 bg-accent-soft/30 hover:bg-accent-soft/50 border-accent/30 hover:border-accent/50 shadow-xs'
              : 'col-span-1 bg-bg-card-2 hover:bg-bg-card border-border hover:border-accent/40 shadow-2xs hover:shadow-xs hover:-translate-y-0.5',
          ]"
          @click="$emit('star-click', member)"
        >
          <!-- Leader layout (wider, horizontal showcase) -->
          <template v-if="isLeader(member)">
            <div class="flex items-center gap-3.5 sm:gap-4 w-full">
              <div
                class="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full shrink-0 overflow-hidden border-2 border-accent/40 shadow-xs bg-bg-card"
              >
                <AppImg
                  :src="useImageUrl(member.foto, member.nama)"
                  :alt="member.nama"
                  rounded="full"
                  loading="lazy"
                  class="w-full h-full object-cover rounded-full"
                />
                <span
                  class="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[0.55rem] font-black text-white"
                  :class="member.org === 'MPK' ? 'bg-purple-600' : 'bg-accent'"
                  aria-hidden="true"
                >
                  <Icon name="material-symbols:star-rounded" class="text-xs" />
                </span>
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1.5 mb-1">
                  <span
                    class="text-[0.62rem] font-extrabold uppercase tracking-wider text-white px-1.5 py-0.2 rounded"
                    :class="
                      member.org === 'MPK' ? 'bg-purple-600' : 'bg-accent'
                    "
                  >
                    {{ member.org }}
                  </span>
                  <span
                    class="text-[0.68rem] font-bold text-accent uppercase tracking-wider"
                  >
                    {{ member.jabatan }}
                  </span>
                </div>
                <h3
                  class="text-base sm:text-lg font-black text-text-main m-0 leading-snug truncate group-hover:text-accent transition-colors"
                >
                  {{ member.nama }}
                </h3>
                <p
                  v-if="member.motto || member.quote"
                  class="text-xs text-text-muted italic line-clamp-1 mt-0.5 m-0"
                >
                  "{{ member.motto || member.quote }}"
                </p>
              </div>

              <Icon
                name="material-symbols:arrow-forward-rounded"
                class="text-text-subtle group-hover:text-accent transition-colors shrink-0 text-base"
                aria-hidden="true"
              />
            </div>
          </template>

          <!-- Standard Board Member layout -->
          <template v-else>
            <div class="flex items-center gap-3 w-full">
              <div
                class="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full shrink-0 overflow-hidden border border-border shadow-2xs bg-bg-card"
              >
                <AppImg
                  :src="useImageUrl(member.foto, member.nama)"
                  :alt="member.nama"
                  rounded="full"
                  loading="lazy"
                  class="w-full h-full object-cover rounded-full"
                />
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1.5 mb-0.5">
                  <span
                    class="text-[0.58rem] font-bold uppercase tracking-wider text-white px-1 py-0.2 rounded"
                    :class="
                      member.org === 'MPK' ? 'bg-purple-600' : 'bg-accent'
                    "
                  >
                    {{ member.org }}
                  </span>
                  <span
                    class="text-[0.65rem] font-semibold text-text-muted uppercase tracking-wider truncate"
                  >
                    {{ member.jabatan }}
                  </span>
                </div>
                <h4
                  class="text-xs sm:text-sm font-bold text-text-main m-0 leading-snug truncate group-hover:text-accent transition-colors"
                >
                  {{ member.nama }}
                </h4>
              </div>

              <Icon
                name="material-symbols:chevron-right-rounded"
                class="text-text-subtle group-hover:text-accent transition-colors shrink-0 text-sm"
                aria-hidden="true"
              />
            </div>
          </template>
        </button>
      </div>

      <!-- Empty state for BPH -->
      <div
        v-else
        class="py-10 text-center text-text-muted text-sm border border-dashed border-border rounded-2xl bg-bg-card-2/50"
      >
        <Icon
          name="material-symbols:groups-outline"
          class="text-3xl text-text-subtle opacity-60 mb-2"
        />
        <p class="m-0">Data pengurus inti belum tercatat untuk angkatan ini.</p>
      </div>
    </div>

    <!-- Footer: Org breakdown & member buttons -->
    <footer
      class="relative z-10 flex flex-wrap gap-2.5 mt-6 pt-4 border-t border-border"
    >
      <button
        v-for="org in orgLinks"
        :key="org.key"
        type="button"
        class="min-h-[44px] inline-flex items-center gap-2.5 bg-bg-card-2 border border-border hover:border-accent/40 rounded-full px-4 py-2 text-xs sm:text-sm text-text-main font-semibold transition-all hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        @click="$emit('members', org.period, org.name)"
      >
        <span
          class="text-[0.62rem] font-extrabold uppercase tracking-wider text-white rounded-full px-2 py-0.5"
          :class="org.key === 'mpk' ? 'bg-purple-600' : 'bg-accent'"
        >
          {{ org.name }}
        </span>
        <span class="font-bold text-text-main">{{ org.period.nama }}</span>
        <span class="text-text-subtle text-xs">({{ org.total }} anggota)</span>
        <Icon
          name="material-symbols:arrow-forward-rounded"
          class="text-sm text-text-subtle"
          aria-hidden="true"
        />
      </button>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { romanNumeral, generationStars } from "~/composables/useHof";
import { useImageUrl } from "~/composables/useImageUrl";

const props = defineProps<{
  generation: any;
  isLatest?: boolean;
}>();

defineEmits<{
  (e: "star-click", member: any): void;
  (e: "members", period: any, org: "OSIS" | "MPK"): void;
}>();

const roman = computed(() => romanNumeral(props.generation.angkatan));

const title = computed(
  () =>
    props.generation.osis?.nama ??
    props.generation.mpk?.nama ??
    `Kepengurusan Angkatan ${props.generation.angkatan}`,
);

const yearRange = computed(() => {
  const o = props.generation.osis?.tahun;
  const m = props.generation.mpk?.tahun;
  if (o && m && o !== m) return `Tahun Ajaran ${o} / ${m}`;
  return `Tahun Ajaran ${o ?? m ?? ""}`;
});

const stars = computed(() => generationStars(props.generation));

const isLeader = (m: any) => {
  const role = (m?.jabatan || "").toLowerCase();
  return (
    role.includes("ketua") &&
    !role.includes("wakil") &&
    !role.includes("bidang")
  );
};

interface OrgLink {
  key: "osis" | "mpk";
  name: "OSIS" | "MPK";
  period: any;
  total: number;
}

const orgLinks = computed<OrgLink[]>(() => {
  const links: OrgLink[] = [];
  for (const [key, name] of [
    ["osis", "OSIS"],
    ["mpk", "MPK"],
  ] as const) {
    const p = props.generation[key];
    if (!p) continue;
    links.push({
      key,
      name,
      period: p,
      total: (p.bph?.length || 0) + (p.anggota?.length || 0),
    });
  }
  return links;
});
</script>
