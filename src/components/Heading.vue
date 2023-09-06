<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Text Heading'
  },
  color: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'md'
  },
});
</script>

<template>
  <span
    :class="{
      'text-lg': size === 'sm',
      'text-xl': size === 'md',
      'text-2xl': size === 'lg',
      'text-font': color === 'default',
      'text-primary': color === 'primary',
      'text-secondary': color === 'secondary',
      'text-white': color === 'light',
    }"
    class="font-bold font-sans"
  >
    {{ text }}
  </span>
</template>