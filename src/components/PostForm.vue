<template>
  <form @submit.prevent>
    <my-input
        type="text"
        v-model="post.title"
        placeholder="title"
        label="Название поста"
        name="title"/>
    <my-input
        type="text"
        v-model="post.body"
        placeholder="write your message"
        label="пост"
        name="message"
    />
    <my-button class="submit" @click="createPost">Cоздать пост</my-button>
  </form>
</template>

<script setup>
import MyInput from "@/components/common/MyInput.vue";
import MyButton from "@/components/common/MyButton.vue";

import { ref } from 'vue';

const post = ref({
  title: '',
  body: '',
});
 console.log(post.value.title,post.value.body);

const emit = defineEmits(['create']); 

const createPost = () => {
  post.value.id = Date.now();
  emit('create', post.value); 
  post.value = {
    title: '',
    body: '',
  };
};
</script>
<style>
form {
  margin-bottom: 30px;
}

.submit {
  display: block;
  cursor: pointer;
  background: white;
  color: coral;
  padding: 15px;
  font-size: 18px;
  border: 1px solid coral;
}
</style>