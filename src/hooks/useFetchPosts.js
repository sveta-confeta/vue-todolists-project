import axios from "axios";
import {onMounted, ref} from 'vue'

export function useFetchPosts(posts) {
    const totalPages = ref(0);
    const isPostLoading = ref(false);
    const page = ref(1);
    const limit = ref(10);
    const fetchPosts = async () => {
        try {
            isPostLoading.value = true;
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: page.value,
                    _limit: limit.value
                }
            });
            const totalPostsHeader = response.headers['x-total-count'];

            if (totalPostsHeader) {
                totalPages.value = Math.ceil(Number(totalPostsHeader) / limit.value);
            }
            posts.value = response.data;
        } catch (e) {
            alert('Ошибка')
        } finally {
            isPostLoading.value = false;
        }
    }

    onMounted(() => {
        fetchPosts();
    });
    return {
        isPostLoading,
        totalPages,
        page,
        limit,
        fetchPosts,
    }
    // onCreated()
    // computed()
    // watch()

}