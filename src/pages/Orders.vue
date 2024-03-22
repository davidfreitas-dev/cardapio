<script setup>
import Heading from '@/components/shared/Heading.vue';
import BaseLayout from '@/components/shared/BaseLayout.vue';
</script>

<template>
  <BaseLayout>
    <div class="flex flex-col gap-1.5">
      <Heading text="Meus Pedidos" color="primary" size="lg" />

      <div class="flex flex-col items-center text-center w-full h-screen p-8 mt-5">
        <span class="font-semibold font-sans text-lg">
          Você ainda não fez nenhum pedido
        </span>
      </div>
    </div>
  </BaseLayout>
</template>