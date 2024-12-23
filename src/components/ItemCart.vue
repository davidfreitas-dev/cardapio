<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { useStorage } from '@/use/useStorage';
import Text from '@/components/shared/Text.vue';
import QtyControl from '@/components/shared/QtyControl.vue';

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
});

const item = ref({ ...props.item });

const additionalSelected = computed(() => {
  return Array.isArray(item.value.additional) 
    ? item.value.additional.filter((add) => add.selected) 
    : [];
});

const totalItemPrice = computed(() => {
  const totalItem = item.value.price ?? 0;

  const totalAdditional = additionalSelected.value
    .map(add => add.price || 0)
    .reduce((total, current) => total + current, 0);

  return totalItem + totalAdditional;
});

const router = useRouter();

const handleSelectItem = () => {
  setStorage('product', item.value);
  router.push('/item');
};

const emit = defineEmits(['onRemoveItem']);

const removeFromCart = (item) => {
  emit('onRemoveItem', item);
};

const { setStorage } = useStorage();
</script>

<template>
  <div class="flex justify-start items-start gap-3 border-b border-gray-100 py-5">
    <img
      :src="item.image"
      alt="Imagem de comida"
      class="h-20 w-20 rounded-xl shadow-md mr-1 cursor-pointer"
      @click="handleSelectItem"
    >

    <div class="flex flex-col justify-between min-h-[80px] w-full">
      <div class="flex justify-between items-center w-full">
        <h1 class="font-semibold text-base leading-tight">
          {{ item.name }}
        </h1>

        <span
          class="w-5 ml-3"
          @click="removeFromCart(item)"
        >
          <XMarkIcon class="h-5 w-5" />
        </span>
      </div>

      <template
        v-for="(additional, index) in item.additional"
        :key="index"
      >
        <Text
          v-if="additional.selected"
          :text="`+ ${additional.name}`"
          color="secondary"
        />
      </template>

      <span
        v-if="!additionalSelected.length"
        class=" text-sm text-secondary w-[85%] leading-tight"
      >
        {{ item.description }}
      </span>

      <div class="flex justify-between items-center w-full">
        <strong class="font-bold text-lg text-font leading-5">
          {{ $filters.currencyBRL(totalItemPrice) }}
        </strong>

        <QtyControl v-model="item.quantity" />
      </div>
    </div>
  </div>
</template>