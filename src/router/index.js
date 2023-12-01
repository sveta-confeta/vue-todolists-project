import Main from "@/pages/Main.vue";
import PostsPage from "@/pages/PostsPage.vue"
import PostIdPage from "@/pages/PostIdPage.vue"
import Auth from '@/pages/Auth.vue'
import PostsObservePage from '@/pages/PostsObservePage.vue'
import {createRouter, createWebHistory} from "vue-router";
import Todo from "@/pages/Todo.vue";
import {useAuthStore} from "@/stores/AuthStore";





const authGuard = async (to, from, next) => {
    const authStore = useAuthStore();
    await authStore.init();
    console.log(authStore.isLoggetIn, authStore.initFlag);

    if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.isLoggetIn) {
        next();
    } else if (to.path === '/' && authStore.isLoggetIn) {
        next({ path: '/todo' });
    } else {
        next();
    }
};
const backAuth = async (to, from, next) => {
        const authStore = useAuthStore();
        await authStore.init();

        if (!authStore.isLoggetIn) {
            next({ path: '/' });

        } else {
            next();
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
        beforeEnter: backAuth,
    },
    {
        path: '/',
        component: Auth,
        meta: { requiresAuth: true },
        beforeEnter: authGuard,
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
})



export default router
