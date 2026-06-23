const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8051",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8051",
      },
      {
        protocol: "http",
        hostname: "::1",
        port: "8051",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;