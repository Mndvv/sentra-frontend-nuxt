<template>
  <main
    class="max-w-[1120px] mx-auto pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8"
  >
    <!-- Back link -->
    <NuxtLink
      to="/dokumentasi"
      class="inline-flex items-center gap-2 bg-bg-card border border-border text-text-muted hover:text-text-main hover:bg-bg-card-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Icon
        name="material-symbols:arrow-back-rounded"
        class="text-base"
        aria-hidden="true"
      />
      Kembali ke Dokumentasi
    </NuxtLink>

    <!-- Loading skeleton -->
    <div
      v-if="pending"
      class="border border-border rounded-2xl sm:rounded-3xl bg-bg-card overflow-hidden shadow-md animate-pulse"
      role="status"
      aria-live="polite"
    >
      <span class="sr-only">Memuat artikel...</span>
      <div
        class="aspect-[16/10] sm:aspect-video w-full bg-bg-card-2 flex flex-col justify-end p-6 sm:p-10 gap-3"
      >
        <div class="w-20 h-6 rounded-full bg-accent/20" />
        <div class="w-3/4 max-w-lg h-8 sm:h-10 rounded-lg bg-text-subtle/20" />
        <div class="w-40 h-4 rounded bg-text-subtle/20" />
      </div>
      <div class="p-6 sm:p-10 max-w-[760px] mx-auto space-y-4">
        <div class="w-1/2 h-7 rounded bg-text-subtle/20 mb-6" />
        <div class="w-full h-4 rounded bg-text-subtle/20" />
        <div class="w-full h-4 rounded bg-text-subtle/20" />
        <div class="w-4/5 h-4 rounded bg-text-subtle/20" />
        <div class="w-2/3 h-4 rounded bg-text-subtle/20" />
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-6">
          <div
            v-for="i in 4"
            :key="i"
            class="aspect-[4/3] rounded-xl bg-bg-card-2"
          />
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div
      v-else-if="!article"
      class="border border-border rounded-2xl sm:rounded-3xl bg-bg-card p-10 sm:p-16 text-center shadow-md max-w-xl mx-auto"
    >
      <div
        class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-bg-card-2 border border-border text-text-muted mb-4 text-2xl"
        aria-hidden="true"
      >
        <Icon name="material-symbols:article-off-rounded" />
      </div>
      <h1 class="text-xl sm:text-2xl font-extrabold text-text-main mb-2">
        Artikel tidak ditemukan
      </h1>
      <p class="text-text-muted text-sm sm:text-base mb-6">
        Artikel yang kamu cari mungkin sudah dihapus atau dipindahkan.
      </p>
      <NuxtLink
        to="/dokumentasi"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Lihat Dokumentasi
      </NuxtLink>
    </div>

    <!-- Article -->
    <article
      v-else
      class="border border-border rounded-2xl sm:rounded-3xl bg-bg-card overflow-hidden shadow-md"
    >
      <!-- Hero Cover Banner -->
      <header
        class="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden bg-bg-card-2 border-b border-border"
      >
        <AppImg
          :src="useImageUrl(article.thumbnail)"
          :alt="article.title"
          loading="eager"
          class="absolute inset-0 h-full w-full"
          img-class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
          aria-hidden="true"
        />
        <div
          class="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-10 flex flex-col items-start"
        >
          <span
            class="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block"
          >
            {{ article.tag_text || "Kegiatan" }}
          </span>
          <h1
            class="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight"
          >
            {{ article.title }}
          </h1>
          <p
            v-if="article.start_date"
            class="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/80 mt-3 tabular-nums"
          >
            <Icon
              name="material-symbols:calendar-today-outline-rounded"
              class="text-sm shrink-0"
              aria-hidden="true"
            />
            <time :datetime="article.start_date || ''">
              {{ formatRangeIndo(article.start_date, article.end_date) }}
            </time>
          </p>
        </div>
      </header>

      <!-- Article Body -->
      <div class="p-5 sm:p-8 md:p-12">
        <div
          class="max-w-[760px] mx-auto text-text-main leading-relaxed text-base sm:text-lg mb-12"
        >
          <h2
            v-if="article.narasi_title"
            class="text-xl sm:text-2xl font-bold text-text-main mb-4"
          >
            {{ article.narasi_title }}
          </h2>

          <div
            class="prose max-w-none text-text-main text-base sm:text-lg leading-relaxed [&>p]:mb-4 [&>p:last-child]:mb-0 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-text-main [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-text-main [&>h3]:mt-6 [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>blockquote]:border-l [&>blockquote]:border-border [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-text-muted [&>blockquote]:my-4 [&>img]:rounded-xl [&>img]:my-6 [&>img]:max-w-full [&>a]:text-accent [&>a]:underline [&>hr]:border-border [&>hr]:my-8"
            v-html="renderedNarasi"
          />

          <p
            v-if="article.narasi_footer"
            class="text-xs text-text-muted italic border-t border-border pt-4 mt-8"
          >
            {{ article.narasi_footer }}
          </p>

          <!-- Photo Mosaic Gallery -->
          <section
            v-if="hasPhotos"
            class="mt-12 pt-8 border-t border-border"
            aria-label="Galeri kegiatan"
          >
            <div
              class="flex items-center justify-between border-b border-border pb-3 mb-5"
            >
              <h2 class="text-xl sm:text-2xl font-extrabold text-text-main">
                Galeri kegiatan
              </h2>
              <span
                class="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-soft text-accent tabular-nums"
              >
                {{ photos.length }} foto
              </span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <button
                v-for="(img, i) in previewPhotos"
                :key="i"
                type="button"
                class="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border/60 bg-bg-card-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                :aria-label="`Buka foto ${Number(i) + 1} dari ${photos.length}${img.caption ? `: ${img.caption}` : ''}`"
                @click="openLightboxModal(photos, Number(i), article.title)"
              >
                <AppImg
                  :src="useImageUrl(img.url)"
                  :alt="img.caption || article.title"
                  img-class="w-full h-full object-cover transition-transform duration-500 ease-out brightness-95 group-hover:scale-105 group-hover:brightness-100"
                  class="absolute inset-0 h-full w-full"
                />
                <span
                  v-if="img.caption"
                  class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 text-xs text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 line-clamp-2 text-left"
                >
                  {{ img.caption }}
                </span>
              </button>
            </div>

            <button
              v-if="photos.length > previewPhotos.length"
              type="button"
              class="w-full mt-4 py-3 px-4 rounded-xl border border-border bg-bg-card text-text-main hover:bg-bg-card-2 hover:border-accent/40 font-semibold text-sm flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              @click="
                openLightboxModal(photos, previewPhotos.length, article.title)
              "
            >
              <Icon
                name="material-symbols:photo-library-rounded"
                class="text-lg"
                aria-hidden="true"
              />
              Lihat semua {{ photos.length }} foto
            </button>
          </section>
        </div>
      </div>
    </article>

    <DokumLightboxModal />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { parseArticleSlug, articleSlug } from "~/utils/articleSlug";
