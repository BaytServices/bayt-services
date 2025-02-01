const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all HTTPS domains
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap', // Maps /sitemap.xml to /api/sitemap
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
