/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            { hostname: 'specter-blog-api.s3.eu-north-1.amazonaws.com' },
            { hostname: 'res.cloudinary.com' },
        ],
    },
};
export default nextConfig;
