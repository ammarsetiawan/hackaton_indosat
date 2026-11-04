import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, id, className = "", rightElement, ...props }, ref) => {
    const inputId = id || props.name;
    const errorId = inputId ? `${inputId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs sm:text-sm font-medium text-zinc-300"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error ? true : undefined}
            aria-describedby={error && errorId ? errorId : undefined}
            className={`h-11 sm:h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 text-sm text-zinc-100 placeholder:text-zinc-500 backdrop-blur-md transition-all duration-200 focus-visible:outline-none focus-visible:border-emerald-500/80 focus-visible:ring-2 focus-visible:ring-emerald-500/30 disabled:pointer-events-none disabled:opacity-50 ${
              rightElement ? "pr-11" : ""
            } ${error ? "border-red-500/80 focus-visible:border-red-500 focus-visible:ring-red-500/30" : ""} ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3.5 flex items-center justify-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && errorId && (
          <p id={errorId} className="text-xs text-red-400 font-medium" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
