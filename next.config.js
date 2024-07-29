module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
    unoptimized: true, // Adicione esta linha
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  output: 'export',
  distDir: 'out',
};
