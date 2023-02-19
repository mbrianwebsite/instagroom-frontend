<script setup>
import { ref, onMounted, watch } from 'vue';
// import { useRoute } from 'vue-router'
import { supabase } from '../supabase';

const props = defineProps(['user'])

const timelineData = ref()

const getFollowing = async () => {
    const { data: followers } = await supabase.from("follower_following").select("following_id").eq("follower_id", props.user.id)

    const followersId = followers.map(f => f.following_id)

    const { data: res } = await supabase.from("posts").select("*").eq("owner_id", followersId).order('created_at', { ascending: false })


    timelineData.value = res
    console.log(res)
}

onMounted(async () => {
    getFollowing()
})

</script>
<template>
    <div v-for="post in timelineData" class="py-4" style="max-width: 500px; margin: 0 auto;">
        <v-card :title="post.caption" style="max-width: 500px; margin: 0 auto;">
            <v-img style="max-width:500px;;" cover
                :src="`https://cujaootecogyihvzqccn.supabase.co/storage/v1/object/public/images/${post.url}`"></v-img>
            <div class="px-4 py-4">
                <b>{{ post.created_at }}</b> <br>
                {{ post.description }}
            </div>
            <v-card-actions>
                <v-btn>
                    <v-icon icon="mdi-heart"></v-icon>
                </v-btn>
                <v-btn>
                    <v-icon icon="mdi-account-heart"></v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

