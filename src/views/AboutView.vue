<!-- <template>
  <div class="about">
    <h1>About Our Library</h1>
    <p>Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.</p>
  </div>
</template>

<script setup>
// No script needed for now
</script>

<style>
</style> -->


<template>
    <div class="container mt-5">
        <h1>About Our Library</h1>
        <p>Welcome to the secure area of the library!</p>
        <button @click="logout" class="btn btn-danger">Logout</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
};
</script>