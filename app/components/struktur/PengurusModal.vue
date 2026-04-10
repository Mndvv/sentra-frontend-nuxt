<template>
  <Teleport to="body">
    <div
      class="modal-overlay"
      :class="{ show: isOpen }"
      @click.self="close"
    >
      <div class="modal-box" :class="{ show: isOpen }">
        <!-- Close -->
        <button class="modal-close" @click="close" aria-label="Tutup">
          <Icon name="material-symbols:close" size="22" />
        </button>

        <template v-if="p">
          <!-- Profile header -->
          <div class="profile-header">
            <div class="avatar-wrap">
              <img
                :src="useImageUrl(p.foto, p.nama)"
                :alt="p.nama"
                class="avatar"
                loading="lazy"
                decoding="async"
                @error="onImgError"
              />
              <span v-if="p.online" class="online-dot" title="Sedang online" />
            </div>
            <div class="profile-meta">
              <span class="role-badge">{{ p.jabatan }}</span>
              <h3 class="profile-name">{{ p.nama }}</h3>
              <div v-if="p.kelas || p.hobi" class="profile-details">
                <span v-if="p.kelas"><Icon name="material-symbols:class" size="14" /> {{ p.kelas }}</span>
                <span v-if="p.hobi"><Icon name="material-symbols:favorite-outline" size="14" /> {{ p.hobi }}</span>
              </div>
            </div>
          </div>

          <!-- Biodata -->
          <div class="section">
            <h4 class="section-title"><Icon name="material-symbols:badge-outline" size="16" /> Biodata Lengkap</h4>
            <div class="biodata-grid">
              <div class="biodata-item">
                <span class="bd-label">Nama</span>
                <span class="bd-value">{{ p.nama || '—' }}</span>
              </div>
              <div class="biodata-item">
                <span class="bd-label">Kelas</span>
                <span class="bd-value">{{ p.kelas || '—' }}</span>
              </div>
              <div class="biodata-item">
                <span class="bd-label">Tempat / Tgl Lahir</span>
                <span class="bd-value">{{ [p.tempatLahir, p.tanggalLahir].filter(Boolean).join(', ') || '—' }}</span>
              </div>
              <div class="biodata-item">
                <span class="bd-label">Alamat</span>
                <span class="bd-value">{{ p.alamat || '—' }}</span>
              </div>
              <div class="biodata-item">
                <span class="bd-label">Hobi</span>
                <span class="bd-value">{{ p.hobi || '—' }}</span>
              </div>
              <div class="biodata-item">
                <span class="bd-label">Motto</span>
                <span class="bd-value fst-italic">"{{ p.motto || '—' }}"</span>
              </div>
            </div>
          </div>

          <!-- Visi & Misi (only if present) -->
          <div v-if="hasVisiMisi" class="section">
            <h4 class="section-title"><Icon name="material-symbols:target" size="16" /> Visi &amp; Misi</h4>
            <div v-if="p.visi" class="vm-block">
              <p class="vm-label">Visi</p>
              <ul v-if="Array.isArray(p.visi)" class="vm-list">
                <li v-for="(v, i) in p.visi" :key="i">{{ v }}</li>
              </ul>
              <p v-else class="vm-text">{{ p.visi }}</p>
            </div>
            <div v-if="p.misi && p.misi.length" class="vm-block">
              <p class="vm-label">Misi</p>
              <ul class="vm-list">
                <li v-for="(m, i) in p.misi" :key="i">{{ m }}</li>
              </ul>
            </div>
          </div>

          <!-- Program Kerja -->
          <div class="section">
            <h4 class="section-title"><Icon name="material-symbols:task-alt" size="16" /> Program Kerja</h4>
            <div v-if="p.programKerja && p.programKerja.length" class="proker-list">
              <div v-for="prog in p.programKerja" :key="prog.id" class="proker-card">
                <div class="proker-top">
                  <span class="proker-name">{{ prog.nama }}</span>
                  <span
                    class="proker-status"
                    :class="{
                      'status-ongoing': prog.status === 'Berjalan',
                      'status-done': prog.status === 'Selesai',
                      'status-plan': !prog.status || prog.status === 'Direncanakan'
                    }"
                  >{{ prog.status || 'Direncanakan' }}</span>
                </div>
                <p v-if="prog.deskripsi" class="proker-desc">{{ prog.deskripsi }}</p>
                <p v-if="prog.target" class="proker-target">Target: {{ prog.target }}</p>
              </div>
            </div>
            <p v-else class="empty-note">Belum ada program kerja direkam.</p>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { isPengurusModalOpen, selectedPengurus, closePengurusModal } = useStruktur()
