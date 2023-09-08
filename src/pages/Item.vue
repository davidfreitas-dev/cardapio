<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStorage } from '@/use/useStorage';
import Heading from '@/components/Heading.vue';
import Text from '@/components/Text.vue';
import Button from '@/components/Button.vue';
import QtyControl from '@/components/QtyControl.vue';
import Checkbox from '@/components/Checkbox.vue';

const cart = ref([]);
const item = ref({});

onMounted(() => {
  cart.value = getStorage('cart') ? getStorage('cart') : [];
  item.value = getStorage('product');
});

watch(
  () => cart.value,
  () => {
    setStorage('cart', cart.value);
  },
  { deep: true }
);

const router = useRouter();

const addToCart = () => {
  const index = cart.value.findIndex((el) => el.id === item.value.id);

  if (index >= 0) {
    cart.value[index].quantity += item.value.quantity;
  } else {
    cart.value.push(item.value);
  }
  
  router.push('/cart');
};

const { setStorage, getStorage } = useStorage();
</script>

<template>
  <div
    class="absolute top-0 left-0 w-full h-52 bg-cover bg-no-repeat bg-center"
    :style="`background-image: url('./src/assets/img/${item.image}');`"
  />
    
  <div class="flex flex-col gap-2 mt-56">
    <Heading
      :text="item.name"
      size="lg"
    />

    <Text
      :text="item.description"
      color="secondary"
      size="lg"
    />

    <div class="flex justify-between items-center gap-5">
      <strong class="font-bold text-2xl text-primary">
        {{ $filters.currencyBRL(item.price) }}
      </strong>
      
      <QtyControl v-model="item.quantity" />
    </div>

    <span class="border-b border-accent my-3" />

    <Heading
      text="Adicionais"
      size="lg"
    />

    <div class="flex flex-col justify-between items-start my-3">
      <span class="w-full p-3.5 border border-accent rounded-t-xl">
        <Checkbox text="Catupiry" />
      </span>
      <span class="w-full p-3.5 border-l border-b border-r border-accent">
        <Checkbox text="Chedar" />
      </span>
      <span class="w-full p-3.5 border-l border-b border-r border-accent">
        <Checkbox text="Pimenta" />
      </span>
      <span class="w-full p-3.5 border-l border-b border-r border-accent rounded-b-xl">
        <Checkbox text="Cebola" />
      </span>
    </div>
  </div>

  <div class="fixed left-0 bottom-0 z-20 w-full h-[70px] bg-white">
    <div class="w-11/12 mx-auto">
      <Button
        text="Adicionar Item"
        @click="addToCart"
      />
    </div>
  </div>
</template>