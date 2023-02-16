<script setup>


import { ref } from 'vue';
import AuthModal from './AuthModal.vue';
import UploadPhotoModal from './UploadPhotoModal.vue';
defineProps({
    drawer: Boolean,
    isLogin: Boolean,
    user: Object
})

const isRegister = ref(true)

</script>

<template>
    <v-navigation-drawer :permanent="!isLogin ? true : drawer" :expand-on-hover="isLogin" :rail="isLogin">
        <v-list v-if="isLogin">
            <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg" :title="user.name"
                :subtitle="user.email"></v-list-item>
        </v-list>

        <v-divider v-if="isLogin"></v-divider>

        <v-list density="compact" nav>
            <v-list-item v-if="isLogin" prepend-icon="mdi-image-multiple" title="My Photos" value="myphotos"
                :to="`/profile/${user.username}`"></v-list-item>
            <v-list-item v-if="isLogin" prepend-icon="mdi-account-heart" title="Following" value="following"></v-list-item>
            <v-list-item v-if="isLogin" prepend-icon="mdi-account-group" title="Follower" value="follower"></v-list-item>
            <v-list-item v-if="isLogin" prepend-icon="mdi-heart" title="Like" value="like"></v-list-item>
            <AuthModal v-if="!isLogin" :isRegister="isRegister = false" :isLogout="isLogout = false" />
            <AuthModal v-if="!isLogin" :isRegister="isRegister = true" :isLogout="isLogout = false" />
            <AuthModal v-if="isLogin" :isRegister="isRegister = false" :isLogout="isLogout = true" prepend-icon="mdi-logout"
                title="LogOut" value="logout">
            </AuthModal>
        </v-list>
</v-navigation-drawer>
</template>