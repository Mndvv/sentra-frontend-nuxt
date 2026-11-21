<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aurora-modal-title"
      @keydown.esc="close"
    >
      <!-- Backdrop overlay: solid contrast, no excessive blur (antislop R-10) -->
      <div
        class="fixed inset-0 bg-black/60 transition-opacity"
        aria-hidden="true"
        @click="close"
      />

      <!-- Modal Card -->
      <div
        class="relative w-full max-w-[560px] bg-bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
      >
        <!-- Modal Header -->
        <div
          class="px-6 sm:px-8 pt-7 pb-4 border-b border-border/70 flex items-start justify-between gap-4"
        >
          <div>
            <div
              class="flex items-center gap-2 text-accent text-xs font-bold tracking-wide uppercase mb-1"
            >
              <Icon
                name="material-symbols:mark-email-unread-rounded"
                class="text-base"
                aria-hidden="true"
              />
              <span>Kanal Aspirasi Siswa</span>
            </div>
            <h2
              id="aurora-modal-title"
              class="text-xl sm:text-2xl font-black text-text-main tracking-tight m-0"
            >
              Kotak Suara AURORA
            </h2>
            <p class="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
              Sampaikan usulan kegiatan, masukan kinerja, atau laporan fasilitas
              untuk pengurus OSIS dan MPK.
            </p>
          </div>

          <!-- Close Button (min 44x44px touch target) -->
          <button
            type="button"
            class="w-10 h-10 rounded-xl bg-bg-card-2 border border-border flex items-center justify-center text-text-muted hover:text-text-main hover:bg-accent-soft hover:border-accent/40 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Tutup kotak saran"
            @click="close"
          >
            <Icon
              name="material-symbols:close-rounded"
              class="text-xl"
              aria-hidden="true"
            />
          </button>
        </div>

        <!-- Modal Body (Scrollable if viewport is small) -->
        <div class="p-6 sm:p-8 overflow-y-auto flex-1">
          <!-- Success State: Human, informative, doesn't vanish abruptly (antislop R-27) -->
          <div
            v-if="success"
            class="flex flex-col items-center text-center py-6 px-2"
          >
            <div
              class="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4"
            >
              <Icon
                name="material-symbols:check-circle-rounded"
                class="text-3xl"
                aria-hidden="true"
              />
            </div>
            <h3 class="text-lg font-bold text-text-main mb-1.5">
              Pesan Berhasil Terkirim
            </h3>
            <p
              class="text-xs sm:text-sm text-text-muted max-w-[380px] leading-relaxed mb-6"
            >
              Terima kasih atas masukanmu. Rekap aspirasi dibaca dan
              ditindaklanjuti secara berkala oleh komisi MPK bersama pengurus
              OSIS.
            </p>
            <div class="flex items-center gap-3">
              <button
                type="button"
                class="px-4 py-2.5 rounded-xl border border-border bg-bg-card text-text-main text-xs font-bold hover:bg-accent-soft hover:border-accent/30 transition-colors cursor-pointer"
                @click="resetForm"
              >
                Tulis Aspirasi Lain
              </button>
              <button
                type="button"
                class="px-5 py-2.5 rounded-xl bg-accent text-white text-xs font-bold hover:bg-accent-hover transition-colors cursor-pointer"
                @click="close"
              >
                Selesai
              </button>
            </div>
          </div>

          <!-- Error Alert Banner -->
          <div
            v-if="error && !success"
            class="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2.5"
            role="alert"
          >
            <Icon
              name="material-symbols:error-rounded"
              class="text-base shrink-0"
              aria-hidden="true"
            />
            <span>{{ error }}</span>
          </div>

          <!-- Form (Clean, accessible, human) -->
          <form
            v-if="!success"
            class="flex flex-col gap-5"
            @submit.prevent="submit"
          >
            <!-- Anonymous Toggle Switch -->
            <div
              class="p-4 rounded-xl bg-bg-card-2 border border-border/80 flex items-start justify-between gap-3"
            >
              <div class="flex-1 pr-2">
                <span class="block text-xs font-bold text-text-main">
                  Kirim Secara Anonim
                </span>
                <span
                  class="block text-[0.72rem] text-text-muted leading-relaxed mt-0.5"
                >
                  Centang opsi ini jika Anda tidak ingin mencantumkan nama
                  maupun email.
                </span>
              </div>
              <label
                class="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5"
              >
                <input
                  v-model="isAnonymous"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div
                  class="w-10 h-6 bg-border peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"
                />
              </label>
            </div>

            <!-- Identity Fields (Collapsed / disabled when anonymous) -->
            <div
              v-if="!isAnonymous"
              class="grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all"
            >
              <div>
                <label
                  for="aurora-nama"
                  class="block text-xs font-bold text-text-main mb-1.5"
                >
                  Nama Anda
                </label>
                <input
                  id="aurora-nama"
                  v-model="form.nama"
                  type="text"
                  placeholder="Contoh: Rian (Kelas XI-3)"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-border bg-bg-primary text-text-main text-xs sm:text-sm placeholder:text-text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent transition-colors"
                />
              </div>

              <div>
                <label
                  for="aurora-email"
                  class="block text-xs font-bold text-text-main mb-1.5"
                >
                  Email (Opsional)
                </label>
                <input
                  id="aurora-email"
                  v-model="form.email"
                  type="email"
                  placeholder="nama@email.com"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-border bg-bg-primary text-text-main text-xs sm:text-sm placeholder:text-text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent transition-colors"
                />
              </div>
            </div>

            <!-- Category Selection (Tactile Chips) -->
            <div>
              <span class="block text-xs font-bold text-text-main mb-2">
                Topik Aspirasi
                <span class="text-accent" aria-hidden="true">*</span>
              </span>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  v-for="cat in categories"
                  :key="cat.value"
                  type="button"
                  class="px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  :class="
                    form.kategori === cat.value
                      ? 'bg-accent text-white border-accent font-bold shadow-xs'
                      : 'bg-bg-primary border-border text-text-muted hover:text-text-main hover:border-accent/40'
                  "
                  @click="form.kategori = cat.value"
                >
                  {{ cat.label }}
                </button>
              </div>
            </div>

            <!-- Message Textarea -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label
                  for="aurora-pesan"
                  class="text-xs font-bold text-text-main"
                >
                  Isi Masukan atau Aspirasi
                  <span class="text-accent" aria-hidden="true">*</span>
                </label>
                <span class="text-[0.7rem] text-text-subtle">
                  {{ form.aspirasi.length }}/500 karakter
                </span>
              </div>
              <textarea
                id="aurora-pesan"
                v-model="form.aspirasi"
                rows="4"
                maxlength="500"
                required
                placeholder="Tuliskan secara jelas saran, kritik, atau usulan kegiatan yang ingin Anda sampaikan..."
                class="w-full px-3.5 py-2.5 rounded-xl border border-border bg-bg-primary text-text-main text-xs sm:text-sm placeholder:text-text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent transition-colors resize-y min-h-[110px]"
              />
            </div>

            <!-- Submit Button (Solid, accessible, no purple gradient slop) -->
            <button
              type="submit"
              :disabled="loading || !form.aspirasi.trim()"
              class="w-full inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-150 hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
            >
              <Icon
                v-if="loading"
                name="line-md:loading-loop"
                class="text-lg animate-spin"
                aria-hidden="true"
              />
              <Icon
                v-else
                name="material-symbols:send-rounded"
                class="text-lg"
                aria-hidden="true"
              />
              <span>{{
                loading ? "Mengirimkan Masukan..." : "Kirim Aspirasi Sekarang"
              }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted } from "vue";
