<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { HomeIcon, MagnifyingGlassIcon, RectangleStackIcon, ShoppingCartIcon, UserIcon  } from '@heroicons/vue/24/solid';
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
  <nav class="fixed left-0 bottom-0 z-10 w-full h-16 box-shadow bg-white">
    <ul class="flex justify-between items-center w-[90%] mx-auto text-xs text-secondary py-2">
      <li
        v-for="(item, index) in menu"
        :key="index"
        :class="{ 'text-primary': item.active }"
        class="flex flex-col justify-center items-center cursor-pointer transition-colors"
        @click="router.push(item.link)"
      >
        <HomeIcon
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
          <ShoppingCartIcon class="h-6 w-6" />
          <span v-if="cartStore.totalItems" class="absolute -top-1 -right-3 bg-green-600 text-white rounded-full px-[6px] py-[1px] text-xs">
            {{ cartStore.totalItems }}
          </span>
        </div>

        <UserIcon
          v-if="item.name === 'Perfil'"
          class="h-6 w-6"
        />

        {{ item.name }}
      </li>
    </ul>
  </nav>
</template>