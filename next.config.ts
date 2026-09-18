import type { NextConfig } from "next";

// The server only needs to serve generated files; keeping export mode here prevents runtime drift.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
