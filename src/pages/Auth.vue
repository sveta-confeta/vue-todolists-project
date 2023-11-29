<template>
  <form @submit.prevent="checkForm" class="submit-form">
    <h1>Авторизация:</h1>
    <div class="form-group">
      <my-input
                v-model.trim="form.email"
                label="Почта"
                id="email"
                type="email"
                class="form-control"
                :class="emailError ? 'is-invalid' : ''"
                placeholder="напишите емэйл"
      />
      <p v-if="emailDirty && !emailRequired" class="invalid-feedback">
        Обязательное поле
      </p>
      <p v-if="emailDirty && !emailEmail" class="invalid-feedback">
        Email некорректный
      </p>
    </div>
    <div class="form-group">
      <my-input v-model.trim="form.password"
                id="password"
                type="password"
                label="Пароль"
                placeholder="напишите пароль"
                class="form-control"
                :class="passwordError ? 'is-invalid' : ''"

      />
      <p v-if="passwordDirty && !passwordRequired" class="invalid-feedback">
        Обязательное поле
      </p>
    </div>
    <my-button class="submit-btn" type="submit">Отправить</my-button>
  </form>
</template>

<script setup>
import MyInput from "@/components/common/MyInput.vue";
import MyButton from "@/components/common/MyButton.vue";
import { required, minLength, email } from 'vuelidate/lib/validators';
import { useVuelidate } from '@vuelidate/core';
import {ref, reactive, onMounted, watchEffect} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

import {useAuthStore} from "@/stores/AuthStore";
const authStore = useAuthStore();
import {useTodoListStore} from "@/stores/TodoListStore";
const todolistStore = useTodoListStore();


const form = ref({
  email: '',
  password: '',
});

const validations = {
  form: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },
};

const v = useVuelidate(validations, form);

const emailError = v.value.form.email.$error;
const emailDirty = v.value.form.email.$dirty;
const emailRequired = v.value.form.email.required;
const emailEmail = v.value.form.email.email;

const passwordError = v.value.form.password.$error;
const passwordDirty = v.value.form.password.$dirty;
const passwordRequired = v.value.form.password.required;

const checkForm = async () => {
  if (!v.value.$error) {
    const formData = reactive({
      email: form.value.email,
      password: form.value.password
    });

    await authStore.login(formData);
    if (authStore.isLoggetIn) {
      console.log(authStore.isLoggetIn)
     await router.push('/todo');

    }
  } else {
    v.value.$touch();
  }
};
</script>

<style>
.submit-form {
  margin: 50px auto 0 auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 300px;
  background: white;
  color: coral;
  padding: 15px;
  font-size: 18px;
  border: 1px solid coral;
}
.submit-btn {
  display: block;
  cursor: pointer;
  background: white;
  color: coral;
  padding: 10px;
  font-size: 18px;
  border: 1px solid coral;
  transition: 0.5s;
}
.submit-btn:hover {
  background: coral;
  transition: 0.5s;
  color: white;
}

.form-control {
  width: 400px;
}

.form-check {
  margin-right: 10px;
}

button {
  margin-top: 15px;
}
</style>




