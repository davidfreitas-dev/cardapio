<script setup>
import { ref, watch, onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import BaseLayout from '@/components/shared/BaseLayout.vue';
import Header from '@/components/Header.vue';
import Input from '@/components/Input.vue';
import CategoriesSlide from '@/components/CategoriesSlide.vue';
import ProductCard from '@/components/ProductCard.vue';
import ItemsSkeleton from '@/components/ItemsSkeleton.vue';

const productsStore = useProductsStore();

const isLoading = ref(true);

onMounted(async () => {
  await productsStore.getProducts();
  
  isLoading.value = false;
});

const products = ref([]);

watch(
  productsStore.products, 
  (newProducts) => {
    products.value = newProducts;
  }
);

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
  <BaseLayout>
    <Header
      text="Cardápio"
      size="lg"
    />

    <Input
      v-model="search"
      v-debounce:500ms="handleSearch"
      type="search"
      class="border my-5"
      placeholder="O que você esta procurando?"
    />
  </BaseLayout>

  <CategoriesSlide @click-tabs="handleFilter" />
  
  <BaseLayout>
    <ItemsSkeleton v-if="isLoading" />

    <div
      v-if="!isLoading && products.length"
      class="grid grid-cols-2 gap-4 my-5 mx-[1px]"
    >
      <ProductCard
        v-for="(item, index) in products"
        :key="index"
        :item="item"
      />
    </div>
  </BaseLayout>
</template>