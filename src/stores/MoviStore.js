// import {defineStore} from "pinia";
//
// export const useMovieStore = defineStore('movieStore', {
//     state : () => ({
//         movies: [
//             // {
//             //     id: 1,
//             //     original_title: "Spider-Man",
//             //     overview:
//             //         "After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.",
//             //     poster_path: "/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
//             //     release_date: "2002-05-01",
//             //     isWatched: true,
//             // },
//             // {
//             //     id: 2,
//             //     original_title: "The Batman",
//             //     overview:
//             //         "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
//             //     poster_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
//             //     release_date: "2022-03-01",
//             //     isWatched: false, -этот параметр к нам с сервера не приходит
//             // },
//         ],
//         activeTab: 1,//это для табов сохраняем
//     }),
//     getters: {  //если нам нужно выводить только фильмы которые мы просмотрели  isWatched: true-на помощь приходят getters-это обьект а внутри у него функции
//         watchedMovies() {
//             return this.movies.filter((el) => el.isWatched); //функция возращает отфильтров массив с данными у которого
//                                                                    //isWatched===true
//         },
//         //счетчик фильмов:
//         totalCountMovies() {
//             return this.movies.length;
//         },
//     },
//     actions: {
//         //переключение табов:
//         setActiveTab(number) {
//             this.activeTab = number;
//         },
//         toggleWatched(id) {  //кнопка переключения посмотрели/не посмотрели фильм
//             const idx = this.movies.findIndex((el) => el.id === id); //находим что элемент по которому мы кликнули по id
//             this.movies[idx].isWatched = !this.movies[idx].isWatched;
//         },
//         deleteMovie(id) {
//             this.movies = this.movies.filter((el) => el.id !== id);
//         },
//     },
//})

//composition Api
import { defineStore } from "pinia";
import { ref, computed,watch } from "vue";

export const useMovieStore = defineStore("movieStore", () => {
    const movies = ref([]);
    const activeTab = ref(2);

    const moviesInLocalStorage = localStorage.getItem("movies"); //будем через локалстор хранить список добавл фильмов
    if (moviesInLocalStorage) {
        movies.value = JSON.parse(moviesInLocalStorage)._value;
    }

    const watchedMovies = computed(() =>
        movies.value.filter((el) => el.isWatched)
    );
    const totalCountMovies = computed(() => movies.value.length);

    const setActiveTab = (num) => {
        activeTab.value = num;
    };
    const toggleWatched = (id) => {
        const idx = movies.value.findIndex((el) => el.id === id);
        movies.value[idx].isWatched = !movies.value[idx].isWatched;
    };
    const deleteMovie = (id) => {
        movies.value = movies.value.filter((el) => el.id !== id);
    };

    watch(
        () => movies,
        (state) => {
            localStorage.setItem("movies", JSON.stringify(state));
        },
        { deep: true }
    );

    return {
        movies,
        activeTab,
        watchedMovies,
        totalCountMovies,
        toggleWatched,
        deleteMovie,
        setActiveTab,
    };
});