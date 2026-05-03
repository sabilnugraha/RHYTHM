'use client';

import { FormEvent } from 'react';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) {
    return null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close sign in modal"
        className="absolute inset-0 cursor-default bg-black/45"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md border-2 border-black bg-[#FFFDF8] p-5 shadow-[8px_8px_0px_#000]">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex border-2 border-black bg-[#CDEFD7] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] shadow-[3px_3px_0px_#000]">
              RHYTHM Access
            </p>
            <h2 className="text-3xl font-black tracking-[-0.04em]">Sign In</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-700">
              Masuk ke workspace internal RHYTHM. Integrasi backend menyusul.
            </p>
          </div>

          <button
            type="button"
            className="border-2 border-black bg-[#FFD6A5] px-3 py-1 text-lg font-black shadow-[3px_3px_0px_#000] transition-transform hover:-translate-y-0.5"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="mb-5 grid gap-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 border-2 border-black bg-white px-4 py-3 text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] transition-transform hover:-translate-y-0.5"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-[#FFFDF8] text-xs">G</span>
            Continue with Google
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 border-2 border-black bg-[#A7C7FF] px-4 py-3 text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] transition-transform hover:-translate-y-0.5"
          >
            <span className="grid h-6 w-6 grid-cols-2 gap-0.5 border-2 border-black bg-white p-0.5">
              <span className="bg-[#F25022]" />
              <span className="bg-[#7FBA00]" />
              <span className="bg-[#00A4EF]" />
              <span className="bg-[#FFB900]" />
            </span>
            Continue with Microsoft
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 border-2 border-black bg-[#CDEFD7] px-4 py-3 text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] transition-transform hover:-translate-y-0.5"
          >
            <span className="flex h-6 w-6 items-center justify-center border-2 border-black bg-[#FFFDF8] text-xs">↗</span>
            Company SSO
          </button>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <div className="h-0.5 flex-1 bg-black" />
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-600">or use email</span>
          <div className="h-0.5 flex-1 bg-black" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-wider" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              className="w-full border-2 border-black bg-white px-4 py-3 text-sm font-bold outline-none shadow-[3px_3px_0px_#000] focus:bg-[#F6F1E8]"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-wider" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full border-2 border-black bg-white px-4 py-3 text-sm font-bold outline-none shadow-[3px_3px_0px_#000] focus:bg-[#F6F1E8]"
              required
            />
          </div>

          <div className="flex items-center justify-between gap-3 text-xs font-bold text-neutral-700">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-[#18A999]" />
              Remember me
            </label>
            <button type="button" className="font-black uppercase tracking-wider underline decoration-2 underline-offset-4">
              Forgot?
            </button>
          </div>

          <button
            type="submit"
            className="w-full border-2 border-black bg-[#18A999] px-5 py-3 text-sm font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_#000] transition-transform hover:-translate-y-0.5"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
