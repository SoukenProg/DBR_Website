const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.microcms-assets.io"
            },
            {
                protocol: "https",
                hostname: "placehold.co"
            }
        ]
    },
    typedRoutes: true,
};

export default nextConfig;
