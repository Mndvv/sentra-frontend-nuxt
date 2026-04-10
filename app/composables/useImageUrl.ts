export const useImageUrl = (path: string | undefined | null) => {
  if (!path) return '/default-placeholder.webp' // Put a default image in public folder later if needed
  
  if (path.startsWith('http') || path.startsWith('assets/')) return path

  let normalized = path.replace(/^\//, '')
  if (normalized.startsWith('uploads/')) {
    normalized = normalized.slice('uploads/'.length)
  }

  // Fallback to domain if API base is 192.168.1.125 but uploads are in api.nawasena.site
  // Since we develop locally, we might want to just point to the live API or local if it serves static files
  // For now let's assume apiBase includes /api and uploads is sibling
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase as string
  const baseUrlParts = apiBase.split('/')
  // if apiBase is http://localhost:5000/api or just http://localhost:5000
  // in legacy api.js: UPLOADS_URL = "https://api.nawasena.site/uploads"
  // Let's deduce uploads base: replace /api with /uploads or just append /uploads
  const uploadBase = apiBase.endsWith('/api') ? apiBase.replace('/api', '/uploads') : `${apiBase}/uploads`
  
  return `${uploadBase}/${normalized}`
}
