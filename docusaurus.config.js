import { themes } from 'prism-react-renderer'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const lightTheme = themes.github
const darkTheme = themes.dracula

/** @type {import('@docusaurus/types').DocusaurusConfig} */
export default {
  title: 'Sage',
  tagline: 'AI at the Edge',
  url: 'https://waggle-sensor.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/sage-favicon.png',
  organizationName: 'waggle-sensor',
  projectName: 'sage-website',
  trailingSlash: false,
  future: {
    v4: {
      useCssCascadeLayers: true,
    },
  },
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    // additional, custom banner above the navbar; see src/components/CustomBanner.tsx
    noticeURL: 'https://raw.githubusercontent.com/waggle-sensor/portal-notice/main/notice.json',
    /* notice: {
      message: 'Some notice message here',
      severity: 'info', // 'info', 'warning', or 'error'
    }, */
    navbar: {
      title: 'Sage',
      logo: {
        alt: 'Site Logo',
        src: 'img/logo.png',
        // srcDark: 'img/logo_dark.svg'
      },
      items: [
        {
          label: 'About',
          to: '/about',
          position: 'left',
          items: [
            {
              label: 'About Sage Grande',
              to: '/about'
            }, {
              label: 'Team',
              to: '/team/leadership'
            }, {
              label: 'Photos',
              to: '/photos'
            }, {
              to: '/publications',
              label: 'Publications'
            }, {
              to: '/docs/contact-us',
              label: 'Contact Us',
              className: 'top-divider'
            },
          ],
        }, {
          label: 'Use Cases',
          to: '/use-cases/fire',
          position: 'left',
          items: [
            {
              label: 'Fire Science',
              to: '/use-cases/fire'
            }, {
              label: 'Drought Mitigation and Prediction',
              to: '/use-cases/ai-drought-mitigation'
            },
          ],
        }, {
          to: '/science/category/recent-projects',
          label: 'AI & Science'
        }, {
          to: '/labs',
          label: 'Labs',
        }, {
          to: '/news',
          label: 'News'
        }, {
          to: '/careers',
          label: 'Careers'
        }, {
          to: '/docs/about/overview',
          label: 'Docs'
        }, {
          type: 'dropdown',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
          to: 'https://github.com/waggle-sensor',
          items: [
            {
              label: 'Sage GitHub',
              href: 'https://github.com/sagecontinuum'
            },
            {
              label: 'Waggle Sensor GitHub',
              href: 'https://github.com/waggle-sensor'
            }
          ],
        }, {
          // note: this is positioned right of search bar
          type: 'custom-signInBtn',
          position: 'right',
        },
      ],
    },
    footer: {
      // see custom (swizzled) footer component:
      // src/theme/Footer/index.js
    },
    prism: {
      theme: lightTheme,
      darkTheme: darkTheme,
      prism: {
        additionalLanguages: ['bash', 'diff', 'json'],
      }
    },
    disableSwitch: true,
    algolia: {
      indexName: 'sage',
      contextualSearch: false, // mostly for versioned docs
      appId: 'XYV3A23P29',
      searchParameters: {},    // Optional: Algolia search parameters
      apiKey: '6e6879ba82bb9efece5580e945bd09ca',
    },
    colorMode: {
      disableSwitch: true
    },
    docs: {
      sidebar: {
        hideable: true,
      }
    },
    blog: {
      sidebar: {
        groupByYear: false // Disable year grouping
      }
    },
    announcementBar: {
      content: '<b><a href="/use-cases/fire">Call for Collaboration: Harnessing AI and Edge Computing for Fire Science</b>',
      isCloseable: true,
      textColor: 'rgb(1, 67, 97)',
      backgroundColor: 'rgb(229, 246, 253)',
    },
    /* uncomment the following to add a banner for outages/alerts or important news, see custom.css for more styling
    announcementBar: {
      content: '<b>ℹ️ Due to a planned data center migration, the Sage portal, web services, and nodes may be offline for extended periods. ℹ️</b>',
      isCloseable: false,
      textColor: 'rgb(102, 60, 0)',
      backgroundColor: 'rgb(255, 244, 229)',
    }
    // info colors:
    //   textColor: 'rgb(1, 67, 97)',
    //   backgroundColor: 'rgb(229, 246, 253)',
    */
  },
  themes: ['@docusaurus/theme-mermaid'],
  // In order for Mermaid code blocks in Markdown to work,
  // you also need to enable the Remark plugin with this option
  markdown: {
    mermaid: true,
  },
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  scripts: [{
    src: 'https://apis.google.com/js/api.js'
  }],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/waggle-sensor/sage-website/edit/main/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex]
        },
        blog: {
          path: 'news',
          routeBasePath: 'news',
          editUrl: 'https://github.com/waggle-sensor/sage-website/edit/main/',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Posts',
          onInlineAuthors: 'ignore', // ignore warnings about an author not being part of authors.yml, since not necessary
          onUntruncatedBlogPosts: 'ignore', // ignore warnings about no <!-- truncate --> marker, since some "blogs" are simply news snippets
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            frontMatter.hide_reading_time ?
              undefined :
              defaultReadingTime({content}),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-HT12937E9K',
          anonymizeIP: true,
        },
      },
    ]
  ],
  plugins: [
    require.resolve('./ignore-html-loader'),
    async function tailwindConfigPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('@tailwindcss/postcss'))
          postcssOptions.plugins.push(require('autoprefixer'))
          return postcssOptions
        },
      }
    }, [
      '@docusaurus/plugin-content-docs',
      {
        sidebarPath: require.resolve('./sidebars.js'),
        id: 'science',
        path: 'science',
        routeBasePath: 'science',
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        // ... other options
      },
    ], [
      '@docusaurus/plugin-content-docs',
      {
        id: 'team',
        path: 'team',
        routeBasePath: 'team',
        breadcrumbs: false
      },
    ], [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/tutorials/accessing-data',
            from: ['/data', '/docs/data']  // obscure fix for /data/ vs /data redirect(?)
          }, {
            to: '/use-cases/fire',
            from: ['/fire']
          }, {
            to: '/science/category/recent-projects',
            from: ['/science']
          },
        ],
      },
    ], [
      '@docusaurus/plugin-content-blog',
      {
        id: 'partners',
        path: 'partners',
        routeBasePath: 'partners',
        editUrl: 'https://github.com/waggle-sensor/sage-website/edit/main/',
        blogSidebarCount: 'ALL',
        blogSidebarTitle: 'Partner User Stories',
        blogListComponent: '@theme/partners/PartnerListPage',
        blogPostComponent: '@theme/partners/PartnerPostPage',
        blogTagsListComponent: '@theme/partners/PartnerTagsListPage',
        blogTagsPostsComponent: '@theme/partners/PartnerTagsPostsPage',
      },
    ],

    /* todo?: post science as blog entries for front matter and blog author meta?
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'sage-science',
        path: './science',
        routeBasePath: 'science',
        blogListComponent: '__todo__'
      },
    ],
    */
  ]
}
