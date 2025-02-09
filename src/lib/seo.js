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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Default image handling
  const defaultImages = [{
    url: `${baseUrl}/og-default.jpg`,
    width: 1200,
    height: 630,
    alt: title[locale],
  }];

  const finalImages = images.length > 0 ? images : defaultImages;

  return {
    metadataBase: new URL(baseUrl),
    title: title[locale],
    description: description[locale],
    keywords: keywords[locale],
    alternates: {
      canonical: `${baseUrl}/ar${path}`,
      languages: {
        'ar-SA': `${baseUrl}/ar${path}`,
        'en-US': `${baseUrl}/en${path}`,
      },
    },
    openGraph: {
      title: title[locale],
      description: description[locale],
      url: `${baseUrl}/${locale}/${path}`,
      siteName,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
      images: finalImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: title[locale],
      description: description[locale],
      images: finalImages,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'sQJZlEnPUPHp84QFBQNNe6s-qqpQV8oFYtVA5TXq7iw',
      yandex: 'yandex-verification-code',
    },
    other: {}
  };
}