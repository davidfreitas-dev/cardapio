<script setup>
import { ref, watch, onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import Header from '@/components/Header.vue';
import Input from '@/components/Input.vue';
import Tabs from '@/components/Tabs.vue';
import Item from '@/components/Item.vue';
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

  if (param === 'Todos') {
    products.value = backupProducts;
    return;
  }

  products.value = backupProducts.filter((product => product.idcategory === param));
};
</script>

<template>
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

  <Tabs @on-click-tabs="handleFilter" />

  <ItemsSkeleton v-if="isLoading" />

  <div
    v-if="!isLoading && products.length"
    class="grid grid-cols-2 gap-4 my-5 mx-[1px]"
  >
    <Item
      v-for="(item, index) in products"
      :key="index"
      :item="item"
    />
  </div>
</template>