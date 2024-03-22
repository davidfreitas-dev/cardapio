<script setup>
import { ref, computed, onMounted } from 'vue';
import { ChevronRightIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';
import { useStorage } from '@/use/useStorage';
import Text from '@/components/shared/Text.vue';

const props = defineProps({
  delivery: {
    type: String,
    default: '',
    require: true
  }
});

const router = useRouter();

const userAddress = ref(null);

onMounted(() => {
  userAddress.value = getStorage('address') ? getStorage('address') : null;
});

const address = computed(() => {
  const deliveryAddress = userAddress.value 
    ? `${userAddress.value.logradouro}, ${userAddress.value.numero} - ${userAddress.value.bairro}` 
    : 'Você ainda não adicionou um endereço';

  return props.delivery === 'Entrega' ? deliveryAddress : 'Rua Serafim Poli, 121 - Parque Vila Maria';
});

const { getStorage } = useStorage();
</script>

<template>
  <div class="relative flex w-full rounded-2xl p-6 my-7 bg-primary">
    <div class="flex flex-col gap-2 justify-between items-start">
      <h1 class="font-semibold font-sans text-2xl text-white">
        {{ delivery }} em
      </h1>

      <ChevronRightIcon class="h-6 w-6 text-white absolute right-5 top-5" />
        
      <Text
        size="md"
        :text="address"
        class="text-white w-[90%] mb-2"
      />

      <button
        v-if="delivery === 'Entrega'"
        @click="router.push('/profile')"
        class="bg-white text-primary text-sm font-bold h-8 px-3 tracking-wide rounded-lg transition-all duration-200 ease-in active:scale-95"
      >
        {{ userAddress ? 'Alterar' : 'Adicionar' }}
      </button>
    </div>

    <div class="absolute left-4 right-4 -bottom-2.5 h-32 w-11/12 rounded-xl -z-10 bg-accent" />
  </div>
</template>
