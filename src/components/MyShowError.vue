<template>
<div class="error"  v-show="todolistStore.error">
  <span class="error__message">
    {{ todolistStore.errorMessage }}
  </span>
  <button @click="clearError">X</button>
</div>
</template>

<script setup>
import {useTodoListStore} from "@/stores/TodoListStore";

const todolistStore = useTodoListStore();
const clearError = () => {
  todolistStore.error = '';
};
</script>

<style>
.error {
  position: absolute;
  bottom: 7%;
  transform: translateX(-50%);
  left: 50%;
  background: coral;
  color: white;
  width: 60%;
  min-height: 80px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>