<script setup>
import { ref, watch, computed } from 'vue';
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  modelValue: { 
    type: Number, 
    default: 1
  }
});

const quantity = ref(1);

watch(
  () => props.modelValue, 
  () => {
    quantity.value = props.modelValue;
  }
);

const isDisabled = computed(() => {
  return quantity.value < 2;
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};

const decrement = () => {
  const count = parseInt(quantity.value) - 1;
  emit('update:modelValue', count);
};

const increment = () => {
  const count = parseInt(quantity.value) + 1;
  emit('update:modelValue', count);
};
</script>

<template>
  <div class="flex items-center">
    <button
      class="flex items-center justify-center bg-primary disabled:bg-gray-200 disabled:text-secondary text-white transition-colors rounded-lg h-7 w-7 disabled:cursor-not-allowed"
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
      class="flex items-center justify-center bg-primary text-white rounded-lg h-7 w-7"
      @click="increment"
    >
      <PlusIcon class="h-4 w-4" />
    </button>
  </div>
</template>
