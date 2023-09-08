<script setup>
import { ref, onMounted } from 'vue';
import { useStorage } from '@/use/useStorage';
import { useToast } from '@/use/useToast';
import Heading from '@/components/Heading.vue';
import TextInput from '@/components/TextInput.vue';
import Button from '@/components/Button.vue';
import Toast from '@/components/Toast.vue';

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
          handleToast('error', 'CEP não encontrado');
        } 
                
        address.value = data.erro ? {} : data;
      })
      .catch((error) => {
        handleToast('error', 'Erro ao buscar CEP:', error);
      });
  } else {
    handleToast('error', 'O CEP deve conter 8 dígitos numéricos');
  }
};

onMounted(() => {
  getUser();
  getAddress();
});

const handleSave = async () => {
  setStorage('user', user.value);
  setStorage('address', address.value);
  handleToast('success', 'Informações salvas com sucesso!');
};

const { setStorage, getStorage } = useStorage();
const { toast, toastData, handleToast } = useToast();
</script>

<template>
  <Heading
    text="Perfil"
    color="primary"
    size="lg"
  />

  <div class="flex flex-col gap-5 my-5">
    <Heading
      text="Meus dados"
      size="sm"
    />

    <TextInput
      v-model="user.firstName"
      type="text"
      text="Nome"
    />

    <TextInput
      v-model="user.lastName"
      type="text"
      text="Sobrenome"
    />

    <TextInput
      v-model="user.phone"
      type="text"
      text="Telefone"
    />

    <Heading
      text="Endereço"
      size="sm"
    />

    <TextInput
      v-model="address.cep"
      v-debounce:700ms="getByCEP"
      type="tel"
      text="CEP"
    />

    <TextInput
      v-model="address.logradouro"
      type="text"
      text="Endereço"
      :disabled="!address.cep"
    />

    <TextInput
      v-model="address.numero"
      type="text"
      text="Número"
      :disabled="!address.cep"
    />

    <TextInput
      v-model="address.complemento"
      type="text"
      text="Complemento"
      :disabled="!address.cep"
    />

    <TextInput
      v-model="address.bairro"
      type="text"
      text="Bairro"
      :disabled="!address.cep"
    />

    <TextInput
      v-model="address.localidade"
      type="text"
      text="Cidade"
      :disabled="true"
    />

    <TextInput
      v-model="address.uf"
      type="text"
      text="Estado"
      :disabled="true"
    />

    <div class="flex justify-between items-center">
      <Button
        text="Salvar Dados"
        color="primary"
        @click="handleSave"
      />
    </div>

    <Toast
      ref="toast"
      :toast-data="toastData"
    />
  </div>
</template>