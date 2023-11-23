<template>
  <navbar/>
  <div class="app">
   <router-view></router-view>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import Navbar from "@/components/Navbar.vue";
import {useAuthStore} from "@/stores/AuthStore";
const authStore = useAuthStore();

onMounted(()=> {
  if(!authStore.isLoggetIn) {
    authStore.init();
  }
})
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