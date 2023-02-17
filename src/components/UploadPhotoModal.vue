<script setup>
import { ref, toDisplayString, watch } from 'vue';
import { useRoute } from 'vue-router'
import { supabase } from '../supabase';
const route = useRoute()

const image = ref(null)
const caption = ref("")
const description = ref("")

const loading = ref(false)
const errorMessage = ref("")


const routeUsername = ref(route.params.username)

const dialog = ref(false)

const props = defineProps(['username', 'userId'])

const username = ref(props.username)
const userId = ref(props.userId)

const handleUploadChange = async (e) => {
    if (e.target.files[0]) {
        image.value = e.target.files[0]
    }
}

const uploadAnImage = async () => {
    loading.value = true
    if (image.value) {
        const fileName = Math.floor(Math.random() * 100000000000)
        const { data, error } = await supabase.storage.from("images").upload('public/' + fileName, image.value);

        if (error) {
            loading.value = false
            return errorMessage.value = "Unable to upload Image"
        }

        await supabase.from("posts").insert({
            url: data.path,
            caption: caption.value,
            description: description.value,
            owner_id: userId.value
        })
    }
    loading.value = false
    dialog.value = false
}

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
            <v-card :loading="loading">
                <v-toolbar dark color="blue">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Upload Photo</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn variant="text" @click="uploadAnImage">
                            Upload
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list lines="two" subheader>
                    <v-list-subheader>Pelase insert a file</v-list-subheader>
                    <v-text-field v-model="caption" class="mx-8 my-2" clearable label="Caption"></v-text-field>
                    <v-textarea v-model="description" class="mx-8 my-2" clearable label="Description"></v-textarea>
                    <v-file-input @change="handleUploadChange" class="mx-8 my-2" clearable label="File input"
                        accept="image/jpg,image/png"></v-file-input>
                </v-list>
                <v-divider></v-divider>
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