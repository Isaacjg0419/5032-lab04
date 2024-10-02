<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home (Week 5)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/AddBook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active">Get Book Count</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather </router-link>
        </li>
      </ul>
    </header>
  </div>
</template>


<!-- src/components/Navbar.vue -->
<!-- <template>
    <div class="container">
        <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
                </li>
                <li class="nav-item" v-if="isAuthenticated">
                    <router-link to="/about" class="nav-link" active-class="active">About</router-link>
                </li>
                <li class="nav-item" v-if="!isAuthenticated">
                    <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
                </li>
                <li class="nav-item" v-if="isAuthenticated">
                    <a @click="logout" class="nav-link">Logout</a>
                </li>
            </ul>
        </header>
    </div>
</template> -->

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');
const router = useRouter();

const logout = () => {
  localStorage.removeItem('isAuthenticated');
  isAuthenticated.value = false;
  router.push('/login');
};
watch(() => localStorage.getItem('isAuthenticated'), (newValue) => {
  isAuthenticated.value = newValue === 'true';
});
</script>

<style scoped>
</style>