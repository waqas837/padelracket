import Header from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

export default async function RootLayout({ children, params: { lang } }) {
  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    url: "https://webcamtest.live",
    name: "webcamtest, Test your webcam",
    description:
      "Use this application for check working of your webcam is fine or not.",
    operatingSystem: "Windows, MacOS, Chrome OS, Linux, iOS, Android",
    applicationCategory: "UtilitiesApplication",
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
    },
  };

  // Website schema
  const websiteSchema = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: "webcamtest.live",
    url: "https://webcamtest.live/",
  };

  // WebPage schema
  const webPageSchema = {
    "@id$": `https://webcamtest.live`,
    "@type": "WebPage",
    "@context": "http://schema.org",
  };

  return (
    <html lang={lang}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link
        rel="icon"
        href="/favicon-32x32.png"
        sizes="32x32"
        type="image/png"
      />
      <link
        rel="icon"
        href="/favicon-16x16.png"
        sizes="16x16"
        type="image/png"
      />
      <link
        rel="apple-touch-icon"
        href="/apple-touch-icon.png"
        sizes="180x180"
      />
      <link
        rel="icon"
        href="/android-chrome-192x192.png"
        sizes="192x192"
        type="image/png"
      />
      <link
        rel="icon"
        href="/android-chrome-512x512.png"
        sizes="512x512"
        type="image/png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplication),
        }}
      />

      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
      {/* Google Analytics Setup */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-JYSD6TBT8K`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JYSD6TBT8K');
          `,
        }}
      />
      {/* Modern GA4 integration */}
      <GoogleAnalytics gaId="G-JYSD6TBT8K" />
    </html>
  );
}
