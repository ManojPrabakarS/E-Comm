"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  ShoppingBag,
  Search,
  Eye,
  Sliders,
  ShieldCheck,
  Truck,
  TrendingUp,
  Layers,
  Cpu,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Flame,
  Star,
  Tag,
  Clock,
  RotateCcw,
  Check,
} from "lucide-react";

interface MarketingReferenceProps {
  onSwitchToLiveStore: () => void;
}

export function MarketingReference({ onSwitchToLiveStore }: MarketingReferenceProps) {
  const {
    setIsCartOpen,
    setQuickViewProduct,
    setIsSearchOpen,
    applyCoupon,
    showToast,
  } = useStore();

  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: "stage-1",
      number: "01",
      name: "Discovery & Merchandising",
      subtitle: "Instant engagement with sub-2.5s LCP & sub-second search",
      description:
        "The customer lands on a high-impact editorial showcase. LCP image prioritization ensures zero perceptual loading delay. Live ⌘K search and category tiles guide intent and impulse buyers directly to desired collections.",
      kpis: [
        { label: "Bounce Rate", value: "< 28%" },
        { label: "Mobile LCP", value: "1.4s" },
        { label: "Search Latency", value: "< 80ms" },
      ],
      features: [
        "LCP candidate image with fetchpriority='high'",
        "Sub-second modal search with keyboard shortcuts (⌘K)",
        "Visual 4:5 aspect ratio category tiles with hover zoom",
        "Multi-currency selector (USD $, INR ₹, EUR €)",
      ],
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=900",
      actionText: "Try Instant Search (⌘K)",
      onAction: () => setIsSearchOpen(true),
    },
    {
      id: "stage-2",
      number: "02",
      name: "Evaluation & Selection",
      subtitle: "Friction-free assessment without disruptive page reloads",
      description:
        "Customers evaluate products through interactive color swatches, dual-image hover flips, and a comprehensive Quick-View modal. Stock alerts ('Only 4 left') induce natural urgency while fit guides remove sizing hesitation.",
      kpis: [
        { label: "Quick-View Usage", value: "38%" },
        { label: "Add-to-Bag Rate", value: "14.2%" },
        { label: "Return Risk Drop", value: "-35%" },
      ],
      features: [
        "In-card real-time color shade swatches",
        "Quick-View modal preserving scroll position",
        "Live stock threshold indicators ('Only 3 left in stock')",
        "Dual-image hover previews for tactile inspection",
      ],
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=900",
      actionText: "Test Quick View Modal",
      onAction: () => {
        // Trigger quick view on product 1
        const { PRODUCTS } = require("@/data/products");
        setQuickViewProduct(PRODUCTS[0]);
      },
    },
    {
      id: "stage-3",
      number: "03",
      name: "Cart Acceleration & Upsell",
      subtitle: "Increasing Average Order Value (AOV) via smart thresholds",
      description:
        "Instead of navigating to a clunky cart page, a slide-over drawer slides smoothly into view. A dynamic Free Shipping Meter prompts customers to add one more piece to reach the $75 threshold, lifting basket size by +15%.",
      kpis: [
        { label: "AOV Expansion", value: "+18%" },
        { label: "Cart Abandonment", value: "-24%" },
        { label: "Drawer Conversion", value: "48%" },
      ],
      features: [
        "Dynamic Free Shipping calculation bar",
        "Instant inline coupon verification (e.g. FLASH20)",
        "Zero-page-jump slide-over drawer with quantity steppers",
        "Item memory & instant subtotal calculation",
      ],
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=900",
      actionText: "Open Slide-Over Cart Drawer",
      onAction: () => setIsCartOpen(true),
    },
    {
      id: "stage-4",
      number: "04",
      name: "Frictionless Checkout",
      subtitle: "1-Click conversion with localized payments (UPI, Cards, Apple Pay)",
      description:
        "The checkout funnel eliminates unnecessary form fields. Express checkout methods (UPI, Apple Pay, Google Pay) enable checkout in under 30 seconds with 256-bit bank-level SSL encryption and instant order confirmation.",
      kpis: [
        { label: "Checkout Completion", value: "76%" },
        { label: "Avg Checkout Time", value: "32s" },
        { label: "Payment Success", value: "99.4%" },
      ],
      features: [
        "Simulated 1-click Express Checkout with instant feedback",
        "Pincode / Zipcode serviceability check",
        "Multi-gateway support: UPI, RuPay, Visa, Mastercard, Apple Pay",
        "Automated GST invoice generation readiness",
      ],
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=900",
      actionText: "Simulate Checkout in Cart",
      onAction: () => setIsCartOpen(true),
    },
    {
      id: "stage-5",
      number: "05",
      name: "Retention & Social Proof",
      subtitle: "Turning one-off buyers into high-LTV brand advocates",
      description:
        "The customer experience extends past the purchase: 48h dispatch notifications, self-serve returns within 30 days, verified buyer photo galleries, and Atelier VIP Society incentives drive a ≥25% 90-day repeat rate.",
      kpis: [
        { label: "Repeat Purchase", value: "26.4%" },
        { label: "Review Submission", value: "19%" },
        { label: "VIP Club Opt-In", value: "31%" },
      ],
      features: [
        "Verified customer review wall with helpful voting",
        "Automated VIP discount code reveal (FIRST15)",
        "Interactive shoppable editorial lookbook with outfit pins",
        "Curated community Instagram/UGC style feed",
      ],
      image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=900",
      actionText: "Test Promo Code (FIRST15)",
      onAction: () => {
        applyCoupon("FIRST15");
        showToast("Coupon FIRST15 applied! Open cart to see savings.", "success");
      },
    },
  ];

  const current = stages[activeStage];

  const uiComponents = [
    {
      title: "Hero LCP Engine",
      tag: "Conversion",
      desc: "Preloaded hero slide with fetchpriority='high', two-weight typography, and trust badges.",
      stat: "Sub-2.5s LCP",
    },
    {
      title: "Universal ⌘K Search",
      tag: "Discovery",
      desc: "Live keyword query filtering with trending tags and direct quick-view navigation.",
      stat: "<80ms response",
    },
    {
      title: "4:5 Visual Product Grid",
      tag: "Merchandising",
      desc: "Consistent 4:5 aspect ratio, secondary hover image swap, and live color shade selectors.",
      stat: "4-column grid",
    },
    {
      title: "Slide-Over Cart Drawer",
      tag: "Revenue",
      desc: "Free shipping threshold progress bar, inline coupon engine, and instant checkout flow.",
      stat: "+18% AOV",
    },
    {
      title: "Quick-View Modal",
      tag: "UX Velocity",
      desc: "Fast evaluation dialog with size guide, inventory alerts, and direct Add-to-Bag.",
      stat: "Zero page jump",
    },
    {
      title: "Shoppable Lookbook",
      tag: "Editorial",
      desc: "Interactive clickable outfit hotspot pins that reveal product details and cart buttons.",
      stat: "Multi-item buy",
    },
    {
      title: "Flash Drop FOMO Ticker",
      tag: "Urgency",
      desc: "Live ticking seconds countdown timer, micro-batch stock meter, and one-click coupon copy.",
      stat: "14 units left",
    },
    {
      title: "Verified Reviews & UGC",
      tag: "Trust",
      desc: "4.92/5 aggregate star breakdown, verified buyer comments, and helpful vote counters.",
      stat: "4,820+ reviews",
    },
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      {/* Client Reference Header Banner */}
      <div className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase">
              Client UI Reference & System Spec
            </span>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <span className="text-xs text-amber-400 font-medium hidden sm:inline">
              Architecture: Next.js 16 + React 19 + Tailwind v4
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onSwitchToLiveStore}
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold px-4 py-1.5 rounded-full shadow transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Launch Live Storefront</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero: Marketing Presentation */}
      <section className="relative overflow-hidden py-20 lg:py-28 border-b border-zinc-800">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMERCE ARCHITECTURE BLUEPRINT</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
              <strong className="font-extrabold text-amber-400">How It Works:</strong> Modern D2C E-Commerce Engine
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-10">
              A complete, high-converting retail architecture engineered for maximum velocity, sub-2.5s LCP loading, and zero-friction purchase journeys. Below is the step-by-step client reference breakdown of the system mechanics.
            </p>

            {/* Quick KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
                <p className="text-2xl sm:text-3xl font-black font-mono text-white">≥ 45%</p>
                <p className="text-xs text-zinc-400 mt-1">Cart-to-Order Rate</p>
              </div>
              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
                <p className="text-2xl sm:text-3xl font-black font-mono text-amber-400">&lt; 2.5s</p>
                <p className="text-xs text-zinc-400 mt-1">Mobile LCP Speed</p>
              </div>
              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
                <p className="text-2xl sm:text-3xl font-black font-mono text-white">+18%</p>
                <p className="text-xs text-zinc-400 mt-1">AOV Basket Uplift</p>
              </div>
              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
                <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">99.9%</p>
                <p className="text-xs text-zinc-400 mt-1">Uptime Reliability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: The 5-Stage Customer Journey Pipeline ("HOW IT WORKS") */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 mb-2 block">
              STEP-BY-STEP CONVERSION PIPELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white">
              <strong className="font-extrabold text-amber-400">The 5 Stages:</strong> How the User Journey Works
            </h2>
          </div>
          <p className="text-sm text-zinc-400 mt-2 sm:mt-0 max-w-md">
            Click any stage below to inspect the mechanics, conversion KPIs, and test the corresponding UI component live.
          </p>
        </div>

        {/* Stage Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-12">
          {stages.map((stage, idx) => {
            const isActive = idx === activeStage;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isActive
                    ? "bg-amber-400 text-zinc-950 border-amber-400 shadow-xl"
                    : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${
                  isActive ? "text-zinc-900" : "text-amber-500"
                }`}>
                  Stage {stage.number}
                </span>
                <p className="text-xs sm:text-sm font-bold mt-1 line-clamp-1">
                  {stage.name}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-amber-400 text-zinc-950 text-[11px] font-mono font-extrabold px-2.5 py-0.5 rounded-full">
                  PHASE {current.number}
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  {current.subtitle}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {current.name}
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                {current.description}
              </p>

              {/* KPI Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-8 bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                {current.kpis.map((kpi) => (
                  <div key={kpi.label} className="text-center sm:text-left">
                    <p className="text-lg sm:text-xl font-bold font-mono text-amber-400">
                      {kpi.value}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{kpi.label}</p>
                  </div>
                ))}
              </div>

              {/* Architectural Feature Checklist */}
              <div className="space-y-2.5 mb-8">
                {current.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Interactive Component Trigger Button */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={current.onAction}
                  className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 transition-colors shadow-lg"
                >
                  <Zap className="w-4 h-4 fill-zinc-950" />
                  <span>{current.actionText}</span>
                </button>

                <button
                  onClick={onSwitchToLiveStore}
                  className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>View in full storefront</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-700/80 shadow-2xl">
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase font-mono">Component Reference</p>
                    <p className="text-xs font-bold text-white">{current.name}</p>
                  </div>
                  <span className="text-xs font-bold text-amber-400 font-mono">LIVE READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: UI Component Catalog (Client Reference) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 mb-2 block">
            MODULAR ATELIER DESIGN SYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-white">
            <strong className="font-extrabold text-amber-400">UI Reference:</strong> Key Components & Patterns
          </h2>
          <p className="text-sm text-zinc-400 mt-3">
            Every module is crafted with clean separation of concerns, TypeScript type safety, and responsive fluid layout.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {uiComponents.map((comp, idx) => (
            <div
              key={idx}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/50 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase bg-amber-400/10 px-2 py-0.5 rounded">
                    {comp.tag}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">#{idx + 1}</span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  {comp.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {comp.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-300">{comp.stat}</span>
                <span className="text-[11px] text-amber-400 group-hover:translate-x-0.5 transition-transform">
                  Included →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Technical Architecture & Core Web Vitals */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 mb-2 block">
              PRODUCTION SPECIFICATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
              <strong className="font-extrabold text-amber-400">Technical</strong> Architecture & CWV
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Built on the Next.js App Router and React 19 architecture, adhering to Google Core Web Vitals guidelines for modern web development.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">LCP Prioritization Pattern</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    First hero candidate is tagged with fetchpriority=&quot;high&quot; while lazy loading is strictly avoided on the LCP viewport image, achieving sub-1.5s visual readiness.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">State Management & Persistence</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Lightweight StoreContext powers the live bag, wishlist, currency conversion (USD/INR/EUR), coupon verification, and toast notifications without bloated external libraries.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Security & Multi-Currency Ready</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Pre-configured for INR (UPI/GST), USD, and EUR with sanitization and modular endpoints for Atlas MongoDB / Stripe / Razorpay integrations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Live Preview Callout */}
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-amber-400/30 p-8 sm:p-10 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-2">
              CLIENT ACTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Experience the Live Storefront
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8">
              Switch directly into the operational customer storefront to test product browsing, color swatches, quick-view dialogs, cart calculations, coupon codes, and the interactive lookbook.
            </p>

            <button
              onClick={onSwitchToLiveStore}
              className="w-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Launch Live Storefront Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} ATELIER STUDIOS. CLIENT MARKETING & UI REFERENCE SYSTEM.</p>
      </footer>
    </div>
  );
}
