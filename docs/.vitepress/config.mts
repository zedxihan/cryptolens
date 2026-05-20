import { defineConfig } from 'vitepress';

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
      { text: 'Docs', link: '#' },
      { text: 'Downloads', link: '/downloads' },
      { text: 'Privacy', link: '#' },
      { text: 'Terms', link: '#' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Docs',
          items: [
            { text: 'Getting Started', link: '#' },
            { text: 'Features', link: '#' },
            { text: 'Configuration', link: '#' },
            { text: 'Troubleshooting', link: '#' },
          ],
        },
      ],
      '/legal/': [
        {
          text: 'Legal',
          items: [
            { text: 'Privacy Policy', link: '#' },
            { text: 'Terms of Service', link: '#' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zedxihan/cryptolens' },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Patreon</title><path fill="currentColor" d="M22.957 7.21c0-3.483-2.827-6.31-6.31-6.31-3.483 0-6.31 2.827-6.31 6.31 0 3.484 2.827 6.31 6.31 6.31 3.484 0 6.31-2.827 6.31-6.31zM0 22.766h4.043V7.21H0v15.556z"/></svg>',
        },
        link: 'https://patreon.com/zedxihan',
        ariaLabel: 'Patreon',
      },
    ],
  },
});
