// src/lib/seo.js
export function generateSeoMetadata({
  title,
  description,
  keywords,
  path,
  locale,
  images = []
}) {
  const siteName = locale === 'ar' ? 'بيت الخدمات' : 'Bayt Services';
  
  return {
    title: title[locale],
    description: description[locale],
    keywords: keywords[locale],
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${path}`,
      languages: {
        ar: `${process.env.NEXT_PUBLIC_SITE_URL}/ar${path}`,
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en${path}`
      },
    },
    openGraph: {
      title: title[locale],
      description: description[locale],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${path}`,
      siteName,
      locale,
      type: 'website',
      images: images.map(img => ({
        url: img,
        width: 800,
        height: 600,
        alt: title[locale]
      }))
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'google0bd58f874b86fa83.html',
    }
  };
}