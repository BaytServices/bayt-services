// src/app/[locale]/layout.js
import Navbar from '../../components/layout/Navbar';
import { generateSeoMetadata } from '../../lib/seo';
import "../../styles/normalize.css"
import "../../styles/globals.css"
import "../../styles/media.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../../components/layout/Footer';
import Logo from "../../assets/images/logo.png"

export async function generateMetadata({ params }) {
  const { locale } = params;
  const defaultImages = [
    {
      url: 'https://www.bayt-services.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: locale === 'ar' ? 'بيت الخدمات' : 'Bayt Services',
    }
  ];

  const metadata = generateSeoMetadata({
    title: {
      ar: 'بيت الخدمات - خدمات موثوقة في جميع مدن المملكة',
      en: 'Bayt Services - Trusted Services Across Saudi Arabia'
    },
    description: {
      ar: "اكتشف مزودي خدمات المنازل الموثوقين في مدينتك. نوفر مجموعة واسعة من الخدمات الموثوقة في جميع أنحاء المملكة العربية السعودية لتلبية جميع احتياجاتك المنزلية والحياتية.",
      en: "Discover trusted home service providers in your city. Offering a wide range of reliable services across Saudi Arabia, we connect you with professionals for all your home and lifestyle needs."
    },
    keywords: {
      ar: 'خدمات منزلية, خدمات تنظيف, صيانة منازل, نقل اثاث, خدمات السعودية',
      en: 'home services, cleaning services, maintenance, moving services, saudi arabia services'
    },
    path: '/',
    locale,
    images: defaultImages
  });

  // Enhanced Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": locale === 'ar' ? 'بيت الخدمات' : 'Bayt Services',
    "url": "https://bayt-services.com/",
    "logo": "https://www.bayt-services.com/logo.png",
    "image": defaultImages[0].url,
    "description": metadata.description,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
      "addressRegion": "All Saudi Arabia"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Arabic", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/your-facebook-page",
      "https://twitter.com/your-twitter-handle",
      "https://www.instagram.com/your-instagram-handle"
    ]
  };

  return {
    ...metadata,
    other: {
      structuredData: JSON.stringify(structuredData)
    }
  };
}

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <link rel="canonical" href={`https://bayt-services.com/${locale}`} />
        <link rel="alternate" hreflang="ar" href="https://bayt-services.com/ar" />
        <link rel="alternate" hreflang="en" href="https://bayt-services.com/en" />
        <link rel="alternate" hreflang="x-default" href="https://bayt-services.com" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "${locale === 'ar' ? 'بيت الخدمات' : 'Bayt Services'}",
              "url": "https://bayt-services.com/",
              "logo": "https://www.bayt-services.com/logo.png",
              "image": "https://www.bayt-services.com/og-image.jpg",
              "description": "${locale === 'ar' ? 'اكتشف مزودي خدمات المنازل الموثوقين في مدينتك...' : 'Discover trusted home service providers in your city...'}",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SA",
                "addressRegion": "All Saudi Arabia"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["Arabic", "English"]
              },
              "sameAs": [
                "https://www.facebook.com/your-facebook-page",
                "https://twitter.com/your-twitter-handle",
                "https://www.instagram.com/your-instagram-handle"
              ]
            }
          `}
        </script>

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4RQMN4VKKL" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4RQMN4VKKL', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>

      <body itemScope itemType="https://schema.org/WebPage">
        <Navbar locale={locale} />
        
        <main itemScope itemType="https://schema.org/Service">
          {children}
        </main>
        
        <Footer locale={locale} />
      </body>
    </html>
  );
}