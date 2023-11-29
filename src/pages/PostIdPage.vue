<template>
  <div class="post-id-page">
    <h1>Отдельная страница с постом.</h1>
    <h2>Это страница поста с id = {{ $route.params.id }}</h2>
    <div v-if="post">
      <strong>{{ post.title }}</strong>
    </div>
    <div v-if="post">{{ post.body }}</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from "axios";

const route = useRoute();

const postId = route.params.id;
const post = ref({});

const getPost = async (postId) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return response.data;
  } catch (e) {
    console.error('Ошибка:', e);
    return null;
  }
}

onMounted(async () => {
    post.value = await getPost(postId);

});
</script>

<style>
.post-id-page {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
}
</style>
