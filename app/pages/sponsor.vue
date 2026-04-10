<template>
  <div>
    <!-- Hero Section -->
    <div class="mt-[70px] py-[7rem] md:pt-[7rem] md:pb-[5rem] relative overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(99,102,241,0.1),transparent),radial-gradient(ellipse_60%_50%_at_10%_100%,rgba(168,85,247,0.07),transparent)]">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.06)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.05)_0%,transparent_50%)] pointer-events-none"></div>
      
      <!-- Blobs -->
      <div class="absolute w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none opacity-[0.35] bg-indigo-500/15 top-[-200px] right-[-150px]"></div>
      <div class="absolute w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none opacity-[0.35] bg-purple-500/12 bottom-[-100px] left-[5%]"></div>

      <div class="relative z-10 text-center px-4 max-w-[1120px] mx-auto">
        <h1 class="text-[clamp(2rem,5vw,3.8rem)] font-[800] leading-[1.12] mb-[1.5rem] tracking-[-1px] text-text-main">
          Akselerasi Generasi Muda<br>
          bersama <span class="bg-gradient-to-br from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">Nawasena</span>
        </h1>
        <p class="text-text-muted text-[1.1rem] max-w-[560px] mx-auto mb-[2.5rem] leading-[1.75]">Jadilah bagian dari langkah bermakna kami. OSIS SMAN 2 Jonggol membuka peluang kerjasama eksklusif bagi Mitra yang memiliki visi sejalan.</p>
        
        <div class="flex gap-4 justify-center flex-wrap">
          <a href="#sponsor-form" class="bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-white border-none py-[14px] px-[32px] rounded-[50px] font-[700] text-[0.95rem] inline-flex items-center gap-[8px] transition-all duration-300 shadow-[0_8px_24px_rgba(99,102,241,0.35)] hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(99,102,241,0.45)] no-underline">
            Kirim Penawaran <Icon name="material-symbols:arrow-forward" />
          </a>
          <a href="#sponsor-tiers" class="bg-transparent text-accent border-[2px] border-accent py-[12px] px-[30px] rounded-[50px] font-[700] text-[0.95rem] inline-flex items-center gap-[8px] transition-all duration-300 hover:bg-accent hover:text-white hover:-translate-y-[3px] no-underline">
            Lihat Paket Tier
          </a>
        </div>
      </div>
    </div>

    <main class="max-w-[1120px] mx-auto px-4 md:px-6 relative z-10">
      
      <!-- Stats Row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-[1.5rem] mb-[6rem] -mt-[4rem] relative z-20 px-2 md:px-0">
        <SponsorStatCard emoji="👥" :target="800" label="Siswa Aktif di Sekolah" />
        <SponsorStatCard emoji="📅" :target="12" suffix="+" label="Program Kerja per Tahun" />
        <SponsorStatCard emoji="🏆" :target="3" label="Event Besar per Semester" />
        <SponsorStatCard emoji="🌐" :target="100" suffix="%" label="Aktivitas Terdokumentasi Digital" />
      </div>

      <div class="h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent my-[5rem]" id="sponsor-tiers"></div>

      <!-- Tiers -->
      <div class="text-center mb-10">
        <h2 class="text-[1.8rem] md:text-[2.2rem] font-[800] mb-2 text-text-main">Paket Sponsorship</h2>
        <p class="text-text-muted text-[1rem]">Pilih tingkatan yang sesuai dengan kontribusi dan kebutuhan visibilitas Anda.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.5rem] mb-[6rem] items-start">
        <SponsorTierCard 
          colorTheme="amethyst"
          label="Amethyst"
          title="Paket Dasar"
          price="Rp75.000"
          desc="Paket dasar untuk meningkatkan visibilitas brand melalui media publikasi acara."
          :perks="['Penempatan Logo di Seluruh Media Publikasi (Flyer, Banner, Frame)']"
        />
        <SponsorTierCard 
          colorTheme="topaz"
          label="Topaz"
          title="Paket Standar"
          price="Rp150.000"
          desc="Paket standar dengan tambahan eksposur yang lebih luas untuk memperkuat awareness brand."
          :perks="['Penempatan Logo di Seluruh Media Publikasi (Flyer, Banner, Frame)', 'Promosi Dalam Bentuk Video Melalui Media Sosial']"
        />
        <SponsorTierCard 
          colorTheme="sapphire"
          label="Sapphire"
          title="Paket Eksklusif"
          price="Rp200.000"
          desc="Paket eksklusif dengan manfaat maksimal, promosi menyeluruh dan fasilitas selama acara."
          :perks="['Penempatan Logo di Flyer, Banner, dan Frame Instastory', 'Promosi Dalam Bentuk Video Melalui Media Sosial', 'Penyebutan Oleh Master of Ceremony', 'Kesempatan Untuk Membuka Kios saat Acara Berlangsung', 'Mendapatkan 1 (satu) Tenda Untuk Digunakan Selama Acara Berlangsung']"
          isFeatured
        />
        <SponsorTierCard 
          colorTheme="alex"
          label="Alexandrite"
          title="Paket Premium"
          price="Rp350.000"
          desc="Paket premium yang memberikan peluang promosi lebih optimal serta interaksi langsung."
          :perks="['Penempatan Logo di Flyer, Banner, dan Frame Instastory', 'Promosi Dalam Bentuk Video Melalui Media Sosial dan Penyebutan Oleh MC', 'Kesempatan Untuk Membuka Kios saat Acara Berlangsung', 'Kesempatan berinteraksi secara langsung kepada siswa-siswi selama acara berlangsung', 'Prioritas eksposur dan fasilitas paling lengkap selama acara']"
        />
      </div>

      <div class="h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent my-[5rem]"></div>

      <!-- PARTNER TYPES -->
      <div class="text-center mb-10">
        <h2 class="text-[1.8rem] md:text-[2.2rem] font-[800] mb-2 text-text-main">Tipe Kemitraan</h2>
        <p class="text-text-muted text-[1rem]">Lebih dari sekadar sponsor — kami percaya pada kolaborasi yang saling menguntungkan dan bermakna.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-[2rem] mb-[6rem]">
        <div class="bg-bg-card rounded-[20px] p-[2.5rem_2rem] border border-black/5 dark:border-white/5 shadow-sm relative overflow-hidden transition-all duration-350 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] group">
          <div class="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#6366f1] to-[#a855f7] origin-left scale-x-0 transition-transform duration-400 group-hover:scale-x-100"></div>
          <span class="text-[2.8rem] block mb-[1.4rem]">🏢</span>
          <h3 class="text-[1.25rem] font-[700] mb-[0.7rem] text-text-main">Mitra Bisnis & UMKM</h3>
          <p class="text-text-muted text-[0.93rem] leading-[1.75] m-0">Untuk perusahaan dan pelaku usaha yang ingin meningkatkan brand awareness di kalangan pelajar dan keluarganya.</p>
        </div>
        <div class="bg-bg-card rounded-[20px] p-[2.5rem_2rem] border border-black/5 dark:border-white/5 shadow-sm relative overflow-hidden transition-all duration-350 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] group">
          <div class="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#6366f1] to-[#a855f7] origin-left scale-x-0 transition-transform duration-400 group-hover:scale-x-100"></div>
          <span class="text-[2.8rem] block mb-[1.4rem]">🎓</span>
          <h3 class="text-[1.25rem] font-[700] mb-[0.7rem] text-text-main">Mitra Kampus & Institusi</h3>
          <p class="text-text-muted text-[0.93rem] leading-[1.75] m-0">Untuk universitas dan lembaga pendidikan yang ingin menjangkau calon mahasiswa potensial.</p>
        </div>
        <div class="bg-bg-card rounded-[20px] p-[2.5rem_2rem] border border-black/5 dark:border-white/5 shadow-sm relative overflow-hidden transition-all duration-350 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] group">
          <div class="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#6366f1] to-[#a855f7] origin-left scale-x-0 transition-transform duration-400 group-hover:scale-x-100"></div>
          <span class="text-[2.8rem] block mb-[1.4rem]">🤝</span>
          <h3 class="text-[1.25rem] font-[700] mb-[0.7rem] text-text-main">Mitra Alumni</h3>
          <p class="text-text-muted text-[0.93rem] leading-[1.75] m-0">Untuk alumni yang ingin berkontribusi balik ke almamater.</p>
        </div>
      </div>

      <div class="h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent my-[5rem]"></div>

      <!-- Marquee -->
      <div class="text-center mb-10">
        <h2 class="text-[1.8rem] md:text-[2.2rem] font-[800] mb-2 text-text-main">Mitra Kami</h2>
        <p class="text-text-muted text-[1rem]">Terima kasih kepada seluruh pihak yang telah mendukung perjalanan Nawasena 2025/2026.</p>
      </div>
      <div class="overflow-hidden relative py-[0.5rem] mb-[6rem]">
        <div class="absolute inset-y-0 w-[100px] left-0 bg-gradient-to-r from-bg-primary to-transparent z-[2] pointer-events-none"></div>
        <div class="absolute inset-y-0 w-[100px] right-0 bg-gradient-to-l from-bg-primary to-transparent z-[2] pointer-events-none"></div>
        
        <div class="flex gap-[1.2rem] w-max animate-[scroll-left_22s_linear_infinite] hover:animate-pause">
          <div class="bg-bg-card border border-indigo-500/12 rounded-[14px] p-[1rem_1.8rem] flex items-center gap-[0.8rem] whitespace-nowrap font-[600] text-[0.9rem] text-text-muted shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:scale-[1.03] cursor-default"><span class="text-[1.4rem]">🍹</span> Jeruk Mood</div>
          <div class="bg-bg-card border border-indigo-500/12 rounded-[14px] p-[1rem_1.8rem] flex items-center gap-[0.8rem] whitespace-nowrap font-[600] text-[0.9rem] text-text-muted shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:scale-[1.03] cursor-default"><span class="text-[1.4rem]">🍣</span> Dimsum Hallo Dek</div>
          <div class="bg-bg-card border border-indigo-500/12 rounded-[14px] p-[1rem_1.8rem] flex items-center gap-[0.8rem] whitespace-nowrap font-[600] text-[0.9rem] text-text-muted shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:scale-[1.03] cursor-default"><span class="text-[1.4rem]">🍗</span> SempolCelup RJ</div>
          <div class="bg-bg-card border border-indigo-500/12 rounded-[14px] p-[1rem_1.8rem] flex items-center gap-[0.8rem] whitespace-nowrap font-[600] text-[0.9rem] text-text-muted shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:scale-[1.03] cursor-default"><span class="text-[1.4rem]">🏥</span> Klinik Sehat Bersama</div>
          <div class="bg-bg-card border border-indigo-500/12 rounded-[14px] p-[1rem_1.8rem] flex items-center gap-[0.8rem] whitespace-nowrap font-[600] text-[0.9rem] text-text-muted shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:scale-[1.03] cursor-default"><span class="text-[1.4rem]">🎨</span> Nyareat Konveksi</div>
          <div class="bg-bg-card border border-indigo-500/12 rounded-[14px] p-[1rem_1.8rem] flex items-center gap-[0.8rem] whitespace-nowrap font-[600] text-[0.9rem] text-text-muted shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:scale-[1.03] cursor-default"><span class="text-[1.4rem]">🍜</span> Warung Barokah</div>
          <div class="bg-bg-card border border-indigo-500/12 rounded-[14px] p-[1rem_1.8rem] flex items-center gap-[0.8rem] whitespace-nowrap font-[600] text-[0.9rem] text-text-muted shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:scale-[1.03] cursor-default"><span class="text-[1.4rem]">📷</span> Dyputu Studio</div>
          <div class="bg-bg-card border border-indigo-500/12 rounded-[14px] p-[1rem_1.8rem] flex items-center gap-[0.8rem] whitespace-nowrap font-[600] text-[0.9rem] text-text-muted shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:scale-[1.03] cursor-default"><span class="text-[1.4rem]">🌿</span> Green Living Co.</div>
          <div class="bg-bg-card border border-indigo-500/12 rounded-[14px] p-[1rem_1.8rem] flex items-center gap-[0.8rem] whitespace-nowrap font-[600] text-[0.9rem] text-text-muted shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:scale-[1.03] cursor-default"><span class="text-[1.4rem]">🎵</span> Audio Nada Studio</div>
          <div class="bg-bg-card border border-indigo-500/12 rounded-[14px] p-[1rem_1.8rem] flex items-center gap-[0.8rem] whitespace-nowrap font-[600] text-[0.9rem] text-text-muted shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:scale-[1.03] cursor-default"><span class="text-[1.4rem]">📦</span> Ekspedisi Kilat</div>
          <!-- DUPLICATE FOR SEAMLESS SCROLL -->
          <div class="bg-bg-card border border-indigo-500/12 rounded-[14px] p-[1rem_1.8rem] flex items-center gap-[0.8rem] whitespace-nowrap font-[600] text-[0.9rem] text-text-muted shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:scale-[1.03] cursor-default"><span class="text-[1.4rem]">🍹</span> Jeruk Mood</div>
          <div class="bg-bg-card border border-indigo-500/12 rounded-[14px] p-[1rem_1.8rem] flex items-center gap-[0.8rem] whitespace-nowrap font-[600] text-[0.9rem] text-text-muted shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:scale-[1.03] cursor-default"><span class="text-[1.4rem]">🍣</span> Dimsum Hallo Dek</div>
        </div>
      </div>

      <div class="h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent my-[5rem]"></div>

      <!-- CTA STRIP -->
      <div class="bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] rounded-[28px] p-[4rem_1.5rem] md:p-[4rem_3rem] text-center mb-[6rem] relative overflow-hidden">
        <div class="absolute w-[450px] h-[450px] rounded-full bg-white/5 -top-[200px] -left-[100px]"></div>
        <div class="absolute w-[300px] h-[300px] rounded-full bg-white/5 -bottom-[150px] right-[5%]"></div>
        <h2 class="text-white text-[1.8rem] md:text-[2rem] font-[800] mb-[0.8rem] relative z-10">Ada Pertanyaan? Hubungi Kami Langsung</h2>
        <p class="text-white/85 text-[1rem] max-w-[480px] mx-auto mb-[2rem] leading-[1.7] relative z-10">Tim Sekretariat OSIS Nawasena siap mendiskusikan paket kerjasama yang paling sesuai dengan kebutuhan Anda.</p>
        <div class="flex gap-[0.9rem] justify-center auto-cols-auto flex-wrap relative z-10">
          <a href="mailto:osissmanduajonggol@gmail.com" class="bg-white/15 text-white border-[1.5px] border-white/30 p-[10px_22px] rounded-[50px] text-[0.88rem] font-[600] no-underline inline-flex items-center gap-[7px] backdrop-blur transition-colors duration-300 hover:bg-white/25">
            <Icon name="material-symbols:mail" size="16" /> Email Kami
          </a>
          <a href="https://wa.me/6282299234269" class="bg-white/15 text-white border-[1.5px] border-white/30 p-[10px_22px] rounded-[50px] text-[0.88rem] font-[600] no-underline inline-flex items-center gap-[7px] backdrop-blur transition-colors duration-300 hover:bg-white/25" target="_blank">
            <Icon name="material-symbols:chat" size="16" /> WhatsApp
          </a>
          <a href="https://www.instagram.com/ofc.osissmandjo/" class="bg-white/15 text-white border-[1.5px] border-white/30 p-[10px_22px] rounded-[50px] text-[0.88rem] font-[600] no-underline inline-flex items-center gap-[7px] backdrop-blur transition-colors duration-300 hover:bg-white/25" target="_blank">
            <Icon name="material-symbols:photo-camera" size="16" /> Instagram
          </a>
        </div>
      </div>

      <SponsorForm />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Sponsorship — OSIS Nawasena'
})
</script>

<style>
@keyframes scroll-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>
