<template>
  <div 
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center transition-opacity duration-300 opacity-0 pointer-events-none"
    :class="{ 'opacity-100 pointer-events-auto': isOpen }"
    @click.self="close"
  >
    <div 
      class="bg-bg-card border border-border rounded-2xl w-[90%] max-w-[500px] relative shadow-xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 translate-y-5 scale-95 p-8 md:p-10 text-center"
      :class="{ 'translate-y-0 scale-100': isOpen }"
    >
      <button 
        class="absolute top-6 right-6 bg-bg-primary border-none w-9 h-9 rounded-full flex justify-center items-center cursor-pointer text-text-muted transition-colors hover:bg-accent-soft hover:text-accent" 
        @click="close"
      >
        <Icon name="material-symbols:close" size="24" />
      </button>

      <div>
        <img :src="useImageUrl(pengurus?.foto)" :alt="pengurus?.nama" class="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full object-cover mx-auto mb-6 border-[4px] border-accent bg-bg-card-2" loading="lazy">
        <p class="text-accent font-bold text-[0.8rem] mb-2 uppercase tracking-wide">{{ pengurus?.jabatan }}</p>
        <h3 class="text-text-main text-[1.5rem] mb-6 font-bold">{{ pengurus?.nama }}</h3>
        
        <div class="bg-bg-card-2 p-5 rounded-[12px] border border-border mt-6 inline-block text-left min-w-[80%] max-w-full">
          <p class="text-text-muted text-[0.85rem] mb-1.5 font-bold">Visi / Motto:</p>
          <p class="text-[0.95rem] italic leading-relaxed text-text-main">"{{ pengurus?.motto || 'Berbuat yang terbaik untuk OSIS SMAN 2 Jonggol.' }}"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { isPengurusModalOpen, selectedPengurus, closePengurusModal } = useStruktur()

const isOpen = computed(() => isPengurusModalOpen.value)
const pengurus = computed(() => selectedPengurus.value)

const close = () => {
  closePengurusModal()
}
</script>
