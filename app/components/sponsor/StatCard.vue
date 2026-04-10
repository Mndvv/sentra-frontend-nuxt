<template>
  <div class="bg-bg-card rounded-[20px] p-[2rem_1.5rem] text-center border border-indigo-500/12 shadow-sm relative overflow-hidden transition-transform duration-300 hover:-translate-y-[6px]">
    <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#6366f1] to-[#a855f7]"></div>
    <span class="text-[1.8rem] block mb-2">{{ emoji }}</span>
    <span class="text-[2.8rem] font-[800] leading-none mb-1.5 bg-gradient-to-br from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent block" ref="numEl">
      0{{ suffix }}
    </span>
    <span class="text-text-muted text-[0.85rem] font-medium">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  emoji: string
  target: number
  suffix?: string
  label: string
}>()

const numEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!import.meta.client || !numEl.value) return

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        runCounter()
        obs.unobserve(e.target)
      }
    })
  }, { threshold: 0.4 })

  obs.observe(numEl.value)
})

const runCounter = () => {
  const steps = Math.ceil(1600 / 16)
  const inc = props.target / steps
  let cur = 0
  const timer = setInterval(() => {
    cur = Math.min(cur + inc, props.target)
    if (numEl.value) {
      numEl.value.textContent = Math.floor(cur) + (props.suffix || '')
    }
    if (cur >= props.target) clearInterval(timer)
  }, 16)
}
</script>
