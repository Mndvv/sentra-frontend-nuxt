import { watch, onMounted } from 'vue'

// ─── Composable ────────────────────────────────────────────────────────────────
// Audio element is stored on the Nuxt app instance (useNuxtApp()) so it is a
// TRUE singleton — survives HMR, module re-evaluation, and multiple component mounts.
// Module-level variables would be reset on HMR; app-instance properties are not.
export const useMusicPlayer = () => {
  // Shared reactive state (Nuxt useState is key-based singleton)
  const isPlaying = useState<boolean>('mp-isPlaying', () => false)
  const isCollapsed = useState<boolean>('mp-isCollapsed', () => true)
  const currentTrackIndex = useState<number>('mp-currentTrackIndex', () => 0)
  const playlist = useState<any[]>('mp-playlist', () => [])
  const showPlaylist = useState<boolean>('mp-showPlaylist', () => false)

  // ── Get the singleton HTMLAudioElement from the Nuxt app instance ─────────────
  const getAudio = (): HTMLAudioElement | null => {
    if (!import.meta.client) return null
    const app = useNuxtApp() as any
    return (app._mpAudio as HTMLAudioElement) ?? null
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const toggleCollapsed = () => {
    isCollapsed.value = !isCollapsed.value
    if (isCollapsed.value) showPlaylist.value = false
  }

  const togglePlaylistUrl = () => {
    showPlaylist.value = !showPlaylist.value
  }

  const loadPlaylist = async () => {
    if (playlist.value.length > 0) return
    const { fetchRadio } = useApi()
    const tracks = await fetchRadio()
    if (tracks && tracks.length > 0) {
      playlist.value = tracks as any[]
      if (import.meta.client) {
        const savedIndex = localStorage.getItem('mp_track_index')
        if (savedIndex !== null) {
          const idx = parseInt(savedIndex)
          if (!isNaN(idx) && idx < (tracks as any[]).length) currentTrackIndex.value = idx
        }
      }
    }
  }

  const getTrackUrl = (track: any): string => {
    if (!track) return ''
    const config = useRuntimeConfig()
    const base = config.public.apiBase as string
    const fileOrUrl = track.url || track.file || ''
    if (fileOrUrl.startsWith('http')) return fileOrUrl
    if (fileOrUrl.startsWith('/uploads/')) return `${base}${fileOrUrl}`
    return `${base}/uploads/radio/${fileOrUrl}`
  }

  // ── Playback (all through the singleton audio element) ────────────────────────

  const playTrack = (index: number) => {
    const audio = getAudio()
    if (!audio || playlist.value.length === 0) return
    if (index < 0 || index >= playlist.value.length) return

    // Explicitly stop anything already playing before switching
    audio.pause()
    audio.currentTime = 0
    isPlaying.value = false

    currentTrackIndex.value = index
    audio.src = getTrackUrl(playlist.value[index])
    audio.load()
    audio.play().then(() => {
      isPlaying.value = true
    }).catch(e => {
      console.error('[MusicPlayer] play error:', e)
    })
    localStorage.setItem('mp_track_index', index.toString())
  }

  const togglePlay = () => {
    const audio = getAudio()
    if (!audio || playlist.value.length === 0) return

    if (isPlaying.value) {
      audio.pause()
      isPlaying.value = false
    } else {
      const src = audio.src || ''
      const isInvalidSrc =
        !src ||
        src.endsWith('undefined') ||
        src.endsWith('null') ||
        src === window.location.href

      if (isInvalidSrc) {
        playTrack(currentTrackIndex.value)
      } else {
        audio.play().then(() => {
          isPlaying.value = true
        }).catch(e => {
          console.error('[MusicPlayer] resume error:', e)
        })
      }
    }
  }

  const nextTrack = () => {
    if (playlist.value.length === 0) return
    playTrack((currentTrackIndex.value + 1) % playlist.value.length)
  }

  const prevTrack = () => {
    if (playlist.value.length === 0) return
    playTrack((currentTrackIndex.value - 1 + playlist.value.length) % playlist.value.length)
  }

  // ── One-time initialization — guarded by flags on the Nuxt app instance ───────
  // This survives HMR because Nuxt app instance is NOT recreated on module reload.
  onMounted(() => {
    if (!import.meta.client) return
    const app = useNuxtApp() as any

    // Create the HTMLAudioElement exactly once
    if (!app._mpAudio) {
      const audio = new Audio()
      app._mpAudio = audio

      // 'ended' fires when track finishes — advance to next
      audio.addEventListener('ended', () => {
        // Read latest state directly (closure would be stale after HMR)
        const idx = (useNuxtApp() as any)._mpCurrentIndex ?? 0
        const len = (useNuxtApp() as any)._mpPlaylistLen ?? 0
        if (len > 0) playTrack((idx + 1) % len)
      })

      const savedCollapsed = localStorage.getItem('mp_collapsed')
      if (savedCollapsed === 'false') isCollapsed.value = false

      loadPlaylist()
    }

    // Sync playlist length + current index onto app so the 'ended' listener can read them
    // Use flags so they're only registered once across all component mounts
    if (!app._mpIdxWatcher) {
      app._mpIdxWatcher = true
      watch(currentTrackIndex, (val) => { (useNuxtApp() as any)._mpCurrentIndex = val }, { immediate: true })
      watch(playlist, (val) => { (useNuxtApp() as any)._mpPlaylistLen = val.length }, { immediate: true })
    }

    // Persist collapsed state — register watcher once
    if (!app._mpWatcher) {
      app._mpWatcher = true
      watch(isCollapsed, (val) => localStorage.setItem('mp_collapsed', val.toString()))
    }
  })

  return {
    playlist,
    currentTrackIndex,
    isPlaying,
    isCollapsed,
    showPlaylist,
    toggleCollapsed,
    togglePlaylistUrl,
    togglePlay,
    playTrack,
    nextTrack,
    prevTrack,
    loadPlaylist,
    currentTrack: () => playlist.value.length > 0 ? playlist.value[currentTrackIndex.value] : null,
  }
}
