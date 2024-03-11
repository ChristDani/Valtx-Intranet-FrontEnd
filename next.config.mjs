import { createProxyMiddleware } from 'http-proxy-middleware';

const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [{
      protocol: 'http',
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
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/images/:path*', // Define la ruta para las solicitudes que serán redirigidas al backend
        destination: 'http://localhost:4000/public/:path*', // Especifica la URL del backend
      },
    ];
  },
};

export default nextConfig;
