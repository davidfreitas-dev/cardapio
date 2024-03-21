import { ref } from 'vue';
import { defineStore } from 'pinia';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([]);

  const getCategories = async () => {
    let arrCategories = [{
      id: 0,
      description: 'Todos',
      active: true
    }];

    const querySnapshot = await getDocs(collection(db, 'categories'));

    querySnapshot.forEach(doc => {
      const product = {
        ...{ id: doc.id },
        ...doc.data()
      };

      arrCategories.push(product);
    });

    categories.value = arrCategories;
  };

  return { 
    categories, 
    getCategories 
  };
});