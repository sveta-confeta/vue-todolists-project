<template>
  <div class="navbar">
    <div class="navbar__wrap">
      <my-button  @click="$router.push('/main')" :class="{ 'active': route.path === '/main' }" class="navbar-btn"> Фильмы c табами</my-button>
    <div class="navbar__btn">
      <my-button @click="$router.push('/posts')" :class="{ 'active': route.path === '/posts' }" class="navbar-btn">Посты со страницами</my-button>
      <my-button @click="$router.push('/observe-posts')" :class="{ 'active': route.path === '/observe-posts' }" class="navbar-btn">Посты подгружаются при скролле</my-button>
      <my-button @click="$router.push('/todo')" :class="{ 'active': route.path === '/todo' }" class="navbar-btn">Тодолисты</my-button>
      <my-button @click="$router.push('/')" :class="{ 'active': route.path === '/' }" class="navbar-btn">Авторизация</my-button>
      <my-button @click="logautHandler" class="navbar-btn-red">Выйти</my-button>
    </div>
    </div>
  </div>

</template>

<script setup>
import MyButton from "@/components/common/MyButton.vue";
import {useAuthStore} from "@/stores/AuthStore";
const authStore = useAuthStore();
import { useRoute } from 'vue-router';
const route = useRoute();

const logautHandler= () => {
  debugger
  authStore.logout();
}
</script>

<style>
.navbar {
  width: 100%;
  background: coral;
  box-shadow: 2px 2px 4px gray;

}
.navbar-btn {
  border: 1px solid azure;
  background: transparent;
  color: white;
  padding: 10px 30px;
  font-size: 20px;
  cursor: pointer;
  display: inline;
  margin-right: 20px;
}
.navbar-btn-red {
  border: 1px solid azure;
  background: orangered;
  color: white;
  padding: 10px 30px;
  font-size: 20px;
  cursor: pointer;
  display: inline;
  margin-right: 20px;
}
.navbar__wrap {
  margin: 0 auto;
  width: 80%;
  display: flex;
  min-height: 100px;
  padding: 20px 0;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
}
.navbar__title {
  font-size: 25px;
  color: white;
  cursor: pointer;
}
.active {
  background-color: blue;
  color: white;
}

</style>