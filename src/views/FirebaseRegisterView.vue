<template>
  <div class="container h-100 d-flex align-items-center justify-content-center">
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-center">Create an Account</h1>
        <div class="form-group">
          <input type="text" class="form-control mb-3" placeholder="Email" v-model="email" />
        </div>
        <div class="form-group">
          <input type="password" class="form-control mb-3" placeholder="Password" v-model="password" />
        </div>
        <div class="form-group">
          <select class="form-control mb-3" v-model="role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="d-flex justify-content-between">
          <button class="btn btn-primary" @click="register">Save to Firebase</button>
          <button class="btn btn-secondary" @click="goToLogin">Already have an account? Sign in</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const role = ref("user")
const router = useRouter()
const auth = getAuth()

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Save user email, password, and role to localStorage
      localStorage.setItem('userEmail', email.value)
      localStorage.setItem('userPassword', password.value) // Not recommended
      localStorage.setItem('userRole', role.value)
      console.log("Firebase Register Successful!")
      router.push("/FireLogin")
    })
    .catch((error) => {
      console.log(error.code)
    })
}

const goToLogin = () => {
  router.push("/FireLogin")
}
</script>

<style>
html,
body {
  height: 100%;
}

.container {
  max-width: 400px;
}
</style>
