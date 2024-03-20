<script setup>
import { useRouter } from 'vue-router';
import { useStorage } from '@/use/useStorage';
import { PlusIcon } from '@heroicons/vue/24/outline';

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
  <div class="card-container flex flex-col gap-2 min-w-[40%] max-w-[40%] shadow-xl rounded-xl cursor-pointer p-3 mb-8">
    <img
      :src="getImageUrl(item)"
      :alt="`Imagem de ${item.description}`"
      class="card-img w-full h-auto rounded-lg"
    >
    <div class="card-content flex flex-col w-full">
      <div class="card-title font-bold text-sm text-font h-[40px]">
        {{ item.name }}
      </div>

      <div class="card-info flex items-center justify-between w-full mt-1">
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