export default {
  // Other Nuxt.js configurations...
  serverMiddleware: [
    { path: '/api', handler: '~/middleware/api' },
  ],
  server: {
    static: {
      prefix: false
    }
  },

  
  // Other Nuxt.js configurations...
};
