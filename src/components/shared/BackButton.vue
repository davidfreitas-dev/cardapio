<template>
  <div class="text-font">
    <ArrowLeftIcon 
      class="h-7 w-7 cursor-pointer" 
      @click="handleBack" 
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ArrowLeftIcon  } from '@heroicons/vue/24/solid';

const props = defineProps({
  route: {
    type: String,
    default: ''
  }
});

const router = useRouter();

const handleBack = () => {
  if (!props.route) {
    router.go(-1);
    return;
  }

  router.push(props.route);
};
</script>
