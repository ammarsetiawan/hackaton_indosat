# Strategi & Parameter Pengujian (test.md)

Dokumen ini adalah acuan baku Quality Assurance (QA) untuk seluruh pengujian frontend di proyek ini. AI wajib mematuhi seluruh panduan ini saat menulis atau memutakhirkan file pengujian.

---

## 1. Alat Bantu Pengujian (Testing Tools)

* **Unit & Integration Testing:** **Vitest** + **React Testing Library (@testing-library/react)** + **@testing-library/jest-dom**
* **User Event Simulation:** **@testing-library/user-event**
* **End-to-End (E2E) Testing:** **Playwright**
* **API Mocking:** **Mock Service Worker (MSW)** untuk mocking network request tingkat integrasi, atau `vi.fn()` / `vi.mock()` untuk unit isolation.

---

## 2. Filosofi Pengujian (Testing Philosophy)

> *"The more your tests resemble the way your software is used, the more confidence they can give you."*

1. **Uji dari Perspektif Pengguna:**
   * Jangan pernah menguji *state* internal komponen atau variabel privat (misal: jangan uji nilai `useState`).
   * Verifikasi apa yang dapat **dilihat** atau **didengar** oleh pengguna (teks, peran elemen, atribut ARIA).
2. **Prioritas Query React Testing Library:**
   * **Utama (Prioritas 1):** `getByRole` (contoh: `screen.getByRole("button", { name: /kirim/i })`), `getByLabelText`, `getByPlaceholderText`.
   * **Sekunder (Prioritas 2):** `getByText`, `getByDisplayValue`.
   * **Pilihan Terakhir (Hindari jika memungkinkan):** `getByTestId` hanya dipakai jika elemen dinamis benar-benar tidak memiliki peran semantik.
   * **DILARANG:** Query berbasis class CSS atau tag name (misal `container.querySelector(".btn-submit")`).

---

## 3. Struktur Wajib: Arrange - Act - Assert (AAA)

Setiap blok pengujian (`it` atau `test`) **WAJIB** memiliki komentar struktur tiga tahap berikut:

```tsx
it("should trigger onSubmit with valid form data when submit button clicked", async () => {
  // Arrange
  const user = userEvent.setup();
  const handleSubmit = vi.fn();
  render(<ContactForm onSubmit={handleSubmit} />);
  const nameInput = screen.getByLabelText(/nama/i);
  const submitButton = screen.getByRole("button", { name: /kirim/i });

  // Act
  await user.type(nameInput, "Budi Santoso");
  await user.click(submitButton);

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith({ name: "Budi Santoso" });
});
```

---

## 4. Standar Mocking

1. **Network Mocking (API):**
   * Gunakan MSW untuk menangkap request di level network handler (`handlers.ts`).
   * Jangan me-mock `fetch` secara manual di setiap file test jika MSW sudah menangani endpoint tersebut.
2. **Next.js Router & Navigation Mocking:**
   * Gunakan mock resmi atau `vi.mock("next/navigation")` saat menguji komponen yang memanggil `useRouter()`, `usePathname()`, atau `useSearchParams()`.
3. **Hindari Over-Mocking:**
   * Jangan me-mock komponen anak (*child components*) dalam integration test kecuali komponen tersebut bergantung pada layanan pihak ketiga yang berat (misal Google Maps SDK, payment gateway iframe).

---

## 5. Parameter Pengujian E2E (Playwright)

* Tes Playwright berada di folder `frontend/e2e/`.
* Fokus pada alur bisnis kritis (*happy path* dan *critical edge cases*):
  * Alur otentikasi (login, logout, proteksi route).
  * Pengisian dan validasi formulir utama.
  * Transaksi / navigasi antar halaman utama.
* Gunakan Playwright Locator yang ramah aksesibilitas:
  ```typescript
  test("user can navigate to about page and verify title", async ({ page }) => {
    // Arrange
    await page.goto("/");

    // Act
    await page.getByRole("link", { name: /about/i }).click();

    // Assert
    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
  ```

