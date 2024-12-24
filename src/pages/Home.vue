<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import axios from '@/api/axios';
import Heading from '@/components/shared/Heading.vue';
import Container from '@/components/shared/Container.vue';
import Banner from '@/components/Banner.vue';
import Input from '@/components/shared/Input.vue';
import CategoriesSlide from '@/components/CategoriesSlide.vue';
import ProductCard from '@/components/ProductCard.vue';
import ItemsSkeleton from '@/components/ItemsSkeleton.vue';
import Pagination from '@/components/shared/Pagination.vue';
import Toast from '@/components/shared/Toast.vue';

const page = ref(1);
const search = ref('');
const toastRef = ref(null);
const isLoading = ref(true);
const selectedCategoryId = ref(0);
const categoriesData = ref(null);
const productsData = ref(null);

const getCategories = async () => {
  isLoading.value = true;

  try {
    const response = await axios.get('/categories');
    categoriesData.value = response.data;
  } catch (error) {
    console.log(error);
    toastRef.value?.showToast('error', 'Falha ao carregar categorias.');
  }

  isLoading.value = false;
};

const getProducts = async (categoryId = selectedCategoryId.value, searchQuery = search.value) => {
  isLoading.value = true;

  const params = new URLSearchParams();

  if (searchQuery) {
    params.append('search', searchQuery);
  }

  params.append('page', page.value);

  try {
    const response = await axios.get(`/categories/${categoryId}/products?${params.toString()}`);
    productsData.value = response.data;
  } catch (error) {
    console.log(error);
    toastRef.value?.showToast('error', 'Falha ao carregar produtos.');
  }

  isLoading.value = false;
};

const changePage = (currentPage) => {
  page.value = currentPage;
  getProducts();
};

const loadData = async () => {
  getCategories();
  getProducts();
};

onMounted(async () => {
  await loadData();
});

watch(search, (newSearch) => {
  if (!newSearch) {
    handleSearch();
  }
});

const handleSearch = () => {
  getProducts(selectedCategoryId.value, search.value);
};

const handleFilter = (categoryId) => {
  page.value = 1;
  selectedCategoryId.value = categoryId;
  search.value = '';
  getProducts(categoryId);
};
</script>

<template>
  <Container>
    <Heading text="Bem-vindo 👋" />

    <Banner />

    <Input
      v-model="search"
      v-debounce:500ms="handleSearch" 
      type="search"
      class="my-5"
      placeholder="O que você está procurando?"
    />
  </Container>

  <CategoriesSlide
    v-if="categoriesData?.categories && categoriesData?.categories.length"
    :categories="categoriesData.categories"
    @click-slide="handleFilter"
  />

  <Container>
    <ItemsSkeleton v-if="isLoading" />

    <div
      v-if="!isLoading && (productsData?.products && productsData?.products.length)"
      class="grid grid-cols-2 gap-4 my-5 mx-[1px] pb-3"
    >
      <ProductCard
        v-for="(product) in productsData.products"
        :key="product.id"
        :product="product"
      />
    </div>

    <Pagination
      ref="paginationRef"
      :total-pages="productsData?.pages"
      :total-items="productsData?.total"
      @on-page-change="changePage"
    />

    <Toast ref="toastRef" />
  </Container>
</template>