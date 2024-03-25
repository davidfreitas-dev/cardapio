<script setup>
import { ref, onMounted } from 'vue';
import { useStorage } from '@/use/useStorage';
import Heading from '@/components/shared/Heading.vue';
import BaseLayout from '@/components/shared/BaseLayout.vue';
import Input from '@/components/shared/Input.vue';
import Button from '@/components/shared/Button.vue';

const user = ref({});

const getUser = () => {
  user.value = getStorage('user') ? getStorage('user') : {
    firstName: '',
    lastName: '',
    phone: ''
  };
};

const address = ref({});

const getAddress = () => {
  address.value = getStorage('address') ? getStorage('address') : {
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: ''
  };
};

const getByCEP = () => {
  const cep = address.value.cep.replace(/[^0-9]/g, '');

  if (cep.length === 8) {
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          console.log('error', 'CEP não encontrado');
        } 
                
        address.value = data.erro ? {} : data;
      })
      .catch((error) => {
        console.log('error', 'Erro ao buscar CEP:', error);
      });
  } else {
    console.log('error', 'O CEP deve conter 8 dígitos numéricos');
  }
};

onMounted(() => {
  getUser();
  getAddress();
});

const handleSave = async () => {
  setStorage('user', user.value);
  setStorage('address', address.value);
  console.log('success', 'Informações salvas com sucesso!');
};

const { setStorage, getStorage } = useStorage();
</script>

<template>
  <BaseLayout>
    <Heading
      text="Perfil"
      color="primary"
      size="lg"
    />

    <div class="flex flex-col gap-5 my-5 pb-20">
      <Heading
        text="Meus dados"
        size="sm"
      />

      <Input
        v-model="user.firstName"
        type="text"
        placeholder="Nome"
      />

      <Input
        v-model="user.lastName"
        type="text"
        placeholder="Sobrenome"
      />

      <Input
        v-model="user.phone"
        type="text"
        placeholder="Telefone"
      />

      <Heading
        text="Endereço"
        size="sm"
      />

      <Input
        v-model="address.cep"
        v-debounce:700ms="getByCEP"
        type="tel"
        placeholder="CEP"
      />

      <Input
        v-model="address.logradouro"
        type="text"
        placeholder="Endereço"
        :disabled="!address.cep"
      />

      <Input
        v-model="address.numero"
        type="text"
        placeholder="Número"
        :disabled="!address.cep"
      />

      <Input
        v-model="address.complemento"
        type="text"
        placeholder="Complemento"
        :disabled="!address.cep"
      />

      <Input
        v-model="address.bairro"
        type="text"
        placeholder="Bairro"
        :disabled="!address.cep"
      />

      <Input
        v-model="address.localidade"
        type="text"
        placeholder="Cidade"
        :disabled="true"
      />

      <Input
        v-model="address.uf"
        type="text"
        placeholder="Estado"
        :disabled="true"
      />

      <div class="flex justify-between items-center">
        <Button :expand="true" @click="handleSave">
          Salvar Dados
        </Button>
      </div>
    </div>
  </BaseLayout>
</template>