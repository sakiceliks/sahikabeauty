/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable minification in development to get better error messages
  swcMinify: process.env.NODE_ENV === 'production',
  
  // Enable React strict mode for better error detection
  reactStrictMode: true,
  
  // Enable experimental features
  experimental: {
    // Enable server components
    serverComponentsExternalPackages: ['mongodb'],
  },
  
  // Image optimization
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
  },
  
  // Webpack configuration for better error handling
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Better error messages in development
      config.optimization.minimize = false;
    }
    return config;
  },
  
  // Headers for better security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
