"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#07182F] via-[#0F2D52] to-[#173C66] px-6">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />

      {/* Login Card */}

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl shadow-2xl">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-slate-400 transition hover:text-cyan-400"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="flex justify-center">
          <Image
            src="/technobitslogo.png"
            alt="TECHNOBITS"
            width={140}
            height={140}
            priority
          />
        </div>

        <h1 className="mt-8 text-center text-4xl font-black text-white">
          Welcome Back
        </h1>

        <p className="mt-4 text-center leading-7 text-slate-300">
          Sign in to access discussions, tutorials, events,
          fundraising, and exclusive TECHNOBITS resources.
        </p>

        <div className="mt-10 flex justify-center">
          <GoogleLoginButton />
        </div>

      </div>

    </main>
  );
}