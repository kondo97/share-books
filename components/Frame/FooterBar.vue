<template>
  <v-footer dark padless>
    <v-card flat tile class="white--text text-center footer-card" color="#3E3E3E">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Share Books</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-instagram"],
  }),
};
</script>

<style>
  .footer-card {
    width: 100%;
  }
</style>