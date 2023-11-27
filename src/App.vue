<template>
  <navbar/>
  <div class="app">
   <router-view></router-view>
    <my-show-error/>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import MyShowError from "@/components/MyShowError.vue";
import Navbar from "@/components/Navbar.vue";
import {useAuthStore} from "@/stores/AuthStore";
const authStore = useAuthStore();

onMounted(async () => {
  if (!authStore.isLoggetIn) {
    await authStore.init();
  }
});
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {

}

</style> 