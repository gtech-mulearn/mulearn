export function cdnUrl(path: string) {
    const base = import.meta.env.VITE_S3_CDN_URL?.replace(/\/$/, "") || "";
    const cleanPath = path.replace(/^\/+/, "");
    return `${base}/${cleanPath}`;
  }