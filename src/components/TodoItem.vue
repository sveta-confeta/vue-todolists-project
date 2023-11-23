<template>
  <div class="todo-item">
    <my-checkbox v-model="isChecked" />
    <edit-todo-span :title="todo.title" :taskID="todo.id" @edit-task="editTitleHandler"/>
    <my-button @click="todolistStore.deleteTask(todoItemID,todo.id)">Удалить</my-button>

  </div>
</template>

<script setup>
import MyButton from "@/components/common/MyButton.vue";
import MyCheckbox from "@/components/common/MyCheckbox.vue";
import EditTodoSpan from "@/components/common/EditTodoSpan.vue";
import {useTodoListStore} from "@/stores/TodoListStore";

const todolistStore = useTodoListStore();

import {computed, defineProps, ref} from "vue";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
  todoItemID: {
    type: String,
    required: true,
  },
});


const isChecked = computed({
  get: () => props.todo.status === 2,
  set: (value) => {
    const status = value ? 2 : 0;
    todolistStore.updateStatus(props.todoItemID, props.todo.id, status);
  },
});
const editTitleHandler = (taskID, value) => {
  todolistStore.updateTitleTask(props.todoItemID, taskID, value);
};
</script>


<style>
.todo-item {
  margin-top: 15px;
  min-width: 250px;
  display: flex;
  align-items: center;
  gap: 20px;
}

</style>