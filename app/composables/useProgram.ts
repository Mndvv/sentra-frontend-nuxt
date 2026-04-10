import { ref, computed } from 'vue'

// ─── Module-level singleton ────────────────────────────────────────────────────
const loading  = ref(true)
const programs = ref<any[]>([])
const filter   = ref('all')

let _loaded = false

const filteredPrograms = computed(() => {
  if (filter.value === 'all') return programs.value
  return programs.value.filter(p => (p.status || 'Direncanakan') === filter.value)
})

// ─── Composable ───────────────────────────────────────────────────────────────
export const useProgram = () => {
  const { fetchProgramKerja } = useApi()

  const loadPrograms = async (force = false) => {
    if (_loaded && !force) return
    loading.value = true
    const res = await fetchProgramKerja()
    programs.value = res || []
    loading.value  = false
    _loaded = true
  }

  return {
    loading,
    programs,
    filter,
    filteredPrograms,
    loadPrograms,
  }
}
