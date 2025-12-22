const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.microcms-assets.io"
            }
        ]
    },
    typedRoutes: true,
    output: "standalone"
};

export default nextConfig;
