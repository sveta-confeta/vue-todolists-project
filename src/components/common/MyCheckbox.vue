<template>
  <div class="form-checkbox">
    <input
        class="input-text"
        :checked="modelValue"
        :type="type"
        @change="onChange"
        :name="name"
        :id="name"
    >
  </div>
</template>

<script setup>
import {defineProps, ref} from 'vue';

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
      modelValue: {
        type: Boolean,
      },
      name: String,
      type: {
        type: String,
        default: 'checkbox',
      }
    }
);

const modelValue = ref(props.modelValue);
const onChange = (e) => {
  emits('update:modelValue', e.target.checked);

}

</script>

<style scoped>
.form-checkbox {
  margin-bottom: 0 !important;
}
</style>
