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
  <h1 class="font-bold font-sans text-2xl text-font my-4">
    {{ text }}
  </h1>
</template>