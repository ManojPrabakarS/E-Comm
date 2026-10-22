"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/products";
import { Search, X, ArrowRight, Star, Sparkles } from "lucide-react";

export function SearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setQuickViewProduct,
    formatPrice,
  } = useStore();

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const trendingTags = [
    "Overshirt",
    "Sneakers",
    "Weekender",
    "Wool Trouser",
    "Chrono Watch",
    "Diffuser",
  ];

  // Auto focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  // Global key listener for ⌘K / Ctrl+K and ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) => {
    const searchString = `${p.name} ${p.tagline} ${p.categoryLabel} ${p.description}`.toLowerCase();
    return searchString.includes(query.toLowerCase().trim());
  });

  const handleSelectProduct = (product: typeof PRODUCTS[0]) => {
    setIsSearchOpen(false);
    setQuickViewProduct(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 sm:pt-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Search Container — Clean White Style */}
      <div className="relative w-full max-w-2xl bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl border border-[#EAE8E3] z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Search Header Input */}
        <div className="relative p-4 sm:p-5 border-b border-[#EAE8E3] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8C8B85] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search silhouettes, natural fabrics, or collections..."
            className="w-full bg-transparent text-base sm:text-lg text-[#141413] placeholder-[#8C8B85] focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="text-[#8C8B85] hover:text-[#141413] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block font-mono text-[10px] text-[#8C8B85] bg-[#F2F0EB] border border-[#EAE8E3] px-2 py-0.5 rounded-full">
              ESC
            </kbd>
          )}
        </div>

        {/* Trending Suggestions */}
        <div className="p-3.5 sm:p-4 bg-[#FAF9F5] border-b border-[#EAE8E3] flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
          <span className="text-[#8C8B85] font-mono text-[10px] uppercase tracking-wider shrink-0 flex items-center gap-1 font-bold">
            <Sparkles className="w-3 h-3 text-[#E07A5F]" /> Trending:
          </span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="bg-white border border-[#EAE8E3] hover:border-[#141413] text-[#5C5B57] hover:text-[#141413] px-3 py-1 rounded-full whitespace-nowrap transition-colors text-[11px]"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-[#F0EFEB]">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-[#8C8B85] text-xs">
              No pieces found matching &ldquo;{query}&rdquo;. Try another search term.
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => handleSelectProduct(p)}
                className="py-3 px-2 flex items-center justify-between gap-4 rounded-xl hover:bg-[#FAF9F5] cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-[#F6F5F1] shrink-0 border border-[#EAE8E3]">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#E07A5F] font-bold">
                      {p.categoryLabel}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#141413] group-hover:text-[#E07A5F] transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-[#8C8B85] line-clamp-1">{p.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-bold font-mono text-[#141413]">
                    {formatPrice(p.price)}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#F2F0EB] flex items-center justify-center text-[#5C5B57] group-hover:bg-[#141413] group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
