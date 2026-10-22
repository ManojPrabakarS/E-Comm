"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SlidersHorizontal, Sparkles, Flame, Tag } from "lucide-react";

interface ProductGridProps {
  initialCategory?: string;
}

export function ProductGrid({ initialCategory = "all" }: ProductGridProps) {
  const [activeTab, setActiveTab] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const filterTabs = [
    { id: "all", label: "All Items" },
    { id: "apparel", label: "Apparel" },
    { id: "footwear", label: "Footwear" },
    { id: "tech", label: "Acoustics & Tech" },
    { id: "accessories", label: "Leather & Carry" },
    { id: "bestsellers", label: "Best Sellers", icon: Flame },
    { id: "sale", label: "On Sale", icon: Tag },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeTab === "bestsellers") {
      result = result.filter((p) => p.badge === "BESTSELLER");
    } else if (activeTab === "sale") {
      result = result.filter((p) => p.discountPercent && p.discountPercent > 0);
    } else if (activeTab !== "all") {
      result = result.filter((p) => p.category === activeTab);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeTab, sortBy]);

  return (
    <section id="products" className="py-16 sm:py-24 bg-zinc-50/70 dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COLLECTION SHOWCASE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-900 dark:text-zinc-100">
              <strong className="font-extrabold text-zinc-950 dark:text-white">Trending</strong> Essentials
            </h2>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 sm:mt-0 max-w-md">
            Uncompromising utility meets architectural restraint. Each silhouette is produced in limited micro-batches.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-5 border-b border-zinc-200 dark:border-zinc-800">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                      : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sort & Count Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              {filteredProducts.length} items
            </span>

            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-zinc-800 dark:text-zinc-200 font-medium focus:outline-none cursor-pointer"
                aria-label="Sort products"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
