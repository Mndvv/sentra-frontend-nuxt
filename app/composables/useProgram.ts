import { ref, computed } from 'vue'

export const useProgram = () => {
  const loading = ref(true)
  const programs = ref<any[]>([])
  const filter = ref('all')

  const { fetchProgramKerja } = useApi()

  const loadPrograms = async () => {
    loading.value = true
    const res = await fetchProgramKerja()
    programs.value = res || []
    loading.value = false
  }

  const filteredPrograms = computed(() => {
    if (filter.value === 'all') return programs.value
    return programs.value.filter(p => (p.status || 'Direncanakan') === filter.value)
  })

  return {
    loading,
    programs,
    filter,
    filteredPrograms,
    loadPrograms
  }
}
