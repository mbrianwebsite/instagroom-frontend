<script setup>
import { ref, onMounted } from "vue";
import SideBar from "@/components/SideBar.vue"
import { RouterView, RouterLink } from "vue-router"
import { useUserStore } from "./stores/users";
import { storeToRefs } from "pinia";


const drawer = ref(true)
const theme = ref('light')

const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)

onMounted(() => {
  userStore.getUser()
})

function changeTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

</script>

<template>
  <v-app :theme="theme">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>
        <v-btn to="/">
          Instagroom
        </v-btn>
      </v-app-bar-title>
      <!-- <v-spacer></v-spacer> -->
      <v-text-field label="Search" single-line hide-details></v-text-field>
      <v-btn @click="changeTheme">
        <v-icon :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></v-icon>
      </v-btn>
    </v-app-bar>
    <SideBar :isLogin="isLogin" :drawer="drawer" />

    <v-main>
      <v-container v-if="isLogin" class="w-100 konten-utama">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.konten-utama {
  max-width: 1000px;
}

:root {
  --primary: rgba(229, 229, 229, 1);
  --secondary: rgba(229, 229, 229, 0.1);
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--secondary) var(--primary);
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  height: 1px;
  width: 1px;
}

*::-webkit-scrollbar-track {
  background: var(--primary);
  border-radius: 5px;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--secondary);
  border-radius: 14px;
  border: 3px solid var(--primary);
}
</style>