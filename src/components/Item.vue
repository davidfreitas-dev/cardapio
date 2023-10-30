<script setup>
import { useRouter } from 'vue-router';
import { useStorage } from '@/use/useStorage';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/vue/24/outline';

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

const { setStorage } = useStorage();
</script>

<template>
  <div
    class="item-container flex flex-col justify-between gap-2 shadow-xl rounded-xl cursor-pointer p-3"
    @click="handleSelectItem"
  >
    <img
      :src="getImageUrl(item)"
      alt="Imagem de comida"
      class="item-img w-full h-auto rounded-lg"
    >

    <div class="item-content flex flex-col items-center">
      <strong class="item-price font-bold text-base text-primary">
        {{ $filters.currencyBRL(item.price) }}
      </strong>
        
      <div class="item-desc font-bold text-base text-font truncate">
        {{ item.name }}
      </div>

      <div class="flex items-center justify-evenly w-3/4 mt-1">
        <button class="flex gap-1 text-primary bg-primary bg-opacity-20 font-semibold rounded-lg my-2 p-2.5">
          <HeartIcon class="h-4 w-4" />
        </button>
        
        <button class="flex gap-1 text-primary bg-primary bg-opacity-20 font-semibold rounded-lg my-2 p-2.5">
          <ShoppingCartIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>