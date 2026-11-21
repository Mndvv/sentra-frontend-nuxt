<template>
  <header
    class="relative overflow-hidden pt-12 md:pt-16 pb-12 md:pb-16 border-b border-border/60"
  >
    <!-- Ambient subtle background glow (respecting palette) -->
    <div
      class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-accent/8 rounded-full blur-[110px] pointer-events-none -z-10"
      aria-hidden="true"
    />

    <div class="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-[780px]">
        <!-- Live Cabinet Status Badge -->
        <div
          class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-accent-soft border border-accent/20 mb-6"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
            />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span class="text-xs font-semibold tracking-wide text-accent">
            Kabinet Nawasena · SMAN 2 Jonggol 2026/2027
          </span>
        </div>

        <!-- Headline: Authoritative, balanced scale for PC and mobile -->
        <h1
          class="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-[-0.035em] text-text-main leading-[1.12] mb-5"
        >
          Membangun Masa Depan,
          <br class="hidden sm:inline" />
          <span
            class="text-accent underline underline-offset-8 decoration-accent/30"
            >Menyatukan Gerak</span
          >
          Bersama.
        </h1>

        <!-- Subtitle: High-contrast, optimal measure (65-75ch) -->
        <p
          class="text-text-muted text-base sm:text-lg leading-relaxed max-w-[640px] mb-8"
        >
          Portal terpadu OSIS & MPK Nawasena sebagai pusat informasi program
          kerja, agenda kegiatan, siaran radio sekolah, dan kanal aspirasi
          seluruh siswa.
        </p>

        <!-- CTA Action Group -->
        <div class="flex flex-wrap items-center gap-3.5">
          <!-- Primary CTA: Scroll to Content -->
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(99,102,241,0.28)] active:translate-y-0 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
            @click="scrollToContent"
          >
            <Icon
              name="material-symbols:explore-rounded"
              class="text-lg"
              aria-hidden="true"
            />
            <span>Jelajahi Portal</span>
          </button>

          <!-- Secondary CTA: Play / Pause Radio -->
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2.5 bg-bg-card border border-border text-text-main px-5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:border-accent/40 hover:bg-accent-soft hover:text-accent hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
            @click="toggleRadio"
          >
            <!-- Animated Soundwave Equalizer -->
            <span
              class="flex items-end gap-[3px] h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            >
              <span
                class="w-[2.5px] rounded-full bg-accent transition-all duration-200"
                :class="
                  player.isPlaying.value
                    ? 'animate-[eq1_0.7s_ease-in-out_infinite]'
                    : 'h-1.5'
                "
              />
              <span
                class="w-[2.5px] rounded-full bg-accent transition-all duration-200"
                :class="
                  player.isPlaying.value
                    ? 'animate-[eq2_0.7s_ease-in-out_0.15s_infinite]'
                    : 'h-3'
                "
              />
              <span
                class="w-[2.5px] rounded-full bg-accent transition-all duration-200"
                :class="
                  player.isPlaying.value
                    ? 'animate-[eq3_0.7s_ease-in-out_0.3s_infinite]'
                    : 'h-2'
                "
              />
            </span>
            <Icon
              :name="
                player.isPlaying.value
                  ? 'material-symbols:pause-rounded'
                  : 'material-symbols:radio'
              "
              class="text-lg"
              aria-hidden="true"
            />
            <span>{{
              player.isPlaying.value ? "Jeda Radio" : "Putar Radio Sekolah"
            }}</span>
          </button>
        </div>

        <!-- Live Now-Playing / Broadcast Pill -->
        <div
          class="mt-8 pt-6 border-t border-border/50 flex flex-wrap items-center gap-3 text-xs text-text-muted"
        >
          <div class="flex items-center gap-2">
            <span
              class="w-2 h-2 rounded-full"
              :class="
                player.isPlaying.value
                  ? 'bg-green-500 animate-pulse'
                  : 'bg-accent/60'
              "
            />
            <span class="font-medium">
              {{
                player.isPlaying.value
                  ? "Sedang Mengudara:"
                  : "Radio Nawasena Siap Diputar"
              }}
            </span>
          </div>

          <div
            v-if="player.currentTrack()"
            class="inline-flex items-center gap-1.5 font-semibold text-text-main bg-bg-card-2 border border-border/80 px-2.5 py-1 rounded-md max-w-[280px] sm:max-w-[360px] truncate"
          >
            <Icon
              name="material-symbols:music-note-rounded"
              class="text-accent text-sm shrink-0"
              aria-hidden="true"
            />
            <span class="truncate">{{
              player.currentTrack()?.judul || player.currentTrack()?.title
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const player = useMusicPlayer();

const scrollToContent = () => {
  if (import.meta.client) {
    const el = document.getElementById("bento-hub");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

const toggleRadio = async () => {
  if (player.playlist.value.length === 0) {
    await player.loadPlaylist();
  }
  if (player.playlist.value.length === 0) return;
  player.togglePlay();
};
</script>

<style scoped>
@keyframes eq1 {
  0%,
  100% {
    height: 4px;
  }
  50% {
    height: 14px;
  }
}
@keyframes eq2 {
  0%,
  100% {
    height: 10px;
  }
  50% {
    height: 4px;
  }
}
@keyframes eq3 {
  0%,
  100% {
    height: 6px;
  }
  50% {
    height: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-ping,
  .animate-pulse {
    animation: none !important;
  }
}
</style>
