"use client";

import React, { useState } from "react";
import Image from "next/image";
import { REVIEWS } from "@/data/products";
import { Star, CheckCircle, ThumbsUp } from "lucide-react";

export function ReviewsSection() {
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});

  const handleVote = (id: string, initialCount: number) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1,
    }));
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rating Summary Header */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 mb-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Overall Score */}
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 pb-6 md:pb-0 md:pr-8">
              <span className="text-4xl sm:text-5xl font-black text-zinc-950 dark:text-white font-mono">
                4.92
              </span>
              <div className="flex items-center justify-center md:justify-start gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Based on 4,820+ verified purchaser reviews
              </p>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="md:col-span-5 space-y-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="w-12 text-zinc-600 dark:text-zinc-400 font-mono">5 Star</span>
                <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[94%]" />
                </div>
                <span className="w-8 text-right font-mono text-zinc-500">94%</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-12 text-zinc-600 dark:text-zinc-400 font-mono">4 Star</span>
                <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400/70 rounded-full w-[5%]" />
                </div>
                <span className="w-8 text-right font-mono text-zinc-500">5%</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-12 text-zinc-600 dark:text-zinc-400 font-mono">3 Star</span>
                <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400/40 rounded-full w-[1%]" />
                </div>
                <span className="w-8 text-right font-mono text-zinc-500">1%</span>
              </div>
            </div>

            {/* Satisfaction Highlight */}
            <div className="md:col-span-3 text-center md:text-right">
              <div className="inline-block bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 rounded-2xl text-left">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  <CheckCircle className="w-4 h-4" /> 99.4% Fit Accuracy
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  Customers report garments and shoes fit true to standard international sizing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => {
            const currentHelpful = helpfulVotes[rev.id] ?? rev.helpfulCount;
            return (
              <div
                key={rev.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Header Author Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-200">
                        <Image
                          src={rev.avatar}
                          alt={rev.author}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                            {rev.author}
                          </h4>
                          {rev.verified && (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400">{rev.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Title & Comment */}
                  <h5 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">
                    &ldquo;{rev.title}&rdquo;
                  </h5>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {rev.comment}
                  </p>
                </div>

                {/* Footer Tag & Helpful Vote */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-zinc-500 font-medium truncate max-w-[160px]">
                    Verified: {rev.productName}
                  </span>

                  <button
                    onClick={() => handleVote(rev.id, rev.helpfulCount)}
                    className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{currentHelpful}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
