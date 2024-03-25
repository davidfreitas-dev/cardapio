<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useCategoriesStore } from '@/stores/categories';

const categoriesStore = useCategoriesStore();
const categories = ref([]);
const isLoading = ref(true);
const slidesContainer = ref(null);

const setDragListeners = () => {
  slidesContainer.value = document.querySelector('.slide-container');
  slidesContainer.value.addEventListener('mousedown', setDrag);
  slidesContainer.value.addEventListener('touchstart', setDrag);
  slidesContainer.value.addEventListener('mousemove', dragging);
  slidesContainer.value.addEventListener('touchmove', dragging);
  document.addEventListener('mouseup', dragStop);
  document.addEventListener('touchend', dragStop);  
};

const removeDragListeners = () => {
  slidesContainer.value.removeEventListener('mousedown', setDrag);
  slidesContainer.value.removeEventListener('touchstart', setDrag);
  slidesContainer.value.removeEventListener('mousemove', dragging);
  slidesContainer.value.removeEventListener('touchmove', dragging);
  document.removeEventListener('mouseup', dragStop);
  document.removeEventListener('touchend', dragStop);
};

onMounted(async () => {
  await categoriesStore.getCategories();
  categories.value = categoriesStore.categories;
  isLoading.value = false;
  setDragListeners();
});

onUnmounted(() => {
  removeDragListeners();
});

const centerActiveSlide = (activeSlide) => {
  const slideContainerWidth = slidesContainer.value.clientWidth;
  const slide = document.getElementById(activeSlide.id);
  const slideWidth = slide.clientWidth;
  const slideLeft = slide.offsetLeft;
  const scrollLeft = slideLeft - slideContainerWidth / 2 + slideWidth / 2;

  slidesContainer.value.scrollTo({
    left: scrollLeft,
    behavior: 'smooth',
  });
};

const emit = defineEmits(['clickSlide']);

const clickSlide = (i) => {
  const category = categories.value[i];

  categories.value.forEach(item => {
    item.active = false;
  });

  category.active = true;

  centerActiveSlide(category);

  emit('clickSlide', category.id);
};

const isDragging = ref(false);

const touchStartX = ref(0);

const setDrag = (e) => {
  isDragging.value = true;

  if (e.type.startsWith('touch')) {
    touchStartX.value = e.touches[0].clientX;
  }
};

const dragging = (e) => {
  if (!isDragging.value) return;

  let movementX = e.movementX || 0;

  if (e.type.startsWith('touch')) {
    const touchEndX = e.touches[0].clientX;
    movementX = touchEndX - touchStartX.value;
    touchStartX.value = touchEndX;
  }

  slidesContainer.value.classList.add('dragging');
  slidesContainer.value.scrollLeft -= movementX;
};

const dragStop = () => {
  isDragging.value = false;
  slidesContainer.value.classList.remove('dragging');
};

const iosPlatform = computed(() => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
});
</script>

<template>
  <div class="wrapper">
    <ul :class="['slide-container', { 'ios-padding': iosPlatform }]">
      <li
        v-for="(category, index) in categories"
        :key="index"
        :id="category.id"
        :class="['slide', { 'active': category.active }]"
        @click="clickSlide(index)"
      >
        {{ category.description }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  overflow-x: hidden;
  max-width: 1000px;
  margin: 1rem 0;
}

.wrapper .slide-container {
  display: flex;
  gap: 8px;
  list-style: none;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.slide-container.dragging {
  scroll-behavior: auto;
  cursor: grab;
}

.slide-container .slide {
  font-size: .85rem;
  white-space: nowrap;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 30px;
  border: 1px solid #eaeaea;
  background: #fafafa;
  user-select: none;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.slide-container .slide:hover{
  background: #eaeaea;
}

.slide-container .slide:first-child{
  margin-left: 1.25rem;
}

.slide-container .slide:last-child{
  margin-right: 1.25rem;
}

.slide-container.dragging .slide {
  user-select: none;
  pointer-events: none;
}

.slide-container .slide.active {
  color: #fff;
  background: #307a59;
  border-color: transparent;
}

.ios-padding {
  padding-right: 18px !important;
}
</style>