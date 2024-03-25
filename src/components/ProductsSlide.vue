<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue';

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  },
  slideId: {
    type: String,
    required: true
  }
});

const slidesContainer = ref(null);

const setDragListeners = () => {
  slidesContainer.value = document.querySelector(`.slide-${props.slideId}`);
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
  setDragListeners();
});

onUnmounted(() => {
  removeDragListeners();
});

const centerActiveSlide = (activeSlide) => {
  const slideWidth = slidesContainer.value.clientWidth;
  const productContainer = document.getElementById(activeSlide.id);
  const productContainerWidth = productContainer.clientWidth;
  const productContainerLeft = productContainer.offsetLeft;
  const scrollLeft = productContainerLeft - slideWidth / 2 + productContainerWidth / 2;

  slidesContainer.value.scrollTo({
    left: scrollLeft,
    behavior: 'smooth',
  });
};

const emit = defineEmits(['clickSlide']);

const clickSlide = (i) => {
  const product = props.products[i];

  props.products.forEach(item => {
    item.active = false;
  });

  product.active = true;

  centerActiveSlide(product);

  emit('clickSlide', product.id);
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
    <ul :class="['slides-container', `slide-${slideId}`, { 'ios-padding': iosPlatform }]">
      <ProductCard
        v-for="(product, index) in products"
        :key="index"
        :id="`${slideId}-${product.id}`"
        :item="product"
        :slide="true"
        class="product"
      />
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

.wrapper .slides-container {
  display: flex;
  gap: 12px;
  list-style: none;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.slides-container.dragging {
  scroll-behavior: auto;
  cursor: grab;
}

.slides-container .product {
  width: 100%;
}

.slides-container .product:first-child{
  margin-left: 1.25rem;
}

.slides-container .product:last-child{
  margin-right: 1.25rem;
}

.slides-container.dragging .product {
  user-select: none;
  pointer-events: none;
}

.ios-padding {
  padding-right: 18px !important;
}
</style>