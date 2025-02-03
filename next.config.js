const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/ar/sitemap.xml',
        destination: '/api/sitemap?lang=ar', // Pass language as a query param
      },
      {
        source: '/en/sitemap.xml',
        destination: '/api/sitemap?lang=en', // Pass language as a query param
      },
      {
        source: '/ar/robots.txt',  // or any other locale path
        destination: '/robots.txt', // redirect to the root robots.txt
      },
      {
        source: '/en/robots.txt',  // or any other locale path
        destination: '/robots.txt', // redirect to the root robots.txt
      },
      {
        source: '/ar/favicon.ico',
        destination: '/favicon.ico', // Map localized path to the root favicon
      },
      {
        source: '/en/favicon.ico',
        destination: '/favicon.ico', // Map localized path to the root favicon
      },
      {
        source: '/ar/icon.svg',
        destination: '/icon.svg', // Map localized path to the root SVG icon
      },
      {
        source: '/en/icon.svg',
        destination: '/icon.svg', // Map localized path to the root SVG icon
      },
      {
        source: '/ar/apple-touch-icon.png',
        destination: '/apple-touch-icon.png', // Map localized path to the root touch icon
      },
      {
        source: '/en/apple-touch-icon.png',
        destination: '/apple-touch-icon.png', // Map localized path to the root touch icon
      },
    ];
  },
  reactStrictMode: true,
  devIndicators: {
    autoPrerender: false,
  },
  webpack(config, { isServer }) {
    if (isServer) {
      console.log("Server-side webpack build...");
    }
    return config;
  },
};

module.exports = nextConfig;
