import { ref, computed } from 'vue'

// ─── Module-level singleton state ─────────────────────────────────────────────
const loading       = ref(true)
const pengurusRaw   = ref<any[]>([])
const sekbid        = ref<any[]>([])

// Only BPH pengurus (no sekbid_number) shown in the main grid
const pengurus = computed(() => pengurusRaw.value.filter(p => !p.sekbid_number))

const selectedPengurus   = ref<any>(null)
const isPengurusModalOpen = ref(false)

const selectedSekbid    = ref<any>(null)
const isSekbidModalOpen = ref(false)

// Track pending close-timers so we can cancel them when re-opening fast
let _pengurusCloseTimer: ReturnType<typeof setTimeout> | null = null
let _sekbidCloseTimer:   ReturnType<typeof setTimeout> | null = null

let _loaded = false

// ─── Composable ───────────────────────────────────────────────────────────────
export const useStruktur = () => {
  const { fetchPengurus, fetchSekbid } = useApi()

  const loadStrukturData = async (force = false) => {
    if (_loaded && !force) return
    loading.value = true
    const [p, s] = await Promise.all([fetchPengurus(), fetchSekbid()])
    pengurusRaw.value = p || []
    sekbid.value      = s || []
    loading.value     = false
    _loaded           = true
  }

  // ── Pengurus modal ──────────────────────────────────
  const openPengurusModal = (data: any) => {
    // Cancel any pending clear from a previous close
    if (_pengurusCloseTimer) {
      clearTimeout(_pengurusCloseTimer)
      _pengurusCloseTimer = null
    }
    selectedPengurus.value   = data
    isPengurusModalOpen.value = true
    if (import.meta.client) document.body.style.overflow = 'hidden'
  }

  const closePengurusModal = () => {
    isPengurusModalOpen.value = false
    if (import.meta.client) document.body.style.overflow = ''
    _pengurusCloseTimer = setTimeout(() => {
      selectedPengurus.value  = null
      _pengurusCloseTimer     = null
    }, 350)
  }

  // ── Sekbid modal ────────────────────────────────────
  const openSekbidModal = (data: any) => {
    // Cancel any pending clear from a previous close
    if (_sekbidCloseTimer) {
      clearTimeout(_sekbidCloseTimer)
      _sekbidCloseTimer = null
    }
    selectedSekbid.value   = data
    isSekbidModalOpen.value = true
    if (import.meta.client) document.body.style.overflow = 'hidden'
  }

  const closeSekbidModal = () => {
    isSekbidModalOpen.value = false
    if (import.meta.client) document.body.style.overflow = ''
    _sekbidCloseTimer = setTimeout(() => {
      selectedSekbid.value = null
      _sekbidCloseTimer    = null
    }, 350)
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
    closeSekbidModal,
  }
}
