<script setup lang="ts">
import { computed, onMounted } from "vue";
import store from "./common/store";
import OpeningPage from "./components/opening-page.vue";
import Homepage from "./components/homepage.vue";

const isLogin = computed(() => store.state.isLogin);

onMounted(async () => {
  await store.dispatch("getCurrentUser");
});
</script>

<template>
  <template v-if="isLogin">
    <homepage />
  </template>
  <template v-else>
    <opening-page />
  </template>
</template>
