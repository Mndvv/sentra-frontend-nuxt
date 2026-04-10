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
  // If remote image fails, swap to initial avatar
  const img = e.target as HTMLImageElement
  const alt = img.alt || '?'
  img.src = useImageUrl('', alt)
  img.onerror = null
}
</script>

<style scoped>
.bento-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.75rem 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}
.bento-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--accent);
}
.bento-item.featured {
  background: linear-gradient(135deg, var(--bg-card) 0%, var(--bento-featured-gradient-end) 100%);
  border-color: rgba(99, 102, 241, 0.25);
  grid-column: span 2;
}

/* ── Photo ── */
.member-photo {
  width: 88px;
  height: 88px;
  margin-bottom: 1rem;
  flex-shrink: 0;
}
.featured .member-photo {
  width: 108px;
  height: 108px;
}
.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid transparent;
  transition: border-color 0.25s;
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
  gap: 0;
}
.role-badge {
  display: inline-block;
  background: var(--accent-soft);
  color: var(--accent);
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.45rem;
}
h3 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.3;
  transition: color 0.2s;
}
.bento-item:hover h3 {
  color: var(--accent);
}
.featured h3 {
  font-size: 1.15rem;
}
.motto {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-muted);
  font-style: italic;
  line-height: 1.4;
}
</style>
