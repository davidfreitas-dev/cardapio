<template>
  <div class="dots">
    <span :class="['dot-1', { 'bg-primary': colorful }]" />
    <span :class="['dot-2', { 'bg-primary': colorful }]" />
    <span :class="['dot-3', { 'bg-primary': colorful }]" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  colorful: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.dots {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.25rem;
}
.dots > span {
  width: 10px;
  height: 10px;
  margin: 0 3px;
  background: #fff;
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.3s infinite ease-in-out both;
}
.dots .dot-1 {
  animation-delay: -0.32s;
}
.dots .dot-2 {
  animation-delay: -0.16s;
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.0);
  }
}
</style>