import { formatRangeIndo } from "~/utils/formatDate";

const route = useRoute();
const cfg = useRuntimeConfig();
const apiBase = cfg.public.apiBase as string;
const siteUrl = cfg.public.siteUrl as string;
const siteName = cfg.public.siteName as string;

const slugParam = computed(() => String(route.params.slug || ""));
const articleId = computed(() => parseArticleSlug(slugParam.value));

// ── SSR-only SEO fetch ───────────────────────────────────────────────────────
// Runs on the server to populate <head> og: tags for social sharing / crawlers.
// On the client we intentionally never re-fetch (getCachedData always returns
// a non-undefined value so Nuxt treats it as "already have data").
// If the server-side $fetch fails, ssrData is null and we fall back to the
// reactive seoArticle computed below once the client loads the content.
const { data: ssrData } = useAsyncData(
  `doc-article-${articleId.value}`,
  () =>
    $fetch<any[]>(`${apiBase}/api/dokumentasi`)
      .then((list) =>
        Array.isArray(list)
          ? (list.find((a: any) => a.id === articleId.value) ?? null)
          : null,
      )
      .catch(() => null),
  {
    default: () => null as any,
    lazy: true,
    // Never refetch on client - either use SSR payload or null.
    // Returning null (not undefined) tells Nuxt "I have a value, don't fetch".
    getCachedData: (key, nuxtApp) => {
      if (import.meta.client) {
        const v = nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];
        return v !== undefined ? v : null;
      }
      return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];
    },
  },
);

// ── Content fetch ────────────────────────────────────────────────────────────
// Use module-level singleton from useDokumentasi so:
//   - Client nav from list page -> data already loaded, zero delay
//   - Direct URL / new tab      -> onMounted fetches on the client, bypassing
//     the SSR payload cache that would otherwise permanently block a refetch
//     when the server-side $fetch fails (api unreachable from SSR process).
const { loading, dokumentasi, loadDokumentasiData, openLightboxModal } =
  useDokumentasi();

