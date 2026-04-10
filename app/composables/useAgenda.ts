import { ref } from 'vue'

export const useAgenda = () => {
  const loading = ref(true)
  const agendas = ref<any[]>([])

  const { fetchAgenda } = useApi()

  const loadAgendas = async () => {
    loading.value = true
    const res = await fetchAgenda()
    agendas.value = res || []
    loading.value = false
  }

  // Format datetimes logic can also reside here for components if needed,
  // but often best left to component or another util.
  const formatDate = (isoString: string) => {
    if (!isoString) return ''
    const d = new Date(isoString)
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(d).replace(',', ' •')
  }

  return {
    loading,
    agendas,
    loadAgendas,
    formatDate
  }
}
