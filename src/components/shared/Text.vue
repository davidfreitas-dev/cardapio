<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Lorem ipsum dolor...'
  },
  size: {
    type: String,
    default: 'md'
  },
  color: {
    type: String,
    default: 'default'
  }
});
</script>

<template>
  <span
    :class="{
      'text-xs': size === 'sm',
      'text-sm': size === 'md',
      'text-md': size === 'lg',
      'text-font': color === 'default',
      'text-primary': color === 'primary',
      'text-secondary': color === 'secondary',
      'text-light': color === 'light',
    }"
    class="font-medium"
  >
    {{ text }}
  </span>
</template>