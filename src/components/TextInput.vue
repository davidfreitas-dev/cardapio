<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';

const emit = defineEmits(['update:modelValue', 'onKeyupEnter']);

const props = defineProps({
  disabled: {
    type: Boolean
  },
  type: { 
    type: String, 
    default: '' 
  },
  text: { 
    type: String, 
    default: '' 
  },
  modelValue: { 
    type: [String, Number], 
    default: null 
  }
});

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <div class="flex items-center w-full h-[52px] rounded-lg px-4 text-secondary bg-light ring-primary focus-within:ring-2">
    <MagnifyingGlassIcon
      v-if="type === 'search'"
      class="w-5 h-5"
    />

    <input
      :type="type"
      :value="modelValue"
      :placeholder="text"
      :disabled="disabled"
      @input="updateValue"
      @keyup.enter="$emit('onKeyupEnter')"
      class="flex-1 mx-2 text-font text-base placeholder:text-secondary bg-transparent outline-none disabled:cursor-not-allowed"
    >
  </div>
</template>