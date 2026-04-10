export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  // All backend routes are under /api prefix
  const api = `${baseURL}/api`

  const fetchPengurus = () => $fetch(`${api}/pengurus`).catch(() => [])
  const fetchSekbid = () => $fetch(`${api}/sekbid`).catch(() => [])
  const fetchProgramKerja = () => $fetch(`${api}/program-kerja`).catch(() => [])
  const fetchAgenda = () => $fetch(`${api}/agenda`).catch(() => [])
  const fetchDokumentasi = () => $fetch(`${api}/dokumentasi`).catch(() => [])
  const fetchHof = () => $fetch(`${api}/hof`).catch(() => null)
  const fetchRadio = () => $fetch(`${api}/radio`).catch(() => [])

  const submitKotakSaran = async (data: any) => {
    try {
      const res = await $fetch(`${api}/kotak-saran`, {
        method: 'POST',
        body: data
      })
      return res
    } catch (e: any) {
      return { success: false, message: e.message }
    }
  }

  return {
    fetchPengurus,
    fetchSekbid,
    fetchProgramKerja,
    fetchAgenda,
    fetchDokumentasi,
    fetchHof,
    fetchRadio,
    submitKotakSaran
  }
}
