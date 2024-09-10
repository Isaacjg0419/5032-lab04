<template>
    <div class="container h-100 d-flex align-items-center justify-content-center">
        <div class="row">
            <div class="col-md-12">
                <h1 class="text-center">Sign in</h1>
                <div class="form-group">
                    <input type="text" class="form-control mb-3" placeholder="Email" v-model="email" />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control mb-3" placeholder="Password" v-model="password" />
                </div>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-primary" @click="signin">Sign in via Firebase</button>
                    <button class="btn btn-secondary" @click="goToRegister">Register</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()

const signin = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Firebase Register Successful!")
            router.push("/")
            console.log(auth.currentUser)
        })
        .catch((error) => {
            console.log(error.code);
        })
}

// Function to navigate to the register page
const goToRegister = () => {
    router.push("/FireRegister")
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