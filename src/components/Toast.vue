<script setup>
import { ref } from 'vue';
import { TransitionRoot } from '@headlessui/vue';

const type = ref('');
const message = ref('');
const interval = ref(2500);
const isVisible = ref(false);

const showToast = (status, msg, duration) => {
  type.value = status;
  message.value = msg;
  interval.value = duration;
  isVisible.value = true;

  setTimeout(() => {
    isVisible.value = false;
  }, interval.value);
};

defineExpose({showToast});
</script>    

<template>
  <TransitionRoot
    :show="isVisible"
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
        'bg-accent text-primary': type === 'success', 
        'bg-red-400 text-white': type === 'error' 
      }"
    >
      <div class="toast-content">
        {{ message }}
      </div>
    </div>
  </TransitionRoot>
</template>
  
<style scoped>
.toast {
  @apply fixed top-5 -translate-x-1/2 left-1/2 flex items-center p-4 mb-4 w-[90%] rounded-lg shadow-md
}
.toast-content {
  @apply ml-3 font-normal text-sm
}
</style>