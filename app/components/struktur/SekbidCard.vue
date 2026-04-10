<template>
  <div class="sekbid-card" @click="$emit('click')">
    <span class="sekbid-num">{{ index }}</span>
    <h4 class="sekbid-label">SEKBID {{ index }}</h4>
    <p class="sekbid-name">{{ sekbid.name }}</p>
    <div class="bg-num" aria-hidden="true">{{ index }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sekbid: any
  index: number
}>()

defineEmits(['click'])
</script>

<style scoped>
.sekbid-card {
  position: relative;
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1.1rem 1rem 1rem;
  cursor: pointer;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  box-shadow: var(--shadow);
}
.sekbid-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--accent);
}

.sekbid-num {
  position: absolute;
  top: 0.8rem;
  right: 0.9rem;
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 2px 7px;
  border-radius: 6px;
  letter-spacing: 0.04em;
}
.sekbid-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--accent);
  font-weight: 700;
  margin: 0 0 0.35rem;
}
.sekbid-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-main);
  line-height: 1.35;
  margin: 0;
  z-index: 1;
  flex: 1;
}

/* Large decorative background number */
.bg-num {
  position: absolute;
  bottom: -0.6rem;
  right: -0.1rem;
  font-size: 5.5rem;
  font-weight: 900;
  line-height: 1;
  color: var(--text-main);
  opacity: 0.03;
  pointer-events: none;
  user-select: none;
  transition: opacity 0.22s, color 0.22s, transform 0.22s;
}
.sekbid-card:hover .bg-num {
  opacity: 0.06;
  color: var(--accent);
  transform: translateY(-3px);
}
</style>
