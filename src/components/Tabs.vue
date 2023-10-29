<script setup>
import { ref, watch, onMounted } from 'vue';

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

const tabsContainer = ref(null);

onMounted(() => {
  tabsContainer.value = document.querySelector('.tabs-container');
  tabsContainer.value.addEventListener('mousedown', setDrag);
  tabsContainer.value.addEventListener('touchstart', setDrag);
  tabsContainer.value.addEventListener('mousemove', dragging);
  tabsContainer.value.addEventListener('touchmove', dragging);
  document.addEventListener('mouseup', dragStop);
  document.addEventListener('touchend', dragStop);
});

const centerActiveTab = (activeTab) => {
  const containerWidth = tabsContainer.value.clientWidth;
  const tab = document.getElementById(activeTab.name);
  const tabWidth = tab.clientWidth;
  const tabLeft = tab.offsetLeft;
  const scrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;

  tabsContainer.value.scrollTo({
    left: scrollLeft,
    behavior: 'smooth',
  });
};

const emit = defineEmits(['onClickTabs']);

const clickTab = (i) => {
  const tab = newTabs.value[i];

  newTabs.value.forEach(item => {
    item.active = false;
  });

  tab.active = true;

  centerActiveTab(tab);

  emit('onClickTabs', tab.name);
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
        :id="tab.name"
        :class="{ 'active': tab.active }"
        class="tab"
        @click="clickTab(index)"
      >
        {{ tab.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>


.wrapper {
  position: relative;
  overflow-x: hidden;
  max-width: 1000px;
}

.wrapper .tabs-container {
  display: flex;
  gap: 12px;
  list-style: none;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.tabs-container.dragging {
  scroll-behavior: auto;
  cursor: grab;
}

.tabs-container .tab {
  cursor: pointer;
  font-size: 1rem;
  white-space: nowrap;
  background: #fafafa;
  padding: 5px 14px;
  border-radius: 30px;
  border: 1px solid #eaeaea;
  user-select: none;
}

.tabs-container .tab:hover{
  background: #efedfb;
}

.tabs-container .tab:first-child{
  margin-left: 1rem;
}

.tabs-container .tab:last-child{
  margin-right: 1rem;
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