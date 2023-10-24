<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Text Header',
    required: true
  }
});
</script>

<template>
  <span class="font-bold font-sans text-2xl text-font">
    {{ text }}
  </span>
</template>