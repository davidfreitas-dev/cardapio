import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([]);

  if (localStorage.getItem('cardapio.categories')) {
    categories.value = JSON.parse(localStorage.getItem('cardapio.categories'));
  }

  watch(
    categories,
    newCategories => {
      localStorage.setItem('cardapio.categories', JSON.stringify(newCategories));
    },
    { deep: true }
  );

  const getCategories = async () => {
    let arrCategories = [{
      id: 0,
      description: 'Todos',
      active: true
    }];

    const querySnapshot = await getDocs(collection(db, 'categories'));

    querySnapshot.forEach(doc => {
      const category = {
        ...{ id: doc.id },
        ...doc.data()
      };

      arrCategories.push(category);
    });

    categories.value = arrCategories;
  };

  return { 
    categories, 
    getCategories 
  };
});