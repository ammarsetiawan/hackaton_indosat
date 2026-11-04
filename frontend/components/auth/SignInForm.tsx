"use client";

import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { useSignInForm } from "@/hooks/useSignInForm";

export default function SignInForm() {
  const { register, errors, actionState, isPending, onSubmit } =
    useSignInForm();

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-1.5 text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Masuk
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Lanjutkan untuk mengakses dashboard akun Anda
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
      <div className="flex flex-col gap-4">
        <Input
          label="Email"
          placeholder="nama@email.com"
          type="email"
          autoComplete="email"
          error={errors.akun?.message}
          {...register("akun")}
        />

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs sm:text-sm font-medium text-zinc-300"
            >
              Password
            </label>
            <Link
              href="#"
              className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 rounded-sm"
            >
              Lupa password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            placeholder="Masukkan password Anda"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        isLoading={isPending}
        aria-busy={isPending}
        className="mt-2 w-full rounded-xl border border-zinc-700/80 bg-zinc-900/90 text-white shadow-lg transition-all duration-200 hover:bg-zinc-800 hover:border-zinc-600 focus-visible:ring-emerald-500"
      >
        Masuk
      </Button>

      {/* Switch to Sign Up */}
      <div className="text-center pt-1">
        <p className="text-xs sm:text-sm text-zinc-400">
          Belum punya akun?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-white hover:text-emerald-400 underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 rounded-sm"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </form>
  );
}
