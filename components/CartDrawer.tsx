"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Tag,
} from "lucide-react";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    appliedCoupon,
    discountRate,
    applyCoupon,
    removeCoupon,
    formatPrice,
    showToast,
  } = useStore();

  const [couponInput, setCouponInput] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isCartOpen) return null;

  // Free shipping threshold = ₹999 (Indian Rupees)
  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const shippingPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  const discountAmount = cartTotal * discountRate;
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
    setCouponInput("");
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      clearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over panel — Clean White Well */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-[#EAE8E3]">
        {/* Header */}
        <div className="p-5 border-b border-[#EAE8E3] flex items-center justify-between bg-[#FDFDFB]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#141413]" />
            <h3 className="font-bold text-sm sm:text-base text-[#141413]">
              Your Shopping Bag ({cartCount})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#8C8B85] hover:text-[#141413] rounded-full hover:bg-[#F2F0EB] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-[#FAF9F5] p-4 border-b border-[#EAE8E3]">
          <div className="flex items-center justify-between text-xs font-medium mb-1.5">
            {remainingForFreeShipping > 0 ? (
              <span className="text-[#5C5B57]">
                Add <strong className="text-[#E07A5F] font-mono">{formatPrice(remainingForFreeShipping)}</strong> more for <strong>FREE Express Delivery</strong>
              </span>
            ) : (
              <span className="text-[#2D6A4F] font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> You unlocked Free Global Express Delivery!
              </span>
            )}
            <span className="text-[10px] font-mono text-[#8C8B85]">
              {Math.round(shippingPercent)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#EAE8E3] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                remainingForFreeShipping === 0 ? "bg-[#2D6A4F]" : "bg-[#E07A5F]"
              }`}
              style={{ width: `${shippingPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F0EFEB]">
          {checkoutSuccess ? (
            <div className="text-center py-16 px-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#FAF3F0] text-[#E07A5F] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#141413] mb-2">
                Order Confirmed!
              </h4>
              <p className="text-xs text-[#5C5B57] max-w-xs mb-6">
                Thank you for shopping with MP.Store. Order #MP-84729 has been placed via Instant UPI/Cash On Delivery and is being hand-packed.
              </p>
              <button
                onClick={() => {
                  setCheckoutSuccess(false);
                  setIsCartOpen(false);
                }}
                className="bg-[#141413] hover:bg-[#2C2C2B] text-white text-xs font-bold px-7 py-3 rounded-full transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 px-4">
              <ShoppingBag className="w-12 h-12 text-[#D5D3CB] mx-auto mb-3" />
              <p className="text-sm font-bold text-[#141413]">
                Your bag is empty
              </p>
              <p className="text-xs text-[#8C8B85] mt-1 mb-6">
                Explore our Spring collection to curate your look.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-[#141413] text-white text-xs font-bold px-6 py-2.5 rounded-full"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`} className="py-4 flex gap-4">
                {/* Thumbnail */}
                <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-[#F6F5F1] shrink-0 border border-[#EAE8E3]">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-bold text-[#141413] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() =>
                          removeFromCart(
                            item.product.id,
                            item.selectedColor.name,
                            item.selectedSize
                          )
                        }
                        className="text-[#8C8B85] hover:text-[#E63946] p-0.5 ml-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#5C5B57] mt-1">
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-zinc-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                      <span>·</span>
                      <span>Size: {item.selectedSize}</span>
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#EAE8E3] rounded-full overflow-hidden bg-[#FDFDFB]">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedColor.name,
                            item.selectedSize,
                            item.quantity - 1
                          )
                        }
                        className="p-1 hover:bg-[#F2F0EB] text-[#5C5B57] px-2"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-[#141413]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedColor.name,
                            item.selectedSize,
                            item.quantity + 1
                          )
                        }
                        className="p-1 hover:bg-[#F2F0EB] text-[#5C5B57] px-2"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold font-mono text-[#141413]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {!checkoutSuccess && cart.length > 0 && (
          <div className="p-5 border-t border-[#EAE8E3] bg-[#FDFDFB] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#8C8B85] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Coupon (e.g. MP20)"
                  className="w-full bg-white border border-[#EAE8E3] rounded-full py-2 pl-9 pr-3 text-xs text-[#141413] uppercase font-mono placeholder:normal-case placeholder:font-sans focus:outline-none focus:border-[#141413]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#141413] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#2C2C2B] transition-colors"
              >
                Apply
              </button>
            </form>

            {/* Active Coupon Badge */}
            {appliedCoupon && (
              <div className="flex items-center justify-between bg-[#FAF3F0] border border-[#E07A5F]/20 px-3.5 py-1.5 rounded-full text-xs">
                <span className="font-mono text-[#E07A5F] font-bold text-[11px]">
                  Code: {appliedCoupon} ({discountRate * 100}% Off)
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-[#E07A5F] hover:text-[#C86A50] text-[10px] underline"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#5C5B57] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#141413]">{formatPrice(cartTotal)}</span>
              </div>
              {discountRate > 0 && (
                <div className="flex justify-between text-[#E07A5F] font-medium">
                  <span>Promo Discount</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-[#2D6A4F] font-medium">
                  {remainingForFreeShipping === 0 ? "FREE Express" : formatPrice(15)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#141413] pt-2 border-t border-[#EAE8E3]">
                <span>Estimated Total</span>
                <span className="font-mono text-base text-[#141413]">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleSimulateCheckout}
              disabled={isCheckingOut}
              className="w-full bg-[#141413] hover:bg-[#2C2C2B] text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-full shadow-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-75"
            >
              {isCheckingOut ? (
                <span>Securing Order...</span>
              ) : (
                <>
                  <span>Proceed to Express Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[10px] text-[#8C8B85] text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5C5B57]" />
              <span>256-Bit SSL Encrypted · 30-Day Easy Returns</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