import { useApi } from "~/composables/useApi";

const isOpen = useState("isAuroraOpen", () => false);
const { submitKotakSaran } = useApi();

const loading = ref(false);
const success = ref(false);
const error = ref("");
const isAnonymous = ref(true);

const categories = [
  { value: "Kritik", label: "Kritik & Saran" },
  { value: "Gagasan", label: "Usulan Kegiatan" },
  { value: "Laporan", label: "Fasilitas / Isu" },
  { value: "Lainnya", label: "Lainnya" },
];

const form = reactive({
  nama: "",
  email: "",
  kategori: "Kritik",
  aspirasi: "",
});

const resetForm = () => {
  form.nama = "";
  form.email = "";
  form.kategori = "Kritik";
  form.aspirasi = "";
  isAnonymous.value = true;
  success.value = false;
  error.value = "";
};

const close = () => {
  isOpen.value = false;
  setTimeout(resetForm, 250);
};

const submit = async () => {
  if (!form.kategori || !form.aspirasi.trim()) return;

  loading.value = true;
  error.value = "";

  const payload = {
    nama: isAnonymous.value ? "Anonim" : form.nama.trim() || "Anonim",
    email: isAnonymous.value ? "-" : form.email.trim() || "-",
    kategori: form.kategori,
    pesan: form.aspirasi.trim(),
  };

  const res = await submitKotakSaran(payload);

  loading.value = false;
  if (res && res.success !== false) {
    success.value = true;
  } else {
    error.value =
      res?.message ||
      "Gagal mengirimkan aspirasi. Silakan periksa koneksi Anda dan coba lagi.";
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isOpen.value) {
    close();
  }
};

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener("keydown", handleKeyDown);
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener("keydown", handleKeyDown);
  }
});

watch(isOpen, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? "hidden" : "";
  }
});
</script>
