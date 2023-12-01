<template>
  <div class="todo-filter">
    <my-button @click="filteredTasks('All')" :class="{'active': todoItem.filter === 'All'}" class="todo-filter__btn">All</my-button>
    <my-button @click="filteredTasks( 'Completed')" :class="{'active': todoItem.filter === 'Completed'}" class="todo-filter__btn">Completed</my-button>
    <my-button @click="filteredTasks( 'Active')" :class="{'active': todoItem.filter === 'Active'}" class="todo-filter__btn">Active</my-button>
  </div>
</template>

<script setup>
import MyButton from "@/components/common/MyButton.vue";
import {useTodoListStore} from "@/stores/TodoListStore";

const todolistStore = useTodoListStore();
import {defineProps} from "vue";

const props = defineProps({
  todoItem: {
    type: Object,
    required: true,
  },
});
const filteredTasks = (value) => {
  todolistStore.filteredTasks(props.todoItem.id, value);
};


</script>

<style>
.todo-filter {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.todo-filter__btn {
  color: #42b983;
  position: relative;
  place-content: center;
  place-items: center;
  width: fit-content;
  border-radius: 99px;
  letter-spacing: 0.05em;
  border: 1px solid #42b983;
  text-decoration: none;
  text-transform: uppercase;
  margin-right: 10px;
  padding: 0.5rem 1.5rem;
  white-space: nowrap;
  font-weight: 700;
  outline: none;
  background: #fff;
  transition: all 0.22s;
}
.active {
  background-color: #42b983;
  color: #fff;
}
</style>