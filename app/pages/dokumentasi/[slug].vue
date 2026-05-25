<template>
  <main class="article-page max-w-[860px] mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-16 md:pb-20">
    <!-- Back link -->
    <NuxtLink
      to="/dokumentasi"
      class="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-text-muted no-underline mb-6 hover:text-accent transition-colors"
    >
      <Icon name="material-symbols:arrow-back-rounded" class="text-base" />
      Kembali ke Dokumentasi
    </NuxtLink>

    <!-- Loading skeleton (mirrors article layout) -->
    <div v-if="pending" class="bg-bg-card rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-border overflow-hidden">
      <!-- Hero skeleton -->
      <div class="relative h-[260px] md:h-[420px] skeleton-shimmer">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10 space-y-3">
          <div class="h-5 w-20 rounded-full bg-white/20 animate-pulse" />
          <div class="h-8 md:h-10 w-4/5 rounded-lg bg-white/15 animate-pulse" />
          <div class="h-4 w-32 rounded bg-white/10 animate-pulse" />
        </div>
      </div>
      <!-- Body skeleton -->
      <div class="p-6 md:p-10 pb-8 md:pb-12 space-y-4">
        <div class="h-7 w-3/5 rounded-lg bg-bg-card-2 animate-pulse" />
        <div class="space-y-2.5 pt-2">
          <div class="h-4 w-full rounded bg-bg-card-2 animate-pulse" />
          <div class="h-4 w-full rounded bg-bg-card-2 animate-pulse" />
          <div class="h-4 w-5/6 rounded bg-bg-card-2 animate-pulse" />
          <div class="h-4 w-full rounded bg-bg-card-2 animate-pulse" />
          <div class="h-4 w-2/3 rounded bg-bg-card-2 animate-pulse" />
        </div>
        <div class="pt-6 space-y-2.5">
          <div class="h-4 w-full rounded bg-bg-card-2 animate-pulse" />
          <div class="h-4 w-4/5 rounded bg-bg-card-2 animate-pulse" />
          <div class="h-4 w-full rounded bg-bg-card-2 animate-pulse" />
        </div>
        <!-- Gallery skeleton -->
        <div class="pt-8">
          <div class="flex items-center gap-4 mb-6">
            <div class="flex-1 h-px bg-border" />
            <div class="h-3 w-24 rounded bg-bg-card-2 animate-pulse" />
            <div class="flex-1 h-px bg-border" />
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div v-for="i in 4" :key="i" class="aspect-square rounded-xl skeleton-shimmer border border-border" :class="{ 'hidden md:block': i > 3 }" />
          </div>
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div v-else-if="!article" class="text-center py-20">
      <Icon name="material-symbols:article-off-rounded" class="text-[48px] opacity-40 mb-3" />
      <h1 class="text-[1.4rem] font-bold mb-2">Artikel tidak ditemukan</h1>
      <p class="text-text-muted text-[0.9rem] mb-6">Artikel yang kamu cari mungkin sudah dihapus atau dipindahkan.</p>
      <NuxtLink
        to="/dokumentasi"
        class="inline-flex items-center gap-1.5 bg-accent text-white px-5 py-2 rounded-full no-underline font-semibold text-[0.88rem] hover:bg-accent-hover transition-colors"
      >
        Lihat Dokumentasi
      </NuxtLink>
    </div>

    <!-- Article -->
    <article
      v-else
      class="bg-bg-card rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-border overflow-hidden"
    >
      <!-- Hero -->
      <header class="relative h-[260px] md:h-[420px] overflow-hidden">
        <AppImg
          :src="useImageUrl(article.thumbnail)"
          :alt="article.title"
          loading="eager"
          class="w-full h-full"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <span class="inline-block bg-accent text-white font-sans text-[0.68rem] font-bold tracking-[0.1em] uppercase px-3.5 py-1.5 rounded-full mb-3">
            {{ article.tag_text || 'Kegiatan' }}
          </span>
          <h1 class="font-serif text-[1.5rem] md:text-[2.2rem] font-[900] leading-[1.15] mb-2 text-white">
            {{ article.title }}
          </h1>
          <div class="font-sans text-[0.85rem] opacity-80 text-white">
            {{ formatRangeIndo(article.start_date, article.end_date) }}
          </div>
        </div>
      </header>

      <!-- Body -->
      <div class="p-6 md:p-10 pb-8 md:pb-12 text-text-main">
        <h2 v-if="article.narasi_title" class="font-serif text-[1.4rem] md:text-[1.6rem] font-bold leading-[1.3] mb-5">
          {{ article.narasi_title }}
        </h2>

        <div class="font-sans text-[0.95rem] leading-[1.9] mb-10 html-content" v-html="renderedNarasi" />

        <p
          v-if="article.narasi_footer"
          class="font-sans text-[0.82rem] text-text-muted italic mt-6 pt-4 border-t border-border"
        >
          {{ article.narasi_footer }}
        </p>

        <!-- Photo gallery -->
        <template v-if="hasPhotos">
          <div class="flex items-center gap-4 my-10">
            <div class="flex-1 h-px bg-border" />
            <span class="font-sans text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-accent whitespace-nowrap">
              Galeri Kegiatan
            </span>
            <div class="flex-1 h-px bg-border" />
          </div>

          <div class="grid gap-3 mb-8" :class="gridClass">
            <button
              v-for="(img, i) in previewPhotos"
              :key="i"
              type="button"
              class="relative rounded-xl overflow-hidden cursor-pointer bg-black/5 aspect-square group focus:outline-none focus:ring-2 focus:ring-accent border-0 p-0"
              :class="{ 'md:col-span-2 md:row-span-2': isHeroPhoto(Number(i), previewPhotos.length) }"
              @click="openLightboxModal(photos, Number(i))"
            >
              <AppImg
                :src="useImageUrl(img.url)"
                :alt="img.caption || article.title"
                img-class="transition-transform duration-500 brightness-90 group-hover:scale-105 group-hover:brightness-100"
                class="absolute inset-0 w-full h-full"
              />
              <div
                v-if="img.caption"
                class="absolute inset-0 bg-transparent flex items-end p-3 transition-colors duration-300 group-hover:bg-black/45 z-10"
              >
                <span class="font-sans text-[0.75rem] text-white leading-[1.4] translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {{ img.caption }}
                </span>
              </div>
            </button>
          </div>

          <button
            v-if="photos.length > previewPhotos.length"
            type="button"
            class="flex items-center justify-center gap-2 w-full p-3.5 border-2 border-dashed border-indigo-500/40 rounded-xl bg-transparent text-accent font-sans text-[0.85rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-indigo-500/10 hover:border-solid"
            @click="openLightboxModal(photos, previewPhotos.length)"
          >
            <Icon name="material-symbols:photo-library" size="18" />
            Lihat semua {{ photos.length }} foto
          </button>
        </template>
      </div>
    </article>

    <DokumLightboxModal />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { parseArticleSlug, articleSlug } from '~/utils/articleSlug'

