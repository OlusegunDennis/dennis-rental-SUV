// app/page.tsx
import type { Metadata } from "next";

import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Services from "@/app/components/Services";
import Gallery from "@/app/components/Gallery";
import BookingCalculator from "@/app/components/BookingCalculator";
import Footer from "@/app/components/Footer";

// Page-specific SEO for the HOME page
export const metadata: Metadata = {
  title: "Home | Dennis SUV Rental",
  description:
    "Your top choice for secure Prado SUV rentals in Nigeria. Premium vehicles with optional professional security teams for safety and comfort. Book your ride today.",
  alternates: {
    canonical: "https://dennisuvrental.com/",
  },
  openGraph: {
    title: "Home | Dennis SUV Rental",
    description:
      "Premium Toyota Prado SUV rentals with optional security escort. Reliable, comfortable and affordable across Nigeria.",
    url: "https://dennisuvrental.com/",
    siteName: "Dennis SUV Rental",
    images: [
      {
        url: "https://dennisuvrental.com/images/prado-exterior-1.jpg", // swap to a real image on your domain
        width: 1200,
        height: 630,
        alt: "Toyota Prado SUV for rental in Nigeria",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Dennis SUV Rental",
    description:
      "Rent Toyota Prado SUVs with optional professional security. Book now.",
    images: ["https://dennisuvrental.com/images/prado-exterior-1.jpg"],
  },
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <BookingCalculator />
      <Footer />
    </main>
  );
}
