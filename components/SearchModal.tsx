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
    "Headphones",
    "Leather Weekender",
    "Wool Trouser",
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

      {/* Search Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Search Header Input */}
        <div className="relative p-4 sm:p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product name, fabric, or category..."
            className="w-full bg-transparent text-base sm:text-lg text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block font-mono text-[11px] text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Trending Suggestions */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
          <span className="text-zinc-400 font-mono text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Popular:
          </span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-amber-400 text-zinc-700 dark:text-zinc-300 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-zinc-100 dark:divide-zinc-800">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 text-xs">
              No products found matching &ldquo;{query}&rdquo;. Try another term.
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => handleSelectProduct(p)}
                className="py-3 px-2 flex items-center justify-between gap-4 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-zinc-200 shrink-0">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500">
                      {p.categoryLabel}
                    </span>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-amber-500 transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-1">{p.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold font-mono text-zinc-900 dark:text-white">
                    {formatPrice(p.price)}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors">
                    <ArrowRight className="w-4 h-4" />
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
