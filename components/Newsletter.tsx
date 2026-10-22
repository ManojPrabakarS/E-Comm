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
    applyCoupon("WELCOME15");
    showToast("Welcome to MP.Store! Code WELCOME15 (15% off) has been applied to your bag 🎉", "success");
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FDFDFB] text-[#141413] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#FAF9F5] border border-[#EAE8E3] p-8 sm:p-14 shadow-sm overflow-hidden">
          {/* Subtle warm glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#E07A5F]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 bg-[#E07A5F]/15 border border-[#E07A5F]/20 text-[#E07A5F] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE ATELIER SOCIETY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#141413] mb-4">
            <strong className="font-extrabold text-[#141413]">Unlock 15% Off</strong> Your First Order
          </h2>

          <p className="text-xs sm:text-sm text-[#5C5B57] max-w-lg mx-auto mb-8 leading-relaxed font-normal">
            Join our private circle for early runway drop notifications, seasonal lookbook access, and complimentary tailoring consultations.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#8C8B85] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full bg-white border border-[#EAE8E3] rounded-full py-3.5 pl-11 pr-4 text-xs sm:text-sm text-[#141413] placeholder-[#8C8B85] focus:outline-none focus:border-[#141413] transition-colors shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#141413] hover:bg-[#2C2C2B] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg transition-colors whitespace-nowrap"
                >
                  <span>Join & Unlock</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-[#8C8B85] mt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5C5B57]" />
                <span>Zero spam. Unsubscribe in one click anytime.</span>
              </p>
            </form>
          ) : (
            <div className="bg-white border border-[#E07A5F]/30 rounded-[20px] p-6 max-w-md mx-auto animate-in zoom-in-95 duration-200 shadow-md">
              <CheckCircle2 className="w-8 h-8 text-[#E07A5F] mx-auto mb-3" />
              <h4 className="text-sm sm:text-base font-bold text-[#141413] mb-1">
                Welcome to the Atelier Society!
              </h4>
              <p className="text-xs text-[#5C5B57] mb-4">
                Your 15% discount has been activated in your bag. Use code below at checkout:
              </p>
              <div className="bg-[#FAF3F0] border border-[#E07A5F]/30 py-2 px-5 rounded-full font-mono text-[#E07A5F] font-bold tracking-wider inline-block text-xs">
                WELCOME15
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
