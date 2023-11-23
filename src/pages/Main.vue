<template>
  <div class="tabs">
<!--    класс применяется если условие true-->
    <button :class="['btn', { btn_green: movieStore.activeTab === 1 }]"  @click="setTab(1)">
      Favorite
    </button>
    <button :class="['btn', { btn_green: movieStore.activeTab === 2 }]"  @click="setTab(2)">
      Search
    </button>
  </div>
<!--  если значение .activeTab === 1 -значит показываем этот блок кода-->
  <div class="movies" v-if="movieStore.activeTab === 1">
    <!--    подсчитали при помощи длинны отфильтрованного стейта в геттере watchedMovies-->
    <h3>Watched Movies (count: {{ movieStore.watchedMovies.length }})</h3>

<!--      теперь будем перебирать фильмы из отфильтрованных данных watchedMovies геттера :-->
    <Movie
      v-for="movie of movieStore.watchedMovies"
      :key="movie.id"
      :movie="movie" />
<!--    вызвали геттер totalCountMovies-->
    <h3>All Movies  (count: {{ movieStore.totalCountMovies }}) </h3>
    <Movie
        v-for="movie of movieStore.movies"
        :key="movie.id"
        :movie="movie" />
  </div>
  <!--  иначе этот блок кода-->
  <div class="search" v-else>
    <search-movie/>
  </div>
</template>

<script setup>
import {useMovieStore} from "@/stores/MoviStore";
const movieStore = useMovieStore();
import SearchMovie from "@/components/SearchMovie.vue";
import Movie from "@/components/Movie.vue";


const setTab = (number) => {
  movieStore.setActiveTab(number); //это чтоб функцию сделать короче
};

</script>
<style>
.movies,
.search {
  max-width: 1000px;
  margin: 0 auto;
}
.tabs {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 30px;
}
.btn_green {
  background: #37df5c !important;
  color: white !important;
}

</style>
