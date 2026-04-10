import { ref } from 'vue'

export const useHof = () => {
  const { fetchHof } = useApi()
  const loading = ref(true)
  const error = ref(false)
  
  const topPeriods = ref<any[]>([])
  const otherPeriods = ref<any[]>([])
  const developers = ref<any[]>([])

  // Modal State
  const isHofModalOpen = ref(false)
  const modalType = ref<'PERIOD_MEMBERS' | 'MEMBER_PROFILE' | 'OLDER_PERIODS'>('MEMBER_PROFILE')
  const modalTitle = ref('')
  const modalData = ref<any>(null)

  const loadHofData = async () => {
    loading.value = true
    error.value = false
    try {
      const data = await fetchHof()
      if (data) {
        topPeriods.value = data.top_periods || []
        otherPeriods.value = data.other_periods || []
        developers.value = data.developers || []
      } else {
        error.value = true
      }
    } catch (e) {
      console.error(e)
      error.value = true
    } finally {
      loading.value = false
    }
  }

  const openPeriodMembersModal = (period: any, isOther: boolean = false) => {
    modalType.value = 'PERIOD_MEMBERS'
    modalTitle.value = `Anggota Pengurus — Periode ${period.nama}`
    const members = isOther ? (period.members || []) : [...(period.bph || []), ...(period.anggota || [])]
    modalData.value = members
    isHofModalOpen.value = true
  }

  const openMemberProfileModal = (member: any) => {
    modalType.value = 'MEMBER_PROFILE'
    modalTitle.value = 'Profil Demisioner'
    modalData.value = member
    isHofModalOpen.value = true
  }

  const openOlderPeriodsModal = () => {
    modalType.value = 'OLDER_PERIODS'
    modalTitle.value = 'Periode Terdahulu'
    modalData.value = otherPeriods.value
    isHofModalOpen.value = true
  }

  const closeHofModal = () => {
    isHofModalOpen.value = false
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
    closeHofModal
  }
}
