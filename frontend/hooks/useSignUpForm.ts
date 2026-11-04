"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth";
import {
  signUpAction,
  type ActionState,
} from "@/app/(auth)/actions/signUp";

export function useSignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      namaLengkap: "",
      namaPanggilan: "",
      akun: "",
      password: "",
    },
  });

  const [actionState, dispatchAction, isPending] = useActionState<
    ActionState,
    SignUpFormData
  >(signUpAction, null);

  const onSubmit = handleSubmit((data) => {
    dispatchAction(data);
  });

  return {
    register,
    errors,
    actionState,
    isPending,
    onSubmit,
  };
}
