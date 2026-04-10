<template>
  <div 
    class="fixed z-[500] bg-bg-card border border-border flex flex-col backdrop-blur-md transition-all duration-300 max-w-[280px] overflow-hidden shadow-md"
    :class="[
      isCollapsed ? 'max-w-[46px] max-h-[46px] rounded-[23px] p-0 bottom-4 right-4 md:bottom-5 md:right-5 cursor-pointer hover:scale-105 hover:shadow-lg' : 'bottom-4 right-4 md:bottom-5 md:right-5 rounded-[20px]',
      showPlaylist ? 'rounded-[16px]' : ''
    ]"
  >
    <div 
      class="w-[46px] h-[46px] bg-transparent rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-colors"
      :class="{ 'absolute top-1 right-1 bg-accent-soft w-[34px] h-[34px]': !isCollapsed, 'hover:bg-accent-soft': isCollapsed }"
      @click="player.toggleCollapsed()" 
      title="Buka/Tutup Radio"
    >
      <Icon 
        name="material-symbols:radio" 
        class="text-accent text-xl transition-all duration-300" 
        :class="{ 'animate-pulse scale-110 drop-shadow-[0_0_6px_var(--accent-glow)]': player.isPlaying.value }" 
      />
    </div>
    
    <div 
      class="flex flex-col min-w-[240px] px-3 py-2 pr-11 opacity-100 transition-opacity"
      :class="{ 'opacity-0 pointer-events-none hidden': isCollapsed }"
    >
        <div class="flex items-center justify-between gap-2">
            <div class="flex flex-col flex-1 min-w-0" @click="player.togglePlaylistUrl()" style="cursor:pointer" title="Lihat Daftar Lagu">
                <span class="text-[0.65rem] font-bold text-accent uppercase tracking-wider leading-none flex items-center gap-1">
                    Radio Nawasena <Icon name="material-symbols:expand-more" class="text-xs" />
                </span>
                <span class="text-xs font-semibold text-text-main whitespace-nowrap overflow-hidden text-ellipsis leading-tight max-w-[110px] md:max-w-[130px] mt-0.5">
                  {{ player.currentTrack() ? player.currentTrack()?.judul || player.currentTrack()?.title : 'Memuat...' }}
                </span>
            </div>
            
            <div class="flex items-center gap-0.5 shrink-0">
                <button 
                  class="bg-transparent border-none text-text-muted cursor-pointer w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-accent-soft hover:text-accent p-0" 
                  @click="player.togglePlay()" 
                  title="Play/Pause"
                >
                    <Icon :name="player.isPlaying.value ? 'material-symbols:pause' : 'material-symbols:play-arrow'" size="20" />
                </button>
                <button 
                  class="bg-transparent border-none text-text-muted cursor-pointer w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-accent-soft hover:text-accent p-0" 
                  @click="player.nextTrack()" 
                  title="Lagu berikutnya"
                >
                    <Icon name="material-symbols:skip-next" size="20" />
                </button>
            </div>
        </div>
        
        <!-- Playlist Dropdown -->
        <div 
          class="flex-col gap-0.5 mt-3 pt-3 border-t border-border max-h-[250px] overflow-y-auto"
          :class="showPlaylist ? 'flex' : 'hidden'"
        >
          <div 
            v-for="(track, index) in player.playlist.value" 
            :key="track.id || index"
            class="text-xs py-1.5 px-2 rounded-md cursor-pointer text-text-muted whitespace-break-spaces transition-colors leading-tight"
            :class="player.currentTrackIndex.value === index ? 'bg-accent-soft text-accent font-semibold' : 'hover:bg-accent-soft hover:text-text-main'"
            @click="player.playTrack(index)"
          >
            {{ track.judul || track.title }}
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const player = useMusicPlayer()
const { isCollapsed, showPlaylist } = player
</script>
