<script setup>
import { ref, computed, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';
import { useStorage } from '@/use/useStorage';
import Heading from '@/components/Heading.vue';
import TextInput from '@/components/TextInput.vue';
import Banner from '@/components/Banner.vue';
import ItemSlides from '@/components/ItemSlides.vue';

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

const { setStorage, getStorage } = useStorage();
</script>

<template>
  <Heading
    text="Bem-vindo 👋"
    size="lg"
  />

  <TextInput
    type="search"
    text="O que você esta procurando?"
    class="border my-5"
  />

  <Banner />

  <ItemSlides
    title="Mais queridos"
    :items="favoritesProducts"
  />

  <ItemSlides
    title="Promoções do dia"
    :items="promoProducts"
  />
</template>