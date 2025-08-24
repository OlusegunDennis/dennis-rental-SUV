// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Metadata, Viewport } from "next"; // Import Viewport type for clarity

const inter = Inter({ subsets: ["latin"] });

// Your detailed metadata object (with themeColor removed)
export const metadata: Metadata = {
  title: "Dennis SUV Rental - Premium & Secure SUV Rentals",
  description:
    "Affordable Toyota Prado SUV rentals in Lagos, Nigeria with optional professional security escort. Book your secure and comfortable ride today for business, weddings, or travel.",
  keywords: [
    "SUV rental Nigeria",
    "Toyota Prado hire",
    "car rental with security",
    "affordable SUV rentals",
    "SUV rental Lagos",
    "Dennis rental naija",
  ],
  authors: [{ name: "Dennis Rental Naija" }],
  metadataBase: new URL("https://dennisuvrental.com"),
  openGraph: {
    title: "Dennis SUV Rental - Premium & Secure SUV Rentals",
    description:
      "Book reliable Toyota Prado SUV rentals with optional professional security. Affordable, safe, and comfortable rides across Nigeria.",
    url: "https://dennisuvrental.com",
    siteName: "Dennis SUV Rental",
    images: [
      {
        url: "https://dennisuvrental.com/images/prado-dashboard.jpg",
        width: 1200,
        height: 630,
        alt: "Toyota Prado SUV Rental",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dennis SUV Rental - Premium & Secure SUV Rentals",
    description:
      "Affordable SUV rentals with optional professional security team. Book your ride today.",
    images: ["https://dennisuvrental.com/images/prado-dashboard.jpg"],
    creator: "@dennis_rental",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://dennisuvrental.com",
  },
};

// ✅ FIX: The new viewport object, containing themeColor
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GTM_ID = "GTM-TLHC8JLF"; // Your GTM ID

  return (
    <html lang="en">
      <head>
        {/* Structured Data for Local SEO */}
        <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CarRental",
            name: "Dennis SUV Rental",
            url: "https://dennisuvrental.com",
            logo: "https://dennisuvrental.com/favicon.ico",
            image: "https://dennisuvrental.com/images/prado-dashboard.jpg",
            description:
              "Affordable Toyota Prado SUV rentals in Lagos with optional professional security.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Lagos",
              addressCountry: "NG",
            },
            telephone: "+2349032054555",
            priceRange: "$$",
          })}
        </Script>

        {/* Google Tag Manager Head Script */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager NoScript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {children}
      </body>
    </html>
  );
}