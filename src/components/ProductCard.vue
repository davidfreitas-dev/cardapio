<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStorage } from '@/use/useStorage';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { useCartStore } from '@/stores/cart';

const props = defineProps({
  product: {
    type: Object,
    default: () => ({})
  }
});

const product = ref({ ...props.product });

const router = useRouter();

const handleSelectProduct = () => {
  setStorage('product', product.value);
  router.push('/item');
};

const cartStore = useCartStore();

const handleAddToCart = () => {
  const cartProducts = cartStore.cart.products;

  const index = cartProducts.findIndex((products) => products.idproduct === product.value.idproduct);
  
  product.value.quantity = product.value.quantity || 1;
  
  if (index >= 0) {
    console.log(product.value.quantity);
    cartProducts[index].quantity += product.value.quantity;
    cartProducts[index].additional = product.value.additional;
    return;
  } else {
    cartStore.addToCart(product.value);
  }  

  router.push('/cart');
};

const { setStorage } = useStorage();
</script>

<template>
  <div class="card-container flex flex-col gap-2 w-full shadow-xl rounded-xl cursor-pointer p-3 bg-white">
    <img
      class="card-img w-full h-auto rounded-lg"
      :src="product.image"
      :alt="`Imagem de ${product.name}`"
      @click="handleSelectProduct"
    >
    <div class="card-content flex flex-col w-full">
      <div class="card-title leading-5 truncate tracking-tight font-bold text-font">
        {{ product.name }}
      </div>

      <div class="card-info flex items-center justify-between w-full mt-2">
        <strong class="item-price tracking-tight font-extrabold text-lg text-font">
          {{ $filters.currencyBRL(product.price) }}
        </strong>
        
        <button @click="handleAddToCart" class="flex gap-1 text-font bg-primary bg-opacity-80 rounded-lg transition-all duration-200 ease-in active:scale-95 p-1.5">
          <PlusIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>