// nuxt.config.js

import fetch from 'node-fetch';

interface Post {
  id: string;
  title: string;
  body: string;
}

export default {
  // Other Nuxt config options...

  async generate() {
    const apiUrl = 'https://64775ba49233e82dd53b8230.mockapi.io/api/v1/posts';
    const response = await fetch(apiUrl);
    const rawData = await response.json() as unknown[];

    const data: Post[] = rawData.map((item: any) => ({
      id: item.id,
      title: item.title,
      body: item.body,
    }));

    // Generate dynamic routes based on the data
    const routes = data.map((post) => `/posts/${post.id}`);

    return {
      routes,
      fallback: false, // Set to true if you want to enable fallback mode
    };
  },
};
