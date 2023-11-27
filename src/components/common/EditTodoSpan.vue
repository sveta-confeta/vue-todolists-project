<template>
  <div class="edit">
    <my-input v-if=" showInput"
              placeholder="редактировать"
              class="edit__input"
              v-model="titleInput"
              @blur="closeInput"
              @keyup.enter="closeInput"
    />
    <div :class="customClass" v-else @dblclick="editTitleHandler">{{ title }}</div>
    <my-button @click="editTitleHandler " class="edit__edit">
      <img src="./../../assets/edit.svg" alt="удалить" width="30" height="30">
    </my-button>
  </div>
</template>

<script setup>
import MyButton from "@/components/common/MyButton.vue";
import MyInput from "@/components/common/MyInput.vue";
import {defineProps, ref} from "vue";

const emits = defineEmits(['edit-title', 'edit-task', 'close-input']);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  taskID: {
    type: String,
    required: null,
  },
  todoItemID: {
    type: String,
    required: null
  },
  customClass: {
    type: String
  },

});


const showInput = ref(false);

const editTitleHandler = () => {
  titleInput.value = props.title;
  showInput.value=true;
}
const titleInput = ref('');
const closeInput = () => {
  showInput.value = false;
  if (titleInput.value) {
    if (props.taskID) {
      emits('edit-task', props.taskID, titleInput.value)
    }else if (props.todoItemID){
      emits('edit-title', props.todoItemID, titleInput.value)
    }
  }
}


</script>

<style scoped>
.edit {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
  }


.edit__edit {
  background: transparent;
  border: none;
}
</style>