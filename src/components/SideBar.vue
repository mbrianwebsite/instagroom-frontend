<script setup>
defineProps({
    drawer: Boolean
})

</script>

<template>
    <v-navigation-drawer :permanent="drawer" expand-on-hover rail>
        <v-list>
            <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg" title="Tony Adams"
                subtitle="tony_a88@gmailcom"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-image-multiple" title="My Photos" value="myphotos"></v-list-item>
            <v-list-item prepend-icon="mdi-account-heart" title="Following" value="following"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group" title="Follower" value="follower"></v-list-item>
            <v-list-item prepend-icon="mdi-heart" title="Like" value="like"></v-list-item>
            <v-list-item prepend-icon="mdi-login" title="LogIn" value="login" ></v-list-item>
            <v-list-item prepend-icon="mdi-logout" title="LogOut" value="logout"></v-list-item>
            <v-list-item prepend-icon="mdi-account-plus" title="Register" value="register"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>