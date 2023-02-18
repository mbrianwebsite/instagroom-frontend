<script setup>


import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'
import { supabase } from '../supabase';
import UploadPhotoModal from '../components/UploadPhotoModal.vue'
import Gallery from '../components/Gallery.vue';

const route = useRoute()

const profileData = ref("")
const profileImage = ref("")
const profileImageLength = ref(0)
const isFollowing = ref(false)
const profileFollower = ref(0)
const profileFollowing = ref(0)

const props = defineProps(['user'])


const countFollowing = async (profileUserId) => {
    const { data } = await supabase.from("follower_following")
        .select('follower_id')
        .eq('follower_id', profileUserId)
    profileFollowing.value = data.length
}

const countFollower = async (profileUserId) => {
    const { data } = await supabase.from("follower_following")
        .select('following_id')
        .eq('following_id', profileUserId)
    profileFollower.value = data.length
}

const handleIsFollowing = async (profileUserId) => {
    if (props.user.id && (props.user.id !== profileUserId)) {
        const { data } = await supabase.from("follower_following")
            .select('*')
            .eq('follower_id', props.user.id)
            .eq('following_id', profileUserId)
            .single()
        if (data) isFollowing.value = true
    }
}

const handleFollow = async (mainUserId, mainProfileId) => {
    const { data, error } = await supabase.from("follower_following").insert({
        follower_id: mainUserId,
        following_id: mainProfileId
    })
    if (!error) {
        isFollowing.value = true
        profileFollower.value++
    }
}

const handleUnFollow = async (mainUserId, mainProfileId) => {
    const { data, error } = await supabase.from("follower_following")
        .delete()
        .match({
            follower_id: mainUserId,
            following_id: mainProfileId
        });
    if (!error) {
        isFollowing.value = false
        profileFollower.value--
    }
}

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
})

const getDataProfile = async () => {
    const { data: userWithUsername } = await supabase
        .from("users")
        .select()
        .eq("username", route.params.username)
        .single();

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


    if (!userPostImage) {
        return alert("image not found")
    }

    profileImageLength.value = userPostImage.length
    profileImage.value = { ...userPostImage }

    handleIsFollowing(profileData.value.id)
    countFollower(profileData.value.id)
    countFollowing(profileData.value.id)

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
    <v-row v-if="user.username != route.params.username" justify="center">
        <v-btn v-if="!isFollowing" @click="handleFollow(user.id, profileData.id)" dark class="ma-2" color="red"
            prepend-icon="mdi-heart">Follow
        </v-btn>
        <v-btn v-else @click="handleUnFollow(user.id, profileData.id)" dark class="ma-2" color="red"
            prepend-icon="mdi-heart">Followed
        </v-btn>
    </v-row>
    <v-row style="margin:0px auto; margin-top: 10px; max-width: 500px; ">
        <v-col cols="4" class="text-center">{{ profileFollower }} Follower</v-col>
        <v-col cols="4" class="text-center">{{ profileImageLength }} Images</v-col>
        <v-col cols="4" class="text-center">{{ profileFollowing }} Following</v-col>
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