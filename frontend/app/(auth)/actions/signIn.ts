"use server";

import type { SignInFormData } from "@/lib/validations/auth";

export type ActionState = {
  success: boolean;
  message: string;
} | null;

export async function signInAction(
  _prevState: ActionState,
  data: SignInFormData
): Promise<ActionState> {
  // Placeholder — akan disambungkan ke backend oleh anggota tim lain.
  console.log("signInAction called with:", data);
  return { success: false, message: "Fitur login belum tersedia." };
}

