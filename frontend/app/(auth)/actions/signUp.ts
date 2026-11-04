"use server";

import type { SignUpFormData } from "@/lib/validations/auth";

export type ActionState = {
  success: boolean;
  message: string;
} | null;

export async function signUpAction(
  _prevState: ActionState,
  data: SignUpFormData
): Promise<ActionState> {
  // Placeholder — akan disambungkan ke backend oleh anggota tim lain.
  console.log("signUpAction called with:", data);
  return { success: false, message: "Fitur registrasi belum tersedia." };
}