const isOpen = computed(() => isPengurusModalOpen.value)
const p = computed(() => selectedPengurus.value)

const hasVisiMisi = computed(() => {
  if (!p.value) return false
  const hasVisi = Array.isArray(p.value.visi) ? p.value.visi.length > 0 : !!p.value.visi
  const hasMisi = Array.isArray(p.value.misi) && p.value.misi.length > 0
  return hasVisi || hasMisi
})

const close = () => closePengurusModal()

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = useImageUrl('', p.value?.nama)
  img.onerror = null
}
</script>

<style scoped>
/* ── Overlay ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.55);
  backdrop-filter: blur(6px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.28s ease;
}
.modal-overlay.show { opacity: 1; pointer-events: auto; }

/* ── Box ── */
.modal-box {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 24px;
  width: 100%;
  max-width: 520px;
  max-height: 90dvh;
  overflow-y: auto;
  padding: 2rem 2rem 2.5rem;
  box-shadow: var(--shadow-lg);
  transform: translateY(16px) scale(0.97);
  transition: transform 0.28s cubic-bezier(.4,0,.2,1), opacity 0.28s ease;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
.modal-box.show { transform: none; }

/* ── Close ── */
.modal-close {
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: var(--bg-card-2);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
}
.modal-close:hover { background: var(--accent-soft); color: var(--accent); }

/* ── Profile header ── */
.profile-header {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  margin-bottom: 1.75rem;
  padding-right: 2rem;
}
.avatar-wrap {
  position: relative;
  flex-shrink: 0;
}
.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent);
  background: var(--bg-card-2);
}
.online-dot {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 12px;
  height: 12px;
  background: #22c55e;
  border-radius: 50%;
  border: 2px solid var(--bg-card);
}
.profile-meta { flex: 1; padding-top: 0.25rem; }
.role-badge {
  display: inline-block;
  background: var(--accent-soft);
  color: var(--accent);
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  margin-bottom: 0.45rem;
}
.profile-name {
  margin: 0 0 0.5rem;
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.25;
}
.profile-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.profile-details span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.78rem;
  color: var(--text-muted);
  background: var(--bg-card-2);
  border: 1px solid var(--border);
  padding: 2px 8px;
  border-radius: 20px;
}

/* ── Sections ── */
.section { margin-top: 1.5rem; }
.section-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent);
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
  margin: 0 0 1rem;
}

/* ── Biodata grid ── */
.biodata-grid { display: flex; flex-direction: column; gap: 0.55rem; }
.biodata-item {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  background: var(--bg-card-2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.5rem 0.85rem;
}
.bd-label {
  flex-shrink: 0;
  min-width: 140px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
}
.bd-value {
  font-size: 0.85rem;
  color: var(--text-main);
}
.fst-italic { font-style: italic; }

/* ── Visi Misi ── */
.vm-block { margin-bottom: 0.75rem; }
.vm-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}
.vm-list {
  margin: 0;
  padding-left: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.vm-list li { font-size: 0.88rem; color: var(--text-main); }
.vm-text { font-size: 0.88rem; color: var(--text-main); margin: 0; }

/* ── Proker ── */
.proker-list { display: flex; flex-direction: column; gap: 0.65rem; }
.proker-card {
  background: var(--bg-card-2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.7rem 0.9rem;
}
.proker-top { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.3rem; }
.proker-name { font-size: 0.88rem; font-weight: 600; color: var(--text-main); }
.proker-status {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;
}
.status-ongoing { background: var(--badge-ongoing-bg); color: var(--badge-ongoing-text); }
.status-done    { background: var(--badge-done-bg);    color: var(--badge-done-text); }
.status-plan    { background: var(--badge-plan-bg);    color: var(--badge-plan-text); }
.proker-desc { font-size: 0.8rem; color: var(--text-muted); margin: 0 0 0.25rem; }
.proker-target { font-size: 0.75rem; color: var(--text-subtle); margin: 0; }

.empty-note { font-size: 0.85rem; color: var(--text-muted); margin: 0; }

@media (max-width: 480px) {
  .modal-box { padding: 1.5rem 1.25rem 2rem; }
  .profile-header { flex-direction: column; align-items: center; text-align: center; }
  .profile-details { justify-content: center; }
  .bd-label { min-width: 110px; }
}
</style>
