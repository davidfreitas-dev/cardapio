<template>
  <swiper
    :slides-per-view="2"
    :space-between="10"
    @swiper="onSwiper"
    @slide-change="onSlideChange"
  >
    <template v-for="(product, index) in products" :key="index">
      <swiper-slide>
        <ProductCard :item="product" />
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
}

/* Garantir o padding ao início e final do contêiner */
.swiper {
  padding: 0 1.2rem;
}
</style>
