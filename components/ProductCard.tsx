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
      className="group relative flex flex-col bg-white border border-[#EAE8E3] rounded-[22px] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#D5D3CB]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 4:5 Aspect Ratio Image Container — Light Well */}
      <div
        className="relative aspect-[4/5] w-full bg-[#F6F5F1] overflow-hidden cursor-pointer"
        onClick={handleQuickView}
      >
        <Image
          src={displayImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges — Pill Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
                product.badge === "BESTSELLER"
                  ? "bg-[#141413] text-white"
                  : product.badge === "NEW DROP"
                  ? "bg-[#E07A5F] text-white"
                  : product.badge === "SALE"
                  ? "bg-[#E63946] text-white"
                  : "bg-[#2D6A4F] text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.discountPercent && (
            <span className="bg-[#E63946] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full w-fit shadow-sm">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Top-Right Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
              wishlisted
                ? "bg-[#E07A5F] text-white scale-110"
                : "bg-white/95 text-[#5C5B57] hover:text-[#E07A5F] hover:bg-white"
            }`}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-white" : ""}`} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={handleQuickView}
            className="w-8 h-8 rounded-full bg-white/95 text-[#5C5B57] hover:text-[#141413] hover:bg-white flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0"
            aria-label="Quick preview"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Floating Quick Add Pill Button on Hover */}
        <div className="absolute bottom-3 inset-x-3 z-10 transition-all duration-300 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-[#141413] hover:bg-[#2C2C2B] text-white text-xs font-bold py-2.5 px-4 rounded-full shadow-xl flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>+ Quick Add ({currentColor.name})</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between text-xs text-[#8C8B85] mb-1">
            <span className="uppercase font-mono tracking-wider text-[9px] font-semibold">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 font-medium text-[#141413]">
              <Star className="w-3.5 h-3.5 fill-[#D4A373] text-[#D4A373]" />
              <span className="text-xs font-semibold">{product.rating}</span>
              <span className="text-[#8C8B85] text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={handleQuickView}
            className="font-bold text-sm sm:text-base text-[#141413] tracking-tight hover:text-[#E07A5F] cursor-pointer transition-colors line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-[#5C5B57] mt-0.5 line-clamp-1 font-normal">
            {product.tagline}
          </p>

          {/* Interactive Color Swatches */}
          <div className="flex items-center gap-1.5 mt-3">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-3.5 h-3.5 rounded-full border transition-all duration-150 ${
                  selectedColorIndex === idx
                    ? "ring-2 ring-[#141413] ring-offset-2 border-transparent scale-110"
                    : "border-zinc-300 hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select color ${color.name}`}
              />
            ))}
            <span className="text-[10px] text-[#8C8B85] ml-1">
              {product.colors.length} shades
            </span>
          </div>
        </div>

        {/* Pricing and Stock Note */}
        <div className="flex items-baseline justify-between mt-4 pt-3 border-t border-[#F0EFEB]">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#141413] font-mono">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#8C8B85] line-through font-mono">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {product.stockLeft && product.stockLeft < 10 ? (
            <span className="text-[10px] font-semibold text-[#E07A5F]">
              Only {product.stockLeft} left
            </span>
          ) : (
            <span className="text-[10px] text-[#2D6A4F] font-semibold flex items-center gap-0.5">
              <Check className="w-3 h-3" /> In Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
