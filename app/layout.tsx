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
  title: "MP.Store — Modern Indian E-Commerce & Curated Fashion",
  description:
    "MP.Store — Premium direct-to-consumer fashion, artisanal footwear, and leather essentials. All prices in Indian Rupees (₹) with 48h dispatch across India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FDFDFB] text-[#141413] font-sans selection:bg-[#E07A5F] selection:text-white">
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
