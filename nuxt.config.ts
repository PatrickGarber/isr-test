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

  generate: {
    async routes() {
      const postsData = await require('./static/posts.json'); // Import the JSON data

      // Define the Post interface or type
      interface Post {
        id: string;
        // Other properties
      }

      return postsData.map((post: Post) => `/posts/${post.id}`); // Generate routes based on the JSON data
    },
  },
};
