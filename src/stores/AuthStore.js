import {defineStore} from 'pinia'
import {ref} from "vue";
import axios from 'axios';
import { nextTick } from 'vue';
// import {useTodoListStore} from "@/stores/TodoListStore";
// const todolistStore = useTodoListStore();

const baseUrl = 'https://social-network.samuraijs.com/api/1.1/';
export const instance = axios.create({
    withCredentials: true,
});


export const useAuthStore = defineStore('auth', () => {
    const isLoggetIn = ref(false);
    const initFlag = ref(false);
    const errorMessageServer = ref('');

    const setError = (message) => {
        errorMessageServer.value = message;
    };


    const init = async () => {
        // todolistStore.isLoading.value = true;
        try {
            const response = await instance.get(`${baseUrl}auth/me`);
            if (response.data.resultCode === 0) {
                isLoggetIn.value = true;
                initFlag.value = true;
                console.log(isLoggetIn.value);
                console.log(initFlag.value);
            } else {
                errorMessageServer.value=response.data.messages[0];
            }
            initFlag.value = true;
        } catch (error) {
            errorMessageServer.value = error.message ? error.message : 'Some error occurred';
        } finally {
            // todolistStore.isLoading.value = false;
        }
    };
    const login = async (data) => {
        // todolistStore.isLoading.value = true;

        try {
            const response = await instance.post(`${baseUrl}auth/login`, data);
            if (response.data.resultCode === 0) {
                const myId = response.data.userId;
                isLoggetIn.value=true;
                init();
            } else {
                errorMessageServer.value=response.data.messages[0];
                // await nextTick();

            }
        } catch (error) {
            errorMessageServer.value= error.message ? error.message : 'Some error occurred';
        } finally {
            // todolistStore.isLoading.value = false;
        }
    };
    const logout = async () => {
        // todolistStore.isLoading.value = true;
        try {
            const response = await instance.delete(`${baseUrl}auth/login`);
            if (response.data.resultCode === 0) {
                isLoggetIn.value=false;
                initFlag.value=false;
            } else {
                errorMessageServer.value = response.data.messages[0];
            }
        } catch (error) {
            errorMessageServer.value = error.message ? error.message : 'Some error occurred';
        } finally {
            // todolistStore.isLoading.value = false;
        }
    };


    return {
       login,
        isLoggetIn,
        init,
        initFlag,
        logout,
        errorMessageServer,
         setError,
    };
 });
