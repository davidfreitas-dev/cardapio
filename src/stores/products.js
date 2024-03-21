import { ref } from 'vue';
import { defineStore } from 'pinia';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);

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