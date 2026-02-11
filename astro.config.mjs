import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://desguacesvaldeferrin.es',
  integrations: [tailwind({ applyBaseStyles: false })],
});
