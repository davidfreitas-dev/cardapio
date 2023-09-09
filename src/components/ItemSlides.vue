<script setup>
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

const getImageUrl = (item) => {
  return new URL(`../assets/img/${item.image}`, import.meta.url).href;
};

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

  <div class="swiper-container w-[calc(100%+20px)]">
    <swiper
      :slides-per-view="2.5"
      :space-between="15"
    >
      <swiper-slide
        v-for="(item, index) in items"
        :key="index"
      >
        <div
          class="swiper-content flex flex-col justify-between gap-2 cursor-pointer"
          @click="handleSelectItem(item)"
        >
          <img
            :src="getImageUrl(item)"
            alt="Imagem de comida"
            class="item-img w-32 h-32 rounded-lg"
          >

          <div class="item-info flex flex-col w-32">
            <span class="font-semibold text-sm text-font truncate">
              {{ item.name }}
            </span>

            <strong class="font-bold text-sm text-primary">
              {{ $filters.currencyBRL(item.price) }}
            </strong>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>