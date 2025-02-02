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
  const { locale } = await params
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
    locale
  });

  // Structured Data for Homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": locale === 'ar' ? 'بيت الخدمات' : 'Bayt Services',
    "url": "https://bayt-services.com/",
    "description": locale === 'ar'
      ? "اكتشف مزودي خدمات المنازل الموثوقين في مدينتك. نوفر مجموعة واسعة من الخدمات الموثوقة في جميع أنحاء المملكة العربية السعودية لتلبية جميع احتياجاتك المنزلية والحياتية."
      : "Discover trusted home service providers in your city. Offering a wide range of reliable services across Saudi Arabia, we connect you with professionals for all your home and lifestyle needs.",
    "sameAs": [
      "https://www.facebook.com/your-facebook-page",
      "https://twitter.com/your-twitter-handle",
      "https://www.instagram.com/your-instagram-handle"
    ]
  };

  return {
    ...metadata,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://bayt-services.com/${locale}`,
      images: ["/path/to/default-image.jpg"], // Add a default image for social sharing
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: ["/path/to/default-image.jpg"],
    },
    structuredData: JSON.stringify(structuredData)
  };
}

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="icon" href="https://www.bayt-services.com/favicon.ico" />
        <link rel="canonical" href="https://bayt-services.com/ar" />
        <link rel="alternate" hreflang="ar" href="https://bayt-services.com/ar" />
        <link rel="icon" href="https://yourdomain.com/favicon.ico" type="image/x-icon" />
        <meta property="og:image" content="https://www.bayt-services.com/favicon.ico/" />

        <link rel="canonical" href="https://bayt-services.com/en" />
        <link rel="alternate" hreflang="ar" href="https://bayt-services.com/en" />
        <meta name="google-site-verification" content="sQJZlEnPUPHp84QFBQNNe6s-qqpQV8oFYtVA5TXq7iw" />
        <script type='application/ld+json' >          {`${JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": locale === 'ar' ? 'بيت الخدمات' : 'Bayt Services',
          "url": "https://bayt-services.com/",
          "description": locale === 'ar'
            ? "اكتشف مزودي خدمات المنازل الموثوقين في مدينتك. نوفر مجموعة واسعة من الخدمات الموثوقة في جميع أنحاء المملكة العربية السعودية لتلبية جميع احتياجاتك المنزلية والحياتية."
            : "Discover trusted home service providers in your city. Offering a wide range of reliable services across Saudi Arabia, we connect you with professionals for all your home and lifestyle needs.",
          "sameAs": [
            "https://www.facebook.com/your-facebook-page",
            "https://twitter.com/your-twitter-handle",
            "https://www.instagram.com/your-instagram-handle"
          ]
        })
          }`
        }</script>


      </head>
      <body>
        <Navbar locale={locale} />

        <main >
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}