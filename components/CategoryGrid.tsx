"use client";

import React from "react";
import Image from "next/image";
import { CATEGORIES } from "@/data/products";
import { ArrowUpRight } from "lucide-react";

interface CategoryGridProps {
  onSelectCategory?: (category: string) => void;
}

export function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  return (
    <section id="categories" className="py-16 sm:py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
              CURATED DEPARTMENTS
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-900 dark:text-zinc-100">
              <strong className="font-extrabold text-zinc-950 dark:text-white">Shop</strong> by Category
            </h2>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 sm:mt-0 max-w-md">
            Architectural silhouettes, tactile tech, and heritage leather goods crafted without compromise.
          </p>
        </div>

        {/* Dynamic Responsive Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, index) => {
            const isLarge = index === 0;
            return (
              <a
                key={cat.id}
                href="#products"
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`group relative overflow-hidden rounded-2xl bg-zinc-900 shadow-sm transition-all duration-300 hover:shadow-xl ${
                  isLarge ? "sm:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[360px]" : "min-h-[290px]"
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

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                {/* Card Info Content */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10 text-white">
                  <div className="flex items-center justify-between">
                    <span className="bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono px-3 py-1 rounded-full uppercase tracking-wider">
                      {cat.itemCount} Items
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-zinc-950 transition-all duration-200">
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5 group-hover:text-amber-300 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 max-w-md">
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
