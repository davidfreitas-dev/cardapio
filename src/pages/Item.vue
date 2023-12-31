<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useStorage } from '@/use/useStorage';
import Text from '@/components/Text.vue';
import Button from '@/components/Button.vue';
import QtyControl from '@/components/QtyControl.vue';
import Checkbox from '@/components/Checkbox.vue';

const item = ref({});

onMounted(() => {
  item.value = getStorage('product');
});

const cartStore = useCartStore();

const router = useRouter();

const addToCart = () => {
  const cartProducts = cartStore.cart.products;
  const index = cartProducts.findIndex((products) => products.id === item.value.id);

  if (index >= 0) {
    cartProducts[index].quantity += item.value.quantity;
    cartProducts[index].additional = item.value.additional;
  } else {
    cartStore.addToCart(item.value);
  }
  
  router.push('/cart');
};

const totalItemPrice = computed(() => {
  const totalItem = item.value.price || 0;
  const quantityItem = item.value.quantity || 0;
  const totalAdditional = additionalSelected.value
    .map(add => add.price * 1)
    .reduce((total, current) => total + current, 0);  
      
  return (totalItem + totalAdditional) * quantityItem;
});

const additionalSelected = computed(() => {
  const additional = item.value.additional || [];

  return additional.filter((add) => add.selected);
});

const getImageUrl = (item) => {
  return new URL(`../assets/img/products/${item.id}.png`, import.meta.url).href;
};

const { getStorage } = useStorage();
</script>

<template>
  <div
    class="absolute top-0 left-0 w-full h-60 bg-cover bg-no-repeat bg-center"
    :style="`background-image: url('${getImageUrl(item)}');`"
  />
    
  <div class="flex flex-col gap-2 mt-64">
    <h1 class="font-bold font-sans text-2xl text-font">
      {{ item.name }}
    </h1>

    <Text
      :text="item.description"
      color="secondary"
      size="lg"
    />

    <div class="flex justify-between items-center gap-5">
      <strong class="font-bold text-xl text-primary">
        {{ $filters.currencyBRL(item.price) }}
      </strong>
      
      <QtyControl v-model="item.quantity" />
    </div>

    <span class="border-b border-accent my-3" />

    <h1 class="font-bold font-sans text-lg text-font">
      Adicionais
    </h1>

    <div class="flex flex-col justify-between items-start my-3">
      <span
        v-for="(additional, index) in item.additional"
        :key="index"
        class="flex justify-between items-center border-x first:border-t border-b border-accent first:rounded-t-xl last:rounded-b-xl w-full p-3.5"
      >
        <Checkbox
          v-model="additional.selected"
          :text="additional.name"
        />

        <strong>
          {{ $filters.currencyBRL(additional.price) }}
        </strong>
      </span>
    </div>
  </div>

  <div class="box-shadow fixed left-0 bottom-0 z-20 w-full h-[80px] bg-white">
    <div class="flex w-11/12 mx-auto py-2.5">
      <div class="flex flex-col w-[60%]">
        <Text
          text="Total"
          color="secondary"
        />
        <strong class="text-xl text-primary">
          {{ $filters.currencyBRL(totalItemPrice) }}
        </strong>
      </div>

      <Button
        text="Adicionar"
        @click="addToCart"
      />
    </div>
  </div>
</template>