<template>
  <div class="bg-bg-primary text-text-main transition-colors duration-300">
    <!-- ── Hero Masthead ──────────────────────────────────── -->
    <header
      class="pt-24 md:pt-28 pb-12 md:pb-16 text-center relative overflow-hidden border-b border-border/60"
    >
      <div class="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-text-main m-0"
        >
          Kemitraan Strategis
          <span class="text-accent">Nawasena</span>
          <span class="text-text-muted font-normal text-2xl sm:text-3xl"
            >2026/2027</span
          >
        </h1>
        <p
          class="text-text-muted text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed m-0 mt-3"
        >
          Peluang kerjasama dan kolaborasi positif bersama OSIS dan MPK SMAN 2
          Jonggol untuk mendukung pengembangan potensi generasi muda.
        </p>
        <div
          class="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 bg-accent text-white rounded-full px-6 py-3 font-semibold text-sm transition-all duration-200 hover:bg-accent-hover shadow-sm min-h-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            @click="scrollToId('sponsor-form')"
          >
            Kirim Penawaran
            <Icon
              name="material-symbols:arrow-forward"
              class="text-base"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 border border-border bg-bg-card text-text-muted hover:text-text-main hover:bg-bg-card-2 rounded-full px-6 py-3 font-semibold text-sm transition-all duration-200 min-h-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            @click="scrollToId('sponsor-tiers')"
          >
            Lihat Paket Sponsorship
            <Icon
              name="material-symbols:keyboard-arrow-down-rounded"
              class="text-lg"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <!-- ── Stats Impact ────────────────────────────────────── -->
      <section aria-label="Statistik Dampak Siswa" class="pb-14 md:pb-18">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <SponsorStatCard
            v-for="stat in stats"
            :key="stat.label"
            :icon="stat.icon"
            :target="stat.value"
            :suffix="stat.suffix"
            :label="stat.label"
          />
        </div>
      </section>

      <!-- ── Tiers ───────────────────────────────────────────── -->
      <section
        id="sponsor-tiers"
        aria-labelledby="tiers-title"
        class="pb-16 md:pb-20 scroll-mt-28"
      >
        <SponsorSectionHeading
          id="tiers-title"
          title="Paket Sponsorship"
          subtitle="Pilih tingkatan yang sesuai dengan kontribusi dan kebutuhan visibilitas brand Anda."
        />
        <div
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6 items-stretch"
        >
          <SponsorTierCard
            v-for="tier in tiers"
            :key="tier.id"
            :tier-id="tier.id"
            :icon="tier.icon"
            :label="tier.label"
            :title="tier.title"
            :desc="tier.desc"
            :price="tier.price"
            :perks="tier.perks"
            :featured="tier.featured"
            @select="handleSelectTier"
          />
        </div>
      </section>

      <!-- ── Partner types ──────────────────────────────────── -->
      <section aria-labelledby="types-title" class="pb-16 md:pb-20">
        <SponsorSectionHeading
          id="types-title"
          title="Bentuk Kemitraan"
          subtitle="Lebih dari sekadar sponsor finansial, kami menyambut kolaborasi berkelanjutan yang saling memberi manfaat."
        />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div
            v-for="type in partnerTypes"
            :key="type.title"
            class="group relative bg-bg-card rounded-2xl p-6 sm:p-7 border border-border shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-accent/40"
          >
            <span
              class="w-12 h-12 rounded-xl flex items-center justify-center bg-accent-soft text-accent mb-4"
              aria-hidden="true"
            >
              <Icon :name="type.icon" class="text-2xl" />
            </span>
            <h3 class="text-lg font-bold text-text-main mb-2 m-0">
              {{ type.title }}
            </h3>
            <p class="text-text-muted text-xs sm:text-sm leading-relaxed m-0">
              {{ type.desc }}
            </p>
          </div>
        </div>
      </section>

      <!-- ── Partners marquee ───────────────────────────────── -->
      <section aria-labelledby="partners-title" class="pb-16 md:pb-20">
        <SponsorSectionHeading
          id="partners-title"
          title="Mitra yang Telah Bergabung"
          subtitle="Apresiasi tulus kepada seluruh mitra dan pelaku usaha yang telah membersamai perjalanan Nawasena."
        />
        <div class="partner-marquee relative overflow-hidden py-2">
          <div
            class="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none hidden md:block"
            aria-hidden="true"
          />
          <div
            class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none hidden md:block"
            aria-hidden="true"
          />

          <div
            class="partner-track flex w-max motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:gap-3 motion-reduce:justify-center"
          >
            <div
              class="flex gap-3 pr-3 shrink-0 motion-reduce:flex-wrap motion-reduce:pr-0 motion-reduce:justify-center"
            >
              <span
                v-for="partner in partners"
                :key="partner"
                class="inline-flex items-center gap-2 bg-bg-card border border-border rounded-xl px-4 py-2.5 font-semibold text-xs sm:text-sm text-text-muted shadow-xs whitespace-nowrap"
              >
                <span
                  class="w-2 h-2 rounded-full bg-accent/60 shrink-0"
                  aria-hidden="true"
                />
                {{ partner }}
              </span>
            </div>
            <div
              class="flex gap-3 pr-3 shrink-0 motion-reduce:hidden"
              aria-hidden="true"
            >
              <span
                v-for="partner in partners"
                :key="`dup-${partner}`"
                class="inline-flex items-center gap-2 bg-bg-card border border-border rounded-xl px-4 py-2.5 font-semibold text-xs sm:text-sm text-text-muted shadow-xs whitespace-nowrap"
              >
                <span
                  class="w-2 h-2 rounded-full bg-accent/60 shrink-0"
                  aria-hidden="true"
                />
                {{ partner }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Direct Contact CTA Banner ──────────────────────── -->
      <section aria-label="Kontak Langsung Sekretariat" class="pb-16 md:pb-20">
        <div
          class="relative overflow-hidden bg-accent rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-lg"
        >
          <h2
            class="relative z-10 text-white text-2xl sm:text-3xl font-black mb-3 m-0"
          >
            Ada Pertanyaan Seputar Kemitraan?
          </h2>
          <p
            class="relative z-10 text-white/85 text-xs sm:text-sm sm:leading-relaxed max-w-lg mx-auto mb-6 m-0"
          >
            Tim Sekretariat OSIS Nawasena siap mendiskusikan paket kerjasama dan
            proposal kegiatan yang paling sesuai dengan kebutuhan Anda.
          </p>
          <div
            class="relative z-10 flex flex-wrap gap-3 justify-center items-center"
          >
            <a
              href="mailto:osissmanduajonggol@gmail.com"
              class="inline-flex items-center gap-2 border border-white/30 text-white bg-white/10 hover:bg-white/20 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold no-underline transition-colors min-h-[44px]"
            >
              <Icon
                name="material-symbols:mail"
                class="text-base"
                aria-hidden="true"
              />
              Email Kami
            </a>
            <a
              href="https://wa.me/6281918401478"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 border border-white/30 text-white bg-white/10 hover:bg-white/20 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold no-underline transition-colors min-h-[44px]"
            >
              <Icon name="mdi:whatsapp" class="text-base" aria-hidden="true" />
              WhatsApp Resmi
            </a>
            <a
              href="https://www.instagram.com/ofc.osissmandjo/"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 border border-white/30 text-white bg-white/10 hover:bg-white/20 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold no-underline transition-colors min-h-[44px]"
            >
              <Icon name="mdi:instagram" class="text-base" aria-hidden="true" />
              Instagram
            </a>
          </div>
        </div>
      </section>

      <!-- ── Form Section ───────────────────────────────────── -->
      <section class="pb-4">
        <SponsorForm :selected-tier="selectedTier" />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedTier = ref("Sapphire - Rp200.000");

const stats = [
  {
    icon: "material-symbols:group",
    value: 800,
    suffix: "+",
    label: "Siswa Aktif di Sekolah",
  },
  {
    icon: "material-symbols:calendar-month",
    value: 12,
    suffix: "+",
    label: "Program Kerja per Tahun",
  },
  {
    icon: "material-symbols:emoji-events",
    value: 3,
    suffix: "",
    label: "Event Besar per Semester",
  },
  {
    icon: "material-symbols:public",
    value: 100,
    suffix: "%",
    label: "Aktivitas Terdokumentasi Digital",
  },
];

const tiers = [
  {
    id: "amethyst",
    icon: "material-symbols:auto-awesome",
    label: "Amethyst",
    title: "Paket Dasar",
    price: "Rp75.000",
    desc: "Paket dasar untuk meningkatkan visibilitas brand melalui media publikasi acara.",
    perks: [
      "Penempatan Logo di Seluruh Media Publikasi (Flyer, Banner, Frame)",
    ],
    featured: false,
  },
  {
    id: "topaz",
    icon: "material-symbols:grade",
    label: "Topaz",
    title: "Paket Standar",
    price: "Rp150.000",
    desc: "Paket standar dengan tambahan eksposur yang lebih luas untuk memperkuat awareness brand.",
    perks: [
      "Semua benefit Paket Amethyst",
      "Promosi Dalam Bentuk Video Melalui Media Sosial",
    ],
    featured: false,
  },
  {
    id: "sapphire",
    icon: "material-symbols:diamond",
    label: "Sapphire",
    title: "Paket Eksklusif",
    price: "Rp200.000",
    desc: "Paket eksklusif dengan manfaat maksimal, promosi menyeluruh dan fasilitas selama acara.",
    perks: [
      "Semua benefit Paket Topaz",
      "Penyebutan Oleh Master of Ceremony",
      "Kesempatan Untuk Membuka Kios saat Acara Berlangsung",
    ],
    featured: true,
  },
  {
    id: "alexandrite",
    icon: "material-symbols:workspace-premium",
    label: "Alexandrite",
    title: "Paket Premium",
    price: "Rp300.000",
    desc: "Paket premium yang memberikan peluang promosi lebih optimal serta interaksi langsung.",
    perks: [
      "Semua benefit Paket Sapphire",
      "Kesempatan berinteraksi secara langsung kepada siswa-siswi selama acara berlangsung",
      "Prioritas eksposur dan fasilitas paling lengkap selama acara",
    ],
    featured: false,
  },
];

const partnerTypes = [
  {
    icon: "material-symbols:storefront",
    title: "Mitra Bisnis & UMKM",
    desc: "Untuk perusahaan dan pelaku usaha yang ingin meningkatkan brand awareness di kalangan pelajar dan keluarganya.",
  },
  {
    icon: "material-symbols:school",
    title: "Mitra Kampus & Institusi",
    desc: "Untuk universitas dan lembaga pendidikan yang ingin menjangkau calon mahasiswa potensial.",
  },
  {
    icon: "material-symbols:handshake",
    title: "Mitra Alumni",
    desc: "Untuk alumni yang ingin berkontribusi balik ke almamater.",
  },
];

const partners = [
  "Jeruk Mood",
  "Dimsum Hallo Dek",
  "Sempol Celup RJ",
  "Blink Photobox",
  "Nyareat Konveksi",
  "Ice Cream 88",
  "Dyputu Studio",
  "Green Living Co.",
  "Kedai Jajan Mba Pepi",
  "Ekspedisi Kilat",
];

function scrollToId(id: string) {
  if (import.meta.client) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function handleSelectTier(tierId: string) {
  const map: Record<string, string> = {
    amethyst: "Amethyst - Rp75.000",
    topaz: "Topaz - Rp150.000",
    sapphire: "Sapphire - Rp200.000",
    alexandrite: "Alexandrite - Rp300.000",
  };
  selectedTier.value = map[tierId.toLowerCase()] || tierId;
  scrollToId("sponsor-form");
}

useSeoMeta({
  title: "Sponsorship - OSIS Nawasena",
  description:
    "Sponsorship dan kemitraan OSIS Nawasena SMAN 2 Jonggol: paket sponsorship, tipe kemitraan, dan formulir pengajuan kerjasama.",
  ogTitle: "Sponsorship - OSIS Nawasena",
  ogDescription:
    "Peluang kerjasama dan sponsorship bersama OSIS Nawasena SMAN 2 Jonggol.",
});
</script>

<style scoped>
@keyframes scroll-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.partner-track {
  animation: scroll-left 30s linear infinite;
}

.partner-marquee:hover .partner-track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .partner-track {
    animation: none;
  }
}
</style>
