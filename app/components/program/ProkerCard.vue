<template>
  <article
    class="bg-bg-card border border-border rounded-2xl shadow-sm hover:shadow-md hover:border-accent/40 p-4 sm:p-5 flex flex-col justify-between gap-3 transition-all duration-200 hover:-translate-y-0.5 h-full"
  >
    <div class="flex flex-col gap-3 flex-1">
      <!-- Top Row (Badges) -->
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-1.5 flex-wrap">
          <!-- Scope pill: BPH or Sekbid X -->
          <span
            class="bg-bg-card-2 border border-border text-text-subtle text-[0.68rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
          >
            {{ scopeLabel }}
          </span>

          <!-- Status pill -->
          <span
            class="inline-flex items-center gap-1.5 text-[0.68rem] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider"
            :class="statusBadgeClass"
          >
            <span class="w-1.5 h-1.5 rounded-full shrink-0 bg-current"></span>
            {{ statusLabel }}
          </span>
        </div>

        <!-- Links badge on top right if links exist -->
        <span
          v-if="links.length"
          class="inline-flex items-center gap-1 text-[0.65rem] font-bold px-2 py-0.5 rounded-md bg-accent-soft text-accent border border-accent/20 shrink-0"
          :title="`${links.length} tautan terkait`"
        >
          <Icon name="material-symbols:link-rounded" class="text-xs" />
          {{ links.length }}
        </span>
      </div>

      <!-- Title -->
      <h3
        class="text-base font-bold text-text-main line-clamp-2 leading-snug m-0"
      >
        {{ prog.nama }}
      </h3>

      <!-- Department info -->
      <div
        v-if="prog.scope === 'SEKBID' && (prog.owner_id || prog.sekbid_name)"
        class="text-xs text-text-subtle font-medium flex items-center gap-1.5"
      >
        <Icon
          name="material-symbols:group"
          class="text-sm opacity-70 shrink-0"
        />
        <span>{{
          prog.sekbid_name
            ? `Sekbid ${prog.owner_id} · ${prog.sekbid_name}`
            : `Sekbid ${prog.owner_id}`
        }}</span>
      </div>

      <!-- Description -->
      <p
        v-if="prog.deskripsi"
        class="text-xs sm:text-[0.82rem] text-text-muted leading-relaxed line-clamp-3 mt-1 flex-1 m-0"
      >
        {{ prog.deskripsi }}
      </p>
      <div v-else class="flex-1"></div>

      <!-- Target timeline -->
      <div
        v-if="prog.target"
        class="text-xs text-text-subtle font-medium mt-auto pt-2 border-t border-border flex items-center gap-1.5"
      >
        <Icon
          name="material-symbols:calendar-month-rounded"
          class="text-sm opacity-70 shrink-0"
        />
        <span>{{ prog.target }}</span>
      </div>
    </div>

    <!-- Footer Links Drawer -->
    <div
      v-if="links.length"
      class="space-y-1.5"
      :class="prog.target ? 'pt-1.5' : 'mt-auto pt-2 border-t border-border'"
    >
      <template
        v-for="link in links"
        :key="link.id ?? `${link.ref_id}-${link.link_type}`"
      >
        <!-- DOKUMENTASI -->
        <NuxtLink
          v-if="link.link_type === 'DOKUMENTASI'"
          :to="`/dokumentasi/${articleSlug({ id: link.ref_id, title: link.title || '' })}`"
          class="flex items-center gap-2.5 w-full text-left px-3 py-2.5 min-h-[44px] rounded-xl border border-border bg-bg-card-2 hover:bg-accent-soft hover:border-accent/30 transition-all duration-150 group no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <div
            class="w-7 h-7 rounded-lg bg-accent-soft flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors"
          >
            <Icon
              name="material-symbols:article-rounded"
              class="text-accent text-sm"
            />
          </div>
          <span
            class="text-xs font-semibold text-text-main line-clamp-1 flex-1 min-w-0"
          >
            {{ link.title || "Lihat Artikel Dokumentasi" }}
          </span>
          <Icon
            name="material-symbols:arrow-outward-rounded"
            class="text-sm text-text-subtle group-hover:text-accent transition-colors shrink-0"
          />
        </NuxtLink>

        <!-- AGENDA -->
        <div
          v-else-if="link.link_type === 'AGENDA'"
          class="rounded-xl border border-border bg-bg-card-2 overflow-hidden transition-all duration-200"
          :class="
            openAgenda === link.ref_id
              ? 'border-accent/40 shadow-sm'
              : 'hover:border-border'
          "
        >
          <button
            type="button"
            class="flex items-center gap-2.5 w-full text-left px-3 py-2.5 min-h-[44px] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            :aria-expanded="openAgenda === link.ref_id"
            @click="
              openAgenda = openAgenda === link.ref_id ? null : link.ref_id
            "
          >
            <div
              class="w-7 h-7 rounded-lg bg-accent-soft flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors"
            >
              <Icon
                name="material-symbols:event-rounded"
                class="text-accent text-sm"
              />
            </div>
            <span
              class="text-xs font-semibold text-text-main line-clamp-1 flex-1 min-w-0"
            >
              {{ link.title || "Agenda Terkait" }}
            </span>
            <Icon
              name="material-symbols:keyboard-arrow-down-rounded"
              class="text-base text-text-subtle group-hover:text-text-main shrink-0 transition-transform duration-200"
              :class="openAgenda === link.ref_id ? 'rotate-180' : ''"
            />
          </button>

          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            leave-active-class="transition-all duration-150 ease-in"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div v-if="openAgenda === link.ref_id" class="px-3 pb-3 pt-0">
              <div
                class="rounded-lg bg-bg-card border border-border p-3 space-y-1.5"
              >
                <div
                  v-if="link.start_date || link.end_date"
                  class="flex items-center gap-1.5 text-xs font-semibold text-text-main"
                >
                  <Icon
                    name="material-symbols:schedule-rounded"
                    class="text-sm shrink-0 text-accent"
                  />
                  <span>{{
                    formatDateRange(link.start_date, link.end_date)
                  }}</span>
                </div>
                <p
                  v-if="link.ket"
                  class="text-xs text-text-muted leading-relaxed m-0 line-clamp-3"
                >
                  {{ link.ket }}
                </p>
                <p v-else class="text-xs text-text-subtle italic m-0">
                  Tidak ada deskripsi agenda.
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </template>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { articleSlug } from "~/utils/articleSlug";
import type { ProgramLink } from "~/utils/programTypes";

