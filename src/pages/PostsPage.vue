<template>
  <div class="posts">
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="поиск..."/>
    <div class="posts__btns">
      <my-button class="posts__btn-creat" @click="openModalHandler">Создать пост</my-button>
      <div>
        <h4> Сортировка постов:</h4>
      <my-select :options="sortOptions" v-model="selectedSort" class="posts__select"></my-select>
      </div>
    </div>

    <my-modal v-model:show="showModal">
      <div>
        <h2 class="posts__modal-title">Создание поста:</h2>
        <post-form @create="addPost"/> <!--  так как мы добавляли slot, то мы можем внутрь закидывать компонеты-->
      </div>
    </my-modal>

    <post-list v-if="!isPostLoading"
               :posts="filteredPosts"
               @remove="deleteHandler"/>
    <my-loader v-else/>
    <div class="page">
      <div v-for="pageNumber in totalPages"
           :key="pageNumber"
           class="page__count"
           :class="{'page--current':page === pageNumber}"
           @click="pageNumberHandler(pageNumber)"
      >
        {{pageNumber}}
      </div>
    </div>
  </div>
</template>

<script setup>
import MyModal from "@/components/MyModal.vue";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyButton from "@/components/common/MyButton.vue";
import MySelect from "@/components/common/MySelect.vue";
import MyInput from "@/components/common/MyInput.vue";
import MyLoader from "@/components/common/MyLoader.vue";
import {computed, onMounted, ref, watch} from 'vue';

import { useFetchPosts } from "@/hooks/useFetchPosts";
//начальное состояние постов-инициализация
 let posts = ref([]);
 //импорт хука 
let { isPostLoading, totalPages, page, limit, fetchPosts } = useFetchPosts(posts);

// let isPostLoading = ref(false);

// ушла в хук useFetchPosts:

//удаление поста
const deleteHandler = (post) => {
  posts.value = posts.value.filter(p => p.id !== post.id);
}

//открытие модального окна
let showModal = ref(false);
const openModalHandler = () => {
  showModal.value = true;
}

//добавление нового поста
const addPost = (newPost) => {
  posts.value.unshift(newPost);
  showModal.value = false;

};
//постраничный вывод постов
// ушла в хук useFetchPosts:
// let page=ref(1); //тут будем хранить номер страницы
// const limit=ref(10); //количество постов на одной странице
// let totalPages=ref(0) ;

const pageNumberHandler=(pageNumber)=> {
  page.value = pageNumber;
  fetchPosts();
}
// ушла в хук useFetchPosts:
//запрос за постами с сервера
// onMounted(() => {
//   fetchPosts();
// })

//функция ушла в хук useFetchPosts
// async function fetchPosts() {
//   try {
//     isPostLoading.value = true;
//     const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
//       params:{_page:page.value,
//         _limit:limit.value}
//     });
//     const totalPostsHeader = response.headers['x-total-count'];
//
//     if (totalPostsHeader) {
//       totalPages.value = Math.ceil(Number(totalPostsHeader) / limit.value);
//     }
//     posts.value = response.data;
//   } catch (e) {
//     alert('Ошибка')
//   }
//   finally {
//     isPostLoading.value = false;
//   }
// }


//сортировка
let selectedSort = ref('');
let sortOptions = [
  {value: 'title', name: 'По названию'},
  {value:'body', name: 'По содержимому'},
];

const sortedPosts = computed(() => {
  return [...posts.value].sort((a, b) => a[selectedSort]?.localeCompare(b[selectedSort]));

});
//не надо нам оно уже:
watch(selectedSort, (newValue) => {
  posts.value.sort((a, b) => {
    return a[newValue]?.localeCompare(b[newValue]);
  });
});

//поиск и сортировка
let searchQuery = ref('');
const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const selected = selectedSort.value;

  return posts.value
      .filter(post => post.title.toLowerCase().includes(query))//фильтрация в титле
      .sort((a, b) => a[selected]?.localeCompare(b[selected]));
});


</script>

<style>
.posts {
  padding-top: 50px;
  max-width: 1000px;
  margin: 0 auto;
}

.posts__btn-creat {
  background: coral;
  cursor: pointer;
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: aliceblue;
  font-size: 18px;
}
.posts__btns {
  margin-top: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.page{
  display: flex;
  align-items: center;
  margin: 20px 0 50px 0;

}
.posts__modal-title {
  margin-bottom: 15px;
}
.page__count {
  margin-right: 15px;
  border: 1px solid coral !important;
  padding: 10px;
  cursor: pointer;
}
.page--current {
  background: coral !important;
  color: azure;
}
.posts__select {
  margin-top: 15px;
  padding: 10px;
}
.hightlight {
  color: coral;
}
</style>