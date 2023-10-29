import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { vue3Debounce } from 'vue-debounce';

import './services/firebase-firestore';
import './style.css';

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$filters = {
  currencyBRL(value) {
    return parseFloat(value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }
};

app.use(router);
app.use(pinia);

app.directive('debounce', vue3Debounce({ lock: true }));

app.mount('#app');
