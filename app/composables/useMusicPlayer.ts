import { ref, watch, onMounted } from 'vue'

export const useMusicPlayer = () => {
  const isPlaying = useState<boolean>('mp-isPlaying', () => false)
  const isCollapsed = useState<boolean>('mp-isCollapsed', () => true)
  const currentTrackIndex = useState<number>('mp-currentTrackIndex', () => 0)
  const playlist = useState<any[]>('mp-playlist', () => [])
  
  const showPlaylist = useState<boolean>('mp-showPlaylist', () => false)
  
  const audio = ref<HTMLAudioElement | null>(null)

  const toggleCollapsed = () => {
    isCollapsed.value = !isCollapsed.value
    if (isCollapsed.value) {
      showPlaylist.value = false
    }
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
      // Load saved state from local storage if exists
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
    // track.file is just the filename, e.g. "track-12345.mp3"
    // track.url would be the full path e.g. "/uploads/radio/track-12345.mp3" (if stored that way)
    const config = useRuntimeConfig()
    const base = config.public.apiBase as string
    const fileOrUrl = track.url || track.file || ''
    if (fileOrUrl.startsWith('http')) return fileOrUrl
    if (fileOrUrl.startsWith('/uploads/')) return `${base}${fileOrUrl}`
    // plain filename
    return `${base}/uploads/radio/${fileOrUrl}`
  }

  const playTrack = (index: number) => {
    if (playlist.value.length === 0) return
    if (index >= 0 && index < playlist.value.length) {
      currentTrackIndex.value = index
      if (import.meta.client && audio.value) {
        audio.value.src = getTrackUrl(playlist.value[index])
        audio.value.play().then(() => {
          isPlaying.value = true
        }).catch(e => {
          console.error('Audio play error:', e)
        })
        localStorage.setItem('mp_track_index', index.toString())
      }
    }
  }


  const togglePlay = () => {
    if (!audio.value) return
    if (playlist.value.length === 0) return
    
    if (isPlaying.value) {
      audio.value.pause()
      isPlaying.value = false
    } else {
      if (!audio.value.src || audio.value.src.endsWith('undefined') || audio.value.src.endsWith('null') || audio.value.src === window.location.href) {
        playTrack(currentTrackIndex.value)
      } else {
        audio.value.play().then(() => {
          isPlaying.value = true
        }).catch(e => {
          console.error('Audio play error:', e)
        })
      }
    }
  }

  const nextTrack = () => {
    if (playlist.value.length === 0) return
    let nextIndex = currentTrackIndex.value + 1
    if (nextIndex >= playlist.value.length) {
      nextIndex = 0
    }
    playTrack(nextIndex)
  }

  const prevTrack = () => {
    if (playlist.value.length === 0) return
    let prevIndex = currentTrackIndex.value - 1
    if (prevIndex < 0) {
      prevIndex = playlist.value.length - 1
    }
    playTrack(prevIndex)
  }

  onMounted(() => {
    if (import.meta.client && !audio.value) {
      audio.value = new Audio()
      audio.value.addEventListener('ended', nextTrack)
      
      const savedCollapsed = localStorage.getItem('mp_collapsed')
      if (savedCollapsed === 'false') {
        isCollapsed.value = false
      }
      
      watch(isCollapsed, (val) => {
        localStorage.setItem('mp_collapsed', val.toString())
      })
      
      loadPlaylist()
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
    currentTrack: () => playlist.value.length > 0 ? playlist.value[currentTrackIndex.value] : null
  }
}
