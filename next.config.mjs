/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: "/",
            destination:'/intranet',
            permanent: true,
          },
        ]
      }
};

export default nextConfig;

