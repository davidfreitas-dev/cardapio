import { ref, watch, computed } from 'vue';
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

  const removeFromCart = (index) => {
    cart.value.products.splice(index, 1);
  };

  const totalItemsPrice = computed(() => {
    cart.value.totalPrice = cart.value.products
      .map(item => item.quantity * (item.price + item.additional
        .map(add => (add.selected ? add.price : 0) * 1)
        .reduce((total, current) => total + current, 0)))
      .reduce((total, current) => total + current, 0);

    return cart.value.totalPrice;
  });

  const totalItems = computed(() => {
    cart.value.totalItems = cart.value.products.length;

    return cart.value.totalItems;
  });

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
    totalItems,
    totalItemsPrice,
    addToCart,
    removeFromCart
  };
});