onMounted(() => {
  loadDokumentasiData();
});

// pending = true while data hasn't arrived yet (loading starts as true in module)
const pending = computed(() => loading.value);

const article = computed<any | null>(() => {
  if (!Array.isArray(dokumentasi.value) || isNaN(articleId.value)) return null;
  return dokumentasi.value.find((a: any) => a.id === articleId.value) ?? null;
});

// seoArticle: SSR data takes priority (guarantees og: tags in initial HTML when
// the API is reachable from the server). Falls back to the client-loaded article
// once useDokumentasi finishes, so meta tags stay up-to-date reactively.
const seoArticle = computed(() => ssrData.value || article.value);
const photos = computed(() => article.value?.images || []);
const hasPhotos = computed(
  () => Array.isArray(photos.value) && photos.value.length > 0,
);
const previewPhotos = computed(() => photos.value.slice(0, 8));

const renderedNarasi = computed(() => {
  if (!article.value) return "";
  const html = article.value.narasi;
  if (html && String(html).trim()) return html;
  return article.value.description ? `<p>${article.value.description}</p>` : "";
});

// ── Auto SEO from article data ──────────────────────────────────────────────
/** Extract a clean, ~155-char description from HTML/plain text. */
function extractDescription(item: any): string {
  if (!item) return "";
  const fromText = (s?: string) =>
    (s || "")
      .replace(/<[^>]+>/g, " ") // strip HTML
      .replace(/\s+/g, " ")
      .trim();
  const candidate =
    fromText(item.description) ||
    fromText(item.narasi) ||
    fromText(item.narasi_title) ||
    item.title;
  if (candidate.length <= 155) return candidate;
  return candidate.substring(0, 152).replace(/\s+\S*$/, "") + "...";
}

const articleDescription = computed(() => extractDescription(seoArticle.value));

const articleUrl = computed(() => {
  if (!seoArticle.value) return `${siteUrl}/dokumentasi`;
  return `${siteUrl}/dokumentasi/${articleSlug(seoArticle.value)}`;
});

const articleImage = computed(() => {
  if (!seoArticle.value?.thumbnail) return `${siteUrl}/og-default.png`;
  const t = seoArticle.value.thumbnail as string;
  if (t.startsWith("http")) return t;
  // Backend serves uploads from `${apiBase}/uploads/...`
  const path = t.startsWith("/") ? t : `/${t}`;
  return `${apiBase}${path}`;
});

useSeoMeta({
  title: () => seoArticle.value?.title || "Artikel",
  description: () => articleDescription.value,
  ogTitle: () =>
    seoArticle.value?.title
      ? `${seoArticle.value.title} | ${siteName}`
      : siteName,
  ogDescription: () => articleDescription.value,
  ogType: "article",
  ogUrl: () => articleUrl.value,
  ogImage: () => articleImage.value,
  twitterCard: "summary_large_image",
  twitterTitle: () =>
    seoArticle.value?.title
      ? `${seoArticle.value.title} | ${siteName}`
      : siteName,
  twitterDescription: () => articleDescription.value,
  twitterImage: () => articleImage.value,
  articlePublishedTime: () => seoArticle.value?.start_date || undefined,
  articleSection: () => seoArticle.value?.tag_text || undefined,
});

useHead({
  link: [{ rel: "canonical", href: () => articleUrl.value }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: () =>
        seoArticle.value
          ? JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: seoArticle.value.title,
              description: articleDescription.value,
              image: [articleImage.value],
              datePublished: seoArticle.value.start_date,
              dateModified: seoArticle.value.start_date,
              articleSection: seoArticle.value.tag_text || "Kegiatan",
              url: articleUrl.value,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": articleUrl.value,
              },
              publisher: {
                "@type": "Organization",
                name: siteName,
                logo: {
                  "@type": "ImageObject",
                  url: `${siteUrl}/og-default.png`,
                },
              },
            })
          : "{}",
    },
  ],
});

definePageMeta({
  pageTransition: { name: "article-slide", mode: "out-in" },
  // 404 if slug doesn't parse to a valid id
  validate: async (route) => {
    const id = parseArticleSlug(String(route.params.slug || ""));
    return !isNaN(id) && id > 0;
  },
});
</script>
