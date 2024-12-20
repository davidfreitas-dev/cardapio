<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useStorage } from '@/use/useStorage';
import BaseLayout from '@/components/shared/BaseLayout.vue';
import Heading from '@/components/shared/Heading.vue';
import Address from '@/components/Address.vue';
import Text from '@/components/shared/Text.vue';
import Button from '@/components/shared/Button.vue';
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

const formatItemData = (item) => {
  let itemDetails = `${item.name} (R$ ${item.price.toFixed(2)})\n`;
  itemDetails += `Quantidade: ${item.quantity}\n`;

  // Adicionando adicionais ao item
  const selectedAdditions = item.additional.filter((add) => add.selected);

  if (selectedAdditions.length > 0) {
    itemDetails += 'Adicionais:\n';
    selectedAdditions.forEach((add) => {
      itemDetails += `• ${add.name} (R$ ${add.price.toFixed(2)})\n`;
    });
  }

  // Calculando o total do item (preço * quantidade + adicionais selecionados)
  const additionalTotal = selectedAdditions.reduce((total, add) => total + add.price, 0);
  const totalItem = (item.price + additionalTotal) * item.quantity;

  itemDetails += `Total do item: R$ ${totalItem.toFixed(2)}\n`;

  return itemDetails;
};

const addressConfigured = computed(() => {
  // Supondo que o endereço esteja armazenado no localStorage
  const address = getStorage('address');
  return address && address.logradouro && address.localidade && address.cep;
});

// Função para montar e enviar o pedido via WhatsApp
const placeOrder = () => {
  const cartItems = cartStore.cart.products;

  let orderText = 'Pedido:\n\n';
  let orderTotal = 0;

  // Adicionando itens ao pedido
  cartItems.forEach(item => {
    orderText += formatItemData(item);
    orderText += '\n';

    const additionalTotal = item.additional
      .filter(add => add.selected)
      .reduce((total, add) => total + add.price, 0);

    const totalItem = (item.price + additionalTotal) * item.quantity;

    orderTotal += totalItem;
  });

  // Adicionando taxa de entrega
  if (deliveryType.value === 'Entrega') {
    orderText += `Taxa de Entrega: R$ ${deliveryPrice.value.toFixed(2)}\n\n`;
    orderTotal += deliveryPrice.value;
  }

  // Adicionando informações de entrega
  const address = getStorage('address');
  const user = getStorage('user');

  if (!user || !address) {
    alert('Por favor, configure as informações do cliente e do endereço antes de enviar o pedido.');
    return;
  }

  orderText += 'Informações de entrega:\n';
  orderText += `Cliente: ${user.firstName} ${user.lastName}\n`;
  orderText += `Telefone: ${user.phone}\n`;
  orderText += `Rua: ${address.logradouro}, ${address.numero} - ${address.complemento || ''}\n`;
  orderText += `Bairro: ${address.bairro}\n`;
  orderText += `Cidade: ${address.localidade} - ${address.uf}\n`;
  orderText += `CEP: ${address.cep}\n\n`;

  // Adicionando total do pedido
  orderText += `Total do Pedido: R$ ${orderTotal.toFixed(2)}`;

  const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER; // Número de telefone do destinatário

  const formattedText = encodeURIComponent(orderText);
  const whatsappLink = `https://api.whatsapp.com/send?1=pt_BR&phone=${phoneNumber}&text=${formattedText}`;

  window.open(whatsappLink, '_blank');
};

const { getStorage } = useStorage();
</script>

<template>
  <BaseLayout>
    <div class="flex justify-between items-center">
      <Heading
        text="Carrinho"
        color="primary"
        size="lg"
      />

      <Dropdown v-model="deliveryType" />
    </div>

    <div v-if="!cartStore.totalItems" class="flex flex-col items-center text-center w-full h-screen p-8 mt-5">
      <span class="font-semibold font-sans text-lg">
        Você ainda não adicionou nenhum item
      </span>
    </div>

    <div v-else class="pb-20">
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
        :expand="true"
        class="my-5"
        :disabled="deliveryType === 'Entrega' && !addressConfigured"
        @click="placeOrder"
      >
        Enviar Pedido
      </Button>
    </div>
  </BaseLayout>
</template>