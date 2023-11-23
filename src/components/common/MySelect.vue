<template>
<select :value="modelValue" @change="changeOptions">
  <option disabled value="">Выберите из списка</option>
  <option
      v-for="option in options"
      :key="option.value"
      :value="option.value">
    {{option.name}}
  </option>


</select>
</template>

<script setup>
import {defineProps} from 'vue';

const emits = defineEmits(['update:modelValue'])

const changeOptions=(e) => {
  emits('update:modelValue', e.target.value)
}

const props = defineProps({
  modelValue: {
    type: [String, Number], //мбыть string или number
    default: '',
  },
  options: {
    type:Array, //будем ожидать и такой пропс -массив с пунктами выпадающего списка
    default:() =>[] //по дефолту это будет пустой массив
  }
});

</script>

<style>

</style>