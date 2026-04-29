import { articleSlug } from '~/utils/articleSlug'

/**
 * Sitemap source: emits a /dokumentasi/{slug} URL for every published article.
 * Consumed by @nuxtjs/sitemap (configured via `sitemap.sources` in nuxt.config).
 */
export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase as string

  type Article = { id: number; title: string; start_date?: string }
  let articles: Article[] = []
  try {
    articles = await $fetch<Article[]>(`${apiBase}/api/dokumentasi`)
  } catch (err) {
    // If the API is unreachable during build, just emit an empty list.
    console.error('[sitemap] failed to fetch articles:', err)
    return []
  }

  return articles.map(a => ({
    loc: `/dokumentasi/${articleSlug(a)}`,
    lastmod: a.start_date ?? undefined,
    changefreq: 'monthly',
    priority: 0.7,
  }))
})
