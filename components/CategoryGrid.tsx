"use client";

import React from "react";
import Image from "next/image";
import { CATEGORIES } from "@/data/products";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface CategoryGridProps {
  onSelectCategory?: (category: string) => void;
}

export function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  return (
    <section id="categories" className="py-16 sm:py-20 bg-[#FDFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#E07A5F] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CURATED COLLECTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#141413]">
              <strong className="font-extrabold text-[#141413]">Explore</strong> by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C5B57] mt-2 sm:mt-0 max-w-md">
            From relaxed everyday layers to handcrafted leather goods, discover signature pieces designed for longevity.
          </p>
        </div>

        {/* Dynamic Responsive Category Grid — 24px Rounded Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, index) => {
            const isLarge = index === 0;
            return (
              <a
                key={cat.id}
                href="#products"
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`group relative overflow-hidden rounded-[24px] bg-[#F2F0EB] shadow-sm transition-all duration-300 hover:shadow-lg border border-[#EAE8E3] ${
                  isLarge ? "sm:col-span-2 lg:col-span-2 min-h-[340px]" : "min-h-[280px]"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-80 group-hover:opacity-85 transition-opacity" />

                {/* Card Info Content */}
                <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between z-10 text-white">
                  <div className="flex items-center justify-between">
                    <span className="bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-wider">
                      {cat.itemCount} Items
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-[#FDFDFB] group-hover:text-[#141413] transition-all duration-200">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1 group-hover:text-[#FFAE98] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2 max-w-md font-normal">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
