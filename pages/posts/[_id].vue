<template>
  <div class="post">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <img :src="post?.image" :alt="post?.title" class="post-image" />
      <h1>{{ post?.title }}</h1>
      <p>{{ post?.body }}</p>
      <p>Post ID: {{ post?.id }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import postsData from '@/static/posts.json'; // Import the local JSON file

interface Post {
  id: string;
  title: string;
  body: string;
  image: string;
}

export default defineComponent({
  data() {
    return {
      post: null as Post | null,
      loading: false,
      error: '',
    };
  },
  beforeMount() {
    const postId = this.$route.params._id;

    // Find the post with the matching ID in the imported data
    const post = postsData.find((p: Post) => p.id === postId);

    if (!post) {
      this.error = 'Post not found';
    } else {
      this.post = post;
    }
  },
});
</script>

<style scoped>
.post {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.post-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  margin-bottom: 10px;
}
</style>
