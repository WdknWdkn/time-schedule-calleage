/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // Vercelの場合はbasePathは不要（独自ドメインまたはvercel.appドメインを使用）
  // GitHub Pagesなど、サブディレクトリでホストする場合のみ必要
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || ''
};

module.exports = nextConfig;