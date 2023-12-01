import {defineStore} from 'pinia'
import {ref, computed} from "vue";
import axios from 'axios';
import {useAuthStore} from '@/stores/AuthStore';


const baseUrl = 'https://social-network.samuraijs.com/api/1.1/';
export const instance = axios.create({
    withCredentials: true,
});


export const useTodoListStore = defineStore('todoLists', () => {
    const authStore = useAuthStore(); //

    const todolist = ref({
        //     [todolistId1]:[
        //     { title: 'покупки в магазине', id: 1, isDone: true },
        //     { title: 'уборка в доме', id: 2, isDone: true },
        //     { title: 'уборка на улице', id: 3, isDone: false },
    });

    const todolists = ref([
        // { title: 'домашние дела', id: todolistId1,filter:'All'},
    ]);

    let isLoading = ref({value: false});


    const activeFilterButton = (todoID, value) => {
        const todoList = todolists.value.find(item => item.id === todoID);
        if (todoList) {
            todoList.filter = value;  //понятно какая кнопка нажата и активна
        }
    };


    const filteredTasks = computed(() => (todoID, value) => {
        if (!todolist.initialData) {
            todolist.initialData = {};
        }

        if (!todolist.initialData[todoID]) {
            todolist.initialData[todoID] = [...todolist.value[todoID]];
        }

        if (todolist.initialData[todoID]) {
            if (value === 'Active') {
                todolist.value[todoID] = todolist.initialData[todoID].filter(f => f.status === 0);
                activeFilterButton(todoID, value);
            } else if (value === 'Completed') {
                todolist.value[todoID] = todolist.initialData[todoID].filter(f => f.status === 2);
                activeFilterButton(todoID, value);
            } else {
                todolist.value[todoID] = todolist.initialData[todoID];
                activeFilterButton(todoID, value);
            }
        } else {
            authStore.setError('Some error filter');
        }
    });


    const updateStatus = async (todolistId, taskId, status) => {
        const task = todolist.value[todolistId].find(t => t.id === taskId);
        const putObject = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }
        try {
            await instance.put(`${baseUrl}todo-lists/${todolistId}/tasks/${taskId}`, putObject)
            if (todolist.value[todolistId]) {
                const task = todolist.value[todolistId].find(t => t.id === taskId);
                if (task) {
                    task.status = putObject.status;
                }
            }
        } catch (error) {
            authStore.setError(error.message ? error.message : 'Some error occurred');
        } finally {
            isLoading.value = false;
        }
    };

    const getTasks = async (todolistId) => {
        try {
            const response = await instance.get(`${baseUrl}todo-lists/${todolistId}/tasks`);
            todolist.value[todolistId] = response.data.items;
        } catch (error) {
            authStore.setError(error.message ? error.message : 'Some error occurred');
        } finally {
            isLoading.value = false;
        }
    };
    const addTask = async (todolistId, title) => {
        const response = await instance.post(`${baseUrl}todo-lists/${todolistId}/tasks`, {title});
        try {
            if (response.data.resultCode === 0) {
                todolist.value[todolistId].unshift(response.data.data.item);
            } else {
                authStore.setError(response.data.messages[0]);
            }
        } catch (error) {
            authStore.setError(error.message ? error.message : 'Some error occurred');
        } finally {
            isLoading.value = false;
        }
    };

    const updateTitleTask = async (todolistId, taskId, title) => {
        const task = todolist.value[todolistId].find(t => t.id === taskId);
        const putObject = {
            title,
            description: task.description,
            completed: task.completed,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }
        await instance.put(`${baseUrl}todo-lists/${todolistId}/tasks/${taskId}`, putObject);
        try {
            if (todolist.value[todolistId]) {
                if (task) {
                    task.title = title;

                }
            }
        } catch (error) {
            authStore.setError(error.message ? error.message : 'Some error occurred');
        } finally {
            isLoading.value = false;
        }
    };
    const deleteTask = async (todolistId, taskId) => {
        try {
            const response = await instance.delete(`${baseUrl}todo-lists/${todolistId}/tasks/${taskId}`);
            if (response.data.resultCode === 0) {
                todolist.value[todolistId] = todolist.value[todolistId].filter(t => t.id !== taskId);

            } else {
                authStore.setError(response.data.messages[0]);
            }
        } catch (error) {
            authStore.setError(error.message ? error.message : 'Some error occurred');
        } finally {
            isLoading.value = false;

        }
    };
    const getTodolists = async () => {
        isLoading.value = true;
        try {
            const response = await instance.get(`${baseUrl}todo-lists`)
            todolists.value = response.data;
            todolists.value = todolists.value.map(m => ({...m, filter: 'All'}))
        } catch (error) {
            authStore.setError(error.message ? error.message : 'Some error occurred');
        } finally {
            isLoading.value = false;
        }
    };
    const createTodolist = async (titleTodolist) => {
        const response = await instance.post(`${baseUrl}todo-lists`, {title: titleTodolist});
        try {
            if (response.data.resultCode === 0) {
                const newTodolist = response.data.data.item
                todolists.value.unshift({...newTodolist, filter: 'All'});
                newTodolist[newTodolist.id] = [];
            } else {
                authStore.setError(response.data.messages[0]);
            }
        } catch (error) {
            authStore.setError(error.message ? error.message : 'Some error occurred');
        } finally {
            isLoading.value = false;
        }
    };


    const deleteTodolist = async (todolistId) => {
        const responce = await instance.delete(`${baseUrl}todo-lists/${todolistId}`)
        try {
            if (responce.data.resultCode === 0) {
                todolists.value = todolists.value.filter(f => f.id !== todolistId)
            } else {
                authStore.setError(responce.data.messages[0]);
            }
        } catch (error) {
            authStore.setError(error.message ? error.message : 'Some error occurred');
        } finally {
            isLoading.value = false;

        }
    };
    const updateTitleTodolist = async (todolistId, title) => {
        const responce = await instance.put(`${baseUrl}todo-lists/${todolistId}`, {title})
        try {
            if (responce.data.resultCode === 0) {
                const index = todolists.value.findIndex(fi => fi.id === todolistId);
                todolists.value[index].title = title;
            } else {
                authStore.setError(responce.data.messages[0]);
            }
        } catch (error) {
            authStore.setError(error.message ? error.message : 'Some error occurred');
        } finally {
            isLoading.value = false;
        }
    };


    return {
        todolist,
        deleteTask,
        filteredTasks,
        getTasks,
        todolists,
        deleteTodolist,
        updateTitleTask,
        updateTitleTodolist,
        getTodolists,
        createTodolist,
        addTask,
        updateStatus,
        isLoading,
        activeFilterButton
    };
});
