import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  site: 'https://opensecflow.com',
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
    robotsTxt(),
    db(),
  ],
});

