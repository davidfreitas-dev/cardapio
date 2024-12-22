<script setup>
import { computed } from 'vue';
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  modelValue: { 
    type: Number, 
    default: 1
  }
});

const isDisabled = computed(() => {
  return props.modelValue < 2;
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};

const decrement = () => {
  const quantity = parseInt(props.modelValue) - 1;
  emit('update:modelValue', quantity);
};

const increment = () => {
  const quantity = parseInt(props.modelValue) + 1;
  emit('update:modelValue', quantity);
};
</script>

<template>
  <div class="flex items-center">
    <button
      class="flex items-center justify-center bg-primary disabled:bg-gray-200 disabled:text-secondary text-font transition-colors rounded-lg h-7 w-7 disabled:cursor-not-allowed"
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
      class="flex items-center justify-center bg-primary text-font rounded-lg h-7 w-7"
      @click="increment"
    >
      <PlusIcon class="h-4 w-4" />
    </button>
  </div>
</template>
