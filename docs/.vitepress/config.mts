import { readFileSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vitepress';

// Read version from package.json dynamically
const version = JSON.parse(
  readFileSync(resolve(process.cwd(), 'package.json'), 'utf-8'),
).version;

export default defineConfig({
  title: 'CryptoLens',
  description:
    'A clean, modern, and distraction-free cryptocurrency monitoring dashboard',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    search: { provider: 'local' },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/guide/getting-started' },
      { text: 'Downloads', link: '/downloads' },
      { text: 'Privacy', link: '/privacy' },
      { text: 'Terms', link: '/terms' },
      {
        text: `v${version}`,
        link: 'https://github.com/zedxihan/cryptolens/releases',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Docs',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Configuration', link: '/guide/config' },
            { text: 'Features', link: '/guide/features' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' },
          ],
        },
      ],
      '/legal/': [
        {
          text: 'Legal',
          items: [
            { text: 'Privacy Policy', link: '/privacy' },
            { text: 'Terms of Service', link: '/terms' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zedxihan/cryptolens' },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Patreon</title><path fill="currentColor" d="M22.957 7.21c-.004-3.064-2.391-5.576-5.191-6.482-3.478-1.125-8.064-.962-11.384.604C2.357 3.231 1.093 7.391 1.046 11.54c-.039 3.411.302 12.396 5.369 12.46 3.765.047 4.326-4.804 6.068-7.141 1.24-1.662 2.836-2.132 4.801-2.618 3.376-.836 5.678-3.501 5.673-7.031Z"/></svg>',
        },
        link: 'https://patreon.com/zedxihan',
        ariaLabel: 'Patreon',
      },
    ],
  },
  vite: {
    plugins: [
      {
        name: 'replace-version',
        enforce: 'pre',
        transform: (code, id) =>
          id.includes('.md') ? code.replace(/__VERSION__/g, version) : code,
      },
    ],
  },
});
