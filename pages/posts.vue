<template>
  <div>
    <h1>Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    const response = await fetch('https://64775ba49233e82dd53b8230.mockapi.io/api/v1/posts');
    this.posts = await response.json();
  },
};
</script>
