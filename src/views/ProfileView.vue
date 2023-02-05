<template>
    <v-row class="w-100" style="margin-top:40px;margin: 0 auto;">
        <v-card class="mx-auto d-md-flex flex-md-col d-sm-flex flex-sm-row profile-image"
            style="padding: 20px;width: 500px;">
            <div style="width: 100%;">
                <v-img class="rounded-circle" style="width:175px;height: 175px; margin: 0 auto; padding: 10" cover
                    src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
            </div>
            <div>
                <v-list-item class="text-slate" title="Tony Adam" subtitle="tony_a88@gmailcom"></v-list-item>
                <div style="padding: 16px;">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard
                </div>
            </div>
            <div>

            </div>
        </v-card>
    </v-row>
    <v-row style="margin:0px auto; margin-top: 10px; max-width: 500px; ">
        <v-col cols="4" class="text-center">5 Follower</v-col>
        <v-col cols="4" class="text-center">100 Post</v-col>
        <v-col cols="4" class="text-center">75 Following</v-col>
    </v-row>
    <div style="min-height:50px">

    </div>
    <v-row>
        <v-col v-for="n in 9" :key="n" class="d-flex child-flex" cols="4">
            <v-img :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`" aspect-ratio="1" cover
                class="bg-grey-lighten-2">
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                    </v-row>
                </template>
            </v-img>
        </v-col>
    </v-row>
</template>

<style scoped>
.profile-image {
    padding: 8px;
    box-shadow: none;

}
</style>