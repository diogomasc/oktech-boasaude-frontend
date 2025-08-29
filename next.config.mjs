/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: [
        "http://localhost:3000",
        "http://192.168.0.7:3000" // seu IP de rede local
    ],
};

export default nextConfig;
