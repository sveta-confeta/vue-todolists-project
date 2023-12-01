<template>
<!--  мы цепляем показ модального окна к overflow модалки и клик @click="hideDialog , чтоб модалка закрывалась когда мы кликаем вне окна-->
  <div class="dialog"
       v-if="show"
       @click="hideDialog">
<!--    stop-это аналог стоп-пропагинэшн, препятствующий всплытию события. без него по клику на модалку она закрывается -->
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>

</template>

<script setup>
import {defineProps} from 'vue';
const emits = defineEmits(['update:show']);

let hideDialog = () => {
  emits('update:show', false);
}

const props = defineProps({
  show: {  //ожидаем пропсы которые будут управлять показом/скрытием модального окна
    type: Boolean, //будет какой то флаг
    default:false, //и по дефолту модальное окно будет закрыто
  }
});

</script>

<style>
.dialog {
  top:0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  position: fixed;
  display: flex;
}
.dialog__content {
  margin:auto;
  background: wheat;
  border-radius: 12px;
  min-height: 50px;
  min-width: 400px;
  padding:20px;
}
.dialog__content .post-form__input {
  height: 70px;
}
.dialog__content h2 {
  margin-bottom: 5px !important;
}

</style>