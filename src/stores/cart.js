import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@/use/useStorage';

export const useCartStore = defineStore('cart', () => {
  const cart = ref({
    products: [],
    totalItems: 0,
    totalPrice: 0
  });

  const addToCart = (product) => {
    cart.value.products.push(product);
  };

  const { getStorage, setStorage } = useStorage();

  if (getStorage('cart')) {
    cart.value = getStorage('cart');
  }
  
  watch(
    cart,
    newCart => {
      setStorage('cart', newCart);
    },
    { deep: true }
  );

  return { 
    cart, 
    addToCart
  };
});