const route  = useRoute()
const cfg    = useRuntimeConfig()
const apiBase = cfg.public.apiBase as string
const siteUrl = cfg.public.siteUrl as string
const siteName = cfg.public.siteName as string

const slugParam = computed(() => String(route.params.slug || ''))
const articleId = computed(() => parseArticleSlug(slugParam.value))

// ── SSR-only SEO fetch ───────────────────────────────────────────────────────
// Runs on the server to populate <head> og: tags for social sharing / crawlers.
// On the client we intentionally never re-fetch (getCachedData always returns
// a non-undefined value so Nuxt treats it as "already have data").
// If the server-side $fetch fails, ssrData is null and we fall back to the
// reactive seoArticle computed below once the client loads the content.
const { data: ssrData } = useAsyncData(
  `doc-article-${articleId.value}`,
  () => $fetch<any[]>(`${apiBase}/api/dokumentasi`)
    .then(list => (Array.isArray(list) ? list.find((a: any) => a.id === articleId.value) ?? null : null))
    .catch(() => null),
  {
    default: () => null as any,
    lazy: true,
    // Never refetch on client — either use SSR payload or null.
    // Returning null (not undefined) tells Nuxt "I have a value, don't fetch".
    getCachedData: (key, nuxtApp) => {
      if (import.meta.client) {
        const v = nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]
        return v !== undefined ? v : null
      }
      return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]
    },
  },
)

// ── Content fetch ────────────────────────────────────────────────────────────
// Use module-level singleton from useDokumentasi so:
//   • Client nav from list page  → data already loaded, zero delay
//   • Direct URL / new tab       → onMounted fetches on the client, bypassing
//     the SSR payload cache that would otherwise permanently block a refetch
//     when the server-side $fetch fails (api unreachable from SSR process).
const { loading, dokumentasi, loadDokumentasiData, openLightboxModal } = useDokumentasi()

onMounted(() => {
  loadDokumentasiData()
})

// pending = true while data hasn't arrived yet (loading starts as true in module)
const pending = computed(() => loading.value)

const article = computed<any | null>(() => {
  if (!Array.isArray(dokumentasi.value) || isNaN(articleId.value)) return null
  return dokumentasi.value.find((a: any) => a.id === articleId.value) ?? null
})

// seoArticle: SSR data takes priority (guarantees og: tags in initial HTML when
// the API is reachable from the server). Falls back to the client-loaded article
// once useDokumentasi finishes, so meta tags stay up-to-date reactively.
const seoArticle = computed(() => ssrData.value || article.value)
const photos        = computed(() => article.value?.images || [])
const hasPhotos     = computed(() => Array.isArray(photos.value) && photos.value.length > 0)
const previewPhotos = computed(() => photos.value.slice(0, 8))

const gridClass = computed(() => {
  const count = previewPhotos.value.length
  if (count === 1) return 'grid-cols-1'
  if (count === 2) return 'grid-cols-2'
  if (count === 3) return 'grid-cols-2 md:grid-cols-3'
  if (count === 4) return 'grid-cols-2 md:grid-cols-2'
  return 'grid-cols-2 md:grid-cols-3'
})

