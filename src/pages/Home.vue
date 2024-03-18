<script setup>
import { ref, computed, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';
import { useStorage } from '@/use/useStorage';
import Header from '@/components/Header.vue';
import Banner from '@/components/Banner.vue';
import CategoriesSlide from '@/components/CategoriesSlide.vue';
import ProductsSlide from '@/components/ProductsSlide.vue';
import BaseLayout from '@/components/shared/BaseLayout.vue';

const isLoading = ref(true);

const products = ref([]);

const loadData = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));

  querySnapshot.forEach(doc => {
    const product = {
      ...{ id: doc.id },
      ...doc.data()
    };

    products.value.push(product);
  });

  setStorage('products', products.value);

  isLoading.value = false;
};

onMounted(() => {
  loadData();
});

const favoritesProducts = computed(() => {
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

const handleFilter = (param) => {  
  const backupProducts = [ ...products.value ];

  if (param === 0) {
    products.value = backupProducts;
    return;
  }

  products.value = backupProducts.filter((product => product.idcategory === param));
};

const { setStorage, getStorage } = useStorage();
</script>

<template>
  <BaseLayout>
    <Header text="Bem-vindo 👋" />
    <Banner />
  </BaseLayout>

  <CategoriesSlide @on-click-tabs="handleFilter" />

  <ProductsSlide :products="products" />

  <!-- <BaseLayout>
    <ItemSlides
      title="Mais queridos"
      :items="favoritesProducts"
    />

    <ItemSlides
      title="Promoções do dia"
      :items="promoProducts"
    />
  </BaseLayout> -->
</template>