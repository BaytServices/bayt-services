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
