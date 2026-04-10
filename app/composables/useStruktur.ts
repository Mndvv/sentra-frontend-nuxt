import { ref } from 'vue'

export const useStruktur = () => {
  const loading = ref(true)
  const pengurus = ref<any[]>([])
  const sekbid = ref<any[]>([])

  const selectedPengurus = ref<any>(null)
  const isPengurusModalOpen = ref(false)

  const selectedSekbid = ref<any>(null)
  const isSekbidModalOpen = ref(false)

  const { fetchPengurus, fetchSekbid } = useApi()

  const loadStrukturData = async () => {
    loading.value = true
    const [p, s] = await Promise.all([fetchPengurus(), fetchSekbid()])
    pengurus.value = p || []
    sekbid.value = s || []
    loading.value = false
  }

  const openPengurusModal = (data: any) => {
    selectedPengurus.value = data
    isPengurusModalOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  const closePengurusModal = () => {
    isPengurusModalOpen.value = false
    setTimeout(() => { selectedPengurus.value = null }, 300)
    document.body.style.overflow = ''
  }

  const openSekbidModal = (data: any) => {
    selectedSekbid.value = data
    isSekbidModalOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  const closeSekbidModal = () => {
    isSekbidModalOpen.value = false
    setTimeout(() => { selectedSekbid.value = null }, 300)
    document.body.style.overflow = ''
  }

  return {
    loading,
    pengurus,
    sekbid,
    selectedPengurus,
    isPengurusModalOpen,
    selectedSekbid,
    isSekbidModalOpen,
    loadStrukturData,
    openPengurusModal,
    closePengurusModal,
    openSekbidModal,
    closeSekbidModal
  }
}
