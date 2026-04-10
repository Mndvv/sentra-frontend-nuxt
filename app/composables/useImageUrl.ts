/**
 * Resolve a backend upload path to a full URL.
 * Falls back to an SVG avatar with the initial letter of `name` when `path` is empty.
 */
export const useImageUrl = (path: string | undefined | null, name?: string): string => {
  if (!path || path.trim() === '') {
    // Return initial-letter SVG avatar as data URI
    if (name && name.trim()) {
      const initial = name.trim().charAt(0).toUpperCase()
      return makeInitialAvatar(initial)
    }
    return makeInitialAvatar('?')
  }

  if (path.startsWith('http') || path.startsWith('assets/')) return path

  // Normalise: strip leading slash, strip "uploads/" prefix
  let normalized = path.replace(/^\//, '')
  if (normalized.startsWith('uploads/')) {
    normalized = normalized.slice('uploads/'.length)
  }

  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase as string
  // Derives uploads root from api base, e.g. http://localhost:5000/api → http://localhost:5000/uploads
  const uploadBase = apiBase.endsWith('/api')
    ? apiBase.replace('/api', '/uploads')
    : `${apiBase}/uploads`

  return `${uploadBase}/${normalized}`
}

/** Generate an inline SVG data-URI circle avatar with the given initial.  */
function makeInitialAvatar(initial: string): string {
  const colors = [
    ['#6366f1', '#eef2ff'],  // indigo
    ['#8b5cf6', '#f5f3ff'],  // violet
    ['#ec4899', '#fdf2f8'],  // pink
    ['#14b8a6', '#f0fdfa'],  // teal
    ['#f59e0b', '#fffbeb'],  // amber
    ['#3b82f6', '#eff6ff'],  // blue
  ]
  // Pick a color deterministically based on char code
  const idx = (initial.charCodeAt(0) || 0) % colors.length
  const [fg, bg] = colors[idx]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill="${bg}"/>
    <text x="50" y="50" text-anchor="middle" dominant-baseline="central"
      font-family="Inter,system-ui,sans-serif" font-size="44" font-weight="700" fill="${fg}">${initial}</text>
  </svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
