import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowUp, Globe, Sparkles } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#141413] text-[#8C8B85] border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Brand Col */}
          <div className="col-span-2">
            <span className="font-extrabold text-2xl tracking-tight text-white">
              MP<span className="text-[#E07A5F]">.</span>Store
            </span>
            <p className="mt-3 text-xs sm:text-sm text-[#A6A49F] leading-relaxed max-w-sm font-normal">
              Direct-to-consumer luxury essentials. Inspired by modern silhouettes, tactile raw natural fabrics, and Portuguese shoemaking mastery.
            </p>
            <div className="mt-6 flex items-center gap-3 text-zinc-300">
              <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-[10px] font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFAE98]" />
                B-Corp Certified
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-[10px] font-mono">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                Carbon Neutral
              </span>
            </div>
          </div>

          {/* Shop Col */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">
              Catalogue
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Spring &apos;26 Runway
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Minimalist Apparel
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Artisanal Footwear
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Leather Weekender Bags
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Atelier Living Scents
                </a>
              </li>
            </ul>
          </div>

          {/* Client Care */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">
              Client Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Track Your Shipment
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Prepaid Returns Portal
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  International Sizing
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Garment & Leather Care
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  24/7 Personal Concierge
                </a>
              </li>
            </ul>
          </div>

          {/* About & Craft */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">
              Atelier Heritage
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#lookbook" className="hover:text-white transition-colors">
                  Design Manifesto
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-white transition-colors">
                  Tuscan Tannery Partners
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-white transition-colors">
                  GOTS Organic Standards
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-white transition-colors">
                  Sustainability Audit
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-white transition-colors">
                  MP.Store Design Studio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8C8B85] text-[11px]">
            © 2026 MP.STORE INC. ALL RIGHTS RESERVED. CRAFTED FOR MODERN LIVING.
          </p>

          {/* Secure Payment Badges */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-[#A6A49F]">
            <span className="bg-white/10 border border-white/15 px-2 py-0.5 rounded">Apple Pay</span>
            <span className="bg-white/10 border border-white/15 px-2 py-0.5 rounded">UPI / GPay</span>
            <span className="bg-white/10 border border-white/15 px-2 py-0.5 rounded">Visa</span>
            <span className="bg-white/10 border border-white/15 px-2 py-0.5 rounded">Mastercard</span>
            <span className="bg-white/10 border border-white/15 px-2 py-0.5 rounded">RuPay</span>
            <span className="bg-white/10 border border-white/15 px-2 py-0.5 rounded">Amex</span>
            <span className="bg-white/10 border border-white/15 px-2 py-0.5 rounded">256-Bit SSL</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#A6A49F] hover:text-white transition-colors"
            aria-label="Back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
