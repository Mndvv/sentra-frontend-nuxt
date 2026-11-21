<template>
  <div
    class="bg-bg-card border border-border rounded-2xl p-5 sm:p-6 text-center shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col justify-center items-center gap-2 hover:-translate-y-0.5"
  >
    <span
      class="w-12 h-12 rounded-xl bg-accent-soft text-accent flex items-center justify-center shrink-0 mb-1"
      aria-hidden="true"
    >
      <Icon :name="icon" class="text-2xl" />
    </span>
    <span
      class="block text-2xl sm:text-3xl font-black leading-none text-text-main tabular-nums"
    >
      <span ref="numEl" aria-hidden="true">0{{ suffix }}</span>
      <span class="sr-only">{{ target }}{{ suffix }}</span>
    </span>
    <span
      class="block text-text-muted text-xs sm:text-sm font-medium leading-snug"
    >
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  icon: string;
  target: number;
  suffix?: string;
  label: string;
}>();

const numEl = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let timer: number | undefined;

onMounted(() => {
  if (!import.meta.client || !numEl.value) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    if (numEl.value)
      numEl.value.textContent = String(props.target) + (props.suffix || "");
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          runCounter();
          observer?.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  observer.observe(numEl.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  if (timer) window.cancelAnimationFrame(timer);
});

function runCounter() {
  const duration = 1200;
  const start = performance.now();
  const endVal = props.target;

  function frame(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * endVal);

    if (numEl.value) {
      numEl.value.textContent =
        current.toLocaleString("id-ID") + (props.suffix || "");
    }

    if (progress < 1) {
      timer = window.requestAnimationFrame(frame);
    } else if (numEl.value) {
      numEl.value.textContent =
        endVal.toLocaleString("id-ID") + (props.suffix || "");
    }
  }

  timer = window.requestAnimationFrame(frame);
}
</script>
