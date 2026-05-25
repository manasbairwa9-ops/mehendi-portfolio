import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/components/providers/trpc-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Mehndi Artistry | Award-Winning Henna Designs",
  description: "Professional mehndi artist specializing in bridal, Arabic, and modern henna designs. Book your appointment today for weddings, festivals, and special occasions.",
  keywords: ["mehndi", "henna", "bridal mehndi", "arabic mehndi", "wedding henna", "mehndi artist"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: "Mehndi Artistry",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-stone-50">
        <TRPCProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </TRPCProvider>
      </body>
    </html>
  );
}
