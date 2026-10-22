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
    { id: "accessories", label: "Leather & Carry" },
    { id: "tech", label: "Acoustics & Tech" },
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
    <section id="products" className="py-16 sm:py-24 bg-[#FAF9F5] border-t border-[#EAE8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#E07A5F] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SEASONAL HIGHLIGHTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#141413]">
              <strong className="font-extrabold text-[#141413]">Curated</strong> Spring Silhouettes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C5B57] mt-2 sm:mt-0 max-w-md">
            Hand-finished in small artisan batches. Pure natural textiles, vegetable-tanned leather, and timeless ease.
          </p>
        </div>

        {/* Filter Controls Bar — Pill Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-5 border-b border-[#EAE8E3]">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-[#141413] text-white shadow-sm"
                      : "bg-white text-[#5C5B57] hover:text-[#141413] hover:bg-[#F2F0EB] border border-[#EAE8E3]"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-[#E07A5F]" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sort & Count Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-xs text-[#8C8B85] font-mono">
              {filteredProducts.length} styles
            </span>

            <div className="flex items-center gap-2 bg-white border border-[#EAE8E3] rounded-full px-3.5 py-1.5 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C8B85] shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[#141413] font-medium focus:outline-none cursor-pointer"
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
