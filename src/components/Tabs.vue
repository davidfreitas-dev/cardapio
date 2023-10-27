<script setup>
import { ref, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
    required: true
  }
});

const newTabs = ref([]);

watch(
  () => props.tabs, 
  () => {
    newTabs.value = props.tabs;
  }
);

const emit = defineEmits(['onHandleTabs']);

const handleSelectTab = (i) => {
  newTabs.value.forEach(item => {
    item.active = false;
  });

  newTabs.value[i].active = true;

  emit('onHandleTabs', newTabs.value[i].name);
};
</script>

<template>
  <div class="swiper-container sticky top-0 left-0 bg-white">
    <swiper
      :slides-per-view="4.5"
      :space-between="100"
    >
      <swiper-slide
        v-for="(tab, index) in newTabs"
        :key="index"
      >
        <div
          class="swiper-content w-24 text-primary text-center select-none cursor-pointer transition-colors rounded-md bg-primary bg-opacity-20 px-2 py-1"
          :class="{ 'font-bold text-white bg-primary bg-opacity-100': tab.active }"
          @click="handleSelectTab(index)"
        >
          {{ tab.name }}
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>