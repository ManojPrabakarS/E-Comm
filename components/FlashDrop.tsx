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
    applyCoupon("ARCHIVE35");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-16 sm:py-24 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background radial accent glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-zinc-900/90 border border-zinc-800 p-8 sm:p-12 lg:p-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-amber-400 text-zinc-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
                <Flame className="w-3.5 h-3.5 fill-zinc-950" />
                <span>LIMITED ARCHIVE DROP</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4 leading-tight">
                <strong className="font-extrabold text-amber-400">Midnight</strong> Release No. 04
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 mb-8 max-w-lg leading-relaxed">
                A one-time capsule release featuring Japanese selvedge denim, heavy wool knitwear, and aerospace machined titanium hardware. Once depleted, this run will not be reproduced.
              </p>

              {/* Real-time Countdown Box */}
              <div className="flex items-center gap-3 sm:gap-4 mb-8">
                <div className="flex items-center gap-2 text-xs uppercase font-mono text-zinc-400 mr-2">
                  <Timer className="w-4 h-4 text-amber-400" />
                  <span>Ends In:</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-zinc-950 border border-zinc-800 px-3.5 py-2 rounded-xl text-center min-w-[54px]">
                    <span className="block text-xl font-bold font-mono text-white">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase font-mono text-zinc-500">Hours</span>
                  </div>
                  <span className="text-zinc-600 font-bold text-lg">:</span>
                  <div className="bg-zinc-950 border border-zinc-800 px-3.5 py-2 rounded-xl text-center min-w-[54px]">
                    <span className="block text-xl font-bold font-mono text-white">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase font-mono text-zinc-500">Mins</span>
                  </div>
                  <span className="text-zinc-600 font-bold text-lg">:</span>
                  <div className="bg-zinc-950 border border-zinc-800 px-3.5 py-2 rounded-xl text-center min-w-[54px]">
                    <span className="block text-xl font-bold font-mono text-amber-400">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase font-mono text-zinc-500">Secs</span>
                  </div>
                </div>
              </div>

              {/* Stock Meter */}
              <div className="max-w-md mb-8">
                <div className="flex justify-between text-xs text-zinc-400 font-mono mb-2">
                  <span>Batch Production: 100 Units</span>
                  <span className="text-amber-400 font-semibold">14 Units Remaining</span>
                </div>
                <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                  <div className="h-full bg-amber-400 rounded-full w-[86%] transition-all duration-1000" />
                </div>
              </div>

              {/* Coupon Copy & Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center justify-between gap-3 bg-zinc-950 hover:bg-black border border-amber-400/40 px-4 py-3 rounded-full text-xs font-mono text-zinc-200 transition-colors"
                  aria-label="Copy discount code"
                >
                  <span className="text-zinc-400">Code:</span>
                  <strong className="text-amber-400 font-bold text-sm tracking-wider">
                    ARCHIVE35
                  </strong>
                  {copied ? (
                    <span className="flex items-center gap-1 text-emerald-400 text-xs font-sans">
                      <Check className="w-3.5 h-3.5" /> Applied!
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  )}
                </button>

                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-colors"
                >
                  <span>Unlock Capsule Drop</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Product Spotlight Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-zinc-700/80 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=85&w=800"
                  alt="Limited Edition Archive Bag"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  loading="lazy"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-400">Featured Capsule Piece</p>
                    <p className="text-sm font-bold text-white">Nomad Vachetta Bag</p>
                  </div>
                  <span className="text-sm font-bold font-mono text-amber-400">35% OFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
