<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import postsData from '~/public/posts.json'; // Import the local JSON file

interface Post {
  id: string;
  title: string;
  body: string;
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
