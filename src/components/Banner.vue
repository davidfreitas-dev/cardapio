<script setup>
import Header from '@/components/Header.vue';
import Text from '@/components/Text.vue';
import Button from '@/components/Button.vue';
</script>

<template>
  <div class="flex w-full h-40 p-5 rounded-2xl my-5 bg-accent">
    <div class="flex flex-col justify-evenly items-start w-3/5">
      <Header
        text="Pizza Familiar"
        class="leading-3"
      />
        
      <Text text="Desconto 25%" />
      
      <Button
        size="md"
        text="Comprar Agora"
      />
    </div>

    <div class="bg-[url('@/assets/img/pizza.png')] bg-cover bg-no-repeat bg-center w-2/5" />
  </div>
</template>
