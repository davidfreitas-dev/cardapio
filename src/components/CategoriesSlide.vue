<template>
  <swiper
    :slides-per-view="'auto'"
    :space-between="10"
    @swiper="onSwiper"
    @slide-change="onSlideChange"
  >
    <template v-for="(category, index) in categories" :key="index">
      <swiper-slide
        :class="{'selected': selectedSlide === index}"
        @click="selectSlide(index)"
      >
        <div class="slide">
          {{ category.description }}
        </div>
      </swiper-slide>
    </template>
  </swiper>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useCategoriesStore } from '@/stores/categories';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

const categoriesStore = useCategoriesStore();
const categories = ref([]);
const isLoading = ref(true);
const selectedSlide = ref(0);

onMounted(async () => {
  await categoriesStore.getCategories();
  categories.value = categoriesStore.categories;
  isLoading.value = false;
});

const emit = defineEmits(['clickSlide']);

const selectSlide = (index) => {
  selectedSlide.value = index; // Atualiza o slide selecionado
  
  // Usando nextTick para garantir que o DOM tenha sido atualizado
  nextTick(() => {
    const swiperInstance = document.querySelector('.swiper').swiper;
    swiperInstance.slideTo(index); // Move para o slide clicado
  });

  emit('clickSlide', categories.value[index].id);
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
  padding: 8px 16px;
  border-radius: 30px;
  border: 1px solid #eaeaea;
  background-color: #fafafa;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.swiper-slide.selected .slide {
  color: white;
  background-color: #307a59;
  transform: scale(1.1);
  transition-duration: 300ms;
}

/* Garantir o padding do contêiner */
.swiper {
  padding: 0 1.25rem;
}
</style>
