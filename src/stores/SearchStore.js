// import { defineStore } from "pinia";
// import {useMovieStore} from "@/stores/MoviStore";
//
// const url =
//     "https:api.themoviedb.org/3/search/movie?api_key=02708c4929ad93aa5e68f8ee7bfa4445&query=";
//
// export const useSearchStore = defineStore("searchStore", {
//     state: () => ({
//         loader: false,
//         movies: [],//будем сюда  складывать фильмы которые нашли
//     }),
//     actions: {
//         async getMovies(search) { //асинхронная функция потому что запрос на сервер.принимает строку по которой ищем
//             this.loader = true;
//             const res = await fetch(`${url}${search}`);
//             const data = await res.json();
//             console.log(data)
//             this.movies = data.results;
//             this.loader = false;
//         },
//         addToUserMovies(object) {
//             const movieStore = useMovieStore();
//             movieStore.movies.push({ ...object, isWatched: false });
//             movieStore.activeTab = 1;
//         },
//
//     },
//
// });

//composition API :
import { defineStore } from "pinia";
import { useMovieStore } from "./MoviStore";
import { ref } from "vue";



const url =
    "https:api.themoviedb.org/3/search/movie?api_key=02708c4929ad93aa5e68f8ee7bfa4445&query=";

export const useSearchStore = defineStore("searchStore", () => {
    const loader = ref(false);
    const movies = ref([]);

    const getMovies = async (search) => {
        const apiKey = "02708c4929ad93aa5e68f8ee7bfa4445";
        const baseUrl = "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey;
        const searchUrl = `${url}${search}`;

        try {
                    loader.value = true;
                    const response = await fetch(search ? searchUrl : baseUrl);
                    const data = await response.json();
                    movies.value = data.results;
                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error);
                }
                finally {
                    loader.value = false;
                }
        };

    getMovies(''); // Пустая строка будет загружать популярные фильмы

    const addToUserMovies = (object) => {
        const movieStore = useMovieStore();
        movieStore.movies.push({ ...object, isWatched: false });
        movieStore.activeTab = 1;
    };

    return {
        loader,
        movies,
        getMovies,
        addToUserMovies,
    };
});