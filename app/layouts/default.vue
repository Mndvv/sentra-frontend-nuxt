<template>
  <!--
    Sticky-footer layout. The flex container fills at least the viewport so
    the footer always sits at the bottom — even when the page slot is briefly
    empty during route transitions (which previously caused the footer to
    jump up and the new page to render below it).
  -->
  <div class="min-h-[100svh] flex flex-col">
    <AppNavbar />
    <div class="flex-1 flex flex-col">
      <slot />
    </div>
    <AppFooter />
    <AppMiniPlayer />
    <AppAuroraModal />
  </div>
</template>

<script setup lang="ts">
// Layout component
</script>
