<script setup>


import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'
import { supabase } from '../supabase';
import UploadPhotoModal from '../components/UploadPhotoModal.vue'
import Gallery from '../components/Gallery.vue';

const route = useRoute()
console.log(route.params.username)

const profileData = ref("")
const profileImage = ref("")
const profileImageLength = ref(0)

defineProps({
    user: Object
})

watch(() => route.query, () => {
    if (route.params.username) {
        getDataProfile()
    }
})

const updateValue = () => {
    getDataProfile()
}

onMounted(async () => {
    getDataProfile()
    console.log(profileData._value)
})

const getDataProfile = async () => {
    const { data: userWithUsername } = await supabase
        .from("users")
        .select()
        .eq("username", route.params.username)
        .single();
    // console.log(userWithUsername);

    if (!userWithUsername) {
        return alert("username not found")
    }

    profileData.value = {
        id: userWithUsername.id,
        email: userWithUsername.email,
        username: userWithUsername.username,
        name: userWithUsername.name,
    };

    const { data: userPostImage } = await supabase
        .from('posts')
        .select('*')
        .eq("owner_id", profileData.value.id);

    console.log(userPostImage)

    if (!userPostImage) {
        return alert("image not found")
    }

    profileImageLength.value = userPostImage.length
    profileImage.value = { ...userPostImage }
    // profileImage.value = {
    //     id: userPostImage.id,
    //     url: userPostImage.url,
    //     caption: userPostImage.caption,
    //     description: userPostImage.description,
    // };

    // console.log(profileImage.value)
    return
}

</script>

<template>
    <v-row class="w-100" style="margin-top:40px;margin: 0 auto;">
        <v-card class="mx-auto d-md-flex flex-md-col d-sm-flex flex-sm-row profile-image"
            style="padding: 20px;width: 500px;">
            <div style="width: 100%;">
                <v-img class="rounded-circle" style="width:175px;height: 175px; margin: 0 auto; padding: 10" cover
                    src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
            </div>
            <div>
                <v-list-item class="text-slate" :title="profileData.name" :subtitle="profileData.username"></v-list-item>
                <div style="padding: 16px;">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard
                </div>
            </div>
        </v-card>
    </v-row>
    <UploadPhotoModal @updateValue="updateValue" :username="user.username" :userId="user.id" />
    <v-row style="margin:0px auto; margin-top: 10px; max-width: 500px; ">
        <v-col cols="4" class="text-center">5 Follower</v-col>
        <v-col cols="4" class="text-center">{{ profileImageLength }} Images</v-col>
        <v-col cols="4" class="text-center">75 Following</v-col>
    </v-row>
    <div style="min-height:50px">

    </div>
    <v-row>
        <v-col v-if="profileImage[0]" v-for="postImage in profileImage" class="d-flex child-flex" cols="4">
            <Gallery :postImage="postImage" />
        </v-col>
        <v-col v-else>
            No post yet
        </v-col>
    </v-row>
</template>

<style scoped>
.profile-image {
    padding: 8px;
    box-shadow: none;

}
</style>