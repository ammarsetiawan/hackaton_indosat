"use client";

import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { useSignUpForm } from "@/hooks/useSignUpForm";

export default function SignUpForm() {
  const { register, errors, actionState, isPending, onSubmit } =
    useSignUpForm();

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="flex flex-col gap-1.5 text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Daftar
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Buat akun baru untuk mulai menggunakan platform
        </p>
      </div>

      {/* Global alert feedback */}
      {actionState && !actionState.success && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-xs sm:text-sm text-red-300 backdrop-blur-sm"
        >
          {actionState.message}
        </div>
      )}

      {/* Form Fields */}
      <div className="flex flex-col gap-3.5">
        <Input
          label="Nama Lengkap"
          placeholder="Contoh: Budi Pratama"
          type="text"
          autoComplete="name"
          error={errors.namaLengkap?.message}
          {...register("namaLengkap")}
        />

        <Input
          label="Nama Panggilan"
          placeholder="Contoh: Budi"
          type="text"
          autoComplete="nickname"
          error={errors.namaPanggilan?.message}
          {...register("namaPanggilan")}
        />

        <Input
          label="Email"
          placeholder="nama@email.com"
          type="email"
          autoComplete="email"
          error={errors.akun?.message}
          {...register("akun")}
        />

        <PasswordInput
          label="Password"
          placeholder="Minimal 8 karakter"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        isLoading={isPending}
        aria-busy={isPending}
        className="mt-2 w-full rounded-xl border border-zinc-700/80 bg-zinc-900/90 text-white shadow-lg transition-all duration-200 hover:bg-zinc-800 hover:border-zinc-600 focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        Daftar
      </Button>

      {/* Switch to Sign In */}
      <div className="text-center pt-1">
        <p className="text-xs sm:text-sm text-zinc-400">
          Sudah punya akun?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-white hover:text-emerald-400 underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 rounded-sm"
          >
            Masuk sekarang
          </Link>
        </p>
      </div>

      {/* Soft Terms Notice */}
      <p className="text-[11px] text-zinc-500 text-center leading-relaxed">
        Dengan mendaftar, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami.
      </p>
    </form>
  );
}
