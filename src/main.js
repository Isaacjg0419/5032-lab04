import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css';




const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
createApp(App).mount('#app')