const props = defineProps<{
  prog: any;
}>();

const openAgenda = ref<number | null>(null);

const links = computed<ProgramLink[]>(() =>
  Array.isArray(props.prog?.links) ? props.prog.links : [],
);

const scopeLabel = computed(() => {
  if (props.prog?.scope === "SEKBID") {
    return props.prog.owner_id ? `Sekbid ${props.prog.owner_id}` : "Sekbid";
  }
  return props.prog?.scope || "BPH";
});

const statusBadgeClass = computed(() => {
  const status = props.prog?.status || "Direncanakan";
  switch (status) {
    case "Berjalan":
      return "bg-[var(--badge-ongoing-bg)] text-[var(--badge-ongoing-text)]";
    case "Selesai":
      return "bg-[var(--badge-done-bg)] text-[var(--badge-done-text)]";
    case "Dibatalkan":
      return "bg-rose-500/10 text-rose-500 border border-rose-500/20";
    case "Direncanakan":
    default:
      return "bg-[var(--badge-plan-bg)] text-[var(--badge-plan-text)]";
  }
});

const statusLabel = computed(() => props.prog?.status || "Direncanakan");

function formatDateRange(start?: string | null, end?: string | null): string {
  const fmt = (d?: string | null) => {
    if (!d) return "";
    try {
      return new Date(d).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return d;
    }
  };
  if (start && end && start !== end) return `${fmt(start)} - ${fmt(end)}`;
  return fmt(start) || fmt(end) || "";
}
</script>
