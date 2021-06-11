/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  alias: {
    graphql: './src/graphql',
    pages: './src/pages',
    components: './src/components',
    hocs: './src/hocs',
    hooks: './src/hooks',
    utils: './src/utils',
    images: './src/images'
  },
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' }
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv'
  ],
  routes: [
    { match: 'routes', src: '.*', dest: '/index.html' }
  ],
  optimize: {
    bundle: true
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    port: 7001
  },
  buildOptions: {
    /* ... */
  }
}
