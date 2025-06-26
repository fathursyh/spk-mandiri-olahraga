// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  prefetch: {
    prefetchAll: true, 
    defaultStrategy: 'hover'
  },
  integrations: [icon(), vue()],
  redirects: {},
});