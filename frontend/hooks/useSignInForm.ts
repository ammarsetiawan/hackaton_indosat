"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "@/lib/validations/auth";
import {
  signInAction,
  type ActionState,
} from "@/app/(auth)/actions/signIn";

export function useSignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      akun: "",
      password: "",
    },
  });

  const [actionState, dispatchAction, isPending] = useActionState<
    ActionState,
    SignInFormData
  >(signInAction, null);

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