const isHeroPhoto = (index: number, total: number) => {
  if (index !== 0) return false
  if (total === 3) return true
  if (total >= 5) return true
  return false
}

const renderedNarasi = computed(() => {
  if (!article.value) return ''
  const html = article.value.narasi
  if (html && String(html).trim()) return html
  return article.value.description ? `<p>${article.value.description}</p>` : ''
})

// ── Date formatting ─────────────────────────────────────────────────────────
const formatRangeIndo = (sStr?: string, eStr?: string) => {
  const formatDateIndo = (dStr?: string) => {
    if (!dStr) return ''
    if (!dStr.match(/^\d{4}-\d{2}-\d{2}$/)) return dStr
    try {
      const d = new Date(dStr)
      if (isNaN(d.getTime())) return dStr
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
    } catch { return dStr }
  }
  const start = formatDateIndo(sStr)
  const end   = formatDateIndo(eStr)
  if (!start) return ''
  if (!end || start === end) return start
  return `${start} - ${end}`
}

// ── Auto SEO from article data ──────────────────────────────────────────────
/** Extract a clean, ~155-char description from HTML/plain text. */
function extractDescription(article: any): string {
  if (!article) return ''
  const fromText = (s?: string) => (s || '')
    .replace(/<[^>]+>/g, ' ') // strip HTML
    .replace(/\s+/g, ' ')
    .trim()
  const candidate =
    fromText(article.description) ||
    fromText(article.narasi) ||
    fromText(article.narasi_title) ||
    article.title
  if (candidate.length <= 155) return candidate
  return candidate.substring(0, 152).replace(/\s+\S*$/, '') + '…'
}

const articleDescription = computed(() => extractDescription(seoArticle.value))

const articleUrl = computed(() => {
  if (!seoArticle.value) return `${siteUrl}/dokumentasi`
  return `${siteUrl}/dokumentasi/${articleSlug(seoArticle.value)}`
})

const articleImage = computed(() => {
  if (!seoArticle.value?.thumbnail) return `${siteUrl}/og-default.png`
  const t = seoArticle.value.thumbnail as string
  if (t.startsWith('http')) return t
  // Backend serves uploads from `${apiBase}/uploads/...`
  const path = t.startsWith('/') ? t : `/${t}`
  return `${apiBase}${path}`
})

useSeoMeta({
  title:           () => seoArticle.value?.title || 'Artikel',
  description:     () => articleDescription.value,
  ogTitle:         () => seoArticle.value?.title ? `${seoArticle.value.title} — ${siteName}` : siteName,
  ogDescription:   () => articleDescription.value,
  ogType:          'article',
  ogUrl:           () => articleUrl.value,
  ogImage:         () => articleImage.value,
  twitterCard:     'summary_large_image',
  twitterTitle:    () => seoArticle.value?.title || siteName,
  twitterDescription: () => articleDescription.value,
  twitterImage:    () => articleImage.value,
  articlePublishedTime: () => seoArticle.value?.start_date || undefined,
  articleSection:  () => seoArticle.value?.tag_text || undefined,
})

useHead({
  link: [
    { rel: 'canonical', href: () => articleUrl.value },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => seoArticle.value ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: seoArticle.value.title,
        description: articleDescription.value,
        image: [articleImage.value],
        datePublished: seoArticle.value.start_date,
        dateModified: seoArticle.value.start_date,
        articleSection: seoArticle.value.tag_text || 'Kegiatan',
        url: articleUrl.value,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl.value,
        },
        publisher: {
          '@type': 'Organization',
          name: siteName,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/og-default.png`,
          },
        },
      }) : '{}',
    },
  ],
})

definePageMeta({
  pageTransition: { name: 'article-slide', mode: 'out-in' },
  // 404 if slug doesn't parse to a valid id
  validate: async (route) => {
    const id = parseArticleSlug(String(route.params.slug || ''))
    return !isNaN(id) && id > 0
  },
})
</script>

<style>
@keyframes skeletonShimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton-shimmer {
  background: linear-gradient(to right, var(--bg-card) 0%, var(--bg-card-2) 50%, var(--bg-card) 100%);
  background-size: 800px 100%;
  animation: skeletonShimmer 1.5s infinite linear;
}
.article-page .html-content p { margin-bottom: 1rem; }
.article-page .html-content p:last-child { margin-bottom: 0; }
.article-page .html-content img { max-width: 100%; border-radius: 12px; margin: 1.25rem 0; display: block; }
.article-page .html-content h2 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 1.5rem 0 0.75rem;
  color: var(--text-main);
}
.article-page .html-content h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 1.25rem 0 0.5rem;
  color: var(--text-main);
}
.article-page .html-content blockquote {
  border-left: 3px solid var(--accent);
  padding: 0.5rem 0 0.5rem 1.2rem;
  margin: 1.25rem 0;
  font-style: italic;
  color: var(--text-muted);
}
.article-page .html-content ul,
.article-page .html-content ol { padding-left: 1.5rem; margin-bottom: 1rem; }
.article-page .html-content li { margin-bottom: 0.25rem; }
.article-page .html-content strong { font-weight: 600; }
.article-page .html-content em { font-style: italic; }
</style>
