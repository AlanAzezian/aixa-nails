import type { NextConfig } from "next";

// Solo permitimos optimizar imágenes del bucket público 'nail-works' de nuestro proyecto Supabase.
function supabaseImagePattern() {
  const pathname = "/storage/v1/object/public/nail-works/**";
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "");
    if (url.protocol === "https:" && url.hostname !== "placeholder-url.supabase.co") {
      return { protocol: "https" as const, hostname: url.hostname, port: "", pathname, search: "" };
    }
  } catch {
    // variable ausente o inválida: usamos el patrón genérico de Supabase
  }
  return { protocol: "https" as const, hostname: "*.supabase.co", port: "", pathname, search: "" };
}

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [supabaseImagePattern()],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
