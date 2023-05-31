<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
      <h3>API URL:</h3>
      <p>{{ apiUrl }}</p>
      <h3>API Response:</h3>
      <pre>{{ apiResponse }}</pre>
      <h3>Build Time:</h3>
      <p>{{ buildTime }}</p>
      <h3>API Response Time:</h3>
      <p>{{ apiResponseTime }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Post {
  id: string;
  title: string;
  body: string;
}

export default defineComponent({
  data() {
    return {
      post: null as Post | null,
      loading: true,
      error: '',
      apiUrl: '',
      apiResponse: '',
      buildTime: '',
      apiResponseTime: '',
    };
  },
  beforeCreate() {
    const currentTime = new Date();
    this.buildTime = currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  },
  async created() {
    const postId = this.$route.params._id;
    this.apiUrl = `https://64775ba49233e82dd53b8230.mockapi.io/api/v1/posts/${postId}`;

    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      this.post = data;
      this.apiResponse = JSON.stringify(data, null, 2);
    } catch (error) {
      this.error = error.message;
    }

    this.loading = false;
  },
});
</script>
