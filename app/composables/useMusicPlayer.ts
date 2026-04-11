import { watch, onMounted } from 'vue'

// ─── Module-level singletons ───────────────────────────────────────────────────
// Audio element & init flag as true module-level singletons so every component
// calling useMusicPlayer() shares the exact same HTMLAudioElement instance.
// This prevents duplicate playback when multiple components (HeroSection,
// RadioSection, AppMiniPlayer) all call this composable.
let _audio: HTMLAudioElement | null = null
let _audioInitialized = false
let _watcherRegistered = false

// ─── Composable ────────────────────────────────────────────────────────────────
export const useMusicPlayer = () => {
  // Shared reactive state via Nuxt useState (already singleton by key)
  const isPlaying = useState<boolean>('mp-isPlaying', () => false)
  const isCollapsed = useState<boolean>('mp-isCollapsed', () => true)
  const currentTrackIndex = useState<number>('mp-currentTrackIndex', () => 0)
  const playlist = useState<any[]>('mp-playlist', () => [])
  const showPlaylist = useState<boolean>('mp-showPlaylist', () => false)

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
      playlist.value = tracks
      if (import.meta.client) {
        const savedIndex = localStorage.getItem('mp_track_index')
        if (savedIndex !== null) {
          currentTrackIndex.value = parseInt(savedIndex)
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

  // ── Playback controls (all reference singleton _audio) ────────────────────────

  const playTrack = (index: number) => {
    if (!import.meta.client || !_audio) return
    if (playlist.value.length === 0) return
    if (index < 0 || index >= playlist.value.length) return

    // Stop whatever is currently playing first
    _audio.pause()
    isPlaying.value = false

    currentTrackIndex.value = index
    _audio.src = getTrackUrl(playlist.value[index])
    _audio.play().then(() => {
      isPlaying.value = true
    }).catch(e => {
      console.error('Audio play error:', e)
    })
    localStorage.setItem('mp_track_index', index.toString())
  }

  const togglePlay = () => {
    if (!import.meta.client || !_audio) return
    if (playlist.value.length === 0) return

    if (isPlaying.value) {
      _audio.pause()
      isPlaying.value = false
    } else {
      const src = _audio.src || ''
      const isInvalidSrc = !src
        || src.endsWith('undefined')
        || src.endsWith('null')
        || src === window.location.href

      if (isInvalidSrc) {
        playTrack(currentTrackIndex.value)
      } else {
        _audio.play().then(() => {
          isPlaying.value = true
        }).catch(e => {
          console.error('Audio play error:', e)
        })
      }
    }
  }

  const nextTrack = () => {
    if (playlist.value.length === 0) return
    const nextIndex = (currentTrackIndex.value + 1) % playlist.value.length
    playTrack(nextIndex)
  }

  const prevTrack = () => {
    if (playlist.value.length === 0) return
    const prevIndex = (currentTrackIndex.value - 1 + playlist.value.length) % playlist.value.length
    playTrack(prevIndex)
  }

  // ── One-time initialization guard ─────────────────────────────────────────────
  // onMounted can run multiple times (once per component), but we only want to
  // create the HTMLAudioElement and attach listeners exactly once.

  onMounted(() => {
    if (!import.meta.client) return

    if (!_audioInitialized) {
      _audioInitialized = true
      _audio = new Audio()
      // Use a stable reference so the event listener doesn't capture a stale closure
      _audio.addEventListener('ended', () => nextTrack())

      const savedCollapsed = localStorage.getItem('mp_collapsed')
      if (savedCollapsed === 'false') isCollapsed.value = false

      loadPlaylist()
    }

    // Register the watcher only once regardless of how many components mount
    if (!_watcherRegistered) {
      _watcherRegistered = true
      watch(isCollapsed, (val) => {
        localStorage.setItem('mp_collapsed', val.toString())
      })
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
