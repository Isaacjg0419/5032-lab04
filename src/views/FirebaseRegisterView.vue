<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="w-50">
      <h1>Create an Account</h1>
      <p><input type="text" class="form-control mb-3" placeholder="Email" v-model="email" /></p>
      <p><input type="password" class="form-control mb-3" placeholder="Password" v-model="password" /></p>
      <p><button @click="register" class="btn btn-primary w-100">Save to Firebase</button></p>
      <p><button @click="goToLogin" class="btn btn-secondary w-100 mt-2">Already have an account? Sign in</button></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Register Successful!")
      router.push("/FireLogin")
    })
    .catch((error) => {
      console.log(error.code);
    })
}

// Function to navigate to the login page
const goToLogin = () => {
  router.push("/FireLogin")
}
</script>
