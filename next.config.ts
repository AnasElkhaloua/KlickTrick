import createNextIntlPlugin from "next-intl/plugin";
import type {NextConfig} from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {key: "X-Content-Type-Options", value: "nosniff"},
          {key: "X-Frame-Options", value: "SAMEORIGIN"},
          {key: "Referrer-Policy", value: "strict-origin-when-cross-origin"},
          {key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()"},
          ...(process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true"
            ? []
            : [{key: "X-Robots-Tag", value: "noindex, nofollow, noarchive"}])
        ]
      }
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "64kb"
    }
  }
};

export default withNextIntl(nextConfig);
