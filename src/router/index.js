import Main from "@/pages/Main.vue";
import PostsPage from "@/pages/PostsPage.vue"
import PostIdPage from "@/pages/PostIdPage.vue"
import Auth from '@/pages/Auth.vue'
import PostsObservePage from '@/pages/PostsObservePage.vue'
import {createRouter, createWebHistory} from "vue-router";
import Todo from "@/pages/Todo.vue";
import {useAuthStore} from "@/stores/AuthStore";

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
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.matched.some((record) => record.meta.requiresAuth) && authStore.isLoggetIn) {
        next({ path: "/todo" });
    } else {
        next();
    }
});

export default router
