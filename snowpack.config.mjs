/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  alias: {
    '@': './src'
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
    /* ... */
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
