<template>
<div class="error"  v-show="errorMessageServer !== ''">
  <span class="error__message">
    {{ errorMessageServer  }}
  </span>
  <button class="error__btn" @click="clearError">X</button>
</div>
</template>

<script setup>
// import {useTodoListStore} from "@/stores/TodoListStore";
// const todolistStore = useTodoListStore();
import {ref, toRefs,onMounted, watch} from 'vue';
import {useAuthStore} from "@/stores/AuthStore";
const authStore = useAuthStore();

const { errorMessageServer } = toRefs(authStore);
const error = ref(errorMessageServer.value);


onMounted(() => {
  watch(() => authStore.errorMessageServer, (newValue) => {
    errorMessageServer.value = newValue;
  });
});
const clearError = () => {
  authStore.setError('');
};
</script>

<style scoped>
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
  justify-content: space-between;
}
.error__btn {
  background: transparent;
  border: none;
}
</style>