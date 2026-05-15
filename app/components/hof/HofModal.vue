<template>
  <div 
    v-if="isHofModalOpen" 
    class="fixed inset-0 bg-black/70 backdrop-blur-md z-[2000] flex items-center justify-center p-4 md:p-8"
    @click.self="closeHofModal"
  >
    <div class="bg-bg-card rounded-2xl w-full max-w-[800px] max-h-[90vh] flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.4)] animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
      <div class="flex items-center justify-between p-[1.5rem_2rem] border-b border-border">
        <h3 class="font-serif text-[1.2rem] md:text-[1.4rem] font-bold m-0 text-text-main">{{ modalTitle }}</h3>
        <button 
          class="bg-bg-primary text-text-muted border-none w-10 h-10 rounded-full flex items-center justify-center text-[1.3rem] cursor-pointer transition-all duration-250 hover:bg-accent hover:text-white"
          @click="closeHofModal"
        >
          <Icon name="material-symbols:close" size="24" />
        </button>
      </div>

      <div class="p-[1.5rem] md:p-[2rem] overflow-y-auto scrollbar-thin scrollbar-thumb-border flex-1">
        <!-- MODE: MEMBER_PROFILE -->
        <div v-if="modalType === 'MEMBER_PROFILE'" class="text-center py-8 px-4">
          <AppImg
            :src="useImageUrl(modalData?.foto, modalData?.nama)"
            :alt="modalData?.nama"
            rounded="full"
            class="w-[120px] h-[120px] rounded-full border-[4px] border-[#f59e0b] mx-auto mb-[1.5rem] block"
          />
          <p class="text-[#f59e0b] font-[700] text-[0.75rem] mb-[0.5rem] uppercase tracking-[2px]">{{ modalData?.jabatan }}</p>
          <h3 class="text-text-main text-[1.4rem] font-serif m-0">{{ modalData?.nama }}</h3>
        </div>

        <!-- MODE: PERIOD_MEMBERS -->
        <div v-else-if="modalType === 'PERIOD_MEMBERS'" class="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-[1rem] md:gap-[1.5rem] mt-[0.5rem]">
          <div 
            v-for="m in (modalData?.members ?? modalData)" 
            :key="m.id" 
            class="bg-bg-card p-[1.2rem] rounded-[20px] text-center border border-border shadow-sm relative overflow-hidden"
          >
             <div class="relative w-[60px] h-[60px] mx-auto mb-[1rem]">
                <AppImg
                  :src="useImageUrl(m.foto, m.nama)"
                  :alt="m.nama"
                  rounded="full"
                  class="w-[60px] h-[60px] rounded-full"
                />
                <div class="absolute -inset-[4px] rounded-full border-[2px]"
                  :style="`border-color: ${modalData?.org === 'MPK' ? '#ec489950' : '#f59e0b50'}`"
                ></div>
             </div>
             <div class="text-[0.62rem] font-[700] tracking-[1.5px] uppercase mb-[0.4rem]"
               :style="`color: ${modalData?.org === 'MPK' ? '#ec4899' : '#f59e0b'}`"
             >{{ m.jabatan }}</div>
             <h3 class="text-[0.82rem] font-[600] text-text-main leading-[1.4] m-0">{{ m.nama }}</h3>
          </div>
        </div>

        <!-- MODE: OLDER_PERIODS — each item is a generation { angkatan, osis, mpk } -->
        <div v-else-if="modalType === 'OLDER_PERIODS'" class="flex flex-col gap-[1.2rem] mt-[0.5rem]">
          <div 
            v-for="g in modalData" 
            :key="g.angkatan"
            class="border border-border rounded-[14px] overflow-hidden"
          >
            <!-- Angkatan header -->
            <div class="px-4 py-2 text-[0.65rem] font-[800] tracking-[2.5px] uppercase"
              style="background: var(--bg-card-2, rgba(0,0,0,0.04)); color: var(--text-muted)">
              Angkatan Ke-{{ g.angkatan }}
            </div>

            <!-- OSIS row -->
            <div 
              v-if="g.osis"
              class="p-[0.9rem_1.4rem] flex justify-between items-center cursor-pointer transition-colors group hover:bg-indigo-500/5"
              @click="openPeriodMembersModal(g.osis, 'OSIS', true)"
              tabindex="0"
              role="button"
              @keyup.enter="openPeriodMembersModal(g.osis, 'OSIS', true)"
            >
              <div class="flex items-center gap-3 min-w-0">
                <span class="text-[0.6rem] font-[800] tracking-[1.5px] uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-[#818cf8] border border-indigo-500/20 shrink-0">OSIS</span>
                <div class="min-w-0">
                  <p class="font-[600] text-text-main text-[0.9rem] truncate m-0">Periode {{ g.osis.nama }}</p>
                  <p class="text-[0.82rem] text-text-muted m-0">{{ g.osis.tahun }}</p>
                </div>
              </div>
              <Icon name="material-symbols:chevron-right" size="22" class="text-text-muted group-hover:text-[#818cf8] transition-colors shrink-0" />
            </div>

            <!-- MPK row -->
            <div 
              v-if="g.mpk"
              class="p-[0.9rem_1.4rem] flex justify-between items-center cursor-pointer transition-colors group hover:bg-pink-500/5 border-t"
              :class="g.osis ? 'border-border/40' : 'border-transparent'"
              @click="openPeriodMembersModal(g.mpk, 'MPK', true)"
              tabindex="0"
              role="button"
              @keyup.enter="openPeriodMembersModal(g.mpk, 'MPK', true)"
            >
              <div class="flex items-center gap-3 min-w-0">
                <span class="text-[0.6rem] font-[800] tracking-[1.5px] uppercase px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 shrink-0">MPK</span>
                <div class="min-w-0">
                  <p class="font-[600] text-text-main text-[0.9rem] truncate m-0">Periode {{ g.mpk.nama }}</p>
                  <p class="text-[0.82rem] text-text-muted m-0">{{ g.mpk.tahun }}</p>
                </div>
              </div>
              <Icon name="material-symbols:chevron-right" size="22" class="text-text-muted group-hover:text-pink-400 transition-colors shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useHof } from '~/composables/useHof'

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
