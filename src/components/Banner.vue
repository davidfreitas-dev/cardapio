<template>
  <swiper
    :modules="modules"
    :autoplay="autoplayConfig"
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slide-change="onSlideChange"
  >
    <swiper-slide v-for="(banner, index) in banners" :key="index">
      <div
        class="w-full aspect-w-16 aspect-h-9 rounded-2xl bg-no-repeat bg-cover bg-center"
        :style="{ backgroundImage: `url(${banner})` }"
      />
    </swiper-slide>
  </swiper>
</template>

<script setup>
// Import Swiper Vue.js components and modules
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const modules = [Autoplay, Pagination];

const autoplayConfig = {
  delay: 3000,
  disableOnInteraction: false,
};

// Banners
const banners = [
  new URL('@/assets/img/banners/banner-1.png', import.meta.url).href,
  new URL('@/assets/img/banners/banner-2.png', import.meta.url).href,
  new URL('@/assets/img/banners/banner-3.png', import.meta.url).href,
];

const onSwiper = (swiper) => {
  // console.log(swiper);
};

const onSlideChange = () => {
  // console.log('slide change');
};
</script>

<style scoped>
.swiper-pagination-bullet {
  opacity: 0.6;
  background-color: #ccc !important;
  transition: opacity 0.3s, background-color 0.3s;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background-color: #fdbd10 !important;
}
</style>

