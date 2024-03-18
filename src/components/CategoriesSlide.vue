<script setup>
import { ref, onMounted } from 'vue';
import { useCategoriesStore } from '../stores/categories';

const tabsContainer = ref(null);

const setDragListeners = () => {
  tabsContainer.value = document.querySelector('.tabs-container');
  tabsContainer.value.addEventListener('mousedown', setDrag);
  tabsContainer.value.addEventListener('touchstart', setDrag);
  tabsContainer.value.addEventListener('mousemove', dragging);
  tabsContainer.value.addEventListener('touchmove', dragging);
  document.addEventListener('mouseup', dragStop);
  document.addEventListener('touchend', dragStop);  
};

const categoriesStore = useCategoriesStore();
const tabs = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  await categoriesStore.getCategories();
  tabs.value = categoriesStore.categories;
  isLoading.value = false;
  setDragListeners();
});

const centerActiveTab = (activeTab) => {
  const containerWidth = tabsContainer.value.clientWidth;
  const tab = document.getElementById(activeTab.id);
  const tabWidth = tab.clientWidth;
  const tabLeft = tab.offsetLeft;
  const scrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;

  tabsContainer.value.scrollTo({
    left: scrollLeft,
    behavior: 'smooth',
  });
};

const emit = defineEmits(['clickTabs']);

const clickTab = (i) => {
  const tab = tabs.value[i];

  tabs.value.forEach(item => {
    item.active = false;
  });

  tab.active = true;

  centerActiveTab(tab);

  emit('clickTabs', tab.id);
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

  tabsContainer.value.classList.add('dragging');
  tabsContainer.value.scrollLeft -= movementX;
};

const dragStop = () => {
  isDragging.value = false;
  tabsContainer.value.classList.remove('dragging');
};
</script>

<template>
  <div class="wrapper">
    <ul class="tabs-container">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :id="tab.id"
        :class="{ 'active': tab.active }"
        class="tab"
        @click="clickTab(index)"
      >
        {{ tab.description }}
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

.wrapper .tabs-container {
  display: flex;
  gap: 8px;
  list-style: none;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.tabs-container.dragging {
  scroll-behavior: auto;
  cursor: grab;
}

.tabs-container .tab {
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

.tabs-container .tab:hover{
  background: #eaeaea;
}

.tabs-container .tab:first-child{
  margin-left: 1.25rem;
}

.tabs-container .tab:last-child{
  margin-right: 1.25rem;
}

.tabs-container.dragging .tab {
  user-select: none;
  pointer-events: none;
}

.tabs-container .tab.active {
  color: #fff;
  background: #307a59;
  border-color: transparent;
}
</style>