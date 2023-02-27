export const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://api.trynoice.com"
    : "https://api.staging.trynoice.com";

export const CDN_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://cdn.trynoice.com"
    : "https://cdn.staging.trynoice.com";
