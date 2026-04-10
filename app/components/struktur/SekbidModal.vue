<template>
  <div 
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center transition-opacity duration-300 opacity-0 pointer-events-none"
    :class="{ 'opacity-100 pointer-events-auto': isOpen }"
    @click.self="close"
  >
    <div 
      class="bg-bg-card border border-border rounded-2xl w-[95%] max-w-[700px] relative shadow-xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 translate-y-5 scale-95 p-6 md:p-10"
      :class="{ 'translate-y-0 scale-100': isOpen }"
    >
      <button 
        class="absolute top-6 right-6 bg-bg-primary border-none w-9 h-9 rounded-full flex justify-center items-center cursor-pointer text-text-muted transition-colors hover:bg-accent-soft hover:text-accent" 
        @click="close"
      >
        <Icon name="material-symbols:close" size="24" />
      </button>

      <div class="mb-8 pr-12 xl:pr-10">
        <h2 class="font-extrabold text-[1.4rem] md:text-[1.6rem] text-text-main">{{ sekbid?.nama }}</h2>
        <p class="text-text-muted mt-2 leading-relaxed text-[0.95rem]">{{ sekbid?.deskripsi || 'Seksi bidang yang bertanggung jawab dalam mengkoordinasikan kegiatan terkait.' }}</p>
      </div>

      <div>
        <h4 class="text-[0.9rem] uppercase tracking-wide text-accent mb-4 border-b border-border pb-2 font-bold">Anggota Sekbid</h4>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div v-for="member in (sekbid?.members || [])" :key="member.id" class="bg-bg-card-2 p-4 rounded-xl border border-border text-center flex flex-col items-center shadow-sm">
             <img :src="useImageUrl(member.foto)" :alt="member.nama" class="w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full object-cover mb-3 border-[2px] border-accent bg-bg-card" loading="lazy">
             <p class="text-[0.65rem] text-accent font-bold uppercase mb-1 line-clamp-1">{{ member.jabatan }}</p>
             <h3 class="text-[0.85rem] text-text-main font-semibold leading-tight line-clamp-2 md:line-clamp-1">{{ member.nama }}</h3>
          </div>
          <div v-if="!sekbid?.members || sekbid.members.length === 0" class="col-span-full text-center py-8 text-text-muted bg-bg-primary rounded-xl border border-dashed border-border mt-2">
            Belum ada anggota di sekbid ini.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { isSekbidModalOpen, selectedSekbid, closeSekbidModal } = useStruktur()

const isOpen = computed(() => isSekbidModalOpen.value)
const sekbid = computed(() => selectedSekbid.value)

const close = () => {
  closeSekbidModal()
}
</script>
