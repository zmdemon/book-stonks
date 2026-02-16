import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { GenerateSW } from '@aaroon/workbox-rspack-plugin';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'Book Stonks',
    meta: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
      'theme-color': '#3182ce',
      description: 'Трекер чтения книг',
      'apple-mobile-web-app-capable': 'yes',
    },
    tags: [
      {
        tag: 'link',
        attrs: { rel: 'manifest', href: '/manifest.json' },
        publicPath: false,
      },
      {
        tag: 'link',
        attrs: { rel: 'apple-touch-icon', href: '/icons/icon-192.png' },
        publicPath: false,
      },
    ],
  },
  tools: {
    rspack: {
      plugins: [
        new GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
        }),
      ],
    },
  },
});
