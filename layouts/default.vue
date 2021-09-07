<template>
  <v-app class="display-none" :class="{ display: isActive }">
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
  mounted() {
    this.isActive = true
  },
  data() {
    return {
      isActive: false
    }
  },
  
};

</script>

<style scoped>

.display-none {
  display: none;
}

.display {
  display: block;
}

</style>
