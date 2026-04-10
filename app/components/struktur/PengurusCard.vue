<template>
  <div
    class="bento-item"
    :class="{ featured: isFeatured }"
    @click="$emit('click')"
  >
    <div class="member-photo">
      <img
        :src="useImageUrl(pengurus.foto, pengurus.nama)"
        :alt="pengurus.nama"
        loading="lazy"
        decoding="async"
        class="photo-img"
        @error="onImgError"
      />
    </div>
    <div class="member-info">
      <span class="role-badge">{{ pengurus.jabatan }}</span>
      <h3>{{ pengurus.nama }}</h3>
      <!-- Motto: only shown on the featured (Ketua Umum) card -->
      <p v-if="isFeatured && pengurus.motto" class="motto">"{{ pengurus.motto }}"</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pengurus: any
  isFeatured?: boolean
}>()

defineEmits(['click'])

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = useImageUrl('', img.alt)
  img.onerror = null
}
</script>

<style scoped>
/* ── Base card — uniform for ALL non-featured ── */
.bento-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.4rem 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  box-shadow: var(--shadow);
}
.bento-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--accent);
}

/* ── Featured = Ketua Umum ONLY: bigger, spans 2 cols ── */
.bento-item.featured {
  background: linear-gradient(135deg, var(--bg-card) 0%, var(--bento-featured-gradient-end) 100%);
  border-color: rgba(99, 102, 241, 0.25);
  grid-column: span 2;
  padding: 2rem 1.5rem 1.75rem;
}

/* ── Photo ── */
.member-photo {
  width: 80px;
  height: 80px;
  margin-bottom: 0.85rem;
  flex-shrink: 0;
}
/* Featured card gets a larger avatar */
.featured .member-photo {
  width: 110px;
  height: 110px;
}
.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid transparent;
  transition: border-color 0.22s;
  background: var(--bg-card-2);
}
.bento-item:hover .photo-img {
  border-color: var(--accent);
}

/* ── Info ── */
.member-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.role-badge {
  display: inline-block;
  background: var(--accent-soft);
  color: var(--accent);
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}
h3 {
  margin: 0 0 0.2rem;
  font-size: 0.92rem;      /* uniform size for all */
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.3;
  transition: color 0.2s;
}
/* Featured card gets a slightly larger name */
.featured h3 {
  font-size: 1.15rem;
}
.bento-item:hover h3 {
  color: var(--accent);
}
.motto {
  margin: 0.35rem 0 0;
  font-size: 0.78rem;
  color: var(--text-muted);
  font-style: italic;
  line-height: 1.45;
}
</style>
