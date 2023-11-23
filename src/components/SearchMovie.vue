<template>
  <form @submit.prevent="searchStore.getMovies(searchMovie)">
    <my-input type="text"
              class="search-input"
              placeholder="Input movie"
              v-model="searchMovie"
    />

  </form>
  <Loader v-if="searchStore.loader" />
  <div v-else>
    <Movie
        v-for="movie of searchStore.movies"
        :key="movie.id"
        :movie="movie"
        :is-search="true" />
  </div>
</template>

<script setup>
 import Loader from "../components/common/MyLoader.vue";
import MyInput from "@/components/common/MyInput.vue";
import Movie from "../components/Movie.vue";
import { ref } from "vue";
import { useSearchStore } from "../stores/SearchStore";

const searchStore = useSearchStore();
const searchMovie = ref("");


</script>

<style>

</style>