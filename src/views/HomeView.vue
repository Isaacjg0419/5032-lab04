<template>
    <div class="container mt-5 d-flex justify-content-center">
        <div class="row w-100">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">User Information Form</h1>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <!-- Username and Gender in the same row -->
                        <div class="col-md-6 col-sm-6">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" @blur="() => validateName(true)"
                                @input="() => validateName(false)" v-model="formData.username">
                            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-select" id="gender" v-model="formData.gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password"
                                @blur="() => validatePassword(true)" @input="() => validatePassword(false)"
                                v-model="formData.password">
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="confirm-password" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="confirm-password"
                                v-model="formData.confirmPassword" @blur="() => validateConfirmPassword(true)" />
                            <div v-if="errors.confirmPassword" class="text-danger">
                                {{ errors.confirmPassword }}
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="isAustralian"
                                    v-model="formData.isAustralian">
                                <label for="isAustralian" class="form-check-label">
                                    Australian Resident?
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining</label>
                        <textarea class="form-control" id="reason" rows="3" v-model="formData.reason"
                            @input="validateReason"></textarea>
                        <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
                        <div v-if="successMessage" class="text-success">{{ successMessage }}</div>
                    </div>

                    <div class="mb-3">
                        <label for="reason" class="form-label">Suburb</label>
                        <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>

                    <div class="row mt-5" v-if="submittedCards.length">
                        <div class="d-flex flex-wrap justify-content-start">
                            <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
                                <Column field="username" header="Username"></Column>
                                <Column field="password" header="Password"></Column>
                                <Column field="isAustralian" header="Australian Resident"></Column>
                                <Column field="gender" header="Gender"></Column>
                                <Column field="reason" header="Reason"></Column>
                                <Column field="suburb" header="Suburb"></Column>
                            </DataTable>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const formData = ref({
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: 'Clayton'
});

const submittedCards = ref([]);

const errors = ref({
    username: null,
    password: null,
    confirmPassword: null,
    resident: null,
    gender: null,
    reason: null
});
const successMessage = ref('');

const validateName = (blur) => {
    if (formData.value.username.length < 3) {
        errors.value.username = blur ? "Username must be at least 3 characters long" : null;
    } else {
        errors.value.username = null;
    }
};

const validatePassword = (blur) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        errors.value.password = blur ? `Password must be at least ${minLength} characters long` : null;
    } else if (!hasUppercase) {
        errors.value.password = blur ? "Password must have at least one uppercase letter" : null;
    } else if (!hasLowercase) {
        errors.value.password = blur ? "Password must have at least one lowercase letter" : null;
    } else if (!hasNumber) {
        errors.value.password = blur ? "Password must have at least one number" : null;
    } else if (!hasSpecialChar) {
        errors.value.password = blur ? "Password must have at least one special character" : null;
    } else {
        errors.value.password = null;
    }
};

const validateConfirmPassword = (blur) => {
    if (formData.value.password !== formData.value.confirmPassword) {
        if (blur) errors.value.confirmPassword = 'Passwords do not match.';
    } else {
        errors.value.confirmPassword = null;
    }
};

const validateReason = () => {
    const reason = formData.value.reason;

    if (reason.length < 10) {
        errors.value.reason = "Reason must be at least 10 characters long.";
        successMessage.value = '';
    } else if (reason.toLowerCase().includes('friend')) {
        successMessage.value = "Great to have a friend!";
        errors.value.reason = null;
    } else {
        successMessage.value = '';
        errors.value.reason = null;
    }
};

const submitForm = () => {
    if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword && !errors.value.reason) {
        submittedCards.value.push({ ...formData.value });
        clearForm();
    }
};

const clearForm = () => {
    formData.value = {
        username: '',
        password: '',
        confirmPassword: '',
        isAustralian: false,
        reason: '',
        gender: ''
    };
    successMessage.value = '';
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin-top: 20px;
}


.form {
    text-align: center;
    margin-top: 50px;
}


#username:focus,
#password:focus,
#isAustralian:focus,
#reason:focus {
    border-color: #FF6347;
    background-color: #FFEBE8;
}


select[id="gender"] {
    background-color: #d3d3d3;
}
</style>
