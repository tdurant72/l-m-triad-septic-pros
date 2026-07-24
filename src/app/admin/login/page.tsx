"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isLoading: authLoading, user, isAdmin } = useAdminAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema as any),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      // On success, the AdminAuthProvider onAuthStateChange will trigger
      // and redirect to /admin if the user is authorized.
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  // If already authenticated and authorized, redirect away from login
  if (!authLoading && user && isAdmin) {
    router.push("/admin");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-[448px] bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-12">
        <div className="text-center mb-8">
          <h1 className="font-['Manrope'] text-3xl font-black text-slate-900 mb-2 tracking-tight">
            Admin Login
          </h1>
          <p className="font-['Work_Sans'] text-slate-500 font-medium">
            Enter your credentials to access the dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 font-['Work_Sans'] text-sm flex items-start gap-3">
            <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">error</span>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50 font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all ${errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-slate-200"
                }`}
              placeholder="admin@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-['Work_Sans'] font-medium">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50 font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all ${errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-slate-200"
                }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs font-['Work_Sans'] font-medium">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || authLoading}
            className="w-full bg-brand-green text-white font-['Work_Sans'] font-semibold py-4 rounded-xl hover:bg-brand-green-dark transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-2 shadow-[0_4px_14px_rgba(14,118,59,0.25)]"
          >
            {isSubmitting || authLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
