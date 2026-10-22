"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Sparkles,
  Truck,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function Navbar() {
  const {
    cartCount,
    cartTotal,
    setIsCartOpen,
    wishlist,
    setIsSearchOpen,
    formatPrice,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "New Arrivals", href: "#products", badge: "SS26" },
    { label: "Apparel", href: "#categories" },
    { label: "Footwear", href: "#products" },
    { label: "Bags & Carry", href: "#products" },
    { label: "Lookbook", href: "#lookbook" },
    { label: "Reviews", href: "#reviews" },
  ];

  return (
    <>
      {/* Top Announcement Bar — Indian Currency / Rupee Specific */}
      <div className="bg-[#1C1B19] text-[#E0DED9] text-[11px] py-2 px-4 border-b border-white/10 tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#E07A5F]/20 text-[#FFAE98] border border-[#E07A5F]/30 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" /> SPRING DROP
            </span>
            <span>
              Use code <strong className="text-white font-bold tracking-wider">MP20</strong> for 20% off. Free express delivery across India on orders above ₹999.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#A6A49F]">
            <span className="hidden md:inline-flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-white/80" /> 48h Dispatch across India
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-white/80" /> Instant UPI &amp; COD Available
            </span>

            {/* Indian Currency Indicator */}
            <div className="inline-flex items-center gap-1 text-white bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full text-[11px] font-mono">
              <span className="font-bold text-[#FFAE98]">₹</span>
              <span>INR (Rupees)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FDFDFB]/95 backdrop-blur-md shadow-sm border-b border-[#EAE8E3] py-3.5"
            : "bg-[#FDFDFB] border-b border-[#F0EFEB] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-zinc-800 hover:text-black rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-zinc-800 hover:text-black rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo — MP.Store */}
          <Link href="/" className="flex items-center gap-1.5 group">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#141413] group-hover:text-[#E07A5F] transition-colors">
              MP<span className="text-[#E07A5F]">.</span>Store
            </span>
            <span className="hidden sm:inline-block text-[9px] tracking-widest font-mono font-bold text-[#5C5B57] uppercase bg-[#F2F0EB] px-2 py-0.5 rounded-full border border-[#EAE8E3] ml-1">
              INDIA
            </span>
          </Link>

          {/* Desktop Navigation Links — Centered Pill Style */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-xs font-semibold text-[#5C5B57] hover:text-[#141413] transition-colors py-1.5 px-2 group flex items-center gap-1.5"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="bg-[#E07A5F]/15 text-[#E07A5F] border border-[#E07A5F]/20 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tight">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#141413] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons — Pill Elements */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Desktop Pill Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 bg-[#F6F5F1] text-[#5C5B57] hover:text-[#141413] px-3.5 py-2 rounded-full text-xs font-normal border border-[#EAE8E3] hover:border-[#D5D3CB] transition-all"
              aria-label="Search products"
            >
              <Search className="w-3.5 h-3.5 text-[#8C8B85]" />
              <span>Search styles...</span>
              <kbd className="font-mono text-[9px] bg-white text-[#8C8B85] px-1.5 py-0.5 rounded border border-[#EAE8E3]">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Link/Button */}
            <a
              href="#products"
              className="relative p-2.5 text-[#5C5B57] hover:text-[#141413] rounded-full hover:bg-[#F2F0EB] transition-colors"
              aria-label="View wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E07A5F] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-in zoom-in duration-150">
                  {wishlist.length}
                </span>
              )}
            </a>

            {/* Shopping Cart Pill Button with Count & Total in Rupees */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#141413] hover:bg-[#2C2C2B] text-white font-medium text-xs px-3.5 sm:px-4 py-2 rounded-full transition-all shadow-sm hover:shadow"
              aria-label="Open cart drawer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-xs font-semibold">Bag</span>
              <span className="bg-[#E07A5F] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
              {cartTotal > 0 && (
                <span className="hidden md:inline font-mono text-[11px] text-white/90 pl-1 border-l border-white/20">
                  {formatPrice(cartTotal)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FDFDFB] h-full shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#EAE8E3]">
                <span className="font-extrabold text-xl tracking-tight text-[#141413]">
                  MP<span className="text-[#E07A5F]">.</span>Store
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#5C5B57] hover:text-[#141413] rounded-lg hover:bg-zinc-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 mt-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 px-3 rounded-xl text-sm font-semibold text-[#141413] hover:bg-[#F5F4F0] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#8C8B85]" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#EAE8E3]">
              <div className="bg-[#F8F2EE] border border-[#E07A5F]/20 p-4 rounded-2xl text-center">
                <p className="text-xs font-bold text-[#E07A5F]">
                  MP.Store SS26 Runway Collection
                </p>
                <p className="text-[11px] text-[#5C5B57] mt-1">
                  Use coupon code <strong>MP20</strong> for 20% off your order.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
