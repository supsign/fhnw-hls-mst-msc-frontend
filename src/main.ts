import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import axios from 'axios';
import Multiselect from 'vue-multiselect';

const env = import.meta.env;

console.log(env);
axios.defaults.baseURL = 'http://fhnw-hls-mst-msc.loc/api';

const app = createApp(App);
app.component('multiselect', Multiselect);
app.use(router);
app.mount('#app');
