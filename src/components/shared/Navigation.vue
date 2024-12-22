<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Squares2X2Icon, MagnifyingGlassIcon, RectangleStackIcon, ShoppingBagIcon, UserIcon  } from '@heroicons/vue/24/solid';
import { useCartStore } from '@/stores/cart';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

onMounted(() => {
  setActive(route.path);
});

const menu = ref([
  { name: 'Início', link: '/home', active: true },
  { name: 'Buscar', link: '/search', active: false },
  { name: 'Carrinho', link: '/cart', active: false },
  { name: 'Pedidos', link: '/orders', active: false },
  { name: 'Perfil', link: '/profile', active: false }
]);

const setActive = (path) => {
  const index = menu.value.findIndex((el) => el.link === path);

  menu.value.forEach(item => {
    item.active = false;
  });

  if (index >= 0) {
    menu.value[index].active = true;
  }
};

watch(() => route.name, () => {
  setActive(route.path);
});
</script>

<template>
  <nav class="fixed left-0 bottom-0 z-10 w-full h-[55px] bg-white shadow-lg rounded-t-2xl">
    <ul class="flex justify-between items-center w-[85%] mt-1 mx-auto text-xs text-gray-300 py-2">
      <li
        v-for="(item, index) in menu"
        :key="index"
        :class="{ 'text-font': item.active }"
        class="flex flex-col justify-center items-center cursor-pointer transition-colors"
        @click="router.push(item.link)"
      >
        <Squares2X2Icon
          v-if="item.name === 'Início'"
          class="h-6 w-6"
        />

        <MagnifyingGlassIcon
          v-if="item.name === 'Buscar'"
          class="h-6 w-6"
        />

        <RectangleStackIcon
          v-if="item.name === 'Pedidos'"
          class="h-6 w-6"
        />

        <div v-if="item.name === 'Carrinho'" class="relative icon-container">
          <ShoppingBagIcon class="h-6 w-6" />
          <span v-if="cartStore.totalItems" class="absolute -top-1 -right-3 bg-primary bg-opacity-50 text-font font-semibold rounded-full px-[6px] py-[1px] text-xs animate-pulse">
            {{ cartStore.totalItems }}
          </span>
        </div>

        <UserIcon
          v-if="item.name === 'Perfil'"
          class="h-6 w-6"
        />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* Estilo para o badge com animação pulsante */
.icon-container {
  position: relative;
}

.icon-container span {
  animation: pulse-animation 1.5s infinite; /* Definindo animação infinita */
}

@keyframes pulse-animation {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
