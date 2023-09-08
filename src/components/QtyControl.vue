<script setup>
import { computed } from 'vue';
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: { 
    type: Number, 
    default: 0 
  }
});

const isDisabled = computed(() => {
  return props.modelValue < 2;
});

const decrement = () => {
  const count = parseInt(props.modelValue) - 1;
  emit('update:modelValue', count);
};

const increment = () => {
  const count = parseInt(props.modelValue) + 1;
  emit('update:modelValue', count);
};

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <div class="flex items-center">
    <button
      class="flex items-center justify-center bg-primary disabled:bg-gray-200 disabled:text-secondary text-white transition-colors rounded-full h-6 w-6 disabled:cursor-not-allowed"
      :disabled="isDisabled"
      @click="decrement"
    >
      <MinusIcon class="h-4 w-4" />
    </button>

    <input
      type="number"
      class="text-center text-xl font-bold w-8 border-none bg-transparent shadow-none outline-none appearance-none"
      :value="modelValue"
      @input="updateValue"
    >

    <button
      class="flex items-center justify-center bg-primary text-white rounded-full h-6 w-6"
      @click="increment"
    >
      <PlusIcon class="h-4 w-4" />
    </button>
  </div>
</template>
