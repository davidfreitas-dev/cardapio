<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  value: Boolean,
  modelValue: Boolean,
  text: {
    type: String,
    default: 'Checkbox label'
  }
});

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <label class="container block relative pl-8 cursor-pointer text-base">{{ text }}
    <input
      v-model="model"
      :value="value"
      type="checkbox"
      class="absolute opacity-0 cursor-pointer h-0 w-0"
    >
    <span class="checkmark absolute top-0 left-0 h-6 w-6 rounded-lg border bg-white" />
  </label>
</template>

<style scoped>
.container {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input:checked ~ .checkmark {
  border: none;
  background-color: #fdbd10;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  top: 6px;
  left: 9px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>