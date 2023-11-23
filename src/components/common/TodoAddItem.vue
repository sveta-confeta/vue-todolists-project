<template>
  <div class="todoform">
    <my-input
        v-model.trim="title"
        @keyup.enter="addTask(todoItemID)"
        placeholder="напишите название"
        :class="['todoform__input', { error: error }]"
        @input="clearError"
    />
    <my-button @click="addTask(todoItemID)">Добавить</my-button>

    <div class="errorMessage" v-show="error">Title is required</div>
  </div>
</template>

<script setup>
import MyInput from '@/components/common/MyInput.vue'
import MyButton from "@/components/common/MyButton.vue";
import {useTodoListStore} from "@/stores/TodoListStore";

const emits = defineEmits(['add-item', 'add-item-to-todolist']);

const todolistStore = useTodoListStore();
import {ref} from 'vue';

import {defineProps} from "vue";
const error=ref(false)

const props = defineProps({
  todoItemID: {
    type: String,
    required: null,
  },
});

const title = ref('');

const addTask = () => {
  if (title.value) {
    error.value = false;
    if (props.todoItemID) {
      emits('add-item-to-todolist', props.todoItemID, title.value);
      title.value = '';
    } else {
      emits('add-item', title.value);
      title.value = '';
    }
  } else {
   error.value=true;
  }
}

const clearError = () => {
  error.value = false;
};
</script>

<style scoped>
.todoform {
  display: flex;
  align-items: center;
  position: relative;
}

.todoform__input {
  margin-right: 10px;
}

.error {
  border: 1px #c25205 solid !important;
}

.errorMessage {
  color: #c25205 !important;
  position: absolute;
  bottom: -18px;
  left: 0;
  font-size: 14px;
}

</style>

