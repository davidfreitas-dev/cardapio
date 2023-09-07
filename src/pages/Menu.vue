<script setup>
import { ref, watch, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';
import { useStorage } from '@/use/useStorage';
import Heading from '@/components/Heading.vue';
import TextInput from '@/components/TextInput.vue';
import Tabs from '@/components/Tabs.vue';
import Item from '@/components/Item.vue';
import ItemSkeleton from '@/components/ItemSkeleton.vue';

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

  handleCategories();
};

onMounted(() => {
  loadData();
});

const categories = ref([
  { name: 'Todos', active: true }
]);

const handleCategories = () => {
  const arrayCategories = new Set();

  products.value.forEach(product => {
    arrayCategories.add(product.category);
  });

  const uniqueCategories = Array.from(arrayCategories).map(category => {
    return {
      name: category,
      active: false, 
    };
  });

  categories.value = categories.value.concat(uniqueCategories);
};

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

  products.value = backupProducts.filter((product => product.category === param));
};

const { setStorage, getStorage } = useStorage();
</script>

<template>
  <Heading
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

  <Tabs
    :categories="categories"
    @on-handle-tabs="handleFilter"
  />

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