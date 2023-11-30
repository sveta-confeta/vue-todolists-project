<template>
  <div class="todo">
    <div class="todo__title">
      <todo-add-item @add-item="addItemHandler"/>
    </div>
    <div v-if="!todolistStore.isLoading" class="todo__todolists">
      <todolist v-for="todoItem in todolistStore.todolists" :key="todoItem.id" :todoItem="todoItem"/>
    </div>
    <my-loader v-else/>
    <my-show-error/>
  </div>
</template>

<script setup>
import {watchEffect,onMounted} from 'vue';
import Todolist from '@/components/Todolist.vue'
import TodoAddItem from "@/components/common/TodoAddItem.vue";
import MyLoader from "@/components/common/MyLoader.vue";
import MyShowError from "@/components/MyShowError.vue";
import {useTodoListStore} from "@/stores/TodoListStore";
import {useAuthStore} from "@/stores/AuthStore";
const authStore = useAuthStore();
const todolistStore = useTodoListStore();
import {useRoute, useRouter} from 'vue-router';
const router = useRouter();
const route = useRoute();


onMounted(async () => {
  await authStore.init();
  watchEffect(() => {
    if (authStore.isLoggetIn && authStore.initFlag) {
      todolistStore.getTodolists();
    } else if (authStore.initFlag && !authStore.isLoggetIn) {
      router.push('/todo');
    }
    else if (!authStore.initFlag && !authStore.isLoggetIn) {
      router.push('/');
    }
  });
});


const addItemHandler = (value) => {
  todolistStore.createTodolist(value);
}


</script>

<style>
.todo {
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
}

.todo__title {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
}

.todo__input {
  width: 60%;
}
.todo__todolists {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}

</style>