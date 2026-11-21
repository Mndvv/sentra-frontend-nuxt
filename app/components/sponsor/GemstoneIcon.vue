<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="w-full h-full"
    aria-hidden="true"
  >
    <!-- ── 1. AMETHYST (Natural Faceted Crystal Point / Obelisk) ── -->
    <g v-if="normalizedGem === 'amethyst'">
      <!-- Outer crystal silhouette -->
      <path
        d="M12 2L6 7V17L12 22L18 17V7L12 2Z"
        fill="currentColor"
        fill-opacity="0.12"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <!-- Facet shading -->
      <polygon
        points="12,2 18,7 12,10"
        fill="currentColor"
        fill-opacity="0.24"
      />
      <polygon
        points="12,10 18,7 18,17 12,17"
        fill="currentColor"
        fill-opacity="0.18"
      />
      <polygon
        points="12,17 18,17 12,22"
        fill="currentColor"
        fill-opacity="0.28"
      />
      <polygon
        points="6,17 12,17 12,22"
        fill="currentColor"
        fill-opacity="0.14"
      />
      <!-- Interior ridge & spine facet lines -->
      <path
        d="M12 2V22M6 7L12 10L18 7M6 17H18"
        stroke="currentColor"
        stroke-width="1.3"
        stroke-linejoin="round"
      />
    </g>

    <!-- ── 2. TOPAZ (Classic Emerald / Stepped Octagon Cut) ── -->
    <g v-else-if="normalizedGem === 'topaz'">
      <!-- Outer stepped octagonal silhouette -->
      <path
        d="M7 2.5H17L21.5 7V17L17 21.5H7L2.5 17V7L7 2.5Z"
        fill="currentColor"
        fill-opacity="0.12"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <!-- Facet bevel shadings -->
      <polygon
        points="7,2.5 17,2.5 15,5.5 9,5.5"
        fill="currentColor"
        fill-opacity="0.26"
      />
      <polygon
        points="21.5,7 21.5,17 17.5,16 17.5,8"
        fill="currentColor"
        fill-opacity="0.22"
      />
      <polygon
        points="7,21.5 17,21.5 15,18.5 9,18.5"
        fill="currentColor"
        fill-opacity="0.15"
      />
      <polygon
        points="2.5,7 2.5,17 6.5,16 6.5,8"
        fill="currentColor"
        fill-opacity="0.1"
      />
      <!-- Inner table facet -->
      <path
        d="M9 5.5H15L17.5 8V16L15 18.5H9L6.5 16V8L9 5.5Z"
        fill="currentColor"
        fill-opacity="0.2"
        stroke="currentColor"
        stroke-width="1.3"
        stroke-linejoin="round"
      />
      <!-- Radial facet lines connecting outer edge to table -->
      <path
        d="M7 2.5L9 5.5M17 2.5L15 5.5M21.5 7L17.5 8M21.5 17L17.5 16M17 21.5L15 18.5M7 21.5L9 18.5M2.5 17L6.5 16M2.5 7L6.5 8"
        stroke="currentColor"
        stroke-width="1.3"
        stroke-linejoin="round"
      />
    </g>

    <!-- ── 3. SAPPHIRE (Royal Cushion Brilliant Cut) ── -->
    <g v-else-if="normalizedGem === 'sapphire'">
      <!-- Outer cushion silhouette -->
      <path
        d="M8 2.5H16L21.5 8V16L16 21.5H8L2.5 16V8L8 2.5Z"
        fill="currentColor"
        fill-opacity="0.14"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <!-- Inner brilliant star / cushion table -->
      <polygon
        points="12,5 16,8 19,12 16,16 12,19 8,16 5,12 8,8"
        fill="currentColor"
        fill-opacity="0.24"
        stroke="currentColor"
        stroke-width="1.3"
        stroke-linejoin="round"
      />
      <!-- Corner facet shading -->
      <polygon
        points="12,5 16,8 16,2.5 8,2.5 8,8"
        fill="currentColor"
        fill-opacity="0.18"
      />
      <polygon
        points="16,16 21.5,16 21.5,8 16,8 19,12"
        fill="currentColor"
        fill-opacity="0.28"
      />
      <!-- Radial star lines & facets -->
      <path
        d="M12 5V19M5 12H19M8 2.5L8 8M16 2.5L16 8M21.5 8L16 8M21.5 16L16 16M16 21.5L16 16M8 21.5L8 16M2.5 16L8 16M2.5 8L8 8"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linejoin="round"
      />
    </g>

    <!-- ── 4. ALEXANDRITE (Imperial Marquise / Navette Cut) ── -->
    <g v-else>
      <!-- Outer marquise / eye silhouette -->
      <path
        d="M12 2C16 6 22 10.5 22 12C22 13.5 16 18 12 22C8 18 2 13.5 2 12C2 10.5 8 6 12 2Z"
        fill="currentColor"
        fill-opacity="0.14"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <!-- Inner star rhombus facet -->
      <polygon
        points="12,6 17.5,12 12,18 6.5,12"
        fill="currentColor"
        fill-opacity="0.25"
        stroke="currentColor"
        stroke-width="1.3"
        stroke-linejoin="round"
      />
      <!-- Shading facets -->
      <polygon
        points="12,2 22,12 17.5,12 12,6"
        fill="currentColor"
        fill-opacity="0.22"
      />
      <polygon
        points="12,22 22,12 17.5,12 12,18"
        fill="currentColor"
        fill-opacity="0.32"
      />
      <polygon
        points="12,22 2,12 6.5,12 12,18"
        fill="currentColor"
        fill-opacity="0.12"
      />
      <!-- Facet spine and star radiating lines -->
      <path
        d="M12 2V22M2 12H22M12 6L2 12M12 6L22 12M12 18L2 12M12 18L22 12"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  gem: string;
}>();

const normalizedGem = computed(() => {
  const g = (props.gem || "").toLowerCase();
  if (g.includes("amethyst")) return "amethyst";
  if (g.includes("topaz")) return "topaz";
  if (g.includes("sapphire")) return "sapphire";
  if (g.includes("alexandrite")) return "alexandrite";
  return g;
});
</script>
