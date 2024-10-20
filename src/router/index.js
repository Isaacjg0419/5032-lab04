import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import AccessDeniedView from "../views/AccessDeniedView.vue";
import FirebaseSigninView from "@/views/FirebaseSigninView.vue";
import FirebaseRegisterView from "@/views/FirebaseRegisterView.vue";
import AddBookView from "../views/AddBookView.vue";
import GetBookCountView from "../views/GetBookCountView.vue";
import WeatherView from "../views/WeatherView.vue";
import CountBookAPI from "@/views/CountBookAPI.vue";

const isAuthenticated = () =>
  localStorage.getItem("isAuthenticated") === "true";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  {
    path: "/about",
    name: "About",
    component: AboutView,
    meta: { requiresAuth: true },
  },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/access-denied", name: "AccessDenied", component: AccessDeniedView },
  { path: "/FireLogin", name: "FireLogin", component: FirebaseSigninView },
  {
    path: "/FireRegister",
    name: "FireRegister",
    component: FirebaseRegisterView,
  },
  { path: "/AddBook", name: "AddBook", component: AddBookView },
  {
    path: "/GetBookCount",
    name: "GetBookCountView",
    component: GetBookCountView,
  },
  { path: "/WeatherCheck", name: "WeatherCheck", component: WeatherView },
  {
    path: "/CountBookAPI",
    name: "CountBookAPI",
    component: CountBookAPI,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
