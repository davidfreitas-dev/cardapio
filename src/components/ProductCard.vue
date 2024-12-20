<script setup>
import { useRouter } from 'vue-router';
import { useStorage } from '@/use/useStorage';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { useCartStore } from '@/stores/cart';

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
});

const getImageUrl = (item) => {
  return new URL(`../assets/img/products/${item.id}.png`, import.meta.url).href;
};

const router = useRouter();

const handleSelectItem = () => {
  setStorage('product', props.item);
  router.push('/item');
};

const cartStore = useCartStore();

const handleAddToCart = () => {
  const item = { ...props.item };
  const cartProducts = cartStore.cart.products;
  const index = cartProducts.findIndex((products) => products.id === item.id);
  
  item.quantity = item.quantity || 1;
  
  if (index >= 0) {
    console.log(item.quantity);
    cartProducts[index].quantity += item.quantity;
    cartProducts[index].additional = item.additional;
    return;
  } 

  cartStore.addToCart(item);
};

const { setStorage } = useStorage();
</script>

<template>
  <div class="card-container flex flex-col gap-2 w-full shadow-xl rounded-xl cursor-pointer p-3 bg-white">
    <img
      class="card-img w-full h-auto rounded-lg"
      :src="getImageUrl(item)"
      :alt="`Imagem de ${item.description}`"
      @click="handleSelectItem"
    >
    <div class="card-content flex flex-col w-full">
      <div class="card-title font-bold text-font h-[40px]">
        {{ item.name }}
      </div>

      <div class="card-info flex items-center justify-between w-full mt-1">
        <strong class="item-price font-bold text-base text-primary">
          {{ $filters.currencyBRL(item.price) }}
        </strong>
        
        <button @click="handleAddToCart" class="flex gap-1 text-primary bg-primary bg-opacity-20 font-semibold rounded-lg p-1.5">
          <PlusIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>