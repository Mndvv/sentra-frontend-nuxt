<template>
  <footer class="mt-20 relative">
    <!-- Accent rule -->
    <div class="h-[3px] bg-gradient-to-r from-transparent via-accent to-purple-500 opacity-60" />

    <div class="bg-bg-card border-t border-border">
      <!-- Main grid -->
      <div class="max-w-[1120px] mx-auto px-4 md:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

        <!-- ── Column 1: Brand ─────────────────────────── -->
        <div class="flex flex-col gap-4">
          <NuxtLink to="/" class="inline-flex items-center gap-1 font-black text-xl tracking-tight text-text-main no-underline w-fit">
            SENTRA<span class="text-accent">.</span>
          </NuxtLink>
          <p class="text-text-muted text-[0.82rem] leading-relaxed -mt-2">
            Sistem Eksekutif &amp; Navigasi<br>
            Terpadu OSIS Nawasena<br>
            SMAN 2 Jonggol
          </p>
          <p class="text-text-subtle text-[0.72rem] font-semibold tracking-wider uppercase">
            Kabinet Nawasena · 2025/2026
          </p>

          <!-- Aurora CTA -->
          <button
            class="flex items-center gap-2 self-start bg-accent-soft border border-accent/20 text-accent text-[0.78rem] font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-accent/15 transition-colors"
            @click="openAurora"
          >
            <span class="size-2 rounded-full bg-accent animate-pulse shrink-0" />
            Sampaikan Aspirasi (AURORA)
          </button>
        </div>

        <!-- ── Column 2: Navigasi ──────────────────────── -->
        <div>
          <h4 class="text-text-subtle text-[0.7rem] font-extrabold tracking-[0.1em] uppercase mb-4">Navigasi</h4>
          <nav class="flex flex-col gap-2.5">
            <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to"
              class="text-text-muted text-[0.83rem] no-underline hover:text-accent transition-colors hover:pl-1 duration-150">
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <!-- ── Column 3: Sosial Media ──────────────────── -->
        <div>
          <h4 class="text-text-subtle text-[0.7rem] font-extrabold tracking-[0.1em] uppercase mb-4">Sosial Media</h4>
          <div class="flex flex-col gap-3">
            <a v-for="s in socialLinks" :key="s.href"
              :href="s.href" :target="s.external ? '_blank' : undefined" rel="noopener"
              class="flex items-center gap-2.5 text-text-muted text-[0.82rem] no-underline hover:text-accent transition-colors group"
            >
              <Icon :name="s.icon" class="text-base shrink-0 text-text-subtle group-hover:text-accent transition-colors" />
              <span>{{ s.label }}</span>
            </a>
          </div>
        </div>

        <!-- ── Column 4: Lokasi ────────────────────────── -->
        <div>
          <h4 class="text-text-subtle text-[0.7rem] font-extrabold tracking-[0.1em] uppercase mb-4">Lokasi Kantor</h4>
          <p class="text-text-muted text-[0.78rem] leading-relaxed mb-3">
            SMAN 2 Jonggol<br>
            Jl. Raya Jonggol No.1, Jonggol,<br>
            Bogor, Jawa Barat 16830
          </p>
          <!-- Maps embed -->
          <a
            href="https://maps.google.com/?q=SMAN+2+Jonggol,+Jonggol,+Bogor"
            target="_blank" rel="noopener"
            class="block relative rounded-xl overflow-hidden border border-border hover:border-accent transition-colors group no-underline"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9!2d107.0726!3d-6.5218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69800d3e6c5a4f%3A0xb7c2d2e00f3e4c!2sSMAN%202%20Jonggol!5e0!3m2!1sen!2sid!4v1699000000000!5m2!1sen!2sid"
              width="100%" height="110"
              style="border:0;pointer-events:none;display:block;"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Lokasi SMAN 2 Jonggol"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-2">
              <span class="flex items-center gap-1 text-white text-[0.7rem] font-bold bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">
                <Icon name="material-symbols:location-on" class="text-sm" />
                Buka di Google Maps
              </span>
            </div>
          </a>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="max-w-[1120px] mx-auto px-4 md:px-6 py-4 border-t border-border flex flex-wrap items-center justify-between gap-2 text-[0.73rem] text-text-subtle">
        <span>© {{ year }} SENTRA · OSIS Nawasena SMAN 2 Jonggol</span>
        <span class="flex items-center gap-1">
          <Icon name="material-symbols:favorite" class="text-sm text-accent" />
          Tim Developer Nawasena
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const isAuroraOpen = useState('isAuroraOpen', () => false)
const openAurora = () => { isAuroraOpen.value = true }
const year = new Date().getFullYear()

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/struktur', label: 'Struktur Organisasi' },
  { to: '/program', label: 'Program Kerja' },
  { to: '/dokumentasi', label: 'Dokumentasi' },
  { to: '/hof', label: 'Hall of Fame' },
  { to: '/sponsor', label: 'Sponsorship' },
]

const socialLinks = [
  { href: 'https://www.instagram.com/ofc.osissmandjo/', icon: 'mdi:instagram', label: '@ofc.osissmandjo', external: true },
  { href: 'https://www.youtube.com/@OsisSmandjo', icon: 'mdi:youtube', label: 'OSIS Smandjo', external: true },
  { href: 'https://wa.me/6282299234269', icon: 'mdi:whatsapp', label: 'WhatsApp Sekretariat', external: true },
  { href: 'mailto:osissmanduajonggol@gmail.com', icon: 'material-symbols:mail', label: 'osissmanduajonggol@gmail.com', external: false },
]
</script>
