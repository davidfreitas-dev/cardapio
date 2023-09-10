<script setup>
import Item from '@/components/Item.vue';
import { useRouter } from 'vue-router';
import { useStorage } from '@/use/useStorage';
import { Swiper, SwiperSlide } from 'swiper/vue';
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
      <Item
        :item="item"
        @click="handleSelectItem(item)"
      />
    </swiper-slide>
  </swiper>
</template>