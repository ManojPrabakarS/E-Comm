import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { SearchModal } from "@/components/SearchModal";
import { ToastContainer } from "@/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ATELIER STUDIOS — Architectural Luxury Essentials & Modern Design",
  description:
    "Direct-to-consumer artisanal essentials crafted from GOTS organic fabrics, aerospace alloy, and Tuscan leather. Engineered for longevity.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 font-sans selection:bg-amber-400 selection:text-zinc-950">
        <StoreProvider>
          {children}
          <CartDrawer />
          <QuickViewModal />
          <SearchModal />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
