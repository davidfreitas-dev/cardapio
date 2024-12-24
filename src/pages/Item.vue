<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useStorage } from '@/use/useStorage';
import axios from '@/api/axios';
import Text from '@/components/shared/Text.vue';
import BackButton from '@/components/shared/BackButton.vue';
import Container from '@/components/shared/Container.vue';
import Button from '@/components/shared/Button.vue';
import QtyControl from '@/components/shared/QtyControl.vue';
import Checkbox from '@/components/shared/Checkbox.vue';
import Heading from '@/components/shared/Heading.vue';
import ProductsSlide from '@/components/ProductsSlide.vue';
import Toast from '@/components/shared/Toast.vue';

const router = useRouter();
const cartStore = useCartStore();
const toastRef = ref(null);
const isLoading = ref(true);
const topProducts = ref(null);
const item = ref({});

const getTopProducts = async () => {
  isLoading.value = true;

  try {
    const response = await axios.get('/products/top');
    topProducts.value = response.data;
    console.log(topProducts.value);
  } catch (error) {
    console.log(error);
    toastRef.value?.showToast('error', 'Falha ao carregar top produtos.');
  }

  isLoading.value = false;
};

onMounted(() => {
  item.value = getStorage('product');
  getTopProducts();
});

const addToCart = () => {
  const cartProducts = cartStore.cart.products;
  
  const index = cartProducts.findIndex((products) => products.id === item.value.id);

  if (index >= 0) {
    cartProducts[index].quantity += item.value.quantity;
    cartProducts[index].additional = item.value.additional;
  } else {
    item.value.quantity = item.value.quantity || 1;
    cartStore.addToCart(item.value);
  }
  
  router.push('/cart');
};

const totalItemPrice = computed(() => {
  const totalItem = item.value.price || 0;
  const quantityItem = item.value.quantity || 1;
  const totalAdditional = additionalSelected.value
    .map(add => add.price * 1)
    .reduce((total, current) => total + current, 0);  
      
  return (totalItem + totalAdditional) * quantityItem;
});

const additionalSelected = computed(() => {
  const additional = item.value.additional || [];

  return additional.filter((add) => add.selected);
});

const { getStorage } = useStorage();
</script>

<template>
  <div
    class="absolute top-0 left-0 w-full h-[300px] bg-cover bg-no-repeat bg-center"
    :style="`background-image: url('${item.image}');`"
  >
    <BackButton class="absolute top-4 left-4 z-20" />
  </div>

  <Container>
    <div class="flex flex-col gap-2 overflow-y-auto mt-[300px] pt-3">
      <h1 class="font-bold text-2xl text-font">
        {{ item.name }}
      </h1>

      <Text
        :text="item.description"
        color="secondary"
        size="lg"
      />

      <div class="flex justify-between items-center gap-5">
        <strong class="font-bold text-2xl text-font">
          {{ $filters.currencyBRL(item.price) }}
        </strong>
      
        <QtyControl v-model="item.quantity" />
      </div>

      <span class="border-b border-gray-100 my-3" />

      <h1 v-if="item.additional" class="font-bold  text-lg text-font">
        Adicionais
      </h1>

      <div v-if="item.additional && item.additional.length" class="flex flex-col justify-between items-start my-3">
        <span
          v-for="(additional, index) in item.additional"
          :key="index"
          class="flex justify-between items-center border-x first:border-t border-b border-gray-100 first:rounded-t-xl last:rounded-b-xl w-full p-3.5"
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
  </Container>
  
  <div v-if="!isLoading && (topProducts && topProducts.length)" class="mb-20">
    <Heading
      text="Mais pedidos"
      size="sm"
      class="pl-5"
    />

    <ProductsSlide :products="topProducts" />
  </div>

  <Container>
    <div class="box-shadow fixed left-0 bottom-0 z-20 w-full h-[80px] bg-white pb-20">
      <div class="flex w-11/12 mx-auto py-2.5">
        <div class="flex flex-col w-[60%]">
          <Text
            text="Total"
            color="secondary"
          />
          <strong class="text-2xl text-font">
            {{ $filters.currencyBRL(totalItemPrice) }}
          </strong>
        </div>

        <Button :expand="true" @click="addToCart">
          Adicionar na Sacola
        </Button>
      </div>
    </div>
  </Container>

  <Toast ref="toastRef" />
</template>
