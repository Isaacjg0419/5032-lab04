import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

// Initialize Vue app
const vueApp = createApp(App);

// Use PrimeVue with Aura theme
vueApp.use(PrimeVue, { theme: { preset: Aura } });
vueApp.use(router);

// Mount the Vue app
vueApp.mount("#app");
