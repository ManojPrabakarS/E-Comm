"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types/ecommerce";
import { PRODUCTS } from "@/data/products";

interface ToastMessage {
  id: string;
  message: string;
  type?: "success" | "info" | "warning";
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, color?: { name: string; hex: string }, size?: string, quantity?: number) => void;
  updateQuantity: (productId: string, colorName: string, size: string, quantity: number) => void;
  removeFromCart: (productId: string, colorName: string, size: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  toasts: ToastMessage[];
  showToast: (message: string, type?: "success" | "info" | "warning") => void;
  removeToast: (id: string) => void;

  appliedCoupon: string | null;
  discountRate: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  currency: "INR";
  setCurrency: (currency: "INR") => void;
  formatPrice: (amount: number) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Initial cart with a nice sample item so the user sees immediate value
  const [cart, setCart] = useState<CartItem[]>(() => [
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedColor: PRODUCTS[0].colors[0],
      selectedSize: PRODUCTS[0].sizes[1] || "M",
    },
  ]);

  const [wishlist, setWishlist] = useState<string[]>(["prod-3"]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>("MP20");
  const [discountRate, setDiscountRate] = useState<number>(0.20);
  const [currency, setCurrency] = useState<"INR">("INR");

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (
    product: Product,
    color?: { name: string; hex: string },
    size?: string,
    quantity = 1
  ) => {
    const chosenColor = color || product.colors[0];
    const chosenSize = size || product.sizes[0] || "Standard";

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === chosenColor.name &&
          item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedColor: chosenColor, selectedSize: chosenSize }];
    });

    showToast(`Added ${product.name} to your bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, colorName: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorName, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedColor.name === colorName &&
        item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, colorName: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor.name === colorName &&
            item.selectedSize === size
          )
      )
    );
    showToast("Item removed from bag", "info");
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const product = PRODUCTS.find((p) => p.id === productId);
      const name = product ? product.name : "Item";
      if (exists) {
        showToast(`Removed ${name} from your wishlist`, "info");
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Added ${name} to your wishlist ❤️`, "success");
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (
      cleanCode === "MP20" ||
      cleanCode === "MP15" ||
      cleanCode === "FLASH20" ||
      cleanCode === "ARCHIVE35" ||
      cleanCode === "FIRST15" ||
      cleanCode === "WELCOME15"
    ) {
      setAppliedCoupon(cleanCode);
      const rate =
        cleanCode === "ARCHIVE35"
          ? 0.35
          : cleanCode === "MP20" || cleanCode === "FLASH20"
          ? 0.20
          : 0.15;
      setDiscountRate(rate);
      showToast(`Promo code ${cleanCode} applied! (${rate * 100}% off)`, "success");
      return true;
    } else {
      showToast("Invalid promo code. Try MP20 or WELCOME15", "warning");
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountRate(0);
    showToast("Promo code removed", "info");
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        toasts,
        showToast,
        removeToast,
        appliedCoupon,
        discountRate,
        applyCoupon,
        removeCoupon,
        currency,
        setCurrency,
        formatPrice,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
