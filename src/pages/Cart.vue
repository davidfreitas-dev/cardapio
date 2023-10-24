<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useStorage } from '@/use/useStorage';
import Header from '@/components/Header.vue';
import Address from '@/components/Address.vue';
import Text from '@/components/Text.vue';
import Button from '@/components/Button.vue';
import ItemCart from '@/components/ItemCart.vue';
import Dropdown from '@/components/Dropdown.vue';

const items = ref([]);
const delivery = ref('');

onMounted(() => {
  items.value = getStorage('cart') || [];
  delivery.value = getStorage('delivery') || 'Entrega';
});

watch(
  () => items.value,
  () => {
    setStorage('cart', items.value);
  },
  { deep: true }
);

const tax = computed(() => {
  return delivery.value === 'Entrega' ? 5 : 0;
});

const subtotalItemsPrice = computed(() => {
  return items.value
    .map(item => item.quantity * (item.price + item.additional
      .map(add => (add.selected ? add.price : 0) * 1)
      .reduce((total, current) => total + current, 0)))
    .reduce((total, current) => total + current, 0);
});

const totalItemsPrice = computed(() => {
  return subtotalItemsPrice.value + tax.value;
});

const removeItem = (item) => {
  const index = items.value.findIndex((el) => el.id === item.id);

  if (index >= 0) {
    items.value.splice(index, 1);
  }
};

const { setStorage, getStorage } = useStorage();
</script>

<template>
  <div class="flex justify-between items-center">
    <Header
      text="Carrinho"
      color="primary"
      size="lg"
    />

    <Dropdown v-model="delivery" />
  </div>

  <div v-if="items.length">
    <Address :delivery="delivery" />
  
    <Header :text="`Itens (${items.length})`" />

    <div class="flex flex-col mb-5">
      <ItemCart
        v-for="(item, index) in items"
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
  
        <strong>{{ $filters.currencyBRL(subtotalItemsPrice) }}</strong>
      </div>

      <div
        v-if="delivery === 'Entrega'"
        class="flex justify-between items-center"
      >
        <Text
          text="Entrega"
          color="secondary"
          size="lg"
        />
  
        <strong>{{ $filters.currencyBRL(tax) }}</strong>
      </div>

      <div class="flex justify-between items-center">
        <Text
          text="Total"
          color="secondary"
          size="lg"
        />
  
        <strong class="text-primary text-lg">
          {{ $filters.currencyBRL(totalItemsPrice) }}
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
    <Header
      text="Você ainda não adicionou nenhum item"
      size="sm"
    />
  </div>
</template>