module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
    unoptimized: true,
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
  distDir: 'out', // O diretório de saída para exportação estática
};
