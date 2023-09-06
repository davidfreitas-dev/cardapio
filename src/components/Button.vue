<script setup>
import Loader from '@/components/Loader.vue';

const props = defineProps({
  isLoading: Boolean,
  text: {
    type: String,
    default: 'Text Button'
  },
  color: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'lg'
  }
});
</script>

<template>
  <button
    :class="{ 
      'text-sm font-bold h-8 px-3': size === 'sm',
      'text-base font-bold h-11 px-6': size === 'md',
      'text-base font-bold h-[52px] w-full': size === 'lg',
      'bg-primary text-white': color === 'primary',
      'bg-white text-primary': color === 'light',
    }"
    class="tracking-wide rounded-lg transition-all duration-200 ease-in active:scale-95"
  >
    <Loader v-if="isLoading" />

    <span
      v-else
      class="flex justify-center items-center gap-2 line-clamp-1"
    >
      {{ text }}
    </span>
  </button>
</template>