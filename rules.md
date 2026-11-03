# Rules & Konstitusi Proyek (Frontend)

> [!CAUTION]
> **ATURAN MUTLAK BACKEND (ZERO-TOUCH POLICY):**
> Folder `backend/` adalah tanggung jawab anggota tim lain. **DILARANG KERAS MENYENTUH, MEMODIFIKASI, MENGHAPUS, ATAU MENULIS FILE APAPUN DI DALAM FOLDER `backend/`**. Seluruh aktivitas dan perubahan kode HANYA boleh dilakukan di dalam folder `frontend/` dan file konfigurasi root non-backend.

---

## 1. Tech Stack & Spesifikasi Versi

Seluruh kode yang ditulis wajib mematuhi versi dependensi yang terpasang di `frontend`:

* **Framework:** Next.js `16.4.3` (App Router, Turbopack)
* **Core Library:** React `19.3.0` & React DOM `19.3.0`
* **Language:** TypeScript `^5.x` (Strict Mode diaktifkan, Path Alias `@/*`)
* **Styling:** Tailwind CSS `^4.x` (Menggunakan konfigurasi CSS-first `@import "tailwindcss"` & `@theme inline`)
* **Form & Validation:** React Hook Form + Zod (`^3.x`)
* **Linting:** ESLint `^9` (`eslint-config-next: 16.4.3`)

---

## 2. Standar Penulisan Kode (Code Style & Conventions)

### 2.1 Penamaan
* **Komponen & File Komponen:** `PascalCase` (contoh: `Button.tsx`, `UserProfileCard.tsx`).
* **Hooks:** `camelCase` dengan prefix `use` (contoh: `useAuth.ts`, `useDebounce.ts`).
* **Utility & Services:** `camelCase` (contoh: `formatCurrency.ts`, `authService.ts`).
* **Tipe & Interface:** `PascalCase` (contoh: `User`, `ButtonProps`, `ApiResponse<T>`).
* **Konstanta Global / Enum:** `UPPER_SNAKE_CASE` (contoh: `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE`).

### 2.2 Fungsi & Komponen
* Gunakan **Arrow Function** atau `export function` yang konsisten untuk komponen. Hindari function declaration anonim.
* Selalu tentukan tipe eksplisit untuk props komponen. Hindari penggunaan `any`.

### 2.3 `interface` vs `type`
* Gunakan **`interface`** untuk mendefinisikan bentuk props komponen atau objek yang berpotensi di-extend/diwariskan:
  ```typescript
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
  }
  ```
* Gunakan **`type`** untuk Union, Intersection, Primitives, Tuples, atau Utility Types:
  ```typescript
  export type Status = "idle" | "loading" | "success" | "error";
  export type Nullable<T> = T | null;
  ```

---

## 3. Batasan Manajemen State

AI dilarang menambahkan library state management eksternal (seperti Redux, Zustand, Recoil) kecuali ada instruksi eksplisit. Manfaatkan fitur native React 19:

1. **Server State & Data Fetching:**
   * Prioritaskan **React Server Components (RSC)** untuk fetching data langsung di server.
   * Gunakan **Server Actions** untuk operasi mutasi data.
2. **Local Component State:**
   * Gunakan `useState` untuk state lokal interaksi UI sederhana (modal terbuka/tutup, tab aktif).
   * Gunakan `useReducer` untuk state form atau logika transisi yang kompleks.
3. **React 19 Modern Hooks:**
   * Gunakan `useActionState` untuk menangani form submission dan state feedback dari server.
   * Gunakan `useOptimistic` untuk UI update yang optimistik sebelum server merespons.
4. **Shared / Global State Antar Komponen:**
   * Gunakan `React.createContext` + `useContext` yang dibungkus dalam custom provider di level fitur.

---

## 4. Pola Desain (Separation of Concerns)

* **Pemisahan Logika & Tampilan (Logic vs View):**
  * Komponen UI tidak boleh memuat logika kalkulasi rumit, manipulasi data panjang, atau pemanggilan API berulang.
  * Pindahkan logika tersebut ke **Custom Hook** (contoh: `useProductFilter.ts`) dan biarkan komponen hanya merender state dan memanggil handler.
* **Presentational vs Container Components:**
  * Komponen dalam `components/ui/` harus bersifat "murni" (*stateless/dumb*), hanya menerima props dan mengembalikan JSX.

---

## 5. Golden Standard Reference (Contoh Acuan)

Setiap komponen UI baru yang dibuat wajib mengacu pada standar kualitas, typing, aksesibilitas, dan styling seperti contoh berikut:

```tsx
import React from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-foreground text-background hover:opacity-90",
  secondary: "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100",
  outline: "border border-zinc-300 bg-transparent hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900",
  ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm font-medium rounded-lg",
  lg: "h-12 px-6 text-base font-semibold rounded-xl",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading && (
          <span
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
```

