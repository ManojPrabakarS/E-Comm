"use client";

import React, { useState } from "react";
import Image from "next/image";
import { REVIEWS } from "@/data/products";
import { Star, CheckCircle, ThumbsUp, Sparkles } from "lucide-react";

export function ReviewsSection() {
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});

  const handleVote = (id: string, initialCount: number) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1,
    }));
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF9F5] border-t border-[#EAE8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rating Summary Header — 28px Card Well */}
        <div className="bg-white border border-[#EAE8E3] rounded-[28px] p-8 sm:p-10 mb-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Overall Score */}
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-[#EAE8E3] pb-6 md:pb-0 md:pr-8">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#E07A5F] mb-1">
                <Sparkles className="w-3 h-3" />
                <span>VERIFIED COMMUNITY</span>
              </div>
              <p className="text-4xl sm:text-5xl font-black text-[#141413] font-mono">
                4.92
              </p>
              <div className="flex items-center justify-center md:justify-start gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4A373] text-[#D4A373]" />
                ))}
              </div>
              <p className="text-xs text-[#5C5B57]">
                Based on 4,820+ verified purchaser reviews
              </p>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="md:col-span-5 space-y-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="w-12 text-[#5C5B57] font-mono">5 Star</span>
                <div className="flex-1 h-2 bg-[#F2F0EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#141413] rounded-full w-[94%]" />
                </div>
                <span className="w-8 text-right font-mono text-[#8C8B85]">94%</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-12 text-[#5C5B57] font-mono">4 Star</span>
                <div className="flex-1 h-2 bg-[#F2F0EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#5C5B57] rounded-full w-[5%]" />
                </div>
                <span className="w-8 text-right font-mono text-[#8C8B85]">5%</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-12 text-[#5C5B57] font-mono">3 Star</span>
                <div className="flex-1 h-2 bg-[#F2F0EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#8C8B85] rounded-full w-[1%]" />
                </div>
                <span className="w-8 text-right font-mono text-[#8C8B85]">1%</span>
              </div>
            </div>

            {/* Satisfaction Highlight */}
            <div className="md:col-span-3 text-center md:text-right">
              <div className="inline-block bg-[#FAF3F0] border border-[#E07A5F]/20 p-4 rounded-2xl text-left">
                <div className="flex items-center gap-2 text-[#E07A5F] font-bold text-xs sm:text-sm">
                  <CheckCircle className="w-4 h-4" /> 99.4% Fit Accuracy
                </div>
                <p className="text-[11px] text-[#5C5B57] mt-1 leading-relaxed">
                  Garments and artisanal footwear fit true to standard international sizing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid — 3 Column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => {
            const currentHelpful = helpfulVotes[rev.id] ?? rev.helpfulCount;
            return (
              <div
                key={rev.id}
                className="bg-white border border-[#EAE8E3] rounded-[22px] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Header Author Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#F2F0EB]">
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
                          <h4 className="text-xs sm:text-sm font-bold text-[#141413]">
                            {rev.author}
                          </h4>
                          {rev.verified && (
                            <CheckCircle className="w-3.5 h-3.5 text-[#2D6A4F]" />
                          )}
                        </div>
                        <p className="text-[10px] text-[#8C8B85]">{rev.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4A373] text-[#D4A373]" />
                      ))}
                    </div>
                  </div>

                  {/* Title & Comment */}
                  <h5 className="text-xs sm:text-sm font-bold text-[#141413] mb-2 leading-snug">
                    &ldquo;{rev.title}&rdquo;
                  </h5>
                  <p className="text-xs text-[#5C5B57] leading-relaxed mb-4 font-normal">
                    {rev.comment}
                  </p>
                </div>

                {/* Footer Tag & Helpful Vote */}
                <div className="pt-4 border-t border-[#F0EFEB] flex items-center justify-between text-xs">
                  <span className="text-[10px] text-[#8C8B85] font-medium truncate max-w-[150px]">
                    Verified: {rev.productName}
                  </span>

                  <button
                    onClick={() => handleVote(rev.id, rev.helpfulCount)}
                    className="flex items-center gap-1.5 text-[#5C5B57] hover:text-[#141413] bg-[#F6F5F1] px-2.5 py-1 rounded-full text-[11px] transition-colors"
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
