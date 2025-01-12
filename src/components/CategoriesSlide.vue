<template>
  <swiper
    :slides-per-view="'auto'"
    :space-between="10"
    @swiper="onSwiper"
    @slide-change="onSlideChange"
  >
    <template v-for="(category, index) in categories" :key="index">
      <swiper-slide
        @click="selectSlide(index)"
        :class="{ 'selected': selectedSlide === index }"
      >
        <div class="slide">
          {{ category.name }}
        </div>
      </swiper-slide>
    </template>
  </swiper>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

const props = defineProps({
  categories: {
    type: Array,
    default: () => ([])
  }
});

const categories = ref([...props.categories]);

onMounted(() => {
  if (!categories.value.some(category => category.idcategory === 0)) {
    categories.value.unshift({ idcategory: 0, name: 'Todos' });
  }
});

const emit = defineEmits(['clickSlide']);

const selectedSlide = ref(0);

const selectSlide = (index) => {
  selectedSlide.value = index;

  nextTick(() => {
    const swiperInstance = document.querySelector('.swiper').swiper;
    swiperInstance.slideTo(index);
  });

  emit('clickSlide', categories.value[index].idcategory);
};

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
  padding: .5rem 0;
  width: auto;
}

.swiper-slide .slide {
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  font-size: .85rem;
  font-weight: 600;
  color: black;
  padding: 8px 16px;
  border-radius: 12px;
  background-color: #eee;
  transition-timing-function: cubic-bezier(0.4, 0.2, 0.2, 1);
  transition-duration: 150ms;
}

.swiper-slide.selected .slide {
  color: #fdbd10;
  background-color: black;
  transform: scale(1.1);
  transition-duration: 300ms;
}

/* Garantir o padding do contêiner */
.swiper {
  padding: 0 5.5%;
}
</style>
