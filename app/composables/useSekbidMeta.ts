/**
 * Visual metadata (icon + theme colour) for each Sekbid.
 *
 * The sekbid `number` (1-10) follows the standard Indonesian OSIS structure
 * (Permendiknas 39/2008) and is stable across schools. We map each one to a
 * representative Iconify icon and a colour that becomes the card/modal accent.
 *
 * Note: there is no official Iconify glyph for the Pancasila/Garuda emblem, so
 * we use `diversity-3` for the Demokrasi/HAM/Toleransi sekbid as the closest
 * representation of pluralism.
 */
export interface SekbidMeta {
  /** Iconify name (e.g. `material-symbols:mosque`). */
  icon: string
  /** Primary accent colour (hex). */
  color: string
  /** Subtle tinted background derived from `color`. */
  glow: string
  /** Short label for compact UI. */
  short: string
}

const _meta: Record<number, SekbidMeta> = {
  1:  { icon: 'material-symbols:mosque',                color: '#10b981', glow: 'rgba(16, 185, 129, 0.14)', short: 'Keimanan' },
  2:  { icon: 'material-symbols:volunteer-activism',    color: '#f43f5e', glow: 'rgba(244,  63,  94, 0.14)', short: 'Akhlak' },
  3:  { icon: 'material-symbols:flag-rounded',          color: '#ef4444', glow: 'rgba(239,  68,  68, 0.14)', short: 'Bela Negara' },
  4:  { icon: 'material-symbols:trophy',  color: '#f59e0b', glow: 'rgba(245, 158,  11, 0.14)', short: 'Prestasi' },
  5:  { icon: 'material-symbols:diversity-3-rounded',   color: '#6366f1', glow: 'rgba( 99, 102, 241, 0.14)', short: 'Demokrasi' },
  6:  { icon: 'material-symbols:lightbulb-rounded',     color: '#8b5cf6', glow: 'rgba(139,  92, 246, 0.14)', short: 'Kreativitas' },
  7:  { icon: 'material-symbols:fitness-center',        color: '#22c55e', glow: 'rgba( 34, 197,  94, 0.14)', short: 'Kesehatan' },
  8:  { icon: 'material-symbols:menu-book-rounded',     color: '#ec4899', glow: 'rgba(236,  72, 153, 0.14)', short: 'Sastra' },
  9:  { icon: 'material-symbols:computer-rounded',      color: '#06b6d4', glow: 'rgba(  6, 182, 212, 0.14)', short: 'Teknologi' },
  10: { icon: 'material-symbols:translate-rounded',     color: '#0ea5e9', glow: 'rgba( 14, 165, 233, 0.14)', short: 'Bahasa Inggris' },
}

const _fallback: SekbidMeta = {
  icon: 'material-symbols:groups-rounded',
  color: '#6366f1',
  glow: 'rgba(99, 102, 241, 0.14)',
  short: 'Sekbid',
}

// Visual meta untuk MPK Komisi (A–E)
const _komisiMeta: Record<string, SekbidMeta> = {
  A: { icon: 'material-symbols:gavel-rounded',     color: '#0ea5e9', glow: 'rgba( 14, 165, 233, 0.14)', short: 'Komisi A' },
  B: { icon: 'material-symbols:campaign-rounded',  color: '#f59e0b', glow: 'rgba(245, 158,  11, 0.14)', short: 'Komisi B' },
  C: { icon: 'material-symbols:assessment-rounded',color: '#10b981', glow: 'rgba( 16, 185, 129, 0.14)', short: 'Komisi C' },
  D: { icon: 'material-symbols:shield-rounded',    color: '#8b5cf6', glow: 'rgba(139,  92, 246, 0.14)', short: 'Komisi D' },
  E: { icon: 'material-symbols:public-rounded',    color: '#ec4899', glow: 'rgba(236,  72, 153, 0.14)', short: 'Komisi E' },
}

export const useSekbidMeta = (key?: number | string | null): SekbidMeta => {
  if (!key) return _fallback
  if (typeof key === 'string' && _komisiMeta[key.toUpperCase()]) {
    return _komisiMeta[key.toUpperCase()]!
  }
  return _meta[Number(key)] ?? _fallback
}
