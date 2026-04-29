// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['./app/css/global.css'],

  runtimeConfig: {
    public: {
      apiBase:  process.env.NUXT_PUBLIC_API_BASE  ?? 'http://192.168.1.125:5000',
      siteUrl:  process.env.NUXT_PUBLIC_SITE_URL  ?? 'https://nawasena.site',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME ?? 'OSIS Nawasena',
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  // @nuxt/image — IPX server-side resize untuk avatar/foto besar
  // Tanpa `domains`, image dari apiBase tidak diproxy → load full size (lambat)
  image: {
    provider: 'ipx',
    quality: 80,
    format: ['webp', 'jpeg'],
    screens: {
      xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280,
    },
    domains: [
      '192.168.1.125',
      'localhost',
      '127.0.0.1',
      'api.nawasena.site',
      'nawasena.site',
    ],
  },

  // ── Site identity (consumed by sitemap, robots, etc.) ─────────────────────
  site: {
    url:         process.env.NUXT_PUBLIC_SITE_URL  ?? 'https://nawasena.site',
    name:        process.env.NUXT_PUBLIC_SITE_NAME ?? 'OSIS Nawasena',
    description: 'Portal resmi OSIS Nawasena SMA Negeri Indonesia — struktur organisasi, program kerja, agenda, dan dokumentasi kegiatan.',
    defaultLocale: 'id',
  },

  // ── Default <head> for every page ────────────────────────────────────────
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      titleTemplate: '%s — OSIS Nawasena',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#6366f1' },
        { name: 'format-detection', content: 'telephone=no' },
        // Defaults — pages override via useSeoMeta
        { name: 'description', content: 'Portal resmi OSIS Nawasena SMA Negeri Indonesia — struktur organisasi, program kerja, agenda, dan dokumentasi kegiatan.' },
        { property: 'og:site_name', content: 'OSIS Nawasena' },
        { property: 'og:type',      content: 'website' },
        { property: 'og:locale',    content: 'id_ID' },
        { name:     'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Per-page canonical is set in app.vue (driven by current route).
      ],
    },
  },

  // ── Sitemap: auto-discovers static routes; dynamic articles added below ──
  sitemap: {
    sources: [
      // Server endpoint that emits dynamic /dokumentasi/[slug] entries
      '/api/__sitemap__/articles',
    ],
    autoLastmod: true,
    xsl: false,
  },

  // ── Robots: allow all in production, block dev environments ──────────────
  robots: {
    sitemap: '/sitemap.xml',
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
        disallow: ['/admin', '/api/'],
      },
    ],
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  }
})
