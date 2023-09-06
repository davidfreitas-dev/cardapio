<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useStorage } from '@/use/useStorage';
import 'swiper/css';

const props = defineProps({
  title: {
    type: String,
    default: 'Slide Title'
  },
  items: {
    type: Array,
    default: () => []
  }
});

const imagePath = ref('../src/assets/img/');

const router = useRouter();

const handleSelectItem = (item) => {
  setStorage('product', item);

  router.push('/item');
};

const { setStorage } = useStorage();
</script>

<template>
  <div class="font-bold font-sans text-xl my-5">
    {{ title }}
  </div>

  <swiper
    :slides-per-view="2.5"
    :space-between="15"
  >
    <swiper-slide
      v-for="(item, index) in items"
      :key="index"
    >
      <div
        class="flex flex-col cursor-pointer"
        @click="handleSelectItem(item)"
      >
        <img
          :src="imagePath + item.image"
          width="128"
          height="128"
          class="rounded-lg"
          alt="Imagem de comida"
        >

        <span class="font-semibold text-sm text-font truncate mt-2">
          {{ item.name }}
        </span>

        <strong class="font-bold text-sm text-primary">
          {{ $filters.currencyBRL(item.price) }}
        </strong>
      </div>
    </swiper-slide>
  </swiper>
</template>