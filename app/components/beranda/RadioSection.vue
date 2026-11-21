<template>
  <div
    ref="el"
    class="transition-all duration-700 h-full"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
  >
    <div
      class="relative h-full flex flex-col justify-between bg-bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300"
    >
      <!-- Header: Title & Direct Controls -->
      <div>
        <div class="flex items-center justify-between gap-3 mb-4">
          <div class="flex items-center gap-2 text-accent">
            <Icon
              name="material-symbols:radio"
              class="text-xl shrink-0"
              aria-hidden="true"
            />
            <span class="text-xs font-bold tracking-wider uppercase"
              >Siaran Sekolah</span
            >
          </div>

          <!-- Live Status Badge -->
          <span
            v-if="player.isPlaying.value"
            class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.68rem] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            LIVE ON AIR
          </span>
          <span
            v-else
            class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.68rem] font-medium bg-bg-card-2 text-text-subtle border border-border"
          >
            SIAP PUTAR
          </span>
        </div>

        <h3
          class="text-xl sm:text-2xl font-black text-text-main tracking-tight leading-snug mb-2"
        >
          Radio Nawasena
        </h3>
        <p class="text-text-muted text-xs sm:text-sm leading-relaxed mb-5">
          Dengarkan alunan musik pilihan dan siaran pengiring aktivitas belajar
          sekolah.
        </p>

        <!-- Current Track / Player Bar -->
        <div
          class="flex items-center gap-3 p-3.5 rounded-xl bg-bg-card-2 border border-border/80 mb-5"
        >
          <!-- Equalizer animation -->
          <div
            class="flex items-end gap-[3px] h-4 w-4 shrink-0"
            aria-hidden="true"
          >
            <span
              class="w-[2.5px] rounded-full bg-accent transition-all duration-200"
              :class="
                player.isPlaying.value
                  ? 'animate-[eq1_0.7s_ease-in-out_infinite]'
                  : 'h-1.5 opacity-40'
              "
            />
            <span
              class="w-[2.5px] rounded-full bg-accent transition-all duration-200"
              :class="
                player.isPlaying.value
                  ? 'animate-[eq2_0.7s_ease-in-out_0.15s_infinite]'
                  : 'h-3 opacity-40'
              "
            />
            <span
              class="w-[2.5px] rounded-full bg-accent transition-all duration-200"
              :class="
                player.isPlaying.value
                  ? 'animate-[eq3_0.7s_ease-in-out_0.3s_infinite]'
                  : 'h-2 opacity-40'
              "
            />
          </div>

          <div class="flex-1 min-w-0">
            <p
              class="text-[0.7rem] uppercase tracking-wider text-text-subtle font-semibold mb-0.5"
            >
              {{ player.isPlaying.value ? "Memutar" : "Trek Terpilih" }}
            </p>
            <p class="text-xs sm:text-sm font-bold text-text-main truncate">
              {{
                player.currentTrack()?.judul ||
                player.currentTrack()?.title ||
                "Memuat daftar putar..."
              }}
            </p>
          </div>

          <!-- Transport Buttons -->
          <div class="flex items-center gap-1 shrink-0">
            <button
              type="button"
              class="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-main hover:bg-accent-soft transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              title="Lagu Sebelumnya"
              aria-label="Lagu Sebelumnya"
              @click="player.prevTrack()"
            >
              <Icon
                name="material-symbols:skip-previous-rounded"
                class="text-base"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              class="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center hover:bg-accent-hover hover:scale-105 transition-all shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              :title="player.isPlaying.value ? 'Jeda' : 'Putar'"
              :aria-label="player.isPlaying.value ? 'Jeda' : 'Putar'"
              @click="handlePlayPause"
            >
              <Icon
                :name="
                  player.isPlaying.value
                    ? 'material-symbols:pause-rounded'
                    : 'material-symbols:play-arrow-rounded'
                "
                class="text-xl"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              class="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-main hover:bg-accent-soft transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              title="Lagu Berikutnya"
              aria-label="Lagu Berikutnya"
              @click="player.nextTrack()"
            >
              <Icon
                name="material-symbols:skip-next-rounded"
                class="text-base"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Playlist Snippet (compact & non-intrusive) -->
      <div class="border-t border-border/60 pt-4">
        <div
          class="flex items-center justify-between text-xs text-text-muted font-semibold mb-2"
        >
          <span>Daftar Putar</span>
          <span class="text-accent"
            >{{ player.playlist.value.length }} Trek</span
          >
        </div>

        <div
          v-if="player.playlist.value.length > 0"
          class="flex flex-col gap-1 max-h-[120px] overflow-y-auto pr-1 text-xs"
          style="
            scrollbar-width: thin;
            scrollbar-color: var(--accent-soft) transparent;
          "
        >
          <button
            v-for="(track, idx) in player.playlist.value.slice(0, 5)"
            :key="track.id || idx"
            type="button"
            class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors w-full cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            :class="
              player.currentTrackIndex.value === idx
                ? 'bg-accent-soft text-accent font-bold'
                : 'hover:bg-bg-card-2 text-text-muted hover:text-text-main'
            "
            @click="player.playTrack(idx)"
          >
            <span class="w-4 text-center shrink-0 text-[0.7rem] font-bold">
              {{ idx + 1 }}
            </span>
            <span class="truncate flex-1">{{
              track.judul || track.title
            }}</span>
            <Icon
              v-if="
                player.currentTrackIndex.value === idx && player.isPlaying.value
              "
              name="material-symbols:volume-up-rounded"
              class="text-accent text-sm shrink-0"
              aria-hidden="true"
            />
          </button>
        </div>

        <div v-else class="text-center py-4 text-xs text-text-subtle">
          Memuat daftar putar...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const player = useMusicPlayer();
const { el, isVisible } = useScrollReveal();

onMounted(async () => {
  if (player.playlist.value.length === 0) {
    await player.loadPlaylist();
  }
});

const handlePlayPause = async () => {
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
</style>
