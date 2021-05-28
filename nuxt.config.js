export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ticket master - Flutterwave',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'We’d love to hear more about your business, and how we can best serve you.',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://flutterwave.com/',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@theflutterwave',
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@theflutterwave',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Speak with our sales team - Flutterwave',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'We’d love to hear more about your business, and how we can best serve you.',
      },
      {
        hid: 'twitter:image:src',
        name: 'twitter:image:src',
        content: 'https://flutterwave.com/images/graph/contact-sales.png',
      },
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'https://flutterwave.com/',
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'Speak with our sales team - Flutterwave',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Speak with our sales team - Flutterwave',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          'We’d love to hear more about your business, and how we can best serve you.',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: 'https://flutterwave.com/images/graph/contact-sales.png',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'best events happening now, events manager, trending events in africa, top events in africa, latest events in africa, book an event, create your event, trending events in nigeria, online events,  events venue, event directions',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/FLW-icon.png' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/sass/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/pagination.js',
    '~/plugins/datetime.js',
    '~/plugins/select.js',
    { src: '~/plugins/flutterwave.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  publicRuntimeConfig: {
    apiPublicKey: process.env.FW_PUBLIC_KEY,
    apiSecretKey: process.env.FW_SECRET_KEY,
  },

  privateRuntimeConfig: {},

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL,
  },

  loading: {
    color: '#f5a623',
    height: '8px',
  },

  loadingIndicator: {
    name: 'cube-grid',
    color: '#f5a623',
    background: 'white',
  },

  generate: {
    fallback: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'postcss-url': false,
      },
      preset: {
        autoprefixer: {
          flexbox: true,
          grid: true,
          overrideBrowserslist: ['last 3 versions', '> 1%', 'ie 8', 'ie 7'],
        },
      },
    },
  },
}
