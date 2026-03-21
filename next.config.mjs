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
};

export default nextConfig;
