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
  <div class="swiper-container sticky top-0 left-0 w-[calc(100%+5.5%)] bg-white">
    <swiper
      :slides-per-view="4.5"
      :space-between="0"
    >
      <swiper-slide
        v-for="(tab, index) in tabs"
        :key="index"
      >
        <div
          class="swiper-content text-center select-none cursor-pointer transition-colors min-w-fit py-2.5"
          :class="{ 'font-bold text-font border-b-2 border-primary': tab.active }"
          @click="handleMenu(index)"
        >
          {{ tab.name }}
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>