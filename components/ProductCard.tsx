"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/ecommerce";
import { useStore } from "@/context/StoreContext";
import { Heart, Eye, ShoppingBag, Star, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    setQuickViewProduct,
    formatPrice,
  } = useStore();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const displayImage =
    isHovered && product.images[1] ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, currentColor, product.sizes[0]);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 4:5 Aspect Ratio Image Container */}
      <div className="relative aspect-[4/5] w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden cursor-pointer" onClick={handleQuickView}>
        <Image
          src={displayImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm ${
                product.badge === "BESTSELLER"
                  ? "bg-amber-400 text-zinc-950"
                  : product.badge === "NEW DROP"
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                  : product.badge === "SALE"
                  ? "bg-rose-500 text-white"
                  : "bg-emerald-500 text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.discountPercent && (
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md w-fit">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Top-Right Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
              wishlisted
                ? "bg-rose-500 text-white scale-110"
                : "bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 hover:text-rose-500 hover:bg-white dark:hover:bg-zinc-900"
            }`}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? "fill-white" : ""}`} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={handleQuickView}
            className="w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 hover:text-amber-500 hover:bg-white dark:hover:bg-zinc-900 flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0"
            aria-label="Quick preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Hover Quick Add to Bag Bar */}
        <div className="absolute bottom-3 inset-x-3 z-10 transition-all duration-300 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-zinc-950 hover:bg-amber-400 hover:text-zinc-950 text-white dark:bg-white dark:hover:bg-amber-400 dark:text-zinc-950 text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Quick Add ({currentColor.name})</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">
            <span className="uppercase font-mono tracking-wider text-[10px]">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 font-medium text-zinc-800 dark:text-zinc-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={handleQuickView}
            className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white tracking-tight hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer transition-colors line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
            {product.tagline}
          </p>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5 mt-3">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-4 h-4 rounded-full border transition-all duration-150 ${
                  selectedColorIndex === idx
                    ? "ring-2 ring-amber-400 ring-offset-2 dark:ring-offset-zinc-900 border-transparent scale-110"
                    : "border-zinc-300 dark:border-zinc-700 hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select color ${color.name}`}
              />
            ))}
            <span className="text-[11px] text-zinc-400 ml-1">
              {product.colors.length} shades
            </span>
          </div>
        </div>

        {/* Pricing and Stock Note */}
        <div className="flex items-baseline justify-between mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white font-mono">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-400 line-through font-mono">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {product.stockLeft && product.stockLeft < 10 ? (
            <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
              Only {product.stockLeft} left
            </span>
          ) : (
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
              <Check className="w-3 h-3" /> In Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
