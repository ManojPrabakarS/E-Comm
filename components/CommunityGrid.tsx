import React from "react";
import Image from "next/image";
import { Camera, ArrowUpRight, Sparkles } from "lucide-react";

export function CommunityGrid() {
  const communityPosts = [
    {
      id: "ugc-1",
      handle: "@nordic_minimal",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600",
      tag: "Heavyweight Studio Overshirt",
    },
    {
      id: "ugc-2",
      handle: "@clara_vance",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
      tag: "Merino Wool Pleated Trouser",
    },
    {
      id: "ugc-3",
      handle: "@tokyo_street",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=600",
      tag: "Kanso Minimal Low-Top",
    },
    {
      id: "ugc-4",
      handle: "@arch_curator",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
      tag: "Nomad Leather Weekender",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FDFDFB] border-t border-[#EAE8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#E07A5F] mb-1.5">
              <Camera className="w-3.5 h-3.5" />
              <span>COMMUNITY STYLING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-[#141413]">
              <strong className="font-extrabold">Styled</strong> By You
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#141413] hover:text-[#E07A5F] transition-colors mt-2 sm:mt-0 uppercase tracking-wider"
          >
            <span>Tag #MPStore to be featured</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {communityPosts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-[22px] overflow-hidden bg-[#F2F0EB] shadow-sm border border-[#EAE8E3]"
            >
              <Image
                src={post.image}
                alt={post.handle}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-4 text-white">
                <p className="text-xs font-bold text-[#FFAE98] font-mono">{post.handle}</p>
                <p className="text-[11px] text-white/90 line-clamp-1">{post.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
