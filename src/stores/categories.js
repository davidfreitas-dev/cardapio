import { ref } from 'vue';
import { defineStore } from 'pinia';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([{
    id: 0,
    description: 'Todos',
    active: true
  }]);

  const getCategories = async () => {
    const querySnapshot = await getDocs(collection(db, 'categories'));

    querySnapshot.forEach(doc => {
      const product = {
        ...{ id: doc.id },
        ...doc.data()
      };

      categories.value.push(product);
    });

    console.log('All Categories: ', categories.value);
  };

  return { 
    categories, 
    getCategories 
  };
});