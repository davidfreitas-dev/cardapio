<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { HomeIcon, ListBulletIcon, RectangleStackIcon, ShoppingCartIcon, UserIcon  } from '@heroicons/vue/24/solid';

const menu = ref([
  { name: 'Início', link: '/', active: true },
  { name: 'Menu', link: '/menu', active: false },
  { name: 'Pedidos', link: '/orders', active: false },
  { name: 'Carrinho', link: '/cart', active: false },
  { name: 'Perfil', link: '/profile', active: false }
]);

const route = useRoute();
const router = useRouter();

watch(() => route.name, () => {
  const index = menu.value.findIndex((el) => el.link === `/${route.name}`);

  menu.value.forEach(item => {
    item.active = false;
  });

  if (index >= 0) {
    menu.value[index].active = true;
  }
});
</script>

<template>
  <nav class="fixed left-0 bottom-0 z-10 w-full h-16 box-shadow bg-white">
    <ul class="flex justify-between items-center w-[90%] mx-auto text-xs text-secondary py-1.5">
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

        <ListBulletIcon
          v-if="item.name === 'Menu'"
          class="h-6 w-6"
        />

        <RectangleStackIcon
          v-if="item.name === 'Pedidos'"
          class="h-6 w-6"
        />

        <ShoppingCartIcon
          v-if="item.name === 'Carrinho'"
          class="h-6 w-6"
        />

        <UserIcon
          v-if="item.name === 'Perfil'"
          class="h-6 w-6"
        />

        {{ item.name }}
      </li>
    </ul>
  </nav>
</template>