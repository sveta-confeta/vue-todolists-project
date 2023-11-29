<template>
<div v-if="posts.length >0 ">
<h2 class="posts-title">Список поcтов</h2>
  <transition-group name="list" >
  <post-item v-for="post in posts" :key="post.id"
  :post="post"
  @remove="$emit('remove',post)"/>
    </transition-group>
</div>
  <p v-else>Cписок пользователей пуст</p>

</template>

<script setup>
import { defineProps } from 'vue';
import PostItem from '@/components/PostItem.vue'

const props = defineProps({
  posts: {
    type: Array,
    required: true, 
  },
});
</script>
<style>
.posts-title {
  margin-bottom: 15px;
}
.list {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-move {
  transition: transform 0.8s ease;
}
</style>