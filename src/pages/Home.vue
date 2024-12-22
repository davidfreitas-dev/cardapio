<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useStorage } from '@/use/useStorage';
import Heading from '@/components/shared/Heading.vue';
import Banner from '@/components/Banner.vue';
import ProductsSlide from '@/components/ProductsSlide.vue';
import BaseLayout from '@/components/shared/BaseLayout.vue';

const productsStore = useProductsStore();
const isLoading = ref(true);
const products = ref([]);

onMounted(async () => {
  await productsStore.getProducts();
  products.value = productsStore.products;
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
    <Heading text="Bem-vindo 👋" />
    <Banner />
  </BaseLayout>

  <Heading
    text="Mais pedidos"
    size="sm"
    class="pl-5 pt-3"
  />
  <ProductsSlide :products="favoriteProducts" slide-id="1" />

  <Heading
    text="Promoções"
    size="sm"
    class="pl-5"
  />
  <ProductsSlide :products="promoProducts" slide-id="2" />

  <div class="pb-20" />
</template>