import {defineStore} from 'pinia'
import {ref, computed} from "vue";
import axios from 'axios';

const baseUrl = 'https://social-network.samuraijs.com/api/1.1/';
export const instance = axios.create({
    withCredentials: true,
});


export const useTodoListStore = defineStore('todoLists', () => {

    const todolist = ref({
        //     [todolistId1]:[
        //     { title: 'покупки в магазине', id: 1, isDone: true },
        //     { title: 'уборка в доме', id: 2, isDone: true },
        //     { title: 'уборка на улице', id: 3, isDone: false },
    });

    const todolists = ref([
        // { title: 'домашние дела', id: todolistId1,filter:'All'},
    ]);

    let isLoading = ref({ value: false });

    const errorMessage = ref('');
    console.log(errorMessage.value)

    const activeFilterButton = (todoID, value) => {
        const todoList = todolists.value.find(item => item.id === todoID);
        if (todoList) {
            todoList.filter = value;  //понятно какая кнопка нажата и активна
        }
    };


    const filteredTasks = computed(() => (todoID, value) => {
        if (!todolist.initialData) {
            todolist.initialData = { ...todolist.value };
        }

        if (value === 'Active') {
                    todolist.value[todoID] = todolist.initialData[todoID].filter(f => {
                       return  f.status === 0
                    });
                    activeFilterButton(todoID, value);

                } else if (value === 'Completed') {
                    todolist.value[todoID] = todolist.initialData[todoID].filter(f => {
                        return f.status === 2;
                    });
                    activeFilterButton(todoID, value);

                } else {
                    todolist.value[todoID] = todolist.initialData[todoID];
                    activeFilterButton(todoID, value);

                }
    });

    const updateStatus = async (todolistId, taskId, status) => {
        isLoading.value = true;
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
            errorMessage.value = error.message ? error.message : 'Some error occurred';
        } finally {
            isLoading.value = false;
        }
    };

    const getTasks = async (todolistId) => {
        try {
            const response = await instance.get(`${baseUrl}todo-lists/${todolistId}/tasks`);
            todolist.value[todolistId] = response.data.items;

        } catch (error) {
            errorMessage.value = error.message ? error.message : 'Some error occurred';
        }
    };
    const addTask = async (todolistId, title) => {
        isLoading.value = true;
        const response = await instance.post(`${baseUrl}todo-lists/${todolistId}/tasks`, {title});
        try {
            if (response.data.resultCode === 0) {
                todolist.value[todolistId].unshift(response.data.data.item);
                await getTodolists();
            } else {
                errorMessage.value = response.data.messages[0];
            }
        } catch (error) {
            errorMessage.value = error.message ? error.message : 'Some error occurred';
        } finally {
            isLoading.value = false;
        }
    };

    const updateTitleTask = async (todolistId, taskId, title) => {
        isLoading.value = true;
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
        try {
            await instance.put(`${baseUrl}todo-lists/${todolistId}/tasks/${taskId}`, putObject);
            if (todolist.value[todolistId]) {
                if (task) {
                    task.title = title;

                }
            }
        } catch (error) {
            errorMessage.value = error.message ? error.message : 'Some error occurred';
        } finally {
            isLoading.value = false;
        }
    };
    const deleteTask = async (todolistId, taskId) => {
        try {
            isLoading.value = true;
            const response = await instance.delete(`${baseUrl}todo-lists/${todolistId}/tasks/${taskId}`);
            await getTasks(todolistId);
        } catch (error) {
            errorMessage.value = error.message ? error.message : 'Some error occurred';
        } finally {
            isLoading.value = false;
        }
    };
    const getTodolists = async () => {
        try {
            isLoading.value = true;
            const response = await instance.get(`${baseUrl}todo-lists`)
            todolists.value = response.data;
            todolists.value = todolists.value.map(m => ({...m, filter: 'All'}))
        } catch (error) {
            errorMessage.value = error.message ? error.message : 'Some error occurred';
        } finally {
            isLoading.value = false;
        }
    };
    const createTodolist = async (titleTodolist) => {
        isLoading.value = true;
        const response = await instance.post(`${baseUrl}todo-lists`, {title: titleTodolist});
        try {
            if (response.data.resultCode === 0) {
                const newTodolist = response.data.data;
                todolist.value[newTodolist.id] = [];
                todolists.value.unshift(response.data);
                if (newTodolist) {
                    await getTodolists();
                }
            } else {
                errorMessage.value = response.data.messages[0];
            }
        } catch (error) {
            errorMessage.value = error.message ? error.message : 'Some error occurred';
        } finally {
            isLoading.value = false;
        }
    };


    const deleteTodolist = async (todolistId) => {
        isLoading.value = true;
        try {
            await instance.delete(`${baseUrl}todo-lists/${todolistId}`)
            await getTodolists();
        } catch (error) {
            errorMessage.value = error.message ? error.message : 'Some error occurred';
        } finally {
            isLoading.value = false;

        }
    };
    const updateTitleTodolist = async (todolistId, title) => {
        isLoading.value = true;
        const responce = await instance.put(`${baseUrl}todo-lists/${todolistId}`, {title})
        try {
            if (responce.data.resultCode === 0) {
                await getTodolists();
            } else {
                errorMessage.value = responce.data.messages[0];
            }
        } catch (error) {
            errorMessage.value = error.message ? error.message : 'Some error occurred';
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
        activeFilterButton,
        errorMessage,
    };
});
