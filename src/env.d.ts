/// <reference types="astro/client" />

interface ImportMetaEnv {
  // CAT-e API (public — client-side)
  readonly PUBLIC_CATE_API_URL: string;
  readonly PUBLIC_CATE_API_KEY: string;
  // WooCommerce REST API (server-side only)
  readonly WC_STORE_URL: string;
  readonly WC_CONSUMER_KEY: string;
  readonly WC_CONSUMER_SECRET: string;
  readonly WC_CATE_PLACEHOLDER_PRODUCT_ID: string;
  // WooCommerce checkout URL (public — client-side)
  readonly PUBLIC_WC_CHECKOUT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
