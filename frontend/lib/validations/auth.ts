import { z } from "zod";

export const signInSchema = z.object({
  akun: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export const signUpSchema = z.object({
  namaLengkap: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  namaPanggilan: z.string().min(2, "Nama panggilan minimal 2 karakter"),
  akun: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;

