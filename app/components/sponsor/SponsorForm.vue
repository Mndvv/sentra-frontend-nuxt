<template>
  <div
    id="sponsor-form"
    class="bg-bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-border shadow-sm scroll-mt-28"
  >
    <div class="mb-8">
      <h2
        class="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-text-main m-0"
      >
        Formulir Pengajuan Kerjasama
      </h2>
      <p class="text-text-muted text-sm sm:text-base leading-relaxed m-0 mt-1">
        Sampaikan rencana kemitraan Anda. Tim Sekretariat OSIS Nawasena akan
        menanggapi dalam 1-2 hari kerja.
      </p>
    </div>

    <!-- Success feedback -->
    <div
      v-if="success"
      role="status"
      class="mb-6 flex items-start gap-2.5 rounded-xl p-4 text-sm bg-[var(--badge-done-bg)] text-[var(--badge-done-text)] border border-emerald-500/20"
    >
      <Icon
        name="material-symbols:check-circle-rounded"
        class="shrink-0 mt-0.5 text-lg"
        aria-hidden="true"
      />
      <span>
        Terima kasih! Draf pesan kerjasama Anda telah disusun dan diarahkan ke
        WhatsApp resmi OSIS. Jika tidak terbuka otomatis, silakan
        <a
          href="https://wa.me/6281918401478"
          target="_blank"
          rel="noopener"
          class="underline underline-offset-2 font-bold"
        >
          hubungi kami langsung di sini </a
        >.
      </span>
    </div>

    <!-- Error summary -->
    <div
      v-if="Object.keys(errors).length"
      ref="summaryEl"
      role="alert"
      tabindex="-1"
      class="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-600 dark:text-rose-400 focus-visible:outline-none"
    >
      <p class="font-bold text-sm mb-2 m-0">Mohon lengkapi kolom berikut:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs sm:text-sm m-0">
        <li v-for="(err, field) in errors" :key="field">
          <a
            :href="`#${fieldId(field)}`"
            class="underline underline-offset-2 hover:opacity-80"
            @click.prevent="focusField(field)"
          >
            {{ err }}
          </a>
        </li>
      </ul>
    </div>

    <form
      novalidate
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
      @submit.prevent="submit"
    >
      <!-- Nama / Lembaga -->
      <div class="flex flex-col">
        <label
          for="field-nama"
          class="block text-xs sm:text-sm font-semibold text-text-muted mb-2"
        >
          Nama / Nama Lembaga
          <span class="text-rose-500" aria-hidden="true">*</span>
        </label>
        <input
          id="field-nama"
          v-model="form.nama"
          type="text"
          placeholder="Nama lengkap atau instansi Anda"
          :aria-invalid="!!errors.nama"
          :aria-describedby="errors.nama ? 'err-nama' : undefined"
          :class="[
            inputBase,
            errors.nama
              ? 'border-rose-400 focus-visible:border-rose-400 focus-visible:ring-rose-400/20'
              : 'border-border',
          ]"
        />
        <p
          v-if="errors.nama"
          id="err-nama"
          class="text-rose-500 text-xs mt-1.5 m-0 font-medium"
        >
          {{ errors.nama }}
        </p>
      </div>

      <!-- Kontak -->
      <div class="flex flex-col">
        <label
          for="field-kontak"
          class="block text-xs sm:text-sm font-semibold text-text-muted mb-2"
        >
          Kontak (WA / Email)
          <span class="text-rose-500" aria-hidden="true">*</span>
        </label>
        <input
          id="field-kontak"
          v-model="form.kontak"
          type="text"
          placeholder="0812xxxx atau email@perusahaan.com"
          :aria-invalid="!!errors.kontak"
          :aria-describedby="errors.kontak ? 'err-kontak' : undefined"
          :class="[
            inputBase,
            errors.kontak
              ? 'border-rose-400 focus-visible:border-rose-400 focus-visible:ring-rose-400/20'
              : 'border-border',
          ]"
        />
        <p
          v-if="errors.kontak"
          id="err-kontak"
          class="text-rose-500 text-xs mt-1.5 m-0 font-medium"
        >
          {{ errors.kontak }}
        </p>
      </div>

      <!-- Tipe Kerjasama -->
      <div class="flex flex-col">
        <label
          for="field-tipe"
          class="block text-xs sm:text-sm font-semibold text-text-muted mb-2"
        >
          Pilihan Paket / Tipe Kerjasama
          <span class="text-rose-500" aria-hidden="true">*</span>
        </label>
        <div class="relative">
          <select
            id="field-tipe"
            v-model="form.tipe"
            :aria-invalid="!!errors.tipe"
            :aria-describedby="errors.tipe ? 'err-tipe' : undefined"
            :class="[
              inputBase,
              'appearance-none cursor-pointer pr-10',
              errors.tipe
                ? 'border-rose-400 focus-visible:border-rose-400 focus-visible:ring-rose-400/20'
                : 'border-border',
            ]"
          >
            <option value="" disabled>Pilih paket kemitraan</option>
            <optgroup label="Paket Sponsorship">
              <option value="Amethyst - Rp75.000">Amethyst - Rp75.000</option>
              <option value="Topaz - Rp150.000">Topaz - Rp150.000</option>
              <option value="Sapphire - Rp200.000">Sapphire - Rp200.000</option>
              <option value="Alexandrite - Rp300.000">
                Alexandrite - Rp300.000
              </option>
            </optgroup>
            <optgroup label="Tipe Kemitraan">
              <option value="Mitra Bisnis & UMKM">Mitra Bisnis & UMKM</option>
              <option value="Mitra Kampus & Institusi">
                Mitra Kampus & Institusi
              </option>
              <option value="Mitra Alumni">Mitra Alumni</option>
            </optgroup>
            <option value="Kerjasama Lainnya / Kustom">
              Kerjasama Lainnya / Kustom
            </option>
          </select>
          <Icon
            name="material-symbols:keyboard-arrow-down-rounded"
            class="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-subtle pointer-events-none text-lg"
            aria-hidden="true"
          />
        </div>
        <p
          v-if="errors.tipe"
          id="err-tipe"
          class="text-rose-500 text-xs mt-1.5 m-0 font-medium"
        >
          {{ errors.tipe }}
        </p>
      </div>

      <!-- Program / Event Diminati -->
      <div class="flex flex-col">
        <label
          for="field-event"
          class="block text-xs sm:text-sm font-semibold text-text-muted mb-2"
        >
          Program / Event yang Diminati
        </label>
        <div class="relative">
          <select
            id="field-event"
            v-model="form.event"
            :class="[
              inputBase,
              'appearance-none cursor-pointer pr-10 border-border',
            ]"
          >
            <option value="">Semua Program Kerja (Umum)</option>
            <option value="EPOK - Event Seni & Olahraga">
              EPOK - Event Seni & Olahraga
            </option>
            <option value="Seminar & Forum Edukasi">
              Seminar & Forum Edukasi
            </option>
            <option value="Program Sosial & Kemasyarakatan">
              Program Sosial & Kemasyarakatan
            </option>
            <option value="Peringatan Hari Besar Nasional & Keagamaan">
              Peringatan Hari Besar Nasional & Keagamaan
            </option>
            <option value="Lainnya">Lainnya</option>
          </select>
          <Icon
            name="material-symbols:keyboard-arrow-down-rounded"
            class="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-subtle pointer-events-none text-lg"
            aria-hidden="true"
          />
        </div>
      </div>

      <!-- Pesan -->
      <div class="flex flex-col md:col-span-2">
        <label
          for="field-pesan"
          class="block text-xs sm:text-sm font-semibold text-text-muted mb-2"
        >
          Pesan & Rencana Kerjasama
          <span class="text-rose-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="field-pesan"
          v-model="form.pesan"
          rows="4"
          placeholder="Ceritakan tentang profil bisnis atau lembaga Anda, tujuan kemitraan, dan bentuk dukungan yang ingin diberikan..."
          :aria-invalid="!!errors.pesan"
          :aria-describedby="errors.pesan ? 'err-pesan' : undefined"
          :class="[
            inputBase,
            'resize-y min-h-[120px]',
            errors.pesan
              ? 'border-rose-400 focus-visible:border-rose-400 focus-visible:ring-rose-400/20'
              : 'border-border',
          ]"
        />
        <p
          v-if="errors.pesan"
          id="err-pesan"
          class="text-rose-500 text-xs mt-1.5 m-0 font-medium"
        >
          {{ errors.pesan }}
        </p>
      </div>

      <!-- Submit Button -->
      <div class="md:col-span-2">
        <button
          type="submit"
          class="inline-flex items-center justify-center gap-2 bg-accent text-white rounded-xl py-3 px-6 font-semibold text-sm sm:text-base border-none cursor-pointer transition-colors duration-200 hover:bg-accent-hover shadow-sm min-h-[44px] w-full md:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Kirim Pengajuan via WhatsApp
          <Icon name="mdi:whatsapp" class="text-lg" aria-hidden="true" />
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, watch } from "vue";

