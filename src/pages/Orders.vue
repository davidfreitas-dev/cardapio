<script setup>
import Header from '@/components/Header.vue';
import Text from '@/components/Text.vue';
</script>

<template>
  <div class="flex flex-col gap-3">
    <Header
      text="Meus Pedidos"
      color="primary"
      size="lg"
    />
    
    
    <div class="flex flex-col items-center text-center w-full h-screen p-8 mt-5">
      <Header
        text="Você ainda não fez nenhum pedido"
        size="sm"
      />
    </div>
  </div>
</template>