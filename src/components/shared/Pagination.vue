<script setup>
import { reactive, computed, watch } from 'vue';
import PaginationButton from '@/components/shared/PaginationButton.vue';

const props = defineProps({
  totalPages: {
    type: Number,
    default: 10
  },
  totalItems: {
    type: Number,
    default: 0
  }
});

const state = reactive({
  currentPage: 1,
  maxVisiblePages: 3,
});

const emit = defineEmits(['onPageChange']);

watch(
  () => state.currentPage,
  (newPage) => {
    emit('onPageChange', newPage);
  }
);

const visiblePages = computed(() => {
  const startPage = Math.max(1, state.currentPage - Math.floor(state.maxVisiblePages / 2));
  const endPage = Math.min(props.totalPages, startPage + state.maxVisiblePages - 1);
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

const itemRange = computed(() => {
  const itemsPerPage = 5;
  const startItem = (state.currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(state.currentPage * itemsPerPage, props.totalItems);
  return `${startItem} a ${endItem}`;
});

const previousPage = () => {
  if (state.currentPage > 1) state.currentPage--;
};

const nextPage = () => {
  if (state.currentPage < props.totalPages) state.currentPage++;
};

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages) state.currentPage = page;
};

const resetPagination = () => {
  state.currentPage = 1;
};

defineExpose({ resetPagination });
</script>

<template>
  <div v-if="totalItems" class="flex flex-col items-center justify-between h-16 mb-24">
    <span class="text-sm text-secondary mb-3">
      Exibindo {{ itemRange }} de {{ totalItems }} itens
    </span>

    <nav>
      <ul class="flex items-center gap-2 text-sm text-font">
        <PaginationButton
          :label="'Anterior'"
          :disabled="state.currentPage === 1"
          @click="previousPage"
        />
        
        <li v-for="page in visiblePages" :key="page">
          <PaginationButton
            :label="page"
            :active="page === state.currentPage"
            @click="goToPage(page)"
          />
        </li>
        
        <PaginationButton
          :label="'Próxima'"
          :disabled="state.currentPage === props.totalPages"
          @click="nextPage"
        />
      </ul>
    </nav>
  </div>
</template>
