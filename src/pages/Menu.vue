<script setup>
import { ref, watch, onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import axios from '@/api/axios';
import Container from '@/components/shared/Container.vue';
import Heading from '@/components/shared/Heading.vue';
import Input from '@/components/shared/Input.vue';
import CategoriesSlide from '@/components/CategoriesSlide.vue';
import ProductCard from '@/components/ProductCard.vue';
import ItemsSkeleton from '@/components/ItemsSkeleton.vue';
import Toast from '@/components/shared/Toast.vue';

const productsStore = useProductsStore();
const isLoading = ref(true);
const categories = ref(null);
const products = ref([]);

const toastRef = ref(null);

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

onMounted(async () => {
  await productsStore.getProducts();
  products.value = productsStore.products;
  await getCategories();
  isLoading.value = false;
});

const search = ref('');

watch(search, (newSearch) => {
  if (!newSearch) {
    handleSearch();
  }
});

const handleSearch = () => {
  const backupProducts = productsStore.products;

  if (!search.value) {
    products.value = backupProducts;
    return;
  }

  products.value = backupProducts.filter((product => product.name.match(new RegExp(search.value, 'gi'))));
};

const handleFilter = (param) => {  
  const backupProducts = productsStore.products;

  if (param === 0) {
    products.value = backupProducts;
    return;
  }

  products.value = backupProducts.filter((product => product.idcategory === param));
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
      v-if="!isLoading && products.length"
      class="grid grid-cols-2 gap-4 my-5 mx-[1px] pb-20"
    >
      <ProductCard
        v-for="(item, index) in products"
        :key="index"
        :item="item"
      />
    </div>

    <Toast ref="toastRef" />
  </Container>
</template>