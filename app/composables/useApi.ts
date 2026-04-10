export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const fetchPengurus = () => $fetch(`${baseURL}/pengurus`).catch(() => [])
  const fetchSekbid = () => $fetch(`${baseURL}/sekbid`).catch(() => [])
  const fetchProgramKerja = () => $fetch(`${baseURL}/program-kerja`).catch(() => [])
  const fetchAgenda = () => $fetch(`${baseURL}/agenda`).catch(() => [])
  const fetchDokumentasi = () => $fetch(`${baseURL}/dokumentasi`).catch(() => [])
  const fetchHof = () => $fetch(`${baseURL}/hof`).catch(() => null)
  const fetchRadio = () => $fetch(`${baseURL}/radio`).catch(() => [])

  const submitKotakSaran = async (data: any) => {
    try {
      const res = await $fetch(`${baseURL}/kotak-saran`, {
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
