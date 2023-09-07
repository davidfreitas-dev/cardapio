<script setup>
import { useRouter } from 'vue-router';
import { useStorage } from '@/use/useStorage';

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
});

const getImageUrl = (item) => {
  return new URL(`../assets/img/${item.image}`, import.meta.url).href;
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
    class="flex flex-col cursor-pointer"
    @click="handleSelectItem"
  >
    <img
      :src="getImageUrl(item)"
      class="w-full h-auto rounded-lg"
      alt="Imagem de comida"
    >

    <span class="font-semibold text-base text-font truncate mt-2">
      {{ item.name }}
    </span>

    <strong class="font-bold text-base text-primary">
      {{ $filters.currencyBRL(item.price) }}
    </strong>
  </div>
</template>