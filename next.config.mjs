/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  async rewrites() {
    return [
      // Standalone AI skills test (static page in public/ai-test/)
      { source: '/ai-test', destination: '/ai-test/index.html' },
    ];
  },
};

export default nextConfig;
