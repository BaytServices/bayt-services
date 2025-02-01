const BASE_URL = "https://bayt-services.com"; // Replace with your actual domain

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/'], // Add API endpoints to restrict from crawling
      },
      {
        userAgent: 'Googlebot',
        allow: '/public/', // If you have a public section, allow it specifically for Googlebot
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
