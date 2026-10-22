"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HERO_SLIDES } from "@/data/products";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Star } from "lucide-react";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = HERO_SLIDES[currentSlide];

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white min-h-[640px] lg:min-h-[720px] flex items-center">
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
              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/75 to-zinc-950/30" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-zinc-950/40 to-zinc-950/80" />
            </div>
          );
        })}
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wider uppercase backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{slide.badge}</span>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-300 font-mono text-[11px]">{slide.eyebrow}</span>
          </div>

          {/* Signature Two-Weight Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-zinc-100 leading-[1.1] mb-6">
            <strong className="font-extrabold text-white tracking-tight">{slide.titleBold}</strong>{" "}
            <span className="text-zinc-400 font-light">{slide.titleLight}</span>
          </h1>

          {/* Subtitle description */}
          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed mb-8 max-w-xl">
            {slide.subtitle}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm px-7 py-3.5 rounded-full shadow-lg hover:shadow-amber-400/20 transition-all duration-200 group"
            >
              <span>{slide.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#lookbook"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-6 py-3.5 rounded-full backdrop-blur-md border border-white/15 transition-all duration-200"
            >
              <span>{slide.ctaSecondary}</span>
            </a>
          </div>

          {/* Live Trust Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15 max-w-lg">
            {slide.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-mono">
                  {stat.value}
                </p>
                <p className="text-xs text-zinc-400 font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-3">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-amber-400 hover:text-black text-white border border-white/20 flex items-center justify-center backdrop-blur-sm transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 px-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-amber-400 hover:text-black text-white border border-white/20 flex items-center justify-center backdrop-blur-sm transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
