import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@/use/useStorage'; 
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';

const { getStorage, setStorage } = useStorage();

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);

  if (getStorage('products')) {
    products.value = getStorage('products');
  }

  watch(
    products,
    newProducts => {
      setStorage('products', newProducts);
    },
    { deep: true }
  );

  const getProducts = async () => {
    let arrProducts = [];

    const querySnapshot = await getDocs(collection(db, 'products'));

    querySnapshot.forEach(doc => {
      const product = {
        ...{ id: doc.id },
        ...doc.data()
      };

      arrProducts.push(product);
    });

    products.value = arrProducts;
  };

  return { 
    products, 
    getProducts 
  };
});