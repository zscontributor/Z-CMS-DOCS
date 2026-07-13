import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.z-cms.org',
  redirects: {
    '/': '/vi/',
  },
  integrations: [
    starlight({
      title: {
        vi: 'Tài liệu Z-CMS',
        en: 'Z-CMS Documentation',
        ja: 'Z-CMS ドキュメント',
      },
      description: 'Hướng dẫn sử dụng, phát triển và vận hành Z-CMS.',
      favicon: '/favicon.png',
      head: [
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://docs.z-cms.org/apple-touch-icon.png' } },
      ],
      defaultLocale: 'vi',
      locales: {
        vi: { label: 'Tiếng Việt', lang: 'vi' },
        en: { label: 'English', lang: 'en' },
        ja: { label: '日本語', lang: 'ja' },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/zscontributor/z-cms-docs',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/zscontributor/z-cms-docs/edit/main/',
      },
      components: {
        SiteTitle: './src/components/TitleOnlySiteTitle.astro',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Người dùng',
          translations: { en: 'Users', ja: 'ユーザー' },
          items: [{ autogenerate: { directory: 'users', collapsed: false } }],
        },
        {
          label: 'Developers',
          translations: { ja: '開発者' },
          items: [{ autogenerate: { directory: 'developers', collapsed: true } }],
        },
        {
          label: 'Vận hành',
          translations: { en: 'Operators', ja: '運用者' },
          items: [{ autogenerate: { directory: 'operators', collapsed: true } }],
        },
        {
          label: 'Marketplace',
          translations: { ja: 'マーケットプレイス' },
          items: [{ autogenerate: { directory: 'marketplace', collapsed: true } }],
        },
        {
          label: 'Đóng góp',
          translations: { en: 'Contributing', ja: 'コントリビューション' },
          items: [{ autogenerate: { directory: 'contributing', collapsed: true } }],
        },
      ],
    }),
  ],
});
