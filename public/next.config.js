// next.config.js para ser usado como fallback se o mjs não for suportado
module.exports = {
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  webpack: (config) => {
    config.optimization.minimize = true;
    return config;
  },
}
