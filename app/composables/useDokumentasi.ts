import { ref } from 'vue'

export const useDokumentasi = () => {
  const { fetchDokumentasi } = useApi()

  const loading = ref(true)
  const dokumentasi = ref<any[]>([])
  
  const selectedEvent = ref<any>(null)
  const isArticleModalOpen = ref(false)

  const selectedPhotos = ref<any[]>([])
  const selectedPhotoIndex = ref(0)
  const isLightboxModalOpen = ref(false)

  const loadDokumentasiData = async () => {
    loading.value = true
    try {
      const data = await fetchDokumentasi()
      dokumentasi.value = Array.isArray(data) ? data : []
    } catch (e) {
      console.error('Failed to load dokumentasi:', e)
      dokumentasi.value = []
    } finally {
      loading.value = false
    }
  }

  const openArticleModal = (event: any) => {
    selectedEvent.value = event
    isArticleModalOpen.value = true
  }

  const closeArticleModal = () => {
    isArticleModalOpen.value = false
  }

  const openLightboxModal = (photos: any[], startIndex: number = 0) => {
    selectedPhotos.value = photos
    selectedPhotoIndex.value = startIndex
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
    closeLightboxModal
  }
}
