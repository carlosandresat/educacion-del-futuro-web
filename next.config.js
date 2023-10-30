/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },    
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.youtube.com',
            port: '',
            pathname: '/vi/**',
          },
        ],
      },
}

module.exports = nextConfig
