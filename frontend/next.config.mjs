/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['specter-blog-api.s3.eu-north-1.amazonaws.com'], // Add your external image domain here
    },
};
export default nextConfig;
