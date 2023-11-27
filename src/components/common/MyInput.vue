<template>
  <div class="form-input">
    <input
        class="search-input"
        :value="modelValue"
        @input="updateInput"
        :type="type"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        :required="required"
        @blur="blurHandler"
    >

    <label :for="name" class="input-label">{{label}}</label>
  </div>
</template>

<script setup>
import {defineProps, ref} from 'vue';
import {required} from "@vuelidate/validators";

const emits = defineEmits(['update:modelValue','blur'])

const blurHandler = () => {
  emits('blur');
}
const updateInput=(e) => {
  emits('update:modelValue',e.target.value)
}



const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  name: {
    type: String,
  },
  required: {
    type: Boolean,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    required: false,

  },
  label: {
    type: String,
  },
  autofocusValue: {
    type:Boolean
  }
});


</script>

<style>
.form-input {
  position: relative;
}
.input-label{
  position: absolute;
  top: -24px;
  left: 0;
}
.input-text,
.input-text:focus{
  border:none;
  outline: none;
}
</style>