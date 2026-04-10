import { ref } from 'vue'

// ─── Singleton state (shared across all component instances) ──────────────────
const loading = ref(true)
const pengurusRaw = ref<any[]>([])   // all from API (excluding DEV-1, done server-side)
const sekbid = ref<any[]>([])

// Filter: pengurus INTI = those WITHOUT a sekbid_number
const pengurus = computed(() => pengurusRaw.value.filter(p => !p.sekbid_number))

const selectedPengurus = ref<any>(null)
const isPengurusModalOpen = ref(false)

const selectedSekbid = ref<any>(null)
const isSekbidModalOpen = ref(false)

let _loaded = false

// ─── Composable ───────────────────────────────────────────────────────────────
export const useStruktur = () => {
  const { fetchPengurus, fetchSekbid } = useApi()

  const loadStrukturData = async (force = false) => {
    if (_loaded && !force) return
    loading.value = true
    const [p, s] = await Promise.all([fetchPengurus(), fetchSekbid()])
    pengurusRaw.value = p || []
    sekbid.value = s || []
    loading.value = false
    _loaded = true
  }

  const openPengurusModal = (data: any) => {
    selectedPengurus.value = data
    isPengurusModalOpen.value = true
    if (import.meta.client) document.body.style.overflow = 'hidden'
  }

  const closePengurusModal = () => {
    isPengurusModalOpen.value = false
    setTimeout(() => { selectedPengurus.value = null }, 300)
    if (import.meta.client) document.body.style.overflow = ''
  }

  const openSekbidModal = (data: any) => {
    selectedSekbid.value = data
    isSekbidModalOpen.value = true
    if (import.meta.client) document.body.style.overflow = 'hidden'
  }

  const closeSekbidModal = () => {
    isSekbidModalOpen.value = false
    setTimeout(() => { selectedSekbid.value = null }, 300)
    if (import.meta.client) document.body.style.overflow = ''
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
