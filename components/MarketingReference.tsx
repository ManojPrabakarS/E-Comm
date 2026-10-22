"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/products";
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
  Code2,
  Gauge,
  Workflow,
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
        "LCP candidate image preloaded with priority={true}",
        "Sub-second modal search with keyboard shortcuts (⌘K)",
        "Visual 4:5 aspect ratio category tiles with hover zoom",
        "Pure Indian Rupee (₹) pricing with instant UPI & card readiness",
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
        "Customers evaluate products through interactive color swatches, dual-image hover flips, and a comprehensive Quick-View modal. Stock alerts ('Only 3 left in stock') induce natural urgency while size selectors remove sizing hesitation.",
      kpis: [
        { label: "Quick-View Usage", value: "38%" },
        { label: "Add-to-Bag Rate", value: "14.2%" },
        { label: "Return Risk Drop", value: "-35%" },
      ],
      features: [
        "In-card real-time color shade swatches",
        "Quick-View modal preserving customer scroll position",
        "Live stock threshold indicators ('Only 3 left in stock')",
        "Dual-image hover previews for tactile garment inspection",
      ],
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=900",
      actionText: "Test Quick View Modal",
      onAction: () => {
        if (PRODUCTS && PRODUCTS.length > 0) {
          setQuickViewProduct(PRODUCTS[0]);
        }
      },
    },
    {
      id: "stage-3",
      number: "03",
      name: "Cart Acceleration & Upsell",
      subtitle: "Increasing Average Order Value (AOV) via smart thresholds",
      description:
        "Instead of navigating to a clunky full-page cart, a slide-over drawer slides smoothly into view. A dynamic Free Shipping Meter prompts customers to add one more piece to reach the ₹999 threshold, lifting basket size by +15%.",
      kpis: [
        { label: "AOV Expansion", value: "+18%" },
        { label: "Cart Abandonment", value: "-24%" },
        { label: "Drawer Conversion", value: "48%" },
      ],
      features: [
        "Dynamic Free Shipping calculation bar (Free above ₹999)",
        "Instant inline coupon verification (e.g. MP20 for 20% off)",
        "Zero-page-jump slide-over drawer with quantity steppers",
        "Real-time subtotal, savings, and shipping calculation",
      ],
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=900",
      actionText: "Open Slide-Over Cart Drawer",
      onAction: () => setIsCartOpen(true),
    },
    {
      id: "stage-4",
      number: "04",
      name: "Frictionless Checkout",
      subtitle: "1-Click conversion with localized payments (UPI, RuPay, Cards)",
      description:
        "The checkout funnel eliminates unnecessary form fields. Express checkout methods (UPI, GPay, PhonePe, RuPay, Cards) enable checkout in under 30 seconds with 256-bit bank-level SSL encryption and instant order confirmation.",
      kpis: [
        { label: "Checkout Completion", value: "76%" },
        { label: "Avg Checkout Time", value: "32s" },
        { label: "Payment Success", value: "99.4%" },
      ],
      features: [
        "Simulated 1-click Express Checkout with instant order confirmation",
        "Pincode serviceability across all major Indian zones",
        "Multi-gateway support: UPI, RuPay, Visa, Mastercard, NetBanking",
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
        "Verified customer review wall with helpful upvote system",
        "Automated VIP discount code reveal (MP20)",
        "Interactive shoppable editorial lookbook with outfit pins",
        "Curated community Instagram/UGC style feed (#MPStore)",
      ],
      image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=900",
      actionText: "Test Promo Code (MP20)",
      onAction: () => {
        applyCoupon("MP20");
        showToast("Coupon MP20 (20% off) applied! Open bag to see savings.", "success");
      },
    },
  ];

  const current = stages[activeStage];

  const uiComponents = [
    {
      title: "Hero LCP Engine",
      tag: "Conversion",
      desc: "Preloaded hero slide with fetchpriority='high', two-weight typography, and trust stats.",
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
      desc: "Free shipping threshold progress bar (₹999), inline coupon engine, and instant checkout flow.",
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
    <div className="bg-[#FDFDFB] text-[#141413] min-h-screen">
      {/* Top Announcement Bar — Matching Storefront Navbar */}
      <div className="bg-[#1C1B19] text-[#E0DED9] text-[11px] py-2 px-4 border-b border-white/10 tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#E07A5F]/20 text-[#FFAE98] border border-[#E07A5F]/30 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" /> ARCHITECTURE SPEC
            </span>
            <span>
              Client Reference Blueprint for <strong className="text-white font-bold">MP.Store</strong> — Built with Next.js 16 + React 19 + Tailwind v4
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-mono text-[#A6A49F]">
            <span>INDIAN RUPEE (₹) SYSTEM</span>
            <span className="text-white/30">·</span>
            <span>PROMO: MP20</span>
          </div>
        </div>
      </div>

      {/* Sticky Secondary Nav Bar — Clean Light Well */}
      <div className="border-b border-[#EAE8E3] bg-[#FDFDFB]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#141413]">
              MP<span className="text-[#E07A5F]">.</span>Store
            </span>
            <span className="text-[9px] tracking-widest font-mono font-bold text-[#5C5B57] uppercase bg-[#FAF9F5] px-2 py-0.5 rounded-full border border-[#EAE8E3]">
              CLIENT SPEC
            </span>
            <span className="text-[#D5D3CB] hidden sm:inline">|</span>
            <span className="text-xs text-[#5C5B57] font-medium hidden sm:inline">
              Modern Boutique E-Commerce Architecture
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onSwitchToLiveStore}
              className="flex items-center gap-1.5 bg-[#E07A5F] hover:bg-[#C86A50] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md transition-all active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Launch Live Storefront</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero: Marketing Presentation */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-[#EAE8E3]">
        {/* Soft Ambient Terracotta Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E07A5F]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 bg-[#FAF3F0] border border-[#E07A5F]/25 text-[#E07A5F] text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>MP.STORE ARCHITECTURE · E-COMMERCE BLUEPRINT</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#141413] mb-6 leading-[1.1]">
              <strong className="font-extrabold text-[#141413]">How It Works:</strong>{" "}
              <span className="font-serif italic text-[#5C5B57]">Modern D2C E-Commerce Engine</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5C5B57] leading-relaxed mb-10 font-normal">
              A high-converting D2C retail architecture engineered for <strong className="text-[#141413]">MP.Store</strong> with maximum velocity, sub-2.5s LCP loading, and zero-friction purchase journeys in Indian Rupees (<strong className="text-[#141413]">₹</strong>). Below is the step-by-step client reference breakdown of the system mechanics.
            </p>

            {/* Quick KPI Cards — Alabaster Style */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-white border border-[#EAE8E3] p-5 rounded-[22px] shadow-sm hover:border-[#D5D3CB] transition-all">
                <p className="text-2xl sm:text-3xl font-black font-mono text-[#141413]">≥ 45%</p>
                <p className="text-xs text-[#5C5B57] mt-1 font-medium">Cart-to-Order Rate</p>
              </div>
              <div className="bg-white border border-[#EAE8E3] p-5 rounded-[22px] shadow-sm hover:border-[#D5D3CB] transition-all">
                <p className="text-2xl sm:text-3xl font-black font-mono text-[#E07A5F]">&lt; 2.5s</p>
                <p className="text-xs text-[#5C5B57] mt-1 font-medium">Mobile LCP Speed</p>
              </div>
              <div className="bg-white border border-[#EAE8E3] p-5 rounded-[22px] shadow-sm hover:border-[#D5D3CB] transition-all">
                <p className="text-2xl sm:text-3xl font-black font-mono text-[#141413]">+18%</p>
                <p className="text-xs text-[#5C5B57] mt-1 font-medium">AOV Basket Uplift</p>
              </div>
              <div className="bg-white border border-[#EAE8E3] p-5 rounded-[22px] shadow-sm hover:border-[#D5D3CB] transition-all">
                <p className="text-2xl sm:text-3xl font-black font-mono text-[#2D6A4F]">99.9%</p>
                <p className="text-xs text-[#5C5B57] mt-1 font-medium">Uptime Reliability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: The 5-Stage Customer Journey Pipeline ("HOW IT WORKS") */}
      <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#EAE8E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#E07A5F] mb-2">
                <Workflow className="w-3.5 h-3.5" />
                <span>STEP-BY-STEP CONVERSION PIPELINE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-[#141413]">
                <strong className="font-extrabold text-[#141413]">The 5 Stages:</strong> How the User Journey Works
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5C5B57] mt-2 sm:mt-0 max-w-md">
              Click any stage below to inspect the mechanics, conversion KPIs, and test the corresponding UI component live.
            </p>
          </div>

          {/* Stage Selector Tabs — Pill / Rounded Card Style */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3.5 mb-10">
            {stages.map((stage, idx) => {
              const isActive = idx === activeStage;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className={`p-4 rounded-[20px] border text-left transition-all ${
                    isActive
                      ? "bg-[#141413] text-white border-[#141413] shadow-lg scale-[1.02]"
                      : "bg-white border-[#EAE8E3] text-[#5C5B57] hover:border-[#D5D3CB] hover:text-[#141413] shadow-sm"
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                      isActive ? "text-[#FFAE98]" : "text-[#E07A5F]"
                    }`}
                  >
                    Stage {stage.number}
                  </span>
                  <p
                    className={`text-xs sm:text-sm font-bold mt-1 line-clamp-1 ${
                      isActive ? "text-white" : "text-[#141413]"
                    }`}
                  >
                    {stage.name}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Breakdown — Framed Showcase */}
          <div className="bg-white border border-[#EAE8E3] rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Content */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="bg-[#FAF3F0] text-[#E07A5F] border border-[#E07A5F]/20 text-[10px] font-mono font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    PHASE {current.number}
                  </span>
                  <span className="text-xs text-[#5C5B57] font-medium">
                    {current.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#141413] mb-4">
                  {current.name}
                </h3>

                <p className="text-sm sm:text-base text-[#5C5B57] leading-relaxed mb-6 font-normal">
                  {current.description}
                </p>

                {/* KPI Metrics Strip */}
                <div className="grid grid-cols-3 gap-3 mb-8 bg-[#FAF9F5] p-5 rounded-[22px] border border-[#EAE8E3]">
                  {current.kpis.map((kpi) => (
                    <div key={kpi.label} className="text-center sm:text-left">
                      <p className="text-lg sm:text-2xl font-bold font-mono text-[#E07A5F]">
                        {kpi.value}
                      </p>
                      <p className="text-[11px] text-[#5C5B57] mt-0.5 font-medium">{kpi.label}</p>
                    </div>
                  ))}
                </div>

                {/* Architectural Feature Checklist */}
                <div className="space-y-3 mb-8">
                  {current.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#141413]">
                      <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Component Trigger Button */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={current.onAction}
                    className="bg-[#141413] hover:bg-[#2C2C2B] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full flex items-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>{current.actionText}</span>
                  </button>

                  <button
                    onClick={onSwitchToLiveStore}
                    className="text-xs font-bold text-[#E07A5F] hover:text-[#C86A50] flex items-center gap-1 transition-colors uppercase tracking-wider"
                  >
                    <span>View in full storefront</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Visual Image */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-[#EAE8E3] shadow-lg">
                  <Image
                    src={current.image}
                    alt={current.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-65" />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 flex items-center justify-between text-white">
                    <div>
                      <p className="text-[10px] text-white/60 uppercase font-mono">Component Reference</p>
                      <p className="text-xs font-bold text-white">{current.name}</p>
                    </div>
                    <span className="text-xs font-bold text-[#FFAE98] font-mono">LIVE READY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: UI Component Catalog (Client Reference) */}
      <section className="py-16 sm:py-24 bg-[#FDFDFB] border-b border-[#EAE8E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#E07A5F] mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>MODULAR ATELIER DESIGN SYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#141413]">
              <strong className="font-extrabold text-[#141413]">UI Reference:</strong> Key Components & Patterns
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5B57] mt-3">
              Every module is crafted with clean separation of concerns, TypeScript type safety, and responsive fluid layout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {uiComponents.map((comp, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EAE8E3] rounded-[24px] p-6 flex flex-col justify-between hover:border-[#E07A5F]/50 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-[10px] font-mono font-bold text-[#E07A5F] uppercase bg-[#FAF3F0] border border-[#E07A5F]/20 px-2.5 py-0.5 rounded-full">
                      {comp.tag}
                    </span>
                    <span className="text-xs font-mono text-[#8C8B85]">#{idx + 1}</span>
                  </div>
                  <h4 className="text-base font-bold text-[#141413] group-hover:text-[#E07A5F] transition-colors mb-2">
                    {comp.title}
                  </h4>
                  <p className="text-xs text-[#5C5B57] leading-relaxed">
                    {comp.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0EFEB] flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#5C5B57]">{comp.stat}</span>
                  <span className="text-[11px] font-bold text-[#E07A5F] group-hover:translate-x-0.5 transition-transform">
                    Included →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Technical Architecture & Core Web Vitals */}
      <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#EAE8E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#E07A5F] mb-2">
                <Gauge className="w-3.5 h-3.5" />
                <span>PRODUCTION SPECIFICATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-[#141413] mb-5">
                <strong className="font-extrabold text-[#141413]">Technical</strong> Architecture & CWV
              </h2>
              <p className="text-sm text-[#5C5B57] leading-relaxed mb-8">
                Built on the Next.js App Router and React 19 architecture, strictly adhering to Google Core Web Vitals guidelines for modern web development.
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-[22px] bg-white border border-[#EAE8E3] flex items-start gap-4 shadow-sm hover:border-[#D5D3CB] transition-all">
                  <div className="p-2.5 rounded-2xl bg-[#FAF3F0] text-[#E07A5F] border border-[#E07A5F]/20 shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#141413]">LCP Prioritization Pattern</h4>
                    <p className="text-xs text-[#5C5B57] mt-1 leading-relaxed">
                      First hero candidate is tagged with fetchpriority=&quot;high&quot; while lazy loading is strictly avoided on the LCP viewport image, achieving sub-1.5s visual readiness.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-[22px] bg-white border border-[#EAE8E3] flex items-start gap-4 shadow-sm hover:border-[#D5D3CB] transition-all">
                  <div className="p-2.5 rounded-2xl bg-[#FAF3F0] text-[#E07A5F] border border-[#E07A5F]/20 shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#141413]">State Management & Persistence</h4>
                    <p className="text-xs text-[#5C5B57] mt-1 leading-relaxed">
                      Lightweight StoreContext powers the live bag, wishlist, pure Indian Rupee formatting (₹), coupon verification, and toast notifications without bloated external libraries.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-[22px] bg-white border border-[#EAE8E3] flex items-start gap-4 shadow-sm hover:border-[#D5D3CB] transition-all">
                  <div className="p-2.5 rounded-2xl bg-[#FAF3F0] text-[#E07A5F] border border-[#E07A5F]/20 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#141413]">Security & Indian Commerce Ready</h4>
                    <p className="text-xs text-[#5C5B57] mt-1 leading-relaxed">
                      Pre-configured for INR (Instant UPI / QR / RuPay / NetBanking / Cards) with sanitization and modular endpoints for Razorpay / Cashfree / Stripe integrations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Live Preview Callout — Obsidian Feature Box */}
            <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#1C1B19] border border-white/10 p-8 sm:p-12 overflow-hidden shadow-2xl text-white">
              {/* Subtle ambient warm blur */}
              <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#E07A5F]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#D4A373]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-[#E07A5F]/20 border border-[#E07A5F]/30 text-[#FFAE98] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-5">
                  <Flame className="w-3.5 h-3.5 text-[#FFAE98]" />
                  <span>CLIENT ACTION</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-light text-white mb-4 leading-tight">
                  <strong className="font-extrabold text-white">Experience</strong> The Live Storefront
                </h3>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-8">
                  Switch directly into the operational customer storefront to test product browsing, color swatches, quick-view dialogs, cart calculations in Indian Rupees (₹), coupon codes (MP20), and the interactive lookbook.
                </p>

                <button
                  onClick={onSwitchToLiveStore}
                  className="w-full bg-[#E07A5F] hover:bg-[#C86A50] text-white font-bold text-sm py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-xl transition-all active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Launch Live Storefront Experience</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#141413] text-[#8C8B85] border-t border-white/10 py-12 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-extrabold text-lg text-white mb-2">
            MP<span className="text-[#E07A5F]">.</span>Store
          </p>
          <p className="text-[11px] text-[#8C8B85]">
            © 2026 MP.STORE INC. ALL RIGHTS RESERVED. CLIENT MARKETING &amp; ARCHITECTURAL UI SPECIFICATION.
          </p>
        </div>
      </footer>
    </div>
  );
}
