<template>
  <div class="min-h-screen">
    <!-- Hero: night sky with Leo Constellation Journey Map -->
    <HofHero
      :generations="allGenerations"
      :generation="latestGeneration"
      :loading="loading"
      :lineage="lineageCaption"
      @select="scrollToGeneration"
      @cta="scrollToLineage"
    />

    <!-- Horizon: visual transition between dark sky and content background -->
    <div
      class="relative h-7 -mt-px bg-gradient-to-b from-[#241d57] to-[var(--bg-primary,#f3f1fe)]"
      aria-hidden="true"
    >
      <div
        class="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#8b80ff]/70 to-transparent"
      />
    </div>

    <!-- The lineage: every cabinet mapped as its own constellation -->
    <main
      id="hof-lineage"
      class="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-1"
    >
      <div class="max-w-2xl mb-10">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-text-main mb-2.5"
        >
          Konstelasi Kepemimpinan
        </h2>
        <p class="text-sm sm:text-base text-text-muted leading-relaxed">
          Dari masa ke masa, setiap kabinet meninggalkan jejak dedikasinya di
          Nawasena. Pilih pengurus untuk mengenang kepemimpinan mereka.
        </p>
      </div>

      <!-- Loading skeleton -->
      <div v-if="loading" class="flex flex-col gap-6" aria-live="polite">
        <div
          v-for="i in 2"
          :key="i"
          class="h-[460px] rounded-2xl bg-bg-card border border-border animate-pulse"
        />
      </div>

      <!-- Empty / error state -->
      <div
        v-else-if="!topGenerations.length && !developers.length"
        class="flex flex-col items-center justify-center gap-3.5 text-center py-16 px-6 text-text-muted border border-dashed border-border rounded-2xl bg-bg-card/50"
      >
        <Icon
          name="material-symbols:auto-awesome"
          class="text-4xl text-accent opacity-60"
        />
        <p class="text-sm sm:text-base max-w-md m-0">
          Langit masih kosong, belum ada jejak kepengurusan yang terukir di
          sini.
        </p>
      </div>

      <template v-else>
        <!-- Recent generations timeline -->
        <div class="flex flex-col gap-8">
          <HofGenerationPanel
            v-for="(g, i) in topGenerations"
            :key="g.angkatan"
            :generation="g"
            :is-latest="i === 0"
            @star-click="openMemberProfileModal"
            @members="openPeriodMembersModal"
          />
        </div>

        <!-- Older generations button -->
        <button
          v-if="olderGenerations.length"
          type="button"
          class="min-h-[44px] flex items-center justify-between gap-4 w-full mt-8 px-6 py-4 bg-bg-card-2 border border-dashed border-border rounded-2xl cursor-pointer hover:bg-accent-soft hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200"
          @click="openOlderPeriodsModal"
        >
          <span class="flex flex-col items-start text-left">
            <span class="font-bold text-sm sm:text-base text-text-main">
              Jelajahi Angkatan Terdahulu
            </span>
            <span class="text-xs text-text-subtle font-medium">
              {{ olderGenerations.length }} angkatan sebelumnya
            </span>
          </span>
          <Icon
            name="material-symbols:history"
            class="text-2xl text-accent shrink-0"
          />
        </button>

        <!-- Developer credits -->
        <section
          v-if="developers.length"
          class="mt-20 pt-10 border-t border-border"
        >
          <div class="max-w-xl mx-auto text-center mb-10">
            <h2
              class="text-2xl sm:text-3xl font-black tracking-tight text-text-main mb-2.5"
            >
              Di Balik Langit Ini
            </h2>
            <p class="text-sm sm:text-base text-text-muted leading-relaxed">
              Platform karya siswa Nawasena, dirancang dan dibangun untuk
              merawat arsip digital OSIS-MPK agar terus hidup melintasi
              generasi.
            </p>
          </div>

          <div class="flex flex-wrap justify-center gap-6 sm:gap-8">
            <HofDevCard v-for="dev in developers" :key="dev.id" :dev="dev" />
          </div>

          <figure class="mt-12 mx-auto max-w-xl text-center">
            <blockquote
              class="text-sm italic leading-relaxed text-text-muted p-5 sm:p-6 border border-border rounded-2xl bg-bg-card-2 shadow-xs"
            >
              "Teknologi yang hebat bukan yang paling rumit, melainkan yang
              mempermudah urusan banyak orang dan terus hidup melintasi
              generasi."
            </blockquote>
          </figure>
        </section>
      </template>

      <!-- Back to Home navigation -->
      <div class="text-center mt-16">
        <NuxtLink
          to="/"
          class="min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-bg-card hover:bg-accent-soft hover:border-accent/40 text-text-muted hover:text-text-main text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Icon name="material-symbols:arrow-back-rounded" class="text-base" />
          Kembali ke Beranda
        </NuxtLink>
      </div>
    </main>

    <HofModal />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";

const {
  loading,
  topGenerations,
  olderGenerations,
  allGenerations,
  developers,
  latestGeneration,
  lineageLength,
  totalMembers,
  loadHofData,
  openMemberProfileModal,
  openPeriodMembersModal,
  openOlderPeriodsModal,
} = useHof();

const lineageCaption = computed(() => {
  if (loading.value || !lineageLength.value) return "";
  const parts = [`${lineageLength.value} kabinet`];
  if (totalMembers.value) parts.push(`${totalMembers.value} pengurus`);
  return parts.join(" · ");
});

const scrollToLineage = () => {
  if (import.meta.client) {
    document
      .getElementById("hof-lineage")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const scrollToGeneration = (gen: any) => {
  if (import.meta.client) {
    const el = document.getElementById(`generation-${gen?.angkatan}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      scrollToLineage();
    }
  }
};

useSeoMeta({
  title: "Hall of Fame | Nawasena",
  description:
    "Hall of Fame Nawasena: konstelasi penghormatan bagi pengurus terdahulu yang telah menorehkan dedikasi dan kepemimpinan inspiratif.",
  ogTitle: "Hall of Fame | Nawasena",
  ogDescription: "Jejak cahaya kepemimpinan Nawasena dari masa ke masa.",
});

onMounted(() => {
  loadHofData();
});
</script>
