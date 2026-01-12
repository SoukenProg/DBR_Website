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
    output: "standalone",
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-Robots-Tag",
                        value: "noindex, nofollow"
                    }
                ]
            }
        ];
    }
};

export default nextConfig;
