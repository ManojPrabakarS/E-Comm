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
  ChevronDown,
  Sparkles,
  Truck,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function Navbar() {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsSearchOpen,
    currency,
    setCurrency,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "New In", href: "#products", badge: "New" },
    { label: "Apparel", href: "#categories" },
    { label: "Footwear", href: "#products" },
    { label: "Audio & Tech", href: "#products" },
    { label: "Everyday Carry", href: "#products" },
    { label: "Lookbook", href: "#lookbook" },
    { label: "Reviews", href: "#reviews" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-zinc-950 text-zinc-300 text-xs py-2 px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" /> Special Offer
            </span>
            <span>
              Use code <strong className="text-amber-400 font-bold tracking-wide">FLASH20</strong> for 20% off orders. Free worldwide express delivery over $75.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <span className="hidden md:inline-flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-zinc-300" /> 48-Hour Dispatch
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" /> 2-Year Warranty
            </span>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdown(!currencyDropdown)}
                className="flex items-center gap-1 text-zinc-200 hover:text-white bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-xs transition-colors"
                aria-label="Select Currency"
              >
                <span>{currency === "USD" ? "USD ($)" : currency === "INR" ? "INR (₹)" : "EUR (€)"}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>

              {currencyDropdown && (
                <div className="absolute right-0 top-full mt-1 w-28 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl py-1 z-50">
                  <button
                    onClick={() => {
                      setCurrency("USD");
                      setCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors hover:bg-zinc-800 ${
                      currency === "USD" ? "text-amber-400 font-bold" : "text-zinc-300"
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    onClick={() => {
                      setCurrency("INR");
                      setCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors hover:bg-zinc-800 ${
                      currency === "INR" ? "text-amber-400 font-bold" : "text-zinc-300"
                    }`}
                  >
                    INR (₹)
                  </button>
                  <button
                    onClick={() => {
                      setCurrency("EUR");
                      setCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors hover:bg-zinc-800 ${
                      currency === "EUR" ? "text-amber-400 font-bold" : "text-zinc-300"
                    }`}
                  >
                    EUR (€)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-sm border-b border-zinc-200 dark:border-zinc-800 py-3.5"
            : "bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tighter text-zinc-950 dark:text-white group-hover:text-amber-500 transition-colors">
              ATELIER<span className="text-amber-500 font-serif">.</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] tracking-widest font-mono font-medium text-zinc-600 dark:text-zinc-300 uppercase bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded">
              STUDIOS
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors py-1 group flex items-center gap-1.5"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="bg-amber-400 text-zinc-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Desktop Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 px-3.5 py-2 rounded-full text-xs font-normal border border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-400"
              aria-label="Search products"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search products...</span>
              <kbd className="font-mono text-[10px] bg-white dark:bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Link/Button */}
            <a
              href="#products"
              className="relative p-2.5 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in duration-150">
                  {wishlist.length}
                </span>
              )}
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-medium text-xs px-3.5 py-2.5 rounded-full transition-all shadow-sm hover:shadow"
              aria-label="Open cart drawer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-amber-400 text-zinc-950 text-[11px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
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
          <div className="relative w-4/5 max-w-sm bg-white dark:bg-zinc-950 h-full shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-900">
                <span className="font-extrabold text-xl tracking-tight text-zinc-950 dark:text-white">
                  ATELIER<span className="text-amber-500">.</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
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
                    className="flex items-center justify-between py-3 px-3 rounded-lg text-base font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-zinc-400" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900">
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl text-center">
                <p className="text-xs font-semibold text-amber-900 dark:text-amber-300">
                  New Spring Collection is Live
                </p>
                <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-1">
                  Enjoy complimentary gift packaging on all orders this week.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
