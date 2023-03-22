// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'CISM'
    }
  },

  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt'
  ],

  css: [
    '@/assets/scss/index.scss'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/additionalData/index.scss";'
        }
      }
    }
  },

  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL
    }
  }
})
