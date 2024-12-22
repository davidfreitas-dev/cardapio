<script setup>
import { ref, watch } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { useStorage } from '@/use/useStorage';

const props = defineProps({
  options: {
    type: Array,
    default: () => ['Entrega', 'Retirada']
  },
  modelValue: {
    type: String,
    require: true,
    default: ''
  },
});

const selectedOption = ref(null);

watch(
  () => props.modelValue, 
  () => {
    selectedOption.value = props.modelValue;
  }
);

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  updateValue();
  toggleDropdown();
};

const emit = defineEmits(['update:modelValue']);

const updateValue = () => {
  setStorage('delivery', selectedOption.value);
  emit('update:modelValue', selectedOption.value);
};

const { setStorage, getStorage } = useStorage();
</script>

<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex justify-between items-center bg-primary text-font w-28 px-4 py-2 rounded focus:outline-none"
    >
      {{ selectedOption }}
      <ChevronDownIcon class="h-4 w-4 text-font" />
    </button>
    
    <ul
      v-if="isOpen"
      class="absolute z-10 mt-2 w-28 py-1 bg-white text-font border border-accent rounded shadow-lg"
    >
      <li
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)"
        class="px-4 py-2 cursor-pointer"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>