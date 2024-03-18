<script setup>
import { useRouter } from 'vue-router';
import { useStorage } from '@/use/useStorage';
import { PlusIcon, HeartIcon } from '@heroicons/vue/24/outline';

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
    class="item-container flex flex-col justify-between items-center gap-2 shadow-xl rounded-xl cursor-pointer w-[140px] min-h-[220px] p-3 my-4"
    @click="handleSelectItem"
  >
    <img
      :src="getImageUrl(item)"
      :alt="`Imagem de ${item.description}`"
      class="item-img w-full h-auto rounded-lg"
    >

    <div class="item-content flex flex-col w-full">
      <div class="item-desc font-bold text-sm text-font h-[40px]">
        {{ item.name }}
      </div>

      <div class="flex items-center justify-between w-full mt-1">
        <strong class="item-price font-bold text-base text-primary">
          {{ $filters.currencyBRL(item.price) }}
        </strong>
        
        <button class="flex gap-1 text-primary bg-primary bg-opacity-20 font-semibold rounded-lg p-1.5">
          <PlusIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>