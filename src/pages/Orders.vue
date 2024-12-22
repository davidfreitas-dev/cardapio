<script setup>
import Heading from '@/components/shared/Heading.vue';
import Container from '@/components/shared/Container.vue';
</script>

<template>
  <Container>
    <div class="flex flex-col gap-1.5">
      <Heading
        text="Meus Pedidos"
        color="primary"
        size="lg"
      />

      <div class="flex flex-col items-center text-center w-full h-screen p-8 mt-5">
        <span class="font-semibold text-lg">
          Você ainda não fez nenhum pedido
        </span>
      </div>
    </div>
  </Container>
</template>