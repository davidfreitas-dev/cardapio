<template>
  <button
    :class="[
      'border transition-colors rounded-xl cursor-pointer select-none py-2.5 px-4',
      disabled ? 'bg-gray-100 border-gray-100' : active ? 'bg-primary border-primary text-font' : 'bg-gray-100 border-gray-100'
    ]"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  active: Boolean,
  disabled: Boolean,
  label: {
    type: [String, Number],
    default: ''
  },
});
</script>
