import { ref } from 'vue'

// ─── Module-level singleton state ─────────────────────────────────────────────
const loading        = ref(true)
const error          = ref(false)

const topGenerations   = ref<any[]>([])
const olderGenerations = ref<any[]>([])
const developers       = ref<any[]>([])

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
      const data: any = await fetchHof()
      if (data) {
        topGenerations.value   = data.top_generations   || []
        olderGenerations.value = data.older_generations || []
        developers.value       = data.developers        || []
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
  // period = osis or mpk sub-object (has .nama, .tahun, .anggota[] or .members[])
  const openPeriodMembersModal = (period: any, org: 'OSIS' | 'MPK', isOther = false) => {
    modalType.value  = 'PERIOD_MEMBERS'
    modalTitle.value = `Anggota ${org} — Periode ${period.nama}`
    const members    = isOther
      ? (period.members || [])
      : (period.anggota || [])
    modalData.value      = { members, org }
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
    modalData.value      = olderGenerations.value
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
    topGenerations,
    olderGenerations,
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
