// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    head: {
      title: 'VRV Global',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      //link: [{ rel: 'icon', type: 'image/png', href: "/public/favicon.png" }]
    }
  },
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  nitro: {
    plugins: ["~/server/plugins/mongodb.ts"],
  },
  runtimeConfig: {
    // mongodbUri
    mongodbUri: 'mongodb://127.0.0.1:27017/vrv',

    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
