import Main from "@/pages/Main.vue";
import PostsPage from "@/pages/PostsPage.vue"
import PostIdPage from "@/pages/PostIdPage.vue"
import Auth from '@/pages/Auth.vue'
import PostsObservePage from '@/pages/PostsObservePage.vue'
import {createRouter, createWebHistory, useRoute, useRouter} from "vue-router";
import Todo from "@/pages/Todo.vue";
import {useAuthStore} from "@/stores/AuthStore";
import {onMounted} from "vue";


const authGuard = (to, from, next) => {
    const authStore = useAuthStore();


        if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.isLoggetIn.value) {
            // Если маршрут требует авторизации и пользователь не авторизован, перенаправляем на страницу логина
            next(); // Продолжаем переход
            debugger
        } else {

            next({ path: "/todo" });
            debugger
        }

};
const  routes = [
    {
        path: '/main',
        component: Main,
    },
    {
        path: '/posts',
        component: PostsPage,
    },
    {
        path: '/posts/:id',
        component: PostIdPage,
    },
    {
        path: '/observe-posts',
        component: PostsObservePage,
    },
    {
        path: '/todo',
        component: Todo,
    },
    {
        path: '/',
        component: Auth,
        // beforeEnter: (to, from, next) => {
        //     const authStore = useAuthStore();
        //     if (authStore.isLoggetIn.value) {
        //         next({ path: '/todo' });
        //         debugger
        //     } else {
        //         next();
        //         debugger
        //     }
        // }
        meta: { requiresAuth: true },
        beforeEnter: authGuard,
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
})



export default router
