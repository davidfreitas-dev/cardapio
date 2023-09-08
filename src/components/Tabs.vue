<script setup>
import { ref, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

const emit = defineEmits(['onHandleTabs']);

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  }
});

const tabs = ref([]);

watch(() => props.categories, (newCategories) => {
  tabs.value = newCategories;
});

const handleMenu = (i) => {
  tabs.value.forEach(item => {
    item.active = false;
  });

  tabs.value[i].active = true;

  emit('onHandleTabs', tabs.value[i].name);
};
</script>

<template>
  <div class="sticky top-0 left-0 bg-white">
    <swiper
      :slides-per-view="4.5"
      :space-between="0"
    >
      <swiper-slide
        v-for="(tab, index) in tabs"
        :key="index"
      >
        <li
          :class="{ 'font-bold text-font border-b-2 border-primary': tab.active }"
          class="text-center cursor-pointer select-none transition-colors py-2.5"
          @click="handleMenu(index)"
        >
          {{ tab.name }}
        </li>
      </swiper-slide>
    </swiper>
  </div>
</template>