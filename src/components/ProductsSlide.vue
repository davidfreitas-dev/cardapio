<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue';

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
});

const productsContainer = ref(undefined);

const setDragListeners = () => {
  productsContainer.value = document.querySelector('.products-container');
  productsContainer.value.addEventListener('mousedown', setDrag);
  productsContainer.value.addEventListener('touchstart', setDrag);
  productsContainer.value.addEventListener('mousemove', dragging);
  productsContainer.value.addEventListener('touchmove', dragging);
  document.addEventListener('mouseup', dragStop);
  document.addEventListener('touchend', dragStop);  
};

const removeDragListeners = () => {
  productsContainer.value.removeEventListener('mousedown', setDrag);
  productsContainer.value.removeEventListener('touchstart', setDrag);
  productsContainer.value.removeEventListener('mousemove', dragging);
  productsContainer.value.removeEventListener('touchmove', dragging);
  document.removeEventListener('mouseup', dragStop);
  document.removeEventListener('touchend', dragStop);
};

onMounted(async () => {
  setDragListeners();
});

onUnmounted(() => {
  removeDragListeners();
});

const centerActiveProduct = (activeProduct) => {
  const containerWidth = productsContainer.value.clientWidth;
  const productContainer = document.getElementById(activeProduct.id);
  const productContainerWidth = productContainer.clientWidth;
  const productContainerLeft = productContainer.offsetLeft;
  const scrollLeft = productContainerLeft - containerWidth / 2 + productContainerWidth / 2;

  productsContainer.value.scrollTo({
    left: scrollLeft,
    behavior: 'smooth',
  });
};

const emit = defineEmits(['clickProducts']);

const clickProduct = (i) => {
  const product = props.products[i];

  props.products.forEach(item => {
    item.active = false;
  });

  product.active = true;

  centerActiveProduct(product);

  emit('clickProducts', product.id);
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

  productsContainer.value.classList.add('dragging');
  productsContainer.value.scrollLeft -= movementX;
};

const dragStop = () => {
  isDragging.value = false;
  productsContainer.value.classList.remove('dragging');
};

const iosPlatform = computed(() => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
});
</script>

<template>
  <div class="wrapper">
    <ul
      class="products-container"
      :class="{ 'ios-padding': iosPlatform }"
    >
      <ProductCard
        v-for="(product, index) in products"
        :key="index"
        :id="product.id"
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

.wrapper .products-container {
  display: flex;
  gap: 12px;
  list-style: none;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.products-container.dragging {
  scroll-behavior: auto;
  cursor: grab;
}

.products-container .product {
  width: 100%;
}

.products-container .product:first-child{
  margin-left: 1.25rem;
}

.products-container .product:last-child{
  margin-right: 1.25rem;
}

.products-container.dragging .product {
  user-select: none;
  pointer-events: none;
}

.ios-padding {
  padding-right: 18px !important;
}
</style>