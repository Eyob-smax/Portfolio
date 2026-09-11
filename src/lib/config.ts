/**
 * Where the portfolio backend lives.
 *
 * Vite inlines `import.meta.env.VITE_*` at build time, so this is fixed when
 * `npm run build` runs — changing it later means rebuilding, not restarting.
 * The literal fallback keeps a fresh clone working with no `.env` at all.
 */
const DEFAULT_API_BASE_URL = "https://portfolio-backend-two-mocha.vercel.app";

/** No trailing slash, so `${BASE_URL}/posts` never becomes a double slash. */
export const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/+$/, "");

export const STREAM_ENDPOINT = `${BASE_URL}/ai/stream`;
