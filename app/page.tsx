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
  // Default view is the live boutique storefront for MP.Store
  const [viewMode, setViewMode] = useState<"store" | "marketing">("store");

  return (
    <div className="relative min-h-screen bg-[#FDFDFB]">
      {/* Floating Global Mode Switcher for Client Review */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-[#141413]/90 text-white border border-white/15 p-1.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-1">
          <button
            onClick={() => setViewMode("store")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full transition-all ${
              viewMode === "store"
                ? "bg-[#E07A5F] text-white shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>MP.Store Front</span>
          </button>

          <button
            onClick={() => setViewMode("marketing")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full transition-all ${
              viewMode === "marketing"
                ? "bg-[#E07A5F] text-white shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>How It Works (Client Spec)</span>
          </button>
        </div>
      </div>

      {viewMode === "marketing" ? (
        /* Marketing Landing Page: Client UI Reference — How It Works */
        <MarketingReference onSwitchToLiveStore={() => setViewMode("store")} />
      ) : (
        /* Live Functional Customer Storefront — MP.Store */
        <div className="flex flex-col min-h-screen animate-in fade-in duration-300">
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
