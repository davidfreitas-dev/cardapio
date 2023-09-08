<script setup>
import Heading from '@/components/Heading.vue';
import Text from '@/components/Text.vue';
</script>

<template>
  <div class="flex flex-col gap-3">
    <Heading
      text="Meus Pedidos"
      color="primary"
      size="lg"
    />
    
    
    <div class="flex flex-col items-center text-center w-full h-screen p-8 mt-5">
      <Heading
        text="Você ainda não fez nenhum pedido"
        size="sm"
      />

      <img
        src="@/assets/empty-cart.svg"
        alt="Imagem de carrinho vazio"
        width="250"
        height="250"
      >
    </div>
  </div>
</template>