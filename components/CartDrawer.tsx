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

  // Free shipping threshold = $75
  const freeShippingThreshold = 75;
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

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-zinc-200 dark:border-zinc-800">
        {/* Header */}
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-zinc-900 dark:text-white" />
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              Shopping Bag ({cartCount})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-zinc-50 dark:bg-zinc-900/60 p-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between text-xs font-medium mb-1.5">
            {remainingForFreeShipping > 0 ? (
              <span className="text-zinc-700 dark:text-zinc-300">
                Add <strong className="text-amber-600 dark:text-amber-400 font-mono">{formatPrice(remainingForFreeShipping)}</strong> more for <strong>FREE Express Shipping</strong>
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Congratulations! You unlocked Free Express Delivery!
              </span>
            )}
            <span className="text-[11px] font-mono text-zinc-400">
              {Math.round(shippingPercent)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                remainingForFreeShipping === 0 ? "bg-emerald-500" : "bg-amber-400"
              }`}
              style={{ width: `${shippingPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-zinc-100 dark:divide-zinc-800">
          {checkoutSuccess ? (
            <div className="text-center py-16 px-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                Order Confirmed!
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mb-6">
                Thank you for choosing ATELIER. Your order #AT-98421 has been placed and is being carefully hand-packed.
              </p>
              <button
                onClick={() => {
                  setCheckoutSuccess(false);
                  setIsCartOpen(false);
                }}
                className="bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-bold px-6 py-3 rounded-full transition-colors"
              >
                Continue Exploring
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 px-4">
              <ShoppingBag className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Your bag is empty
              </p>
              <p className="text-xs text-zinc-400 mt-1 mb-6">
                Explore our Spring collection to curate your uniform.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold px-6 py-2.5 rounded-full"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`} className="py-4 flex gap-4">
                {/* Thumbnail */}
                <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
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
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-1">
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
                        className="text-zinc-400 hover:text-rose-500 p-0.5 ml-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-1">
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-zinc-300 dark:border-zinc-700"
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
                    <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedColor.name,
                            item.selectedSize,
                            item.quantity - 1
                          )
                        }
                        className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-mono font-bold text-zinc-900 dark:text-white">
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
                        className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold font-mono text-zinc-900 dark:text-white">
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
          <div className="p-5 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Coupon (e.g. FLASH20)"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-9 pr-3 text-xs text-zinc-900 dark:text-white uppercase font-mono placeholder:normal-case placeholder:font-sans focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold px-4 py-2 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                Apply
              </button>
            </form>

            {/* Active Coupon Badge */}
            {appliedCoupon && (
              <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 px-3 py-1.5 rounded-lg text-xs">
                <span className="font-mono text-amber-900 dark:text-amber-300 font-bold">
                  Code: {appliedCoupon} ({discountRate * 100}% Off)
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-amber-700 dark:text-amber-400 hover:text-amber-900 text-[11px] underline"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-900 dark:text-white">{formatPrice(cartTotal)}</span>
              </div>
              {discountRate > 0 && (
                <div className="flex justify-between text-amber-600 dark:text-amber-400 font-medium">
                  <span>Promo Discount</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {remainingForFreeShipping === 0 ? "FREE Express" : formatPrice(15)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-zinc-950 dark:text-white pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span>Estimated Total</span>
                <span className="font-mono text-base text-amber-500 dark:text-amber-400">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleSimulateCheckout}
              disabled={isCheckingOut}
              className="w-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-75"
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

            <p className="text-[10px] text-zinc-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>256-Bit Bank Encrypted · 30-Day Easy Returns</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
