/* eslint-disable @typescript-eslint/no-var-requires */
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const pnpapi = require('pnpapi');
const path = require('path');

require('@babel/register')({
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  ignore: [
    path => {
      const locator = pnpapi.findPackageLocator(path);

      if (locator.name.startsWith('@toss/')) {
        return false;
      }

      return true;
    },
  ],
  cache: true,
});

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Slash libraries',
  tagline: 'A collection of TypeScript/JavaScript packages to build high-quality web services ',
  url: 'https://slash.page/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://static.toss.im/tds/favicon/favicon.ico',
  organizationName: 'toss',
  projectName: 'slash',
  themeConfig: {
    navbar: {
      title: 'Slash libraries',
      logo: {
        alt: '토스',
        src: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'common/utils/README',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/toss/slash',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: '/libraries/utils/README',
            },
          ],
        },
        {
          title: '더보기',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/toss/slash',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Viva Republica, Inc.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexPages: true,
        language: ['en', 'ko'],
      },
    ],
  ],
  plugins: [require.resolve('./scripts/webpack5-compat.js')],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../packages',
          routeBasePath: '/libraries',
          sidebarPath: require.resolve('./sidebars.libraries.js'),
          exclude: ['**/CHANGELOG.md'],
          editUrl: ({ docPath }) => {
            const dirname = path.dirname(docPath);
            const markdownFilename = getFilename(docPath);
            const sourceFilename = getSourceFilename(markdownFilename);
            const editUrl = `${GITHUB_EDIT_PAGE_PREFIX}/packages/${dirname}/${sourceFilename}`;
            return editUrl;
          },
        },
        pages: {
          path: 'pages',
          routeBasePath: '/',
          include: ['**/*.{js,jsx,ts,tsx,md,mdx,html}'],
          mdxPageComponent: '@theme/MDXPage',
        },
      },
    ],
  ],
};

const GITHUB_EDIT_PAGE_PREFIX = 'https://github.com/toss/slash/edit/main';

/*
 @example
 input: twdk-next/src/components/TossNextApp/WebNavbarProvider/Navbar/type.generated.md
 output: type.generated.md
 */
function getFilename(path) {
  const names = path.split('/');
  const filename = names[names.length - 1];

  if (filename == null) {
    throw new Error(`path가 올바르지 않습니다. ${path}`);
  }

  return filename;
}

function getSourceFilename(markdownFilename) {
  const isAutoGenerated = markdownFilename.endsWith('.tossdocs.md');
  return isAutoGenerated ? markdownFilename.replace('.tossdocs.md', '') : markdownFilename;
}
