<template>
  <header
    class="min-h-[92vh] md:min-h-screen flex items-center justify-center text-center px-4 md:px-[10%] pt-24 md:pt-28 pb-12 md:pb-20 relative overflow-hidden"
  >
    <!-- Animated gradient background -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-5%,rgba(99,102,241,0.15),transparent),radial-gradient(ellipse_60%_50%_at_80%_90%,rgba(168,85,247,0.09),transparent),radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(236,72,153,0.07),transparent)]"
      />
      <!-- Floating orbs -->
      <div
        class="absolute top-[15%] left-[8%] w-64 h-64 rounded-full bg-accent/5 blur-3xl animate-[float_8s_ease-in-out_infinite]"
      />
      <div
        class="absolute top-[40%] right-[5%] w-80 h-80 rounded-full bg-purple-500/5 blur-3xl animate-[float_10s_ease-in-out_infinite_2s]"
      />
      <div
        class="absolute bottom-[10%] left-[20%] w-48 h-48 rounded-full bg-pink-500/5 blur-3xl animate-[float_12s_ease-in-out_infinite_4s]"
      />
      <!-- Grid pattern -->
      <div
        class="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style="background-image: linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px); background-size: 50px 50px;"
      />
    </div>

    <div class="relative z-10 w-full max-w-4xl mx-auto">
      <!-- Badge -->
      <div
        class="flex justify-center mb-7 animate-[fadeInDown_0.6s_ease_both]"
      >
        <span
          class="inline-flex items-center gap-2 bg-accent-soft text-accent px-4 py-1.5 rounded-full text-[0.72rem] font-bold tracking-widest uppercase border border-accent/20"
        >
          <Icon name="material-symbols:star-rounded" class="text-sm animate-pulse" />
          NAWASENA 2025/2026
        </span>
      </div>

      <!-- Headline -->
      <h1
        class="text-[clamp(2rem,8vw,4.5rem)] leading-[1.08] mb-6 font-black tracking-[-1px] md:tracking-[-2.5px] animate-[fadeInUp_0.7s_ease_0.1s_both]"
      >
        Membangun Masa Depan
        <br />
        <span
          class="bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent"
        >Cerah</span>
        Bersama.
      </h1>

      <!-- Sub -->
      <p
        class="text-text-muted max-w-[540px] mx-auto mb-10 text-[0.98rem] md:text-[1.08rem] leading-[1.75] animate-[fadeInUp_0.7s_ease_0.2s_both]"
      >
        Sebuah mercusuar digital yang mengintegrasikan gerak organisasi dan menampung
        titah aspirasi demi kemajuan sekolah.
      </p>

      <!-- CTAs -->
      <div
        class="flex flex-col sm:flex-row gap-3 justify-center items-center animate-[fadeInUp_0.7s_ease_0.3s_both]"
      >
        <button
          class="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-accent to-purple-500 text-white px-7 py-3.5 rounded-xl font-semibold text-[0.92rem] border-none cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.5)] w-full sm:w-auto active:translate-y-0 active:scale-95"
          @click="scrollToContent"
        >
          <Icon name="material-symbols:explore-rounded" size="18" />
          Jelajahi
        </button>
        <!-- Radio autoplay button -->
        <button
          class="inline-flex items-center justify-center gap-2 border border-border bg-bg-card/60 backdrop-blur-sm text-text-main px-6 py-3.5 rounded-xl font-semibold text-[0.92rem] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_4px_20px_rgba(99,102,241,0.15)] w-full sm:w-auto active:scale-95"
          :class="{ 'border-accent/50 text-accent bg-accent-soft': player.isPlaying.value }"
          @click="toggleRadio"
        >
          <span
            class="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
            :class="player.isPlaying.value ? 'border-accent' : 'border-text-muted'"
          >
            <span
              v-if="player.isPlaying.value"
              class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
            />
          </span>
          <Icon
            :name="player.isPlaying.value ? 'material-symbols:pause-rounded' : 'material-symbols:radio'"
            size="18"
          />
          {{ player.isPlaying.value ? 'Pause Radio' : 'Putar Radio' }}
        </button>
      </div>

      <!-- Now playing ticker -->
      <Transition name="slide-up">
        <div
          v-if="player.isPlaying.value && player.currentTrack()"
          class="mt-6 inline-flex items-center gap-2.5 bg-bg-card/70 backdrop-blur-md border border-accent/20 rounded-full px-4 py-2 text-[0.75rem] text-text-muted animate-[fadeInUp_0.4s_ease_both]"
        >
          <!-- Equalizer bars -->
          <span class="flex items-end gap-[3px] h-3">
            <span class="w-[3px] bg-accent rounded-full animate-[eq1_0.8s_ease-in-out_infinite]" />
            <span class="w-[3px] bg-accent rounded-full animate-[eq2_0.8s_ease-in-out_0.15s_infinite]" />
            <span class="w-[3px] bg-accent rounded-full animate-[eq3_0.8s_ease-in-out_0.3s_infinite]" />
          </span>
          <span class="text-accent font-semibold">Sedang Diputar:</span>
          <span class="max-w-[200px] truncate">{{ player.currentTrack()?.judul || player.currentTrack()?.title }}</span>
        </div>
      </Transition>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-0 right-0 flex justify-center animate-[fadeIn_1s_ease_1s_both]">
      <button
        class="flex flex-col items-center gap-1 text-text-muted hover:text-accent transition-colors cursor-pointer bg-transparent border-none"
        @click="scrollToContent"
      >
        <span class="text-[0.65rem] font-bold tracking-widest uppercase opacity-60">Scroll</span>
        <Icon name="material-symbols:keyboard-arrow-down-rounded" class="text-2xl animate-bounce" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const player = useMusicPlayer()

const scrollToContent = () => {
  if (import.meta.client) {
    const el = document.getElementById('nawasena-section')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const toggleRadio = async () => {
  // Load playlist first if needed
  if (player.playlist.value.length === 0) {
    await player.loadPlaylist()
  }
  if (player.playlist.value.length === 0) return

  if (!player.isPlaying.value) {
    player.isCollapsed.value = false
    player.playTrack(0)
  } else {
    player.togglePlay()
  }
}
</script>

<style>
@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes eq1 {
  0%, 100% { height: 4px; }
  50% { height: 12px; }
}
@keyframes eq2 {
  0%, 100% { height: 8px; }
  50% { height: 4px; }
}
@keyframes eq3 {
  0%, 100% { height: 6px; }
  50% { height: 12px; }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
