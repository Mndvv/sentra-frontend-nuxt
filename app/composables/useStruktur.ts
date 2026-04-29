import { ref, computed } from 'vue'

// ─── Types ────────────────────────────────────────────────────────────────────
export type Organisasi = 'osis' | 'mpk'

// ─── Module-level singleton state ─────────────────────────────────────────────
const loading       = ref(true)
const pengurusRaw   = ref<any[]>([])
const sekbidRaw     = ref<any[]>([])

/**
 * Currently active organisation tab. Defaults to OSIS.
 * Backend can later add an `organisasi: 'osis' | 'mpk'` field on pengurus and
 * sekbid records — anything missing falls back to `'osis'`, so the existing
 * Nawasena OSIS data renders unchanged until MPK records are added.
 */
const activeOrg = ref<Organisasi>('osis')

const _matchesOrg = (item: any) => {
  const org = String(item?.organisasi ?? item?.org ?? 'osis').toLowerCase()
  return org === activeOrg.value
}

// Only BPH pengurus (no sekbid_number) shown in the main grid, filtered by org.
const pengurus = computed(() =>
  pengurusRaw.value.filter(p => !p.sekbid_number && _matchesOrg(p)),
)

// Sekbid filtered by org.
const sekbid = computed(() => sekbidRaw.value.filter(_matchesOrg))

// Total members across the active organisation (BPH + sekbid members).
const totalAnggotaCount = computed(() =>
  pengurusRaw.value.filter(_matchesOrg).length,
)

const selectedPengurus    = ref<any>(null)
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
    sekbidRaw.value   = s || []
    loading.value     = false
    _loaded           = true
  }

  // ── Org tabs ────────────────────────────────────────
  const setActiveOrg = (org: Organisasi) => {
    activeOrg.value = org
  }

  // ── Sekbid → Pengurus lookups ───────────────────────
  /**
   * Find a pengurus record matching a sekbid member entry from /sekbid.
   * Sekbid `members` only contain { name, role, foto } so we resolve to the
   * full pengurus profile (biodata, motto, programKerja, …) by matching on
   * sekbid_number + nama.
   */
  const findPengurusForSekbidMember = (sekbidNumber: number, memberName: string) => {
    return pengurusRaw.value.find(
      p => p.sekbid_number === sekbidNumber && p.nama === memberName,
    )
  }

  /** Find the coordinator (Koordinator) pengurus record for a given sekbid. */
  const findKoordinatorForSekbid = (sekbidNumber: number) => {
    return pengurusRaw.value.find(
      p => p.sekbid_number === sekbidNumber && /koordinator/i.test(p.sekbid_role || ''),
    )
  }

  /**
   * Resolve the program kerja of a sekbid.
   *
   * The user spec is "the sekbid's program kerja IS the coordinator's program
   * kerja". We honour that as the primary source, then merge in the legacy
   * SEKBID-scoped programs (`sekbid.programs`) so we never drop existing data.
   * Programs are deduplicated by id.
   */
  const resolveSekbidPrograms = (sekbid: any): any[] => {
    if (!sekbid) return []

    const koord = findKoordinatorForSekbid(sekbid.number)
    const koordPrograms = (koord?.programKerja || []).map((p: any) => ({
      id:          p.id,
      name:        p.nama,
      description: p.deskripsi,
      status:      p.status,
      target:      p.target,
    }))

    const seen = new Set<number | string>(koordPrograms.map((p: any) => p.id))
    const legacy = (sekbid.programs || []).filter((p: any) => !seen.has(p.id))

    return [...koordPrograms, ...legacy]
  }

  // ── Pengurus modal ──────────────────────────────────
  const openPengurusModal = (data: any) => {
    if (_pengurusCloseTimer) {
      clearTimeout(_pengurusCloseTimer)
      _pengurusCloseTimer = null
    }
    selectedPengurus.value    = data
    isPengurusModalOpen.value = true
    if (import.meta.client) document.body.style.overflow = 'hidden'
  }

  const closePengurusModal = () => {
    isPengurusModalOpen.value = false
    if (import.meta.client) document.body.style.overflow = ''
    _pengurusCloseTimer = setTimeout(() => {
      selectedPengurus.value = null
      _pengurusCloseTimer    = null
    }, 350)
  }

  // ── Sekbid modal ────────────────────────────────────
  const openSekbidModal = (data: any) => {
    if (_sekbidCloseTimer) {
      clearTimeout(_sekbidCloseTimer)
      _sekbidCloseTimer = null
    }
    selectedSekbid.value    = data
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
    activeOrg,
    setActiveOrg,
    totalAnggotaCount,
    selectedPengurus,
    isPengurusModalOpen,
    selectedSekbid,
    isSekbidModalOpen,
    loadStrukturData,
    openPengurusModal,
    closePengurusModal,
    openSekbidModal,
    closeSekbidModal,
    findPengurusForSekbidMember,
    findKoordinatorForSekbid,
    resolveSekbidPrograms,
  }
}
