"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { Sparkles, Timer, Copy, Check, ArrowRight, Flame } from "lucide-react";

export function FlashDrop() {
  const { applyCoupon, showToast } = useStore();
  const [copied, setCopied] = useState(false);

  // Countdown timer: 14 hours, 32 mins, 45 seconds from now
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 14, minutes: 30, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    applyCoupon("MP20");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FDFDFB] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#1C1B19] border border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle warm glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#E07A5F]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#D4A373]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-[#E07A5F]/20 border border-[#E07A5F]/30 text-[#FFAE98] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
                <Flame className="w-3.5 h-3.5 text-[#FFAE98]" />
                <span>LIMITED SPRING CAPSULE DROP</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4 leading-tight">
                <strong className="font-extrabold text-white">The Silk & Wool</strong> Archive Edit
              </h2>

              <p className="text-sm sm:text-base text-white/75 mb-8 max-w-lg leading-relaxed font-normal">
                Curated by MP.Store. A strictly limited micro-batch of structured blazers, raw loopback overshirts, and Tuscan vachetta accessories. Once sold out, this edition will not be recut.
              </p>

              {/* Real-time Countdown Box */}
              <div className="flex items-center gap-3 sm:gap-4 mb-8">
                <div className="flex items-center gap-1.5 text-xs uppercase font-mono text-white/60 mr-1">
                  <Timer className="w-4 h-4 text-[#FFAE98]" />
                  <span>Drop Closes In:</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-white/10 border border-white/15 px-3.5 py-2 rounded-2xl text-center min-w-[54px] backdrop-blur-sm">
                    <span className="block text-xl font-bold font-mono text-white">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase font-mono text-white/60">Hours</span>
                  </div>
                  <span className="text-white/40 font-bold text-lg">:</span>
                  <div className="bg-white/10 border border-white/15 px-3.5 py-2 rounded-2xl text-center min-w-[54px] backdrop-blur-sm">
                    <span className="block text-xl font-bold font-mono text-white">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase font-mono text-white/60">Mins</span>
                  </div>
                  <span className="text-white/40 font-bold text-lg">:</span>
                  <div className="bg-white/10 border border-white/15 px-3.5 py-2 rounded-2xl text-center min-w-[54px] backdrop-blur-sm">
                    <span className="block text-xl font-bold font-mono text-[#FFAE98]">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase font-mono text-white/60">Secs</span>
                  </div>
                </div>
              </div>

              {/* Stock Meter */}
              <div className="max-w-md mb-8">
                <div className="flex justify-between text-xs text-white/70 font-mono mb-2">
                  <span>Batch Run: 100 Units</span>
                  <span className="text-[#FFAE98] font-semibold">14 Units Remaining</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/15">
                  <div className="h-full bg-gradient-to-r from-[#E07A5F] to-[#FFAE98] rounded-full w-[86%] transition-all duration-1000" />
                </div>
              </div>

              {/* Coupon Copy & Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center justify-between gap-3 bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-3 rounded-full text-xs font-mono text-white transition-colors backdrop-blur-sm"
                  aria-label="Copy discount code"
                >
                  <span className="text-white/60">Code:</span>
                  <strong className="text-[#FFAE98] font-bold text-sm tracking-wider">
                    MP20
                  </strong>
                  {copied ? (
                    <span className="flex items-center gap-1 text-emerald-400 text-xs font-sans">
                      <Check className="w-3.5 h-3.5" /> Applied!
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-white/60" />
                  )}
                </button>

                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 bg-[#FDFDFB] hover:bg-white text-[#141413] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-xl transition-all"
                >
                  <span>Claim Seasonal Capsule</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Product Spotlight Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square w-full rounded-[24px] overflow-hidden border border-white/15 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=85&w=800"
                  alt="Limited Edition Archive Bag"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  loading="lazy"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-70" />

                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-white/60 uppercase font-mono">Featured Archive Piece</p>
                    <p className="text-sm font-bold text-white">Nomad Leather Weekender</p>
                  </div>
                  <span className="text-xs font-bold font-mono bg-[#E07A5F] text-white px-2.5 py-1 rounded-full">
                    20% OFF
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
