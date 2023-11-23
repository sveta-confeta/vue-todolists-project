import {defineStore} from 'pinia'
import {ref} from "vue";
import axios from 'axios';
// import {useTodoListStore} from "@/stores/TodoListStore";
// const todolistStore = useTodoListStore();

const baseUrl = 'https://social-network.samuraijs.com/api/1.1/';
export const instance = axios.create({
    withCredentials: true,
});


export const useAuthStore = defineStore('auth', () => {

    // logaut(){
    //     return instance.delete<CommonResponseType<{}>>(`auth/login`)
    // },


    const isLoggetIn = ref(false);
    const initFlag = ref(false);


    const login = async (data) => {
        // todolistStore.isLoading.value = true;

        try {
            const response = await instance.post(`${baseUrl}auth/login`, data);
            if (response.data.resultCode === 0) {
                const myId = response.data.userId;
                isLoggetIn.value=true;
            } else {
                console.log(response.data.messages[0])
                // todolistStore.errorMessage.value = response.data.messages[0];
            }
        } catch (error) {
            // todolistStore.errorMessage.value = error.message ? error.message : 'Some error occurred';
            console.log('fff')
        } finally {
            // todolistStore.isLoading.value = false;
        }
    };

    const init = async () => {
        // todolistStore.isLoading.value = true;
        try {
            const response = await instance.get(`${baseUrl}auth/me`);
            if (response.data.resultCode === 0) {
                isLoggetIn.value = true;
                console.log(isLoggetIn.value);
                console.log(response.data.data); // Вывод данных о текущем пользователе
            } else {
                console.log(response.data.messages[0]);
                // todolistStore.errorMessage.value = response.data.messages[0];
            }
            initFlag.value = true;
        } catch (error) {
            // todolistStore.errorMessage.value = error.message ? error.message : 'Some error occurred';
            console.log('Ошибка при запросе');
        } finally {
            // todolistStore.isLoading.value = false;
        }
    };

    const logout = async () => {
        // todolistStore.isLoading.value = true;
        try {
            const response = await instance.delete(`${baseUrl}auth/login`);
            if (response.data.resultCode === 0) {
                debugger
                isLoggetIn.value=false;
                initFlag.value=false;
            } else {
                console.log(response.data.messages[0])
                // todolistStore.errorMessage.value = response.data.messages[0];
            }
        } catch (error) {
            // todolistStore.errorMessage.value = error.message ? error.message : 'Some error occurred';
        } finally {
            // todolistStore.isLoading.value = false;
        }
    };


    return {
       login,
        isLoggetIn,
        init,
        initFlag,
        logout
    };
 });
