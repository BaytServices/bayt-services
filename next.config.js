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
      // Static assets (favicon, icons, manifest, etc.) handling for /ar and /en paths
      {
        source: '/:lang(ar|en)/favicon-96x96.png',
        destination: '/favicon-96x96.png',
      },
      {
        source: '/:lang(ar|en)/favicon-mod.svg',
        destination: '/favicon-mod.svg',
      },
      {
        source: '/:lang(ar|en)/favicon-mod.ico',
        destination: '/favicon-mod.ico',
      },
      {
        source: '/:lang(ar|en)/apple-touch-icon.png',
        destination: '/apple-touch-icon.png',
      },
      {
        source: '/:lang(ar|en)/site.webmanifest',
        destination: '/site.webmanifest',
      },
      // You can add more specific rewrites for other assets if needed, but this should cover the main ones

      // Specific rewrite for robots.txt and sitemap.xml
      {
        source: '/:lang(ar|en)/robots.txt',
        destination: '/robots.txt',
      },
      {
        source: '/:lang(ar|en)/sitemap.xml',
        destination: '/api/sitemap?lang=:lang', // Pass language as a query param
      },
    ];
  },
  reactStrictMode: true,
  devIndicators: {
    autoPrerender: false,
  },
  webpack(config, { isServer }) {
    if (isServer) {
      console.log('Server-side webpack build...');
    }
    return config;
  },
};

module.exports = nextConfig;
