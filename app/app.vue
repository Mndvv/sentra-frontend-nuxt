<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const cfg = useRuntimeConfig()
const siteUrl  = cfg.public.siteUrl as string
const siteName = cfg.public.siteName as string

const route = useRoute()
// Strip query/hash and trailing slash; the article page can override with useHead.
const canonicalUrl = computed(() => {
  const path = route.path.replace(/\/$/, '') || '/'
  return `${siteUrl}${path}`
})

// ── Site-wide default SEO ────────────────────────────────────────────────────
// Pages (and the article route) override these via their own useSeoMeta calls.
useSeoMeta({
  ogSiteName:  siteName,
  ogType:      'website',
  ogLocale:    'id_ID',
  ogUrl:       () => canonicalUrl.value,
  ogImage:     `${siteUrl}/og-default.png`,
  twitterCard: 'summary_large_image',
  twitterImage: `${siteUrl}/og-default.png`,
})

// Per-route canonical (each page can override via useHead if it wants a custom URL).
useHead({
  link: [
    { rel: 'canonical', href: () => canonicalUrl.value },
  ],
})

// ── JSON-LD Organization schema ──────────────────────────────────────────────
// Tells search engines about the entity behind the site.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type':    'Organization',
        '@id':      `${siteUrl}#organization`,
        name:       siteName,
        alternateName: 'OSPK Nawasena',
        url:        siteUrl,
        logo:       `${siteUrl}/og-default.png`,
        description: 'OSIS-MPK(OSPK) Nawasena — Kabinet Periode 2025/2026.',
        sameAs: [
          // Populate with real social links once available
        ],
      }),
    },
  ],
})
</script>
