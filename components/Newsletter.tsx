"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { Mail, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function Newsletter() {
  const { applyCoupon, showToast } = useStore();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address", "warning");
      return;
    }

    setIsSubmitted(true);
    applyCoupon("FIRST15");
    showToast("Welcome to Atelier Society! Code FIRST15 (15% off) has been applied to your bag 🎉", "success");
  };

  return (
    <section className="py-16 sm:py-24 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/30 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ATELIER SOCIETY INVITATION</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4">
          <strong className="font-extrabold text-amber-400">Unlock 15% Off</strong> Your First Order
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Subscribers receive priority allocation on limited micro-batch releases, secret seasonal archive sales, and private lookbook previews.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-3.5 pl-11 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg transition-colors whitespace-nowrap"
              >
                <span>Join & Unlock</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-zinc-500 mt-3 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>Zero spam. Unsubscribe in one click anytime.</span>
            </p>
          </form>
        ) : (
          <div className="bg-zinc-900 border border-amber-400/40 rounded-2xl p-6 max-w-md mx-auto animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">
              Welcome to the Atelier Society!
            </h4>
            <p className="text-xs text-zinc-400 mb-4">
              Your 15% discount has been automatically activated in your bag. Use code below at checkout:
            </p>
            <div className="bg-zinc-950 border border-zinc-800 py-2 px-4 rounded-xl font-mono text-amber-400 font-bold tracking-wider inline-block">
              FIRST15
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
