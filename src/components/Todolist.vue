<template>
  <div class="todolist">
    <div class="todolist__title-wrap">
      <edit-todo-span :title="todoItem.title" :todoItemID="todoItem.id" @edit-title="editTitleHandler"/>
      <my-button @click="todolistStore.deleteTodolist(todoItem.id)">Удалить</my-button>
    </div>
    <todo-add-item :todoItemID="todoItem.id" @add-item-to-todolist="addItemToTodoList"/>
    <div class="todolist__item">
      <todo-item v-for="todo in todolistStore.todolist[todoItem.id]"
                 :key="todo.id"
                 :todo="todo"
                 :todoItemID="todoItem.id"/>
    </div>
    <todo-filter :todoItem="todoItem"/>
  </div>
</template>

<script setup>
import TodoAddItem from '@/components/common/TodoAddItem.vue'
import TodoItem from '@/components/TodoItem.vue'
import TodoFilter from "@/components/TodoFilter.vue";
import MyButton from "@/components/common/MyButton.vue";
import EditTodoSpan from "@/components/common/EditTodoSpan.vue";

import {useTodoListStore} from "@/stores/TodoListStore";

const todolistStore = useTodoListStore();

import {defineProps, onMounted} from "vue";

const props = defineProps({
  todoItem: {
    type: Object,
    required: true,
  },
});
onMounted(() => {
  todolistStore.getTasks(props.todoItem.id);

});
const addItemToTodoList = (todoItemID, title) => {
  todolistStore.addTask(todoItemID, title)
};

const editTitleHandler = (todoItemID ,value) => {
 todolistStore.updateTitleTodolist(todoItemID,value)
}

</script>

<style>
.todolist {
  width: 470px;
  padding: 20px;
  border: 1px solid #c25205;
}

.todolist__title-wrap {
  display: flex;
  align-items: center;
  gap: 20px;
}

.todolist__item {
  margin-top: 20px;
}

</style>