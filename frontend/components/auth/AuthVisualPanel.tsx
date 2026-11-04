import React from "react";
import Image from "next/image";

export default function AuthVisualPanel() {
  return (
    <div className="relative hidden w-full lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-zinc-950 p-8 sm:p-10">
      {/* Background image: User-provided teal ambient gradient asset */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/auth-bg.png"
          alt="Visual Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Subtle dark gradient overlay to ensure contrast and seamless blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
        {/* Soft edge blend toward the form */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-950/80 to-transparent" />
      </div>

      {/* Top branding badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-3.5 py-1.5 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span className="text-xs font-semibold tracking-wider text-white">
            Guruku
          </span>
        </div>
      </div>

      {/* Center artwork / caption card */}
      <div className="relative z-10 my-auto py-8">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md shadow-2xl">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Akses Aman & Terintegrasi
          </h2>
          <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
            Kelola kebutuhan digital Anda dengan perlindungan data tingkat tinggi dan kenyamanan pengalaman pengguna.
          </p>
        </div>
      </div>

      {/* Bottom status note */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] text-zinc-400">
        <span>Sistem Autentikasi v2.0</span>
        <span className="text-emerald-400 font-medium">● Terhubung</span>
      </div>
    </div>
  );
}
