import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowUp, Globe } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Brand Col */}
          <div className="col-span-2">
            <span className="font-black text-2xl tracking-tighter text-white">
              ATELIER<span className="text-amber-400 font-serif">.</span>
            </span>
            <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Architectural luxury essentials, crafted direct-to-consumer. We reject transient trends in favor of timeless silhouette, tactile materials, and lifetime durability.
            </p>
            <div className="mt-6 flex items-center gap-3 text-zinc-300">
              <span className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-[11px] font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                B-Corp Certified
              </span>
              <span className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-[11px] font-mono">
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
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  New Spring '26 Drops
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Minimalist Apparel
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Artisanal Footwear
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Acoustic Tech Gear
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Full-Grain Leather Bags
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Atelier Living Objects
                </a>
              </li>
            </ul>
          </div>

          {/* Client Care */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#categories" className="hover:text-amber-400 transition-colors">
                  Track Your Shipment
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-amber-400 transition-colors">
                  Prepaid Returns Portal
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-amber-400 transition-colors">
                  International Size Guides
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-amber-400 transition-colors">
                  Garment & Leather Care
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-amber-400 transition-colors">
                  Warranty & Repairs
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-amber-400 transition-colors">
                  24/7 Concierge Support
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
                <a href="#lookbook" className="hover:text-amber-400 transition-colors">
                  Design Manifesto
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-amber-400 transition-colors">
                  Tuscan Tannery Partners
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-amber-400 transition-colors">
                  Organic Textile Standards
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-amber-400 transition-colors">
                  Sustainability Report
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-amber-400 transition-colors">
                  Retail Flagships
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-amber-400 transition-colors">
                  Careers & Studio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-[11px]">
            © {new Date().getFullYear()} ATELIER STUDIOS INC. ALL RIGHTS RESERVED. CRAFTED FOR LONGEVITY.
          </p>

          {/* Secure Payment Badges */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-zinc-400">
            <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">UPI / GPay</span>
            <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">Apple Pay</span>
            <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">Visa</span>
            <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">Mastercard</span>
            <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">RuPay</span>
            <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">Amex</span>
            <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">256-Bit SSL</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
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
