<template>
  <div class="todolist">
    <div class="todolist__title-wrap">
      <edit-todo-span :customClass="customClass" :title="todoItem.title" :todoItemID="todoItem.id" @edit-title="editTitleHandler" />
      <my-button class="todolist__delete" @click="todolistStore.deleteTodolist(todoItem.id)">
        <img src="./../assets/delete.svg" alt="удалить" width="30" height="30">
      </my-button>
    </div>
    <todo-add-item :todoItemID="todoItem.id" @add-item-to-todolist="addItemToTodoList" />
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
import {ref, watch} from 'vue';

import {useTodoListStore} from "@/stores/TodoListStore";

const todolistStore = useTodoListStore();

import {defineProps, onMounted} from "vue";

const props = defineProps({
  todoItem: {
    type: Object,
    required: true,
  },
});
const customClass="todolist__title";

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
button {
  margin: 0 !important;
}
.todolist {
  width: 470px;
  padding: 20px;
  border: 1px solid #c25205;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.todolist__title {
  font-size: 25px;
  color: #421111;
  text-transform: uppercase;
}

.todolist__title-wrap {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 25px;
}

.todolist__item {
  margin-top: 20px;
}
.todolist__delete {
background: transparent;
  border: none;
}


</style>