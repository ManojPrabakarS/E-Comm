"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/products";
import { Plus, ArrowRight, Eye, ShoppingBag } from "lucide-react";

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
    <section id="lookbook" className="py-16 sm:py-24 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2 block">
              THE EDITORIAL LOOKBOOK
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-950 dark:text-white leading-tight mb-6">
              <strong className="font-extrabold">Shop</strong> The Uniform
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              Our seasonal lookbook brings together the full ecosystem: tactile heavy gauge knits, raw selvedge cotton, and hand-finished footwear engineered for the modern nomad.
            </p>

            <div className="space-y-3 mb-8">
              {hotspots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => setActivePin(spot.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    activePin === spot.id
                      ? "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50 dark:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        activePin === spot.id
                          ? "bg-amber-400 text-zinc-950"
                          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {spot.id}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {spot.product.name}
                      </p>
                      <p className="text-xs text-zinc-500 font-mono">
                        {formatPrice(spot.product.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(spot.product);
                      }}
                      className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800"
                      aria-label="Quick view"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(spot.product);
                      }}
                      className="p-1.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-lg hover:bg-amber-400 hover:text-zinc-950 transition-colors"
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
              className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white hover:text-amber-500 transition-colors group"
            >
              <span>Explore Complete Spring Uniform</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right Interactive Hotspot Image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
              <Image
                src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=85&w=1200"
                alt="Editorial Shoppable Lookbook"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                loading="lazy"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent pointer-events-none" />

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
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition-transform duration-200 ${
                        isActive
                          ? "bg-amber-400 text-zinc-950 scale-125 ring-4 ring-amber-400/30"
                          : "bg-zinc-950 text-white hover:scale-110"
                      }`}
                      aria-label={`View ${spot.label}`}
                    >
                      <span className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping opacity-75 pointer-events-none" />
                      <span>{spot.id}</span>
                    </button>

                    {/* Popover Card */}
                    {isActive && (
                      <div className="absolute left-10 -top-8 w-56 bg-zinc-950 text-white border border-zinc-800 rounded-xl p-3 shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-150">
                        <p className="text-[10px] text-zinc-400 uppercase font-mono">
                          {spot.product.categoryLabel}
                        </p>
                        <p className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                          {spot.product.name}
                        </p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800">
                          <span className="text-xs font-mono font-bold text-amber-400">
                            {formatPrice(spot.product.price)}
                          </span>
                          <button
                            onClick={() => addToCart(spot.product)}
                            className="bg-amber-400 hover:bg-amber-300 text-zinc-950 text-[10px] font-bold px-2 py-1 rounded"
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
