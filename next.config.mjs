/** @type {import('next').NextConfig} */
const nextConfig = {
remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',


}]};

export default nextConfig;
