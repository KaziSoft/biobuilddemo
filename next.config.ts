import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [ 'images.ctfassets.net', 'res.cloudinary.com'],
    unoptimized: true,
  },
  
  eslint:{
    ignoreDuringBuilds:true,
  },
};

export default nextConfig;
