import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

// Initialize Vue app
const vueApp = createApp(App);
vueApp.use(PrimeVue, { theme: { preset: Aura } });
vueApp.use(router);

// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_rsAfOlylzLSqSfBBLxCPC6iv5ALFdAE",
  authDomain: "week7-jiayuan-6b508.firebaseapp.com",
  projectId: "week7-jiayuan-6b508",
  storageBucket: "week7-jiayuan-6b508.appspot.com",
  messagingSenderId: "697403837256",
  appId: "1:697403837256:web:66b381bc0d37a65d16817d",
  measurementId: "G-4X6ZF6NJR0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

// Mount the Vue app
vueApp.mount("#app");
