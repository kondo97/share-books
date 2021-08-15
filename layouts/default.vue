<template>
  <v-app>
    <AppBar />
    <v-main class="bg-color">
      <Nuxt />
    </v-main>
    <FooterBar />
  </v-app>
</template>

<script>
export default {
  components: {
    AppBar: () => import("~/components/Frame/AppBar"),
    FooterBar: () => import("~/components/Frame/FooterBar"),
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>

</style>
