<template>
  <div 
    v-if="isHofModalOpen" 
    class="fixed inset-0 bg-black/70 backdrop-blur-md z-[2000] flex items-center justify-center p-4 md:p-8"
    @click.self="closeHofModal"
  >
    <div class="bg-bg-card rounded-2xl w-full max-w-[800px] max-h-[90vh] flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.4)] animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] dark:bg-[#050810]">
      <div class="flex items-center justify-between p-[1.5rem_2rem] border-b border-border dark:border-white/5 dark:bg-[#050810]/95">
        <h3 class="font-serif text-[1.2rem] md:text-[1.4rem] font-bold m-0 text-text-main dark:text-[#f1f5f9]">{{ modalTitle }}</h3>
        <button 
          class="bg-bg-primary text-text-muted border-none w-10 h-10 rounded-full flex items-center justify-center text-[1.3rem] cursor-pointer transition-all duration-250 hover:bg-accent hover:text-white dark:bg-white/5 dark:text-[#94a3b8] dark:hover:bg-white/10 dark:hover:text-[#f1f5f9]"
          @click="closeHofModal"
        >
          <Icon name="material-symbols:close" size="24" />
        </button>
      </div>

      <div class="p-[1.5rem] md:p-[2rem] overflow-y-auto scrollbar-thin scrollbar-thumb-border flex-1">
        <!-- MODE: MEMBER_PROFILE -->
        <div v-if="modalType === 'MEMBER_PROFILE'" class="text-center py-8 px-4">
          <img :src="useImageUrl(modalData?.foto)" class="w-[120px] h-[120px] rounded-full object-cover mx-auto mb-[1.5rem] border-[4px] border-[#f59e0b] block bg-bg-primary dark:bg-[#1e293b]" @error="(e) => (e.target as HTMLImageElement).src = useImageUrl('uploads/pp/default.webp')">
          <p class="text-[#f59e0b] font-[700] text-[0.75rem] mb-[0.5rem] uppercase tracking-[2px]">{{ modalData?.jabatan }}</p>
          <h3 class="text-text-main dark:text-[#f1f5f9] text-[1.4rem] font-serif m-0">{{ modalData?.nama }}</h3>
        </div>

        <!-- MODE: PERIOD_MEMBERS -->
        <div v-else-if="modalType === 'PERIOD_MEMBERS'" class="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-[1rem] md:gap-[1.5rem] mt-[0.5rem]">
          <div v-for="m in modalData" :key="m.id" class="bg-bg-card p-[1.2rem] rounded-[20px] text-center border border-border shadow-sm dark:bg-gradient-to-br dark:from-[#0d1117] dark:to-[#111827] dark:border-white/5 relative overflow-hidden">
             <div class="relative w-[60px] h-[60px] mx-auto mb-[1rem]">
                <img :src="useImageUrl(m.foto)" :alt="m.nama" class="w-[60px] h-[60px] rounded-full object-cover block bg-bg-primary dark:bg-[#1e293b]" @error="(e) => (e.target as HTMLImageElement).src = useImageUrl('uploads/pp/default.webp')">
                <div class="absolute -inset-[4px] rounded-full border-[2px] border-[#f59e0b]/30"></div>
             </div>
             <div class="text-[0.62rem] font-[700] tracking-[1.5px] uppercase text-[#f59e0b] mb-[0.4rem]">{{ m.jabatan }}</div>
             <h3 class="text-[0.82rem] font-[600] text-text-main dark:text-[#e2e8f0] leading-[1.4] m-0">{{ m.nama }}</h3>
          </div>
        </div>

        <!-- MODE: OLDER_PERIODS -->
        <div v-else-if="modalType === 'OLDER_PERIODS'" class="flex flex-col gap-[1rem] mt-[0.5rem]">
          <div 
            v-for="p in modalData" 
            :key="p.id" 
            class="bg-bg-card border border-border rounded-[12px] p-[1rem_1.5rem] flex justify-between items-center cursor-pointer hover:border-accent group transition-all duration-300 dark:bg-[#0d1117] dark:border-white/5 focus:outline-none focus:border-accent"
            @click="openPeriodMembersModal(p, true)"
            @keyup.enter="openPeriodMembersModal(p, true)"
            tabindex="0"
            role="button"
          >
            <div>
              <h4 class="font-[600] text-text-main dark:text-[#f1f5f9] mb-[0.3rem]">Periode {{ p.nama }}</h4>
              <p class="text-[0.85rem] text-text-muted dark:text-[#64748b] m-0">{{ p.tahun }} &bull; Angkatan Ke-{{ p.angkatan }}</p>
            </div>
            <Icon name="material-symbols:chevron-right" size="24" class="text-text-muted dark:text-[#64748b] group-hover:text-accent transition-colors" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const {
  isHofModalOpen,
  modalType,
  modalTitle,
  modalData,
  closeHofModal,
  openPeriodMembersModal
} = useHof()

watch(isHofModalOpen, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})
</script>

<style scoped>
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