const props = defineProps<{
  selectedTier?: string;
}>();

const inputBase =
  "w-full min-h-[44px] rounded-xl border px-4 py-2.5 text-xs sm:text-sm text-text-main bg-bg-card-2 transition-colors duration-200 placeholder:text-text-subtle focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20";

const form = reactive({
  nama: "",
  kontak: "",
  tipe: props.selectedTier || "",
  event: "",
  pesan: "",
});

watch(
  () => props.selectedTier,
  (val) => {
    if (val) form.tipe = val;
  },
);

const errors = reactive<Record<string, string>>({});
const summaryEl = ref<HTMLElement | null>(null);
const success = ref(false);

const fieldId = (field: string) => `field-${field}`;

function greeting() {
  const h = new Date().getHours();
  if (h < 11) return "pagi";
  if (h < 15) return "siang";
  if (h < 18) return "sore";
  return "malam";
}

function buildMessage() {
  return [
    "Halo Sekretariat OSIS SMAN 2 Jonggol,",
    `Selamat ${greeting()},`,
    "",
    `Perkenalkan saya *${form.nama}* (Kontak: ${form.kontak}). Kami tertarik menjalin kemitraan sponsorship dengan OSIS SMAN 2 Jonggol periode 2026/2027.`,
    "",
    "Berikut ringkasan pengajuan kami:",
    `- Pilihan Paket / Kemitraan: *${form.tipe}*`,
    `- Program / Event yang Diminati: *${form.event || "Umum"}*`,
    "",
    "Rencana Kerjasama & Pesan:",
    form.pesan,
    "",
    "Mohon informasi lebih lanjut mengenai alur dan kesepakatan kerjasama ini. Terima kasih.",
    "",
    "Salam hormat,",
    form.nama,
  ].join("\n");
}

function validate() {
  for (const key of Object.keys(errors)) delete errors[key];

  if (!form.nama.trim()) errors.nama = "Nama / nama lembaga wajib diisi.";
  if (!form.kontak.trim()) errors.kontak = "Kontak (WA / email) wajib diisi.";
  if (!form.tipe) errors.tipe = "Pilih tipe kerjasama atau paket sponsorship.";
  if (!form.pesan.trim())
    errors.pesan = "Pesan atau rencana kerjasama wajib diisi.";

  return Object.keys(errors).length === 0;
}

function focusField(field: string) {
  if (import.meta.client) document.getElementById(fieldId(field))?.focus();
}

function submit() {
  success.value = false;

  if (!validate()) {
    nextTick(() => summaryEl.value?.focus());
    return;
  }

  const waUrl = `https://wa.me/6281918401478?text=${encodeURIComponent(buildMessage())}`;
  window.open(waUrl, "_blank", "noopener");

  success.value = true;
  form.nama = "";
  form.kontak = "";
  form.pesan = "";
}
</script>
