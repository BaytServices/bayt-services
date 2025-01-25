const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'example.com',
      'another-domain.com',
      'images.pexels.com',
      'img.freepik.com',
    ],
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
