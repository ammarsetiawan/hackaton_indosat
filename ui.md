# Standar Styling & Komponen UI (ui.md)

Dokumen ini adalah aturan wajib untuk desain, styling dengan Tailwind CSS v4, penggunaan komponen UI, dan standar aksesibilitas (a11y) di frontend.

---

## 1. Aturan CSS & Tailwind CSS v4

Frontend menggunakan **Tailwind CSS v4** dengan arsitektur variabel tema berbasis CSS di `frontend/app/globals.css`.

### 1.1 Metodologi Mobile-First
* Selalu tulis utility class untuk tampilan **mobile/layar kecil terlebih dahulu** tanpa prefix breakpoint.
* Gunakan breakpoint secara bertahap untuk layar yang lebih besar:
  * `sm:` (min-width: 640px)
  * `md:` (min-width: 768px)
  * `lg:` (min-width: 1024px)
  * `xl:` (min-width: 1280px)
* **Contoh yang Benar:** `className="flex flex-col gap-4 sm:flex-row sm:gap-6 lg:gap-8"`
* **DILARANG:** Menulis layout desktop terlebih dahulu lalu menimpa kembali untuk mobile.

### 1.2 Kebijakan Nilai Arbitrer (*Arbitrary Values*)
* **DILARANG KERAS** menggunakan nilai arbitrer seperti `w-[347px]`, `text-[17px]`, `p-[19px]` kecuali untuk:
  1. Aset grafis pihak ketiga dengan dimensi tetap yang tidak bisa diubah.
  2. Nilai dinamis runtime yang dihitung oleh JavaScript (disarankan menggunakan CSS Variables / inline style).
* Gunakan selalu skala default spacing, font-size, dan border-radius Tailwind (misal: `w-full max-w-sm`, `px-4 py-2`, `text-sm`, `rounded-lg`).

### 1.3 Konsistensi Tema & Dark Mode
* Manfaatkan warna semantik CSS variable yang sudah didefinisikan di `globals.css`:
  * Background: `bg-background` atau `bg-white dark:bg-black` / `bg-zinc-50 dark:bg-zinc-950`
  * Teks: `text-foreground` atau `text-zinc-900 dark:text-zinc-100`
  * Border: `border-zinc-200 dark:border-zinc-800`

---

## 2. Pemanfaatan & Hirarki Komponen

1. **Gunakan Komponen Primitif yang Ada:**
   * Sebelum membuat tombol, input, atau kartu baru, AI **WAJIB** mengecek apakah komponen tersebut sudah tersedia di `components/ui/` (misal: `Button.tsx`, `Input.tsx`, `Card.tsx`).
   * Jangan pernah membuat tag `<button>` mentah dengan styling Tailwind berulang jika `components/ui/Button` sudah ada.
2. **Komposisi Komponen:**
   * Buat komponen baru yang mudah dikomposisikan (*composable*) dengan memanfaatkan `children` dan `forwardRef`.
   * Gunakan helper `clsx` / `tailwind-merge` (atau utility fungsi `cn()`) untuk menggabungkan className dinamis tanpa konflik.

---

## 3. Standar Aksesibilitas (a11y)

Setiap elemen antarmuka yang dibuat wajib mematuhi standar WCAG 2.1 AA:

### 3.1 Elemen Semantik HTML
* Gunakan elemen semantik murni:
  * Gunakan `<button>` untuk aksi yang memicu event atau mutasi.
  * Gunakan `<a>` atau `<Link>` dari Next.js untuk navigasi halaman.
  * **DILARANG:** Menggunakan `<div onClick={...}>` sebagai tombol tanpa `role="button"`, `tabIndex={0}`, dan event listener keyboard.

### 3.2 Manajemen Fokus & Indikator Visual
* Semua elemen interaktif wajib memiliki indikator fokus yang terlihat jelas menggunakan utility Tailwind:
  ```html
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2
  ```

### 3.3 Atribut ARIA & Labeling
* Semua icon-only button (tombol yang hanya berisi icon tanpa teks) **WAJIB** menyertakan `aria-label`:
  ```tsx
  <button aria-label="Tutup jendela modal">
    <CloseIcon aria-hidden="true" />
  </button>
  ```
* Elemen yang memiliki state dinamis harus mengabari assistive technology:
  * Menu dropdown / accordion: `aria-expanded={isOpen}`
  * Komponen dalam proses loading: `aria-busy="true"`
  * Input error message: kaitkan dengan `aria-invalid="true"` dan `aria-describedby="error-id"`.

### 3.4 Interaksi Keyboard
* Komponen interaktif kustom (modal, dropdown, tabs) wajib mendukung navigasi keyboard standar:
  * `Enter` / `Space`: Mengaktifkan elemen.
  * `Escape`: Menutup modal, popover, atau dropdown.
  * `Tab` / `Shift + Tab`: Berpindah antar elemen fokus secara logis.

