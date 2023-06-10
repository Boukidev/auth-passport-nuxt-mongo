// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    mongoUri: process.env.MONGODB_URI,
  },

  css: ["~/assets/styles/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '~/assets/styles/_variables.scss';",
        },
      },
    },
  },

  modules: ["nuxt-icon"],

  nitro: {
    plugins: ["~/server/api/plugin.ts"],
  },
});
