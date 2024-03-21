<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useStorage } from '@/use/useStorage';
import Header from '@/components/shared/Header.vue';
import Banner from '@/components/Banner.vue';
import ProductsSlide from '@/components/ProductsSlide.vue';
import BaseLayout from '@/components/shared/BaseLayout.vue';

const isLoading = ref(true);
const productsStore = useProductsStore();
const products = ref([]);

watch(
  productsStore.products, 
  (newProducts) => {
    products.value = newProducts;
  }
);

onMounted(async () => {
  await productsStore.getProducts();
  isLoading.value = false;
});

const favoriteProducts = computed(() => {
  const products = getStorage('products') || [];

  const selectedProducts = [];
  
  while (selectedProducts.length < 5 && products.length > 0) {
    const ramdonIndex = Math.floor(Math.random() * products.length);
    selectedProducts.push(products.splice(ramdonIndex, 1)[0]);
  }

  return selectedProducts;
});

const promoProducts = computed(() => {
  const products = getStorage('products') || [];

  const selectedProducts = [];
  
  while (selectedProducts.length < 5 && products.length > 0) {
    const ramdonIndex = Math.floor(Math.random() * products.length);
    selectedProducts.push(products.splice(ramdonIndex, 1)[0]);
  }

  return selectedProducts;
});

const { getStorage } = useStorage();
</script>

<template>
  <BaseLayout>
    <Header text="Bem-vindo 👋" />
    <Banner />
  </BaseLayout>

  <Header
    text="Mais pedidos"
    size="sm"
    class="pl-5"
  />
  <ProductsSlide
    :products="favoriteProducts"
    slide-id="1"
  />

  <Header
    text="Promoções"
    size="sm"
    class="pl-5"
  />
  <ProductsSlide
    :products="promoProducts"
    slide-id="2"
  />

  <div class="pb-20" />
</template>