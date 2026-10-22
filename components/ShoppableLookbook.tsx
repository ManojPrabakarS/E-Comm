"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/products";
import { Plus, ArrowRight, Eye, ShoppingBag, Sparkles } from "lucide-react";

export function ShoppableLookbook() {
  const { addToCart, setQuickViewProduct, formatPrice } = useStore();
  const [activePin, setActivePin] = useState<number | null>(1);

  const hotspots = [
    {
      id: 1,
      x: "36%",
      y: "32%",
      product: PRODUCTS[0], // Heavyweight Overshirt
      label: "Studio Overshirt",
    },
    {
      id: 2,
      x: "64%",
      y: "52%",
      product: PRODUCTS[5], // Minimal Chrono Watch
      label: "Chrono 38mm",
    },
    {
      id: 3,
      x: "42%",
      y: "84%",
      product: PRODUCTS[1], // Kanso Sneaker
      label: "Kanso Low-Top",
    },
  ];

  return (
    <section id="lookbook" className="py-16 sm:py-24 bg-[#FDFDFB] border-t border-[#EAE8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#E07A5F] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EDITORIAL LOOKBOOK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#141413] leading-tight mb-5">
              <strong className="font-extrabold">Shop</strong> The Runway Uniform
            </h2>
            <p className="text-sm text-[#5C5B57] leading-relaxed mb-6 font-normal">
              A curated ensemble capturing the essence of our Spring season: heavyweight organic loopback cotton, brushed Horween leather, and Vibram-cushioned low-tops.
            </p>

            <div className="space-y-3 mb-8">
              {hotspots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => setActivePin(spot.id)}
                  className={`p-3.5 sm:p-4 rounded-[18px] border transition-all cursor-pointer flex items-center justify-between ${
                    activePin === spot.id
                      ? "border-[#E07A5F] bg-[#FAF3F0]"
                      : "border-[#EAE8E3] hover:border-[#D5D3CB] bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        activePin === spot.id
                          ? "bg-[#E07A5F] text-white"
                          : "bg-[#F2F0EB] text-[#5C5B57]"
                      }`}
                    >
                      {spot.id}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#141413]">
                        {spot.product.name}
                      </p>
                      <p className="text-xs text-[#8C8B85] font-mono">
                        {formatPrice(spot.product.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(spot.product);
                      }}
                      className="p-1.5 text-[#5C5B57] hover:text-[#141413] rounded-lg hover:bg-[#F2F0EB]"
                      aria-label="Quick view"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(spot.product);
                      }}
                      className="p-1.5 bg-[#141413] text-white rounded-lg hover:bg-[#E07A5F] transition-colors"
                      aria-label="Add to bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#products"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#141413] hover:text-[#E07A5F] transition-colors group uppercase tracking-wider"
            >
              <span>Explore Complete Spring Uniform</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right Interactive Hotspot Image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-[#EAE8E3]">
              <Image
                src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=85&w=1200"
                alt="Editorial Shoppable Lookbook"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                loading="lazy"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

              {/* Hotspot Pins */}
              {hotspots.map((spot) => {
                const isActive = activePin === spot.id;
                return (
                  <div
                    key={spot.id}
                    className="absolute z-20"
                    style={{ left: spot.x, top: spot.y }}
                  >
                    {/* Pulsing Pin Button */}
                    <button
                      onClick={() => setActivePin(isActive ? null : spot.id)}
                      className={`relative w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition-transform duration-200 ${
                        isActive
                          ? "bg-[#E07A5F] text-white scale-125 ring-4 ring-[#E07A5F]/30"
                          : "bg-[#141413] text-white hover:scale-110"
                      }`}
                      aria-label={`View ${spot.label}`}
                    >
                      <span className="absolute inset-0 rounded-full bg-[#E07A5F]/40 animate-ping opacity-75 pointer-events-none" />
                      <span>{spot.id}</span>
                    </button>

                    {/* Popover Card */}
                    {isActive && (
                      <div className="absolute left-9 -top-8 w-56 bg-white text-[#141413] border border-[#EAE8E3] rounded-2xl p-3 shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-150">
                        <p className="text-[9px] text-[#8C8B85] uppercase font-mono font-bold">
                          {spot.product.categoryLabel}
                        </p>
                        <p className="text-xs font-bold text-[#141413] line-clamp-1 mt-0.5">
                          {spot.product.name}
                        </p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0EFEB]">
                          <span className="text-xs font-mono font-bold text-[#E07A5F]">
                            {formatPrice(spot.product.price)}
                          </span>
                          <button
                            onClick={() => addToCart(spot.product)}
                            className="bg-[#141413] hover:bg-[#E07A5F] text-white text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors"
                          >
                            + Add to Bag
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
