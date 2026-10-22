import React from "react";
import { Truck, RotateCcw, ShieldCheck, Leaf } from "lucide-react";

export function TrustBar() {
  const usps = [
    {
      icon: Truck,
      title: "Complimentary Express Delivery",
      description: "On all orders above $75 / ₹999. Dispatched in 48h.",
    },
    {
      icon: RotateCcw,
      title: "30-Day Risk-Free Trial",
      description: "Hassle-free instant exchanges & prepaid returns.",
    },
    {
      icon: ShieldCheck,
      title: "2-Year Craftsmanship Guarantee",
      description: "Individually numbered & certified authentic materials.",
    },
    {
      icon: Leaf,
      title: "100% Carbon Neutral & Ethical",
      description: "B-Corp certified, zero virgin plastics used in packaging.",
    },
  ];

  return (
    <section className="bg-zinc-100 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {usps.map((usp, idx) => {
            const Icon = usp.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/60 dark:hover:bg-zinc-800/60 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 shadow-sm text-amber-500">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {usp.title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                    {usp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
