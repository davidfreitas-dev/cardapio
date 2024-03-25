import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@/use/useStorage'; 
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';

const { getStorage, setStorage } = useStorage();

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([]);

  if (getStorage('categories')) {
    categories.value = getStorage('categories');
  }

  watch(
    categories,
    newCategories => {
      setStorage('categories', newCategories);
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