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
    class="item-container flex flex-col justify-between gap-2 cursor-pointer"
    @click="handleSelectItem"
  >
    <img
      :src="getImageUrl(item)"
      alt="Imagem de comida"
      class="item-img w-full h-auto rounded-lg"
    >

    <div class="item-content flex flex-col">
      <span class="item-desc font-semibold text-base text-font truncate">
        {{ item.name }}
      </span>

      <strong class="item-price font-bold text-base text-primary">
        {{ $filters.currencyBRL(item.price) }}
      </strong>
    </div>
  </div>
</template>