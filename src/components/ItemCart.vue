<script setup>
import { useRouter } from 'vue-router';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { useStorage } from '@/use/useStorage';
import Heading from '@/components/Heading.vue';
import Text from '@/components/Text.vue';
import QtyControl from '@/components/QtyControl.vue';

const emit = defineEmits(['onRemoveItem']);

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
});

const getImageUrl = (item) => {
  return new URL(`../assets/img/${item.image}`, import.meta.url).href;
};

const router = useRouter();

const handleSelectItem = () => {
  setStorage('product', props.item);

  router.push('/item');
};

const { setStorage } = useStorage();
</script>

<template>
  <div class="flex justify-start items-center gap-3 h-32 border-b border-accent">
    <img
      :src="getImageUrl(item)"
      alt="Imagem de comida"
      class="h-20 w-20 rounded-lg cursor-pointer"
      @click="handleSelectItem()"
    >

    <div class="flex flex-col justify-between h-20 w-full">
      <div class="flex justify-between items-start w-full">
        <Heading
          :text="item.name"
          size="sm"
          class="leading-5 line-clamp-2"
        />

        <span
          class="w-5 ml-3"
          @click="emit('onRemoveItem', item)"
        >
          <XMarkIcon class="h-5 w-5" />
        </span>
      </div>

      <Text
        :text="`Quantidade: ${item.quantity}x`"
        color="secondary"
      />

      <div class="flex justify-between items-center w-full">
        <strong class="font-bold text-lg text-primary leading-5">
          {{ $filters.currencyBRL(item.price) }}
        </strong>

        <QtyControl v-model="item.quantity" />
      </div>
    </div>
  </div>
</template>