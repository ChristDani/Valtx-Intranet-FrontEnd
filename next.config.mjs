/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'localhost',
      port: '4000',
      pathname: '/public/banners/**',
    }]
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: '/intranet',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;

