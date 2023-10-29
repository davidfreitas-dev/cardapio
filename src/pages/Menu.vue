<script setup>
import { ref, watch, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';
import { useStorage } from '@/use/useStorage';
import Header from '@/components/Header.vue';
import TextInput from '@/components/TextInput.vue';
import Tabs from '@/components/Tabs.vue';
import Item from '@/components/Item.vue';
import ItemSkeleton from '@/components/ItemSkeleton.vue';

const products = ref([]);

const isLoading = ref(true);

const getProducts = async () => {
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
  getProducts();
});

const search = ref('');

watch(search, (newSearch) => {
  if (!newSearch) {
    handleSearch();
  }
});

const handleSearch = () => {
  const backupProducts = getStorage('products');

  if (!search.value) {
    products.value = backupProducts;
    return;
  }

  products.value = backupProducts.filter((product => product.name.match(new RegExp(search.value, 'gi'))));
};

const handleFilter = (param) => {  
  const backupProducts = getStorage('products');

  if (param === 'Todos') {
    products.value = backupProducts;
    return;
  }

  products.value = backupProducts.filter((product => product.idcategory === param));
};

const { setStorage, getStorage } = useStorage();
</script>

<template>
  <Header
    text="Cardápio"
    color="primary"
    size="lg"
  />

  <TextInput
    v-model="search"
    v-debounce:500ms="handleSearch"
    type="search"
    text="O que você esta procurando?"
    class="border my-5"
  />

  <Tabs @on-click-tabs="handleFilter" />

  <ItemSkeleton v-if="isLoading" />

  <div
    v-else
    class="grid grid-cols-2 gap-4 my-5 mx-[1px]"
  >
    <Item
      v-for="(item, index) in products"
      :key="index"
      :item="item"
    />
  </div>
</template>