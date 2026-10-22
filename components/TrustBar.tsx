import React from "react";
import { Truck, RotateCcw, ShieldCheck, Leaf } from "lucide-react";

export function TrustBar() {
  const usps = [
    {
      icon: Truck,
      title: "Complimentary Express Delivery",
      description: "On all orders above ₹999 across India. Dispatched in 48 hours.",
    },
    {
      icon: RotateCcw,
      title: "30-Day Risk-Free Trial",
      description: "Hassle-free instant exchanges & prepaid global returns.",
    },
    {
      icon: ShieldCheck,
      title: "2-Year Craftsmanship Guarantee",
      description: "Individually inspected and certified authentic materials.",
    },
    {
      icon: Leaf,
      title: "100% Sustainable & Ethical",
      description: "B-Corp certified, zero virgin plastics in our packaging.",
    },
  ];

  return (
    <section className="bg-[#FAF9F5] border-y border-[#EAE8E3] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {usps.map((usp, idx) => {
            const Icon = usp.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-[20px] bg-white border border-[#EAE8E3] hover:border-[#D5D3CB] shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF3F0] border border-[#E07A5F]/20 flex items-center justify-center shrink-0 text-[#E07A5F]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#141413] tracking-tight">
                    {usp.title}
                  </h4>
                  <p className="text-[11px] text-[#5C5B57] mt-0.5 leading-relaxed">
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
