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

        <template v-if="sekbid">
          <!-- Header -->
          <div class="modal-header">
            <span class="sekbid-num-badge">SEKBID {{ sekbid.number }}</span>
            <h2 class="modal-title">{{ sekbid.name }}</h2>
            <p v-if="sekbid.description" class="modal-desc">{{ sekbid.description }}</p>
          </div>

          <!-- Members -->
          <div class="section">
            <h4 class="section-title">
              <Icon name="material-symbols:group-outline" size="16" />
              Anggota Sekbid
            </h4>
            <div v-if="members.length" class="member-grid">
              <div v-for="member in members" :key="member.name + member.role" class="member-card">
                <div class="member-avatar-wrap">
                  <img
                    :src="useImageUrl(member.foto, member.name)"
                    :alt="member.name"
                    class="member-avatar"
                    loading="lazy"
                    decoding="async"
                    @error="(e) => onImgError(e, member.name)"
                  />
                </div>
                <p v-if="member.role" class="member-role">{{ member.role }}</p>
                <p class="member-name">{{ member.name }}</p>
              </div>
            </div>
            <p v-else class="empty-note">Belum ada anggota di sekbid ini.</p>
          </div>

          <!-- Program Kerja -->
          <div class="section">
            <h4 class="section-title">
              <Icon name="material-symbols:task-alt" size="16" />
              Program Kerja
            </h4>
            <div v-if="sekbid.programs && sekbid.programs.length" class="proker-list">
              <div v-for="prog in sekbid.programs" :key="prog.id" class="proker-card">
                <div class="proker-top">
                  <span class="proker-name">{{ prog.name }}</span>
                  <span
                    class="proker-status"
                    :class="{
                      'status-ongoing': prog.status === 'Berjalan',
                      'status-done':    prog.status === 'Selesai',
                      'status-plan':    !prog.status || prog.status === 'Direncanakan'
                    }"
                  >{{ prog.status || 'Direncanakan' }}</span>
                </div>
                <p v-if="prog.description" class="proker-desc">{{ prog.description }}</p>
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

const { isSekbidModalOpen, selectedSekbid, closeSekbidModal } = useStruktur()
const isOpen  = computed(() => isSekbidModalOpen.value)
const sekbid  = computed(() => selectedSekbid.value)

// members from API: { name, role, foto } — already filtered by sekbid_number in backend
const members = computed(() => sekbid.value?.members || [])

const close = () => closeSekbidModal()

function onImgError(e: Event, name: string) {
  const img = e.target as HTMLImageElement
  img.src = useImageUrl('', name)
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
  max-width: 680px;
  max-height: 90dvh;
  overflow-y: auto;
  padding: 2rem 2rem 2.5rem;
  box-shadow: var(--shadow-lg);
  transform: translateY(16px) scale(0.97);
  transition: transform 0.28s cubic-bezier(.4,0,.2,1);
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
.modal-box.show { transform: none; }

/* ── Close ── */
.modal-close {
  position: absolute;
  top: 1.1rem; right: 1.1rem;
  width: 34px; height: 34px;
  border: none; border-radius: 50%;
  background: var(--bg-card-2);
  color: var(--text-muted);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, color 0.2s;
}
.modal-close:hover { background: var(--accent-soft); color: var(--accent); }

/* ── Header ── */
.modal-header { margin-bottom: 1.75rem; padding-right: 2rem; }
.sekbid-num-badge {
  display: inline-block;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}
.modal-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-main);
  margin: 0 0 0.5rem;
  line-height: 1.25;
}
.modal-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
}

/* ── Sections ── */
.section { margin-top: 1.5rem; }
.section-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent);
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
  margin: 0 0 1rem;
}

/* ── Member grid ── */
.member-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.85rem;
}
.member-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: var(--bg-card-2);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.9rem 0.5rem 0.85rem;
  transition: border-color 0.2s, transform 0.2s;
}
.member-card:hover { border-color: var(--accent); transform: translateY(-2px); }

.member-avatar-wrap { margin-bottom: 0.55rem; }
.member-avatar {
  width: 58px; height: 58px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border);
  background: var(--bg-card);
  transition: border-color 0.2s;
}
.member-card:hover .member-avatar { border-color: var(--accent); }

.member-role {
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent);
  margin: 0 0 0.25rem;
  line-height: 1.2;
}
.member-name {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
  line-height: 1.3;
  /* clamp to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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
  font-size: 0.65rem; font-weight: 700;
  padding: 2px 8px; border-radius: 20px;
  white-space: nowrap; flex-shrink: 0;
}
.status-ongoing { background: var(--badge-ongoing-bg); color: var(--badge-ongoing-text); }
.status-done    { background: var(--badge-done-bg);    color: var(--badge-done-text); }
.status-plan    { background: var(--badge-plan-bg);    color: var(--badge-plan-text); }
.proker-desc   { font-size: 0.8rem;  color: var(--text-muted);   margin: 0 0 0.2rem; }
.proker-target { font-size: 0.75rem; color: var(--text-subtle);  margin: 0; }

.empty-note { font-size: 0.85rem; color: var(--text-muted); margin: 0; }

@media (max-width: 480px) {
  .modal-box { padding: 1.5rem 1.1rem 2rem; }
  .member-grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
