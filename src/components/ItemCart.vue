<script setup>
import { computed } from 'vue';
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

const additionalSelected = computed(() => {
  return props.item.additional.filter((add) => add.selected);
});

const totalItemPrice = computed(() => {
  const totalItem = props.item.price || 0;
  const totalAdditional = additionalSelected.value
    .map(add => add.price * 1)
    .reduce((total, current) => total + current, 0);

  return totalItem + totalAdditional;
});

const router = useRouter();

const handleSelectItem = () => {
  setStorage('product', props.item);

  router.push('/item');
};

const { setStorage } = useStorage();
</script>

<template>
  <div class="flex justify-start items-start gap-3 border-b border-accent py-5">
    <img
      :src="getImageUrl(item)"
      alt="Imagem de comida"
      class="h-20 w-20 rounded-lg cursor-pointer"
      @click="handleSelectItem()"
    >

    <div class="flex flex-col justify-between min-h-[80px] w-full">
      <div class="flex justify-between items-center w-full">
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

      <Text
        v-if="!additionalSelected.length"
        :text="item.description"
        color="secondary"
      />

      <div class="flex justify-between items-center w-full">
        <strong class="font-bold text-lg text-primary leading-5">
          {{ $filters.currencyBRL(totalItemPrice) }}
        </strong>

        <QtyControl v-model="item.quantity" />
      </div>
    </div>
  </div>
</template>