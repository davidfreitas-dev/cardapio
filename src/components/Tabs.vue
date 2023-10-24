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
      :space-between="0"
    >
      <swiper-slide
        v-for="(tab, index) in newTabs"
        :key="index"
      >
        <div
          class="swiper-content text-center select-none cursor-pointer transition-colors min-w-fit py-2.5"
          :class="{ 'font-bold text-font border-b-2 border-primary': tab.active }"
          @click="handleSelectTab(index)"
        >
          {{ tab.name }}
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>