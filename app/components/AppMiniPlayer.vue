<template>
  <aside
    class="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[500]"
    aria-label="Pemutar Radio Nawasena"
  >
    <!-- State 1: Collapsed -->
    <button
      v-if="isCollapsed"
      type="button"
      class="w-[46px] h-[46px] rounded-full bg-bg-card border border-border shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent relative"
      @click="player.toggleCollapsed()"
      aria-label="Buka pemutar radio"
      title="Buka pemutar radio"
    >
      <Icon
        name="material-symbols:radio"
        class="text-accent text-xl transition-all duration-300"
        :class="{
          'drop-shadow-[0_0_6px_var(--accent-glow)]': player.isPlaying.value,
        }"
      />
      <!-- Active pulsing dot when playing -->
      <span
        v-if="player.isPlaying.value"
        class="absolute top-2 right-2 flex h-2 w-2"
        aria-hidden="true"
      >
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
        />
        <span class="relative inline-flex rounded-full h-2 w-2 bg-accent" />
      </span>
    </button>

    <!-- State 2: Expanded -->
    <div
      v-else
      class="min-w-[280px] max-w-[320px] bg-bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-xl p-3 flex flex-col gap-2.5 transition-all"
      role="region"
      aria-label="Panel Radio Nawasena"
    >
      <!-- Top row: Info & Equalizer & Collapse button -->
      <div class="flex items-center justify-between gap-2">
        <div class="flex flex-col min-w-0 flex-1">
          <span
            class="text-[0.62rem] font-bold text-accent uppercase tracking-wider leading-none"
          >
            Radio Nawasena
          </span>
          <span
            class="text-xs font-semibold text-text-main truncate mt-1 leading-tight"
          >
            {{ currentTrackTitle }}
          </span>
        </div>

        <!-- Live Audio Equalizer Indicator -->
        <div
          class="flex items-end gap-0.5 h-3.5 px-1 shrink-0"
          aria-hidden="true"
        >
          <span
            class="w-[2.5px] bg-accent rounded-full transition-all duration-300"
            :class="player.isPlaying.value ? 'eq-bar-1' : 'h-1.5 opacity-50'"
          />
          <span
            class="w-[2.5px] bg-accent rounded-full transition-all duration-300"
            :class="player.isPlaying.value ? 'eq-bar-2' : 'h-2.5 opacity-50'"
          />
          <span
            class="w-[2.5px] bg-accent rounded-full transition-all duration-300"
            :class="player.isPlaying.value ? 'eq-bar-3' : 'h-1 opacity-50'"
          />
        </div>

        <!-- Collapse Button -->
        <button
          type="button"
          class="relative w-7 h-7 rounded-full flex items-center justify-center text-text-muted hover:text-text-main hover:bg-bg-card-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer shrink-0 border-none bg-transparent before:absolute before:-inset-2 before:content-['']"
          @click="player.toggleCollapsed()"
          aria-label="Tutup pemutar radio"
          title="Tutup pemutar radio"
        >
          <Icon name="material-symbols:close-rounded" size="18" />
        </button>
      </div>

      <!-- Controls row -->
      <div class="flex items-center justify-between gap-2 pt-0.5">
        <!-- Toggle Playlist Button -->
        <button
          type="button"
          class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer border-none bg-transparent"
          :class="
            showPlaylist
              ? 'bg-accent-soft text-accent font-semibold'
              : 'text-text-muted hover:text-text-main hover:bg-bg-card-2'
          "
          @click="player.togglePlaylistUrl()"
          :aria-expanded="showPlaylist"
          aria-label="Daftar lagu"
        >
          <Icon name="material-symbols:queue-music-rounded" size="16" />
          <span>Playlist</span>
          <Icon
            name="material-symbols:expand-more-rounded"
            size="14"
            class="transition-transform duration-200"
            :class="{ 'rotate-180': showPlaylist }"
          />
        </button>

        <!-- Playback Controls -->
        <div class="flex items-center gap-1">
          <!-- Prev Track Button (32x32px) -->
          <button
            type="button"
            class="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-bg-card-2 text-text-muted hover:text-text-main transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer border-none bg-transparent before:absolute before:-inset-1.5 before:content-['']"
            @click="player.prevTrack()"
            aria-label="Lagu sebelumnya"
            title="Lagu sebelumnya"
          >
            <Icon name="material-symbols:skip-previous-rounded" size="20" />
          </button>

          <!-- Play / Pause Button (36x36px) -->
          <button
            type="button"
            class="relative w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent-hover transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer border-none before:absolute before:-inset-1 before:content-['']"
            @click="player.togglePlay()"
            :aria-label="
              player.isPlaying.value ? 'Jeda pemutaran' : 'Putar radio'
            "
            :title="player.isPlaying.value ? 'Jeda' : 'Putar'"
          >
            <Icon
              :name="
                player.isPlaying.value
                  ? 'material-symbols:pause-rounded'
                  : 'material-symbols:play-arrow-rounded'
              "
              size="20"
            />
          </button>

          <!-- Next Track Button (32x32px) -->
          <button
            type="button"
            class="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-bg-card-2 text-text-muted hover:text-text-main transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer border-none bg-transparent before:absolute before:-inset-1.5 before:content-['']"
            @click="player.nextTrack()"
            aria-label="Lagu berikutnya"
            title="Lagu berikutnya"
          >
            <Icon name="material-symbols:skip-next-rounded" size="20" />
          </button>
        </div>
      </div>

      <!-- Playlist Drawer -->
      <div
        v-if="showPlaylist"
        class="max-h-[180px] overflow-y-auto border-t border-border pt-2 mt-1 flex flex-col gap-1 text-xs"
        role="listbox"
        aria-label="Daftar putar Radio Nawasena"
      >
        <template
          v-if="player.playlist.value && player.playlist.value.length > 0"
        >
          <button
            v-for="(track, index) in player.playlist.value"
            :key="track.id || index"
            type="button"
            role="option"
            :aria-selected="player.currentTrackIndex.value === index"
            class="w-full text-left text-xs py-1.5 px-2.5 rounded-lg cursor-pointer transition-colors leading-tight flex items-center justify-between gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent border-none"
            :class="
              player.currentTrackIndex.value === index
                ? 'bg-accent-soft text-accent font-semibold'
                : 'text-text-muted hover:bg-bg-card-2 hover:text-text-main bg-transparent'
            "
            @click="player.playTrack(index)"
          >
            <span class="truncate">{{ track.judul || track.title }}</span>
            <Icon
              v-if="
                player.currentTrackIndex.value === index &&
                player.isPlaying.value
              "
              name="material-symbols:equalizer-rounded"
              size="14"
              class="shrink-0 text-accent"
              aria-hidden="true"
            />
          </button>
        </template>
        <div v-else class="text-[0.72rem] text-text-subtle py-2 text-center">
          Daftar lagu kosong atau memuat...
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from "vue";

const player = useMusicPlayer();
const { isCollapsed, showPlaylist } = player;

const currentTrackTitle = computed(() => {
  const track = player.currentTrack();
  if (!track) return "Memuat siaran...";
  return track.judul || track.title || "Siaran Musik Nawasena";
});

// Close playlist or collapse on Escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && !isCollapsed.value) {
    if (showPlaylist.value) {
      showPlaylist.value = false;
    } else {
      player.toggleCollapsed();
    }
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
.eq-bar-1 {
  animation: eq1 0.8s ease-in-out infinite;
}
.eq-bar-2 {
  animation: eq2 0.8s ease-in-out infinite 0.2s;
}
.eq-bar-3 {
  animation: eq3 0.8s ease-in-out infinite 0.4s;
}
</style>
