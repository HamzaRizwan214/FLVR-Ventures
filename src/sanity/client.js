import { createClient } from "@sanity/client";

// Publishable values (safe in the browser). Vite only exposes variables that start with VITE_,
// so SANITY_PROJECT_ID in .env is not visible here; the defaults below are used unless
// VITE_SANITY_PROJECT_ID / VITE_SANITY_DATASET are set. Only published documents are readable
// without a token, so drafts never reach the website.
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "5alx9d7z",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2026-05-15",
  useCdn: true,
});
