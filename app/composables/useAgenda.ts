import { ref } from 'vue'

// ─── Module-level singleton ────────────────────────────────────────────────────
const loading = ref(true)
const agendas = ref<any[]>([])
let _loaded = false

// ─── Composable ───────────────────────────────────────────────────────────────
export const useAgenda = () => {
  const { fetchAgenda } = useApi()

  const loadAgendas = async (force = false) => {
    if (_loaded && !force) return
    loading.value = true
    const res = await fetchAgenda()
    agendas.value = res || []
    loading.value = false
    _loaded = true
  }

  const formatDate = (isoString: string) => {
    if (!isoString) return ''
    const d = new Date(isoString)
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(d)
  }

  return { loading, agendas, loadAgendas, formatDate }
}
