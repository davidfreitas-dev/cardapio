<script setup>
import { RouterView } from 'vue-router';
import Navigation from '@/components/Navigation.vue';
</script>

<template>
  <main class="w-[90%] mx-auto mt-4 mb-24">
    <RouterView />
  </main>
  <Navigation />
</template>

<style scoped>

</style>
