import { ref } from 'vue'

// ─── Module-level singleton state ─────────────────────────────────────────────
const loading      = ref(true)
const error        = ref(false)

const topPeriods   = ref<any[]>([])
const otherPeriods = ref<any[]>([])
const developers   = ref<any[]>([])

// Modal state — shared across hof.vue, HofModal.vue, HofPeriodBlock.vue
const isHofModalOpen = ref(false)
const modalType      = ref<'PERIOD_MEMBERS' | 'MEMBER_PROFILE' | 'OLDER_PERIODS'>('MEMBER_PROFILE')
const modalTitle     = ref('')
const modalData      = ref<any>(null)

let _loaded = false

// ─── Composable ───────────────────────────────────────────────────────────────
export const useHof = () => {
  const { fetchHof } = useApi()

  const loadHofData = async (force = false) => {
    if (_loaded && !force) return
    loading.value = true
    error.value   = false
    try {
      const data = await fetchHof()
      if (data) {
        topPeriods.value   = data.top_periods   || []
        otherPeriods.value = data.other_periods || []
        developers.value   = data.developers    || []
      } else {
        error.value = true
      }
    } catch (e) {
      console.error('Failed to load HoF:', e)
      error.value = true
    } finally {
      loading.value = false
      _loaded = true
    }
  }

  // ── Modal openers ───────────────────────────────────
  const openPeriodMembersModal = (period: any, isOther = false) => {
    modalType.value  = 'PERIOD_MEMBERS'
    modalTitle.value = `Anggota Pengurus — Periode ${period.nama}`
    const members    = isOther
      ? (period.members || [])
      : [...(period.bph || []), ...(period.anggota || [])]
    modalData.value      = members
    isHofModalOpen.value = true
    if (import.meta.client) document.body.style.overflow = 'hidden'
  }

  const openMemberProfileModal = (member: any) => {
    modalType.value      = 'MEMBER_PROFILE'
    modalTitle.value     = 'Profil Demisioner'
    modalData.value      = member
    isHofModalOpen.value = true
    if (import.meta.client) document.body.style.overflow = 'hidden'
  }

  const openOlderPeriodsModal = () => {
    modalType.value      = 'OLDER_PERIODS'
    modalTitle.value     = 'Periode Terdahulu'
    modalData.value      = otherPeriods.value
    isHofModalOpen.value = true
    if (import.meta.client) document.body.style.overflow = 'hidden'
  }

  const closeHofModal = () => {
    isHofModalOpen.value = false
    if (import.meta.client) document.body.style.overflow = ''
  }

  return {
    loading,
    error,
    topPeriods,
    otherPeriods,
    developers,
    loadHofData,

    isHofModalOpen,
    modalType,
    modalTitle,
    modalData,

    openPeriodMembersModal,
    openMemberProfileModal,
    openOlderPeriodsModal,
    closeHofModal,
  }
}
