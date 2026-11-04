import React from "react";
import AuthVisualPanel from "@/components/auth/AuthVisualPanel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-zinc-950 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Background ambient lighting matching the teal theme */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-[128px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[128px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[32rem] w-[32rem] rounded-full bg-zinc-900/40 blur-[100px]" />

      {/* Atmospheric subtle mountain silhouette in background */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <svg
          className="absolute bottom-0 w-full text-zinc-900"
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 160L48 176C96 192 192 224 288 208C384 192 480 128 576 122.7C672 117 768 171 864 192C960 213 1056 203 1152 181.3C1248 160 1344 128 1392 112L1440 96V320H1392C1344 320 1248 320 1152 320C1056 320 960 320 864 320C768 320 672 320 576 320C480 320 384 320 288 320C192 320 96 320 48 320H0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Unified Base Floating Glass Card: Identical for both Sign In and Sign Up */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col lg:flex-row overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-2xl">
        {/* Form area: Left side on desktop, full-width on mobile */}
        <div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2">
          <div className="w-full max-w-sm">
            {children}
          </div>
        </div>

        {/* Visual panel: Right side on desktop, hidden on mobile */}
        <AuthVisualPanel />
      </div>
    </div>
  );
}
