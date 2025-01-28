const BASE_URL = "https://bayt.com"; // Replace with your actual domain

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'], // Add any restricted paths
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}