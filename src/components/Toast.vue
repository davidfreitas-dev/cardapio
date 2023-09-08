<script setup>
import { ref, watch } from 'vue';
import { TransitionRoot } from '@headlessui/vue';

const props = defineProps({
  toastData: {
    type: Object,
    default: () => {}
  }
});

const isShowing = ref(false);

const showToast = () => {
  isShowing.value = true;
};

watch(isShowing, (newIsShowing) => {
  if (newIsShowing) {
    setTimeout(() => {
      isShowing.value = false;
    }, 2500);
  }
});

defineExpose({showToast});
</script>    

<template>
  <TransitionRoot
    :show="isShowing"
    enter="transition-opacity duration-75"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="transition-opacity duration-150"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div
      id="toast"      
      role="alert"
      class="toast"
      :class="{ 
        'bg-primary': props.toastData.type === 'success', 
        'bg-danger': props.toastData.type === 'error' 
      }"
    >
      <div class="toast-content">
        {{ props.toastData.message }}
      </div>
    </div>
  </TransitionRoot>
</template>
  
<style scoped>
.toast {
  @apply fixed top-10 -translate-x-1/2 left-1/2 flex items-center p-4 mb-4 w-full max-w-xs text-white rounded-lg shadow-md
}
.toast-content {
  @apply ml-3 text-sm font-normal
}
</style>