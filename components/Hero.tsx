"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HERO_SLIDES } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag, Sparkles, Star } from "lucide-react";

export function Hero() {
  const { addToCart, setQuickViewProduct } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = HERO_SLIDES[currentSlide];

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const handleQuickAddFeatured = () => {
    const { PRODUCTS } = require("@/data/products");
    addToCart(PRODUCTS[0]);
  };

  return (
    <section className="relative px-3 sm:px-6 lg:px-8 py-3 sm:py-6 bg-[#FDFDFB]">
      {/* Outer Framed Hero Container — 32px Border-Radius Aesthetic */}
      <div className="relative overflow-hidden rounded-[24px] sm:rounded-[36px] bg-[#141413] text-white min-h-[580px] lg:min-h-[680px] flex items-center shadow-xl">
        {/* Background Slides with LCP optimization */}
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((item, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {/* Modern Web Guidance: first slide is LCP candidate, fetchpriority="high" and priority */}
                <Image
                  src={item.image}
                  alt={item.titleBold + " " + item.titleLight}
                  fill
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "low"}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 1280px) 100vw, 1600px"
                  className="object-cover object-center scale-105 transition-transform duration-[8000ms] ease-out will-change-transform"
                />
                {/* Editorial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              </div>
            );
          })}
        </div>

        {/* Hero Foreground Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-24 w-full">
          <div className="max-w-2xl">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full mb-6 tracking-wider uppercase backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-500">
              <Sparkles className="w-3.5 h-3.5 text-[#FFAE98]" />
              <span>{slide.badge}</span>
              <span className="text-white/40">·</span>
              <span className="text-white/90 font-mono text-[10px]">{slide.eyebrow}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.08] mb-6">
              <strong className="font-extrabold text-white tracking-tight">{slide.titleBold}</strong>{" "}
              <span className="text-white/85 font-light italic font-serif">{slide.titleLight}</span>
            </h1>

            {/* Subtitle description */}
            <p className="text-sm sm:text-base text-white/80 font-normal leading-relaxed mb-8 max-w-lg">
              {slide.subtitle}
            </p>

            {/* Call to Actions — Pill Elements */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 bg-[#FDFDFB] hover:bg-white text-[#141413] font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 group"
              >
                <span>{slide.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#lookbook"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm px-6 py-3.5 rounded-full backdrop-blur-md border border-white/20 transition-all duration-200"
              >
                <span>{slide.ctaSecondary}</span>
              </a>
            </div>

            {/* Live Trust Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20 max-w-md">
              {slide.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-mono">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-white/70 font-medium mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Peeking Product Card */}
        {slide.featuredPiece && (
          <div className="hidden lg:flex absolute bottom-8 right-10 z-20 items-center gap-3.5 bg-black/60 hover:bg-black/75 backdrop-blur-md border border-white/20 p-3 pr-4 rounded-2xl shadow-2xl transition-all max-w-sm">
            <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-white/10 shrink-0">
              <Image
                src={slide.featuredPiece.image}
                alt={slide.featuredPiece.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#FFAE98] uppercase tracking-wider block font-bold">
                Featured Piece
              </span>
              <p className="text-xs font-bold text-white line-clamp-1">
                {slide.featuredPiece.name}
              </p>
              <div className="flex items-center justify-between gap-3 mt-1">
                <span className="font-mono text-xs font-bold text-white">
                  {slide.featuredPiece.price}
                </span>
                <button
                  onClick={handleQuickAddFeatured}
                  className="bg-[#E07A5F] hover:bg-[#C86A50] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors"
                >
                  <ShoppingBag className="w-3 h-3" /> Quick Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Slide Navigation Controls */}
        <div className="absolute bottom-8 left-6 sm:left-14 z-20 flex items-center gap-2.5">
          <button
            onClick={prevSlide}
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center backdrop-blur-sm transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 px-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "w-7 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center backdrop-blur-sm transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
