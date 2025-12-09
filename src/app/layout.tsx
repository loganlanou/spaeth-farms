import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spaeth Farms | Premium Wisconsin Beef Delivered Nationwide",
  description: "Family-owned Spaeth Farms delivers premium, farm-raised Wisconsin beef directly to your door. Shop our selection of steaks, roasts, ground beef, and custom bundles with nationwide shipping.",
  keywords: "beef, farm beef, Wisconsin beef, grass fed beef, premium steaks, beef delivery, farm to table, Spaeth Farms",
  icons: {
    icon: [
      { url: '/spaeth-farms/favicon.ico' },
    ],
    apple: [
      { url: '/spaeth-farms/apple-touch-icon.png' },
    ],
  },
  openGraph: {
    title: "Spaeth Farms | Premium Wisconsin Beef",
    description: "Premium farm-raised beef delivered nationwide. Experience the quality of Wisconsin family farming.",
    type: "website",
    images: [{ url: '/spaeth-farms/images/logo.png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
