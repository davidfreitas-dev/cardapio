import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase-firestore';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);

  if (localStorage.getItem('cardapio.products')) {
    products.value = JSON.parse(localStorage.getItem('cardapio.products'));
  }

  watch(
    products,
    newProducts => {
      localStorage.setItem('cardapio.products', JSON.stringify(newProducts));
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