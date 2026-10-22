"use client";

import React, { useState } from "react";
import { MarketingReference } from "@/components/MarketingReference";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductGrid } from "@/components/ProductGrid";
import { FlashDrop } from "@/components/FlashDrop";
import { ShoppableLookbook } from "@/components/ShoppableLookbook";
import { ReviewsSection } from "@/components/ReviewsSection";
import { CommunityGrid } from "@/components/CommunityGrid";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { Layers, ShoppingBag, ArrowLeft, Sparkles } from "lucide-react";

export default function Home() {
  // Default view is the Client UI Reference ("How It Works") marketing landing page
  const [viewMode, setViewMode] = useState<"marketing" | "store">("marketing");

  return (
    <div className="relative min-h-screen">
      {/* Floating Global Mode Switcher for Client Review */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-zinc-950/90 text-white border border-zinc-800 p-1.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-1">
          <button
            onClick={() => setViewMode("marketing")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full transition-all ${
              viewMode === "marketing"
                ? "bg-amber-400 text-zinc-950 shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>How It Works (Client Spec)</span>
          </button>

          <button
            onClick={() => setViewMode("store")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full transition-all ${
              viewMode === "store"
                ? "bg-amber-400 text-zinc-950 shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Live Storefront</span>
          </button>
        </div>
      </div>

      {viewMode === "marketing" ? (
        /* Marketing Landing Page: Client UI Reference — How It Works */
        <MarketingReference onSwitchToLiveStore={() => setViewMode("store")} />
      ) : (
        /* Live Functional Customer Storefront */
        <div className="flex flex-col min-h-screen animate-in fade-in duration-300">
          {/* Top Return-to-Spec Banner */}
          <div className="bg-amber-400 text-zinc-950 text-xs py-2 px-4 font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>LIVE STOREFRONT SANDBOX: Test Cart, Wishlist, Quick View & ⌘K Search</span>
            </div>
            <button
              onClick={() => setViewMode("marketing")}
              className="flex items-center gap-1 bg-zinc-950 text-white text-[11px] px-3 py-1 rounded-full hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Return to &quot;How It Works&quot; Spec</span>
            </button>
          </div>

          <Navbar />
          <main className="flex-1">
            <Hero />
            <TrustBar />
            <CategoryGrid />
            <ProductGrid />
            <FlashDrop />
            <ShoppableLookbook />
            <ReviewsSection />
            <CommunityGrid />
            <Newsletter />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}
