<template>
  <div class="posts">
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="поиск..."/>
    <div class="posts__btns">
      <my-button class="posts__btn-creat" @click="openModalHandler">Создать пост</my-button>
      <my-select :options="sortOptions" v-model="selectedSort" ></my-select>
    </div>

    <my-modal v-model:show="showModal">
      <div>
        <h2>Создание поста:</h2>
        <post-form @create="addPost"/> <!--  так как мы добавляли slot, то мы можем внутрь закидывать компонеты-->
      </div>
    </my-modal>

    <post-list
        :posts="filteredPosts"
        @remove="deleteHandler"/>
    <div ref="uploadElement" class="observer"></div>
  </div>
</template>

<script setup>
import MyModal from "@/components/MyModal.vue";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyButton from "@/components/common/MyButton.vue";
import MySelect from "@/components/common/MySelect.vue";
import MyInput from "@/components/common/MyInput.vue";

import {computed, onMounted, ref, watch} from 'vue';
import axios from "axios";

let posts = ref([]);


const deleteHandler = (post) => {
  posts.value = posts.value.filter(p => p.id !== post.id);
}

let showModal = ref(false);
const openModalHandler = () => {
  showModal.value = true;
}

const addPost = (newPost) => {
  posts.value.push(newPost);
  showModal.value = false;

};


let page=ref(1); //тут будем хранить номер страницы
const limit=ref(10); //количество постов на одной странице

async function fetchPostsObserve() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params:{_page:page.value,
        _limit:limit.value}
    });
    page.value=page.value+1

    posts.value = [...posts.value, ...response.data];
  } catch (e) {
    alert('Ошибка')
  }
}
const uploadElement = ref(null);

onMounted(() => {
  let options = {
    rootMargin: "0px",
    threshold: 1.0, //элемент должен показаться полностью в зоне пересечения
  }
  const callback = (entries, observer) => {
    if (entries[0].isIntersecting) {
      fetchPostsObserve();
    }

  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(uploadElement.value) //будем следить за этим элементом
})



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

//поиск
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
}
.posts__btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page{
  display: flex;
  align-items: center;
  margin-top: 20px;

}
.page__count {
  margin-right: 15px;
  border: 1px solid blueviolet;
  padding: 10px;
  cursor: pointer;
}
.page--current {
  background: blueviolet;
  color: azure;
}
.observer {
  height: 30px;
  background: coral;
  width: 100%;
}
</style>