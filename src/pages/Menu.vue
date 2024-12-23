<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from '@/api/axios';
import Container from '@/components/shared/Container.vue';
import Heading from '@/components/shared/Heading.vue';
import Input from '@/components/shared/Input.vue';
import CategoriesSlide from '@/components/CategoriesSlide.vue';
import ProductCard from '@/components/ProductCard.vue';
import ItemsSkeleton from '@/components/ItemsSkeleton.vue';
import Pagination from '@/components/shared/Pagination.vue';
import Toast from '@/components/shared/Toast.vue';

const toastRef = ref(null);
const isLoading = ref(true);
const categories = ref(null);

const getCategories = async () => {
  isLoading.value = true;

  try {
    const response = await axios.get('/categories');
    categories.value = response.data;
  } catch (error) {
    console.log(error);
    toastRef.value?.showToast('error', 'Falha ao carregar categorias.');
  }

  isLoading.value = false;
};

const data = ref(null);

const getProducts = async (categoryId = 0) => {
  isLoading.value = true;

  try {
    const response = await axios.get(`/products/category/${categoryId}`);
    data.value = response.data;
    data.value.backup = data.value.products;
  } catch (error) {
    console.log(error);
    toastRef.value?.showToast('error', 'Falha ao carregar categorias.');
  }

  isLoading.value = false;
};

const changePage = () => {
  
};

const loadData = async () => {
  getCategories();
  getProducts();
};

onMounted(async () => {
  await loadData();
});

const search = ref('');

watch(search, (newSearch) => {
  if (!newSearch) {
    handleSearch();
  }
});

const handleSearch = () => {
  if (!search.value) {
    data.value.products.value = [...data.value.backup];
    return;
  }

  data.value.products.value = data.value.backup.filter((product => product.name.match(new RegExp(search.value, 'gi'))));
};

const handleFilter = async (categoryId) => {
  await getProducts(categoryId);
};
</script>

<template>
  <Container>
    <Heading
      text="Cardápio"
      size="lg"
    />

    <Input
      v-model="search"
      v-debounce:500ms="handleSearch"
      type="search"
      class="my-5"
      placeholder="O que você esta procurando?"
    />
  </Container>

  <CategoriesSlide
    v-if="categories && categories.length"
    :categories="categories"
    @click-slide="handleFilter"
  />
  
  <Container>
    <ItemsSkeleton v-if="isLoading" />

    <div
      v-if="!isLoading && (data.products && data.products.length)"
      class="grid grid-cols-2 gap-4 my-5 mx-[1px] pb-3"
    >
      <ProductCard
        v-for="(product, index) in data.products"
        :key="index"
        :product="product"
      />
    </div>

    <Pagination
      ref="paginationRef"
      :total-pages="10"
      :total-items="100"
      @on-page-change="changePage"
    />

    <Toast ref="toastRef" />
  </Container>
</template>