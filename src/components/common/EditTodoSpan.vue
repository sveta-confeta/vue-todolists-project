<template>
  <div class="edit">

    <my-input v-if="showInput"
              placeholder="редактировать"
              class="edit__input"
              v-model="titleInput"
              @blur="closeInput"

    />
    <strong v-else @dblclick="editTitleHandler">{{ title }}</strong>
  </div>
</template>

<script setup>
import MyInput from "@/components/common/MyInput.vue";
import {defineProps, ref} from "vue";
const emits = defineEmits(['edit-title', 'edit-task']);
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
    required:null
  }
});
const showInput = ref(false);
const editTitleHandler = () => {
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

</style>