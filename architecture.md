# Arsitektur & Aliran Data Frontend (architecture.md)

> [!CAUTION]
> **BATASAN AREA KERJA:**
> Seluruh panduan arsitektur ini HANYA berlaku untuk direktori `frontend/`. Folder `backend/` dikelola secara independen oleh anggota tim lain dan **TIDAK BOLEH DISENTUH ATAU DIUBAH**.

---

## 1. Struktur Folder (Feature-Driven Architecture)

Frontend diorganisir menggunakan pendekatan kombinasi *Clean Layer* dan *Feature-Driven*:

```text
frontend/
├── app/                      # Next.js App Router (Routing, Layout, Page)
│   ├── about/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                   # Reusable primitive UI components (Button, Input, Card, Modal)
│   ├── common/               # Shared global layouts (Navbar, Footer, Sidebar)
│   └── features/             # Feature-specific components
│       ├── auth/             # Contoh: LoginForm.tsx, RegisterForm.tsx
│       └── dashboard/        # Contoh: MetricsCard.tsx, ActivityTable.tsx
├── hooks/                    # Reusable custom React hooks (useMediaQuery, useDebounce)
├── lib/                      # Utilitas murni & konfigurasi helper (utils.ts, cn.ts)
├── services/                 # API client & repository layer (data fetching & mutations)
│   ├── api.ts                # Base fetch client / wrapper dengan error handling
│   ├── authService.ts        # Service fungsi autentikasi
│   └── userService.ts        # Service fungsi user
├── types/                    # Shared TypeScript interfaces & types
│   ├── api.ts                # Generic API response contracts
│   └── user.ts               # Domain entity types
└── schemas/                  # Zod validation schemas (sinkron dengan formulir & respons)
    ├── authSchema.ts
    └── userSchema.ts
```

---

## 2. Aliran Data (Data Flow Pipeline)

Aliran data dalam aplikasi harus mengikuti hierarki searah yang disiplin:

```text
[Backend API (Port 3001)]
           │ (HTTP JSON)
           ▼
[Service Layer (services/*.ts)]  <-- Validasi skema respons dengan Zod
           │ (Typed Data / Result)
           ▼
[Server Component (RSC)]  ──atau──  [Custom Hook / Action]
           │                                 │
           ▼ (Props)                         ▼ (State)
[Presentational Client Component (components/*)]
```

---

## 3. Aturan Lapisan API (API Layer Rules)

1. **Dilarang Menulis `fetch` di Komponen:**
   * AI dilarang keras memanggil `fetch()` secara langsung di dalam file komponen JSX/TSX.
   * Semua pemanggilan API harus dienkapsulasi ke dalam fungsi service di folder `services/`.
2. **Pola Service Standard:**
   * Setiap fungsi service harus memiliki tipe pengembalian yang jelas dan menangani penangkapan error secara terstandarisasi.
   * Contoh implementasi service:

```typescript
// frontend/services/apiClient.ts
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API Request Failed with status ${response.status}`);
  }

  return response.json();
}
```

3. **Validasi Skema dengan Zod:**
   * Data yang diterima dari API sebaiknya divalidasi dengan skema Zod sebelum diteruskan ke UI untuk menjamin ketahanan terhadap perubahan payload backend:

```typescript
// frontend/services/userService.ts
import { apiClient } from "./apiClient";
import { UserSchema, type User } from "@/schemas/userSchema";

export async function getUserProfile(userId: string): Promise<User> {
  const rawData = await apiClient<unknown>(`/users/${userId}`);
  return UserSchema.parse(rawData);
}
```

