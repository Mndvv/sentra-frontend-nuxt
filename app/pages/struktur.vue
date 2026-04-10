<template>
  <div>
    <main class="struktur-main">

      <!-- Page heading -->
      <div class="page-heading">
        <h2 class="page-title">Struktur Organisasi</h2>
        <p class="page-sub">Kabinet Nawasena 2025/2026</p>
      </div>

      <!-- ── Pengurus Inti ───────────────────────────── -->
      <section>
        <!-- Skeleton -->
        <div v-if="loading" class="bento-grid">
          <div
            v-for="i in 6" :key="i"
            class="skeleton-card"
            :class="{ featured: i === 1 }"
          />
        </div>

        <!-- Cards -->
        <div v-else class="bento-grid">
          <StrukturPengurusCard
            v-for="p in pengurus"
            :key="p.id"
            :pengurus="p"
            :is-featured="isFeatured(p.jabatan)"
            @click="openPengurusModal(p)"
          />
        </div>
      </section>

      <!-- ── Seksi Bidang ────────────────────────────── -->
      <section class="sekbid-section">
        <h3 class="section-heading">Seksi Bidang</h3>

        <!-- Skeleton -->
        <div v-if="loading" class="sekbid-grid">
          <div v-for="i in 10" :key="i" class="skeleton-card sekbid-sk" />
        </div>

        <!-- Cards -->
        <div v-else class="sekbid-grid">
          <StrukturSekbidCard
            v-for="(s, idx) in sekbid"
            :key="s.number ?? s.id ?? idx"
            :sekbid="s"
            :index="idx + 1"
            @click="openSekbidModal(s)"
          />
        </div>
      </section>

      <!-- ── HoF link ────────────────────────────────── -->
      <div class="hof-link-wrap">
        <NuxtLink to="/hof" class="hof-link">
          <Icon name="material-symbols:star" class="hof-icon" />
          Hall of Fame Kepengurusan
        </NuxtLink>
      </div>
    </main>

    <!-- Modals (rendered via Teleport inside each component) -->
    <StrukturPengurusModal />
    <StrukturSekbidModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const { loading, pengurus, sekbid, loadStrukturData, openPengurusModal, openSekbidModal } = useStruktur()

useHead({ title: 'Struktur Organisasi — OSIS Nawasena' })

const isFeatured = (jabatan: string) =>
  ['Ketua', 'Wakil Ketua', 'Sekretaris Umum', 'Bendahara Umum'].some(r => jabatan?.includes(r))

onMounted(() => loadStrukturData())
</script>

<style scoped>
/* ── Layout ── */
.struktur-main {
  max-width: 1120px;
  margin: 0 auto;
  padding: 5rem 1.25rem 3.5rem;
}
@media (min-width: 768px) {
  .struktur-main { padding: 6rem 1.75rem 4rem; }
}

/* ── Heading ── */
.page-heading { text-align: center; margin-bottom: 2.5rem; }
.page-title {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 900;
  color: var(--text-main);
  letter-spacing: -0.02em;
  margin: 0 0 0.4rem;
}
.page-sub { font-size: 1rem; color: var(--text-muted); margin: 0; }

/* ── Bento grid (pengurus inti) ── */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
@media (min-width: 640px)  { .bento-grid { grid-template-columns: repeat(3, 1fr); gap: 1.1rem; } }
@media (min-width: 1024px) { .bento-grid { grid-template-columns: repeat(4, 1fr); gap: 1.25rem; } }

/* ── Sekbid section ── */
.sekbid-section { margin-top: 4rem; }
.section-heading {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text-main);
  margin: 0 0 1.25rem;
}
@media (min-width: 768px) { .section-heading { margin-bottom: 1.5rem; } }

.sekbid-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
}
@media (min-width: 640px)  { .sekbid-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .sekbid-grid { grid-template-columns: repeat(4, 1fr); } }
@media (min-width: 1280px) { .sekbid-grid { grid-template-columns: repeat(5, 1fr); } }

/* ── Skeleton ── */
.skeleton-card {
  border-radius: 18px;
  height: 200px;
  background: linear-gradient(90deg, var(--bg-card) 25%, var(--bg-card-2) 50%, var(--bg-card) 75%);
  background-size: 400% 100%;
  animation: shimmer 1.4s infinite linear;
  border: 1px solid var(--border);
}
.skeleton-card.featured { grid-column: span 2; }
.skeleton-card.sekbid-sk { height: 120px; }

@keyframes shimmer {
  0%   { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

/* ── HoF link ── */
.hof-link-wrap { text-align: center; margin-top: 4rem; }
.hof-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
  background: var(--accent-soft);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.7rem 1.75rem;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  box-shadow: var(--shadow);
}
.hof-link:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--accent);
}
.hof-icon { color: var(--accent); font-size: 1.2rem; }
</style>
