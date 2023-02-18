<script setup>
import { ref } from 'vue';

defineProps({
    postImage: Object
})

const image = ref("")
</script>



<template>
    <v-img :src="`https://cujaootecogyihvzqccn.supabase.co/storage/v1/object/public/images/${postImage.url}`"
        :lazy-src="`https://cujaootecogyihvzqccn.supabase.co/storage/v1/object/public/images/${postImage.url}`"
        aspect-ratio="1" cover class="bg-grey-lighten-2">
        <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
            </v-row>
        </template>
    </v-img>
</template>