<template>
  <Transition name="modal">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center"
      @click.self="close"
      role="dialog"
      aria-modal="true"
    >
      <div class="bg-bg-card border border-border rounded-2xl w-[90%] max-w-[600px] relative shadow-xl max-h-[90vh] overflow-y-auto">
      <button 
        class="absolute top-6 right-6 bg-bg-primary border-none w-9 h-9 rounded-full flex justify-center items-center cursor-pointer text-text-muted transition-colors hover:bg-accent-soft hover:text-accent" 
        @click="close"
        aria-label="Tutup modal aspirasi"
      >
        <Icon name="material-symbols:close" size="24" />
      </button>

      <div class="p-8 md:p-10">
        <h2 class="font-extrabold text-[1.8rem] mb-2 bg-gradient-to-br from-accent to-[#a855f7] bg-clip-text text-transparent inline-block">AURORA</h2>
        <p class="text-text-muted text-[0.95rem] leading-relaxed mb-6">Suara Anda, arah langkah nyata. Sampaikan asprirasi, gagasan, atau kritik membangun untuk OSIS Nawasena.</p>

        <div v-if="success" class="bg-emerald-500/10 text-emerald-500 p-4 rounded-xl mb-6 flex items-center gap-2">
          <Icon name="material-symbols:check-circle" size="20" />
          <span>Aspirasi Anda berhasil dikirim. Terima kasih!</span>
        </div>

        <div v-if="error" class="bg-red-500/10 text-red-500 p-4 rounded-xl mb-6 flex items-center gap-2">
          <Icon name="material-symbols:error" size="20" />
          <span>{{ error }}</span>
        </div>

        <form @submit.prevent="submit" v-if="!success" class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-medium text-[0.85rem] text-text-main">Nama Lengkap (Opsional)</label>
            <input 
              v-model="form.nama" 
              type="text" 
              placeholder="Samarkan identitas jika ingin anonim" 
              class="px-4 py-3 rounded-xl border border-border bg-bg-primary text-text-main font-sans outline-none focus:border-accent transition-colors w-full"
            >
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-medium text-[0.85rem] text-text-main">Email (Opsional)</label>
            <input 
              v-model="form.email" 
              type="email" 
              placeholder="Untuk balasan (opsional)" 
              class="px-4 py-3 rounded-xl border border-border bg-bg-primary text-text-main font-sans outline-none focus:border-accent transition-colors w-full"
            >
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-medium text-[0.85rem] text-text-main">Kategori <span class="text-red-500">*</span></label>
            <select 
              v-model="form.kategori" 
              required 
              class="px-4 py-3 rounded-xl border border-border bg-bg-primary text-text-main font-sans outline-none focus:border-accent transition-colors w-full appearance-none"
            >
              <option value="Kritik">Kritik & Saran</option>
              <option value="Gagasan">Gagasan Program</option>
              <option value="Laporan">Laporan Masalah</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-medium text-[0.85rem] text-text-main">Aspirasi <span class="text-red-500">*</span></label>
            <textarea 
              v-model="form.aspirasi" 
              rows="4" 
              required 
              placeholder="Tuliskan keresahan atau gagasan Anda..." 
              class="px-4 py-3 rounded-xl border border-border bg-bg-primary text-text-main font-sans outline-none focus:border-accent transition-colors w-full resize-y"
            ></textarea>
          </div>

          <button 
            type="submit" 
            :disabled="loading" 
            class="mt-2 flex items-center justify-center gap-2 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white px-7 py-3.5 rounded-xl font-semibold text-[0.9rem] border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(99,102,241,0.45)] w-full active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Icon v-if="loading" name="line-md:loading-loop" size="20" />
            <span>{{ loading ? 'Mengirim...' : 'Kirim Aspirasi' }}</span>
          </button>
        </form>
      </div>
    </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

const isOpen = useState('isAuroraOpen', () => false)
const { submitKotakSaran } = useApi()

const loading = ref(false)
const success = ref(false)
const error = ref('')

const form = reactive({
  nama: '',
  email: '',
  kategori: 'Kritik',
  aspirasi: ''
})

const resetForm = () => {
  form.nama = ''
  form.email = ''
  form.kategori = 'Kritik'
  form.aspirasi = ''
  success.value = false
  error.value = ''
}

const close = () => {
  isOpen.value = false
  setTimeout(resetForm, 300)
}

const submit = async () => {
  if (!form.kategori || !form.aspirasi) return
  
  loading.value = true
  error.value = ''
  
  const payload = {
    nama: form.nama || 'Anonim',
    email: form.email || '-',
    kategori: form.kategori,
    pesan: form.aspirasi // Map 'aspirasi' to 'pesan'
  }

  const res = await submitKotakSaran(payload)
  
  loading.value = false
  if (res && res.success !== false) {
    success.value = true
    setTimeout(() => {
      if (success.value) close()
    }, 3000)
  } else {
    error.value = res?.message || 'Gagal mengirim aspirasi'
  }
}

watch(isOpen, (val) => {
  if (import.meta.client) {
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})
</script>
