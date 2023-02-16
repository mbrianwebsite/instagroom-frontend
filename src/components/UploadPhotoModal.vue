<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()

const routeUsername = ref(route.params.username)

const dialog = ref(false)
defineProps({
    username: String
})
watch(() => route.query, () => {
    if (route.params.username) routeUsername.value = route.params.username
    // refresh()
})
</script>

<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <template v-slot:activator="{ props }">
                <v-btn dark v-if="username === routeUsername" class="ma-2" color="blue" prepend-icon="mdi-plus-circle"
                    v-bind="props"> Upload
                </v-btn>
            </template>
            <v-card>
                <v-toolbar dark color="blue">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Settings</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn variant="text" @click="dialog = false">
                            Save
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list lines="two" subheader>
                    <v-list-subheader>User Controls</v-list-subheader>
                </v-list>
                <v-divider></v-divider>
                <v-list lines="two" subheader>
                    <v-list-subheader>General</v-list-subheader>
                </v-list>
            </v-card>
        </v-dialog>
</v-row>
</template>
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform .2s ease-in-out;
}
</style>