<script setup>
</script>

<template>
  <div class="flex w-full h-40 p-5 rounded-2xl my-5 bg-accent">
    <div class="flex flex-col justify-evenly items-start w-3/5">
      <div>
        <h1 class="font-bold font-sans text-2xl text-font">
          Pizza Grande
        </h1>

        <p class="font-medium font-sans text-sm text-font">
          Desconto 25%
        </p>
      </div>
      
      <button class="text-sm font-bold h-10 px-5 bg-primary text-white tracking-wide rounded-lg transition-all duration-200 ease-in active:scale-95">
        Comprar agora
      </button>
    </div>

    <div class="bg-[url('@/assets/img/pizza.png')] bg-cover bg-no-repeat bg-center w-2/5" />
  </div>
</template>
