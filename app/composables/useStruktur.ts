import { ref, computed } from 'vue'

// ─── Types ────────────────────────────────────────────────────────────────────
export type Organisasi = 'osis' | 'mpk'

// ─── Module-level singleton state ─────────────────────────────────────────────
const loading       = ref(true)
const pengurusRaw   = ref<any[]>([])
const sekbidRaw     = ref<any[]>([])
const komisiRaw     = ref<any[]>([])

const activeOrg = ref<Organisasi>('osis')

const _matchesOrg = (item: any) => {
  // Backend now sends `org: 'OSIS' | 'MPK' | 'SYSTEM'` on every pengurus record.
  // Fallback: legacy `organisasi` field.
  const org = String(item?.org ?? item?.organisasi ?? 'osis').toLowerCase()
  return org === activeOrg.value
}

// BPH = pengurus inti tanpa division (sekbid_number untuk OSIS, komisi untuk MPK)
const pengurus = computed(() =>
  pengurusRaw.value.filter(p => {
    if (!_matchesOrg(p)) return false
    if (activeOrg.value === 'osis') return !p.sekbid_number
    if (activeOrg.value === 'mpk')  return !p.komisi
    return false
  })
)

// Untuk OSIS: sekbid. Untuk MPK: komisi (mapped jadi struktur sekbid-like supaya UI sama).
const sekbid = computed(() => {
  if (activeOrg.value === 'osis') return sekbidRaw.value
  // Map komisi → sekbid-like shape: {number, name, members, programs?}
  return komisiRaw.value.map((k: any) => ({
    number:   k.letter,        // 'A','B','C','D','E'
    name:     k.name,
    members:  k.members,
    programs: [],              // MPK proker per komisi belum ada di skema saat ini
    _isKomisi: true,           // flag untuk komponen yang perlu nge-handle MPK secara khusus
  }))
})

// Total anggota di organisasi aktif
const totalAnggotaCount = computed(() =>
  pengurusRaw.value.filter(_matchesOrg).length,
)

const selectedPengurus    = ref<any>(null)
const isPengurusModalOpen = ref(false)

const selectedSekbid    = ref<any>(null)
const isSekbidModalOpen = ref(false)

let _pengurusCloseTimer: ReturnType<typeof setTimeout> | null = null
let _sekbidCloseTimer:   ReturnType<typeof setTimeout> | null = null

let _loaded = false

// ─── Composable ───────────────────────────────────────────────────────────────
export const useStruktur = () => {
  const { fetchPengurus, fetchSekbid, fetchKomisi } = useApi()

  const loadStrukturData = async (force = false) => {
    if (_loaded && !force) return
    loading.value = true
    const [p, s, k] = await Promise.all([fetchPengurus(), fetchSekbid(), fetchKomisi()])
    pengurusRaw.value = (p as any[]) || []
    sekbidRaw.value   = (s as any[]) || []
    komisiRaw.value   = (k as any[]) || []
    loading.value     = false
    _loaded           = true
  }

  // ── Org tabs ────────────────────────────────────────
  const setActiveOrg = (org: Organisasi) => {
    activeOrg.value = org
  }

  // ── Sekbid/Komisi → Pengurus lookups ────────────────
  /**
   * Find a pengurus record matching a sekbid/komisi member entry.
   * For OSIS: match by sekbid_number + nama.
   * For MPK: match by komisi (letter) + nama.
   */
  const findPengurusForSekbidMember = (sekbidNumber: number | string, memberName: string) => {
    if (activeOrg.value === 'mpk') {
      return pengurusRaw.value.find(
        p => p.komisi === sekbidNumber && p.nama === memberName,
      )
    }
    return pengurusRaw.value.find(
      p => p.sekbid_number === sekbidNumber && p.nama === memberName,
    )
  }

  /** Find the coordinator (Koordinator) pengurus record for a given sekbid/komisi. */
  const findKoordinatorForSekbid = (sekbidNumber: number | string) => {
    if (activeOrg.value === 'mpk') {
      return pengurusRaw.value.find(
        p => p.komisi === sekbidNumber && /koordinator/i.test(p.sekbid_role || ''),
      )
    }
    return pengurusRaw.value.find(
      p => p.sekbid_number === sekbidNumber && /koordinator/i.test(p.sekbid_role || ''),
    )
  }

  /**
   * Resolve the program kerja of a sekbid/komisi.
   *
   * Primary source: the coordinator's personal `programKerja` (BPH-scope).
   * Plus legacy SEKBID-scoped programs (`sekbid.programs`) merged in,
   * deduplicated by id.
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
