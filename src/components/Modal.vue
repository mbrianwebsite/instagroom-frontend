<script setup>
import { ref, reactive } from 'vue';
import { useUserStore } from '@/stores/users';
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { errorMessage, loading, user } = storeToRefs(userStore)

const userCredentials = reactive({
    email: "",
    password: "",
    username: "",
    name: ""

})

const clearUserCredentialsInput = () => {
    userCredentials.email = ""
    userCredentials.name = ""
    userCredentials.username = ""
    userCredentials.password = ""
    userStore.clearErrorMessage()
}

const signUpNow = async (e) => {
    await userStore.handleSignup(userCredentials)
    if (user.value) {
        clearUserCredentialsInput()
        dialog.value = false
    }
}

const signInNow = async (e) => {
    await userStore.handleLogin(userCredentials)
    if (user.value) {
        clearUserCredentialsInput()
        dialog.value = false
    }
}

const signOutNow = async (e) => {
    await userStore.handleLogout()
    dialog.value = false
}

const handleCancel = (e) => {
    clearUserCredentialsInput()
    dialog.value = false
}

defineProps({
    isRegister: Boolean,
    isLogout: Boolean,
})
const dialog = ref(false)
</script>
<template>
    <div class="text-center">
        <v-dialog v-model="dialog">
            <template v-slot:activator="{ props }">
                <v-list-item style="text-align: left;" v-if="isRegister && !isLogout" prepend-icon="mdi-account-plus"
                    title="Register" value="register" v-bind="props"></v-list-item>
                <v-list-item style="text-align: left;" v-if="!isRegister && !isLogout" prepend-icon="mdi-login"
                    title="LogIn" value="login" v-bind="props"></v-list-item>
                <v-list-item style="text-align: left;" v-if="isLogout" prepend-icon="mdi-logout" title="LogOut"
                    value="logout" v-bind="props"></v-list-item>
            </template>
            <v-card :loading="loading">
                <v-card-title>
                    <span v-if="isRegister && !isLogout" class="text-h5">Register New Account</span>
                    <span v-if="!isRegister && !isLogout" class="text-h5">Please Login</span>
                    <span v-if="isLogout" class="text-h5">Are you sure to Log Out?</span>
                </v-card-title>
                <v-card-text v-if="!isLogout">
                    <v-container>
                        <v-row>
                            <v-col v-if="isRegister && !isLogout" cols="12">
                                <v-text-field label="Full Name*" required v-model="userCredentials.name"></v-text-field>
                            </v-col>
                            <v-col v-if="isRegister && !isLogout" cols="12">
                                <v-text-field label="Username*" required
                                    v-model="userCredentials.username"></v-text-field>
                            </v-col>
                            <v-col v-if="!isLogout" cols="12">
                                <v-text-field label="Email*" required v-model="userCredentials.email"></v-text-field>
                            </v-col>
                            <v-col v-if="!isLogout" cols="12">
                                <v-text-field label="Password*" type="password" required
                                    v-model="userCredentials.password"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small style="color: red;">{{ errorMessage }}</small><br>
                    <small v-if="!isLogout">*indicates required field</small>
                </v-card-text>
                <v-card-actions v-if="!loading">
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="handleCancel">
                        Close
                    </v-btn>
                    <v-btn v-if="isRegister && !isLogout" color="blue-darken-1" variant="text" @click="signUpNow()">
                        Register
                    </v-btn>
                    <v-btn v-if="!isRegister && !isLogout" color="blue-darken-1" variant="text" @click="signInNow">
                        Login
                    </v-btn>
                    <v-btn v-if="isLogout" color="blue-darken-1" variant="text" @click="signOutNow">
                        LogOut
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>