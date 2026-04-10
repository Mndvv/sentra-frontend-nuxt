<template>
  <div class="bg-bg-card rounded-[24px] md:rounded-[28px] p-[2rem_1.5rem] md:p-[3.5rem] border border-indigo-500/15 shadow-[0_20px_60px_-10px_rgba(99,102,241,0.12)] mb-[6rem] relative overflow-hidden" id="formulir">
    <div class="absolute w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.07),transparent)] bottom-[-120px] right-[-80px] pointer-events-none"></div>
    
    <h2 class="text-[1.6rem] md:text-[1.9rem] font-[800] mb-[0.4rem] text-text-main relative z-10">Formulir Pengajuan Kerjasama</h2>
    <p class="text-text-muted mb-[2.5rem] relative z-10 text-[0.95rem] md:text-[1rem]">Isi formulir di bawah ini dan tim kami akan menghubungi Anda dalam 1–2 hari kerja.</p>
    
    <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-[1.5rem] relative z-10">
      <div class="flex flex-col">
        <label class="block text-[0.78rem] font-[700] text-text-muted tracking-[0.8px] uppercase mb-[0.5rem]">Nama / Nama Lembaga *</label>
        <input v-model="form.nama" required type="text" placeholder="Nama lengkap atau nama instansi" class="w-full p-[13px_16px] rounded-[12px] border-[2px] border-indigo-500/15 bg-bg-primary text-text-main font-sans text-[0.92rem] outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]">
      </div>
      
      <div class="flex flex-col">
        <label class="block text-[0.78rem] font-[700] text-text-muted tracking-[0.8px] uppercase mb-[0.5rem]">Kontak (WA / Email) *</label>
        <input v-model="form.kontak" required type="text" placeholder="0812xxxx atau nama@email.com" class="w-full p-[13px_16px] rounded-[12px] border-[2px] border-indigo-500/15 bg-bg-primary text-text-main font-sans text-[0.92rem] outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]">
      </div>
      
      <div class="flex flex-col">
        <label class="block text-[0.78rem] font-[700] text-text-muted tracking-[0.8px] uppercase mb-[0.5rem]">Tipe Kerjasama *</label>
        <select v-model="form.tipe" required class="w-full p-[13px_16px] rounded-[12px] border-[2px] border-indigo-500/15 bg-bg-primary text-text-main font-sans text-[0.92rem] outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] appearance-none cursor-pointer">
          <option value="" disabled>Pilih tipe kerjasama</option>
          <optgroup label="Paket Sponsorship">
            <option>Amethyst — Rp75.000</option>
            <option>Topaz — Rp150.000</option>
            <option>Sapphire — Rp200.000</option>
            <option>Alexandrite — Rp350.000</option>
          </optgroup>
          <optgroup label="Tipe Kemitraan">
            <option>Mitra Bisnis & UMKM</option>
            <option>Mitra Kampus & Institusi</option>
            <option>Mitra Alumni</option>
          </optgroup>
          <option>Kerjasama Lainnya</option>
        </select>
      </div>
      
      <div class="flex flex-col">
        <label class="block text-[0.78rem] font-[700] text-text-muted tracking-[0.8px] uppercase mb-[0.5rem]">Program / Event yang Diminati</label>
        <select v-model="form.event" class="w-full p-[13px_16px] rounded-[12px] border-[2px] border-indigo-500/15 bg-bg-primary text-text-main font-sans text-[0.92rem] outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] appearance-none cursor-pointer">
          <option value="" disabled>Pilih (opsional)</option>
          <option>Semua Program Kerja</option>
          <option>EPOK — Event Seni & Olahraga</option>
          <option>Seminar & Forum Edukasi</option>
          <option>Program Sosial & Kemasyarakatan</option>
          <option>Event Peringatan Hari Besar</option>
          <option>Lainnya</option>
        </select>
      </div>
      
      <div class="flex flex-col md:col-span-2">
        <label class="block text-[0.78rem] font-[700] text-text-muted tracking-[0.8px] uppercase mb-[0.5rem]">Pesan & Proposal Singkat *</label>
        <textarea v-model="form.pesan" required placeholder="Ceritakan tentang lembaga / bisnis Anda, tujuan kerjasama, dan ekspektasi yang ingin dicapai..." class="w-full p-[13px_16px] rounded-[12px] border-[2px] border-indigo-500/15 bg-bg-primary text-text-main font-sans text-[0.92rem] outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] resize-y min-h-[130px]"></textarea>
      </div>
      
      <div class="md:col-span-2">
        <button type="submit" class="bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-white border-none p-[15px_40px] rounded-[50px] font-sans text-[0.95rem] font-[700] cursor-pointer inline-flex items-center gap-[10px] mt-[1.2rem] transition-all duration-300 shadow-[0_8px_22px_rgba(99,102,241,0.35)] hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(99,102,241,0.45)] w-full md:w-auto justify-center">
          Kirim Pengajuan ke WhatsApp <Icon name="mdi:whatsapp" size="20" />
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  nama: '',
  kontak: '',
  tipe: '',
  event: '',
  pesan: ''
})

const submit = () => {
  const msg = `Halo,\nSelamat [ pagi/siang/sore ]\n\nPerkenalkan Saya *${form.nama}* (Kontak: ${form.kontak}) yang dimana Badan Usaha/Organisasi/Instansi kami tertarik untuk menjalin kerja sama dengan OSIS SMAN 2 JONGGOL.\n\nBerikut detail ketertarikan kami:\n- Tipe Kerjasama: *${form.tipe}*\n- Program/Event Diminati: *${form.event || '-'}*\n\nPesan Pelengkap:\n${form.pesan}\n\nMohon informasi dan diskusi lebih lanjut mengenai prosedur kerja sama ini. Terima kasih.\n\nHormat Kami,\n${form.nama}`
  
  const waUrl = `https://wa.me/6282299234269?text=${encodeURIComponent(msg)}`
  window.open(waUrl, '_blank')
  
  // reset
  form.nama = ''
  form.kontak = ''
  form.tipe = ''
  form.event = ''
  form.pesan = ''
}
</script>
