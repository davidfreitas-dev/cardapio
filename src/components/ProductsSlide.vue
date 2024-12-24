<template>
  <swiper
    :slides-per-view="'auto'"
    :space-between="12"
    @swiper="onSwiper"
    @slide-change="onSlideChange"
  >
    <template v-for="(product, index) in products" :key="index">
      <swiper-slide>
        <ProductCard :product="product" />
      </swiper-slide>
    </template>
  </swiper>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import ProductCard from '@/components/ProductCard.vue';

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
});

const onSwiper = (swiper) => {
  // console.log(swiper);
};

const onSlideChange = () => {
  // console.log('slide change');
};
</script>

<style scoped>
/* Estiliza os slides */
.swiper-slide {
  padding-bottom: 2rem;
  width: 45%;
}

/* Garantir o padding ao início e final do contêiner */
.swiper {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
</style>
