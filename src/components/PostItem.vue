<template>
  <div class="post">
    <div>
      <strong>{{ post.title }}</strong></div>
    <div>{{ post.body }}</div>
    <span>{{post.id}}</span>
    <div class="post__btns">
        <my-button @click="$emit('remove',post)" class="post__btn">Удалить</my-button>
      <my-button @click="$router.push(`/posts/${post.id}`)" class="post__btn">Открыть</my-button>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';
import MyButton from "@/components/common/MyButton.vue";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>
<style>
.post {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  border: 1px solid coral;
  padding: 15px;
}
.post__btn {
  border: 1px solid coral;
  background: transparent;
  color: coral;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  margin-top:15px;
}
.post__btns {
  display: flex;
  gap: 30px;
}

</style>