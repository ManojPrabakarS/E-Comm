"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import {
  X,
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Heart,
  Plus,
  Minus,
} from "lucide-react";

export function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatPrice,
  } = useStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImageIndex(0);
      setSelectedColorIndex(0);
      setSelectedSize(quickViewProduct.sizes[0] || "");
      setQuantity(1);
    }
  }, [quickViewProduct]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuickViewProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isWishlisted(product.id);
  const currentColor = product.colors[selectedColorIndex] || product.colors[0];

  const handleAdd = () => {
    addToCart(product, currentColor, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog — Clean White Style */}
      <div className="relative w-full max-w-4xl bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl overflow-hidden z-10 border border-[#EAE8E3] animate-in zoom-in-95 duration-200 my-auto">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/95 text-[#5C5B57] hover:text-[#141413] flex items-center justify-center shadow-md transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Media Column */}
          <div className="p-6 bg-[#F6F5F1] flex flex-col justify-between">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-sm bg-white">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center"
              />
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2.5 mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? "border-[#141413] scale-105"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category, Rating, Scarcity */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E07A5F] font-bold">
                  {product.categoryLabel}
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-[#141413]">
                  <Star className="w-3.5 h-3.5 fill-[#D4A373] text-[#D4A373]" />
                  <span>{product.rating}</span>
                  <span className="text-[#8C8B85]">({product.reviewCount})</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#141413] tracking-tight mb-1">
                {product.name}
              </h2>
              <p className="text-xs text-[#5C5B57] mb-4">
                {product.tagline}
              </p>

              {/* Price & Badges */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F0EFEB]">
                <span className="text-2xl font-bold font-mono text-[#141413]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-[#8C8B85] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="bg-[#E63946] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Color Selection */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-[#141413] uppercase tracking-wider mb-2">
                  Color: <span className="font-normal text-[#5C5B57]">{currentColor.name}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        selectedColorIndex === idx
                          ? "ring-2 ring-[#141413] ring-offset-2 border-white scale-110"
                          : "border-zinc-300 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#141413] uppercase tracking-wider">
                    Select Size
                  </label>
                  <button className="text-[11px] text-[#8C8B85] hover:text-[#141413] underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] py-2 px-3 text-xs font-semibold rounded-full border transition-all ${
                        selectedSize === size
                          ? "bg-[#141413] text-white border-transparent shadow-sm"
                          : "border-[#EAE8E3] text-[#5C5B57] hover:border-[#141413]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <p className="text-xs text-[#5C5B57] leading-relaxed mb-3">
                  {product.description}
                </p>
                <ul className="space-y-1.5 text-xs text-[#5C5B57]">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#F0EFEB] space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#EAE8E3] rounded-full overflow-hidden bg-[#FDFDFB] h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 hover:bg-[#F2F0EB] text-[#5C5B57] h-full"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-[#141413]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 hover:bg-[#F2F0EB] text-[#5C5B57] h-full"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 h-12 bg-[#141413] hover:bg-[#2C2C2B] text-white font-bold text-xs sm:text-sm rounded-full shadow-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag · {formatPrice(product.price * quantity)}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                    wishlisted
                      ? "bg-[#FAF3F0] border-[#E07A5F]/30 text-[#E07A5F]"
                      : "border-[#EAE8E3] text-[#5C5B57] hover:text-[#E07A5F]"
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? "fill-[#E07A5F]" : ""}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 text-[10px] text-[#8C8B85] text-center pt-2">
                <span className="flex items-center justify-center gap-1">
                  <Truck className="w-3 h-3 text-[#E07A5F]" /> Free Delivery
                </span>
                <span className="flex items-center justify-center gap-1">
                  <RotateCcw className="w-3 h-3 text-[#E07A5F]" /> 30-Day Returns
                </span>
                <span className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#E07A5F]" /> 2-Yr Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
