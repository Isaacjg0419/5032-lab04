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
                <button class="btn btn-danger mt-3" @click="logout">Logout</button>
                <div v-if="currentUser">
                    <h2 class="mt-3">Current User Info:</h2>
                    <p>Email: {{ currentUser.email }}</p>
                    <p>UID: {{ currentUser.uid }}</p>
                    <p>Role: {{ currentUserRole }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const currentUser = ref(null)
const currentUserRole = ref("")
const router = useRouter()
const auth = getAuth()

const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            console.log("Firebase Sign-In Successful!")
            const user = userCredential.user
            // Save user information to localStorage
            localStorage.setItem('userEmail', user.email)
            localStorage.setItem('userUID', user.uid)
            localStorage.setItem('userRole', 'user')
            localStorage.setItem('userPassword', password.value)
            if (localStorage.getItem('userRole') === "admin") {
                router.push("/adminDashboard")
            } else {
                router.push("/")
            }
        })
        .catch((error) => {
            console.log(error.code)
        })
}

const goToRegister = () => {
    router.push("/FireRegister")
}

const logout = () => {
    // Log current user information before signing out
    const currentUserBeforeSignOut = auth.currentUser
    if (currentUserBeforeSignOut) {
        console.log("Current user before sign out:", currentUserBeforeSignOut)
    } else {
        console.log("No current user found")
    }

    signOut(auth)
        .then(() => {
            // Clear user data from localStorage on logout
            localStorage.removeItem('userRole')
            localStorage.removeItem('userEmail')
            localStorage.removeItem('userUID')
            localStorage.removeItem('userPassword') 
            // Clear current user info
            currentUser.value = null
            currentUserRole.value = ''
            // Clear input fields
            email.value = ""
            password.value = ""
            alert("You have been logged out successfully.")
            console.log("User signed out")
            router.push("/FireLogin")
        })
        .catch((error) => {
            console.error("Sign out error: ", error)
        })
}

// Load user information when the component is mounted
onMounted(() => {
    email.value = localStorage.getItem('userEmail') || ""
    password.value = localStorage.getItem('userPassword') || "" 
    currentUser.value = {
        email: localStorage.getItem('userEmail'),
        uid: localStorage.getItem('userUID')
    }
    currentUserRole.value = localStorage.getItem('userRole') || 'unknown'
})
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
