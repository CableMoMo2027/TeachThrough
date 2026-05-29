// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'tertiary',
        'info',
        'success',
        'warning',
        'error'
      ]
    }
  },

  alias: {
    'gsap': 'gsap',
    'gsap/ScrollTrigger': 'gsap/ScrollTrigger'
  },

  build: {
    transpile: ['gsap']
  },

  routeRules: {
    '/': { prerender: true }
  },

  experimental: {
    viewTransition: true
  },

  compatibilityDate: '2025-01-15',

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'gsap',
        'gsap/ScrollTrigger'
      ]
    },
    server: {
      allowedHosts: ['fridge-reminder-bullion.ngrok-free.dev']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
