/** @type {import('next').NextConfig} */
const nextConfig = {
      eslint:{
            ignoreDuringBuilds: true,
      },
      typescript:{
            ignoreBuildErrors: true,},
      images: {
            remotePatterns: [
                  {
                        protocol: "https",
                        hostname: "ik.imagekit.io",
                        port: "",
                  },
            ],
      },
      experimental:{
            serverActions:{
                  bodySizeLimit:'50mb',
            },
      },
      
};

export default nextConfig;