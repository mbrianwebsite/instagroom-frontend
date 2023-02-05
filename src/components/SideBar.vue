<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';
defineProps({
    drawer: Boolean
})

const isRegister = ref(true)

</script>

<template>
    <v-navigation-drawer :permanent="drawer" expand-on-hover rail>
        <v-list>
            <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg" title="Tony Adams"
                subtitle="tony_a88@gmailcom"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-image-multiple" title="My Photos" value="myphotos"
                to="/profile"></v-list-item>
            <v-list-item prepend-icon="mdi-account-heart" title="Following" value="following"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group" title="Follower" value="follower"></v-list-item>
            <v-list-item prepend-icon="mdi-heart" title="Like" value="like"></v-list-item>
            <Modal :isRegister="isRegister = false" />
            <v-list-item prepend-icon="mdi-logout" title="LogOut" value="logout"></v-list-item>
            <Modal :isRegister="isRegister = true" />
        </v-list>
    </v-navigation-drawer>
</template>