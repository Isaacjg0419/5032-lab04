<template>
  <div class="container mt-5">
    <h1>Login to Your Account</h1>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" id="username" v-model="username" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" v-model="password" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <div v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = () => {
  const validUsername = 'isaac';
  const validPassword = 'Fjy7562391!';

  if (username.value === validUsername && password.value === validPassword) {
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/about');
  } else {
    errorMessage.value = 'Invalid username or password';
  }
};
</script>
