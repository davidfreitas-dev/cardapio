<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useStorage } from '@/use/useStorage';
import BaseLayout from '@/components/shared/BaseLayout.vue';
import Header from '@/components/Header.vue';
import Address from '@/components/Address.vue';
import Text from '@/components/Text.vue';
import Button from '@/components/Button.vue';
import ItemCart from '@/components/ItemCart.vue';
import Dropdown from '@/components/Dropdown.vue';

const deliveryType = ref('');

onMounted(() => {
  deliveryType.value = getStorage('delivery') || 'Entrega';
});

const deliveryPrice = computed(() => {
  return deliveryType.value === 'Entrega' ? 5 : 0;
});

const cartStore = useCartStore();

const totalPrice = computed(() => {
  return cartStore.totalItemsPrice + deliveryPrice.value;
});

const removeItem = (item) => {
  const index = cartStore.cart.products.findIndex((product) => product.id === item.id);

  if (index >= 0) {
    cartStore.removeFromCart(index);
  }
};

const { getStorage } = useStorage();
</script>

<template>
  <BaseLayout>
    <div class="flex justify-between items-center">
      <Header
        text="Carrinho"
        color="primary"
        size="lg"
      />

      <Dropdown v-model="deliveryType" />
    </div>

    <div v-if="cartStore.totalItems">
      <Address :delivery="deliveryType" />
  
      <h2 class="font-semibold font-sans text-xl">
        Itens ({{ cartStore.totalItems }})
      </h2>

      <div class="flex flex-col mb-5">
        <ItemCart
          v-for="(item, index) in cartStore.cart.products"
          :key="index"
          :item="item"
          @on-remove-item="removeItem"
        />
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center">
          <Text
            text="Subtotal"
            color="secondary"
            size="lg"
          />
  
          <strong>{{ $filters.currencyBRL(cartStore.totalItemsPrice) }}</strong>
        </div>

        <div
          v-if="deliveryType === 'Entrega'"
          class="flex justify-between items-center"
        >
          <Text
            text="Entrega"
            color="secondary"
            size="lg"
          />
  
          <strong>{{ $filters.currencyBRL(deliveryPrice) }}</strong>
        </div>

        <div class="flex justify-between items-center">
          <Text
            text="Total"
            color="secondary"
            size="lg"
          />
  
          <strong class="text-primary text-lg">
            {{ $filters.currencyBRL(totalPrice) }}
          </strong>
        </div>
      </div>

      <Button
        text="Enviar Pedido"
        class="my-5"
      />
    </div>

    <div
      v-else
      class="flex flex-col items-center text-center w-full h-screen p-8 mt-5"
    >
      <span class="font-semibold font-sans text-lg">
        Você ainda não adicionou nenhum item
      </span>
    </div>
  </BaseLayout>
</template>