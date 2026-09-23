import type { NextConfig } from 'next';
const config: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  experimental: process.env.CODEX_LOCAL === '1' ? {workerThreads:true, cpus:2, webpackBuildWorker:false, useTypeScriptCli:false} : {},
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  async redirects() { return []; },
  async headers() { return [{source: '/:path*', headers: [
    {key:'X-Content-Type-Options',value:'nosniff'},
    {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
    {key:'X-Frame-Options',value:'DENY'},
    {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'}
  ]}]; }
};
export default config;
