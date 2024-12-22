<script setup>
import DotsLoader from '@/components/shared/DotsLoader.vue';

const props = defineProps({
  expand: Boolean,
  isLoading: Boolean
});
</script>

<template>
  <button :class="['bg-primary text-font text-base font-bold h-[52px] rounded-lg transition-all duration-200 ease-in active:scale-95', { 'w-full': expand }]">
    <DotsLoader v-if="isLoading" />
    <span v-else class="flex justify-center items-center gap-2 line-clamp-1">
      <slot />
    </span>
  </button>
</template>