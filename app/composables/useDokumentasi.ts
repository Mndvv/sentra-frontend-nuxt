import { ref } from 'vue'

// ─── Module-level singleton state ─────────────────────────────────────────────
const loading       = ref(true)
const dokumentasi   = ref<any[]>([])

const selectedEvent        = ref<any>(null)
const isArticleModalOpen   = ref(false)

const selectedPhotos       = ref<any[]>([])
const selectedPhotoIndex   = ref(0)
const isLightboxModalOpen  = ref(false)

let _articleCloseTimer: ReturnType<typeof setTimeout> | null = null
let _loaded = false

// ─── Composable ───────────────────────────────────────────────────────────────
export const useDokumentasi = () => {
  const { fetchDokumentasi } = useApi()

  const loadDokumentasiData = async (force = false) => {
    if (_loaded && !force) return
    loading.value = true
    try {
      const data = await fetchDokumentasi()
      dokumentasi.value = Array.isArray(data) ? data : []
    } catch (e) {
      console.error('Failed to load dokumentasi:', e)
      dokumentasi.value = []
    } finally {
      loading.value = false
      _loaded = true
    }
  }

  // ── Article modal ───────────────────────────────────
  const openArticleModal = (event: any) => {
    // Cancel any pending clear from a previous close
    if (_articleCloseTimer) {
      clearTimeout(_articleCloseTimer)
      _articleCloseTimer = null
    }
    selectedEvent.value       = event
    isArticleModalOpen.value  = true
    if (import.meta.client) document.body.style.overflow = 'hidden'
  }

  const closeArticleModal = () => {
    isArticleModalOpen.value = false
    if (import.meta.client) document.body.style.overflow = ''
    _articleCloseTimer = setTimeout(() => {
      selectedEvent.value  = null
      _articleCloseTimer   = null
    }, 400)
  }

  // ── Lightbox modal ──────────────────────────────────
  const openLightboxModal = (photos: any[], startIndex = 0) => {
    selectedPhotos.value      = photos
    selectedPhotoIndex.value  = startIndex
    isLightboxModalOpen.value = true
  }

  const closeLightboxModal = () => {
    isLightboxModalOpen.value = false
  }

  return {
    loading,
    dokumentasi,
    loadDokumentasiData,

    selectedEvent,
    isArticleModalOpen,
    openArticleModal,
    closeArticleModal,

    selectedPhotos,
    selectedPhotoIndex,
    isLightboxModalOpen,
    openLightboxModal,
    closeLightboxModal,
  }
}
