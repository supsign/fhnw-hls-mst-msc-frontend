import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import axios from 'axios';
//@ts-ignore
import Popper from 'vue3-popper';

const env = import.meta.env;

console.log(env);
axios.defaults.baseURL = 'http://fhnw-hls-mst-msc.loc/api';

const app = createApp(App);
app.component('Popper', Popper);
app.use(router);
app.mount('#app');
