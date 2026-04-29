/**
 * Article slug helpers — used to build SEO-friendly URLs for dokumentasi entries.
 *
 * The slug is composite: `{id}-{slugified-title}` (e.g. `9-bimbingan-remaja-usia-sekolah-brus`).
 * This gives us:
 *  • Human-readable URLs (good for SEO + sharing)
 *  • A stable id prefix the backend can look up regardless of title changes
 */

export interface ArticleLike {
  id: number
  title: string
}

const slugify = (s: string) =>
  s.toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/[^a-z0-9\s-]/g, '')    // strip everything but alnum/space/dash
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')             // collapse repeated dashes
    .substring(0, 80)

/** Build a `{id}-{slug}` URL fragment for an article. */
export const articleSlug = (article: ArticleLike): string => {
  const s = slugify(article.title || '')
  return s ? `${article.id}-${s}` : String(article.id)
}

/** Parse an article slug back to its numeric id. Returns NaN if unparseable. */
export const parseArticleSlug = (slug: string | undefined | null): number => {
  if (!slug) return NaN
  const match = String(slug).match(/^(\d+)/)
  return match ? Number(match[1]) : NaN
}
